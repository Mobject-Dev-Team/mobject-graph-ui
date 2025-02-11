// Description: Graph Editor class for creating a graph editor instance.

// --------------------------------
// events emitted by the editor:
// --------------------------------
// - toolbarReady : emitted when the toolbar is ready
// - graphLoadInitiated : emitted when a graph load is initiated, provides the graph instance
// - graphLoaded : emitted when a graph is loaded, provides the graph instance
// - graphClearInitiated : emitted when a graph clear is initiated, provides the graph instance
// - graphCleared : emitted when a graph is cleared, provides the graph instance
// - graphSerialized : emitted when a graph is serialized, provides the serialized graph
// - graphSet : emitted when a new graph instance is given to the editor, provides the graph instance that was set
// - graphReplaced : emitted when a graph instance is replaced by another, provides the graph instance that was replaced
// - applyExtension : emitted when an extension is applied, provides the extension instance
// - instantiated : emitted when the editor is instantiated, provides the editor instance
// --------------------------------

// example of showWarning
// --------------------------------
// .showWarning('Warning', 'This is a warning message');

// example of showModal
// --------------------------------
// .showModal({
//   title: 'Edit File Details',
//   body: `
//     <form id="file-details">
//       <input type="text" class="form-control mb-2" placeholder="Title">
//       <textarea class="form-control" placeholder="Description"></textarea>
//     </form>
//   `,
//   buttons: [
//     {
//       label: 'Cancel',
//       type: 'secondary',
//       onClick: (modal) => {console.log('hello'); modal.hide()}
//     },
//     {
//       label: 'Save',
//       type: 'primary',
//       onClick: (modal) => {
//         const inputs = modal._element.querySelectorAll('input, textarea');
//         // Handle save logic
//         modal.hide();
//       }
//     }
//   ],
//   preShow : (modal, modalElement)=>{console.log('pre-show')}
// });

