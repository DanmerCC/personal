import _ from 'lodash';

//
//
//
//
//
//
//
//
//
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
      default: () => ['application/pdf']
    },
    value: {
      default: null
    }
  },

  data() {
    return {
      file: null,
      files: [],
      indrag: false,
      b64src: null
    };
  },

  methods: {
    clear() {
      this.$refs.filecontent.value = null;
      this.$nextTick(() => {
        this.b64src = null;
      });
      this.$emit('clear');
    },

    handleClick($event) {
      this.$refs.filecontent.click();
    },

    handleDrop(event) {
      const {
        files
      } = event.dataTransfer ? event.dataTransfer : this.$refs.filecontent;

      if (files.length > 1) {
        alert("Debes seleccionar solo un archivo");
        return;
      }

      this.$refs.filecontent.files = files;
      const fs = this.$refs.filecontent.files;
      this.file = this.$refs.filecontent.files[0];
      const reader = new FileReader();
      reader.onload = this.completeUrl;
      reader.readAsDataURL(new Blob(fs, {
        type: 'application/pdf'
      }));
    },

    completeUrl(e) {
      this.b64src = e.target.result;
    }

  },
  computed: {
    classzone() {
      return '';
    }

  },
  watch: {
    file(value) {
      this.$emit('input', value);
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('input', {
    ref: "filecontent",
    attrs: {
      "type": "file",
      "hidden": ""
    },
    on: {
      "change": _vm.handleDrop
    }
  }), _vm._v(" "), _vm.b64src != null ? _c('div', {
    staticClass: "btn btn-primary close-button",
    on: {
      "click": function ($event) {
        return _vm.clear();
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-window-close"
  })]) : _vm._e(), _vm._v(" "), _vm.b64src == null ? _c('div', {
    class: _vm.classzone + ' dropzone',
    on: {
      "drop": function ($event) {
        $event.preventDefault();
        return _vm.handleDrop($event);
      },
      "dragover": function ($event) {
        $event.preventDefault();
        _vm.indrag = true;
      },
      "dragleave": function ($event) {
        _vm.indrag = false;
      },
      "click": _vm.handleClick
    }
  }, [_vm._v("\n        Arrastre aqui el documento digital\n    ")]) : _c('embed', {
    attrs: {
      "src": _vm.b64src,
      "type": "",
      "width": "100%"
    }
  })]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-1d9f241e_0", {
    source: ".dropzone[data-v-1d9f241e]{width:100%;height:150px;border:solid grey 1px;border-radius:10px;border-spacing:4px;display:flex;justify-content:center;align-items:center;cursor:pointer;border-style:dashed}.close-button[data-v-1d9f241e]{position:absolute;left:100%;transform:translate(-170%)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-1d9f241e";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

var script$1 = {
  name: 'PersonalSample',

  // vue component name
  data() {
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
    changedBy() {
      var _message$amount;

      const {
        message
      } = this;
      if (!message.action) return 'initialized';
      return `${message === null || message === void 0 ? void 0 : message.action} ${(_message$amount = message.amount) !== null && _message$amount !== void 0 ? _message$amount : ''}`.trim();
    }

  },
  methods: {
    increment(arg) {
      const amount = typeof arg !== 'number' ? 1 : arg;
      this.counter += amount;
      this.message.action = 'incremented by';
      this.message.amount = amount;
    },

    decrement(arg) {
      const amount = typeof arg !== 'number' ? 1 : arg;
      this.counter -= amount;
      this.message.action = 'decremented by';
      this.message.amount = amount;
    },

    reset() {
      this.counter = this.initCounter;
      this.message.action = 'reset';
      this.message.amount = null;
    }

  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "personal-sample"
  }, [_c('p', [_vm._v("The counter was " + _vm._s(_vm.changedBy) + " to "), _c('b', [_vm._v(_vm._s(_vm.counter))]), _vm._v(".")]), _vm._v(" "), _c('button', {
    on: {
      "click": _vm.increment
    }
  }, [_vm._v("\n    Click +1\n  ")]), _vm._v(" "), _c('button', {
    on: {
      "click": _vm.decrement
    }
  }, [_vm._v("\n    Click -1\n  ")]), _vm._v(" "), _c('button', {
    on: {
      "click": function ($event) {
        return _vm.increment(5);
      }
    }
  }, [_vm._v("\n    Click +5\n  ")]), _vm._v(" "), _c('button', {
    on: {
      "click": function ($event) {
        return _vm.decrement(5);
      }
    }
  }, [_vm._v("\n    Click -5\n  ")]), _vm._v(" "), _c('button', {
    on: {
      "click": _vm.reset
    }
  }, [_vm._v("\n    Reset\n  ")])]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-58f9674e_0", {
    source: ".personal-sample[data-v-58f9674e]{display:block;width:400px;margin:25px auto;border:1px solid #ccc;background:#eaeaea;text-align:center;padding:25px}.personal-sample p[data-v-58f9674e]{margin:0 0 1em}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = "data-v-58f9674e";
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

//
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
    handleChange() {
      this.$emit('change', this.ischecked, this.value);
    }

  },

  data() {
    return {
      ischecked: this.checked
    };
  },

  watch: {
    checked(value) {
      this.ischecked = value;
    }

  },
  computed: {
    inputStyles() {
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

  mounted() {}

};

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
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
  });
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = function (inject) {
  if (!inject) return;
  inject("data-v-313bc5bd_0", {
    source: "input[data-v-313bc5bd]{max-width:60px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$2 = "data-v-313bc5bd";
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$3 = {};

/* script */
const __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "btn-group border border-dark rounded-lg "
  }, [_vm._t("primary"), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "dropdown-menu",
    staticStyle: {
      "position": "absolute",
      "transform": "translate3d(89px, 34px, 0px)",
      "top": "0px",
      "left": "0px",
      "will-change": "transform"
    },
    attrs: {
      "x-placement": "bottom-start"
    }
  }, [_vm._t("default")], 2)], 2);
};

