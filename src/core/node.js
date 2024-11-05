import { EventEmitter } from "../utils/event-emitter.js";
import { LiteGraph, LGraphNode } from "mobject-litegraph";

export class Node extends LGraphNode {
  #eventEmitter = new EventEmitter();

  constructor(title) {
    super(title);
    this._shape = 2;
  }

  addCustomWidget(widget) {
    super.addCustomWidget(widget);
    if (widget.registerWithParent) {
      widget.registerWithParent(this);
    }
  }

  on(eventName, listener) {
    this.#eventEmitter.on(eventName, listener);
  }

  off(eventName, listener) {
    this.#eventEmitter.off(eventName, listener);
  }

  update(status) {
    this.#eventEmitter.emit("nodeStatusUpdated", status);
  }

  setPropertyDefaultValue(name, value) {
    this.properties ||= {};

    if (value === this.properties[name]) {
      return;
    }

    this.properties[name] = value;
    const widgetToUpdate = this.widgets?.find(
      (widget) => widget && widget.options?.property === name
    );

    if (widgetToUpdate) {
      widgetToUpdate.value = value;
    }
  }

  resetSize() {
    this.setSize(this.computeSize());
  }

  onDropFile(file, widgetName = null) {
    if (this.widgets && this.widgets.length) {
      if (widgetName !== null) {
        const widget = this.widgets.find((w) => w.name === widgetName);
        if (widget && widget.onDropFile && widget.onDropFile(file)) {
          return;
        }
      } else {
        for (const widget of this.widgets) {
          if (widget.onDropFile && widget.onDropFile(file)) {
            return;
          }
        }
      }
    }
    LiteGraph.log_warn(
      `Node ${this.type} was registered to handle a dropped file, but failed to handle it.`
    );
  }
}
