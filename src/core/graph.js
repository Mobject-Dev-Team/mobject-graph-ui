import { LiteGraph, LGraph } from "mobject-litegraph";
import { EventEmitter } from "../utils/event-emitter.js";
import { LiteGraphConverter } from "../utils/litegraph-converter.js";

export class Graph extends LGraph {
  #uuid = null;
  emitOnNodePropertyChangeBound = null;

  constructor(o) {
    super(o);
    this.eventEmitter = new EventEmitter();
    this.#uuid = null;
    this.isConfiguring = false;
    this.emitOnNodePropertyChangeBound = this.emitOnNodePropertyChange.bind(this);
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

  getMissingNodeTypes(data) {
    const nodes = data.nodes || [];
    const missingNodeTypes = [];

    nodes.forEach((node) => {
      const nodeType = node.type;
      const nodeTypeInstance = LiteGraph.getNodeType(nodeType);

      if (!nodeTypeInstance) {
        missingNodeTypes.push(nodeType);
      }
    });

    return missingNodeTypes.length > 0 ? [...new Set(missingNodeTypes)] : null;
  }

  configure(data, keep_old) {
    // check for missing node types
    const missingTypes = this.getMissingNodeTypes(data);
    if (missingTypes) {
      const missingTypesList = missingTypes
        .map((type) => `<li>${type}</li>`)
        .join("");

      const errorMessage = `The following node types are missing:<ul>${missingTypesList}</ul>Please check that the required blueprints are loaded.`;
      throw new Error(`${errorMessage}`);
    }

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

    node.on("propertyChanged", this.emitOnNodePropertyChangeBound);
    this.eventEmitter.emit("nodeAdded", this, node);
  }

  onNodeRemoved(node) {
    if (!this.isConfiguring) {
      this.updateGraphUuid();
    }
    node.off("propertyChanged", this.emitOnNodePropertyChangeBound);
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