var __vue_staticRenderFns__$3 = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('button', {
    staticClass: "btn btn-secondary dropdown-toggle dropdown-toggle-split",
    attrs: {
      "type": "button",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false"
    }
  }, [_c('span', {
    staticClass: "sr-only"
  }, [_vm._v("Toggle Dropdown")])]);
}];
/* style */

const __vue_inject_styles__$3 = function (inject) {
  if (!inject) return;
  inject("data-v-fdb8d84c_0", {
    source: ".btn-group.border.border-dark.rounded-lg[data-v-fdb8d84c]{width:100%}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$3 = "data-v-fdb8d84c";
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
var script$4 = {};

/* script */
const __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "dropdown-item"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$4 = [];
/* style */

const __vue_inject_styles__$4 = undefined;
/* scoped */

const __vue_scope_id__$4 = undefined;
/* module identifier */

const __vue_module_identifier__$4 = undefined;
/* functional template */

const __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$5 = {};

/* script */
const __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', [_c('div', {
    staticClass: "dropdown"
  }, [_c('div', {
    staticClass: "dd-button"
  }, [_vm._t("primary")], 2), _vm._v(" "), _c('input', {
    staticClass: "dd-input",
    attrs: {
      "type": "checkbox",
      "id": "test"
    }
  }), _vm._v(" "), _c('ul', {
    staticClass: "dd-menu"
  }, [_vm._t("items")], 2)])]);
};

var __vue_staticRenderFns__$5 = [];
/* style */

