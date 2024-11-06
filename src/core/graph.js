import { LiteGraph, LGraph } from "mobject-litegraph";

export class Graph extends LGraph {
  #uuid = null;

  constructor(o) {
    super(o);
    this.#uuid = this.generateNewUuid();
    this.registerCallbackHandler("onSerialize", (oCbInfo, data) => {
      data.uuid = this.#uuid;
    });
  }

  get uuid() {
    return this.#uuid;
  }

  generateNewUuid() {
    this.#uuid = LiteGraph.uuidv4();
    return this.#uuid;
  }

  update(status) {
    if (status && Array.isArray(status.nodes)) {
      status.nodes.forEach((nodeStatus) => {
        const node = this.getNodeById(nodeStatus.id);
        if (node) {
          node.update(nodeStatus);
        }
      });
    }
  }

  exportForBackend() {}

  beforeChange() {
    // before a graph change
  }
  afterChange() {
    // after a graph change
  }
}
