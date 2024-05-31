var le = Object.defineProperty;
var fe = (e, n, i) => n in e ? le(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[n] = i;
var ht = (e, n, i) => (fe(e, typeof n != "symbol" ? n + "" : n, i), i), $t = (e, n, i) => {
  if (!n.has(e))
    throw TypeError("Cannot " + i);
};
var B = (e, n, i) => ($t(e, n, "read from private field"), i ? i.call(e) : n.get(e)), T = (e, n, i) => {
  if (n.has(e))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(e) : n.set(e, i);
}, O = (e, n, i, c) => ($t(e, n, "write to private field"), c ? c.call(e, i) : n.set(e, i), i);
var C = (e, n, i) => ($t(e, n, "access private method"), i);
var tr = {}, Pt = {};
Pt.byteLength = ye;
Pt.toByteArray = we;
Pt.fromByteArray = Ee;
var D = [], j = [], he = typeof Uint8Array < "u" ? Uint8Array : Array, zt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var J = 0, pe = zt.length; J < pe; ++J)
  D[J] = zt[J], j[zt.charCodeAt(J)] = J;
j["-".charCodeAt(0)] = 62;
j["_".charCodeAt(0)] = 63;
function Mr(e) {
  var n = e.length;
  if (n % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var i = e.indexOf("=");
  i === -1 && (i = n);
  var c = i === n ? 0 : 4 - i % 4;
  return [i, c];
}
function ye(e) {
  var n = Mr(e), i = n[0], c = n[1];
  return (i + c) * 3 / 4 - c;
}
function de(e, n, i) {
  return (n + i) * 3 / 4 - i;
}
function we(e) {
  var n, i = Mr(e), c = i[0], l = i[1], f = new he(de(e, c, l)), p = 0, s = l > 0 ? c - 4 : c, d;
  for (d = 0; d < s; d += 4)
    n = j[e.charCodeAt(d)] << 18 | j[e.charCodeAt(d + 1)] << 12 | j[e.charCodeAt(d + 2)] << 6 | j[e.charCodeAt(d + 3)], f[p++] = n >> 16 & 255, f[p++] = n >> 8 & 255, f[p++] = n & 255;
  return l === 2 && (n = j[e.charCodeAt(d)] << 2 | j[e.charCodeAt(d + 1)] >> 4, f[p++] = n & 255), l === 1 && (n = j[e.charCodeAt(d)] << 10 | j[e.charCodeAt(d + 1)] << 4 | j[e.charCodeAt(d + 2)] >> 2, f[p++] = n >> 8 & 255, f[p++] = n & 255), f;
}
function me(e) {
  return D[e >> 18 & 63] + D[e >> 12 & 63] + D[e >> 6 & 63] + D[e & 63];
}
function ge(e, n, i) {
  for (var c, l = [], f = n; f < i; f += 3)
    c = (e[f] << 16 & 16711680) + (e[f + 1] << 8 & 65280) + (e[f + 2] & 255), l.push(me(c));
  return l.join("");
}
function Ee(e) {
  for (var n, i = e.length, c = i % 3, l = [], f = 16383, p = 0, s = i - c; p < s; p += f)
    l.push(ge(e, p, p + f > s ? s : p + f));
  return c === 1 ? (n = e[i - 1], l.push(
    D[n >> 2] + D[n << 4 & 63] + "=="
  )) : c === 2 && (n = (e[i - 2] << 8) + e[i - 1], l.push(
    D[n >> 10] + D[n >> 4 & 63] + D[n << 2 & 63] + "="
  )), l.join("");
}
var rr = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
rr.read = function(e, n, i, c, l) {
  var f, p, s = l * 8 - c - 1, d = (1 << s) - 1, w = d >> 1, m = -7, x = i ? l - 1 : 0, E = i ? -1 : 1, I = e[n + x];
  for (x += E, f = I & (1 << -m) - 1, I >>= -m, m += s; m > 0; f = f * 256 + e[n + x], x += E, m -= 8)
    ;
  for (p = f & (1 << -m) - 1, f >>= -m, m += c; m > 0; p = p * 256 + e[n + x], x += E, m -= 8)
    ;
  if (f === 0)
    f = 1 - w;
  else {
    if (f === d)
      return p ? NaN : (I ? -1 : 1) * (1 / 0);
    p = p + Math.pow(2, c), f = f - w;
  }
  return (I ? -1 : 1) * p * Math.pow(2, f - c);
};
rr.write = function(e, n, i, c, l, f) {
  var p, s, d, w = f * 8 - l - 1, m = (1 << w) - 1, x = m >> 1, E = l === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, I = c ? 0 : f - 1, N = c ? 1 : -1, A = n < 0 || n === 0 && 1 / n < 0 ? 1 : 0;
  for (n = Math.abs(n), isNaN(n) || n === 1 / 0 ? (s = isNaN(n) ? 1 : 0, p = m) : (p = Math.floor(Math.log(n) / Math.LN2), n * (d = Math.pow(2, -p)) < 1 && (p--, d *= 2), p + x >= 1 ? n += E / d : n += E * Math.pow(2, 1 - x), n * d >= 2 && (p++, d /= 2), p + x >= m ? (s = 0, p = m) : p + x >= 1 ? (s = (n * d - 1) * Math.pow(2, l), p = p + x) : (s = n * Math.pow(2, x - 1) * Math.pow(2, l), p = 0)); l >= 8; e[i + I] = s & 255, I += N, s /= 256, l -= 8)
    ;
  for (p = p << l | s, w += l; w > 0; e[i + I] = p & 255, I += N, p /= 256, w -= 8)
    ;
  e[i + I - N] |= A * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(e) {
  const n = Pt, i = rr, c = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  e.Buffer = s, e.SlowBuffer = H, e.INSPECT_MAX_BYTES = 50;
  const l = 2147483647;
  e.kMaxLength = l, s.TYPED_ARRAY_SUPPORT = f(), !s.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function f() {
    try {
      const o = new Uint8Array(1), t = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(t, Uint8Array.prototype), Object.setPrototypeOf(o, t), o.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(s.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (!!s.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(s.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (!!s.isBuffer(this))
        return this.byteOffset;
    }
  });
  function p(o) {
    if (o > l)
      throw new RangeError('The value "' + o + '" is invalid for option "size"');
    const t = new Uint8Array(o);
    return Object.setPrototypeOf(t, s.prototype), t;
  }
  function s(o, t, r) {
    if (typeof o == "number") {
      if (typeof t == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return x(o);
    }
    return d(o, t, r);
  }
  s.poolSize = 8192;
  function d(o, t, r) {
    if (typeof o == "string")
      return E(o, t);
    if (ArrayBuffer.isView(o))
      return N(o);
    if (o == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof o
      );
    if (k(o, ArrayBuffer) || o && k(o.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (k(o, SharedArrayBuffer) || o && k(o.buffer, SharedArrayBuffer)))
      return A(o, t, r);
    if (typeof o == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const u = o.valueOf && o.valueOf();
    if (u != null && u !== o)
      return s.from(u, t, r);
    const a = lt(o);
    if (a)
      return a;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof o[Symbol.toPrimitive] == "function")
      return s.from(o[Symbol.toPrimitive]("string"), t, r);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof o
    );
  }
  s.from = function(o, t, r) {
    return d(o, t, r);
  }, Object.setPrototypeOf(s.prototype, Uint8Array.prototype), Object.setPrototypeOf(s, Uint8Array);
  function w(o) {
    if (typeof o != "number")
      throw new TypeError('"size" argument must be of type number');
    if (o < 0)
      throw new RangeError('The value "' + o + '" is invalid for option "size"');
  }
  function m(o, t, r) {
    return w(o), o <= 0 ? p(o) : t !== void 0 ? typeof r == "string" ? p(o).fill(t, r) : p(o).fill(t) : p(o);
  }
  s.alloc = function(o, t, r) {
    return m(o, t, r);
  };
  function x(o) {
    return w(o), p(o < 0 ? 0 : P(o) | 0);
  }
  s.allocUnsafe = function(o) {
    return x(o);
  }, s.allocUnsafeSlow = function(o) {
    return x(o);
  };
  function E(o, t) {
    if ((typeof t != "string" || t === "") && (t = "utf8"), !s.isEncoding(t))
      throw new TypeError("Unknown encoding: " + t);
    const r = ar(o, t) | 0;
    let u = p(r);
    const a = u.write(o, t);
    return a !== r && (u = u.slice(0, a)), u;
  }
  function I(o) {
    const t = o.length < 0 ? 0 : P(o.length) | 0, r = p(t);
    for (let u = 0; u < t; u += 1)
      r[u] = o[u] & 255;
    return r;
  }
  function N(o) {
    if (k(o, Uint8Array)) {
      const t = new Uint8Array(o);
      return A(t.buffer, t.byteOffset, t.byteLength);
    }
    return I(o);
  }
  function A(o, t, r) {
    if (t < 0 || o.byteLength < t)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (o.byteLength < t + (r || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let u;
    return t === void 0 && r === void 0 ? u = new Uint8Array(o) : r === void 0 ? u = new Uint8Array(o, t) : u = new Uint8Array(o, t, r), Object.setPrototypeOf(u, s.prototype), u;
  }
  function lt(o) {
    if (s.isBuffer(o)) {
      const t = P(o.length) | 0, r = p(t);
      return r.length === 0 || o.copy(r, 0, 0, t), r;
    }
    if (o.length !== void 0)
      return typeof o.length != "number" || Yt(o.length) ? p(0) : I(o);
    if (o.type === "Buffer" && Array.isArray(o.data))
      return I(o.data);
  }
  function P(o) {
    if (o >= l)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + l.toString(16) + " bytes");
    return o | 0;
  }
  function H(o) {
    return +o != o && (o = 0), s.alloc(+o);
  }
  s.isBuffer = function(t) {
    return t != null && t._isBuffer === !0 && t !== s.prototype;
  }, s.compare = function(t, r) {
    if (k(t, Uint8Array) && (t = s.from(t, t.offset, t.byteLength)), k(r, Uint8Array) && (r = s.from(r, r.offset, r.byteLength)), !s.isBuffer(t) || !s.isBuffer(r))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (t === r)
      return 0;
    let u = t.length, a = r.length;
    for (let h = 0, y = Math.min(u, a); h < y; ++h)
      if (t[h] !== r[h]) {
        u = t[h], a = r[h];
        break;
      }
    return u < a ? -1 : a < u ? 1 : 0;
  }, s.isEncoding = function(t) {
    switch (String(t).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, s.concat = function(t, r) {
    if (!Array.isArray(t))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (t.length === 0)
      return s.alloc(0);
    let u;
    if (r === void 0)
      for (r = 0, u = 0; u < t.length; ++u)
        r += t[u].length;
    const a = s.allocUnsafe(r);
    let h = 0;
    for (u = 0; u < t.length; ++u) {
      let y = t[u];
      if (k(y, Uint8Array))
        h + y.length > a.length ? (s.isBuffer(y) || (y = s.from(y)), y.copy(a, h)) : Uint8Array.prototype.set.call(
          a,
          y,
          h
        );
      else if (s.isBuffer(y))
        y.copy(a, h);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      h += y.length;
    }
    return a;
  };
  function ar(o, t) {
    if (s.isBuffer(o))
      return o.length;
    if (ArrayBuffer.isView(o) || k(o, ArrayBuffer))
      return o.byteLength;
    if (typeof o != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof o
      );
    const r = o.length, u = arguments.length > 2 && arguments[2] === !0;
    if (!u && r === 0)
      return 0;
    let a = !1;
    for (; ; )
      switch (t) {
        case "ascii":
        case "latin1":
        case "binary":
          return r;
        case "utf8":
        case "utf-8":
          return Gt(o).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return r * 2;
        case "hex":
          return r >>> 1;
        case "base64":
          return Ir(o).length;
        default:
          if (a)
            return u ? -1 : Gt(o).length;
          t = ("" + t).toLowerCase(), a = !0;
      }
  }
  s.byteLength = ar;
  function zr(o, t, r) {
    let u = !1;
    if ((t === void 0 || t < 0) && (t = 0), t > this.length || ((r === void 0 || r > this.length) && (r = this.length), r <= 0) || (r >>>= 0, t >>>= 0, r <= t))
      return "";
    for (o || (o = "utf8"); ; )
      switch (o) {
        case "hex":
          return re(this, t, r);
        case "utf8":
        case "utf-8":
          return hr(this, t, r);
        case "ascii":
          return qr(this, t, r);
        case "latin1":
        case "binary":
          return te(this, t, r);
        case "base64":
          return Xr(this, t, r);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ee(this, t, r);
        default:
          if (u)
            throw new TypeError("Unknown encoding: " + o);
          o = (o + "").toLowerCase(), u = !0;
      }
  }
  s.prototype._isBuffer = !0;
  function Z(o, t, r) {
    const u = o[t];
    o[t] = o[r], o[r] = u;
  }
  s.prototype.swap16 = function() {
    const t = this.length;
    if (t % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let r = 0; r < t; r += 2)
      Z(this, r, r + 1);
    return this;
  }, s.prototype.swap32 = function() {
    const t = this.length;
    if (t % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let r = 0; r < t; r += 4)
      Z(this, r, r + 3), Z(this, r + 1, r + 2);
    return this;
  }, s.prototype.swap64 = function() {
    const t = this.length;
    if (t % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let r = 0; r < t; r += 8)
      Z(this, r, r + 7), Z(this, r + 1, r + 6), Z(this, r + 2, r + 5), Z(this, r + 3, r + 4);
    return this;
  }, s.prototype.toString = function() {
    const t = this.length;
    return t === 0 ? "" : arguments.length === 0 ? hr(this, 0, t) : zr.apply(this, arguments);
  }, s.prototype.toLocaleString = s.prototype.toString, s.prototype.equals = function(t) {
    if (!s.isBuffer(t))
      throw new TypeError("Argument must be a Buffer");
    return this === t ? !0 : s.compare(this, t) === 0;
  }, s.prototype.inspect = function() {
    let t = "";
    const r = e.INSPECT_MAX_BYTES;
    return t = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(), this.length > r && (t += " ... "), "<Buffer " + t + ">";
  }, c && (s.prototype[c] = s.prototype.inspect), s.prototype.compare = function(t, r, u, a, h) {
    if (k(t, Uint8Array) && (t = s.from(t, t.offset, t.byteLength)), !s.isBuffer(t))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t
      );
    if (r === void 0 && (r = 0), u === void 0 && (u = t ? t.length : 0), a === void 0 && (a = 0), h === void 0 && (h = this.length), r < 0 || u > t.length || a < 0 || h > this.length)
      throw new RangeError("out of range index");
    if (a >= h && r >= u)
      return 0;
    if (a >= h)
      return -1;
    if (r >= u)
      return 1;
    if (r >>>= 0, u >>>= 0, a >>>= 0, h >>>= 0, this === t)
      return 0;
    let y = h - a, g = u - r;
    const L = Math.min(y, g), S = this.slice(a, h), U = t.slice(r, u);
    for (let b = 0; b < L; ++b)
      if (S[b] !== U[b]) {
        y = S[b], g = U[b];
        break;
      }
    return y < g ? -1 : g < y ? 1 : 0;
  };
  function lr(o, t, r, u, a) {
    if (o.length === 0)
      return -1;
    if (typeof r == "string" ? (u = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, Yt(r) && (r = a ? 0 : o.length - 1), r < 0 && (r = o.length + r), r >= o.length) {
      if (a)
        return -1;
      r = o.length - 1;
    } else if (r < 0)
      if (a)
        r = 0;
      else
        return -1;
    if (typeof t == "string" && (t = s.from(t, u)), s.isBuffer(t))
      return t.length === 0 ? -1 : fr(o, t, r, u, a);
    if (typeof t == "number")
      return t = t & 255, typeof Uint8Array.prototype.indexOf == "function" ? a ? Uint8Array.prototype.indexOf.call(o, t, r) : Uint8Array.prototype.lastIndexOf.call(o, t, r) : fr(o, [t], r, u, a);
    throw new TypeError("val must be string, number or Buffer");
  }
  function fr(o, t, r, u, a) {
    let h = 1, y = o.length, g = t.length;
    if (u !== void 0 && (u = String(u).toLowerCase(), u === "ucs2" || u === "ucs-2" || u === "utf16le" || u === "utf-16le")) {
      if (o.length < 2 || t.length < 2)
        return -1;
      h = 2, y /= 2, g /= 2, r /= 2;
    }
    function L(U, b) {
      return h === 1 ? U[b] : U.readUInt16BE(b * h);
    }
    let S;
    if (a) {
      let U = -1;
      for (S = r; S < y; S++)
        if (L(o, S) === L(t, U === -1 ? 0 : S - U)) {
          if (U === -1 && (U = S), S - U + 1 === g)
            return U * h;
        } else
          U !== -1 && (S -= S - U), U = -1;
    } else
      for (r + g > y && (r = y - g), S = r; S >= 0; S--) {
        let U = !0;
        for (let b = 0; b < g; b++)
          if (L(o, S + b) !== L(t, b)) {
            U = !1;
            break;
          }
        if (U)
          return S;
      }
    return -1;
  }
  s.prototype.includes = function(t, r, u) {
    return this.indexOf(t, r, u) !== -1;
  }, s.prototype.indexOf = function(t, r, u) {
    return lr(this, t, r, u, !0);
  }, s.prototype.lastIndexOf = function(t, r, u) {
    return lr(this, t, r, u, !1);
  };
  function Zr(o, t, r, u) {
    r = Number(r) || 0;
    const a = o.length - r;
    u ? (u = Number(u), u > a && (u = a)) : u = a;
    const h = t.length;
    u > h / 2 && (u = h / 2);
    let y;
    for (y = 0; y < u; ++y) {
      const g = parseInt(t.substr(y * 2, 2), 16);
      if (Yt(g))
        return y;
      o[r + y] = g;
    }
    return y;
  }
  function Hr(o, t, r, u) {
    return ft(Gt(t, o.length - r), o, r, u);
  }
  function Vr(o, t, r, u) {
    return ft(ue(t), o, r, u);
  }
  function Qr(o, t, r, u) {
    return ft(Ir(t), o, r, u);
  }
  function Jr(o, t, r, u) {
    return ft(ce(t, o.length - r), o, r, u);
  }
  s.prototype.write = function(t, r, u, a) {
    if (r === void 0)
      a = "utf8", u = this.length, r = 0;
    else if (u === void 0 && typeof r == "string")
      a = r, u = this.length, r = 0;
    else if (isFinite(r))
      r = r >>> 0, isFinite(u) ? (u = u >>> 0, a === void 0 && (a = "utf8")) : (a = u, u = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const h = this.length - r;
    if ((u === void 0 || u > h) && (u = h), t.length > 0 && (u < 0 || r < 0) || r > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    a || (a = "utf8");
    let y = !1;
    for (; ; )
      switch (a) {
        case "hex":
          return Zr(this, t, r, u);
        case "utf8":
        case "utf-8":
          return Hr(this, t, r, u);
        case "ascii":
        case "latin1":
        case "binary":
          return Vr(this, t, r, u);
        case "base64":
          return Qr(this, t, r, u);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Jr(this, t, r, u);
        default:
          if (y)
            throw new TypeError("Unknown encoding: " + a);
          a = ("" + a).toLowerCase(), y = !0;
      }
  }, s.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function Xr(o, t, r) {
    return t === 0 && r === o.length ? n.fromByteArray(o) : n.fromByteArray(o.slice(t, r));
  }
  function hr(o, t, r) {
    r = Math.min(o.length, r);
    const u = [];
    let a = t;
    for (; a < r; ) {
      const h = o[a];
      let y = null, g = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
      if (a + g <= r) {
        let L, S, U, b;
        switch (g) {
          case 1:
            h < 128 && (y = h);
            break;
          case 2:
            L = o[a + 1], (L & 192) === 128 && (b = (h & 31) << 6 | L & 63, b > 127 && (y = b));
            break;
          case 3:
            L = o[a + 1], S = o[a + 2], (L & 192) === 128 && (S & 192) === 128 && (b = (h & 15) << 12 | (L & 63) << 6 | S & 63, b > 2047 && (b < 55296 || b > 57343) && (y = b));
            break;
          case 4:
            L = o[a + 1], S = o[a + 2], U = o[a + 3], (L & 192) === 128 && (S & 192) === 128 && (U & 192) === 128 && (b = (h & 15) << 18 | (L & 63) << 12 | (S & 63) << 6 | U & 63, b > 65535 && b < 1114112 && (y = b));
        }
      }
      y === null ? (y = 65533, g = 1) : y > 65535 && (y -= 65536, u.push(y >>> 10 & 1023 | 55296), y = 56320 | y & 1023), u.push(y), a += g;
    }
    return Kr(u);
  }
  const pr = 4096;
  function Kr(o) {
    const t = o.length;
    if (t <= pr)
      return String.fromCharCode.apply(String, o);
    let r = "", u = 0;
    for (; u < t; )
      r += String.fromCharCode.apply(
        String,
        o.slice(u, u += pr)
      );
    return r;
  }
  function qr(o, t, r) {
    let u = "";
    r = Math.min(o.length, r);
    for (let a = t; a < r; ++a)
      u += String.fromCharCode(o[a] & 127);
    return u;
  }
  function te(o, t, r) {
    let u = "";
    r = Math.min(o.length, r);
    for (let a = t; a < r; ++a)
      u += String.fromCharCode(o[a]);
    return u;
  }
  function re(o, t, r) {
    const u = o.length;
    (!t || t < 0) && (t = 0), (!r || r < 0 || r > u) && (r = u);
    let a = "";
    for (let h = t; h < r; ++h)
      a += se[o[h]];
    return a;
  }
  function ee(o, t, r) {
    const u = o.slice(t, r);
    let a = "";
    for (let h = 0; h < u.length - 1; h += 2)
      a += String.fromCharCode(u[h] + u[h + 1] * 256);
    return a;
  }
  s.prototype.slice = function(t, r) {
    const u = this.length;
    t = ~~t, r = r === void 0 ? u : ~~r, t < 0 ? (t += u, t < 0 && (t = 0)) : t > u && (t = u), r < 0 ? (r += u, r < 0 && (r = 0)) : r > u && (r = u), r < t && (r = t);
    const a = this.subarray(t, r);
    return Object.setPrototypeOf(a, s.prototype), a;
  };
  function M(o, t, r) {
    if (o % 1 !== 0 || o < 0)
      throw new RangeError("offset is not uint");
    if (o + t > r)
      throw new RangeError("Trying to access beyond buffer length");
  }
  s.prototype.readUintLE = s.prototype.readUIntLE = function(t, r, u) {
    t = t >>> 0, r = r >>> 0, u || M(t, r, this.length);
    let a = this[t], h = 1, y = 0;
    for (; ++y < r && (h *= 256); )
      a += this[t + y] * h;
    return a;
  }, s.prototype.readUintBE = s.prototype.readUIntBE = function(t, r, u) {
    t = t >>> 0, r = r >>> 0, u || M(t, r, this.length);
    let a = this[t + --r], h = 1;
    for (; r > 0 && (h *= 256); )
      a += this[t + --r] * h;
    return a;
  }, s.prototype.readUint8 = s.prototype.readUInt8 = function(t, r) {
    return t = t >>> 0, r || M(t, 1, this.length), this[t];
  }, s.prototype.readUint16LE = s.prototype.readUInt16LE = function(t, r) {
    return t = t >>> 0, r || M(t, 2, this.length), this[t] | this[t + 1] << 8;
  }, s.prototype.readUint16BE = s.prototype.readUInt16BE = function(t, r) {
    return t = t >>> 0, r || M(t, 2, this.length), this[t] << 8 | this[t + 1];
  }, s.prototype.readUint32LE = s.prototype.readUInt32LE = function(t, r) {
    return t = t >>> 0, r || M(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + this[t + 3] * 16777216;
  }, s.prototype.readUint32BE = s.prototype.readUInt32BE = function(t, r) {
    return t = t >>> 0, r || M(t, 4, this.length), this[t] * 16777216 + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
  }, s.prototype.readBigUInt64LE = Y(function(t) {
    t = t >>> 0, Q(t, "offset");
    const r = this[t], u = this[t + 7];
    (r === void 0 || u === void 0) && nt(t, this.length - 8);
    const a = r + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24, h = this[++t] + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + u * 2 ** 24;
    return BigInt(a) + (BigInt(h) << BigInt(32));
  }), s.prototype.readBigUInt64BE = Y(function(t) {
    t = t >>> 0, Q(t, "offset");
    const r = this[t], u = this[t + 7];
    (r === void 0 || u === void 0) && nt(t, this.length - 8);
    const a = r * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t], h = this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + u;
    return (BigInt(a) << BigInt(32)) + BigInt(h);
  }), s.prototype.readIntLE = function(t, r, u) {
    t = t >>> 0, r = r >>> 0, u || M(t, r, this.length);
    let a = this[t], h = 1, y = 0;
    for (; ++y < r && (h *= 256); )
      a += this[t + y] * h;
    return h *= 128, a >= h && (a -= Math.pow(2, 8 * r)), a;
  }, s.prototype.readIntBE = function(t, r, u) {
    t = t >>> 0, r = r >>> 0, u || M(t, r, this.length);
    let a = r, h = 1, y = this[t + --a];
    for (; a > 0 && (h *= 256); )
      y += this[t + --a] * h;
    return h *= 128, y >= h && (y -= Math.pow(2, 8 * r)), y;
  }, s.prototype.readInt8 = function(t, r) {
    return t = t >>> 0, r || M(t, 1, this.length), this[t] & 128 ? (255 - this[t] + 1) * -1 : this[t];
  }, s.prototype.readInt16LE = function(t, r) {
    t = t >>> 0, r || M(t, 2, this.length);
    const u = this[t] | this[t + 1] << 8;
    return u & 32768 ? u | 4294901760 : u;
  }, s.prototype.readInt16BE = function(t, r) {
    t = t >>> 0, r || M(t, 2, this.length);
    const u = this[t + 1] | this[t] << 8;
    return u & 32768 ? u | 4294901760 : u;
  }, s.prototype.readInt32LE = function(t, r) {
    return t = t >>> 0, r || M(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
  }, s.prototype.readInt32BE = function(t, r) {
    return t = t >>> 0, r || M(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
  }, s.prototype.readBigInt64LE = Y(function(t) {
    t = t >>> 0, Q(t, "offset");
    const r = this[t], u = this[t + 7];
    (r === void 0 || u === void 0) && nt(t, this.length - 8);
    const a = this[t + 4] + this[t + 5] * 2 ** 8 + this[t + 6] * 2 ** 16 + (u << 24);
    return (BigInt(a) << BigInt(32)) + BigInt(r + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24);
  }), s.prototype.readBigInt64BE = Y(function(t) {
    t = t >>> 0, Q(t, "offset");
    const r = this[t], u = this[t + 7];
    (r === void 0 || u === void 0) && nt(t, this.length - 8);
    const a = (r << 24) + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t];
    return (BigInt(a) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + u);
  }), s.prototype.readFloatLE = function(t, r) {
    return t = t >>> 0, r || M(t, 4, this.length), i.read(this, t, !0, 23, 4);
  }, s.prototype.readFloatBE = function(t, r) {
    return t = t >>> 0, r || M(t, 4, this.length), i.read(this, t, !1, 23, 4);
  }, s.prototype.readDoubleLE = function(t, r) {
    return t = t >>> 0, r || M(t, 8, this.length), i.read(this, t, !0, 52, 8);
  }, s.prototype.readDoubleBE = function(t, r) {
    return t = t >>> 0, r || M(t, 8, this.length), i.read(this, t, !1, 52, 8);
  };
  function _(o, t, r, u, a, h) {
    if (!s.isBuffer(o))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (t > a || t < h)
      throw new RangeError('"value" argument is out of bounds');
    if (r + u > o.length)
      throw new RangeError("Index out of range");
  }
  s.prototype.writeUintLE = s.prototype.writeUIntLE = function(t, r, u, a) {
    if (t = +t, r = r >>> 0, u = u >>> 0, !a) {
      const g = Math.pow(2, 8 * u) - 1;
      _(this, t, r, u, g, 0);
    }
    let h = 1, y = 0;
    for (this[r] = t & 255; ++y < u && (h *= 256); )
      this[r + y] = t / h & 255;
    return r + u;
  }, s.prototype.writeUintBE = s.prototype.writeUIntBE = function(t, r, u, a) {
    if (t = +t, r = r >>> 0, u = u >>> 0, !a) {
      const g = Math.pow(2, 8 * u) - 1;
      _(this, t, r, u, g, 0);
    }
    let h = u - 1, y = 1;
    for (this[r + h] = t & 255; --h >= 0 && (y *= 256); )
      this[r + h] = t / y & 255;
    return r + u;
  }, s.prototype.writeUint8 = s.prototype.writeUInt8 = function(t, r, u) {
    return t = +t, r = r >>> 0, u || _(this, t, r, 1, 255, 0), this[r] = t & 255, r + 1;
  }, s.prototype.writeUint16LE = s.prototype.writeUInt16LE = function(t, r, u) {
    return t = +t, r = r >>> 0, u || _(this, t, r, 2, 65535, 0), this[r] = t & 255, this[r + 1] = t >>> 8, r + 2;
  }, s.prototype.writeUint16BE = s.prototype.writeUInt16BE = function(t, r, u) {
    return t = +t, r = r >>> 0, u || _(this, t, r, 2, 65535, 0), this[r] = t >>> 8, this[r + 1] = t & 255, r + 2;
  }, s.prototype.writeUint32LE = s.prototype.writeUInt32LE = function(t, r, u) {
    return t = +t, r = r >>> 0, u || _(this, t, r, 4, 4294967295, 0), this[r + 3] = t >>> 24, this[r + 2] = t >>> 16, this[r + 1] = t >>> 8, this[r] = t & 255, r + 4;
  }, s.prototype.writeUint32BE = s.prototype.writeUInt32BE = function(t, r, u) {
    return t = +t, r = r >>> 0, u || _(this, t, r, 4, 4294967295, 0), this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = t & 255, r + 4;
  };
  function yr(o, t, r, u, a) {
    xr(t, u, a, o, r, 7);
    let h = Number(t & BigInt(4294967295));
    o[r++] = h, h = h >> 8, o[r++] = h, h = h >> 8, o[r++] = h, h = h >> 8, o[r++] = h;
    let y = Number(t >> BigInt(32) & BigInt(4294967295));
    return o[r++] = y, y = y >> 8, o[r++] = y, y = y >> 8, o[r++] = y, y = y >> 8, o[r++] = y, r;
  }
  function dr(o, t, r, u, a) {
    xr(t, u, a, o, r, 7);
    let h = Number(t & BigInt(4294967295));
    o[r + 7] = h, h = h >> 8, o[r + 6] = h, h = h >> 8, o[r + 5] = h, h = h >> 8, o[r + 4] = h;
    let y = Number(t >> BigInt(32) & BigInt(4294967295));
    return o[r + 3] = y, y = y >> 8, o[r + 2] = y, y = y >> 8, o[r + 1] = y, y = y >> 8, o[r] = y, r + 8;
  }
  s.prototype.writeBigUInt64LE = Y(function(t, r = 0) {
    return yr(this, t, r, BigInt(0), BigInt("0xffffffffffffffff"));
  }), s.prototype.writeBigUInt64BE = Y(function(t, r = 0) {
    return dr(this, t, r, BigInt(0), BigInt("0xffffffffffffffff"));
  }), s.prototype.writeIntLE = function(t, r, u, a) {
    if (t = +t, r = r >>> 0, !a) {
      const L = Math.pow(2, 8 * u - 1);
      _(this, t, r, u, L - 1, -L);
    }
    let h = 0, y = 1, g = 0;
    for (this[r] = t & 255; ++h < u && (y *= 256); )
      t < 0 && g === 0 && this[r + h - 1] !== 0 && (g = 1), this[r + h] = (t / y >> 0) - g & 255;
    return r + u;
  }, s.prototype.writeIntBE = function(t, r, u, a) {
    if (t = +t, r = r >>> 0, !a) {
      const L = Math.pow(2, 8 * u - 1);
      _(this, t, r, u, L - 1, -L);
    }
    let h = u - 1, y = 1, g = 0;
    for (this[r + h] = t & 255; --h >= 0 && (y *= 256); )
      t < 0 && g === 0 && this[r + h + 1] !== 0 && (g = 1), this[r + h] = (t / y >> 0) - g & 255;
    return r + u;
  }, s.prototype.writeInt8 = function(t, r, u) {
    return t = +t, r = r >>> 0, u || _(this, t, r, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[r] = t & 255, r + 1;
  }, s.prototype.writeInt16LE = function(t, r, u) {
    return t = +t, r = r >>> 0, u || _(this, t, r, 2, 32767, -32768), this[r] = t & 255, this[r + 1] = t >>> 8, r + 2;
  }, s.prototype.writeInt16BE = function(t, r, u) {
    return t = +t, r = r >>> 0, u || _(this, t, r, 2, 32767, -32768), this[r] = t >>> 8, this[r + 1] = t & 255, r + 2;
  }, s.prototype.writeInt32LE = function(t, r, u) {
    return t = +t, r = r >>> 0, u || _(this, t, r, 4, 2147483647, -2147483648), this[r] = t & 255, this[r + 1] = t >>> 8, this[r + 2] = t >>> 16, this[r + 3] = t >>> 24, r + 4;
  }, s.prototype.writeInt32BE = function(t, r, u) {
    return t = +t, r = r >>> 0, u || _(this, t, r, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = t & 255, r + 4;
  }, s.prototype.writeBigInt64LE = Y(function(t, r = 0) {
    return yr(this, t, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), s.prototype.writeBigInt64BE = Y(function(t, r = 0) {
    return dr(this, t, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function wr(o, t, r, u, a, h) {
    if (r + u > o.length)
      throw new RangeError("Index out of range");
    if (r < 0)
      throw new RangeError("Index out of range");
  }
  function mr(o, t, r, u, a) {
    return t = +t, r = r >>> 0, a || wr(o, t, r, 4), i.write(o, t, r, u, 23, 4), r + 4;
  }
  s.prototype.writeFloatLE = function(t, r, u) {
    return mr(this, t, r, !0, u);
  }, s.prototype.writeFloatBE = function(t, r, u) {
    return mr(this, t, r, !1, u);
  };
  function gr(o, t, r, u, a) {
    return t = +t, r = r >>> 0, a || wr(o, t, r, 8), i.write(o, t, r, u, 52, 8), r + 8;
  }
  s.prototype.writeDoubleLE = function(t, r, u) {
    return gr(this, t, r, !0, u);
  }, s.prototype.writeDoubleBE = function(t, r, u) {
    return gr(this, t, r, !1, u);
  }, s.prototype.copy = function(t, r, u, a) {
    if (!s.isBuffer(t))
      throw new TypeError("argument should be a Buffer");
    if (u || (u = 0), !a && a !== 0 && (a = this.length), r >= t.length && (r = t.length), r || (r = 0), a > 0 && a < u && (a = u), a === u || t.length === 0 || this.length === 0)
      return 0;
    if (r < 0)
      throw new RangeError("targetStart out of bounds");
    if (u < 0 || u >= this.length)
      throw new RangeError("Index out of range");
    if (a < 0)
      throw new RangeError("sourceEnd out of bounds");
    a > this.length && (a = this.length), t.length - r < a - u && (a = t.length - r + u);
    const h = a - u;
    return this === t && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(r, u, a) : Uint8Array.prototype.set.call(
      t,
      this.subarray(u, a),
      r
    ), h;
  }, s.prototype.fill = function(t, r, u, a) {
    if (typeof t == "string") {
      if (typeof r == "string" ? (a = r, r = 0, u = this.length) : typeof u == "string" && (a = u, u = this.length), a !== void 0 && typeof a != "string")
        throw new TypeError("encoding must be a string");
      if (typeof a == "string" && !s.isEncoding(a))
        throw new TypeError("Unknown encoding: " + a);
      if (t.length === 1) {
        const y = t.charCodeAt(0);
        (a === "utf8" && y < 128 || a === "latin1") && (t = y);
      }
    } else
      typeof t == "number" ? t = t & 255 : typeof t == "boolean" && (t = Number(t));
    if (r < 0 || this.length < r || this.length < u)
      throw new RangeError("Out of range index");
    if (u <= r)
      return this;
    r = r >>> 0, u = u === void 0 ? this.length : u >>> 0, t || (t = 0);
    let h;
    if (typeof t == "number")
      for (h = r; h < u; ++h)
        this[h] = t;
    else {
      const y = s.isBuffer(t) ? t : s.from(t, a), g = y.length;
      if (g === 0)
        throw new TypeError('The value "' + t + '" is invalid for argument "value"');
      for (h = 0; h < u - r; ++h)
        this[h + r] = y[h % g];
    }
    return this;
  };
  const V = {};
  function Wt(o, t, r) {
    V[o] = class extends r {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: t.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${o}]`, this.stack, delete this.name;
      }
      get code() {
        return o;
      }
      set code(a) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: a,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${o}]: ${this.message}`;
      }
    };
  }
  Wt(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(o) {
      return o ? `${o} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), Wt(
    "ERR_INVALID_ARG_TYPE",
    function(o, t) {
      return `The "${o}" argument must be of type number. Received type ${typeof t}`;
    },
    TypeError
  ), Wt(
    "ERR_OUT_OF_RANGE",
    function(o, t, r) {
      let u = `The value of "${o}" is out of range.`, a = r;
      return Number.isInteger(r) && Math.abs(r) > 2 ** 32 ? a = Er(String(r)) : typeof r == "bigint" && (a = String(r), (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (a = Er(a)), a += "n"), u += ` It must be ${t}. Received ${a}`, u;
    },
    RangeError
  );
  function Er(o) {
    let t = "", r = o.length;
    const u = o[0] === "-" ? 1 : 0;
    for (; r >= u + 4; r -= 3)
      t = `_${o.slice(r - 3, r)}${t}`;
    return `${o.slice(0, r)}${t}`;
  }
  function ne(o, t, r) {
    Q(t, "offset"), (o[t] === void 0 || o[t + r] === void 0) && nt(t, o.length - (r + 1));
  }
  function xr(o, t, r, u, a, h) {
    if (o > r || o < t) {
      const y = typeof t == "bigint" ? "n" : "";
      let g;
      throw h > 3 ? t === 0 || t === BigInt(0) ? g = `>= 0${y} and < 2${y} ** ${(h + 1) * 8}${y}` : g = `>= -(2${y} ** ${(h + 1) * 8 - 1}${y}) and < 2 ** ${(h + 1) * 8 - 1}${y}` : g = `>= ${t}${y} and <= ${r}${y}`, new V.ERR_OUT_OF_RANGE("value", g, o);
    }
    ne(u, a, h);
  }
  function Q(o, t) {
    if (typeof o != "number")
      throw new V.ERR_INVALID_ARG_TYPE(t, "number", o);
  }
  function nt(o, t, r) {
    throw Math.floor(o) !== o ? (Q(o, r), new V.ERR_OUT_OF_RANGE(r || "offset", "an integer", o)) : t < 0 ? new V.ERR_BUFFER_OUT_OF_BOUNDS() : new V.ERR_OUT_OF_RANGE(
      r || "offset",
      `>= ${r ? 1 : 0} and <= ${t}`,
      o
    );
  }
  const ie = /[^+/0-9A-Za-z-_]/g;
  function oe(o) {
    if (o = o.split("=")[0], o = o.trim().replace(ie, ""), o.length < 2)
      return "";
    for (; o.length % 4 !== 0; )
      o = o + "=";
    return o;
  }
  function Gt(o, t) {
    t = t || 1 / 0;
    let r;
    const u = o.length;
    let a = null;
    const h = [];
    for (let y = 0; y < u; ++y) {
      if (r = o.charCodeAt(y), r > 55295 && r < 57344) {
        if (!a) {
          if (r > 56319) {
            (t -= 3) > -1 && h.push(239, 191, 189);
            continue;
          } else if (y + 1 === u) {
            (t -= 3) > -1 && h.push(239, 191, 189);
            continue;
          }
          a = r;
          continue;
        }
        if (r < 56320) {
          (t -= 3) > -1 && h.push(239, 191, 189), a = r;
          continue;
        }
        r = (a - 55296 << 10 | r - 56320) + 65536;
      } else
        a && (t -= 3) > -1 && h.push(239, 191, 189);
      if (a = null, r < 128) {
        if ((t -= 1) < 0)
          break;
        h.push(r);
      } else if (r < 2048) {
        if ((t -= 2) < 0)
          break;
        h.push(
          r >> 6 | 192,
          r & 63 | 128
        );
      } else if (r < 65536) {
        if ((t -= 3) < 0)
          break;
        h.push(
          r >> 12 | 224,
          r >> 6 & 63 | 128,
          r & 63 | 128
        );
      } else if (r < 1114112) {
        if ((t -= 4) < 0)
          break;
        h.push(
          r >> 18 | 240,
          r >> 12 & 63 | 128,
          r >> 6 & 63 | 128,
          r & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return h;
  }
  function ue(o) {
    const t = [];
    for (let r = 0; r < o.length; ++r)
      t.push(o.charCodeAt(r) & 255);
    return t;
  }
  function ce(o, t) {
    let r, u, a;
    const h = [];
    for (let y = 0; y < o.length && !((t -= 2) < 0); ++y)
      r = o.charCodeAt(y), u = r >> 8, a = r % 256, h.push(a), h.push(u);
    return h;
  }
  function Ir(o) {
    return n.toByteArray(oe(o));
  }
  function ft(o, t, r, u) {
    let a;
    for (a = 0; a < u && !(a + r >= t.length || a >= o.length); ++a)
      t[a + r] = o[a];
    return a;
  }
  function k(o, t) {
    return o instanceof t || o != null && o.constructor != null && o.constructor.name != null && o.constructor.name === t.name;
  }
  function Yt(o) {
    return o !== o;
  }
  const se = function() {
    const o = "0123456789abcdef", t = new Array(256);
    for (let r = 0; r < 16; ++r) {
      const u = r * 16;
      for (let a = 0; a < 16; ++a)
        t[u + a] = o[r] + o[a];
    }
    return t;
  }();
  function Y(o) {
    return typeof BigInt > "u" ? ae : o;
  }
  function ae() {
    throw new Error("BigInt not supported");
  }
})(tr);
var xe = globalThis && globalThis.__classPrivateFieldSet || function(e, n, i, c, l) {
  if (c === "m")
    throw new TypeError("Private method is not writable");
  if (c === "a" && !l)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof n == "function" ? e !== n || !l : !n.has(e))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return c === "a" ? l.call(e, i) : l ? l.value = i : n.set(e, i), i;
}, Ie = globalThis && globalThis.__classPrivateFieldGet || function(e, n, i, c) {
  if (i === "a" && !c)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof n == "function" ? e !== n || !c : !n.has(e))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return i === "m" ? c : i === "a" ? c.call(e) : c ? c.value : n.get(e);
}, dt;
function be(e) {
  const n = ({ register: i }) => i(e);
  try {
    window.dispatchEvent(new Be(n));
  } catch (i) {
    console.error(`wallet-standard:register-wallet event could not be dispatched
`, i);
  }
  try {
    window.addEventListener("wallet-standard:app-ready", ({ detail: i }) => n(i));
  } catch (i) {
    console.error(`wallet-standard:app-ready event listener could not be added
`, i);
  }
}
class Be extends Event {
  constructor(n) {
    super("wallet-standard:register-wallet", {
      bubbles: !1,
      cancelable: !1,
      composed: !1
    }), dt.set(this, void 0), xe(this, dt, n, "f");
  }
  get detail() {
    return Ie(this, dt, "f");
  }
  get type() {
    return "wallet-standard:register-wallet";
  }
  preventDefault() {
    throw new Error("preventDefault cannot be called");
  }
  stopImmediatePropagation() {
    throw new Error("stopImmediatePropagation cannot be called");
  }
  stopPropagation() {
    throw new Error("stopPropagation cannot be called");
  }
}
dt = /* @__PURE__ */ new WeakMap();
var X = globalThis && globalThis.__classPrivateFieldSet || function(e, n, i, c, l) {
  if (c === "m")
    throw new TypeError("Private method is not writable");
  if (c === "a" && !l)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof n == "function" ? e !== n || !l : !n.has(e))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return c === "a" ? l.call(e, i) : l ? l.value = i : n.set(e, i), i;
}, K = globalThis && globalThis.__classPrivateFieldGet || function(e, n, i, c) {
  if (i === "a" && !c)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof n == "function" ? e !== n || !c : !n.has(e))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return i === "m" ? c : i === "a" ? c.call(e) : c ? c.value : n.get(e);
}, wt, mt, gt, Et, xt, It;
class er {
  constructor(n) {
    wt.set(this, void 0), mt.set(this, void 0), gt.set(this, void 0), Et.set(this, void 0), xt.set(this, void 0), It.set(this, void 0), new.target === er && Object.freeze(this), X(this, wt, n.address, "f"), X(this, mt, n.publicKey.slice(), "f"), X(this, gt, n.chains.slice(), "f"), X(this, Et, n.features.slice(), "f"), X(this, xt, n.label, "f"), X(this, It, n.icon, "f");
  }
  get address() {
    return K(this, wt, "f");
  }
  get publicKey() {
    return K(this, mt, "f").slice();
  }
  get chains() {
    return K(this, gt, "f").slice();
  }
  get features() {
    return K(this, Et, "f").slice();
  }
  get label() {
    return K(this, xt, "f");
  }
  get icon() {
    return K(this, It, "f");
  }
}
wt = /* @__PURE__ */ new WeakMap(), mt = /* @__PURE__ */ new WeakMap(), gt = /* @__PURE__ */ new WeakMap(), Et = /* @__PURE__ */ new WeakMap(), xt = /* @__PURE__ */ new WeakMap(), It = /* @__PURE__ */ new WeakMap();
const Ae = "sui:devnet", Se = "sui:testnet", Te = "sui:mainnet", ve = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMjQiIGZpbGw9InVybCgjcGFpbnQwX3JhZGlhbF8zMDVfMTI1MTYpIi8+PHBhdGggZD0iTTUxLjUgNDMuNmMtMy45IDAtNy42LTMuOS05LjUtNi40LTEuOSAyLjUtNS42IDYuNC05LjUgNi40LTQgMC03LjctMy45LTkuNS02LjQtMS44IDIuNS01LjUgNi40LTkuNSA2LjQtLjggMC0xLjUtLjYtMS41LTEuNSAwLS44LjctMS41IDEuNS0xLjUgMy4yIDAgNy4xLTUuMSA4LjItNi45LjMtLjQuOC0uNyAxLjMtLjdzMSAuMiAxLjMuN2MxLjEgMS44IDUgNi45IDguMiA2LjkgMy4xIDAgNy4xLTUuMSA4LjItNi45LjMtLjQuOC0uNyAxLjMtLjdzMSAuMiAxLjIuN2MxLjEgMS44IDUgNi45IDguMiA2LjkuOSAwIDEuNi43IDEuNiAxLjUgMCAuOS0uNiAxLjUtMS41IDEuNXoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNTEuNSA1Mi4zYy0zLjkgMC03LjYtMy45LTkuNS02LjQtMS45IDIuNS01LjYgNi40LTkuNSA2LjQtNCAwLTcuNy0zLjktOS41LTYuNC0xLjggMi41LTUuNSA2LjQtOS41IDYuNC0uOCAwLTEuNS0uNi0xLjUtMS41IDAtLjguNy0xLjUgMS41LTEuNSAzLjIgMCA3LjEtNS4xIDguMi02LjkuMy0uNC44LS43IDEuMy0uN3MxIC4zIDEuMy43YzEuMSAxLjggNSA2LjkgOC4yIDYuOSAzLjEgMCA3LjEtNS4xIDguMi02LjkuMy0uNC44LS43IDEuMy0uN3MxIC4zIDEuMi43YzEuMSAxLjggNSA2LjkgOC4yIDYuOS45IDAgMS42LjcgMS42IDEuNSAwIC45LS42IDEuNS0xLjUgMS41ek0xNC42IDM2LjdjLS44IDAtMS40LS41LTEuNi0xLjNsLS4zLTMuNmMwLTEwLjkgOC45LTE5LjggMTkuOC0xOS44IDExIDAgMTkuOCA4LjkgMTkuOCAxOS44bC0uMyAzLjZjLS4xLjgtLjkgMS40LTEuNyAxLjItLjktLjEtMS41LS45LTEuMy0xLjhsLjMtM2MwLTkuMi03LjUtMTYuOC0xNi44LTE2LjgtOS4yIDAtMTYuNyA3LjUtMTYuNyAxNi44bC4yIDMuMWMuMi44LS4zIDEuNi0xLjEgMS44aC0uM3oiIGZpbGw9IiNmZmYiLz48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9yYWRpYWxfMzA1XzEyNTE2IiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDUyLjc1ODAzIDUxLjM1OCAtNTEuNDM5NDcgNTIuODQxNzIgMCA3LjQwNykiPjxzdG9wIHN0b3AtY29sb3I9IiMwMDU4REQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM2N0M4RkYiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48L3N2Zz4=";
var Vt = function(e, n) {
  return Vt = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, c) {
    i.__proto__ = c;
  } || function(i, c) {
    for (var l in c)
      Object.prototype.hasOwnProperty.call(c, l) && (i[l] = c[l]);
  }, Vt(e, n);
};
function nr(e, n) {
  if (typeof n != "function" && n !== null)
    throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
  Vt(e, n);
  function i() {
    this.constructor = e;
  }
  e.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
}
function Le(e, n, i, c) {
  function l(f) {
    return f instanceof i ? f : new i(function(p) {
      p(f);
    });
  }
  return new (i || (i = Promise))(function(f, p) {
    function s(m) {
      try {
        w(c.next(m));
      } catch (x) {
        p(x);
      }
    }
    function d(m) {
      try {
        w(c.throw(m));
      } catch (x) {
        p(x);
      }
    }
    function w(m) {
      m.done ? f(m.value) : l(m.value).then(s, d);
    }
    w((c = c.apply(e, n || [])).next());
  });
}
function Fr(e, n) {
  var i = { label: 0, sent: function() {
    if (f[0] & 1)
      throw f[1];
    return f[1];
  }, trys: [], ops: [] }, c, l, f, p;
  return p = { next: s(0), throw: s(1), return: s(2) }, typeof Symbol == "function" && (p[Symbol.iterator] = function() {
    return this;
  }), p;
  function s(w) {
    return function(m) {
      return d([w, m]);
    };
  }
  function d(w) {
    if (c)
      throw new TypeError("Generator is already executing.");
    for (; p && (p = 0, w[0] && (i = 0)), i; )
      try {
        if (c = 1, l && (f = w[0] & 2 ? l.return : w[0] ? l.throw || ((f = l.return) && f.call(l), 0) : l.next) && !(f = f.call(l, w[1])).done)
          return f;
        switch (l = 0, f && (w = [w[0] & 2, f.value]), w[0]) {
          case 0:
          case 1:
            f = w;
            break;
          case 4:
            return i.label++, { value: w[1], done: !1 };
          case 5:
            i.label++, l = w[1], w = [0];
            continue;
          case 7:
            w = i.ops.pop(), i.trys.pop();
            continue;
          default:
            if (f = i.trys, !(f = f.length > 0 && f[f.length - 1]) && (w[0] === 6 || w[0] === 2)) {
              i = 0;
              continue;
            }
            if (w[0] === 3 && (!f || w[1] > f[0] && w[1] < f[3])) {
              i.label = w[1];
              break;
            }
            if (w[0] === 6 && i.label < f[1]) {
              i.label = f[1], f = w;
              break;
            }
            if (f && i.label < f[2]) {
              i.label = f[2], i.ops.push(w);
              break;
            }
            f[2] && i.ops.pop(), i.trys.pop();
            continue;
        }
        w = n.call(e, i);
      } catch (m) {
        w = [6, m], l = 0;
      } finally {
        c = f = 0;
      }
    if (w[0] & 5)
      throw w[1];
    return { value: w[0] ? w[1] : void 0, done: !0 };
  }
}
function it(e) {
  var n = typeof Symbol == "function" && Symbol.iterator, i = n && e[n], c = 0;
  if (i)
    return i.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function() {
        return e && c >= e.length && (e = void 0), { value: e && e[c++], done: !e };
      }
    };
  throw new TypeError(n ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function et(e, n) {
  var i = typeof Symbol == "function" && e[Symbol.iterator];
  if (!i)
    return e;
  var c = i.call(e), l, f = [], p;
  try {
    for (; (n === void 0 || n-- > 0) && !(l = c.next()).done; )
      f.push(l.value);
  } catch (s) {
    p = { error: s };
  } finally {
    try {
      l && !l.done && (i = c.return) && i.call(c);
    } finally {
      if (p)
        throw p.error;
    }
  }
  return f;
}
function ot(e, n, i) {
  if (i || arguments.length === 2)
    for (var c = 0, l = n.length, f; c < l; c++)
      (f || !(c in n)) && (f || (f = Array.prototype.slice.call(n, 0, c)), f[c] = n[c]);
  return e.concat(f || Array.prototype.slice.call(n));
}
function q(e) {
  return this instanceof q ? (this.v = e, this) : new q(e);
}
function Ue(e, n, i) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var c = i.apply(e, n || []), l, f = [];
  return l = {}, p("next"), p("throw"), p("return"), l[Symbol.asyncIterator] = function() {
    return this;
  }, l;
  function p(E) {
    c[E] && (l[E] = function(I) {
      return new Promise(function(N, A) {
        f.push([E, I, N, A]) > 1 || s(E, I);
      });
    });
  }
  function s(E, I) {
    try {
      d(c[E](I));
    } catch (N) {
      x(f[0][3], N);
    }
  }
  function d(E) {
    E.value instanceof q ? Promise.resolve(E.value.v).then(w, m) : x(f[0][2], E);
  }
  function w(E) {
    s("next", E);
  }
  function m(E) {
    s("throw", E);
  }
  function x(E, I) {
    E(I), f.shift(), f.length && s(f[0][0], f[0][1]);
  }
}
function Me(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = e[Symbol.asyncIterator], i;
  return n ? n.call(e) : (e = typeof it == "function" ? it(e) : e[Symbol.iterator](), i = {}, c("next"), c("throw"), c("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function c(f) {
    i[f] = e[f] && function(p) {
      return new Promise(function(s, d) {
        p = e[f](p), l(s, d, p.done, p.value);
      });
    };
  }
  function l(f, p, s, d) {
    Promise.resolve(d).then(function(w) {
      f({ value: w, done: s });
    }, p);
  }
}
function v(e) {
  return typeof e == "function";
}
function Nr(e) {
  var n = function(c) {
    Error.call(c), c.stack = new Error().stack;
  }, i = e(n);
  return i.prototype = Object.create(Error.prototype), i.prototype.constructor = i, i;
}
var Zt = Nr(function(e) {
  return function(i) {
    e(this), this.message = i ? i.length + ` errors occurred during unsubscription:
` + i.map(function(c, l) {
      return l + 1 + ") " + c.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = i;
  };
});
function br(e, n) {
  if (e) {
    var i = e.indexOf(n);
    0 <= i && e.splice(i, 1);
  }
}
var ir = function() {
  function e(n) {
    this.initialTeardown = n, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return e.prototype.unsubscribe = function() {
    var n, i, c, l, f;
    if (!this.closed) {
      this.closed = !0;
      var p = this._parentage;
      if (p)
        if (this._parentage = null, Array.isArray(p))
          try {
            for (var s = it(p), d = s.next(); !d.done; d = s.next()) {
              var w = d.value;
              w.remove(this);
            }
          } catch (A) {
            n = { error: A };
          } finally {
            try {
              d && !d.done && (i = s.return) && i.call(s);
            } finally {
              if (n)
                throw n.error;
            }
          }
        else
          p.remove(this);
      var m = this.initialTeardown;
      if (v(m))
        try {
          m();
        } catch (A) {
          f = A instanceof Zt ? A.errors : [A];
        }
      var x = this._finalizers;
      if (x) {
        this._finalizers = null;
        try {
          for (var E = it(x), I = E.next(); !I.done; I = E.next()) {
            var N = I.value;
            try {
              Br(N);
            } catch (A) {
              f = f != null ? f : [], A instanceof Zt ? f = ot(ot([], et(f)), et(A.errors)) : f.push(A);
            }
          }
        } catch (A) {
          c = { error: A };
        } finally {
          try {
            I && !I.done && (l = E.return) && l.call(E);
          } finally {
            if (c)
              throw c.error;
          }
        }
      }
      if (f)
        throw new Zt(f);
    }
  }, e.prototype.add = function(n) {
    var i;
    if (n && n !== this)
      if (this.closed)
        Br(n);
      else {
        if (n instanceof e) {
          if (n.closed || n._hasParent(this))
            return;
          n._addParent(this);
        }
        (this._finalizers = (i = this._finalizers) !== null && i !== void 0 ? i : []).push(n);
      }
  }, e.prototype._hasParent = function(n) {
    var i = this._parentage;
    return i === n || Array.isArray(i) && i.includes(n);
  }, e.prototype._addParent = function(n) {
    var i = this._parentage;
    this._parentage = Array.isArray(i) ? (i.push(n), i) : i ? [i, n] : n;
  }, e.prototype._removeParent = function(n) {
    var i = this._parentage;
    i === n ? this._parentage = null : Array.isArray(i) && br(i, n);
  }, e.prototype.remove = function(n) {
    var i = this._finalizers;
    i && br(i, n), n instanceof e && n._removeParent(this);
  }, e.EMPTY = function() {
    var n = new e();
    return n.closed = !0, n;
  }(), e;
}();
ir.EMPTY;
function _r(e) {
  return e instanceof ir || e && "closed" in e && v(e.remove) && v(e.add) && v(e.unsubscribe);
}
function Br(e) {
  v(e) ? e() : e.unsubscribe();
}
var Cr = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, Qt = {
  setTimeout: function(e, n) {
    for (var i = [], c = 2; c < arguments.length; c++)
      i[c - 2] = arguments[c];
    var l = Qt.delegate;
    return l != null && l.setTimeout ? l.setTimeout.apply(l, ot([e, n], et(i))) : setTimeout.apply(void 0, ot([e, n], et(i)));
  },
  clearTimeout: function(e) {
    var n = Qt.delegate;
    return ((n == null ? void 0 : n.clearTimeout) || clearTimeout)(e);
  },
  delegate: void 0
};
function jr(e) {
  Qt.setTimeout(function() {
    throw e;
  });
}
function Ar() {
}
function Fe(e) {
  e();
}
var or = function(e) {
  nr(n, e);
  function n(i) {
    var c = e.call(this) || this;
    return c.isStopped = !1, i ? (c.destination = i, _r(i) && i.add(c)) : c.destination = je, c;
  }
  return n.create = function(i, c, l) {
    return new Jt(i, c, l);
  }, n.prototype.next = function(i) {
    this.isStopped || this._next(i);
  }, n.prototype.error = function(i) {
    this.isStopped || (this.isStopped = !0, this._error(i));
  }, n.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, n.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
  }, n.prototype._next = function(i) {
    this.destination.next(i);
  }, n.prototype._error = function(i) {
    try {
      this.destination.error(i);
    } finally {
      this.unsubscribe();
    }
  }, n.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, n;
}(ir), Ne = Function.prototype.bind;
function Ht(e, n) {
  return Ne.call(e, n);
}
var _e = function() {
  function e(n) {
    this.partialObserver = n;
  }
  return e.prototype.next = function(n) {
    var i = this.partialObserver;
    if (i.next)
      try {
        i.next(n);
      } catch (c) {
        pt(c);
      }
  }, e.prototype.error = function(n) {
    var i = this.partialObserver;
    if (i.error)
      try {
        i.error(n);
      } catch (c) {
        pt(c);
      }
    else
      pt(n);
  }, e.prototype.complete = function() {
    var n = this.partialObserver;
    if (n.complete)
      try {
        n.complete();
      } catch (i) {
        pt(i);
      }
  }, e;
}(), Jt = function(e) {
  nr(n, e);
  function n(i, c, l) {
    var f = e.call(this) || this, p;
    if (v(i) || !i)
      p = {
        next: i != null ? i : void 0,
        error: c != null ? c : void 0,
        complete: l != null ? l : void 0
      };
    else {
      var s;
      f && Cr.useDeprecatedNextContext ? (s = Object.create(i), s.unsubscribe = function() {
        return f.unsubscribe();
      }, p = {
        next: i.next && Ht(i.next, s),
        error: i.error && Ht(i.error, s),
        complete: i.complete && Ht(i.complete, s)
      }) : p = i;
    }
    return f.destination = new _e(p), f;
  }
  return n;
}(or);
function pt(e) {
  jr(e);
}
function Ce(e) {
  throw e;
}
var je = {
  closed: !0,
  next: Ar,
  error: Ce,
  complete: Ar
}, ur = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function ke(e) {
  return e;
}
function Re(e) {
  return e.length === 0 ? ke : e.length === 1 ? e[0] : function(i) {
    return e.reduce(function(c, l) {
      return l(c);
    }, i);
  };
}
var z = function() {
  function e(n) {
    n && (this._subscribe = n);
  }
  return e.prototype.lift = function(n) {
    var i = new e();
    return i.source = this, i.operator = n, i;
  }, e.prototype.subscribe = function(n, i, c) {
    var l = this, f = Pe(n) ? n : new Jt(n, i, c);
    return Fe(function() {
      var p = l, s = p.operator, d = p.source;
      f.add(s ? s.call(f, d) : d ? l._subscribe(f) : l._trySubscribe(f));
    }), f;
  }, e.prototype._trySubscribe = function(n) {
    try {
      return this._subscribe(n);
    } catch (i) {
      n.error(i);
    }
  }, e.prototype.forEach = function(n, i) {
    var c = this;
    return i = Sr(i), new i(function(l, f) {
      var p = new Jt({
        next: function(s) {
          try {
            n(s);
          } catch (d) {
            f(d), p.unsubscribe();
          }
        },
        error: f,
        complete: l
      });
      c.subscribe(p);
    });
  }, e.prototype._subscribe = function(n) {
    var i;
    return (i = this.source) === null || i === void 0 ? void 0 : i.subscribe(n);
  }, e.prototype[ur] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var n = [], i = 0; i < arguments.length; i++)
      n[i] = arguments[i];
    return Re(n)(this);
  }, e.prototype.toPromise = function(n) {
    var i = this;
    return n = Sr(n), new n(function(c, l) {
      var f;
      i.subscribe(function(p) {
        return f = p;
      }, function(p) {
        return l(p);
      }, function() {
        return c(f);
      });
    });
  }, e.create = function(n) {
    return new e(n);
  }, e;
}();
function Sr(e) {
  var n;
  return (n = e != null ? e : Cr.Promise) !== null && n !== void 0 ? n : Promise;
}
function De(e) {
  return e && v(e.next) && v(e.error) && v(e.complete);
}
function Pe(e) {
  return e && e instanceof or || De(e) && _r(e);
}
function Oe(e) {
  return v(e == null ? void 0 : e.lift);
}
function Ot(e) {
  return function(n) {
    if (Oe(n))
      return n.lift(function(i) {
        try {
          return e(i, this);
        } catch (c) {
          this.error(c);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function ut(e, n, i, c, l) {
  return new We(e, n, i, c, l);
}
var We = function(e) {
  nr(n, e);
  function n(i, c, l, f, p, s) {
    var d = e.call(this, i) || this;
    return d.onFinalize = p, d.shouldUnsubscribe = s, d._next = c ? function(w) {
      try {
        c(w);
      } catch (m) {
        i.error(m);
      }
    } : e.prototype._next, d._error = f ? function(w) {
      try {
        f(w);
      } catch (m) {
        i.error(m);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._error, d._complete = l ? function() {
      try {
        l();
      } catch (w) {
        i.error(w);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._complete, d;
  }
  return n.prototype.unsubscribe = function() {
    var i;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var c = this.closed;
      e.prototype.unsubscribe.call(this), !c && ((i = this.onFinalize) === null || i === void 0 || i.call(this));
    }
  }, n;
}(or), Ge = new z(function(e) {
  return e.complete();
}), kr = function(e) {
  return e && typeof e.length == "number" && typeof e != "function";
};
function Ye(e) {
  return v(e == null ? void 0 : e.then);
}
function $e(e) {
  return v(e[ur]);
}
function ze(e) {
  return Symbol.asyncIterator && v(e == null ? void 0 : e[Symbol.asyncIterator]);
}
function Ze(e) {
  return new TypeError("You provided " + (e !== null && typeof e == "object" ? "an invalid object" : "'" + e + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function He() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var Ve = He();
function Qe(e) {
  return v(e == null ? void 0 : e[Ve]);
}
function Je(e) {
  return Ue(this, arguments, function() {
    var i, c, l, f;
    return Fr(this, function(p) {
      switch (p.label) {
        case 0:
          i = e.getReader(), p.label = 1;
        case 1:
          p.trys.push([1, , 9, 10]), p.label = 2;
        case 2:
          return [4, q(i.read())];
        case 3:
          return c = p.sent(), l = c.value, f = c.done, f ? [4, q(void 0)] : [3, 5];
        case 4:
          return [2, p.sent()];
        case 5:
          return [4, q(l)];
        case 6:
          return [4, p.sent()];
        case 7:
          return p.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return i.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function Xe(e) {
  return v(e == null ? void 0 : e.getReader);
}
function cr(e) {
  if (e instanceof z)
    return e;
  if (e != null) {
    if ($e(e))
      return Ke(e);
    if (kr(e))
      return qe(e);
    if (Ye(e))
      return tn(e);
    if (ze(e))
      return Rr(e);
    if (Qe(e))
      return rn(e);
    if (Xe(e))
      return en(e);
  }
  throw Ze(e);
}
function Ke(e) {
  return new z(function(n) {
    var i = e[ur]();
    if (v(i.subscribe))
      return i.subscribe(n);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function qe(e) {
  return new z(function(n) {
    for (var i = 0; i < e.length && !n.closed; i++)
      n.next(e[i]);
    n.complete();
  });
}
function tn(e) {
  return new z(function(n) {
    e.then(function(i) {
      n.closed || (n.next(i), n.complete());
    }, function(i) {
      return n.error(i);
    }).then(null, jr);
  });
}
function rn(e) {
  return new z(function(n) {
    var i, c;
    try {
      for (var l = it(e), f = l.next(); !f.done; f = l.next()) {
        var p = f.value;
        if (n.next(p), n.closed)
          return;
      }
    } catch (s) {
      i = { error: s };
    } finally {
      try {
        f && !f.done && (c = l.return) && c.call(l);
      } finally {
        if (i)
          throw i.error;
      }
    }
    n.complete();
  });
}
function Rr(e) {
  return new z(function(n) {
    nn(e, n).catch(function(i) {
      return n.error(i);
    });
  });
}
function en(e) {
  return Rr(Je(e));
}
function nn(e, n) {
  var i, c, l, f;
  return Le(this, void 0, void 0, function() {
    var p, s;
    return Fr(this, function(d) {
      switch (d.label) {
        case 0:
          d.trys.push([0, 5, 6, 11]), i = Me(e), d.label = 1;
        case 1:
          return [4, i.next()];
        case 2:
          if (c = d.sent(), !!c.done)
            return [3, 4];
          if (p = c.value, n.next(p), n.closed)
            return [2];
          d.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return s = d.sent(), l = { error: s }, [3, 11];
        case 6:
          return d.trys.push([6, , 9, 10]), c && !c.done && (f = i.return) ? [4, f.call(i)] : [3, 8];
        case 7:
          d.sent(), d.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (l)
            throw l.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return n.complete(), [2];
      }
    });
  });
}
function on(e, n, i, c, l) {
  c === void 0 && (c = 0), l === void 0 && (l = !1);
  var f = n.schedule(function() {
    i(), l ? e.add(this.schedule(null, c)) : this.unsubscribe();
  }, c);
  if (e.add(f), !l)
    return f;
}
var un = Nr(function(e) {
  return function() {
    e(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
function cn(e, n) {
  var i = typeof n == "object";
  return new Promise(function(c, l) {
    var f = !1, p;
    e.subscribe({
      next: function(s) {
        p = s, f = !0;
      },
      error: l,
      complete: function() {
        f ? c(p) : i ? c(n.defaultValue) : l(new un());
      }
    });
  });
}
function bt(e, n) {
  return Ot(function(i, c) {
    var l = 0;
    i.subscribe(ut(c, function(f) {
      c.next(e.call(n, f, l++));
    }));
  });
}
var sn = Array.isArray;
function an(e, n) {
  return sn(n) ? e.apply(void 0, ot([], et(n))) : e(n);
}
function ln(e) {
  return bt(function(n) {
    return an(e, n);
  });
}
function fn(e, n, i, c, l, f, p, s) {
  var d = [], w = 0, m = 0, x = !1, E = function() {
    x && !d.length && !w && n.complete();
  }, I = function(A) {
    return w < c ? N(A) : d.push(A);
  }, N = function(A) {
    f && n.next(A), w++;
    var lt = !1;
    cr(i(A, m++)).subscribe(ut(n, function(P) {
      l == null || l(P), f ? I(P) : n.next(P);
    }, function() {
      lt = !0;
    }, void 0, function() {
      if (lt)
        try {
          w--;
          for (var P = function() {
            var H = d.shift();
            p ? on(n, p, function() {
              return N(H);
            }) : N(H);
          }; d.length && w < c; )
            P();
          E();
        } catch (H) {
          n.error(H);
        }
    }));
  };
  return e.subscribe(ut(n, I, function() {
    x = !0, E();
  })), function() {
    s == null || s();
  };
}
function Dr(e, n, i) {
  return i === void 0 && (i = 1 / 0), v(n) ? Dr(function(c, l) {
    return bt(function(f, p) {
      return n(c, f, l, p);
    })(cr(e(c, l)));
  }, i) : (typeof n == "number" && (i = n), Ot(function(c, l) {
    return fn(c, l, e, i);
  }));
}
var hn = ["addListener", "removeListener"], pn = ["addEventListener", "removeEventListener"], yn = ["on", "off"];
function Xt(e, n, i, c) {
  if (v(i) && (c = i, i = void 0), c)
    return Xt(e, n, i).pipe(ln(c));
  var l = et(mn(e) ? pn.map(function(s) {
    return function(d) {
      return e[s](n, d, i);
    };
  }) : dn(e) ? hn.map(Tr(e, n)) : wn(e) ? yn.map(Tr(e, n)) : [], 2), f = l[0], p = l[1];
  if (!f && kr(e))
    return Dr(function(s) {
      return Xt(s, n, i);
    })(cr(e));
  if (!f)
    throw new TypeError("Invalid event target");
  return new z(function(s) {
    var d = function() {
      for (var w = [], m = 0; m < arguments.length; m++)
        w[m] = arguments[m];
      return s.next(1 < w.length ? w : w[0]);
    };
    return f(d), function() {
      return p(d);
    };
  });
}
function Tr(e, n) {
  return function(i) {
    return function(c) {
      return e[i](n, c);
    };
  };
}
function dn(e) {
  return v(e.addListener) && v(e.removeListener);
}
function wn(e) {
  return v(e.on) && v(e.off);
}
function mn(e) {
  return v(e.addEventListener) && v(e.removeEventListener);
}
function vr(e, n) {
  return Ot(function(i, c) {
    var l = 0;
    i.subscribe(ut(c, function(f) {
      return e.call(n, f, l++) && c.next(f);
    }));
  });
}
function gn(e) {
  return e <= 0 ? function() {
    return Ge;
  } : Ot(function(n, i) {
    var c = 0;
    n.subscribe(ut(i, function(l) {
      ++c <= e && (i.next(l), e <= c && i.complete());
    }));
  });
}
var tt, ct, st, at;
class En {
  constructor(n, i, c) {
    T(this, tt, void 0);
    T(this, ct, void 0);
    T(this, st, void 0);
    T(this, at, void 0);
    if (n === i)
      throw new Error(
        "[WindowMessageStream] source and target must be different"
      );
    O(this, ct, n), O(this, st, i), O(this, at, c), O(this, tt, Xt(
      window,
      "message"
    ).pipe(
      vr((l) => {
        var f;
        return l.origin === B(this, at) && ((f = l.data) == null ? void 0 : f.target) === B(this, ct);
      }),
      bt((l) => l.data)
    ));
  }
  async post(n) {
    const i = {
      target: B(this, st),
      payload: n
    };
    return typeof __REACT_NATIVE__ < "u" && __REACT_NATIVE__ ? window.ReactNativeWebView.postMessage(JSON.stringify(i)) : window.postMessage(i), await cn(
      B(this, tt).pipe(
        vr((c) => c.payload.id === n.id),
        bt((c) => c.payload),
        gn(1)
      )
    );
  }
  subscribe(n) {
    return B(this, tt).subscribe(n);
  }
}
tt = new WeakMap(), ct = new WeakMap(), st = new WeakMap(), at = new WeakMap();
let yt;
const xn = new Uint8Array(16);
function In() {
  if (!yt && (yt = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !yt))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return yt(xn);
}
const F = [];
for (let e = 0; e < 256; ++e)
  F.push((e + 256).toString(16).slice(1));
function bn(e, n = 0) {
  return (F[e[n + 0]] + F[e[n + 1]] + F[e[n + 2]] + F[e[n + 3]] + "-" + F[e[n + 4]] + F[e[n + 5]] + "-" + F[e[n + 6]] + F[e[n + 7]] + "-" + F[e[n + 8]] + F[e[n + 9]] + "-" + F[e[n + 10]] + F[e[n + 11]] + F[e[n + 12]] + F[e[n + 13]] + F[e[n + 14]] + F[e[n + 15]]).toLowerCase();
}
const Bn = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Lr = {
  randomUUID: Bn
};
function An(e, n, i) {
  if (Lr.randomUUID && !n && !e)
    return Lr.randomUUID();
  e = e || {};
  const c = e.random || (e.rng || In)();
  if (c[6] = c[6] & 15 | 64, c[8] = c[8] & 63 | 128, n) {
    i = i || 0;
    for (let l = 0; l < 16; ++l)
      n[i + l] = c[l];
    return n;
  }
  return bn(c);
}
var Kt = /* @__PURE__ */ ((e) => (e.DAPP = "DAPP_WITH_SUIET", e.SUIET_CONTENT = "SUIET_CONTENT", e))(Kt || {}), qt = /* @__PURE__ */ ((e) => (e.NETWORK_SWITCH = "SUIET_NETWORK_SWITCH", e))(qt || {});
function Sn(e, n, i) {
  return {
    id: An(),
    funcName: e,
    payload: n,
    options: i
  };
}
var Bt = /* @__PURE__ */ ((e) => (e.VIEW_ACCOUNT = "viewAccount", e.SUGGEST_TX = "suggestTransactions", e))(Bt || {});
Object.values(Bt);
function Tn(e) {
  return { all: e = e || /* @__PURE__ */ new Map(), on: function(n, i) {
    var c = e.get(n);
    c ? c.push(i) : e.set(n, [i]);
  }, off: function(n, i) {
    var c = e.get(n);
    c && (i ? c.splice(c.indexOf(i) >>> 0, 1) : e.set(n, []));
  }, emit: function(n, i) {
    var c = e.get(n);
    c && c.slice().map(function(l) {
      l(i);
    }), (c = e.get("*")) && c.slice().map(function(l) {
      l(n, i);
    });
  } };
}
function Ur(e) {
  return Array.from(e);
}
class vn extends Error {
  constructor(i, c = {}, l = "BizError", f = -1) {
    super(i);
    ht(this, "name");
    ht(this, "code");
    ht(this, "details");
    this.name = l, this.code = f, this.details = c;
  }
  toString() {
    return `${this.message} | (${this.name}:${this.code})`;
  }
}
class sr extends vn {
  constructor(n = "User rejection", i) {
    super(n, i, sr.name, -4005);
  }
}
var At, St, W, rt, G, Tt, vt, Lt, Ut, Mt, Ft, Nt, _t, Pr, Ct, Or, R, $, jt, Wr, kt, Gr, Rt, Yr, Dt, $r;
class Ln {
  constructor() {
    T(this, _t);
    T(this, Ct);
    T(this, R);
    T(this, jt);
    T(this, kt);
    T(this, Rt);
    T(this, Dt);
    T(this, At, "Suiet");
    T(this, St, "1.0.0");
    T(this, W, null);
    T(this, rt, void 0);
    T(this, G, void 0);
    T(this, Tt, (n, i) => (B(this, G).on(n, i), () => B(this, G).off(n, i)));
    T(this, vt, async (n) => {
      if (!await C(this, R, $).call(this, "dapp.connect", {
        permissions: [Bt.SUGGEST_TX, Bt.VIEW_ACCOUNT]
      }))
        throw new sr();
      const [c] = await C(this, _t, Pr).call(this), f = `sui:${await C(this, Ct, Or).call(this)}`;
      if (B(this, W) && B(this, W).address === c.address)
        return { accounts: this.accounts };
      const p = c.publicKey.slice(2);
      return O(this, W, new er({
        address: c.address,
        publicKey: tr.Buffer.from(p, "hex"),
        chains: [f],
        features: [
          "standard:connect",
          "sui:signAndExecuteTransactionBlock",
          "sui:signTransactionBlock",
          "sui:signMessage"
        ]
      })), B(this, G).emit("change", { accounts: this.accounts }), { accounts: this.accounts };
    });
    T(this, Lt, async () => {
      O(this, W, null), B(this, G).all.clear();
    });
    T(this, Ut, async (n) => {
      const i = "dapp.signTransactionBlock";
      return await C(this, R, $).call(this, i, {
        ...n,
        transactionBlock: n.transactionBlock.serialize()
      });
    });
    T(this, Mt, async (n) => {
      const i = "dapp.signAndExecuteTransactionBlock";
      return await C(this, R, $).call(this, i, {
        ...n,
        transactionBlock: n.transactionBlock.serialize()
      });
    });
    T(this, Ft, async (n) => {
      const i = "dapp.signMessage", c = {
        ...n,
        message: Ur(n.message)
      };
      return await C(this, R, $).call(this, i, c);
    });
    T(this, Nt, async (n) => {
      const i = "dapp.signPersonalMessage", c = {
        ...n,
        message: Ur(n.message)
      };
      return await C(this, R, $).call(this, i, c);
    });
    O(this, G, Tn()), O(this, rt, new En(
      Kt.DAPP,
      Kt.SUIET_CONTENT,
      window.origin
    )), C(this, jt, Wr).call(this, B(this, rt));
  }
  get version() {
    return B(this, St);
  }
  get name() {
    return B(this, At);
  }
  get icon() {
    return ve;
  }
  get chains() {
    return [
      Ae,
      Se,
      Te
    ];
  }
  get accounts() {
    return B(this, W) ? [B(this, W)] : [];
  }
  get features() {
    return {
      ["standard:connect"]: {
        version: "1.0.0",
        connect: B(this, vt)
      },
      ["standard:disconnect"]: {
        version: "1.0.0",
        disconnect: B(this, Lt)
      },
      ["standard:events"]: {
        version: "1.0.0",
        on: B(this, Tt)
      },
      ["sui:signAndExecuteTransactionBlock"]: {
        version: "1.0.0",
        signAndExecuteTransactionBlock: B(this, Mt)
      },
      ["sui:signTransactionBlock"]: {
        version: "1.0.0",
        signTransactionBlock: B(this, Ut)
      },
      ["sui:signPersonalMessage"]: {
        version: "1.0.0",
        signPersonalMessage: B(this, Nt)
      },
      ["sui:signMessage"]: {
        version: "1.0.0",
        signMessage: B(this, Ft)
      }
    };
  }
}
At = new WeakMap(), St = new WeakMap(), W = new WeakMap(), rt = new WeakMap(), G = new WeakMap(), Tt = new WeakMap(), vt = new WeakMap(), Lt = new WeakMap(), Ut = new WeakMap(), Mt = new WeakMap(), Ft = new WeakMap(), Nt = new WeakMap(), _t = new WeakSet(), Pr = async function() {
  const n = "dapp.getAccountsInfo";
  return await C(this, R, $).call(this, n, null);
}, Ct = new WeakSet(), Or = async function() {
  const n = "dapp.getActiveNetwork";
  return await C(this, R, $).call(this, n, null);
}, R = new WeakSet(), $ = async function(n, i, c = {
  nullable: !1
}) {
  const l = await B(this, rt).post(Sn(n, i));
  return C(this, Rt, Yr).call(this, l, n), c != null && c.nullable || C(this, Dt, $r).call(this, l, n), l.data;
}, jt = new WeakSet(), Wr = function(n) {
  const i = [qt.NETWORK_SWITCH];
  return n.subscribe((c) => {
    var l;
    if (!!i.includes((l = c == null ? void 0 : c.payload) == null ? void 0 : l.id) && c.payload.id === qt.NETWORK_SWITCH)
      return C(this, kt, Gr).call(this, c.payload);
  });
}, kt = new WeakSet(), Gr = function(n) {
  const { networkId: i } = n;
  !i || B(this, G).emit("change", {
    chains: [`sui:${i}`]
  });
}, Rt = new WeakSet(), Yr = function(n, i) {
  var c, l;
  if (n.error) {
    const f = (l = (c = n.error) == null ? void 0 : c.msg) != null ? l : "Unknown Error";
    throw new Error(f);
  }
}, Dt = new WeakSet(), $r = function(n, i) {
  if (n.data === null) {
    const c = "Response data is null";
    throw new Error(c);
  }
};
function Un(e) {
  e.Buffer = tr.Buffer;
}
Un(window);
be(new Ln());
