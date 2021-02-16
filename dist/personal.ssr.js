'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _=require('lodash');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var ___default=/*#__PURE__*/_interopDefaultLegacy(_);function _slicedToArray(arr, i) {
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
var script$2 = {
  props: {
    checked: {
      default: false
    },
    value: {
      type: Object,
      default: null
    }
  },
  methods: {
    handleChange: function handleChange() {
      this.$emit('change', this.ischecked, this.value);
    }
  },
  data: function data() {
    return {
      ischecked: this.checked
    };
  },
  watch: {
    checked: function checked(value) {
      this.ischecked = value;
    }
  },
  computed: {
    inputStyles: function inputStyles() {
      //return {"max-width":this.$refs.myinput.clientHeight+"px;"}
      if (this.$refs.myinput == undefined) {
        return {};
      } else {
        return {
          "max-width": this.$refs.myinput.clientHeight + "px;"
        };
      }
    }
  },
  mounted: function mounted() {
    console.log(this.$refs.myinput.clientHeight);
  }
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.ischecked,
      expression: "ischecked"
    }],
    ref: "myinput",
    staticClass: "form-control ",
    attrs: {
      "type": "checkbox",
      "disabled": _vm.value.noselect
    },
    domProps: {
      "checked": Array.isArray(_vm.ischecked) ? _vm._i(_vm.ischecked, null) > -1 : _vm.ischecked
    },
    on: {
      "change": [function ($event) {
        var $$a = _vm.ischecked,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;

        if (Array.isArray($$a)) {
          var $$v = null,
              $$i = _vm._i($$a, $$v);

          if ($$el.checked) {
            $$i < 0 && (_vm.ischecked = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.ischecked = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.ischecked = $$c;
        }
      }, _vm.handleChange]
    }
  }, []);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-2c95c235_0", {
    source: "input[data-v-2c95c235]{max-width:60px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$2 = "data-v-2c95c235";
/* module identifier */

var __vue_module_identifier__$2 = "data-v-2c95c235";
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
var script$3 = {};/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "btn-group border border-dark rounded-lg "
  }, [_vm._t("primary"), _vm._ssrNode(" <button type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"btn btn-secondary dropdown-toggle dropdown-toggle-split\" data-v-fdb8d84c><span class=\"sr-only\" data-v-fdb8d84c>Toggle Dropdown</span></button> "), _vm._ssrNode("<div x-placement=\"bottom-start\" class=\"dropdown-menu\" style=\"position: absolute; transform: translate3d(89px, 34px, 0px); top: 0px; left: 0px; will-change: transform;\" data-v-fdb8d84c>", "</div>", [_vm._t("default")], 2)], 2);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-fdb8d84c_0", {
    source: ".btn-group.border.border-dark.rounded-lg[data-v-fdb8d84c]{width:100%}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$3 = "data-v-fdb8d84c";
/* module identifier */

var __vue_module_identifier__$3 = "data-v-fdb8d84c";
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
var script$4 = {};/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "dropdown-item"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = "data-v-2c81851e";
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);//
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
var script$5 = {};/* script */
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', [_vm._ssrNode("<div class=\"dropdown\" data-v-33e3703b>", "</div>", [_vm._ssrNode("<div class=\"dd-button\" data-v-33e3703b>", "</div>", [_vm._t("primary")], 2), _vm._ssrNode(" <input type=\"checkbox\" id=\"test\" class=\"dd-input\" data-v-33e3703b> "), _vm._ssrNode("<ul class=\"dd-menu\" data-v-33e3703b>", "</ul>", [_vm._t("items")], 2)], 2)]);
};

var __vue_staticRenderFns__$5 = [];
/* style */

