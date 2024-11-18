import { ToolbarButton } from "../../../editor-controls/toolbar-button.js";

export class FileOperationsExtension {
  constructor(editor) {
    this.editor = editor;
    this.currentGraph = null;
    this.editorCanvas = editor.getGraphCanvas();
    this.setupEditorListeners();
    this.setupToolbarControls();
    this.switchGraph(this.editor.getGraph());
  }

  setupEditorListeners() {
    this.editor.on("graphSet", (newGraph) => {
      this.switchGraph(newGraph);
    });
  }

  switchGraph(newGraph) {
    this.currentGraph = newGraph;
  }

  setupToolbarControls() {
    const newGraphButton = new ToolbarButton(
      "New",
      "New",
      "fa-solid fa-file",
      () => {
        if (!this.currentGraph) {
          return;
        }
        this.currentGraph.clear();
      },
      "New Graph"
    );
    const openGraphButton = new ToolbarButton(
      "Open",
      "Open",
      "fa-solid fa-folder-open",
      async () => {
        try {
          const [fileHandle] = await window.showOpenFilePicker({
            types: [
              {
                description: "Graph Files",
                accept: { "application/json": [".tcgraph"] },
              },
            ],
            multiple: false,
          });

          const file = await fileHandle.getFile();
          const contents = await file.text();
          this.currentGraph.configure(JSON.parse(contents));
        } catch (error) {
          console.error(
            "Failed to open file, check that the required blueprints are loaded"
          );
        }
      },
      "Open Graph"
    );
    const saveGraphButton = new ToolbarButton(
      "Save",
      "Save",
      "fa-solid fa-floppy-disk",
      async () => {
        try {
          const fileHandle = await window.showSaveFilePicker({
            types: [
              {
                description: "Graph Files",
                accept: { "application/json": [".tcgraph"] },
              },
            ],
          });

          const writable = await fileHandle.createWritable();
          await writable.write(JSON.stringify(this.currentGraph.serialize()));
          await writable.close();
        } catch (error) {
          console.error("Failed to save file:", error);
        }
      },
      "Save Graph"
    );

    this.editor.addToolbarControl(newGraphButton);
    this.editor.addToolbarControl(openGraphButton);
    this.editor.addToolbarControl(saveGraphButton);
  }
}
