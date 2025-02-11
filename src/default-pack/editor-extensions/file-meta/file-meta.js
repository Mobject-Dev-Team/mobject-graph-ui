import "./file-meta.css";
import UseBootstrapTag from "../../../editor-utils/use-bootstrap-tag/use-bootstrap-tag.esm";
import "../../../editor-utils/use-bootstrap-tag/use-bootstrap-tag.css";

export class FileMetaExtension {
  constructor(editor) {
    this.editor = editor;
    this.setupEditorListeners();
  }

  setupEditorListeners() {
    this.editor.on("toolbarReady", () => {
      this.fileMetaDisplayControl = new FileMetaDisplayControl(
        "FileMetaDisplayControl",
        this.onClick.bind(this)
      );

      this.editor.addToolbarControl(this.fileMetaDisplayControl, {
        section: "right",
      });

      this.editor.on("graphSet", (graph) => {
        this.fileMetaDisplayControl.update(graph);
      });

      this.editor.on("graphLoaded", (graph) => {
        this.fileMetaDisplayControl.update(graph);
      });

      this.editor.on("graphCleared", (graph) => {
        this.fileMetaDisplayControl.update(graph);
      });
    });
  }

  onClick() {
    const graph = this.editor.graph;
    if (!graph) {
      return;
    }

    const name =
      (graph.extra && graph.extra.filemeta && graph.extra.filemeta.name) || "";
    const description =
      (graph.extra &&
        graph.extra.filemeta &&
        graph.extra.filemeta.description) ||
      "";
    const tags =
      (graph.extra && graph.extra.filemeta && graph.extra.filemeta.tags) || [];
    const tagsString = tags.join(", ");

    this.editor.showModal({
      title: "Edit Graph Details",
      body: `
    <form id="metadataForm">
        <div class="mgui mb-3">
          <label for="fileMetaName" class="form-label">Name</label>
          <input type="text" class="form-control" id="fileMetaName" placeholder="Enter name" required value="${name}" autofocus>
        </div>
        <div class="mgui mb-3">
          <label for="fileMetaDescription" class="form-label">Description</label>
          <textarea class="form-control" id="fileMetaDescription" rows="2" placeholder="Enter description">${description}</textarea>
        </div>
        <div class="mgui mb-3 active">
          <label for="fileMetaTags" class="form-label">Tags</label>
          <div class="input-wrapper">
            <input type="text" class="form-control active" id="fileMetaTags" placeholder="Enter tags (comma separated)" value="${tagsString}" 
            data-ub-tag-separator=","
            data-ub-tag-variant="primary"
            data-ub-tag-x-position="left"
            data-ub-tag-no-input-onblur>
          </div>
        </div>
        <button type="submit" class="d-none"></button>
      </form>

  `,
      buttons: [
        {
          label: "Cancel",
          type: "secondary",
          onClick: (modal) => {
            modal.hide();
          },
        },
        {
          label: "Ok",
          type: "primary",
          onClick: (modal) => {
            const name = modal._element.querySelector("#fileMetaName").value;
            const description = modal._element.querySelector(
              "#fileMetaDescription"
            ).value;
            const tags = modal._element.querySelector("#fileMetaTags").value;

            const graph = this.editor.graph;
            graph.extra.filemeta = graph.extra.filemeta || {};
            graph.extra.filemeta.name = (name.trim() && name) || "Untitled";
            graph.extra.filemeta.description = description;
            graph.extra.filemeta.tags = tags
              .split(",")
              .map((tag) => tag.trim());

            this.fileMetaDisplayControl.update(graph);

            modal.hide();
          },
        },
      ],
      preShow: (modal, modalElement) => {
        const example = UseBootstrapTag(
          modal._element.querySelector("#fileMetaTags")
        );
      },
    });
  }
}

class FileMetaDisplayControl {
  constructor(name, onClickSummary) {
    this.container = document.createElement("div");
    this.container.id = name;

    this.container.innerHTML = `
      <div class="metadata-summary" style="cursor: pointer;">
        <div class="d-flex align-items-center">
          <span class="summary-name text-truncate">Untitled</span>
          <i class="far fa-edit edit-icon" style="margin-left: 10px;"></i>
        </div>
      </div>`;

    this.summaryName = this.container.querySelector(".summary-name");
    this.metadataSummary = this.container.querySelector(".metadata-summary");

    if (typeof onClickSummary === "function") {
      this.metadataSummary.addEventListener("click", () => onClickSummary());
    }
  }

  render() {
    return this.container;
  }

  update(graph) {
    const fileMeta = (graph && graph.extra && graph.extra.filemeta) || {};
    this.summaryName.textContent = fileMeta.name || "Untitled";

    this.metadataSummary.onclick = () => {
      if (typeof this.onClickSummary === "function") {
        this.onClickSummary();
      }
    };
  }
}