var __vue_inject_styles__$5 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-33e3703b_0", {
    source: "a[data-v-33e3703b]{text-decoration:none;color:#000}a[data-v-33e3703b]:hover{color:#222}.dropdown[data-v-33e3703b]{display:inline-block;position:relative}.dd-button[data-v-33e3703b]{display:inline-block;border:1px solid gray;border-radius:4px;padding:10px 30px 10px 20px;background-color:#fff;cursor:pointer;white-space:nowrap}.dd-button[data-v-33e3703b]:after{content:'';position:absolute;top:50%;right:15px;transform:translateY(-50%);width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000}.dd-button[data-v-33e3703b]:hover{background-color:#eee}.dd-input[data-v-33e3703b]{display:none}.dd-menu[data-v-33e3703b]{position:absolute;top:100%;border:1px solid #ccc;border-radius:4px;padding:0;margin:2px 0 0 0;box-shadow:0 0 6px 0 rgba(0,0,0,.1);background-color:#fff;list-style-type:none}.dd-input+.dd-menu[data-v-33e3703b]{display:none}.dd-input:checked+.dd-menu[data-v-33e3703b]{display:block}.dd-menu li[data-v-33e3703b]{padding:10px 20px;cursor:pointer;white-space:nowrap}.dd-menu li[data-v-33e3703b]:hover{background-color:#f6f6f6}.dd-menu li a[data-v-33e3703b]{display:block;margin:-10px -20px;padding:10px 20px}.dd-menu li.divider[data-v-33e3703b]{padding:0;border-bottom:1px solid #ccc}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$5 = "data-v-33e3703b";
/* module identifier */

var __vue_module_identifier__$5 = "data-v-33e3703b";
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject shadow dom */

