export class ToolbarButton {
  constructor(id, label, iconUrl, onClick) {
    this.id = id;
    this.label = label;
    this.iconUrl = iconUrl;
    this.onClick = onClick;
    this.button = null;
  }

  render() {
    this.button = document.createElement("button");
    this.button.id = this.id;
    this.button.classList.add("mgui-toolbar-button");
    if (this.iconUrl) {
      this.button.innerHTML = `<img src="${this.iconUrl}" alt="${this.label} icon"/> `;
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
}
