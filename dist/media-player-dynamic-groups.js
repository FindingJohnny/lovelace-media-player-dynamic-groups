/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function t(t, e, i, n) {
  var r,
      s = arguments.length,
      o = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, n);else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (o = (s < 3 ? r(o) : s > 3 ? r(e, i, o) : r(e, i)) || o);return s > 3 && o && Object.defineProperty(e, i, o), o;
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
}const e = "undefined" != typeof window && null != window.customElements && void 0 !== window.customElements.polyfillWrapFlushCallback,
      i = (t, e, i = null) => {
  for (; e !== i;) {
    const i = e.nextSibling;t.removeChild(e), e = i;
  }
},
      n = `{{lit-${String(Math.random()).slice(2)}}}`,
      r = `\x3c!--${n}--\x3e`,
      s = new RegExp(`${n}|${r}`);class o {
  constructor(t, e) {
    this.parts = [], this.element = e;const i = [],
          r = [],
          o = document.createTreeWalker(e.content, 133, null, !1);let l = 0,
        u = -1,
        h = 0;const { strings: p, values: { length: m } } = t;for (; h < m;) {
      const t = o.nextNode();if (null !== t) {
        if (u++, 1 === t.nodeType) {
          if (t.hasAttributes()) {
            const e = t.attributes,
                  { length: i } = e;let n = 0;for (let t = 0; t < i; t++) a(e[t].name, "$lit$") && n++;for (; n-- > 0;) {
              const e = p[h],
                    i = c.exec(e)[2],
                    n = i.toLowerCase() + "$lit$",
                    r = t.getAttribute(n);t.removeAttribute(n);const o = r.split(s);this.parts.push({ type: "attribute", index: u, name: i, strings: o }), h += o.length - 1;
            }
          }"TEMPLATE" === t.tagName && (r.push(t), o.currentNode = t.content);
        } else if (3 === t.nodeType) {
          const e = t.data;if (e.indexOf(n) >= 0) {
            const n = t.parentNode,
                  r = e.split(s),
                  o = r.length - 1;for (let e = 0; e < o; e++) {
              let i,
                  s = r[e];if ("" === s) i = d();else {
                const t = c.exec(s);null !== t && a(t[2], "$lit$") && (s = s.slice(0, t.index) + t[1] + t[2].slice(0, -"$lit$".length) + t[3]), i = document.createTextNode(s);
              }n.insertBefore(i, t), this.parts.push({ type: "node", index: ++u });
            }"" === r[o] ? (n.insertBefore(d(), t), i.push(t)) : t.data = r[o], h += o;
          }
        } else if (8 === t.nodeType) if (t.data === n) {
          const e = t.parentNode;null !== t.previousSibling && u !== l || (u++, e.insertBefore(d(), t)), l = u, this.parts.push({ type: "node", index: u }), null === t.nextSibling ? t.data = "" : (i.push(t), u--), h++;
        } else {
          let e = -1;for (; -1 !== (e = t.data.indexOf(n, e + 1));) this.parts.push({ type: "node", index: -1 }), h++;
        }
      } else o.currentNode = r.pop();
    }for (const t of i) t.parentNode.removeChild(t);
  }
}const a = (t, e) => {
  const i = t.length - e.length;return i >= 0 && t.slice(i) === e;
},
      l = t => -1 !== t.index,
      d = () => document.createComment(""),
      c = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(t, e) {
  const { element: { content: i }, parts: n } = t,
        r = document.createTreeWalker(i, 133, null, !1);let s = p(n),
      o = n[s],
      a = -1,
      l = 0;const d = [];let c = null;for (; r.nextNode();) {
    a++;const t = r.currentNode;for (t.previousSibling === c && (c = null), e.has(t) && (d.push(t), null === c && (c = t)), null !== c && l++; void 0 !== o && o.index === a;) o.index = null !== c ? -1 : o.index - l, s = p(n, s), o = n[s];
  }d.forEach(t => t.parentNode.removeChild(t));
}const h = t => {
  let e = 11 === t.nodeType ? 0 : 1;const i = document.createTreeWalker(t, 133, null, !1);for (; i.nextNode();) e++;return e;
},
      p = (t, e = -1) => {
  for (let i = e + 1; i < t.length; i++) {
    const e = t[i];if (l(e)) return i;
  }return -1;
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const m = new WeakMap(),
      f = t => "function" == typeof t && m.has(t),
      g = {},
      _ = {};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class y {
  constructor(t, e, i) {
    this.__parts = [], this.template = t, this.processor = e, this.options = i;
  }update(t) {
    let e = 0;for (const i of this.__parts) void 0 !== i && i.setValue(t[e]), e++;for (const t of this.__parts) void 0 !== t && t.commit();
  }_clone() {
    const t = e ? this.template.element.content.cloneNode(!0) : document.importNode(this.template.element.content, !0),
          i = [],
          n = this.template.parts,
          r = document.createTreeWalker(t, 133, null, !1);let s,
        o = 0,
        a = 0,
        d = r.nextNode();for (; o < n.length;) if (s = n[o], l(s)) {
      for (; a < s.index;) a++, "TEMPLATE" === d.nodeName && (i.push(d), r.currentNode = d.content), null === (d = r.nextNode()) && (r.currentNode = i.pop(), d = r.nextNode());if ("node" === s.type) {
        const t = this.processor.handleTextExpression(this.options);t.insertAfterNode(d.previousSibling), this.__parts.push(t);
      } else this.__parts.push(...this.processor.handleAttributeExpressions(d, s.name, s.strings, this.options));o++;
    } else this.__parts.push(void 0), o++;return e && (document.adoptNode(t), customElements.upgrade(t)), t;
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const v = ` ${n} `;class S {
  constructor(t, e, i, n) {
    this.strings = t, this.values = e, this.type = i, this.processor = n;
  }getHTML() {
    const t = this.strings.length - 1;let e = "",
        i = !1;for (let s = 0; s < t; s++) {
      const t = this.strings[s],
            o = t.lastIndexOf("\x3c!--");i = (o > -1 || i) && -1 === t.indexOf("--\x3e", o + 1);const a = c.exec(t);e += null === a ? t + (i ? v : r) : t.substr(0, a.index) + a[1] + a[2] + "$lit$" + a[3] + n;
    }return e += this.strings[t], e;
  }getTemplateElement() {
    const t = document.createElement("template");return t.innerHTML = this.getHTML(), t;
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const w = t => null === t || !("object" == typeof t || "function" == typeof t),
      b = t => Array.isArray(t) || !(!t || !t[Symbol.iterator]);class P {
  constructor(t, e, i) {
    this.dirty = !0, this.element = t, this.name = e, this.strings = i, this.parts = [];for (let t = 0; t < i.length - 1; t++) this.parts[t] = this._createPart();
  }_createPart() {
    return new C(this);
  }_getValue() {
    const t = this.strings,
          e = t.length - 1;let i = "";for (let n = 0; n < e; n++) {
      i += t[n];const e = this.parts[n];if (void 0 !== e) {
        const t = e.value;if (w(t) || !b(t)) i += "string" == typeof t ? t : String(t);else for (const e of t) i += "string" == typeof e ? e : String(e);
      }
    }return i += t[e], i;
  }commit() {
    this.dirty && (this.dirty = !1, this.element.setAttribute(this.name, this._getValue()));
  }
}class C {
  constructor(t) {
    this.value = void 0, this.committer = t;
  }setValue(t) {
    t === g || w(t) && t === this.value || (this.value = t, f(t) || (this.committer.dirty = !0));
  }commit() {
    for (; f(this.value);) {
      const t = this.value;this.value = g, t(this);
    }this.value !== g && this.committer.commit();
  }
}class x {
  constructor(t) {
    this.value = void 0, this.__pendingValue = void 0, this.options = t;
  }appendInto(t) {
    this.startNode = t.appendChild(d()), this.endNode = t.appendChild(d());
  }insertAfterNode(t) {
    this.startNode = t, this.endNode = t.nextSibling;
  }appendIntoPart(t) {
    t.__insert(this.startNode = d()), t.__insert(this.endNode = d());
  }insertAfterPart(t) {
    t.__insert(this.startNode = d()), this.endNode = t.endNode, t.endNode = this.startNode;
  }setValue(t) {
    this.__pendingValue = t;
  }commit() {
    if (null === this.startNode.parentNode) return;for (; f(this.__pendingValue);) {
      const t = this.__pendingValue;this.__pendingValue = g, t(this);
    }const t = this.__pendingValue;t !== g && (w(t) ? t !== this.value && this.__commitText(t) : t instanceof S ? this.__commitTemplateResult(t) : t instanceof Node ? this.__commitNode(t) : b(t) ? this.__commitIterable(t) : t === _ ? (this.value = _, this.clear()) : this.__commitText(t));
  }__insert(t) {
    this.endNode.parentNode.insertBefore(t, this.endNode);
  }__commitNode(t) {
    this.value !== t && (this.clear(), this.__insert(t), this.value = t);
  }__commitText(t) {
    const e = this.startNode.nextSibling,
          i = "string" == typeof (t = null == t ? "" : t) ? t : String(t);e === this.endNode.previousSibling && 3 === e.nodeType ? e.data = i : this.__commitNode(document.createTextNode(i)), this.value = t;
  }__commitTemplateResult(t) {
    const e = this.options.templateFactory(t);if (this.value instanceof y && this.value.template === e) this.value.update(t.values);else {
      const i = new y(e, t.processor, this.options),
            n = i._clone();i.update(t.values), this.__commitNode(n), this.value = i;
    }
  }__commitIterable(t) {
    Array.isArray(this.value) || (this.value = [], this.clear());const e = this.value;let i,
        n = 0;for (const r of t) i = e[n], void 0 === i && (i = new x(this.options), e.push(i), 0 === n ? i.appendIntoPart(this) : i.insertAfterPart(e[n - 1])), i.setValue(r), i.commit(), n++;n < e.length && (e.length = n, this.clear(i && i.endNode));
  }clear(t = this.startNode) {
    i(this.startNode.parentNode, t.nextSibling, this.endNode);
  }
}class N {
  constructor(t, e, i) {
    if (this.value = void 0, this.__pendingValue = void 0, 2 !== i.length || "" !== i[0] || "" !== i[1]) throw new Error("Boolean attributes can only contain a single expression");this.element = t, this.name = e, this.strings = i;
  }setValue(t) {
    this.__pendingValue = t;
  }commit() {
    for (; f(this.__pendingValue);) {
      const t = this.__pendingValue;this.__pendingValue = g, t(this);
    }if (this.__pendingValue === g) return;const t = !!this.__pendingValue;this.value !== t && (t ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name), this.value = t), this.__pendingValue = g;
  }
}class E extends P {
  constructor(t, e, i) {
    super(t, e, i), this.single = 2 === i.length && "" === i[0] && "" === i[1];
  }_createPart() {
    return new M(this);
  }_getValue() {
    return this.single ? this.parts[0].value : super._getValue();
  }commit() {
    this.dirty && (this.dirty = !1, this.element[this.name] = this._getValue());
  }
}class M extends C {}let T = !1;(() => {
  try {
    const t = { get capture() {
        return T = !0, !1;
      } };window.addEventListener("test", t, t), window.removeEventListener("test", t, t);
  } catch (t) {}
})();class k {
  constructor(t, e, i) {
    this.value = void 0, this.__pendingValue = void 0, this.element = t, this.eventName = e, this.eventContext = i, this.__boundHandleEvent = t => this.handleEvent(t);
  }setValue(t) {
    this.__pendingValue = t;
  }commit() {
    for (; f(this.__pendingValue);) {
      const t = this.__pendingValue;this.__pendingValue = g, t(this);
    }if (this.__pendingValue === g) return;const t = this.__pendingValue,
          e = this.value,
          i = null == t || null != e && (t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive),
          n = null != t && (null == e || i);i && this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options), n && (this.__options = A(t), this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options)), this.value = t, this.__pendingValue = g;
  }handleEvent(t) {
    "function" == typeof this.value ? this.value.call(this.eventContext || this.element, t) : this.value.handleEvent(t);
  }
}const A = t => t && (T ? { capture: t.capture, passive: t.passive, once: t.once } : t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function O(t) {
  let e = D.get(t.type);void 0 === e && (e = { stringsArray: new WeakMap(), keyString: new Map() }, D.set(t.type, e));let i = e.stringsArray.get(t.strings);if (void 0 !== i) return i;const r = t.strings.join(n);return i = e.keyString.get(r), void 0 === i && (i = new o(t, t.getTemplateElement()), e.keyString.set(r, i)), e.stringsArray.set(t.strings, i), i;
}const D = new Map(),
      V = new WeakMap();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const U = new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class {
  handleAttributeExpressions(t, e, i, n) {
    const r = e[0];if ("." === r) {
      return new E(t, e.slice(1), i).parts;
    }return "@" === r ? [new k(t, e.slice(1), n.eventContext)] : "?" === r ? [new N(t, e.slice(1), i)] : new P(t, e, i).parts;
  }handleTextExpression(t) {
    return new x(t);
  }
}();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined" != typeof window && (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.2.1");const R = (t, ...e) => new S(t, e, "html", U)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,
      Y = (t, e) => `${t}--${e}`;let I = !0;void 0 === window.ShadyCSS ? I = !1 : void 0 === window.ShadyCSS.prepareTemplateDom && (console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."), I = !1);const $ = t => e => {
  const i = Y(e.type, t);let r = D.get(i);void 0 === r && (r = { stringsArray: new WeakMap(), keyString: new Map() }, D.set(i, r));let s = r.stringsArray.get(e.strings);if (void 0 !== s) return s;const a = e.strings.join(n);if (s = r.keyString.get(a), void 0 === s) {
    const i = e.getTemplateElement();I && window.ShadyCSS.prepareTemplateDom(i, t), s = new o(e, i), r.keyString.set(a, s);
  }return r.stringsArray.set(e.strings, s), s;
},
      H = ["html", "svg"],
      j = new Set(),
      L = (t, e, i) => {
  j.add(t);const n = i ? i.element : document.createElement("template"),
        r = e.querySelectorAll("style"),
        { length: s } = r;if (0 === s) return void window.ShadyCSS.prepareTemplateStyles(n, t);const o = document.createElement("style");for (let t = 0; t < s; t++) {
    const e = r[t];e.parentNode.removeChild(e), o.textContent += e.textContent;
  }(t => {
    H.forEach(e => {
      const i = D.get(Y(e, t));void 0 !== i && i.keyString.forEach(t => {
        const { element: { content: e } } = t,
              i = new Set();Array.from(e.querySelectorAll("style")).forEach(t => {
          i.add(t);
        }), u(t, i);
      });
    });
  })(t);const a = n.content;i ? function (t, e, i = null) {
    const { element: { content: n }, parts: r } = t;if (null == i) return void n.appendChild(e);const s = document.createTreeWalker(n, 133, null, !1);let o = p(r),
        a = 0,
        l = -1;for (; s.nextNode();) {
      for (l++, s.currentNode === i && (a = h(e), i.parentNode.insertBefore(e, i)); -1 !== o && r[o].index === l;) {
        if (a > 0) {
          for (; -1 !== o;) r[o].index += a, o = p(r, o);return;
        }o = p(r, o);
      }
    }
  }(i, o, a.firstChild) : a.insertBefore(o, a.firstChild), window.ShadyCSS.prepareTemplateStyles(n, t);const l = a.querySelector("style");if (window.ShadyCSS.nativeShadow && null !== l) e.insertBefore(l.cloneNode(!0), e.firstChild);else if (i) {
    a.insertBefore(o, a.firstChild);const t = new Set();t.add(o), u(i, t);
  }
};window.JSCompiler_renameProperty = (t, e) => t;const F = { toAttribute(t, e) {
    switch (e) {case Boolean:
        return t ? "" : null;case Object:case Array:
        return null == t ? t : JSON.stringify(t);}return t;
  }, fromAttribute(t, e) {
    switch (e) {case Boolean:
        return null !== t;case Number:
        return null === t ? null : Number(t);case Object:case Array:
        return JSON.parse(t);}return t;
  } },
      z = (t, e) => e !== t && (e == e || t == t),
      q = { attribute: !0, type: String, converter: F, reflect: !1, hasChanged: z };class B extends HTMLElement {
  constructor() {
    super(), this._updateState = 0, this._instanceProperties = void 0, this._updatePromise = new Promise(t => this._enableUpdatingResolver = t), this._changedProperties = new Map(), this._reflectingProperties = void 0, this.initialize();
  }static get observedAttributes() {
    this.finalize();const t = [];return this._classProperties.forEach((e, i) => {
      const n = this._attributeNameForProperty(i, e);void 0 !== n && (this._attributeToPropertyMap.set(n, i), t.push(n));
    }), t;
  }static _ensureClassProperties() {
    if (!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))) {
      this._classProperties = new Map();const t = Object.getPrototypeOf(this)._classProperties;void 0 !== t && t.forEach((t, e) => this._classProperties.set(e, t));
    }
  }static createProperty(t, e = q) {
    if (this._ensureClassProperties(), this._classProperties.set(t, e), e.noAccessor || this.prototype.hasOwnProperty(t)) return;const i = "symbol" == typeof t ? Symbol() : `__${t}`,
          n = this.getPropertyDescriptor(t, i, e);void 0 !== n && Object.defineProperty(this.prototype, t, n);
  }static getPropertyDescriptor(t, e, i) {
    return { get() {
        return this[e];
      }, set(i) {
        const n = this[t];this[e] = i, this._requestUpdate(t, n);
      }, configurable: !0, enumerable: !0 };
  }static getPropertyOptions(t) {
    return this._classProperties && this._classProperties.get(t) || q;
  }static finalize() {
    const t = Object.getPrototypeOf(this);if (t.hasOwnProperty("finalized") || t.finalize(), this.finalized = !0, this._ensureClassProperties(), this._attributeToPropertyMap = new Map(), this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
      const t = this.properties,
            e = [...Object.getOwnPropertyNames(t), ...("function" == typeof Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t) : [])];for (const i of e) this.createProperty(i, t[i]);
    }
  }static _attributeNameForProperty(t, e) {
    const i = e.attribute;return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0;
  }static _valueHasChanged(t, e, i = z) {
    return i(t, e);
  }static _propertyValueFromAttribute(t, e) {
    const i = e.type,
          n = e.converter || F,
          r = "function" == typeof n ? n : n.fromAttribute;return r ? r(t, i) : t;
  }static _propertyValueToAttribute(t, e) {
    if (void 0 === e.reflect) return;const i = e.type,
          n = e.converter;return (n && n.toAttribute || F.toAttribute)(t, i);
  }initialize() {
    this._saveInstanceProperties(), this._requestUpdate();
  }_saveInstanceProperties() {
    this.constructor._classProperties.forEach((t, e) => {
      if (this.hasOwnProperty(e)) {
        const t = this[e];delete this[e], this._instanceProperties || (this._instanceProperties = new Map()), this._instanceProperties.set(e, t);
      }
    });
  }_applyInstanceProperties() {
    this._instanceProperties.forEach((t, e) => this[e] = t), this._instanceProperties = void 0;
  }connectedCallback() {
    this.enableUpdating();
  }enableUpdating() {
    void 0 !== this._enableUpdatingResolver && (this._enableUpdatingResolver(), this._enableUpdatingResolver = void 0);
  }disconnectedCallback() {}attributeChangedCallback(t, e, i) {
    e !== i && this._attributeToProperty(t, i);
  }_propertyToAttribute(t, e, i = q) {
    const n = this.constructor,
          r = n._attributeNameForProperty(t, i);if (void 0 !== r) {
      const t = n._propertyValueToAttribute(e, i);if (void 0 === t) return;this._updateState = 8 | this._updateState, null == t ? this.removeAttribute(r) : this.setAttribute(r, t), this._updateState = -9 & this._updateState;
    }
  }_attributeToProperty(t, e) {
    if (8 & this._updateState) return;const i = this.constructor,
          n = i._attributeToPropertyMap.get(t);if (void 0 !== n) {
      const t = i.getPropertyOptions(n);this._updateState = 16 | this._updateState, this[n] = i._propertyValueFromAttribute(e, t), this._updateState = -17 & this._updateState;
    }
  }_requestUpdate(t, e) {
    let i = !0;if (void 0 !== t) {
      const n = this.constructor,
            r = n.getPropertyOptions(t);n._valueHasChanged(this[t], e, r.hasChanged) ? (this._changedProperties.has(t) || this._changedProperties.set(t, e), !0 !== r.reflect || 16 & this._updateState || (void 0 === this._reflectingProperties && (this._reflectingProperties = new Map()), this._reflectingProperties.set(t, r))) : i = !1;
    }!this._hasRequestedUpdate && i && (this._updatePromise = this._enqueueUpdate());
  }requestUpdate(t, e) {
    return this._requestUpdate(t, e), this.updateComplete;
  }async _enqueueUpdate() {
    this._updateState = 4 | this._updateState;try {
      await this._updatePromise;
    } catch (t) {}const t = this.performUpdate();return null != t && (await t), !this._hasRequestedUpdate;
  }get _hasRequestedUpdate() {
    return 4 & this._updateState;
  }get hasUpdated() {
    return 1 & this._updateState;
  }performUpdate() {
    this._instanceProperties && this._applyInstanceProperties();let t = !1;const e = this._changedProperties;try {
      t = this.shouldUpdate(e), t ? this.update(e) : this._markUpdated();
    } catch (e) {
      throw t = !1, this._markUpdated(), e;
    }t && (1 & this._updateState || (this._updateState = 1 | this._updateState, this.firstUpdated(e)), this.updated(e));
  }_markUpdated() {
    this._changedProperties = new Map(), this._updateState = -5 & this._updateState;
  }get updateComplete() {
    return this._getUpdateComplete();
  }_getUpdateComplete() {
    return this._updatePromise;
  }shouldUpdate(t) {
    return !0;
  }update(t) {
    void 0 !== this._reflectingProperties && this._reflectingProperties.size > 0 && (this._reflectingProperties.forEach((t, e) => this._propertyToAttribute(e, this[e], t)), this._reflectingProperties = void 0), this._markUpdated();
  }updated(t) {}firstUpdated(t) {}
}B.finalized = !0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const W = (t, e) => "method" === e.kind && e.descriptor && !("value" in e.descriptor) ? Object.assign(Object.assign({}, e), { finisher(i) {
    i.createProperty(e.key, t);
  } }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, initializer() {
    "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this));
  }, finisher(i) {
    i.createProperty(e.key, t);
  } };function J(t) {
  return (e, i) => void 0 !== i ? ((t, e, i) => {
    e.constructor.createProperty(i, t);
  })(t, e, i) : W(t, e);
}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const Z = "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
      G = Symbol();class K {
  constructor(t, e) {
    if (e !== G) throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText = t;
  }get styleSheet() {
    return void 0 === this._styleSheet && (Z ? (this._styleSheet = new CSSStyleSheet(), this._styleSheet.replaceSync(this.cssText)) : this._styleSheet = null), this._styleSheet;
  }toString() {
    return this.cssText;
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions || (window.litElementVersions = [])).push("2.3.1");const Q = {};class X extends B {
  static getStyles() {
    return this.styles;
  }static _getUniqueStyles() {
    if (this.hasOwnProperty(JSCompiler_renameProperty("_styles", this))) return;const t = this.getStyles();if (void 0 === t) this._styles = [];else if (Array.isArray(t)) {
      const e = (t, i) => t.reduceRight((t, i) => Array.isArray(i) ? e(i, t) : (t.add(i), t), i),
            i = e(t, new Set()),
            n = [];i.forEach(t => n.unshift(t)), this._styles = n;
    } else this._styles = [t];
  }initialize() {
    super.initialize(), this.constructor._getUniqueStyles(), this.renderRoot = this.createRenderRoot(), window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot && this.adoptStyles();
  }createRenderRoot() {
    return this.attachShadow({ mode: "open" });
  }adoptStyles() {
    const t = this.constructor._styles;0 !== t.length && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow ? Z ? this.renderRoot.adoptedStyleSheets = t.map(t => t.styleSheet) : this._needsShimAdoptedStyleSheets = !0 : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t => t.cssText), this.localName));
  }connectedCallback() {
    super.connectedCallback(), this.hasUpdated && void 0 !== window.ShadyCSS && window.ShadyCSS.styleElement(this);
  }update(t) {
    const e = this.render();super.update(t), e !== Q && this.constructor.render(e, this.renderRoot, { scopeName: this.localName, eventContext: this }), this._needsShimAdoptedStyleSheets && (this._needsShimAdoptedStyleSheets = !1, this.constructor._styles.forEach(t => {
      const e = document.createElement("style");e.textContent = t.cssText, this.renderRoot.appendChild(e);
    }));
  }render() {
    return Q;
  }
}X.finalized = !0, X.render = (t, e, n) => {
  if (!n || "object" != typeof n || !n.scopeName) throw new Error("The `scopeName` option is required.");const r = n.scopeName,
        s = V.has(e),
        o = I && 11 === e.nodeType && !!e.host,
        a = o && !j.has(r),
        l = a ? document.createDocumentFragment() : e;if (((t, e, n) => {
    let r = V.get(e);void 0 === r && (i(e, e.firstChild), V.set(e, r = new x(Object.assign({ templateFactory: O }, n))), r.appendInto(e)), r.setValue(t), r.commit();
  })(t, l, Object.assign({ templateFactory: $(r) }, n)), a) {
    const t = V.get(l);V.delete(l);const n = t.value instanceof y ? t.value.template : void 0;L(r, l, n), i(e, e.firstChild), e.appendChild(l), V.set(e, t);
  }!s && o && window.ShadyCSS.styleElement(e.host);
};
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const tt = new WeakMap(),
      et = (it = t => e => {
  const i = tt.get(e);if (void 0 === t && e instanceof C) {
    if (void 0 !== i || !tt.has(e)) {
      const t = e.committer.name;e.committer.element.removeAttribute(t);
    }
  } else t !== i && e.setValue(t);tt.set(e, t);
}, (...t) => {
  const e = it(...t);return m.set(e, !0), e;
});var it,
    nt = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,
    rt = "[^\\s]+",
    st = /\[([^]*?)\]/gm;function ot(t, e) {
  for (var i = [], n = 0, r = t.length; n < r; n++) i.push(t[n].substr(0, e));return i;
}var at = function (t) {
  return function (e, i) {
    var n = i[t].map(function (t) {
      return t.toLowerCase();
    }).indexOf(e.toLowerCase());return n > -1 ? n : null;
  };
};function lt(t) {
  for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];for (var n = 0, r = e; n < r.length; n++) {
    var s = r[n];for (var o in s) t[o] = s[o];
  }return t;
}var dt = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    ct = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    ut = ot(ct, 3),
    ht = { dayNamesShort: ot(dt, 3), dayNames: dt, monthNamesShort: ut, monthNames: ct, amPm: ["am", "pm"], DoFn: function (t) {
    return t + ["th", "st", "nd", "rd"][t % 10 > 3 ? 0 : (t - t % 10 != 10 ? 1 : 0) * t % 10];
  } },
    pt = lt({}, ht),
    mt = function (t, e) {
  for (void 0 === e && (e = 2), t = String(t); t.length < e;) t = "0" + t;return t;
},
    ft = { D: function (t) {
    return String(t.getDate());
  }, DD: function (t) {
    return mt(t.getDate());
  }, Do: function (t, e) {
    return e.DoFn(t.getDate());
  }, d: function (t) {
    return String(t.getDay());
  }, dd: function (t) {
    return mt(t.getDay());
  }, ddd: function (t, e) {
    return e.dayNamesShort[t.getDay()];
  }, dddd: function (t, e) {
    return e.dayNames[t.getDay()];
  }, M: function (t) {
    return String(t.getMonth() + 1);
  }, MM: function (t) {
    return mt(t.getMonth() + 1);
  }, MMM: function (t, e) {
    return e.monthNamesShort[t.getMonth()];
  }, MMMM: function (t, e) {
    return e.monthNames[t.getMonth()];
  }, YY: function (t) {
    return mt(String(t.getFullYear()), 4).substr(2);
  }, YYYY: function (t) {
    return mt(t.getFullYear(), 4);
  }, h: function (t) {
    return String(t.getHours() % 12 || 12);
  }, hh: function (t) {
    return mt(t.getHours() % 12 || 12);
  }, H: function (t) {
    return String(t.getHours());
  }, HH: function (t) {
    return mt(t.getHours());
  }, m: function (t) {
    return String(t.getMinutes());
  }, mm: function (t) {
    return mt(t.getMinutes());
  }, s: function (t) {
    return String(t.getSeconds());
  }, ss: function (t) {
    return mt(t.getSeconds());
  }, S: function (t) {
    return String(Math.round(t.getMilliseconds() / 100));
  }, SS: function (t) {
    return mt(Math.round(t.getMilliseconds() / 10), 2);
  }, SSS: function (t) {
    return mt(t.getMilliseconds(), 3);
  }, a: function (t, e) {
    return t.getHours() < 12 ? e.amPm[0] : e.amPm[1];
  }, A: function (t, e) {
    return t.getHours() < 12 ? e.amPm[0].toUpperCase() : e.amPm[1].toUpperCase();
  }, ZZ: function (t) {
    var e = t.getTimezoneOffset();return (e > 0 ? "-" : "+") + mt(100 * Math.floor(Math.abs(e) / 60) + Math.abs(e) % 60, 4);
  }, Z: function (t) {
    var e = t.getTimezoneOffset();return (e > 0 ? "-" : "+") + mt(Math.floor(Math.abs(e) / 60), 2) + ":" + mt(Math.abs(e) % 60, 2);
  } },
    gt = function (t) {
  return +t - 1;
},
    _t = [null, "[1-9]\\d?"],
    yt = [null, rt],
    vt = ["isPm", rt, function (t, e) {
  var i = t.toLowerCase();return i === e.amPm[0] ? 0 : i === e.amPm[1] ? 1 : null;
}],
    St = ["timezoneOffset", "[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?", function (t) {
  var e = (t + "").match(/([+-]|\d\d)/gi);if (e) {
    var i = 60 * +e[1] + parseInt(e[2], 10);return "+" === e[0] ? i : -i;
  }return 0;
}],
    wt = (at("monthNamesShort"), at("monthNames"), { default: "ddd MMM DD YYYY HH:mm:ss", shortDate: "M/D/YY", mediumDate: "MMM D, YYYY", longDate: "MMMM D, YYYY", fullDate: "dddd, MMMM D, YYYY", isoDate: "YYYY-MM-DD", isoDateTime: "YYYY-MM-DDTHH:mm:ssZ", shortTime: "HH:mm", mediumTime: "HH:mm:ss", longTime: "HH:mm:ss.SSS" });var bt,
    Pt = function (t, e, i) {
  if (void 0 === e && (e = wt.default), void 0 === i && (i = {}), "number" == typeof t && (t = new Date(t)), "[object Date]" !== Object.prototype.toString.call(t) || isNaN(t.getTime())) throw new Error("Invalid Date pass to format");var n = [];e = (e = wt[e] || e).replace(st, function (t, e) {
    return n.push(e), "@@@";
  });var r = lt(lt({}, pt), i);return (e = e.replace(nt, function (e) {
    return ft[e](t, r);
  })).replace(/@@@/g, function () {
    return n.shift();
  });
},
    Ct = (function () {
  try {
    new Date().toLocaleDateString("i");
  } catch (t) {
    return "RangeError" === t.name;
  }
}(), function () {
  try {
    new Date().toLocaleString("i");
  } catch (t) {
    return "RangeError" === t.name;
  }
}(), function () {
  try {
    new Date().toLocaleTimeString("i");
  } catch (t) {
    return "RangeError" === t.name;
  }
}(), new Set(["call-service", "divider", "section", "weblink", "cast", "select"])),
    xt = { alert: "toggle", automation: "toggle", climate: "climate", cover: "cover", fan: "toggle", group: "group", input_boolean: "toggle", input_number: "input-number", input_select: "input-select", input_text: "input-text", light: "toggle", lock: "lock", media_player: "media-player", remote: "toggle", scene: "scene", script: "script", sensor: "sensor", timer: "timer", switch: "toggle", vacuum: "toggle", water_heater: "climate", input_datetime: "input-datetime" },
    Nt = function (t, e) {
  void 0 === e && (e = !1);var i = function (t, e) {
    return n("hui-error-card", { type: "error", error: t, config: e });
  },
      n = function (t, e) {
    var n = window.document.createElement(t);try {
      n.setConfig(e);
    } catch (n) {
      return console.error(t, n), i(n.message, e);
    }return n;
  };if (!t || "object" != typeof t || !e && !t.type) return i("No type defined", t);var r = t.type;if (r && r.startsWith("custom:")) r = r.substr("custom:".length);else if (e) {
    if (Ct.has(r)) r = "hui-" + r + "-row";else {
      if (!t.entity) return i("Invalid config given.", t);var s = t.entity.split(".", 1)[0];r = "hui-" + (xt[s] || "text") + "-entity-row";
    }
  } else r = "hui-" + r + "-card";if (customElements.get(r)) return n(r, t);var o = i("Custom element doesn't exist: " + t.type + ".", t);o.style.display = "None";var a = setTimeout(function () {
    o.style.display = "";
  }, 2e3);return customElements.whenDefined(t.type).then(function () {
    clearTimeout(a), function (t, e, i, n) {
      n = n || {}, i = null == i ? {} : i;var r = new Event(e, { bubbles: void 0 === n.bubbles || n.bubbles, cancelable: Boolean(n.cancelable), composed: void 0 === n.composed || n.composed });r.detail = i, t.dispatchEvent(r);
    }(o, "ll-rebuild", {}, o);
  }), o;
};function Et(t) {
  try {
    return t;
  } catch (e) {
    throw new Error(`Media Player does not have a state: ${t}`);
  }
}function Mt(t) {
  return [].concat(...t);
}function Tt(t, e) {
  var i, n;if (t.entityState == bt.OFF || t.entityState == bt.IDLE) return null != t.children && null != t.children ? Mt(null === (i = t.children) || void 0 === i ? void 0 : i.map(t => Tt(t, e))) : [];if (t.entityState == bt.PLAYING || t.entityState == bt.PAUSED) {
    let i = [];return null != t.children && null != t.children && (i = Mt(null === (n = t.children) || void 0 === n ? void 0 : n.map(t => function t(e) {
      var i, n;if (null != e.children) {
        return Mt(null === (i = e.children) || void 0 === i ? void 0 : i.map(e => t(e)));
      }return [(n = e.entityId, { type: "custom:mini-media-player", entity: n, group: !0, hide: { name: !1, icon: !0, info: !0, power: !0, source: !0, sound_mode: !0, controls: !0, play_pause: !0, play_stop: !0, volume: !1, mute: !1, progress: !0, runtime: !0, artwork_border: !0, power_state: !0, icon_state: !0, shuffle: !0 } })];
    }(t)))), function (t, e, i) {
      return 0 == e.length ? [Object.assign(Object.assign({}, i), { entity: t })] : [Object.assign(Object.assign({}, i), { entity: t }), { type: "custom:fold-entity-row", head: { label: "Speakers", type: "section" }, entities: e }];
    }(t.entityId, i, e);
  }if (t.entityState == bt.UNAVAILABLE) return [{ type: "error" }];throw new Error(`ERROR: Bad Media Player State - ${t.entityId} : ${t.entityState}`);
}!function (t) {
  t.OFF = "off", t.IDLE = "idle", t.PLAYING = "playing", t.UNAVAILABLE = "unavailable", t.PAUSED = "paused";
}(bt || (bt = {}));const kt = ((t, ...e) => {
  const i = e.reduce((e, i, n) => e + (t => {
    if (t instanceof K) return t.cssText;if ("number" == typeof t) return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`);
  })(i) + t[n + 1], t[0]);return new K(i, G);
})`
  .outputSelect {
    width: 96%;
    padding-left: 2%;
    padding-right: 2%;
  }
`;console.info("%c Media Player Dynamic Groups \n%c   Version 0.5.0   ", "color: orange; font-weight: bold; background: black", "color: white; font-weight: bold; background: dimgray");const At = window.loadCardHelpers ? window.loadCardHelpers() : void 0;let Ot = class extends X {
  shouldUpdate2(t, e) {
    return JSON.stringify(t) != JSON.stringify(e);
  }set hass(t) {
    if (this._hass = t, this._card && (this._card.hass = t), this._tree && this._config) {
      const t = function t(e, i) {
        var n;if (!(e.entityId in i.states)) throw new Error(`Entity: ${e.entityId} does not exist.`);return { entityId: e.entityId, children: null === (n = e.children) || void 0 === n ? void 0 : n.map(e => t(e, i)), entityState: Et(i.states[e.entityId].state) };
      }(this._tree, this._hass);if (this._treeWithState && !this.shouldUpdate2(t, this._treeWithState)) return;this._treeWithState = t;const e = { type: "vertical-stack", cards: Tt(this._treeWithState, this._config.card) };this._createCard(e).then(t => {
        this._card = t, this._waitForChildren(t, !1), window.setTimeout(() => {
          var e, i, n, r, s;if ((null === (i = null === (e = this._config) || void 0 === e ? void 0 : e.keep) || void 0 === i ? void 0 : i.background) || this._waitForChildren(t, !0), (null === (r = null === (n = this._config) || void 0 === n ? void 0 : n.keep) || void 0 === r ? void 0 : r.outer_padding) && (null === (s = this._card) || void 0 === s ? void 0 : s.shadowRoot)) {
            const t = this._card.shadowRoot.getElementById("root");t && (t.style.padding = "8px");
          }
        }, 500);
      });
    }
  }setConfig(t) {
    var e, i;if (!t.card) throw new Error("There is no card parameter defined");if (!t.media_player_tree) throw new Error("There is no media_player_tree parameter defined");this._tree = t.media_player_tree, this._config = Object.assign(Object.assign({}, t), { keep: Object.assign({ background: !1, margin: !1, box_shadow: !1, border_radius: !1 }, t.keep) }), this._mediaPlayerList = function t(e) {
      var i;const n = [];return n.push(e.entityId), null === (i = e.children) || void 0 === i || i.forEach(e => n.push(...t(e))), n;
    }(this._tree), (null === (e = this._config.keep) || void 0 === e ? void 0 : e.margin) && void 0 === (null === (i = this._config.keep) || void 0 === i ? void 0 : i.outer_padding) && (this._config.keep.outer_padding = !0);
  }logToConsole(t, e = "EMPTY") {
    if (!this._hass) return console.log("HASS undefined"), void console.log(this._hass);console.log(`Event Fired: ${e} : ${JSON.stringify(t)}`);const i = { entity_id: e, force_playback: !0 };console.log(i), this._hass.callService("spotcast", "start", i);
  }buildMediaPlayerItems(t) {
    return console.log(t), R`
      <paper-item @click="${t => this.logToConsole(t, "${item}")}">${t}</paper-item>
    `;
  }getSpeakerSelectorView() {
    var t, e;return 1 == (null === (t = this._config) || void 0 === t ? void 0 : t.show_speaker_selector) ? R`
        <div display="flex">
          <paper-dropdown-menu class="outputSelect" label="Current Target Speaker">
            <paper-listbox slot="dropdown-content">
              ${null === (e = this._mediaPlayerList) || void 0 === e ? void 0 : e.map(t => R`
                  <paper-item @click="${e => this.logToConsole(e, t)}"
                    >${t}</paper-item
                  >
                `)}
            </paper-listbox>
          </paper-dropdown-menu>
        </div>
      ` : R``;
  }render() {
    return this._hass && this._card && this._config ? R`
      <ha-card header=${et(this._config.title)}>
        <div>${this._card}</div>
        ${this.getSpeakerSelectorView()}
      </ha-card>
    ` : R``;
  }_updateStyle(t, e) {
    var i, n, r, s, o, a;t && ((null === (n = null === (i = this._config) || void 0 === i ? void 0 : i.keep) || void 0 === n ? void 0 : n.box_shadow) || (t.style.boxShadow = "none"), !(null === (s = null === (r = this._config) || void 0 === r ? void 0 : r.keep) || void 0 === s ? void 0 : s.background) && e && "true" !== getComputedStyle(t).getPropertyValue("--keep-background").trim() && (t.style.background = "transparent"), (null === (a = null === (o = this._config) || void 0 === o ? void 0 : o.keep) || void 0 === a ? void 0 : a.border_radius) || (t.style.borderRadius = "0"));
  }_loopChildren(t, e) {
    t.childNodes.forEach(t => {
      var i, n;"media-player-dynamic-groups" !== t.tagName && (!(null === (n = null === (i = this._config) || void 0 === i ? void 0 : i.keep) || void 0 === n ? void 0 : n.margin) && t.style && (t.style.margin = "0px"), this._waitForChildren(t, e));
    });
  }_updateChildren(t, e) {
    if (t) if (t.shadowRoot) {
      const i = t.shadowRoot.querySelector("ha-card");if (i) this._updateStyle(i, e);else {
        const i = t.shadowRoot.getElementById("root") || t.shadowRoot.getElementById("card");if (!i) return;this._loopChildren(i, e);
      }
    } else "function" == typeof t.querySelector && t.querySelector("ha-card") && this._updateStyle(t.querySelector("ha-card"), e), this._loopChildren(t, e);
  }_waitForChildren(t, e) {
    t.updateComplete ? t.updateComplete.then(() => {
      this._updateChildren(t, e);
    }) : this._updateChildren(t, e);
  }async _createCard(t) {
    let e;return e = At ? (await At).createCardElement(t) : Nt(t), this._hass && (e.hass = this._hass), e && e.addEventListener("ll-rebuild", i => {
      i.stopPropagation(), this._rebuildCard(e, t);
    }, { once: !0 }), e;
  }async _rebuildCard(t, e) {
    const i = await this._createCard(e);return t.replaceWith(i), this._card = i, window.setTimeout(() => {
      var t, e, i, n, r;if ((null === (e = null === (t = this._config) || void 0 === t ? void 0 : t.keep) || void 0 === e ? void 0 : e.background) || this._waitForChildren(this._card, !0), (null === (n = null === (i = this._config) || void 0 === i ? void 0 : i.keep) || void 0 === n ? void 0 : n.outer_padding) && (null === (r = this._card) || void 0 === r ? void 0 : r.shadowRoot)) {
        const t = this._card.shadowRoot.getElementById("root");t && (t.style.padding = "8px");
      }
    }, 500), i;
  }getCardSize() {
    return this._card && "function" == typeof this._card.getCardSize ? this._card.getCardSize() : 1;
  }static get styles() {
    return kt;
  }
};var Dt;t([J()], Ot.prototype, "_card", void 0), t([J()], Ot.prototype, "_mediaPlayerView", void 0), t([J()], Ot.prototype, "_tree", void 0), t([J()], Ot.prototype, "_mediaPlayerList", void 0), t([J()], Ot.prototype, "_treeWithState", void 0), t([J()], Ot.prototype, "_config", void 0), t([J()], Ot.prototype, "_hass", void 0), Ot = t([(Dt = "media-player-dynamic-groups", t => "function" == typeof t ? ((t, e) => (window.customElements.define(t, e), e))(Dt, t) : ((t, e) => {
  const { kind: i, elements: n } = e;return { kind: i, elements: n, finisher(e) {
      window.customElements.define(t, e);
    } };
})(Dt, t))], Ot);