var __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, createInjectorSSR, undefined);var script$6 = {
  components: {
    'checkable-item': __vue_component__$2,
    'drop-down': __vue_component__$3,
    'drop-down-item': __vue_component__$4,
    'drop-down2': __vue_component__$5
  },
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
    excelformat: function excelformat(result_table) {
      var lineArray = [];
      result_table.forEach(function (infoArray, index) {
        var line = Object.values(infoArray).join(" \t");
        lineArray.push(index == 0 ? line : line);
      });
      var csvContent = lineArray.join("\r\n");
      var excel_file = document.createElement('a');
      excel_file.setAttribute('href', 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(csvContent));
      excel_file.setAttribute('download', 'dccexcel.xls');
      document.body.appendChild(excel_file);
      excel_file.click();
      document.body.removeChild(excel_file);
    },
    csv: function csv(tabledata) {
      var csvContent = "data:text/csv;charset=utf-8,";
      var data = tabledata.slice();
      data.forEach(function (rowArray) {
        var havecant = rowArray.tickets.length >= 1;
        rowArray.tickets1 = havecant ? rowArray.tickets[0].join_url : 'null';
        rowArray.tickets2 = havecant ? rowArray.tickets[1].join_url : 'null';
        rowArray.tickets = null;
        var row = Object.values(rowArray).join(";");
        csvContent += row + "\r\n";
      });
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "ddata.csv");
      document.body.appendChild(link);
      link.click();
    },
    cleanSelecteds: function cleanSelecteds() {
      this.selecteds = [];
    },
    updateSelectedForce: function updateSelectedForce() {
      var _this = this,
          _this$selecteds;

      var backlist = this.selecteds.filter(function (x) {
        return !_this.idsItems.includes(x[_this.pkey]);
      });
      this.selecteds = this.items.filter(function (x) {
        return _this.idsSelecteds.includes(x[_this.pkey]);
      });

      (_this$selecteds = this.selecteds).push.apply(_this$selecteds, _toConsumableArray(backlist));
    },
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
      var _this2 = this;

      this.selecteds = this.selecteds.filter(function (x) {
        return !_this2.idsItems.includes(x[_this2.pkey]);
      });
    },
    selectAllPage: function selectAllPage() {
      var _this$selecteds2,
          _this3 = this;

      (_this$selecteds2 = this.selecteds).push.apply(_this$selecteds2, _toConsumableArray(this.items.filter(function (x) {
        return !_this3.idsSelecteds.includes(x[_this3.pkey]) && !x.noselect;
      })));
    },
    isSelected: function isSelected(item) {
      var _this4 = this;

      return this.selecteds.filter(function (x) {
        return x[_this4.pkey] == item[_this4.pkey];
      }).length > 0;
    },
    handleSelect: function handleSelect($event, item) {
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
      var _this5 = this;

      this.selecteds = this.selecteds.filter(function (x) {
        return x[_this5.pkey] != item[_this5.pkey];
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
      return ___default['default'].orderBy(this.columnsSelecteds, "order");
    },
    idsItems: function idsItems() {
      var _this6 = this;

      return this.items.map(function (x) {
        return x[_this6.pkey];
      });
    },
    idsSelecteds: function idsSelecteds() {
      var _this7 = this;

      return this.selecteds.map(function (x) {
        return x[_this7.pkey];
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
      var _this8 = this;

      //if(this.selecteds.length==0)return true
      var count = 0;
      var count_selectables = this.items.filter(function (x) {
        return !x.noselect;
      }).length;
      this.items.forEach(function (i) {
        if (_this8.selectable) {
          if (_this8.idsSelecteds.includes(i[_this8.pkey]) && !i.noselect) {
            count++;
          }
        } else {
          if (_this8.idsSelecteds.includes(i[_this8.pkey])) {
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
    },
    columns: function columns(value) {
      this.columnsSelecteds = this.addOrderIndexColumns(value);
    }
  },
  mounted: function mounted() {
    this.$emit("update:columselecteds", this.columnsSelecteds);
  }
};/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: 'card ' + _vm.responsiveclass
  }, [_vm._ssrNode("<div class=\"container-fluid\" data-v-ed9cf228><div class=\"row align-items-center head-options\" data-v-ed9cf228><div class=\"col-11 text-center\" data-v-ed9cf228><span" + _vm._ssrStyle(null, null, {
    display: _vm.selectable ? '' : 'none'
  }) + " data-v-ed9cf228>" + _vm._ssrEscape(_vm._s(_vm.selecteds.length) + " Seleccionados") + "</span></div> <div class=\"col-1 config-icon text-right\" data-v-ed9cf228><i aria-hidden=\"true\" class=\"fa fa-cog\" data-v-ed9cf228></i></div></div></div> "), _vm._ssrNode("<table class=\"table table-responsive-sm table-sm\" data-v-ed9cf228>", "</table>", [_vm._ssrNode("<thead data-v-ed9cf228>", "</thead>", [_vm.selectable ? _vm._ssrNode("<tr data-v-ed9cf228>", "</tr>", [_vm._ssrNode("<th class=\"select-td \" data-v-ed9cf228>" + (_vm.haveSomeUnselected || _vm.selecteds.length == 0 ? "<button class=\"btn btn-sm\" data-v-ed9cf228><i aria-hidden=\"true\" class=\"fa fa-check-square fa-2\" data-v-ed9cf228></i></button>" : "<button class=\"btn btn-sm btn-secondary\" data-v-ed9cf228><i aria-hidden=\"true\" class=\"fa fa-check-square fa-2\" data-v-ed9cf228></i></button>") + "</th> "), _vm._ssrNode("<th" + _vm._ssrAttr("colspan", _vm.columnsSelectedsInOrder.length + (_vm.actioncolumn ? 2 : 1)) + " data-v-ed9cf228>", "</th>", [_vm._t("top-options", null, {
    "selecteds": _vm.selecteds
  }), _vm._ssrNode(" " + (_vm.selecteds.length > 0 ? "<a href=\"#\" width=\"30px\" data-v-ed9cf228>\n              csv\n            </a>" : "<!---->") + " " + (_vm.selecteds.length > 0 ? "<a href=\"#\" width=\"30px\" data-v-ed9cf228>\n              xls\n            </a>" : "<!---->"))], 2)], 2) : _vm._e(), _vm._ssrNode(" "), _vm._ssrNode("<tr data-v-ed9cf228>", "</tr>", [_vm._ssrNode((_vm.selectable ? "<th class=\"select-td\" data-v-ed9cf228>Seleccion</th>" : "<!---->") + " "), _vm._l(_vm.columnsSelectedsInOrder, function (column) {
    return _vm._ssrNode("<th data-v-ed9cf228>", "</th>", [_vm._t("column", [[_vm._v("\n            " + _vm._s(column.name) + "\n          ")]], {
      "column": column
    })], 2);
  }), _vm._ssrNode(" " + (_vm.actioncolumn ? "<th class=\"medium-td\" data-v-ed9cf228>Mas</th>" : "<!---->"))], 2)], 2), _vm._ssrNode(" "), _vm._ssrNode("<tbody data-v-ed9cf228>", "</tbody>", [_vm._l(_vm.items, function (item) {
    return _vm._ssrNode("<tr data-v-ed9cf228>", "</tr>", [_vm.selectable ? _vm._ssrNode("<td class=\"select-td\" data-v-ed9cf228>", "</td>", [_c('checkable-item', {
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
      return _vm._ssrNode("<td data-v-ed9cf228>", "</td>", [_vm._t(c.value, [_vm._t("cell", [[_vm._v("\n                " + _vm._s(_vm.interpret(item, c)) + "\n              ")]], {
        "row": item,
        "column": c,
        "item": _vm.interpret(item, c)
      })], {
        "item": _vm.interpret(item, c),
        "row": item,
        "hover": _vm.isHover(item[_vm.pkey])
      })], 2);
    }), _vm._ssrNode(" "), _vm.actioncolumn ? _vm._ssrNode("<td data-v-ed9cf228>", "</td>", [_vm._t("action", [_vm._v("\n            --\n          ")], {
      "item": item,
      "row": item,
      "hover": _vm.isHover(item[_vm.pkey])
    })], 2) : _vm._e()], 2);
  }), _vm._ssrNode(" " + (_vm.items.length == 0 ? "<tr class=\"select-td text-center\" data-v-ed9cf228>" + (_vm.selectable ? "<td data-v-ed9cf228></td>" : "<!---->") + " <td" + _vm._ssrAttr("colspan", _vm.columnsSelecteds.length) + " data-v-ed9cf228>No hay datos</td></tr>" : "<!---->"))], 2)], 2), _vm._ssrNode(" "), _vm._t("paginate", null, {
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
  }) : _vm._e(), _vm._ssrNode(" "), _vm._t("append")], 2);
};

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-ed9cf228_0", {
    source: "tbody[data-v-ed9cf228]{font-size:10px;font-weight:700}table[data-v-ed9cf228]{max-height:250px;overflow:scroll}input[data-v-ed9cf228]{height:17px}.scrollable-y[data-v-ed9cf228]{overflow-y:auto}.select-td[data-v-ed9cf228]{width:60px}.medium-td[data-v-ed9cf228]{max-width:120px}.no-space-left[data-v-ed9cf228]{padding-left:1px}.config-icon[data-v-ed9cf228]{padding-left:0}.config-icon>i[data-v-ed9cf228]{padding-top:10px}.col-1.config-icon.text-right[data-v-ed9cf228]{padding-right:0}tr[data-v-ed9cf228]:hover{background:linear-gradient(5deg,#efefefab 10%,#adadad26 90%)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$6 = "data-v-ed9cf228";
/* module identifier */

var __vue_module_identifier__$6 = "data-v-ed9cf228";
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject shadow dom */

var __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, createInjectorSSR, undefined);//
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
var script$7 = {
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
      default: "Cancel"
    },
    height_proportion: {
      default: 0.75
    }
  },
  data: function data() {
    return {
      windowHeight: window.innerHeight
    };
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
var __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function __vue_render__() {
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
  }, [_vm._t("everybody", [_c('div', {
    staticClass: "modal-content",
    style: {
      'max-height': _vm.windowHeight * _vm.height_proportion + 'px'
    }
  }, [_vm._t("precontent"), _vm._v(" "), _vm.hasHeader ? _c('div', {
    staticClass: "modal-header"
  }, [_vm._t("prepend-head"), _vm._v(" "), _c('h5', {
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
  }, [_vm._v("×")])])], 2) : _vm._e(), _vm._v(" "), _c('div', {
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
  }, [_vm._v("\n              " + _vm._s(_vm.labelCancel) + "\n            ")])], 2)], 2)])], 2)]), _vm._v(" "), _c('div', {
    staticClass: "modal-backdrop show"
  })])]);
};

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-5161c9be_0", {
    source: ".modal-content[data-v-5161c9be]{overflow:scroll}.modal-xl[data-v-5161c9be]{width:90%;max-width:1200px}.unspace[data-v-5161c9be]{height:0}.breadcrumb-menu .btn[data-v-5161c9be]{color:#fff}.breadcrumb-menu .btn[data-v-5161c9be]:hover{color:#6c757d}.modal-title[data-v-5161c9be]{color:#6c757d}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$7 = "data-v-5161c9be";
