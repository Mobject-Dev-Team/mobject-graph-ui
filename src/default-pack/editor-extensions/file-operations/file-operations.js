export class FileOperationsExtension {
  constructor(editor) {
    this.editor = editor;
    this.setupEditorListeners();
  }

  setupEditorListeners() {
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
    this.editor.clearGraph();
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
        this.editor.loadGraph(configuration);
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
      if (error.name === "AbortError") {
        return;
      }
      this.editor.showError(
        "Open Failed : File Access",
        "There was an error while trying to access or read the file. Please check the console for more information."
      );
      console.error(error);
      return;
    }
  }

  sanitizeFilename(filename) {
    return filename.replace(/[\/\\:*?"<>|]/g, "");
  }

  async onSaveClicked() {
    try {
      const serializedGraph = this.editor.serializeGraph();
      const saveData = JSON.stringify(serializedGraph);
      const defaultFileName = "untitled";
      let fileName = defaultFileName;

      if (
        serializedGraph &&
        serializedGraph.extra &&
        serializedGraph.extra.filemeta &&
        serializedGraph.extra.filemeta.name
      ) {
        console.log("here");
        const unsanitizedFileName = serializedGraph.extra.filemeta.name;
        fileName = this.sanitizeFilename(unsanitizedFileName);
        console.log(fileName);
        if (!fileName) {
          fileName = defaultFileName;
        }
      }

      const fileHandle = await window.showSaveFilePicker({
        suggestedName: fileName + ".mgraph",
        types: [
          {
            description: "Graph Files",
            accept: { "application/mgraph": [".mgraph"] },
          },
        ],
      });

      const writable = await fileHandle.createWritable();
      await writable.write(saveData);
      await writable.close();
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      } else {
        console.error("Failed to save file:", error);
      }
    }
  }
}
