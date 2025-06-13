import "./server-examples-editor-extension.css";

export class ServerExamplesEditorExtension {
  constructor(editor, options = {}) {
    this.editor = editor;
    this.examplesPath =
      options.ServerExamplesEditorExtensionUrl || "./example/list";
    this.setupEditorListeners();
    this.examples = [];

    this.modal = null;
    this.searchInputField = null;
    this.resultsContainer = null;
    this.resultsCount = null;
    this.searchInTitle = null;
    this.searchInDescription = null;
    this.searchInTags = null;
    this.searchInNodes = null;
    this.sortSelect = null;
    this.currentSortMode = "latest";

    // initial state of the search scope
    localStorage.setItem("searchInTitle", "true");
    localStorage.setItem("searchInDescription", "true");
    localStorage.setItem("searchInTags", "true");
    localStorage.setItem("searchInNodes", "false");
  }

  setupEditorListeners() {
    this.editor.on("toolbarReady", () => {
      this.editor.addButton("Examples", {
        label: "Examples",
        iconClass: "fa-solid fa-book-open",
        onClick: this.onExampleButtonClicked.bind(this),
        tooltip: "Open Examples Search",
        section: "left",
      });

      const _this = this; // Preserve the context of 'this' for the fetch function

      function fetchExamplesWithRetry(retries = 20, delay = 2000) {
        fetch(_this.examplesPath)
          .then((response) => {
            if (response.status === 503) {
              if (retries > 0) {
                console.warn("Server busy. Retrying in 2 seconds...");
                setTimeout(
                  () => fetchExamplesWithRetry(retries - 1, delay),
                  delay
                );
              } else {
                throw new Error("Maximum retries reached. Server still busy.");
              }
            } else if (!response.ok) {
              throw new Error(
                `Server responded with status: ${response.status}`
              );
            } else {
              return response.json();
            }
          })
          .then((data) => {
            if (data) {
              const receivedExamples = data.examples.map((example) => ({
                name: example?.name || "Untitled Example",
                description: example?.description || "No description available",
                tags: example?.tags || [],
                url: example?.url || "#",
                nodes: example?.nodes || [],
                lastModified: example?.lastModified || null,
              }));
              _this.examples = receivedExamples;
            }
          })
          .catch((error) => {
            console.error("Error fetching examples:", error);
            this.editor.showError("Error fetching examples:", error.message);
            _this.examples = [];
          });
      }

      fetchExamplesWithRetry();
    });
  }