/* module identifier */

var __vue_module_identifier__$7 = "data-v-5161c9be";
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject shadow dom */

var __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, createInjectorSSR, undefined);//
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
var script$8 = {
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
var __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('nav', [_vm._ssrNode("<ul class=\"pagination\" data-v-12bc7998><li" + _vm._ssrAttr("disabled", true) + _vm._ssrClass(null, _vm.value - 2 < 0 ? 'page-item disabled' : 'page-item') + " data-v-12bc7998><span class=\"page-link\" data-v-12bc7998> Anterior</span></li> " + (_vm.value - 1 > 0 ? "<li class=\"page-item\" data-v-12bc7998><span class=\"page-link\" data-v-12bc7998>" + _vm._ssrEscape(" " + _vm._s(_vm.value - 1)) + "</span></li>" : "<!---->") + " <li class=\"page-item active\" data-v-12bc7998><span class=\"page-link\" data-v-12bc7998>" + _vm._ssrEscape(" " + _vm._s(_vm.value)) + "</span></li> <li class=\"page-item\" data-v-12bc7998><span class=\"page-link\" data-v-12bc7998>" + _vm._ssrEscape(" " + _vm._s(_vm.value + 1)) + "</span></li> <li class=\"page-item\" data-v-12bc7998><span class=\"page-link\" data-v-12bc7998> Siguiente</span></li></ul>")]);
};

