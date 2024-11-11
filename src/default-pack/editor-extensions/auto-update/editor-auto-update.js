import { ToolbarButton } from "../../../editor-controls/toolbar-button.js";

export class EditorAutoUpdateExtension {
  constructor(editor) {
    this.editor = editor;
    this.connection = editor.getConnection();
    this.currentGraph = null;
    this.pollingTimeoutId = null;
    this.pollingPeriodInMs = 1000;
    this.requestQueueMaxSize = 1;
    this.requestQueue = [];
    this.processingRequest = false;
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
    const myButton = new ToolbarButton("myButton", "Test", null, () => {
      console.log(this);
    });

    this.editor.addToolbarControl(myButton);
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
    graph.off("connectionChange", this.handleConnectionChange.bind(this));
    graph.off("nodeAdded", this.handleNodeAdded.bind(this));
    graph.off("nodeRemoved", this.handleNodeRemoved.bind(this));
    graph.off("nodePropertyChanged", this.handlePropertyChange.bind(this));
  }

  registerGraphListeners(graph) {
    graph.on("connectionChange", this.handleConnectionChange.bind(this));
    graph.on("nodeAdded", this.handleNodeAdded.bind(this));
    graph.on("nodeRemoved", this.handleNodeRemoved.bind(this));
    graph.on("nodePropertyChanged", this.handlePropertyChange.bind(this));
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
    if (this.processingRequest || this.requestQueue.length === 0) {
      return;
    }

    this.processingRequest = true;
    const { requestFunction, args } = this.requestQueue.shift();

    try {
      await requestFunction.apply(this, args);
    } finally {
      this.processingRequest = false;
      this.processRequests();
    }
  }

  handleConnectionChange(graph, node) {
    if (graph.uuid != this.currentGraph.uuid) {
      return;
    }
    this.enqueueRequest(this.createGraph, graph);
  }

  handleNodeAdded(graph, node) {
    if (graph.uuid != this.currentGraph.uuid) {
      return;
    }
    this.enqueueRequest(this.createGraph, graph);
  }

  handleNodeRemoved(graph, node) {
    if (graph.uuid != this.currentGraph.uuid) {
      return;
    }
    this.enqueueRequest(this.createGraph, graph);
  }

  handlePropertyChange(graph, node, name, value) {
    if (graph.uuid != this.currentGraph.uuid) {
      return;
    }
    this.enqueueRequest(this.updateParameterValue, graph, node, name, value);
  }

  async createGraph(graph) {
    this.stopPolling();
    const graphPayload = graph.exportForBackend();
    console.log("api create graph", graph.uuid, graphPayload);

    try {
      const status = await this.connection.send("CreateGraph", {
        graph: graphPayload,
      });
      if (status.uuid === graph.uuid) {
        graph.update(status);
        this.startPolling();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateParameterValue(graph, node, name, value) {
    this.stopPolling();
    console.log("api update property", node, name, value);
    try {
      const reply = await this.connection.send("UpdateParameterValue", {
        graphUuid: graph.uuid,
        nodeId: node.id,
        parameterName: name,
        parameterValue: value,
      });
      this.startPolling();
    } catch (error) {
      if (error.message.includes("Invalid or missing graphUuid")) {
        console.log(
          "api update property failed due to unknown graphUuid, triggering update graph"
        );
        await this.createGraph(graph);
      } else {
        console.error("Update parameter value failed:", error);
      }
    }
  }

  stopPolling() {
    if (this.pollingTimeoutId) {
      clearInterval(this.pollingTimeoutId);
      this.pollingTimeoutId = null;
      console.log("polling stopped.");
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

    if (this.pollingTimeoutId) {
      return;
    }

    console.log("polling started.");
    this.pollingTimeoutId = setInterval(async () => {
      try {
        const status = await this.connection.send("GetStatus", {
          graphUuid: this.currentGraph.uuid,
        });

        if (!this.isPolling()) return;

        console.log("poll status reply >", status);
        if (status.uuid !== this.currentGraph.uuid) {
          console.log("poll status reply rejected as graph updated ");
          this.stopPolling();
          return;
        }
        this.currentGraph.update(status);
      } catch (error) {
        console.error("polling error:", error);
        this.stopPolling();
      }
    }, this.pollingPeriodInMs);
  }
}