const __vue_inject_styles__$5 = function (inject) {
  if (!inject) return;
  inject("data-v-33e3703b_0", {
    source: "a[data-v-33e3703b]{text-decoration:none;color:#000}a[data-v-33e3703b]:hover{color:#222}.dropdown[data-v-33e3703b]{display:inline-block;position:relative}.dd-button[data-v-33e3703b]{display:inline-block;border:1px solid gray;border-radius:4px;padding:10px 30px 10px 20px;background-color:#fff;cursor:pointer;white-space:nowrap}.dd-button[data-v-33e3703b]:after{content:'';position:absolute;top:50%;right:15px;transform:translateY(-50%);width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000}.dd-button[data-v-33e3703b]:hover{background-color:#eee}.dd-input[data-v-33e3703b]{display:none}.dd-menu[data-v-33e3703b]{position:absolute;top:100%;border:1px solid #ccc;border-radius:4px;padding:0;margin:2px 0 0 0;box-shadow:0 0 6px 0 rgba(0,0,0,.1);background-color:#fff;list-style-type:none}.dd-input+.dd-menu[data-v-33e3703b]{display:none}.dd-input:checked+.dd-menu[data-v-33e3703b]{display:block}.dd-menu li[data-v-33e3703b]{padding:10px 20px;cursor:pointer;white-space:nowrap}.dd-menu li[data-v-33e3703b]:hover{background-color:#f6f6f6}.dd-menu li a[data-v-33e3703b]{display:block;margin:-10px -20px;padding:10px 20px}.dd-menu li.divider[data-v-33e3703b]{padding:0;border-bottom:1px solid #ccc}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$5 = "data-v-33e3703b";
/* module identifier */

const __vue_module_identifier__$5 = undefined;
/* functional template */

const __vue_is_functional_template__$5 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, createInjector, undefined, undefined);

//
var script$6 = {
  components: {
    'checkable-item': __vue_component__$2,
    'drop-down': __vue_component__$3,
    'drop-down-item': __vue_component__$4,
    'drop-down2': __vue_component__$5
  },
  props: {
    columns: {
      default: () => []
    },
    inload: {
      default: false
    },
    items: {
      default: () => []
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
    },
    rowClassRender: {
      type: Function,
      default: (row, inhover) => ''
    }
  },

  data() {
    return {
      dpage: this.page,
      dlimit: this.limit,
      selectable: this.select,
      selecteds: [],
      pkeyRowHover: null,
      columnsSelecteds: this.addOrderIndexColumns(this.columns),
      showConfigTable: false,
      loading: this.inload,
      loadingtext: 'Cargando ...'
    };
  },

  methods: {
    getDataFromTable() {
      var header = this.$refs.domref.querySelectorAll('thead tr');
      var last_tr = header[header.length - 1];
      var th_headers = last_tr.querySelectorAll('th');
      var text_headers = [];
      th_headers.forEach(x => text_headers.push(x.innerHTML.trim())); //now get text in cells

      var tr_ows = this.$refs.domref.querySelectorAll('tbody tr.row-selected');
      var data_array = [];
      tr_ows.forEach(z => {
        var temp_row = [];
        var row_tds = z.querySelectorAll('td');
        row_tds.forEach(z => {
          var childtype = z.childNodes.length;

          if (z.innerHTML.indexOf("word") != -1) {
            temp_row.push('node');
          } else {
            temp_row.push(z.innerHTML.replace(/<[^>]*>?/gm, '').trim());
          }
        });
        data_array.push(temp_row);
      });
      return [text_headers, ...data_array];
    },

    excelformat(result_table, isobject = true) {
      var lineArray = [];
      result_table.forEach(function (infoArray, index) {
        var line = (isobject ? Object.values(infoArray) : infoArray).join(" \t");
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

    csv(tabledata) {
      let csvContent = "data:text/csv;charset=utf-8,";
      let data = tabledata.slice();
      data.forEach(function (rowArray) {
        let row = Object.values(rowArray).join(";");
        csvContent += row + "\r\n";
      });
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "ddata.csv");
      document.body.appendChild(link);
      link.click();
    },

    cleanSelecteds() {
      this.selecteds = [];
    },

    updateSelectedForce() {
      let backlist = this.selecteds.filter(x => !this.idsItems.includes(x[this.pkey]));
      this.selecteds = this.items.filter(x => this.idsSelecteds.includes(x[this.pkey]));
      this.selecteds.push(...backlist);
    },

    handleRowClick(item) {
      if (this.rowclickeable) this.$emit("rowclick", item);
    },

    handleCheck($event, columna) {},

    isHover(pkey) {
      return this.pkeyRowHover == pkey;
    },

    handle(keyselected) {
      this.pkeyRowHover = keyselected;
    },

    unSelectPage() {
      this.selecteds = this.selecteds.filter(x => !this.idsItems.includes(x[this.pkey]));
    },

    selectAllPage() {
      this.selecteds.push(...this.items.filter(x => {
        return !this.idsSelecteds.includes(x[this.pkey]) && !x.noselect;
      }));
    },

    isSelected(item) {
      return this.selecteds.filter(x => x[this.pkey] == item[this.pkey]).length > 0;
    },

    handleSelect($event, item) {
      if ($event) {
        this.addSelectedList(item);
      } else {
        this.removeSelectedList(item);
      }
    },

    addSelectedList(item) {
      this.selecteds.push(item);
    },

    removeSelectedList(item) {
      this.selecteds = this.selecteds.filter(x => x[this.pkey] != item[this.pkey]);
    },

    interpret(item, column) {
      if (column == "this") {
        return item;
      }

      let tempobject = item;
      let nodes = column.value.split(".");
      let detectUndefined = false;
      nodes.forEach(ele => {
        if (typeof tempobject[ele] == "undefined") {
          detectUndefined = true;
        }

        tempobject = tempobject[ele];
      });
      return detectUndefined ? item : tempobject;
    },

    intersect(item, column) {
      return item[column.value.split(".")[0]];
    },

    addOrderIndexColumns(items) {
      for (let yy = 0; yy < items.length; yy++) {
        items[yy]["order"] = yy + 1;
      }

      return items;
    }

  },
  computed: {
    classIsLoad() {
      return this.inload ? 'loading' : '';
    },

    columnsSelectedsInOrder() {
      return _.orderBy(this.columnsSelecteds, "order");
    },

    idsItems() {
      return this.items.map(x => x[this.pkey]);
    },

    idsSelecteds() {
      return this.selecteds.map(x => x[this.pkey]);
    },

    responsiveclass() {
      var classbase = " ";

      if (this.responsive) {
        classbase += "scrollable-y ";
      }

      return classbase;
    },

    haveSomeUnselected() {
      //if(this.selecteds.length==0)return true
      let count = 0;
      let count_selectables = this.items.filter(x => !x.noselect).length;
      this.items.forEach(i => {
        if (this.selectable) {
          if (this.idsSelecteds.includes(i[this.pkey]) && !i.noselect) {
            count++;
          }
        } else {
          if (this.idsSelecteds.includes(i[this.pkey])) {
            count++;
          }
        }
      });
      return count < (this.selectable ? count_selectables : this.items.length);
    }

  },
  watch: {
    inload(value) {
      this.loading = value;
    },

    page() {
      this.$emit("update:page", this.dpage);
    },

    selecteds(value) {
      this.$emit("update:selected", this.selecteds);
    },

    columnsSelecteds() {
      this.$emit("update:columselecteds", this.columnsSelecteds);
    },

    columns(value) {
      this.columnsSelecteds = this.addOrderIndexColumns(value);
    }

  },

  mounted() {
    this.$emit("update:columselecteds", this.columnsSelecteds);
  }

};

/* script */
const __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: 'card ' + _vm.responsiveclass + ' ' + (_vm.inload ? 'loading' : ''),
    style: {
      '--loadingtext': _vm.loadingtext
    }
  }, [_c('div', {
    staticClass: "container-fluid"
  }, [_c('div', {
    staticClass: "row align-items-center head-options"
  }, [_c('div', {
    staticClass: "col-11 text-center"
  }, [_c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.selectable,
      expression: "selectable"
    }]
  }, [_vm._v(_vm._s(_vm.selecteds.length) + " Seleccionados")])]), _vm._v(" "), _c('div', {
    staticClass: "col-1 config-icon text-right"
  }, [_c('i', {
    staticClass: "fa fa-cog",
    attrs: {
      "aria-hidden": "true"
    },
    on: {
      "click": function ($event) {
        _vm.showConfigTable = true;
      }
    }
  })])])]), _vm._v(" "), _c('table', {
    ref: "domref",
    staticClass: "table table-responsive-sm table-sm"
  }, [_c('thead', [_vm.selectable ? _c('tr', [_c('th', {
    staticClass: "select-td "
  }, [_vm.haveSomeUnselected || _vm.selecteds.length == 0 ? _c('button', {
    staticClass: "btn btn-sm",
    on: {
      "click": function ($event) {
        return _vm.selectAllPage();
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-check-square fa-2",
    attrs: {
      "aria-hidden": "true"
    }
  })]) : _c('button', {
    staticClass: "btn btn-sm btn-secondary",
    on: {
      "click": function ($event) {
        return _vm.unSelectPage();
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-check-square fa-2",
    attrs: {
      "aria-hidden": "true"
    }
  })])]), _vm._v(" "), _c('th', {
    attrs: {
      "colspan": _vm.columnsSelectedsInOrder.length + (_vm.actioncolumn ? 2 : 1)
    }
  }, [_vm._t("top-options", null, {
    "selecteds": _vm.selecteds
  }), _vm._v(" "), _vm.selecteds.length > 0 ? _c('a', {
    attrs: {
      "href": "#",
      "width": "30px"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.csv(_vm.getDataFromTable());
      }
    }
  }, [_vm._v("\n              csv\n            ")]) : _vm._e(), _vm._v(" "), _vm.selecteds.length > 0 ? _c('a', {
    attrs: {
      "href": "#",
      "width": "30px"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.excelformat(_vm.getDataFromTable(), false);
      }
    }
  }, [_vm._v("\n              xls\n            ")]) : _vm._e()], 2)]) : _vm._e(), _vm._v(" "), _c('tr', [_vm.selectable ? _c('th', {
    staticClass: "select-td"
  }, [_vm._v("Seleccion")]) : _vm._e(), _vm._v(" "), _vm._l(_vm.columnsSelectedsInOrder, function (column) {
    return _c('th', {
      key: column.order
    }, [_vm._t('column_' + column.value, [[_vm._v("\n            " + _vm._s(column.name) + "\n          ")]], {
      "column": column
    })], 2);
  }), _vm._v(" "), _vm.actioncolumn ? _c('th', {
    staticClass: "medium-td"
  }, [_vm._v("Mas")]) : _vm._e()], 2)]), _vm._v(" "), _c('tbody', [_vm._l(_vm.items, function (item) {
    return _c('tr', {
      key: item.order,
      class: (_vm.isSelected(item) ? 'row-selected ' : '') + _vm.rowClassRender(item, item[_vm.pkey] == _vm.pkeyRowHover),
      on: {
        "mouseover": function ($event) {
          return _vm.handle(item[_vm.pkey]);
        },
        "mouseleave": function ($event) {
          _vm.pkeyRowHover = null;
        }
      }
    }, [_vm.selectable ? _c('td', {
      staticClass: "select-td"
    }, [_c('checkable-item', {
      ref: "rowselectbox",
      refInFor: true,
      attrs: {
        "checked": _vm.isSelected(item),
        "value": item
      },
      on: {
        "change": _vm.handleSelect
      }
    })], 1) : _vm._e(), _vm._v(" "), _vm._l(_vm.columnsSelectedsInOrder, function (c) {
      return _c('td', {
        key: c.order,
        on: {
          "click": function ($event) {
            return _vm.handleRowClick(item);
          }
        }
      }, [_vm._t(c.value, [_vm._t("cell", [[_vm._v("\n                " + _vm._s(_vm.interpret(item, c)) + "\n              ")]], {
        "row": item,
        "column": c,
        "item": _vm.interpret(item, c)
      })], {
        "item": _vm.interpret(item, c),
        "row": item,
        "hover": _vm.isHover(item[_vm.pkey])
      })], 2);
    }), _vm._v(" "), _vm.actioncolumn ? _c('td', [_vm._t("action", [_vm._v("\n            --\n          ")], {
      "item": item,
      "row": item,
      "hover": _vm.isHover(item[_vm.pkey])
    })], 2) : _vm._e()], 2);
  }), _vm._v(" "), _vm.items.length == 0 ? _c('tr', {
    staticClass: "select-td text-center"
  }, [_vm.selectable ? _c('td') : _vm._e(), _vm._v(" "), _c('td', {
    attrs: {
      "colspan": _vm.columnsSelecteds.length
    }
  }, [_vm._v("No hay datos")])]) : _vm._e()], 2)]), _vm._v(" "), _vm._t("paginate", null, {
    "perpage": _vm.limit
  }), _vm._v(" "), _vm.showConfigTable ? _c('modal-component', {
    attrs: {
      "title": "Configuracion de columnas"
    },
    on: {
      "close": function ($event) {
        _vm.showConfigTable = false;
      }
    },
    scopedSlots: _vm._u([{
      key: "body",
      fn: function () {
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
  }) : _vm._e(), _vm._v(" "), _vm._t("append")], 2);
};

var __vue_staticRenderFns__$6 = [];
/* style */

const __vue_inject_styles__$6 = function (inject) {
  if (!inject) return;
  inject("data-v-e71baba8_0", {
    source: ".loading[data-v-e71baba8]{overflow:hidden}.loading[data-v-e71baba8]::before{content:'Cargando ..';display:block;text-align:center;font-family:Tahoma,sans-serif;font-size:24px;color:#eee;position:absolute;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,.6);top:50%;transform:translateY(-50%);height:20000px;line-height:20000px}tbody[data-v-e71baba8]{font-size:10px;font-weight:700}table[data-v-e71baba8]{max-height:250px;overflow:scroll}input[data-v-e71baba8]{height:17px}.scrollable-y[data-v-e71baba8]{overflow-y:auto}.select-td[data-v-e71baba8]{width:60px}.medium-td[data-v-e71baba8]{max-width:120px}.no-space-left[data-v-e71baba8]{padding-left:1px}.config-icon[data-v-e71baba8]{padding-left:0}.config-icon>i[data-v-e71baba8]{padding-top:10px}.col-1.config-icon.text-right[data-v-e71baba8]{padding-right:0}tr[data-v-e71baba8]:hover{background:linear-gradient(5deg,#efefefab 10%,#adadad26 90%)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$6 = "data-v-e71baba8";
/* module identifier */

const __vue_module_identifier__$6 = undefined;
/* functional template */

const __vue_is_functional_template__$6 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

  data() {
    return {
      windowHeight: window.innerHeight
    };
  },

  methods: {
    close() {
      this.$emit("close");
    },

    closeBackdrop() {
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
    modalSizeClasses() {
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
};

/* script */
const __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function () {
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
      "click": function ($event) {
        $event.stopPropagation();
      }
    }
  }, [_c('div', {
    class: 'modal-dialog ' + _vm.modalSizeClasses,
    attrs: {
      "role": "document"
    },
    on: {
      "click": function ($event) {
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
  }, [_vm._t("body")], 2), _vm._v(" "), _vm._t("modal-footer", [_c('div', {
    staticClass: "modal-footer"
  }, [_vm._t("footer"), _vm._v(" "), _c('button', {
    staticClass: "btn btn-secondary",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function ($event) {
        return _vm.close();
      }
    }
  }, [_vm._v("\n                  " + _vm._s(_vm.labelCancel) + "\n                ")])], 2)])], 2)])], 2)]), _vm._v(" "), _c('div', {
    staticClass: "modal-backdrop show"
  })])]);
};