var __vue_staticRenderFns__$8 = [];
/* style */

var __vue_inject_styles__$8 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-12bc7998_0", {
    source: "li.page-item[data-v-12bc7998]{cursor:pointer}li.page-item.disabled[data-v-12bc7998]{cursor:not-allowed}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$8 = "data-v-12bc7998";
/* module identifier */

var __vue_module_identifier__$8 = "data-v-12bc7998";
/* functional template */

var __vue_is_functional_template__$8 = false;
/* style inject shadow dom */

var __vue_component__$8 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, createInjectorSSR, undefined);//
var script$9 = {
  components: {
    ModalComponent: __vue_component__$7
  },
  name: 'config-columns',
  props: {
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      columnconfig: this.value,
      configuring: false
    };
  },
  methods: {
    saveChanges: function saveChanges() {
      this.columnconfig = this.value;
      this.configuring = false;
      this.$emit('input', this.columnconfig);
    }
  }
};/* script */
var __vue_script__$9 = script$9;
/* template */

var __vue_render__$9 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', [_vm._ssrNode("<button>Configurar</button> "), _vm.configuring == true ? _c('modal-component', {
    on: {
      "close": function close($event) {
        _vm.configuring = false;
      }
    },
    scopedSlots: _vm._u([{
      key: "body",
      fn: function fn() {
        return _vm._l(_vm.columnconfig, function (column, index) {
          return _c('div', {
            key: index
          }, [_c('label', {
            attrs: {
              "for": index
            }
          }, [_vm._v("\n                " + _vm._s(column.name) + "\n                "), _c('input', {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: column.visible,
              expression: "column.visible"
            }],
            attrs: {
              "type": "checkbox",
              "id": index
            },
            domProps: {
              "checked": Array.isArray(column.visible) ? _vm._i(column.visible, null) > -1 : column.visible
            },
            on: {
              "change": function change($event) {
                var $$a = column.visible,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false;

                if (Array.isArray($$a)) {
                  var $$v = null,
                      $$i = _vm._i($$a, $$v);

                  if ($$el.checked) {
                    $$i < 0 && _vm.$set(column, "visible", $$a.concat([$$v]));
                  } else {
                    $$i > -1 && _vm.$set(column, "visible", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                  }
                } else {
                  _vm.$set(column, "visible", $$c);
                }
              }
            }
          })])]);
        });
      },
      proxy: true
    }, {
      key: "footer",
      fn: function fn() {
        return [_c('button', {
          on: {
            "click": function click($event) {
              return _vm.saveChanges();
            }
          }
        }, [_vm._v("Guardar")])];
      },
      proxy: true
    }], null, false, 381324891)
  }) : _vm._e()], 2);
};

