import { LiteGraph } from "mobject-litegraph";
import { Widgets } from "./widgets.js";
import { NodeClassFactory } from "./node-class-factory.js";
import {
  NodeInputPortBlueprintHandler,
  NodeOutputPortBlueprintHandler,
  NodeParametersBlueprintHandler,
  NodeContentsBlueprintHandler,
} from "./node-blueprint-handlers.js";

export class GraphFramework {
  static instance;

  constructor() {
    if (GraphFramework.instance) {
      return GraphFramework.instance;
    }

    if (typeof LiteGraph === "undefined") {
      throw new Error("LiteGraph is not available in the global scope.");
    }

    this.liteGraph = LiteGraph;
    this.liteGraph.initialize();

    this.nodeExtensions = [];
    this.canvasExtensions = [];
    this.editorExtensions = [];
    this.widgets = new Widgets();

    this.nodeClassFactory = new NodeClassFactory(this.widgets);
    this.nodeClassFactory.registerHandler(new NodeInputPortBlueprintHandler());
    this.nodeClassFactory.registerHandler(new NodeOutputPortBlueprintHandler());
    this.nodeClassFactory.registerHandler(
      new NodeParametersBlueprintHandler(this.widgets)
    );
    this.nodeClassFactory.registerHandler(
      new NodeContentsBlueprintHandler(this.widgets)
    );

    this.liteGraph.computeTextWidth = function (text, fontSize) {
      if (!text) {
        return 0;
      }

      let t = text.toString();

      if (typeof fontSize === "undefined")
        return this.NODE_TEXT_SIZE * t.length * 0.6;

      return this.NODE_TEXT_SIZE * t.length * fontSize;
    };

    GraphFramework.instance = new Proxy(this, {
      get: (target, property, receiver) => {
        if (Reflect.has(target, property)) {
          return Reflect.get(target, property, receiver);
        } else {
          return (...args) => {
            if (typeof target.liteGraph[property] === "function") {
              return target.liteGraph[property].apply(target.liteGraph, args);
            } else {
              return target.liteGraph[property];
            }
          };
        }
      },
    });

    return GraphFramework.instance;
  }

  install(graphPack, options) {
    graphPack.install(this, options);
  }

  installNodeBlueprints(blueprints) {
    if (blueprints && Array.isArray(blueprints)) {
      blueprints.forEach((blueprint) => {
        this.installNodeBlueprint(blueprint);
      });
    }
  }

  installNodeBlueprint(blueprint) {
    if (blueprint) {
      const nodeType =
        this.nodeClassFactory.getNodeTypeFromBlueprint(blueprint);
      if (!nodeType) {
        this.log_warn("Failed to determine node type from blueprint.");
        return;
      }

      const nodeClass = this.nodeClassFactory.create(blueprint);
      if (!nodeClass) {
        this.log_warn(
          "Unable to create node class from blueprint.",
          nodeType,
          blueprint
        );
        return;
      }
      this.registerNodeType(nodeType, nodeClass);
    } else {
      this.log_warn("No blueprint provided to installNodeBlueprint.");
    }
  }

  registerWidgetType(Widget, type, identifier) {
    this.widgets.add(Widget, type, identifier);
  }

  registerFileAssociation(fileExtensions, nodeType, widgetName = null) {
    for (let fileExtension of fileExtensions) {
      if (fileExtension && typeof fileExtension === "string") {
        this.liteGraph.node_types_by_file_extension[
          fileExtension.toLowerCase()
        ] = {
          type: nodeType,
          widgetName,
        };
      }
    }
  }

  registerNodeExtension(extension) {
    this.nodeExtensions.push(extension);
  }

  registerCanvasExtension(extension) {
    this.canvasExtensions.push(extension);
  }

  registerEditorExtension(extension) {
    this.editorExtensions.push(extension);
  }

  applyExtensions(type, instance) {
    let extensions;
    switch (type) {
      case "node":
        extensions = this.nodeExtensions;
        break;
      case "canvas":
        extensions = this.canvasExtensions;
        break;
      case "editor":
        extensions = this.editorExtensions;
        break;
      default:
        throw new Error(`Unknown extension type: ${type}`);
    }

    extensions.forEach((extension) => instance.applyExtension(extension));
  }

  getVersion() {
    return this.liteGraph.VERSION;
  }
}
