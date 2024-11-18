import { LiteGraph, LGraph } from "mobject-litegraph";
import { EventEmitter } from "../utils/event-emitter.js";
import { LiteGraphConverter } from "../utils/litegraph-converter.js";

export class Graph extends LGraph {
  #uuid = null;

  constructor(o) {
    super(o);
    this.eventEmitter = new EventEmitter();
    this.#uuid = null;
    this.isConfiguring = false;
    this.updateGraphUuid();
  }

  on(eventName, listener) {
    this.eventEmitter.on(eventName, listener);
  }

  off(eventName, listener) {
    this.eventEmitter.off(eventName, listener);
  }

  get uuid() {
    return this.#uuid;
  }

  set uuid(uuid) {
    this.#uuid = uuid;
  }

  get isEmpty() {
    return this._nodes.length === 0;
  }

  updateGraphUuid() {
    this.#uuid = LiteGraph.uuidv4();
  }

  update(status) {
    const statusMap =
      status && Array.isArray(status.nodes)
        ? new Map(status.nodes.map((nodeStatus) => [nodeStatus.id, nodeStatus]))
        : new Map();

    this._nodes.forEach((node) => {
      const nodeStatus = statusMap.get(node.id) || {};
      node.update(nodeStatus);
    });
  }

  configure(data, keep_old) {
    this.eventEmitter.emit("beforeGraphConfigure", this);
    this.isConfiguring = true;
    super.configure(data, keep_old);
    this.isConfiguring = false;
    this.eventEmitter.emit("graphConfigure", this);
  }

  serialize() {
    let data = super.serialize();
    data.uuid = this.#uuid;
    return data;
  }

  exportForBackend() {
    return LiteGraphConverter.Convert(this);
  }

  clear() {
    super.clear();
    if (this.eventEmitter) {
      this.eventEmitter.emit("clear", this);
    }
  }

  onNodeAdded(node) {
    if (!this.isConfiguring) {
      this.updateGraphUuid();
    }

    node.on("propertyChanged", this.emitOnNodePropertyChange.bind(this));
    this.eventEmitter.emit("nodeAdded", this, node);
  }

  onNodeRemoved(node) {
    if (!this.isConfiguring) {
      this.updateGraphUuid();
    }
    node.off("propertyChanged", this.emitOnNodePropertyChange.bind(this));
    this.eventEmitter.emit("nodeRemoved", this, node);
  }

  onConnectionChange(node) {
    if (!this.isConfiguring) {
      this.updateGraphUuid();
    }
    this.eventEmitter.emit("connectionChange", this, node);
  }

  onBeforeChange() {
    this.eventEmitter.emit("beforeChange", this);
  }

  onAfterChange() {
    this.eventEmitter.emit("afterChange", this);
  }

  emitOnNodePropertyChange(node, name, value, prevValue) {
    this.eventEmitter.emit(
      "nodePropertyChanged",
      this,
      node,
      name,
      value,
      prevValue
    );
  }
}