var __vue_staticRenderFns__$9 = [];
/* style */

var __vue_inject_styles__$9 = undefined;
/* scoped */

var __vue_scope_id__$9 = undefined;
/* module identifier */

var __vue_module_identifier__$9 = "data-v-0476a178";
/* functional template */

var __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$9 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);//
var script$a = {
  components: {
    ModalComponent: __vue_component__$7,
    'config-columns': __vue_component__$9
  },
  props: {
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    select: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      allselected: false,
      internal_columns: this.columns,
      internal_items: this.items,
      inconfig: true
    };
  },
  computed: {
    selecteds: function selecteds() {
      return internal_columns.filter(function (x) {
        return !x.hidden;
      });
    },
    visibleColumns: function visibleColumns() {
      return this.internal_columns.filter(function (x) {
        return !x.hidden;
      });
    },
    visibilityColumns: {
      get: function get() {
        return this.internal_columns.map(function (x) {
          x.visible = !x.hidden;
          return x;
        });
      },
      set: function set(value) {
        console.log(value);
        this.internal_columns = value.map(function (x) {
          x.hidden = !x.visible;
          return x;
        });
      }
    }
  },
  watch: {
    allselected: function allselected(value) {
      this.internal_items = this.internal_items.map(function (x) {
        x.select = value;
        return x;
      });
    }
  },
  filters: {
    onlyVisible: function onlyVisible(list) {
      return list.filter(function (x) {
        return x.visible;
      });
    }
  },
  methods: {
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
    }
  }
};/* script */
var __vue_script__$a = script$a;
/* template */

