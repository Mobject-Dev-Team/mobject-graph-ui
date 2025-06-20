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
    this.port_name = null;

    if (this.parent && this.options && this.options.parameter) {
      const metadata = this.options.parameter.metadata || [];
      const suppressInput = metadata.some(
        (item) => item.name === "suppressInput" && item.value === true
      );

      if (!suppressInput) {
        const type = getType(options.parameter.datatype);
        const port = (this.port = this.parent.addInput(name, type));
        port.widget_name = this.name;
        this.port_name = port.name;
      }
    }
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
      this.requestRedraw();
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

  requestRedraw() {
    this.parent?.requestRedraw();
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
}

function getType(datatype) {
  let typeString = datatype.identifier
    ? `${datatype.typeName} (${datatype.identifier})`
    : datatype.typeName;

  // Check if there's a baseDatatype and append it recursively
  if (datatype.baseDatatype) {
    typeString += `,${getType(datatype.baseDatatype)}`;
  }

  return typeString;
}