var __vue_staticRenderFns__$7 = [];
/* style */

const __vue_inject_styles__$7 = function (inject) {
  if (!inject) return;
  inject("data-v-9d76b5a6_0", {
    source: ".modal-content[data-v-9d76b5a6]{overflow:scroll}.modal-xl[data-v-9d76b5a6]{width:90%;max-width:1200px}.unspace[data-v-9d76b5a6]{height:0}.breadcrumb-menu .btn[data-v-9d76b5a6]{color:#fff}.breadcrumb-menu .btn[data-v-9d76b5a6]:hover{color:#6c757d}.modal-title[data-v-9d76b5a6]{color:#6c757d}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$7 = "data-v-9d76b5a6";
/* module identifier */

const __vue_module_identifier__$7 = undefined;
/* functional template */

const __vue_is_functional_template__$7 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, createInjector, undefined, undefined);

//
//
//
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
    nextPage(topage) {
      if (topage <= 0) {
        return;
      }

      this.$emit('change', topage);
    }

  }
};

/* script */
const __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('nav', [_c('ul', {
    staticClass: "pagination"
  }, [_c('li', {
    class: _vm.value - 2 < 0 ? 'page-item disabled' : 'page-item',
    attrs: {
      "disabled": true
    },
    on: {
      "click": function ($event) {
        return _vm.nextPage(_vm.value - 1);
      }
    }
  }, [_c('span', {
    staticClass: "page-link"
  }, [_vm._v(" Anterior")])]), _vm._v(" "), _vm.value - 1 > 0 ? _c('li', {
    staticClass: "page-item",
    on: {
      "click": function ($event) {
        return _vm.nextPage(_vm.value - 1);
      }
    }
  }, [_c('span', {
    staticClass: "page-link"
  }, [_vm._v(" " + _vm._s(_vm.value - 1))])]) : _vm._e(), _vm._v(" "), _c('li', {
    staticClass: "page-item active",
    on: {
      "click": function ($event) {
        return _vm.nextPage(_vm.value);
      }
    }
  }, [_c('span', {
    staticClass: "page-link"
  }, [_vm._v(" " + _vm._s(_vm.value))])]), _vm._v(" "), _c('li', {
    staticClass: "page-item",
    on: {
      "click": function ($event) {
        return _vm.nextPage(_vm.value + 1);
      }
    }
  }, [_c('span', {
    staticClass: "page-link"
  }, [_vm._v(" " + _vm._s(_vm.value + 1))])]), _vm._v(" "), _c('li', {
    staticClass: "page-item",
    on: {
      "click": function ($event) {
        return _vm.nextPage(_vm.value + 1);
      }
    }
  }, [_c('span', {
    staticClass: "page-link"
  }, [_vm._v(" Siguiente")])])])]);
};

