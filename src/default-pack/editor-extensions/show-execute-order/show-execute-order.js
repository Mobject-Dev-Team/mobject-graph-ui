import { ToolbarButton } from "../../../editor-controls/toolbar-button.js";

export class ShowExecuteOrderExtension {
  constructor(editor) {
    this.editor = editor;
    this.editorCanvas = editor.getGraphCanvas();
    this.setupToolbarControls();
  }

  setupToolbarControls() {
    const getBlueprintsButton = new ToolbarButton(
      "ToggleExecuteOrder",
      "",
      "fas fa-share-nodes",
      () => {
        this.editorCanvas.render_execution_order =
          !this.editorCanvas.render_execution_order;
        this.editorCanvas.setDirty(true, true);
      },
      "Toggle Execution Order Display"
    );

    this.editor.addToolbarControl(getBlueprintsButton);
  }
}
