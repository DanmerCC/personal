//
//
//
//
//
//
//
//
//
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
      console.log(e);
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
  inject("data-v-51e2b6a2_0", {
    source: ".dropzone[data-v-51e2b6a2]{width:100%;height:150px;border:solid grey 1px;border-radius:10px;border-spacing:4px;display:flex;justify-content:center;align-items:center;cursor:pointer;border-style:dashed}.close-button[data-v-51e2b6a2]{position:absolute;left:100%;transform:translate(-170%)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-51e2b6a2";
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

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PreviewFile: __vue_component__,
    PersonalSample: __vue_component__$1
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
export { __vue_component__$1 as PersonalSample, __vue_component__ as PreviewFile };