var __vue_staticRenderFns__$8 = [];
/* style */

const __vue_inject_styles__$8 = function (inject) {
  if (!inject) return;
  inject("data-v-12bc7998_0", {
    source: "li.page-item[data-v-12bc7998]{cursor:pointer}li.page-item.disabled[data-v-12bc7998]{cursor:not-allowed}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$8 = "data-v-12bc7998";
/* module identifier */

const __vue_module_identifier__$8 = undefined;
/* functional template */

const __vue_is_functional_template__$8 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$8 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, createInjector, undefined, undefined);

//
var script$9 = {
  components: {
    ModalComponent: __vue_component__$7
  },
  name: 'config-columns',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      columnconfig: this.value,
      configuring: false
    };
  },

  methods: {
    saveChanges() {
      this.columnconfig = this.value;
      this.configuring = false;
      this.$emit('input', this.columnconfig);
    }

  }
};

/* script */
const __vue_script__$9 = script$9;
/* template */

var __vue_render__$9 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', [_c('button', {
    on: {
      "click": function ($event) {
        _vm.configuring = true;
      }
    }
  }, [_vm._v("Configurar")]), _vm._v(" "), _vm.configuring == true ? _c('modal-component', {
    on: {
      "close": function ($event) {
        _vm.configuring = false;
      }
    },
    scopedSlots: _vm._u([{
      key: "body",
      fn: function () {
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
              "change": function ($event) {
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
      fn: function () {
        return [_c('button', {
          on: {
            "click": function ($event) {
              return _vm.saveChanges();
            }
          }
        }, [_vm._v("Guardar")])];
      },
      proxy: true
    }], null, false, 381324891)
  }) : _vm._e()], 1);
};

