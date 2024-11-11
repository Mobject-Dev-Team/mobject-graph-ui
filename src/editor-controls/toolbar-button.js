export class ToolbarButton {
  constructor(id, label, iconUrl, onClick) {
    this.id = id;
    this.label = label;
    this.iconUrl = iconUrl;
    this.onClick = onClick;
  }

  render() {
    const button = document.createElement("button");
    button.id = this.id;
    button.classList.add("mgui-toolbar-button");
    if (this.iconUrl) {
      button.innerHTML = `<img src="${this.iconUrl}" alt="${this.label} icon"/> `;
    }
    button.innerHTML += this.label;
    if (this.onClick) {
      button.addEventListener("click", this.onClick);
    }
    return button;
  }
}
