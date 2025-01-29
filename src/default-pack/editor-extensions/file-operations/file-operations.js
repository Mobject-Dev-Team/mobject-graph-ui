import { LiteGraph } from "mobject-litegraph";

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

      const missingTypes = getMissingNodeTypes(configuration);
      if (missingTypes) {
        const missingTypesList = missingTypes
          .map((type) => `<li>${type}</li>`)
          .join("");
        this.editor.showError(
          "Open Failed : Missing Node Types",
          `The following node types are missing:<ul>${missingTypesList}</ul>Please check that the required blueprints are loaded.`
        );
        return;
      }

      this.currentGraph.configure(configuration);
    } catch (error) {
      this.editor.showError(
        "Open Failed : Exception was thrown",
        "There was an error while trying to open the file. Please check the console for more information."
      );
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

function getMissingNodeTypes(data) {
  const nodes = data.nodes || [];
  const missingNodeTypes = [];

  nodes.forEach((node) => {
    const nodeType = node.type;
    const nodeTypeInstance = LiteGraph.getNodeType(nodeType);

    if (!nodeTypeInstance) {
      missingNodeTypes.push(nodeType);
    }
  });

  return missingNodeTypes.length > 0 ? [...new Set(missingNodeTypes)] : null;
}