var __vue_staticRenderFns__$9 = [];
/* style */

const __vue_inject_styles__$9 = undefined;
/* scoped */

const __vue_scope_id__$9 = undefined;
/* module identifier */

const __vue_module_identifier__$9 = undefined;
/* functional template */

const __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$9 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);

//
var script$a = {
  components: {
    ModalComponent: __vue_component__$7,
    'config-columns': __vue_component__$9
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    select: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      allselected: false,
      internal_columns: this.columns,
      internal_items: this.items,
      inconfig: true
    };
  },

  computed: {
    selecteds() {
      return internal_columns.filter(x => !x.hidden);
    },

    visibleColumns() {
      return this.internal_columns.filter(x => !x.hidden);
    },

    visibilityColumns: {
      get() {
        return this.internal_columns.map(x => {
          x.visible = !x.hidden;
          return x;
        });
      },

      set(value) {
        this.internal_columns = value.map(x => {
          x.hidden = !x.visible;
          return x;
        });
      }

    }
  },
  watch: {
    allselected(value) {
      this.internal_items = this.internal_items.map(x => {
        x.select = value;
        return x;
      });
    }

  },
  filters: {
    onlyVisible: function (list) {
      return list.filter(x => x.visible);
    }
  },
  methods: {
    interpret(item, column) {
      if (column == "this") {
        return item;
      }

      let tempobject = item;
      let nodes = column.value.split(".");
      let detectUndefined = false;
      nodes.forEach(ele => {
        if (typeof tempobject[ele] == "undefined") {
          detectUndefined = true;
        }

        tempobject = tempobject[ele];
      });
      return detectUndefined ? item : tempobject;
    }

  }
};

/* script */
const __vue_script__$a = script$a;
/* template */

var __vue_render__$a = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', [_c('table', [_c('thead', [_c('tr', [_c('th', {
    attrs: {
      "colspan": _vm.columns.length + 1
    }
  }, [_c('button', {
    staticClass: "btn btn-primary"
  }, [_vm._v("Opcion")])])]), _vm._v(" "), _c('tr', [_vm.select ? _c('th', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.allselected,
      expression: "allselected"
    }],
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.allselected) ? _vm._i(_vm.allselected, null) > -1 : _vm.allselected
    },
    on: {
      "change": function ($event) {
        var $$a = _vm.allselected,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;

        if (Array.isArray($$a)) {
          var $$v = null,
              $$i = _vm._i($$a, $$v);

          if ($$el.checked) {
            $$i < 0 && (_vm.allselected = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.allselected = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.allselected = $$c;
        }
      }
    }
  })]) : _vm._e(), _vm._v(" "), _vm._l(_vm.visibleColumns, function (column, index) {
    return _c('th', {
      key: index
    }, [_vm._v("\n                    " + _vm._s(column.name) + "\n                ")]);
  })], 2)]), _vm._v(" "), _c('tbody', _vm._l(_vm.internal_items, function (item, index) {
    return _c('tr', {
      key: index
    }, [_vm.select ? _c('td', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: item.select,
        expression: "item.select"
      }],
      ref: "select",
      refInFor: true,
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": Array.isArray(item.select) ? _vm._i(item.select, null) > -1 : item.select
      },
      on: {
        "change": function ($event) {
          var $$a = item.select,
              $$el = $event.target,
              $$c = $$el.checked ? true : false;

          if (Array.isArray($$a)) {
            var $$v = null,
                $$i = _vm._i($$a, $$v);

            if ($$el.checked) {
              $$i < 0 && _vm.$set(item, "select", $$a.concat([$$v]));
            } else {
              $$i > -1 && _vm.$set(item, "select", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _vm.$set(item, "select", $$c);
          }
        }
      }
    })]) : _vm._e(), _vm._v(" "), _vm._l(_vm.visibleColumns, function (col, index) {
      return _c('td', {
        key: index
      }, [_vm._t(col.value, [_vm._v("\n                        " + _vm._s(_vm.interpret(item, col)) + "\n                    ")], {
        "cel": _vm.interpret(item, col),
        "row": item
      })], 2);
    })], 2);
  }), 0)]), _vm._v(" "), _c('config-columns', {
    model: {
      value: _vm.visibilityColumns,
      callback: function ($$v) {
        _vm.visibilityColumns = $$v;
      },
      expression: "visibilityColumns"
    }
  })], 1);
};

var __vue_staticRenderFns__$a = [];
/* style */

const __vue_inject_styles__$a = function (inject) {
  if (!inject) return;
  inject("data-v-573ae1a4_0", {
    source: "table[data-v-573ae1a4],td[data-v-573ae1a4],th[data-v-573ae1a4],tr[data-v-573ae1a4]{border:solid #000 1px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$a = "data-v-573ae1a4";
/* module identifier */

const __vue_module_identifier__$a = undefined;
/* functional template */

const __vue_is_functional_template__$a = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$a = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      default: () => []
    },
    value: null,
    noborder: {
      default: false
    }
  },

  data() {
    return {
      selected: this.value
    };
  },

  methods: {
    handleClickTab($event, tab) {
      this.$emit('input', tab);
    }

  }
};

