import { Graph } from "./graph.js";
import { GraphCanvas } from "../core/graph-canvas.js";
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
    this.toastContainer = null;
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

  getGraphCanvas() {
    return this.graphCanvas;
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
    this.resizeCanvas();
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
    root.className = "mgui mgui-editor";
    root.innerHTML = `
    
    <div class="mgui-editor-toolbar">
        <div class="mgui-editor-tools mgui-editor-tools-left">
        </div>
        <div class="mgui-editor-tools mgui-editor-tools-right"></div>
    </div>
    <div class="mgui-editor-main-window">
        <canvas class="mgui-editor-graphcanvas"></canvas>   
        <div class="toast-container" aria-live="polite" aria-atomic="true">
    </div>
    </div>
    <div class="mgui-editor-footer">
        <div class="mgui-editor-tools mgui-editor-tools-left"></div>
        <div class="mgui-editor-tools mgui-editor-tools-right"></div>
    </div>`;

    this.toolbarElement = root.querySelector(".mgui-editor-toolbar");
    this.mainWindowElement = root.querySelector(".mgui-editor-main-window");
    this.footerElement = root.querySelector(".mgui-editor-footer");
    this.toastContainer = root.querySelector(".toast-container");

    const canvas = (this.canvasElement = root.querySelector(
      ".mgui-editor-graphcanvas"
    ));

    this.graphCanvas = new GraphCanvas(canvas);
    this.graphCanvas.render_canvas_border = false;

    this.parentDiv = document.getElementById(container_id);
    if (this.parentDiv) {
      this.parentDiv?.appendChild(root);
      this.resizeCanvas();
      window.addEventListener("resize", this.resizeCanvas.bind(this));
    } else {
      throw new Error("Editor has no parentElement to bind to");
    }
  }

  resizeCanvas() {
    const availableHeight =
      this.parentDiv.clientHeight -
      this.toolbarElement.offsetHeight -
      this.footerElement.offsetHeight;
    this.mainWindowElement.style.height = availableHeight + "px";
    this.canvasElement.height = availableHeight;
    this.canvasElement.style.height = availableHeight + "px";
    this.graphCanvas.resize();
  }

  generateToastId() {
    const randomPart = Math.floor(Math.random() * 1000);
    const id = `${new Date().getTime()}-${randomPart}-toast`;
    return id;
  }

  showToast(title, message, toastType, callbacks = {}) {
    const id = this.generateToastId();
    let bgColor,
      textColor,
      btnColor,
      delay,
      autoHide,
      extraHtml = "";

    switch (toastType) {
      case "error":
        bgColor = "bg-danger";
        textColor = "text-white";
        btnColor = "btn-close-white";
        delay = 4000;
        autoHide = true;
        break;
      case "warning":
        bgColor = "bg-warning";
        textColor = "text-black";
        btnColor = "btn-close-black";
        delay = 4000;
        autoHide = true;
        break;
      case "success":
        bgColor = "bg-success";
        textColor = "text-white";
        btnColor = "btn-close-white";
        delay = 4000;
        autoHide = true;
        break;
      case "info":
        bgColor = "bg-info";
        textColor = "text-black";
        btnColor = "btn-close-black";
        delay = 4000;
        autoHide = true;
        break;
      case "okCancel":
        bgColor = "bg-light";
        textColor = "text-black";
        btnColor = "btn-close-black";
        delay = 0;
        autoHide = false;
        extraHtml = `
                <div class="d-flex justify-content-end mt-2">
                    <button class="btn btn-primary btn-sm me-2" id="${id}-ok-btn">OK</button>
                    <button class="btn btn-secondary btn-sm" id="${id}-cancel-btn">Cancel</button>
                </div>
            `;
        break;
      default:
        bgColor = "bg-secondary";
        textColor = "text-white";
        btnColor = "btn-close-white";
    }

    const toastHtml = `
        <div id="${id}" class="toast ${bgColor} ${textColor}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="${autoHide}" data-bs-delay="${delay}">
            <div class="toast-header ${bgColor} ${textColor}">
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close ${btnColor}" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body ${textColor}">${message}${extraHtml}</div>
        </div>
    `;

    let toastNode = document.createElement("div");
    toastNode.innerHTML = toastHtml;

    this.toastContainer.appendChild(toastNode);

    $(`#${id}`).toast("show");

    if (toastType === "okCancel") {
      document.getElementById(`${id}-ok-btn`).addEventListener("click", () => {
        if (callbacks.onOk) callbacks.onOk();
        $(`#${id}`).toast("hide");
      });

      document
        .getElementById(`${id}-cancel-btn`)
        .addEventListener("click", () => {
          if (callbacks.onCancel) callbacks.onCancel();
          $(`#${id}`).toast("hide");
        });
    }

    $(`#${id}`).on("hidden.bs.toast", function () {
      this.remove();
    });
  }

  showWarning(title, message) {
    this.showToast(title, message, "warning");
  }

  showError(title, message) {
    this.showToast(title, message, "error");
  }

  showSuccess(title, message) {
    this.showToast(title, message, "success");
  }

  showInfo(title, message) {
    this.showToast(title, message, "info");
  }

  showMessage(title, message) {
    this.showToast(title, message, "");
  }

  showOkCancel(title, message, callbacks) {
    this.showToast(title, message, "okCancel", callbacks);
  }
}
