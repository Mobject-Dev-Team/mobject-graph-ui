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

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mobjectLitegraph = require('mobject-litegraph');

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

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _assertClassBrand(e, t, n) {
  if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
  throw new TypeError("Private element is not present on this object");
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _checkPrivateRedeclaration(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _classPrivateFieldGet2(s, a) {
  return s.get(_assertClassBrand(s, a));
}
function _classPrivateFieldInitSpec(e, t, a) {
  _checkPrivateRedeclaration(e, t), t.set(e, a);
}
function _classPrivateFieldSet2(s, a, r) {
  return s.set(_assertClassBrand(s, a), r), r;
}
function _classPrivateMethodInitSpec(e, a) {
  _checkPrivateRedeclaration(e, a), a.add(e);
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = !0, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _get() {
  return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
    var p = _superPropBase(e, t);
    if (p) {
      var n = Object.getOwnPropertyDescriptor(p, t);
      return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
    }
  }, _get.apply(null, arguments);
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _superPropBase(t, o) {
  for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)););
  return t;
}
function _superPropGet(t, o, e, r) {
  var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e);
  return 2 & r && "function" == typeof p ? function (t) {
    return p.apply(e, t);
  } : p;
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var LedComponent = /*#__PURE__*/function () {
  function LedComponent(label, defaultValue, colorGenerator) {
    _classCallCheck(this, LedComponent);
    this.label = label;
    this.colorGenerator = colorGenerator;
    this._isActive = defaultValue;
    this.setupDefaults();
  }
  return _createClass(LedComponent, [{
    key: "setupDefaults",
    value: function setupDefaults() {
      this.labelFont = "12px Arial";
      this.labelTextColor = this.colorGenerator.getLabelColor();
      this.margin = 20;
      this.outlineColor = this.colorGenerator.getBorderColor();
      this.valueFont = "12px Arial";
      this.valueTextColor = this.colorGenerator.getValueColor();
      this.trueIndicatorColor = "#39e75f";
      this.falseIndicatorColor = "#777";
    }
  }, {
    key: "isActive",
    get: function get() {
      return this._isActive;
    },
    set: function set(value) {
      this._isActive = value;
    }
  }, {
    key: "computeSize",
    value: function computeSize() {
      return new Float32Array([220, 20]);
    }
  }, {
    key: "draw",
    value: function draw(ctx, node, widget_width, y, H) {
      var drawWidth = widget_width - this.margin * 2;
      this.drawLabel(ctx, y, H);
      this.drawValue(ctx, drawWidth, y, H);
      this.drawIndicator(ctx, drawWidth, y, H);
    }
  }, {
    key: "drawLabel",
    value: function drawLabel(ctx, y, H) {
      ctx.font = this.labelFont;
      ctx.fillStyle = this.labelTextColor;
      ctx.fillText(this.label, this.margin, y + H * 0.7);
    }
  }, {
    key: "drawValue",
    value: function drawValue(ctx, drawWidth, y, H) {
      ctx.font = this.valueFont;
      ctx.fillStyle = this.valueTextColor;
      ctx.textAlign = "right";
      ctx.fillText(this._isActive ? "true" : "false", drawWidth + this.margin - 20, y + H * 0.7);
    }
  }, {
    key: "drawIndicator",
    value: function drawIndicator(ctx, drawWidth, y, H) {
      var ledColor = this._isActive ? this.trueIndicatorColor : this.falseIndicatorColor;
      var glowRadius = H * 0.6;
      var glowGradient = ctx.createRadialGradient(drawWidth + this.margin - 5, y + H * 0.5, 0, drawWidth + this.margin - 5, y + H * 0.5, glowRadius);
      glowGradient.addColorStop(0, ledColor);
      glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      if (this._isActive) {
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(drawWidth + this.margin - 5, y + H * 0.5, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = ledColor;
      ctx.beginPath();
      ctx.arc(drawWidth + this.margin - 5, y + H * 0.5, H * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#222";
      ctx.stroke();
    }
  }]);
}();

var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);
    this.listeners = {};
  }
  return _createClass(EventEmitter, [{
    key: "on",
    value: function on(eventName, listener) {
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }
      this.listeners[eventName].push(listener);
    }
  }, {
    key: "off",
    value: function off(eventName, listener) {
      var listeners = this.listeners[eventName];
      if (!listeners) return;
      var index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }, {
    key: "emit",
    value: function emit(eventName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      var listeners = this.listeners[eventName];
      if (!listeners) return;
      listeners.forEach(function (listener) {
        listener.apply(void 0, args);
      });
    }
  }]);
}();

var CheckboxComponent = /*#__PURE__*/function () {
  function CheckboxComponent(label, defaultValue, colorGenerator) {
    _classCallCheck(this, CheckboxComponent);
    this.eventEmitter = new EventEmitter();
    this.label = label;
    this.colorGenerator = colorGenerator;
    this._isChecked = defaultValue;
    this.setupDefaults();
  }
  return _createClass(CheckboxComponent, [{
    key: "setupDefaults",
    value: function setupDefaults() {
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
  }, {
    key: "isChecked",
    get: function get() {
      return this._isChecked;
    },
    set: function set(value) {
      this._isChecked = value;
      this.eventEmitter.emit("onChange", this._isChecked);
    }
  }, {
    key: "on",
    value: function on(eventName, listener) {
      this.eventEmitter.on(eventName, listener);
    }
  }, {
    key: "off",
    value: function off(eventName, listener) {
      this.eventEmitter.off(eventName, listener);
    }
  }, {
    key: "isClickInZone",
    value: function isClickInZone(pos) {
      return pos[0] >= this.checkboxX && pos[0] <= this.checkboxX + this.labelEndPosition && pos[1] >= this.checkboxY && pos[1] <= this.checkboxY + this.checkboxSize;
    }
  }, {
    key: "onMouse",
    value: function onMouse(event, pos) {
      if (event.type === "pointerdown" && this.isClickInZone(pos)) {
        this.isChecked = !this.isChecked;
      }
    }
  }, {
    key: "computeSize",
    value: function computeSize() {
      return new Float32Array([220, 20]);
    }
  }, {
    key: "draw",
    value: function draw(ctx, node, widget_width, y, H) {
      this.drawLabel(ctx, y, H);
      this.drawCheckbox(ctx, y, H);
    }
  }, {
    key: "drawLabel",
    value: function drawLabel(ctx, y, H) {
      ctx.font = this.labelFont;
      ctx.fillStyle = this.labelTextColor;
      var startX = this.margin * 2 + 5;
      ctx.fillText(this.label, startX, y + H * 0.7);
      var textWidth = ctx.measureText(this.label).width;
      var endX = startX + textWidth;
      this.labelEndPosition = endX;
    }
  }, {
    key: "drawCheckbox",
    value: function drawCheckbox(ctx, y, H) {
      this.checkboxY = y + (H - this.checkboxSize) / 2;
      this.checkboxX = this.margin;
      ctx.fillStyle = this.backgroundColor;
      ctx.strokeStyle = this.outlineColor;
      ctx.beginPath();

      // ctx.roundRect(this.margin, y, drawWidth, H, H * 0.2);

      ctx.roundRect(this.checkboxX, this.checkboxY, this.checkboxSize, this.checkboxSize, 2);
      ctx.fill();
      ctx.stroke();
      if (this._isChecked) {
        ctx.strokeStyle = this.checkboxColor;
        ctx.beginPath();
        ctx.moveTo(this.checkboxX + 3, this.checkboxY + this.checkboxSize / 2);
        ctx.lineTo(this.checkboxX + this.checkboxSize / 3, this.checkboxY + this.checkboxSize - 3);
        ctx.lineTo(this.checkboxX + this.checkboxSize - 3, this.checkboxY + 3);
        ctx.stroke();
      }
    }
  }]);
}();

var ComboboxComponent = /*#__PURE__*/function () {
  function ComboboxComponent(label, defaultValue, options, colorGenerator) {
    _classCallCheck(this, ComboboxComponent);
    this.eventEmitter = new EventEmitter();
    this.label = label;
    this.options = options;
    this.colorGenerator = colorGenerator;
    this._selection = defaultValue;
    this.setupDefaults();
  }
  return _createClass(ComboboxComponent, [{
    key: "setupDefaults",
    value: function setupDefaults() {
      this.labelFont = "12px Arial";
      this.labelTextColor = this.colorGenerator.getLabelColor();
      this.valueFont = "12px Arial";
      this.valueTextColor = this.colorGenerator.getValueColor();
      this.margin = 20;
      this.outlineColor = this.colorGenerator.getBorderColor();
      this.backgroundColor = this.colorGenerator.getBackgroundColor();
    }
  }, {
    key: "selection",
    get: function get() {
      return this._text;
    },
    set: function set(value) {
      this._selection = value;
      this.eventEmitter.emit("onChange", this._selection);
    }
  }, {
    key: "on",
    value: function on(eventName, listener) {
      this.eventEmitter.on(eventName, listener);
    }
  }, {
    key: "off",
    value: function off(eventName, listener) {
      this.eventEmitter.off(eventName, listener);
    }
  }, {
    key: "onMouse",
    value: function onMouse(event, pos) {
      var component = this;
      if (event.type === "pointerdown") {
        var ref_window = event.target.data.getCanvasWindow();
        new mobjectLitegraph.LiteGraph.ContextMenu(this.options, {
          scale: 1,
          event: event,
          className: "dark",
          callback: function callback(v) {
            component.selection = v;
          }
        }, ref_window);
      }
    }
  }, {
    key: "computeSize",
    value: function computeSize() {
      var size = new Float32Array([220, 20]);
      var maxValueWidth = 0;
      this.options.forEach(function (optionsText) {
        maxValueWidth = Math.max(maxValueWidth, mobjectLitegraph.LiteGraph.computeTextWidth(optionsText, 0.6));
      });
      size[0] = maxValueWidth;
      size[0] += mobjectLitegraph.LiteGraph.computeTextWidth(this.label);
      size[0] += 70;
      size[1] = mobjectLitegraph.LiteGraph.NODE_WIDGET_HEIGHT;
      return size;
    }
  }, {
    key: "draw",
    value: function draw(ctx, node, widget_width, y, H) {
      ctx.textAlign = "left";
      var drawWidth = widget_width - this.margin * 2;
      this.drawBackground(ctx, y, drawWidth, H);
      this.drawLabel(ctx, y, H);
      this.drawValue(ctx, drawWidth, y, H);
      this.drawDownArrow(ctx, y, widget_width, H);
    }
  }, {
    key: "drawBackground",
    value: function drawBackground(ctx, y, drawWidth, H) {
      ctx.strokeStyle = this.outlineColor;
      ctx.fillStyle = this.backgroundColor;
      ctx.beginPath();
      ctx.roundRect(this.margin, y, drawWidth, H, 2);
      ctx.fill();
      ctx.stroke();
    }
  }, {
    key: "drawLabel",
    value: function drawLabel(ctx, y, H) {
      ctx.font = this.labelFont;
      ctx.fillStyle = this.labelTextColor;
      ctx.fillText(this.label, this.margin + 10, y + H * 0.7);
    }
  }, {
    key: "drawDownArrow",
    value: function drawDownArrow(ctx, y, widget_width, H) {
      ctx.fillStyle = this.arrowColor;
      ctx.beginPath();
      ctx.moveTo(widget_width - this.margin - 12, y + H - 5);
      ctx.lineTo(widget_width - this.margin - 18, y + 5);
      ctx.lineTo(widget_width - this.margin - 6, y + 5);
      ctx.fill();
    }
  }, {
    key: "drawValue",
    value: function drawValue(ctx, drawWidth, y, H) {
      ctx.font = this.valueFont;
      ctx.fillStyle = this.valueTextColor;
      ctx.textAlign = "right";
      ctx.fillText(this._selection, drawWidth - 5, y + H * 0.7);
    }
  }]);
}();

var NumericDisplayComponent = /*#__PURE__*/function () {
  function NumericDisplayComponent(label, defaultValue, precision, colorGenerator) {
    _classCallCheck(this, NumericDisplayComponent);
    this.label = label;
    this.precision = precision;
    this.colorGenerator = colorGenerator;
    this._value = defaultValue;
    this.setupDefaults();
  }
  return _createClass(NumericDisplayComponent, [{
    key: "setupDefaults",
    value: function setupDefaults() {
      this.labelFont = "12px Arial";
      this.valueFont = "12px Arial";
      this.margin = 20;
      this.labelTextColor = this.colorGenerator.getLabelColor();
      this.valueTextColor = this.colorGenerator.getValueColor();
    }
  }, {
    key: "value",
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      this._value = value;
    }
  }, {
    key: "computeSize",
    value: function computeSize() {
      return new Float32Array([220, 20]);
    }
  }, {
    key: "draw",
    value: function draw(ctx, node, widget_width, y, H) {
      ctx.textAlign = "left";
      var drawWidth = widget_width - this.margin * 2;
      this.drawLabel(ctx, y, H);
      this.drawValue(ctx, drawWidth, y, H);
    }
  }, {
    key: "drawLabel",
    value: function drawLabel(ctx, y, H) {
      ctx.font = this.labelFont;
      ctx.fillStyle = this.labelTextColor;
      ctx.fillText(this.label, this.margin, y + H * 0.7);
    }
  }, {
    key: "drawValue",
    value: function drawValue(ctx, drawWidth, y, H) {
      ctx.font = this.valueFont;
      ctx.fillStyle = this.valueTextColor;
      ctx.textAlign = "right";
      ctx.fillText(Number(this._value).toFixed(this.precision), drawWidth + this.margin - 5, y + H * 0.7);
    }
  }]);
}();

