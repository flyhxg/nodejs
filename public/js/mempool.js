!(function (e) {
  if ('object' == typeof exports && 'undefined' != typeof module) module.exports = e()
  else if ('function' == typeof define && define.amd) define([], e)
  else {
    ;('undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : 'undefined' != typeof self
      ? self
      : this
    ).mempoolJS = e()
  }
})(function () {
  var e = function (e) {
      var t
      return function (n) {
        return t || e((t = { exports: {}, parent: n }), t.exports), t.exports
      }
    },
    t = e(function (e, t) {
      ;(function (t) {
        ;(function () {
          'use strict'
          var r = { 'Content-Type': 'application/x-www-form-urlencoded' }
          function o(e, t) {
            !l.isUndefined(e) && l.isUndefined(e['Content-Type']) && (e['Content-Type'] = t)
          }
          var i,
            a = {
              transitional: { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
              adapter:
                (('undefined' != typeof XMLHttpRequest ||
                  (void 0 !== t && '[object process]' === Object.prototype.toString.call(t))) &&
                  (i = n({})),
                i),
              transformRequest: [
                function (e, t) {
                  return (
                    v(t, 'Accept'),
                    v(t, 'Content-Type'),
                    l.isFormData(e) ||
                    l.isArrayBuffer(e) ||
                    l.isBuffer(e) ||
                    l.isStream(e) ||
                    l.isFile(e) ||
                    l.isBlob(e)
                      ? e
                      : l.isArrayBufferView(e)
                      ? e.buffer
                      : l.isURLSearchParams(e)
                      ? (o(t, 'application/x-www-form-urlencoded;charset=utf-8'), e.toString())
                      : l.isObject(e) || (t && 'application/json' === t['Content-Type'])
                      ? (o(t, 'application/json'),
                        (function (e, t, n) {
                          if (l.isString(e))
                            try {
                              return (0, JSON.parse)(e), l.trim(e)
                            } catch (r) {
                              if ('SyntaxError' !== r.name) throw r
                            }
                          return (0, JSON.stringify)(e)
                        })(e))
                      : e
                  )
                },
              ],
              transformResponse: [
                function (e) {
                  var t = this.transitional || a.transitional,
                    n = t && t.silentJSONParsing,
                    r = t && t.forcedJSONParsing,
                    o = !n && 'json' === this.responseType
                  if (o || (r && l.isString(e) && e.length))
                    try {
                      return JSON.parse(e)
                    } catch (i) {
                      if (o) {
                        if ('SyntaxError' === i.name) throw b(i, this, 'E_JSON_PARSE')
                        throw i
                      }
                    }
                  return e
                },
              ],
              timeout: 0,
              xsrfCookieName: 'XSRF-TOKEN',
              xsrfHeaderName: 'X-XSRF-TOKEN',
              maxContentLength: -1,
              maxBodyLength: -1,
              validateStatus: function (e) {
                return e >= 200 && e < 300
              },
              headers: { common: { Accept: 'application/json, text/plain, */*' } },
            }
          l.forEach(['delete', 'get', 'head'], function (e) {
            a.headers[e] = {}
          }),
            l.forEach(['post', 'put', 'patch'], function (e) {
              a.headers[e] = l.merge(r)
            }),
            (e.exports = a)
        }).call(this)
      }).call(this, A)
    }),
    n = e(function (e, n) {
      'use strict'
      var r = t({})
      e.exports = function (e) {
        return new Promise(function (t, n) {
          var o,
            i = e.data,
            a = e.headers,
            u = e.responseType
          function s() {
            e.cancelToken && e.cancelToken.unsubscribe(o), e.signal && e.signal.removeEventListener('abort', o)
          }
          l.isFormData(i) && delete a['Content-Type']
          var c = new XMLHttpRequest()
          if (e.auth) {
            var f = e.auth.username || '',
              h = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : ''
            a.Authorization = 'Basic ' + btoa(f + ':' + h)
          }
          var p = m(e.baseURL, e.url)
          function v() {
            if (c) {
              var r = 'getAllResponseHeaders' in c ? k(c.getAllResponseHeaders()) : null,
                o = {
                  data: u && 'text' !== u && 'json' !== u ? c.response : c.responseText,
                  status: c.status,
                  statusText: c.statusText,
                  headers: r,
                  config: e,
                  request: c,
                }
              w(
                function (e) {
                  t(e), s()
                },
                function (e) {
                  n(e), s()
                },
                o
              ),
                (c = null)
            }
          }
          if (
            (c.open(e.method.toUpperCase(), d(p, e.params, e.paramsSerializer), !0),
            (c.timeout = e.timeout),
            'onloadend' in c
              ? (c.onloadend = v)
              : (c.onreadystatechange = function () {
                  c &&
                    4 === c.readyState &&
                    (0 !== c.status || (c.responseURL && 0 === c.responseURL.indexOf('file:'))) &&
                    setTimeout(v)
                }),
            (c.onabort = function () {
              c && (n(y('Request aborted', e, 'ECONNABORTED', c)), (c = null))
            }),
            (c.onerror = function () {
              n(y('Network Error', e, null, c)), (c = null)
            }),
            (c.ontimeout = function () {
              var t = e.timeout ? 'timeout of ' + e.timeout + 'ms exceeded' : 'timeout exceeded',
                o = e.transitional || r.transitional
              e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
                n(y(t, e, o.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED', c)),
                (c = null)
            }),
            l.isStandardBrowserEnv())
          ) {
            var b = (e.withCredentials || _(p)) && e.xsrfCookieName ? g.read(e.xsrfCookieName) : void 0
            b && (a[e.xsrfHeaderName] = b)
          }
          'setRequestHeader' in c &&
            l.forEach(a, function (e, t) {
              void 0 === i && 'content-type' === t.toLowerCase() ? delete a[t] : c.setRequestHeader(t, e)
            }),
            l.isUndefined(e.withCredentials) || (c.withCredentials = !!e.withCredentials),
            u && 'json' !== u && (c.responseType = e.responseType),
            'function' == typeof e.onDownloadProgress && c.addEventListener('progress', e.onDownloadProgress),
            'function' == typeof e.onUploadProgress &&
              c.upload &&
              c.upload.addEventListener('progress', e.onUploadProgress),
            (e.cancelToken || e.signal) &&
              ((o = function (e) {
                c && (n(!e || (e && e.type) ? new T('canceled') : e), c.abort(), (c = null))
              }),
              e.cancelToken && e.cancelToken.subscribe(o),
              e.signal && (e.signal.aborted ? o() : e.signal.addEventListener('abort', o))),
            i || (i = null),
            c.send(i)
        })
      }
    }),
    r = function (e, t) {
      return function () {
        for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r]
        return e.apply(t, n)
      }
    },
    o = Object.prototype.toString
  function i(e) {
    return '[object Array]' === o.call(e)
  }
  function a(e) {
    return void 0 === e
  }
  function u(e) {
    return null !== e && 'object' == typeof e
  }
  function s(e) {
    if ('[object Object]' !== o.call(e)) return !1
    var t = Object.getPrototypeOf(e)
    return null === t || t === Object.prototype
  }
  function c(e, t) {
    if (null != e)
      if (('object' != typeof e && (e = [e]), i(e))) for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e)
      else for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e)
  }
  var l = {
    isArray: i,
    isArrayBuffer: function (e) {
      return '[object ArrayBuffer]' === o.call(e)
    },
    isBuffer: function (e) {
      return (
        null !== e &&
        !a(e) &&
        null !== e.constructor &&
        !a(e.constructor) &&
        'function' == typeof e.constructor.isBuffer &&
        e.constructor.isBuffer(e)
      )
    },
    isFormData: function (e) {
      return 'undefined' != typeof FormData && e instanceof FormData
    },
    isArrayBufferView: function (e) {
      return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
        ? ArrayBuffer.isView(e)
        : e && e.buffer && e.buffer instanceof ArrayBuffer
    },
    isString: function (e) {
      return 'string' == typeof e
    },
    isNumber: function (e) {
      return 'number' == typeof e
    },
    isObject: u,
    isPlainObject: s,
    isUndefined: a,
    isDate: function (e) {
      return '[object Date]' === o.call(e)
    },
    isFile: function (e) {
      return '[object File]' === o.call(e)
    },
    isBlob: function (e) {
      return '[object Blob]' === o.call(e)
    },
    isStream: function (e) {
      return (
        u(e) &&
        (function (e) {
          return '[object Function]' === o.call(e)
        })(e.pipe)
      )
    },
    isURLSearchParams: function (e) {
      return 'undefined' != typeof URLSearchParams && e instanceof URLSearchParams
    },
    isStandardBrowserEnv: function () {
      return (
        ('undefined' == typeof navigator ||
          ('ReactNative' !== navigator.product &&
            'NativeScript' !== navigator.product &&
            'NS' !== navigator.product)) &&
        'undefined' != typeof window &&
        'undefined' != typeof document
      )
    },
    forEach: c,
    merge: function e() {
      var t = {}
      function n(n, r) {
        s(t[r]) && s(n) ? (t[r] = e(t[r], n)) : s(n) ? (t[r] = e({}, n)) : i(n) ? (t[r] = n.slice()) : (t[r] = n)
      }
      for (var r = 0, o = arguments.length; r < o; r++) c(arguments[r], n)
      return t
    },
    extend: function (e, t, n) {
      return (
        c(t, function (t, o) {
          e[o] = n && 'function' == typeof t ? r(t, n) : t
        }),
        e
      )
    },
    trim: function (e) {
      return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '')
    },
  }
  function f(e) {
    return encodeURIComponent(e)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']')
  }
  var d = function (e, t, n) {
      if (!t) return e
      var r
      if (n) r = n(t)
      else if (l.isURLSearchParams(t)) r = t.toString()
      else {
        var o = []
        l.forEach(t, function (e, t) {
          null != e &&
            (l.isArray(e) ? (t += '[]') : (e = [e]),
            l.forEach(e, function (e) {
              l.isDate(e) ? (e = e.toISOString()) : l.isObject(e) && (e = JSON.stringify(e)), o.push(f(t) + '=' + f(e))
            }))
        }),
          (r = o.join('&'))
      }
      if (r) {
        var i = e.indexOf('#')
        ;-1 !== i && (e = e.slice(0, i)), (e += (-1 === e.indexOf('?') ? '?' : '&') + r)
      }
      return e
    },
    h = {}
  function p() {
    this.handlers = []
  }
  ;(p.prototype.use = function (e, t, n) {
    return (
      this.handlers.push({
        fulfilled: e,
        rejected: t,
        synchronous: !!n && n.synchronous,
        runWhen: n ? n.runWhen : null,
      }),
      this.handlers.length - 1
    )
  }),
    (p.prototype.eject = function (e) {
      this.handlers[e] && (this.handlers[e] = null)
    }),
    (p.prototype.forEach = function (e) {
      l.forEach(this.handlers, function (t) {
        null !== t && e(t)
      })
    }),
    (h = p)
  var v = function (e, t) {
      l.forEach(e, function (n, r) {
        r !== t && r.toUpperCase() === t.toUpperCase() && ((e[t] = n), delete e[r])
      })
    },
    b = function (e, t, n, r, o) {
      return (
        (e.config = t),
        n && (e.code = n),
        (e.request = r),
        (e.response = o),
        (e.isAxiosError = !0),
        (e.toJSON = function () {
          return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: this.config,
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null,
          }
        }),
        e
      )
    },
    y = function (e, t, n, r, o) {
      var i = new Error(e)
      return b(i, t, n, r, o)
    },
    w = function (e, t, n) {
      var r = n.config.validateStatus
      n.status && r && !r(n.status)
        ? t(y('Request failed with status code ' + n.status, n.config, null, n.request, n))
        : e(n)
    },
    g = l.isStandardBrowserEnv()
      ? {
          write: function (e, t, n, r, o, i) {
            var a = []
            a.push(e + '=' + encodeURIComponent(t)),
              l.isNumber(n) && a.push('expires=' + new Date(n).toGMTString()),
              l.isString(r) && a.push('path=' + r),
              l.isString(o) && a.push('domain=' + o),
              !0 === i && a.push('secure'),
              (document.cookie = a.join('; '))
          },
          read: function (e) {
            var t = document.cookie.match(new RegExp('(^|;\\s*)(' + e + ')=([^;]*)'))
            return t ? decodeURIComponent(t[3]) : null
          },
          remove: function (e) {
            this.write(e, '', Date.now() - 864e5)
          },
        }
      : {
          write: function () {},
          read: function () {
            return null
          },
          remove: function () {},
        },
    m = function (e, t) {
      return e && !/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)
        ? (function (e, t) {
            return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e
          })(e, t)
        : t
    },
    x = [
      'age',
      'authorization',
      'content-length',
      'content-type',
      'etag',
      'expires',
      'from',
      'host',
      'if-modified-since',
      'if-unmodified-since',
      'last-modified',
      'location',
      'max-forwards',
      'proxy-authorization',
      'referer',
      'retry-after',
      'user-agent',
    ],
    k = function (e) {
      var t,
        n,
        r,
        o = {}
      return e
        ? (l.forEach(e.split('\n'), function (e) {
            if (((r = e.indexOf(':')), (t = l.trim(e.substr(0, r)).toLowerCase()), (n = l.trim(e.substr(r + 1))), t)) {
              if (o[t] && x.indexOf(t) >= 0) return
              o[t] = 'set-cookie' === t ? (o[t] ? o[t] : []).concat([n]) : o[t] ? o[t] + ', ' + n : n
            }
          }),
          o)
        : o
    },
    _ = l.isStandardBrowserEnv()
      ? (function () {
          var e,
            t = /(msie|trident)/i.test(navigator.userAgent),
            n = document.createElement('a')
          function r(e) {
            var r = e
            return (
              t && (n.setAttribute('href', r), (r = n.href)),
              n.setAttribute('href', r),
              {
                href: n.href,
                protocol: n.protocol ? n.protocol.replace(/:$/, '') : '',
                host: n.host,
                search: n.search ? n.search.replace(/^\?/, '') : '',
                hash: n.hash ? n.hash.replace(/^#/, '') : '',
                hostname: n.hostname,
                port: n.port,
                pathname: '/' === n.pathname.charAt(0) ? n.pathname : '/' + n.pathname,
              }
            )
          }
          return (
            (e = r(window.location.href)),
            function (t) {
              var n = l.isString(t) ? r(t) : t
              return n.protocol === e.protocol && n.host === e.host
            }
          )
        })()
      : function () {
          return !0
        },
    T = {}
  function S(e) {
    this.message = e
  }
  ;(S.prototype.toString = function () {
    return 'Cancel' + (this.message ? ': ' + this.message : '')
  }),
    (S.prototype.__CANCEL__ = !0),
    (T = S)
  var P,
    E,
    A = {},
    j = (A = {})
  function B() {
    throw new Error('setTimeout has not been defined')
  }
  function O() {
    throw new Error('clearTimeout has not been defined')
  }
  function M(e) {
    if (P === setTimeout) return setTimeout(e, 0)
    if ((P === B || !P) && setTimeout) return (P = setTimeout), setTimeout(e, 0)
    try {
      return P(e, 0)
    } catch (t) {
      try {
        return P.call(null, e, 0)
      } catch (t) {
        return P.call(this, e, 0)
      }
    }
  }
  !(function () {
    try {
      P = 'function' == typeof setTimeout ? setTimeout : B
    } catch (e) {
      P = B
    }
    try {
      E = 'function' == typeof clearTimeout ? clearTimeout : O
    } catch (e) {
      E = O
    }
  })()
  var R,
    C = [],
    L = !1,
    N = -1
  function U() {
    L && R && ((L = !1), R.length ? (C = R.concat(C)) : (N = -1), C.length && q())
  }
  function q() {
    if (!L) {
      var e = M(U)
      L = !0
      for (var t = C.length; t; ) {
        for (R = C, C = []; ++N < t; ) R && R[N].run()
        ;(N = -1), (t = C.length)
      }
      ;(R = null),
        (L = !1),
        (function (e) {
          if (E === clearTimeout) return clearTimeout(e)
          if ((E === O || !E) && clearTimeout) return (E = clearTimeout), clearTimeout(e)
          try {
            E(e)
          } catch (t) {
            try {
              return E.call(null, e)
            } catch (t) {
              return E.call(this, e)
            }
          }
        })(e)
    }
  }
  function I(e, t) {
    ;(this.fun = e), (this.array = t)
  }
  function D() {}
  ;(j.nextTick = function (e) {
    var t = new Array(arguments.length - 1)
    if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n]
    C.push(new I(e, t)), 1 !== C.length || L || M(q)
  }),
    (I.prototype.run = function () {
      this.fun.apply(null, this.array)
    }),
    (j.title = 'browser'),
    (j.browser = !0),
    (j.env = {}),
    (j.argv = []),
    (j.version = ''),
    (j.versions = {}),
    (j.on = D),
    (j.addListener = D),
    (j.once = D),
    (j.off = D),
    (j.removeListener = D),
    (j.removeAllListeners = D),
    (j.emit = D),
    (j.prependListener = D),
    (j.prependOnceListener = D),
    (j.listeners = function (e) {
      return []
    }),
    (j.binding = function (e) {
      throw new Error('process.binding is not supported')
    }),
    (j.cwd = function () {
      return '/'
    }),
    (j.chdir = function (e) {
      throw new Error('process.chdir is not supported')
    }),
    (j.umask = function () {
      return 0
    })
  var F = t({}),
    G = function (e, t, n) {
      var r = this || F
      return (
        l.forEach(n, function (n) {
          e = n.call(r, e, t)
        }),
        e
      )
    },
    H = function (e) {
      return !(!e || !e.__CANCEL__)
    },
    J = t({})
  function W(e) {
    if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)) throw new T('canceled')
  }
  var z,
    V = function (e) {
      return (
        W(e),
        (e.headers = e.headers || {}),
        (e.data = G.call(e, e.data, e.headers, e.transformRequest)),
        (e.headers = l.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers)),
        l.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function (t) {
          delete e.headers[t]
        }),
        (e.adapter || J.adapter)(e).then(
          function (t) {
            return W(e), (t.data = G.call(e, t.data, t.headers, e.transformResponse)), t
          },
          function (t) {
            return (
              H(t) ||
                (W(e),
                t &&
                  t.response &&
                  (t.response.data = G.call(e, t.response.data, t.response.headers, e.transformResponse))),
              Promise.reject(t)
            )
          }
        )
      )
    },
    X = function (e, t) {
      t = t || {}
      var n = {}
      function r(e, t) {
        return l.isPlainObject(e) && l.isPlainObject(t)
          ? l.merge(e, t)
          : l.isPlainObject(t)
          ? l.merge({}, t)
          : l.isArray(t)
          ? t.slice()
          : t
      }
      function o(n) {
        return l.isUndefined(t[n]) ? (l.isUndefined(e[n]) ? void 0 : r(void 0, e[n])) : r(e[n], t[n])
      }
      function i(e) {
        if (!l.isUndefined(t[e])) return r(void 0, t[e])
      }
      function a(n) {
        return l.isUndefined(t[n]) ? (l.isUndefined(e[n]) ? void 0 : r(void 0, e[n])) : r(void 0, t[n])
      }
      function u(n) {
        return n in t ? r(e[n], t[n]) : n in e ? r(void 0, e[n]) : void 0
      }
      var s = {
        url: i,
        method: i,
        data: i,
        baseURL: a,
        transformRequest: a,
        transformResponse: a,
        paramsSerializer: a,
        timeout: a,
        timeoutMessage: a,
        withCredentials: a,
        adapter: a,
        responseType: a,
        xsrfCookieName: a,
        xsrfHeaderName: a,
        onUploadProgress: a,
        onDownloadProgress: a,
        decompress: a,
        maxContentLength: a,
        maxBodyLength: a,
        transport: a,
        httpAgent: a,
        httpsAgent: a,
        cancelToken: a,
        socketPath: a,
        responseEncoding: a,
        validateStatus: u,
      }
      return (
        l.forEach(Object.keys(e).concat(Object.keys(t)), function (e) {
          var t = s[e] || o,
            r = t(e)
          ;(l.isUndefined(r) && t !== u) || (n[e] = r)
        }),
        n
      )
    },
    $ = '0.24.0',
    K = $,
    Q = {}
  ;['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (e, t) {
    Q[e] = function (n) {
      return typeof n === e || 'a' + (t < 1 ? 'n ' : ' ') + e
    }
  })
  var Y = {}
  Q.transitional = function (e, t, n) {
    function r(e, t) {
      return '[Axios v' + K + "] Transitional option '" + e + "'" + t + (n ? '. ' + n : '')
    }
    return function (n, o, i) {
      if (!1 === e) throw new Error(r(o, ' has been removed' + (t ? ' in ' + t : '')))
      return (
        t &&
          !Y[o] &&
          ((Y[o] = !0),
          console.warn(r(o, ' has been deprecated since v' + t + ' and will be removed in the near future'))),
        !e || e(n, o, i)
      )
    }
  }
  var Z = {},
    ee = (z = {
      assertOptions: function (e, t, n) {
        if ('object' != typeof e) throw new TypeError('options must be an object')
        for (var r = Object.keys(e), o = r.length; o-- > 0; ) {
          var i = r[o],
            a = t[i]
          if (a) {
            var u = e[i],
              s = void 0 === u || a(u, i, e)
            if (!0 !== s) throw new TypeError('option ' + i + ' must be ' + s)
          } else if (!0 !== n) throw Error('Unknown option ' + i)
        }
      },
      validators: Q,
    }).validators
  function te(e) {
    ;(this.defaults = e), (this.interceptors = { request: new h(), response: new h() })
  }
  ;(te.prototype.request = function (e) {
    'string' == typeof e ? ((e = arguments[1] || {}).url = arguments[0]) : (e = e || {}),
      (e = X(this.defaults, e)).method
        ? (e.method = e.method.toLowerCase())
        : this.defaults.method
        ? (e.method = this.defaults.method.toLowerCase())
        : (e.method = 'get')
    var t = e.transitional
    void 0 !== t &&
      z.assertOptions(
        t,
        {
          silentJSONParsing: ee.transitional(ee.boolean),
          forcedJSONParsing: ee.transitional(ee.boolean),
          clarifyTimeoutError: ee.transitional(ee.boolean),
        },
        !1
      )
    var n = [],
      r = !0
    this.interceptors.request.forEach(function (t) {
      ;('function' == typeof t.runWhen && !1 === t.runWhen(e)) ||
        ((r = r && t.synchronous), n.unshift(t.fulfilled, t.rejected))
    })
    var o,
      i = []
    if (
      (this.interceptors.response.forEach(function (e) {
        i.push(e.fulfilled, e.rejected)
      }),
      !r)
    ) {
      var a = [V, void 0]
      for (Array.prototype.unshift.apply(a, n), a = a.concat(i), o = Promise.resolve(e); a.length; )
        o = o.then(a.shift(), a.shift())
      return o
    }
    for (var u = e; n.length; ) {
      var s = n.shift(),
        c = n.shift()
      try {
        u = s(u)
      } catch (l) {
        c(l)
        break
      }
    }
    try {
      o = V(u)
    } catch (l) {
      return Promise.reject(l)
    }
    for (; i.length; ) o = o.then(i.shift(), i.shift())
    return o
  }),
    (te.prototype.getUri = function (e) {
      return (e = X(this.defaults, e)), d(e.url, e.params, e.paramsSerializer).replace(/^\?/, '')
    }),
    l.forEach(['delete', 'get', 'head', 'options'], function (e) {
      te.prototype[e] = function (t, n) {
        return this.request(X(n || {}, { method: e, url: t, data: (n || {}).data }))
      }
    }),
    l.forEach(['post', 'put', 'patch'], function (e) {
      te.prototype[e] = function (t, n, r) {
        return this.request(X(r || {}, { method: e, url: t, data: n }))
      }
    }),
    (Z = te)
  var ne
  function re(e) {
    if ('function' != typeof e) throw new TypeError('executor must be a function.')
    var t
    this.promise = new Promise(function (e) {
      t = e
    })
    var n = this
    this.promise.then(function (e) {
      if (n._listeners) {
        var t,
          r = n._listeners.length
        for (t = 0; t < r; t++) n._listeners[t](e)
        n._listeners = null
      }
    }),
      (this.promise.then = function (e) {
        var t,
          r = new Promise(function (e) {
            n.subscribe(e), (t = e)
          }).then(e)
        return (
          (r.cancel = function () {
            n.unsubscribe(t)
          }),
          r
        )
      }),
      e(function (e) {
        n.reason || ((n.reason = new T(e)), t(n.reason))
      })
  }
  ;(re.prototype.throwIfRequested = function () {
    if (this.reason) throw this.reason
  }),
    (re.prototype.subscribe = function (e) {
      this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : (this._listeners = [e])
    }),
    (re.prototype.unsubscribe = function (e) {
      if (this._listeners) {
        var t = this._listeners.indexOf(e)
        ;-1 !== t && this._listeners.splice(t, 1)
      }
    }),
    (re.source = function () {
      var e
      return {
        token: new re(function (t) {
          e = t
        }),
        cancel: e,
      }
    }),
    (ne = re)
  var oe = {},
    ie = (function e(t) {
      var n = new Z(t),
        o = r(Z.prototype.request, n)
      return (
        l.extend(o, Z.prototype, n),
        l.extend(o, n),
        (o.create = function (n) {
          return e(X(t, n))
        }),
        o
      )
    })(t({}))
  ;(ie.Axios = Z),
    (ie.Cancel = T),
    (ie.CancelToken = ne),
    (ie.isCancel = H),
    (ie.VERSION = $),
    (ie.all = function (e) {
      return Promise.all(e)
    }),
    (ie.spread = function (e) {
      return function (t) {
        return e.apply(null, t)
      }
    }),
    (ie.isAxiosError = function (e) {
      return 'object' == typeof e && !0 === e.isAxiosError
    }),
    ((oe = ie).default = ie)
  var ae = oe,
    ue = {},
    se =
      (this && this.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e }
      }
  Object.defineProperty(ue, '__esModule', { value: !0 }),
    (ue.makeLiquidAPI = ue.makeBisqMarketsAPI = ue.makeBisqAPI = ue.makeBitcoinAPI = void 0)
  var ce = se(ae)
  ;(ue.makeBitcoinAPI = function (e) {
    var t = e.hostname,
      n = e.network
    return (
      (n = n && ['testnet', 'signet'].includes(n) ? '/' + n : ''),
      (null == t ? void 0 : t.includes('localhost'))
        ? { api: ce.default.create({ baseURL: 'http://' + t + n + '/api/' }) }
        : { api: ce.default.create({ baseURL: 'https://' + t + n + '/api/' }) }
    )
  }),
    (ue.makeBisqAPI = function (e) {
      return (null == e ? void 0 : e.includes('localhost'))
        ? { api: ce.default.create({ baseURL: 'http://' + e + '/bisq/api/' }) }
        : { api: ce.default.create({ baseURL: 'https://' + e + '/bisq/api/' }) }
    }),
    (ue.makeBisqMarketsAPI = function () {
      return { api: ce.default.create({ baseURL: 'https://bisq.markets/api/v1/markets/' }) }
    }),
    (ue.makeLiquidAPI = function (e) {
      return (null == e ? void 0 : e.includes('localhost'))
        ? { api: ce.default.create({ baseURL: 'http://' + e + '/liquid/api/' }) }
        : { api: ce.default.create({ baseURL: 'https://' + e + '/liquid/api/' }) }
    }),
    ue.makeBitcoinAPI,
    ue.makeBisqAPI,
    ue.makeBisqMarketsAPI,
    ue.makeLiquidAPI
  var le = {},
    fe =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    de =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(le, '__esModule', { value: !0 }),
    (le.useAddresses = void 0),
    (le.useAddresses = function (e) {
      return {
        getAddress: function (t) {
          return fe(void 0, void 0, void 0, function () {
            return de(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/address/' + t.address)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getAddressTxs: function (t) {
          return fe(void 0, void 0, void 0, function () {
            return de(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/address/' + t.address + '/txs')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getAddressTxsChain: function (t) {
          return fe(void 0, void 0, void 0, function () {
            return de(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/address/' + t.address + '/txs/chain')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getAddressTxsMempool: function (t) {
          return fe(void 0, void 0, void 0, function () {
            return de(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/address/' + t.address + '/txs/mempool')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getAddressTxsUtxo: function (t) {
          return fe(void 0, void 0, void 0, function () {
            return de(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/address/' + t.address + '/utxo')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
      }
    })
  var he = {},
    pe =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    ve =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(he, '__esModule', { value: !0 }),
    (he.useBlocks = void 0),
    (he.useBlocks = function (e) {
      return {
        getBlock: function (t) {
          return pe(void 0, void 0, void 0, function () {
            return ve(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/block/' + t.hash)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlocks: function (t) {
          return pe(void 0, void 0, void 0, function () {
            return ve(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/blocks/' + t.start_height)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlockStatus: function (t) {
          return pe(void 0, void 0, void 0, function () {
            return ve(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/block/' + t.hash + '/status')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlockTxs: function (t) {
          return pe(void 0, void 0, void 0, function () {
            return ve(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/block/' + t.hash + '/txs/' + t.start_index)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlockTxid: function (t) {
          return pe(void 0, void 0, void 0, function () {
            return ve(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/block/' + t.hash + '/txid/' + t.index)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlockTxids: function (t) {
          return pe(void 0, void 0, void 0, function () {
            return ve(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/block/' + t.hash + '/txids')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlockRaw: function (t) {
          return pe(void 0, void 0, void 0, function () {
            return ve(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/block/' + t.hash + '/raw')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlockHeader: function (t) {
          return pe(void 0, void 0, void 0, function () {
            return ve(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/block/' + t.hash + '/header')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlockHeight: function (t) {
          return pe(void 0, void 0, void 0, function () {
            return ve(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/block-height/' + t.height)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlocksTipHash: function () {
          return pe(void 0, void 0, void 0, function () {
            return ve(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/blocks/tip/hash')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
        getBlocksTipHeight: function () {
          return pe(void 0, void 0, void 0, function () {
            return ve(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/blocks/tip/height')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
      }
    })
  var be = {},
    ye =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    we =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(be, '__esModule', { value: !0 }),
    (be.useDifficulty = void 0),
    (be.useDifficulty = function (e) {
      return {
        getDifficultyAdjustment: function () {
          return ye(void 0, void 0, void 0, function () {
            return we(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/v1/difficulty-adjustment')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
      }
    })
  var ge = {},
    me =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    xe =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(ge, '__esModule', { value: !0 }),
    (ge.useFees = void 0),
    (ge.useFees = function (e) {
      return {
        getFeesRecommended: function () {
          return me(void 0, void 0, void 0, function () {
            return xe(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/v1/fees/recommended')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
        getFeesMempoolBlocks: function () {
          return me(void 0, void 0, void 0, function () {
            return xe(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/v1/fees/mempool-blocks')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
        getCPFP: function (t) {
          return me(void 0, void 0, void 0, function () {
            return xe(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/v1/cpfp/' + t.txid)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
      }
    })
  var ke = {},
    _e =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    Te =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(ke, '__esModule', { value: !0 }),
    (ke.useMempool = void 0),
    (ke.useMempool = function (e) {
      return {
        getMempool: function () {
          return _e(void 0, void 0, void 0, function () {
            return Te(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/mempool')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
        getMempoolTxids: function () {
          return _e(void 0, void 0, void 0, function () {
            return Te(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/mempool/txids')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
        getMempoolRecent: function () {
          return _e(void 0, void 0, void 0, function () {
            return Te(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/mempool/recent')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
      }
    })
  var Se = {},
    Pe =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    Ee =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(Se, '__esModule', { value: !0 }),
    (Se.useTransactions = void 0),
    (Se.useTransactions = function (e) {
      return {
        getTx: function (t) {
          return Pe(void 0, void 0, void 0, function () {
            return Ee(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/tx/' + t.txid)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getTxStatus: function (t) {
          return Pe(void 0, void 0, void 0, function () {
            return Ee(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/tx/' + t.txid + '/status')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getTxHex: function (t) {
          return Pe(void 0, void 0, void 0, function () {
            return Ee(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/tx/' + t.txid + '/hex')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getTxRaw: function (t) {
          return Pe(void 0, void 0, void 0, function () {
            return Ee(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/tx/' + t.txid + '/raw')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getTxMerkleBlockProof: function (t) {
          return Pe(void 0, void 0, void 0, function () {
            return Ee(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/tx/' + t.txid + '/merkleblock-proof')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getTxMerkleProof: function (t) {
          return Pe(void 0, void 0, void 0, function () {
            return Ee(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/tx/' + t.txid + '/merkle-proof')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getTxOutspend: function (t) {
          return Pe(void 0, void 0, void 0, function () {
            return Ee(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/tx/' + t.txid + '/outspend/' + t.vout)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getTxOutspends: function (t) {
          return Pe(void 0, void 0, void 0, function () {
            return Ee(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/tx/' + t.txid + '/outspends')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        postTx: function (t) {
          return Pe(void 0, void 0, void 0, function () {
            return Ee(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.post('/tx', { txhex: t.txhex })]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
      }
    })
  var Ae = {},
    je =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    Be =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(Ae, '__esModule', { value: !0 })
  var Oe = function (e, t) {
      var n = new WebSocket(t)
      return (
        n.addEventListener('open', function () {
          n.send(JSON.stringify({ action: 'want', data: e }))
        }),
        n.addEventListener('close', function () {
          return je(this, void 0, void 0, function () {
            return Be(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, Me(6e4)]
                case 1:
                  return n.sent(), Oe(e, t), [2]
              }
            })
          })
        }),
        n
      )
    },
    Me = function (e) {
      return new Promise(function (t) {
        setTimeout(t, e)
      })
    }
  Ae.default = Oe
  var Re = {},
    Ce =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    Le =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      },
    Ne =
      (this && this.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e }
      }
  Object.defineProperty(Re, '__esModule', { value: !0 })
  var Ue = Ne(function () {
      throw new Error('ws does not work in the browser. Browser clients must use the native WebSocket object')
    }),
    qe = function (e, t) {
      var n = new Ue.default(t),
        r = setInterval(function () {
          n.ping()
        }, 3e4)
      return (
        n.on('open', function () {
          n.send(JSON.stringify({ action: 'want', data: e }))
        }),
        n.on('close', function () {
          return Ce(this, void 0, void 0, function () {
            return Le(this, function (o) {
              switch (o.label) {
                case 0:
                  return clearInterval(r), n.terminate(), [4, Ie(6e4)]
                case 1:
                  return o.sent(), qe(e, t), [2]
              }
            })
          })
        }),
        n
      )
    },
    Ie = function (e) {
      return new Promise(function (t) {
        setTimeout(t, e)
      })
    }
  Re.default = qe
  var De = {},
    Fe =
      (this && this.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e }
      }
  Object.defineProperty(De, '__esModule', { value: !0 }), (De.useWebsocket = void 0)
  var Ge = Fe(Ae),
    He = Fe(Re)
  De.useWebsocket = function (e, t) {
    var n = 'wss://' + e + ('main' === t ? '' : '/' + t) + '/api/v1/ws'
    return {
      initClient: function (e) {
        var t = e.options
        return Ge.default(t, n)
      },
      initServer: function (e) {
        var t = e.options
        return He.default(t, n)
      },
    }
  }
  var Je = {},
    We =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    ze =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(Je, '__esModule', { value: !0 }),
    (Je.useAddresses = void 0),
    (Je.useAddresses = function (e) {
      return {
        getAddress: function (t) {
          return We(void 0, void 0, void 0, function () {
            return ze(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/address/' + t.address)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
      }
    })
  var Ve = {},
    Xe =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    $e =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(Ve, '__esModule', { value: !0 }),
    (Ve.useBlocks = void 0),
    (Ve.useBlocks = function (e) {
      return {
        getBlock: function (t) {
          return Xe(void 0, void 0, void 0, function () {
            return $e(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/block/' + t.hash)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlocks: function (t) {
          return Xe(void 0, void 0, void 0, function () {
            return $e(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/blocks/' + t.index + '/' + t.length)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlocksTipHeight: function () {
          return Xe(void 0, void 0, void 0, function () {
            return $e(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/blocks/tip/height')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
      }
    })
  var Ke = {},
    Qe =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    Ye =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(Ke, '__esModule', { value: !0 }),
    (Ke.useStatistics = void 0),
    (Ke.useStatistics = function (e) {
      return {
        getStats: function () {
          return Qe(void 0, void 0, void 0, function () {
            return Ye(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/stats')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
      }
    })
  var Ze = {},
    et =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    tt =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(Ze, '__esModule', { value: !0 }),
    (Ze.useTransactions = void 0),
    (Ze.useTransactions = function (e) {
      return {
        getTx: function (t) {
          return et(void 0, void 0, void 0, function () {
            return tt(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/tx/' + t.txid)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getTxs: function (t) {
          return et(void 0, void 0, void 0, function () {
            return tt(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/txs/' + t.index + '/' + t.length)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
      }
    })
  var nt = {},
    rt =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    ot =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(nt, '__esModule', { value: !0 }),
    (nt.useMarkets = void 0),
    (nt.useMarkets = function (e) {
      return {
        getCurrencies: function (t) {
          return (
            void 0 === t && (t = { basecurrency: 'BTC', type: 'all', format: 'jsonpretty' }),
            rt(void 0, void 0, void 0, function () {
              return ot(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, e.get('/currencies', { params: t })]
                  case 1:
                    return [2, n.sent().data]
                }
              })
            })
          )
        },
        getDepth: function (t) {
          return (
            void 0 === t && (t = { market: 'xmr_btc', format: 'jsonpretty' }),
            rt(void 0, void 0, void 0, function () {
              return ot(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, e.get('/depth', { params: t })]
                  case 1:
                    return [2, n.sent().data]
                }
              })
            })
          )
        },
        getHloc: function (t) {
          return rt(void 0, void 0, void 0, function () {
            return ot(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/hloc', { params: t })]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getMarkets: function (t) {
          return (
            void 0 === t && (t = { format: 'jsonpretty' }),
            rt(void 0, void 0, void 0, function () {
              return ot(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, e.get('/markets', { params: t })]
                  case 1:
                    return [2, n.sent().data]
                }
              })
            })
          )
        },
        getOffers: function (t) {
          return (
            void 0 === t && (t = { market: 'xmr_btc', format: 'jsonpretty' }),
            rt(void 0, void 0, void 0, function () {
              return ot(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, e.get('/offers', { params: t })]
                  case 1:
                    return [2, n.sent().data]
                }
              })
            })
          )
        },
        getTicker: function (t) {
          return (
            void 0 === t && (t = { format: 'jsonpretty' }),
            rt(void 0, void 0, void 0, function () {
              return ot(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, e.get('/ticker', { params: t })]
                  case 1:
                    return [2, n.sent().data]
                }
              })
            })
          )
        },
        getTrades: function (t) {
          return (
            void 0 === t &&
              (t = {
                market: 'all',
                format: 'jsonpretty',
                timestamp_from: '2016-01-01',
                timestamp_to: 'now',
                limit: 100,
                sort: 'desc',
              }),
            rt(void 0, void 0, void 0, function () {
              return ot(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, e.get('/trades', { params: t })]
                  case 1:
                    return [2, n.sent().data]
                }
              })
            })
          )
        },
        getVolumes: function (t) {
          return (
            void 0 === t &&
              (t = {
                basecurrency: '',
                market: '',
                interval: 'auto',
                timestamp_from: '2016-01-01',
                timestamp_to: 'now',
                format: 'jsonpretty',
              }),
            rt(void 0, void 0, void 0, function () {
              return ot(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, e.get('/trades', { params: t })]
                  case 1:
                    return [2, n.sent().data]
                }
              })
            })
          )
        },
      }
    })
  var it = {},
    at =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    ut =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(it, '__esModule', { value: !0 }),
    (it.useAssets = void 0),
    (it.useAssets = function (e) {
      return {
        getAsset: function (t) {
          return at(void 0, void 0, void 0, function () {
            return ut(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/asset/' + t.asset_id)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getAssetIcon: function (t) {
          return at(void 0, void 0, void 0, function () {
            return ut(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/v1/asset/' + t.asset_id + '/icon')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getAssetTxs: function (t) {
          return at(void 0, void 0, void 0, function () {
            var n
            return ut(this, function (r) {
              switch (r.label) {
                case 0:
                  return (
                    (n = !0 === t.is_mempool ? '/mempool' : '/chain'), [4, e.get('/asset/' + t.asset_id + '/txs' + n)]
                  )
                case 1:
                  return [2, r.sent().data]
              }
            })
          })
        },
        getAssetSupply: function (t) {
          return at(void 0, void 0, void 0, function () {
            var n
            return ut(this, function (r) {
              switch (r.label) {
                case 0:
                  return (n = !0 === t.decimal ? '/decimal' : ''), [4, e.get('/asset/' + t.asset_id + '/supply' + n)]
                case 1:
                  return [2, r.sent().data]
              }
            })
          })
        },
        getAssetsIcons: function () {
          return at(void 0, void 0, void 0, function () {
            return ut(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/v1/assets/icons')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
      }
    })
  var st = {},
    ct =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    lt =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(st, '__esModule', { value: !0 }),
    (st.useAddresses = void 0),
    (st.useAddresses = function (e) {
      return {
        getAddress: function (t) {
          return ct(void 0, void 0, void 0, function () {
            return lt(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/address/' + t.address)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getAddressTxs: function (t) {
          return ct(void 0, void 0, void 0, function () {
            return lt(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/address/' + t.address + '/txs')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getAddressTxsChain: function (t) {
          return ct(void 0, void 0, void 0, function () {
            return lt(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/address/' + t.address + '/txs/chain')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getAddressTxsMempool: function (t) {
          return ct(void 0, void 0, void 0, function () {
            return lt(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/address/' + t.address + '/txs/mempool')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getAddressTxsUtxo: function (t) {
          return ct(void 0, void 0, void 0, function () {
            return lt(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/address/' + t.address + '/utxo')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
      }
    })
  var ft = {},
    dt =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    ht =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(ft, '__esModule', { value: !0 }),
    (ft.useBlocks = void 0),
    (ft.useBlocks = function (e) {
      return {
        getBlock: function (t) {
          return dt(void 0, void 0, void 0, function () {
            return ht(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/block/' + t.hash)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlocks: function (t) {
          return dt(void 0, void 0, void 0, function () {
            return ht(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/blocks/' + t.start_height)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlockStatus: function (t) {
          return dt(void 0, void 0, void 0, function () {
            return ht(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/block/' + t.hash + '/status')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlockTxs: function (t) {
          return dt(void 0, void 0, void 0, function () {
            return ht(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/block/' + t.hash + '/txs/' + t.start_index)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlockTxid: function (t) {
          return dt(void 0, void 0, void 0, function () {
            return ht(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/block/' + t.hash + '/txid/' + t.index)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlockTxids: function (t) {
          return dt(void 0, void 0, void 0, function () {
            return ht(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/block/' + t.hash + '/txids')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlockRaw: function (t) {
          return dt(void 0, void 0, void 0, function () {
            return ht(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/block/' + t.hash + '/raw')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlockHeight: function (t) {
          return dt(void 0, void 0, void 0, function () {
            return ht(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/block-height/' + t.height)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getBlocksTipHash: function () {
          return dt(void 0, void 0, void 0, function () {
            return ht(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/blocks/tip/hash')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
        getBlocksTipHeight: function () {
          return dt(void 0, void 0, void 0, function () {
            return ht(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/blocks/tip/height')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
      }
    })
  var pt = {},
    vt =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    bt =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(pt, '__esModule', { value: !0 }),
    (pt.useFees = void 0),
    (pt.useFees = function (e) {
      return {
        getFeesRecommended: function () {
          return vt(void 0, void 0, void 0, function () {
            return bt(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/v1/fees/recommended')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
        getFeesMempoolBlocks: function () {
          return vt(void 0, void 0, void 0, function () {
            return bt(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/v1/fees/mempool-blocks')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
        getCPFP: function (t) {
          return vt(void 0, void 0, void 0, function () {
            return bt(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/v1/cpfp/' + t.txid)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
      }
    })
  var yt = {},
    wt =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    gt =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(yt, '__esModule', { value: !0 }),
    (yt.useMempool = void 0),
    (yt.useMempool = function (e) {
      return {
        getMempool: function () {
          return wt(void 0, void 0, void 0, function () {
            return gt(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/mempool')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
        getMempoolTxids: function () {
          return wt(void 0, void 0, void 0, function () {
            return gt(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/mempool/txids')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
        getMempoolRecent: function () {
          return wt(void 0, void 0, void 0, function () {
            return gt(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, e.get('/mempool/recent')]
                case 1:
                  return [2, t.sent().data]
              }
            })
          })
        },
      }
    })
  var mt = {},
    xt =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(e) {
            try {
              s(r.next(e))
            } catch (t) {
              i(t)
            }
          }
          function u(e) {
            try {
              s(r.throw(e))
            } catch (t) {
              i(t)
            }
          }
          function s(e) {
            var t
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t)
                    })).then(a, u)
          }
          s((r = r.apply(e, t || [])).next())
        })
      },
    kt =
      (this && this.__generator) ||
      function (e, t) {
        var n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: [],
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this
            }),
          i
        )
        function u(i) {
          return function (u) {
            return (function (i) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return a.label++, { value: i[1], done: !1 }
                    case 5:
                      a.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        a = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1]
                        break
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        ;(a.label = o[1]), (o = i)
                        break
                      }
                      if (o && a.label < o[2]) {
                        ;(a.label = o[2]), a.ops.push(i)
                        break
                      }
                      o[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  i = t.call(e, a)
                } catch (u) {
                  ;(i = [6, u]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
  Object.defineProperty(mt, '__esModule', { value: !0 }),
    (mt.useTransactions = void 0),
    (mt.useTransactions = function (e) {
      return {
        getTx: function (t) {
          return xt(void 0, void 0, void 0, function () {
            return kt(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/tx/' + t.txid)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getTxStatus: function (t) {
          return xt(void 0, void 0, void 0, function () {
            return kt(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/tx/' + t.txid + '/status')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getTxHex: function (t) {
          return xt(void 0, void 0, void 0, function () {
            return kt(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/tx/' + t.txid + '/hex')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getTxRaw: function (t) {
          return xt(void 0, void 0, void 0, function () {
            return kt(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/tx/' + t.txid + '/raw')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getTxMerkleBlockProof: function (t) {
          return xt(void 0, void 0, void 0, function () {
            return kt(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/tx/' + t.txid + '/merkleblock-proof')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getTxMerkleProof: function (t) {
          return xt(void 0, void 0, void 0, function () {
            return kt(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/tx/' + t.txid + '/merkle-proof')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getTxOutspend: function (t) {
          return xt(void 0, void 0, void 0, function () {
            return kt(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/tx/' + t.txid + '/outspend/' + t.vout)]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        getTxOutspends: function (t) {
          return xt(void 0, void 0, void 0, function () {
            return kt(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.get('/tx/' + t.txid + '/outspends')]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
        postTx: function (t) {
          return xt(void 0, void 0, void 0, function () {
            return kt(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, e.post('/tx', { txid: t.txhex })]
                case 1:
                  return [2, n.sent().data]
              }
            })
          })
        },
      }
    })
  var _t = {},
    Tt =
      (this && this.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e }
      }
  Object.defineProperty(_t, '__esModule', { value: !0 }), (_t.useWebsocket = void 0)
  var St = Tt(Ae),
    Pt = Tt(Re)
  _t.useWebsocket = function (e) {
    var t = 'wss://' + e + '/liquid/api/v1/ws'
    return {
      initClient: function (e) {
        var n = e.options
        return St.default(n, t)
      },
      initServer: function (e) {
        var n = e.options
        return Pt.default(n, t)
      },
    }
  }
  var Et = function (e) {
    var t = void 0 === e ? { hostname: 'mempool.space', network: 'main' } : e,
      n = t.hostname,
      r = t.network
    n || (n = 'mempool.space'), r || (r = 'main')
    var o = ue.makeBitcoinAPI({ hostname: n, network: r }).api,
      i = ue.makeBisqAPI(n).api,
      a = ue.makeBisqMarketsAPI().api,
      u = ue.makeLiquidAPI(n).api
    return {
      bitcoin: {
        addresses: le.useAddresses(o),
        blocks: he.useBlocks(o),
        difficulty: be.useDifficulty(o),
        fees: ge.useFees(o),
        mempool: ke.useMempool(o),
        transactions: Se.useTransactions(o),
        websocket: De.useWebsocket(n, r),
      },
      bisq: {
        statistics: Ke.useStatistics(i),
        addresses: Je.useAddresses(i),
        blocks: Ve.useBlocks(i),
        transactions: Ze.useTransactions(i),
        markets: nt.useMarkets(a),
      },
      liquid: {
        addresses: st.useAddresses(u),
        assets: it.useAssets(u),
        blocks: ft.useBlocks(u),
        fees: pt.useFees(u),
        mempool: yt.useMempool(u),
        transactions: mt.useTransactions(u),
        websocket: _t.useWebsocket(n),
      },
    }
  }
  return (Et.default = Et), Et
})