  async onExampleButtonClicked() {
    this.editor.showModal({
      title: "Example Search",
      body: `
      <form id="exampleSearch">
        <div class="input-group mb-4">
          <input
            type="text"
            id="searchInput"
            class="form-control form-control-lg"
            placeholder="Search examples..."
            aria-label="Search graphs"
            autofocus
          />
        </div>
        <div class="row">
          <!-- Left Panel - Search Criteria -->
          <div class="col-md-3">
            <div class="border-end pe-3">
              <h6 class="mb-3 text-muted">Search In</h6>
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="titleCheck" checked />
                <label class="form-check-label" for="titleCheck">Title</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="descCheck" checked />
                <label class="form-check-label" for="descCheck">Description</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="tagsCheck" checked />
                <label class="form-check-label" for="tagsCheck">Tags</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="nodesCheck" />
                <label class="form-check-label" for="nodesCheck">Node Types</label>
              </div>
            </div>
          </div>
  
          <!-- Right Panel - Search Results -->
          <div class="col-md-9 search-results">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h6 class="text-muted m-0">
                Results (<span id="resultsCount">0</span>)
              </h6>

              <div class="d-flex align-items-center">
                <label for="sortSelect" class="me-2 mb-0 text-muted small">Sort by:</label>
                <select id="sortSelect" class="form-select form-select-sm w-auto">
                  <option value="latest">Latest</option>
                  <option value="alpha">Alphabetical</option>
                </select>
              </div>
            </div>

            <div class="mb-2 text-muted small">
              Click on a result to open
            </div>

            <div id="resultsContainer" class="d-flex flex-column border rounded p-2" style="max-height: 60vh; overflow-y: auto;">
              <!-- Results will be dynamically inserted here -->
            </div>
          </div>
        <button type="submit" class="d-none"></button>
      </form>
      `,
      buttons: [
        {
          label: "Close",
          type: "primary",
          onClick: (modal) => {
            modal.hide();
          },
        },
      ],
      dialogClass: "modal-lg",
      preShow: (modal, modalElement) => {
        this.modal = modal;
        this.searchInputField = modal._element.querySelector("#searchInput");
        this.resultsContainer =
          modal._element.querySelector("#resultsContainer");
        this.resultsCount = modal._element.querySelector("#resultsCount");
        this.searchInTitle = modal._element.querySelector("#titleCheck");
        this.searchInDescription = modal._element.querySelector("#descCheck");
        this.searchInTags = modal._element.querySelector("#tagsCheck");
        this.searchInNodes = modal._element.querySelector("#nodesCheck");

        this.sortSelect = modal._element.querySelector("#sortSelect");
        this.currentSortMode =
          localStorage.getItem("exampleSortMode") || "latest";
        this.sortSelect.value = this.currentSortMode;
        this.sortSelect.addEventListener("change", () => {
          this.currentSortMode = this.sortSelect.value;
          this.search();
        });

        this.searchInTitle.checked =
          localStorage.getItem("searchInTitle") === "true";
        this.searchInDescription.checked =
          localStorage.getItem("searchInDescription") === "true";
        this.searchInTags.checked =
          localStorage.getItem("searchInTags") === "true";
        this.searchInNodes.checked =
          localStorage.getItem("searchInNodes") === "true";

        this.searchInputField.addEventListener("input", this.handleInputChange);
        this.searchInputField.addEventListener("keypress", this.handleKeypress);

        this.searchInTitle.addEventListener(
          "change",
          this.handleCheckboxChange
        );
        this.searchInDescription.addEventListener(
          "change",
          this.handleCheckboxChange
        );
        this.searchInTags.addEventListener("change", this.handleCheckboxChange);
        this.searchInNodes.addEventListener(
          "change",
          this.handleCheckboxChange
        );
      },
      onShow: () => {
        this.search();
      },
      onHidden: () => {
        localStorage.setItem(
          "searchInTitle",
          this.searchInTitle.checked ? "true" : "false"
        );
        localStorage.setItem(
          "searchInDescription",
          this.searchInDescription.checked ? "true" : "false"
        );
        localStorage.setItem(
          "searchInTags",
          this.searchInTags.checked ? "true" : "false"
        );
        localStorage.setItem(
          "searchInNodes",
          this.searchInNodes.checked ? "true" : "false"
        );
        localStorage.setItem("exampleSortMode", this.currentSortMode);

        this.searchInputField.removeEventListener(
          "input",
          this.handleInputChange
        );
        this.searchInputField.removeEventListener(
          "keypress",
          this.handleKeypress
        );
        this.searchInTitle.removeEventListener(
          "change",
          this.handleCheckboxChange
        );
        this.searchInDescription.removeEventListener(
          "change",
          this.handleCheckboxChange
        );
        this.searchInTags.removeEventListener(
          "change",
          this.handleCheckboxChange
        );
        this.searchInNodes.removeEventListener(
          "change",
          this.handleCheckboxChange
        );

        this.modal = null;
        this.searchInputField = null;
        this.resultsContainer = null;
        this.resultsCount = null;
        this.searchInTitle = null;
        this.searchInDescription = null;
        this.searchInTags = null;
        this.searchInNodes = null;
        this.sortSelect = null;
      },
    });
  }

  handleInputChange = (e) => {
    this.search();
  };

  handleCheckboxChange = () => {
    this.search();
  };

