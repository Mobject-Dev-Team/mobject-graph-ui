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
    this.button.classList.add("mgui-toolbar-button");
    this.button.title = this.tooltip; // Use the tooltip property

    if (this.iconClass) {
      this.button.innerHTML = `<i class="${this.iconClass}"></i> `;
    }

    this.button.innerHTML += this.label;
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
