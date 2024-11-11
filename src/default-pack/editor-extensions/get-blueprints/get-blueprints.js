import { ToolbarButton } from "../../../editor-controls/toolbar-button.js";
import { GraphFramework } from "../../../core/graph-framework.js";

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
      null,
      async () => {
        console.log("api get blueprints");
        try {
          const result = await this.connection.send("GetBlueprints");
          console.log("api get blueprints reply", result);
          graphFramework.installNodeBlueprints(result.blueprints);
        } catch (error) {
          console.error("api get blueprints failed:", error);
        }
      }
    );

    this.editor.addToolbarControl(getBlueprintsButton);
  }
}