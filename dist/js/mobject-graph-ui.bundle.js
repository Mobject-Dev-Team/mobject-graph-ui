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
  mobjectLitegraph.LiteGraph.dialog_close_on_mouse_leave = false;
  mobjectLitegraph.LiteGraph.dialog_close_on_mouse_leave_delay = 500;
  mobjectLitegraph.LiteGraph.shift_click_do_break_link_from = true;
  mobjectLitegraph.LiteGraph.click_do_break_link_to = false;
  mobjectLitegraph.LiteGraph.search_hide_on_mouse_leave = true;
  mobjectLitegraph.LiteGraph.search_filter_enabled = false;
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

  var top = 'top';
  var bottom = 'bottom';
  var right = 'right';
  var left = 'left';
  var auto = 'auto';
  var basePlacements = [top, bottom, right, left];
  var start = 'start';
  var end = 'end';
  var clippingParents = 'clippingParents';
  var viewport = 'viewport';
  var popper = 'popper';
  var reference = 'reference';
  var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []); // modifiers that need to read the DOM

  var beforeRead = 'beforeRead';
  var read = 'read';
  var afterRead = 'afterRead'; // pure-logic modifiers

  var beforeMain = 'beforeMain';
  var main = 'main';
  var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

  var beforeWrite = 'beforeWrite';
  var write = 'write';
  var afterWrite = 'afterWrite';
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
  }

  function getWindow(node) {
    if (node == null) {
      return window;
    }

    if (node.toString() !== '[object Window]') {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }

    return node;
  }

  function isElement$1(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }

  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }

  function isShadowRoot(node) {
    // IE 11 has no ShadowRoot
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }

    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }

  // and applies them to the HTMLElements such as popper and arrow

  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function (name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name]; // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe[cannot-write]


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (name) {
        var value = attributes[name];

        if (value === false) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, value === true ? '' : value);
        }
      });
    });
  }

  function effect$3(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }

    return function () {
      Object.keys(state.elements).forEach(function (name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

        var style = styleProperties.reduce(function (style, property) {
          style[property] = '';
          return style;
        }, {}); // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }

        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  } // eslint-disable-next-line import/no-unused-modules


  var applyStyles$1 = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect$3,
    requires: ['computeStyles']
  };

  function getBasePlacement(placement) {
    return placement.split('-')[0];
  }

  var max = Math.max;
  var min = Math.min;
  var round = Math.round;

  function getUAString() {
    var uaData = navigator.userAgentData;

    if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
      return uaData.brands.map(function (item) {
        return item.brand + "/" + item.version;
      }).join(' ');
    }

    return navigator.userAgent;
  }

  function isLayoutViewport() {
    return !/^((?!chrome|android).)*safari/i.test(getUAString());
  }

  function getBoundingClientRect(element, includeScale, isFixedStrategy) {
    if (includeScale === void 0) {
      includeScale = false;
    }

    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }

    var clientRect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;

    if (includeScale && isHTMLElement(element)) {
      scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
      scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
    }

    var _ref = isElement$1(element) ? getWindow(element) : window,
        visualViewport = _ref.visualViewport;

    var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
    var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
    var width = clientRect.width / scaleX;
    var height = clientRect.height / scaleY;
    return {
      width: width,
      height: height,
      top: y,
      right: x + width,
      bottom: y + height,
      left: x,
      x: x,
      y: y
    };
  }

  // means it doesn't take into account transforms.

  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
    // Fixes https://github.com/popperjs/popper-core/issues/1223

    var width = element.offsetWidth;
    var height = element.offsetHeight;

    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }

    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }

    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: width,
      height: height
    };
  }

  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

    if (parent.contains(child)) {
      return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;

        do {
          if (next && parent.isSameNode(next)) {
            return true;
          } // $FlowFixMe[prop-missing]: need a better way to handle this...


          next = next.parentNode || next.host;
        } while (next);
      } // Give up, the result is false


    return false;
  }

  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function isTableElement(element) {
    return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
  }

  function getDocumentElement(element) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return ((isElement$1(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
    element.document) || window.document).documentElement;
  }

  function getParentNode(element) {
    if (getNodeName(element) === 'html') {
      return element;
    }

    return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || ( // DOM Element detected
      isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element) // fallback

    );
  }

  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle$1(element).position === 'fixed') {
      return null;
    }

    return element.offsetParent;
  } // `.offsetParent` reports `null` for fixed elements, while absolute elements
  // return the containing block


  function getContainingBlock(element) {
    var isFirefox = /firefox/i.test(getUAString());
    var isIE = /Trident/i.test(getUAString());

    if (isIE && isHTMLElement(element)) {
      // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
      var elementCss = getComputedStyle$1(element);

      if (elementCss.position === 'fixed') {
        return null;
      }
    }

    var currentNode = getParentNode(element);

    if (isShadowRoot(currentNode)) {
      currentNode = currentNode.host;
    }

    while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
      // create a containing block.
      // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

      if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }

    return null;
  } // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.


  function getOffsetParent(element) {
    var window = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);

    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent);
    }

    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
      return window;
    }

    return offsetParent || getContainingBlock(element) || window;
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
  }

  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }
  function withinMaxClamp(min, value, max) {
    var v = within(min, value, max);
    return v > max ? max : v;
  }

  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }

  function expandToHashMap(value, keys) {
    return keys.reduce(function (hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }

  var toPaddingObject = function toPaddingObject(padding, state) {
    padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  };

  function arrow(_ref) {
    var _state$modifiersData$;

    var state = _ref.state,
        name = _ref.name,
        options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? 'height' : 'width';

    if (!arrowElement || !popperOffsets) {
      return;
    }

    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === 'y' ? top : left;
    var maxProp = axis === 'y' ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
    // outside of the popper bounds

    var min = paddingObject[minProp];
    var max = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset = within(min, center, max); // Prevents breaking syntax highlighting...

    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
  }

  function effect$2(_ref2) {
    var state = _ref2.state,
        options = _ref2.options;
    var _options$element = options.element,
        arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

    if (arrowElement == null) {
      return;
    } // CSS selector


    if (typeof arrowElement === 'string') {
      arrowElement = state.elements.popper.querySelector(arrowElement);

      if (!arrowElement) {
        return;
      }
    }

    if (!contains(state.elements.popper, arrowElement)) {
      return;
    }

    state.elements.arrow = arrowElement;
  } // eslint-disable-next-line import/no-unused-modules


  var arrow$1 = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect: effect$2,
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow']
  };

  function getVariation(placement) {
    return placement.split('-')[1];
  }

  var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
  }; // Round the offsets to the nearest suitable subpixel based on the DPR.
  // Zooming can change the DPR, but it seems to report a value that will
  // cleanly divide the values into the appropriate subpixels.

  function roundOffsetsByDPR(_ref, win) {
    var x = _ref.x,
        y = _ref.y;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0
    };
  }

  function mapToStyles(_ref2) {
    var _Object$assign2;

    var popper = _ref2.popper,
        popperRect = _ref2.popperRect,
        placement = _ref2.placement,
        variation = _ref2.variation,
        offsets = _ref2.offsets,
        position = _ref2.position,
        gpuAcceleration = _ref2.gpuAcceleration,
        adaptive = _ref2.adaptive,
        roundOffsets = _ref2.roundOffsets,
        isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x,
        x = _offsets$x === void 0 ? 0 : _offsets$x,
        _offsets$y = offsets.y,
        y = _offsets$y === void 0 ? 0 : _offsets$y;

    var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
      x: x,
      y: y
    }) : {
      x: x,
      y: y
    };

    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = left;
    var sideY = top;
    var win = window;

    if (adaptive) {
      var offsetParent = getOffsetParent(popper);
      var heightProp = 'clientHeight';
      var widthProp = 'clientWidth';

      if (offsetParent === getWindow(popper)) {
        offsetParent = getDocumentElement(popper);

        if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
          heightProp = 'scrollHeight';
          widthProp = 'scrollWidth';
        }
      } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


      offsetParent = offsetParent;

      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom;
        var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
        offsetParent[heightProp];
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }

      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right;
        var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
        offsetParent[widthProp];
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }

    var commonStyles = Object.assign({
      position: position
    }, adaptive && unsetSides);

    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
      x: x,
      y: y
    }, getWindow(popper)) : {
      x: x,
      y: y
    };

    x = _ref4.x;
    y = _ref4.y;

    if (gpuAcceleration) {
      var _Object$assign;

      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }

    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
  }

  function computeStyles(_ref5) {
    var state = _ref5.state,
        options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
        gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
        _options$adaptive = options.adaptive,
        adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
        _options$roundOffsets = options.roundOffsets,
        roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration: gpuAcceleration,
      isFixed: state.options.strategy === 'fixed'
    };

    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive,
        roundOffsets: roundOffsets
      })));
    }

    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false,
        roundOffsets: roundOffsets
      })));
    }

    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-placement': state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var computeStyles$1 = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
  };

  var passive = {
    passive: true
  };

  function effect$1(_ref) {
    var state = _ref.state,
        instance = _ref.instance,
        options = _ref.options;
    var _options$scroll = options.scroll,
        scroll = _options$scroll === void 0 ? true : _options$scroll,
        _options$resize = options.resize,
        resize = _options$resize === void 0 ? true : _options$resize;
    var window = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.addEventListener('resize', instance.update, passive);
    }

    return function () {
      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.removeEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.removeEventListener('resize', instance.update, passive);
      }
    };
  } // eslint-disable-next-line import/no-unused-modules


  var eventListeners = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {},
    effect: effect$1,
    data: {}
  };

  var hash$1 = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash$1[matched];
    });
  }

  var hash = {
    start: 'end',
    end: 'start'
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function (matched) {
      return hash[matched];
    });
  }

  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    };
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }

  function getViewportRect(element, strategy) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0;

    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      var layoutViewport = isLayoutViewport();

      if (layoutViewport || !layoutViewport && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }

    return {
      width: width,
      height: height,
      x: x + getWindowScrollBarX(element),
      y: y
    };
  }

  // of the `<html>` and `<body>` rect bounds if horizontally scrollable

  function getDocumentRect(element) {
    var _element$ownerDocumen;

    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;

    if (getComputedStyle$1(body || html).direction === 'rtl') {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }

    return {
      width: width,
      height: height,
      x: x,
      y: y
    };
  }

  function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = getComputedStyle$1(element),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }

  function getScrollParent(node) {
    if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return node.ownerDocument.body;
    }

    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }

    return getScrollParent(getParentNode(node));
  }

  /*
  given a DOM element, return the list of all scroll parents, up the list of ancesors
  until we get to the top window object. This list is what we attach scroll listeners
  to, because if any of these parent elements scroll, we'll need to re-calculate the
  reference element's position.
  */

  function listScrollParents(element, list) {
    var _element$ownerDocumen;

    if (list === void 0) {
      list = [];
    }

    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)));
  }

  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }

  function getInnerBoundingClientRect(element, strategy) {
    var rect = getBoundingClientRect(element, false, strategy === 'fixed');
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }

  function getClientRectFromMixedType(element, clippingParent, strategy) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement$1(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  } // A "clipping parent" is an overflowable container with the characteristic of
  // clipping (or hiding) overflowing elements with a position different from
  // `initial`


  function getClippingParents(element) {
    var clippingParents = listScrollParents(getParentNode(element));
    var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

    if (!isElement$1(clipperElement)) {
      return [];
    } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


    return clippingParents.filter(function (clippingParent) {
      return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
    });
  } // Gets the maximum area that the element is visible in due to any number of
  // clipping parents


  function getClippingRect(element, boundary, rootBoundary, strategy) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent, strategy));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  function computeOffsets(_ref) {
    var reference = _ref.reference,
        element = _ref.element,
        placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;

    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference.y - element.height
        };
        break;

      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;

      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;

      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY
        };
        break;

      default:
        offsets = {
          x: reference.x,
          y: reference.y
        };
    }

    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

    if (mainAxis != null) {
      var len = mainAxis === 'y' ? 'height' : 'width';

      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
          break;

        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
          break;
      }
    }

    return offsets;
  }

  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$placement = _options.placement,
        placement = _options$placement === void 0 ? state.placement : _options$placement,
        _options$strategy = _options.strategy,
        strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
        _options$boundary = _options.boundary,
        boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
        _options$rootBoundary = _options.rootBoundary,
        rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
        _options$elementConte = _options.elementContext,
        elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
        _options$altBoundary = _options.altBoundary,
        altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
        _options$padding = _options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: 'absolute',
      placement: placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect

    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

    if (elementContext === popper && offsetData) {
      var offset = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function (key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
        overflowOffsets[key] += offset[axis] * multiply;
      });
    }

    return overflowOffsets;
  }

  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        placement = _options.placement,
        boundary = _options.boundary,
        rootBoundary = _options.rootBoundary,
        padding = _options.padding,
        flipVariations = _options.flipVariations,
        _options$allowedAutoP = _options.allowedAutoPlacements,
        allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
      return getVariation(placement) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function (placement) {
      return allowedAutoPlacements.indexOf(placement) >= 0;
    });

    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;
    } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


    var overflows = allowedPlacements.reduce(function (acc, placement) {
      acc[placement] = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding
      })[getBasePlacement(placement)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function (a, b) {
      return overflows[a] - overflows[b];
    });
  }

  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }

    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }

  function flip(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;

    if (state.modifiersData[name]._skip) {
      return;
    }

    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
        specifiedFallbackPlacements = options.fallbackPlacements,
        padding = options.padding,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        _options$flipVariatio = options.flipVariations,
        flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
        allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
      return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        flipVariations: flipVariations,
        allowedAutoPlacements: allowedAutoPlacements
      }) : placement);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];

    for (var i = 0; i < placements.length; i++) {
      var placement = placements[i];

      var _basePlacement = getBasePlacement(placement);

      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? 'width' : 'height';
      var overflow = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        altBoundary: altBoundary,
        padding: padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }

      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];

      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }

      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }

      if (checks.every(function (check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }

      checksMap.set(placement, checks);
    }

    if (makeFallbackChecks) {
      // `2` may be desired in some cases – research later
      var numberOfChecks = flipVariations ? 3 : 1;

      var _loop = function _loop(_i) {
        var fittingPlacement = placements.find(function (placement) {
          var checks = checksMap.get(placement);

          if (checks) {
            return checks.slice(0, _i).every(function (check) {
              return check;
            });
          }
        });

        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };

      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);

        if (_ret === "break") break;
      }
    }

    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  } // eslint-disable-next-line import/no-unused-modules


  var flip$1 = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: ['offset'],
    data: {
      _skip: false
    }
  };

  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }

    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }

  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function (side) {
      return overflow[side] >= 0;
    });
  }

  function hide(_ref) {
    var state = _ref.state,
        name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: 'reference'
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets: referenceClippingOffsets,
      popperEscapeOffsets: popperEscapeOffsets,
      isReferenceHidden: isReferenceHidden,
      hasPopperEscaped: hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-reference-hidden': isReferenceHidden,
      'data-popper-escaped': hasPopperEscaped
    });
  } // eslint-disable-next-line import/no-unused-modules


  var hide$1 = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn: hide
  };

  function distanceAndSkiddingToXY(placement, rects, offset) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

    var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
        skidding = _ref[0],
        distance = _ref[1];

    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }

  function offset(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$offset = options.offset,
        offset = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function (acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement],
        x = _data$state$placement.x,
        y = _data$state$placement.y;

    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var offset$1 = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset
  };

  function popperOffsets(_ref) {
    var state = _ref.state,
        name = _ref.name;
    // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: 'absolute',
      placement: state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var popperOffsets$1 = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {}
  };

  function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  function preventOverflow(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        padding = options.padding,
        _options$tether = options.tether,
        tether = _options$tether === void 0 ? true : _options$tether,
        _options$tetherOffset = options.tetherOffset,
        tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      altBoundary: altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
      mainAxis: tetherOffsetValue,
      altAxis: tetherOffsetValue
    } : Object.assign({
      mainAxis: 0,
      altAxis: 0
    }, tetherOffsetValue);
    var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
    var data = {
      x: 0,
      y: 0
    };

    if (!popperOffsets) {
      return;
    }

    if (checkMainAxis) {
      var _offsetModifierState$;

      var mainSide = mainAxis === 'y' ? top : left;
      var altSide = mainAxis === 'y' ? bottom : right;
      var len = mainAxis === 'y' ? 'height' : 'width';
      var offset = popperOffsets[mainAxis];
      var min$1 = offset + overflow[mainSide];
      var max$1 = offset - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
      // outside the reference bounds

      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
      // to include its full size in the calculation. If the reference is small
      // and near the edge of a boundary, the popper can overflow even if the
      // reference is not overflowing as well (e.g. virtual elements with no
      // width or height)

      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
      var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = offset + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _offsetModifierState$2;

      var _mainSide = mainAxis === 'x' ? top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _len = altAxis === 'y' ? 'height' : 'width';

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

      var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

      var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

      var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

      var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var preventOverflow$1 = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: ['offset']
  };

  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }

  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = round(rect.width) / element.offsetWidth || 1;
    var scaleY = round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  } // Returns the composite rect of an element relative to its offsetParent.
  // Composite means it takes into account transforms as well as layout.


  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }

    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };

    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }

      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent, true);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }

    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function (modifier) {
      map.set(modifier.name, modifier);
    }); // On visiting object, check for its dependencies and visit them recursively

    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function (dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);

          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }

    modifiers.forEach(function (modifier) {
      if (!visited.has(modifier.name)) {
        // check for visited object
        sort(modifier);
      }
    });
    return result;
  }

  function orderModifiers(modifiers) {
    // order based on dependencies
    var orderedModifiers = order(modifiers); // order based on phase

    return modifierPhases.reduce(function (acc, phase) {
      return acc.concat(orderedModifiers.filter(function (modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }

  function debounce(fn) {
    var pending;
    return function () {
      if (!pending) {
        pending = new Promise(function (resolve) {
          Promise.resolve().then(function () {
            pending = undefined;
            resolve(fn());
          });
        });
      }

      return pending;
    };
  }

  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function (merged, current) {
      var existing = merged[current.name];
      merged[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged;
    }, {}); // IE11 does not support Object.values

    return Object.keys(merged).map(function (key) {
      return merged[key];
    });
  }

  var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
  };

  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !args.some(function (element) {
      return !(element && typeof element.getBoundingClientRect === 'function');
    });
  }

  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }

    var _generatorOptions = generatorOptions,
        _generatorOptions$def = _generatorOptions.defaultModifiers,
        defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
        _generatorOptions$def2 = _generatorOptions.defaultOptions,
        defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference, popper, options) {
      if (options === void 0) {
        options = defaultOptions;
      }

      var state = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference,
          popper: popper
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state: state,
        setOptions: function setOptions(setOptionsAction) {
          var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options);
          state.scrollParents = {
            reference: isElement$1(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
            popper: listScrollParents(popper)
          }; // Orders the modifiers based on their dependencies and `phase`
          // properties

          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

          state.orderedModifiers = orderedModifiers.filter(function (m) {
            return m.enabled;
          });
          runModifierEffects();
          return instance.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }

          var _state$elements = state.elements,
              reference = _state$elements.reference,
              popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
          // anymore

          if (!areValidElements(reference, popper)) {
            return;
          } // Store the reference and popper rects to be read by modifiers


          state.rects = {
            reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
            popper: getLayoutRect(popper)
          }; // Modifiers have the ability to reset the current update cycle. The
          // most common use case for this is the `flip` modifier changing the
          // placement, which then needs to re-run all the modifiers, because the
          // logic was previously ran for the previous placement and is therefore
          // stale/incorrect

          state.reset = false;
          state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
          // is filled with the initial data specified by the modifier. This means
          // it doesn't persist and is fresh on each update.
          // To ensure persistent data, use `${name}#persistent`

          state.orderedModifiers.forEach(function (modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });

          for (var index = 0; index < state.orderedModifiers.length; index++) {
            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }

            var _state$orderedModifie = state.orderedModifiers[index],
                fn = _state$orderedModifie.fn,
                _state$orderedModifie2 = _state$orderedModifie.options,
                _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                name = _state$orderedModifie.name;

            if (typeof fn === 'function') {
              state = fn({
                state: state,
                options: _options,
                name: name,
                instance: instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function () {
          return new Promise(function (resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };

      if (!areValidElements(reference, popper)) {
        return instance;
      }

      instance.setOptions(options).then(function (state) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state);
        }
      }); // Modifiers have the ability to execute arbitrary code before the first
      // update cycle runs. They will be executed in the same order as the update
      // cycle. This is useful when a modifier adds some persistent data that
      // other modifiers need to use, but the modifier is run after the dependent
      // one.

      function runModifierEffects() {
        state.orderedModifiers.forEach(function (_ref) {
          var name = _ref.name,
              _ref$options = _ref.options,
              options = _ref$options === void 0 ? {} : _ref$options,
              effect = _ref.effect;

          if (typeof effect === 'function') {
            var cleanupFn = effect({
              state: state,
              name: name,
              instance: instance,
              options: options
            });

            var noopFn = function noopFn() {};

            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }

      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function (fn) {
          return fn();
        });
        effectCleanupFns = [];
      }

      return instance;
    };
  }
  var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

  var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
  var createPopper$1 = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers$1
  }); // eslint-disable-next-line import/no-unused-modules

  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers
  }); // eslint-disable-next-line import/no-unused-modules

  var Popper = /*#__PURE__*/Object.freeze({
    __proto__: null,
    popperGenerator: popperGenerator,
    detectOverflow: detectOverflow,
    createPopperBase: createPopper$2,
    createPopper: createPopper,
    createPopperLite: createPopper$1,
    top: top,
    bottom: bottom,
    right: right,
    left: left,
    auto: auto,
    basePlacements: basePlacements,
    start: start,
    end: end,
    clippingParents: clippingParents,
    viewport: viewport,
    popper: popper,
    reference: reference,
    variationPlacements: variationPlacements,
    placements: placements,
    beforeRead: beforeRead,
    read: read,
    afterRead: afterRead,
    beforeMain: beforeMain,
    main: main,
    afterMain: afterMain,
    beforeWrite: beforeWrite,
    write: write,
    afterWrite: afterWrite,
    modifierPhases: modifierPhases,
    applyStyles: applyStyles$1,
    arrow: arrow$1,
    computeStyles: computeStyles$1,
    eventListeners: eventListeners,
    flip: flip$1,
    hide: hide$1,
    offset: offset$1,
    popperOffsets: popperOffsets$1,
    preventOverflow: preventOverflow$1
  });

  /*!
    * Bootstrap v5.3.3 (https://getbootstrap.com/)
    * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    */

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const elementMap = new Map();
  const Data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }
      const instanceMap = elementMap.get(element);

      // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used
      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }
      instanceMap.set(key, instance);
    },
    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }
      return null;
    },
    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }
      const instanceMap = elementMap.get(element);
      instanceMap.delete(key);

      // free up element references if there are no instances left for an element
      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;
  const TRANSITION_END = 'transitionend';

  /**
   * Properly escape IDs selectors to handle weird IDs
   * @param {string} selector
   * @returns {string}
   */
  const parseSelector = selector => {
    if (selector && window.CSS && window.CSS.escape) {
      // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
      selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
    }
    return selector;
  };

  // Shout-out Angus Croll (https://goo.gl/pxwQGp)
  const toType = object => {
    if (object === null || object === undefined) {
      return `${object}`;
    }
    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
  };

  /**
   * Public Util API
   */

  const getUID = prefix => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));
    return prefix;
  };
  const getTransitionDurationFromElement = element => {
    if (!element) {
      return 0;
    }

    // Get transition-duration of the element
    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay);

    // Return 0 if element or transition duration is not found
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    }

    // If multiple durations are defined, take the first
    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };
  const triggerTransitionEnd = element => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };
  const isElement = object => {
    if (!object || typeof object !== 'object') {
      return false;
    }
    if (typeof object.jquery !== 'undefined') {
      object = object[0];
    }
    return typeof object.nodeType !== 'undefined';
  };
  const getElement = object => {
    // it's a jQuery object or a node element
    if (isElement(object)) {
      return object.jquery ? object[0] : object;
    }
    if (typeof object === 'string' && object.length > 0) {
      return document.querySelector(parseSelector(object));
    }
    return null;
  };
  const isVisible = element => {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }
    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
    // Handle `details` element as its content may falsie appear visible when it is closed
    const closedDetails = element.closest('details:not([open])');
    if (!closedDetails) {
      return elementIsVisible;
    }
    if (closedDetails !== element) {
      const summary = element.closest('summary');
      if (summary && summary.parentNode !== closedDetails) {
        return false;
      }
      if (summary === null) {
        return false;
      }
    }
    return elementIsVisible;
  };
  const isDisabled = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }
    if (element.classList.contains('disabled')) {
      return true;
    }
    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }
    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };
  const findShadowRoot = element => {
    if (!document.documentElement.attachShadow) {
      return null;
    }

    // Can find the shadow root otherwise it'll return the document
    if (typeof element.getRootNode === 'function') {
      const root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }
    if (element instanceof ShadowRoot) {
      return element;
    }

    // when we don't find a shadow root
    if (!element.parentNode) {
      return null;
    }
    return findShadowRoot(element.parentNode);
  };
  const noop = () => {};

  /**
   * Trick to restart an element's animation
   *
   * @param {HTMLElement} element
   * @return void
   *
   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
   */
  const reflow = element => {
    element.offsetHeight; // eslint-disable-line no-unused-expressions
  };
  const getjQuery = () => {
    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return window.jQuery;
    }
    return null;
  };
  const DOMContentLoadedCallbacks = [];
  const onDOMContentLoaded = callback => {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', () => {
          for (const callback of DOMContentLoadedCallbacks) {
            callback();
          }
        });
      }
      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };
  const isRTL = () => document.documentElement.dir === 'rtl';
  const defineJQueryPlugin = plugin => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      /* istanbul ignore if */
      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;
        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };
  const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
    return typeof possibleCallback === 'function' ? possibleCallback(...args) : defaultValue;
  };
  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }
    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;
    const handler = ({
      target
    }) => {
      if (target !== transitionElement) {
        return;
      }
      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };
    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };

  /**
   * Return the previous/next element of a list.
   *
   * @param {array} list    The list of elements
   * @param activeElement   The active element
   * @param shouldGetNext   Choose to get next or previous element
   * @param isCycleAllowed
   * @return {Element|elem} The proper element
   */
  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    const listLength = list.length;
    let index = list.indexOf(activeElement);

    // if the element does not exist in the list return an element
    // depending on the direction and if cycle is allowed
    if (index === -1) {
      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    }
    index += shouldGetNext ? 1 : -1;
    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }
    return list[Math.max(0, Math.min(index, listLength - 1))];
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  const stripNameRegex = /\..*/;
  const stripUidRegex = /::\d+$/;
  const eventRegistry = {}; // Events storage
  let uidEvent = 1;
  const customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);

  /**
   * Private methods
   */

  function makeEventUid(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }
  function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }
  function bootstrapHandler(element, fn) {
    return function handler(event) {
      hydrateObj(event, {
        delegateTarget: element
      });
      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }
      return fn.apply(element, [event]);
    };
  }
  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);
      for (let {
        target
      } = event; target && target !== this; target = target.parentNode) {
        for (const domElement of domElements) {
          if (domElement !== target) {
            continue;
          }
          hydrateObj(event, {
            delegateTarget: target
          });
          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn);
          }
          return fn.apply(target, [event]);
        }
      }
    };
  }
  function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
  }
  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === 'string';
    // TODO: tooltip passes `false` instead of selector, so we need to check
    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);
    if (!nativeEvents.has(typeEvent)) {
      typeEvent = originalTypeEvent;
    }
    return [isDelegated, callable, typeEvent];
  }
  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }
    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);

    // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does
    if (originalTypeEvent in customEvents) {
      const wrapFunction = fn => {
        return function (event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn.call(this, event);
          }
        };
      };
      callable = wrapFunction(callable);
    }
    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
    if (previousFunction) {
      previousFunction.oneOff = previousFunction.oneOff && oneOff;
      return;
    }
    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn.delegationSelector = isDelegated ? handler : null;
    fn.callable = callable;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, isDelegated);
  }
  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);
    if (!fn) {
      return;
    }
    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }
  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};
    for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
      if (handlerKey.includes(namespace)) {
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  }
  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event;
  }
  const EventHandler = {
    on(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, false);
    },
    one(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, true);
    },
    off(element, originalTypeEvent, handler, delegationFunction) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }
      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getElementEvents(element);
      const storeElementEvent = events[typeEvent] || {};
      const isNamespace = originalTypeEvent.startsWith('.');
      if (typeof callable !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!Object.keys(storeElementEvent).length) {
          return;
        }
        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
        return;
      }
      if (isNamespace) {
        for (const elementEvent of Object.keys(events)) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        }
      }
      for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
        const handlerKey = keyHandlers.replace(stripUidRegex, '');
        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    },
    trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }
      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      let jQueryEvent = null;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;
      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }
      const evt = hydrateObj(new Event(event, {
        bubbles,
        cancelable: true
      }), args);
      if (defaultPrevented) {
        evt.preventDefault();
      }
      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }
      if (evt.defaultPrevented && jQueryEvent) {
        jQueryEvent.preventDefault();
      }
      return evt;
    }
  };
  function hydrateObj(obj, meta = {}) {
    for (const [key, value] of Object.entries(meta)) {
      try {
        obj[key] = value;
      } catch (_unused) {
        Object.defineProperty(obj, key, {
          configurable: true,
          get() {
            return value;
          }
        });
      }
    }
    return obj;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  function normalizeData(value) {
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
    if (value === Number(value).toString()) {
      return Number(value);
    }
    if (value === '' || value === 'null') {
      return null;
    }
    if (typeof value !== 'string') {
      return value;
    }
    try {
      return JSON.parse(decodeURIComponent(value));
    } catch (_unused) {
      return value;
    }
  }
  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
  }
  const Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },
    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },
    getDataAttributes(element) {
      if (!element) {
        return {};
      }
      const attributes = {};
      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
      for (const key of bsKeys) {
        let pureKey = key.replace(/^bs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }
      return attributes;
    },
    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/config.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Class definition
   */

  class Config {
    // Getters
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      return config;
    }
    _mergeConfigObj(config, element) {
      const jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

      return {
        ...this.constructor.Default,
        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
        ...(isElement(element) ? Manipulator.getDataAttributes(element) : {}),
        ...(typeof config === 'object' ? config : {})
      };
    }
    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
      for (const [property, expectedTypes] of Object.entries(configTypes)) {
        const value = config[property];
        const valueType = isElement(value) ? 'element' : toType(value);
        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
        }
      }
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const VERSION = '5.3.3';

  /**
   * Class definition
   */

  class BaseComponent extends Config {
    constructor(element, config) {
      super();
      element = getElement(element);
      if (!element) {
        return;
      }
      this._element = element;
      this._config = this._getConfig(config);
      Data.set(this._element, this.constructor.DATA_KEY, this);
    }

    // Public
    dispose() {
      Data.remove(this._element, this.constructor.DATA_KEY);
      EventHandler.off(this._element, this.constructor.EVENT_KEY);
      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null;
      }
    }
    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }

    // Static
    static getInstance(element) {
      return Data.get(getElement(element), this.DATA_KEY);
    }
    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
    }
    static get VERSION() {
      return VERSION;
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(name) {
      return `${name}${this.EVENT_KEY}`;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const getSelector = element => {
    let selector = element.getAttribute('data-bs-target');
    if (!selector || selector === '#') {
      let hrefAttribute = element.getAttribute('href');

      // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273
      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
        return null;
      }

      // Just in case some CMS puts out a full URL with the anchor appended
      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
      }
      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
    }
    return selector ? selector.split(',').map(sel => parseSelector(sel)).join(',') : null;
  };
  const SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },
    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },
    children(element, selector) {
      return [].concat(...element.children).filter(child => child.matches(selector));
    },
    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode.closest(selector);
      while (ancestor) {
        parents.push(ancestor);
        ancestor = ancestor.parentNode.closest(selector);
      }
      return parents;
    },
    prev(element, selector) {
      let previous = element.previousElementSibling;
      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }
        previous = previous.previousElementSibling;
      }
      return [];
    },
    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
      let next = element.nextElementSibling;
      while (next) {
        if (next.matches(selector)) {
          return [next];
        }
        next = next.nextElementSibling;
      }
      return [];
    },
    focusableChildren(element) {
      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
      return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
    },
    getSelectorFromElement(element) {
      const selector = getSelector(element);
      if (selector) {
        return SelectorEngine.findOne(selector) ? selector : null;
      }
      return null;
    },
    getElementFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.findOne(selector) : null;
    },
    getMultipleElementsFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.find(selector) : [];
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/component-functions.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const enableDismissTrigger = (component, method = 'hide') => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
      if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
      }
      if (isDisabled(this)) {
        return;
      }
      const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target);

      // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
      instance[method]();
    });
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$f = 'alert';
  const DATA_KEY$a = 'bs.alert';
  const EVENT_KEY$b = `.${DATA_KEY$a}`;
  const EVENT_CLOSE = `close${EVENT_KEY$b}`;
  const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
  const CLASS_NAME_FADE$5 = 'fade';
  const CLASS_NAME_SHOW$8 = 'show';

  /**
   * Class definition
   */

  class Alert extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$f;
    }

    // Public
    close() {
      const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
      if (closeEvent.defaultPrevented) {
        return;
      }
      this._element.classList.remove(CLASS_NAME_SHOW$8);
      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
    }

    // Private
    _destroyElement() {
      this._element.remove();
      EventHandler.trigger(this._element, EVENT_CLOSED);
      this.dispose();
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Alert.getOrCreateInstance(this);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  }

  /**
   * Data API implementation
   */

  enableDismissTrigger(Alert, 'close');

  /**
   * jQuery
   */

  defineJQueryPlugin(Alert);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$e = 'button';
  const DATA_KEY$9 = 'bs.button';
  const EVENT_KEY$a = `.${DATA_KEY$9}`;
  const DATA_API_KEY$6 = '.data-api';
  const CLASS_NAME_ACTIVE$3 = 'active';
  const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
  const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;

  /**
   * Class definition
   */

  class Button extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$e;
    }

    // Public
    toggle() {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Button.getOrCreateInstance(this);
        if (config === 'toggle') {
          data[config]();
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
    event.preventDefault();
    const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
    const data = Button.getOrCreateInstance(button);
    data.toggle();
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Button);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/swipe.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$d = 'swipe';
  const EVENT_KEY$9 = '.bs.swipe';
  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
  const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
  const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
  const POINTER_TYPE_TOUCH = 'touch';
  const POINTER_TYPE_PEN = 'pen';
  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
  const SWIPE_THRESHOLD = 40;
  const Default$c = {
    endCallback: null,
    leftCallback: null,
    rightCallback: null
  };
  const DefaultType$c = {
    endCallback: '(function|null)',
    leftCallback: '(function|null)',
    rightCallback: '(function|null)'
  };

  /**
   * Class definition
   */

  class Swipe extends Config {
    constructor(element, config) {
      super();
      this._element = element;
      if (!element || !Swipe.isSupported()) {
        return;
      }
      this._config = this._getConfig(config);
      this._deltaX = 0;
      this._supportPointerEvents = Boolean(window.PointerEvent);
      this._initEvents();
    }

    // Getters
    static get Default() {
      return Default$c;
    }
    static get DefaultType() {
      return DefaultType$c;
    }
    static get NAME() {
      return NAME$d;
    }

    // Public
    dispose() {
      EventHandler.off(this._element, EVENT_KEY$9);
    }

    // Private
    _start(event) {
      if (!this._supportPointerEvents) {
        this._deltaX = event.touches[0].clientX;
        return;
      }
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX;
      }
    }
    _end(event) {
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX - this._deltaX;
      }
      this._handleSwipe();
      execute(this._config.endCallback);
    }
    _move(event) {
      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const absDeltaX = Math.abs(this._deltaX);
      if (absDeltaX <= SWIPE_THRESHOLD) {
        return;
      }
      const direction = absDeltaX / this._deltaX;
      this._deltaX = 0;
      if (!direction) {
        return;
      }
      execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      if (this._supportPointerEvents) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
        EventHandler.on(this._element, EVENT_POINTERUP, event => this._end(event));
        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
        EventHandler.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
        EventHandler.on(this._element, EVENT_TOUCHEND, event => this._end(event));
      }
    }
    _eventIsPointerPenTouch(event) {
      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
    }

    // Static
    static isSupported() {
      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$c = 'carousel';
  const DATA_KEY$8 = 'bs.carousel';
  const EVENT_KEY$8 = `.${DATA_KEY$8}`;
  const DATA_API_KEY$5 = '.data-api';
  const ARROW_LEFT_KEY$1 = 'ArrowLeft';
  const ARROW_RIGHT_KEY$1 = 'ArrowRight';
  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  const ORDER_NEXT = 'next';
  const ORDER_PREV = 'prev';
  const DIRECTION_LEFT = 'left';
  const DIRECTION_RIGHT = 'right';
  const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
  const EVENT_SLID = `slid${EVENT_KEY$8}`;
  const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
  const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
  const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
  const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
  const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const CLASS_NAME_CAROUSEL = 'carousel';
  const CLASS_NAME_ACTIVE$2 = 'active';
  const CLASS_NAME_SLIDE = 'slide';
  const CLASS_NAME_END = 'carousel-item-end';
  const CLASS_NAME_START = 'carousel-item-start';
  const CLASS_NAME_NEXT = 'carousel-item-next';
  const CLASS_NAME_PREV = 'carousel-item-prev';
  const SELECTOR_ACTIVE = '.active';
  const SELECTOR_ITEM = '.carousel-item';
  const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
  const SELECTOR_ITEM_IMG = '.carousel-item img';
  const SELECTOR_INDICATORS = '.carousel-indicators';
  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
  const KEY_TO_DIRECTION = {
    [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
    [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
  };
  const Default$b = {
    interval: 5000,
    keyboard: true,
    pause: 'hover',
    ride: false,
    touch: true,
    wrap: true
  };
  const DefaultType$b = {
    interval: '(number|boolean)',
    // TODO:v6 remove boolean support
    keyboard: 'boolean',
    pause: '(string|boolean)',
    ride: '(boolean|string)',
    touch: 'boolean',
    wrap: 'boolean'
  };

  /**
   * Class definition
   */

  class Carousel extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._interval = null;
      this._activeElement = null;
      this._isSliding = false;
      this.touchTimeout = null;
      this._swipeHelper = null;
      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
      this._addEventListeners();
      if (this._config.ride === CLASS_NAME_CAROUSEL) {
        this.cycle();
      }
    }

    // Getters
    static get Default() {
      return Default$b;
    }
    static get DefaultType() {
      return DefaultType$b;
    }
    static get NAME() {
      return NAME$c;
    }

    // Public
    next() {
      this._slide(ORDER_NEXT);
    }
    nextWhenVisible() {
      // FIXME TODO use `document.visibilityState`
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    }
    prev() {
      this._slide(ORDER_PREV);
    }
    pause() {
      if (this._isSliding) {
        triggerTransitionEnd(this._element);
      }
      this._clearInterval();
    }
    cycle() {
      this._clearInterval();
      this._updateInterval();
      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
    }
    _maybeEnableCycle() {
      if (!this._config.ride) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
        return;
      }
      this.cycle();
    }
    to(index) {
      const items = this._getItems();
      if (index > items.length - 1 || index < 0) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
        return;
      }
      const activeIndex = this._getItemIndex(this._getActive());
      if (activeIndex === index) {
        return;
      }
      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
      this._slide(order, items[index]);
    }
    dispose() {
      if (this._swipeHelper) {
        this._swipeHelper.dispose();
      }
      super.dispose();
    }

    // Private
    _configAfterMerge(config) {
      config.defaultInterval = config.interval;
      return config;
    }
    _addEventListeners() {
      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN$1, event => this._keydown(event));
      }
      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
        EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
      }
      if (this._config.touch && Swipe.isSupported()) {
        this._addTouchEventListeners();
      }
    }
    _addTouchEventListeners() {
      for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
        EventHandler.on(img, EVENT_DRAG_START, event => event.preventDefault());
      }
      const endCallBack = () => {
        if (this._config.pause !== 'hover') {
          return;
        }

        // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling

        this.pause();
        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout);
        }
        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
      };
      const swipeConfig = {
        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
        endCallback: endCallBack
      };
      this._swipeHelper = new Swipe(this._element, swipeConfig);
    }
    _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }
      const direction = KEY_TO_DIRECTION[event.key];
      if (direction) {
        event.preventDefault();
        this._slide(this._directionToOrder(direction));
      }
    }
    _getItemIndex(element) {
      return this._getItems().indexOf(element);
    }
    _setActiveIndicatorElement(index) {
      if (!this._indicatorsElement) {
        return;
      }
      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
      activeIndicator.removeAttribute('aria-current');
      const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
      if (newActiveIndicator) {
        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
        newActiveIndicator.setAttribute('aria-current', 'true');
      }
    }
    _updateInterval() {
      const element = this._activeElement || this._getActive();
      if (!element) {
        return;
      }
      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
      this._config.interval = elementInterval || this._config.defaultInterval;
    }
    _slide(order, element = null) {
      if (this._isSliding) {
        return;
      }
      const activeElement = this._getActive();
      const isNext = order === ORDER_NEXT;
      const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
      if (nextElement === activeElement) {
        return;
      }
      const nextElementIndex = this._getItemIndex(nextElement);
      const triggerEvent = eventName => {
        return EventHandler.trigger(this._element, eventName, {
          relatedTarget: nextElement,
          direction: this._orderToDirection(order),
          from: this._getItemIndex(activeElement),
          to: nextElementIndex
        });
      };
      const slideEvent = triggerEvent(EVENT_SLIDE);
      if (slideEvent.defaultPrevented) {
        return;
      }
      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        // TODO: change tests that use empty divs to avoid this check
        return;
      }
      const isCycling = Boolean(this._interval);
      this.pause();
      this._isSliding = true;
      this._setActiveIndicatorElement(nextElementIndex);
      this._activeElement = nextElement;
      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
      nextElement.classList.add(orderClassName);
      reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);
      const completeCallBack = () => {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
        this._isSliding = false;
        triggerEvent(EVENT_SLID);
      };
      this._queueCallback(completeCallBack, activeElement, this._isAnimated());
      if (isCycling) {
        this.cycle();
      }
    }
    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_SLIDE);
    }
    _getActive() {
      return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    }
    _getItems() {
      return SelectorEngine.find(SELECTOR_ITEM, this._element);
    }
    _clearInterval() {
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
    }
    _directionToOrder(direction) {
      if (isRTL()) {
        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
      }
      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    }
    _orderToDirection(order) {
      if (isRTL()) {
        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }
      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Carousel.getOrCreateInstance(this, config);
        if (typeof config === 'number') {
          data.to(config);
          return;
        }
        if (typeof config === 'string') {
          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }
    event.preventDefault();
    const carousel = Carousel.getOrCreateInstance(target);
    const slideIndex = this.getAttribute('data-bs-slide-to');
    if (slideIndex) {
      carousel.to(slideIndex);
      carousel._maybeEnableCycle();
      return;
    }
    if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
      carousel.next();
      carousel._maybeEnableCycle();
      return;
    }
    carousel.prev();
    carousel._maybeEnableCycle();
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
    for (const carousel of carousels) {
      Carousel.getOrCreateInstance(carousel);
    }
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Carousel);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$b = 'collapse';
  const DATA_KEY$7 = 'bs.collapse';
  const EVENT_KEY$7 = `.${DATA_KEY$7}`;
  const DATA_API_KEY$4 = '.data-api';
  const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
  const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
  const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
  const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
  const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
  const CLASS_NAME_SHOW$7 = 'show';
  const CLASS_NAME_COLLAPSE = 'collapse';
  const CLASS_NAME_COLLAPSING = 'collapsing';
  const CLASS_NAME_COLLAPSED = 'collapsed';
  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
  const WIDTH = 'width';
  const HEIGHT = 'height';
  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
  const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
  const Default$a = {
    parent: null,
    toggle: true
  };
  const DefaultType$a = {
    parent: '(null|element)',
    toggle: 'boolean'
  };

  /**
   * Class definition
   */

  class Collapse extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isTransitioning = false;
      this._triggerArray = [];
      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
      for (const elem of toggleList) {
        const selector = SelectorEngine.getSelectorFromElement(elem);
        const filterElement = SelectorEngine.find(selector).filter(foundElement => foundElement === this._element);
        if (selector !== null && filterElement.length) {
          this._triggerArray.push(elem);
        }
      }
      this._initializeChildren();
      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }
      if (this._config.toggle) {
        this.toggle();
      }
    }

    // Getters
    static get Default() {
      return Default$a;
    }
    static get DefaultType() {
      return DefaultType$a;
    }
    static get NAME() {
      return NAME$b;
    }

    // Public
    toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }
    show() {
      if (this._isTransitioning || this._isShown()) {
        return;
      }
      let activeChildren = [];

      // find active children
      if (this._config.parent) {
        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
          toggle: false
        }));
      }
      if (activeChildren.length && activeChildren[0]._isTransitioning) {
        return;
      }
      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
      if (startEvent.defaultPrevented) {
        return;
      }
      for (const activeInstance of activeChildren) {
        activeInstance.hide();
      }
      const dimension = this._getDimension();
      this._element.classList.remove(CLASS_NAME_COLLAPSE);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;
      this._addAriaAndCollapsedClass(this._triggerArray, true);
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
        this._element.style[dimension] = '';
        EventHandler.trigger(this._element, EVENT_SHOWN$6);
      };
      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;
      this._queueCallback(complete, this._element, true);
      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }
    hide() {
      if (this._isTransitioning || !this._isShown()) {
        return;
      }
      const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
      if (startEvent.defaultPrevented) {
        return;
      }
      const dimension = this._getDimension();
      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
      for (const trigger of this._triggerArray) {
        const element = SelectorEngine.getElementFromSelector(trigger);
        if (element && !this._isShown(element)) {
          this._addAriaAndCollapsedClass([trigger], false);
        }
      }
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE);
        EventHandler.trigger(this._element, EVENT_HIDDEN$6);
      };
      this._element.style[dimension] = '';
      this._queueCallback(complete, this._element, true);
    }
    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW$7);
    }

    // Private
    _configAfterMerge(config) {
      config.toggle = Boolean(config.toggle); // Coerce string values
      config.parent = getElement(config.parent);
      return config;
    }
    _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    }
    _initializeChildren() {
      if (!this._config.parent) {
        return;
      }
      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
      for (const element of children) {
        const selected = SelectorEngine.getElementFromSelector(element);
        if (selected) {
          this._addAriaAndCollapsedClass([element], this._isShown(selected));
        }
      }
    }
    _getFirstLevelChildren(selector) {
      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      // remove children if greater depth
      return SelectorEngine.find(selector, this._config.parent).filter(element => !children.includes(element));
    }
    _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }
      for (const element of triggerArray) {
        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
        element.setAttribute('aria-expanded', isOpen);
      }
    }

    // Static
    static jQueryInterface(config) {
      const _config = {};
      if (typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }
      return this.each(function () {
        const data = Collapse.getOrCreateInstance(this, _config);
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
      event.preventDefault();
    }
    for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
      Collapse.getOrCreateInstance(element, {
        toggle: false
      }).toggle();
    }
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Collapse);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$a = 'dropdown';
  const DATA_KEY$6 = 'bs.dropdown';
  const EVENT_KEY$6 = `.${DATA_KEY$6}`;
  const DATA_API_KEY$3 = '.data-api';
  const ESCAPE_KEY$2 = 'Escape';
  const TAB_KEY$1 = 'Tab';
  const ARROW_UP_KEY$1 = 'ArrowUp';
  const ARROW_DOWN_KEY$1 = 'ArrowDown';
  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  const EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
  const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
  const EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
  const EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
  const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const CLASS_NAME_SHOW$6 = 'show';
  const CLASS_NAME_DROPUP = 'dropup';
  const CLASS_NAME_DROPEND = 'dropend';
  const CLASS_NAME_DROPSTART = 'dropstart';
  const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
  const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
  const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
  const SELECTOR_MENU = '.dropdown-menu';
  const SELECTOR_NAVBAR = '.navbar';
  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
  const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
  const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
  const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
  const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
  const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
  const PLACEMENT_TOPCENTER = 'top';
  const PLACEMENT_BOTTOMCENTER = 'bottom';
  const Default$9 = {
    autoClose: true,
    boundary: 'clippingParents',
    display: 'dynamic',
    offset: [0, 2],
    popperConfig: null,
    reference: 'toggle'
  };
  const DefaultType$9 = {
    autoClose: '(boolean|string)',
    boundary: '(string|element)',
    display: 'string',
    offset: '(array|string|function)',
    popperConfig: '(null|object|function)',
    reference: '(string|element|object)'
  };

  /**
   * Class definition
   */

  class Dropdown extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._popper = null;
      this._parent = this._element.parentNode; // dropdown wrapper
      // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
      this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
      this._inNavbar = this._detectNavbar();
    }

    // Getters
    static get Default() {
      return Default$9;
    }
    static get DefaultType() {
      return DefaultType$9;
    }
    static get NAME() {
      return NAME$a;
    }

    // Public
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (isDisabled(this._element) || this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._createPopper();

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, 'mouseover', noop);
        }
      }
      this._element.focus();
      this._element.setAttribute('aria-expanded', true);
      this._menu.classList.add(CLASS_NAME_SHOW$6);
      this._element.classList.add(CLASS_NAME_SHOW$6);
      EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
    }
    hide() {
      if (isDisabled(this._element) || !this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      this._completeHide(relatedTarget);
    }
    dispose() {
      if (this._popper) {
        this._popper.destroy();
      }
      super.dispose();
    }
    update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper) {
        this._popper.update();
      }
    }

    // Private
    _completeHide(relatedTarget) {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
      if (hideEvent.defaultPrevented) {
        return;
      }

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, 'mouseover', noop);
        }
      }
      if (this._popper) {
        this._popper.destroy();
      }
      this._menu.classList.remove(CLASS_NAME_SHOW$6);
      this._element.classList.remove(CLASS_NAME_SHOW$6);
      this._element.setAttribute('aria-expanded', 'false');
      Manipulator.removeDataAttribute(this._menu, 'popper');
      EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
    }
    _getConfig(config) {
      config = super._getConfig(config);
      if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
        // Popper virtual elements require a getBoundingClientRect method
        throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      }
      return config;
    }
    _createPopper() {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
      }
      let referenceElement = this._element;
      if (this._config.reference === 'parent') {
        referenceElement = this._parent;
      } else if (isElement(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (typeof this._config.reference === 'object') {
        referenceElement = this._config.reference;
      }
      const popperConfig = this._getPopperConfig();
      this._popper = createPopper(referenceElement, this._menu, popperConfig);
    }
    _isShown() {
      return this._menu.classList.contains(CLASS_NAME_SHOW$6);
    }
    _getPlacement() {
      const parentDropdown = this._parent;
      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
        return PLACEMENT_TOPCENTER;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
        return PLACEMENT_BOTTOMCENTER;
      }

      // We need to trim the value because custom properties can also include spaces
      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }
      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }
    _detectNavbar() {
      return this._element.closest(SELECTOR_NAVBAR) !== null;
    }
    _getOffset() {
      const {
        offset
      } = this._config;
      if (typeof offset === 'string') {
        return offset.split(',').map(value => Number.parseInt(value, 10));
      }
      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }
      return offset;
    }
    _getPopperConfig() {
      const defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }]
      };

      // Disable Popper if we have a static display or Dropdown is in Navbar
      if (this._inNavbar || this._config.display === 'static') {
        Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // TODO: v6 remove
        defaultBsPopperConfig.modifiers = [{
          name: 'applyStyles',
          enabled: false
        }];
      }
      return {
        ...defaultBsPopperConfig,
        ...execute(this._config.popperConfig, [defaultBsPopperConfig])
      };
    }
    _selectMenuItem({
      key,
      target
    }) {
      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => isVisible(element));
      if (!items.length) {
        return;
      }

      // if target isn't included in items (e.g. when expanding the dropdown)
      // allow cycling to get the last item in case key equals ARROW_UP_KEY
      getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Dropdown.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
    static clearMenus(event) {
      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1) {
        return;
      }
      const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
      for (const toggle of openToggles) {
        const context = Dropdown.getInstance(toggle);
        if (!context || context._config.autoClose === false) {
          continue;
        }
        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);
        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
          continue;
        }

        // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
          continue;
        }
        const relatedTarget = {
          relatedTarget: context._element
        };
        if (event.type === 'click') {
          relatedTarget.clickEvent = event;
        }
        context._completeHide(relatedTarget);
      }
    }
    static dataApiKeydownHandler(event) {
      // If not an UP | DOWN | ESCAPE key => not a dropdown command
      // If input/textarea && if key is other than ESCAPE => not a dropdown command

      const isInput = /input|textarea/i.test(event.target.tagName);
      const isEscapeEvent = event.key === ESCAPE_KEY$2;
      const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
      if (!isUpOrDownEvent && !isEscapeEvent) {
        return;
      }
      if (isInput && !isEscapeEvent) {
        return;
      }
      event.preventDefault();

      // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
      const instance = Dropdown.getOrCreateInstance(getToggleButton);
      if (isUpOrDownEvent) {
        event.stopPropagation();
        instance.show();
        instance._selectMenuItem(event);
        return;
      }
      if (instance._isShown()) {
        // else is escape and we check if it is shown
        event.stopPropagation();
        instance.hide();
        getToggleButton.focus();
      }
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
    event.preventDefault();
    Dropdown.getOrCreateInstance(this).toggle();
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Dropdown);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/backdrop.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$9 = 'backdrop';
  const CLASS_NAME_FADE$4 = 'fade';
  const CLASS_NAME_SHOW$5 = 'show';
  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
  const Default$8 = {
    className: 'modal-backdrop',
    clickCallback: null,
    isAnimated: false,
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    rootElement: 'body' // give the choice to place backdrop under different elements
  };
  const DefaultType$8 = {
    className: 'string',
    clickCallback: '(function|null)',
    isAnimated: 'boolean',
    isVisible: 'boolean',
    rootElement: '(element|string)'
  };

  /**
   * Class definition
   */

  class Backdrop extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    }

    // Getters
    static get Default() {
      return Default$8;
    }
    static get DefaultType() {
      return DefaultType$8;
    }
    static get NAME() {
      return NAME$9;
    }

    // Public
    show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._append();
      const element = this._getElement();
      if (this._config.isAnimated) {
        reflow(element);
      }
      element.classList.add(CLASS_NAME_SHOW$5);
      this._emulateAnimation(() => {
        execute(callback);
      });
    }
    hide(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._getElement().classList.remove(CLASS_NAME_SHOW$5);
      this._emulateAnimation(() => {
        this.dispose();
        execute(callback);
      });
    }
    dispose() {
      if (!this._isAppended) {
        return;
      }
      EventHandler.off(this._element, EVENT_MOUSEDOWN);
      this._element.remove();
      this._isAppended = false;
    }

    // Private
    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement('div');
        backdrop.className = this._config.className;
        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE$4);
        }
        this._element = backdrop;
      }
      return this._element;
    }
    _configAfterMerge(config) {
      // use getElement() with the default "body" to get a fresh Element on each instantiation
      config.rootElement = getElement(config.rootElement);
      return config;
    }
    _append() {
      if (this._isAppended) {
        return;
      }
      const element = this._getElement();
      this._config.rootElement.append(element);
      EventHandler.on(element, EVENT_MOUSEDOWN, () => {
        execute(this._config.clickCallback);
      });
      this._isAppended = true;
    }
    _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/focustrap.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$8 = 'focustrap';
  const DATA_KEY$5 = 'bs.focustrap';
  const EVENT_KEY$5 = `.${DATA_KEY$5}`;
  const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
  const TAB_KEY = 'Tab';
  const TAB_NAV_FORWARD = 'forward';
  const TAB_NAV_BACKWARD = 'backward';
  const Default$7 = {
    autofocus: true,
    trapElement: null // The element to trap focus inside of
  };
  const DefaultType$7 = {
    autofocus: 'boolean',
    trapElement: 'element'
  };

  /**
   * Class definition
   */

  class FocusTrap extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isActive = false;
      this._lastTabNavDirection = null;
    }

    // Getters
    static get Default() {
      return Default$7;
    }
    static get DefaultType() {
      return DefaultType$7;
    }
    static get NAME() {
      return NAME$8;
    }

    // Public
    activate() {
      if (this._isActive) {
        return;
      }
      if (this._config.autofocus) {
        this._config.trapElement.focus();
      }
      EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop
      EventHandler.on(document, EVENT_FOCUSIN$2, event => this._handleFocusin(event));
      EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
      this._isActive = true;
    }
    deactivate() {
      if (!this._isActive) {
        return;
      }
      this._isActive = false;
      EventHandler.off(document, EVENT_KEY$5);
    }

    // Private
    _handleFocusin(event) {
      const {
        trapElement
      } = this._config;
      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
        return;
      }
      const elements = SelectorEngine.focusableChildren(trapElement);
      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }
    _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }
      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/scrollBar.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  const SELECTOR_STICKY_CONTENT = '.sticky-top';
  const PROPERTY_PADDING = 'padding-right';
  const PROPERTY_MARGIN = 'margin-right';

  /**
   * Class definition
   */

  class ScrollBarHelper {
    constructor() {
      this._element = document.body;
    }

    // Public
    getWidth() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }
    hide() {
      const width = this.getWidth();
      this._disableOverFlow();
      // give padding to element to balance the hidden scrollbar width
      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
      // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
    }
    reset() {
      this._resetElementAttributes(this._element, 'overflow');
      this._resetElementAttributes(this._element, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }

    // Private
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, 'overflow');
      this._element.style.overflow = 'hidden';
    }
    _setElementAttributes(selector, styleProperty, callback) {
      const scrollbarWidth = this.getWidth();
      const manipulationCallBack = element => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }
        this._saveInitialAttribute(element, styleProperty);
        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _saveInitialAttribute(element, styleProperty) {
      const actualValue = element.style.getPropertyValue(styleProperty);
      if (actualValue) {
        Manipulator.setDataAttribute(element, styleProperty, actualValue);
      }
    }
    _resetElementAttributes(selector, styleProperty) {
      const manipulationCallBack = element => {
        const value = Manipulator.getDataAttribute(element, styleProperty);
        // We only want to remove the property if the value is `null`; the value can also be zero
        if (value === null) {
          element.style.removeProperty(styleProperty);
          return;
        }
        Manipulator.removeDataAttribute(element, styleProperty);
        element.style.setProperty(styleProperty, value);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _applyManipulationCallback(selector, callBack) {
      if (isElement(selector)) {
        callBack(selector);
        return;
      }
      for (const sel of SelectorEngine.find(selector, this._element)) {
        callBack(sel);
      }
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$7 = 'modal';
  const DATA_KEY$4 = 'bs.modal';
  const EVENT_KEY$4 = `.${DATA_KEY$4}`;
  const DATA_API_KEY$2 = '.data-api';
  const ESCAPE_KEY$1 = 'Escape';
  const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
  const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
  const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
  const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
  const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
  const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
  const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
  const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
  const CLASS_NAME_OPEN = 'modal-open';
  const CLASS_NAME_FADE$3 = 'fade';
  const CLASS_NAME_SHOW$4 = 'show';
  const CLASS_NAME_STATIC = 'modal-static';
  const OPEN_SELECTOR$1 = '.modal.show';
  const SELECTOR_DIALOG = '.modal-dialog';
  const SELECTOR_MODAL_BODY = '.modal-body';
  const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
  const Default$6 = {
    backdrop: true,
    focus: true,
    keyboard: true
  };
  const DefaultType$6 = {
    backdrop: '(boolean|string)',
    focus: 'boolean',
    keyboard: 'boolean'
  };

  /**
   * Class definition
   */

  class Modal extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._isShown = false;
      this._isTransitioning = false;
      this._scrollBar = new ScrollBarHelper();
      this._addEventListeners();
    }

    // Getters
    static get Default() {
      return Default$6;
    }
    static get DefaultType() {
      return DefaultType$6;
    }
    static get NAME() {
      return NAME$7;
    }

    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
        relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._isTransitioning = true;
      this._scrollBar.hide();
      document.body.classList.add(CLASS_NAME_OPEN);
      this._adjustDialog();
      this._backdrop.show(() => this._showElement(relatedTarget));
    }
    hide() {
      if (!this._isShown || this._isTransitioning) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._isShown = false;
      this._isTransitioning = true;
      this._focustrap.deactivate();
      this._element.classList.remove(CLASS_NAME_SHOW$4);
      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
    }
    dispose() {
      EventHandler.off(window, EVENT_KEY$4);
      EventHandler.off(this._dialog, EVENT_KEY$4);
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }

    // Private
    _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value,
        isAnimated: this._isAnimated()
      });
    }
    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
    _showElement(relatedTarget) {
      // try to append dynamic modal
      if (!document.body.contains(this._element)) {
        document.body.append(this._element);
      }
      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.setAttribute('aria-modal', true);
      this._element.setAttribute('role', 'dialog');
      this._element.scrollTop = 0;
      const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW$4);
      const transitionComplete = () => {
        if (this._config.focus) {
          this._focustrap.activate();
        }
        this._isTransitioning = false;
        EventHandler.trigger(this._element, EVENT_SHOWN$4, {
          relatedTarget
        });
      };
      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
    }
    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
        if (event.key !== ESCAPE_KEY$1) {
          return;
        }
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      });
      EventHandler.on(window, EVENT_RESIZE$1, () => {
        if (this._isShown && !this._isTransitioning) {
          this._adjustDialog();
        }
      });
      EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
        EventHandler.one(this._element, EVENT_CLICK_DISMISS, event2 => {
          if (this._element !== event.target || this._element !== event2.target) {
            return;
          }
          if (this._config.backdrop === 'static') {
            this._triggerBackdropTransition();
            return;
          }
          if (this._config.backdrop) {
            this.hide();
          }
        });
      });
    }
    _hideModal() {
      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', true);
      this._element.removeAttribute('aria-modal');
      this._element.removeAttribute('role');
      this._isTransitioning = false;
      this._backdrop.hide(() => {
        document.body.classList.remove(CLASS_NAME_OPEN);
        this._resetAdjustments();
        this._scrollBar.reset();
        EventHandler.trigger(this._element, EVENT_HIDDEN$4);
      });
    }
    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE$3);
    }
    _triggerBackdropTransition() {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
      if (hideEvent.defaultPrevented) {
        return;
      }
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const initialOverflowY = this._element.style.overflowY;
      // return if the following background transition hasn't yet completed
      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
        return;
      }
      if (!isModalOverflowing) {
        this._element.style.overflowY = 'hidden';
      }
      this._element.classList.add(CLASS_NAME_STATIC);
      this._queueCallback(() => {
        this._element.classList.remove(CLASS_NAME_STATIC);
        this._queueCallback(() => {
          this._element.style.overflowY = initialOverflowY;
        }, this._dialog);
      }, this._dialog);
      this._element.focus();
    }

    /**
     * The following methods are used to handle overflowing modals
     */

    _adjustDialog() {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const scrollbarWidth = this._scrollBar.getWidth();
      const isBodyOverflowing = scrollbarWidth > 0;
      if (isBodyOverflowing && !isModalOverflowing) {
        const property = isRTL() ? 'paddingLeft' : 'paddingRight';
        this._element.style[property] = `${scrollbarWidth}px`;
      }
      if (!isBodyOverflowing && isModalOverflowing) {
        const property = isRTL() ? 'paddingRight' : 'paddingLeft';
        this._element.style[property] = `${scrollbarWidth}px`;
      }
    }
    _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    }

    // Static
    static jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        const data = Modal.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](relatedTarget);
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    EventHandler.one(target, EVENT_SHOW$4, showEvent => {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }
      EventHandler.one(target, EVENT_HIDDEN$4, () => {
        if (isVisible(this)) {
          this.focus();
        }
      });
    });

    // avoid conflict when clicking modal toggler while another one is open
    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
    if (alreadyOpen) {
      Modal.getInstance(alreadyOpen).hide();
    }
    const data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  enableDismissTrigger(Modal);

  /**
   * jQuery
   */

  defineJQueryPlugin(Modal);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap offcanvas.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$6 = 'offcanvas';
  const DATA_KEY$3 = 'bs.offcanvas';
  const EVENT_KEY$3 = `.${DATA_KEY$3}`;
  const DATA_API_KEY$1 = '.data-api';
  const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const ESCAPE_KEY = 'Escape';
  const CLASS_NAME_SHOW$3 = 'show';
  const CLASS_NAME_SHOWING$1 = 'showing';
  const CLASS_NAME_HIDING = 'hiding';
  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
  const OPEN_SELECTOR = '.offcanvas.show';
  const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
  const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
  const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
  const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
  const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
  const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
  const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
  const Default$5 = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  const DefaultType$5 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    scroll: 'boolean'
  };

  /**
   * Class definition
   */

  class Offcanvas extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isShown = false;
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._addEventListeners();
    }

    // Getters
    static get Default() {
      return Default$5;
    }
    static get DefaultType() {
      return DefaultType$5;
    }
    static get NAME() {
      return NAME$6;
    }

    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._backdrop.show();
      if (!this._config.scroll) {
        new ScrollBarHelper().hide();
      }
      this._element.setAttribute('aria-modal', true);
      this._element.setAttribute('role', 'dialog');
      this._element.classList.add(CLASS_NAME_SHOWING$1);
      const completeCallBack = () => {
        if (!this._config.scroll || this._config.backdrop) {
          this._focustrap.activate();
        }
        this._element.classList.add(CLASS_NAME_SHOW$3);
        this._element.classList.remove(CLASS_NAME_SHOWING$1);
        EventHandler.trigger(this._element, EVENT_SHOWN$3, {
          relatedTarget
        });
      };
      this._queueCallback(completeCallBack, this._element, true);
    }
    hide() {
      if (!this._isShown) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._focustrap.deactivate();
      this._element.blur();
      this._isShown = false;
      this._element.classList.add(CLASS_NAME_HIDING);
      this._backdrop.hide();
      const completeCallback = () => {
        this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
        this._element.removeAttribute('aria-modal');
        this._element.removeAttribute('role');
        if (!this._config.scroll) {
          new ScrollBarHelper().reset();
        }
        EventHandler.trigger(this._element, EVENT_HIDDEN$3);
      };
      this._queueCallback(completeCallback, this._element, true);
    }
    dispose() {
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }

    // Private
    _initializeBackDrop() {
      const clickCallback = () => {
        if (this._config.backdrop === 'static') {
          EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
          return;
        }
        this.hide();
      };

      // 'static' option will be translated to true, and booleans will keep their value
      const isVisible = Boolean(this._config.backdrop);
      return new Backdrop({
        className: CLASS_NAME_BACKDROP,
        isVisible,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: isVisible ? clickCallback : null
      });
    }
    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
        if (event.key !== ESCAPE_KEY) {
          return;
        }
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
      });
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Offcanvas.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    EventHandler.one(target, EVENT_HIDDEN$3, () => {
      // focus on trigger when it is closed
      if (isVisible(this)) {
        this.focus();
      }
    });

    // avoid conflict when clicking a toggler of an offcanvas, while another is open
    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
    if (alreadyOpen && alreadyOpen !== target) {
      Offcanvas.getInstance(alreadyOpen).hide();
    }
    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
    for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
      Offcanvas.getOrCreateInstance(selector).show();
    }
  });
  EventHandler.on(window, EVENT_RESIZE, () => {
    for (const element of SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')) {
      if (getComputedStyle(element).position !== 'fixed') {
        Offcanvas.getOrCreateInstance(element).hide();
      }
    }
  });
  enableDismissTrigger(Offcanvas);

  /**
   * jQuery
   */

  defineJQueryPlugin(Offcanvas);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  // js-docs-start allow-list
  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  const DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    dd: [],
    div: [],
    dl: [],
    dt: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  // js-docs-end allow-list

  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);

  /**
   * A pattern that recognizes URLs that are safe wrt. XSS in URL navigation
   * contexts.
   *
   * Shout-out to Angular https://github.com/angular/angular/blob/15.2.8/packages/core/src/sanitization/url_sanitizer.ts#L38
   */
  // eslint-disable-next-line unicorn/better-regex
  const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
  const allowedAttribute = (attribute, allowedAttributeList) => {
    const attributeName = attribute.nodeName.toLowerCase();
    if (allowedAttributeList.includes(attributeName)) {
      if (uriAttributes.has(attributeName)) {
        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
      }
      return true;
    }

    // Check if a regular expression validates the attribute.
    return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
  };
  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }
    if (sanitizeFunction && typeof sanitizeFunction === 'function') {
      return sanitizeFunction(unsafeHtml);
    }
    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));
    for (const element of elements) {
      const elementName = element.nodeName.toLowerCase();
      if (!Object.keys(allowList).includes(elementName)) {
        element.remove();
        continue;
      }
      const attributeList = [].concat(...element.attributes);
      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
      for (const attribute of attributeList) {
        if (!allowedAttribute(attribute, allowedAttributes)) {
          element.removeAttribute(attribute.nodeName);
        }
      }
    }
    return createdDocument.body.innerHTML;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/template-factory.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$5 = 'TemplateFactory';
  const Default$4 = {
    allowList: DefaultAllowlist,
    content: {},
    // { selector : text ,  selector2 : text2 , }
    extraClass: '',
    html: false,
    sanitize: true,
    sanitizeFn: null,
    template: '<div></div>'
  };
  const DefaultType$4 = {
    allowList: 'object',
    content: 'object',
    extraClass: '(string|function)',
    html: 'boolean',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    template: 'string'
  };
  const DefaultContentType = {
    entry: '(string|element|function|null)',
    selector: '(string|element)'
  };

  /**
   * Class definition
   */

  class TemplateFactory extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
    }

    // Getters
    static get Default() {
      return Default$4;
    }
    static get DefaultType() {
      return DefaultType$4;
    }
    static get NAME() {
      return NAME$5;
    }

    // Public
    getContent() {
      return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(content) {
      this._checkContent(content);
      this._config.content = {
        ...this._config.content,
        ...content
      };
      return this;
    }
    toHtml() {
      const templateWrapper = document.createElement('div');
      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
      for (const [selector, text] of Object.entries(this._config.content)) {
        this._setContent(templateWrapper, text, selector);
      }
      const template = templateWrapper.children[0];
      const extraClass = this._resolvePossibleFunction(this._config.extraClass);
      if (extraClass) {
        template.classList.add(...extraClass.split(' '));
      }
      return template;
    }

    // Private
    _typeCheckConfig(config) {
      super._typeCheckConfig(config);
      this._checkContent(config.content);
    }
    _checkContent(arg) {
      for (const [selector, content] of Object.entries(arg)) {
        super._typeCheckConfig({
          selector,
          entry: content
        }, DefaultContentType);
      }
    }
    _setContent(template, content, selector) {
      const templateElement = SelectorEngine.findOne(selector, template);
      if (!templateElement) {
        return;
      }
      content = this._resolvePossibleFunction(content);
      if (!content) {
        templateElement.remove();
        return;
      }
      if (isElement(content)) {
        this._putElementInTemplate(getElement(content), templateElement);
        return;
      }
      if (this._config.html) {
        templateElement.innerHTML = this._maybeSanitize(content);
        return;
      }
      templateElement.textContent = content;
    }
    _maybeSanitize(arg) {
      return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
    }
    _resolvePossibleFunction(arg) {
      return execute(arg, [this]);
    }
    _putElementInTemplate(element, templateElement) {
      if (this._config.html) {
        templateElement.innerHTML = '';
        templateElement.append(element);
        return;
      }
      templateElement.textContent = element.textContent;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$4 = 'tooltip';
  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
  const CLASS_NAME_FADE$2 = 'fade';
  const CLASS_NAME_MODAL = 'modal';
  const CLASS_NAME_SHOW$2 = 'show';
  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
  const EVENT_MODAL_HIDE = 'hide.bs.modal';
  const TRIGGER_HOVER = 'hover';
  const TRIGGER_FOCUS = 'focus';
  const TRIGGER_CLICK = 'click';
  const TRIGGER_MANUAL = 'manual';
  const EVENT_HIDE$2 = 'hide';
  const EVENT_HIDDEN$2 = 'hidden';
  const EVENT_SHOW$2 = 'show';
  const EVENT_SHOWN$2 = 'shown';
  const EVENT_INSERTED = 'inserted';
  const EVENT_CLICK$1 = 'click';
  const EVENT_FOCUSIN$1 = 'focusin';
  const EVENT_FOCUSOUT$1 = 'focusout';
  const EVENT_MOUSEENTER = 'mouseenter';
  const EVENT_MOUSELEAVE = 'mouseleave';
  const AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: isRTL() ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: isRTL() ? 'right' : 'left'
  };
  const Default$3 = {
    allowList: DefaultAllowlist,
    animation: true,
    boundary: 'clippingParents',
    container: false,
    customClass: '',
    delay: 0,
    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
    html: false,
    offset: [0, 6],
    placement: 'top',
    popperConfig: null,
    sanitize: true,
    sanitizeFn: null,
    selector: false,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
    title: '',
    trigger: 'hover focus'
  };
  const DefaultType$3 = {
    allowList: 'object',
    animation: 'boolean',
    boundary: '(string|element)',
    container: '(string|element|boolean)',
    customClass: '(string|function)',
    delay: '(number|object)',
    fallbackPlacements: 'array',
    html: 'boolean',
    offset: '(array|string|function)',
    placement: '(string|function)',
    popperConfig: '(null|object|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    selector: '(string|boolean)',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string'
  };

  /**
   * Class definition
   */

  class Tooltip extends BaseComponent {
    constructor(element, config) {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
      }
      super(element, config);

      // Private
      this._isEnabled = true;
      this._timeout = 0;
      this._isHovered = null;
      this._activeTrigger = {};
      this._popper = null;
      this._templateFactory = null;
      this._newContent = null;

      // Protected
      this.tip = null;
      this._setListeners();
      if (!this._config.selector) {
        this._fixTitle();
      }
    }

    // Getters
    static get Default() {
      return Default$3;
    }
    static get DefaultType() {
      return DefaultType$3;
    }
    static get NAME() {
      return NAME$4;
    }

    // Public
    enable() {
      this._isEnabled = true;
    }
    disable() {
      this._isEnabled = false;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      if (!this._isEnabled) {
        return;
      }
      this._activeTrigger.click = !this._activeTrigger.click;
      if (this._isShown()) {
        this._leave();
        return;
      }
      this._enter();
    }
    dispose() {
      clearTimeout(this._timeout);
      EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
      if (this._element.getAttribute('data-bs-original-title')) {
        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
      }
      this._disposePopper();
      super.dispose();
    }
    show() {
      if (this._element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }
      if (!(this._isWithContent() && this._isEnabled)) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
      const shadowRoot = findShadowRoot(this._element);
      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      }

      // TODO: v6 remove this or make it optional
      this._disposePopper();
      const tip = this._getTipElement();
      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
      const {
        container
      } = this._config;
      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.append(tip);
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
      }
      this._popper = this._createPopper(tip);
      tip.classList.add(CLASS_NAME_SHOW$2);

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, 'mouseover', noop);
        }
      }
      const complete = () => {
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));
        if (this._isHovered === false) {
          this._leave();
        }
        this._isHovered = false;
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
    hide() {
      if (!this._isShown()) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
      if (hideEvent.defaultPrevented) {
        return;
      }
      const tip = this._getTipElement();
      tip.classList.remove(CLASS_NAME_SHOW$2);

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, 'mouseover', noop);
        }
      }
      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      this._isHovered = null; // it is a trick to support manual triggering

      const complete = () => {
        if (this._isWithActiveTrigger()) {
          return;
        }
        if (!this._isHovered) {
          this._disposePopper();
        }
        this._element.removeAttribute('aria-describedby');
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
    update() {
      if (this._popper) {
        this._popper.update();
      }
    }

    // Protected
    _isWithContent() {
      return Boolean(this._getTitle());
    }
    _getTipElement() {
      if (!this.tip) {
        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
      }
      return this.tip;
    }
    _createTipElement(content) {
      const tip = this._getTemplateFactory(content).toHtml();

      // TODO: remove this check in v6
      if (!tip) {
        return null;
      }
      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
      // TODO: v6 the following can be achieved with CSS only
      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
      const tipId = getUID(this.constructor.NAME).toString();
      tip.setAttribute('id', tipId);
      if (this._isAnimated()) {
        tip.classList.add(CLASS_NAME_FADE$2);
      }
      return tip;
    }
    setContent(content) {
      this._newContent = content;
      if (this._isShown()) {
        this._disposePopper();
        this.show();
      }
    }
    _getTemplateFactory(content) {
      if (this._templateFactory) {
        this._templateFactory.changeContent(content);
      } else {
        this._templateFactory = new TemplateFactory({
          ...this._config,
          // the `content` var has to be after `this._config`
          // to override config.content in case of popover
          content,
          extraClass: this._resolvePossibleFunction(this._config.customClass)
        });
      }
      return this._templateFactory;
    }
    _getContentForTemplate() {
      return {
        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
      };
    }
    _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
    }

    // Private
    _initializeOnDelegatedTarget(event) {
      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    }
    _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
    }
    _createPopper(tip) {
      const placement = execute(this._config.placement, [this, tip, this._element]);
      const attachment = AttachmentMap[placement.toUpperCase()];
      return createPopper(this._element, tip, this._getPopperConfig(attachment));
    }
    _getOffset() {
      const {
        offset
      } = this._config;
      if (typeof offset === 'string') {
        return offset.split(',').map(value => Number.parseInt(value, 10));
      }
      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }
      return offset;
    }
    _resolvePossibleFunction(arg) {
      return execute(arg, [this._element]);
    }
    _getPopperConfig(attachment) {
      const defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: 'flip',
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }, {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'arrow',
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        }, {
          name: 'preSetPlacement',
          enabled: true,
          phase: 'beforeMain',
          fn: data => {
            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
            this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
          }
        }]
      };
      return {
        ...defaultBsPopperConfig,
        ...execute(this._config.popperConfig, [defaultBsPopperConfig])
      };
    }
    _setListeners() {
      const triggers = this._config.trigger.split(' ');
      for (const trigger of triggers) {
        if (trigger === 'click') {
          EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);
            context.toggle();
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
          EventHandler.on(this._element, eventIn, this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
            context._enter();
          });
          EventHandler.on(this._element, eventOut, this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
            context._leave();
          });
        }
      }
      this._hideModalHandler = () => {
        if (this._element) {
          this.hide();
        }
      };
      EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    }
    _fixTitle() {
      const title = this._element.getAttribute('title');
      if (!title) {
        return;
      }
      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
        this._element.setAttribute('aria-label', title);
      }
      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility
      this._element.removeAttribute('title');
    }
    _enter() {
      if (this._isShown() || this._isHovered) {
        this._isHovered = true;
        return;
      }
      this._isHovered = true;
      this._setTimeout(() => {
        if (this._isHovered) {
          this.show();
        }
      }, this._config.delay.show);
    }
    _leave() {
      if (this._isWithActiveTrigger()) {
        return;
      }
      this._isHovered = false;
      this._setTimeout(() => {
        if (!this._isHovered) {
          this.hide();
        }
      }, this._config.delay.hide);
    }
    _setTimeout(handler, timeout) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(handler, timeout);
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    }
    _getConfig(config) {
      const dataAttributes = Manipulator.getDataAttributes(this._element);
      for (const dataAttribute of Object.keys(dataAttributes)) {
        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
          delete dataAttributes[dataAttribute];
        }
      }
      config = {
        ...dataAttributes,
        ...(typeof config === 'object' && config ? config : {})
      };
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      config.container = config.container === false ? document.body : getElement(config.container);
      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }
      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }
      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }
      return config;
    }
    _getDelegateConfig() {
      const config = {};
      for (const [key, value] of Object.entries(this._config)) {
        if (this.constructor.Default[key] !== value) {
          config[key] = value;
        }
      }
      config.selector = false;
      config.trigger = 'manual';

      // In the future can be replaced with:
      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
      // `Object.fromEntries(keysWithDifferentValues)`
      return config;
    }
    _disposePopper() {
      if (this._popper) {
        this._popper.destroy();
        this._popper = null;
      }
      if (this.tip) {
        this.tip.remove();
        this.tip = null;
      }
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tooltip.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * jQuery
   */

  defineJQueryPlugin(Tooltip);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$3 = 'popover';
  const SELECTOR_TITLE = '.popover-header';
  const SELECTOR_CONTENT = '.popover-body';
  const Default$2 = {
    ...Tooltip.Default,
    content: '',
    offset: [0, 8],
    placement: 'right',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
    trigger: 'click'
  };
  const DefaultType$2 = {
    ...Tooltip.DefaultType,
    content: '(null|string|element|function)'
  };

  /**
   * Class definition
   */

  class Popover extends Tooltip {
    // Getters
    static get Default() {
      return Default$2;
    }
    static get DefaultType() {
      return DefaultType$2;
    }
    static get NAME() {
      return NAME$3;
    }

    // Overrides
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }

    // Private
    _getContentForTemplate() {
      return {
        [SELECTOR_TITLE]: this._getTitle(),
        [SELECTOR_CONTENT]: this._getContent()
      };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Popover.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * jQuery
   */

  defineJQueryPlugin(Popover);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$2 = 'scrollspy';
  const DATA_KEY$2 = 'bs.scrollspy';
  const EVENT_KEY$2 = `.${DATA_KEY$2}`;
  const DATA_API_KEY = '.data-api';
  const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
  const EVENT_CLICK = `click${EVENT_KEY$2}`;
  const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  const CLASS_NAME_ACTIVE$1 = 'active';
  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  const SELECTOR_TARGET_LINKS = '[href]';
  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  const SELECTOR_NAV_LINKS = '.nav-link';
  const SELECTOR_NAV_ITEMS = '.nav-item';
  const SELECTOR_LIST_ITEMS = '.list-group-item';
  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
  const SELECTOR_DROPDOWN = '.dropdown';
  const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  const Default$1 = {
    offset: null,
    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: '0px 0px -25%',
    smoothScroll: false,
    target: null,
    threshold: [0.1, 0.5, 1]
  };
  const DefaultType$1 = {
    offset: '(number|null)',
    // TODO v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: 'string',
    smoothScroll: 'boolean',
    target: 'element',
    threshold: 'array'
  };

  /**
   * Class definition
   */

  class ScrollSpy extends BaseComponent {
    constructor(element, config) {
      super(element, config);

      // this._element is the observablesContainer and config.target the menu links wrapper
      this._targetLinks = new Map();
      this._observableSections = new Map();
      this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
      this._activeTarget = null;
      this._observer = null;
      this._previousScrollData = {
        visibleEntryTop: 0,
        parentScrollTop: 0
      };
      this.refresh(); // initialize
    }

    // Getters
    static get Default() {
      return Default$1;
    }
    static get DefaultType() {
      return DefaultType$1;
    }
    static get NAME() {
      return NAME$2;
    }

    // Public
    refresh() {
      this._initializeTargetsAndObservables();
      this._maybeEnableSmoothScroll();
      if (this._observer) {
        this._observer.disconnect();
      } else {
        this._observer = this._getNewObserver();
      }
      for (const section of this._observableSections.values()) {
        this._observer.observe(section);
      }
    }
    dispose() {
      this._observer.disconnect();
      super.dispose();
    }

    // Private
    _configAfterMerge(config) {
      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
      config.target = getElement(config.target) || document.body;

      // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only
      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
      if (typeof config.threshold === 'string') {
        config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
      }
      return config;
    }
    _maybeEnableSmoothScroll() {
      if (!this._config.smoothScroll) {
        return;
      }

      // unregister any previous listeners
      EventHandler.off(this._config.target, EVENT_CLICK);
      EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
        const observableSection = this._observableSections.get(event.target.hash);
        if (observableSection) {
          event.preventDefault();
          const root = this._rootElement || window;
          const height = observableSection.offsetTop - this._element.offsetTop;
          if (root.scrollTo) {
            root.scrollTo({
              top: height,
              behavior: 'smooth'
            });
            return;
          }

          // Chrome 60 doesn't support `scrollTo`
          root.scrollTop = height;
        }
      });
    }
    _getNewObserver() {
      const options = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin
      };
      return new IntersectionObserver(entries => this._observerCallback(entries), options);
    }

    // The logic of selection
    _observerCallback(entries) {
      const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
      const activate = entry => {
        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
        this._process(targetElement(entry));
      };
      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = parentScrollTop;
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          this._activeTarget = null;
          this._clearActiveClass(targetElement(entry));
          continue;
        }
        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        // if we are scrolling down, pick the bigger offsetTop
        if (userScrollsDown && entryIsLowerThanPrevious) {
          activate(entry);
          // if parent isn't scrolled, let's keep the first visible item, breaking the iteration
          if (!parentScrollTop) {
            return;
          }
          continue;
        }

        // if we are scrolling up, pick the smallest offsetTop
        if (!userScrollsDown && !entryIsLowerThanPrevious) {
          activate(entry);
        }
      }
    }
    _initializeTargetsAndObservables() {
      this._targetLinks = new Map();
      this._observableSections = new Map();
      const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
      for (const anchor of targetLinks) {
        // ensure that the anchor has an id and is not disabled
        if (!anchor.hash || isDisabled(anchor)) {
          continue;
        }
        const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);

        // ensure that the observableSection exists & is visible
        if (isVisible(observableSection)) {
          this._targetLinks.set(decodeURI(anchor.hash), anchor);
          this._observableSections.set(anchor.hash, observableSection);
        }
      }
    }
    _process(target) {
      if (this._activeTarget === target) {
        return;
      }
      this._clearActiveClass(this._config.target);
      this._activeTarget = target;
      target.classList.add(CLASS_NAME_ACTIVE$1);
      this._activateParents(target);
      EventHandler.trigger(this._element, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }
    _activateParents(target) {
      // Activate dropdown parents
      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
        return;
      }
      for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
          item.classList.add(CLASS_NAME_ACTIVE$1);
        }
      }
    }
    _clearActiveClass(parent) {
      parent.classList.remove(CLASS_NAME_ACTIVE$1);
      const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);
      for (const node of activeNodes) {
        node.classList.remove(CLASS_NAME_ACTIVE$1);
      }
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = ScrollSpy.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
    for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
      ScrollSpy.getOrCreateInstance(spy);
    }
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(ScrollSpy);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$1 = 'tab';
  const DATA_KEY$1 = 'bs.tab';
  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
  const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
  const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
  const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
  const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
  const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
  const ARROW_LEFT_KEY = 'ArrowLeft';
  const ARROW_RIGHT_KEY = 'ArrowRight';
  const ARROW_UP_KEY = 'ArrowUp';
  const ARROW_DOWN_KEY = 'ArrowDown';
  const HOME_KEY = 'Home';
  const END_KEY = 'End';
  const CLASS_NAME_ACTIVE = 'active';
  const CLASS_NAME_FADE$1 = 'fade';
  const CLASS_NAME_SHOW$1 = 'show';
  const CLASS_DROPDOWN = 'dropdown';
  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
  const NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
  const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
  const SELECTOR_OUTER = '.nav-item, .list-group-item';
  const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // TODO: could only be `tab` in v6
  const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;

  /**
   * Class definition
   */

  class Tab extends BaseComponent {
    constructor(element) {
      super(element);
      this._parent = this._element.closest(SELECTOR_TAB_PANEL);
      if (!this._parent) {
        return;
        // TODO: should throw exception in v6
        // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
      }

      // Set up initial aria attributes
      this._setInitialAttributes(this._parent, this._getChildren());
      EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
    }

    // Getters
    static get NAME() {
      return NAME$1;
    }

    // Public
    show() {
      // Shows this elem and deactivate the active sibling if exists
      const innerElem = this._element;
      if (this._elemIsActive(innerElem)) {
        return;
      }

      // Search for active tab on same parent to deactivate it
      const active = this._getActiveElem();
      const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
        relatedTarget: innerElem
      }) : null;
      const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
        relatedTarget: active
      });
      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
        return;
      }
      this._deactivate(active, innerElem);
      this._activate(innerElem, active);
    }

    // Private
    _activate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.add(CLASS_NAME_ACTIVE);
      this._activate(SelectorEngine.getElementFromSelector(element)); // Search and activate/show the proper section

      const complete = () => {
        if (element.getAttribute('role') !== 'tab') {
          element.classList.add(CLASS_NAME_SHOW$1);
          return;
        }
        element.removeAttribute('tabindex');
        element.setAttribute('aria-selected', true);
        this._toggleDropDown(element, true);
        EventHandler.trigger(element, EVENT_SHOWN$1, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }
    _deactivate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.remove(CLASS_NAME_ACTIVE);
      element.blur();
      this._deactivate(SelectorEngine.getElementFromSelector(element)); // Search and deactivate the shown section too

      const complete = () => {
        if (element.getAttribute('role') !== 'tab') {
          element.classList.remove(CLASS_NAME_SHOW$1);
          return;
        }
        element.setAttribute('aria-selected', false);
        element.setAttribute('tabindex', '-1');
        this._toggleDropDown(element, false);
        EventHandler.trigger(element, EVENT_HIDDEN$1, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }
    _keydown(event) {
      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
        return;
      }
      event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page
      event.preventDefault();
      const children = this._getChildren().filter(element => !isDisabled(element));
      let nextActiveElement;
      if ([HOME_KEY, END_KEY].includes(event.key)) {
        nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
      } else {
        const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
        nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
      }
      if (nextActiveElement) {
        nextActiveElement.focus({
          preventScroll: true
        });
        Tab.getOrCreateInstance(nextActiveElement).show();
      }
    }
    _getChildren() {
      // collection of inner elements
      return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find(child => this._elemIsActive(child)) || null;
    }
    _setInitialAttributes(parent, children) {
      this._setAttributeIfNotExists(parent, 'role', 'tablist');
      for (const child of children) {
        this._setInitialAttributesOnChild(child);
      }
    }
    _setInitialAttributesOnChild(child) {
      child = this._getInnerElement(child);
      const isActive = this._elemIsActive(child);
      const outerElem = this._getOuterElement(child);
      child.setAttribute('aria-selected', isActive);
      if (outerElem !== child) {
        this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
      }
      if (!isActive) {
        child.setAttribute('tabindex', '-1');
      }
      this._setAttributeIfNotExists(child, 'role', 'tab');

      // set attributes to the related panel too
      this._setInitialAttributesOnTargetPanel(child);
    }
    _setInitialAttributesOnTargetPanel(child) {
      const target = SelectorEngine.getElementFromSelector(child);
      if (!target) {
        return;
      }
      this._setAttributeIfNotExists(target, 'role', 'tabpanel');
      if (child.id) {
        this._setAttributeIfNotExists(target, 'aria-labelledby', `${child.id}`);
      }
    }
    _toggleDropDown(element, open) {
      const outerElem = this._getOuterElement(element);
      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
        return;
      }
      const toggle = (selector, className) => {
        const element = SelectorEngine.findOne(selector, outerElem);
        if (element) {
          element.classList.toggle(className, open);
        }
      };
      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
      outerElem.setAttribute('aria-expanded', open);
    }
    _setAttributeIfNotExists(element, attribute, value) {
      if (!element.hasAttribute(attribute)) {
        element.setAttribute(attribute, value);
      }
    }
    _elemIsActive(elem) {
      return elem.classList.contains(CLASS_NAME_ACTIVE);
    }

    // Try to get the inner element (usually the .nav-link)
    _getInnerElement(elem) {
      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
    }

    // Try to get the outer element (usually the .nav-item)
    _getOuterElement(elem) {
      return elem.closest(SELECTOR_OUTER) || elem;
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tab.getOrCreateInstance(this);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    Tab.getOrCreateInstance(this).show();
  });

  /**
   * Initialize on focus
   */
  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
      Tab.getOrCreateInstance(element);
    }
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Tab);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap toast.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME = 'toast';
  const DATA_KEY = 'bs.toast';
  const EVENT_KEY = `.${DATA_KEY}`;
  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility
  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_SHOWING = 'showing';
  const DefaultType = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  const Default = {
    animation: true,
    autohide: true,
    delay: 5000
  };

  /**
   * Class definition
   */

  class Toast extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._timeout = null;
      this._hasMouseInteraction = false;
      this._hasKeyboardInteraction = false;
      this._setListeners();
    }

    // Getters
    static get Default() {
      return Default;
    }
    static get DefaultType() {
      return DefaultType;
    }
    static get NAME() {
      return NAME;
    }

    // Public
    show() {
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._clearTimeout();
      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }
      const complete = () => {
        this._element.classList.remove(CLASS_NAME_SHOWING);
        EventHandler.trigger(this._element, EVENT_SHOWN);
        this._maybeScheduleHide();
      };
      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
    hide() {
      if (!this.isShown()) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
      if (hideEvent.defaultPrevented) {
        return;
      }
      const complete = () => {
        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated
        this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
        EventHandler.trigger(this._element, EVENT_HIDDEN);
      };
      this._element.classList.add(CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
    dispose() {
      this._clearTimeout();
      if (this.isShown()) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }
      super.dispose();
    }
    isShown() {
      return this._element.classList.contains(CLASS_NAME_SHOW);
    }

    // Private

    _maybeScheduleHide() {
      if (!this._config.autohide) {
        return;
      }
      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
        return;
      }
      this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay);
    }
    _onInteraction(event, isInteracting) {
      switch (event.type) {
        case 'mouseover':
        case 'mouseout':
          {
            this._hasMouseInteraction = isInteracting;
            break;
          }
        case 'focusin':
        case 'focusout':
          {
            this._hasKeyboardInteraction = isInteracting;
            break;
          }
      }
      if (isInteracting) {
        this._clearTimeout();
        return;
      }
      const nextElement = event.relatedTarget;
      if (this._element === nextElement || this._element.contains(nextElement)) {
        return;
      }
      this._maybeScheduleHide();
    }
    _setListeners() {
      EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
      EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
    }
    _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Toast.getOrCreateInstance(this, config);
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config](this);
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  enableDismissTrigger(Toast);

  /**
   * jQuery
   */

  defineJQueryPlugin(Toast);

  const UiTheme = {
    font: {
      normal: "12px sans-serif",
      bold: "bold 12px sans-serif",
      monospace: "12px monospace",
      italic: "italic 12px sans-serif",
    },

    text: {
      color: "#FFF",
      disabled: "#AAA",
      label: "#CCC",
      value: "#0FF",
    },

    box: {
      padding: 5,
      borderRadius: 4,
      background: "rgba(0, 0, 0, 0.7)",
      border: "#FFF",
    },

    selection: {
      border: "#FFF",
      fill: "rgba(0, 0, 0, 0.25)",
      labelBg: "rgba(0, 0, 0, 0.7)",
      labelText: "#FFF",
      dashed: [4, 3],
      lineWidth: 2,
      diagonalLineWidth: 1,
      labelFont: "bold 12px sans-serif",
      labelPadding: 5,
    },

    checkerboard: {
      light: "#404040",
      dark: "#303030",
      size: 10,
    },

    arrows: {
      color: "#AAA",
      size: 12,
    },
  };

  class UiDraw {
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

    computeSize(nodeX, nodeY) {
      if (nodeX !== undefined && nodeY !== undefined) {
        return new Float32Array([nodeX, 20]);
      }

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
      this.isDragging = false;
      this.startX = 0;
      this.step = this.calculateStep(precision);
      this.setupDefaults();
      this.limiter.value = defaultValue;
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
      return this.limiter.value;
    }

    set value(value) {
      if (value == this.limiter.value) return;

      this.limiter.value = value;
      this.notifyValueChange();
    }

    on(eventName, listener) {
      this.eventEmitter.on(eventName, listener);
    }

    off(eventName, listener) {
      this.eventEmitter.off(eventName, listener);
    }

    computeSize(nodeX, nodeY) {
      if (nodeX !== undefined && nodeY !== undefined) {
        return new Float32Array([nodeX, 20]);
      }
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
      this.notifyValueChange();
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
    }

    promptForValue(event) {
      let widget = this;

      event.target.data.prompt(
        "Value",
        this.value.toString(),
        function (inputValue) {
          const value = Number(inputValue);
          if (!isNaN(value)) {
            widget.value = value;
          } else {
            console.error("Invalid input: Input is not a number.");
          }
        },
        event
      );
    }

    notifyValueChange() {
      this.eventEmitter.emit("onChange", this.value);
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
        Number(this.value).toFixed(this.precision),
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

    computeSize(nodeX, nodeY) {
      if (nodeX !== undefined && nodeY !== undefined) {
        return new Float32Array([nodeX, 20]);
      }
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
      this.value = initialValue;
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

    incrementBy(amount) {
      let newVal = this.#value + amount;
      if (this.#shouldAdjust(newVal)) {
        newVal += 1;
      }
      this.value = newVal;
    }

    decrementBy(amount) {
      let newVal = this.#value - amount;
      if (this.#shouldAdjust(newVal)) {
        newVal -= 1;
      }
      this.value = newVal;
    }

    get value() {
      return this.#value;
    }

    set value(newValue) {
      if (this.#shouldAdjust(newValue)) {
        newValue += 1;
      }
      newValue = parseFloat(newValue.toFixed(this.#precision));
      this.#value = Math.min(
        Math.max(newValue, this.#limitMinimum),
        this.#limitMaximum
      );
    }

    setValue(newValue) {
      this.value = newValue;
    }

    getValue() {
      return this.value;
    }
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function deepEqual(object1, object2) {
    if (object1 === object2) {
      return true;
    }

    if (
      object1 == null ||
      object2 == null ||
      typeof object1 !== "object" ||
      typeof object2 !== "object"
    ) {
      return false;
    }

    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(object1[key], object2[key])) {
        return false;
      }
    }

    return true;
  }

  const WILDCARD = "*";
  const DISPLAY = "display";
  const CONTROL = "control";

  class WidgetBase {
    eventEmitter = new EventEmitter();
    _value = null;
    parent = null;

    constructor(name, parent, options) {
      this.name = name;
      this.parent = parent;
      this.options = options;
      this.port_name = null;

      if (this.parent && this.options && this.options.parameter) {
        const metadata = this.options.parameter.metadata || [];
        const suppressInput = metadata.some(
          (item) => item.name === "suppressInput" && item.value === true
        );

        if (!suppressInput) {
          const type = getType$1(options.parameter.datatype);
          const port = (this.port = this.parent.addInput(name, type));
          port.widget_name = this.name;
          this.port_name = port.name;
        }
      }
    }

    get value() {
      return this._value;
    }

    set value(newValue) {
      if (!deepEqual(newValue, this._value)) {
        const oldValue = this._value;
        this._value = newValue;
        this.eventEmitter.emit("valueChanged", newValue, oldValue);
        if (this.parent && this.options && this.options.property) {
          this.parent.setProperty(this.options.property, newValue);
        }
        this.requestRedraw();
      }
    }

    on(eventName, listener) {
      this.eventEmitter.on(eventName, listener);
    }

    off(eventName, listener) {
      this.eventEmitter.off(eventName, listener);
    }

    triggerParentResetSize() {
      if (this.parent) this.parent.resetSize();
    }

    requestRedraw() {
      this.parent?.requestRedraw();
    }
  }

  class DisplayWidget extends WidgetBase {
    static capability = DISPLAY;

    constructor(name, parent, options = {}) {
      super(name, parent, options);

      if (options.content) {
        this.registerForContentUpdates(parent, options.content);
      }
    }

    registerForContentUpdates(parent, content) {
      if (!content || !parent) return;
      parent.on("nodeStatusUpdated", (status) => {
        const value = status.contents?.find(
          (contentUpdate) => contentUpdate.name === content.name
        )?.value;
        this.value = value;
        parent?.setDirtyCanvas(true, true);
      });
    }
  }

  class ControlWidget extends WidgetBase {
    static capability = CONTROL;

    constructor(name, parent, options = {}) {
      super(name, parent, options);
    }
  }

  function getType$1(datatype) {
    let typeString = datatype.identifier
      ? `${datatype.typeName} (${datatype.identifier})`
      : datatype.typeName;

    // Check if there's a baseDatatype and append it recursively
    if (datatype.baseDatatype) {
      typeString += `,${getType$1(datatype.baseDatatype)}`;
    }

    return typeString;
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

  class EmptyControlWidget extends ControlWidget {
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
          node.addProperty(name, default_value, type);

          let content;
          if (contentNames.has(name)) {
            content = blueprint.contents.find((c) => c.name === name);
          }

          const widgetClasses = this.widgets.getControlsOfType(
            typeName,
            identifier
          );
          if (!widgetClasses.length) {
            widgetClasses.push(EmptyControlWidget);
          }
          const widget = new widgetClasses[0](name, node, {
            property: name,
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

  class Node$1 extends mobjectLitegraph.LGraphNode {
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
      console.log("tried setting default", name, value);
    }

    resetSize() {
      this.setSize(this.computeSize());
    }

    requestRedraw() {
      this.setDirtyCanvas(true, false);
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

    onConfigure(info) {
      const widgets_data =
        info.extra && info.extra.widget_data ? info.extra.widget_data : {};
      if (this.widgets) {
        this.widgets.forEach((widget) => {
          if (!widget || !widget.name || !widget.onConfigure) return;
          const extra = widgets_data[widget.name] || null;
          widget.onConfigure(extra);
        });
      }
    }

    onSerialize(o) {
      if (!o.extra) o.extra = {};
      if (!o.extra.widget_data) o.extra.widget_data = {};

      if (this.widgets) {
        this.widgets.forEach((widget) => {
          if (!widget || !widget.name || !widget.onSerialize) return;
          const data = widget.onSerialize();
          if (data !== undefined && data !== null) {
            o.extra.widget_data[widget.name] = data;
          }
        });
      }
      // If widgets is empty, remove it for cleanliness
      if (Object.keys(o.extra.widget_data).length === 0)
        delete o.extra.widget_data;
      if (Object.keys(o.extra).length === 0) delete o.extra;
      return o;
    }

    registerCallbackHandlers() {
      this.registerCallbackHandler("onConfigure", (oCbInfo) => {
        this.eventEmitter.emit("onConfigure", this);
      });

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

    applyExtension(extension, options = {}) {
      this.eventEmitter.emit("applyExtension", extension, options);
      try {
        const instance = new extension(this, options);
        this.extensions.push(instance);
      } catch (error) {
        if (
          typeof extension === "object" &&
          typeof extension.apply === "function"
        ) {
          extension.apply(this, options);
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

    // checkBlueprintParametersAreSupported(blueprint) {
    //   if (!blueprint.node.parameters) return true;

    //   return blueprint.node.parameters.every((parameter) => {
    //     const { typeName, identifier } = parameter.datatype;
    //     return this.widgets.hasControl(typeName, identifier);
    //   });
    // }

    checkBlueprintParametersAreSupported(blueprint) {
      if (!blueprint.node.parameters) return true;

      return blueprint.node.parameters.every((parameter) => {
        const { typeName, identifier } = parameter.datatype;
        const hasWidget = this.widgets.hasControl(typeName, identifier);

        // Extract metadata array
        const metadata = parameter.metadata || [];
        const suppressInput = metadata.some(
          (item) => item.name === "suppressInput" && item.value === true
        );

        // Only disallow if suppressInput is true and there is no widget
        return hasWidget || !suppressInput;
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

      const nodeClass = class extends Node$1 {
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

    registerNodeExtension(extension, options = {}) {
      this.nodeExtensions.push([extension, options]);
    }
    registerCanvasExtension(extension, options = {}) {
      this.canvasExtensions.push([extension, options]);
    }

    registerEditorExtension(extension, options = {}) {
      this.editorExtensions.push([extension, options]);
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

      extensions.forEach(([extension, options]) => {
        instance.applyExtension(extension, options);
      });
    }

    getVersion() {
      return this.liteGraph.VERSION;
    }
  }

  class GraphCanvas extends mobjectLitegraph.LGraphCanvas {
    eventEmitter = new EventEmitter();

    constructor(canvas, graph, options) {
      super(canvas, graph, options);

      this.extensions = [];
      const graphFramework = new GraphFramework();
      graphFramework.applyExtensions("canvas", this);
    }

    on(eventName, listener) {
      this.eventEmitter.on(eventName, listener);
    }

    off(eventName, listener) {
      this.eventEmitter.off(eventName, listener);
    }

    applyExtension(extension, options = {}) {
      this.eventEmitter.emit("applyExtension", extension, options);
      try {
        const instance = new extension(this, options);
        this.extensions.push(instance);
      } catch (error) {
        if (
          typeof extension === "object" &&
          typeof extension.apply === "function"
        ) {
          extension.apply(this, options);
          this.extensions.push(extension);
        } else {
          throw new Error(
            "Extension must be a class or an object with an apply method"
          );
        }
      }
    }

    setDefaultViewpoint() {
      if (!this.graph || !this.graph._nodes || this.graph._nodes.length === 0) {
        this.ds.offset[0] = 0;
        this.ds.offset[1] = 0;
        this.ds.scale = 1;
        this.setDirty(true, true);
        return;
      }

      const nodes = this.graph._nodes;

      let minX, minY;
      let temp;

      nodes.forEach((node) => {
        const bounding = node.getBounding(temp, true);

        if (minX === undefined || minY === undefined) {
          minX = bounding[0];
          minY = bounding[1];
        } else {
          minX = Math.min(minX, bounding[0]);
          minY = Math.min(minY, bounding[1]);
        }
      });

      this.ds.offset[0] = -minX + 10;
      this.ds.offset[1] = -minY + 10;
      this.ds.scale = 1;
      this.setDirty(true, true);
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
    emitOnNodePropertyChangeBound = null;

    constructor(o) {
      super(o);
      this.eventEmitter = new EventEmitter();
      this.#uuid = null;
      this.isConfiguring = false;
      this.emitOnNodePropertyChangeBound = this.emitOnNodePropertyChange.bind(this);
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

    set uuid(uuid) {
      this.#uuid = uuid;
    }

    get isEmpty() {
      return this._nodes.length === 0;
    }

    updateGraphUuid() {
      this.#uuid = mobjectLitegraph.LiteGraph.uuidv4();
    }

    update(status) {
      const statusMap =
        status && Array.isArray(status.nodes)
          ? new Map(status.nodes.map((nodeStatus) => [nodeStatus.id, nodeStatus]))
          : new Map();

      this._nodes.forEach((node) => {
        const nodeStatus = statusMap.get(node.id) || {};
        node.update(nodeStatus);
      });
    }

    getMissingNodeTypes(data) {
      const nodes = data.nodes || [];
      const missingNodeTypes = [];

      nodes.forEach((node) => {
        const nodeType = node.type;
        const nodeTypeInstance = mobjectLitegraph.LiteGraph.getNodeType(nodeType);

        if (!nodeTypeInstance) {
          missingNodeTypes.push(nodeType);
        }
      });

      return missingNodeTypes.length > 0 ? [...new Set(missingNodeTypes)] : null;
    }

    configure(data, keep_old) {
      // check for missing node types
      const missingTypes = this.getMissingNodeTypes(data);
      if (missingTypes) {
        const missingTypesList = missingTypes
          .map((type) => `<li>${type}</li>`)
          .join("");

        const errorMessage = `The following node types are missing:<ul>${missingTypesList}</ul>Please check that the required blueprints are loaded.`;
        throw new Error(`${errorMessage}`);
      }

      this.eventEmitter.emit("beforeGraphConfigure", this);
      this.isConfiguring = true;
      super.configure(data, keep_old);
      this.isConfiguring = false;
      this.eventEmitter.emit("graphConfigure", this);
    }

    serialize() {
      let data = super.serialize();
      data.uuid = this.#uuid;
      return data;
    }

    exportForBackend() {
      return LiteGraphConverter.Convert(this);
    }

    clear() {
      super.clear();
      if (this.eventEmitter) {
        this.eventEmitter.emit("clear", this);
      }
    }

    onNodeAdded(node) {
      if (!this.isConfiguring) {
        this.updateGraphUuid();
      }

      node.on("propertyChanged", this.emitOnNodePropertyChangeBound);
      this.eventEmitter.emit("nodeAdded", this, node);
    }

    onNodeRemoved(node) {
      if (!this.isConfiguring) {
        this.updateGraphUuid();
      }
      node.off("propertyChanged", this.emitOnNodePropertyChangeBound);
      this.eventEmitter.emit("nodeRemoved", this, node);
    }

    onConnectionChange(node) {
      if (!this.isConfiguring) {
        this.updateGraphUuid();
      }
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

  class Toasts {
    constructor(toastContainer) {
      this.toastContainer = toastContainer;
    }

    generateToastId() {
      const randomPart = Math.floor(Math.random() * 1000);
      const id = `${new Date().getTime()}-${randomPart}-toast`;
      return id;
    }

    showToast(title, message, toastType, callbacks = {}) {
      const id = this.generateToastId();
      let bgColor,
        textColor,
        btnColor,
        delay,
        autoHide,
        extraHtml = "";

      // Define styles and behavior based on toastType
      switch (toastType) {
        case "error":
          bgColor = "bg-danger";
          textColor = "text-white";
          btnColor = "btn-close-white";
          delay = 4000;
          autoHide = true;
          break;
        case "warning":
          bgColor = "bg-warning";
          textColor = "text-black";
          btnColor = "btn-close-black";
          delay = 4000;
          autoHide = true;
          break;
        case "success":
          bgColor = "bg-success";
          textColor = "text-white";
          btnColor = "btn-close-white";
          delay = 4000;
          autoHide = true;
          break;
        case "info":
          bgColor = "bg-light";
          textColor = "text-black";
          btnColor = "btn-close-black";
          delay = 4000;
          autoHide = true;
          break;
        case "okCancel":
          bgColor = "bg-light";
          textColor = "text-black";
          btnColor = "btn-close-black";
          delay = 0;
          autoHide = false;
          extraHtml = `
          <div class="d-flex justify-content-end mt-2">
            <button class="btn btn-primary btn-sm me-2" id="${id}-ok-btn">
              OK
            </button>
            <button class="btn btn-secondary btn-sm" id="${id}-cancel-btn">
              Cancel
            </button>
          </div>
        `;
          break;

        default:
          bgColor = "bg-secondary";
          textColor = "text-white";
          btnColor = "btn-close-white";
      }

      const toastHtml = `
            <div id="${id}" class="toast ${bgColor} ${textColor}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="${autoHide}" data-bs-delay="${delay}">
                <div class="toast-header ${bgColor} ${textColor}">
                    <strong class="me-auto">${title}</strong>
                    <button type="button" class="btn-close ${btnColor}" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body ${textColor}">${message}${extraHtml}</div>
            </div>
        `;

      let toastNode = document.createElement("div");
      toastNode.innerHTML = toastHtml;
      this.toastContainer.appendChild(toastNode);

      $(`#${id}`).toast("show");

      this.setupToastEventListeners(id, toastType, callbacks);
    }

    setupToastEventListeners(id, toastType, callbacks) {
      if (toastType === "okCancel") {
        document.getElementById(`${id}-ok-btn`).addEventListener("click", () => {
          if (callbacks.onOk) callbacks.onOk();
          $(`#${id}`).toast("hide");
        });

        document
          .getElementById(`${id}-cancel-btn`)
          .addEventListener("click", () => {
            if (callbacks.onCancel) callbacks.onCancel();
            $(`#${id}`).toast("hide");
          });
      }

      $(`#${id}`).on("hidden.bs.toast", function () {
        this.remove();
      });
    }

    showWarning(title, message) {
      this.showToast(title, message, "warning");
    }

    showError(title, message) {
      this.showToast(title, message, "error");
    }

    showSuccess(title, message) {
      this.showToast(title, message, "success");
    }

    showInfo(title, message) {
      this.showToast(title, message, "info");
    }

    showMessage(title, message) {
      this.showToast(title, message, "");
    }

    showOkCancel(title, message, callbacks) {
      this.showToast(title, message, "okCancel", callbacks);
    }
  }

  class ToolbarGroup {
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

  class ToolbarButton {
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
        this.button.addEventListener("click", (e) => {
          this.onClick(e);
          e.currentTarget.blur();
        });
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

  class ToolbarSeparator {
    render() {
      const separator = document.createElement("div");
      separator.className = "mgui-toolbar-separator";
      return separator;
    }
  }

  // Description: Graph Editor class for creating a graph editor instance.

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
      this.toastContainer = null;
      this.toasts = null;
      this.graphCanvas = null;
      this.graph = new Graph();
      this.toolbarControls = [];
      this.extensions = [];

      this.makeEditorWindow(containerId);
      this.disableScrolling();
      this.setGraph(this.graph);

      const graphFramework = new GraphFramework();
      graphFramework.applyExtensions("editor", this);

      this.eventEmitter.emit("toolbarReady");
      this.eventEmitter.emit("instantiated", this);
      return this;
    }

    handleTouchMove(event) {
      event.preventDefault();
    }

    enableScrolling() {
      this.canvasElement.removeEventListener("touchmove", this.handleTouchMove, {
        passive: false,
      });
    }

    disableScrolling() {
      this.canvasElement.addEventListener("touchmove", this.handleTouchMove, {
        passive: false,
      });
    }

    loadGraph(graphData) {
      this.eventEmitter.emit("graphLoadInitiated", this.graph);
      this.graph.configure(graphData);
      this.graphCanvas.setDefaultViewpoint();
      this.eventEmitter.emit("graphLoaded", this.graph);
    }

    clearGraph() {
      this.eventEmitter.emit("graphClearInitiated", this.graph);
      this.graph.clear();
      this.eventEmitter.emit("graphCleared", this.graph);
    }

    serializeGraph() {
      const serializedGraph = this.graph.serialize();
      this.eventEmitter.emit("graphSerialized", serializedGraph);
      return serializedGraph;
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

    addButton(id, options) {
      const button = new ToolbarButton(
        id,
        options.label,
        options.iconClass,
        options.onClick,
        options.tooltip
      );

      // New group handling logic
      if (options.group) {
        const group = this.getOrCreateButtonGroup(
          options.group,
          options.section || "left",
          options.groupPosition
        );
        group.addButton(button);
      } else {
        this.addToolbarControl(button, {
          section: options.section,
          position: options.position,
          referenceId: options.referenceId,
        });
      }

      return button;
    }

    getOrCreateButtonGroup(groupName, section = "left", position = "end") {
      if (!this.buttonGroups)
        this.buttonGroups = { left: {}, center: {}, right: {} };

      if (!this.buttonGroups[section][groupName]) {
        const group = new ToolbarGroup(groupName);
        this.addToolbarControl(group, {
          section,
          position,
          referenceId: groupName, // For future reference
        });
        this.buttonGroups[section][groupName] = group;
      }

      return this.buttonGroups[section][groupName];
    }

    addSeparator(section = "left") {
      const separator = new ToolbarSeparator();
      this.addToolbarControl(separator, { section });
      return separator;
    }

    addToolbarControl(toolbarControl, options = {}) {
      const { section = "left", position = "end", referenceId = null } = options;
      const sectionElement = this.toolbarElement.querySelector(
        `.mgui-toolbar-section.${section}`
      );

      if (!sectionElement) {
        console.warn(
          `Toolbar section '${section}' not found. Appending to left.`
        );
        return this.addToolbarControl(toolbarControl, {
          ...options,
          section: "left",
        });
      }

      const controlElement = toolbarControl.render();
      toolbarControl.section = section;

      if (position === "start") {
        sectionElement.insertBefore(controlElement, sectionElement.firstChild);
      } else if (referenceId) {
        const referenceElement = sectionElement.querySelector(`#${referenceId}`);
        if (referenceElement) {
          sectionElement.insertBefore(
            controlElement,
            position === "before"
              ? referenceElement
              : referenceElement.nextSibling
          );
        } else {
          sectionElement.appendChild(controlElement);
        }
      } else {
        sectionElement.appendChild(controlElement);
      }

      this.toolbarControls.push(toolbarControl);
      this.resizeCanvas();
      return controlElement;
    }

    applyExtension(extension, options = {}) {
      this.eventEmitter.emit("applyExtension", extension, options);
      try {
        const instance = new extension(this, options);
        this.extensions.push(instance);
      } catch (error) {
        if (
          typeof extension === "object" &&
          typeof extension.apply === "function"
        ) {
          extension.apply(this, options);
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
      root.className = "mgui mgui-editor";
      root.innerHTML = `
    
    <div class="mgui-editor-toolbar ">
      <div class="mgui-toolbar-section left"></div>
      <div class="mgui-toolbar-section center"></div>
      <div class="mgui-toolbar-section right"></div>
    </div>
    <div class="mgui-editor-main-window">
        <canvas class="mgui-editor-graphcanvas"></canvas>   
        <div class="toast-container" aria-live="polite" aria-atomic="true">
    </div>
    </div>
    <div class="mgui-editor-footer">
        <div class="mgui-editor-tools mgui-editor-tools-left"></div>
        <div class="mgui-editor-tools mgui-editor-tools-right"></div>
    </div>
    <div class="mgui-modal-container"></div>`;

      this.toolbarElement = root.querySelector(".mgui-editor-toolbar");
      this.mainWindowElement = root.querySelector(".mgui-editor-main-window");
      this.footerElement = root.querySelector(".mgui-editor-footer");
      this.toastContainer = root.querySelector(".toast-container");
      this.toasts = new Toasts(this.toastContainer);

      const canvas = (this.canvasElement = root.querySelector(
        ".mgui-editor-graphcanvas"
      ));

      this.graphCanvas = new GraphCanvas(canvas);
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
      const toolbarStyle = window.getComputedStyle(this.toolbarElement);
      const footerStyle = window.getComputedStyle(this.footerElement);

      const toolbarHeight =
        this.toolbarElement.offsetHeight +
        parseInt(toolbarStyle.marginTop) +
        parseInt(toolbarStyle.marginBottom);
      const footerHeight =
        this.footerElement.offsetHeight +
        parseInt(footerStyle.marginTop) +
        parseInt(footerStyle.marginBottom);

      const availableHeight =
        this.parentDiv.clientHeight - toolbarHeight - footerHeight;

      this.mainWindowElement.style.height = availableHeight + "px";
      this.canvasElement.height = availableHeight;
      this.canvasElement.style.height = availableHeight + "px";
      this.graphCanvas.resize();
    }

    showModal(options) {
      const modalId = `mgui-modal-${Date.now()}`;

      const dialogClass = options.dialogClass ? ` ${options.dialogClass}` : "";
      const buttonsHtml = options.buttons
        .map(
          (btn) => `
      <button type="button" 
              class="btn btn-${btn.type || "secondary"}"
              ${btn.dismiss ? 'data-dismiss="modal"' : ""}>
        ${btn.label}
      </button>
    `
        )
        .join("");

      const modalHtml = `
      <div class="modal fade" id="${modalId}" tabindex="-1" 
           aria-labelledby="${modalId}-label" aria-hidden="true">
        <div class="modal-dialog ${dialogClass}">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${modalId}-label">${options.title}</h5>
              <button type="button" class="btn-close" 
                      data-dismiss="modal" 
                      aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ${options.body}
            </div>
            <div class="modal-footer">
              ${buttonsHtml}
            </div>
          </div>
        </div>
      </div>`;

      const modalContainer = this.rootElement.querySelector(
        ".mgui-modal-container"
      );
      modalContainer.insertAdjacentHTML("beforeend", modalHtml);

      const modalElement = document.getElementById(modalId);
      const modal = new bootstrap.Modal(modalElement, {
        keyboard: true,
        focus: false,
      });

      // Event listeners scoped to this modal instance
      $(modalElement).on("show.bs.modal", () => {
        if (options.onShow) {
          options.onShow(modal, modalElement);
        }
      });

      $(modalElement).on("shown.bs.modal", () => {
        modalElement.querySelector("[autofocus]")?.focus();
        if (options.onShown) {
          options.onShown(modal, modalElement);
        }
      });

      $(modalElement).on("hide.bs.modal", () => {
        if (options.onHide) {
          options.onHide(modal, modalElement);
        }
      });

      $(modalElement).on("hidden.bs.modal", () => {
        if (options.onHidden) {
          options.onHidden(modal, modalElement);
        }
        modalElement.remove();
      });

      options.buttons.forEach((btn, index) => {
        if (!btn.dismiss) {
          const buttonElement = modalElement.querySelectorAll(
            ".modal-footer button"
          )[index];
          buttonElement.addEventListener("click", (e) => {
            if (btn.onClick) {
              btn.onClick(modal);
            } else {
              modal.hide();
            }
          });
        }
      });

      const formElement = modalElement.querySelector("form");
      if (formElement) {
        formElement.addEventListener("submit", (e) => {
          e.preventDefault();
          const primaryBtn = options.buttons.find(
            (btn) => btn.type === "primary"
          );
          if (primaryBtn) {
            if (primaryBtn.onClick) {
              primaryBtn.onClick(modal);
            } else {
              modal.hide();
            }
          }
        });
      }

      if (options.preShow) {
        options.preShow(modal, modalElement);
      }
      modal.show();
    }

    showWarning(title, message) {
      this.toasts.showWarning(title, message);
    }

    showError(title, message) {
      this.toasts.showError(title, message);
    }

    showSuccess(title, message) {
      this.toasts.showSuccess(title, message);
    }

    showInfo(title, message) {
      this.toasts.showInfo(title, message);
    }

    showMessage(title, message) {
      this.toasts.showMessage(title, message);
    }

    showOkCancel(title, message, callbacks) {
      this.toasts.showOkCancel(title, message, callbacks);
    }

    async apiSend(action, data) {
      return this.connection.send(action, data);
    }
  }

  class GetBlueprintsExtension {
    constructor(editor) {
      this.editor = editor;
      this.getBlueprintsButton;

      this.editor.on("toolbarReady", () => {
        this.getBlueprintsButton = this.editor.addButton("GetBlueprints", {
          label: "Blueprints",
          iconClass: "fa-solid fa-layer-group",
          onClick: this.onBlueprintsClicked.bind(this),
          tooltip: "Get Blueprints",
          section: "left",
        });

        this.onBlueprintsClicked();
      });
    }

    async onBlueprintsClicked() {
      const graphFramework = new GraphFramework();
      LiteGraph.log_log("api get blueprints");
      this.editor.showInfo(
        "Loading Blueprints",
        "Please wait while the blueprints are fetched from the server."
      );
      this.getBlueprintsButton.disable();
      try {
        const result = await this.editor.apiSend("GetBlueprints");
        LiteGraph.log_log("api get blueprints reply", result);
        graphFramework.installNodeBlueprints(result.blueprints);

        if (result?.blueprints?.length) {
          this.editor.showSuccess(
            "Blueprints loaded successfully",
            `${result.blueprints.length} blueprints were received.`
          );
        }
      } catch (error) {
        this.editor.showError("Failed to get blueprints", error);
      } finally {
        this.getBlueprintsButton.enable();
      }
    }
  }

  class FileOperationsExtension {
    constructor(editor) {
      this.editor = editor;
      this.setupEditorListeners();
    }

    setupEditorListeners() {
      this.editor.on("toolbarReady", () => {
        this.editor.addButton("New", {
          label: "New",
          iconClass: "fa-solid fa-file",
          onClick: this.onNewClicked.bind(this),
          tooltip: "New Graph",
          section: "left",
          group: "fileOperations",
        });
        this.editor.addButton("Open", {
          label: "Open",
          iconClass: "fa-solid fa-folder-open",
          onClick: this.onOpenClicked.bind(this),
          tooltip: "Open Graph",
          section: "left",
          group: "fileOperations",
        });
        this.editor.addButton("Save", {
          label: "Save",
          iconClass: "fa-solid fa-floppy-disk",
          onClick: this.onSaveClicked.bind(this),
          tooltip: "Save Graph",
          section: "left",
          group: "fileOperations",
        });
      });
    }

    onNewClicked() {
      this.editor.clearGraph();
    }

    supportsFilePicker() {
      return !!(window.showOpenFilePicker && window.showSaveFilePicker);
    }

    getOrCreateGraphFileInput() {
      const id = "graph-upload";
      let input = document.getElementById(id);
      if (!input) {
        input = document.createElement("input");
        input.type = "file";
        input.style.display = "none";
        input.id = id;
        input.accept = ".mgraph";
        document.body.appendChild(input);
      }
      return input;
    }

    async onOpenClicked() {
      if (this.supportsFilePicker()) {
        try {
          const [fileHandle] = await window.showOpenFilePicker({
            types: [
              {
                description: "Graph Files",
                accept: { "application/mgraph": [".mgraph"] },
              },
            ],
            multiple: false,
          });

          const file = await fileHandle.getFile();
          const contents = await file.text();
          const configuration = JSON.parse(contents);

          try {
            this.editor.loadGraph(configuration);
            this.editor.showSuccess(
              `Graph Loaded`,
              `Successfully loaded "${file.name}"`
            );
          } catch (error) {
            this.editor.showError(
              "Open Failed : Configuration Error",
              `Error during graph configuration: ${error.message}`
            );
          }
        } catch (error) {
          if (error.name === "AbortError") {
            return;
          }
          this.editor.showError(
            "Open Failed : File Access",
            "There was an error while trying to access or read the file. Please check the console for more information."
          );
          console.error(error);
          return;
        }
      } else {
        const input = this.getOrCreateGraphFileInput();
        input.value = "";
        input.onchange = async (e) => {
          if (!input.files || !input.files.length) return;
          const file = input.files[0];

          if (!file.name.toLowerCase().endsWith(".mgraph")) {
            this.editor.showError(
              "Open Failed : Wrong File Type",
              `Please select a ".mgraph" file.`
            );
            input.value = "";
            return;
          }

          try {
            const contents = await file.text();
            const configuration = JSON.parse(contents);
            this.editor.loadGraph(configuration);
            this.editor.showSuccess(
              `Graph Loaded`,
              `Successfully loaded "${file.name}"`
            );
          } catch (error) {
            this.editor.showError(
              "Open Failed : Configuration Error",
              `Error during graph configuration: ${error.message}`
            );
          }
        };
        input.click();
      }
    }

    sanitizeFilename(filename) {
      return filename.replace(/[\/\\:*?"<>|]/g, "");
    }

    async onSaveClicked() {
      const serializedGraph = this.editor.serializeGraph();
      const saveData = JSON.stringify(serializedGraph);
      const defaultFileName = "untitled";
      let fileName = defaultFileName;

      if (
        serializedGraph &&
        serializedGraph.extra &&
        serializedGraph.extra.filemeta &&
        serializedGraph.extra.filemeta.name
      ) {
        const unsanitizedFileName = serializedGraph.extra.filemeta.name;
        fileName = this.sanitizeFilename(unsanitizedFileName);
        if (!fileName) fileName = defaultFileName;
      }

      if (this.supportsFilePicker()) {
        try {
          const fileHandle = await window.showSaveFilePicker({
            suggestedName: fileName + ".mgraph",
            types: [
              {
                description: "Graph Files",
                accept: { "application/mgraph": [".mgraph"] },
              },
            ],
          });

          const writable = await fileHandle.createWritable();
          await writable.write(saveData);
          await writable.close();
        } catch (error) {
          if (error.name === "AbortError") {
            return;
          } else {
            console.error("Failed to save file:", error);
          }
        }
      } else {
        const blob = new Blob([saveData], { type: "application/mgraph" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = fileName + ".mgraph";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(a.href);
        }, 0);
      }
    }
  }

  class EditorAutoUpdateExtension {
    constructor(editor) {
      this.editor = editor;
      this.currentGraph = null;
      this.graphIsConfiguring = false;
      this.pollingTimeoutId = null;
      this.pollingPeriodInMs = 1000;
      this.requestQueueMaxSize = 1;
      this.requestQueue = [];
      this.processingRequest = false;
      this.graphCreatePending = false;
      this.graphCreateDirty = false;
      this.activeGraphAction = null;

      // Bind event handlers once
      this.handleClear = this.handleClear.bind(this);
      this.handleConnectionChange = this.handleConnectionChange.bind(this);
      this.handleNodeAdded = this.handleNodeAdded.bind(this);
      this.handleNodeRemoved = this.handleNodeRemoved.bind(this);
      this.handlePropertyChange = this.handlePropertyChange.bind(this);
      this.handleBeforeGraphConfigure =
        this.handleBeforeGraphConfigure.bind(this);
      this.handleGraphConfigure = this.handleGraphConfigure.bind(this);

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
      // Placeholder for future toggle UI
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
      graph.off("clear", this.handleClear);
      graph.off("connectionChange", this.handleConnectionChange);
      graph.off("nodeAdded", this.handleNodeAdded);
      graph.off("nodeRemoved", this.handleNodeRemoved);
      graph.off("nodePropertyChanged", this.handlePropertyChange);
      graph.off("beforeGraphConfigure", this.handleBeforeGraphConfigure);
      graph.off("graphConfigure", this.handleGraphConfigure);
    }

    registerGraphListeners(graph) {
      graph.on("clear", this.handleClear);
      graph.on("connectionChange", this.handleConnectionChange);
      graph.on("nodeAdded", this.handleNodeAdded);
      graph.on("nodeRemoved", this.handleNodeRemoved);
      graph.on("nodePropertyChanged", this.handlePropertyChange);
      graph.on("beforeGraphConfigure", this.handleBeforeGraphConfigure);
      graph.on("graphConfigure", this.handleGraphConfigure);
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
      if (this.processingRequest || this.requestQueue.length === 0) return;

      this.processingRequest = true;
      const { requestFunction, args } = this.requestQueue.shift();

      try {
        await requestFunction.apply(this, args);
      } catch (e) {
        console.error("processRequests error", e);
      } finally {
        this.processingRequest = false;
        this.processRequests();
      }
    }

    handleBeforeGraphConfigure() {
      this.graphIsConfiguring = true;
    }

    handleGraphConfigure(graph) {
      this.graphIsConfiguring = false;
      this.enqueueGraphCreate(graph);
    }

    handleClear(graph) {
      if (this.graphIsConfiguring || graph.uuid !== this.currentGraph.uuid)
        return;
      this.enqueueGraphCreate(graph);
    }

    handleConnectionChange(graph) {
      if (this.graphIsConfiguring || graph.uuid !== this.currentGraph.uuid)
        return;
      this.enqueueGraphCreate(graph);
    }

    handleNodeAdded(graph) {
      if (this.graphIsConfiguring || graph.uuid !== this.currentGraph.uuid)
        return;
      this.enqueueGraphCreate(graph);
    }

    handleNodeRemoved(graph) {
      if (this.graphIsConfiguring || graph.uuid !== this.currentGraph.uuid)
        return;
      this.enqueueGraphCreate(graph);
    }

    handlePropertyChange(graph, node, name, value) {
      if (this.graphIsConfiguring || graph.uuid !== this.currentGraph.uuid)
        return;
      this.enqueueRequest(this.updateParameterValue, graph, node, name, value);
    }

    enqueueGraphCreate(graph) {
      if (this.graphCreatePending) {
        this.graphCreateDirty = true;
        return;
      }

      this.graphCreatePending = true;
      this.enqueueRequest(async (g) => {
        await this.createGraph(g);
        this.graphCreatePending = false;

        if (this.graphCreateDirty) {
          this.graphCreateDirty = false;
          this.enqueueGraphCreate(g); // Retry to catch new changes
        }
      }, graph);
    }

    async createGraph(graph) {
      this.activeGraphAction = graph.uuid;
      this.stopPolling();

      const graphPayload = graph.exportForBackend();
      mobjectLitegraph.LiteGraph.log_log("api create graph", graph.uuid, graphPayload);

      try {
        const status = await this.editor.apiSend("CreateGraph", {
          graph: graphPayload,
        });

        if (status.uuid === graph.uuid && this.currentGraph.uuid === graph.uuid) {
          graph.update(status);
          this.startPolling();
        }
      } catch (error) {
        console.error("createGraph error", error);
      } finally {
        this.activeGraphAction = null;
      }
    }

    async updateParameterValue(graph, node, name, value) {
      this.activeGraphAction = graph.uuid;
      this.stopPolling();

      mobjectLitegraph.LiteGraph.log_log("api update property", node, name, value);

      try {
        const returnedUuid = await this.editor.apiSend("UpdateParameterValue", {
          graphUuid: graph.uuid,
          nodeId: node.id,
          parameterName: name,
          parameterValue: value,
        });

        if (returnedUuid !== this.currentGraph.uuid) {
          mobjectLitegraph.LiteGraph.log_info(
            `Update response UUID (${returnedUuid}) does not match current graph (${this.currentGraph.uuid}), ignoring.`
          );
          return;
        }

        this.startPolling();
      } catch (error) {
        switch (error.code) {
          case "INVALID_GRAPH_INSTANCE_ID":
          case "NO_GRAPH_INSTANCE_AVAILABLE":
          case "GRAPH_UUID_MISSMATCH":
            if (graph.uuid === this.currentGraph.uuid) {
              mobjectLitegraph.LiteGraph.log_info(
                `api update failed [${error.code}], resending full graph`
              );
              await this.createGraph(graph);
            } else {
              mobjectLitegraph.LiteGraph.log_info(
                `Skipped createGraph fallback, graph is no longer active`
              );
            }
            break;
          default:
            console.error("Update parameter value failed:", error);
            break;
        }
      } finally {
        this.activeGraphAction = null;
      }
    }

    stopPolling() {
      if (this.pollingTimeoutId) {
        clearTimeout(this.pollingTimeoutId);
        this.pollingTimeoutId = null;
        mobjectLitegraph.LiteGraph.log_log("polling stopped");
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

      const currentPollingUuid = this.currentGraph.uuid;

      const poll = async () => {
        if (!this.isPolling()) return;

        try {
          const status = await this.editor.apiSend("GetStatus", {
            graphUuid: currentPollingUuid,
          });

          mobjectLitegraph.LiteGraph.log_log("polling reply >", status);

          if (
            status.uuid !== currentPollingUuid ||
            this.currentGraph.uuid !== currentPollingUuid
          ) {
            mobjectLitegraph.LiteGraph.log_info("polling response rejected (uuid mismatch)");
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

      mobjectLitegraph.LiteGraph.log_log("polling started");
      this.pollingTimeoutId = setTimeout(poll, this.pollingPeriodInMs);
    }
  }

  class ShowExecuteOrderExtension {
    constructor(editor) {
      this.editor = editor;
      this.editorCanvas = editor.getGraphCanvas();

      this.editor.on("toolbarReady", () => {
        this.getBlueprintsButton = this.editor.addButton("ToggleExecuteOrder", {
          label: "",
          iconClass: "fa-solid fa-share-nodes",
          onClick: this.onToggleExecuteOrderClicked.bind(this),
          tooltip: "Toggle Execution Order Display",
          section: "left",
        });
      });
    }

    onToggleExecuteOrderClicked() {
      this.editorCanvas.render_execution_order =
        !this.editorCanvas.render_execution_order;
      this.editorCanvas.setDirty(true, true);
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

  // MIT License

  // Copyright (c) 2024 Use Bootstrap

  // Permission is hereby granted, free of charge, to any person obtaining a copy
  // of this software and associated documentation files (the "Software"), to deal
  // in the Software without restriction, including without limitation the rights
  // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  // copies of the Software, and to permit persons to whom the Software is
  // furnished to do so, subject to the following conditions:

  // The above copyright notice and this permission notice shall be included in all
  // copies or substantial portions of the Software.

  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  // SOFTWARE.

  //------------------------

  // MIT License

  // Copyright (c) 2024 Erwin Heldy

  // Permission is hereby granted, free of charge, to any person obtaining a copy
  // of this software and associated documentation files (the "Software"), to deal
  // in the Software without restriction, including without limitation the rights
  // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  // copies of the Software, and to permit persons to whom the Software is
  // furnished to do so, subject to the following conditions:

  // The above copyright notice and this permission notice shall be included in all
  // copies or substantial portions of the Software.

  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  // SOFTWARE.

  const context = [];
  function cleanup(observer) {
    for (const dep of observer.dependencies) {
      dep.delete(observer);
    }
    observer.dependencies.clear();
  }
  function subscribe(observer, subscriptions) {
    subscriptions.add(observer);
    observer.dependencies.add(subscriptions);
  }
  function state(value) {
    const subscriptions = /* @__PURE__ */ new Set();
    function read() {
      const observer = context[context.length - 1];
      if (observer) {
        subscribe(observer, subscriptions);
      }
      return value;
    }
    function write(newValue) {
      value = newValue;
      for (const observer of [...subscriptions]) {
        observer.execute();
      }
    }
    return [read, write];
  }
  function effect(fn) {
    const effect2 = {
      execute() {
        cleanup(effect2);
        context.push(effect2);
        fn();
        context.pop();
      },
      dependencies: /* @__PURE__ */ new Set(),
    };
    effect2.execute();
  }
  function arraysAreEqual(arr1, arr2) {
    return (
      arr1.length === arr2.length &&
      arr1.every((value, index) => value === arr2[index])
    );
  }
  function change(target, value) {
    target.value = value;
    target.dispatchEvent(new Event("change"));
  }
  function pull(items, value) {
    const i = items.lastIndexOf(value);
    i !== -1 && items.splice(i, 1);
  }
  function createElement(tagName, attributes) {
    const element = document.createElement(tagName);
    return Object.assign(element, attributes);
  }
  function processData(data, separator) {
    return typeof data === "string"
      ? data.split(separator)
      : Array.isArray(data)
      ? data.flatMap((item) =>
          typeof item === "string" ? item.split(separator) : []
        )
      : [];
  }
  const name = "use-bootstrap-tag";
  const classTarget = `${name}-target`;
  function UseBootstrapTag(element) {
    const target = element;
    const nextElement = target.nextElementSibling;
    if (nextElement && nextElement.classList.contains(name)) {
      nextElement.remove();
    }
    const root = createElement("div");
    target.insertAdjacentElement("afterend", root);
    const dataset = target.dataset;
    const config = {
      separator: dataset.ubTagSeparator || ",",
      variant: dataset.ubTagVariant || "secondary",
      xPosition: dataset.ubTagXPosition || "right",
      isDuplicate: dataset.ubTagDuplicate !== void 0,
      max: +dataset.ubTagMax > 0 ? +dataset.ubTagMax : void 0,
      noInputOnblur: dataset.ubTagNoInputOnblur !== void 0,
    };
    const tags = () => root.querySelectorAll("button");
    const animateTag = (tag) => {
      tag.classList.add("duplicate");
      setTimeout(() => {
        tag.classList.remove("duplicate");
      }, 150);
    };
    const getValue = () => target.value;
    const getValues = () =>
      getValue()
        .split(config.separator)
        .filter((i) => i !== "");
    const addValue = (value2) => {
      const values2 = getValues();
      const insert = processData(value2, config.separator);
      if (!config.max || values2.length < config.max) {
        const duplicates = [];
        !config.isDuplicate &&
          values2.forEach(
            (value3, index) => insert.includes(value3) && duplicates.push(index)
          );
        const inserted = [];
        insert.forEach((i) => {
          if (values2.includes(i)) {
            config.isDuplicate && inserted.push(i);
          } else {
            inserted.push(i);
          }
        });
        values2.push(...inserted);
        if (!arraysAreEqual(getValues(), values2)) {
          change(target, values2.join(config.separator));
          inserted.forEach((item) => {
            const tag = tags()[values2.lastIndexOf(item)];
            const tagHeight = tag.offsetHeight;
            tag.style.height = 0;
            setTimeout(() => (tag.style.height = `${tagHeight}px`), 0);
            setTimeout(() => tag.style.removeProperty("height"), 150);
          });
        }
        if (!config.isDuplicate) {
          duplicates.forEach((index) => animateTag(tags()[index]));
        }
      } else {
        insert.length > 0 && tags().forEach(animateTag);
      }
    };
    const removeValue = (value2) => {
      const values2 = getValues();
      const remove = processData(value2, config.separator);
      remove.forEach((i) => pull(values2, i));
      if (!arraysAreEqual(getValues(), values2)) {
        change(target, values2.join(config.separator));
      }
    };
    const classList = target.classList;
    const disabled = target.disabled;
    target.tabIndex = -1;
    classList.add(classTarget);
    const [value, setValue] = state(target.value);
    const [focus, setFocus] = state(false);
    const [text, setText] = state("");
    const values = () =>
      value()
        .split(config.separator)
        .filter((i) => i.trim() !== "");
    const texts = () => text().trim();
    const placeholder = () => (values().length ? "" : target.placeholder);
    root.className =
      `${name} d-flex flex-wrap align-items-center gap-1 ${classList.value}`.replace(
        classTarget,
        ""
      );
    effect(() => {
      focus() ? root.classList.add("focus") : root.classList.remove("focus");
    });
    const textFocus = () => {
      var _a;
      return (_a = root.querySelector("input")) == null ? void 0 : _a.focus();
    };
    const removeByIndex = (index) => {
      if (index >= 0) {
        removeValue(values()[index]);
      }
    };
    const appendTag = (force = false) => {
      const value2 = texts();
      value2 === "" && setText("");
      if (text().includes(config.separator) || (force && text() !== "")) {
        addValue(value2.split(config.separator).filter((i) => i.trim() !== ""));
        setText("");
      }
    };
    const tagElement = createElement("button", {
      type: "button",
      className: `align-items-center gap-1 d-inline-flex py-0 border-0 btn btn-${config.variant}`,
      disabled,
    });
    classList.contains("form-control-sm") && tagElement.classList.add("btn-sm");
    classList.contains("form-control-lg") && tagElement.classList.add("btn-lg");
    config.xPosition === "left" && tagElement.classList.add("flex-row-reverse");
    const closeTagElement = createElement("span", {
      className: "d-inline-flex",
      role: "button",
      tabIndex: -1,
      innerHTML:
        '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>',
    });
    const renderTags = (items) => {
      tags().forEach((tag) => tag.remove());
      items.reverse().forEach((value2, i) => {
        const index = items.length - 1 - i;
        const tag = tagElement.cloneNode();
        tag.innerHTML = value2;
        tag.onfocus = () => {
          tag.classList.add("active");
          setFocus(true);
        };
        tag.onblur = () => {
          tag.classList.remove("active");
          setFocus(false);
        };
        tag.onkeydown = ({ key }) => {
          if (key === "Backspace" || key === "Delete") {
            removeByIndex(index);
            const nextFocus =
              key === "Backspace"
                ? index - 1
                : values().length === index
                ? -1
                : index;
            if (nextFocus === -1) {
              textFocus();
            } else {
              tags()[nextFocus].focus();
            }
          }
        };
        if (!disabled) {
          const span = closeTagElement.cloneNode(true);
          span.onclick = () => {
            removeByIndex(index);
            textFocus();
          };
          tag.append(span);
        }
        root.prepend(tag);
      });
    };
    effect(() => {
      renderTags(values());
    });
    if (!disabled) {
      const wrapper = createElement("div", {
        className: "input-wrapper",
      });
      const span = createElement("span");
      const input = createElement("input", {
        type: "text",
      });
      input.onfocus = () => {
        setFocus(true);
      };
      input.onblur = () => {
        setFocus(false);
        config.noInputOnblur ? setText("") : appendTag(true);
      };
      input.onkeydown = (e) => {
        if (text() === "" && e.key === "Backspace") {
          removeByIndex(values().length - 1);
        }
        if (text() !== "" && e.key === "Enter") {
          appendTag(true);
          e.preventDefault();
        }
      };
      input.oninput = () => {
        setText(input.value);
        appendTag();
      };
      effect(() => {
        span.innerHTML = text() || placeholder() || "i";
        input.placeholder = placeholder();
        input.value = text();
      });
      wrapper.append(span, input);
      root.append(wrapper);
    }
    root.onclick = (e) => {
      if (e.target.tagName !== "BUTTON") {
        textFocus();
      }
    };
    target.addEventListener("change", () => {
      setValue(target.value);
    });
    target.addEventListener("focus", textFocus);
    return {
      getValue,
      getValues,
      addValue,
      removeValue,
    };
  }

  class FileMetaExtension {
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
          UseBootstrapTag(
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

  class ServerExamplesEditorExtension {
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
      // default settings
      const defaults = {
        GetBlueprintsExtension: true,
        FileOperationsExtension: true,
        EditorAutoUpdateExtension: true,
        ShowExecuteOrderExtension: true,
        FileMetaExtension: true,
        ServerExamplesEditorExtension: false,
      };
      const settings = { ...defaults, ...options };

      // add any default canvas extensions here.  It's good practice to make
      // these switchable via the options object.
      if (settings.GetBlueprintsExtension) {
        graphFramework.registerEditorExtension(GetBlueprintsExtension);
      }
      if (settings.FileOperationsExtension) {
        graphFramework.registerEditorExtension(FileOperationsExtension);
      }
      if (settings.EditorAutoUpdateExtension) {
        graphFramework.registerEditorExtension(EditorAutoUpdateExtension);
      }
      if (settings.ShowExecuteOrderExtension) {
        graphFramework.registerEditorExtension(ShowExecuteOrderExtension);
      }
      if (settings.FileMetaExtension) {
        graphFramework.registerEditorExtension(FileMetaExtension);
      }
      if (settings.ServerExamplesEditorExtension) {
        graphFramework.registerEditorExtension(
          ServerExamplesEditorExtension,
          settings
        );
      }
    }

    registerNodeExtensions(graphFramework, options = {}) {
      // default settings
      const defaults = {
        PreExecutionCheckExtension: true,
      };
      const settings = { ...defaults, ...options };

      // add any default node extensions here.  It's good practice to make
      // these switchable via the options object.
      if (settings.PreExecutionCheckExtension) {
        graphFramework.registerNodeExtension(PreExecutionCheckExtension);
      }
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
  exports.GraphCanvas = GraphCanvas;
  exports.GraphEditor = GraphEditor;
  exports.GraphFramework = GraphFramework;
  exports.LedComponent = LedComponent;
  exports.NumberLimiter = NumberLimiter;
  exports.NumericDisplayComponent = NumericDisplayComponent;
  exports.NumericInputComponent = NumericInputComponent;
  exports.SingleLineTextDisplayComponent = SingleLineTextDisplayComponent;
  exports.SingleLineTextInputComponent = SingleLineTextInputComponent;
  exports.ToolbarButton = ToolbarButton;
  exports.UiDraw = UiDraw;
  exports.UiTheme = UiTheme;
  exports.clamp = clamp;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
