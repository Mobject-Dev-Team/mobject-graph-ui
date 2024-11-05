import { GraphFramework } from "../core/graph-framework.js";

export class DefaultPack {
  static install(graphFramework = new GraphFramework(), options) {
    this.registerBundledPacks(graphFramework, options);
    this.registerGraphExtensions(graphFramework, options);
    this.registerCanvasExtension(graphFramework, options);
    this.registerEditorExtensions(graphFramework, options);
    this.registerNodeExtensions(graphFramework, options);
    this.registerWidgets(graphFramework, options);
  }

  static registerBundledPacks(graphFramework, options = {}) {
    // you can ship other packs within packs.  we call these bundled packs.
    // this just triggers install on the bundled pack.
  }

  static registerGraphExtensions(graphFramework, options = {}) {
    // add any default graph extensions here.  It's good practice to make
    // these switchable via the options object.
    // graphFramework.registerNodeExtensions(...);
  }

  static registerCanvasExtension(graphFramework, options = {}) {
    // add any default canvas extensions here.  It's good practice to make
    // these switchable via the options object.
    // graphFramework.registerCanvasExtension(...);
  }

  static registerEditorExtensions(graphFramework, options = {}) {
    // add any default editor extensions here.  It's good practice to make
    // these switchable via the options object.
    // graphFramework.registerEditorExtensions(...);
  }

  static registerNodeExtensions(graphFramework, options = {}) {
    // add any default node extensions here.  It's good practice to make
    // these switchable via the options object.
    // graphFramework.registerNodeExtensions(...);
  }
  static registerWidgets(graphFramework, options = {}) {
    // add any default widgets here.  It's good practice to make
    // these switchable via the options object.
    // graphFramework.registerWidgetType(...);
  }
}
