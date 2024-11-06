import { MobjectGraphTransformer } from "../../../utils/litegraph-converter.js";

export class EditorAutoUpdateExtension {
  constructor(editor) {
    this.graphTimeout = null;
    this.statusTimeout = null;
    this.isCreatingGraph = false;
    this.isUpdatingStatus = false;

    this.editor = editor;
    this.connection = editor.getConnection();

    this.editor.on("graphReplaced", (graph) => {
      this.unregisterCallbacksFromGraph(graph);
    });

    this.editor.on("graphSet", (graph) => {
      this.registerCallbacksWithGraph(graph);
    });
  }

  unregisterCallbacksFromGraph(graph) {}

  registerCallbacksWithGraph(graph) {
    if (!graph) {
      return;
    }

    graph.registerCallbackHandler(
      "onConnectionChange",
      async (oCbInfo, node) => {
        await this.callCreateGraph(graph);
      }
    );

    graph.registerCallbackHandler("onNodeAdded", async (oCbInfo, node) => {
      node.registerCallbackHandler(
        "onPropertyChanged",
        async (oCbInfo, name, value, prevValue) => {
          try {
            await this.waitForGraphCreationToComplete();
            await this.waitForStatusUpdateToComplete();

            console.log(
              "api update parameter, graphid:",
              graph.uuid,
              "nodeId:",
              node.id,
              "parameterName:",
              name,
              "parameterValue:",
              value
            );

            const reply = await this.connection.send("UpdateParameterValue", {
              graphUuid: graph.uuid,
              nodeId: node.id,
              parameterName: name,
              parameterValue: value,
            });
          } catch (e) {
            console.log(e);
          }
        }
      );
      await this.callCreateGraph(graph);
    });

    graph.registerCallbackHandler("onNodeRemoved", async (oCbInfo, node) => {
      await this.callCreateGraph(graph);
    });
  }

  async waitForGraphCreationToComplete() {
    while (this.isCreatingGraph) {
      console.log("Waiting for Graph creation to complete...");
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  async waitForStatusUpdateToComplete() {
    while (this.isUpdatingStatus) {
      console.log("Waiting for Status update to complete...");
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  async callCreateGraph(graph) {
    try {
      this.stopGraphUpdate();
      this.stopStatusUpdates();
      await this.waitForStatusUpdateToComplete();

      this.isCreatingGraph = true;

      graph.generateNewUuid();
      console.log("New Graph Uuid > ", graph.uuid);

      this.startGraphUpdate(graph);
    } catch (e) {
      console.log(e);
    }
  }

  startGraphUpdate(graph) {
    this.stopGraphUpdate();
    this.scheduleNextGraphUpdate(graph);
  }

  stopGraphUpdate() {
    if (this.graphTimeout) {
      clearTimeout(this.graphTimeout);
      this.graphTimeout = null;
    }
  }

  async scheduleNextGraphUpdate(graph) {
    this.graphTimeout = setTimeout(async () => {
      try {
        const graphPayload = MobjectGraphTransformer.Convert(graph);

        console.log("api create graph", graphPayload);
        const status = await this.connection.send("CreateGraph", {
          graph: graphPayload,
        });

        console.log("api create graph reply >", status);
        if (status.uuid !== graph.uuid) {
          throw new Error("Uuid mismatch after Graph generation.");
        }

        graph.update(status);

        this.isCreatingGraph = false;
        this.startStatusUpdates(graph);
      } catch (error) {
        console.log(error);
        this.stopGraphUpdate();
      } finally {
        this.isCreatingGraph = false;
      }
    }, 100);
  }

  startStatusUpdates(graph) {
    this.stopStatusUpdates();
    this.scheduleNextStatusUpdate(graph);
  }

  stopStatusUpdates() {
    if (this.statusTimeout) {
      clearTimeout(this.statusTimeout);
      this.statusTimeout = null;
    }
  }

  async scheduleNextStatusUpdate(graph) {
    this.statusTimeout = setTimeout(async () => {
      try {
        await this.waitForGraphCreationToComplete();
        this.isUpdatingStatus = true;

        console.log("api get status", graph.uuid);
        const status = await this.connection.send("GetStatus", {
          graphUuid: graph.uuid,
        });

        console.log("api get status reply >", status);
        if (status.uuid !== graph.uuid) {
          throw new Error("Uuid mismatch after Status update.");
        }

        graph.update(status);
        this.isUpdatingStatus = false;
        this.scheduleNextStatusUpdate(graph);
      } catch (error) {
        console.log(error);
        this.stopStatusUpdates();
      } finally {
        this.isUpdatingStatus = false;
      }
    }, 1000);
  }
}
