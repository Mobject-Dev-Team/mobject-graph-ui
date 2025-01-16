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
}
