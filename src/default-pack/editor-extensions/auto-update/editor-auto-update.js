import { LiteGraph } from "mobject-litegraph";

export class EditorAutoUpdateExtension {
  constructor(editor) {
    this.editor = editor;
    this.currentGraph = null;
    this.graphIsConfiguring = false;
    this.pollingTimeoutId = null;
    this.pollingPeriodInMs = 1000;
    this.requestQueueMaxSize = 1;
    this.requestQueue = [];
    this.processingRequest = false;
    this.graphCreatePending = false;
    this.graphCreateDirty = false;
    this.activeGraphAction = null;

    // Bind event handlers once
    this.handleClear = this.handleClear.bind(this);
    this.handleConnectionChange = this.handleConnectionChange.bind(this);
    this.handleNodeAdded = this.handleNodeAdded.bind(this);
    this.handleNodeRemoved = this.handleNodeRemoved.bind(this);
    this.handlePropertyChange = this.handlePropertyChange.bind(this);
    this.handleBeforeGraphConfigure =
      this.handleBeforeGraphConfigure.bind(this);
    this.handleGraphConfigure = this.handleGraphConfigure.bind(this);

    this.setupEditorListeners();
    this.setupToolbarControls();
    this.switchGraph(this.editor.getGraph());
  }

  setupEditorListeners() {
    this.editor.on("graphSet", (newGraph) => {
      this.switchGraph(newGraph);
    });
  }

  setupToolbarControls() {
    // Placeholder for future toggle UI
  }

  switchGraph(newGraph) {
    if (this.currentGraph) {
      this.unregisterGraphListeners(this.currentGraph);
    }

    this.currentGraph = newGraph;

    if (this.currentGraph) {
      this.registerGraphListeners(newGraph);
    }
  }

  unregisterGraphListeners(graph) {
    graph.off("clear", this.handleClear);
    graph.off("connectionChange", this.handleConnectionChange);
    graph.off("nodeAdded", this.handleNodeAdded);
    graph.off("nodeRemoved", this.handleNodeRemoved);
    graph.off("nodePropertyChanged", this.handlePropertyChange);
    graph.off("beforeGraphConfigure", this.handleBeforeGraphConfigure);
    graph.off("graphConfigure", this.handleGraphConfigure);
  }

  registerGraphListeners(graph) {
    graph.on("clear", this.handleClear);
    graph.on("connectionChange", this.handleConnectionChange);
    graph.on("nodeAdded", this.handleNodeAdded);
    graph.on("nodeRemoved", this.handleNodeRemoved);
    graph.on("nodePropertyChanged", this.handlePropertyChange);
    graph.on("beforeGraphConfigure", this.handleBeforeGraphConfigure);
    graph.on("graphConfigure", this.handleGraphConfigure);
  }

  enqueueRequest(requestFunction, ...args) {
    if (this.requestQueue.length >= this.requestQueueMaxSize) {
      this.requestQueue = this.requestQueue.slice(
        -this.requestQueueMaxSize + 1
      );
    }
    this.requestQueue.push({ requestFunction, args });
    this.processRequests();
  }

  async processRequests() {
    if (this.processingRequest || this.requestQueue.length === 0) return;

    this.processingRequest = true;
    const { requestFunction, args } = this.requestQueue.shift();

    try {
      await requestFunction.apply(this, args);
    } catch (e) {
      console.error("processRequests error", e);
    } finally {
      this.processingRequest = false;
      this.processRequests();
    }
  }

  handleBeforeGraphConfigure() {
    this.graphIsConfiguring = true;
  }

  handleGraphConfigure(graph) {
    this.graphIsConfiguring = false;
    this.enqueueGraphCreate(graph);
  }

  handleClear(graph) {
    if (this.graphIsConfiguring || graph.uuid !== this.currentGraph.uuid)
      return;
    this.enqueueGraphCreate(graph);
  }

  handleConnectionChange(graph) {
    if (this.graphIsConfiguring || graph.uuid !== this.currentGraph.uuid)
      return;
    this.enqueueGraphCreate(graph);
  }

  handleNodeAdded(graph) {
    if (this.graphIsConfiguring || graph.uuid !== this.currentGraph.uuid)
      return;
    this.enqueueGraphCreate(graph);
  }

