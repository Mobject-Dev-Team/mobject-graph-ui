import { ToolbarButton } from "../../../editor-controls/toolbar-button.js";
import { LiteGraph } from "mobject-litegraph";

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
      },
      "Save Graph"
    );

    this.editor.addToolbarControl(newGraphButton);
    this.editor.addToolbarControl(openGraphButton);
    this.editor.addToolbarControl(saveGraphButton);
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