import "./graph-editor.css";
import { Graph } from "./graph.js";
import { GraphCanvas } from "../core/graph-canvas.js";
import { GraphFramework } from "../core/graph-framework.js";
import { EventEmitter } from "../utils/event-emitter.js";
import { Toasts } from "../editor-utils/toasts/toasts.js";
import { ToolbarGroup } from "../editor-controls/toolbar-group.js";
import { ToolbarButton } from "../editor-controls/toolbar-button.js";
import { ToolbarSeparator } from "../editor-controls/toolbar-seperator.js";

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
    this.toasts = null;
    this.graphCanvas = null;
    this.graph = new Graph();
    this.toolbarControls = [];
    this.extensions = [];

    this.makeEditorWindow(containerId);
    this.setGraph(this.graph);

    const graphFramework = new GraphFramework();
    graphFramework.applyExtensions("editor", this);

    this.eventEmitter.emit("toolbarReady");
    this.eventEmitter.emit("instantiated", this);
    return this;
  }

  loadGraph(graphData) {
    this.eventEmitter.emit("graphLoadInitiated", this.graph);
    this.graph.configure(graphData);
    this.graphCanvas.setDefaultViewpoint();
    this.eventEmitter.emit("graphLoaded", this.graph);
  }

  clearGraph() {
    this.eventEmitter.emit("graphClearInitiated", this.graph);
    this.graph.clear();
    this.eventEmitter.emit("graphCleared", this.graph);
  }

  serializeGraph() {
    const serializedGraph = this.graph.serialize();
    this.eventEmitter.emit("graphSerialized", serializedGraph);
    return serializedGraph;
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

  addButton(id, options) {
    const button = new ToolbarButton(
      id,
      options.label,
      options.iconClass,
      options.onClick,
      options.tooltip
    );

    // New group handling logic
    if (options.group) {
      const group = this.getOrCreateButtonGroup(
        options.group,
        options.section || "left",
        options.groupPosition
      );
      group.addButton(button);
    } else {
      this.addToolbarControl(button, {
        section: options.section,
        position: options.position,
        referenceId: options.referenceId,
      });
    }

    return button;
  }

  getOrCreateButtonGroup(groupName, section = "left", position = "end") {
    if (!this.buttonGroups)
      this.buttonGroups = { left: {}, center: {}, right: {} };

    if (!this.buttonGroups[section][groupName]) {
      const group = new ToolbarGroup(groupName);
      this.addToolbarControl(group, {
        section,
        position,
        referenceId: groupName, // For future reference
      });
      this.buttonGroups[section][groupName] = group;
    }

    return this.buttonGroups[section][groupName];
  }

  addSeparator(section = "left") {
    const separator = new ToolbarSeparator();
    this.addToolbarControl(separator, { section });
    return separator;
  }

  addToolbarControl(toolbarControl, options = {}) {
    const { section = "left", position = "end", referenceId = null } = options;
    const sectionElement = this.toolbarElement.querySelector(
      `.mgui-toolbar-section.${section}`
    );

    if (!sectionElement) {
      console.warn(
        `Toolbar section '${section}' not found. Appending to left.`
      );
      return this.addToolbarControl(toolbarControl, {
        ...options,
        section: "left",
      });
    }

    const controlElement = toolbarControl.render();
    toolbarControl.section = section;

    if (position === "start") {
      sectionElement.insertBefore(controlElement, sectionElement.firstChild);
    } else if (referenceId) {
      const referenceElement = sectionElement.querySelector(`#${referenceId}`);
      if (referenceElement) {
        sectionElement.insertBefore(
          controlElement,
          position === "before"
            ? referenceElement
            : referenceElement.nextSibling
        );
      } else {
        sectionElement.appendChild(controlElement);
      }
    } else {
      sectionElement.appendChild(controlElement);
    }

    this.toolbarControls.push(toolbarControl);
    this.resizeCanvas();
    return controlElement;
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
    
    <div class="mgui-editor-toolbar ">
      <div class="mgui-toolbar-section left"></div>
      <div class="mgui-toolbar-section center"></div>
      <div class="mgui-toolbar-section right"></div>
    </div>
    <div class="mgui-editor-main-window">
        <canvas class="mgui-editor-graphcanvas"></canvas>   
        <div class="toast-container" aria-live="polite" aria-atomic="true">
    </div>
    </div>
    <div class="mgui-editor-footer">
        <div class="mgui-editor-tools mgui-editor-tools-left"></div>
        <div class="mgui-editor-tools mgui-editor-tools-right"></div>
    </div>
    <div class="mgui-modal-container"></div>`;

    this.toolbarElement = root.querySelector(".mgui-editor-toolbar");
    this.mainWindowElement = root.querySelector(".mgui-editor-main-window");
    this.footerElement = root.querySelector(".mgui-editor-footer");
    this.toastContainer = root.querySelector(".toast-container");
    this.toasts = new Toasts(this.toastContainer);

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
    const toolbarStyle = window.getComputedStyle(this.toolbarElement);
    const footerStyle = window.getComputedStyle(this.footerElement);

    const toolbarHeight =
      this.toolbarElement.offsetHeight +
      parseInt(toolbarStyle.marginTop) +
      parseInt(toolbarStyle.marginBottom);
    const footerHeight =
      this.footerElement.offsetHeight +
      parseInt(footerStyle.marginTop) +
      parseInt(footerStyle.marginBottom);

    const availableHeight =
      this.parentDiv.clientHeight - toolbarHeight - footerHeight;

    this.mainWindowElement.style.height = availableHeight + "px";
    this.canvasElement.height = availableHeight;
    this.canvasElement.style.height = availableHeight + "px";
    this.graphCanvas.resize();
  }

  showModal(options) {
    const modalId = `mgui-modal-${Date.now()}`;

    const buttonsHtml = options.buttons
      .map(
        (btn) => `
      <button type="button" 
              class="btn btn-${btn.type || "secondary"}"
              ${btn.dismiss ? 'data-bs-dismiss="modal"' : ""}>
        ${btn.label}
      </button>
    `
      )
      .join("");

    const modalHtml = `
      <div class="modal fade" id="${modalId}" tabindex="-1" 
           aria-labelledby="${modalId}-label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${modalId}-label">${options.title}</h5>
              <button type="button" class="btn-close" 
                      data-dismiss="modal" 
                      aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ${options.body}
            </div>
            <div class="modal-footer">
              ${buttonsHtml}
            </div>
          </div>
        </div>
      </div>`;

    const modalContainer = this.rootElement.querySelector(
      ".mgui-modal-container"
    );
    modalContainer.insertAdjacentHTML("beforeend", modalHtml);

    const modalElement = document.getElementById(modalId);
    const modal = new bootstrap.Modal(modalElement, {
      keyboard: true,
      focus: false,
    });

    $(".modal").on("shown.bs.modal", function () {
      $(this).find("[autofocus]").focus();
    });

    options.buttons.forEach((btn, index) => {
      if (!btn.dismiss) {
        const buttonElement = modalElement.querySelectorAll(
          ".modal-footer button"
        )[index];
        buttonElement.addEventListener("click", (e) => {
          if (btn.onClick) {
            btn.onClick(modal);
          } else {
            modal.hide();
          }
        });
      }
    });

    modalElement.addEventListener("hidden.bs.modal", () => {
      setTimeout(() => {
        modalElement.remove();
      }, 100);
    });

    const formElement = modalElement.querySelector("form");
    if (formElement) {
      formElement.addEventListener("submit", (e) => {
        e.preventDefault();
        const primaryBtn = options.buttons.find(
          (btn) => btn.type === "primary"
        );
        if (primaryBtn) {
          if (primaryBtn.onClick) {
            primaryBtn.onClick(modal);
          } else {
            modal.hide();
          }
        }
      });
    }

    if (options.preShow) {
      options.preShow(modal, modalElement);
    }
    modal.show();
  }

  showWarning(title, message) {
    this.toasts.showWarning(title, message);
  }

  showError(title, message) {
    this.toasts.showError(title, message);
  }

  showSuccess(title, message) {
    this.toasts.showSuccess(title, message);
  }

  showInfo(title, message) {
    this.toasts.showInfo(title, message);
  }

  showMessage(title, message) {
    this.toasts.showMessage(title, message);
  }

  showOkCancel(title, message, callbacks) {
    this.toasts.showOkCancel(title, message, callbacks);
  }

  async apiSend(action, data) {
    return this.connection.send(action, data);
  }
}
