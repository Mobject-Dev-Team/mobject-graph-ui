import { EventEmitter } from "../utils/event-emitter.js";
import { deepEqual } from "../utils/deep-equal.js";

export const WILDCARD = "*";
export const DISPLAY = "display";
export const CONTROL = "control";

export class WidgetBase {
  eventEmitter = new EventEmitter();
  _value = null;
  parent = null;

  constructor(name, parent, options) {
    this.name = name;
    this.parent = parent;
    this.options = options;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    if (!deepEqual(newValue, this._value)) {
      const oldValue = this._value;
      this._value = newValue;
      this.eventEmitter.emit("valueChanged", newValue, oldValue);
      if (this.parent && this.options && this.options.property) {
        this.parent.setProperty(this.options.property, newValue);
      }
      this.parent?.setDirtyCanvas(true, true);
    }
  }

  on(eventName, listener) {
    this.eventEmitter.on(eventName, listener);
  }

  off(eventName, listener) {
    this.eventEmitter.off(eventName, listener);
  }

  triggerParentResetSize() {
    if (this.parent) this.parent.resetSize();
  }
}

export class DisplayWidget extends WidgetBase {
  static capability = DISPLAY;

  constructor(name, parent, options = {}) {
    super(name, parent, options);

    if (options.content) {
      this.registerForContentUpdates(parent, options.content);
    }
  }

  registerForContentUpdates(parent, content) {
    if (!content || !parent) return;
    parent.on("nodeStatusUpdated", (status) => {
      const value = status.contents?.find(
        (contentUpdate) => contentUpdate.name === content.name
      )?.value;
      this.value = value;
      parent?.setDirtyCanvas(true, true);
    });
  }
}

export class ControlWidget extends WidgetBase {
  static capability = CONTROL;

  constructor(name, parent, options = {}) {
    super(name, parent, options);
  }

  // setDefaultValue(value) {
  //   this.value = value;

  //   if (this.#parent && this.#property) {
  //     this.#parent?.setPropertyDefaultValue(this.#property, value);
  //     this.#parent?.setDirtyCanvas(true, true);
  //   }
  // }
}
