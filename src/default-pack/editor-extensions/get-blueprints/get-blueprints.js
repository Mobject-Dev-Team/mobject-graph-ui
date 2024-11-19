import { ToolbarButton } from "../../../editor-controls/toolbar-button.js";
import { GraphFramework } from "../../../core/graph-framework.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

export class GetBlueprintsExtension {
  constructor(editor) {
    this.editor = editor;
    this.connection = editor.getConnection();
    this.setupToolbarControls();
  }

  setupToolbarControls() {
    const graphFramework = new GraphFramework();
    const getBlueprintsButton = new ToolbarButton(
      "GetBlueprints",
      "Blueprints",
      "fa-solid fa-layer-group",
      async () => {
        console.log("api get blueprints");
        getBlueprintsButton.disable();
        try {
          const result = await this.connection.send("GetBlueprints");
          console.log("api get blueprints reply", result);
          graphFramework.installNodeBlueprints(result.blueprints);

          if (result?.blueprints?.length) {
            this.editor.showSuccess(
              "Blueprints loaded successfully",
              `${result.blueprints.length} blueprints were received.`
            );
          }
        } catch (error) {
          this.editor.showError("Failed to get blueprints", error);
        } finally {
          getBlueprintsButton.enable();
        }
      },
      "Get Blueprints"
    );

    this.editor.addToolbarControl(getBlueprintsButton);
  }
}