  handleKeypress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const firstCard = this.resultsContainer.firstChild;
      if (firstCard) {
        firstCard.click();
      }
    }
  };

  search() {
    const searchInput = this.searchInputField.value.trim().toLowerCase();
    this.resultsContainer.innerHTML = "";

    let filteredExamples = this.examples.filter((example) => {
      let match = false;
      if (
        this.searchInTitle.checked &&
        example.name &&
        example.name.toLowerCase().includes(searchInput)
      )
        match = true;
      if (
        this.searchInDescription.checked &&
        example.description &&
        example.description.toLowerCase().includes(searchInput)
      )
        match = true;
      if (
        this.searchInTags.checked &&
        example.tags &&
        example.tags.some((tag) => tag.toLowerCase().includes(searchInput))
      )
        match = true;
      if (
        this.searchInNodes.checked &&
        example.nodes &&
        example.nodes.some((node) => node.toLowerCase().includes(searchInput))
      )
        match = true;
      return match;
    });

    if (this.currentSortMode === "alpha") {
      filteredExamples.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.currentSortMode === "latest") {
      filteredExamples.sort((a, b) => {
        const aTime = new Date(a.lastModified || 0).getTime();
        const bTime = new Date(b.lastModified || 0).getTime();
        return bTime - aTime;
      });
    }

    filteredExamples.forEach((example) => {
      const exampleCard = document.createElement("div");
      exampleCard.className =
        "card shadow-sm mb-3  example-card position-relative";
      exampleCard.innerHTML = `
       ${
         this.isNew(example.lastModified)
           ? `<div class="ribbon-new"><span>NEW</span></div>`
           : ""
       }
        <div class="card-body">
       
          <h5 class="card-title">${this.highlight(
            example.name,
            searchInput,
            this.searchInTitle.checked
          )}
          </h5>
          <p class="card-text">${this.highlight(
            example.description,
            searchInput,
            this.searchInDescription.checked
          )}</p>
          ${
            this.searchInTags.checked
              ? example.tags
                  .map(
                    (tag) =>
                      `<span class="badge bg-info me-1">${this.highlight(
                        tag,
                        searchInput,
                        this.searchInTags.checked
                      )}</span>`
                  )
                  .join("")
              : ""
          }
            ${
              this.searchInNodes.checked
                ? example.nodes
                    .map(
                      (node) =>
                        `<span class="badge bg-secondary me-1">${this.highlight(
                          node,
                          searchInput,
                          true
                        )}</span>`
                    )
                    .join("")
                : ""
            }
        <p class="card-text text-muted small mt-2 mb-0">
          Last modified: ${this.formatDate(example.lastModified)}
        </p>
        </div>
      `;
      this.resultsContainer.appendChild(exampleCard);
      exampleCard.onclick = () => {
        this.modal.hide();
        this.onExampleClicked(example);
      };
    });
    this.resultsCount.innerHTML = `${filteredExamples.length}`;
  }

  isNew(dateStr) {
    if (!dateStr) return false;
    const now = new Date();
    const modified = new Date(dateStr);
    const diffDays = (now - modified) / (1000 * 60 * 60 * 24);
    return diffDays <= 14;
  }

  formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  highlight(text, searchTerm, enabled) {
    if (!enabled) return text;
    if (!searchTerm) return text;
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedTerm})`, "gi");
    return text.replace(regex, (match) => `<mark>${match}</mark>`);
  }

  async onExampleClicked(example) {
    try {
      const response = await fetch(`${example.url}`);
      const configuration = await response.json();

      try {
        this.editor.loadGraph(configuration);
        this.editor.showSuccess(
          `Graph Loaded`,
          `Successfully loaded "${example.name}"`
        );
      } catch (error) {
        this.editor.showError(
          "Open Failed : Configuration Error",
          `Error during graph configuration: ${error.message}`
        );
      }
    } catch (error) {
      this.editor.showError(
        "Open Failed : Fetch Error",
        "There was an error while trying to download the file. Please check the console for more information."
      );
      console.error(error);
      return;
    }
  }
}
