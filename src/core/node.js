import { EventEmitter } from "../utils/event-emitter.js";
import { LiteGraph, LGraphNode } from "mobject-litegraph";
import { GraphFramework } from "../core/graph-framework.js";

export class Node extends LGraphNode {
  eventEmitter = new EventEmitter();

  constructor(title) {
    super(title);
    this._shape = 2;
    this.extensions = [];

    this.registerCallbackHandlers();

    const graphFramework = new GraphFramework();
    graphFramework.applyExtensions("node", this);

    this.eventEmitter.emit("constructorComplete", this);
  }

  addCustomWidget(widget) {
    super.addCustomWidget(widget);
    if (widget.registerWithParent) {
      widget.registerWithParent(this);
    }
    this.eventEmitter.emit("customWidgetAdded", widget);
  }

  on(eventName, listener) {
    this.eventEmitter.on(eventName, listener);
  }

  off(eventName, listener) {
    this.eventEmitter.off(eventName, listener);
  }

  update(status) {
    this.eventEmitter.emit("nodeStatusUpdated", status);
  }

  setPropertyDefaultValue(name, value) {
    console.log("tried setting default", name, value);
  }

  // setPropertyDefaultValue(name, value) {
  //   this.properties ||= {};

  //   if (value === this.properties[name]) {
  //     return;
  //   }

  //   this.properties[name] = value;
  //   const widgetToUpdate = this.widgets?.find(
  //     (widget) => widget && widget.options?.property === name
  //   );

  //   if (widgetToUpdate) {
  //     widgetToUpdate.value = value;
  //   }
  // }

  resetSize() {
    this.setSize(this.computeSize());
  }

  onDropFile(file, widgetName = null) {
    if (this.widgets && this.widgets.length) {
      if (widgetName !== null) {
        const widget = this.widgets.find((w) => w.name === widgetName);
        if (widget && widget.onDropFile && widget.onDropFile(file)) {
          this.eventEmitter.emit("dropFileHandledByWidget", file, widget);
          return;
        }
      } else {
        for (const widget of this.widgets) {
          if (widget.onDropFile && widget.onDropFile(file)) {
            this.eventEmitter.emit("dropFileHandledByWidget", file, widget);
            return;
          }
        }
      }
    }
    LiteGraph.log_warn(
      `Node ${this.type} was registered to handle a dropped file, but failed to handle it.`
    );
  }

  onConfigure() {
    if (this.widgets) {
      this.widgets.forEach((widget) => {
        if (!widget) {
          return;
        }
        if (widget.postConfigure) {
          widget.postConfigure();
        }
      });
    }
  }

  registerCallbackHandlers() {
    this.registerCallbackHandler("onConfigure", (oCbInfo) => {
      this.eventEmitter.emit("onConfigure", this);
    });

    this.registerCallbackHandler("onAdded", (oCbInfo) => {
      this.eventEmitter.emit("added", this);
    });

    this.registerCallbackHandler("onRemoved", (oCbInfo) => {
      this.eventEmitter.emit("removed", this);
    });

    this.registerCallbackHandler(
      "onPropertyChanged",
      (oCbInfo, name, value, prevValue) => {
        this.eventEmitter.emit("propertyChanged", this, name, value, prevValue);
      }
    );
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
}
