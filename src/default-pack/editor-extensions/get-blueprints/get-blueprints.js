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
      "Get Blueprints",
      "fa-solid fa-layer-group",
      async () => {
        console.log("api get blueprints");
        getBlueprintsButton.disable();
        try {
          const result = await this.connection.send("GetBlueprints");
          console.log("api get blueprints reply", result);
          graphFramework.installNodeBlueprints(result.blueprints);
        } catch (error) {
          console.error("api get blueprints failed:", error);
        } finally {
          getBlueprintsButton.enable();
        }
      }
    );

    this.editor.addToolbarControl(getBlueprintsButton);
  }
}
