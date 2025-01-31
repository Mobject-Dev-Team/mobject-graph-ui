import { GraphFramework } from "../../../core/graph-framework.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

export class GetBlueprintsExtension {
  constructor(editor) {
    this.editor = editor;
    this.getBlueprintsButton;

    this.editor.on("toolbarReady", () => {
      this.getBlueprintsButton = this.editor.addButton("GetBlueprints", {
        label: "Blueprints",
        iconClass: "fa-solid fa-layer-group",
        onClick: this.onBlueprintsClicked.bind(this),
        tooltip: "Get Blueprints",
        section: "left",
      });

      this.onBlueprintsClicked();
    });
  }

  async onBlueprintsClicked() {
    const graphFramework = new GraphFramework();
    LiteGraph.log_log("api get blueprints");
    this.editor.showInfo(
      "Loading Blueprints",
      "Please wait while we fetch the blueprints from the server."
    );
    this.getBlueprintsButton.disable();
    try {
      const result = await this.editor.apiSend("GetBlueprints");
      LiteGraph.log_log("api get blueprints reply", result);
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
      this.getBlueprintsButton.enable();
    }
  }
}
