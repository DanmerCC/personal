'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  props: {
    multiple: {
      default: false
    },
    types: {
      default: function _default() {
        return ['application/pdf'];
      }
    },
    value: {
      default: null
    }
  },
  data: function data() {
    return {
      file: null,
      files: [],
      indrag: false,
      b64src: null
    };
  },
  methods: {
    clear: function clear() {
      var _this = this;

      this.$refs.filecontent.value = null;
      this.$nextTick(function () {
        _this.b64src = null;
      });
      this.$emit('clear');
    },
    handleClick: function handleClick($event) {
      this.$refs.filecontent.click();
    },
    handleDrop: function handleDrop(event) {
      var _ref = event.dataTransfer ? event.dataTransfer : this.$refs.filecontent,
          files = _ref.files;

      if (files.length > 1) {
        alert("Debes seleccionar solo un archivo");
        return;
      }

      this.$refs.filecontent.files = files;
      var fs = this.$refs.filecontent.files;
      this.file = this.$refs.filecontent.files[0];
      var reader = new FileReader();
      reader.onload = this.completeUrl;
      reader.readAsDataURL(new Blob(fs, {
        type: 'application/pdf'
      }));
    },
    completeUrl: function completeUrl(e) {
      console.log(e);
      this.b64src = e.target.result;
    }
  },
  computed: {
    classzone: function classzone() {
      return '';
    }
  },
  watch: {
    file: function file(value) {
      this.$emit('input', value);
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<input type=\"file\" hidden=\"hidden\" data-v-51e2b6a2> " + (_vm.b64src != null ? "<div class=\"btn btn-primary close-button\" data-v-51e2b6a2><i class=\"fas fa-window-close\" data-v-51e2b6a2></i></div>" : "<!---->") + " " + (_vm.b64src == null ? "<div" + _vm._ssrClass(null, _vm.classzone + ' dropzone') + " data-v-51e2b6a2>\n        Arrastre aqui el documento digital\n    </div>" : "<embed" + _vm._ssrAttr("src", _vm.b64src) + " type width=\"100%\" data-v-51e2b6a2>"))]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-51e2b6a2_0", {
    source: ".dropzone[data-v-51e2b6a2]{width:100%;height:150px;border:solid grey 1px;border-radius:10px;border-spacing:4px;display:flex;justify-content:center;align-items:center;cursor:pointer;border-style:dashed}.close-button[data-v-51e2b6a2]{position:absolute;left:100%;transform:translate(-170%)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-51e2b6a2";
/* module identifier */

