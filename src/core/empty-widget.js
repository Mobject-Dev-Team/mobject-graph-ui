import { DisplayWidget, ControlWidget } from "./widget.js";
import { ColorGenerator } from "../utils/color-generator.js";
import { SingleLineTextDisplayComponent } from "../components/single-line-text-display-component.js";

export class EmptyDisplayWidget extends DisplayWidget {
  constructor(name, parent, options) {
    super(name, parent, options);
    const colorPallet = new ColorGenerator("");
    this.textDisplayComponent = new SingleLineTextDisplayComponent(
      name,
      "",
      colorPallet
    );
  }

  computeSize() {
    return this.textDisplayComponent.computeSize();
  }

  draw(ctx, node, widget_width, y, H) {
    this.textDisplayComponent.draw(ctx, node, widget_width, y, H);
  }
}

export class EmptyControlWidget extends ControlWidget {
  constructor(name, parent, options) {
    super(name, parent, options);
    const colorPallet = new ColorGenerator("");

    this.textDisplayComponent = new SingleLineTextDisplayComponent(
      name,
      "",
      colorPallet
    );
  }

  computeSize() {
    return this.textDisplayComponent.computeSize();
  }

  draw(ctx, node, widget_width, y, H) {
    this.textDisplayComponent.draw(ctx, node, widget_width, y, H);
  }
}
