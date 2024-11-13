/**
 * MIT License
 *
 * Copyright (c) 2024 benhar-dev
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('mobject-litegraph')) :
  typeof define === 'function' && define.amd ? define(['exports', 'mobject-litegraph'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MobjectGraphUi = {}, global.MobjectLitegraph));
})(this, (function (exports, mobjectLitegraph) { 'use strict';

  mobjectLitegraph.LiteGraph.debug = false;
  mobjectLitegraph.LiteGraph.logging_set_level(-1);
  mobjectLitegraph.LiteGraph.catch_exceptions = true;
  mobjectLitegraph.LiteGraph.throw_errors = true;
  mobjectLitegraph.LiteGraph.allow_scripts = false;
  mobjectLitegraph.LiteGraph.searchbox_extras = {};
  mobjectLitegraph.LiteGraph.auto_sort_node_types = true;
  mobjectLitegraph.LiteGraph.node_box_coloured_when_on = true;
  mobjectLitegraph.LiteGraph.node_box_coloured_by_mode = true;
  mobjectLitegraph.LiteGraph.dialog_close_on_mouse_leave = true;
  mobjectLitegraph.LiteGraph.dialog_close_on_mouse_leave_delay = 500;
  mobjectLitegraph.LiteGraph.shift_click_do_break_link_from = false;
  mobjectLitegraph.LiteGraph.click_do_break_link_to = false;
  mobjectLitegraph.LiteGraph.search_hide_on_mouse_leave = true;
  mobjectLitegraph.LiteGraph.search_filter_enabled = true;
  mobjectLitegraph.LiteGraph.search_show_all_on_open = true;
  mobjectLitegraph.LiteGraph.show_node_tooltip = true;
  mobjectLitegraph.LiteGraph.show_node_tooltip_use_descr_property = true;
  mobjectLitegraph.LiteGraph.auto_load_slot_types = true;
  mobjectLitegraph.LiteGraph.alt_drag_do_clone_nodes = true;
  mobjectLitegraph.LiteGraph.do_add_triggers_slots = true;
  mobjectLitegraph.LiteGraph.allow_multi_output_for_events = false;
  mobjectLitegraph.LiteGraph.middle_click_slot_add_default_node = true;
  mobjectLitegraph.LiteGraph.release_link_on_empty_shows_menu = true;
  mobjectLitegraph.LiteGraph.pointerevents_method = "mouse";
  mobjectLitegraph.LiteGraph.ctrl_shift_v_paste_connect_unselected_outputs = true;
  mobjectLitegraph.LiteGraph.backspace_delete = false;
  mobjectLitegraph.LiteGraph.actionHistory_enabled = false;
  mobjectLitegraph.LiteGraph.actionHistoryMaxSave = 40;
  mobjectLitegraph.LiteGraph.showCanvasOptions = true;
  mobjectLitegraph.LiteGraph.use_uuids = true;
  mobjectLitegraph.LiteGraph.refreshAncestorsOnTriggers = false;
  mobjectLitegraph.LiteGraph.refreshAncestorsOnActions = false;
  mobjectLitegraph.LiteGraph.ensureUniqueExecutionAndActionCall = false;
  mobjectLitegraph.LiteGraph.use_deferred_actions = true;
  mobjectLitegraph.LiteGraph.context_menu_filter_enabled = false;
  mobjectLitegraph.LiteGraph.reprocess_slot_while_node_configure = false;

  class LedComponent {
    constructor(label, defaultValue, colorGenerator) {
      this.label = label;
      this.colorGenerator = colorGenerator;
      this._isActive = defaultValue;
      this.setupDefaults();
    }

    setupDefaults() {
      this.labelFont = "12px Arial";
      this.labelTextColor = this.colorGenerator.getLabelColor();
      this.margin = 20;
      this.outlineColor = this.colorGenerator.getBorderColor();
      this.valueFont = "12px Arial";
      this.valueTextColor = this.colorGenerator.getValueColor();
      this.trueIndicatorColor = "#39e75f";
      this.falseIndicatorColor = "#777";
    }

    get isActive() {
      return this._isActive;
    }

    set isActive(value) {
      this._isActive = value;
    }

    computeSize() {
      return new Float32Array([220, 20]);
    }

    draw(ctx, node, widget_width, y, H) {
      const drawWidth = widget_width - this.margin * 2;
      this.drawLabel(ctx, y, H);
      this.drawValue(ctx, drawWidth, y, H);
      this.drawIndicator(ctx, drawWidth, y, H);
    }

    drawLabel(ctx, y, H) {
      ctx.font = this.labelFont;
      ctx.fillStyle = this.labelTextColor;
      ctx.fillText(this.label, this.margin, y + H * 0.7);
    }

    drawValue(ctx, drawWidth, y, H) {
      ctx.font = this.valueFont;
      ctx.fillStyle = this.valueTextColor;
      ctx.textAlign = "right";
      ctx.fillText(
        this._isActive ? "true" : "false",
        drawWidth + this.margin - 20,
        y + H * 0.7
      );
    }

    drawIndicator(ctx, drawWidth, y, H) {
      const ledColor = this._isActive
        ? this.trueIndicatorColor
        : this.falseIndicatorColor;

      const glowRadius = H * 0.6;
      const glowGradient = ctx.createRadialGradient(
        drawWidth + this.margin - 5,
        y + H * 0.5,
        0,
        drawWidth + this.margin - 5,
        y + H * 0.5,
        glowRadius
      );
      glowGradient.addColorStop(0, ledColor);
      glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      if (this._isActive) {
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(
          drawWidth + this.margin - 5,
          y + H * 0.5,
          glowRadius,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      ctx.fillStyle = ledColor;
      ctx.beginPath();
      ctx.arc(drawWidth + this.margin - 5, y + H * 0.5, H * 0.35, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#222";
      ctx.stroke();
    }
  }

  class EventEmitter {
    constructor() {
      this.listeners = {};
    }

    on(eventName, listener) {
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }
      this.listeners[eventName].push(listener);
    }

    off(eventName, listener) {
      const listeners = this.listeners[eventName];
      if (!listeners) return;
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }

    emit(eventName, ...args) {
      const listeners = this.listeners[eventName];
      if (!listeners) return;
      listeners.forEach((listener) => {
        listener(...args);
      });
    }
  }

  class CheckboxComponent {
    constructor(label, defaultValue, colorGenerator) {
      this.eventEmitter = new EventEmitter();
      this.label = label;
      this.colorGenerator = colorGenerator;
      this._isChecked = defaultValue;
      this.setupDefaults();
    }

    setupDefaults() {
      this.labelFont = "12px Arial";
      this.labelTextColor = this.colorGenerator.getLabelColor();
      this.margin = 20;
      this.outlineColor = this.colorGenerator.getBorderColor();
      this.backgroundColor = this.colorGenerator.getBackgroundColor();
      this.checkboxSize = 20;
      this.checkboxMargin = 5;
      this.checkboxColor = this.colorGenerator.getValueColor();
      this.checkboxX = 0;
      this.checkboxY = 0;
      this.labelEndPosition = 0;
    }

    get isChecked() {
      return this._isChecked;
    }

    set isChecked(value) {
      this._isChecked = value;
      this.eventEmitter.emit("onChange", this._isChecked);
    }

    on(eventName, listener) {
      this.eventEmitter.on(eventName, listener);
    }

    off(eventName, listener) {
      this.eventEmitter.off(eventName, listener);
    }

    isClickInZone(pos) {
      return (
        pos[0] >= this.checkboxX &&
        pos[0] <= this.checkboxX + this.labelEndPosition &&
        pos[1] >= this.checkboxY &&
        pos[1] <= this.checkboxY + this.checkboxSize
      );
    }

    onMouse(event, pos) {
      if (event.type === "pointerdown" && this.isClickInZone(pos)) {
        this.isChecked = !this.isChecked;
      }
    }

    computeSize() {
      return new Float32Array([220, 20]);
    }

    draw(ctx, node, widget_width, y, H) {
      this.drawLabel(ctx, y, H);
      this.drawCheckbox(ctx, y, H);
    }

    drawLabel(ctx, y, H) {
      ctx.font = this.labelFont;
      ctx.fillStyle = this.labelTextColor;
      const startX = this.margin * 2 + 5;
      ctx.fillText(this.label, startX, y + H * 0.7);
      const textWidth = ctx.measureText(this.label).width;
      const endX = startX + textWidth;
      this.labelEndPosition = endX;
    }

    drawCheckbox(ctx, y, H) {
      this.checkboxY = y + (H - this.checkboxSize) / 2;
      this.checkboxX = this.margin;

      ctx.fillStyle = this.backgroundColor;
      ctx.strokeStyle = this.outlineColor;
      ctx.beginPath();

      // ctx.roundRect(this.margin, y, drawWidth, H, H * 0.2);

      ctx.roundRect(
        this.checkboxX,
        this.checkboxY,
        this.checkboxSize,
        this.checkboxSize,
        2
      );
      ctx.fill();
      ctx.stroke();

      if (this._isChecked) {
        ctx.strokeStyle = this.checkboxColor;
        ctx.beginPath();
        ctx.moveTo(this.checkboxX + 3, this.checkboxY + this.checkboxSize / 2);
        ctx.lineTo(
          this.checkboxX + this.checkboxSize / 3,
          this.checkboxY + this.checkboxSize - 3
        );
        ctx.lineTo(this.checkboxX + this.checkboxSize - 3, this.checkboxY + 3);
        ctx.stroke();
      }
    }
  }

  class ComboboxComponent {
    constructor(label, defaultValue, options, colorGenerator) {
      this.eventEmitter = new EventEmitter();
      this.label = label;
      this.options = options;
      this.colorGenerator = colorGenerator;
      this._selection = defaultValue;
      this.setupDefaults();
    }

    setupDefaults() {
      this.labelFont = "12px Arial";
      this.labelTextColor = this.colorGenerator.getLabelColor();
      this.valueFont = "12px Arial";
      this.valueTextColor = this.colorGenerator.getValueColor();
      this.margin = 20;
      this.outlineColor = this.colorGenerator.getBorderColor();
      this.backgroundColor = this.colorGenerator.getBackgroundColor();
    }

    get selection() {
      return this._text;
    }

    set selection(value) {
      this._selection = value;
      this.eventEmitter.emit("onChange", this._selection);
    }

    on(eventName, listener) {
      this.eventEmitter.on(eventName, listener);
    }

    off(eventName, listener) {
      this.eventEmitter.off(eventName, listener);
    }

    onMouse(event, pos) {
      const component = this;
      if (event.type === "pointerdown") {
        var ref_window = event.target.data.getCanvasWindow();
        new mobjectLitegraph.LiteGraph.ContextMenu(
          this.options,
          {
            scale: 1,
            event: event,
            className: "dark",
            callback: function (v) {
              component.selection = v;
            },
          },
          ref_window
        );
      }
    }

    computeSize() {
      let size = new Float32Array([220, 20]);
      var maxValueWidth = 0;

      this.options.forEach((optionsText) => {
        maxValueWidth = Math.max(
          maxValueWidth,
          mobjectLitegraph.LiteGraph.computeTextWidth(optionsText, 0.6)
        );
      });

      size[0] = maxValueWidth;
      size[0] += mobjectLitegraph.LiteGraph.computeTextWidth(this.label);
      size[0] += 70;
      size[1] = mobjectLitegraph.LiteGraph.NODE_WIDGET_HEIGHT;

      return size;
    }

    draw(ctx, node, widget_width, y, H) {
      ctx.textAlign = "left";
      const drawWidth = widget_width - this.margin * 2;
      this.drawBackground(ctx, y, drawWidth, H);
      this.drawLabel(ctx, y, H);
      this.drawValue(ctx, drawWidth, y, H);
      this.drawDownArrow(ctx, y, widget_width, H);
    }

    drawBackground(ctx, y, drawWidth, H) {
      ctx.strokeStyle = this.outlineColor;
      ctx.fillStyle = this.backgroundColor;
      ctx.beginPath();
      ctx.roundRect(this.margin, y, drawWidth, H, 2);
      ctx.fill();
      ctx.stroke();
    }

    drawLabel(ctx, y, H) {
      ctx.font = this.labelFont;
      ctx.fillStyle = this.labelTextColor;
      ctx.fillText(this.label, this.margin + 10, y + H * 0.7);
    }

    drawDownArrow(ctx, y, widget_width, H) {
      ctx.fillStyle = this.arrowColor;
      ctx.beginPath();
      ctx.moveTo(widget_width - this.margin - 12, y + H - 5);
      ctx.lineTo(widget_width - this.margin - 18, y + 5);
      ctx.lineTo(widget_width - this.margin - 6, y + 5);
      ctx.fill();
    }

    drawValue(ctx, drawWidth, y, H) {
      ctx.font = this.valueFont;
      ctx.fillStyle = this.valueTextColor;
      ctx.textAlign = "right";
      ctx.fillText(this._selection, drawWidth - 5, y + H * 0.7);
    }
  }

  class NumericDisplayComponent {
    constructor(label, defaultValue, precision, colorGenerator) {
      this.label = label;
      this.precision = precision;
      this.colorGenerator = colorGenerator;
      this._value = defaultValue;
      this.setupDefaults();
    }

    setupDefaults() {
      this.labelFont = "12px Arial";
      this.valueFont = "12px Arial";
      this.margin = 20;
      this.labelTextColor = this.colorGenerator.getLabelColor();
      this.valueTextColor = this.colorGenerator.getValueColor();
    }

    get value() {
      return this._value;
    }

    set value(value) {
      this._value = value;
    }

    computeSize() {
      return new Float32Array([220, 20]);
    }

    draw(ctx, node, widget_width, y, H) {
      ctx.textAlign = "left";
      const drawWidth = widget_width - this.margin * 2;
      this.drawLabel(ctx, y, H);
      this.drawValue(ctx, drawWidth, y, H);
    }

    drawLabel(ctx, y, H) {
      ctx.font = this.labelFont;
      ctx.fillStyle = this.labelTextColor;
      ctx.fillText(this.label, this.margin, y + H * 0.7);
    }

    drawValue(ctx, drawWidth, y, H) {
      ctx.font = this.valueFont;
      ctx.fillStyle = this.valueTextColor;
      ctx.textAlign = "right";
      ctx.fillText(
        Number(this._value).toFixed(this.precision),
        drawWidth + this.margin - 5,
        y + H * 0.7
      );
    }
  }

  class NumericInputComponent {
    constructor(label, defaultValue, precision, limiter, colorGenerator) {
      this.eventEmitter = new EventEmitter();
      this.label = label;
      this.precision = precision;
      this.limiter = limiter;
      this.colorGenerator = colorGenerator;
      this._value = defaultValue;
      this.isDragging = false;
      this.startX = 0;
      this.step = this.calculateStep(precision);
      this.setupDefaults();
    }

    setupDefaults() {
      this.labelFont = "12px Arial";
      this.valueFont = "12px Arial";
      this.margin = 20;
      this.labelTextColor = this.colorGenerator.getLabelColor();
      this.valueTextColor = this.colorGenerator.getValueColor();
      this.outlineColor = this.colorGenerator.getBorderColor();
      this.backgroundColor = this.colorGenerator.getBackgroundColor();
      this.arrowColor = this.colorGenerator.getValueColor();
    }

    get value() {
      return this._value;
    }

    set value(value) {
      this._value = value;
      this.eventEmitter.emit("onChange", this._value);
    }

    on(eventName, listener) {
      this.eventEmitter.on(eventName, listener);
    }

    off(eventName, listener) {
      this.eventEmitter.off(eventName, listener);
    }

    computeSize() {
      return new Float32Array([220, 20]);
    }

    onMouse(event, pos, node) {
      const x = pos[0];
      const widgetWidth = node.size[0];
      const multiplier = this.getMultiplier(event);

      if (event.type === "pointerdown") {
        this.handleMouseDown(x, widgetWidth, multiplier);
      } else if (event.type === "pointermove") {
        this.handleMouseMove(x, multiplier);
      } else if (event.type === "pointerup") {
        this.handleMouseUp(x, widgetWidth, event);
      }
    }

    calculateStep(precision) {
      return Math.pow(10, -Math.abs(precision));
    }

    getMultiplier(event) {
      if (event.shiftKey && event.ctrlKey) {
        return 100;
      } else if (event.shiftKey) {
        return 10;
      } else {
        return 1;
      }
    }

    handleMouseDown(x, widgetWidth, multiplier) {
      this.isMyMouseEvent = true;
      this.isDragging = false;
      this.startX = x;
      this.adjustValueByPosition(x, widgetWidth, multiplier);
    }

    handleMouseMove(currentX, multiplier) {
      if (!this.isMyMouseEvent) return;
      if (Math.abs(currentX - this.startX) > 1) {
        const stepCount = Math.floor(currentX - this.startX);
        this.limiter.incrementBy(stepCount * this.step * multiplier);
        this._value = this.limiter.getValue();
        this.startX = currentX;
        this.isDragging = true;
      }
    }

    handleMouseUp(x, widgetWidth, event) {
      if (!this.isDragging && this.isInsideInputArea(x, widgetWidth)) {
        this.promptForValue(event);
      }
      this.isDragging = false;
      this.isMyMouseEvent = false;
      this.updateValueOnRelease();
    }

    isInsideInputArea(x, widgetWidth) {
      return x > 40 && x < widgetWidth - 40;
    }

    adjustValueByPosition(x, widgetWidth, multiplier) {
      if (x < 40) {
        // down arrow
        this.limiter.decrementBy(this.step * multiplier);
      } else if (x > widgetWidth - 40) {
        // up arrow
        this.limiter.incrementBy(this.step * multiplier);
      }
      this._value = this.limiter.getValue();
    }

    promptForValue(event) {
      let widget = this;

      event.target.data.prompt(
        "Value",
        this.value.toString(),
        function (inputValue) {
          const value = Number(inputValue);
          if (!isNaN(value)) {
            widget.limiter.setValue(value);
            widget.value = widget.limiter.getValue();
            widget.updateValueOnRelease();
          } else {
            console.error("Invalid input: Input is not a number.");
          }
        },
        event
      );
    }

    updateValueOnRelease() {
      this.limiter.setValue(this.value);
      this.value = this.limiter.getValue();
    }

    draw(ctx, node, widget_width, y, H) {
      ctx.textAlign = "left";
      const drawWidth = widget_width - this.margin * 2;
      this.drawBackground(ctx, y, drawWidth, H);
      this.drawLeftArrow(ctx, y, H);
      this.drawRightArrow(ctx, y, widget_width, H);
      this.drawLabel(ctx, y, H);
      this.drawValue(ctx, drawWidth, y, H);
    }

    drawBackground(ctx, y, drawWidth, H) {
      ctx.strokeStyle = this.outlineColor;
      ctx.fillStyle = this.backgroundColor;
      ctx.beginPath();
      ctx.roundRect(this.margin, y, drawWidth, H, 2);
      ctx.fill();
      ctx.stroke();
    }

    drawLeftArrow(ctx, y, H) {
      ctx.fillStyle = this.arrowColor;
      ctx.beginPath();
      ctx.moveTo(this.margin + 16, y + 5);
      ctx.lineTo(this.margin + 6, y + H * 0.5);
      ctx.lineTo(this.margin + 16, y + H - 5);
      ctx.fill();
    }

    drawRightArrow(ctx, y, widget_width, H) {
      ctx.fillStyle = this.arrowColor;
      ctx.beginPath();
      ctx.moveTo(widget_width - this.margin - 16, y + 5);
      ctx.lineTo(widget_width - this.margin - 6, y + H * 0.5);
      ctx.lineTo(widget_width - this.margin - 16, y + H - 5);
      ctx.fill();
    }

    drawLabel(ctx, y, H) {
      ctx.font = this.labelFont;
      ctx.fillStyle = this.labelTextColor;
      ctx.fillText(this.label, this.margin * 2 + 5, y + H * 0.7);
    }

    drawValue(ctx, drawWidth, y, H) {
      ctx.font = this.valueFont;
      ctx.fillStyle = this.valueTextColor;
      ctx.textAlign = "right";
      ctx.fillText(
        Number(this._value).toFixed(this.precision),
        drawWidth - 5,
        y + H * 0.7
      );
    }
  }

  class SingleLineTextDisplayComponent {
    constructor(label, defaultValue, colorGenerator) {
      this.label = label;
      this.colorGenerator = colorGenerator;
      this._text = defaultValue;
      this.setupDefaults();
    }

    setupDefaults() {
      this.labelFont = "12px Arial";
      this.labelTextColor = this.colorGenerator.getLabelColor();
      this.valueFont = "12px Arial";
      this.valueTextColor = this.colorGenerator.getValueColor();
      this.margin = 20;
      this.outlineColor = this.colorGenerator.getBorderColor();
      this.backgroundColor = this.colorGenerator.getBackgroundColor();
    }

    get text() {
      return this._text;
    }

    set text(value) {
      this._text = value;
    }

    computeSize() {
      return new Float32Array([220, 20]);
    }

    draw(ctx, node, widget_width, y, H) {
      ctx.textAlign = "left";
      const drawWidth = widget_width - this.margin * 2;
      this.drawLabel(ctx, y, H);
      this.drawText(ctx, drawWidth, y, H);
    }

    drawLabel(ctx, y, H) {
      ctx.font = this.labelFont;
      ctx.fillStyle = this.labelTextColor;
      ctx.fillText(this.label, this.margin, y + H * 0.7);
    }

    drawText(ctx, drawWidth, y, H) {
      ctx.font = this.valueFont;
      ctx.fillStyle = this.valueTextColor;
      ctx.textAlign = "right";
      ctx.fillText(this._text, drawWidth + this.margin, y + H * 0.7);
    }
  }

  class SingleLineTextInputComponent {
    constructor(label, defaultValue, colorGenerator) {
      this.eventEmitter = new EventEmitter();
      this.label = label;
      this.colorGenerator = colorGenerator;
      this._text = defaultValue;
      this.setupDefaults();
    }

    setupDefaults() {
      this.labelFont = "12px Arial";
      this.labelTextColor = this.colorGenerator.getLabelColor();
      this.valueFont = "12px Arial";
      this.valueTextColor = this.colorGenerator.getValueColor();
      this.margin = 20;
      this.outlineColor = this.colorGenerator.getBorderColor();
      this.backgroundColor = this.colorGenerator.getBackgroundColor();
    }

    get text() {
      return this._text;
    }

    set text(value) {
      this._text = value;
      this.eventEmitter.emit("onChange", this._text);
    }

    on(eventName, listener) {
      this.eventEmitter.on(eventName, listener);
    }

    off(eventName, listener) {
      this.eventEmitter.off(eventName, listener);
    }

    onMouse(event, pos) {
      const component = this;
      if (event.type === "pointerdown") {
        event.target.data.prompt(
          "Value",
          this._text,
          function (v) {
            component.text = v;
          },
          event
        );
      }
    }

    computeSize() {
      return new Float32Array([220, 20]);
    }

    draw(ctx, node, widget_width, y, H) {
      ctx.textAlign = "left";
      const drawWidth = widget_width - this.margin * 2;
      this.drawBackground(ctx, y, drawWidth, H);
      this.drawLabel(ctx, y, H);
      this.drawText(ctx, drawWidth, y, H);
    }

    drawBackground(ctx, y, drawWidth, H) {
      ctx.strokeStyle = this.outlineColor;
      ctx.fillStyle = this.backgroundColor;
      ctx.beginPath();
      ctx.roundRect(this.margin, y, drawWidth, H, 2);
      ctx.fill();
      ctx.stroke();
    }

    drawLabel(ctx, y, H) {
      ctx.font = this.labelFont;
      ctx.fillStyle = this.labelTextColor;
      ctx.fillText(this.label, this.margin + 10, y + H * 0.7);
    }

    drawText(ctx, drawWidth, y, H) {
      ctx.font = this.valueFont;
      ctx.fillStyle = this.valueTextColor;
      ctx.textAlign = "right";
      ctx.fillText(this._text, this.margin + drawWidth - 10, y + H * 0.7);
    }
  }

  class ColorGenerator {
    LABEL_BRIGHTNESS = 70;
    LABEL_SATURATION = 0;
    VALUE_BRIGHTNESS = 90;
    VALUE_SATURATION = 0;
    BORDER_BRIGHTNESS = 50;
    BORDER_SATURATION = 0;
    BACKGROUND_BRIGHTNESS = 10;
    BACKGROUND_SATURATION = 0;
    constructor(type, other = "") {
      this.type = type;
      this.other = other;
    }

    generateHsl(saturation, brightness) {
      let hash = 0;
      for (let i = 0; i < this.type.length; i++) {
        hash = this.type.charCodeAt(i) + ((hash << 5) - hash);
      }

      for (let i = 0; i < this.other.length; i++) {
        hash = this.other.charCodeAt(i) + ((hash << 5) - hash);
      }

      const hue = Math.abs(hash) % 360;

      return `hsl(${hue}, ${saturation}%, ${brightness}%)`;
    }

    getLabelColor() {
      return this.generateHsl(this.LABEL_SATURATION, this.LABEL_BRIGHTNESS);
    }

    getValueColor() {
      return this.generateHsl(this.VALUE_SATURATION, this.VALUE_BRIGHTNESS);
    }

    getBorderColor() {
      return this.generateHsl(this.BORDER_SATURATION, this.BORDER_BRIGHTNESS);
    }

    getBackgroundColor() {
      return this.generateHsl(
        this.BACKGROUND_SATURATION,
        this.BACKGROUND_BRIGHTNESS
      );
    }
  }

  class NumberLimiter {
    #minimum;
    #maximum;
    #value;
    #numberType;
    #precision;
    #limitMinimum;
    #limitMaximum;

    constructor(
      minimum,
      maximum,
      initialValue,
      numberType = null,
      precision = 2
    ) {
      this.#minimum = minimum;
      this.#maximum = maximum;
      this.#value = initialValue;
      this.#numberType = numberType;
      this.#precision = precision;

      this.#initLimits();
      this.setValue(this.#value);
    }

    #shouldAdjust(number) {
      if (this.#numberType === "odd" && number % 2 === 0) return true;
      if (this.#numberType === "even" && number % 2 !== 0) return true;
      return false;
    }

    #adjustLimit(limit, adjustment) {
      return this.#shouldAdjust(limit) ? limit + adjustment : limit;
    }

    #initLimits() {
      this.#limitMinimum = this.#adjustLimit(this.#minimum, 1);
      this.#limitMaximum = this.#adjustLimit(this.#maximum, -1);
    }

    setValue(newValue) {
      if (this.#shouldAdjust(newValue)) {
        newValue += 1;
      }
      newValue = parseFloat(newValue.toFixed(this.#precision));
      this.#value = Math.min(
        Math.max(newValue, this.#limitMinimum),
        this.#limitMaximum
      );
    }

    incrementBy(amount) {
      if (this.#shouldAdjust(this.#value + amount)) {
        amount += 1;
      }
      this.setValue(this.#value + amount);
    }

    decrementBy(amount) {
      if (this.#shouldAdjust(this.#value - amount)) {
        amount += 1;
      }
      this.setValue(this.#value - amount);
    }

    getValue() {
      return this.#value;
    }
  }

  const WILDCARD = "*";
  const DISPLAY = "display";
  const CONTROL = "control";

  class DisplayWidget {
    static capability = DISPLAY;

    #parent = null;
    #content = null;

    constructor(name, parent, options = {}) {
      this.options = options;
      this.name = name;

      this.#parent = parent;
      this.#content = options.content;

      this.registerForContentUpdates();
    }

    onContentUpdate(value) {}

    registerForContentUpdates() {
      if (!this.#content || !this.#parent) return;
      this.#parent.on("nodeStatusUpdated", (status) => {
        const value = status.contents?.find(
          (content) => content.name === this.#content.name
        )?.value;
        this.onContentUpdate(value);
        this.#parent?.setDirtyCanvas(true, true);
      });
    }

    triggerParentResetSize() {
      if (this.#parent) this.#parent.resetSize();
    }
  }

  class ControlWidget {
    static capability = CONTROL;

    #parent = null;
    #property = null;
    #parameter = null;

    constructor(name, parent, options = {}) {
      this.value = null;
      this.options = options;
      this.name = name;

      this.#parent = parent;
      this.#property = options.property;
      this.#parameter = options.parameter;
    }

    setValue(value) {
      this.value = value;

      if (this.#parent && this.#property && this.#property.name) {
        this.#parent?.setProperty(this.#property.name, value);
        this.#parent?.setDirtyCanvas(true, true);
      }
    }

    getValue() {
      return this.value;
    }

    setDefaultValue(value) {
      this.value = value;

      if (this.#parent && this.#property && this.#property.name) {
        this.#parent?.setPropertyDefaultValue(this.#property.name, value);
        this.#parent?.setDirtyCanvas(true, true);
      }
    }

    triggerParentResetSize() {
      if (this.#parent) this.#parent.resetSize();
    }
  }

  class Widgets {
    constructor() {
      this.widgets = new Map();
    }

    _createKey(type, capability, identifier = undefined) {
      return `${type}:${capability}${identifier ? `:${identifier}` : ""}`;
    }

    add(widgetClass, type, identifier = undefined) {
      const capability = widgetClass.capability;
      const key = this._createKey(type, capability, identifier);
      if (!this.widgets.has(key)) {
        this.widgets.set(key, new Set()); // Use Set to automatically handle unique insertion
      }
      this.widgets.get(key).add(widgetClass);
    }

    _getWidgetsByKey(key) {
      return Array.from(this.widgets.get(key) || []);
    }

    get(type, capability, identifier = undefined) {
      const specificKey = this._createKey(type, capability, identifier);
      const wildcardKey = this._createKey(type, capability, WILDCARD);
      const specificWidgets = this._getWidgetsByKey(specificKey);
      const wildcardWidgets = this._getWidgetsByKey(wildcardKey);
      return Array.from(new Set([...specificWidgets, ...wildcardWidgets]));
    }

    getDisplaysOfType(type, identifier = undefined) {
      return this.get(type, DISPLAY, identifier);
    }

    getControlsOfType(type, identifier = undefined) {
      return this.get(type, CONTROL, identifier);
    }

    has(type, capability, identifier = undefined) {
      const specificKey = this._createKey(type, capability, identifier);
      const wildcardKey = this._createKey(type, capability, WILDCARD);
      return this.widgets.has(specificKey) || this.widgets.has(wildcardKey);
    }

    hasDisplay(type, identifier) {
      return this.has(type, DISPLAY, identifier);
    }

    hasControl(type, identifier) {
      return this.has(type, CONTROL, identifier);
    }

    remove(type, capability, identifier = undefined) {
      const specificKey = this._createKey(type, capability, identifier);
      const wildcardKey = this._createKey(type, capability, WILDCARD);
      this.widgets.delete(specificKey);
      this.widgets.delete(wildcardKey);
    }

    [Symbol.iterator]() {
      const iterator = this.widgets.entries();
      return {
        next: () => {
          const { done, value } = iterator.next();
          if (done) {
            return { done };
          }
          const [key, widgetSet] = value;
          const [type, capability, identifier] = key.split(":");
          return {
            value: [type, capability, identifier, Array.from(widgetSet)],
            done: false,
          };
        },
      };
    }
  }

  class NodeBlueprintHandlers {
    constructor() {
      this.handlers = [];
    }

    addHandler(handler) {
      this.handlers.push(handler);
    }

    removeHandler(handler) {
      const index = this.handlers.indexOf(handler);
      if (index > -1) {
        this.handlers.splice(index, 1);
      }
    }

    handle(node, blueprint) {
      let index = 0;
      const next = () => {
        if (index < this.handlers.length) {
          const handler = this.handlers[index++];
          handler.handle(node, blueprint, next);
        }
      };
      next();
    }
  }

  class NodeBlueprintHandler {
    handle(node, blueprint, next) {
      next();
    }
  }

  // Helper function to recursively gather types and base types
  function getType(datatype) {
    let typeString = datatype.identifier
      ? `${datatype.typeName} (${datatype.identifier})`
      : datatype.typeName;

    // Check if there's a baseDatatype and append it recursively
    if (datatype.baseDatatype) {
      typeString += `,${getType(datatype.baseDatatype)}`;
    }

    return typeString;
  }

  class NodeInputPortBlueprintHandler extends NodeBlueprintHandler {
    handle(node, blueprint, next) {
      if (blueprint.inputPorts) {
        blueprint.inputPorts.forEach((input) => {
          const type = getType(input.datatype);
          node.addInput(input.name, type);
        });
      }
      next();
    }
  }

  class NodeOutputPortBlueprintHandler extends NodeBlueprintHandler {
    handle(node, blueprint, next) {
      if (blueprint.outputPorts) {
        blueprint.outputPorts.forEach((output) => {
          const type = getType(output.datatype);
          node.addOutput(output.name, type);
        });
      }
      next();
    }
  }

  class NodeParametersBlueprintHandler extends NodeBlueprintHandler {
    constructor(widgets) {
      super();
      this.widgets = widgets;
    }

    handle(node, blueprint, next) {
      const contentNames = new Set(
        blueprint.contents ? blueprint.contents.map((c) => c.name) : []
      );

      if (blueprint.parameters) {
        blueprint.parameters.forEach((parameter) => {
          const name = parameter.name;
          const typeName = parameter.datatype.typeName;
          const identifier = parameter.datatype.identifier;
          const type = parameter.datatype.identifier
            ? `${parameter.datatype.typeName} (${parameter.datatype.identifier})`
            : parameter.datatype.typeName;
          const default_value = parameter.defaultValue;
          const prop = node.addProperty(name, default_value, type);

          let content;
          if (contentNames.has(name)) {
            content = blueprint.contents.find((c) => c.name === name);
          }

          const widgetClasses = this.widgets.getControlsOfType(
            typeName,
            identifier
          );
          if (!widgetClasses.length) {
            throw new Error(`Unable to find widget of type :  ${type}`);
          }
          const widget = new widgetClasses[0](name, node, {
            property: prop,
            parameter,
            content,
          });

          node.addCustomWidget(widget);
        });
      }
      next();
    }
  }

  class NodeContentsBlueprintHandler extends NodeBlueprintHandler {
    constructor(widgets) {
      super();
      this.widgets = widgets;
    }
    handle(node, blueprint, next) {
      const parameterNames = new Set(
        blueprint.parameters
          ? blueprint.parameters.map((parameter) => parameter.name)
          : []
      );

      if (blueprint.contents) {
        blueprint.contents.forEach((content) => {
          if (parameterNames.has(content.name)) return; // already processed by NodeParametersBlueprint
          const name = content.name;
          const typeName = content.datatype.typeName;
          const identifier = content.datatype.identifier || "";
          const type = content.datatype.identifier
            ? `${content.datatype.typeName} (${content.datatype.identifier})`
            : content.datatype.typeName;
          const widgetClasses = this.widgets.getDisplaysOfType(
            typeName,
            identifier
          );
          if (!widgetClasses.length) {
            throw new Error(`Unable to find widget of type :  ${type}`);
          }
          const widget = new widgetClasses[0](name, node, { content });

          node.addCustomWidget(widget);
        });
      }
      next();
    }
  }

  class Node extends mobjectLitegraph.LGraphNode {
    eventEmitter = new EventEmitter();

    constructor(title) {
      super(title);
      this._shape = 2;
      this.extensions = [];

      this.registerCallbackHandlers();

      const graphFramework = new GraphFramework();
      graphFramework.applyExtensions("node", this);

      this.eventEmitter.emit("constructorComplete", this);
    }

    addCustomWidget(widget) {
      super.addCustomWidget(widget);
      if (widget.registerWithParent) {
        widget.registerWithParent(this);
      }
      this.eventEmitter.emit("customWidgetAdded", widget);
    }

    on(eventName, listener) {
      this.eventEmitter.on(eventName, listener);
    }

    off(eventName, listener) {
      this.eventEmitter.off(eventName, listener);
    }

    update(status) {
      this.eventEmitter.emit("nodeStatusUpdated", status);
    }

    setPropertyDefaultValue(name, value) {
      this.properties ||= {};

      if (value === this.properties[name]) {
        return;
      }

      this.properties[name] = value;
      const widgetToUpdate = this.widgets?.find(
        (widget) => widget && widget.options?.property === name
      );

      if (widgetToUpdate) {
        widgetToUpdate.value = value;
      }
    }

    resetSize() {
      this.setSize(this.computeSize());
    }

    onDropFile(file, widgetName = null) {
      if (this.widgets && this.widgets.length) {
        if (widgetName !== null) {
          const widget = this.widgets.find((w) => w.name === widgetName);
          if (widget && widget.onDropFile && widget.onDropFile(file)) {
            this.eventEmitter.emit("dropFileHandledByWidget", file, widget);
            return;
          }
        } else {
          for (const widget of this.widgets) {
            if (widget.onDropFile && widget.onDropFile(file)) {
              this.eventEmitter.emit("dropFileHandledByWidget", file, widget);
              return;
            }
          }
        }
      }
      mobjectLitegraph.LiteGraph.log_warn(
        `Node ${this.type} was registered to handle a dropped file, but failed to handle it.`
      );
    }

    registerCallbackHandlers() {
      this.registerCallbackHandler("onAdded", (oCbInfo) => {
        this.eventEmitter.emit("added", this);
      });

      this.registerCallbackHandler("onRemoved", (oCbInfo) => {
        this.eventEmitter.emit("removed", this);
      });

      this.registerCallbackHandler(
        "onPropertyChanged",
        (oCbInfo, name, value, prevValue) => {
          this.eventEmitter.emit("propertyChanged", this, name, value, prevValue);
        }
      );
    }

    applyExtension(extension) {
      this.eventEmitter.emit("applyExtension", extension);
      try {
        const instance = new extension(this);
        this.extensions.push(instance);
      } catch (error) {
        if (
          typeof extension === "object" &&
          typeof extension.apply === "function"
        ) {
          extension.apply(this);
          this.extensions.push(extension);
        } else {
          throw new Error(
            "Extension must be a class or an object with an apply method"
          );
        }
      }
    }
  }

  class NodeClassFactory {
    constructor(widgets) {
      this.widgets = widgets;
      this.handlers = new NodeBlueprintHandlers();
    }

    registerHandler(handler) {
      this.handlers.addHandler(handler);
    }

    removeHandler(handler) {
      this.handlers.removeHandler(handler);
    }

    validateBlueprint(blueprint) {
      const validations = [
        this.checkBlueprintHasPath.bind(this),
        this.checkBlueprintParametersAreSupported.bind(this),
        this.checkBlueprintContentsAreSupported.bind(this),
      ];

      return validations.every((validation) => validation(blueprint));
    }

    getNodeNameFromBlueprint(blueprint) {
      return blueprint.path.split("/").pop();
    }

    getNodePathFromBlueprint(blueprint) {
      let path = blueprint.path.split("/").slice(0, -1).join("/");
      return path;
    }

    getNodeTypeFromBlueprint(blueprint) {
      return blueprint.path;
    }

    checkBlueprintHasPath(blueprint) {
      return blueprint.path;
    }

    checkBlueprintParametersAreSupported(blueprint) {
      if (!blueprint.node.parameters) return true;

      return blueprint.node.parameters.every((parameter) => {
        const { typeName, identifier } = parameter.datatype;
        return this.widgets.hasControl(typeName, identifier);
      });
    }

    checkBlueprintContentsAreSupported(blueprint) {
      if (!blueprint.node.contents) return true;

      const parameterSet = new Set(
        (blueprint.node?.parameters || []).map(
          (p) => `${p.datatype.typeName}-${p.datatype.identifier}`
        )
      );

      return blueprint.node.contents.every((content) => {
        const { typeName, identifier } = content.datatype;
        const key = `${typeName}-${identifier}`;
        if (
          parameterSet.has(key) &&
          this.widgets.hasControl(typeName, identifier)
        ) {
          return true;
        }
        return this.widgets.hasDisplay(typeName, identifier);
      });
    }

    create(blueprint) {
      if (!this.validateBlueprint(blueprint)) {
        return;
      }

      const factory = this;
      const nodeName = factory.getNodeNameFromBlueprint(blueprint);

      const nodeClass = class extends Node {
        static title = nodeName;
        static desc = "";

        constructor() {
          super(nodeName);
          factory.handlers.handle(this, blueprint.node);
        }
      };

      return nodeClass;
    }
  }

  class GraphFramework {
    static instance;

    constructor() {
      if (GraphFramework.instance) {
        return GraphFramework.instance;
      }

      if (typeof mobjectLitegraph.LiteGraph === "undefined") {
        throw new Error("LiteGraph is not available in the global scope.");
      }

      this.liteGraph = mobjectLitegraph.LiteGraph;
      this.liteGraph.initialize();

      this.nodeExtensions = [];
      this.canvasExtensions = [];
      this.editorExtensions = [];
      this.widgets = new Widgets();

      this.nodeClassFactory = new NodeClassFactory(this.widgets);
      this.nodeClassFactory.registerHandler(new NodeInputPortBlueprintHandler());
      this.nodeClassFactory.registerHandler(new NodeOutputPortBlueprintHandler());
      this.nodeClassFactory.registerHandler(
        new NodeParametersBlueprintHandler(this.widgets)
      );
      this.nodeClassFactory.registerHandler(
        new NodeContentsBlueprintHandler(this.widgets)
      );

      this.liteGraph.computeTextWidth = function (text, fontSize) {
        if (!text) {
          return 0;
        }

        let t = text.toString();

        if (typeof fontSize === "undefined")
          return this.NODE_TEXT_SIZE * t.length * 0.6;

        return this.NODE_TEXT_SIZE * t.length * fontSize;
      };

      GraphFramework.instance = new Proxy(this, {
        get: (target, property, receiver) => {
          if (Reflect.has(target, property)) {
            return Reflect.get(target, property, receiver);
          } else {
            return (...args) => {
              if (typeof target.liteGraph[property] === "function") {
                return target.liteGraph[property].apply(target.liteGraph, args);
              } else {
                return target.liteGraph[property];
              }
            };
          }
        },
      });

      return GraphFramework.instance;
    }

    install(graphPack, options) {
      graphPack.install(this, options);
    }

    installNodeBlueprints(blueprints) {
      if (blueprints && Array.isArray(blueprints)) {
        blueprints.forEach((blueprint) => {
          this.installNodeBlueprint(blueprint);
        });
      }
    }

    installNodeBlueprint(blueprint) {
      if (blueprint) {
        const nodeType =
          this.nodeClassFactory.getNodeTypeFromBlueprint(blueprint);
        if (!nodeType) {
          this.log_warn("Failed to determine node type from blueprint.");
          return;
        }

        const nodeClass = this.nodeClassFactory.create(blueprint);
        if (!nodeClass) {
          this.log_warn(
            "Unable to create node class from blueprint.",
            nodeType,
            blueprint
          );
          return;
        }
        this.registerNodeType(nodeType, nodeClass);
      } else {
        this.log_warn("No blueprint provided to installNodeBlueprint.");
      }
    }

    registerWidgetType(Widget, type, identifier) {
      this.widgets.add(Widget, type, identifier);
    }

    registerFileAssociation(fileExtensions, nodeType, widgetName = null) {
      for (let fileExtension of fileExtensions) {
        if (fileExtension && typeof fileExtension === "string") {
          this.liteGraph.node_types_by_file_extension[
            fileExtension.toLowerCase()
          ] = {
            type: nodeType,
            widgetName,
          };
        }
      }
    }

    registerNodeExtension(extension) {
      this.nodeExtensions.push(extension);
    }

    registerCanvasExtension(extension) {
      this.canvasExtensions.push(extension);
    }

    registerEditorExtension(extension) {
      this.editorExtensions.push(extension);
    }

    applyExtensions(type, instance) {
      let extensions;
      switch (type) {
        case "node":
          extensions = this.nodeExtensions;
          break;
        case "canvas":
          extensions = this.canvasExtensions;
          break;
        case "editor":
          extensions = this.editorExtensions;
          break;
        default:
          throw new Error(`Unknown extension type: ${type}`);
      }

      extensions.forEach((extension) => instance.applyExtension(extension));
    }

    getVersion() {
      return this.liteGraph.VERSION;
    }
  }

  // class used to convert the standard serialization of litegraph, to mobject-graph version for use
  // in the backend.
  // this will only contain information that is needed by the backend, whereas the serialize will
  // provide all information

  class LiteGraphConverter {
    static Convert(graph) {
      const liteGraphData = JSON.parse(JSON.stringify(graph.serialize()));
      const nodesWithConvertedIds = this.#convertNodeIdsToStrings(
        liteGraphData.nodes
      );

      const transformedLinks = this.#transformLinks(
        nodesWithConvertedIds,
        liteGraphData.links
      );

      return this.#removeUnwantedProperties({
        ...liteGraphData,
        nodes: nodesWithConvertedIds,
        links: transformedLinks,
      });
    }

    static #convertNodeIdsToStrings(nodes) {
      return nodes.map((node) => ({
        ...node,
        id: String(node.id),
      }));
    }

    static #transformLinks(nodes, links) {
      return links.map((link) => {
        const [
          linkId,
          sourceNodeId,
          sourceOutputIndex,
          targetNodeId,
          targetInputIndex,
          type,
        ] = link;

        const linkIdStr = String(linkId);
        const sourceNodeIdStr = String(sourceNodeId);
        const targetNodeIdStr = String(targetNodeId);

        const sourceNode = nodes.find((node) => node.id === sourceNodeIdStr);
        const targetNode = nodes.find((node) => node.id === targetNodeIdStr);

        const sourceOutputName = sourceNode
          ? sourceNode.outputs[sourceOutputIndex]?.name || "unknown"
          : "unknown";
        const targetInputName = targetNode
          ? targetNode.inputs[targetInputIndex]?.name || "unknown"
          : "unknown";

        return [
          linkIdStr,
          sourceNodeIdStr,
          sourceOutputName,
          targetNodeIdStr,
          targetInputName,
          type,
        ];
      });
    }

    static #removeUnwantedProperties(graphData) {
      const {
        extra,
        version,
        config,
        last_node_id,
        last_link_id,
        ...cleanGraph
      } = graphData;

      cleanGraph.nodes = cleanGraph.nodes.map((node) => {
        const {
          flags,
          shape,
          size,
          pos,
          properties,
          inputs,
          outputs,
          ...cleanNode
        } = node;

        if (properties && Object.keys(properties).length) {
          cleanNode.properties = properties;
        }
        if (inputs && inputs.length) {
          cleanNode.inputs = inputs;
        }
        if (outputs && outputs.length) {
          cleanNode.outputs = outputs;
        }

        return cleanNode;
      });

      return cleanGraph;
    }
  }

  class Graph extends mobjectLitegraph.LGraph {
    #uuid = null;

    constructor(o) {
      super(o);
      this.eventEmitter = new EventEmitter();
      this.#uuid = null;
      this.updateGraphUuid();
    }

    on(eventName, listener) {
      this.eventEmitter.on(eventName, listener);
    }

    off(eventName, listener) {
      this.eventEmitter.off(eventName, listener);
    }

    get uuid() {
      return this.#uuid;
    }

    get isEmpty() {
      return this._nodes.length === 0;
    }

    updateGraphUuid() {
      this.#uuid = mobjectLitegraph.LiteGraph.uuidv4();
    }

    // update(status) {
    //   if (status && Array.isArray(status.nodes)) {
    //     status.nodes.forEach((nodeStatus) => {
    //       const node = this.getNodeById(nodeStatus.id);
    //       if (node) {
    //         node.update(nodeStatus);
    //       }
    //     });
    //   }
    // }

    update(status) {
      // Create a map for quick access to status by node ID, if status exists and contains nodes
      const statusMap =
        status && Array.isArray(status.nodes)
          ? new Map(status.nodes.map((nodeStatus) => [nodeStatus.id, nodeStatus]))
          : new Map();

      // Iterate over all nodes and call update with either the corresponding status or an empty object
      this._nodes.forEach((node) => {
        const nodeStatus = statusMap.get(node.id) || {};
        node.update(nodeStatus);
      });
    }

    serialize() {
      let data = super.serialize();
      data.uuid = this.#uuid;
      return data;
    }

    exportForBackend() {
      return LiteGraphConverter.Convert(this);
    }

    onNodeAdded(node) {
      this.updateGraphUuid();
      node.on("propertyChanged", this.emitOnNodePropertyChange.bind(this));
      this.eventEmitter.emit("nodeAdded", this, node);
    }

    onNodeRemoved(node) {
      this.updateGraphUuid();
      node.off("propertyChanged", this.emitOnNodePropertyChange.bind(this));
      this.eventEmitter.emit("nodeRemoved", this, node);
    }

    onConnectionChange(node) {
      this.updateGraphUuid();
      this.eventEmitter.emit("connectionChange", this, node);
    }

    onBeforeChange() {
      this.eventEmitter.emit("beforeChange", this);
    }

    onAfterChange() {
      this.eventEmitter.emit("afterChange", this);
    }

    emitOnNodePropertyChange(node, name, value, prevValue) {
      this.eventEmitter.emit(
        "nodePropertyChanged",
        this,
        node,
        name,
        value,
        prevValue
      );
    }
  }

  class GraphEditor {
    constructor(containerId, connection) {
      this.eventEmitter = new EventEmitter();
      this.connection = connection;
      this.rootElement = null;
      this.parentDiv = null;
      this.toolbarElement = null;
      this.mainWindowElement = null;
      this.footerElement = null;
      this.canvasElement = null;
      this.graphCanvas = null;
      this.graph = new Graph();
      this.toolbarControls = [];
      this.extensions = [];

      this.makeEditorWindow(containerId);
      this.setGraph(this.graph);

      const graphFramework = new GraphFramework();
      graphFramework.applyExtensions("editor", this);

      this.eventEmitter.emit("instantiated", this);
      return this.graph;
    }

    getConnection() {
      return this.connection;
    }

    getGraph() {
      return this.graph;
    }

    getGraphCanvas() {
      return this.graphCanvas;
    }

    setGraph(graph) {
      if (this.graph) {
        this.eventEmitter.emit("graphReplaced", this.graph);
      }
      this.graph = graph;
      this.graphCanvas.setGraph(this.graph, true);

      this.eventEmitter.emit("graphSet", this.graph);

      return graph;
    }

    on(eventName, listener) {
      this.eventEmitter.on(eventName, listener);
    }

    off(eventName, listener) {
      this.eventEmitter.off(eventName, listener);
    }

    addToolbarControl(toolbarControl) {
      this.toolbarControls.push(toolbarControl);
      const controlElement = toolbarControl.render();
      this.toolbarElement.appendChild(controlElement);
      this.resizeCanvas();
    }

    applyExtension(extension) {
      this.eventEmitter.emit("applyExtension", extension);
      try {
        const instance = new extension(this);
        this.extensions.push(instance);
      } catch (error) {
        if (
          typeof extension === "object" &&
          typeof extension.apply === "function"
        ) {
          extension.apply(this);
          this.extensions.push(extension);
        } else {
          throw new Error(
            "Extension must be a class or an object with an apply method"
          );
        }
      }
    }

    makeEditorWindow(container_id, options = {}) {
      const root = (this.rootElement = document.createElement("div"));
      root.className = "mgui-editor";
      root.innerHTML = `
    <div class="mgui-editor-toolbar">
        <div class="mgui-editor-tools mgui-editor-tools-left"></div>
        <div class="mgui-editor-tools mgui-editor-tools-right"></div>
    </div>
    <div class="mgui-editor-main-window">
        <canvas class="mgui-editor-graphcanvas"></canvas>    
    </div>
    <div class="mgui-editor-footer">
        <div class="mgui-editor-tools mgui-editor-tools-left"></div>
        <div class="mgui-editor-tools mgui-editor-tools-right"></div>
    </div>`;

      this.toolbarElement = root.querySelector(".mgui-editor-toolbar");
      this.mainWindowElement = root.querySelector(".mgui-editor-main-window");
      this.footerElement = root.querySelector(".mgui-editor-footer");

      const canvas = (this.canvasElement = root.querySelector(
        ".mgui-editor-graphcanvas"
      ));

      this.graphCanvas = new mobjectLitegraph.LGraphCanvas(canvas);
      this.graphCanvas.render_canvas_border = false;

      this.parentDiv = document.getElementById(container_id);
      if (this.parentDiv) {
        this.parentDiv?.appendChild(root);
        this.resizeCanvas();
        window.addEventListener("resize", this.resizeCanvas.bind(this));
      } else {
        throw new Error("Editor has no parentElement to bind to");
      }
    }

    resizeCanvas() {
      const availableHeight =
        this.parentDiv.clientHeight -
        this.toolbarElement.offsetHeight -
        this.footerElement.offsetHeight;
      this.mainWindowElement.style.height = availableHeight + "px";
      this.canvasElement.height = availableHeight;
      this.canvasElement.style.height = availableHeight + "px";
      this.graphCanvas.resize();
    }
  }

  class ToolbarButton {
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

  class GetBlueprintsExtension {
    constructor(editor) {
      this.editor = editor;
      this.connection = editor.getConnection();
      this.setupToolbarControls();
    }

    setupToolbarControls() {
      const graphFramework = new GraphFramework();
      const getBlueprintsButton = new ToolbarButton(
        "GetBlueprints",
        "Get Blueprints",
        null,
        async () => {
          console.log("api get blueprints");
          getBlueprintsButton.disable();
          try {
            const result = await this.connection.send("GetBlueprints");
            console.log("api get blueprints reply", result);
            graphFramework.installNodeBlueprints(result.blueprints);
          } catch (error) {
            console.error("api get blueprints failed:", error);
          } finally {
            getBlueprintsButton.enable();
          }
        }
      );

      this.editor.addToolbarControl(getBlueprintsButton);
    }
  }

  class EditorAutoUpdateExtension {
    constructor(editor) {
      this.editor = editor;
      this.connection = editor.getConnection();
      this.currentGraph = null;
      this.pollingTimeoutId = null;
      this.pollingPeriodInMs = 1000;
      this.requestQueueMaxSize = 1;
      this.requestQueue = [];
      this.processingRequest = false;
      this.setupEditorListeners();
      this.setupToolbarControls();
      this.switchGraph(this.editor.getGraph());
    }

    setupEditorListeners() {
      this.editor.on("graphSet", (newGraph) => {
        this.switchGraph(newGraph);
      });
    }

    setupToolbarControls() {
      // todo, add enable / disable auto update
    }

    switchGraph(newGraph) {
      if (this.currentGraph) {
        this.unregisterGraphListeners(this.currentGraph);
      }

      this.currentGraph = newGraph;

      if (this.currentGraph) {
        this.registerGraphListeners(newGraph);
      }
    }

    unregisterGraphListeners(graph) {
      graph.off("connectionChange", this.handleConnectionChange.bind(this));
      graph.off("nodeAdded", this.handleNodeAdded.bind(this));
      graph.off("nodeRemoved", this.handleNodeRemoved.bind(this));
      graph.off("nodePropertyChanged", this.handlePropertyChange.bind(this));
    }

    registerGraphListeners(graph) {
      graph.on("connectionChange", this.handleConnectionChange.bind(this));
      graph.on("nodeAdded", this.handleNodeAdded.bind(this));
      graph.on("nodeRemoved", this.handleNodeRemoved.bind(this));
      graph.on("nodePropertyChanged", this.handlePropertyChange.bind(this));
    }

    enqueueRequest(requestFunction, ...args) {
      if (this.requestQueue.length >= this.requestQueueMaxSize) {
        this.requestQueue = this.requestQueue.slice(
          -this.requestQueueMaxSize + 1
        );
      }
      this.requestQueue.push({ requestFunction, args });
      this.processRequests();
    }

    async processRequests() {
      if (this.processingRequest || this.requestQueue.length === 0) {
        return;
      }

      this.processingRequest = true;
      const { requestFunction, args } = this.requestQueue.shift();

      try {
        await requestFunction.apply(this, args);
      } finally {
        this.processingRequest = false;
        this.processRequests();
      }
    }

    handleConnectionChange(graph, node) {
      if (graph.uuid != this.currentGraph.uuid) {
        return;
      }
      this.enqueueRequest(this.createGraph, graph);
    }

    handleNodeAdded(graph, node) {
      if (graph.uuid != this.currentGraph.uuid) {
        return;
      }
      this.enqueueRequest(this.createGraph, graph);
    }

    handleNodeRemoved(graph, node) {
      if (graph.uuid != this.currentGraph.uuid) {
        return;
      }
      this.enqueueRequest(this.createGraph, graph);
    }

    handlePropertyChange(graph, node, name, value) {
      if (graph.uuid != this.currentGraph.uuid) {
        return;
      }
      this.enqueueRequest(this.updateParameterValue, graph, node, name, value);
    }

    async createGraph(graph) {
      this.stopPolling();
      const graphPayload = graph.exportForBackend();
      console.log("api create graph", graph.uuid, graphPayload);

      try {
        const status = await this.connection.send("CreateGraph", {
          graph: graphPayload,
        });
        if (status.uuid === graph.uuid) {
          graph.update(status);
          this.startPolling();
        }
      } catch (error) {
        console.error(error);
      }
    }

    async updateParameterValue(graph, node, name, value) {
      this.stopPolling();
      console.log("api update property", node, name, value);
      try {
        const reply = await this.connection.send("UpdateParameterValue", {
          graphUuid: graph.uuid,
          nodeId: node.id,
          parameterName: name,
          parameterValue: value,
        });
        this.startPolling();
      } catch (error) {
        if (error.message.includes("Invalid or missing graphUuid")) {
          console.log(
            "api update property failed due to unknown graphUuid, triggering update graph"
          );
          await this.createGraph(graph);
        } else {
          console.error("Update parameter value failed:", error);
        }
      }
    }

    stopPolling() {
      if (this.pollingTimeoutId) {
        clearTimeout(this.pollingTimeoutId);
        this.pollingTimeoutId = null;
        console.log("polling stopped");
      }
    }

    isPolling() {
      return Boolean(this.pollingTimeoutId);
    }

    startPolling() {
      if (this.currentGraph.isEmpty) {
        this.stopPolling();
        return;
      }

      const poll = async () => {
        if (!this.isPolling()) return;

        try {
          const status = await this.connection.send("GetStatus", {
            graphUuid: this.currentGraph.uuid,
          });

          console.log("polling reply >", status);
          if (status.uuid !== this.currentGraph.uuid) {
            console.log("polling reply rejected as graph uuid mismatch");
            this.stopPolling();
            return;
          }

          this.currentGraph.update(status);
          this.pollingTimeoutId = setTimeout(poll, this.pollingPeriodInMs);
        } catch (error) {
          console.error("polling error", error);
          this.stopPolling();
        }
      };

      console.log("polling started");
      this.pollingTimeoutId = setTimeout(poll, this.pollingPeriodInMs);
    }
  }

  class ShowExecuteOrderExtension {
    constructor(editor) {
      this.editor = editor;
      this.editorCanvas = editor.getGraphCanvas();
      this.setupToolbarControls();
    }

    setupToolbarControls() {
      const getBlueprintsButton = new ToolbarButton(
        "ToggleExecuteOrder",
        "Toggle Execution Order",
        null,
        () => {
          this.editorCanvas.render_execution_order =
            !this.editorCanvas.render_execution_order;
          this.editorCanvas.setDirty(true, true);
        }
      );

      this.editor.addToolbarControl(getBlueprintsButton);
    }
  }

  class PreExecutionCheckExtension {
    constructor(node) {
      this.node = node;
      this.defaultColor = node.color;
      this.defaultBgColor = node.bgcolor;
      this.defaultTooltip = node.properties.tooltip;
      this.errorStyle = { bgcolor: "#96000c", color: "#750000" };
      node.on("nodeStatusUpdated", this.handleStatusUpdate.bind(this));
    }

    hasPrecheckAlarms(nodeStatus) {
      if (Array.isArray(nodeStatus.extensions)) {
        for (let extension of nodeStatus.extensions) {
          if (
            extension.name === "precheck" &&
            Array.isArray(extension.alarms) &&
            extension.alarms.length > 0
          ) {
            return true;
          }
        }
      }
      return false;
    }

    getFirstAlarm(nodeStatus) {
      for (const extension of nodeStatus.extensions ?? []) {
        if (extension.name === "precheck" && extension.alarms?.length > 0) {
          const firstAlarm = extension.alarms[0];
          return `${firstAlarm.message} : ${firstAlarm.reason}`;
        }
      }

      return null;
    }

    handleStatusUpdate(status) {
      const color = this.node.color;
      const bgcolor = this.node.bgcolor;

      if (this.hasPrecheckAlarms(status)) {
        this.node.color = this.errorStyle.color;
        this.node.bgcolor = this.errorStyle.bgcolor;
        this.node.properties.tooltip = this.getFirstAlarm(status);
      } else {
        this.node.color = this.defaultColor;
        this.node.bgcolor = this.defaultBgColor;
        this.node.properties.tooltip = this.defaultTooltip;
      }

      if (color !== this.node.color || bgcolor !== this.node.bgcolor) {
        this.node.setDirtyCanvas(true, true);
      }
    }
  }

  class DefaultPack {
    install(graphFramework = new GraphFramework(), options) {
      this.registerBundledPacks(graphFramework, options);
      this.registerGraphExtensions(graphFramework, options);
      this.registerCanvasExtensions(graphFramework, options);
      this.registerEditorExtensions(graphFramework, options);
      this.registerNodeExtensions(graphFramework, options);
      this.registerWidgets(graphFramework, options);
    }

    registerBundledPacks(graphFramework, options = {}) {
      // you can ship other packs within packs.  we call these bundled packs.
      // this just triggers install on the bundled pack.
    }

    registerGraphExtensions(graphFramework, options = {}) {
      // add any default graph extensions here.  It's good practice to make
      // these switchable via the options object.
      // graphFramework.registerGraphExtension(...);
    }

    registerCanvasExtensions(graphFramework, options = {}) {
      // add any default canvas extensions here.  It's good practice to make
      // these switchable via the options object.
      // graphFramework.registerCanvasExtension(...);
    }

    registerEditorExtensions(graphFramework, options = {}) {
      // add any default editor extensions here.  It's good practice to make
      // these switchable via the options object.
      graphFramework.registerEditorExtension(GetBlueprintsExtension);
      graphFramework.registerEditorExtension(EditorAutoUpdateExtension);
      graphFramework.registerEditorExtension(ShowExecuteOrderExtension);
    }

    registerNodeExtensions(graphFramework, options = {}) {
      // add any default node extensions here.  It's good practice to make
      // these switchable via the options object.
      graphFramework.registerNodeExtension(PreExecutionCheckExtension);
    }
    registerWidgets(graphFramework, options = {}) {
      // add any default widgets here.  It's good practice to make
      // these switchable via the options object.
      // graphFramework.registerWidgetType(...);
    }

    registerFileAssociation(graphFramework, options = {}) {
      // add any default fill associations here.  It's good practice to make
      // these switchable via the options object.
      // graphFramework.registerFileAssociation(
      //   ["jpg", "png", "bmp"], // array of file types
      //   "Demo/MyNode", // node which will handle the drop
      //   "myParameter" // parameter which will handle the drop
      // );
    }
  }

  exports.CheckboxComponent = CheckboxComponent;
  exports.ColorGenerator = ColorGenerator;
  exports.ComboboxComponent = ComboboxComponent;
  exports.ControlWidget = ControlWidget;
  exports.DefaultPack = DefaultPack;
  exports.DisplayWidget = DisplayWidget;
  exports.GraphEditor = GraphEditor;
  exports.GraphFramework = GraphFramework;
  exports.LedComponent = LedComponent;
  exports.NumberLimiter = NumberLimiter;
  exports.NumericDisplayComponent = NumericDisplayComponent;
  exports.NumericInputComponent = NumericInputComponent;
  exports.SingleLineTextDisplayComponent = SingleLineTextDisplayComponent;
  exports.SingleLineTextInputComponent = SingleLineTextInputComponent;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
