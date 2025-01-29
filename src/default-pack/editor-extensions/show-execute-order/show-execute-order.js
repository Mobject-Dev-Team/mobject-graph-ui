export class ShowExecuteOrderExtension {
  constructor(editor) {
    this.editor = editor;
    this.editorCanvas = editor.getGraphCanvas();

    this.editor.on("toolbarReady", () => {
      this.getBlueprintsButton = this.editor.addButton("ToggleExecuteOrder", {
        label: "",
        iconClass: "fa-solid fa-share-nodes",
        onClick: this.onToggleExecuteOrderClicked.bind(this),
        tooltip: "Toggle Execution Order Display",
        section: "left",
      });
    });
  }

  onToggleExecuteOrderClicked() {
    this.editorCanvas.render_execution_order =
      !this.editorCanvas.render_execution_order;
    this.editorCanvas.setDirty(true, true);
  }
}
