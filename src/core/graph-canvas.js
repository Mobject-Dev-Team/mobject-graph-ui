import { EventEmitter } from "../utils/event-emitter.js";
import { LGraphCanvas } from "mobject-litegraph";

export class GraphCanvas extends LGraphCanvas {
  eventEmitter = new EventEmitter();

  constructor(canvas, graph, options) {
    super(canvas, graph, options);
  }

  on(eventName, listener) {
    this.eventEmitter.on(eventName, listener);
  }

  off(eventName, listener) {
    this.eventEmitter.off(eventName, listener);
  }

  setDefaultViewpoint() {
    if (!this.graph || !this.graph._nodes || this.graph._nodes.length === 0) {
      this.ds.offset[0] = 0;
      this.ds.offset[1] = 0;
      this.ds.scale = 1;
      this.setDirty(true, true);
      return;
    }

    const nodes = this.graph._nodes;

    let minX, minY;
    let temp;

    nodes.forEach((node) => {
      const bounding = node.getBounding(temp, true);

      if (minX === undefined || minY === undefined) {
        minX = bounding[0];
        minY = bounding[1];
      } else {
        minX = Math.min(minX, bounding[0]);
        minY = Math.min(minY, bounding[1]);
      }
    });

    this.ds.offset[0] = -minX + 10;
    this.ds.offset[1] = -minY + 10;
    this.ds.scale = 1;
    this.setDirty(true, true);
  }
}