var NumericInputComponent = /*#__PURE__*/function () {
  function NumericInputComponent(label, defaultValue, precision, limiter, colorGenerator) {
    _classCallCheck(this, NumericInputComponent);
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
  return _createClass(NumericInputComponent, [{
    key: "setupDefaults",
    value: function setupDefaults() {
      this.labelFont = "12px Arial";
      this.valueFont = "12px Arial";
      this.margin = 20;
      this.labelTextColor = this.colorGenerator.getLabelColor();
      this.valueTextColor = this.colorGenerator.getValueColor();
      this.outlineColor = this.colorGenerator.getBorderColor();
      this.backgroundColor = this.colorGenerator.getBackgroundColor();
      this.arrowColor = this.colorGenerator.getValueColor();
    }
  }, {
    key: "value",
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      this._value = value;
      this.eventEmitter.emit("onChange", this._value);
    }
  }, {
    key: "on",
    value: function on(eventName, listener) {
      this.eventEmitter.on(eventName, listener);
    }
  }, {
    key: "off",
    value: function off(eventName, listener) {
      this.eventEmitter.off(eventName, listener);
    }
  }, {
    key: "computeSize",
    value: function computeSize() {
      return new Float32Array([220, 20]);
    }
  }, {
    key: "onMouse",
    value: function onMouse(event, pos, node) {
      var x = pos[0];
      var widgetWidth = node.size[0];
      var multiplier = this.getMultiplier(event);
      if (event.type === "pointerdown") {
        this.handleMouseDown(x, widgetWidth, multiplier);
      } else if (event.type === "pointermove") {
        this.handleMouseMove(x, multiplier);
      } else if (event.type === "pointerup") {
        this.handleMouseUp(x, widgetWidth, event);
      }
    }
  }, {
    key: "calculateStep",
    value: function calculateStep(precision) {
      return Math.pow(10, -Math.abs(precision));
    }
  }, {
    key: "getMultiplier",
    value: function getMultiplier(event) {
      if (event.shiftKey && event.ctrlKey) {
        return 100;
      } else if (event.shiftKey) {
        return 10;
      } else {
        return 1;
      }
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(x, widgetWidth, multiplier) {
      this.isMyMouseEvent = true;
      this.isDragging = false;
      this.startX = x;
      this.adjustValueByPosition(x, widgetWidth, multiplier);
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(currentX, multiplier) {
      if (!this.isMyMouseEvent) return;
      if (Math.abs(currentX - this.startX) > 1) {
        var stepCount = Math.floor(currentX - this.startX);
        this.limiter.incrementBy(stepCount * this.step * multiplier);
        this._value = this.limiter.getValue();
        this.startX = currentX;
        this.isDragging = true;
      }
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(x, widgetWidth, event) {
      if (!this.isDragging && this.isInsideInputArea(x, widgetWidth)) {
        this.promptForValue(event);
      }
      this.isDragging = false;
      this.isMyMouseEvent = false;
      this.updateValueOnRelease();
    }
  }, {
    key: "isInsideInputArea",
    value: function isInsideInputArea(x, widgetWidth) {
      return x > 40 && x < widgetWidth - 40;
    }
  }, {
    key: "adjustValueByPosition",
    value: function adjustValueByPosition(x, widgetWidth, multiplier) {
      if (x < 40) {
        // down arrow
        this.limiter.decrementBy(this.step * multiplier);
      } else if (x > widgetWidth - 40) {
        // up arrow
        this.limiter.incrementBy(this.step * multiplier);
      }
      this._value = this.limiter.getValue();
    }
  }, {
    key: "promptForValue",
    value: function promptForValue(event) {
      var widget = this;
      event.target.data.prompt("Value", this.value.toString(), function (inputValue) {
        var value = Number(inputValue);
        if (!isNaN(value)) {
          widget.limiter.setValue(value);
          widget.value = widget.limiter.getValue();
          widget.updateValueOnRelease();
        } else {
          console.error("Invalid input: Input is not a number.");
        }
      }, event);
    }
  }, {
    key: "updateValueOnRelease",
    value: function updateValueOnRelease() {
      this.limiter.setValue(this.value);
      this.value = this.limiter.getValue();
    }
  }, {
    key: "draw",
    value: function draw(ctx, node, widget_width, y, H) {
      ctx.textAlign = "left";
      var drawWidth = widget_width - this.margin * 2;
      this.drawBackground(ctx, y, drawWidth, H);
      this.drawLeftArrow(ctx, y, H);
      this.drawRightArrow(ctx, y, widget_width, H);
      this.drawLabel(ctx, y, H);
      this.drawValue(ctx, drawWidth, y, H);
    }
  }, {
    key: "drawBackground",
    value: function drawBackground(ctx, y, drawWidth, H) {
      ctx.strokeStyle = this.outlineColor;
      ctx.fillStyle = this.backgroundColor;
      ctx.beginPath();
      ctx.roundRect(this.margin, y, drawWidth, H, 2);
      ctx.fill();
      ctx.stroke();
    }
  }, {
    key: "drawLeftArrow",
    value: function drawLeftArrow(ctx, y, H) {
      ctx.fillStyle = this.arrowColor;
      ctx.beginPath();
      ctx.moveTo(this.margin + 16, y + 5);
      ctx.lineTo(this.margin + 6, y + H * 0.5);
      ctx.lineTo(this.margin + 16, y + H - 5);
      ctx.fill();
    }
  }, {
    key: "drawRightArrow",
    value: function drawRightArrow(ctx, y, widget_width, H) {
      ctx.fillStyle = this.arrowColor;
      ctx.beginPath();
      ctx.moveTo(widget_width - this.margin - 16, y + 5);
      ctx.lineTo(widget_width - this.margin - 6, y + H * 0.5);
      ctx.lineTo(widget_width - this.margin - 16, y + H - 5);
      ctx.fill();
    }
  }, {
    key: "drawLabel",
    value: function drawLabel(ctx, y, H) {
      ctx.font = this.labelFont;
      ctx.fillStyle = this.labelTextColor;
      ctx.fillText(this.label, this.margin * 2 + 5, y + H * 0.7);
    }
  }, {
    key: "drawValue",
    value: function drawValue(ctx, drawWidth, y, H) {
      ctx.font = this.valueFont;
      ctx.fillStyle = this.valueTextColor;
      ctx.textAlign = "right";
      ctx.fillText(Number(this._value).toFixed(this.precision), drawWidth - 5, y + H * 0.7);
    }
  }]);
}();

var SingleLineTextDisplayComponent = /*#__PURE__*/function () {
  function SingleLineTextDisplayComponent(label, defaultValue, colorGenerator) {
    _classCallCheck(this, SingleLineTextDisplayComponent);
    this.label = label;
    this.colorGenerator = colorGenerator;
    this._text = defaultValue;
    this.setupDefaults();
  }
  return _createClass(SingleLineTextDisplayComponent, [{
    key: "setupDefaults",
    value: function setupDefaults() {
      this.labelFont = "12px Arial";
      this.labelTextColor = this.colorGenerator.getLabelColor();
      this.valueFont = "12px Arial";
      this.valueTextColor = this.colorGenerator.getValueColor();
      this.margin = 20;
      this.outlineColor = this.colorGenerator.getBorderColor();
      this.backgroundColor = this.colorGenerator.getBackgroundColor();
    }
  }, {
    key: "text",
    get: function get() {
      return this._text;
    },
    set: function set(value) {
      this._text = value;
    }
  }, {
    key: "computeSize",
    value: function computeSize() {
      return new Float32Array([220, 20]);
    }
  }, {
    key: "draw",
    value: function draw(ctx, node, widget_width, y, H) {
      ctx.textAlign = "left";
      var drawWidth = widget_width - this.margin * 2;
      this.drawLabel(ctx, y, H);
      this.drawText(ctx, drawWidth, y, H);
    }
  }, {
    key: "drawLabel",
    value: function drawLabel(ctx, y, H) {
      ctx.font = this.labelFont;
      ctx.fillStyle = this.labelTextColor;
      ctx.fillText(this.label, this.margin, y + H * 0.7);
    }
  }, {
    key: "drawText",
    value: function drawText(ctx, drawWidth, y, H) {
      ctx.font = this.valueFont;
      ctx.fillStyle = this.valueTextColor;
      ctx.textAlign = "right";
      ctx.fillText(this._text, drawWidth + this.margin, y + H * 0.7);
    }
  }]);
}();

var SingleLineTextInputComponent = /*#__PURE__*/function () {
  function SingleLineTextInputComponent(label, defaultValue, colorGenerator) {
    _classCallCheck(this, SingleLineTextInputComponent);
    this.eventEmitter = new EventEmitter();
    this.label = label;
    this.colorGenerator = colorGenerator;
    this._text = defaultValue;
    this.setupDefaults();
  }
  return _createClass(SingleLineTextInputComponent, [{
    key: "setupDefaults",
    value: function setupDefaults() {
      this.labelFont = "12px Arial";
      this.labelTextColor = this.colorGenerator.getLabelColor();
      this.valueFont = "12px Arial";
      this.valueTextColor = this.colorGenerator.getValueColor();
      this.margin = 20;
      this.outlineColor = this.colorGenerator.getBorderColor();
      this.backgroundColor = this.colorGenerator.getBackgroundColor();
    }
  }, {
    key: "text",
    get: function get() {
      return this._text;
    },
    set: function set(value) {
      this._text = value;
      this.eventEmitter.emit("onChange", this._text);
    }
  }, {
    key: "on",
    value: function on(eventName, listener) {
      this.eventEmitter.on(eventName, listener);
    }
  }, {
    key: "off",
    value: function off(eventName, listener) {
      this.eventEmitter.off(eventName, listener);
    }
  }, {
    key: "onMouse",
    value: function onMouse(event, pos) {
      var component = this;
      if (event.type === "pointerdown") {
        event.target.data.prompt("Value", this._text, function (v) {
          component.text = v;
        }, event);
      }
    }
  }, {
    key: "computeSize",
    value: function computeSize() {
      return new Float32Array([220, 20]);
    }
  }, {
    key: "draw",
    value: function draw(ctx, node, widget_width, y, H) {
      ctx.textAlign = "left";
      var drawWidth = widget_width - this.margin * 2;
      this.drawBackground(ctx, y, drawWidth, H);
      this.drawLabel(ctx, y, H);
      this.drawText(ctx, drawWidth, y, H);
    }
  }, {
    key: "drawBackground",
    value: function drawBackground(ctx, y, drawWidth, H) {
      ctx.strokeStyle = this.outlineColor;
      ctx.fillStyle = this.backgroundColor;
      ctx.beginPath();
      ctx.roundRect(this.margin, y, drawWidth, H, 2);
      ctx.fill();
      ctx.stroke();
    }
  }, {
    key: "drawLabel",
    value: function drawLabel(ctx, y, H) {
      ctx.font = this.labelFont;
      ctx.fillStyle = this.labelTextColor;
      ctx.fillText(this.label, this.margin + 10, y + H * 0.7);
    }
  }, {
    key: "drawText",
    value: function drawText(ctx, drawWidth, y, H) {
      ctx.font = this.valueFont;
      ctx.fillStyle = this.valueTextColor;
      ctx.textAlign = "right";
      ctx.fillText(this._text, this.margin + drawWidth - 10, y + H * 0.7);
    }
  }]);
}();

var ColorGenerator = /*#__PURE__*/function () {
  function ColorGenerator(type) {
    var other = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    _classCallCheck(this, ColorGenerator);
    _defineProperty(this, "LABEL_BRIGHTNESS", 70);
    _defineProperty(this, "LABEL_SATURATION", 0);
    _defineProperty(this, "VALUE_BRIGHTNESS", 90);
    _defineProperty(this, "VALUE_SATURATION", 0);
    _defineProperty(this, "BORDER_BRIGHTNESS", 50);
    _defineProperty(this, "BORDER_SATURATION", 0);
    _defineProperty(this, "BACKGROUND_BRIGHTNESS", 10);
    _defineProperty(this, "BACKGROUND_SATURATION", 0);
    this.type = type;
    this.other = other;
  }
  return _createClass(ColorGenerator, [{
    key: "generateHsl",
    value: function generateHsl(saturation, brightness) {
      var hash = 0;
      for (var i = 0; i < this.type.length; i++) {
        hash = this.type.charCodeAt(i) + ((hash << 5) - hash);
      }
      for (var _i = 0; _i < this.other.length; _i++) {
        hash = this.other.charCodeAt(_i) + ((hash << 5) - hash);
      }
      var hue = Math.abs(hash) % 360;
      return "hsl(".concat(hue, ", ").concat(saturation, "%, ").concat(brightness, "%)");
    }
  }, {
    key: "getLabelColor",
    value: function getLabelColor() {
      return this.generateHsl(this.LABEL_SATURATION, this.LABEL_BRIGHTNESS);
    }
  }, {
    key: "getValueColor",
    value: function getValueColor() {
      return this.generateHsl(this.VALUE_SATURATION, this.VALUE_BRIGHTNESS);
    }
  }, {
    key: "getBorderColor",
    value: function getBorderColor() {
      return this.generateHsl(this.BORDER_SATURATION, this.BORDER_BRIGHTNESS);
    }
  }, {
    key: "getBackgroundColor",
    value: function getBackgroundColor() {
      return this.generateHsl(this.BACKGROUND_SATURATION, this.BACKGROUND_BRIGHTNESS);
    }
  }]);
}();

var _minimum = /*#__PURE__*/new WeakMap();
var _maximum = /*#__PURE__*/new WeakMap();
var _value = /*#__PURE__*/new WeakMap();
var _numberType = /*#__PURE__*/new WeakMap();
var _precision = /*#__PURE__*/new WeakMap();
var _limitMinimum = /*#__PURE__*/new WeakMap();
var _limitMaximum = /*#__PURE__*/new WeakMap();
var _NumberLimiter_brand = /*#__PURE__*/new WeakSet();
var NumberLimiter = /*#__PURE__*/function () {
  function NumberLimiter(minimum, maximum, initialValue) {
    var numberType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var precision = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 2;
    _classCallCheck(this, NumberLimiter);
    _classPrivateMethodInitSpec(this, _NumberLimiter_brand);
    _classPrivateFieldInitSpec(this, _minimum, void 0);
    _classPrivateFieldInitSpec(this, _maximum, void 0);
    _classPrivateFieldInitSpec(this, _value, void 0);
    _classPrivateFieldInitSpec(this, _numberType, void 0);
    _classPrivateFieldInitSpec(this, _precision, void 0);
    _classPrivateFieldInitSpec(this, _limitMinimum, void 0);
    _classPrivateFieldInitSpec(this, _limitMaximum, void 0);
    _classPrivateFieldSet2(_minimum, this, minimum);
    _classPrivateFieldSet2(_maximum, this, maximum);
    _classPrivateFieldSet2(_value, this, initialValue);
    _classPrivateFieldSet2(_numberType, this, numberType);
    _classPrivateFieldSet2(_precision, this, precision);
    _assertClassBrand(_NumberLimiter_brand, this, _initLimits).call(this);
    this.setValue(_classPrivateFieldGet2(_value, this));
  }
  return _createClass(NumberLimiter, [{
    key: "setValue",
    value: function setValue(newValue) {
      if (_assertClassBrand(_NumberLimiter_brand, this, _shouldAdjust).call(this, newValue)) {
        newValue += 1;
      }
      newValue = parseFloat(newValue.toFixed(_classPrivateFieldGet2(_precision, this)));
      _classPrivateFieldSet2(_value, this, Math.min(Math.max(newValue, _classPrivateFieldGet2(_limitMinimum, this)), _classPrivateFieldGet2(_limitMaximum, this)));
    }
  }, {
    key: "incrementBy",
    value: function incrementBy(amount) {
      if (_assertClassBrand(_NumberLimiter_brand, this, _shouldAdjust).call(this, _classPrivateFieldGet2(_value, this) + amount)) {
        amount += 1;
      }
      this.setValue(_classPrivateFieldGet2(_value, this) + amount);
    }
  }, {
    key: "decrementBy",
    value: function decrementBy(amount) {
      if (_assertClassBrand(_NumberLimiter_brand, this, _shouldAdjust).call(this, _classPrivateFieldGet2(_value, this) - amount)) {
        amount += 1;
      }
      this.setValue(_classPrivateFieldGet2(_value, this) - amount);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return _classPrivateFieldGet2(_value, this);
    }
  }]);
}();
function _shouldAdjust(number) {
  if (_classPrivateFieldGet2(_numberType, this) === "odd" && number % 2 === 0) return true;
  if (_classPrivateFieldGet2(_numberType, this) === "even" && number % 2 !== 0) return true;
  return false;
}
function _adjustLimit(limit, adjustment) {
  return _assertClassBrand(_NumberLimiter_brand, this, _shouldAdjust).call(this, limit) ? limit + adjustment : limit;
}
function _initLimits() {
  _classPrivateFieldSet2(_limitMinimum, this, _assertClassBrand(_NumberLimiter_brand, this, _adjustLimit).call(this, _classPrivateFieldGet2(_minimum, this), 1));
  _classPrivateFieldSet2(_limitMaximum, this, _assertClassBrand(_NumberLimiter_brand, this, _adjustLimit).call(this, _classPrivateFieldGet2(_maximum, this), -1));
}

var WILDCARD = "*";
var DISPLAY = "display";
var CONTROL = "control";
var _parent = /*#__PURE__*/new WeakMap();
var _content = /*#__PURE__*/new WeakMap();
var DisplayWidget = /*#__PURE__*/function () {
  function DisplayWidget(name, parent) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _classCallCheck(this, DisplayWidget);
    _classPrivateFieldInitSpec(this, _parent, null);
    _classPrivateFieldInitSpec(this, _content, null);
    this.options = options;
    this.name = name;
    _classPrivateFieldSet2(_parent, this, parent);
    _classPrivateFieldSet2(_content, this, options.content);
    this.registerForContentUpdates();
  }
  return _createClass(DisplayWidget, [{
    key: "onContentUpdate",
    value: function onContentUpdate(value) {}
  }, {
    key: "registerForContentUpdates",
    value: function registerForContentUpdates() {
      var _this = this;
      if (!_classPrivateFieldGet2(_content, this) || !_classPrivateFieldGet2(_parent, this)) return;
      _classPrivateFieldGet2(_parent, this).on("nodeStatusUpdated", function (status) {
        var _status$contents, _classPrivateFieldGet2$1;
        var value = (_status$contents = status.contents) === null || _status$contents === void 0 || (_status$contents = _status$contents.find(function (content) {
          return content.name === _classPrivateFieldGet2(_content, _this).name;
        })) === null || _status$contents === void 0 ? void 0 : _status$contents.value;
        _this.onContentUpdate(value);
        (_classPrivateFieldGet2$1 = _classPrivateFieldGet2(_parent, _this)) === null || _classPrivateFieldGet2$1 === void 0 || _classPrivateFieldGet2$1.setDirtyCanvas(true, true);
      });
    }
  }, {
    key: "triggerParentResetSize",
    value: function triggerParentResetSize() {
      if (_classPrivateFieldGet2(_parent, this)) _classPrivateFieldGet2(_parent, this).resetSize();
    }
  }]);
}();
_defineProperty(DisplayWidget, "capability", DISPLAY);
var _parent2 = /*#__PURE__*/new WeakMap();
var _property = /*#__PURE__*/new WeakMap();
var _parameter = /*#__PURE__*/new WeakMap();
var ControlWidget = /*#__PURE__*/function () {
  function ControlWidget(name, parent) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _classCallCheck(this, ControlWidget);
    _classPrivateFieldInitSpec(this, _parent2, null);
    _classPrivateFieldInitSpec(this, _property, null);
    _classPrivateFieldInitSpec(this, _parameter, null);
    this.value = null;
    this.options = options;
    this.name = name;
    _classPrivateFieldSet2(_parent2, this, parent);
    _classPrivateFieldSet2(_property, this, options.property);
    _classPrivateFieldSet2(_parameter, this, options.parameter);
  }
  return _createClass(ControlWidget, [{
    key: "setValue",
    value: function setValue(value) {
      this.value = value;
      if (_classPrivateFieldGet2(_parent2, this) && _classPrivateFieldGet2(_property, this) && _classPrivateFieldGet2(_property, this).name) {
        var _classPrivateFieldGet3, _classPrivateFieldGet4;
        (_classPrivateFieldGet3 = _classPrivateFieldGet2(_parent2, this)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.setProperty(_classPrivateFieldGet2(_property, this).name, value);
        (_classPrivateFieldGet4 = _classPrivateFieldGet2(_parent2, this)) === null || _classPrivateFieldGet4 === void 0 || _classPrivateFieldGet4.setDirtyCanvas(true, true);
      }
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.value;
    }
  }, {
    key: "setDefaultValue",
    value: function setDefaultValue(value) {
      this.value = value;
      if (_classPrivateFieldGet2(_parent2, this) && _classPrivateFieldGet2(_property, this) && _classPrivateFieldGet2(_property, this).name) {
        var _classPrivateFieldGet5, _classPrivateFieldGet6;
        (_classPrivateFieldGet5 = _classPrivateFieldGet2(_parent2, this)) === null || _classPrivateFieldGet5 === void 0 || _classPrivateFieldGet5.setPropertyDefaultValue(_classPrivateFieldGet2(_property, this).name, value);
        (_classPrivateFieldGet6 = _classPrivateFieldGet2(_parent2, this)) === null || _classPrivateFieldGet6 === void 0 || _classPrivateFieldGet6.setDirtyCanvas(true, true);
      }
    }
  }, {
    key: "triggerParentResetSize",
    value: function triggerParentResetSize() {
      if (_classPrivateFieldGet2(_parent2, this)) _classPrivateFieldGet2(_parent2, this).resetSize();
    }
  }]);
}();
_defineProperty(ControlWidget, "capability", CONTROL);

var Widgets = /*#__PURE__*/function () {
  function Widgets() {
    _classCallCheck(this, Widgets);
    this.widgets = new Map();
  }
  return _createClass(Widgets, [{
    key: "_createKey",
    value: function _createKey(type, capability) {
      var identifier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      return "".concat(type, ":").concat(capability).concat(identifier ? ":".concat(identifier) : "");
    }
  }, {
    key: "add",
    value: function add(widgetClass, type) {
      var identifier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var capability = widgetClass.capability;
      var key = this._createKey(type, capability, identifier);
      if (!this.widgets.has(key)) {
        this.widgets.set(key, new Set()); // Use Set to automatically handle unique insertion
      }
      this.widgets.get(key).add(widgetClass);
    }
  }, {
    key: "_getWidgetsByKey",
    value: function _getWidgetsByKey(key) {
      return Array.from(this.widgets.get(key) || []);
    }
  }, {
    key: "get",
    value: function get(type, capability) {
      var identifier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var specificKey = this._createKey(type, capability, identifier);
      var wildcardKey = this._createKey(type, capability, WILDCARD);
      var specificWidgets = this._getWidgetsByKey(specificKey);
      var wildcardWidgets = this._getWidgetsByKey(wildcardKey);
      return Array.from(new Set([].concat(_toConsumableArray(specificWidgets), _toConsumableArray(wildcardWidgets))));
    }
  }, {
    key: "getDisplaysOfType",
    value: function getDisplaysOfType(type) {
      var identifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return this.get(type, DISPLAY, identifier);
    }
  }, {
    key: "getControlsOfType",
    value: function getControlsOfType(type) {
      var identifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return this.get(type, CONTROL, identifier);
    }
  }, {
    key: "has",
    value: function has(type, capability) {
      var identifier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var specificKey = this._createKey(type, capability, identifier);
      var wildcardKey = this._createKey(type, capability, WILDCARD);
      return this.widgets.has(specificKey) || this.widgets.has(wildcardKey);
    }
  }, {
    key: "hasDisplay",
    value: function hasDisplay(type, identifier) {
      return this.has(type, DISPLAY, identifier);
    }
  }, {
    key: "hasControl",
    value: function hasControl(type, identifier) {
      return this.has(type, CONTROL, identifier);
    }
  }, {
    key: "remove",
    value: function remove(type, capability) {
      var identifier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var specificKey = this._createKey(type, capability, identifier);
      var wildcardKey = this._createKey(type, capability, WILDCARD);
      this.widgets["delete"](specificKey);
      this.widgets["delete"](wildcardKey);
    }
  }, {
    key: Symbol.iterator,
    value: function value() {
      var iterator = this.widgets.entries();
      return {
        next: function next() {
          var _iterator$next = iterator.next(),
            done = _iterator$next.done,
            value = _iterator$next.value;
          if (done) {
            return {
              done: done
            };
          }
          var _value = _slicedToArray(value, 2),
            key = _value[0],
            widgetSet = _value[1];
          var _key$split = key.split(":"),
            _key$split2 = _slicedToArray(_key$split, 3),
            type = _key$split2[0],
            capability = _key$split2[1],
            identifier = _key$split2[2];
          return {
            value: [type, capability, identifier, Array.from(widgetSet)],
            done: false
          };
        }
      };
    }
  }]);
}();

var NodeBlueprintHandlers = /*#__PURE__*/function () {
  function NodeBlueprintHandlers() {
    _classCallCheck(this, NodeBlueprintHandlers);
    this.handlers = [];
  }
  return _createClass(NodeBlueprintHandlers, [{
    key: "addHandler",
    value: function addHandler(handler) {
      this.handlers.push(handler);
    }
  }, {
    key: "removeHandler",
    value: function removeHandler(handler) {
      var index = this.handlers.indexOf(handler);
      if (index > -1) {
        this.handlers.splice(index, 1);
      }
    }
  }, {
    key: "handle",
    value: function handle(node, blueprint) {
      var _this = this;
      var index = 0;
      var _next = function next() {
        if (index < _this.handlers.length) {
          var handler = _this.handlers[index++];
          handler.handle(node, blueprint, _next);
        }
      };
      _next();
    }
  }]);
}();
var NodeBlueprintHandler = /*#__PURE__*/function () {
  function NodeBlueprintHandler() {
    _classCallCheck(this, NodeBlueprintHandler);
  }
  return _createClass(NodeBlueprintHandler, [{
    key: "handle",
    value: function handle(node, blueprint, next) {
      next();
    }
  }]);
}();

// Helper function to recursively gather types and base types
function getType(datatype) {
  var typeString = datatype.identifier ? "".concat(datatype.typeName, " (").concat(datatype.identifier, ")") : datatype.typeName;

  // Check if there's a baseDatatype and append it recursively
  if (datatype.baseDatatype) {
    typeString += ",".concat(getType(datatype.baseDatatype));
  }
  return typeString;
}
var NodeInputPortBlueprintHandler = /*#__PURE__*/function (_NodeBlueprintHandler) {
  function NodeInputPortBlueprintHandler() {
    _classCallCheck(this, NodeInputPortBlueprintHandler);
    return _callSuper(this, NodeInputPortBlueprintHandler, arguments);
  }
  _inherits(NodeInputPortBlueprintHandler, _NodeBlueprintHandler);
  return _createClass(NodeInputPortBlueprintHandler, [{
    key: "handle",
    value: function handle(node, blueprint, next) {
      if (blueprint.inputPorts) {
        blueprint.inputPorts.forEach(function (input) {
          var type = getType(input.datatype);
          node.addInput(input.name, type);
        });
      }
      next();
    }
  }]);
}(NodeBlueprintHandler);
var NodeOutputPortBlueprintHandler = /*#__PURE__*/function (_NodeBlueprintHandler2) {
  function NodeOutputPortBlueprintHandler() {
    _classCallCheck(this, NodeOutputPortBlueprintHandler);
    return _callSuper(this, NodeOutputPortBlueprintHandler, arguments);
  }
  _inherits(NodeOutputPortBlueprintHandler, _NodeBlueprintHandler2);
  return _createClass(NodeOutputPortBlueprintHandler, [{
    key: "handle",
    value: function handle(node, blueprint, next) {
      if (blueprint.outputPorts) {
        blueprint.outputPorts.forEach(function (output) {
          var type = getType(output.datatype);
          node.addOutput(output.name, type);
        });
      }
      next();
    }
  }]);
}(NodeBlueprintHandler);
var NodeParametersBlueprintHandler = /*#__PURE__*/function (_NodeBlueprintHandler3) {
  function NodeParametersBlueprintHandler(widgets) {
    var _this2;
    _classCallCheck(this, NodeParametersBlueprintHandler);
    _this2 = _callSuper(this, NodeParametersBlueprintHandler);
    _this2.widgets = widgets;
    return _this2;
  }
  _inherits(NodeParametersBlueprintHandler, _NodeBlueprintHandler3);
  return _createClass(NodeParametersBlueprintHandler, [{
    key: "handle",
    value: function handle(node, blueprint, next) {
      var _this3 = this;
      var contentNames = new Set(blueprint.contents ? blueprint.contents.map(function (c) {
        return c.name;
      }) : []);
      if (blueprint.parameters) {
        blueprint.parameters.forEach(function (parameter) {
          var name = parameter.name;
          var typeName = parameter.datatype.typeName;
          var identifier = parameter.datatype.identifier;
          var type = parameter.datatype.identifier ? "".concat(parameter.datatype.typeName, " (").concat(parameter.datatype.identifier, ")") : parameter.datatype.typeName;
          var default_value = parameter.defaultValue;
          var prop = node.addProperty(name, default_value, type);
          var content;
          if (contentNames.has(name)) {
            content = blueprint.contents.find(function (c) {
              return c.name === name;
            });
          }
          var widgetClasses = _this3.widgets.getControlsOfType(typeName, identifier);
          if (!widgetClasses.length) {
            throw new Error("Unable to find widget of type :  ".concat(type));
          }
          var widget = new widgetClasses[0](name, node, {
            property: prop,
            parameter: parameter,
            content: content
          });
          node.addCustomWidget(widget);
        });
      }
      next();
    }
  }]);
}(NodeBlueprintHandler);
var NodeContentsBlueprintHandler = /*#__PURE__*/function (_NodeBlueprintHandler4) {
  function NodeContentsBlueprintHandler(widgets) {
    var _this4;
    _classCallCheck(this, NodeContentsBlueprintHandler);
    _this4 = _callSuper(this, NodeContentsBlueprintHandler);
    _this4.widgets = widgets;
    return _this4;
  }
  _inherits(NodeContentsBlueprintHandler, _NodeBlueprintHandler4);
  return _createClass(NodeContentsBlueprintHandler, [{
    key: "handle",
    value: function handle(node, blueprint, next) {
      var _this5 = this;
      var parameterNames = new Set(blueprint.parameters ? blueprint.parameters.map(function (parameter) {
        return parameter.name;
      }) : []);
      if (blueprint.contents) {
        blueprint.contents.forEach(function (content) {
          if (parameterNames.has(content.name)) return; // already processed by NodeParametersBlueprint
          var name = content.name;
          var typeName = content.datatype.typeName;
          var identifier = content.datatype.identifier || "";
          var type = content.datatype.identifier ? "".concat(content.datatype.typeName, " (").concat(content.datatype.identifier, ")") : content.datatype.typeName;
          var widgetClasses = _this5.widgets.getDisplaysOfType(typeName, identifier);
          if (!widgetClasses.length) {
            throw new Error("Unable to find widget of type :  ".concat(type));
          }
          var widget = new widgetClasses[0](name, node, {
            content: content
          });
          node.addCustomWidget(widget);
        });
      }
      next();
    }
  }]);
}(NodeBlueprintHandler);

var _eventEmitter = /*#__PURE__*/new WeakMap();
var Node = /*#__PURE__*/function (_LGraphNode) {
  function Node(title) {
    var _this;
    _classCallCheck(this, Node);
    _this = _callSuper(this, Node, [title]);
    _classPrivateFieldInitSpec(_this, _eventEmitter, new EventEmitter());
    _this._shape = 2;
    return _this;
  }

  // this method was overridden as the size was not correctly
  // handled by the standard method.
  _inherits(Node, _LGraphNode);
  return _createClass(Node, [{
    key: "addCustomWidget",
    value: function addCustomWidget(widget) {
      _superPropGet(Node, "addCustomWidget", this, 3)([widget]);
      this.resetSize();
      if (widget.registerWithParent) {
        widget.registerWithParent(this);
      }
    }
  }, {
    key: "on",
    value: function on(eventName, listener) {
      _classPrivateFieldGet2(_eventEmitter, this).on(eventName, listener);
    }
  }, {
    key: "off",
    value: function off(eventName, listener) {
      _classPrivateFieldGet2(_eventEmitter, this).off(eventName, listener);
    }
  }, {
    key: "update",
    value: function update(status) {
      _classPrivateFieldGet2(_eventEmitter, this).emit("nodeStatusUpdated", status);
    }
  }, {
    key: "resetSize",
    value: function resetSize() {
      this.setSize(this.computeSize());
    }
  }, {
    key: "computeSize",
    value: function computeSize(out) {
      var size = _superPropGet(Node, "computeSize", this, 3)([out]);

      // the code below was added to correct long titles and
      // a bug which litegraph would not use a widget width
      // for the calculations

      var title_width = mobjectLitegraph.LiteGraph.computeTextWidth(this.title) + 40;
      var widgets_maximum_width = 0;
      if (this.widgets && this.widgets.length) {
        for (var i = 0, l = this.widgets.length; i < l; ++i) {
          var widget_size = this.widgets[i].computeSize();
          widgets_maximum_width = Math.max(widgets_maximum_width, widget_size[0]);
        }
      }
      size[0] = Math.max(size[0], title_width, widgets_maximum_width);
      if (this.onComputeSize) {
        var custom_size = this.onComputeSize(size);
        size[0] = Math.max(size[0], custom_size[0]);
        size[1] = Math.max(size[1], custom_size[1]);
      }
      return size;
    }
  }, {
    key: "setPropertyDefaultValue",
    value: function setPropertyDefaultValue(name, value) {
      var _this$widgets;
      this.properties || (this.properties = {});
      if (value === this.properties[name]) {
        return;
      }
      this.properties[name] = value;
      var widgetToUpdate = (_this$widgets = this.widgets) === null || _this$widgets === void 0 ? void 0 : _this$widgets.find(function (widget) {
        var _widget$options;
        return widget && ((_widget$options = widget.options) === null || _widget$options === void 0 ? void 0 : _widget$options.property) === name;
      });
      if (widgetToUpdate) {
        widgetToUpdate.value = value;
      }
    }

    // added to prevent error with no return value
  }, {
    key: "onDropItem",
    value: function onDropItem(e) {
      return {
        return_value: false,
        result_priority: 0,
        prevent_default: false,
        stop_replication: false
      };
    }
  }, {
    key: "onDropFile",
    value: function onDropFile(file) {
      var widgetName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (this.widgets && this.widgets.length) {
        if (widgetName !== null) {
          var widget = this.widgets.find(function (w) {
            return w.name === widgetName;
          });
          if (widget && widget.onDropFile && widget.onDropFile(file)) {
            return;
          }
        } else {
          var _iterator = _createForOfIteratorHelper(this.widgets),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _widget = _step.value;
              if (_widget.onDropFile && _widget.onDropFile(file)) {
                return;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }
      console.log("Node ".concat(this.type, " was registered to handle a dropped file, but failed to handle it."));
    }
  }]);
}(mobjectLitegraph.LGraphNode);

var NodeClassFactory = /*#__PURE__*/function () {
  function NodeClassFactory(widgets) {
    _classCallCheck(this, NodeClassFactory);
    this.widgets = widgets;
    this.handlers = new NodeBlueprintHandlers();
  }
  return _createClass(NodeClassFactory, [{
    key: "registerHandler",
    value: function registerHandler(handler) {
      this.handlers.addHandler(handler);
    }
  }, {
    key: "removeHandler",
    value: function removeHandler(handler) {
      this.handlers.removeHandler(handler);
    }
  }, {
    key: "validateBlueprint",
    value: function validateBlueprint(blueprint) {
      var validations = [this.checkBlueprintHasPath.bind(this), this.checkBlueprintParametersAreSupported.bind(this), this.checkBlueprintContentsAreSupported.bind(this)];
      return validations.every(function (validation) {
        return validation(blueprint);
      });
    }
  }, {
    key: "getNodeNameFromBlueprint",
    value: function getNodeNameFromBlueprint(blueprint) {
      return blueprint.path.split("/").pop();
    }
  }, {
    key: "getNodePathFromBlueprint",
    value: function getNodePathFromBlueprint(blueprint) {
      var path = blueprint.path.split("/").slice(0, -1).join("/");
      return path;
    }
  }, {
    key: "getNodeTypeFromBlueprint",
    value: function getNodeTypeFromBlueprint(blueprint) {
      return blueprint.path;
    }
  }, {
    key: "checkBlueprintHasPath",
    value: function checkBlueprintHasPath(blueprint) {
      return blueprint.path;
    }
  }, {
    key: "checkBlueprintParametersAreSupported",
    value: function checkBlueprintParametersAreSupported(blueprint) {
      var _this = this;
      if (!blueprint.node.parameters) return true;
      return blueprint.node.parameters.every(function (parameter) {
        var _parameter$datatype = parameter.datatype,
          typeName = _parameter$datatype.typeName,
          identifier = _parameter$datatype.identifier;
        return _this.widgets.hasControl(typeName, identifier);
      });
    }
  }, {
    key: "checkBlueprintContentsAreSupported",
    value: function checkBlueprintContentsAreSupported(blueprint) {
      var _blueprint$node,
        _this2 = this;
      if (!blueprint.node.contents) return true;
      var parameterSet = new Set((((_blueprint$node = blueprint.node) === null || _blueprint$node === void 0 ? void 0 : _blueprint$node.parameters) || []).map(function (p) {
        return "".concat(p.datatype.typeName, "-").concat(p.datatype.identifier);
      }));
      return blueprint.node.contents.every(function (content) {
        var _content$datatype = content.datatype,
          typeName = _content$datatype.typeName,
          identifier = _content$datatype.identifier;
        var key = "".concat(typeName, "-").concat(identifier);
        if (parameterSet.has(key) && _this2.widgets.hasControl(typeName, identifier)) {
          return true;
        }
        return _this2.widgets.hasDisplay(typeName, identifier);
      });
    }
  }, {
    key: "create",
    value: function create(blueprint) {
      var _Class;
      if (!this.validateBlueprint(blueprint)) {
        return;
      }
      var factory = this;
      var nodeName = factory.getNodeNameFromBlueprint(blueprint);
      var nodeClass = (_Class = /*#__PURE__*/function (_Node) {
        function nodeClass() {
          var _this3;
          _classCallCheck(this, nodeClass);
          _this3 = _callSuper(this, nodeClass, [nodeName]);
          factory.handlers.handle(_this3, blueprint.node);
          return _this3;
        }
        _inherits(nodeClass, _Node);
        return _createClass(nodeClass);
      }(Node), _defineProperty(_Class, "title", nodeName), _defineProperty(_Class, "desc", ""), _Class);
      return nodeClass;
    }
  }]);
}();

// look after the widgets
// have a .RegisterNodesByBlueprint
// have a .RegisterDatatypesByBlueprint
// wrap LiteGraph

// method .Create(); returns graph

/**
 * GraphFramework is a dynamic proxy class designed to wrap the LiteGraph library.
 *
 * This wrapper provides an interface to all existing methods of LiteGraph through automatic delegation,
 * enabling transparent use of its functionalities. The proxy approach allows this wrapper to automatically
 * forward calls to LiteGraph methods that are not explicitly defined in this class.
 * This makes the wrapper highly maintainable and extensible, as it does not need to be updated with each
 * change in the LiteGraph API. Additionally, it provides an easy way to extend or override specific methods
 * of LiteGraph for customization or enhancement, such as adding logging, custom error handling, or other features.
 *
 * Use this wrapper to leverage all of LiteGraph's capabilities while maintaining the flexibility to extend
 * and customize its behavior as needed for your specific application requirements.
 */
var GraphFramework = /*#__PURE__*/function () {
  function GraphFramework() {
    _classCallCheck(this, GraphFramework);
    _defineProperty(this, "debug", false);
    if (GraphFramework.instance) {
      return GraphFramework.instance;
    }
    if (typeof mobjectLitegraph.LiteGraph === "undefined") {
      throw new Error("LiteGraph is not available in the global scope.");
    }
    this.liteGraph = mobjectLitegraph.LiteGraph;
    this.liteGraph.initialize();
    this.widgets = new Widgets();
    this.liteGraph.unregisterNodeType("graph/subgraph");
    this.liteGraph.unregisterNodeType("graph/input");
    this.liteGraph.unregisterNodeType("graph/output");
    this.liteGraph.unregisterNodeType("graph/function");
    this.nodeClassFactory = new NodeClassFactory(this.widgets);
    this.nodeClassFactory.registerHandler(new NodeInputPortBlueprintHandler());
    this.nodeClassFactory.registerHandler(new NodeOutputPortBlueprintHandler());
    this.nodeClassFactory.registerHandler(new NodeParametersBlueprintHandler(this.widgets));
    this.nodeClassFactory.registerHandler(new NodeContentsBlueprintHandler(this.widgets));
    this.liteGraph.computeTextWidth = function (text, fontSize) {
      if (!text) {
        return 0;
      }
      var t = text.toString();
      if (typeof fontSize === "undefined") return this.NODE_TEXT_SIZE * t.length * 0.6;
      return this.NODE_TEXT_SIZE * t.length * fontSize;
    };
    GraphFramework.instance = new Proxy(this, {
      get: function get(target, property, receiver) {
        if (Reflect.has(target, property)) {
          return Reflect.get(target, property, receiver);
        } else {
          return function () {
            if (typeof target.liteGraph[property] === "function") {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              return target.liteGraph[property].apply(target.liteGraph, args);
            } else {
              return target.liteGraph[property];
            }
          };
        }
      }
    });
    return GraphFramework.instance;
  }
  return _createClass(GraphFramework, [{
    key: "log",
    value: function log() {
      var _console;
      if (!this.debug) return;
      (_console = console).log.apply(_console, arguments);
    }
  }, {
    key: "install",
    value: function install(graphPack, options) {
      graphPack.install(this, options);
    }
  }, {
    key: "installNodeBlueprints",
    value: function installNodeBlueprints(blueprints) {
      var _this = this;
      if (blueprints && Array.isArray(blueprints)) {
        blueprints.forEach(function (blueprint) {
          _this.installNodeBlueprint(blueprint);
        });
      }
    }
  }, {
    key: "installNodeBlueprint",
    value: function installNodeBlueprint(blueprint) {
      if (blueprint) {
        var nodeType = this.nodeClassFactory.getNodeTypeFromBlueprint(blueprint);
        if (!nodeType) {
          this.log("Failed to determine node type from blueprint.");
          return;
        }
        var nodeClass = this.nodeClassFactory.create(blueprint);
        if (!nodeClass) {
          this.log("Unable to create node class from blueprint.", nodeType, blueprint);
          return;
        }
        this.registerNodeClass(nodeType, nodeClass);
      } else {
        this.log("No blueprint provided to installNodeBlueprint.");
      }
    }
  }, {
    key: "registerWidgetType",
    value: function registerWidgetType(Widget, type, identifier) {
      this.widgets.add(Widget, type, identifier);
    }
  }, {
    key: "registerFileAssociation",
    value: function registerFileAssociation(fileExtensions, nodeType) {
      var widgetName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var _iterator = _createForOfIteratorHelper(fileExtensions),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var fileExtension = _step.value;
          if (fileExtension && typeof fileExtension === "string") {
            this.liteGraph.node_types_by_file_extension[fileExtension.toLowerCase()] = {
              type: nodeType,
              widgetName: widgetName
            };
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "registerExtension",
    value: function registerExtension(extension) {
      extension.registerWithGraph(this);
    }
  }, {
    key: "getVersion",
    value: function getVersion() {
      return this.liteGraph.VERSION;
    }

    /* this method was overridden as it was incorrectly overwriting the prototype
     ** of our base class, as such this was made.  Also, some of the unused parts
     ** were removed to simplfiy the call
     */
  }, {
    key: "registerNodeClass",
    value: function registerNodeClass(type, base_class) {
      base_class.type = type;
      var classname = base_class.name;
      var pos = type.lastIndexOf("/");
      base_class.category = type.substring(0, pos);
      if (!base_class.title) {
        base_class.title = classname;
      }
      if (base_class.supported_extensions) {
        for (var _i in base_class.supported_extensions) {
          var _ext = base_class.supported_extensions[_i];
          if (_ext && _ext.constructor === String) {
            this.liteGraph.node_types_by_file_extension[_ext.toLowerCase()] = base_class;
          }
        }
      }
      var prev = this.liteGraph.registered_node_types[type];
      if (prev) {
        this.log_debug("registerNodeType", "replacing node type", type, prev);
      }
      this.liteGraph.registered_node_types[type] = base_class;
      if (base_class.constructor.name) {
        this.liteGraph.Nodes[classname] = base_class;
      }
      this.processCallbackHandlers("onNodeTypeRegistered", {
        def_cb: this.onNodeTypeRegistered
      }, type, base_class);
      if (prev) {
        this.processCallbackHandlers("onNodeTypeReplaced", {
          def_cb: this.onNodeTypeReplaced
        }, type, base_class, prev);
      }

      // warnings
      if (base_class.prototype.onPropertyChange) {
        mobjectLitegraph.LiteGraph.log_warn("LiteGraph node class " + type + " has onPropertyChange method, it must be called onPropertyChanged with d at the end");
      }

      // used to know which nodes create when dragging files to the canvas
      if (base_class.supported_extensions) {
        for (var i = 0; i < base_class.supported_extensions.length; i++) {
          var ext = base_class.supported_extensions[i];
          if (ext && ext.constructor === String) this.node_types_by_file_extension[ext.toLowerCase()] = base_class;
        }
      }
      this.log_debug("registerNodeType", "type registered", type);
      if (this.auto_load_slot_types) {
        var _base_class$title;
        // auto_load_slot_types should be used when not specifing slot type to LiteGraph
        // good for testing: this will create a temporary node for each type
        this.log_debug("registerNodeType", "auto_load_slot_types, create empy tmp node", type);
        var tmpnode = new base_class((_base_class$title = base_class.title) !== null && _base_class$title !== void 0 ? _base_class$title : "tmpnode");
        tmpnode.post_constructor(); // could not call, but eventually checking for errors in the chain ?
      }
    }
  }]);
}();
_defineProperty(GraphFramework, "instance", void 0);

var _uuid = /*#__PURE__*/new WeakMap();
var Graph = /*#__PURE__*/function (_LGraph) {
  function Graph(o) {
    var _this;
    _classCallCheck(this, Graph);
    _this = _callSuper(this, Graph, [o]);
    _classPrivateFieldInitSpec(_this, _uuid, null);
    _classPrivateFieldSet2(_uuid, _this, _this.generateNewUuid());
    _this.registerCallbackHandler("onSerialize", function (oCbInfo, data) {
      data.uuid = _classPrivateFieldGet2(_uuid, _this);
    });
    return _this;
  }
  _inherits(Graph, _LGraph);
  return _createClass(Graph, [{
    key: "uuid",
    get: function get() {
      return _classPrivateFieldGet2(_uuid, this);
    }
  }, {
    key: "generateNewUuid",
    value: function generateNewUuid() {
      _classPrivateFieldSet2(_uuid, this, mobjectLitegraph.LiteGraph.uuidv4());
      return _classPrivateFieldGet2(_uuid, this);
    }
  }, {
    key: "update",
    value: function update(status) {
      var _this2 = this;
      if (status && Array.isArray(status.nodes)) {
        status.nodes.forEach(function (nodeStatus) {
          var node = _this2.getNodeById(nodeStatus.id);
          if (node) {
            node.update(nodeStatus);
          }
        });
      }
    }
  }, {
    key: "beforeChange",
    value: function beforeChange() {
      // before a graph change
    }
  }, {
    key: "afterChange",
    value: function afterChange() {
      // after a graph change
    }
  }]);
}(mobjectLitegraph.LGraph);

// This function has been overidden to expand the functionality to add graceful fall over if the node
// has not yet been registered with litegraph (this can happen if you are still waiting for blueprints)

mobjectLitegraph.LGraphCanvas.prototype.checkDropItem = function (e) {
  if (e.dataTransfer.files.length) {
    var file = e.dataTransfer.files[0];
    var ext = mobjectLitegraph.LGraphCanvas.getFileExtension(file.name);
    var nodetype = mobjectLitegraph.LiteGraph.node_types_by_file_extension[ext];
    if (nodetype) {
      this.graph.beforeChange();
      var node = mobjectLitegraph.LiteGraph.createNode(nodetype.type);
      if (!node) {
        console.log(nodetype.type, "is not available to handle", ext);
        return;
      }
      node.pos = [e.canvasX, e.canvasY];
      this.graph.add(node, false, {
        doProcessChange: true
      });
      node.processCallbackHandlers("onDropFile", {
        def_cb: node.onDropFile
      }, file, nodetype.widgetName || null);
      this.graph.onGraphChanged({
        action: "fileDrop",
        doSave: true
      });
      this.graph.afterChange();
    }
  }
};

// This function has been overridden due to an error when cloning a node.  It calls selectNodes and passes
// the cloned nodes in as members of an object.
mobjectLitegraph.LGraphCanvas.prototype.selectNodes = function (nodes, add_to_current_selection) {
  var _this = this;
  if (!add_to_current_selection) {
    this.deselectAllNodes();
  }

  // Start of modification
  nodes = nodes || this.graph._nodes;
  if (typeof nodes === "string") {
    nodes = [nodes];
  } else if (!Array.isArray(nodes) && _typeof(nodes) === "object") {
    nodes = Object.values(nodes);
  }
  // end of modification

  Object.values(nodes).forEach(function (node) {
    var _node$inputs, _node$outputs;
    if (node.is_selected) {
      _this.deselectNode(node);
      return;
    }
    node.is_selected = true;
    _this.selected_nodes[node.id] = node;
    node.processCallbackHandlers("onSelected", {
      def_cb: node.onSelected
    });
    (_node$inputs = node.inputs) === null || _node$inputs === void 0 || _node$inputs.forEach(function (input) {
      _this.highlighted_links[input.link] = true;
    });
    (_node$outputs = node.outputs) === null || _node$outputs === void 0 || _node$outputs.forEach(function (out) {
      var _out$links;
      (_out$links = out.links) === null || _out$links === void 0 || _out$links.forEach(function (link) {
        _this.highlighted_links[link] = true;
      });
    });
  });
  this.processCallbackHandlers("onSelectionChange", {
    def_cb: this.onSelectionChange
  }, this.selected_nodes);
  this.setDirty(true);
};

// This function has been overridden as there was an error in the core litegraph code. The mouse up event was not sent to the
// widget when the mouse was released outside of the widget area.
// this caused numeric controls to miss the onMouseUp and as such the value would not update.

// if (e.which == 1) {
//     if (this.node_widget) {
//       this.processNodeWidgets(
//         this.node_widget[0],
//         this.graph_mouse,
//         e,
//         this.node_widget[1] // <-- This line here was added to fix the mouse up even issue
//       );
//     }
//
mobjectLitegraph.LGraphCanvas.prototype.processMouseUp = function (e) {
  var is_primary = e.isPrimary === undefined || e.isPrimary;

  // early exit for extra pointer
  if (!is_primary) {
    /* e.stopPropagation();
            e.preventDefault();*/
    mobjectLitegraph.LiteGraph.log_verbose("pointerevents: processMouseUp pointerN_stop " + e.pointerId + " " + e.isPrimary);
    return false;
  }
  mobjectLitegraph.LiteGraph.log_verbose("pointerevents: processMouseUp " + e.pointerId + " " + e.isPrimary + " :: " + e.clientX + " " + e.clientY);
  if (this.set_canvas_dirty_on_mouse_event) this.dirty_canvas = true;
  if (!this.graph) return;
  var window = this.getCanvasWindow();
  var document = window.document;
  mobjectLitegraph.LGraphCanvas.active_canvas = this;

  // restore the mousemove event back to the canvas
  if (!this.options.skip_events) {
    mobjectLitegraph.LiteGraph.log_verbose("pointerevents: processMouseUp adjustEventListener");
    document.removeEventListener("pointermove", this._mousemove_callback, true);
    this.canvas.addEventListener("pointermove", this._mousemove_callback, true);
    document.removeEventListener("pointerup", this._mouseup_callback, true);
  }
  this.adjustMouseEvent(e);
  var now = mobjectLitegraph.LiteGraph.getTime();
  e.click_time = now - this.last_mouseclick;
  this.last_mouse_dragging = false;
  this.last_click_position = null;
  if (this.block_click) {
    mobjectLitegraph.LiteGraph.log_verbose("pointerevents: processMouseUp block_clicks");
    this.block_click = false; // used to avoid sending twice a click in a immediate button
  }
  mobjectLitegraph.LiteGraph.log_verbose("pointerevents: processMouseUp which: " + e.which);
  if (e.which == 1) {
    if (this.node_widget) {
      this.processNodeWidgets(this.node_widget[0], this.graph_mouse, e, this.node_widget[1]);
    }

    // left button
    this.node_widget = null;
    if (this.selected_group) {
      var diffx = this.selected_group.pos[0] - Math.round(this.selected_group.pos[0]);
      var diffy = this.selected_group.pos[1] - Math.round(this.selected_group.pos[1]);
      this.selected_group.move(diffx, diffy, e.ctrlKey);
      this.selected_group.pos[0] = Math.round(this.selected_group.pos[0]);
      this.selected_group.pos[1] = Math.round(this.selected_group.pos[1]);
      if (this.selected_group._nodes.length) {
        this.dirty_canvas = true;
      }
      this.selected_group.recomputeInsideNodes();
      if (this.selected_group_resizing) {
        this.processCallbackHandlers("onGroupResized", {
          def_cb: this.onGroupResized
        }, this.selected_group);
        this.graph.onGraphChanged({
          action: "groupResize",
          doSave: true
        });
        this.graph.afterChange(); // this.selected_group
      } else {
        if (diffx || diffy) {
          this.processCallbackHandlers("onGroupMoved", {
            def_cb: this.onGroupMoved
          }, this.selected_group);
          this.graph.onGraphChanged({
            action: "groupMove",
            doSave: true
          });
          this.graph.afterChange(); // this.selected_group
        }
      }
      this.selected_group = null;
    }
    this.selected_group_resizing = false;
    var node = this.graph.getNodeOnPos(e.canvasX, e.canvasY, this.visible_nodes);
    if (this.dragging_rectangle) {
      if (this.graph) {
        var nodes = this.graph._nodes;
        var node_bounding = new Float32Array(4);

        // compute bounding and flip if left to right
        var w = Math.abs(this.dragging_rectangle[2]);
        var h = Math.abs(this.dragging_rectangle[3]);
        var startx = this.dragging_rectangle[2] < 0 ? this.dragging_rectangle[0] - w : this.dragging_rectangle[0];
        var starty = this.dragging_rectangle[3] < 0 ? this.dragging_rectangle[1] - h : this.dragging_rectangle[1];
        this.dragging_rectangle[0] = startx;
        this.dragging_rectangle[1] = starty;
        this.dragging_rectangle[2] = w;
        this.dragging_rectangle[3] = h;

        // test dragging rect size, if minimun simulate a click
        if (!node || w > 10 && h > 10) {
          mobjectLitegraph.LiteGraph.log_debug("lgraphcanvas", "processMouseUp", "computing box selection for nodes", this.dragging_rectangle);
          // test against all nodes (not visible because the rectangle maybe start outside
          var to_select = [];
          for (var i = 0; i < nodes.length; ++i) {
            var nodeX = nodes[i];
            nodeX.getBounding(node_bounding);
            if (!mobjectLitegraph.LiteGraph.overlapBounding(this.dragging_rectangle, node_bounding)) {
              continue;
            } // out of the visible area
            to_select.push(nodeX);
          }
          if (to_select.length) {
            mobjectLitegraph.LiteGraph.log_debug("lgraphcanvas", "processMouseUp", "selecting nodes", to_select);
            this.selectNodes(to_select, e.shiftKey); // add to selection with shift
          }
        } else {
          // will select of update selection
          this.selectNodes([node], e.shiftKey || e.ctrlKey); // add to selection add to selection with ctrlKey or shiftKey
        }
      }
      this.dragging_rectangle = null;
    } else if (this.connecting_node) {
      // dragging a connection
      this.dirty_canvas = true;
      this.dirty_bgcanvas = true;
      var connInOrOut = this.connecting_output || this.connecting_input;
      var connType = connInOrOut.type;
      node = this.graph.getNodeOnPos(e.canvasX, e.canvasY, this.visible_nodes);

      // node below mouse
      if (node) {
        // slot below mouse? connect
        var slot;
        if (this.connecting_output) {
          mobjectLitegraph.LiteGraph.log_debug("lgraphcanvas", "processMouseUp", "connecting_output", this.connecting_output, "connecting_node", this.connecting_node, "connecting_slot", this.connecting_slot);
          slot = this.isOverNodeInput(node, e.canvasX, e.canvasY);
          if (slot != -1) {
            this.connecting_node.connect(this.connecting_slot, node, slot);
          } else {
            // not on top of an input
            // look for a good slot
            this.connecting_node.connectByType(this.connecting_slot, node, connType);
          }
        } else if (this.connecting_input) {
          mobjectLitegraph.LiteGraph.log_debug("lgraphcanvas", "processMouseUp", "connecting_input", this.connecting_input, "connecting_node", this.connecting_node, "connecting_slot", this.connecting_slot);
          slot = this.isOverNodeOutput(node, e.canvasX, e.canvasY);
          if (slot != -1) {
            if (this.connecting && this.connecting.inputs) {
              // multi connect
              for (var iC in this.connecting.inputs) {
                node.connect(slot, this.connecting.inputs[iC].node, this.connecting.inputs[iC].slot);
              }
            } else {
              // default single connect
              node.connect(slot, this.connecting_node, this.connecting_slot); // this is inverted has output-input nature like
            }
          } else {
            // not on top of an input
            // look for a good slot
            this.connecting_node.connectByTypeOutput(this.connecting_slot, node, connType);
          }
        }
        // }
      } else {
        // add menu when releasing link in empty space
        if (mobjectLitegraph.LiteGraph.release_link_on_empty_shows_menu) {
          if (e.shiftKey && this.allow_searchbox) {
            if (this.connecting_output) {
              this.showSearchBox(e, {
                node_from: this.connecting_node,
                slot_from: this.connecting_output,
                type_filter_in: this.connecting_output.type
              });
            } else if (this.connecting_input) {
              this.showSearchBox(e, {
                node_to: this.connecting_node,
                slot_from: this.connecting_input,
                type_filter_out: this.connecting_input.type
              });
            }
          } else {
            if (this.connecting_output) {
              this.showConnectionMenu({
                nodeFrom: this.connecting_node,
                slotFrom: this.connecting_output,
                e: e
              });
            } else if (this.connecting_input) {
              this.showConnectionMenu({
                nodeTo: this.connecting_node,
                slotTo: this.connecting_input,
                e: e
              });
            }
          }
        }
      }
      this.connecting_output = null;
      this.connecting_input = null;
      this.connecting_pos = null;
      this.connecting_node = null;
      this.connecting_slot = -1;
      this.connecting = false;
    } else if (this.resizing_node) {
      // not dragging connection
      this.dirty_canvas = true;
      this.dirty_bgcanvas = true;
      this.graph.afterChange(this.resizing_node);
      this.resizing_node = null;
    } else if (this.node_dragged) {
      // node being dragged?
      node = this.node_dragged;
      if (node && e.click_time < 300 && mobjectLitegraph.LiteGraph.isInsideRectangle(e.canvasX, e.canvasY, node.pos[0], node.pos[1] - mobjectLitegraph.LiteGraph.NODE_TITLE_HEIGHT, mobjectLitegraph.LiteGraph.NODE_TITLE_HEIGHT, mobjectLitegraph.LiteGraph.NODE_TITLE_HEIGHT)) {
        node.collapse();
      }
      this.dirty_canvas = true;
      this.dirty_bgcanvas = true;
      this.node_dragged.pos[0] = Math.round(this.node_dragged.pos[0]);
      this.node_dragged.pos[1] = Math.round(this.node_dragged.pos[1]);
      if (this.graph.config.align_to_grid || this.align_to_grid) {
        this.node_dragged.alignToGrid();
      }
      // TAG callback graphrenderer event entrypoint
      this.processCallbackHandlers("onNodeMoved", {
        def_cb: this.onNodeMoved
      }, this.node_dragged, this.selected_nodes);
      // multi nodes dragged ?
      for (var _i in this.selected_nodes) {
        var ndrg = this.selected_nodes[_i];
        ndrg.processCallbackHandlers("onMoved", {
          def_cb: ndrg.onMoved
        }, this.node_dragged, this.selected_nodes);
      }
      this.graph.onGraphChanged({
        action: "nodeDrag",
        doSave: true
      });
      this.graph.afterChange(this.node_dragged);
      this.node_dragged = null;
    } else {
      // no node being dragged
      // get node over
      node = this.graph.getNodeOnPos(e.canvasX, e.canvasY, this.visible_nodes);
      if (!node && e.click_time < 300) {
        this.deselectAllNodes();
      }
      this.dirty_canvas = true;
      this.dragging_canvas = false;
      if (this.node_over) {
        // TAG callback node event entrypoint
        this.node_over.processCallbackHandlers("onMouseUp", {
          def_cb: this.node_over.onMouseUp
        }, e, [e.canvasX - this.node_over.pos[0], e.canvasY - this.node_over.pos[1]], this);
      }
      if (this.node_capturing_input) {
        // TAG callback node event entrypoint
        this.node_capturing_input.processCallbackHandlers("onMouseUp", {
          def_cb: this.node_capturing_input.onMouseUp
        }, e, [e.canvasX - this.node_capturing_input.pos[0], e.canvasY - this.node_capturing_input.pos[1]]);
      }
    }
  } else if (e.which == 2) {
    // middle button
    // trace("middle");
    this.dirty_canvas = true;
    this.dragging_canvas = false;
  } else if (e.which == 3) {
    // right button
    // trace("right");
    this.dirty_canvas = true;
    this.dragging_canvas = false;
  }

  /*
        if((this.dirty_canvas || this.dirty_bgcanvas) && this.rendering_timer_id == null)
            this.draw();
        */

  if (is_primary) {
    this.pointer_is_down = false;
    this.pointer_is_double = false;
  }
  this.graph.change();
  mobjectLitegraph.LiteGraph.log_verbose("pointerevents: processMouseUp stopPropagation");
  e.stopPropagation();
  e.preventDefault();
  return false;
};

// added to prevent error with no return value
mobjectLitegraph.LGraphCanvas.prototype.onDropItem = function (e) {
  return {
    return_value: false,
    result_priority: 0,
    prevent_default: false,
    stop_replication: false
  };
};

var MobjectGraphTransformer = /*#__PURE__*/function () {
  function MobjectGraphTransformer() {
    _classCallCheck(this, MobjectGraphTransformer);
  }
  return _createClass(MobjectGraphTransformer, null, [{
    key: "Convert",
    value:
    // Public method to be used by class consumers
    function Convert(graph) {
      var liteGraphData = JSON.parse(JSON.stringify(graph.serialize()));
      // First, convert node IDs to strings
      var nodesWithConvertedIds = _assertClassBrand(MobjectGraphTransformer, this, _convertNodeIdsToStrings).call(this, liteGraphData.nodes);

      // Then, transform the links
      var transformedLinks = _assertClassBrand(MobjectGraphTransformer, this, _transformLinks).call(this, nodesWithConvertedIds, liteGraphData.links);

      // Return the transformed data with nodes and links processed
      return _objectSpread2(_objectSpread2({}, liteGraphData), {}, {
        nodes: nodesWithConvertedIds,
        links: transformedLinks
      });
    }

    // Private method to convert node IDs to strings
  }]);
}();
function _convertNodeIdsToStrings(nodes) {
  return nodes.map(function (node) {
    return _objectSpread2(_objectSpread2({}, node), {}, {
      id: String(node.id)
    });
  });
}
// Private method to transform links
function _transformLinks(nodes, links) {
  return links.map(function (link) {
    var _sourceNode$outputs$s, _targetNode$inputs$ta;
    var _link = _slicedToArray(link, 6),
      linkId = _link[0],
      sourceNodeId = _link[1],
      sourceOutputIndex = _link[2],
      targetNodeId = _link[3],
      targetInputIndex = _link[4],
      type = _link[5];
    var linkIdStr = String(linkId);
    var sourceNodeIdStr = String(sourceNodeId);
    var targetNodeIdStr = String(targetNodeId);
    var sourceNode = nodes.find(function (node) {
      return node.id === sourceNodeIdStr;
    });
    var targetNode = nodes.find(function (node) {
      return node.id === targetNodeIdStr;
    });
    var sourceOutputName = sourceNode ? ((_sourceNode$outputs$s = sourceNode.outputs[sourceOutputIndex]) === null || _sourceNode$outputs$s === void 0 ? void 0 : _sourceNode$outputs$s.name) || "unknown" : "unknown";
    var targetInputName = targetNode ? ((_targetNode$inputs$ta = targetNode.inputs[targetInputIndex]) === null || _targetNode$inputs$ta === void 0 ? void 0 : _targetNode$inputs$ta.name) || "unknown" : "unknown";
    return [linkIdStr, sourceNodeIdStr, sourceOutputName, targetNodeIdStr, targetInputName, type];
  });
}

var GraphEditor = /*#__PURE__*/function () {
  function GraphEditor(_ref, connection) {
    var containerSelector = _ref.containerSelector,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 800 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 600 : _ref$height;
    _classCallCheck(this, GraphEditor);
    this.graphTimeout = null;
    this.statusTimeout = null;
    this.connection = connection;
    this.isCreatingGraph = false;
    this.isUpdatingStatus = false;
    this.setupContainer(containerSelector);
    this.setupCanvas(width, height);
    return this.initializeGraph();
  }
  return _createClass(GraphEditor, [{
    key: "setupContainer",
    value: function setupContainer(containerSelector) {
      this.container = document.querySelector(containerSelector);
      if (!this.container) {
        throw new Error("Container element with selector \"".concat(containerSelector, "\" not found"));
      }
    }
  }, {
    key: "setupCanvas",
    value: function setupCanvas(width, height) {
      this.canvas = document.createElement("canvas");
      this.canvas.width = width;
      this.canvas.height = height;
      this.container.appendChild(this.canvas);
    }
  }, {
    key: "initializeGraph",
    value: function initializeGraph() {
      var _this = this;
      var graph = new Graph();
      new mobjectLitegraph.LGraphCanvas(this.canvas, graph);
      this.graph = graph;
      this.graph.registerCallbackHandler("onConnectionChange", /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(oCbInfo, node) {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.callCreateGraph();
              case 2:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x, _x2) {
          return _ref2.apply(this, arguments);
        };
      }());
      this.graph.registerCallbackHandler("onNodeAdded", /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(oCbInfo, node) {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                node.registerCallbackHandler("onPropertyChanged", /*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(oCbInfo, name, value, prevValue) {
                    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                      while (1) switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.prev = 0;
                          _context2.next = 3;
                          return _this.waitForGraphCreationToComplete();
                        case 3:
                          _context2.next = 5;
                          return _this.waitForStatusUpdateToComplete();
                        case 5:
                          console.log("api update parameter, graphid:", _this.graph.uuid, "nodeId:", node.id, "parameterName:", name, "parameterValue:", value);
                          _context2.next = 8;
                          return _this.connection.send("UpdateParameterValue", {
                            graphUuid: _this.graph.uuid,
                            nodeId: node.id,
                            parameterName: name,
                            parameterValue: value
                          });
                        case 8:
                          _context2.sent;
                          _context2.next = 14;
                          break;
                        case 11:
                          _context2.prev = 11;
                          _context2.t0 = _context2["catch"](0);
                          console.log(_context2.t0);
                        case 14:
                        case "end":
                          return _context2.stop();
                      }
                    }, _callee2, null, [[0, 11]]);
                  }));
                  return function (_x5, _x6, _x7, _x8) {
                    return _ref4.apply(this, arguments);
                  };
                }());
                _context3.next = 3;
                return _this.callCreateGraph();
              case 3:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }));
        return function (_x3, _x4) {
          return _ref3.apply(this, arguments);
        };
      }());
      this.graph.registerCallbackHandler("onNodeRemoved", /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(oCbInfo, node) {
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this.callCreateGraph();
              case 2:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }));
        return function (_x9, _x10) {
          return _ref5.apply(this, arguments);
        };
      }());
      return graph;
    }
  }, {
    key: "waitForGraphCreationToComplete",
    value: function () {
      var _waitForGraphCreationToComplete = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (!this.isCreatingGraph) {
                _context5.next = 6;
                break;
              }
              console.log("Waiting for Graph creation to complete...");
              _context5.next = 4;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 100);
              });
            case 4:
              _context5.next = 0;
              break;
            case 6:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function waitForGraphCreationToComplete() {
        return _waitForGraphCreationToComplete.apply(this, arguments);
      }
      return waitForGraphCreationToComplete;
    }()
  }, {
    key: "waitForStatusUpdateToComplete",
    value: function () {
      var _waitForStatusUpdateToComplete = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              if (!this.isUpdatingStatus) {
                _context6.next = 6;
                break;
              }
              console.log("Waiting for Status update to complete...");
              _context6.next = 4;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 100);
              });
            case 4:
              _context6.next = 0;
              break;
            case 6:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function waitForStatusUpdateToComplete() {
        return _waitForStatusUpdateToComplete.apply(this, arguments);
      }
      return waitForStatusUpdateToComplete;
    }()
  }, {
    key: "callCreateGraph",
    value: function () {
      var _callCreateGraph = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              this.stopGraphUpdate();
              this.stopStatusUpdates();
              _context7.next = 5;
              return this.waitForStatusUpdateToComplete();
            case 5:
              this.isCreatingGraph = true;
              this.graph.generateNewUuid();
              console.log("New Graph Uuid > ", this.graph.uuid);
              this.startGraphUpdate();
              _context7.next = 14;
              break;
            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](0);
              console.log(_context7.t0);
            case 14:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this, [[0, 11]]);
      }));
      function callCreateGraph() {
        return _callCreateGraph.apply(this, arguments);
      }
      return callCreateGraph;
    }()
  }, {
    key: "startGraphUpdate",
    value: function startGraphUpdate() {
      this.stopGraphUpdate();
      this.scheduleNextGraphUpdate();
    }
  }, {
    key: "stopGraphUpdate",
    value: function stopGraphUpdate() {
      if (this.graphTimeout) {
        clearTimeout(this.graphTimeout);
        this.graphTimeout = null;
      }
    }
  }, {
    key: "scheduleNextGraphUpdate",
    value: function () {
      var _scheduleNextGraphUpdate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              this.graphTimeout = setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
                var graphPayload, status;
                return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                  while (1) switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.prev = 0;
                      graphPayload = MobjectGraphTransformer.Convert(_this2.graph);
                      console.log("api create graph", graphPayload);
                      _context8.next = 5;
                      return _this2.connection.send("CreateGraph", {
                        graph: graphPayload
                      });
                    case 5:
                      status = _context8.sent;
                      console.log("api create graph reply >", status);
                      if (!(status.uuid !== _this2.graph.uuid)) {
                        _context8.next = 9;
                        break;
                      }
                      throw new Error("Uuid mismatch after Graph generation.");
                    case 9:
                      _this2.graph.update(status);
                      _this2.isCreatingGraph = false;
                      _this2.startStatusUpdates();
                      _context8.next = 18;
                      break;
                    case 14:
                      _context8.prev = 14;
                      _context8.t0 = _context8["catch"](0);
                      console.log(_context8.t0);
                      _this2.stopGraphUpdate();
                    case 18:
                      _context8.prev = 18;
                      _this2.isCreatingGraph = false;
                      return _context8.finish(18);
                    case 21:
                    case "end":
                      return _context8.stop();
                  }
                }, _callee8, null, [[0, 14, 18, 21]]);
              })), 100);
            case 1:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function scheduleNextGraphUpdate() {
        return _scheduleNextGraphUpdate.apply(this, arguments);
      }
      return scheduleNextGraphUpdate;
    }()
  }, {
    key: "startStatusUpdates",
    value: function startStatusUpdates() {
      this.stopStatusUpdates();
      this.scheduleNextStatusUpdate();
    }
  }, {
    key: "stopStatusUpdates",
    value: function stopStatusUpdates() {
      if (this.statusTimeout) {
        clearTimeout(this.statusTimeout);
        this.statusTimeout = null;
      }
    }
  }, {
    key: "scheduleNextStatusUpdate",
    value: function () {
      var _scheduleNextStatusUpdate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        var _this3 = this;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              this.statusTimeout = setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
                var status;
                return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                  while (1) switch (_context10.prev = _context10.next) {
                    case 0:
                      _context10.prev = 0;
                      _context10.next = 3;
                      return _this3.waitForGraphCreationToComplete();
                    case 3:
                      _this3.isUpdatingStatus = true;
                      console.log("api get status", _this3.graph.uuid);
                      _context10.next = 7;
                      return _this3.connection.send("GetStatus", {
                        graphUuid: _this3.graph.uuid
                      });
                    case 7:
                      status = _context10.sent;
                      console.log("api get status reply >", status);
                      if (!(status.uuid !== _this3.graph.uuid)) {
                        _context10.next = 11;
                        break;
                      }
                      throw new Error("Uuid mismatch after Status update.");
                    case 11:
                      _this3.graph.update(status);
                      _this3.isUpdatingStatus = false;
                      _this3.scheduleNextStatusUpdate();
                      _context10.next = 20;
                      break;
                    case 16:
                      _context10.prev = 16;
                      _context10.t0 = _context10["catch"](0);
                      console.log(_context10.t0);
                      _this3.stopStatusUpdates();
                    case 20:
                      _context10.prev = 20;
                      _this3.isUpdatingStatus = false;
                      return _context10.finish(20);
                    case 23:
                    case "end":
                      return _context10.stop();
                  }
                }, _callee10, null, [[0, 16, 20, 23]]);
              })), 1000);
            case 1:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function scheduleNextStatusUpdate() {
        return _scheduleNextStatusUpdate.apply(this, arguments);
      }
      return scheduleNextStatusUpdate;
    }()
  }]);
}();

var DefaultPack = /*#__PURE__*/function () {
  function DefaultPack() {
    _classCallCheck(this, DefaultPack);
  }
  return _createClass(DefaultPack, null, [{
    key: "install",
    value: function install() {
      var graphFramework = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new GraphFramework();
      var options = arguments.length > 1 ? arguments[1] : undefined;
      this.registerBundledPacks(graphFramework, options);
      this.registerGraphExtensions(graphFramework, options);
      this.registerCanvasExtension(graphFramework, options);
      this.registerEditorExtensions(graphFramework, options);
      this.registerNodeExtensions(graphFramework, options);
      this.registerWidgets(graphFramework, options);
    }
  }, {
    key: "registerBundledPacks",
    value: function registerBundledPacks(graphFramework) {
    } // you can ship other packs within packs.  we call these bundled packs.
    // this just triggers install on the bundled pack.
  }, {
    key: "registerGraphExtensions",
    value: function registerGraphExtensions(graphFramework) {
    } // add any default graph extensions here.  It's good practice to make
    // these switchable via the options object.
    // graphFramework.registerNodeExtensions(...);
  }, {
    key: "registerCanvasExtension",
    value: function registerCanvasExtension(graphFramework) {
    } // add any default canvas extensions here.  It's good practice to make
    // these switchable via the options object.
    // graphFramework.registerCanvasExtension(...);
  }, {
    key: "registerEditorExtensions",
    value: function registerEditorExtensions(graphFramework) {
    } // add any default editor extensions here.  It's good practice to make
    // these switchable via the options object.
    // graphFramework.registerEditorExtensions(...);
  }, {
    key: "registerNodeExtensions",
    value: function registerNodeExtensions(graphFramework) {
    } // add any default node extensions here.  It's good practice to make
    // these switchable via the options object.
    // graphFramework.registerNodeExtensions(...);
  }, {
    key: "registerWidgets",
    value: function registerWidgets(graphFramework) {
    } // add any default widgets here.  It's good practice to make
    // these switchable via the options object.
    // graphFramework.registerWidgetType(...);
  }]);
}();

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