var __vue_render__$a = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', [_vm._ssrNode("<table data-v-539ba14a>", "</table>", [_vm._ssrNode("<thead data-v-539ba14a><tr data-v-539ba14a><th" + _vm._ssrAttr("colspan", _vm.columns.length + 1) + " data-v-539ba14a><button class=\"btn btn-primary\" data-v-539ba14a>Opcion</button></th></tr> <tr data-v-539ba14a>" + (_vm.select ? "<th data-v-539ba14a><input type=\"checkbox\"" + _vm._ssrAttr("checked", Array.isArray(_vm.allselected) ? _vm._i(_vm.allselected, null) > -1 : _vm.allselected) + " data-v-539ba14a></th>" : "<!---->") + " " + _vm._ssrList(_vm.visibleColumns, function (column, index) {
    return "<th data-v-539ba14a>" + _vm._ssrEscape("\n                    " + _vm._s(column.name) + "\n                ") + "</th>";
  }) + "</tr></thead> "), _vm._ssrNode("<tbody data-v-539ba14a>", "</tbody>", _vm._l(_vm.internal_items, function (item, index) {
    return _vm._ssrNode("<tr data-v-539ba14a>", "</tr>", [_vm._ssrNode((_vm.select ? "<td data-v-539ba14a><input type=\"checkbox\"" + _vm._ssrAttr("checked", Array.isArray(item.select) ? _vm._i(item.select, null) > -1 : item.select) + " data-v-539ba14a></td>" : "<!---->") + " "), _vm._l(_vm.visibleColumns, function (col, index) {
      return _vm._ssrNode("<td data-v-539ba14a>", "</td>", [_vm._t(col.value, [_vm._v("\n                        " + _vm._s(_vm.interpret(item, col)) + "\n                    ")], {
        "cel": _vm.interpret(item, col),
        "row": item
      })], 2);
    })], 2);
  }), 0)], 2), _vm._ssrNode(" "), _c('config-columns', {
    model: {
      value: _vm.visibilityColumns,
      callback: function callback($$v) {
        _vm.visibilityColumns = $$v;
      },
      expression: "visibilityColumns"
    }
  })], 2);
};

var __vue_staticRenderFns__$a = [];
/* style */

var __vue_inject_styles__$a = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-539ba14a_0", {
    source: "table[data-v-539ba14a],td[data-v-539ba14a],th[data-v-539ba14a],tr[data-v-539ba14a]{border:solid #000 1px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$a = "data-v-539ba14a";
/* module identifier */

var __vue_module_identifier__$a = "data-v-539ba14a";
/* functional template */

var __vue_is_functional_template__$a = false;
/* style inject shadow dom */

var __vue_component__$a = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, createInjectorSSR, undefined);//
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
var script$b = {
  props: {
    tabs: {
      default: function _default() {
        return [];
      }
    },
    value: null,
    noborder: {
      default: false
    }
  },
  data: function data() {
    return {
      selected: this.value
    };
  },
  methods: {
    handleClickTab: function handleClickTab($event, tab) {
      this.$emit('input', tab);
    }
  }
};/* script */
var __vue_script__$b = script$b;
/* template */

var __vue_render__$b = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "card card-primary card-outline card-tabs"
  }, [_vm._ssrNode("<div class=\"card-header p-0 pt-1 border-bottom-0\" data-v-46941cb2>", "</div>", [_vm._ssrNode("<ul id=\"custom-tabs-three-tab\" role=\"tablist\" class=\"nav nav-tabs\" data-v-46941cb2>", "</ul>", _vm._l(_vm.tabs, function (tab, index) {
    return _vm._ssrNode("<li class=\"nav-item noselect\" data-v-46941cb2>", "</li>", [_vm.value == tab ? _vm._ssrNode("<div id=\"custom-tabs-three-home-tab\" data-toggle=\"pill\" href=\"#custom-tabs-three-home\" role=\"tab\" aria-controls=\"custom-tabs-three-home\" aria-selected=\"true\" class=\"nav-link active\" data-v-46941cb2>", "</div>", [_vm._t("label", [_vm._t("label_" + tab, [_vm._v("\n                            " + _vm._s(tab) + "\n                        ")], {
      "label": tab
    })], {
      "label": tab
    })], 2) : _vm._ssrNode("<div id=\"custom-tabs-three-home-tab\" data-toggle=\"pill\" href=\"#custom-tabs-three-home\" role=\"tab\" aria-controls=\"custom-tabs-three-home\" aria-selected=\"true\" class=\"nav-link\" data-v-46941cb2>", "</div>", [_vm._t("label", [_vm._t("label_" + tab, [_vm._v("\n                            " + _vm._s(tab) + "\n                        ")], {
      "label": tab
    })], {
      "label": tab
    })], 2)]);
  }), 0)]), _vm._ssrNode(" "), _vm._ssrNode("<div" + _vm._ssrClass(null, _vm.noborder ? '' : 'card-body') + " data-v-46941cb2>", "</div>", [_vm._ssrNode("<div id=\"custom-tabs-three-tabContent\" class=\"tab-content\" data-v-46941cb2>", "</div>", _vm._l(_vm.tabs, function (tab, index) {
    return _vm._ssrNode("<div id=\"custom-tabs-three-home\" role=\"tabpanel\" aria-labelledby=\"custom-tabs-three-home-tab\" class=\"tab-pane fade active show\" data-v-46941cb2>", "</div>", [_vm._ssrNode("<div" + _vm._ssrStyle(null, null, {
      display: _vm.value == tab ? '' : 'none'
    }) + " data-v-46941cb2>", "</div>", [_vm._t(tab, null, {
      "selected": _vm.selected
    })], 2)]);
  }), 0)]), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"card-footer d-flex justify-content-end\" data-v-46941cb2>", "</div>", [_vm._t("footer")], 2)], 2);
};