/* script */
const __vue_script__$b = script$b;
/* template */

var __vue_render__$b = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "card card-primary card-outline card-tabs"
  }, [_c('div', {
    staticClass: "card-header p-0 pt-1 border-bottom-0"
  }, [_c('ul', {
    staticClass: "nav nav-tabs",
    attrs: {
      "id": "custom-tabs-three-tab",
      "role": "tablist"
    }
  }, _vm._l(_vm.tabs, function (tab, index) {
    return _c('li', {
      key: index,
      staticClass: "nav-item noselect",
      on: {
        "click": function ($event) {
          return _vm.handleClickTab($event, tab);
        }
      }
    }, [_vm.value == tab ? _c('div', {
      staticClass: "nav-link active",
      attrs: {
        "id": "custom-tabs-three-home-tab",
        "data-toggle": "pill",
        "href": "#custom-tabs-three-home",
        "role": "tab",
        "aria-controls": "custom-tabs-three-home",
        "aria-selected": "true"
      }
    }, [_vm._t("label", [_vm._t("label_" + tab, [_vm._v("\n                            " + _vm._s(tab) + "\n                        ")], {
      "label": tab
    })], {
      "label": tab
    })], 2) : _c('div', {
      staticClass: "nav-link",
      attrs: {
        "id": "custom-tabs-three-home-tab",
        "data-toggle": "pill",
        "href": "#custom-tabs-three-home",
        "role": "tab",
        "aria-controls": "custom-tabs-three-home",
        "aria-selected": "true"
      }
    }, [_vm._t("label", [_vm._t("label_" + tab, [_vm._v("\n                            " + _vm._s(tab) + "\n                        ")], {
      "label": tab
    })], {
      "label": tab
    })], 2)]);
  }), 0)]), _vm._v(" "), _c('div', {
    class: _vm.noborder ? '' : 'card-body'
  }, [_c('div', {
    staticClass: "tab-content",
    attrs: {
      "id": "custom-tabs-three-tabContent"
    }
  }, _vm._l(_vm.tabs, function (tab, index) {
    return _c('div', {
      key: index,
      staticClass: "tab-pane fade active show",
      attrs: {
        "id": "custom-tabs-three-home",
        "role": "tabpanel",
        "aria-labelledby": "custom-tabs-three-home-tab"
      }
    }, [_c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.value == tab,
        expression: "value==tab"
      }]
    }, [_vm._t(tab, null, {
      "selected": _vm.selected
    })], 2)]);
  }), 0)]), _vm._v(" "), _c('div', {
    staticClass: "card-footer d-flex justify-content-end"
  }, [_vm._t("footer")], 2)]);
};

var __vue_staticRenderFns__$b = [];
/* style */

const __vue_inject_styles__$b = function (inject) {
  if (!inject) return;
  inject("data-v-46941cb2_0", {
    source: ".noselect[data-v-46941cb2]{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.nav-item[data-v-46941cb2]{cursor:pointer}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$b = "data-v-46941cb2";
/* module identifier */

const __vue_module_identifier__$b = undefined;
/* functional template */

const __vue_is_functional_template__$b = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$b = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, createInjector, undefined, undefined);

//
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

  data() {
    return {
      show_value: this.value,
      intervaler: null,
      milseconds: 1000,
      steps: 10
    };
  },

  methods: {
    runIncreaser() {
      this.show_value = 0;
      clearInterval(this.intervaler);
      this.intervaler = setInterval(this.increment, this.milseconds / this.steps);
    },

    increment(args) {
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
    value(value) {
      this.runIncreaser();
    }

  }
};

/* script */
const __vue_script__$c = script$c;
/* template */

var __vue_render__$c = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', [_vm._t("default", [_vm._v(_vm._s(_vm.show_value))], {
    "show_value": _vm.show_value
  })], 2);
};

var __vue_staticRenderFns__$c = [];
/* style */

const __vue_inject_styles__$c = undefined;
/* scoped */

const __vue_scope_id__$c = undefined;
/* module identifier */

const __vue_module_identifier__$c = undefined;
/* functional template */

const __vue_is_functional_template__$c = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$c = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$d = {
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    child_class: ''
  },

  data() {
    return {
      random_id: Math.floor(Math.random() * 100),
      internal_items: this.items,
      internal_selecteds: this.value
    };
  },

  methods: {
    handleChange($event) {
      var acumulator = [];

      for (let index = 0; index < this.$refs.inputs.length; index++) {
        if (this.$refs.inputs[index].checked) {
          acumulator.push(this.$refs.inputs[index].value);
        }
      }

      this.$emit('input', acumulator);
    }

  }
};

/* script */
const __vue_script__$d = script$d;
/* template */

var __vue_render__$d = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', _vm._l(_vm.internal_items, function (value, index) {
    return _c('div', _vm._b({
      key: index,
      class: _vm.child_class
    }, 'div', _vm.$attrs, false), [_c('label', {
      attrs: {
        "for": _vm.random_id + index + 'chbx'
      }
    }, [_vm._t('label_' + value, [_vm._v("\n                " + _vm._s(value) + "\n            ")], {
      "value": value
    })], 2), _vm._v(" "), _c('input', {
      ref: "inputs",
      refInFor: true,
      attrs: {
        "type": "checkbox",
        "name": "",
        "id": _vm.random_id + index + 'chbx'
      },
      domProps: {
        "value": value,
        "checked": _vm.internal_selecteds.includes(value)
      },
      on: {
        "change": function ($event) {
          return _vm.handleChange($event);
        }
      }
    })]);
  }), 0);
};

