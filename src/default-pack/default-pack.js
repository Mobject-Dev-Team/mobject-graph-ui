import { GraphFramework } from "../core/graph-framework.js";
import { GetBlueprintsExtension } from "./editor-extensions/get-blueprints/get-blueprints.js";
import { FileOperationsExtension } from "./editor-extensions/file-operations/file-operations.js";
import { EditorAutoUpdateExtension } from "./editor-extensions/auto-update/editor-auto-update.js";
import { ShowExecuteOrderExtension } from "./editor-extensions/show-execute-order/show-execute-order.js";
import { PreExecutionCheckExtension } from "./node-extensions/pre-execution-check/pre-execution-check.js";

export class DefaultPack {
  install(graphFramework = new GraphFramework(), options) {
    this.registerBundledPacks(graphFramework, options);
    this.registerGraphExtensions(graphFramework, options);
    this.registerCanvasExtensions(graphFramework, options);
    this.registerEditorExtensions(graphFramework, options);
    this.registerNodeExtensions(graphFramework, options);
    this.registerWidgets(graphFramework, options);
  }

  registerBundledPacks(graphFramework, options = {}) {
    // you can ship other packs within packs.  we call these bundled packs.
    // this just triggers install on the bundled pack.
  }

  registerGraphExtensions(graphFramework, options = {}) {
    // add any default graph extensions here.  It's good practice to make
    // these switchable via the options object.
    // graphFramework.registerGraphExtension(...);
  }

  registerCanvasExtensions(graphFramework, options = {}) {
    // add any default canvas extensions here.  It's good practice to make
    // these switchable via the options object.
    // graphFramework.registerCanvasExtension(...);
  }

  registerEditorExtensions(graphFramework, options = {}) {
    // default settings
    const defaults = {
      GetBlueprintsExtension: true,
      FileOperationsExtension: true,
      EditorAutoUpdateExtension: true,
      ShowExecuteOrderExtension: true,
    };
    const settings = { ...defaults, ...options };

    // add any default canvas extensions here.  It's good practice to make
    // these switchable via the options object.
    if (settings.GetBlueprintsExtension) {
      graphFramework.registerEditorExtension(GetBlueprintsExtension);
    }
    if (settings.FileOperationsExtension) {
      graphFramework.registerEditorExtension(FileOperationsExtension);
    }
    if (settings.EditorAutoUpdateExtension) {
      graphFramework.registerEditorExtension(EditorAutoUpdateExtension);
    }
    if (settings.ShowExecuteOrderExtension) {
      graphFramework.registerEditorExtension(ShowExecuteOrderExtension);
    }
  }

  registerNodeExtensions(graphFramework, options = {}) {
    // default settings
    const defaults = {
      PreExecutionCheckExtension: true,
    };
    const settings = { ...defaults, ...options };

    // add any default node extensions here.  It's good practice to make
    // these switchable via the options object.
    if (settings.PreExecutionCheckExtension) {
      graphFramework.registerNodeExtension(PreExecutionCheckExtension);
    }
  }
  registerWidgets(graphFramework, options = {}) {
    // add any default widgets here.  It's good practice to make
    // these switchable via the options object.
    // graphFramework.registerWidgetType(...);
  }

  registerFileAssociation(graphFramework, options = {}) {
    // add any default fill associations here.  It's good practice to make
    // these switchable via the options object.
    // graphFramework.registerFileAssociation(
    //   ["jpg", "png", "bmp"], // array of file types
    //   "Demo/MyNode", // node which will handle the drop
    //   "myParameter" // parameter which will handle the drop
    // );
  }
}