var __vue_module_identifier__ = "data-v-51e2b6a2";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);var script$1 = {
  name: 'PersonalSample',
  // vue component name
  data: function data() {
    return {
      counter: 5,
      initCounter: 5,
      message: {
        action: null,
        amount: null
      }
    };
  },
  computed: {
    changedBy: function changedBy() {
      var _message$amount;

      var message = this.message;
      if (!message.action) return 'initialized';
      return "".concat(message === null || message === void 0 ? void 0 : message.action, " ").concat((_message$amount = message.amount) !== null && _message$amount !== void 0 ? _message$amount : '').trim();
    }
  },
  methods: {
    increment: function increment(arg) {
      var amount = typeof arg !== 'number' ? 1 : arg;
      this.counter += amount;
      this.message.action = 'incremented by';
      this.message.amount = amount;
    },
    decrement: function decrement(arg) {
      var amount = typeof arg !== 'number' ? 1 : arg;
      this.counter -= amount;
      this.message.action = 'decremented by';
      this.message.amount = amount;
    },
    reset: function reset() {
      this.counter = this.initCounter;
      this.message.action = 'reset';
      this.message.amount = null;
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "personal-sample"
  }, [_vm._ssrNode("<p data-v-58f9674e>" + _vm._ssrEscape("The counter was " + _vm._s(_vm.changedBy) + " to ") + "<b data-v-58f9674e>" + _vm._ssrEscape(_vm._s(_vm.counter)) + "</b>.</p> <button data-v-58f9674e>\n    Click +1\n  </button> <button data-v-58f9674e>\n    Click -1\n  </button> <button data-v-58f9674e>\n    Click +5\n  </button> <button data-v-58f9674e>\n    Click -5\n  </button> <button data-v-58f9674e>\n    Reset\n  </button>")]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-58f9674e_0", {
    source: ".personal-sample[data-v-58f9674e]{display:block;width:400px;margin:25px auto;border:1px solid #ccc;background:#eaeaea;text-align:center;padding:25px}.personal-sample p[data-v-58f9674e]{margin:0 0 1em}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = "data-v-58f9674e";
/* module identifier */

var __vue_module_identifier__$1 = "data-v-58f9674e";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$2 = {
  props: {
    columns: {
      default: function _default() {
        return [];
      }
    },
    items: {
      default: function _default() {
        return [];
      }
    },
    pkey: {
      default: "id"
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 100
    },
    actioncolumn: {
      default: false
    },
    responsive: {
      default: true
    },
    columselecteds: {
      default: null
    },
    select: {
      default: false
    },
    rowclickeable: {
      default: false
    }
  },
  data: function data() {
    return {
      dpage: this.page,
      dlimit: this.limit,
      selectable: this.select,
      selecteds: [],
      pkeySelected: null,
      columnsSelecteds: this.addOrderIndexColumns(this.columns),
      showConfigTable: false
    };
  },
  methods: {
    handleRowClick: function handleRowClick(item) {
      if (this.rowclickeable) this.$emit("rowclick", item);
    },
    handleCheck: function handleCheck($event, columna) {
      console.log($event, columna);
    },
    isHover: function isHover(pkey) {
      return this.pkeySelected == pkey;
    },
    handle: function handle(keyselected) {
      this.pkeySelected = keyselected;
    },
    unSelectPage: function unSelectPage() {
      var _this = this;

      this.selecteds = this.selecteds.filter(function (x) {
        return !_this.idsItems.includes(x[_this.pkey]);
      });
    },
    selectAllPage: function selectAllPage() {
      var _this$selecteds,
          _this2 = this;

      (_this$selecteds = this.selecteds).push.apply(_this$selecteds, _toConsumableArray(this.items.filter(function (x) {
        return !_this2.idsSelecteds.includes(x[_this2.pkey]) && x.selectable;
      })));
    },
    isSelected: function isSelected(item) {
      var _this3 = this;

      return this.selecteds.filter(function (x) {
        return x[_this3.pkey] == item[_this3.pkey];
      }).length > 0;
    },
    handleSelect: function handleSelect($event, item) {
      console.log(item);

      if ($event) {
        this.addSelectedList(item);
      } else {
        this.removeSelectedList(item);
      }
    },
    addSelectedList: function addSelectedList(item) {
      this.selecteds.push(item);
    },
    removeSelectedList: function removeSelectedList(item) {
      var _this4 = this;

      this.selecteds = this.selecteds.filter(function (x) {
        return x[_this4.pkey] != item[_this4.pkey];
      });
    },
    interpret: function interpret(item, column) {
      if (column == "this") {
        return item;
      }

      var tempobject = item;
      var nodes = column.value.split(".");
      var detectUndefined = false;
      nodes.forEach(function (ele) {
        if (typeof tempobject[ele] == "undefined") {
          detectUndefined = true;
        }

        tempobject = tempobject[ele];
      });
      return detectUndefined ? item : tempobject;
    },
    intersect: function intersect(item, column) {
      return item[column.value.split(".")[0]];
    },
    addOrderIndexColumns: function addOrderIndexColumns(items) {
      for (var yy = 0; yy < items.length; yy++) {
        items[yy]["order"] = yy + 1;
      }

      return items;
    }
  },
  computed: {
    columnsSelectedsInOrder: function columnsSelectedsInOrder() {
      return _.orderBy(this.columnsSelecteds, "order");
    },
    idsItems: function idsItems() {
      var _this5 = this;

      return this.items.map(function (x) {
        return x[_this5.pkey];
      });
    },
    idsSelecteds: function idsSelecteds() {
      var _this6 = this;

      return this.selecteds.map(function (x) {
        return x[_this6.pkey];
      });
    },
    responsiveclass: function responsiveclass() {
      var classbase = " ";

      if (this.responsive) {
        classbase += "scrollable-y ";
      }

      return classbase;
    },
    haveSomeUnselected: function haveSomeUnselected() {
      var _this7 = this;

      var count = 0;
      var count_selectables = this.items.filter(function (x) {
        return x.selectable;
      }).length;
      this.items.forEach(function (i) {
        if (_this7.selectable) {
          if (_this7.idsSelecteds.includes(i[_this7.pkey]) && i.selectable) {
            count++;
          }
        } else {
          if (_this7.idsSelecteds.includes(i[_this7.pkey])) {
            count++;
          }
        }
      });
      return count < (this.selectable ? count_selectables : this.items.length);
    }
  },
  watch: {
    page: function page() {
      this.$emit("update:page", this.dpage);
    },
    selecteds: function selecteds(value) {
      this.$emit("update:selected", this.selecteds);
    },
    columnsSelecteds: function columnsSelecteds() {
      this.$emit("update:columselecteds", this.columnsSelecteds);
    }
  },
  mounted: function mounted() {
    this.$emit("update:columselecteds", this.columnsSelecteds);
  }
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: 'card ' + _vm.responsiveclass
  }, [_vm._ssrNode("<div class=\"container-fluid\" data-v-68d55d40>", "</div>", [_vm._ssrNode("<div class=\"row align-items-center head-options\" data-v-68d55d40><div class=\"col-11 text-center\" data-v-68d55d40><span" + _vm._ssrStyle(null, null, {
    display: _vm.selectable ? '' : 'none'
  }) + " data-v-68d55d40>" + _vm._ssrEscape(_vm._s(_vm.selecteds.length) + " Seleccionados") + "</span></div> <div class=\"col-1 config-icon text-right\" data-v-68d55d40><i aria-hidden=\"true\" class=\"fa fa-cog\" data-v-68d55d40></i></div></div> "), _vm.selectable ? _vm._ssrNode("<div class=\"row\" data-v-68d55d40>", "</div>", [_vm._ssrNode("<div class=\"col-2 no-space-left\" data-v-68d55d40>", "</div>", [_c('drop-down', {
    scopedSlots: _vm._u([{
      key: "primary",
      fn: function fn() {
        return [_c('div', {
          staticClass: "group-control"
        }, [_vm.haveSomeUnselected ? _c('div', {
          staticClass: "btn btn-sm",
          on: {
            "click": function click($event) {
              return _vm.selectAllPage();
            }
          }
        }, [_c('i', {
          staticClass: "fa fa-check-square fa-2",
          attrs: {
            "aria-hidden": "true"
          }
        })]) : _c('div', {
          staticClass: "btn btn-sm btn-secondary",
          on: {
            "click": function click($event) {
              return _vm.unSelectPage();
            }
          }
        }, [_c('i', {
          staticClass: "fa fa-check-square fa-2",
          attrs: {
            "aria-hidden": "true"
          }
        })])])];
      },
      proxy: true
    }], null, false, 2537025323)
  }, [_vm._v(" "), [_vm.haveSomeUnselected ? _c('drop-down-item', [_c('div', {
    staticClass: "btn btn-light",
    on: {
      "click": function click($event) {
        return _vm.selectAllPage();
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-check-square-o",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("\n                Seleccionar Pagina\n              ")])]) : _vm._e(), _vm._v(" "), !_vm.haveSomeUnselected ? _c('drop-down-item', [_c('div', {
    staticClass: "btn btn-light",
    on: {
      "click": function click($event) {
        return _vm.unSelectPage();
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-check-square-o",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("\n                Deseleccionar Pagina\n              ")])]) : _vm._e()]], 2)], 1), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"col-10\" data-v-68d55d40>", "</div>", [_vm._t("top-options", null, {
    "selecteds": _vm.selecteds
  })], 2)], 2) : _vm._e()], 2), _vm._ssrNode(" "), _vm._ssrNode("<table class=\"table table-responsive-sm table-sm\" data-v-68d55d40>", "</table>", [_vm._ssrNode("<thead data-v-68d55d40>", "</thead>", [_vm._ssrNode("<tr data-v-68d55d40>", "</tr>", [_vm._ssrNode((_vm.selectable ? "<th class=\"select-td\" data-v-68d55d40>Seleccion</th>" : "<!---->") + " "), _vm._l(_vm.columnsSelectedsInOrder, function (column) {
    return _vm._ssrNode("<th data-v-68d55d40>", "</th>", [_vm._t("column", [[_vm._v("\n              " + _vm._s(column.name) + "\n            ")]], {
      "column": column
    })], 2);
  }), _vm._ssrNode(" " + (_vm.actioncolumn ? "<th class=\"medium-td\" data-v-68d55d40>Mas</th>" : "<!---->"))], 2)]), _vm._ssrNode(" "), _vm._ssrNode("<tbody data-v-68d55d40>", "</tbody>", [_vm._l(_vm.items, function (item) {
    return _vm._ssrNode("<tr data-v-68d55d40>", "</tr>", [_vm.selectable ? _vm._ssrNode("<td class=\"select-td\" data-v-68d55d40>", "</td>", [_c('checkable-item', {
      ref: "rowselectbox",
      refInFor: true,
      attrs: {
        "checked": _vm.isSelected(item),
        "value": item
      },
      on: {
        "change": _vm.handleSelect
      }
    })], 1) : _vm._e(), _vm._ssrNode(" "), _vm._l(_vm.columnsSelectedsInOrder, function (c) {
      return _vm._ssrNode("<td data-v-68d55d40>", "</td>", [_vm._t(c.value, [_vm._t("cell", [[_vm._v("\n                " + _vm._s(_vm.interpret(item, c)) + "\n              ")]], {
        "row": item,
        "column": c,
        "item": _vm.interpret(item, c)
      })], {
        "item": _vm.interpret(item, c),
        "row": item,
        "hover": _vm.isHover(item[_vm.pkey])
      })], 2);
    }), _vm._ssrNode(" "), _vm.actioncolumn ? _vm._ssrNode("<td data-v-68d55d40>", "</td>", [_vm._t("action", [_vm._v("\n            --\n          ")], {
      "item": item,
      "row": item,
      "hover": _vm.isHover(item[_vm.pkey])
    })], 2) : _vm._e()], 2);
  }), _vm._ssrNode(" " + (_vm.items.lenght == 0 ? "<tr class=\"select-td text-center\" data-v-68d55d40><td" + _vm._ssrAttr("colspan", _vm.items.lenght) + " data-v-68d55d40>No hay datos</td></tr>" : "<!---->"))], 2)], 2), _vm._ssrNode(" "), _vm._t("paginate", null, {
    "perpage": _vm.limit
  }), _vm._ssrNode(" "), _vm.showConfigTable ? _c('modal-component', {
    attrs: {
      "title": "Configuracion de columnas"
    },
    on: {
      "close": function close($event) {
        _vm.showConfigTable = false;
      }
    },
    scopedSlots: _vm._u([{
      key: "body",
      fn: function fn() {
        return [_c('table', {
          staticClass: "table table-sm"
        }, [_c('thead', [_c('tr', [_c('th', [_vm._v("Columna")]), _vm._v(" "), _c('th', [_vm._v("Visible")])])]), _vm._v(" "), _c('tbody', _vm._l(_vm.columns, function (col, index) {
          return _c('tr', {
            key: index
          }, [_c('td', [_vm._v(_vm._s(col.name))]), _vm._v(" "), _c('td', [_c('input', {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: _vm.columnsSelecteds,
              expression: "columnsSelecteds"
            }],
            staticClass: "form-control",
            attrs: {
              "type": "checkbox"
            },
            domProps: {
              "value": col,
              "checked": Array.isArray(_vm.columnsSelecteds) ? _vm._i(_vm.columnsSelecteds, col) > -1 : _vm.columnsSelecteds
            },
            on: {
              "change": [function ($event) {
                var $$a = _vm.columnsSelecteds,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false;

                if (Array.isArray($$a)) {
                  var $$v = col,
                      $$i = _vm._i($$a, $$v);

                  if ($$el.checked) {
                    $$i < 0 && (_vm.columnsSelecteds = $$a.concat([$$v]));
                  } else {
                    $$i > -1 && (_vm.columnsSelecteds = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                  }
                } else {
                  _vm.columnsSelecteds = $$c;
                }
              }, function ($event) {
                return _vm.handleCheck($event, col);
              }]
            }
          })])]);
        }), 0)])];
      },
      proxy: true
    }], null, false, 1350803417)
  }) : _vm._e(), _vm._ssrNode(" "), _c('paginator')], 2);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-68d55d40_0", {
    source: "tbody[data-v-68d55d40]{font-size:10px;font-weight:700}table[data-v-68d55d40]{max-height:250px;overflow:scroll}input[data-v-68d55d40]{height:17px}.scrollable-y[data-v-68d55d40]{overflow-y:auto}.select-td[data-v-68d55d40]{width:60px}.medium-td[data-v-68d55d40]{max-width:120px}.no-space-left[data-v-68d55d40]{padding-left:1px}.config-icon[data-v-68d55d40]{padding-left:0}.config-icon>i[data-v-68d55d40]{padding-top:10px}.col-1.config-icon.text-right[data-v-68d55d40]{padding-right:0}tr[data-v-68d55d40]:hover{background:linear-gradient(5deg,#efefefab 10%,#adadad26 90%)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$2 = "data-v-68d55d40";
/* module identifier */

var __vue_module_identifier__$2 = "data-v-68d55d40";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, createInjectorSSR, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$3 = {
  props: {
    persona: {
      default: null
    },
    title: {
      default: ""
    },
    modalClasses: {
      default: ""
    },
    isLarge: {
      default: false
    },
    isSmall: {
      default: false
    },
    isExtraLarge: {
      default: false
    },
    hasHeader: {
      default: true
    },
    backdropClose: {
      default: true
    },
    backdropCloseConfirm: {
      default: false
    },
    backdropCloseConfirmText: {
      default: "Are you sure?"
    },
    labelCancel: {
      default: 'Cancel'
    }
  },
  methods: {
    close: function close() {
      this.$emit("close");
    },
    closeBackdrop: function closeBackdrop() {
      if (!this.backdropClose) {
        return false;
      }

      if (this.backdropCloseConfirm && !confirm(this.backdropCloseConfirmText)) {
        return false;
      }

      this.close();
    }
  },
  computed: {
    modalSizeClasses: function modalSizeClasses() {
      if (this.isLarge) {
        return "modal-lg";
      }

      if (this.isSmall) {
        return "modal-sm";
      }

      if (this.isExtraLarge) {
        return "modal-xl";
      }

      return "";
    }
  }
};/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('transition', {
    attrs: {
      "name": "modal"
    }
  }, [_c('div', {
    staticClass: "unspace"
  }, [_c('div', {
    class: 'modal ' + _vm.modalClasses,
    staticStyle: {
      "display": "block"
    },
    attrs: {
      "tabindex": "-1",
      "role": "dialog",
      "aria-labelledby": "Modal"
    },
    on: {
      "click": function click($event) {
        $event.stopPropagation();
      }
    }
  }, [_c('div', {
    class: 'modal-dialog ' + _vm.modalSizeClasses,
    attrs: {
      "role": "document"
    },
    on: {
      "click": function click($event) {
        $event.stopPropagation();
      }
    }
  }, [_c('div', {
    staticClass: "modal-content"
  }, [_vm._t("precontent"), _vm._v(" "), _vm.hasHeader ? _c('div', {
    staticClass: "modal-header"
  }, [_c('h5', {
    staticClass: "modal-title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('button', {
    staticClass: "close",
    attrs: {
      "type": "button",
      "aria-label": "Close"
    },
    on: {
      "click": _vm.close
    }
  }, [_c('span', {
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm._v("×")])])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "modal-body"
  }, [_vm._t("body")], 2), _vm._v(" "), _c('div', {
    staticClass: "modal-footer"
  }, [_vm._t("footer"), _vm._v(" "), _c('button', {
    staticClass: "btn btn-secondary",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function click($event) {
        return _vm.close();
      }
    }
  }, [_vm._v(_vm._s(_vm.labelCancel))])], 2)], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "modal-backdrop show"
  })])]);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-53b9873c_0", {
    source: ".modal-xl[data-v-53b9873c]{width:90%;max-width:1200px}.unspace[data-v-53b9873c]{height:0}.breadcrumb-menu .btn[data-v-53b9873c]{color:#fff}.breadcrumb-menu .btn[data-v-53b9873c]:hover{color:#6c757d}.modal-title[data-v-53b9873c]{color:#6c757d}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$3 = "data-v-53b9873c";
/* module identifier */

var __vue_module_identifier__$3 = "data-v-53b9873c";
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, createInjectorSSR, undefined);//
//
//
//
//
//
//
//
//
//
//
//
var script$4 = {
  props: {
    value: {
      default: true
    }
  },
  methods: {
    nextPage: function nextPage(topage) {
      if (topage <= 0) {
        return;
      }

      this.$emit('change', topage);
    }
  }
};/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('nav', [_vm._ssrNode("<ul class=\"pagination\" data-v-12bc7998><li" + _vm._ssrAttr("disabled", true) + _vm._ssrClass(null, _vm.value - 2 < 0 ? 'page-item disabled' : 'page-item') + " data-v-12bc7998><span class=\"page-link\" data-v-12bc7998> Anterior</span></li> " + (_vm.value - 1 > 0 ? "<li class=\"page-item\" data-v-12bc7998><span class=\"page-link\" data-v-12bc7998>" + _vm._ssrEscape(" " + _vm._s(_vm.value - 1)) + "</span></li>" : "<!---->") + " <li class=\"page-item active\" data-v-12bc7998><span class=\"page-link\" data-v-12bc7998>" + _vm._ssrEscape(" " + _vm._s(_vm.value)) + "</span></li> <li class=\"page-item\" data-v-12bc7998><span class=\"page-link\" data-v-12bc7998>" + _vm._ssrEscape(" " + _vm._s(_vm.value + 1)) + "</span></li> <li class=\"page-item\" data-v-12bc7998><span class=\"page-link\" data-v-12bc7998> Siguiente</span></li></ul>")]);
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-12bc7998_0", {
    source: "li.page-item[data-v-12bc7998]{cursor:pointer}li.page-item.disabled[data-v-12bc7998]{cursor:not-allowed}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$4 = "data-v-12bc7998";
/* module identifier */

var __vue_module_identifier__$4 = "data-v-12bc7998";
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject shadow dom */

var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, createInjectorSSR, undefined);/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,PreviewFile: __vue_component__,PersonalSample: __vue_component__$1,DataTable: __vue_component__$2,ModalComponent: __vue_component__$3,Paginate: __vue_component__$4});var install = function installPersonal(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Default export is library as a whole, registered via Vue.use()
exports.DataTable=__vue_component__$2;exports.ModalComponent=__vue_component__$3;exports.Paginate=__vue_component__$4;exports.PersonalSample=__vue_component__$1;exports.PreviewFile=__vue_component__;exports.default=plugin;