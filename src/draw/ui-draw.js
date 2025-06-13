import { UiTheme } from "./ui-theme.js";

export class UiDraw {
  static fitTextWithinWidth(ctx, text, maxWidth) {
    if (ctx.measureText(text).width <= maxWidth) return text;

    const ellipsis = "…";
    let low = 0;
    let high = text.length;

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      const substr = text.slice(0, mid) + ellipsis;
      if (ctx.measureText(substr).width <= maxWidth) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    return text.slice(0, low - 1) + ellipsis;
  }

  static drawRoundedRect(
    ctx,
    x,
    y,
    w,
    h,
    {
      fill = null,
      stroke = null,
      radius = UiTheme.box.borderRadius,
      lineWidth = 1,
      shadowColor = null,
      shadowBlur = 0,
      shadowOffsetX = 0,
      shadowOffsetY = 0,
    } = {}
  ) {
    if (!fill && !stroke) return;

    ctx.save();
    ctx.lineWidth = lineWidth;

    if (shadowColor) {
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = shadowBlur;
      ctx.shadowOffsetX = shadowOffsetX;
      ctx.shadowOffsetY = shadowOffsetY;
    }

    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);

    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.stroke();
    }

    ctx.restore();
  }

  static drawText(
    ctx,
    text,
    x,
    y,
    {
      font = UiTheme.font.normal,
      color = UiTheme.text.color,
      align = "left",
      baseline = "top",
    } = {}
  ) {
    ctx.save();
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  static drawArrow(
    ctx,
    direction,
    x,
    y,
    {
      height = UiTheme.arrows.size,
      color = UiTheme.arrows.color,
      margin = 2,
    } = {}
  ) {
    const half = height / 2;
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    if (direction === "left") {
      ctx.moveTo(x - margin, y);
      ctx.lineTo(x + half - margin, y - half);
      ctx.lineTo(x + half - margin, y + half);
    } else if (direction === "right") {
      ctx.moveTo(x + margin, y);
      ctx.lineTo(x - half + margin, y - half);
      ctx.lineTo(x - half + margin, y + half);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  static drawTextBox(
    ctx,
    text,
    x,
    y,
    {
      font = UiTheme.font.bold,
      padding = UiTheme.box.padding,
      bg = UiTheme.box.background,
      border = UiTheme.box.border,
      fg = UiTheme.text.color,
      radius = UiTheme.box.borderRadius,
    } = {}
  ) {
    ctx.save();
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const textWidth = ctx.measureText(text).width;
    const boxWidth = textWidth + padding * 2;
    const boxHeight = 20;

    UiDraw.drawRoundedRect(
      ctx,
      x - boxWidth / 2,
      y - boxHeight / 2,
      boxWidth,
      boxHeight,
      {
        fill: bg,
        stroke: border,
        radius,
      }
    );

    ctx.fillStyle = fg;
    ctx.fillText(text, x, y);
    ctx.restore();
  }
}