  handleNodeRemoved(graph) {
    if (this.graphIsConfiguring || graph.uuid !== this.currentGraph.uuid)
      return;
    this.enqueueGraphCreate(graph);
  }

  handlePropertyChange(graph, node, name, value) {
    if (this.graphIsConfiguring || graph.uuid !== this.currentGraph.uuid)
      return;
    this.enqueueRequest(this.updateParameterValue, graph, node, name, value);
  }

  enqueueGraphCreate(graph) {
    if (this.graphCreatePending) {
      this.graphCreateDirty = true;
      return;
    }

    this.graphCreatePending = true;
    this.enqueueRequest(async (g) => {
      await this.createGraph(g);
      this.graphCreatePending = false;

      if (this.graphCreateDirty) {
        this.graphCreateDirty = false;
        this.enqueueGraphCreate(g); // Retry to catch new changes
      }
    }, graph);
  }

  async createGraph(graph) {
    this.activeGraphAction = graph.uuid;
    this.stopPolling();

    const graphPayload = graph.exportForBackend();
    LiteGraph.log_log("api create graph", graph.uuid, graphPayload);

    try {
      const status = await this.editor.apiSend("CreateGraph", {
        graph: graphPayload,
      });

      if (status.uuid === graph.uuid && this.currentGraph.uuid === graph.uuid) {
        graph.update(status);
        this.startPolling();
      }
    } catch (error) {
      console.error("createGraph error", error);
    } finally {
      this.activeGraphAction = null;
    }
  }

  async updateParameterValue(graph, node, name, value) {
    this.activeGraphAction = graph.uuid;
    this.stopPolling();

    LiteGraph.log_log("api update property", node, name, value);

    try {
      const returnedUuid = await this.editor.apiSend("UpdateParameterValue", {
        graphUuid: graph.uuid,
        nodeId: node.id,
        parameterName: name,
        parameterValue: value,
      });

      if (returnedUuid !== this.currentGraph.uuid) {
        LiteGraph.log_info(
          `Update response UUID (${returnedUuid}) does not match current graph (${this.currentGraph.uuid}), ignoring.`
        );
        return;
      }

      this.startPolling();
    } catch (error) {
      switch (error.code) {
        case "INVALID_GRAPH_INSTANCE_ID":
        case "NO_GRAPH_INSTANCE_AVAILABLE":
        case "GRAPH_UUID_MISSMATCH":
          if (graph.uuid === this.currentGraph.uuid) {
            LiteGraph.log_info(
              `api update failed [${error.code}], resending full graph`
            );
            await this.createGraph(graph);
          } else {
            LiteGraph.log_info(
              `Skipped createGraph fallback, graph is no longer active`
            );
          }
          break;
        default:
          console.error("Update parameter value failed:", error);
          break;
      }
    } finally {
      this.activeGraphAction = null;
    }
  }

  stopPolling() {
    if (this.pollingTimeoutId) {
      clearTimeout(this.pollingTimeoutId);
      this.pollingTimeoutId = null;
      LiteGraph.log_log("polling stopped");
    }
  }

  isPolling() {
    return Boolean(this.pollingTimeoutId);
  }

  startPolling() {
    if (this.currentGraph.isEmpty) {
      this.stopPolling();
      return;
    }

    const currentPollingUuid = this.currentGraph.uuid;

    const poll = async () => {
      if (!this.isPolling()) return;

      try {
        const status = await this.editor.apiSend("GetStatus", {
          graphUuid: currentPollingUuid,
        });

        LiteGraph.log_log("polling reply >", status);

        if (
          status.uuid !== currentPollingUuid ||
          this.currentGraph.uuid !== currentPollingUuid
        ) {
          LiteGraph.log_info("polling response rejected (uuid mismatch)");
          this.stopPolling();
          return;
        }

        this.currentGraph.update(status);
        this.pollingTimeoutId = setTimeout(poll, this.pollingPeriodInMs);
      } catch (error) {
        console.error("polling error", error);
        this.stopPolling();
      }
    };

    LiteGraph.log_log("polling started");
    this.pollingTimeoutId = setTimeout(poll, this.pollingPeriodInMs);
  }
}
