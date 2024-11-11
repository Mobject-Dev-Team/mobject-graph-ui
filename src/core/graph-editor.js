import { Graph } from "./graph.js";
import { LGraphCanvas } from "mobject-litegraph";
import { GraphFramework } from "../core/graph-framework.js";
import { EventEmitter } from "../utils/event-emitter.js";

export class GraphEditor {
  constructor(containerId, connection) {
    this.eventEmitter = new EventEmitter();
    this.connection = connection;
    this.rootElement = null;
    this.parentDiv = null;
    this.toolbarElement = null;
    this.mainWindowElement = null;
    this.footerElement = null;
    this.canvasElement = null;
    this.graphCanvas = null;
    this.graph = new Graph();
    this.toolbarControls = [];
    this.extensions = [];

    this.makeEditorWindow(containerId);
    this.setGraph(this.graph);

    const graphFramework = new GraphFramework();
    graphFramework.applyExtensions("editor", this);

    this.eventEmitter.emit("instantiated", this);
    return this.graph;
  }

  getConnection() {
    return this.connection;
  }

  getGraph() {
    return this.graph;
  }

  setGraph(graph) {
    if (this.graph) {
      this.eventEmitter.emit("graphReplaced", this.graph);
    }
    this.graph = graph;
    this.graphCanvas.setGraph(this.graph, true);

    this.eventEmitter.emit("graphSet", this.graph);

    return graph;
  }

  on(eventName, listener) {
    this.eventEmitter.on(eventName, listener);
  }

  off(eventName, listener) {
    this.eventEmitter.off(eventName, listener);
  }

  addToolbarControl(toolbarControl) {
    this.toolbarControls.push(toolbarControl);
    const controlElement = toolbarControl.render();
    this.toolbarElement.appendChild(controlElement);
  }

  applyExtension(extension) {
    this.eventEmitter.emit("applyExtension", extension);
    try {
      const instance = new extension(this);
      this.extensions.push(instance);
    } catch (error) {
      if (
        typeof extension === "object" &&
        typeof extension.apply === "function"
      ) {
        extension.apply(this);
        this.extensions.push(extension);
      } else {
        throw new Error(
          "Extension must be a class or an object with an apply method"
        );
      }
    }
  }

  makeEditorWindow(container_id, options = {}) {
    const root = (this.rootElement = document.createElement("div"));
    root.className = "mgui-editor";
    root.innerHTML = `
    <div class="mgui-editor-toolbar">
        <div class="mgui-editor-tools mgui-editor-tools-left"></div>
        <div class="mgui-editor-tools mgui-editor-tools-right"></div>
    </div>
    <div class="mgui-editor-main-window">
        <div class="editor-area">
            <canvas class="mgui-editor-graphcanvas" width="1000" height="500" tabindex="10"></canvas>
        </div>
    </div>
    <div class="mgui-editor-footer">
        <div class="mgui-editor-tools mgui-editor-tools-left"></div>
        <div class="mgui-editor-tools mgui-editor-tools-right"></div>
    </div>`;

    this.toolbarElement = root.querySelector(".mgui-editor-toolbar");
    this.mainWindowElement = root.querySelector(".mgui-editor-main-window");
    this.footerElement = root.querySelector(".mgui-editor-footer");

    const canvas = (this.canvasElement = root.querySelector(
      ".mgui-editor-graphcanvas"
    ));

    this.graphCanvas = new LGraphCanvas(canvas);

    this.parentDiv = document.getElementById(container_id);
    if (this.parentDiv) {
      this.parentDiv?.appendChild(root);
    } else {
      throw new Error("Editor has no parentElement to bind to");
    }
  }
}
