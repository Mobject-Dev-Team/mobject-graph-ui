import { LiteGraph, LGraph } from "mobject-litegraph";
import { EventEmitter } from "../utils/event-emitter.js";
import { LiteGraphConverter } from "../utils/litegraph-converter.js";

export class Graph extends LGraph {
  #uuid = null;

  constructor(o) {
    super(o);
    this.eventEmitter = new EventEmitter();
    this.#uuid = null;
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

  get isEmpty() {
    return this._nodes.length === 0;
  }

  updateGraphUuid() {
    this.#uuid = LiteGraph.uuidv4();
  }

  // update(status) {
  //   if (status && Array.isArray(status.nodes)) {
  //     status.nodes.forEach((nodeStatus) => {
  //       const node = this.getNodeById(nodeStatus.id);
  //       if (node) {
  //         node.update(nodeStatus);
  //       }
  //     });
  //   }
  // }

  update(status) {
    // Create a map for quick access to status by node ID, if status exists and contains nodes
    const statusMap =
      status && Array.isArray(status.nodes)
        ? new Map(status.nodes.map((nodeStatus) => [nodeStatus.id, nodeStatus]))
        : new Map();

    // Iterate over all nodes and call update with either the corresponding status or an empty object
    this._nodes.forEach((node) => {
      const nodeStatus = statusMap.get(node.id) || {};
      node.update(nodeStatus);
    });
  }

  serialize() {
    let data = super.serialize();
    data.uuid = this.#uuid;
    return data;
  }

  exportForBackend() {
    return LiteGraphConverter.Convert(this);
  }

  onNodeAdded(node) {
    this.updateGraphUuid();
    node.on("propertyChanged", this.emitOnNodePropertyChange.bind(this));
    this.eventEmitter.emit("nodeAdded", this, node);
  }

  onNodeRemoved(node) {
    this.updateGraphUuid();
    node.off("propertyChanged", this.emitOnNodePropertyChange.bind(this));
    this.eventEmitter.emit("nodeRemoved", this, node);
  }

  onConnectionChange(node) {
    this.updateGraphUuid();
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