var __vue_staticRenderFns__$b = [];
/* style */

var __vue_inject_styles__$b = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-46941cb2_0", {
    source: ".noselect[data-v-46941cb2]{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.nav-item[data-v-46941cb2]{cursor:pointer}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$b = "data-v-46941cb2";
/* module identifier */

var __vue_module_identifier__$b = "data-v-46941cb2";
/* functional template */

var __vue_is_functional_template__$b = false;
/* style inject shadow dom */

var __vue_component__$b = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, undefined, createInjectorSSR, undefined);//
//
//
//
//
//
var script$c = {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      show_value: this.value,
      intervaler: null,
      milseconds: 1000,
      steps: 10
    };
  },
  methods: {
    runIncreaser: function runIncreaser() {
      this.show_value = 0;
      clearInterval(this.intervaler);
      this.intervaler = setInterval(this.increment, this.milseconds / this.steps);
    },
    increment: function increment(args) {
      var current_step = Math.abs(Math.ceil(this.value / this.steps));

      if (current_step <= 0) {
        current_step = 1;
      }

      if (this.show_value + current_step >= this.value) {
        this.show_value = this.value;
      } else {
        this.show_value += current_step;
      }
    }
  },
  watch: {
    value: function value(_value) {
      console.log("hey!");
      this.runIncreaser();
    }
  }
};/* script */
var __vue_script__$c = script$c;
/* template */

var __vue_render__$c = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', [_vm._t("default", [_vm._v(_vm._s(_vm.show_value))], {
    "show_value": _vm.show_value
  })], 2);
};

var __vue_staticRenderFns__$c = [];
/* style */

var __vue_inject_styles__$c = undefined;
/* scoped */

var __vue_scope_id__$c = undefined;
/* module identifier */

var __vue_module_identifier__$c = "data-v-3dacd4a2";
/* functional template */

var __vue_is_functional_template__$c = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$c = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, undefined, undefined, undefined);/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,PreviewFile: __vue_component__,PersonalSample: __vue_component__$1,DataTable: __vue_component__$6,ModalComponent: __vue_component__$7,Paginate: __vue_component__$8,CheckableItem: __vue_component__$2,DropDown: __vue_component__$3,DropDownItem: __vue_component__$4,DataTable2: __vue_component__$a,ConfigColumns: __vue_component__$a,Tab: __vue_component__$b,Increaser: __vue_component__$c});var install = function installPersonal(Vue) {
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
exports.CheckableItem=__vue_component__$2;exports.ConfigColumns=__vue_component__$a;exports.DataTable=__vue_component__$6;exports.DataTable2=__vue_component__$a;exports.DropDown=__vue_component__$3;exports.DropDownItem=__vue_component__$4;exports.Increaser=__vue_component__$c;exports.ModalComponent=__vue_component__$7;exports.Paginate=__vue_component__$8;exports.PersonalSample=__vue_component__$1;exports.PreviewFile=__vue_component__;exports.Tab=__vue_component__$b;exports.default=plugin;