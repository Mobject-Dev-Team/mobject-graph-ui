import "./toolbar-button.css";

export class ToolbarButton {
  constructor(id, label, iconClass, onClick, tooltip) {
    this.id = id;
    this.label = label;
    this.iconClass = iconClass;
    this.onClick = onClick;
    this.tooltip = tooltip || label;
    this.button = null;
  }

  render() {
    this.button = document.createElement("button");
    this.button.id = this.id;
    this.button.className = "mgui mgui-toolbar-button btn btn-primary";
    this.button.title = this.tooltip;

    let contentHtml = "";
    if (this.iconClass) {
      contentHtml += `<i class="${this.iconClass}"></i> `;
    }

    contentHtml += `<span class="button-label">${this.label}</span>`;
    this.button.innerHTML = contentHtml;
    if (this.onClick) {
      this.button.addEventListener("click", this.onClick);
    }
    return this.button;
  }

  toggleButtonState(enabled) {
    if (this.button) {
      this.button.disabled = !enabled;
      this.button.classList.toggle("disabled", !enabled);
    }
  }

  enable() {
    this.toggleButtonState(true);
  }

  disable() {
    this.toggleButtonState(false);
  }

  addClass(className) {
    if (this.button) {
      this.button.classList.add(className);
    }
  }

  removeClass(className) {
    if (this.button) {
      this.button.classList.remove(className);
    }
  }
}
