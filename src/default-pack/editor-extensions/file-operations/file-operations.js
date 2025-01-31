export class FileOperationsExtension {
  constructor(editor) {
    this.editor = editor;
    this.currentGraph = this.editor.getGraph();
    this.setupEditorListeners();
  }

  setupEditorListeners() {
    this.editor.on("graphSet", (newGraph) => {
      this.currentGraph = newGraph;
    });

    this.editor.on("toolbarReady", () => {
      this.editor.addButton("New", {
        label: "New",
        iconClass: "fa-solid fa-file",
        onClick: this.onNewClicked.bind(this),
        tooltip: "New Graph",
        section: "left",
        group: "fileOperations",
      });
      this.editor.addButton("Open", {
        label: "Open",
        iconClass: "fa-solid fa-folder-open",
        onClick: this.onOpenClicked.bind(this),
        tooltip: "Open Graph",
        section: "left",
        group: "fileOperations",
      });
      this.editor.addButton("Save", {
        label: "Save",
        iconClass: "fa-solid fa-floppy-disk",
        onClick: this.onSaveClicked.bind(this),
        tooltip: "Save Graph",
        section: "left",
        group: "fileOperations",
      });
    });
  }

  onNewClicked() {
    if (!this.currentGraph) {
      return;
    }
    this.currentGraph.clear();
  }

  async onOpenClicked() {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: "Graph Files",
            accept: { "application/mgraph": [".mgraph"] },
          },
        ],
        multiple: false,
      });

      const file = await fileHandle.getFile();
      const contents = await file.text();
      const configuration = JSON.parse(contents);

      try {
        this.currentGraph.configure(configuration);
        this.editor.showSuccess(
          `Graph Loaded`,
          `Successfully loaded "${file.name}"`
        );
      } catch (error) {
        this.editor.showError(
          "Open Failed : Configuration Error",
          `Error during graph configuration: ${error.message}`
        );
      }
    } catch (error) {
      this.editor.showError(
        "Open Failed : File Access",
        "There was an error while trying to access or read the file. Please check the console for more information."
      );
      console.error(error);
      return;
    }
  }

  async onSaveClicked() {
    try {
      const fileHandle = await window.showSaveFilePicker({
        types: [
          {
            description: "Graph Files",
            accept: { "application/mgraph": [".mgraph"] },
          },
        ],
      });

      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(this.currentGraph.serialize()));
      await writable.close();
    } catch (error) {
      console.error("Failed to save file:", error);
    }
  }
}
