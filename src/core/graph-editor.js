import { Graph } from "./graph.js";
import { LGraphCanvas } from "./graph-canvas.js";
import { MobjectGraphTransformer } from "../utils/litegraph-converter.js";

export class GraphEditor {
  constructor({ containerSelector, width = 800, height = 600 }, connection) {
    this.graphTimeout = null;
    this.statusTimeout = null;
    this.connection = connection;
    this.isCreatingGraph = false;
    this.isUpdatingStatus = false;
    this.setupContainer(containerSelector);
    this.setupCanvas(width, height);
    return this.initializeGraph();
  }

  setupContainer(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      throw new Error(
        `Container element with selector "${containerSelector}" not found`
      );
    }
  }

  setupCanvas(width, height) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.container.appendChild(this.canvas);
  }

  initializeGraph() {
    const graph = new Graph();
    new LGraphCanvas(this.canvas, graph);
    this.graph = graph;

    this.graph.registerCallbackHandler(
      "onConnectionChange",
      async (oCbInfo, node) => {
        await this.callCreateGraph();
      }
    );

    this.graph.registerCallbackHandler("onNodeAdded", async (oCbInfo, node) => {
      node.registerCallbackHandler(
        "onPropertyChanged",
        async (oCbInfo, name, value, prevValue) => {
          try {
            await this.waitForGraphCreationToComplete();
            await this.waitForStatusUpdateToComplete();

            console.log(
              "api update parameter, graphid:",
              this.graph.uuid,
              "nodeId:",
              node.id,
              "parameterName:",
              name,
              "parameterValue:",
              value
            );

            const reply = await this.connection.send("UpdateParameterValue", {
              graphUuid: this.graph.uuid,
              nodeId: node.id,
              parameterName: name,
              parameterValue: value,
            });
          } catch (e) {
            console.log(e);
          }
        }
      );
      await this.callCreateGraph();
    });

    this.graph.registerCallbackHandler(
      "onNodeRemoved",
      async (oCbInfo, node) => {
        await this.callCreateGraph();
      }
    );

    return graph;
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

  async callCreateGraph() {
    try {
      this.stopGraphUpdate();
      this.stopStatusUpdates();
      await this.waitForStatusUpdateToComplete();

      this.isCreatingGraph = true;

      this.graph.generateNewUuid();
      console.log("New Graph Uuid > ", this.graph.uuid);

      this.startGraphUpdate();
    } catch (e) {
      console.log(e);
    }
  }

  startGraphUpdate() {
    this.stopGraphUpdate();
    this.scheduleNextGraphUpdate();
  }

  stopGraphUpdate() {
    if (this.graphTimeout) {
      clearTimeout(this.graphTimeout);
      this.graphTimeout = null;
    }
  }

  async scheduleNextGraphUpdate() {
    this.graphTimeout = setTimeout(async () => {
      try {
        const graphPayload = MobjectGraphTransformer.Convert(this.graph);

        console.log("api create graph", graphPayload);
        const status = await this.connection.send("CreateGraph", {
          graph: graphPayload,
        });

        console.log("api create graph reply >", status);
        if (status.uuid !== this.graph.uuid) {
          throw new Error("Uuid mismatch after Graph generation.");
        }

        this.graph.update(status);

        this.isCreatingGraph = false;
        this.startStatusUpdates();
      } catch (error) {
        console.log(error);
        this.stopGraphUpdate();
      } finally {
        this.isCreatingGraph = false;
      }
    }, 100);
  }

  startStatusUpdates() {
    this.stopStatusUpdates();
    this.scheduleNextStatusUpdate();
  }

  stopStatusUpdates() {
    if (this.statusTimeout) {
      clearTimeout(this.statusTimeout);
      this.statusTimeout = null;
    }
  }

  async scheduleNextStatusUpdate() {
    this.statusTimeout = setTimeout(async () => {
      try {
        await this.waitForGraphCreationToComplete();
        this.isUpdatingStatus = true;

        console.log("api get status", this.graph.uuid);
        const status = await this.connection.send("GetStatus", {
          graphUuid: this.graph.uuid,
        });

        console.log("api get status reply >", status);
        if (status.uuid !== this.graph.uuid) {
          throw new Error("Uuid mismatch after Status update.");
        }

        this.graph.update(status);
        this.isUpdatingStatus = false;
        this.scheduleNextStatusUpdate();
      } catch (error) {
        console.log(error);
        this.stopStatusUpdates();
      } finally {
        this.isUpdatingStatus = false;
      }
    }, 1000);
  }
}
