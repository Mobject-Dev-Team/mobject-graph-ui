export class ToolbarGroup {
  constructor(name) {
    this.name = name;
    this.container = document.createElement("div");
    this.container.className = "btn-group";
    this.container.setAttribute("role", "group");
    this.container.setAttribute("aria-label", `${name} button group`);
  }

  addButton(button) {
    const buttonElement = button.render();
    buttonElement.classList.add("btn", "btn-primary");
    this.container.appendChild(buttonElement);
  }

  render() {
    return this.container;
  }

  addSeparator() {
    const separator = document.createElement("div");
    separator.className = "vr";
    this.container.appendChild(separator);
  }
}