var __vue_staticRenderFns__$d = [];
/* style */

const __vue_inject_styles__$d = undefined;
/* scoped */

const __vue_scope_id__$d = undefined;
/* module identifier */

const __vue_module_identifier__$d = undefined;
/* functional template */

const __vue_is_functional_template__$d = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$d = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$e = {
  inheritAttrs: false,
  props: {
    value: {
      default: null
    },
    options: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      text: null
    };
  },

  watch: {
    value(value) {}

  },
  methods: {
    clearBefore() {
      /*this.$emit('input',null)
      this.text = null*/
      this.$nextTick(() => {
        this.$emit('input', null);
      });
    },

    clearVirtualInput(value) {
      this.text = null;
      this.$emit('input', null);
      this.$nextTick(() => {
        this.$refs.myinput.select();
      });
    }

  },
  computed: {
    top() {
      const el = this.$el;
      var rect;

      if (!el) {
        return 0;
      }

      rect = el.getBoundingClientRect();
      return rect.top;
    },

    styleList() {
      return "position:absolute;top:" + this.x + ";width:100%";
    }

  }
};

/* script */
const __vue_script__$e = script$e;
/* template */

var __vue_render__$e = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    on: {
      "keydown": function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) {
          return null;
        }

        return _vm.clearVirtualInput();
      }
    }
  }, [_c('span', _vm._b({}, 'span', _vm.$attrs, false), [_vm.value != null ? _c('span', {
    staticClass: "select_value",
    on: {
      "click": function ($event) {
        return _vm.clearVirtualInput();
      }
    }
  }, [_c('span', {}, [_vm._t("option", [_vm._v("\n          " + _vm._s(_vm.value) + " \n        ")], {
    "option": _vm.value
  })], 2)]) : _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.text,
      expression: "text"
    }],
    ref: "myinput",
    domProps: {
      "value": _vm.text
    },
    on: {
      "input": [function ($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.text = $event.target.value;
      }, function ($event) {
        return _vm.$emit('search', _vm.text);
      }]
    }
  })]), _vm._v(" "), _vm.text != null && _vm.text != '' ? _c('div', {
    staticClass: "listcontainer card",
    style: _vm.styleList,
    attrs: {
      "top": "0"
    },
    on: {
      "mouseleave": function ($event) {
        return _vm.clearBefore();
      }
    }
  }, [_c('ul', _vm._l(_vm.options, function (o, key) {
    return _c('li', {
      key: key,
      on: {
        "click": function ($event) {
          _vm.$emit('input', o);

          _vm.text = '';
        }
      }
    }, [_vm._t("option", [_vm._v("\n            " + _vm._s(o) + "\n          ")], {
      "option": o
    })], 2);
  }), 0)]) : _vm._e()]);
};

var __vue_staticRenderFns__$e = [];
/* style */

const __vue_inject_styles__$e = function (inject) {
  if (!inject) return;
  inject("data-v-2cc42942_0", {
    source: ".select_value[data-v-2cc42942]{min-width:174px;min-height:30px;box-sizing:border-box;-webkit-writing-mode:horizontal-tb!important;text-rendering:auto;color:-internal-light-dark(black,#fff);letter-spacing:normal;word-spacing:normal;text-transform:none;text-indent:0;text-shadow:none;display:inline-block;text-align:start;appearance:auto;background-color:-internal-light-dark(#fff,#3b3b3b);-webkit-rtl-ordering:logical;cursor:text;margin:0;font:400 18.3333px Arial;padding:1px 2px;border-width:1px;border-style:inset;border-color:#000;border-image:initial;border-radius:5%}ul[data-v-2cc42942]{padding:0 0;margin:0}.listcontainer[data-v-2cc42942]{background-color:#fff;max-width:300px;-webkit-box-shadow:4px 7px 18px -2px rgba(0,0,0,.5);box-shadow:4px 7px 18px -2px rgba(0,0,0,.5);z-index:99}li[data-v-2cc42942]:hover{background-color:#fcfafa}li[data-v-2cc42942]{list-style-type:none;padding:4px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$e = "data-v-2cc42942";
/* module identifier */

const __vue_module_identifier__$e = undefined;
/* functional template */

const __vue_is_functional_template__$e = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$e = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, false, createInjector, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PreviewFile: __vue_component__,
    PersonalSample: __vue_component__$1,
    DataTable: __vue_component__$6,
    ModalComponent: __vue_component__$7,
    Paginate: __vue_component__$8,
    CheckableItem: __vue_component__$2,
    DropDown: __vue_component__$3,
    DropDownItem: __vue_component__$4,
    DataTable2: __vue_component__$a,
    ConfigColumns: __vue_component__$a,
    Tab: __vue_component__$b,
    Increaser: __vue_component__$c,
    GroupCheckBox: __vue_component__$d,
    AutoComplete: __vue_component__$e
});

// Import vue components

const install = function installPersonal(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install on non-es builds, when vue is found

export default plugin;
export { __vue_component__$e as AutoComplete, __vue_component__$2 as CheckableItem, __vue_component__$a as ConfigColumns, __vue_component__$6 as DataTable, __vue_component__$a as DataTable2, __vue_component__$3 as DropDown, __vue_component__$4 as DropDownItem, __vue_component__$d as GroupCheckBox, __vue_component__$c as Increaser, __vue_component__$7 as ModalComponent, __vue_component__$8 as Paginate, __vue_component__$1 as PersonalSample, __vue_component__ as PreviewFile, __vue_component__$b as Tab };
