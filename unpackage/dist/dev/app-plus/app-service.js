if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const ON_SHOW = "onShow";
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  let baseUrl = "http://81.68.206.160:4000";
  const http = {
    get(opt) {
      return new Promise((resolve, reject) => {
        uni.request({
          url: baseUrl + opt.url,
          method: "GET",
          success(res) {
            resolve(res);
          },
          fail() {
            reject();
          }
        });
      });
    },
    post(opt) {
      formatAppLog("log", "at ajax/req.js:21", 1);
      return new Promise((resolve, reject) => {
        uni.request({
          url: baseUrl + opt.url,
          data: opt.data,
          header: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          method: "POST",
          success(res) {
            if (res.data.code != 1e3) {
              uni.showToast({
                title: res.data.msg,
                icon: "none"
              });
            }
            resolve(res);
          },
          fail() {
            formatAppLog("log", "at ajax/req.js:40", 3);
            reject();
          }
        });
      });
    }
  };
  const register = (data) => {
    return http.post({
      url: "/user/createUser",
      data: {
        ...data
      }
    });
  };
  const login = (data) => {
    return http.post({
      url: "/user/loginUser",
      data: {
        ...data
      }
    });
  };
  const searchFriends = (data) => {
    return http.get({
      url: `/user/searchFriends?userId=${data}`
    });
  };
  const selectUserByPhone = (data) => {
    return http.post({
      url: `/user/selectUserByPhone`,
      data: {
        ...data
      }
    });
  };
  const searchAllFriendsById = (data) => {
    return http.get({
      url: `/user/selectUserList?selectId=${data}`
    });
  };
  const addFriend = (data) => {
    return http.post({
      url: `/user/addFriend`,
      data: {
        ...data
      }
    });
  };
  const relationship = (data) => {
    return http.post({
      url: `/user/relationship`,
      data: {
        ...data
      }
    });
  };
  const agreeAdd = (data) => {
    return http.post({
      url: `/user/agreeAdd`,
      data: {
        ...data
      }
    });
  };
  const ajax = {
    register,
    login,
    searchFriends,
    searchAllFriendsById,
    addFriend,
    selectUserByPhone,
    relationship,
    agreeAdd
  };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$g = {
    __name: "login",
    setup(__props) {
      let form = vue.ref({
        Phone: "",
        Password: ""
      });
      const login2 = () => {
        if (!form.value.Password && !form.value.Phone)
          return;
        ajax.login(form.value).then((res) => {
          uni.setStorageSync("Phone", form.value.Phone);
          uni.setStorageSync("Password", form.value.Password);
          if (res.data.code == 1e3) {
            uni.setStorageSync("token", res.data.token);
            uni.setStorageSync("UserInfo", JSON.stringify(res.data.data));
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/chat/index"
              });
            }, 1e3);
          }
        });
      };
      const gotoRegister = () => {
        uni.navigateTo({
          url: "/pages/login/regise/regise"
        });
      };
      vue.onMounted(() => {
        form.value.Phone = uni.getStorageSync("Phone");
        form.value.Password = uni.getStorageSync("Password");
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "phonelogin" }, [
          vue.createElementVNode("view", { class: "phonelogin_title" }, " \u624B\u673A\u53F7\u767B\u5F55 "),
          vue.createElementVNode("view", { class: "phonelogin_input phonelogin_input-style" }, [
            vue.createCommentVNode(' <image style="width: 40rpx;height: 40rpx;margin-right: 20rpx;" src="../../../../static/images/phone.png"\r\n				mode=""></image> '),
            vue.withDirectives(vue.createElementVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(form).Phone = $event),
              type: "text",
              placeholder: "\u7528\u6237\u8D26\u53F7"
            }, null, 512), [
              [vue.vModelText, vue.unref(form).Phone]
            ])
          ]),
          vue.createElementVNode("view", { class: "phonelogin_input phonelogin_input-style2" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              password: "",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(form).Password = $event),
              placeholder: "\u7528\u6237\u5BC6\u7801"
            }, null, 512), [
              [vue.vModelText, vue.unref(form).Password]
            ])
          ]),
          vue.createElementVNode("view", {
            class: "register",
            onClick: gotoRegister
          }, " \u6682\u65E0\u8D26\u53F7\uFF1F\u5148\u53BB\u6CE8\u518C "),
          vue.createElementVNode("view", {
            class: "phonelogin_loginBtn",
            onClick: login2
          }, " \u767B\u5F55 ")
        ]);
      };
    }
  };
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-e4e4508d"], ["__file", "/Users/fox/project/uniapp/ftu/pages/login/login.vue"]]);
  const isObject$1 = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format.length) {
      let char = format[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format[position++];
        }
        const isClosed = char === endDelimiter;
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = Array.isArray(values) ? "list" : isObject$1(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      const token = tokens[index];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages2) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages2 && messages2[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages: messages2, watcher, formater }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater || defaultFormatter;
      this.messages = messages2 || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn2) {
      const index = this.watchers.push(fn2) - 1;
      return () => {
        this.watchers.splice(index, 1);
      };
    }
    add(locale, message, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      [locale, messages2] = [
        messages2,
        locale
      ];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages: messages2,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message, values, delimiters) {
        return i18n.f(message, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message, override = true) {
        return i18n.add(locale2, message, override);
      },
      watch(fn2) {
        return i18n.watchLocale(fn2);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  const pages = [
    {
      path: "pages/login/login",
      style: {
        navigationBarTitleText: "\u767B\u5F55"
      }
    },
    {
      path: "pages/login/regise/regise",
      style: {
        navigationBarTitleText: "\u6CE8\u518C",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/chat/index",
      style: {
        navigationBarTitleText: "\u80D6\u72D0"
      }
    },
    {
      path: "pages/friends/friends",
      style: {
        navigationBarTitleText: "\u597D\u53CB\u5217\u8868",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/my/my",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationBarBackgroundColor: "#ffffff"
      }
    },
    {
      path: "pages/find/find",
      style: {
        navigationBarTitleText: "\u53D1\u73B0",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/friends/chatPage/chatPage",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/find/addFriends/addFriends",
      style: {
        navigationBarTitleText: "\u6DFB\u52A0\u597D\u53CB",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/my/settingUserInfo/settingUserInfo",
      style: {
        navigationBarTitleText: "\u4E2A\u4EBA\u4FE1\u606F",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/find/friendsSpaces/friendsSpaces",
      style: {
        navigationBarTitleText: "\u4E2A\u4EBA\u4FE1\u606F",
        enablePullDownRefresh: false
      }
    }
  ];
  const tabBar = {
    backgroundColor: "#ffffff",
    color: "#000000",
    selectedColor: "#128ed1",
    list: [
      {
        iconPath: "static/image/tabbar2.png",
        selectedIconPath: "static/image/tabbar2-check.png",
        pagePath: "pages/chat/index",
        text: "\u804A\u5929"
      },
      {
        iconPath: "static/image/tabbar1.png",
        selectedIconPath: "static/image/tabbar1-check.png",
        pagePath: "pages/friends/friends",
        text: "\u597D\u53CB\u5217\u8868"
      },
      {
        iconPath: "static/image/tabbar4.png",
        selectedIconPath: "static/image/tabbar4-check.png",
        pagePath: "pages/find/find",
        text: "\u53D1\u73B0"
      },
      {
        iconPath: "static/image/tabbar3.png",
        selectedIconPath: "static/image/tabbar3-check.png",
        pagePath: "pages/my/my",
        text: "\u6211"
      }
    ]
  };
  const globalStyle = {
    navigationBarTextStyle: "black",
    navigationBarTitleText: "uni-app",
    navigationBarBackgroundColor: "#F8F8F8",
    backgroundColor: "#F8F8F8"
  };
  const uniIdRouter = {};
  const t$3 = {
    pages,
    tabBar,
    globalStyle,
    uniIdRouter
  };
  function n$1(e2) {
    return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
  }
  function s$1(e2, t2, n2) {
    return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
      return function() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(null == t3 && n2.path);
    } }, n2.exports), n2.exports;
  }
  var r$1 = s$1(function(e2, t2) {
    var n2;
    e2.exports = (n2 = n2 || function(e3, t3) {
      var n3 = Object.create || function() {
        function e4() {
        }
        return function(t4) {
          var n4;
          return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
        };
      }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e4) {
        var t4 = n3(this);
        return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
          t4.$super.init.apply(this, arguments);
        }), t4.init.prototype = t4, t4.$super = this, t4;
      }, create: function() {
        var e4 = this.extend();
        return e4.init.apply(e4, arguments), e4;
      }, init: function() {
      }, mixIn: function(e4) {
        for (var t4 in e4)
          e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
        e4.hasOwnProperty("toString") && (this.toString = e4.toString);
      }, clone: function() {
        return this.init.prototype.extend(this);
      } }, o2 = r2.WordArray = i2.extend({ init: function(e4, n4) {
        e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
      }, toString: function(e4) {
        return (e4 || c2).stringify(this);
      }, concat: function(e4) {
        var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, r3 = e4.sigBytes;
        if (this.clamp(), s3 % 4)
          for (var i3 = 0; i3 < r3; i3++) {
            var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
            t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
          }
        else
          for (i3 = 0; i3 < r3; i3 += 4)
            t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
        return this.sigBytes += r3, this;
      }, clamp: function() {
        var t4 = this.words, n4 = this.sigBytes;
        t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4.words = this.words.slice(0), e4;
      }, random: function(t4) {
        for (var n4, s3 = [], r3 = function(t5) {
          t5 = t5;
          var n5 = 987654321, s4 = 4294967295;
          return function() {
            var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
            return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
          };
        }, i3 = 0; i3 < t4; i3 += 4) {
          var a3 = r3(4294967296 * (n4 || e3.random()));
          n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
        }
        return new o2.init(s3, t4);
      } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
          n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
        return new o2.init(n4, t4 / 2);
      } }, u2 = a2.Latin1 = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push(String.fromCharCode(i3));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
          n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
        return new o2.init(n4, t4);
      } }, l2 = a2.Utf8 = { stringify: function(e4) {
        try {
          return decodeURIComponent(escape(u2.stringify(e4)));
        } catch (e5) {
          throw new Error("Malformed UTF-8 data");
        }
      }, parse: function(e4) {
        return u2.parse(unescape(encodeURIComponent(e4)));
      } }, h2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
        this._data = new o2.init(), this._nDataBytes = 0;
      }, _append: function(e4) {
        "string" == typeof e4 && (e4 = l2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
      }, _process: function(t4) {
        var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e3.min(4 * c3, r3);
        if (c3) {
          for (var l3 = 0; l3 < c3; l3 += i3)
            this._doProcessBlock(s3, l3);
          var h3 = s3.splice(0, c3);
          n4.sigBytes -= u3;
        }
        return new o2.init(h3, u3);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._data = this._data.clone(), e4;
      }, _minBufferSize: 0 });
      r2.Hasher = h2.extend({ cfg: i2.extend(), init: function(e4) {
        this.cfg = this.cfg.extend(e4), this.reset();
      }, reset: function() {
        h2.reset.call(this), this._doReset();
      }, update: function(e4) {
        return this._append(e4), this._process(), this;
      }, finalize: function(e4) {
        return e4 && this._append(e4), this._doFinalize();
      }, blockSize: 16, _createHelper: function(e4) {
        return function(t4, n4) {
          return new e4.init(n4).finalize(t4);
        };
      }, _createHmacHelper: function(e4) {
        return function(t4, n4) {
          return new d2.HMAC.init(e4, n4).finalize(t4);
        };
      } });
      var d2 = s2.algo = {};
      return s2;
    }(Math), n2);
  }), i$1 = r$1, o$1 = (s$1(function(e2, t2) {
    var n2;
    e2.exports = (n2 = i$1, function(e3) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
      !function() {
        for (var t4 = 0; t4 < 64; t4++)
          a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
      }();
      var c2 = o2.MD5 = i2.extend({ _doReset: function() {
        this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
      }, _doProcessBlock: function(e4, t4) {
        for (var n3 = 0; n3 < 16; n3++) {
          var s3 = t4 + n3, r3 = e4[s3];
          e4[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
        }
        var i3 = this._hash.words, o3 = e4[t4 + 0], c3 = e4[t4 + 1], f2 = e4[t4 + 2], p2 = e4[t4 + 3], g2 = e4[t4 + 4], m2 = e4[t4 + 5], y2 = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], v2 = e4[t4 + 9], S2 = e4[t4 + 10], k2 = e4[t4 + 11], I2 = e4[t4 + 12], b2 = e4[t4 + 13], T2 = e4[t4 + 14], A2 = e4[t4 + 15], C2 = i3[0], P2 = i3[1], E2 = i3[2], O2 = i3[3];
        C2 = u2(C2, P2, E2, O2, o3, 7, a2[0]), O2 = u2(O2, C2, P2, E2, c3, 12, a2[1]), E2 = u2(E2, O2, C2, P2, f2, 17, a2[2]), P2 = u2(P2, E2, O2, C2, p2, 22, a2[3]), C2 = u2(C2, P2, E2, O2, g2, 7, a2[4]), O2 = u2(O2, C2, P2, E2, m2, 12, a2[5]), E2 = u2(E2, O2, C2, P2, y2, 17, a2[6]), P2 = u2(P2, E2, O2, C2, _2, 22, a2[7]), C2 = u2(C2, P2, E2, O2, w2, 7, a2[8]), O2 = u2(O2, C2, P2, E2, v2, 12, a2[9]), E2 = u2(E2, O2, C2, P2, S2, 17, a2[10]), P2 = u2(P2, E2, O2, C2, k2, 22, a2[11]), C2 = u2(C2, P2, E2, O2, I2, 7, a2[12]), O2 = u2(O2, C2, P2, E2, b2, 12, a2[13]), E2 = u2(E2, O2, C2, P2, T2, 17, a2[14]), C2 = l2(C2, P2 = u2(P2, E2, O2, C2, A2, 22, a2[15]), E2, O2, c3, 5, a2[16]), O2 = l2(O2, C2, P2, E2, y2, 9, a2[17]), E2 = l2(E2, O2, C2, P2, k2, 14, a2[18]), P2 = l2(P2, E2, O2, C2, o3, 20, a2[19]), C2 = l2(C2, P2, E2, O2, m2, 5, a2[20]), O2 = l2(O2, C2, P2, E2, S2, 9, a2[21]), E2 = l2(E2, O2, C2, P2, A2, 14, a2[22]), P2 = l2(P2, E2, O2, C2, g2, 20, a2[23]), C2 = l2(C2, P2, E2, O2, v2, 5, a2[24]), O2 = l2(O2, C2, P2, E2, T2, 9, a2[25]), E2 = l2(E2, O2, C2, P2, p2, 14, a2[26]), P2 = l2(P2, E2, O2, C2, w2, 20, a2[27]), C2 = l2(C2, P2, E2, O2, b2, 5, a2[28]), O2 = l2(O2, C2, P2, E2, f2, 9, a2[29]), E2 = l2(E2, O2, C2, P2, _2, 14, a2[30]), C2 = h2(C2, P2 = l2(P2, E2, O2, C2, I2, 20, a2[31]), E2, O2, m2, 4, a2[32]), O2 = h2(O2, C2, P2, E2, w2, 11, a2[33]), E2 = h2(E2, O2, C2, P2, k2, 16, a2[34]), P2 = h2(P2, E2, O2, C2, T2, 23, a2[35]), C2 = h2(C2, P2, E2, O2, c3, 4, a2[36]), O2 = h2(O2, C2, P2, E2, g2, 11, a2[37]), E2 = h2(E2, O2, C2, P2, _2, 16, a2[38]), P2 = h2(P2, E2, O2, C2, S2, 23, a2[39]), C2 = h2(C2, P2, E2, O2, b2, 4, a2[40]), O2 = h2(O2, C2, P2, E2, o3, 11, a2[41]), E2 = h2(E2, O2, C2, P2, p2, 16, a2[42]), P2 = h2(P2, E2, O2, C2, y2, 23, a2[43]), C2 = h2(C2, P2, E2, O2, v2, 4, a2[44]), O2 = h2(O2, C2, P2, E2, I2, 11, a2[45]), E2 = h2(E2, O2, C2, P2, A2, 16, a2[46]), C2 = d2(C2, P2 = h2(P2, E2, O2, C2, f2, 23, a2[47]), E2, O2, o3, 6, a2[48]), O2 = d2(O2, C2, P2, E2, _2, 10, a2[49]), E2 = d2(E2, O2, C2, P2, T2, 15, a2[50]), P2 = d2(P2, E2, O2, C2, m2, 21, a2[51]), C2 = d2(C2, P2, E2, O2, I2, 6, a2[52]), O2 = d2(O2, C2, P2, E2, p2, 10, a2[53]), E2 = d2(E2, O2, C2, P2, S2, 15, a2[54]), P2 = d2(P2, E2, O2, C2, c3, 21, a2[55]), C2 = d2(C2, P2, E2, O2, w2, 6, a2[56]), O2 = d2(O2, C2, P2, E2, A2, 10, a2[57]), E2 = d2(E2, O2, C2, P2, y2, 15, a2[58]), P2 = d2(P2, E2, O2, C2, b2, 21, a2[59]), C2 = d2(C2, P2, E2, O2, g2, 6, a2[60]), O2 = d2(O2, C2, P2, E2, k2, 10, a2[61]), E2 = d2(E2, O2, C2, P2, f2, 15, a2[62]), P2 = d2(P2, E2, O2, C2, v2, 21, a2[63]), i3[0] = i3[0] + C2 | 0, i3[1] = i3[1] + P2 | 0, i3[2] = i3[2] + E2 | 0, i3[3] = i3[3] + O2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
        var i3 = e3.floor(s3 / 4294967296), o3 = s3;
        n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
        for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
          var l3 = c3[u3];
          c3[u3] = 16711935 & (l3 << 8 | l3 >>> 24) | 4278255360 & (l3 << 24 | l3 >>> 8);
        }
        return a3;
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._hash = this._hash.clone(), e4;
      } });
      function u2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & n3 | ~t4 & s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function l2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & s3 | n3 & ~s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function h2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 ^ n3 ^ s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function d2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (n3 ^ (t4 | ~s3)) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
    }(Math), n2.MD5);
  }), s$1(function(e2, t2) {
    var n2;
    e2.exports = (n2 = i$1, void function() {
      var e3 = n2, t3 = e3.lib.Base, s2 = e3.enc.Utf8;
      e3.algo.HMAC = t3.extend({ init: function(e4, t4) {
        e4 = this._hasher = new e4.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
        var n3 = e4.blockSize, r2 = 4 * n3;
        t4.sigBytes > r2 && (t4 = e4.finalize(t4)), t4.clamp();
        for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
          a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
        i2.sigBytes = o2.sigBytes = r2, this.reset();
      }, reset: function() {
        var e4 = this._hasher;
        e4.reset(), e4.update(this._iKey);
      }, update: function(e4) {
        return this._hasher.update(e4), this;
      }, finalize: function(e4) {
        var t4 = this._hasher, n3 = t4.finalize(e4);
        return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
      } });
    }());
  }), s$1(function(e2, t2) {
    e2.exports = i$1.HmacMD5;
  })), a$1 = s$1(function(e2, t2) {
    e2.exports = i$1.enc.Utf8;
  }), c$1 = s$1(function(e2, t2) {
    var n2;
    e2.exports = (n2 = i$1, function() {
      var e3 = n2, t3 = e3.lib.WordArray;
      function s2(e4, n3, s3) {
        for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
          if (o2 % 4) {
            var a2 = s3[e4.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e4.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
            r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
          }
        return t3.create(r2, i2);
      }
      e3.enc.Base64 = { stringify: function(e4) {
        var t4 = e4.words, n3 = e4.sigBytes, s3 = this._map;
        e4.clamp();
        for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
          for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
            r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
        var c2 = s3.charAt(64);
        if (c2)
          for (; r2.length % 4; )
            r2.push(c2);
        return r2.join("");
      }, parse: function(e4) {
        var t4 = e4.length, n3 = this._map, r2 = this._reverseMap;
        if (!r2) {
          r2 = this._reverseMap = [];
          for (var i2 = 0; i2 < n3.length; i2++)
            r2[n3.charCodeAt(i2)] = i2;
        }
        var o2 = n3.charAt(64);
        if (o2) {
          var a2 = e4.indexOf(o2);
          -1 !== a2 && (t4 = a2);
        }
        return s2(e4, t4, r2);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
    }(), n2.enc.Base64);
  });
  const u$1 = "FUNCTION", l = "OBJECT", h$1 = "CLIENT_DB";
  function d$1(e2) {
    return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
  }
  function f$1(e2) {
    return "object" === d$1(e2);
  }
  function p$1(e2) {
    return "function" == typeof e2;
  }
  function g$1(e2) {
    return function() {
      try {
        return e2.apply(e2, arguments);
      } catch (e3) {
        console.error(e3);
      }
    };
  }
  function m$1(e2) {
    return e2 && "string" == typeof e2 ? JSON.parse(e2) : e2;
  }
  const y$1 = true, _ = "app", v$1 = m$1([]);
  let S;
  S = _;
  const k$1 = m$1(""), I = m$1("[]") || [];
  let T = "";
  try {
    T = "__UNI__A75A7F3";
  } catch (e2) {
  }
  let A = {};
  function C(e2, t2 = {}) {
    var n2, s2;
    return n2 = A, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (A[e2] = t2), A[e2];
  }
  "app" === S && (A = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {});
  const P = ["invoke", "success", "fail", "complete"], E$1 = C("_globalUniCloudInterceptor");
  function O(e2, t2) {
    E$1[e2] || (E$1[e2] = {}), f$1(t2) && Object.keys(t2).forEach((n2) => {
      P.indexOf(n2) > -1 && function(e3, t3, n3) {
        let s2 = E$1[e3][t3];
        s2 || (s2 = E$1[e3][t3] = []), -1 === s2.indexOf(n3) && p$1(n3) && s2.push(n3);
      }(e2, n2, t2[n2]);
    });
  }
  function x$1(e2, t2) {
    E$1[e2] || (E$1[e2] = {}), f$1(t2) ? Object.keys(t2).forEach((n2) => {
      P.indexOf(n2) > -1 && function(e3, t3, n3) {
        const s2 = E$1[e3][t3];
        if (!s2)
          return;
        const r2 = s2.indexOf(n3);
        r2 > -1 && s2.splice(r2, 1);
      }(e2, n2, t2[n2]);
    }) : delete E$1[e2];
  }
  function U(e2, t2) {
    return e2 && 0 !== e2.length ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
  }
  function R(e2, t2) {
    return E$1[e2] && E$1[e2][t2] || [];
  }
  function L(e2) {
    O("callObject", e2);
  }
  const N = C("_globalUniCloudListener"), D = "response", F = "needLogin", q$1 = "refreshToken", K = "clientdb", M = "cloudfunction", j$1 = "cloudobject";
  function B(e2) {
    return N[e2] || (N[e2] = []), N[e2];
  }
  function $(e2, t2) {
    const n2 = B(e2);
    n2.includes(t2) || n2.push(t2);
  }
  function W(e2, t2) {
    const n2 = B(e2), s2 = n2.indexOf(t2);
    -1 !== s2 && n2.splice(s2, 1);
  }
  function z$1(e2, t2) {
    const n2 = B(e2);
    for (let e3 = 0; e3 < n2.length; e3++) {
      (0, n2[e3])(t2);
    }
  }
  let J, H = false;
  function G() {
    return J || (J = new Promise((e2) => {
      H && e2(), function t2() {
        if ("function" == typeof getCurrentPages) {
          const t3 = getCurrentPages();
          t3 && t3[0] && (H = true, e2());
        }
        H || setTimeout(() => {
          t2();
        }, 30);
      }();
    }), J);
  }
  function V(e2) {
    const t2 = {};
    for (const n2 in e2) {
      const s2 = e2[n2];
      p$1(s2) && (t2[n2] = g$1(s2));
    }
    return t2;
  }
  function Y(e2, t2) {
    return t2 ? function(n2) {
      let s2 = false;
      if ("callFunction" === t2) {
        const e3 = n2 && n2.type || u$1;
        s2 = e3 !== u$1;
      }
      const r2 = "callFunction" === t2 && !s2;
      let i2;
      i2 = this.isReady ? Promise.resolve() : this.initUniCloud, n2 = n2 || {};
      const { success: o2, fail: a2, complete: c2 } = V(n2), l2 = i2.then(() => s2 ? Promise.resolve() : U(R(t2, "invoke"), n2)).then(() => e2.call(this, n2)).then((e3) => s2 ? Promise.resolve(e3) : U(R(t2, "success"), e3).then(() => U(R(t2, "complete"), e3)).then(() => (r2 && z$1(D, { type: M, content: e3 }), Promise.resolve(e3))), (e3) => s2 ? Promise.reject(e3) : U(R(t2, "fail"), e3).then(() => U(R(t2, "complete"), e3)).then(() => (z$1(D, { type: M, content: e3 }), Promise.reject(e3))));
      if (!(o2 || a2 || c2))
        return l2;
      l2.then((e3) => {
        o2 && o2(e3), c2 && c2(e3), r2 && z$1(D, { type: M, content: e3 });
      }, (e3) => {
        a2 && a2(e3), c2 && c2(e3), r2 && z$1(D, { type: M, content: e3 });
      });
    } : function(t3) {
      t3 = t3 || {};
      const { success: n2, fail: s2, complete: r2 } = V(t3);
      if (!(n2 || s2 || r2))
        return e2.call(this, t3);
      e2.call(this, t3).then((e3) => {
        n2 && n2(e3), r2 && r2(e3);
      }, (e3) => {
        s2 && s2(e3), r2 && r2(e3);
      });
    };
  }
  class Q extends Error {
    constructor(e2) {
      super(e2.message), this.errMsg = e2.message || e2.errMsg || "unknown system error", this.code = this.errCode = e2.code || e2.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e2.subject || e2.errSubject, this.cause = e2.cause, this.requestId = e2.requestId;
    }
    toJson(e2 = 0) {
      if (!(e2 >= 10))
        return e2++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e2) : this.cause };
    }
  }
  var X = { request: (e2) => uni.request(e2), uploadFile: (e2) => uni.uploadFile(e2), setStorageSync: (e2, t2) => uni.setStorageSync(e2, t2), getStorageSync: (e2) => uni.getStorageSync(e2), removeStorageSync: (e2) => uni.removeStorageSync(e2), clearStorageSync: () => uni.clearStorageSync() };
  function Z(e2) {
    return e2 && Z(e2.__v_raw) || e2;
  }
  function ee() {
    return { token: X.getStorageSync("uni_id_token") || X.getStorageSync("uniIdToken"), tokenExpired: X.getStorageSync("uni_id_token_expired") };
  }
  function te({ token: e2, tokenExpired: t2 } = {}) {
    e2 && X.setStorageSync("uni_id_token", e2), t2 && X.setStorageSync("uni_id_token_expired", t2);
  }
  function ne() {
    if ("web" !== S)
      return;
    uni.getStorageSync("__LAST_DCLOUD_APPID") !== T && (uni.setStorageSync("__LAST_DCLOUD_APPID", T), console.warn("\u68C0\u6D4B\u5230\u5F53\u524D\u9879\u76EE\u4E0E\u4E0A\u6B21\u8FD0\u884C\u5230\u6B64\u7AEF\u53E3\u7684\u9879\u76EE\u4E0D\u4E00\u81F4\uFF0C\u81EA\u52A8\u6E05\u7406uni-id\u4FDD\u5B58\u7684token\u4FE1\u606F\uFF08\u4EC5\u5F00\u53D1\u8C03\u8BD5\u65F6\u751F\u6548\uFF09"), X.removeStorageSync("uni_id_token"), X.removeStorageSync("uniIdToken"), X.removeStorageSync("uni_id_token_expired"));
  }
  let se, re;
  function ie() {
    return se || (se = uni.getSystemInfoSync()), se;
  }
  function oe() {
    let e2, t2;
    try {
      if (uni.getLaunchOptionsSync) {
        if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
          return;
        const { scene: n2, channel: s2 } = uni.getLaunchOptionsSync();
        e2 = s2, t2 = n2;
      }
    } catch (e3) {
    }
    return { channel: e2, scene: t2 };
  }
  function ae() {
    const e2 = uni.getLocale && uni.getLocale() || "en";
    if (re)
      return { ...re, locale: e2, LOCALE: e2 };
    const t2 = ie(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["pixelRatio", "brand", "model", "system", "language", "version", "platform", "host", "SDKVersion", "swanNativeVersion", "app", "AppPlatform", "fontSizeSetting"];
    for (let e3 = 0; e3 < o2.length; e3++) {
      delete t2[o2[e3]];
    }
    return re = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...oe(), ...t2 }, { ...re, locale: e2, LOCALE: e2 };
  }
  var ce = { sign: function(e2, t2) {
    let n2 = "";
    return Object.keys(e2).sort().forEach(function(t3) {
      e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
    }), n2 = n2.slice(1), o$1(n2, t2).toString();
  }, wrappedRequest: function(e2, t2) {
    return new Promise((n2, s2) => {
      t2(Object.assign(e2, { complete(e3) {
        e3 || (e3 = {}), "web" === S && e3.errMsg && 0 === e3.errMsg.indexOf("request:fail") && console.warn("\u53D1\u5E03H5\uFF0C\u9700\u8981\u5728uniCloud\u540E\u53F0\u64CD\u4F5C\uFF0C\u7ED1\u5B9A\u5B89\u5168\u57DF\u540D\uFF0C\u5426\u5219\u4F1A\u56E0\u4E3A\u8DE8\u57DF\u95EE\u9898\u800C\u65E0\u6CD5\u8BBF\u95EE\u3002\u6559\u7A0B\u53C2\u8003\uFF1Ahttps://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");
        const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
        if (!e3.statusCode || e3.statusCode >= 400)
          return s2(new Q({ code: "SYS_ERR", message: e3.errMsg || "request:fail", requestId: t3 }));
        const r2 = e3.data;
        if (r2.error)
          return s2(new Q({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
        r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
      } }));
    });
  }, toBase64: function(e2) {
    return c$1.stringify(a$1.parse(e2));
  } }, ue = { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" };
  const { t: le } = initVueI18n({ "zh-Hans": { "uniCloud.init.paramRequired": "\u7F3A\u5C11\u53C2\u6570\uFF1A{param}", "uniCloud.uploadFile.fileError": "filePath\u5E94\u4E3AFile\u5BF9\u8C61" }, "zh-Hant": { "uniCloud.init.paramRequired": "\u7F3A\u5C11\u53C2\u6570\uFF1A{param}", "uniCloud.uploadFile.fileError": "filePath\u5E94\u4E3AFile\u5BF9\u8C61" }, en: ue, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, ja: ue }, "zh-Hans");
  var he = class {
    constructor(e2) {
      ["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(le("uniCloud.init.paramRequired", { param: t2 }));
      }), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = X, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;
    }
    get hasAccessToken() {
      return !!this.accessToken;
    }
    setAccessToken(e2) {
      this.accessToken = e2;
    }
    requestWrapped(e2) {
      return ce.wrappedRequest(e2, this.adapter.request);
    }
    requestAuth(e2) {
      return this.requestWrapped(e2);
    }
    request(e2, t2) {
      return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
        !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e3();
      }).then(() => this.getAccessToken()).then(() => {
        const t4 = this.rebuildRequest(e2);
        return this.request(t4, true);
      })) : this.getAccessToken().then(() => {
        const t3 = this.rebuildRequest(e2);
        return this.request(t3, true);
      }));
    }
    rebuildRequest(e2) {
      const t2 = Object.assign({}, e2);
      return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = ce.sign(t2.data, this.config.clientSecret), t2;
    }
    setupRequest(e2, t2) {
      const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = ce.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
    }
    getAccessToken() {
      if ("pending" === this._getAccessTokenPromiseStatus)
        return this._getAccessTokenPromise;
      this._getAccessTokenPromiseStatus = "pending";
      return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e2) => new Promise((t2, n2) => {
        e2.result && e2.result.accessToken ? (this.setAccessToken(e2.result.accessToken), this._getAccessTokenPromiseStatus = "fulfilled", t2(this.accessToken)) : (this._getAccessTokenPromiseStatus = "rejected", n2(new Q({ code: "AUTH_FAILED", message: "\u83B7\u53D6accessToken\u5931\u8D25" })));
      }), (e2) => (this._getAccessTokenPromiseStatus = "rejected", Promise.reject(e2))), this._getAccessTokenPromise;
    }
    authorize() {
      this.getAccessToken();
    }
    callFunction(e2) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
      return this.request(this.setupRequest(t2));
    }
    getOSSUploadOptionsFromPath(e2) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
          e3 && e3.statusCode < 400 ? o2(e3) : a2(new Q({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
        }, fail(e3) {
          a2(new Q({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
          i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    reportOSSUpload(e2) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    async uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2, config: r2 }) {
      if ("string" !== d$1(t2))
        throw new Q({ code: "INVALID_PARAM", message: "cloudPath\u5FC5\u987B\u4E3A\u5B57\u7B26\u4E32\u7C7B\u578B" });
      if (!(t2 = t2.trim()))
        throw new Q({ code: "CLOUDPATH_REQUIRED", message: "cloudPath\u4E0D\u53EF\u4E3A\u7A7A" });
      if (/:\/\//.test(t2))
        throw new Q({ code: "INVALID_PARAM", message: "cloudPath\u4E0D\u5408\u6CD5" });
      const i2 = r2 && r2.envType || this.config.envType, o2 = (await this.getOSSUploadOptionsFromPath({ env: i2, filename: t2 })).result, a2 = "https://" + o2.cdnDomain + "/" + o2.ossPath, { securityToken: c2, accessKeyId: u2, signature: l2, host: h2, ossPath: f2, id: p2, policy: g2, ossCallbackUrl: m2 } = o2, y2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: u2, Signature: l2, host: h2, id: p2, key: f2, policy: g2, success_action_status: 200 };
      if (c2 && (y2["x-oss-security-token"] = c2), m2) {
        const e3 = JSON.stringify({ callbackUrl: m2, callbackBody: JSON.stringify({ fileId: p2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
        y2.callback = ce.toBase64(e3);
      }
      const _2 = { url: "https://" + o2.host, formData: y2, fileName: "file", name: "file", filePath: e2, fileType: n2 };
      if (await this.uploadFileToOSS(Object.assign({}, _2, { onUploadProgress: s2 })), m2)
        return { success: true, filePath: e2, fileID: a2 };
      if ((await this.reportOSSUpload({ id: p2 })).success)
        return { success: true, filePath: e2, fileID: a2 };
      throw new Q({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" });
    }
    getTempFileURL({ fileList: e2 } = {}) {
      return new Promise((t2, n2) => {
        Array.isArray(e2) && 0 !== e2.length || n2(new Q({ code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u5B57\u7B26\u4E32" })), t2({ fileList: e2.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
      });
    }
    async getFileInfo({ fileList: e2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new Q({ code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u5B57\u7B26\u4E32" });
      const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e2.map((e3) => e3.split("?")[0]).join(",") }) };
      return { fileList: (await this.request(this.setupRequest(t2))).result };
    }
  };
  var de = { init(e2) {
    const t2 = new he(e2), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  const fe = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
  var pe;
  !function(e2) {
    e2.local = "local", e2.none = "none", e2.session = "session";
  }(pe || (pe = {}));
  var ge = function() {
  };
  const me = () => {
    let e2;
    if (!Promise) {
      e2 = () => {
      }, e2.promise = {};
      const t3 = () => {
        throw new Q({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
      };
      return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
    }
    const t2 = new Promise((t3, n2) => {
      e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
    });
    return e2.promise = t2, e2;
  };
  function ye(e2) {
    return void 0 === e2;
  }
  function _e(e2) {
    return "[object Null]" === Object.prototype.toString.call(e2);
  }
  var we;
  function ve(e2) {
    const t2 = (n2 = e2, "[object Array]" === Object.prototype.toString.call(n2) ? e2 : [e2]);
    var n2;
    for (const e3 of t2) {
      const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
      if (t3())
        return { adapter: n3(), runtime: s2 };
    }
  }
  !function(e2) {
    e2.WEB = "web", e2.WX_MP = "wx_mp";
  }(we || (we = {}));
  const Se = { adapter: null, runtime: void 0 }, ke = ["anonymousUuidKey"];
  class Ie extends ge {
    constructor() {
      super(), Se.adapter.root.tcbObject || (Se.adapter.root.tcbObject = {});
    }
    setItem(e2, t2) {
      Se.adapter.root.tcbObject[e2] = t2;
    }
    getItem(e2) {
      return Se.adapter.root.tcbObject[e2];
    }
    removeItem(e2) {
      delete Se.adapter.root.tcbObject[e2];
    }
    clear() {
      delete Se.adapter.root.tcbObject;
    }
  }
  function be(e2, t2) {
    switch (e2) {
      case "local":
        return t2.localStorage || new Ie();
      case "none":
        return new Ie();
      default:
        return t2.sessionStorage || new Ie();
    }
  }
  class Te {
    constructor(e2) {
      if (!this._storage) {
        this._persistence = Se.adapter.primaryStorage || e2.persistence, this._storage = be(this._persistence, Se.adapter);
        const t2 = `access_token_${e2.env}`, n2 = `access_token_expire_${e2.env}`, s2 = `refresh_token_${e2.env}`, r2 = `anonymous_uuid_${e2.env}`, i2 = `login_type_${e2.env}`, o2 = `user_info_${e2.env}`;
        this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: o2 };
      }
    }
    updatePersistence(e2) {
      if (e2 === this._persistence)
        return;
      const t2 = "local" === this._persistence;
      this._persistence = e2;
      const n2 = be(e2, Se.adapter);
      for (const e3 in this.keys) {
        const s2 = this.keys[e3];
        if (t2 && ke.includes(e3))
          continue;
        const r2 = this._storage.getItem(s2);
        ye(r2) || _e(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
      }
      this._storage = n2;
    }
    setStore(e2, t2, n2) {
      if (!this._storage)
        return;
      const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
      try {
        this._storage.setItem(e2, r2);
      } catch (e3) {
        throw e3;
      }
    }
    getStore(e2, t2) {
      try {
        if (!this._storage)
          return;
      } catch (e3) {
        return "";
      }
      t2 = t2 || "localCachev1";
      const n2 = this._storage.getItem(e2);
      if (!n2)
        return "";
      if (n2.indexOf(t2) >= 0) {
        return JSON.parse(n2).content;
      }
      return "";
    }
    removeStore(e2) {
      this._storage.removeItem(e2);
    }
  }
  const Ae = {}, Ce = {};
  function Pe(e2) {
    return Ae[e2];
  }
  class Ee {
    constructor(e2, t2) {
      this.data = t2 || null, this.name = e2;
    }
  }
  class Oe extends Ee {
    constructor(e2, t2) {
      super("error", { error: e2, data: t2 }), this.error = e2;
    }
  }
  const xe = new class {
    constructor() {
      this._listeners = {};
    }
    on(e2, t2) {
      return function(e3, t3, n2) {
        n2[e3] = n2[e3] || [], n2[e3].push(t3);
      }(e2, t2, this._listeners), this;
    }
    off(e2, t2) {
      return function(e3, t3, n2) {
        if (n2 && n2[e3]) {
          const s2 = n2[e3].indexOf(t3);
          -1 !== s2 && n2[e3].splice(s2, 1);
        }
      }(e2, t2, this._listeners), this;
    }
    fire(e2, t2) {
      if (e2 instanceof Oe)
        return console.error(e2.error), this;
      const n2 = "string" == typeof e2 ? new Ee(e2, t2 || {}) : e2;
      const s2 = n2.name;
      if (this._listens(s2)) {
        n2.target = this;
        const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
        for (const t3 of e3)
          t3.call(this, n2);
      }
      return this;
    }
    _listens(e2) {
      return this._listeners[e2] && this._listeners[e2].length > 0;
    }
  }();
  function Ue(e2, t2) {
    xe.on(e2, t2);
  }
  function Re(e2, t2 = {}) {
    xe.fire(e2, t2);
  }
  function Le(e2, t2) {
    xe.off(e2, t2);
  }
  const Ne = "loginStateChanged", De = "loginStateExpire", Fe = "loginTypeChanged", qe = "anonymousConverted", Ke = "refreshAccessToken";
  var Me;
  !function(e2) {
    e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
  }(Me || (Me = {}));
  const je = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], Be = { "X-SDK-Version": "1.3.5" };
  function $e(e2, t2, n2) {
    const s2 = e2[t2];
    e2[t2] = function(t3) {
      const r2 = {}, i2 = {};
      n2.forEach((n3) => {
        const { data: s3, headers: o3 } = n3.call(e2, t3);
        Object.assign(r2, s3), Object.assign(i2, o3);
      });
      const o2 = t3.data;
      return o2 && (() => {
        var e3;
        if (e3 = o2, "[object FormData]" !== Object.prototype.toString.call(e3))
          t3.data = { ...o2, ...r2 };
        else
          for (const e4 in r2)
            o2.append(e4, r2[e4]);
      })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e2, t3);
    };
  }
  function We() {
    const e2 = Math.random().toString(16).slice(2);
    return { data: { seqId: e2 }, headers: { ...Be, "x-seqid": e2 } };
  }
  class ze {
    constructor(e2 = {}) {
      var t2;
      this.config = e2, this._reqClass = new Se.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `\u8BF7\u6C42\u5728${this.config.timeout / 1e3}s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD`, restrictedMethods: ["post"] }), this._cache = Pe(this.config.env), this._localCache = (t2 = this.config.env, Ce[t2]), $e(this._reqClass, "post", [We]), $e(this._reqClass, "upload", [We]), $e(this._reqClass, "download", [We]);
    }
    async post(e2) {
      return await this._reqClass.post(e2);
    }
    async upload(e2) {
      return await this._reqClass.upload(e2);
    }
    async download(e2) {
      return await this._reqClass.download(e2);
    }
    async refreshAccessToken() {
      let e2, t2;
      this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
      try {
        e2 = await this._refreshAccessTokenPromise;
      } catch (e3) {
        t2 = e3;
      }
      if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
        throw t2;
      return e2;
    }
    async _refreshAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
      this._cache.removeStore(e2), this._cache.removeStore(t2);
      let i2 = this._cache.getStore(n2);
      if (!i2)
        throw new Q({ message: "\u672A\u767B\u5F55CloudBase" });
      const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
      if (a2.data.code) {
        const { code: e3 } = a2.data;
        if ("SIGN_PARAM_INVALID" === e3 || "REFRESH_TOKEN_EXPIRED" === e3 || "INVALID_REFRESH_TOKEN" === e3) {
          if (this._cache.getStore(s2) === Me.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e3) {
            const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
            return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
          }
          Re(De), this._cache.removeStore(n2);
        }
        throw new Q({ code: a2.data.code, message: `\u5237\u65B0access token\u5931\u8D25\uFF1A${a2.data.code}` });
      }
      if (a2.data.access_token)
        return Re(Ke), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
      a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
    }
    async getAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
      if (!this._cache.getStore(n2))
        throw new Q({ message: "refresh token\u4E0D\u5B58\u5728\uFF0C\u767B\u5F55\u72B6\u6001\u5F02\u5E38" });
      let s2 = this._cache.getStore(e2), r2 = this._cache.getStore(t2), i2 = true;
      return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
    }
    async request(e2, t2, n2) {
      const s2 = `x-tcb-trace_${this.config.env}`;
      let r2 = "application/x-www-form-urlencoded";
      const i2 = { action: e2, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
      if (-1 === je.indexOf(e2)) {
        const { refreshTokenKey: e3 } = this._cache.keys;
        this._cache.getStore(e3) && (i2.access_token = (await this.getAccessToken()).accessToken);
      }
      let o2;
      if ("storage.uploadFile" === e2) {
        o2 = new FormData();
        for (let e3 in o2)
          o2.hasOwnProperty(e3) && void 0 !== o2[e3] && o2.append(e3, i2[e3]);
        r2 = "multipart/form-data";
      } else {
        r2 = "application/json", o2 = {};
        for (let e3 in i2)
          void 0 !== i2[e3] && (o2[e3] = i2[e3]);
      }
      let a2 = { headers: { "content-type": r2 } };
      n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
      const c2 = this._localCache.getStore(s2);
      c2 && (a2.headers["X-TCB-Trace"] = c2);
      const { parse: u2, inQuery: l2, search: h2 } = t2;
      let d2 = { env: this.config.env };
      u2 && (d2.parse = true), l2 && (d2 = { ...l2, ...d2 });
      let f2 = function(e3, t3, n3 = {}) {
        const s3 = /\?/.test(t3);
        let r3 = "";
        for (let e4 in n3)
          "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e4}=${encodeURIComponent(n3[e4])}`;
        return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e3}${t3}`;
      }(fe, "//tcb-api.tencentcloudapi.com/web", d2);
      h2 && (f2 += h2);
      const p2 = await this.post({ url: f2, data: o2, ...a2 }), g2 = p2.header && p2.header["x-tcb-trace"];
      if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(p2.status) && 200 !== Number(p2.statusCode) || !p2.data)
        throw new Q({ code: "NETWORK_ERROR", message: "network request error" });
      return p2;
    }
    async send(e2, t2 = {}) {
      const n2 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
      if ("ACCESS_TOKEN_EXPIRED" === n2.data.code && -1 === je.indexOf(e2)) {
        await this.refreshAccessToken();
        const n3 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
        if (n3.data.code)
          throw new Q({ code: n3.data.code, message: n3.data.message });
        return n3.data;
      }
      if (n2.data.code)
        throw new Q({ code: n2.data.code, message: n2.data.message });
      return n2.data;
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
  }
  const Je = {};
  function He(e2) {
    return Je[e2];
  }
  class Ge {
    constructor(e2) {
      this.config = e2, this._cache = Pe(e2.env), this._request = He(e2.env);
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
    setAccessToken(e2, t2) {
      const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
      this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
    }
    async refreshUserInfo() {
      const { data: e2 } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e2), e2;
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2);
    }
  }
  class Ve {
    constructor(e2) {
      if (!e2)
        throw new Q({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._envId = e2, this._cache = Pe(this._envId), this._request = He(this._envId), this.setUserInfo();
    }
    linkWithTicket(e2) {
      if ("string" != typeof e2)
        throw new Q({ code: "PARAM_ERROR", message: "ticket must be string" });
      return this._request.send("auth.linkWithTicket", { ticket: e2 });
    }
    linkWithRedirect(e2) {
      e2.signInWithRedirect();
    }
    updatePassword(e2, t2) {
      return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
    }
    updateEmail(e2) {
      return this._request.send("auth.updateEmail", { newEmail: e2 });
    }
    updateUsername(e2) {
      if ("string" != typeof e2)
        throw new Q({ code: "PARAM_ERROR", message: "username must be a string" });
      return this._request.send("auth.updateUsername", { username: e2 });
    }
    async getLinkedUidList() {
      const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
      let t2 = false;
      const { users: n2 } = e2;
      return n2.forEach((e3) => {
        e3.wxOpenId && e3.wxPublicId && (t2 = true);
      }), { users: n2, hasPrimaryUid: t2 };
    }
    setPrimaryUid(e2) {
      return this._request.send("auth.setPrimaryUid", { uid: e2 });
    }
    unlink(e2) {
      return this._request.send("auth.unlink", { platform: e2 });
    }
    async update(e2) {
      const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
      this.setLocalUserInfo(a2);
    }
    async refresh() {
      const { data: e2 } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e2), e2;
    }
    setUserInfo() {
      const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
      ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
        this[e3] = t2[e3];
      }), this.location = { country: t2.country, province: t2.province, city: t2.city };
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2), this.setUserInfo();
    }
  }
  class Ye {
    constructor(e2) {
      if (!e2)
        throw new Q({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._cache = Pe(e2);
      const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
      this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new Ve(e2);
    }
    get isAnonymousAuth() {
      return this.loginType === Me.ANONYMOUS;
    }
    get isCustomAuth() {
      return this.loginType === Me.CUSTOM;
    }
    get isWeixinAuth() {
      return this.loginType === Me.WECHAT || this.loginType === Me.WECHAT_OPEN || this.loginType === Me.WECHAT_PUBLIC;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }
  class Qe extends Ge {
    async signIn() {
      this._cache.updatePersistence("local");
      const { anonymousUuidKey: e2, refreshTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2) || void 0, s2 = this._cache.getStore(t2) || void 0, r2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
      if (r2.uuid && r2.refresh_token) {
        this._setAnonymousUUID(r2.uuid), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), Re(Ne), Re(Fe, { env: this.config.env, loginType: Me.ANONYMOUS, persistence: "local" });
        const e3 = new Ye(this.config.env);
        return await e3.user.refresh(), e3;
      }
      throw new Q({ message: "\u533F\u540D\u767B\u5F55\u5931\u8D25" });
    }
    async linkAndRetrieveDataWithTicket(e2) {
      const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e2 });
      if (i2.refresh_token)
        return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), Re(qe, { env: this.config.env }), Re(Fe, { loginType: Me.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
      throw new Q({ message: "\u533F\u540D\u8F6C\u5316\u5931\u8D25" });
    }
    _setAnonymousUUID(e2) {
      const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, Me.ANONYMOUS);
    }
    _clearAnonymousUUID() {
      this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
  }
  class Xe extends Ge {
    async signIn(e2) {
      if ("string" != typeof e2)
        throw new Q({ code: "PARAM_ERROR", message: "ticket must be a string" });
      const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
      if (n2.refresh_token)
        return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), Re(Ne), Re(Fe, { env: this.config.env, loginType: Me.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new Ye(this.config.env);
      throw new Q({ message: "\u81EA\u5B9A\u4E49\u767B\u5F55\u5931\u8D25" });
    }
  }
  class Ze extends Ge {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new Q({ code: "PARAM_ERROR", message: "email must be a string" });
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Re(Ne), Re(Fe, { env: this.config.env, loginType: Me.EMAIL, persistence: this.config.persistence }), new Ye(this.config.env);
      throw s2.code ? new Q({ code: s2.code, message: `\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: ${s2.message}` }) : new Q({ message: "\u90AE\u7BB1\u767B\u5F55\u5931\u8D25" });
    }
    async activate(e2) {
      return this._request.send("auth.activateEndUserMail", { token: e2 });
    }
    async resetPasswordWithToken(e2, t2) {
      return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
    }
  }
  class et extends Ge {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new Q({ code: "PARAM_ERROR", message: "username must be a string" });
      "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: Me.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Re(Ne), Re(Fe, { env: this.config.env, loginType: Me.USERNAME, persistence: this.config.persistence }), new Ye(this.config.env);
      throw s2.code ? new Q({ code: s2.code, message: `\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: ${s2.message}` }) : new Q({ message: "\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25" });
    }
  }
  class tt {
    constructor(e2) {
      this.config = e2, this._cache = Pe(e2.env), this._request = He(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), Ue(Fe, this._onLoginTypeChanged);
    }
    get currentUser() {
      const e2 = this.hasLoginState();
      return e2 && e2.user || null;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
    anonymousAuthProvider() {
      return new Qe(this.config);
    }
    customAuthProvider() {
      return new Xe(this.config);
    }
    emailAuthProvider() {
      return new Ze(this.config);
    }
    usernameAuthProvider() {
      return new et(this.config);
    }
    async signInAnonymously() {
      return new Qe(this.config).signIn();
    }
    async signInWithEmailAndPassword(e2, t2) {
      return new Ze(this.config).signIn(e2, t2);
    }
    signInWithUsernameAndPassword(e2, t2) {
      return new et(this.config).signIn(e2, t2);
    }
    async linkAndRetrieveDataWithTicket(e2) {
      this._anonymousAuthProvider || (this._anonymousAuthProvider = new Qe(this.config)), Ue(qe, this._onAnonymousConverted);
      return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
    }
    async signOut() {
      if (this.loginType === Me.ANONYMOUS)
        throw new Q({ message: "\u533F\u540D\u7528\u6237\u4E0D\u652F\u6301\u767B\u51FA\u64CD\u4F5C" });
      const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
      if (!s2)
        return;
      const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
      return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), Re(Ne), Re(Fe, { env: this.config.env, loginType: Me.NULL, persistence: this.config.persistence }), r2;
    }
    async signUpWithEmailAndPassword(e2, t2) {
      return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
    }
    async sendPasswordResetEmail(e2) {
      return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
    }
    onLoginStateChanged(e2) {
      Ue(Ne, () => {
        const t3 = this.hasLoginState();
        e2.call(this, t3);
      });
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    }
    onLoginStateExpired(e2) {
      Ue(De, e2.bind(this));
    }
    onAccessTokenRefreshed(e2) {
      Ue(Ke, e2.bind(this));
    }
    onAnonymousConverted(e2) {
      Ue(qe, e2.bind(this));
    }
    onLoginTypeChanged(e2) {
      Ue(Fe, () => {
        const t2 = this.hasLoginState();
        e2.call(this, t2);
      });
    }
    async getAccessToken() {
      return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
    }
    hasLoginState() {
      const { refreshTokenKey: e2 } = this._cache.keys;
      return this._cache.getStore(e2) ? new Ye(this.config.env) : null;
    }
    async isUsernameRegistered(e2) {
      if ("string" != typeof e2)
        throw new Q({ code: "PARAM_ERROR", message: "username must be a string" });
      const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
      return t2 && t2.isRegistered;
    }
    getLoginState() {
      return Promise.resolve(this.hasLoginState());
    }
    async signInWithTicket(e2) {
      return new Xe(this.config).signIn(e2);
    }
    shouldRefreshAccessToken(e2) {
      this._request._shouldRefreshAccessTokenHook = e2.bind(this);
    }
    getUserInfo() {
      return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : { ...e2.data, requestId: e2.seqId });
    }
    getAuthHeader() {
      const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
      return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
    }
    _onAnonymousConverted(e2) {
      const { env: t2 } = e2.data;
      t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
    }
    _onLoginTypeChanged(e2) {
      const { loginType: t2, persistence: n2, env: s2 } = e2.data;
      s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
    }
  }
  const nt = function(e2, t2) {
    t2 = t2 || me();
    const n2 = He(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      const { data: { url: a2, authorization: c2, token: u2, fileId: l2, cosFileId: h2 }, requestId: d2 } = e3, f2 = { key: s2, signature: c2, "x-cos-meta-fileid": h2, success_action_status: "201", "x-cos-security-token": u2 };
      n2.upload({ url: a2, data: f2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e4) => {
        201 === e4.statusCode ? t2(null, { fileID: l2, requestId: d2 }) : t2(new Q({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e4.data}` }));
      }).catch((e4) => {
        t2(e4);
      });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, st = function(e2, t2) {
    t2 = t2 || me();
    const n2 = He(this.config.env), { cloudPath: s2 } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      t2(null, e3);
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, rt = function({ fileList: e2 }, t2) {
    if (t2 = t2 || me(), !e2 || !Array.isArray(e2))
      return { code: "INVALID_PARAM", message: "fileList\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u6570\u7EC4" };
    for (let t3 of e2)
      if (!t3 || "string" != typeof t3)
        return { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u5B57\u7B26\u4E32" };
    const n2 = { fileid_list: e2 };
    return He(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, it = function({ fileList: e2 }, t2) {
    t2 = t2 || me(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u6570\u7EC4" });
    let n2 = [];
    for (let s3 of e2)
      "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u5305\u542BfileID\u548CmaxAge\u7684\u5BF9\u8C61" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u5B57\u7B26\u4E32" });
    const s2 = { file_list: n2 };
    return He(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, ot = async function({ fileID: e2 }, t2) {
    const n2 = (await it.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
    if ("SUCCESS" !== n2.code)
      return t2 ? t2(n2) : new Promise((e3) => {
        e3(n2);
      });
    const s2 = He(this.config.env);
    let r2 = n2.download_url;
    if (r2 = encodeURI(r2), !t2)
      return s2.download({ url: r2 });
    t2(await s2.download({ url: r2 }));
  }, at = function({ name: e2, data: t2, query: n2, parse: s2, search: r2 }, i2) {
    const o2 = i2 || me();
    let a2;
    try {
      a2 = t2 ? JSON.stringify(t2) : "";
    } catch (e3) {
      return Promise.reject(e3);
    }
    if (!e2)
      return Promise.reject(new Q({ code: "PARAM_ERROR", message: "\u51FD\u6570\u540D\u4E0D\u80FD\u4E3A\u7A7A" }));
    const c2 = { inQuery: n2, parse: s2, search: r2, function_name: e2, request_data: a2 };
    return He(this.config.env).send("functions.invokeFunction", c2).then((e3) => {
      if (e3.code)
        o2(null, e3);
      else {
        let t3 = e3.data.response_data;
        if (s2)
          o2(null, { result: t3, requestId: e3.requestId });
        else
          try {
            t3 = JSON.parse(e3.data.response_data), o2(null, { result: t3, requestId: e3.requestId });
          } catch (e4) {
            o2(new Q({ message: "response data must be json" }));
          }
      }
      return o2.promise;
    }).catch((e3) => {
      o2(e3);
    }), o2.promise;
  }, ct = { timeout: 15e3, persistence: "session" }, ut = {};
  class lt {
    constructor(e2) {
      this.config = e2 || this.config, this.authObj = void 0;
    }
    init(e2) {
      switch (Se.adapter || (this.requestClient = new Se.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: `\u8BF7\u6C42\u5728${(e2.timeout || 5e3) / 1e3}s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD` })), this.config = { ...ct, ...e2 }, true) {
        case this.config.timeout > 6e5:
          console.warn("timeout\u5927\u4E8E\u53EF\u914D\u7F6E\u4E0A\u9650[10\u5206\u949F]\uFF0C\u5DF2\u91CD\u7F6E\u4E3A\u4E0A\u9650\u6570\u503C"), this.config.timeout = 6e5;
          break;
        case this.config.timeout < 100:
          console.warn("timeout\u5C0F\u4E8E\u53EF\u914D\u7F6E\u4E0B\u9650[100ms]\uFF0C\u5DF2\u91CD\u7F6E\u4E3A\u4E0B\u9650\u6570\u503C"), this.config.timeout = 100;
      }
      return new lt(this.config);
    }
    auth({ persistence: e2 } = {}) {
      if (this.authObj)
        return this.authObj;
      const t2 = e2 || Se.adapter.primaryStorage || ct.persistence;
      var n2;
      return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
        const { env: t3 } = e3;
        Ae[t3] = new Te(e3), Ce[t3] = new Te({ ...e3, persistence: "local" });
      }(this.config), n2 = this.config, Je[n2.env] = new ze(n2), this.authObj = new tt(this.config), this.authObj;
    }
    on(e2, t2) {
      return Ue.apply(this, [e2, t2]);
    }
    off(e2, t2) {
      return Le.apply(this, [e2, t2]);
    }
    callFunction(e2, t2) {
      return at.apply(this, [e2, t2]);
    }
    deleteFile(e2, t2) {
      return rt.apply(this, [e2, t2]);
    }
    getTempFileURL(e2, t2) {
      return it.apply(this, [e2, t2]);
    }
    downloadFile(e2, t2) {
      return ot.apply(this, [e2, t2]);
    }
    uploadFile(e2, t2) {
      return nt.apply(this, [e2, t2]);
    }
    getUploadMetadata(e2, t2) {
      return st.apply(this, [e2, t2]);
    }
    registerExtension(e2) {
      ut[e2.name] = e2;
    }
    async invokeExtension(e2, t2) {
      const n2 = ut[e2];
      if (!n2)
        throw new Q({ message: `\u6269\u5C55${e2} \u5FC5\u987B\u5148\u6CE8\u518C` });
      return await n2.invoke(t2, this);
    }
    useAdapters(e2) {
      const { adapter: t2, runtime: n2 } = ve(e2) || {};
      t2 && (Se.adapter = t2), n2 && (Se.runtime = n2);
    }
  }
  var ht = new lt();
  function dt(e2, t2, n2) {
    void 0 === n2 && (n2 = {});
    var s2 = /\?/.test(t2), r2 = "";
    for (var i2 in n2)
      "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
    return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e2 + t2;
  }
  class ft {
    post(e2) {
      const { url: t2, data: n2, headers: s2 } = e2;
      return new Promise((e3, r2) => {
        X.request({ url: dt("https:", t2), data: n2, method: "POST", header: s2, success(t3) {
          e3(t3);
        }, fail(e4) {
          r2(e4);
        } });
      });
    }
    upload(e2) {
      return new Promise((t2, n2) => {
        const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e2, c2 = X.uploadFile({ url: dt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e3) {
          const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
          200 === e3.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
        }, fail(e3) {
          n2(new Error(e3.errMsg || "uploadFile:fail"));
        } });
        "function" == typeof e2.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
          e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
        });
      });
    }
  }
  const pt = { setItem(e2, t2) {
    X.setStorageSync(e2, t2);
  }, getItem: (e2) => X.getStorageSync(e2), removeItem(e2) {
    X.removeStorageSync(e2);
  }, clear() {
    X.clearStorageSync();
  } };
  var gt = { genAdapter: function() {
    return { root: {}, reqClass: ft, localStorage: pt, primaryStorage: "local" };
  }, isMatch: function() {
    return true;
  }, runtime: "uni_app" };
  ht.useAdapters(gt);
  const mt = ht, yt = mt.init;
  mt.init = function(e2) {
    e2.env = e2.spaceId;
    const t2 = yt.call(this, e2);
    t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
    const n2 = t2.auth;
    return t2.auth = function(e3) {
      const t3 = n2.call(this, e3);
      return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
        t3[e4] = Y(t3[e4]).bind(t3);
      }), t3;
    }, t2.customAuth = t2.auth, t2;
  };
  var _t = mt;
  var wt = class extends he {
    getAccessToken() {
      return new Promise((e2, t2) => {
        const n2 = "Anonymous_Access_token";
        this.setAccessToken(n2), e2(n2);
      });
    }
    setupRequest(e2, t2) {
      const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = ce.sign(n2, this.config.clientSecret);
      const r2 = ae();
      s2["x-client-info"] = encodeURIComponent(JSON.stringify(r2));
      const { token: i2 } = ee();
      return s2["x-client-token"] = i2, { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: JSON.parse(JSON.stringify(s2)) };
    }
    uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, success(e3) {
          e3 && e3.statusCode < 400 ? o2(e3) : a2(new Q({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
        }, fail(e3) {
          a2(new Q({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
          i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
      if (!t2)
        throw new Q({ code: "CLOUDPATH_REQUIRED", message: "cloudPath\u4E0D\u53EF\u4E3A\u7A7A" });
      let r2;
      return this.getOSSUploadOptionsFromPath({ cloudPath: t2 }).then((t3) => {
        const { url: i2, formData: o2, name: a2 } = t3.result;
        r2 = t3.result.fileUrl;
        const c2 = { url: i2, formData: o2, name: a2, filePath: e2, fileType: n2 };
        return this.uploadFileToOSS(Object.assign({}, c2, { onUploadProgress: s2 }));
      }).then(() => this.reportOSSUpload({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
        t3.success ? n3({ success: true, filePath: e2, fileID: r2 }) : s3(new Q({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
      }));
    }
    deleteFile({ fileList: e2 }) {
      const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
      return this.request(this.setupRequest(t2)).then((e3) => {
        if (e3.success)
          return e3.result;
        throw new Q({ code: "DELETE_FILE_FAILED", message: "\u5220\u9664\u6587\u4EF6\u5931\u8D25" });
      });
    }
    getTempFileURL({ fileList: e2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new Q({ code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u5B57\u7B26\u4E32" });
      const t2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2 }) };
      return this.request(this.setupRequest(t2)).then((e3) => {
        if (e3.success)
          return { fileList: e3.result.fileList.map((e4) => ({ fileID: e4.fileID, tempFileURL: e4.tempFileURL })) };
        throw new Q({ code: "GET_TEMP_FILE_URL_FAILED", message: "\u83B7\u53D6\u4E34\u65F6\u6587\u4EF6\u94FE\u63A5\u5931\u8D25" });
      });
    }
  };
  var vt = { init(e2) {
    const t2 = new wt(e2), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  function St({ data: e2 }) {
    let t2;
    t2 = ae();
    const n2 = JSON.parse(JSON.stringify(e2 || {}));
    if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
      const { token: e3 } = ee();
      e3 && (n2.uniIdToken = e3);
    }
    return n2;
  }
  function kt({ name: e2, data: t2 } = {}) {
    const { localAddress: n2, localPort: s2 } = this.__dev__, r2 = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider], i2 = this.config.spaceId, o2 = `http://${n2}:${s2}/system/check-function`, a2 = `http://${n2}:${s2}/cloudfunctions/${e2}`;
    return new Promise((t3, n3) => {
      X.request({ method: "POST", url: o2, data: { name: e2, platform: S, provider: r2, spaceId: i2 }, timeout: 3e3, success(e3) {
        t3(e3);
      }, fail() {
        t3({ data: { code: "NETWORK_ERROR", message: "\u8FDE\u63A5\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5BA2\u6237\u7AEF\u662F\u5426\u548C\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570\u3002" } });
      } });
    }).then(({ data: e3 } = {}) => {
      const { code: t3, message: n3 } = e3 || {};
      return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
    }).then(({ code: n3, message: s3 }) => {
      if (0 !== n3) {
        switch (n3) {
          case "MODULE_ENCRYPTED":
            console.error(`\u6B64\u4E91\u51FD\u6570\uFF08${e2}\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570`);
            break;
          case "FUNCTION_ENCRYPTED":
            console.error(`\u6B64\u4E91\u51FD\u6570\uFF08${e2}\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570`);
            break;
          case "ACTION_ENCRYPTED":
            console.error(s3 || "\u9700\u8981\u8BBF\u95EE\u52A0\u5BC6\u7684uni-clientDB-action\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u73AF\u5883");
            break;
          case "NETWORK_ERROR": {
            const e3 = "\u8FDE\u63A5\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5BA2\u6237\u7AEF\u662F\u5426\u548C\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B";
            throw console.error(e3), new Error(e3);
          }
          case "SWITCH_TO_CLOUD":
            break;
          default: {
            const e3 = `\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A${s3}\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5`;
            throw console.error(e3), new Error(e3);
          }
        }
        return this._callCloudFunction({ name: e2, data: t2 });
      }
      return new Promise((e3, n4) => {
        const s4 = St.call(this, { data: t2 });
        X.request({ method: "POST", url: a2, data: { provider: r2, platform: S, param: s4 }, success: ({ statusCode: t3, data: s5 } = {}) => !t3 || t3 >= 400 ? n4(new Q({ code: s5.code || "SYS_ERR", message: s5.message || "request:fail" })) : e3({ result: s5 }), fail(e4) {
          n4(new Q({ code: e4.code || e4.errCode || "SYS_ERR", message: e4.message || e4.errMsg || "request:fail" }));
        } });
      });
    });
  }
  const It = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "\uFF0C\u4E91\u51FD\u6570[{functionName}]\u5728\u4E91\u7AEF\u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5\u6B64\u4E91\u51FD\u6570\u540D\u79F0\u662F\u5426\u6B63\u786E\u4EE5\u53CA\u8BE5\u4E91\u51FD\u6570\u662F\u5426\u5DF2\u4E0A\u4F20\u5230\u670D\u52A1\u7A7A\u95F4", mode: "append" }];
  var bt = /[\\^$.*+?()[\]{}|]/g, Tt = RegExp(bt.source);
  function At(e2, t2, n2) {
    return e2.replace(new RegExp((s2 = t2) && Tt.test(s2) ? s2.replace(bt, "\\$&") : s2, "g"), n2);
    var s2;
  }
  const Pt = "request", Et = "response", Ot = "both";
  const fn = { code: 2e4, message: "System error" }, pn = { code: 20101, message: "Invalid client" };
  function yn(e2) {
    const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e2 || {};
    return new Q({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || fn.code, message: r2 || o2, cause: a2 });
  }
  let wn;
  function bn({ secretType: e2 } = {}) {
    return e2 === Pt || e2 === Et || e2 === Ot;
  }
  function Tn({ name: e2, data: t2 = {} } = {}) {
    return "app" === S && "DCloud-clientDB" === e2 && "encryption" === t2.redirectTo && "getAppClientKey" === t2.action;
  }
  function An({ provider: e2, spaceId: t2, functionName: n2 } = {}) {
    const { appId: s2, uniPlatform: r2, osName: i2 } = ie();
    let o2 = r2;
    "app" === r2 && (o2 = i2);
    const a2 = function({ provider: e3, spaceId: t3 } = {}) {
      const n3 = v$1;
      if (!n3)
        return {};
      e3 = function(e4) {
        return "tencent" === e4 ? "tcb" : e4;
      }(e3);
      const s3 = n3.find((n4) => n4.provider === e3 && n4.spaceId === t3);
      return s3 && s3.config;
    }({ provider: e2, spaceId: t2 });
    if (!a2 || !a2.accessControl || !a2.accessControl.enable)
      return false;
    const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
    if (0 === u2.length)
      return true;
    const l2 = function(e3, t3) {
      let n3, s3, r3;
      for (let i3 = 0; i3 < e3.length; i3++) {
        const o3 = e3[i3];
        o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e4) => e4.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
      }
      return n3 || s3 || r3;
    }(u2, n2);
    if (!l2)
      return false;
    if ((c2[l2] || []).find((e3 = {}) => e3.appId === s2 && (e3.platform || "").toLowerCase() === o2.toLowerCase()))
      return true;
    throw console.error(`\u6B64\u5E94\u7528[appId: ${s2}, platform: ${o2}]\u4E0D\u5728\u4E91\u7AEF\u914D\u7F6E\u7684\u5141\u8BB8\u8BBF\u95EE\u7684\u5E94\u7528\u5217\u8868\u5185\uFF0C\u53C2\u8003\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), yn(pn);
  }
  function Cn({ functionName: e2, result: t2, logPvd: n2 }) {
    if (this.__dev__.debugLog && t2 && t2.requestId) {
      const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e2, requestId: t2.requestId });
      console.log(`[${n2}-request]${s2}[/${n2}-request]`);
    }
  }
  function Pn(e2) {
    const t2 = e2.callFunction, n2 = function(n3) {
      const s2 = n3.name;
      n3.data = St.call(e2, { data: n3.data });
      const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb" }[this.config.provider], i2 = bn(n3), o2 = Tn(n3), a2 = i2 || o2;
      return t2.call(this, n3).then((e3) => (e3.errCode = 0, !a2 && Cn.call(this, { functionName: s2, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (!a2 && Cn.call(this, { functionName: s2, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
        for (let s3 = 0; s3 < n4.length; s3++) {
          const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e4.match(r3);
          if (!a3)
            continue;
          let c2 = i3;
          for (let e5 = 1; e5 < a3.length; e5++)
            c2 = At(c2, `{$${e5}}`, a3[e5]);
          for (const e5 in t3)
            c2 = At(c2, `{${e5}}`, t3[e5]);
          return "replace" === o3 ? c2 : e4 + c2;
        }
        return e4;
      }({ message: `[${n3.name}]: ${e3.message}`, formatter: It, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
    };
    e2.callFunction = function(t3) {
      const { provider: s2, spaceId: r2 } = e2.config, i2 = t3.name;
      let o2, a2;
      if (t3.data = t3.data || {}, e2.__dev__.debugInfo && !e2.__dev__.debugInfo.forceRemote && I ? (e2._callCloudFunction || (e2._callCloudFunction = n2, e2._callLocalFunction = kt), o2 = kt) : o2 = n2, o2 = o2.bind(e2), Tn(t3))
        a2 = n2.call(e2, t3);
      else if (function({ name: e3, data: t4 = {} }) {
        return "mp-weixin" === S && "uni-id-co" === e3 && "secureNetworkHandshakeByWeixin" === t4.method;
      }(t3))
        a2 = o2.call(e2, t3);
      else if (bn(t3)) {
        a2 = new wn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapEncryptDataCallFunction(n2.bind(e2))(t3);
      } else if (An({ provider: s2, spaceId: r2, functionName: i2 })) {
        a2 = new wn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapVerifyClientCallFunction(n2.bind(e2))(t3);
      } else
        a2 = o2(t3);
      return Object.defineProperty(a2, "result", { get: () => (console.warn("\u5F53\u524D\u8FD4\u56DE\u7ED3\u679C\u4E3APromise\u7C7B\u578B\uFF0C\u4E0D\u53EF\u76F4\u63A5\u8BBF\u95EE\u5176result\u5C5E\u6027\uFF0C\u8BE6\u60C5\u8BF7\u53C2\u8003\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2;
    };
  }
  wn = "mp-weixin" !== S && "app" !== S ? class {
    constructor() {
      throw yn({ message: `Platform ${S} is not supported by secure network` });
    }
  } : class {
    constructor() {
      throw yn({ message: `Platform ${S} is not enabled, please check whether secure network module is enabled in your manifest.json` });
    }
  };
  const En = Symbol("CLIENT_DB_INTERNAL");
  function On(e2, t2) {
    return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = En, e2.inspect = null, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
      if ("_uniClient" === n2)
        return null;
      if ("symbol" == typeof n2)
        return e3[n2];
      if (n2 in e3 || "string" != typeof n2) {
        const t3 = e3[n2];
        return "function" == typeof t3 ? t3.bind(e3) : t3;
      }
      return t2.get(e3, n2, s2);
    } });
  }
  function xn(e2) {
    return { on: (t2, n2) => {
      e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
    }, off: (t2, n2) => {
      e2[t2] = e2[t2] || [];
      const s2 = e2[t2].indexOf(n2);
      -1 !== s2 && e2[t2].splice(s2, 1);
    } };
  }
  const Un = ["db.Geo", "db.command", "command.aggregate"];
  function Rn(e2, t2) {
    return Un.indexOf(`${e2}.${t2}`) > -1;
  }
  function Ln(e2) {
    switch (d$1(e2 = Z(e2))) {
      case "array":
        return e2.map((e3) => Ln(e3));
      case "object":
        return e2._internalType === En || Object.keys(e2).forEach((t2) => {
          e2[t2] = Ln(e2[t2]);
        }), e2;
      case "regexp":
        return { $regexp: { source: e2.source, flags: e2.flags } };
      case "date":
        return { $date: e2.toISOString() };
      default:
        return e2;
    }
  }
  function Nn(e2) {
    return e2 && e2.content && e2.content.$method;
  }
  class Dn {
    constructor(e2, t2, n2) {
      this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
    }
    toJSON() {
      let e2 = this;
      const t2 = [e2.content];
      for (; e2.prevStage; )
        e2 = e2.prevStage, t2.push(e2.content);
      return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: Ln(e3.$param) })) };
    }
    getAction() {
      const e2 = this.toJSON().$db.find((e3) => "action" === e3.$method);
      return e2 && e2.$param && e2.$param[0];
    }
    getCommand() {
      return { $db: this.toJSON().$db.filter((e2) => "action" !== e2.$method) };
    }
    get isAggregate() {
      let e2 = this;
      for (; e2; ) {
        const t2 = Nn(e2), n2 = Nn(e2.prevStage);
        if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isCommand() {
      let e2 = this;
      for (; e2; ) {
        if ("command" === Nn(e2))
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isAggregateCommand() {
      let e2 = this;
      for (; e2; ) {
        const t2 = Nn(e2), n2 = Nn(e2.prevStage);
        if ("aggregate" === t2 && "command" === n2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    getNextStageFn(e2) {
      const t2 = this;
      return function() {
        return Fn({ $method: e2, $param: Ln(Array.from(arguments)) }, t2, t2._database);
      };
    }
    get count() {
      return this.isAggregate ? this.getNextStageFn("count") : function() {
        return this._send("count", Array.from(arguments));
      };
    }
    get remove() {
      return this.isCommand ? this.getNextStageFn("remove") : function() {
        return this._send("remove", Array.from(arguments));
      };
    }
    get() {
      return this._send("get", Array.from(arguments));
    }
    get add() {
      return this.isCommand ? this.getNextStageFn("add") : function() {
        return this._send("add", Array.from(arguments));
      };
    }
    update() {
      return this._send("update", Array.from(arguments));
    }
    end() {
      return this._send("end", Array.from(arguments));
    }
    get set() {
      return this.isCommand ? this.getNextStageFn("set") : function() {
        throw new Error("JQL\u7981\u6B62\u4F7F\u7528set\u65B9\u6CD5");
      };
    }
    _send(e2, t2) {
      const n2 = this.getAction(), s2 = this.getCommand();
      if (s2.$db.push({ $method: e2, $param: Ln(t2) }), y$1) {
        const e3 = s2.$db.find((e4) => "collection" === e4.$method), t3 = e3 && e3.$param;
        t3 && 1 === t3.length && "string" == typeof e3.$param[0] && e3.$param[0].indexOf(",") > -1 && console.warn("\u68C0\u6D4B\u5230\u4F7F\u7528JQL\u8BED\u6CD5\u8054\u8868\u67E5\u8BE2\u65F6\uFF0C\u672A\u4F7F\u7528getTemp\u5148\u8FC7\u6EE4\u4E3B\u8868\u6570\u636E\uFF0C\u5728\u4E3B\u8868\u6570\u636E\u91CF\u5927\u7684\u60C5\u51B5\u4E0B\u53EF\u80FD\u4F1A\u67E5\u8BE2\u7F13\u6162\u3002\n- \u5982\u4F55\u4F18\u5316\u8BF7\u53C2\u8003\u6B64\u6587\u6863\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- \u5982\u679C\u4E3B\u8868\u6570\u636E\u91CF\u5F88\u5C0F\u8BF7\u5FFD\u7565\u6B64\u4FE1\u606F\uFF0C\u9879\u76EE\u53D1\u884C\u65F6\u4E0D\u4F1A\u51FA\u73B0\u6B64\u63D0\u793A\u3002");
      }
      return this._database._callCloudFunction({ action: n2, command: s2 });
    }
  }
  function Fn(e2, t2, n2) {
    return On(new Dn(e2, t2, n2), { get(e3, t3) {
      let s2 = "db";
      return e3 && e3.content && (s2 = e3.content.$method), Rn(s2, t3) ? Fn({ $method: t3 }, e3, n2) : function() {
        return Fn({ $method: t3, $param: Ln(Array.from(arguments)) }, e3, n2);
      };
    } });
  }
  function qn({ path: e2, method: t2 }) {
    return class {
      constructor() {
        this.param = Array.from(arguments);
      }
      toJSON() {
        return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
      }
    };
  }
  function Kn(e2, t2 = {}) {
    return On(new e2(t2), { get: (e3, t3) => Rn("db", t3) ? Fn({ $method: t3 }, null, e3) : function() {
      return Fn({ $method: t3, $param: Ln(Array.from(arguments)) }, null, e3);
    } });
  }
  class Mn extends class {
    constructor({ uniClient: e2 = {}, isJQL: t2 = false } = {}) {
      this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2.isDefault && (this._dbCallBacks = C("_globalUniCloudDatabaseCallback")), t2 || (this.auth = xn(this._authCallBacks)), this._isJQL = t2, Object.assign(this, xn(this._dbCallBacks)), this.env = On({}, { get: (e3, t3) => ({ $env: t3 }) }), this.Geo = On({}, { get: (e3, t3) => qn({ path: ["Geo"], method: t3 }) }), this.serverDate = qn({ path: [], method: "serverDate" }), this.RegExp = qn({ path: [], method: "RegExp" });
    }
    getCloudEnv(e2) {
      if ("string" != typeof e2 || !e2.trim())
        throw new Error("getCloudEnv\u53C2\u6570\u9519\u8BEF");
      return { $env: e2.replace("$cloudEnv_", "") };
    }
    _callback(e2, t2) {
      const n2 = this._dbCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    _callbackAuth(e2, t2) {
      const n2 = this._authCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    multiSend() {
      const e2 = Array.from(arguments), t2 = e2.map((e3) => {
        const t3 = e3.getAction(), n2 = e3.getCommand();
        if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
          throw new Error("multiSend\u53EA\u652F\u6301\u5B50\u547D\u4EE4\u5185\u4F7F\u7528getTemp");
        return { action: t3, command: n2 };
      });
      return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
    }
  } {
    _parseResult(e2) {
      return this._isJQL ? e2.result : e2;
    }
    _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
      function r2(e3, t3) {
        if (n2 && s2)
          for (let n3 = 0; n3 < s2.length; n3++) {
            const r3 = s2[n3];
            r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
          }
      }
      const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
      function a2(e3) {
        return i2._callback("error", [e3]), U(R(o2, "fail"), e3).then(() => U(R(o2, "complete"), e3)).then(() => (r2(null, e3), z$1(D, { type: K, content: e3 }), Promise.reject(e3)));
      }
      const c2 = U(R(o2, "invoke")), u2 = this._uniClient;
      return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: h$1, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
        const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e3.result;
        if (u3)
          for (let e4 = 0; e4 < u3.length; e4++) {
            const { level: t4, message: n4, detail: s4 } = u3[e4], r3 = console["app" === S && "warn" === t4 ? "error" : t4] || console.log;
            let i3 = "[System Info]" + n4;
            s4 && (i3 = `${i3}
\u8BE6\u7EC6\u4FE1\u606F\uFF1A${s4}`), r3(i3);
          }
        if (t3) {
          return a2(new Q({ code: t3, message: n3, requestId: e3.requestId }));
        }
        e3.result.errCode = e3.result.errCode || e3.result.code, e3.result.errMsg = e3.result.errMsg || e3.result.message, s3 && c3 && (te({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), z$1(q$1, { token: s3, tokenExpired: c3 }));
        const l2 = [{ prop: "affectedDocs", tips: "affectedDocs\u4E0D\u518D\u63A8\u8350\u4F7F\u7528\uFF0C\u8BF7\u4F7F\u7528inserted/deleted/updated/data.length\u66FF\u4EE3" }, { prop: "code", tips: "code\u4E0D\u518D\u63A8\u8350\u4F7F\u7528\uFF0C\u8BF7\u4F7F\u7528errCode\u66FF\u4EE3" }, { prop: "message", tips: "message\u4E0D\u518D\u63A8\u8350\u4F7F\u7528\uFF0C\u8BF7\u4F7F\u7528errMsg\u66FF\u4EE3" }];
        for (let t4 = 0; t4 < l2.length; t4++) {
          const { prop: n4, tips: s4 } = l2[t4];
          if (n4 in e3.result) {
            const t5 = e3.result[n4];
            Object.defineProperty(e3.result, n4, { get: () => (console.warn(s4), t5) });
          }
        }
        return function(e4) {
          return U(R(o2, "success"), e4).then(() => U(R(o2, "complete"), e4)).then(() => {
            r2(e4, null);
            const t4 = i2._parseResult(e4);
            return z$1(D, { type: K, content: t4 }), Promise.resolve(t4);
          });
        }(e3);
      }, (e3) => {
        /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB\u672A\u521D\u59CB\u5316\uFF0C\u8BF7\u5728web\u63A7\u5236\u53F0\u4FDD\u5B58\u4E00\u6B21schema\u4EE5\u5F00\u542FclientDB");
        return a2(new Q({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId }));
      });
    }
  }
  const jn = "token\u65E0\u6548\uFF0C\u8DF3\u8F6C\u767B\u5F55\u9875\u9762", Bn = "token\u8FC7\u671F\uFF0C\u8DF3\u8F6C\u767B\u5F55\u9875\u9762", $n = { TOKEN_INVALID_TOKEN_EXPIRED: Bn, TOKEN_INVALID_INVALID_CLIENTID: jn, TOKEN_INVALID: jn, TOKEN_INVALID_WRONG_TOKEN: jn, TOKEN_INVALID_ANONYMOUS_USER: jn }, Wn = { "uni-id-token-expired": Bn, "uni-id-check-token-failed": jn, "uni-id-token-not-exist": jn, "uni-id-check-device-feature-failed": jn };
  function zn(e2, t2) {
    let n2 = "";
    return n2 = e2 ? `${e2}/${t2}` : t2, n2.replace(/^\//, "");
  }
  function Jn(e2 = [], t2 = "") {
    const n2 = [], s2 = [];
    return e2.forEach((e3) => {
      true === e3.needLogin ? n2.push(zn(t2, e3.path)) : false === e3.needLogin && s2.push(zn(t2, e3.path));
    }), { needLoginPage: n2, notNeedLoginPage: s2 };
  }
  function Hn(e2) {
    return e2.split("?")[0].replace(/^\//, "");
  }
  function Gn() {
    return function(e2) {
      let t2 = e2 && e2.$page && e2.$page.fullPath || "";
      return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
    }(function() {
      const e2 = getCurrentPages();
      return e2[e2.length - 1];
    }());
  }
  function Vn() {
    return Hn(Gn());
  }
  function Yn(e2 = "", t2 = {}) {
    if (!e2)
      return false;
    if (!(t2 && t2.list && t2.list.length))
      return false;
    const n2 = t2.list, s2 = Hn(e2);
    return n2.some((e3) => e3.pagePath === s2);
  }
  const Qn = !!t$3.uniIdRouter;
  const { loginPage: Xn, routerNeedLogin: Zn, resToLogin: es, needLoginPage: ts, notNeedLoginPage: ns, loginPageInTabBar: ss } = function({ pages: e2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = t$3) {
    const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = Jn(e2), { needLoginPage: l2, notNeedLoginPage: h2 } = function(e3 = []) {
      const t2 = [], n3 = [];
      return e3.forEach((e4) => {
        const { root: s3, pages: r3 = [] } = e4, { needLoginPage: i3, notNeedLoginPage: o3 } = Jn(r3, s3);
        t2.push(...i3), n3.push(...o3);
      }), { needLoginPage: t2, notNeedLoginPage: n3 };
    }(n2);
    return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...l2], notNeedLoginPage: [...u2, ...h2], loginPageInTabBar: Yn(i2, r2) };
  }();
  if (ts.indexOf(Xn) > -1)
    throw new Error(`Login page [${Xn}] should not be "needLogin", please check your pages.json`);
  function rs(e2) {
    const t2 = Vn();
    if ("/" === e2.charAt(0))
      return e2;
    const [n2, s2] = e2.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
    i2.pop();
    for (let e3 = 0; e3 < r2.length; e3++) {
      const t3 = r2[e3];
      ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
    }
    return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
  }
  function is(e2) {
    const t2 = Hn(rs(e2));
    return !(ns.indexOf(t2) > -1) && (ts.indexOf(t2) > -1 || Zn.some((t3) => function(e3, t4) {
      return new RegExp(t4).test(e3);
    }(e2, t3)));
  }
  function os({ redirect: e2 }) {
    const t2 = Hn(e2), n2 = Hn(Xn);
    return Vn() !== n2 && t2 !== n2;
  }
  function as({ api: e2, redirect: t2 } = {}) {
    if (!t2 || !os({ redirect: t2 }))
      return;
    const n2 = function(e3, t3) {
      return "/" !== e3.charAt(0) && (e3 = "/" + e3), t3 ? e3.indexOf("?") > -1 ? e3 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3;
    }(Xn, t2);
    ss ? "navigateTo" !== e2 && "redirectTo" !== e2 || (e2 = "switchTab") : "switchTab" === e2 && (e2 = "navigateTo");
    const s2 = { navigateTo: uni.navigateTo, redirectTo: uni.redirectTo, switchTab: uni.switchTab, reLaunch: uni.reLaunch };
    setTimeout(() => {
      s2[e2]({ url: n2 });
    });
  }
  function cs({ url: e2 } = {}) {
    const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
      const { token: e3, tokenExpired: t3 } = ee();
      let n3;
      if (e3) {
        if (t3 < Date.now()) {
          const e4 = "uni-id-token-expired";
          n3 = { errCode: e4, errMsg: Wn[e4] };
        }
      } else {
        const e4 = "uni-id-check-token-failed";
        n3 = { errCode: e4, errMsg: Wn[e4] };
      }
      return n3;
    }();
    if (is(e2) && n2) {
      n2.uniIdRedirectUrl = e2;
      if (B(F).length > 0)
        return setTimeout(() => {
          z$1(F, n2);
        }, 0), t2.abortLoginPageJump = true, t2;
      t2.autoToLoginPage = true;
    }
    return t2;
  }
  function us() {
    !function() {
      const e3 = Gn(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = cs({ url: e3 });
      t2 || n2 && as({ api: "redirectTo", redirect: e3 });
    }();
    const e2 = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
    for (let t2 = 0; t2 < e2.length; t2++) {
      const n2 = e2[t2];
      uni.addInterceptor(n2, { invoke(e3) {
        const { abortLoginPageJump: t3, autoToLoginPage: s2 } = cs({ url: e3.url });
        return t3 ? e3 : s2 ? (as({ api: n2, redirect: rs(e3.url) }), false) : e3;
      } });
    }
  }
  function ls() {
    this.onResponse((e2) => {
      const { type: t2, content: n2 } = e2;
      let s2 = false;
      switch (t2) {
        case "cloudobject":
          s2 = function(e3) {
            const { errCode: t3 } = e3;
            return t3 in Wn;
          }(n2);
          break;
        case "clientdb":
          s2 = function(e3) {
            const { errCode: t3 } = e3;
            return t3 in $n;
          }(n2);
      }
      s2 && function(e3 = {}) {
        const t3 = B(F);
        G().then(() => {
          const n3 = Gn();
          if (n3 && os({ redirect: n3 }))
            return t3.length > 0 ? z$1(F, Object.assign({ uniIdRedirectUrl: n3 }, e3)) : void (Xn && as({ api: "navigateTo", redirect: n3 }));
        });
      }(n2);
    });
  }
  function hs(e2) {
    !function(e3) {
      e3.onResponse = function(e4) {
        $(D, e4);
      }, e3.offResponse = function(e4) {
        W(D, e4);
      };
    }(e2), function(e3) {
      e3.onNeedLogin = function(e4) {
        $(F, e4);
      }, e3.offNeedLogin = function(e4) {
        W(F, e4);
      }, Qn && (C("_globalUniCloudStatus").needLoginInit || (C("_globalUniCloudStatus").needLoginInit = true, G().then(() => {
        us.call(e3);
      }), es && ls.call(e3)));
    }(e2), function(e3) {
      e3.onRefreshToken = function(e4) {
        $(q$1, e4);
      }, e3.offRefreshToken = function(e4) {
        W(q$1, e4);
      };
    }(e2);
  }
  let ds;
  const fs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", ps = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
  function gs() {
    const e2 = ee().token || "", t2 = e2.split(".");
    if (!e2 || 3 !== t2.length)
      return { uid: null, role: [], permission: [], tokenExpired: 0 };
    let n2;
    try {
      n2 = JSON.parse((s2 = t2[1], decodeURIComponent(ds(s2).split("").map(function(e3) {
        return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
      }).join(""))));
    } catch (e3) {
      throw new Error("\u83B7\u53D6\u5F53\u524D\u7528\u6237\u4FE1\u606F\u51FA\u9519\uFF0C\u8BE6\u7EC6\u9519\u8BEF\u4FE1\u606F\u4E3A\uFF1A" + e3.message);
    }
    var s2;
    return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
  }
  ds = "function" != typeof atob ? function(e2) {
    if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !ps.test(e2))
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    var t2;
    e2 += "==".slice(2 - (3 & e2.length));
    for (var n2, s2, r2 = "", i2 = 0; i2 < e2.length; )
      t2 = fs.indexOf(e2.charAt(i2++)) << 18 | fs.indexOf(e2.charAt(i2++)) << 12 | (n2 = fs.indexOf(e2.charAt(i2++))) << 6 | (s2 = fs.indexOf(e2.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
    return r2;
  } : atob;
  var ms = s$1(function(e2, t2) {
    Object.defineProperty(t2, "__esModule", { value: true });
    const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
    function r2(e3, t3) {
      return e3.tempFiles.forEach((e4, n3) => {
        e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
      }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
    }
    function i2(e3, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
      return t3.then((e4) => {
        if (s3) {
          const t4 = s3(e4);
          if (void 0 !== t4)
            return Promise.resolve(t4).then((t5) => void 0 === t5 ? e4 : t5);
        }
        return e4;
      }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
        (t5 = Object.assign({}, t5)).errMsg = n2;
        const i3 = t5.tempFiles, o2 = i3.length;
        let a2 = 0;
        return new Promise((n3) => {
          for (; a2 < s4; )
            c2();
          function c2() {
            const s5 = a2++;
            if (s5 >= o2)
              return void (!i3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
            const u2 = i3[s5];
            e4.uploadFile({ filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, onUploadProgress(e5) {
              e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, r4 && r4(e5);
            } }).then((e5) => {
              u2.url = e5.fileID, s5 < o2 && c2();
            }).catch((e5) => {
              u2.errMsg = e5.errMsg || e5.message, s5 < o2 && c2();
            });
          }
        });
      }(e3, t4, 5, r3));
    }
    t2.initChooseAndUploadFile = function(e3) {
      return function(t3 = { type: "all" }) {
        return "image" === t3.type ? i2(e3, function(e4) {
          const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e4;
          return new Promise((e5, a2) => {
            uni.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
              e5(r2(t5, "image"));
            }, fail(e6) {
              a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
            } });
          });
        }(t3), t3) : "video" === t3.type ? i2(e3, function(e4) {
          const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e4;
          return new Promise((e5, c2) => {
            uni.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
              const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
              e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
            }, fail(e6) {
              c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
            } });
          });
        }(t3), t3) : i2(e3, function(e4) {
          const { count: t4, extension: n3 } = e4;
          return new Promise((e5, i3) => {
            let o2 = uni.chooseFile;
            if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (o2 = wx.chooseMessageFile), "function" != typeof o2)
              return i3({ errMsg: s2 + " \u8BF7\u6307\u5B9A type \u7C7B\u578B\uFF0C\u8BE5\u5E73\u53F0\u4EC5\u652F\u6301\u9009\u62E9 image \u6216 video\u3002" });
            o2({ type: "all", count: t4, extension: n3, success(t5) {
              e5(r2(t5));
            }, fail(e6) {
              i3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
            } });
          });
        }(t3), t3);
      };
    };
  }), ys = n$1(ms);
  const _s = "manual";
  function ws(e2) {
    return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} }), created() {
      this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
        var e3 = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
          e3.push(this[t2]);
        }), e3;
      }, (e3, t2) => {
        if (this.loadtime === _s)
          return;
        let n2 = false;
        const s2 = [];
        for (let r2 = 2; r2 < e3.length; r2++)
          e3[r2] !== t2[r2] && (s2.push(e3[r2]), n2 = true);
        e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
      });
    }, methods: { onMixinDatacomPropsChange(e3, t2) {
    }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
      this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then((n3) => {
        this.mixinDatacomLoading = false;
        const { data: s2, count: r2 } = n3.result;
        this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
        const i2 = e3 ? s2.length ? s2[0] : void 0 : s2;
        this.mixinDatacomResData = i2, t2 && t2(i2);
      }).catch((e4) => {
        this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, n2 && n2(e4);
      }));
    }, mixinDatacomGet(t2 = {}) {
      let n2 = e2.database(this.spaceInfo);
      const s2 = t2.action || this.action;
      s2 && (n2 = n2.action(s2));
      const r2 = t2.collection || this.collection;
      n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
      const i2 = t2.where || this.where;
      i2 && Object.keys(i2).length && (n2 = n2.where(i2));
      const o2 = t2.field || this.field;
      o2 && (n2 = n2.field(o2));
      const a2 = t2.foreignKey || this.foreignKey;
      a2 && (n2 = n2.foreignKey(a2));
      const c2 = t2.groupby || this.groupby;
      c2 && (n2 = n2.groupBy(c2));
      const u2 = t2.groupField || this.groupField;
      u2 && (n2 = n2.groupField(u2));
      true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
      const l2 = t2.orderby || this.orderby;
      l2 && (n2 = n2.orderBy(l2));
      const h2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, f2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, p2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: f2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
      return p2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (h2 - 1)).limit(d2).get(m2), n2;
    } } };
  }
  function vs(e2) {
    return function(t2, n2 = {}) {
      n2 = function(e3, t3 = {}) {
        return e3.customUI = t3.customUI || e3.customUI, e3.parseSystemError = t3.parseSystemError || e3.parseSystemError, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e3.secretMethods = t3.secretMethods), e3;
      }({ customUI: false, loadingOptions: { title: "\u52A0\u8F7D\u4E2D...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
      const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
      return new Proxy({}, { get: (s3, c2) => function({ fn: e3, interceptorName: t3, getCallbackArgs: n3 } = {}) {
        return async function(...s4) {
          const r3 = n3 ? n3({ params: s4 }) : {};
          let i3, o3;
          try {
            return await U(R(t3, "invoke"), { ...r3 }), i3 = await e3(...s4), await U(R(t3, "success"), { ...r3, result: i3 }), i3;
          } catch (e4) {
            throw o3 = e4, await U(R(t3, "fail"), { ...r3, error: o3 }), o3;
          } finally {
            await U(R(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
          }
        };
      }({ fn: async function s4(...u2) {
        let h2;
        a2 && uni.showLoading({ title: r2.title, mask: r2.mask });
        const d2 = { name: t2, type: l, data: { method: c2, params: u2 } };
        "object" == typeof n2.secretMethods && function(e3, t3) {
          const n3 = t3.data.method, s5 = e3.secretMethods || {}, r3 = s5[n3] || s5["*"];
          r3 && (t3.secretType = r3);
        }(n2, d2);
        let f2 = false;
        try {
          h2 = await e2.callFunction(d2);
        } catch (e3) {
          f2 = true, h2 = { result: new Q(e3) };
        }
        const { errSubject: p2, errCode: g2, errMsg: m2, newToken: y2 } = h2.result || {};
        if (a2 && uni.hideLoading(), y2 && y2.token && y2.tokenExpired && (te(y2), z$1(q$1, { ...y2 })), g2) {
          let e3 = m2;
          if (f2 && o2) {
            e3 = (await o2({ objectName: t2, methodName: c2, params: u2, errSubject: p2, errCode: g2, errMsg: m2 })).errMsg || m2;
          }
          if (a2)
            if ("toast" === i2.type)
              uni.showToast({ title: e3, icon: "none" });
            else {
              if ("modal" !== i2.type)
                throw new Error(`Invalid errorOptions.type: ${i2.type}`);
              {
                const { confirm: t3 } = await async function({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                  return new Promise((i3, o3) => {
                    uni.showModal({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e5) {
                      i3(e5);
                    }, fail() {
                      i3({ confirm: false, cancel: true });
                    } });
                  });
                }({ title: "\u63D0\u793A", content: e3, showCancel: i2.retry, cancelText: "\u53D6\u6D88", confirmText: i2.retry ? "\u91CD\u8BD5" : "\u786E\u5B9A" });
                if (i2.retry && t3)
                  return s4(...u2);
              }
            }
          const n3 = new Q({ subject: p2, code: g2, message: m2, requestId: h2.requestId });
          throw n3.detail = h2.result, z$1(D, { type: j$1, content: n3 }), n3;
        }
        return z$1(D, { type: j$1, content: h2.result }), h2.result;
      }, interceptorName: "callObject", getCallbackArgs: function({ params: e3 } = {}) {
        return { objectName: t2, methodName: c2, params: e3 };
      } }) });
    };
  }
  function Ss(e2) {
    return C("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e2.config.spaceId));
  }
  async function ks({ callLoginByWeixin: e2 = false } = {}) {
    const t2 = Ss(this);
    if ("mp-weixin" !== S)
      throw new Error(`[SecureNetwork] API \`initSecureNetworkByWeixin\` is not supported on platform \`${S}\``);
    const n2 = await new Promise((e3, t3) => {
      uni.login({ success(t4) {
        e3(t4.code);
      }, fail(e4) {
        t3(new Error(e4.errMsg));
      } });
    }), s2 = this.importObject("uni-id-co", { customUI: true });
    return await s2.secureNetworkHandshakeByWeixin({ code: n2, callLoginByWeixin: e2 }), t2.mpWeixinCode = n2, { code: n2 };
  }
  async function Is(e2) {
    const t2 = Ss(this);
    return t2.initPromise || (t2.initPromise = ks.call(this, e2)), t2.initPromise;
  }
  function bs(e2) {
    return function({ callLoginByWeixin: t2 = false } = {}) {
      return Is.call(e2, { callLoginByWeixin: t2 });
    };
  }
  async function Ts(e2, t2) {
    const n2 = `http://${e2}:${t2}/system/ping`;
    try {
      const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
        X.request({ ...s2, success(t4) {
          e4(t4);
        }, fail(e5) {
          t3(e5);
        } });
      }));
      return !(!e3.data || 0 !== e3.data.code);
    } catch (e3) {
      return false;
    }
    var s2;
  }
  function As(e2) {
    if (e2.initUniCloudStatus && "rejected" !== e2.initUniCloudStatus)
      return;
    let t2 = Promise.resolve();
    var n2;
    n2 = 1, t2 = new Promise((e3) => {
      setTimeout(() => {
        e3();
      }, n2);
    }), e2.isReady = false, e2.isDefault = false;
    const s2 = e2.auth();
    e2.initUniCloudStatus = "pending", e2.initUniCloud = t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously()).then(() => {
      if ("app" === S) {
        const { osName: e3, osVersion: t3 } = ie();
        "ios" === e3 && function(e4) {
          if (!e4 || "string" != typeof e4)
            return 0;
          const t4 = e4.match(/^(\d+)./);
          return t4 && t4[1] ? parseInt(t4[1]) : 0;
        }(t3) >= 14 && console.warn("iOS 14\u53CA\u4EE5\u4E0A\u7248\u672C\u8FDE\u63A5uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u9700\u8981\u5141\u8BB8\u5BA2\u6237\u7AEF\u67E5\u627E\u5E76\u8FDE\u63A5\u5230\u672C\u5730\u7F51\u7EDC\u4E0A\u7684\u8BBE\u5907\uFF08\u4EC5\u5F00\u53D1\u6A21\u5F0F\u751F\u6548\uFF0C\u53D1\u884C\u6A21\u5F0F\u4F1A\u8FDE\u63A5uniCloud\u4E91\u7AEF\u670D\u52A1\uFF09");
      }
      if (e2.__dev__.debugInfo) {
        const { address: t3, servePort: n3 } = e2.__dev__.debugInfo;
        return async function(e3, t4) {
          let n4;
          for (let s3 = 0; s3 < e3.length; s3++) {
            const r2 = e3[s3];
            if (await Ts(r2, t4)) {
              n4 = r2;
              break;
            }
          }
          return { address: n4, port: t4 };
        }(t3, n3);
      }
    }).then(({ address: t3, port: n3 } = {}) => {
      const s3 = console["app" === S ? "error" : "warn"];
      if (t3)
        e2.__dev__.localAddress = t3, e2.__dev__.localPort = n3;
      else if (e2.__dev__.debugInfo) {
        let t4 = "";
        "remote" === e2.__dev__.debugInfo.initialLaunchType ? (e2.__dev__.debugInfo.forceRemote = true, t4 = "\u5F53\u524D\u5BA2\u6237\u7AEF\u548CHBuilderX\u4E0D\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\uFF08\u6216\u5176\u4ED6\u7F51\u7EDC\u539F\u56E0\u65E0\u6CD5\u8FDE\u63A5HBuilderX\uFF09\uFF0CuniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u4E0D\u5BF9\u5F53\u524D\u5BA2\u6237\u7AEF\u751F\u6548\u3002\n- \u5982\u679C\u4E0D\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u76F4\u63A5\u5FFD\u7565\u6B64\u4FE1\u606F\u3002\n- \u5982\u9700\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u5C06\u5BA2\u6237\u7AEF\u4E0E\u4E3B\u673A\u8FDE\u63A5\u5230\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u5E76\u91CD\u65B0\u8FD0\u884C\u5230\u5BA2\u6237\u7AEF\u3002") : t4 = "\u65E0\u6CD5\u8FDE\u63A5uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u5F53\u524D\u5BA2\u6237\u7AEF\u662F\u5426\u4E0E\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u3002\n- \u5982\u9700\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u5C06\u5BA2\u6237\u7AEF\u4E0E\u4E3B\u673A\u8FDE\u63A5\u5230\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u5E76\u91CD\u65B0\u8FD0\u884C\u5230\u5BA2\u6237\u7AEF\u3002", t4 += "\n- \u5982\u679C\u5728HBuilderX\u5F00\u542F\u7684\u72B6\u6001\u4E0B\u5207\u6362\u8FC7\u7F51\u7EDC\u73AF\u5883\uFF0C\u8BF7\u91CD\u542FHBuilderX\u540E\u518D\u8BD5\n- \u68C0\u67E5\u7CFB\u7EDF\u9632\u706B\u5899\u662F\u5426\u62E6\u622A\u4E86HBuilderX\u81EA\u5E26\u7684nodejs\n- \u68C0\u67E5\u662F\u5426\u9519\u8BEF\u7684\u4F7F\u7528\u62E6\u622A\u5668\u4FEE\u6539uni.request\u65B9\u6CD5\u7684\u53C2\u6570", "web" === S && (t4 += "\n- \u90E8\u5206\u6D4F\u89C8\u5668\u5F00\u542F\u8282\u6D41\u6A21\u5F0F\u4E4B\u540E\u8BBF\u95EE\u672C\u5730\u5730\u5740\u53D7\u9650\uFF0C\u8BF7\u68C0\u67E5\u662F\u5426\u542F\u7528\u4E86\u8282\u6D41\u6A21\u5F0F"), 0 === S.indexOf("mp-") && (t4 += "\n- \u5C0F\u7A0B\u5E8F\u4E2D\u5982\u4F55\u4F7F\u7528uniCloud\uFF0C\u8BF7\u53C2\u8003\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), s3(t4);
      }
    }).then(() => {
      ne(), e2.isReady = true, e2.initUniCloudStatus = "fulfilled";
    }).catch((t3) => {
      console.error(t3), e2.initUniCloudStatus = "rejected";
    });
  }
  const Cs = { tcb: _t, tencent: _t, aliyun: de, private: vt };
  let Ps = new class {
    init(e2) {
      let t2 = {};
      const n2 = Cs[e2.provider];
      if (!n2)
        throw new Error("\u672A\u63D0\u4F9B\u6B63\u786E\u7684provider\u53C2\u6570");
      t2 = n2.init(e2), t2.__dev__ = {}, t2.__dev__.debugLog = "web" === S && navigator.userAgent.indexOf("HBuilderX") > 0 || "app" === S;
      const s2 = k$1;
      s2 && !s2.code && (t2.__dev__.debugInfo = s2), As(t2), t2.reInit = function() {
        As(this);
      }, Pn(t2), function(e3) {
        const t3 = e3.uploadFile;
        e3.uploadFile = function(e4) {
          return t3.call(this, e4);
        };
      }(t2), function(e3) {
        e3.database = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).database();
          if (this._database)
            return this._database;
          const n3 = Kn(Mn, { uniClient: e3 });
          return this._database = n3, n3;
        }, e3.databaseForJQL = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).databaseForJQL();
          if (this._databaseForJQL)
            return this._databaseForJQL;
          const n3 = Kn(Mn, { uniClient: e3, isJQL: true });
          return this._databaseForJQL = n3, n3;
        };
      }(t2), function(e3) {
        e3.getCurrentUserInfo = gs, e3.chooseAndUploadFile = ys.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
          return ws(e3);
        } }), e3.importObject = vs(e3), e3.initSecureNetworkByWeixin = bs(e3);
      }(t2);
      return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
        if (!t2[e3])
          return;
        const n3 = t2[e3];
        t2[e3] = function() {
          return t2.reInit(), n3.apply(t2, Array.from(arguments));
        }, t2[e3] = Y(t2[e3], e3).bind(t2);
      }), t2.init = this.init, t2;
    }
  }();
  (() => {
    const e2 = I;
    let t2 = {};
    if (e2 && 1 === e2.length)
      t2 = e2[0], Ps = Ps.init(t2), Ps.isDefault = true;
    else {
      const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
      let n2;
      n2 = e2 && e2.length > 0 ? "\u5E94\u7528\u6709\u591A\u4E2A\u670D\u52A1\u7A7A\u95F4\uFF0C\u8BF7\u901A\u8FC7uniCloud.init\u65B9\u6CD5\u6307\u5B9A\u8981\u4F7F\u7528\u7684\u670D\u52A1\u7A7A\u95F4" : "\u5E94\u7528\u672A\u5173\u8054\u670D\u52A1\u7A7A\u95F4\uFF0C\u8BF7\u5728uniCloud\u76EE\u5F55\u53F3\u952E\u5173\u8054\u670D\u52A1\u7A7A\u95F4", t3.forEach((e3) => {
        Ps[e3] = function() {
          return console.error(n2), Promise.reject(new Q({ code: "SYS_ERR", message: n2 }));
        };
      });
    }
    Object.assign(Ps, { get mixinDatacom() {
      return ws(Ps);
    } }), hs(Ps), Ps.addInterceptor = O, Ps.removeInterceptor = x$1, Ps.interceptObject = L, "web" === S && (window.uniCloud = Ps);
  })();
  var Es = Ps;
  const en$1 = {
    "uni-load-more.contentdown": "Pull up to show more",
    "uni-load-more.contentrefresh": "loading...",
    "uni-load-more.contentnomore": "No more data"
  };
  const zhHans$1 = {
    "uni-load-more.contentdown": "\u4E0A\u62C9\u663E\u793A\u66F4\u591A",
    "uni-load-more.contentrefresh": "\u6B63\u5728\u52A0\u8F7D...",
    "uni-load-more.contentnomore": "\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86"
  };
  const zhHant$1 = {
    "uni-load-more.contentdown": "\u4E0A\u62C9\u986F\u793A\u66F4\u591A",
    "uni-load-more.contentrefresh": "\u6B63\u5728\u52A0\u8F09...",
    "uni-load-more.contentnomore": "\u6C92\u6709\u66F4\u591A\u6578\u64DA\u4E86"
  };
  const messages$1 = {
    en: en$1,
    "zh-Hans": zhHans$1,
    "zh-Hant": zhHant$1
  };
  let platform;
  setTimeout(() => {
    platform = uni.getSystemInfoSync().platform;
  }, 16);
  const {
    t: t$2
  } = initVueI18n(messages$1);
  const _sfc_main$f = {
    name: "UniLoadMore",
    emits: ["clickLoadMore"],
    props: {
      status: {
        type: String,
        default: "more"
      },
      showIcon: {
        type: Boolean,
        default: true
      },
      iconType: {
        type: String,
        default: "auto"
      },
      iconSize: {
        type: Number,
        default: 24
      },
      color: {
        type: String,
        default: "#777777"
      },
      contentText: {
        type: Object,
        default() {
          return {
            contentdown: "",
            contentrefresh: "",
            contentnomore: ""
          };
        }
      },
      showText: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        webviewHide: false,
        platform,
        imgBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzlBMzU3OTlEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzlBMzU3OUFEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOUEzNTc5N0Q5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDOUEzNTc5OEQ5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt+ALSwAAA6CSURBVHja1FsLkFZVHb98LM+F5bHL8khA1iSeiyQBCRM+YGqKUnnJTDLGI0BGZlKDIU2MMglUiDApEZvSsZnQtBRJtKwQNKQMFYeRDR10WOLd8ljYXdh+v8v5fR3Od+797t1dnOnO/Ofce77z+J//+b/P+ZqtXbs2sJ9MJhNUV1cHJ06cCJo3bx7EPc2aNcvpy7pWrVoF+/fvDyoqKoI2bdoE9fX1F7TjN8a+EXBn/fkfvw942Tf+wYMHg9mzZwfjxo0LDhw4EPa1x2MbFw/fOGfPng1qa2tzcCkILsLDydq2bRsunpOTMM7TD/W/tZDZhPdeKD+yGxHhdu3aBV27dg3OnDlzMVANMheLAO3btw8KCwuDmpoaX5OxbgUIMEq7K8IcPnw4KCsrC/r37x8cP378/4cAXAB3vqSkJMuiDhTkw+XcuXNhOWbMmKBly5YhUT8xArhyFvP0BfwRsAuwxJZJsm/nzp2DTp06he/OU+cZ64K6o0ePBkOHDg2GDx8e6gEbJ5Q/NHNuAJQ1hgBeHUDlR7nVTkY8rQAvAi4z34vR/mPs1FoRsaCgIJThI0eOBC1atEiFGGV+5MiRoS45efJkqFjJFXV1dQuA012m2WcwTw98fy6CqBdsaiIO4CScrGPHjvk4odhavPquRtFWXEC25VgkREKOCh/qDSq+vn37htzD/mZTOmOc5U7zKzBPEedygWshcDyWvs30igAbU+6oyMgJBCFhwQE0fccxN60Ay9iebbjoDh06hMowjQxT4fXq1SskArmHZpkArvixp/kWzHdMeArExSJEaiXIjjRjRJ4DaAGWpibLzXN3Fm1vA5teBgh3j1Rv3bp1YgKwPdmf2p9zcyNYYgPKMfY0T5f5nNYdw158nJ8QawW4CLKwiOBSEgO/hok2eBydR+3dYH+PLxA5J8Vv0KBBwenTp0P2JWAx6+yFEBfs8lMY+y0SWMBNI9E4ThKi58VKTg3FQZS1RQF1cz27eC0QHMu+3E0SkUowjhVt5VdaWhp07949ZHv2Qd1EjDXM2cla1M0nl3GxAs3J9yREzyTdFVKVFOaE9qRA8GM0WebRuo9JGZKA7Mv2SeS/Z8+eoQ9BArMfFrLGo6jvxbhHbJZnKX2Rzz1O7QhJJ9Cs2ZMaWIyq/zhdeqPNfIoHd58clIQD+JSXl4dKlyIAuBdVXZwFVWKspSSoxE++h8x4k3uCnEhE4I5KwRiFWGOU0QWKiCYLbdoRMRKAu2kQ9vkfLU6dOhX06NEjlH+yMRZSinnuyWnYosVcji8CEA/6Cg2JF+IIUBqnGKUTCNwtwBN4f89RiK1R96DEgO2o0NDmtEdvVFdVVYV+P3UAPUEs6GFwV3PHmXkD4vh74iDFJysVI/MlaQhwKeBNTLYX5VuA8T4/gZxA4MRGFxDB6R7OmYPfyykGRJbyie+XnGYnQIC/coH9+vULiYrxrkL9ZA9+0ykaHIfEpM7ge8TiJ2CsHYwyMfafAF1yCGBHYIbCVDjDjKt7BeB51D+LgQa6OkG7IDYEEtvQ7lnXLKLtLdLuJBpE4gPUXcW2+PkZwOex+4cGDhwYDBkyRL7/HFcEwUGPo/8uWRUpYnfxGHco8HkewLHLyYmAawAPuIFZxhOpDfJQ8gbUv41yORAptMWBNr6oqMhWird5+u+iHmBb2nhjDV7HWBNQTgK8y11l5NetWzc5ULscAtSj7nbNI0skhWeUZCc0W4nyH/jO4Vz0u1IeYhbk4AiwM6tjxIWByHsoZ9qcIBPJd/y+DwPfBESOmCa/QF3WiZHucLlEDpNxcNhmheEOPgdQNx6/VZFQzFZ5TN08AHXQt2Ii3EdyFuUsPtTcGPhW5iMiCNELvz+Gdn9huG4HUJaW/w3g0wxV0XaG7arG2WeKiUWYM4Y7GO5ezshTARbbWGw/DvXkpp/ivVvE0JVoMxN4rpGzJMhE5Pl+xlATsDIqikP9F9D2z3h9nOksEUFhK+qO4rcPkoalMQ/HqJLIyb3F3JdjrCcw1yZ8joyJLR5gCo54etlag7qIoeNh1N1BRYj3DTFJ0elotxPlVzkGuYAmL0VSJVGAJA41c4Z6A3BzTLfn0HYwYKEI6CUAMzZEWvLsIcQOo1AmmyyM72nHJCfYsogflGV6jEk9vyQZXSuq6w4c16NsGcGZbwOPr+H1RkOk2LEzjNepxQkihHSCQ4ynAYNRx2zMKV92CQMWqj8J0BRE8EShxRFN6YrfCRhC0x3r/Zm4IbQCcmJoV0kMamllccR6FjHqUC5F2R/wS2dcymOlfAKOS4KmzQb5cpNC2MC7JhVn5wjXoJ44rYhLh8n0eXOCorJxa7POjbSlCGVczr34/RsAmrcvo9s+wGp3tzVhntxiXiJ4nvEYb4FJkf0O8HocAePmLvCxnL0AORraVekJk6TYjDabRVXfRE2lCN1h6ZQRN1+InUbsCpKwoBZHh0dODN9JBCUffItXxEavTQkUtnfTVAplCWL3JISz29h4NjotnuSsQKJCk8dF+kJR6RARjrqFVmfPnj3ZbK8cIJ0msd6jgHPGtfVTQ8VLmlvh4mct9sobRmPic0DyDQQnx/NlfYUgyz59+oScsH379pAwXABD32nTpoUHIToESeI5mnbE/UqDdyLcafEBf2MCqgC7NwxIbMREJQ0g4D4sfJwnD+AmRrII05cfMWJE+L1169bQr+fip06dGp4oJ83lmYd5wj/EmMa4TaHivo4EeCguYZBnkB5g2aWA69OIEnUHOaGysjIYMGBAMGnSpODYsWPZwCpFmm4lNq+4gSLQA7jcX8DwtjEyRC8wjabnXEx9kfWnTJkSJkAo90xpJVV+FmcVNeYAF5zWngS4C4O91MBxmAv8blLEpbjI5sz9MTdAhcgkCT1RO8mZkAjfiYpTEvStAS53Uw1vAiUGgZ3GpuQEYvoiBqlIan7kSDHnTwJQFNiPu0+5VxCVYhcZIjNrdXUDdp+Eq5AZ3Gkg8QAyVZRZIk4Tl4QAbF9cXJxNYZMAtAokgs4BrNxEpCtteXg7DDTMDKYNSuQdKsnJBek7HxewvxaosWxLYXtw+cJp18217wql4aKCfBNoEu0O5VU+PhctJ0YeXD4C6JQpyrlpSLTojpGGGN5YwNziChdIZLk4lvLcFJ9jMX3QdiImY9bmGQU+TRUL5CHITTRlgF8D9ouD1MfmLoEPl5xokIumZ2cfgMpHt47IW9N64Hsh7wQYYjyIugWuF5fCqYncXRd5vPMWyizzvhi/32+nvG0dZc9vR6fZOu0md5e+uC408FvKSIOZwXlGvxPv95izA2Vtvg1xKFWARI+vMX66HUhpQQb643uW1bSjuTWyw2SBvDrBvjFic1eGGlz5esq3ko9uSIlBRqPuFcCv8F4WIcN12nVaBd0SaYwI6PDDImR11JkqgHcPmQssjxIn6bUshygDFJUTxPMpHk+jfjPgupgdnYV2R/g7xSjtpah8RJBewhwf0gGK6XI92u4wXFEU40afJ4DN4h5LcAd+40HI3JgJecuT0c062W0i2hQJUTcxan3/CMW1PF2K6bbA+Daz4xRs1D3Br1Cm0OihKCqizW78/nXAF/G5TXrEcVzaNMH6CyMswqsAHqDyDLEyou8lwOXnKF8DjI6KjV3KzMBiXkDH8ij/H214J5A596ekrZ3F0zXlWeL7+P5eUrNo3/QwC15uxthuzidy7DzKRwEDaAViiDgKbTbz7CJnzo0bN7pIfIiid8SuPwn25o3QCmpnyjlZkyxPP8EomCJzrGb7GJMx7tNsq4MT2xMUYaiErZOluTzKsnz3gwCeCZyVRZJfYplNEokEjwrPtxlxjeYAk+F1F74VAzPxQRNYYdtpOUvWs8J1sGhBJMNsb7igN8plJs1eSmLIhLKE4rvaCX27gOhLpLOsIzJ7qn/i+wZzcvSOZ23/du8TZjwV8zHIXoP4R3ifBxiFz1dcVpa3aPntPE+c6TmIWE9EtcMmAcPdWAhYhAXxcLOQi9L1WhD1Sc8p1d2oL7XGiRKp8F4A2i8K/nfI+y/gsTDJ/YC/8+AD5Uh04KHiGl+cIFPnBDDrPMjwRGkLXyxO4VGbfQWnDH2v0bVWE3C9QOXlepbgjEfIJQI6XDG3z5ahD9cw2pS78ipB85wyScNTvsVzlzzhL8/jRrnmVjfFJK/m3m4nj9vbgQTguT8XZTjsm672R5uJKEaQmBI/c58gyus8ZDagLpEVSJBIyHp4jn++xqPV71OgQgJYEWOtZ/haxRtKmWOBu8xdBLftWltsY84zE6WIEy/eIOWL+BaayMx+KHtL7EAkqdNDLiEXmEMUHniedtJqg9HmZtfvt26vNi0BdG3Ft3g8ZOf7PAu59TxtzivLNIekyi+wD1i8CuUiD9FXAa8C+/xS3JPmZnomyc7H+fb4/Se0bk41Fel621r4cgVxbq91V4jVqwB7HTe2M7jgB+QWHavZkDRPmZcASoZEmBx6i75bGjPcMdL4/VKGFAGWZkGzPG0XAbdL9A81G5LOmUnC9hHKJeO7dcUMjblSl12867ElFTtaGl20xvvLGPdVz/8TVuU7y0x1PG7vtNg24oz9Uo/Z412++VFWI7Fcog9tu9Lm6gvRmIPv9x1xmQAu6RDkXtbOtlGEmpgD5Nvnyc0dcv0EE6cfdi1HmhMf9wDF3k3gtRvEedhxjpgfqPb9PU9iEJHnyOUA7bQUXh6kq/D7l2iTjWv7XOD530BDr8jIrus+srXjt4MzumJMHuTsBa63YKE1+RR5lBjEikCCnWKWiHdzOgKO+nRIBAF88za/IFmJ3eMZov4CYxGBabcpGL8EYx+SeMXJeRwHNsV/h+vdxeuhEpN3ZyNY78Gm2fknJxVGhyjixPiQvVkNzT1elD9Py/aTAL64Hb9vcYmC9zfdXdT/C1LeGbg4rnBaAihDFJH12W5ulfNCNe/xTsP3bp8ikzJs5BF+5PNfAQYAPaseTdsEcaYAAAAASUVORK5CYII="
      };
    },
    computed: {
      iconSnowWidth() {
        return (Math.floor(this.iconSize / 24) || 1) * 2;
      },
      contentdownText() {
        return this.contentText.contentdown || t$2("uni-load-more.contentdown");
      },
      contentrefreshText() {
        return this.contentText.contentrefresh || t$2("uni-load-more.contentrefresh");
      },
      contentnomoreText() {
        return this.contentText.contentnomore || t$2("uni-load-more.contentnomore");
      }
    },
    mounted() {
      var pages2 = getCurrentPages();
      var page = pages2[pages2.length - 1];
      var currentWebview = page.$getAppWebview();
      currentWebview.addEventListener("hide", () => {
        this.webviewHide = true;
      });
      currentWebview.addEventListener("show", () => {
        this.webviewHide = false;
      });
    },
    methods: {
      onClick() {
        this.$emit("clickLoadMore", {
          detail: {
            status: this.status
          }
        });
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uni-load-more",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.webviewHide && ($props.iconType === "circle" || $props.iconType === "auto" && $data.platform === "android") && $props.status === "loading" && $props.showIcon ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        style: vue.normalizeStyle({ width: $props.iconSize + "px", height: $props.iconSize + "px" }),
        class: "uni-load-more__img uni-load-more__img--android-MP"
      }, [
        vue.createElementVNode("view", {
          class: "uni-load-more__img-icon",
          style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
        }, null, 4),
        vue.createElementVNode("view", {
          class: "uni-load-more__img-icon",
          style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
        }, null, 4),
        vue.createElementVNode("view", {
          class: "uni-load-more__img-icon",
          style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
        }, null, 4)
      ], 4)) : !$data.webviewHide && $props.status === "loading" && $props.showIcon ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        style: vue.normalizeStyle({ width: $props.iconSize + "px", height: $props.iconSize + "px" }),
        class: "uni-load-more__img uni-load-more__img--ios-H5"
      }, [
        vue.createElementVNode("image", {
          src: $data.imgBase64,
          mode: "widthFix"
        }, null, 8, ["src"])
      ], 4)) : vue.createCommentVNode("v-if", true),
      $props.showText ? (vue.openBlock(), vue.createElementBlock("text", {
        key: 2,
        class: "uni-load-more__text",
        style: vue.normalizeStyle({ color: $props.color })
      }, vue.toDisplayString($props.status === "more" ? $options.contentdownText : $props.status === "loading" ? $options.contentrefreshText : $options.contentnomoreText), 5)) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$6], ["__scopeId", "data-v-9245e42c"], ["__file", "/Users/fox/project/uniapp/ftu/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue"]]);
  const _sfc_main$e = {
    name: "uniDataChecklist",
    mixins: [Es.mixinDatacom || {}],
    emits: ["input", "update:modelValue", "change"],
    props: {
      mode: {
        type: String,
        default: "default"
      },
      multiple: {
        type: Boolean,
        default: false
      },
      value: {
        type: [Array, String, Number],
        default() {
          return "";
        }
      },
      modelValue: {
        type: [Array, String, Number],
        default() {
          return "";
        }
      },
      localdata: {
        type: Array,
        default() {
          return [];
        }
      },
      min: {
        type: [Number, String],
        default: ""
      },
      max: {
        type: [Number, String],
        default: ""
      },
      wrap: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: "left"
      },
      selectedColor: {
        type: String,
        default: ""
      },
      selectedTextColor: {
        type: String,
        default: ""
      },
      emptyText: {
        type: String,
        default: "\u6682\u65E0\u6570\u636E"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      map: {
        type: Object,
        default() {
          return {
            text: "text",
            value: "value"
          };
        }
      }
    },
    watch: {
      localdata: {
        handler(newVal) {
          this.range = newVal;
          this.dataList = this.getDataList(this.getSelectedValue(newVal));
        },
        deep: true
      },
      mixinDatacomResData(newVal) {
        this.range = newVal;
        this.dataList = this.getDataList(this.getSelectedValue(newVal));
      },
      value(newVal) {
        this.dataList = this.getDataList(newVal);
      },
      modelValue(newVal) {
        this.dataList = this.getDataList(newVal);
      }
    },
    data() {
      return {
        dataList: [],
        range: [],
        contentText: {
          contentdown: "\u67E5\u770B\u66F4\u591A",
          contentrefresh: "\u52A0\u8F7D\u4E2D",
          contentnomore: "\u6CA1\u6709\u66F4\u591A"
        },
        isLocal: true,
        styles: {
          selectedColor: "#2979ff",
          selectedTextColor: "#666"
        },
        isTop: 0
      };
    },
    computed: {
      dataValue() {
        if (this.value === "")
          return this.modelValue;
        if (this.modelValue === "")
          return this.value;
        return this.value;
      }
    },
    created() {
      if (this.localdata && this.localdata.length !== 0) {
        this.isLocal = true;
        this.range = this.localdata;
        this.dataList = this.getDataList(this.getSelectedValue(this.range));
      } else {
        if (this.collection) {
          this.isLocal = false;
          this.loadData();
        }
      }
    },
    methods: {
      loadData() {
        this.mixinDatacomGet().then((res) => {
          this.mixinDatacomResData = res.result.data;
          if (this.mixinDatacomResData.length === 0) {
            this.isLocal = false;
            this.mixinDatacomErrorMessage = this.emptyText;
          } else {
            this.isLocal = true;
          }
        }).catch((err) => {
          this.mixinDatacomErrorMessage = err.message;
        });
      },
      getForm(name = "uniForms") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      },
      chagne(e2) {
        const values = e2.detail.value;
        let detail = {
          value: [],
          data: []
        };
        if (this.multiple) {
          this.range.forEach((item) => {
            if (values.includes(item[this.map.value] + "")) {
              detail.value.push(item[this.map.value]);
              detail.data.push(item);
            }
          });
        } else {
          const range = this.range.find((item) => item[this.map.value] + "" === values);
          if (range) {
            detail = {
              value: range[this.map.value],
              data: range
            };
          }
        }
        this.$emit("input", detail.value);
        this.$emit("update:modelValue", detail.value);
        this.$emit("change", {
          detail
        });
        if (this.multiple) {
          this.dataList = this.getDataList(detail.value, true);
        } else {
          this.dataList = this.getDataList(detail.value);
        }
      },
      getDataList(value) {
        let dataList = JSON.parse(JSON.stringify(this.range));
        let list = [];
        if (this.multiple) {
          if (!Array.isArray(value)) {
            value = [];
          }
        }
        dataList.forEach((item, index) => {
          item.disabled = item.disable || item.disabled || false;
          if (this.multiple) {
            if (value.length > 0) {
              let have = value.find((val) => val === item[this.map.value]);
              item.selected = have !== void 0;
            } else {
              item.selected = false;
            }
          } else {
            item.selected = value === item[this.map.value];
          }
          list.push(item);
        });
        return this.setRange(list);
      },
      setRange(list) {
        let selectList = list.filter((item) => item.selected);
        let min = Number(this.min) || 0;
        let max = Number(this.max) || "";
        list.forEach((item, index) => {
          if (this.multiple) {
            if (selectList.length <= min) {
              let have = selectList.find((val) => val[this.map.value] === item[this.map.value]);
              if (have !== void 0) {
                item.disabled = true;
              }
            }
            if (selectList.length >= max && max !== "") {
              let have = selectList.find((val) => val[this.map.value] === item[this.map.value]);
              if (have === void 0) {
                item.disabled = true;
              }
            }
          }
          this.setStyles(item, index);
          list[index] = item;
        });
        return list;
      },
      setStyles(item, index) {
        item.styleBackgroud = this.setStyleBackgroud(item);
        item.styleIcon = this.setStyleIcon(item);
        item.styleIconText = this.setStyleIconText(item);
        item.styleRightIcon = this.setStyleRightIcon(item);
      },
      getSelectedValue(range) {
        if (!this.multiple)
          return this.dataValue;
        let selectedArr = [];
        range.forEach((item) => {
          if (item.selected) {
            selectedArr.push(item[this.map.value]);
          }
        });
        return this.dataValue.length > 0 ? this.dataValue : selectedArr;
      },
      setStyleBackgroud(item) {
        let styles = {};
        let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
        if (this.selectedColor) {
          if (this.mode !== "list") {
            styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
          }
          if (this.mode === "tag") {
            styles["background-color"] = item.selected ? selectedColor : "#f5f5f5";
          }
        }
        let classles = "";
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      },
      setStyleIcon(item) {
        let styles = {};
        let classles = "";
        if (this.selectedColor) {
          let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
          styles["background-color"] = item.selected ? selectedColor : "#fff";
          styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
          if (!item.selected && item.disabled) {
            styles["background-color"] = "#F2F6FC";
            styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
          }
        }
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      },
      setStyleIconText(item) {
        let styles = {};
        let classles = "";
        if (this.selectedColor) {
          let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
          if (this.mode === "tag") {
            styles.color = item.selected ? this.selectedTextColor ? this.selectedTextColor : "#fff" : "#666";
          } else {
            styles.color = item.selected ? this.selectedTextColor ? this.selectedTextColor : selectedColor : "#666";
          }
          if (!item.selected && item.disabled) {
            styles.color = "#999";
          }
        }
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      },
      setStyleRightIcon(item) {
        let styles = {};
        let classles = "";
        if (this.mode === "list") {
          styles["border-color"] = item.selected ? this.styles.selectedColor : "#DCDFE6";
        }
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uni-data-checklist",
      style: vue.normalizeStyle({ "margin-top": $data.isTop + "px" })
    }, [
      !$data.isLocal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-data-loading"
      }, [
        !_ctx.mixinDatacomErrorMessage ? (vue.openBlock(), vue.createBlock(_component_uni_load_more, {
          key: 0,
          status: "loading",
          iconType: "snow",
          iconSize: 18,
          "content-text": $data.contentText
        }, null, 8, ["content-text"])) : (vue.openBlock(), vue.createElementBlock("text", { key: 1 }, vue.toDisplayString(_ctx.mixinDatacomErrorMessage), 1))
      ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
        $props.multiple ? (vue.openBlock(), vue.createElementBlock("checkbox-group", {
          key: 0,
          class: vue.normalizeClass(["checklist-group", { "is-list": $props.mode === "list" || $props.wrap }]),
          onChange: _cache[0] || (_cache[0] = (...args) => $options.chagne && $options.chagne(...args))
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.dataList, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("label", {
              class: vue.normalizeClass(["checklist-box", ["is--" + $props.mode, item.selected ? "is-checked" : "", $props.disabled || !!item.disabled ? "is-disable" : "", index !== 0 && $props.mode === "list" ? "is-list-border" : ""]]),
              style: vue.normalizeStyle(item.styleBackgroud),
              key: index
            }, [
              vue.createElementVNode("checkbox", {
                class: "hidden",
                hidden: "",
                disabled: $props.disabled || !!item.disabled,
                value: item[$props.map.value] + "",
                checked: item.selected
              }, null, 8, ["disabled", "value", "checked"]),
              $props.mode !== "tag" && $props.mode !== "list" || $props.mode === "list" && $props.icon === "left" ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "checkbox__inner",
                style: vue.normalizeStyle(item.styleIcon)
              }, [
                vue.createElementVNode("view", { class: "checkbox__inner-icon" })
              ], 4)) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", {
                class: vue.normalizeClass(["checklist-content", { "list-content": $props.mode === "list" && $props.icon === "left" }])
              }, [
                vue.createElementVNode("text", {
                  class: "checklist-text",
                  style: vue.normalizeStyle(item.styleIconText)
                }, vue.toDisplayString(item[$props.map.text]), 5),
                $props.mode === "list" && $props.icon === "right" ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "checkobx__list",
                  style: vue.normalizeStyle(item.styleBackgroud)
                }, null, 4)) : vue.createCommentVNode("v-if", true)
              ], 2)
            ], 6);
          }), 128))
        ], 34)) : (vue.openBlock(), vue.createElementBlock("radio-group", {
          key: 1,
          class: vue.normalizeClass(["checklist-group", { "is-list": $props.mode === "list", "is-wrap": $props.wrap }]),
          onChange: _cache[1] || (_cache[1] = (...args) => $options.chagne && $options.chagne(...args))
        }, [
          vue.createCommentVNode(" "),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.dataList, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("label", {
              class: vue.normalizeClass(["checklist-box", ["is--" + $props.mode, item.selected ? "is-checked" : "", $props.disabled || !!item.disabled ? "is-disable" : "", index !== 0 && $props.mode === "list" ? "is-list-border" : ""]]),
              style: vue.normalizeStyle(item.styleBackgroud),
              key: index
            }, [
              vue.createElementVNode("radio", {
                class: "hidden",
                hidden: "",
                disabled: $props.disabled || item.disabled,
                value: item[$props.map.value] + "",
                checked: item.selected
              }, null, 8, ["disabled", "value", "checked"]),
              $props.mode !== "tag" && $props.mode !== "list" || $props.mode === "list" && $props.icon === "left" ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "radio__inner",
                style: vue.normalizeStyle(item.styleBackgroud)
              }, [
                vue.createElementVNode("view", {
                  class: "radio__inner-icon",
                  style: vue.normalizeStyle(item.styleIcon)
                }, null, 4)
              ], 4)) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", {
                class: vue.normalizeClass(["checklist-content", { "list-content": $props.mode === "list" && $props.icon === "left" }])
              }, [
                vue.createElementVNode("text", {
                  class: "checklist-text",
                  style: vue.normalizeStyle(item.styleIconText)
                }, vue.toDisplayString(item[$props.map.text]), 5),
                $props.mode === "list" && $props.icon === "right" ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  style: vue.normalizeStyle(item.styleRightIcon),
                  class: "checkobx__list"
                }, null, 4)) : vue.createCommentVNode("v-if", true)
              ], 2)
            ], 6);
          }), 128))
        ], 34))
      ], 64))
    ], 4);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$5], ["__scopeId", "data-v-2f788efd"], ["__file", "/Users/fox/project/uniapp/ftu/uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.vue"]]);
  const _sfc_main$d = {
    __name: "regise",
    setup(__props) {
      let form = vue.ref({
        AccName: "",
        Name: "",
        Phone: "",
        Password: "",
        Sex: "",
        Email: "",
        ClientIp: "1"
      });
      let okpassword = vue.ref("");
      let password = vue.ref("");
      let sex = vue.ref([{
        text: "\u7537",
        value: 0
      }, {
        text: "\u5973",
        value: 1
      }]);
      const login2 = () => {
        if (form.value.AccName && form.value.Name && form.value.Phone && (form.value.Sex == "0" || form.value.Sex == "1") && form.value.Email) {
          if (password.value == okpassword.value) {
            form.value.Password = password.value;
            ajax.register(form.value).then((res) => {
              if (res.data.code == 1e3) {
                uni.showToast({
                  title: "\u521B\u5EFA\u6210\u529F",
                  icon: "none"
                });
                setTimeout(() => {
                  uni.reLaunch({
                    url: "/pages/login/login"
                  });
                }, 1e3);
              }
            });
          } else {
            uni.showToast({
              icon: "none",
              title: "\u60A8\u8F93\u5165\u7684\u4E24\u6B21\u5BC6\u7801\u4E0D\u4E00\u81F4"
            });
          }
        } else {
          uni.showToast({
            icon: "none",
            title: "\u8BF7\u586B\u5199\u5B8C\u6574"
          });
        }
      };
      return (_ctx, _cache) => {
        const _component_uni_data_checkbox = resolveEasycom(vue.resolveDynamicComponent("uni-data-checkbox"), __easycom_0$2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "phonelogin" }, [
          vue.createElementVNode("view", { class: "phonelogin_title" }, " \u624B\u673A\u53F7\u6CE8\u518C "),
          vue.createElementVNode("view", { class: "phonelogin_input phonelogin_input-style" }, [
            vue.createCommentVNode(' <image style="width: 40rpx;height: 40rpx;margin-right: 20rpx;" src="../../../../static/images/phone.png"\r\n				mode=""></image> '),
            vue.withDirectives(vue.createElementVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(form).AccName = $event),
              type: "text",
              placeholder: "\u8BF7\u8F93\u5165\u6635\u79F0"
            }, null, 512), [
              [vue.vModelText, vue.unref(form).AccName]
            ])
          ]),
          vue.createElementVNode("view", { class: "phonelogin_input phonelogin_input-style2" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(form).Name = $event),
              placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D"
            }, null, 512), [
              [vue.vModelText, vue.unref(form).Name]
            ])
          ]),
          vue.createElementVNode("view", { class: "phonelogin_input phonelogin_input-style2" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.unref(form).Phone = $event),
              placeholder: "\u8BF7\u8F93\u5165\u624B\u673A"
            }, null, 512), [
              [vue.vModelText, vue.unref(form).Phone]
            ])
          ]),
          vue.createElementVNode("view", { class: "phonelogin_input phonelogin_input-style2" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.isRef(password) ? password.value = $event : password = $event),
              password: "",
              placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801"
            }, null, 512), [
              [vue.vModelText, vue.unref(password)]
            ])
          ]),
          vue.createElementVNode("view", { class: "phonelogin_input phonelogin_input-style2" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.isRef(okpassword) ? okpassword.value = $event : okpassword = $event),
              password: "",
              placeholder: "\u786E\u8BA4\u5BC6\u7801"
            }, null, 512), [
              [vue.vModelText, vue.unref(okpassword)]
            ])
          ]),
          vue.createElementVNode("view", { class: "phonelogin_input phonelogin_input-style2" }, [
            vue.createVNode(_component_uni_data_checkbox, {
              modelValue: vue.unref(form).Sex,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => vue.unref(form).Sex = $event),
              localdata: vue.unref(sex)
            }, null, 8, ["modelValue", "localdata"])
          ]),
          vue.createElementVNode("view", { class: "phonelogin_input phonelogin_input-style2" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => vue.unref(form).Email = $event),
              placeholder: "\u8BF7\u8F93\u5165email"
            }, null, 512), [
              [vue.vModelText, vue.unref(form).Email]
            ])
          ]),
          vue.createElementVNode("view", {
            class: "phonelogin_loginBtn",
            onClick: login2
          }, " \u6CE8\u518C ")
        ]);
      };
    }
  };
  const PagesLoginRegiseRegise = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-c6e6a642"], ["__file", "/Users/fox/project/uniapp/ftu/pages/login/regise/regise.vue"]]);
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = { ...defaultSettings };
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e2) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e2) {
          }
          currentSettings = value;
        }
      };
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && pluginDescriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(pluginDescriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
   * vuex v4.1.0
   * (c) 2022 Evan You
   * @license MIT
   */
  var storeKey = "store";
  function forEachValue(obj, fn2) {
    Object.keys(obj).forEach(function(key) {
      return fn2(obj[key], key);
    });
  }
  function isObject(obj) {
    return obj !== null && typeof obj === "object";
  }
  function isPromise(val) {
    return val && typeof val.then === "function";
  }
  function assert(condition, msg) {
    if (!condition) {
      throw new Error("[vuex] " + msg);
    }
  }
  function partial(fn2, arg) {
    return function() {
      return fn2(arg);
    };
  }
  function genericSubscribe(fn2, subs, options) {
    if (subs.indexOf(fn2) < 0) {
      options && options.prepend ? subs.unshift(fn2) : subs.push(fn2);
    }
    return function() {
      var i2 = subs.indexOf(fn2);
      if (i2 > -1) {
        subs.splice(i2, 1);
      }
    };
  }
  function resetStore(store2, hot) {
    store2._actions = /* @__PURE__ */ Object.create(null);
    store2._mutations = /* @__PURE__ */ Object.create(null);
    store2._wrappedGetters = /* @__PURE__ */ Object.create(null);
    store2._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    var state = store2.state;
    installModule(store2, state, [], store2._modules.root, true);
    resetStoreState(store2, state, hot);
  }
  function resetStoreState(store2, state, hot) {
    var oldState = store2._state;
    var oldScope = store2._scope;
    store2.getters = {};
    store2._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    var wrappedGetters = store2._wrappedGetters;
    var computedObj = {};
    var computedCache = {};
    var scope = vue.effectScope(true);
    scope.run(function() {
      forEachValue(wrappedGetters, function(fn2, key) {
        computedObj[key] = partial(fn2, store2);
        computedCache[key] = vue.computed(function() {
          return computedObj[key]();
        });
        Object.defineProperty(store2.getters, key, {
          get: function() {
            return computedCache[key].value;
          },
          enumerable: true
        });
      });
    });
    store2._state = vue.reactive({
      data: state
    });
    store2._scope = scope;
    if (store2.strict) {
      enableStrictMode(store2);
    }
    if (oldState) {
      if (hot) {
        store2._withCommit(function() {
          oldState.data = null;
        });
      }
    }
    if (oldScope) {
      oldScope.stop();
    }
  }
  function installModule(store2, rootState, path, module, hot) {
    var isRoot = !path.length;
    var namespace = store2._modules.getNamespace(path);
    if (module.namespaced) {
      if (store2._modulesNamespaceMap[namespace] && true) {
        console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
      }
      store2._modulesNamespaceMap[namespace] = module;
    }
    if (!isRoot && !hot) {
      var parentState = getNestedState(rootState, path.slice(0, -1));
      var moduleName = path[path.length - 1];
      store2._withCommit(function() {
        {
          if (moduleName in parentState) {
            console.warn(
              '[vuex] state field "' + moduleName + '" was overridden by a module with the same name at "' + path.join(".") + '"'
            );
          }
        }
        parentState[moduleName] = module.state;
      });
    }
    var local = module.context = makeLocalContext(store2, namespace, path);
    module.forEachMutation(function(mutation, key) {
      var namespacedType = namespace + key;
      registerMutation(store2, namespacedType, mutation, local);
    });
    module.forEachAction(function(action, key) {
      var type = action.root ? key : namespace + key;
      var handler = action.handler || action;
      registerAction(store2, type, handler, local);
    });
    module.forEachGetter(function(getter, key) {
      var namespacedType = namespace + key;
      registerGetter(store2, namespacedType, getter, local);
    });
    module.forEachChild(function(child, key) {
      installModule(store2, rootState, path.concat(key), child, hot);
    });
  }
  function makeLocalContext(store2, namespace, path) {
    var noNamespace = namespace === "";
    var local = {
      dispatch: noNamespace ? store2.dispatch : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
          if (!store2._actions[type]) {
            console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
            return;
          }
        }
        return store2.dispatch(type, payload);
      },
      commit: noNamespace ? store2.commit : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
          if (!store2._mutations[type]) {
            console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
            return;
          }
        }
        store2.commit(type, payload, options);
      }
    };
    Object.defineProperties(local, {
      getters: {
        get: noNamespace ? function() {
          return store2.getters;
        } : function() {
          return makeLocalGetters(store2, namespace);
        }
      },
      state: {
        get: function() {
          return getNestedState(store2.state, path);
        }
      }
    });
    return local;
  }
  function makeLocalGetters(store2, namespace) {
    if (!store2._makeLocalGettersCache[namespace]) {
      var gettersProxy = {};
      var splitPos = namespace.length;
      Object.keys(store2.getters).forEach(function(type) {
        if (type.slice(0, splitPos) !== namespace) {
          return;
        }
        var localType = type.slice(splitPos);
        Object.defineProperty(gettersProxy, localType, {
          get: function() {
            return store2.getters[type];
          },
          enumerable: true
        });
      });
      store2._makeLocalGettersCache[namespace] = gettersProxy;
    }
    return store2._makeLocalGettersCache[namespace];
  }
  function registerMutation(store2, type, handler, local) {
    var entry = store2._mutations[type] || (store2._mutations[type] = []);
    entry.push(function wrappedMutationHandler(payload) {
      handler.call(store2, local.state, payload);
    });
  }
  function registerAction(store2, type, handler, local) {
    var entry = store2._actions[type] || (store2._actions[type] = []);
    entry.push(function wrappedActionHandler(payload) {
      var res = handler.call(store2, {
        dispatch: local.dispatch,
        commit: local.commit,
        getters: local.getters,
        state: local.state,
        rootGetters: store2.getters,
        rootState: store2.state
      }, payload);
      if (!isPromise(res)) {
        res = Promise.resolve(res);
      }
      if (store2._devtoolHook) {
        return res.catch(function(err) {
          store2._devtoolHook.emit("vuex:error", err);
          throw err;
        });
      } else {
        return res;
      }
    });
  }
  function registerGetter(store2, type, rawGetter, local) {
    if (store2._wrappedGetters[type]) {
      {
        console.error("[vuex] duplicate getter key: " + type);
      }
      return;
    }
    store2._wrappedGetters[type] = function wrappedGetter(store3) {
      return rawGetter(
        local.state,
        local.getters,
        store3.state,
        store3.getters
      );
    };
  }
  function enableStrictMode(store2) {
    vue.watch(function() {
      return store2._state.data;
    }, function() {
      {
        assert(store2._committing, "do not mutate vuex store state outside mutation handlers.");
      }
    }, { deep: true, flush: "sync" });
  }
  function getNestedState(state, path) {
    return path.reduce(function(state2, key) {
      return state2[key];
    }, state);
  }
  function unifyObjectStyle(type, payload, options) {
    if (isObject(type) && type.type) {
      options = payload;
      payload = type;
      type = type.type;
    }
    {
      assert(typeof type === "string", "expects string as the type, but found " + typeof type + ".");
    }
    return { type, payload, options };
  }
  var LABEL_VUEX_BINDINGS = "vuex bindings";
  var MUTATIONS_LAYER_ID = "vuex:mutations";
  var ACTIONS_LAYER_ID = "vuex:actions";
  var INSPECTOR_ID = "vuex";
  var actionId = 0;
  function addDevtools(app, store2) {
    setupDevtoolsPlugin(
      {
        id: "org.vuejs.vuex",
        app,
        label: "Vuex",
        homepage: "https://next.vuex.vuejs.org/",
        logo: "https://vuejs.org/images/icons/favicon-96x96.png",
        packageName: "vuex",
        componentStateTypes: [LABEL_VUEX_BINDINGS]
      },
      function(api) {
        api.addTimelineLayer({
          id: MUTATIONS_LAYER_ID,
          label: "Vuex Mutations",
          color: COLOR_LIME_500
        });
        api.addTimelineLayer({
          id: ACTIONS_LAYER_ID,
          label: "Vuex Actions",
          color: COLOR_LIME_500
        });
        api.addInspector({
          id: INSPECTOR_ID,
          label: "Vuex",
          icon: "storage",
          treeFilterPlaceholder: "Filter stores..."
        });
        api.on.getInspectorTree(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            if (payload.filter) {
              var nodes = [];
              flattenStoreForInspectorTree(nodes, store2._modules.root, payload.filter, "");
              payload.rootNodes = nodes;
            } else {
              payload.rootNodes = [
                formatStoreForInspectorTree(store2._modules.root, "")
              ];
            }
          }
        });
        api.on.getInspectorState(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            makeLocalGetters(store2, modulePath);
            payload.state = formatStoreForInspectorState(
              getStoreModule(store2._modules, modulePath),
              modulePath === "root" ? store2.getters : store2._makeLocalGettersCache,
              modulePath
            );
          }
        });
        api.on.editInspectorState(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            var path = payload.path;
            if (modulePath !== "root") {
              path = modulePath.split("/").filter(Boolean).concat(path);
            }
            store2._withCommit(function() {
              payload.set(store2._state.data, path, payload.state.value);
            });
          }
        });
        store2.subscribe(function(mutation, state) {
          var data = {};
          if (mutation.payload) {
            data.payload = mutation.payload;
          }
          data.state = state;
          api.notifyComponentUpdate();
          api.sendInspectorTree(INSPECTOR_ID);
          api.sendInspectorState(INSPECTOR_ID);
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: Date.now(),
              title: mutation.type,
              data
            }
          });
        });
        store2.subscribeAction({
          before: function(action, state) {
            var data = {};
            if (action.payload) {
              data.payload = action.payload;
            }
            action._id = actionId++;
            action._time = Date.now();
            data.state = state;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: action._time,
                title: action.type,
                groupId: action._id,
                subtitle: "start",
                data
              }
            });
          },
          after: function(action, state) {
            var data = {};
            var duration = Date.now() - action._time;
            data.duration = {
              _custom: {
                type: "duration",
                display: duration + "ms",
                tooltip: "Action duration",
                value: duration
              }
            };
            if (action.payload) {
              data.payload = action.payload;
            }
            data.state = state;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: Date.now(),
                title: action.type,
                groupId: action._id,
                subtitle: "end",
                data
              }
            });
          }
        });
      }
    );
  }
  var COLOR_LIME_500 = 8702998;
  var COLOR_DARK = 6710886;
  var COLOR_WHITE = 16777215;
  var TAG_NAMESPACED = {
    label: "namespaced",
    textColor: COLOR_WHITE,
    backgroundColor: COLOR_DARK
  };
  function extractNameFromPath(path) {
    return path && path !== "root" ? path.split("/").slice(-2, -1)[0] : "Root";
  }
  function formatStoreForInspectorTree(module, path) {
    return {
      id: path || "root",
      label: extractNameFromPath(path),
      tags: module.namespaced ? [TAG_NAMESPACED] : [],
      children: Object.keys(module._children).map(
        function(moduleName) {
          return formatStoreForInspectorTree(
            module._children[moduleName],
            path + moduleName + "/"
          );
        }
      )
    };
  }
  function flattenStoreForInspectorTree(result, module, filter, path) {
    if (path.includes(filter)) {
      result.push({
        id: path || "root",
        label: path.endsWith("/") ? path.slice(0, path.length - 1) : path || "Root",
        tags: module.namespaced ? [TAG_NAMESPACED] : []
      });
    }
    Object.keys(module._children).forEach(function(moduleName) {
      flattenStoreForInspectorTree(result, module._children[moduleName], filter, path + moduleName + "/");
    });
  }
  function formatStoreForInspectorState(module, getters, path) {
    getters = path === "root" ? getters : getters[path];
    var gettersKeys = Object.keys(getters);
    var storeState = {
      state: Object.keys(module.state).map(function(key) {
        return {
          key,
          editable: true,
          value: module.state[key]
        };
      })
    };
    if (gettersKeys.length) {
      var tree = transformPathsToObjectTree(getters);
      storeState.getters = Object.keys(tree).map(function(key) {
        return {
          key: key.endsWith("/") ? extractNameFromPath(key) : key,
          editable: false,
          value: canThrow(function() {
            return tree[key];
          })
        };
      });
    }
    return storeState;
  }
  function transformPathsToObjectTree(getters) {
    var result = {};
    Object.keys(getters).forEach(function(key) {
      var path = key.split("/");
      if (path.length > 1) {
        var target = result;
        var leafKey = path.pop();
        path.forEach(function(p2) {
          if (!target[p2]) {
            target[p2] = {
              _custom: {
                value: {},
                display: p2,
                tooltip: "Module",
                abstract: true
              }
            };
          }
          target = target[p2]._custom.value;
        });
        target[leafKey] = canThrow(function() {
          return getters[key];
        });
      } else {
        result[key] = canThrow(function() {
          return getters[key];
        });
      }
    });
    return result;
  }
  function getStoreModule(moduleMap, path) {
    var names = path.split("/").filter(function(n2) {
      return n2;
    });
    return names.reduce(
      function(module, moduleName, i2) {
        var child = module[moduleName];
        if (!child) {
          throw new Error('Missing module "' + moduleName + '" for path "' + path + '".');
        }
        return i2 === names.length - 1 ? child : child._children;
      },
      path === "root" ? moduleMap : moduleMap.root._children
    );
  }
  function canThrow(cb) {
    try {
      return cb();
    } catch (e2) {
      return e2;
    }
  }
  var Module = function Module2(rawModule, runtime) {
    this.runtime = runtime;
    this._children = /* @__PURE__ */ Object.create(null);
    this._rawModule = rawModule;
    var rawState = rawModule.state;
    this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
  };
  var prototypeAccessors$1 = { namespaced: { configurable: true } };
  prototypeAccessors$1.namespaced.get = function() {
    return !!this._rawModule.namespaced;
  };
  Module.prototype.addChild = function addChild(key, module) {
    this._children[key] = module;
  };
  Module.prototype.removeChild = function removeChild(key) {
    delete this._children[key];
  };
  Module.prototype.getChild = function getChild(key) {
    return this._children[key];
  };
  Module.prototype.hasChild = function hasChild(key) {
    return key in this._children;
  };
  Module.prototype.update = function update2(rawModule) {
    this._rawModule.namespaced = rawModule.namespaced;
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions;
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations;
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters;
    }
  };
  Module.prototype.forEachChild = function forEachChild(fn2) {
    forEachValue(this._children, fn2);
  };
  Module.prototype.forEachGetter = function forEachGetter(fn2) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn2);
    }
  };
  Module.prototype.forEachAction = function forEachAction(fn2) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn2);
    }
  };
  Module.prototype.forEachMutation = function forEachMutation(fn2) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn2);
    }
  };
  Object.defineProperties(Module.prototype, prototypeAccessors$1);
  var ModuleCollection = function ModuleCollection2(rawRootModule) {
    this.register([], rawRootModule, false);
  };
  ModuleCollection.prototype.get = function get(path) {
    return path.reduce(function(module, key) {
      return module.getChild(key);
    }, this.root);
  };
  ModuleCollection.prototype.getNamespace = function getNamespace(path) {
    var module = this.root;
    return path.reduce(function(namespace, key) {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + "/" : "");
    }, "");
  };
  ModuleCollection.prototype.update = function update$1(rawRootModule) {
    update([], this.root, rawRootModule);
  };
  ModuleCollection.prototype.register = function register2(path, rawModule, runtime) {
    var this$1$1 = this;
    if (runtime === void 0)
      runtime = true;
    {
      assertRawModule(path, rawModule);
    }
    var newModule = new Module(rawModule, runtime);
    if (path.length === 0) {
      this.root = newModule;
    } else {
      var parent = this.get(path.slice(0, -1));
      parent.addChild(path[path.length - 1], newModule);
    }
    if (rawModule.modules) {
      forEachValue(rawModule.modules, function(rawChildModule, key) {
        this$1$1.register(path.concat(key), rawChildModule, runtime);
      });
    }
  };
  ModuleCollection.prototype.unregister = function unregister(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    var child = parent.getChild(key);
    if (!child) {
      {
        console.warn(
          "[vuex] trying to unregister module '" + key + "', which is not registered"
        );
      }
      return;
    }
    if (!child.runtime) {
      return;
    }
    parent.removeChild(key);
  };
  ModuleCollection.prototype.isRegistered = function isRegistered(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    if (parent) {
      return parent.hasChild(key);
    }
    return false;
  };
  function update(path, targetModule, newModule) {
    {
      assertRawModule(path, newModule);
    }
    targetModule.update(newModule);
    if (newModule.modules) {
      for (var key in newModule.modules) {
        if (!targetModule.getChild(key)) {
          {
            console.warn(
              "[vuex] trying to add a new module '" + key + "' on hot reloading, manual reload is needed"
            );
          }
          return;
        }
        update(
          path.concat(key),
          targetModule.getChild(key),
          newModule.modules[key]
        );
      }
    }
  }
  var functionAssert = {
    assert: function(value) {
      return typeof value === "function";
    },
    expected: "function"
  };
  var objectAssert = {
    assert: function(value) {
      return typeof value === "function" || typeof value === "object" && typeof value.handler === "function";
    },
    expected: 'function or object with "handler" function'
  };
  var assertTypes = {
    getters: functionAssert,
    mutations: functionAssert,
    actions: objectAssert
  };
  function assertRawModule(path, rawModule) {
    Object.keys(assertTypes).forEach(function(key) {
      if (!rawModule[key]) {
        return;
      }
      var assertOptions = assertTypes[key];
      forEachValue(rawModule[key], function(value, type) {
        assert(
          assertOptions.assert(value),
          makeAssertionMessage(path, key, type, value, assertOptions.expected)
        );
      });
    });
  }
  function makeAssertionMessage(path, key, type, value, expected) {
    var buf = key + " should be " + expected + ' but "' + key + "." + type + '"';
    if (path.length > 0) {
      buf += ' in module "' + path.join(".") + '"';
    }
    buf += " is " + JSON.stringify(value) + ".";
    return buf;
  }
  function createStore(options) {
    return new Store(options);
  }
  var Store = function Store2(options) {
    var this$1$1 = this;
    if (options === void 0)
      options = {};
    {
      assert(typeof Promise !== "undefined", "vuex requires a Promise polyfill in this browser.");
      assert(this instanceof Store2, "store must be called with the new operator.");
    }
    var plugins = options.plugins;
    if (plugins === void 0)
      plugins = [];
    var strict = options.strict;
    if (strict === void 0)
      strict = false;
    var devtools = options.devtools;
    this._committing = false;
    this._actions = /* @__PURE__ */ Object.create(null);
    this._actionSubscribers = [];
    this._mutations = /* @__PURE__ */ Object.create(null);
    this._wrappedGetters = /* @__PURE__ */ Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    this._subscribers = [];
    this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    this._scope = null;
    this._devtools = devtools;
    var store2 = this;
    var ref = this;
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store2, type, payload);
    };
    this.commit = function boundCommit(type, payload, options2) {
      return commit.call(store2, type, payload, options2);
    };
    this.strict = strict;
    var state = this._modules.root.state;
    installModule(this, state, [], this._modules.root);
    resetStoreState(this, state);
    plugins.forEach(function(plugin) {
      return plugin(this$1$1);
    });
  };
  var prototypeAccessors = { state: { configurable: true } };
  Store.prototype.install = function install(app, injectKey) {
    app.provide(injectKey || storeKey, this);
    app.config.globalProperties.$store = this;
    var useDevtools = this._devtools !== void 0 ? this._devtools : true;
    if (useDevtools) {
      addDevtools(app, this);
    }
  };
  prototypeAccessors.state.get = function() {
    return this._state.data;
  };
  prototypeAccessors.state.set = function(v2) {
    {
      assert(false, "use store.replaceState() to explicit replace store state.");
    }
  };
  Store.prototype.commit = function commit(_type, _payload, _options) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;
    var mutation = { type, payload };
    var entry = this._mutations[type];
    if (!entry) {
      {
        console.error("[vuex] unknown mutation type: " + type);
      }
      return;
    }
    this._withCommit(function() {
      entry.forEach(function commitIterator(handler) {
        handler(payload);
      });
    });
    this._subscribers.slice().forEach(function(sub) {
      return sub(mutation, this$1$1.state);
    });
    if (options && options.silent) {
      console.warn(
        "[vuex] mutation type: " + type + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
      );
    }
  };
  Store.prototype.dispatch = function dispatch(_type, _payload) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;
    var action = { type, payload };
    var entry = this._actions[type];
    if (!entry) {
      {
        console.error("[vuex] unknown action type: " + type);
      }
      return;
    }
    try {
      this._actionSubscribers.slice().filter(function(sub) {
        return sub.before;
      }).forEach(function(sub) {
        return sub.before(action, this$1$1.state);
      });
    } catch (e2) {
      {
        console.warn("[vuex] error in before action subscribers: ");
        console.error(e2);
      }
    }
    var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
      return handler(payload);
    })) : entry[0](payload);
    return new Promise(function(resolve, reject) {
      result.then(function(res) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.after;
          }).forEach(function(sub) {
            return sub.after(action, this$1$1.state);
          });
        } catch (e2) {
          {
            console.warn("[vuex] error in after action subscribers: ");
            console.error(e2);
          }
        }
        resolve(res);
      }, function(error) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.error;
          }).forEach(function(sub) {
            return sub.error(action, this$1$1.state, error);
          });
        } catch (e2) {
          {
            console.warn("[vuex] error in error action subscribers: ");
            console.error(e2);
          }
        }
        reject(error);
      });
    });
  };
  Store.prototype.subscribe = function subscribe(fn2, options) {
    return genericSubscribe(fn2, this._subscribers, options);
  };
  Store.prototype.subscribeAction = function subscribeAction(fn2, options) {
    var subs = typeof fn2 === "function" ? { before: fn2 } : fn2;
    return genericSubscribe(subs, this._actionSubscribers, options);
  };
  Store.prototype.watch = function watch$1(getter, cb, options) {
    var this$1$1 = this;
    {
      assert(typeof getter === "function", "store.watch only accepts a function.");
    }
    return vue.watch(function() {
      return getter(this$1$1.state, this$1$1.getters);
    }, cb, Object.assign({}, options));
  };
  Store.prototype.replaceState = function replaceState(state) {
    var this$1$1 = this;
    this._withCommit(function() {
      this$1$1._state.data = state;
    });
  };
  Store.prototype.registerModule = function registerModule(path, rawModule, options) {
    if (options === void 0)
      options = {};
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
      assert(path.length > 0, "cannot register the root module by using registerModule.");
    }
    this._modules.register(path, rawModule);
    installModule(this, this.state, path, this._modules.get(path), options.preserveState);
    resetStoreState(this, this.state);
  };
  Store.prototype.unregisterModule = function unregisterModule(path) {
    var this$1$1 = this;
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    this._modules.unregister(path);
    this._withCommit(function() {
      var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
      delete parentState[path[path.length - 1]];
    });
    resetStore(this);
  };
  Store.prototype.hasModule = function hasModule(path) {
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    return this._modules.isRegistered(path);
  };
  Store.prototype.hotUpdate = function hotUpdate(newOptions) {
    this._modules.update(newOptions);
    resetStore(this, true);
  };
  Store.prototype._withCommit = function _withCommit(fn2) {
    var committing = this._committing;
    this._committing = true;
    fn2();
    this._committing = committing;
  };
  Object.defineProperties(Store.prototype, prototypeAccessors);
  const store = createStore({
    state: {
      WS: null,
      ChatsList: [],
      CList: [],
      UserInfo: {}
    },
    mutations: {
      CreateWebSocket(state, id) {
        state.WS = uni.connectSocket({
          url: `ws://81.68.206.160:4000/user/sendUserMsg?userId=${id}`,
          header: {
            AUTHORIZATION: uni.getStorageSync("token")
          },
          complete: () => {
          }
        });
        let chats = uni.getStorageSync("ChatsList");
        if (chats) {
          state.ChatsList = JSON.parse(chats);
        }
      },
      AddChatsList(state, val) {
        state.CList = state.ChatsList.push(val);
        uni.setStorageSync("ChatsList", JSON.stringify(state.ChatsList));
      },
      getUserInfo(state) {
        try {
          state.UserInfo = uni.getStorageSync("UserInfo") || "";
          state.UserInfo = JSON.parse(state.UserInfo);
        } catch (e2) {
        }
      }
    },
    actions: {}
  });
  const _sfc_main$c = {
    __name: "index",
    setup(__props) {
      let ChatsList = vue.ref([]);
      vue.ref([]);
      let UserInfo = vue.ref(null);
      vue.ref([]);
      let currentChatsList = vue.ref([]);
      let currentChatsList2 = vue.ref([]);
      let cChatList = vue.computed(() => {
        return store.state.CList;
      });
      vue.watch(cChatList, (newVal) => {
        getCurrentTimeMessage();
      });
      let getCurrentTimeMessage = () => {
        let set = /* @__PURE__ */ new Set();
        ChatsList.value = store.state.ChatsList;
        ChatsList.value.forEach((item) => {
          try {
            if (item.FormId == UserInfo.value.Id) {
              set.add(item.TargetId);
            }
            if (item.TargetId == UserInfo.value.Id) {
              set.add(item.FormId);
            }
          } catch (err) {
          }
        });
        let list = [...set];
        if (!list.length)
          return;
        ajax.searchAllFriendsById(list.toString()).then((res) => {
          currentChatsList.value = res.data.data;
          currentChatsList.value.forEach((item) => {
            ChatsList.value.forEach((item2) => {
              try {
                if (item2.Type == 1) {
                  if (item.Id == item2.TargetId || item.Id == item2.FormId) {
                    item.content = item2.Content;
                    item.message = item2;
                  }
                }
              } catch (e2) {
              }
            });
          });
          currentChatsList2.value = currentChatsList.value;
        });
      };
      vue.onMounted(() => {
        let userInfo = uni.getStorageSync("UserInfo");
        try {
          UserInfo.value = JSON.parse(userInfo);
        } catch (e2) {
        }
        store.commit("CreateWebSocket", UserInfo.value.Id);
        store.commit("getUserInfo");
        getCurrentTimeMessage();
      });
      const gotoChatsPage = (id, Name) => {
        let s2 = JSON.stringify({
          "Id": id,
          "Name": Name
        });
        uni.navigateTo({
          url: `/pages/friends/chatPage/chatPage?opt=${s2}`
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(currentChatsList2), (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "",
              onClick: ($event) => gotoChatsPage(item.Id, item.AccName)
            }, [
              vue.createElementVNode("view", { class: "leftImage" }, [
                vue.createElementVNode("image", {
                  src: "/static/image/userAvt.png",
                  mode: ""
                })
              ]),
              vue.createElementVNode("view", { class: "rightName" }, [
                vue.createElementVNode("view", { class: "title" }, vue.toDisplayString(item.AccName), 1),
                vue.createElementVNode("view", { class: "unReadContent" }, vue.toDisplayString(item.content), 1)
              ])
            ], 8, ["onClick"]);
          }), 256))
        ]);
      };
    }
  };
  const PagesChatIndex = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "/Users/fox/project/uniapp/ftu/pages/chat/index.vue"]]);
  var n = ["zh", "ch", "sh", "z", "c", "s", "b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "h", "j", "q", "x", "r", "y", "w", ""], h = ["j", "q", "x"], g = ["u\u0101n", "u\xE1n", "u\u01CEn", "u\xE0n", "uan", "u\u0113", "u\xE9", "u\u011B", "u\xE8", "ue", "\u016Bn", "\xFAn", "\u01D4n", "\xF9n", "un", "\u016B", "\xFA", "\u01D4", "\xF9", "u"], i = { "u\u0101n": "\xFC\u0101n", "u\xE1n": "\xFC\xE1n", "u\u01CEn": "\xFC\u01CEn", "u\xE0n": "\xFC\xE0n", uan: "\xFCan", "u\u0113": "\xFC\u0113", "u\xE9": "\xFC\xE9", "u\u011B": "\xFC\u011B", "u\xE8": "\xFC\xE8", ue: "\xFCe", "\u016Bn": "\u01D6n", "\xFAn": "\u01D8n", "\u01D4n": "\u01DAn", "\xF9n": "\u01DCn", un: "\xFCn", "\u016B": "\u01D6", "\xFA": "\u01D8", "\u01D4": "\u01DA", "\xF9": "\u01DC", u: "\xFC" }, u = ["ia", "ian", "iang", "iao", "ie", "iu", "iong", "ua", "uai", "uan", "uang", "ue", "ui", "uo", "\xFCan", "\xFCe", "van", "ve"], z = { "\u5357\u5BAB": "n\xE1n g\u014Dng", "\u7B2C\u4E94": "d\xEC w\u01D4", "\u4E07\u4FDF": "m\xF2 q\xED", "\u53F8\u9A6C": "s\u012B m\u01CE", "\u4E0A\u5B98": "sh\xE0ng gu\u0101n", "\u6B27\u9633": "\u014Du y\xE1ng", "\u590F\u4FAF": "xi\xE0 h\xF3u", "\u8BF8\u845B": "zh\u016B g\u011B", "\u95FB\u4EBA": "w\xE9n r\xE9n", "\u4E1C\u65B9": "d\u014Dng f\u0101ng", "\u8D6B\u8FDE": "h\xE8 li\xE1n", "\u7687\u752B": "hu\xE1ng p\u01D4", "\u5C09\u8FDF": "y\xF9 ch\xED", "\u516C\u7F8A": "g\u014Dng y\xE1ng", "\u6FB9\u53F0": "t\xE1n t\xE1i", "\u516C\u51B6": "g\u014Dng y\u011B", "\u5B97\u653F": "z\u014Dng zh\xE8ng", "\u6FEE\u9633": "p\xFA y\xE1ng", "\u6DF3\u4E8E": "ch\xFAn y\xFA", "\u5355\u4E8E": "ch\xE1n y\xFA", "\u592A\u53D4": "t\xE0i sh\u016B", "\u7533\u5C60": "sh\u0113n t\xFA", "\u516C\u5B59": "g\u014Dng s\u016Bn", "\u4EF2\u5B59": "zh\xF2ng s\u016Bn", "\u8F69\u8F95": "xu\u0101n yu\xE1n", "\u4EE4\u72D0": "l\xEDng h\xFA", "\u949F\u79BB": "zh\u014Dng l\xED", "\u5B87\u6587": "y\u01D4 w\xE9n", "\u957F\u5B59": "zh\u01CEng s\u016Bn", "\u6155\u5BB9": "m\xF9 r\xF3ng", "\u9C9C\u4E8E": "xi\u0101n y\xFA", "\u95FE\u4E18": "l\u01D8 qi\u016B", "\u53F8\u5F92": "s\u012B t\xFA", "\u53F8\u7A7A": "s\u012B k\u014Dng", "\u4E93\u5B98": "q\xED gu\u0101n", "\u53F8\u5BC7": "s\u012B k\xF2u", "\u4EC9\u7763": "zh\u01CEng d\u016B", "\u5B50\u8F66": "z\u01D0 j\u016B", "\u989B\u5B59": "zhu\u0101n s\u016Bn", "\u7AEF\u6728": "du\u0101n m\xF9", "\u5DEB\u9A6C": "w\u016B m\u01CE", "\u516C\u897F": "g\u014Dng x\u012B", "\u6F06\u96D5": "q\u012B di\u0101o", "\u4E50\u6B63": "yu\xE8 zh\xE8ng", "\u58E4\u9A77": "r\u01CEng s\xEC", "\u516C\u826F": "g\u014Dng li\xE1ng", "\u62D3\u8DCB": "tu\xF2 b\xE1", "\u5939\u8C37": "ji\xE1 g\u01D4", "\u5BB0\u7236": "z\u01CEi f\u01D4", "\u6996\u6881": "g\u01D4 li\xE1ng", "\u6BB5\u5E72": "du\xE0n g\u0101n", "\u767E\u91CC": "b\u01CEi l\u01D0", "\u4E1C\u90ED": "d\u014Dng gu\u014D", "\u5357\u95E8": "n\xE1n m\xE9n", "\u547C\u5EF6": "h\u016B y\xE1n", "\u7F8A\u820C": "y\xE1ng sh\xE9", "\u6881\u4E18": "li\xE1ng qi\u016B", "\u5DE6\u4E18": "zu\u01D2 qi\u016B", "\u4E1C\u95E8": "d\u014Dng m\xE9n", "\u897F\u95E8": "x\u012B m\xE9n", "\u8D75": "zh\xE0o", "\u94B1": "qi\xE1n", "\u5B59": "s\u016Bn", "\u674E": "l\u01D0", "\u5468": "zh\u014Du", "\u5434": "w\xFA", "\u90D1": "zh\xE8ng", "\u738B": "w\xE1ng", "\u51AF": "f\xE9ng", "\u9648": "ch\xE9n", "\u891A": "ch\u01D4", "\u536B": "w\xE8i", "\u848B": "ji\u01CEng", "\u6C88": "sh\u011Bn", "\u97E9": "h\xE1n", "\u6768": "y\xE1ng", "\u6731": "zh\u016B", "\u79E6": "q\xEDn", "\u5C24": "y\xF3u", "\u8BB8": "x\u01D4", "\u4F55": "h\xE9", "\u5415": "l\u01DA", "\u65BD": "sh\u012B", "\u5F20": "zh\u0101ng", "\u5B54": "k\u01D2ng", "\u66F9": "c\xE1o", "\u4E25": "y\xE1n", "\u534E": "hu\xE0", "\u91D1": "j\u012Bn", "\u9B4F": "w\xE8i", "\u9676": "t\xE1o", "\u59DC": "ji\u0101ng", "\u621A": "q\u012B", "\u8C22": "xi\xE8", "\u90B9": "z\u014Du", "\u55BB": "y\xF9", "\u67CF": "b\u01CEi", "\u6C34": "shu\u01D0", "\u7AA6": "d\xF2u", "\u7AE0": "zh\u0101ng", "\u4E91": "y\xFAn", "\u82CF": "s\u016B", "\u6F58": "p\u0101n", "\u845B": "g\u011B", "\u595A": "x\u012B", "\u8303": "f\xE0n", "\u5F6D": "p\xE9ng", "\u90CE": "l\xE1ng", "\u9C81": "l\u01D4", "\u97E6": "w\xE9i", "\u660C": "ch\u0101ng", "\u9A6C": "m\u01CE", "\u82D7": "mi\xE1o", "\u51E4": "f\xE8ng", "\u82B1": "hu\u0101", "\u65B9": "f\u0101ng", "\u4FDE": "y\xFA", "\u4EFB": "r\xE8n", "\u8881": "yu\xE1n", "\u67F3": "li\u01D4", "\u9146": "f\u0113ng", "\u9C8D": "b\xE0o", "\u53F2": "sh\u01D0", "\u5510": "t\xE1ng", "\u8D39": "f\xE8i", "\u5EC9": "li\xE1n", "\u5C91": "c\xE9n", "\u859B": "xu\u0113", "\u96F7": "l\xE9i", "\u8D3A": "h\xE8", "\u502A": "n\xED", "\u6C64": "t\u0101ng", "\u6ED5": "t\xE9ng", "\u6BB7": "y\u012Bn", "\u7F57": "lu\xF3", "\u6BD5": "b\xEC", "\u90DD": "h\u01CEo", "\u90AC": "w\u016B", "\u5B89": "\u0101n", "\u5E38": "ch\xE1ng", "\u4E50": "yu\xE8", "\u4E8E": "y\xFA", "\u65F6": "sh\xED", "\u5085": "f\xF9", "\u76AE": "p\xED", "\u535E": "bi\xE0n", "\u9F50": "q\xED", "\u5EB7": "k\u0101ng", "\u4F0D": "w\u01D4", "\u4F59": "y\xFA", "\u5143": "yu\xE1n", "\u535C": "b\u01D4", "\u987E": "g\xF9", "\u5B5F": "m\xE8ng", "\u5E73": "p\xEDng", "\u9EC4": "hu\xE1ng", "\u548C": "h\xE9", "\u7A46": "m\xF9", "\u8427": "xi\u0101o", "\u5C39": "y\u01D0n", "\u59DA": "y\xE1o", "\u90B5": "sh\xE0o", "\u6E5B": "zh\xE0n", "\u6C6A": "w\u0101ng", "\u7941": "q\xED", "\u6BDB": "m\xE1o", "\u79B9": "y\u01D4", "\u72C4": "d\xED", "\u7C73": "m\u01D0", "\u8D1D": "b\xE8i", "\u660E": "m\xEDng", "\u81E7": "z\u0101ng", "\u8BA1": "j\xEC", "\u4F0F": "f\xFA", "\u6210": "ch\xE9ng", "\u6234": "d\xE0i", "\u8C08": "t\xE1n", "\u5B8B": "s\xF2ng", "\u8305": "m\xE1o", "\u5E9E": "p\xE1ng", "\u718A": "xi\xF3ng", "\u7EAA": "j\xEC", "\u8212": "sh\u016B", "\u5C48": "q\u016B", "\u9879": "xi\xE0ng", "\u795D": "zh\xF9", "\u8463": "d\u01D2ng", "\u6881": "li\xE1ng", "\u675C": "d\xF9", "\u962E": "ru\u01CEn", "\u84DD": "l\xE1n", "\u95F5": "m\u01D0n", "\u5E2D": "x\xED", "\u5B63": "j\xEC", "\u9EBB": "m\xE1", "\u5F3A": "qi\xE1ng", "\u8D3E": "ji\u01CE", "\u8DEF": "l\xF9", "\u5A04": "l\xF3u", "\u5371": "w\u0113i", "\u6C5F": "ji\u0101ng", "\u7AE5": "t\xF3ng", "\u989C": "y\xE1n", "\u90ED": "gu\u014D", "\u6885": "m\xE9i", "\u76DB": "sh\xE8ng", "\u6797": "l\xEDn", "\u5201": "di\u0101o", "\u949F": "zh\u014Dng", "\u5F90": "x\xFA", "\u90B1": "qi\u016B", "\u9A86": "lu\xF2", "\u9AD8": "g\u0101o", "\u590F": "xi\xE0", "\u8521": "c\xE0i", "\u7530": "ti\xE1n", "\u6A0A": "f\xE1n", "\u80E1": "h\xFA", "\u51CC": "l\xEDng", "\u970D": "hu\xF2", "\u865E": "y\xFA", "\u4E07": "w\xE0n", "\u652F": "zh\u012B", "\u67EF": "k\u0113", "\u661D": "z\u01CEn", "\u7BA1": "gu\u01CEn", "\u5362": "l\xFA", "\u83AB": "m\xF2", "\u7ECF": "j\u012Bng", "\u623F": "f\xE1ng", "\u88D8": "qi\xFA", "\u7F2A": "mi\xE0o", "\u5E72": "g\u0101n", "\u89E3": "xi\xE8", "\u5E94": "y\u012Bng", "\u5B97": "z\u014Dng", "\u4E01": "d\u012Bng", "\u5BA3": "xu\u0101n", "\u8D32": "b\u0113n", "\u9093": "d\xE8ng", "\u90C1": "y\xF9", "\u5355": "sh\xE0n", "\u676D": "h\xE1ng", "\u6D2A": "h\xF3ng", "\u5305": "b\u0101o", "\u8BF8": "zh\u016B", "\u5DE6": "zu\u01D2", "\u77F3": "sh\xED", "\u5D14": "cu\u012B", "\u5409": "j\xED", "\u94AE": "ni\u01D4", "\u9F9A": "g\u014Dng", "\u7A0B": "ch\xE9ng", "\u5D47": "j\u012B", "\u90A2": "x\xEDng", "\u6ED1": "hu\xE1", "\u88F4": "p\xE9i", "\u9646": "l\xF9", "\u8363": "r\xF3ng", "\u7FC1": "w\u0113ng", "\u8340": "x\xFAn", "\u7F8A": "y\xE1ng", "\u65BC": "y\u016B", "\u60E0": "hu\xEC", "\u7504": "zh\u0113n", "\u66F2": "q\u016B", "\u5BB6": "ji\u0101", "\u5C01": "f\u0113ng", "\u82AE": "ru\xEC", "\u7FBF": "y\xEC", "\u50A8": "ch\u01D4", "\u9773": "j\xECn", "\u6C72": "j\xED", "\u90B4": "b\u01D0ng", "\u7CDC": "m\xED", "\u677E": "s\u014Dng", "\u4E95": "j\u01D0ng", "\u6BB5": "du\xE0n", "\u5BCC": "f\xF9", "\u5DEB": "w\u016B", "\u4E4C": "w\u016B", "\u7126": "ji\u0101o", "\u5DF4": "b\u0101", "\u5F13": "g\u014Dng", "\u7267": "m\xF9", "\u9697": "ku\xED", "\u5C71": "sh\u0101n", "\u8C37": "g\u01D4", "\u8F66": "ch\u0113", "\u4FAF": "h\xF3u", "\u5B93": "m\xEC", "\u84EC": "p\xE9ng", "\u5168": "qu\xE1n", "\u90D7": "x\u012B", "\u73ED": "b\u0101n", "\u4EF0": "y\u01CEng", "\u79CB": "qi\u016B", "\u4EF2": "zh\xF2ng", "\u4F0A": "y\u012B", "\u5BAB": "g\u014Dng", "\u5B81": "n\xECng", "\u4EC7": "qi\xFA", "\u683E": "lu\xE1n", "\u66B4": "b\xE0o", "\u7518": "g\u0101n", "\u94AD": "t\u01D2u", "\u5389": "l\xEC", "\u620E": "r\xF3ng", "\u7956": "z\u01D4", "\u6B66": "w\u01D4", "\u7B26": "f\xFA", "\u5218": "li\xFA", "\u666F": "j\u01D0ng", "\u8A79": "zh\u0101n", "\u675F": "sh\xF9", "\u9F99": "l\xF3ng", "\u53F6": "y\xE8", "\u5E78": "x\xECng", "\u53F8": "s\u012B", "\u97F6": "sh\xE1o", "\u90DC": "g\xE0o", "\u9ECE": "l\xED", "\u84DF": "j\xEC", "\u8584": "b\xF3", "\u5370": "y\xECn", "\u5BBF": "s\xF9", "\u767D": "b\xE1i", "\u6000": "hu\xE1i", "\u84B2": "p\xFA", "\u90B0": "t\xE1i", "\u4ECE": "c\xF3ng", "\u9102": "\xE8", "\u7D22": "su\u01D2", "\u54B8": "xi\xE1n", "\u7C4D": "j\xED", "\u8D56": "l\xE0i", "\u5353": "zhu\xF3", "\u853A": "l\xECn", "\u5C60": "t\xFA", "\u8499": "m\xE9ng", "\u6C60": "ch\xED", "\u4E54": "qi\xE1o", "\u9634": "y\u012Bn", "\u9B31": "y\xF9", "\u80E5": "x\u016B", "\u80FD": "n\xE0i", "\u82CD": "c\u0101ng", "\u53CC": "shu\u0101ng", "\u95FB": "w\xE9n", "\u8398": "sh\u0113n", "\u515A": "d\u01CEng", "\u7FDF": "zh\xE1i", "\u8C2D": "t\xE1n", "\u8D21": "g\xF2ng", "\u52B3": "l\xE1o", "\u9004": "p\xE1ng", "\u59EC": "j\u012B", "\u7533": "sh\u0113n", "\u6276": "f\xFA", "\u5835": "d\u01D4", "\u5189": "r\u01CEn", "\u5BB0": "z\u01CEi", "\u90E6": "l\xEC", "\u96CD": "y\u014Dng", "\u90E4": "x\xEC", "\u74A9": "q\xFA", "\u6851": "s\u0101ng", "\u6842": "gu\xEC", "\u6FEE": "p\xFA", "\u725B": "ni\xFA", "\u5BFF": "sh\xF2u", "\u901A": "t\u014Dng", "\u8FB9": "bi\u0101n", "\u6248": "h\xF9", "\u71D5": "y\u0101n", "\u5180": "j\xEC", "\u90CF": "ji\xE1", "\u6D66": "p\u01D4", "\u5C1A": "sh\xE0ng", "\u519C": "n\xF3ng", "\u6E29": "w\u0113n", "\u522B": "bi\xE9", "\u5E84": "zhu\u0101ng", "\u664F": "y\xE0n", "\u67F4": "ch\xE1i", "\u77BF": "q\xFA", "\u960E": "y\xE1n", "\u5145": "ch\u014Dng", "\u6155": "m\xF9", "\u8FDE": "li\xE1n", "\u8339": "r\xFA", "\u4E60": "x\xED", "\u5BA6": "hu\xE0n", "\u827E": "\xE0i", "\u9C7C": "y\xFA", "\u5BB9": "r\xF3ng", "\u5411": "xi\xE0ng", "\u53E4": "g\u01D4", "\u6613": "y\xEC", "\u614E": "sh\xE8n", "\u6208": "g\u0113", "\u5ED6": "li\xE0o", "\u5EBE": "y\u01D4", "\u7EC8": "zh\u014Dng", "\u66A8": "j\xEC", "\u5C45": "j\u016B", "\u8861": "h\xE9ng", "\u6B65": "b\xF9", "\u90FD": "d\u016B", "\u803F": "g\u011Bng", "\u6EE1": "m\u01CEn", "\u5F18": "h\xF3ng", "\u5321": "ku\u0101ng", "\u56FD": "gu\xF3", "\u6587": "w\xE9n", "\u5BC7": "k\xF2u", "\u5E7F": "gu\u01CEng", "\u7984": "l\xF9", "\u9619": "qu\u0113", "\u4E1C": "d\u014Dng", "\u6B27": "\u014Du", "\u6BB3": "sh\u016B", "\u6C83": "w\xF2", "\u5229": "l\xEC", "\u851A": "w\xE8i", "\u8D8A": "yu\xE8", "\u5914": "ku\xED", "\u9686": "l\xF3ng", "\u5E08": "sh\u012B", "\u5DE9": "g\u01D2ng", "\u538D": "sh\xE8", "\u8042": "ni\xE8", "\u6641": "ch\xE1o", "\u52FE": "g\u014Du", "\u6556": "\xE1o", "\u878D": "r\xF3ng", "\u51B7": "l\u011Bng", "\u8A3E": "z\u01D0", "\u8F9B": "x\u012Bn", "\u961A": "k\xE0n", "\u90A3": "n\u0101", "\u7B80": "ji\u01CEn", "\u9976": "r\xE1o", "\u7A7A": "k\u014Dng", "\u66FE": "z\u0113ng", "\u6BCD": "m\u01D4", "\u6C99": "sh\u0101", "\u4E5C": "ni\xE8", "\u517B": "y\u01CEng", "\u97A0": "j\u016B", "\u987B": "x\u016B", "\u4E30": "f\u0113ng", "\u5DE2": "ch\xE1o", "\u5173": "gu\u0101n", "\u84AF": "ku\u01CEi", "\u76F8": "xi\xE0ng", "\u67E5": "zh\u0101", "\u540E": "h\xF2u", "\u8346": "j\u012Bng", "\u7EA2": "h\xF3ng", "\u6E38": "y\xF3u", "\u7AFA": "zh\xFA", "\u6743": "qu\xE1n", "\u902F": "l\xF9", "\u76D6": "g\xE0i", "\u76CA": "y\xEC", "\u6853": "hu\xE1n", "\u516C": "g\u014Dng", "\u725F": "m\xF3u", "\u54C8": "h\u01CE", "\u8A00": "y\xE1n", "\u798F": "f\xFA" }, s = { "l\xEDng": [12295, 20278, 20940, 21026, 22265, 22397, 22796, 22984, 23112, 23361, 23738, 24446, 25493, 26148, 26382, 26563, 26818, 27386, 27422, 27872, 28137, 28586, 28789, 29167, 29223, 29393, 29618, 29708, 29940, 30346, 30769, 31102, 31202, 31451, 31533, 32055, 32190, 32491, 32656, 32666, 32718, 32838, 33330, 33491, 33777, 34020, 34054, 34166, 34505, 34897, 35052, 35397, 36297, 36584, 36632, 37187, 37309, 37428, 37634, 38083, 38301, 38517, 38646, 38666, 38679, 38683, 38685, 38728, 39382, 39807, 39914, 40110, 40210, 40496, 40567, 40610, 40801, 40802, 40836, 40855], "y\u012B": [19968, 20042, 20234, 20381, 21307, 21530, 21695, 22123, 22769, 22777, 22785, 23259, 23300, 24332, 25558, 25742, 27321, 27593, 27938, 28175, 28458, 29823, 30057, 31054, 31125, 31270, 32324, 34524, 34916, 35689, 36791, 37116, 37291, 37541, 38129, 40406, 40549, 40671, 40691], "d\u012Bng zh\u0113ng": [19969], "k\u01CEo qi\u01CEo y\xFA": [19970], "q\u012B": [19971, 20507, 20699, 20932, 22017, 22660, 23096, 24765, 24956, 24957, 25114, 25471, 26578, 26724, 26748, 26866, 27071, 27450, 27791, 28114, 28422, 32042, 32192, 33803, 35076, 35526, 36809, 37098, 37850, 38667, 39756, 40328], "sh\xE0ng": [19972, 23577, 23578, 24678, 32212, 32497], "xi\xE0": [19973, 19979, 20068, 22327, 22799, 22803, 25047, 26810, 30108, 30577, 32581, 37820, 37868], "h\u01CEn": [19974, 21898, 28011, 32597, 35907], "w\xE0n m\xF2": [19975], "zh\xE0ng": [19976, 20183, 22663, 23938, 24080, 24115, 24155, 25177, 26454, 28081, 30190, 30252, 30260, 30613, 31872, 32960, 33081, 36076, 36134, 38556], "s\u0101n": [19977, 21377, 21441, 24334, 27637, 27638, 27647, 29337, 39702], "sh\xE0ng sh\u01CEng shang": [19978], "q\xED j\u012B": [19980, 20854, 22855], "b\xF9 f\u01D2u": [19981], "y\u01D4 y\xF9 y\xFA": [19982], "mi\u01CEn": [19983, 20589, 20813, 20885, 21193, 21204, 21909, 23081, 24848, 27717, 27796, 28238, 30540, 32236, 32517, 33148, 33858, 38758, 39864], "g\xE0i": [19984, 20066, 21251, 21252, 25124, 27010, 27113, 27114, 28297, 28433, 29890, 33890, 37411, 38041], "ch\u01D2u": [19985, 19986, 20404, 21532, 26493, 30597, 30657, 37276, 39767], "zhu\u0101n": [19987, 21440, 23269, 23554, 23560, 29820, 29966, 30742, 30935, 30938, 34788, 35567, 37151, 38995, 39067, 40004], "qi\u011B j\u016B": [19988], "p\u012B": [19989, 20243, 20286, 22140, 22383, 23727, 25013, 25209, 25259, 28811, 29385, 29395, 30738, 30919, 30996, 30997, 31195, 31200, 32794, 35966, 37043, 37402, 37471, 37524, 37635, 37645, 38713, 39379, 39660, 39806], "sh\xEC": [19990, 19991, 20106, 20107, 20181, 20365, 20895, 21183, 21218, 21323, 21609, 21980, 22124, 22763, 22893, 23317, 23460, 24066, 24335, 24337, 24338, 24640, 24643, 25146, 25325, 25555, 26159, 26160, 26558, 26623, 26683, 28584, 28882, 29046, 30466, 30478, 30497, 30551, 31034, 31035, 31598, 31789, 33296, 33299, 35179, 35222, 35270, 35298, 35430, 35475, 35553, 35610, 35797, 35877, 36016, 36147, 36606, 36732, 36893, 36990, 37320, 37322, 37323, 37424, 37443, 37501, 38088, 39166, 39193, 39197, 39280, 39960], "qi\u016B": [19992, 2e4, 22389, 23197, 24664, 24695, 27e3, 31179, 31180, 31312, 31693, 32231, 33833, 34322, 34479, 34677, 34775, 34852, 36261, 37041, 38822, 38823, 39948, 39949, 40133, 40342, 40537, 40861], "b\u01D0ng": [19993, 23643, 24626, 25254, 26142, 26170, 26564, 26821, 28851, 31104, 31177, 31263, 33514, 34499, 37044, 37429, 38467, 38790, 39173, 39200, 39292], "y\xE8": [19994, 20145, 20727, 22711, 22812, 23978, 23979, 25268, 25433, 25819, 25834, 25835, 26196, 26308, 26309, 26327, 26355, 26357, 26556, 26557, 26989, 27906, 28082, 28594, 28904, 29121, 29207, 29837, 30371, 30641, 30648, 30991, 33099, 33865, 35585, 35858, 37050, 37172, 37745, 37943, 38757, 38760, 38913, 39029, 39203, 39233, 39308, 39516, 40314, 40456], "c\xF3ng": [19995, 20174, 21474, 23107, 23406, 24467, 24468, 24470, 24752, 27191, 27401, 28121, 28743, 29212, 29742, 34242, 35508, 36072, 36073, 37661], "d\u014Dng": [19996, 20530, 20908, 21658, 22508, 23741, 23852, 24474, 26168, 26481, 27681, 27693, 28087, 31511, 33523, 33732, 34624, 39831, 39903, 40327, 40363, 40491, 40725], "s\u012B": [19997, 20460, 20952, 21422, 21496, 21661, 22070, 22109, 23204, 24285, 24662, 25749, 26031, 26962, 27840, 28556, 29133, 31127, 31136, 31169, 31993, 32114, 32230, 32415, 32524, 32627, 34156, 34386, 34547, 34596, 34692, 34774, 34804, 37488, 37551, 37750, 37889, 38198, 39096, 39124, 39462, 40421, 40502, 40758], "ch\xE9ng": [19998, 21576, 22478, 22485, 22552, 22605, 22614, 23468, 23800, 24809, 25074, 25104, 25215, 25392, 25473, 25576, 26536, 26838, 27225, 27289, 27910, 28311, 28546, 29685, 29689, 30075, 31243, 31386, 31596, 32126, 33069, 33663, 35488, 35802, 37077, 37234, 37614, 38102, 39468, 39886], "di\u016B": [19999, 20002, 37545, 38117], "li\u01CEng": [20001, 20004, 20841, 21858, 25498, 32201, 33084, 34621, 35058, 39753, 39758], "y\u01D2u": [20003, 21347, 21451, 26756, 28277, 29270, 31113, 32657, 32840, 33475, 33696, 34575, 37193, 37546, 38101, 40669], "y\xE1n": [20005, 21427, 21873, 21926, 22196, 22633, 22747, 22759, 22925, 23032, 23083, 23086, 23721, 23890, 23891, 24012, 24022, 24023, 24310, 25541, 26134, 26956, 27280, 27369, 27413, 27839, 28814, 28815, 29439, 29698, 30416, 30878, 31605, 31799, 33690, 34053, 34404, 34578, 35328, 35329, 35374, 35453, 35744, 37076, 38278, 38331, 38379, 38414, 38991, 38996, 39068, 40573, 40611], "b\xECng": [20006, 20341, 20482, 20641, 22442, 25682, 26660, 30149, 31369, 31453, 35457, 38736, 39849], "s\xE0ng s\u0101ng": [20007], "g\u01D4n": [20008, 24771, 28378, 28414, 30937, 32196, 32498, 34008, 34057, 34926, 34974, 36645, 36746, 39820, 39872, 40103], "ji\u016B": [20009, 21244, 21886, 25578, 25579, 26427, 31350, 31998, 32416, 33819, 36211, 38404, 39695, 39726, 40169, 40480], "g\xE8 g\u011B": [20010, 20491, 21508], "y\u0101": [20011, 22311, 23410, 24216, 25276, 26514, 26720, 26895, 37647, 37914, 40201, 40232, 40310, 40486, 40493], "p\xE1n": [20012, 23227, 24139, 27075, 27904, 28682, 29247, 30424, 30436, 30928, 32271, 33968, 34784, 36434, 36451, 37788, 38838], "zh\u014Dng zh\xF2ng": [20013], "j\u01D0": [20014, 22912, 24049, 25119, 25380, 25486, 25760, 25824, 27254, 27890, 29361, 33034, 34414, 34787, 39778, 40062, 40578], "ji\xE8": [20015, 20171, 20511, 21814, 22586, 23622, 23626, 23701, 24206, 24483, 25106, 26960, 29335, 29600, 29758, 30028, 30029, 30117, 30734, 34471, 34550, 34936, 35119, 35489, 35819, 37765, 39601, 39786], "f\u0113ng": [20016, 20217, 20561, 20732, 20968, 20972, 20974, 22950, 23543, 23553, 23791, 23792, 23862, 26539, 26963, 27282, 27811, 27816, 28194, 28739, 28925, 29326, 29478, 29714, 30127, 30219, 30461, 30748, 30904, 31688, 34356, 34562, 34861, 35920, 37175, 37190, 37586, 37821, 37856, 38155, 38715, 38730, 39116, 40631], "gu\xE0n ku\xE0ng": [20017], "chu\xE0n": [20018, 27724, 29588, 36055, 37351, 38031], "ch\u01CEn": [20019, 20135, 20865, 21111, 22213, 23932, 26101, 27984, 28411, 28763, 29986, 29987, 31749, 33927, 34118, 35522, 35650, 35719, 35844, 37855, 38130, 38323, 38369, 38416, 39587], "l\xEDn": [20020, 20903, 22755, 23818, 23961, 26036, 26237, 26301, 26519, 28542, 28726, 29136, 29747, 29848, 30645, 30852, 30967, 31910, 31932, 32343, 32759, 33256, 36692, 36762, 36980, 37051, 37168, 37883, 38462, 38563, 38678, 39502, 40023, 40158, 40592, 40607], "zhu\xF3": [20021, 21125, 21331, 21828, 22324, 22960, 23098, 25775, 25798, 25826, 26027, 26030, 26033, 26034, 26037, 26219, 26899, 27978, 27998, 28609, 28796, 28917, 29752, 30842, 31130, 31393, 31831, 31857, 32620, 33537, 34839, 34879, 35521, 35537, 35638, 35836, 37196, 37938, 38255, 40299, 40415], "zh\u01D4": [20022, 20027, 21167, 22065, 22225, 23444, 24126, 25284, 28186, 28624, 29009, 29038, 29149, 30633, 30682, 32604, 35421, 38524, 40448, 40584], "b\u0101": [20023, 20168, 20843, 21485, 21749, 22847, 23708, 24052, 25420, 26419, 29584, 30116, 31494, 31889, 32659, 33453, 34438, 35933, 37343], "w\xE1n": [20024, 21011, 23436, 23695, 25231, 25430, 27725, 28919, 29609, 29715, 31490, 32008, 32424, 32747, 33412, 36006, 38929, 39037], "d\u0101n": [20025, 21231, 21296, 21336, 22921, 23173, 27546, 27563, 29972, 30472, 30723, 31658, 31774, 32828, 32829, 32835, 32888, 35101, 35148, 36525, 37112, 37170, 37206, 38933], "w\xE8i w\xE9i": [20026], "j\u01D0ng d\u01CEn": [20028], "l\xEC l\xED": [20029], "j\u01D4": [20030, 24326, 25369, 25831, 26887, 27017, 27032, 27384, 27397, 30697, 31589, 32869, 33289, 33682, 33951, 35191, 36413, 40799, 40835], "pi\u011B": [20031, 33508, 37893], "f\xFA": [20032, 20239, 20440, 20971, 21020, 21264, 21640, 21753, 22424, 23386, 23722, 24063, 24087, 24133, 24158, 24343, 24447, 24619, 25206, 26603, 26687, 26740, 27679, 27885, 28014, 28074, 28563, 28837, 29624, 30006, 30025, 30273, 31059, 31119, 31274, 31526, 31641, 32049, 32060, 32101, 32141, 32450, 32459, 32600, 32614, 32711, 33344, 33433, 33443, 33531, 33536, 33583, 33748, 33869, 34393, 34472, 34569, 34656, 34970, 34993, 35142, 35173, 35560, 35943, 36414, 36667, 36752, 37083, 37464, 37468, 38861, 38888, 39083, 39668, 39812, 39858, 40167, 40172, 40212, 40297, 40699], "y\xED j\xED": [20033], "y\xEC": [20034, 20041, 20100, 20134, 20159, 20231, 20287, 20350, 20427, 20740, 20863, 21e3, 21139, 21166, 21210, 21225, 21255, 21587, 21613, 21625, 21768, 22216, 22299, 22340, 22460, 22520, 22869, 23253, 23313, 23537, 23673, 23748, 23975, 24095, 24096, 24134, 24281, 24322, 24328, 24331, 24441, 24518, 24584, 24639, 24722, 24847, 25014, 25036, 25087, 25233, 25401, 25953, 26131, 26233, 26304, 26318, 26457, 26509, 26861, 27023, 27128, 27277, 27485, 27540, 27562, 27577, 27589, 27970, 28005, 28019, 28249, 28322, 28521, 28602, 28727, 28808, 28978, 29088, 29092, 29116, 29146, 29153, 29169, 29512, 29620, 30064, 30123, 30188, 30231, 30238, 30257, 30292, 30410, 30614, 31315, 31465, 31698, 32266, 32374, 32377, 32462, 32546, 32681, 32703, 32714, 32716, 32755, 32764, 32820, 32900, 32906, 33161, 33222, 33367, 33402, 33413, 33477, 33823, 34042, 34191, 34265, 34269, 34329, 34377, 34612, 34720, 34922, 34979, 35028, 35035, 35129, 35196, 35378, 35379, 35405, 35427, 35516, 35695, 35696, 35739, 35758, 35793, 35811, 35850, 35929, 35931, 35959, 35990, 36096, 36295, 36726, 36920, 37009, 37139, 37303, 37364, 37408, 37808, 37951, 38226, 38257, 38435, 38591, 38700, 39248, 39365, 39515, 39551, 39598, 39848, 40322, 40323, 40333, 40385, 40394, 40423, 40446, 40451, 40541, 40546, 40659, 40824], "n\u01CEi": [20035, 20535, 22902, 23341, 24316, 27670, 30099, 33407, 36858, 37346], "w\u01D4": [20036, 20116, 20213, 20237, 20398, 20533, 20763, 21320, 21838, 22953, 23084, 23285, 24209, 24289, 24548, 24579, 25006, 25664, 27494, 28501, 29075, 29310, 29597, 29687, 29798, 29970, 30868, 33310, 36492, 36821, 36892, 38490, 40289, 40521], "ji\u01D4": [20037, 20038, 20061, 20067, 22906, 26470, 27747, 28792, 29590, 32036, 33295, 37202, 38265, 38893, 38894], "tu\u014D zh\xE9": [20039, 26452, 39346], "me m\xF3 ma y\u0101o": [20040], "zh\u012B": [20043, 20481, 21358, 24053, 25624, 25903, 26624, 26772, 26917, 27056, 27713, 27868, 30135, 31063, 31084, 31187, 31257, 32149, 32930, 32977, 32989, 33026, 33437, 34357, 34584, 34940, 38587, 40183, 40242, 40709], "w\u016B w\xF9": [20044], "zh\xE0": [20045, 21668, 23473, 25662, 27048, 28320, 30148, 34481, 35408, 35784, 37281, 38661], "h\u016B": [20046, 20079, 21282, 21291, 21628, 21823, 22033, 22400, 23523, 24160, 24573, 24794, 26130, 27473, 27864, 28148, 28409, 28864, 33528, 34381, 34390, 35644, 36580, 36727, 38608], "f\xE1": [20047, 20240, 20640, 22394, 22433, 22690, 22978, 26672, 27980, 30594, 31529, 31567, 32602, 32624, 32632, 34245, 38309, 38400], "l\xE8 yu\xE8 y\xE0o l\xE0o": [20048, 27138], "y\xEDn": [20049, 21535, 22102, 22170, 22273, 22432, 22820, 23148, 23493, 23806, 23839, 23855, 27309, 27557, 27903, 28139, 28379, 28878, 29374, 29434, 29836, 30797, 30866, 33654, 34089, 35348, 35354, 35361, 35518, 37150, 37405, 37504, 38134, 38698, 40419, 40806], "p\u012Bng": [20050, 20444, 23049, 28036, 30009, 30767, 32864, 33397, 38953], "p\u0101ng": [20051, 28354, 33006, 33174, 38641, 38710], "qi\xE1o": [20052, 20392, 20689, 23286, 24980, 26725, 27095, 27189, 27211, 27381, 29342, 30631, 30810, 30980, 33613, 33630, 34126, 34286, 35673, 36267, 37896, 38802, 38845, 39014], "h\u01D4": [20053, 29733, 33792, 34382, 34397, 37695, 39921], "gu\u0101i": [20054], "ch\xE9ng sh\xE8ng": [20055, 20056, 23053], "y\u01D0": [20057, 20059, 20197, 20506, 20591, 23327, 23866, 24050, 24225, 25158, 25914, 25980, 26065, 26070, 27301, 30691, 30994, 31510, 33315, 33380, 33505, 33506, 34433, 34712, 34811, 35071, 36390, 36642, 36697, 36888, 37199, 37332, 37400, 37487, 38023, 38999, 40166, 40814], "h\xE1o y\u01D0": [20058], "ni\xE8 mi\u0113": [20060], "q\u01D0": [20062, 20225, 21551, 21784, 21843, 21844, 21855, 23117, 23674, 26462, 26856, 29592, 30400, 32186, 32494, 33425, 35564, 36215, 37012, 38361], "y\u011B": [20063, 20918, 22050, 22492, 22724, 28444, 37326], "x\xED": [20064, 21946, 23219, 23949, 24109, 26938, 27268, 28445, 32722, 33990, 34989, 35186, 35233, 35275, 35637, 36248, 37067, 37812, 38576, 38699, 39105, 39473, 39485, 39528, 39996, 40155], "xi\u0101ng": [20065, 21410, 24258, 24512, 27007, 27392, 28248, 29910, 31269, 31665, 32215, 32515, 33207, 33431, 33835, 33881, 34188, 35140, 37111, 37129, 37130, 37141, 38002, 38262, 39321, 39524, 39591, 40028, 40600], "sh\u016B": [20070, 20495, 20496, 20789, 21460, 23005, 23575, 25234, 25491, 25669, 25860, 26360, 26530, 26803, 27166, 27530, 27571, 27641, 27642, 28113, 28717, 28930, 30094, 30095, 32019, 32128, 32446, 33298, 33789, 34092, 36360, 36567, 36664, 36755, 37123, 38478, 39835, 40296], "d\u01D2u": [20071, 25238, 26515, 34474, 37380, 38439, 38497], "sh\u01D0": [20072, 20351, 20824, 21490, 22987, 23465, 23630, 27009, 30690, 31542, 35925, 37442, 39387, 39542], "j\u012B": [20073, 20703, 20987, 21001, 21007, 21086, 21501, 21799, 21918, 21976, 22064, 22334, 22522, 22716, 23020, 23632, 23878, 23879, 25731, 25802, 26398, 26426, 26501, 27181, 27231, 27588, 28608, 29316, 29585, 29859, 30072, 30079, 30314, 30710, 30959, 31215, 31309, 31492, 31571, 31637, 31754, 32193, 32641, 32647, 32648, 32813, 32908, 33448, 34368, 35209, 35210, 35663, 35684, 35749, 36075, 36087, 36173, 36347, 36369, 36491, 36536, 37512, 37668, 37910, 37959, 37977, 38574, 38622, 38847, 38898, 39138, 39249, 39269, 39765, 40174, 40335, 40378, 40388, 40452, 40481, 40782, 40783, 40785], "n\xE1ng": [20074, 22178, 27420, 34864, 39266], "ji\u0101": [20075, 20339, 20642, 21152, 22025, 25272, 26551, 26780, 27616, 27847, 27971, 28025, 29324, 29491, 29640, 30146, 31539, 31960, 32798, 33141, 33901, 34952, 35949, 35985, 36303, 36838, 37483, 37813, 38227, 40208, 40602], "j\xF9": [20076, 20520, 20534, 20855, 21095, 21127, 21230, 22503, 22526, 22729, 22998, 23654, 23656, 23712, 24040, 24042, 24583, 24807, 24883, 25029, 25084, 25298, 25312, 26139, 27499, 27952, 28605, 28844, 28901, 29323, 31212, 31405, 31414, 31796, 31892, 32799, 32858, 34401, 34487, 35406, 35765, 35942, 36317, 36382, 36486, 36989, 37037, 37301, 37445, 37947, 38044, 39094, 39123, 39375, 39828], "sh\xED": [20077, 21313, 22488, 22610, 23036, 23454, 23455, 23508, 23526, 23765, 23925, 26102, 26105, 26178, 27055, 28252, 28321, 28859, 31055, 31437, 34432, 34645, 36795, 36936, 37456, 39136, 39267, 39830, 39971, 40101, 40747, 40749], "m\u01CEo": [20078, 20871, 21359, 23745, 25148, 26164, 27862, 31543, 34025, 37466, 38086], "m\u01CEi": [20080, 22058, 33644, 34130, 36023, 40438], "lu\xE0n": [20081, 20098, 37344], "r\u01D4": [20083, 25833, 27741, 32919, 36785, 37135], "xu\xE9": [20084, 23398, 23416, 23747, 23976, 25992, 27894, 28585, 29154, 31348, 33555, 34965, 36357, 40445, 40500], "y\u01CEn": [20085, 20456, 20547, 20796, 20822, 20823, 21411, 21428, 22110, 23373, 23875, 24024, 24026, 24327, 24861, 25133, 25162, 25217, 25513, 25564, 26350, 26940, 27327, 27783, 28215, 28436, 29744, 29975, 30524, 32616, 33810, 34648, 34893, 35095, 36541, 36931, 37118, 38546, 39017, 39751, 39768, 39947, 40352, 40673, 40676, 40684, 40685, 40694, 40756, 40761, 40820, 40849], "f\u01D4": [20086, 20428, 20443, 20463, 24220, 24355, 25242, 25290, 25771, 26023, 26920, 28367, 28964, 29995, 30425, 31776, 33104, 33105, 34565, 36628, 36741, 37081, 37340, 37345, 38429, 38955, 39732, 40700], "sh\u0101": [20087, 21798, 26432, 26732, 27578, 27630, 29440, 30183, 30722, 30832, 32023, 32378, 32433, 34097, 35039, 37801, 38121, 38327, 39679, 39782, 39882, 39883, 40104], "n\u01CE": [20088, 38635], "qi\xE1n": [20089, 20097, 20209, 20546, 21069, 22680, 23178, 23698, 25297, 25518, 27049, 27244, 27500, 28507, 28508, 28659, 28746, 31645, 33893, 34388, 36577, 37392, 37463, 37549, 37666, 37766, 38052, 38065, 38067, 38764, 39450, 39453, 39980, 40660, 40666], "su\u01D2": [20090, 21794, 21993, 25152, 26267, 28305, 28345, 29712, 29713, 29795, 32034, 35112, 37782, 37819, 37825, 38145], "y\xFA": [20091, 20110, 20112, 20227, 20313, 22563, 22572, 22948, 23067, 23087, 23089, 23337, 23859, 23886, 23899, 24858, 25205, 25540, 26079, 26977, 26992, 27014, 27428, 27464, 27487, 27510, 28180, 28189, 28257, 28417, 28574, 29263, 29427, 29591, 29593, 29788, 29877, 30402, 30574, 31404, 31485, 31813, 32685, 33140, 33278, 33281, 33286, 33349, 33584, 33838, 33848, 34125, 34331, 34398, 34422, 34643, 34744, 34919, 35093, 35238, 35278, 35547, 35619, 35840, 36400, 36671, 36701, 36926, 37016, 37201, 37725, 38533, 38611, 38633, 39192, 39296, 39455, 39596, 39619, 39770, 39779, 39869, 39922, 39941, 40060, 40416, 40454, 40821], "zh\xF9": [20092, 20267, 20295, 20303, 22398, 22712, 22772, 23872, 25280, 26492, 26609, 27174, 27574, 27880, 28855, 30128, 30493, 31069, 31081, 31450, 31599, 31672, 31723, 31767, 32053, 32056, 32443, 32668, 32741, 33486, 33671, 34496, 35387, 36015, 36142, 36307, 36596, 37458, 37619, 37956, 38136, 39349, 39376, 39547], "zh\u011B": [20093, 32773, 35126, 35189, 36205, 36407, 37754, 38167], "qi\xE1n g\u0101n": [20094], "zh\xEC lu\xE0n": [20095], "gu\u012B": [20096, 22317, 22955, 23215, 23266, 23296, 24112, 24402, 25707, 26909, 27131, 27132, 27383, 27512, 29674, 29808, 29853, 29900, 30344, 30625, 30789, 33573, 34348, 35215, 35268, 37053, 37068, 38312, 38394, 39465, 39734, 39737], "l\u01D0n l\xECn": [20099], "ju\xE9": [20101, 20915, 21012, 21122, 21303, 21413, 22090, 23378, 23379, 23835, 23851, 23973, 24399, 24992, 25008, 25092, 25225, 25367, 25496, 25899, 26743, 27227, 27228, 27438, 27666, 27770, 28749, 28979, 29094, 29201, 29236, 29237, 29527, 29571, 29606, 29608, 29647, 29812, 30234, 30669, 30689, 30724, 32085, 32118, 32477, 33220, 33461, 34141, 34152, 34419, 34792, 34793, 35286, 35310, 35324, 35363, 35662, 35776, 35890, 35996, 36221, 36233, 36471, 36521, 37388, 37901, 37917, 38017, 38242, 40194, 40195, 40418], "le li\u01CEo": [20102], "g\xE8 m\u0101": [20103], "y\u01D4 y\xFA": [20104, 25049], "zh\u0113ng": [20105, 20290, 20967, 22979, 23196, 23781, 23837, 23842, 24449, 24496, 28833, 28893, 29229, 29424, 29465, 30309, 30480, 30529, 30556, 31581, 31631, 31708, 32839, 33024, 33976, 36397, 37478, 37658, 37875, 39687], "\xE8r": [20108, 21045, 21665, 24333, 24336, 27186, 35456, 36014, 36019, 36144, 39670], "ch\xF9": [20109, 20631, 20746, 24629, 25015, 25616, 26038, 27484, 29695, 29729, 30679, 31436, 32064, 32460, 33221, 35302, 35320, 35926, 37136, 38310, 40668], "ku\u012B": [20111, 21042, 23743, 24011, 30420, 31397, 31418, 32871, 34407, 38362, 39005], "y\xFAn": [20113, 20253, 21243, 21248, 22249, 22936, 24874, 25251, 26112, 27218, 27780, 28066, 28339, 28560, 29065, 30023, 31184, 31612, 31700, 32028, 32284, 32429, 32792, 33464, 33975, 34131, 37095, 37142, 37574, 38642], "h\xF9": [20114, 20913, 21952, 22171, 23135, 23277, 23278, 23733, 24077, 24342, 24601, 25142, 25143, 25144, 25149, 25160, 25252, 26120, 27124, 27789, 27818, 28396, 29097, 29920, 31068, 31503, 31748, 31888, 32148, 34096, 35703, 35952, 37152, 37721, 38912, 40047, 40160, 40184, 40460, 40561], "q\xED": [20115, 21080, 22524, 23696, 23699, 23822, 23900, 24877, 25489, 25993, 25994, 26050, 26071, 26826, 26827, 27313, 27328, 27495, 28103, 28637, 29449, 29570, 29734, 29738, 29826, 30054, 30119, 30849, 30869, 31041, 31048, 31098, 31141, 31442, 31791, 31793, 31823, 31928, 32165, 32166, 32949, 33040, 33229, 33385, 33450, 33793, 33813, 34162, 34244, 34308, 34449, 34458, 34548, 34589, 34590, 34727, 34832, 35072, 36573, 37183, 37358, 37665, 38172, 38509, 38926, 39040, 39438, 39439, 39481, 39568, 39569, 39696, 39743, 39893, 39981, 40111, 40141, 40312, 40320, 40594, 40609], "j\u01D0ng": [20117, 20742, 21037, 21060, 22355, 23441, 24156, 25004, 26299, 27532, 27755, 27756, 28555, 29828, 29855, 29861, 31357, 32956, 34812, 35686, 38449, 38938, 38968], "s\xEC": [20118, 20288, 20385, 20777, 20821, 21987, 22235, 22994, 23088, 23392, 23546, 24051, 26614, 27065, 27740, 27863, 27876, 27917, 27936, 28056, 28675, 29293, 31040, 31145, 31458, 31525, 32796, 32898, 32902, 34172, 35223, 35972, 37362, 37430, 37435, 39140, 39164, 39282, 39391, 39427, 39543], "su\xEC": [20119, 23320, 23681, 23895, 26078, 27286, 27506, 27507, 28603, 29035, 29159, 29874, 30741, 30862, 31071, 31149, 31298, 31319, 31327, 32320, 32336, 32376, 35162, 35510, 35682, 35847, 36069, 36995, 37894, 37929, 38567, 38882], "g\xE8n": [20120, 20121, 25583, 25604, 33563], "y\xE0": [20122, 20124, 20473, 20916, 21148, 22292, 22304, 22497, 23045, 23149, 25568, 27689, 27692, 29373, 30737, 31247, 32848, 35198, 35200, 35357, 35766, 36711, 36819, 40830], "xi\u0113 su\xF2": [20123], "q\xED zh\u0101i": [20125, 40778], "y\u0101 y\xE0": [20126, 21387, 22445, 22739, 38100], "j\xED q\xEC": [20127, 28943], "t\xF3u": [20128, 25237, 38957, 39600], "w\xE1ng w\xFA": [20129], "k\xE0ng h\xE1ng g\u0101ng": [20130], "d\xE0": [20131, 30484], "ji\u0101o": [20132, 20716, 23047, 23308, 23783, 23957, 23971, 24973, 26898, 27975, 28550, 28966, 30977, 31322, 31781, 33014, 33184, 33202, 33581, 33582, 34121, 34400, 34527, 34797, 36324, 36679, 37066, 37902, 39509, 39556, 39851, 40091, 40257, 40422, 40430, 40554], "h\xE0i": [20133, 21968, 23475, 27686, 39168, 39258, 39405, 39412, 39559], "h\u0113ng p\u0113ng": [20136], "m\u01D4": [20137, 22982, 23764, 25287, 27597, 29281, 29299, 30018, 30022, 30034, 30045, 30046, 30062, 30762, 32991, 36359, 37479], ye: [20138], "xi\u01CEng": [20139, 20143, 21709, 24819, 26193, 34435, 34817, 38911, 39144, 39177, 39255, 39287, 39837, 39895, 40054, 40094], "j\u012Bng": [20140, 20144, 20834, 22357, 22361, 23131, 24778, 26060, 26061, 26230, 27256, 27902, 28039, 29444, 30555, 31188, 31241, 31923, 31934, 32076, 32147, 32161, 32857, 33096, 33550, 33606, 33610, 33729, 33871, 39514, 39912, 40120, 40321, 40324, 40598, 40608, 40753], "t\xEDng": [20141, 20572, 23159, 23881, 24237, 24311, 26975, 27059, 31603, 32868, 33691, 33910, 34579, 34639, 35562, 37010, 38662, 40750], "li\xE0ng": [20142, 21928, 24738, 26238, 28280, 35538, 35845, 36620, 36635, 36742, 37700], "q\u012Bn q\xECng": [20146, 35242], "b\xF3": [20147, 20194, 20412, 20720, 21338, 24091, 24893, 25066, 25388, 25615, 27394, 28001, 28159, 28196, 29055, 29268, 29403, 29917, 31028, 31201, 31636, 31769, 31978, 32969, 33046, 33162, 33334, 33354, 33825, 33895, 34991, 35151, 35182, 35592, 36387, 37091, 37432, 37457, 37581, 37787, 37998, 38073, 38082, 38216, 39226, 39310, 39323, 39326, 39361, 39406, 39539, 39622, 40275, 40513], "y\xF2u": [20148, 20305, 20326, 20369, 21448, 21491, 21706, 21760, 22271, 23031, 23461, 23775, 24188, 29398, 31056, 34484, 35480, 35825, 35969, 36854, 37229, 37321, 40748], "xi\xE8": [20149, 20275, 20574, 20592, 20673, 21352, 21368, 22119, 22638, 22801, 23199, 23633, 23655, 24296, 24482, 25032, 26284, 26800, 27021, 27053, 27899, 27945, 28203, 28581, 28681, 28707, 28794, 28839, 28840, 29166, 29205, 29548, 31044, 31164, 31951, 32050, 32079, 32108, 32370, 32392, 32449, 32567, 34210, 34212, 34809, 34831, 35081, 35131, 35613, 35874, 36510, 36994, 38782, 38896, 40770, 40792, 40795, 40805], "d\u01CEn d\xE0n": [20150, 39358], "li\xE1n": [20151, 21126, 21298, 21299, 22009, 22098, 22849, 22889, 23294, 24088, 24265, 24604, 24976, 28063, 28451, 28610, 28627, 28718, 29073, 29163, 31806, 31842, 31848, 32314, 32756, 32852, 32872, 32875, 32878, 32879, 33217, 33714, 34030, 34197, 34698, 34826, 35042, 35123, 35229, 35632, 36453, 36830, 36899, 37772, 37934, 38256, 39697, 39985, 40098], "du\u01D2": [20152, 21722, 22194, 22517, 23836, 26421, 26422, 32158, 32525, 36243, 36529, 36530, 36547], "w\u011Bi m\xE9n": [20153, 26006], "r\xE9n": [20154, 20155, 20161, 22764, 24520, 24526, 26418, 31170, 33442, 39772, 40256], "j\xED": [20156, 20157, 20235, 20342, 20590, 21337, 21363, 21373, 21450, 21469, 21513, 22578, 22601, 23006, 23241, 23692, 23924, 23983, 24438, 24547, 24613, 24881, 25122, 25572, 26497, 26840, 26987, 26997, 27081, 27293, 27547, 27762, 28242, 28503, 30142, 30240, 30349, 31496, 31679, 31821, 32026, 32423, 33164, 33381, 33978, 34112, 34170, 34637, 34703, 35147, 35289, 35899, 36374, 36432, 36516, 36655, 36698, 36753, 37062, 37537, 37715, 37878, 38598, 38631, 38709, 40545], "w\xE1ng": [20158, 20220, 20838, 33699, 34463], "sh\xE9n sh\xED": [20160], "l\xE8": [20162, 21499, 24519, 27707, 27856, 29583, 30771, 31765, 33403, 38430, 38903, 39182, 39987, 40051, 40147], "d\u012Bng": [20163, 21486, 24068, 29582, 30100, 30447, 32821, 34416, 38762], "z\xE8": [20164, 23857, 24194, 25425, 26115, 26135, 27716], "j\u01D0n j\xECn": [20165, 20677, 23268], "p\xFA p\u016B": [20166], "ch\xF3u qi\xFA": [20167], "zh\u01CEng": [20169, 24165, 25484, 30979], "j\u012Bn": [20170, 22587, 24062, 24781, 26020, 27941, 29650, 29755, 29857, 30747, 31563, 33621, 34943, 35167, 35284, 37329, 37330, 37375, 38021, 40566, 40645], "b\u012Bng": [20172, 20178, 20853, 20907, 20912, 25508, 27703, 37618], "r\xE9ng": [20173, 31037, 33471, 36792, 38526], "f\xF3": [20175, 22386, 26811], "j\u012Bn s\u01CEn": [20176], "l\xFAn": [20177, 20262, 20374, 20523, 22261, 22279, 23144, 23832, 23833, 26822, 27814, 28138, 30958, 33088, 33749, 34598, 36378, 36650, 36718, 37632, 38511, 39913], "c\u0101ng": [20179, 20218, 20489, 20948, 23906, 27815, 28356, 28664, 29514, 33329, 33369, 33485, 33980, 34725, 40487], "z\u01CEi z\u01D0 z\u012B": [20180], "t\u0101": [20182, 22604, 23427, 27033, 28347, 29280, 31042, 35103, 36287, 36962], "f\xF9": [20184, 20585, 20613, 20904, 21103, 21648, 22399, 22797, 22919, 23142, 23181, 23316, 23500, 24489, 26929, 31060, 31139, 31438, 32238, 32283, 32538, 33145, 33839, 34151, 34489, 34519, 34652, 34670, 34973, 35079, 35204, 35206, 35331, 35394, 35747, 36e3, 36070, 36091, 36127, 36171, 36185, 36212, 36665, 37713, 37730, 38428, 38468, 39333, 39385, 39544, 39826, 39954, 40075, 40134], "xi\u0101n": [20185, 20186, 20321, 20682, 20722, 20808, 22037, 22910, 23667, 24303, 24570, 25016, 25472, 26297, 26484, 27673, 29655, 31046, 31176, 31868, 32330, 32398, 32406, 33518, 35132, 35187, 36345, 36462, 36506, 37232, 37697, 38184, 38895, 38897, 39334, 40059, 40369], "tu\u014D ch\xE0 du\xF3": [20187], "h\xF3ng": [20188, 21552, 22444, 22917, 23042, 23439, 23446, 24344, 24395, 27759, 27859, 27946, 28004, 28209, 28482, 29586, 29596, 30804, 31441, 31460, 31690, 31904, 32024, 32045, 32139, 32430, 32707, 32733, 32830, 33520, 33645, 33874, 33875, 35897, 35900, 37404, 37495, 37584, 38286, 38387, 38672, 38687, 38787, 39775, 40251, 40511, 40649, 40652], "t\xF3ng": [20189, 20319, 21699, 23746, 23773, 24221, 24420, 26189, 26312, 26704, 27651, 28021, 28540, 29341, 29534, 30510, 30643, 30780, 31217, 31461, 31905, 33191, 33596, 34450, 35447, 36200, 37230, 37462, 37493, 37509, 38108, 39175, 39846, 40086], "r\xE8n": [20190, 20205, 20995, 20996, 22922, 23001, 23675, 23683, 25192, 29283, 31053, 32009, 32029, 32077, 32427, 32436, 32917, 33101, 34941, 34997, 35346, 35469, 35748, 35761, 36564, 36715, 37395, 38765, 38769, 38860, 38887, 39146, 39169, 39274], "qi\u0101n": [20191, 20325, 20681, 21315, 22322, 22903, 23407, 23693, 24749, 24838, 24947, 25190, 25322, 25652, 25729, 25872, 25873, 25875, 26436, 27343, 27736, 27751, 29301, 29309, 31439, 31614, 31805, 31830, 31844, 31873, 33418, 33598, 34440, 35120, 35536, 35609, 35878, 35896, 36801, 36983, 37370, 37382, 37467, 37874, 38030, 38433, 38854, 38981, 39467, 39582, 39708, 39709, 40302, 40528], "g\u01CEn h\xE0n": [20192], "y\xEC g\u0113": [20193], "d\xE0i": [20195, 20386, 21447, 22408, 22509, 23729, 24082, 24102, 24111, 24118, 24279, 24608, 25140, 26307, 26571, 27526, 28731, 29619, 29767, 29977, 31780, 32063, 32255, 32464, 33372, 34675, 34955, 35190, 36003, 36151, 36443, 36561, 36570, 36585, 36714, 36840, 38708, 38726, 40207, 40667, 40689], "l\xECng l\xEDng l\u01D0ng": [20196], "ch\xE0o": [20198, 32790, 35288], "ch\xE1ng zh\u01CEng": [20199, 20815, 38263, 38271], "s\u0101": [20200], "ch\xE1ng": [20201, 20607, 20767, 22039, 22160, 23270, 23581, 24120, 24476, 29818, 29946, 29982, 32928, 33144, 33171, 33484, 33799, 38264, 40040, 40127], "y\xED": [20202, 20359, 20736, 20893, 21276, 21670, 22319, 22839, 23016, 23440, 23452, 23463, 23538, 23763, 23980, 23991, 24056, 24411, 24412, 24413, 24414, 24609, 24670, 25157, 26246, 26648, 26924, 26936, 27778, 27935, 29098, 29941, 30157, 31227, 31747, 31822, 32672, 33008, 33811, 34534, 34708, 35322, 35643, 36029, 36155, 36320, 36859, 36986, 37844, 38921, 38948, 38949, 38986, 39056, 39284, 39847, 40250], "m\xF9": [20203, 20969, 21215, 22675, 24149, 24153, 24916, 24917, 26286, 26287, 26408, 26968, 27619, 27792, 28817, 29287, 29383, 30446, 30566, 31302, 33362, 33500, 33711, 34462, 37484, 38076, 38638, 38658], "men m\xE9n": [20204], "f\u01CEn": [20206, 21453, 27214, 36820], "ch\xE0o mi\u01CEo": [20207], "y\u01CEng \xE1ng": [20208], "zh\xF2ng": [20210, 20247, 22585, 22933, 23185, 29382, 30526, 31052, 31575, 33597, 34459, 34886, 34934, 35557], "p\u01D0 p\xED": [20211], "w\xF2": [20212, 20563, 21351, 23177, 24132, 25569, 26947, 27779, 28197, 28643, 29889, 30595, 30826, 32927, 33115, 33253, 40823, 40844], "ji\xE0n": [20214, 20468, 20581, 20717, 21073, 21091, 21105, 21133, 21134, 21138, 21140, 22713, 23499, 24314, 24484, 25846, 26068, 26967, 27645, 27914, 28071, 28567, 29294, 29652, 30647, 30965, 30976, 31661, 31947, 32349, 33137, 33270, 33328, 33382, 33616, 34214, 35256, 35539, 35563, 35675, 35855, 36046, 36068, 36145, 36253, 36341, 36368, 36410, 36702, 37492, 37747, 37749, 37937, 37969, 37970, 37996, 38003, 38190, 38291, 39198, 39279], "ji\xE0 ji\xE8 jie": [20215], "y\u01CEo f\xF3": [20216], "r\xE8n r\xE9n": [20219], "f\xE8n b\u012Bn": [20221], "d\u012B": [20222, 20302, 21874, 22494, 22564, 23739, 24445, 27136, 28404, 30974, 31210, 32669, 34971, 36230, 38532, 38830], "f\u01CEng": [20223, 20515, 26058, 26121, 26136, 29932, 30470, 32033, 32442, 33323, 35370, 35775, 39651, 40365], "zh\u014Dng": [20224, 21027, 22928, 24146, 24440, 24544, 26570, 27767, 27848, 28802, 30405, 31846, 32066, 32456, 33327, 34080, 34585, 34724, 34749, 34931, 34935, 36465, 37409, 37758, 37912, 38047, 38202, 40228, 40744], "p\xE8i": [20226, 20329, 23029, 24084, 26046, 26054, 27803, 28031, 29678, 34012, 36705, 36756, 37197, 38664, 39351], "di\xE0o": [20228, 21514, 24340, 25481, 30265, 30404, 31374, 31413, 31464, 35339, 37347, 37407, 37553, 37629, 37955, 38035, 38110, 38655, 39777], "d\xF9n": [20229, 28513, 28822, 29129, 30462, 30744, 30903, 36402, 36871, 36929, 36975, 37389, 38045], "w\u011Bn": [20230, 21006, 21563, 21573, 25222, 26749, 31283, 31311, 31337, 32010, 32947, 33047], "x\u01D0n": [20232], "k\xE0ng": [20233, 21279, 22245, 25239, 28821, 37415, 38058], "\xE0i": [20236, 20734, 22631, 22738, 23250, 23329, 24859, 25043, 26279, 26326, 29233, 29815, 29862, 30375, 30649, 30777, 30795, 30861, 31001, 34182, 35706, 36089, 37952, 38552, 38729, 39218, 39332, 40043, 40241], "j\xEC q\xED": [20238, 34234], "xi\u016B x\u01D4": [20241], "j\xECn y\xEDn": [20242], "d\u01CEn": [20244, 21008, 25762, 29612, 29933, 32030, 32966, 33213, 34932, 36071, 36181, 40661], "f\u016B": [20245, 21579, 23056, 23413, 23555, 24612, 25071, 25975, 26057, 29598, 30726, 31235, 31583, 31952, 32146, 32932, 33178, 33602, 33652, 34925, 36282, 36311, 37022, 37148, 37212, 37383, 40617, 40620, 40625, 40632], "t\u01CEng": [20246, 20645, 20795, 22507, 25091, 26349, 29219, 30680, 36538, 37810, 38018, 38219], "y\u014Du": [20248, 20778, 21606, 22168, 23795, 24189, 24551, 24736, 24962, 25912, 27340, 28410, 28672, 32395, 32682, 32816, 36876, 37182, 40576], "hu\u01D2": [20249, 22821, 28779, 29047, 37033, 37413, 38060], "hu\xEC ku\xE0i": [20250, 26371, 27981, 29871], "y\u01D4": [20251, 20417, 20451, 20554, 20660, 21292, 22131, 22276, 22281, 23431, 23513, 23679, 23996, 24254, 25383, 25940, 26014, 26944, 29760, 30224, 31076, 31161, 31333, 31411, 32701, 33287, 33837, 35984, 37125, 38952, 40588, 40812, 40841], "cu\xEC": [20252, 21851, 24560, 24756, 27635, 28140, 28960, 30121, 30209, 31425, 31883, 31929, 32035, 32183, 32710, 32736, 33027, 33030, 33082, 33196, 33205, 33230, 33795, 35146, 38983], "s\u01CEn": [20254, 20632, 31972, 32342, 39242, 39315], "w\u011Bi": [20255, 20266, 20553, 20605, 20702, 20784, 23059, 23530, 23843, 23945, 24491, 24839, 25444, 26256, 26806, 27943, 27992, 28200, 28828, 29010, 29477, 29614, 29771, 30207, 32239, 32428, 33138, 33353, 33435, 33479, 33649, 33806, 33894, 33933, 34111, 34620, 35529, 35839, 36371, 37729, 38865, 38873, 38881, 38890, 38944, 39097, 39593, 39594, 39595, 39850, 40084], "chu\xE1n zhu\xE0n": [20256, 20659], "ch\u0113 j\u016B": [20257, 20453, 36554, 36710], "y\xE1": [20258, 21393, 21395, 22544, 23688, 23829, 23830, 28079, 28420, 29273, 29601, 29706, 30554, 31500, 33469, 34460, 34905, 40790], "qi\xE0n": [20259, 20436, 20521, 20761, 21003, 22733, 23345, 24723, 26824, 26912, 27111, 27424, 27465, 30360, 31695, 31711, 32308, 33441, 33960, 34099, 36644], "sh\u0101ng": [20260, 20663, 21830, 22674, 24943, 27527, 27556, 28403, 28449, 29109, 34063, 34730, 35294, 35316, 35626, 39738], "ch\u0101ng": [20261, 20480, 23100, 26124, 26905, 28112, 29462, 29737, 33750, 35054, 37673, 38176, 38326, 38410, 39911, 40115, 40730], "chen c\u0101ng": [20263], "x\xF9n": [20264, 20378, 21314, 22080, 24058, 24061, 24455, 24891, 27529, 27582, 27739, 28512, 29413, 34120, 35338, 35347, 35353, 35757, 35759, 36805, 36863, 36874, 36956, 37954, 39016, 39348, 39535], "x\xECn": [20265, 22239, 23390, 33066, 33291, 34885, 35371, 37313, 38432, 38998], "ch\u01D0": [20268, 20360, 21366, 21498, 22417, 24677, 27503, 32827, 32916, 32995, 34439, 35053, 35115, 35913, 37497, 40786, 40831], "xi\xE1n xu\xE1n": [20269], "n\xFA n\u01D4": [20270], "b\u01CEi b\xF3": [20271], "g\u016B g\xF9": [20272], "n\u01D0": [20273, 20320, 20766, 23412, 25311, 25836, 26062, 26226, 29396, 33512, 34239, 38572], "n\xEC n\xED": [20274], "b\xE0n": [20276, 21150, 21322, 22981, 24593, 25198, 29923, 31194, 32070, 32458, 36774, 37473, 38781], "x\xF9": [20277, 20368, 21206, 21207, 21369, 21465, 22463, 22779, 23167, 24207, 24676, 25933, 25944, 26093, 26155, 26370, 27090, 27440, 27528, 27775, 27776, 27947, 28294, 28469, 28490, 28869, 28924, 29030, 29533, 29676, 30434, 30593, 31288, 32110, 32154, 32210, 32214, 32396, 32490, 32493, 32851, 32863, 33988, 34266, 35385, 36041, 37207, 38922, 40046], "zh\xF2u": [20279, 20733, 20881, 21610, 21650, 21678, 23449, 26172, 26205, 29955, 30385, 30394, 31808, 31826, 31829, 31897, 32002, 32272, 32419, 32457, 32964, 33646, 33892, 35403, 37198, 39374, 39519, 39588], "sh\u0113n": [20280, 20353, 20831, 21627, 22548, 22973, 23072, 23678, 23799, 25183, 25938, 26321, 26587, 27680, 28145, 29130, 29637, 29985, 29991, 30003, 30482, 30775, 31356, 31862, 31864, 31938, 32051, 32453, 32601, 32615, 33888, 34017, 34072, 34195, 35025, 35383, 35445, 35804, 36523, 39402, 39891, 39925, 39994, 40121, 40290], "q\u016B": [20281, 20297, 21284, 21631, 22373, 23624, 23702, 23732, 23943, 24968, 25278, 25978, 27968, 28992, 31067, 31553, 31916, 32992, 34502, 34512, 34986, 35259, 35416, 35790, 36237, 36527, 36544, 38457, 39366, 39368, 39493, 39537, 39671, 39804, 39992, 40011, 40332, 40623, 40628, 40633, 40674], "s\xEC c\xEC": [20282], "b\u0113ng": [20283, 22051, 22879, 23849, 23917, 38285], "s\xEC sh\xEC": [20284], "ji\u0101 qi\xE9 g\u0101": [20285], "y\u01D0 ch\xEC": [20289], "di\xE0n ti\xE1n": [20291, 38079], "h\u0101n g\xE0n": [20292], "m\xE0i": [20293, 21154, 21233, 21334, 21787, 22770, 33032, 34887, 36067, 36808, 36993, 38689, 38690, 40613, 40614], "d\xE0n": [20294, 20708, 21846, 21847, 21887, 22089, 22186, 24078, 25018, 26086, 26598, 27694, 27786, 27897, 28129, 29402, 30093, 30298, 31147, 31390, 33093, 33807, 34014, 34507, 34577, 35291, 35345, 35477, 35806, 36105, 38702, 39204, 39247, 39411, 39655, 40224], "b\xF9": [20296, 21199, 21541, 21656, 22487, 22496, 24067, 24269, 24598, 24721, 27493, 27496, 27497, 29951, 31728, 33657, 34048, 36356, 37096, 37110, 37384, 38042, 39202], "b\u01D0": [20298, 20478, 21269, 22838, 22947, 24444, 26428, 26560, 27604, 27614, 27800, 30101, 31189, 31508, 31558, 31875, 32859, 33325, 35983, 37145], "zh\u0101o sh\xE0o": [20299], "c\u01D0": [20300, 27492, 27866, 30345], "w\xE8i": [20301, 21355, 21619, 21890, 22683, 23206, 24944, 25024, 26410, 28205, 29023, 29101, 29338, 29484, 30031, 32237, 32635, 32963, 33535, 33739, 34287, 34358, 34655, 34737, 34907, 34910, 35133, 35586, 35718, 35727, 35859, 36503, 36507, 36558, 36682, 37839, 38696, 39207, 39221, 39254, 39759, 39815, 40154], "zu\u01D2": [20304, 24038, 32339], "y\u01CEng": [20306, 20639, 20859, 22385, 23711, 24899, 25065, 25857, 27687, 27697, 28852, 30162, 30306, 31010, 32059, 34630, 36590, 39178, 39386], "t\u01D0 t\u012B": [20307, 39636], "zh\xE0n": [20308, 20577, 23960, 25112, 25126, 25136, 26632, 26719, 26855, 28251, 31449, 32187, 32509, 33754, 34360, 34405, 34406, 35687, 36687, 39503], "h\xE9 h\u0113 h\xE8": [20309], "b\xEC": [20310, 21639, 21716, 22006, 22354, 22555, 22721, 22896, 22972, 23138, 23318, 24065, 24163, 24164, 24199, 24243, 24294, 24330, 24379, 24380, 24387, 24517, 24621, 24842, 24846, 25949, 25987, 26768, 27605, 27606, 27609, 28258, 28375, 28397, 28535, 29007, 29082, 29428, 29528, 29529, 29644, 29863, 30016, 30050, 30122, 30201, 30202, 30357, 30564, 30887, 31578, 31621, 31622, 31718, 31731, 31882, 32188, 32298, 32372, 32636, 33143, 33534, 33628, 33798, 33822, 34006, 34045, 34109, 34204, 34572, 34960, 35141, 35166, 35171, 35313, 35414, 35792, 36017, 36116, 36177, 36344, 36437, 36483, 36484, 36991, 37042, 37160, 37162, 37453, 37838, 37940, 38091, 38279, 38281, 38303, 38381, 38491, 38880, 39158, 39238, 39325, 39388, 39494, 39616, 39763, 39813, 40413, 40425, 40714], "tu\xF3": [20311, 22376, 22582, 23726, 27094, 27216, 27825, 30755, 30756, 30882, 32061, 35409, 36302, 37217, 38436, 38464, 38465, 39389, 39390, 39464, 39506, 39517, 39548, 39808, 40213, 40501, 40713, 40717, 40743], "sh\xE9": [20312, 33292, 34421, 34533], "y\xEC di\xE9": [20314, 26163, 27846, 36604], "f\xF3 f\xFA b\xEC b\xF3": [20315], "zu\xF2 zu\u014D": [20316], "g\u014Du": [20317, 27807, 28317, 30144, 31709, 31804, 32241, 32529, 34983, 35104, 37390, 37476, 38057, 38834, 38877], "n\xECng": [20318, 20395, 20543, 23509, 27870, 28573, 28632], "q\xFA": [20322, 21164, 25141, 26026, 27403, 27412, 27661, 28141, 28744, 29216, 29846, 29865, 30319, 30962, 31847, 32071, 32970, 33246, 33731, 33867, 34134, 34343, 34781, 34871, 34876, 34896, 34914, 36515, 36581, 38010, 40221, 40476, 40498, 40745], "y\u014Dng y\xF2ng": [20323], "w\u01CE": [20324, 21651, 30745, 37047], "k\u01CE": [20327, 22448, 33001, 35011, 37490], "b\u0101o": [20328, 21241, 21253, 23394, 29042, 31523, 32990, 33502, 34132, 35046, 35090, 35139, 38337, 40793, 40837], "hu\xE1i hu\xED": [20330], "g\xE9 h\xE8": [20331], "l\u01CEo": [20332, 21694, 24645, 26675, 29419, 29679, 30803, 32769, 32770, 33622, 34543, 36689, 37536, 38097, 39857], "xi\xE1ng": [20333, 24224, 26649, 31077, 32116, 32724, 35443, 36333], "g\xE9": [20334, 21260, 21572, 21981, 22629, 24837, 25356, 25663, 27077, 27338, 28358, 33160, 33269, 33558, 35297, 35581, 36661, 36693, 38307, 38401, 38548, 38839, 38864, 38874, 39444, 39612, 39855], "y\xE1ng": [20335, 21175, 22431, 23864, 24457, 25196, 25562, 25965, 26104, 26140, 26264, 26472, 26954, 27915, 28800, 29660, 30113, 30221, 30523, 34520, 35577, 36656, 37722, 38038, 38438, 38451, 38525, 38711, 39098, 39119, 39953, 40249, 40457], "b\u01CEi": [20336, 25453, 25670, 25850, 26658, 30334, 31457, 31912, 35180], "f\u01CE": [20337, 23772, 27861, 28747, 30749, 37701], "m\u01D0ng": [20338, 20949, 23027, 24911, 37225], "\xE8r n\xE0i": [20340], "h\u011Bn": [20343, 24456, 29408, 35434], "hu\xF3": [20344, 27963], "gu\u01D0": [20345, 21286, 21293, 21420, 22429, 23037, 23428, 24203, 24234, 24657, 26231, 28224, 30328, 31082, 31755, 34539, 34785, 35300, 35437, 35809, 36556, 36712, 38482, 39740], "qu\xE1n": [20346, 20840, 21875, 22498, 23038, 23761, 24015, 25331, 25660, 26435, 27006, 27177, 27402, 27849, 27940, 28278, 29303, 29320, 29780, 30154, 30786, 31564, 32275, 33603, 33906, 34615, 34872, 35296, 35438, 35808, 36327, 36385, 36615, 36737, 37275, 37523, 38120, 38350, 39028, 39079, 39401, 39457, 39688, 39937, 40136, 40804], "ti\u0101o": [20347, 24227, 26091, 31079, 32846], "ji\u01CEo": [20348, 20748, 23362, 25378, 25605, 25759, 25785, 25898, 25963, 25981, 25983, 26184, 26270, 26322, 28762, 29150, 29409, 29868, 30350, 30374, 32094, 32400, 32478, 33139, 33259, 34780, 35665, 36043, 36363, 37496, 38128, 39171, 39290, 40014, 40867], "c\xEC": [20349, 21054, 24219, 26431, 26664, 27425, 32088, 33574, 33727, 34515, 34694, 36060, 36176], "x\xEDng": [20352, 21009, 21720, 22411, 23065, 24418, 27920, 30798, 34549, 37026, 37065, 37379, 37494, 37522, 38040, 38095, 38473, 38488, 39219], "tu\u014D": [20354, 21635, 21660, 22315, 25176, 25301, 25302, 27729, 33067, 33073, 33676, 34981, 35351, 35756, 39141, 39270, 39776, 39861], "k\u01CEn": [20355, 20568, 20890, 22350, 24770, 30733, 33712, 36641, 36695, 38993], "zh\xED": [20356, 20516, 20540, 22516, 22519, 23018, 23298, 25120, 25191, 25709, 26893, 27188, 28116, 28432, 30452, 31107, 32119, 32310, 32832, 32844, 32887, 33201, 34777, 36310, 36399, 36448, 36497, 36548, 37342, 39357], "g\u0101i": [20357, 22419, 23007, 23760, 26192, 30049, 31092, 33604, 35442, 35813, 35941, 36037, 36044, 36165, 38484], "l\xE1i": [20358, 20459, 20488, 23811, 23821, 24242, 26469, 26814, 26870, 28062, 28150, 29453, 29724, 31577, 31618, 33713, 33802, 36904, 37106, 37688, 38140, 39435, 39904, 40326, 40627], "ku\u01CE": [20361, 21685, 22446, 37529], "g\u014Dng": [20362, 20844, 21151, 21265, 21268, 22632, 23467, 23470, 24037, 24138, 24339, 24685, 25915, 26459, 30909, 31996, 31999, 32945, 35301, 35317, 36524, 36531, 39672, 40852, 40858], "l\xEC": [20363, 20432, 20458, 20616, 20782, 20791, 20947, 21033, 21147, 21169, 21237, 21382, 21385, 21412, 21423, 21426, 21459, 21519, 21590, 21774, 21811, 22182, 22215, 22364, 22619, 22754, 23091, 23151, 23668, 23718, 24743, 24759, 24900, 25150, 25646, 26278, 26310, 26334, 26424, 26533, 26627, 26647, 26651, 27306, 27348, 27370, 27408, 27508, 27511, 27813, 27828, 28054, 28327, 28671, 28701, 29199, 29345, 29441, 29653, 29806, 29893, 29905, 29925, 30124, 30178, 30311, 30445, 30553, 30725, 30778, 30782, 30975, 31018, 31019, 31024, 31154, 31197, 31435, 31520, 31717, 31890, 31901, 31986, 33079, 33480, 33560, 33620, 33669, 33673, 33946, 33950, 34294, 34488, 34510, 34528, 34599, 34679, 34823, 34851, 35400, 35720, 36210, 36706, 36707, 36729, 37192, 37469, 38582, 38583, 38643, 38722, 38731, 39681, 40168, 40215, 40389, 40604], "y\u012Bn": [20364, 20944, 21905, 22142, 22233, 22240, 22420, 22553, 23035, 23139, 24852, 24903, 26678, 27684, 27911, 28341, 28646, 30230, 31115, 31221, 31555, 32106, 32248, 33589, 33937, 34093, 35008, 35570, 37542, 38111, 38345, 38437, 38452, 38512, 38523, 38530, 38674, 38688, 38791, 38899, 38910, 39408, 39555, 40791], "m\u01D0": [20366, 23370, 24365, 25929, 27939, 28211, 28758, 31859, 31886, 32651, 33042, 33416, 33886, 34077, 37540], "zh\u016B": [20367, 26666, 27104, 27237, 27367, 27371, 27929, 28532, 28710, 29482, 29664, 30787, 31228, 32081, 33585, 34127, 34523, 34667, 34857, 35006, 35461, 35576, 35803, 35832, 35948, 36326, 37054, 37526, 38114, 39407, 39842, 39930, 40248, 40708], "\u0101n": [20370, 20579, 23189, 23433, 23766, 24245, 26697, 27688, 30438, 30443, 33124, 33780, 33851, 33866, 34029, 35485, 35571, 35865, 38796, 38797, 38909, 39331, 39839, 40298, 40341, 40524], "l\xF9": [20371, 20679, 21198, 21216, 22309, 22388, 22646, 23101, 23757, 24280, 24404, 24405, 25134, 25693, 26882, 27162, 28117, 28133, 28172, 28425, 28510, 29741, 29840, 29994, 30429, 30569, 30793, 31103, 31108, 31249, 31307, 31635, 31759, 31788, 31797, 31798, 31833, 31926, 34061, 34135, 34370, 34736, 36034, 36162, 36258, 36335, 36379, 36439, 36613, 36678, 36738, 36760, 36911, 37249, 37636, 37682, 37684, 37876, 38520, 39428, 39484, 39909, 40252, 40294, 40305, 40442, 40557, 40575, 40595], "m\xF3u": [20372, 21178, 24648, 30520, 34513, 35584, 35851, 36366, 37738, 40254, 40624], "\xE9r": [20373, 20799, 20816, 20818, 23759, 26669, 27919, 31915, 32780, 33017, 33611, 35003, 36608, 36700, 38481, 38573, 39669, 39838, 40085, 40239, 40504], "d\xF2ng t\u01D2ng t\xF3ng": [20375], "ch\xE0": [20376, 22908, 23033, 23700, 27722, 35435, 35815], "ch\xEC": [20377, 20666, 21189, 21201, 21489, 21883, 24435, 24668, 24919, 24975, 25048, 25270, 25941, 26021, 26456, 28225, 28795, 28861, 28926, 29118, 30163, 30200, 30235, 32708, 32709, 32740, 32744, 33119, 36196, 36265, 36971, 37459, 38644, 39149, 39276, 40338, 40408], "g\xF2ng g\u014Dng": [20379, 20849], "zh\u014Du": [20380, 21608, 21900, 24030, 24479, 27954, 28109, 28863, 28880, 29656, 30698, 33311, 35589, 35704, 35788, 36057, 36178, 36616, 36630, 36736, 36913, 37102, 37506, 38668, 39410, 39430, 40259, 40508], "r\xFA": [20382, 20754, 22149, 22914, 23340, 23418, 24100, 26328, 26695, 28202, 28641, 31566, 33593, 34144, 34231, 34657, 34837, 35005, 35174, 37018, 37305, 37539, 38135, 39020, 39077, 40044, 40209, 40253], "ji\xE0n c\xFAn": [20383], "xi\xE1": [20384, 20448, 21283, 23777, 23805, 25966, 26247, 26585, 28832, 28890, 29390, 29421, 29433, 29672, 29781, 30806, 30820, 30892, 31083, 31594, 32278, 32712, 33309, 33338, 34168, 36206, 36676, 36758, 36944, 37724, 37771, 38492, 38527, 38686, 39458, 39803, 40375, 40672], "l\u01DA": [20387, 20406, 20770, 21525, 21570, 23649, 23650, 23653, 25364, 25435, 26053, 26784, 28946, 31075, 31238, 31341, 32125, 32311, 32533, 33154, 33168, 35099, 35128, 37080, 37569, 38109], ta: [20388], "ji\u01CEo y\xE1o": [20389, 20709, 24506], "zh\u0113n": [20390, 20597, 23498, 24103, 24106, 24128, 25656, 26015, 26722, 26984, 27035, 27196, 27549, 27976, 28254, 28519, 28597, 29513, 29645, 29646, 29799, 29956, 30494, 30495, 30759, 30890, 31087, 31118, 31131, 31668, 32983, 33275, 33908, 33942, 33985, 34237, 35998, 36126, 36675, 36937, 37209, 37341, 37441, 37681, 37756, 38024, 40053], "c\xE8 z\xE8 zh\u0101i": [20391, 20596], "ku\xE0i": [20393, 20744, 20983, 21721, 22130, 22310, 22359, 22602, 24028, 24293, 24555, 26077, 27443, 29423, 29546, 31607, 31977, 33037, 33214, 37072, 37174, 40032, 40089], "ch\xE1i": [20394, 20757, 21901, 26612, 29362, 31073, 35962], "n\xF3ng": [20396, 20738, 20892, 21725, 22117, 27266, 27393, 27987, 28611, 29174, 31151, 31230, 31328, 33043, 33215, 34173, 35163, 35688, 36786, 36787, 37298, 39710], "j\u01D0n": [20397, 20760, 21370, 21418, 24057, 27135, 28428, 29822, 32039, 32202, 33771, 34035, 35641, 35880, 37670, 38182, 39241, 39313], "h\xF3u h\xF2u": [20399, 30694], "ji\u01D2ng": [20400, 20690, 20879, 22247, 27842, 28547, 28847, 28913, 29018, 29019, 29106, 29147, 31384, 32151, 35111, 36837, 36872, 38984, 39054], "ch\u011Bng t\u01D0ng": [20401], "zh\xE8n zh\u0113n": [20402, 25557], "zu\xF2": [20403, 20570, 21777, 22352, 23709, 23710, 24231, 31066, 31987, 32985, 33859, 33860, 34009, 34959, 38460], "q\u012Bn": [20405, 20819, 23175, 23898, 23956, 27453, 34942, 35483, 38054, 38985, 39416, 39566, 39868], "j\xFA": [20407, 21881, 23109, 23616, 24008, 26888, 27224, 27878, 28119, 28264, 28951, 29329, 29386, 31927, 33738, 34332, 36252, 36348, 36459, 36610, 37113, 38320, 39414, 39527, 40281, 40308, 40362, 40752, 40755], "sh\xF9 d\u014Du": [20408], "t\u01D0ng": [20409, 22306, 23063, 25402, 28047, 28918, 29693, 33057, 33351, 35476, 38962, 39051], "sh\xE8n": [20410, 24892, 24910, 26138, 28033, 28183, 28402, 30214, 30254, 30488, 31091, 32958, 32962, 33060, 33102, 34563, 34564, 37600], "tu\xEC tu\xF3": [20411], "n\xE1n": [20413, 21891, 23066, 25257, 26260, 26511, 26591, 26976, 30007, 30040, 33710, 33843, 36950], "xi\u0101o": [20414, 21715, 22069, 22203, 22210, 23115, 23471, 23477, 24232, 24391, 25585, 26541, 26549, 26783, 27385, 27466, 27594, 28040, 28487, 28703, 28785, 28786, 28875, 28935, 29447, 29538, 30170, 30175, 30813, 30819, 31385, 31659, 31768, 31787, 32131, 32481, 32731, 33198, 33831, 34157, 34376, 34387, 34754, 34767, 34800, 34856, 36355, 36877, 37559, 38144, 38660, 39093, 39501, 39553, 39623, 39632, 39752, 40222, 40245, 40397, 40494], "bi\xE0n pi\xE1n": [20415, 32246, 32527], "tu\u01D0": [20416, 33151, 36422, 39613], "x\xEC": [20418, 21304, 21324, 21612, 22669, 23619, 23635, 23661, 24549, 24620, 24644, 26910, 28509, 28511, 28569, 29058, 29332, 30966, 31114, 32048, 32140, 32280, 32454, 32484, 33283, 33284, 34158, 34409, 34891, 35236, 36201, 36231, 37092, 37363, 38411, 38553, 38559, 38716, 39228, 39273, 39721, 40662], "c\xF9": [20419, 23208, 25009, 29469, 30212, 30255, 31751, 32300, 33064, 34079, 35470, 36247, 36391, 36415, 36441, 36468, 36469, 37259, 39011, 40704], "\xE9": [20420, 22254, 23077, 23753, 23784, 23785, 28048, 29684, 30354, 30539, 30912, 33706, 35355, 35472, 35660, 35769, 36823, 37387, 37608, 38151, 38943, 38989, 39069, 39780, 40285, 40286, 40517], "qi\xFA": [20421, 21492, 21778, 22234, 23863, 24047, 24048, 25167, 26754, 27535, 27628, 27714, 27731, 27845, 27991, 28269, 29034, 29360, 29580, 29699, 29830, 30387, 30426, 32012, 32127, 32909, 33409, 33677, 34412, 34415, 34551, 35032, 35283, 35305, 35332, 35333, 36053, 36167, 36878, 36881, 36946, 37195, 37338, 37371, 37558, 38916, 39810, 39876, 39997, 40765], "x\xFA": [20422, 24464, 31121], "gu\xE0ng ku\u0101ng": [20423], "k\xF9": [20424, 21950, 22195, 24211, 24235, 24292, 30228, 32093, 32468, 34996, 35044, 35122, 37239], "w\xF9": [20425, 21153, 21209, 21247, 21372, 22366, 22626, 22886, 23162, 23524, 23676, 23689, 23912, 24546, 24734, 24735, 24750, 25098, 25188, 26212, 26444, 28329, 28944, 29059, 29289, 30182, 30713, 31417, 31877, 34305, 35492, 35823, 37576, 38434, 38550, 38654, 38682, 38695, 38768, 39446, 39579, 40361, 40540, 40767, 40768], "j\xF9n": [20426, 20737, 21569, 22472, 23535, 23803, 25039, 25411, 25887, 26201, 26846, 29127, 29690, 30063, 31459, 31647, 34592, 36048, 37089, 38486, 39189, 39298, 39423, 39567, 40276, 40277, 40280], "li\xE1ng": [20429, 22682, 26753, 26891, 27153, 31918, 31921, 31975, 33391, 36652, 36748], "z\u01D4": [20430, 21800, 29244, 31062, 32068, 32452, 35419, 35781, 37818, 38459, 38779], "qi\xE0o xi\xE0o": [20431], "y\u01D2ng": [20433, 21191, 21192, 21647, 22471, 22606, 23921, 24430, 24634, 24703, 24704, 24805, 24849, 24889, 24898, 26593, 26640, 27704, 27891, 28263, 29996, 34553, 35424, 36362, 36404, 39890, 40108], "h\xF9n": [20434, 20529, 22274, 23585, 24897, 25485, 28343, 28957, 30580, 35304, 35554, 35816], "j\xECng": [20435, 20665, 22659, 22924, 23129, 23143, 24362, 24371, 24452, 24465, 25964, 26324, 26737, 26807, 27972, 28702, 29517, 30153, 30169, 31454, 31455, 31467, 31478, 31480, 33003, 33051, 33686, 35497, 36353, 36851, 36885, 37857, 38236, 38742, 38745, 38748, 40283], "s\xE0n": [20437, 38288], "p\u011Bi": [20438], "s\xFA": [20439], "x\u012B": [20441, 20694, 20846, 20958, 21349, 21376, 21560, 21775, 21821, 22075, 22095, 22193, 22805, 22874, 23302, 23305, 23638, 23904, 24007, 24076, 24454, 24495, 24687, 24713, 24725, 24769, 24796, 26132, 26206, 26224, 26227, 26342, 26512, 26744, 27069, 27176, 27200, 27447, 27685, 27728, 28e3, 28101, 28179, 28330, 28911, 28929, 28936, 28959, 29060, 29064, 29081, 29113, 29114, 29115, 29160, 29204, 29306, 29312, 29344, 29351, 29707, 30236, 30361, 30542, 30630, 30717, 30802, 30926, 30978, 31232, 31352, 31416, 31902, 31974, 32198, 32357, 32690, 32725, 32726, 32952, 32953, 33181, 33342, 33667, 33765, 33952, 34597, 34693, 34763, 34869, 35199, 35321, 35325, 35327, 35654, 35903, 35904, 35944, 35951, 35989, 36197, 37020, 37134, 37189, 37295, 37368, 37675, 37869, 37898, 38004, 38177, 38581, 39183, 39246, 39291, 39889, 40279, 40450, 40759], "l\u01D0": [20442, 23052, 23778, 23794, 26446, 27418, 28012, 28583, 29702, 31036, 31150, 31924, 35023, 35041, 35914, 36902, 37008, 37300, 37616, 38146, 39881, 40039, 40049, 40100, 40162], "b\u01CEo": [20445, 22562, 23212, 23453, 23514, 23539, 23542, 29668, 32229, 33862, 34293, 35091, 36082, 38732, 39161, 39165, 39281, 39362, 40181, 40199, 40488], "y\xFA sh\xF9 y\xF9": [20446], "s\xEC q\xED": [20447], "x\xECn sh\u0113n": [20449], "xi\u016B": [20450, 20462, 21691, 24229, 27143, 28876, 32670, 33049, 33065, 33273, 35973, 37533, 37760, 39117, 39240, 39312, 39652, 39673, 39860, 40003, 40258, 40506], "d\xEC": [20452, 20569, 20672, 22474, 22673, 22700, 23075, 24093, 24607, 26099, 26762, 28941, 29587, 29963, 30513, 30535, 30898, 31094, 31128, 31532, 32224, 32532, 33123, 33730, 33922, 34069, 34627, 34669, 34734, 35558, 35867, 36406, 36882, 36883, 36958, 36976, 37482], "ch\xF3u": [20454, 20756, 23334, 24774, 24833, 25060, 26662, 29181, 30068, 30087, 30359, 31264, 31609, 31820, 32082, 32162, 32504, 33751, 35446, 35726, 35728, 36364, 36490, 37223, 37228, 37307, 38612, 38624, 38630], "zh\xEC": [20455, 20587, 20776, 21046, 21141, 22401, 23073, 23512, 24089, 24092, 24159, 24226, 24228, 24268, 24408, 24463, 24477, 24535, 24558, 25061, 25067, 25347, 25370, 25527, 25711, 25842, 26072, 26186, 26234, 26633, 26702, 26813, 27341, 27355, 27835, 27959, 28365, 28382, 28399, 28492, 28676, 28825, 29099, 29438, 29464, 29839, 29894, 30164, 30179, 31017, 31057, 31209, 31223, 31258, 31290, 31305, 31378, 32041, 32251, 32622, 32720, 33187, 33267, 33268, 33430, 34541, 34975, 34976, 35069, 35231, 35287, 35311, 35318, 35468, 35921, 35922, 36013, 36074, 36100, 36136, 36157, 36337, 36396, 36499, 36618, 36734, 37061, 37517, 37589, 37973, 38106, 38183, 38495, 38578, 38601, 39396, 39469, 39482, 39495, 39576, 39919, 40217, 40409, 40503], "li\u01CE li\u01CEng": [20457], "ji\u01CEn": [20461, 20537, 20745, 20943, 21098, 22591, 24383, 24389, 25129, 25132, 25315, 25400, 25441, 25536, 25791, 26535, 26604, 26776, 26816, 26908, 27298, 28187, 28245, 28733, 29776, 30545, 30652, 30839, 30897, 30982, 31509, 31591, 31616, 31777, 32120, 32365, 32742, 33575, 34246, 34834, 35045, 35143, 35145, 35194, 35395, 35591, 35629, 35710, 35883, 36284, 36423, 37911, 39691, 39950, 40568, 40571, 40572], "hu\xF2": [20464, 21663, 22191, 22207, 22895, 24416, 24785, 25110, 25837, 26084, 26340, 27316, 27790, 28273, 28694, 29554, 30312, 30483, 30672, 31096, 31117, 31339, 31394, 32815, 33243, 33383, 33719, 33958, 34303, 34838, 35595, 36008, 36135, 37699, 37962, 38252, 38616, 38669, 38723, 38852], "j\xF9 j\u016B": [20465, 25454, 37624, 38191], "xi\xE0o": [20466, 20634, 21177, 21682, 21742, 21880, 22027, 22056, 22063, 23389, 25928, 25989, 25990, 27479, 28045, 29117, 31505, 35432, 35487], "p\xE1i": [20467, 24472, 29260, 29348, 29445, 31792, 31794, 36651], "bi\xE0o": [20469, 39998, 40148], "ch\xF9 t\xEC": [20470], "f\xE8i": [20471, 21077, 21406, 21536, 23645, 24223, 24259, 24290, 26162, 26314, 27360, 27832, 28663, 29394, 30280, 32954, 33801, 36027, 36153, 37928, 38212, 38507, 38725, 40739], "f\xE8ng": [20472, 20964, 22857, 28247, 28968, 29e3, 36085, 36183, 40175, 40179, 40204], "\u01CEn": [20474, 21813, 22511, 25566, 32623, 37544, 38133], "b\xE8i": [20475, 20493, 20573, 20601, 20633, 20675, 22791, 24726, 24811, 24834, 24970, 26113, 26774, 28953, 29292, 29333, 29384, 29437, 29692, 29746, 30874, 31129, 31954, 33501, 34003, 34557, 35097, 35997, 36125, 36592, 36649, 36744, 37046, 37093, 37121, 37575, 37950, 38049, 38785, 38836], "y\xF9": [20476, 20773, 21893, 21929, 21947, 22495, 22537, 22954, 23255, 23507, 23786, 23950, 24253, 24423, 24481, 24840, 24958, 25131, 26161, 26843, 26844, 26859, 27378, 27406, 27421, 27442, 27603, 28020, 28143, 28394, 28495, 28582, 28778, 28980, 29020, 29135, 29152, 29225, 29425, 29508, 29577, 29721, 30217, 30290, 30753, 30818, 30834, 30983, 30998, 31004, 31142, 31191, 31266, 31286, 31741, 31838, 31858, 31894, 32206, 32621, 32895, 32896, 33352, 33419, 33420, 33567, 33966, 34019, 34041, 34167, 34316, 34591, 34606, 34988, 35029, 35465, 35565, 35709, 35861, 35947, 36553, 36621, 36915, 36935, 36985, 37057, 37287, 37434, 37578, 37669, 37933, 38064, 38334, 38408, 38628, 38705, 38928, 39044, 39147, 39239, 39275, 39341, 39496, 39533, 39728, 39729, 39739, 39754, 40010, 40191, 40229, 40231, 40234, 40274, 40440, 40466, 40518, 40556], "x\u012Bn": [20477, 22138, 22945, 23324, 24286, 24515, 24516, 24571, 24798, 26032, 26133, 26490, 27427, 27462, 28824, 30458, 34218, 35362, 36763, 37028, 37386, 37573, 37995, 38156, 39336, 39339], "h\u01D4 ch\xED": [20479], "ji\xF9": [20483, 20710, 21267, 21275, 21302, 21417, 21646, 23601, 24260, 24271, 24272, 24934, 25412, 25937, 26087, 26601, 26622, 26709, 27405, 27559, 30106, 33276, 33285, 33290, 39910, 40434, 40555, 40596, 40808], "y\xE1o": [20484, 20636, 21954, 22426, 22575, 23002, 23217, 23591, 23597, 23779, 23970, 23972, 24493, 25594, 25622, 25671, 25727, 26266, 27043, 28391, 28881, 29243, 29498, 29671, 29796, 29814, 30936, 31377, 31407, 31408, 32948, 34344, 35616, 35617, 35875, 36602, 36730, 36953, 36965, 37006, 39012, 39099, 39126, 39174, 39194, 39977, 40025, 40144], "cu\xEC z\xFA": [20485], "li\u01CEng li\u01CE": [20486], "w\u01CEn": [20487, 21773, 23113, 24779, 25405, 26202, 26213, 26217, 26236, 26778, 26880, 29740, 30073, 30358, 30412, 30871, 32169, 32176, 32510, 33048, 33814, 36384, 36627, 37588], "z\u01D2ng": [20490, 20588, 20655, 23928, 24635, 24803, 25460, 25603, 25696, 29162, 32207, 32235, 32258, 32317, 34007], "gu\u0101n": [20492, 20851, 23448, 26874, 30237, 30287, 31396, 33924, 38306, 38359, 38364, 39973, 40030, 40143], "ti\u01CEn": [20494, 21818, 24541, 24767, 26218, 27524, 28127, 30547, 33094, 33300, 35237, 35277, 36063, 37674, 39170], "m\xE9n": [20497, 25194, 25451, 29834, 33755, 34379, 37702, 38036, 38272, 38277, 38376], "d\u01CEo d\xE0o": [20498], "t\xE1n t\xE0n": [20499, 22510], "ju\xE8 ju\xE9": [20500], "chu\xED": [20501, 22402, 22464, 25462, 25637, 26712, 26864, 27084, 31648, 33092, 33753, 37656, 37786, 38180, 38514, 38976], "x\xECng": [20502, 22995, 23134, 23353, 24184, 24615, 24763, 26447, 28076, 32200, 33238, 33607, 33685, 33877], "p\xE9ng": [20503, 20656, 22620, 22643, 24376, 24969, 25408, 26379, 26842, 26902, 27173, 30844, 31261, 31484, 31735, 32388, 33192, 33411, 34028, 34325, 34778, 34779, 34998, 36643, 37643, 37981, 38904, 38908, 39471, 39676, 39685, 39700, 40300, 40527], "t\u01CEng ch\xE1ng": [20504], "h\xF2u": [20505, 21402, 21518, 22421, 22560, 24460, 27913, 33577, 35934, 36869, 37064, 39836, 40031, 40078, 40088], "t\xEC": [20508, 21059, 22159, 22164, 23625, 23644, 24716, 24720, 24789, 24790, 25147, 25510, 26367, 26385, 27474, 27554, 28053, 29899, 31545, 31818, 34201, 35077, 36886, 36919, 39664, 39680, 39684], "g\xE0n": [20509, 20942, 24185, 27046, 27274, 28134, 28776, 30448, 32058, 32448, 35404, 36113, 36195, 39597], "li\xE0ng j\xECng": [20510, 38739], "su\u012B": [20512, 21752, 22794, 28374, 28617, 30509, 30562, 33429, 33661, 33662, 34429, 38614, 38806], "ch\xE0ng ch\u0101ng": [20513], "ji\xE9": [20514, 20604, 20625, 21030, 21031, 21052, 21163, 21180, 21353, 21354, 23125, 23211, 23377, 23690, 23848, 23909, 23995, 24e3, 24175, 25130, 25463, 25526, 25838, 26117, 26466, 26480, 26688, 26717, 26988, 26998, 27044, 27905, 28368, 28500, 29412, 30571, 30989, 31469, 31680, 32687, 33709, 34037, 34531, 34576, 34840, 34846, 34877, 34929, 35002, 35344, 35440, 35505, 35750, 36373, 36860, 37475, 37755, 38268, 38945, 39834, 40082], "k\u01D2ng k\u014Dng": [20517], "ju\xE0n": [20518, 21173, 22854, 24955, 26698, 28099, 29431, 29543, 30519, 30538, 30560, 32109, 32121, 32482, 32613, 32642, 33091, 34088, 37124, 39179], "z\u014Dng": [20519, 22571, 23447, 23887, 23893, 24830, 26401, 26837, 26934, 29095, 29475, 30955, 32195, 32746, 33113, 33916, 34668, 35957, 36392, 36394, 36452, 37712, 37953, 39436, 39459, 39572, 39683, 39689, 39735, 39918, 39932], "n\xED": [20522, 22381, 22527, 23612, 23636, 24617, 28131, 29450, 31870, 32867, 34477, 34618, 35308, 35982, 36316, 36631, 37107, 37422, 38092, 38675, 39324, 39906, 40117, 40593, 40815], "zhu\u014D": [20524, 25305, 25417, 26700, 26802, 26817, 26867, 27093, 28095, 31399, 37935], "w\u014D w\u0113i": [20525], "lu\u01D2": [20526, 21062, 26346, 30256, 30323, 33245, 33999, 34819, 35064, 36534], "s\u014Dng": [20527, 20935, 23040, 23847, 23913, 24250, 25021, 26494, 26496, 26537, 26583, 26789, 27303, 28126, 28621, 30841, 33752, 39686], "l\xE8ng": [20528, 22542, 24867, 30550, 36380], "z\xEC": [20531, 21082, 23383, 24675, 28173, 28460, 29304, 30501, 30502, 32980, 33022, 33258, 33569, 33634], "b\xE8n": [20532, 22348, 25465, 25770, 28160, 31528, 36905], "c\u01CEi": [20536, 21835, 23111, 24425, 25505, 26828, 27613, 30572, 32181, 36340, 36393], "zh\xE0i": [20538, 20661, 23528, 30261, 30758], "y\u0113": [20539, 21524, 22094, 25832, 26253, 26928, 27467, 28529, 34862], "sh\xE0": [20541, 21820, 21922, 27459, 31633, 32732, 32739, 33808, 38319, 38670], "q\u012Bng": [20542, 20670, 21375, 22282, 23496, 27682, 27691, 28152, 28165, 34619, 36605, 36629, 36731, 37100, 37638, 37963, 38737, 38738, 39894], "y\u012Bng": [20544, 22052, 22111, 22198, 23156, 23190, 23240, 23344, 23366, 23422, 24869, 25732, 25878, 26400, 26716, 27185, 27387, 28214, 29008, 29681, 29787, 29838, 29908, 29959, 29974, 30884, 31023, 32211, 32403, 32492, 32552, 32578, 32579, 32588, 33210, 33521, 33722, 34337, 34663, 34867, 35118, 35707, 36047, 36552, 37965, 38195, 38681, 38906, 40236, 40337, 40359, 40367, 40426, 40441, 40462, 40474, 40550, 40560], "ch\u0113ng ch\xE8n": [20545, 29231], "ru\u01CEn": [20548, 26378, 29772, 29888, 30877, 31005, 33117, 36575, 36653, 36719, 38446], "zh\xF2ng t\xF3ng": [20549], "ch\u01D4n": [20550, 24823, 30582, 33846, 34850, 36080], "ji\u01CE ji\xE0": [20551], "j\xEC ji\xE9": [20552], "b\u01D0ng b\xECng": [20555], "ru\xF2": [20556, 21458, 23926, 24369, 26953, 28971, 29191, 31660, 31707, 33979, 37120, 39961, 39983, 40376], "t\xED": [20557, 21399, 21884, 21953, 23865, 28477, 29765, 30588, 31157, 31242, 32249, 32519, 32612, 34139, 35078, 35605, 36263, 36420, 36431, 37261, 37719, 38988, 39064, 39456, 39863, 39927, 40128, 40284, 40420, 40520], "w\u0113i": [20558, 21361, 21940, 23041, 23193, 23990, 24013, 24494, 24836, 25547, 25595, 26931, 26994, 28326, 28883, 29032, 29168, 30291, 32261, 33896, 33907, 34183, 34610, 34651, 35235, 35444, 36918, 38535, 38536, 38714, 39939, 39940, 40130], "pi\u0101n": [20559, 22248, 23205, 26948, 29327, 31687, 32745, 37698], "y\xE0n": [20560, 21388, 21421, 21761, 21933, 22152, 22181, 22576, 22943, 23026, 23306, 23359, 23476, 24421, 24422, 25957, 26191, 26277, 26325, 26339, 28383, 28750, 28756, 28775, 28777, 28948, 28976, 28977, 29078, 29124, 29290, 29458, 30746, 30831, 33395, 33398, 33399, 35214, 35267, 35326, 35578, 35724, 35742, 35866, 35891, 35923, 35924, 36107, 36119, 36189, 36549, 37184, 37245, 37308, 37317, 38593, 39181, 39260, 39440, 39443, 39476, 39511, 39520, 39564, 39731, 40171, 40200, 40243, 40387, 40432, 40798], "t\u01CEng d\xE0ng": [20562], "\xE8": [20564, 21262, 21374, 21380, 21597, 21666, 22121, 22441, 22538, 22574, 23691, 23871, 24261, 24746, 24853, 25145, 25212, 25636, 25657, 25820, 27374, 27486, 27514, 28226, 29735, 30728, 30736, 30790, 33133, 33482, 33852, 34138, 34437, 34625, 35240, 35556, 35725, 35860, 35935, 36571, 36598, 36717, 36940, 36943, 36987, 37122, 37418, 37716, 37993, 38199, 38440, 38456, 38942, 38990, 39066, 39187, 39209, 39295, 39952, 39978, 40055, 40132, 40346, 40535, 40771, 40822], "xi\xE9": [20565, 21232, 21327, 21332, 21963, 22437, 22858, 24650, 24886, 25337, 25658, 25783, 25813, 25847, 25884, 26012, 26090, 29057, 29170, 32138, 32243, 32256, 32556, 32723, 32961, 33029, 33031, 33035, 33166, 34658, 34938, 35181, 35559, 35735, 35856, 38795, 38837, 40868], "ch\u011B": [20566, 25199, 25766], "sh\u011Bng": [20567, 28219, 30490], "ch\u0101": [20571, 21967, 25184, 25407, 25554, 25591, 30080, 33279, 33366, 37535, 37732, 38200, 39223], "hu\xE1ng": [20575, 20976, 21924, 22573, 22708, 23187, 23858, 24488, 24822, 27003, 28255, 29004, 29530, 29789, 29852, 30272, 30343, 30970, 31316, 31681, 31783, 33358, 33887, 34647, 34789, 35579, 36266, 36945, 37728, 37892, 38205, 38541, 38905, 39213, 39452, 39945, 40017, 40135, 40428, 40643, 40644], "y\u01CEo": [20576, 21676, 23161, 23438, 23686, 26483, 26620, 27034, 28308, 29397, 31365, 31368, 33280, 33517, 38340, 39445, 40405, 40809], "ch\u01D2u qi\xE0o": [20578], "y\xF3u": [20580, 23588, 24238, 24611, 27787, 27833, 27999, 28216, 29369, 29494, 29495, 30001, 30115, 31198, 32940, 33692, 33720, 34133, 34480, 34659, 35367, 36623, 36662, 36912, 36938, 37038, 37109, 37438, 38080, 39360, 39799, 39819, 40063, 40073], "x\u016B": [20582, 22687, 23213, 23299, 26952, 27432, 27476, 29176, 30110, 30449, 32135, 32259, 32379, 32997, 34150, 34391, 34394, 34395, 34641, 35015, 35343, 35377, 35549, 35651, 35870, 37968, 38656, 38920, 39035, 39036, 39497, 39706, 39750, 39766], "zh\u0101": [20583, 21747, 25263, 25363, 25592, 25699, 27165, 28195, 30390, 35312, 35655, 40772, 40775], "c\u012B": [20584, 30133, 34816, 36224, 39604, 39626, 40825], "b\u012B": [20586, 23620, 26949, 27636, 35917, 36924, 39951, 40126, 40278], "x\xFAn": [20593, 22106, 23547, 23563, 23755, 24033, 24309, 24490, 24642, 25559, 25907, 26092, 26442, 26642, 26730, 27187, 27957, 27988, 28527, 29125, 29142, 29667, 29845, 30019, 32003, 33600, 34803, 35426, 35810, 37161, 40015, 40024, 40095], "c\u0101i s\u012B": [20594], "du\u0101n": [20595, 23183, 31471, 35085, 37748], "\u01D2u": [20598, 21528, 22036, 32806, 33122, 34117, 34261], "t\u014Du": [20599, 20600, 37742], "z\xE1n z\xE1 z\u01CE": [20602], "l\u01DA l\xF3u": [20603, 20674], "f\xE8n": [20606, 20712, 22859, 22894, 24325, 24575, 24868, 24996, 28725, 30611, 31182, 31914, 31966, 33209, 40029, 40124], "ku\u01D0 gu\u012B": [20608], "s\u01D2u": [20609, 21468, 21471, 22014, 27362, 30605, 34222, 34282], "zh\xEC s\u012B t\xED": [20610], "s\xF9": [20611, 20723, 21961, 22608, 22609, 22809, 23242, 24875, 24991, 27041, 27150, 27157, 27536, 27869, 28049, 28335, 28344, 28506, 28517, 29578, 29663, 29851, 31756, 31899, 31903, 32032, 32292, 32899, 32901, 33158, 34060, 34263, 35307, 35380, 35606, 35785, 35873, 36250, 36444, 36895, 36961, 36972, 37577, 39191, 39500, 39573, 40016, 40427, 40532], "xi\u0101": [20612, 28998, 30606, 35898, 39084, 39957], "yu\xE0n yu\xE1n": [20614, 23195], "r\u01D2ng": [20615, 20887, 23426, 27652, 36597], "n\xF9": [20617, 24594], "y\xF9n": [20618, 23381, 24701, 24818, 24864, 24909, 26527, 33130, 34164, 34176, 34292, 34314, 35102, 35999, 36816, 36939, 37075, 37126, 37213, 37270, 37278, 38871, 38878, 38901, 38907, 39211], "g\xF2u ji\u01CEng": [20619], "m\xE0": [20620, 22044, 27050, 30576, 31043, 31137, 32629, 38273, 39393, 39554, 39701], "b\xE0ng": [20621, 22621, 26834, 29604, 31254, 33365, 33953, 34607, 35607, 35876, 37770, 38225], "di\u0101n": [20622, 21415, 23918, 24005, 24019, 24020, 25474, 25895, 25921, 27079, 28359, 30315, 30322, 36430, 39002, 39003, 39072, 40827], "t\xE1ng": [20623, 21776, 21882, 22371, 22530, 22616, 25642, 26848, 27062, 28303, 28447, 29051, 29805, 30916, 31135, 31702, 31939, 31958, 31963, 33157, 33179, 33998, 34711, 34739, 36207, 36412, 37132, 37283, 37781, 38554, 39225, 39236, 40374], "h\xE0o": [20624, 21728, 24655, 26122, 26150, 26215, 26272, 26276, 26285, 26317, 28009, 28111, 28564, 28751, 28765, 30355, 30364, 30366, 30369, 30373, 32791, 32853, 34179, 34399, 37143, 39013, 39074, 39965], "x\u012B x\xEC": [20626], "sh\u0101n": [20627, 21024, 21034, 21116, 22328, 23665, 25403, 25639, 26613, 27270, 28536, 28568, 29053, 29414, 29642, 31512, 32319, 32692, 32694, 33056, 33314, 33439, 34923, 36314, 36565, 37014, 38282, 39877], "qi\xE0n ji\u0101n": [20628], "qu\xE8 ju\xE9": [20629, 22470], "c\u0101ng chen": [20630], "r\xF3ng": [20635, 23222, 23238, 23339, 23481, 23797, 23896, 23992, 25102, 25608, 26343, 26628, 27029, 27054, 27061, 27623, 28342, 28700, 28927, 29076, 29416, 29794, 31297, 32104, 32466, 32674, 32924, 33561, 33592, 33635, 33993, 34686, 34701, 34702, 34833, 35107, 37780, 38229, 39397], "t\xE0 t\xE0n": [20637], "su\u014D": [20638, 21766, 21965, 21990, 23057, 25677, 26731, 26797, 30531, 31761, 31764, 32679, 33679, 34001, 36246, 39867], "d\u01CEi": [20643, 27513], "z\xE0i": [20644, 20750, 20877, 22312, 25175, 27909, 36617, 37224], "g\u01D4": [20646, 21476, 21842, 23603, 24882, 27030, 27070, 27753, 28104, 28658, 28692, 29295, 30391, 30396, 30444, 30653, 31296, 32607, 32662, 32929, 33077, 33228, 34211, 34506, 34865, 35393, 35778, 36674, 36903, 37431, 38068, 39222, 39305, 40723, 40724], "b\u012Bn": [20647, 23486, 24428, 25996, 26901, 28392, 28626, 28657, 28661, 28693, 32381, 32548, 34408, 35945, 35955, 36051, 36052, 37024, 37964, 38228, 38694, 39022], "ch\u01D4": [20648, 20786, 26485, 26904, 26970, 26990, 27290, 28619, 29876, 30784, 30990, 31111, 34389, 40813, 40828], "nu\xF3": [20649, 20794, 25386, 26779, 27232], "c\u0101n c\xE0n": [20650], "l\u011Bi": [20651, 20769, 21437, 22418, 22593, 22744, 22760, 27344, 28741, 30295, 30667, 30922, 31016, 32786, 34124, 34174, 34271, 34365, 34845, 35460, 35716, 35796, 38008, 40467], "cu\u012B": [20652, 20951, 22676, 23828, 23903, 24923, 25703, 27057, 29525, 30954, 37849], "y\u014Dng": [20653, 21960, 22665, 22725, 23262, 24248, 24305, 24949, 25317, 25793, 28413, 28745, 29253, 30152, 30293, 30320, 33219, 37013, 37114, 37144, 37854, 38235, 38605, 38621, 39252, 40005, 40153, 40411], "z\u0101o c\xE1o": [20654], "s\u01D2ng": [20657, 23927, 24578, 24730, 24879, 24939, 31462, 32824, 32883, 39415], "\xE0o": [20658, 22387, 22407, 22714, 22881, 23279, 23705, 23728, 23988, 25034, 25817, 28595, 37834, 39489, 39580], "q\u012B c\xF2u": [20662], "chu\u01CEng": [20664, 30946, 38358, 38383], "sh\u01CE": [20667, 20749], "h\xE0n": [20668, 22462, 24717, 25022, 25182, 25421, 25750, 25788, 26097, 26200, 26293, 27721, 28038, 28450, 28698, 28938, 29442, 30356, 30533, 32752, 33695, 33761, 34559, 34605, 34706, 35648, 36634, 37356, 37554, 37582, 38615, 38967, 38980, 39060, 39419, 40382], "zh\u0101ng": [20669, 23260, 24352, 24373, 24432, 24926, 26290, 27167, 28467, 29520, 29835, 31456, 31931, 34049, 34769, 36967, 37155, 37873, 39206, 39487, 40006, 40606], "y\u0101n y\xE0n": [20671, 22677, 23342], "pi\xE0o bi\u0101o": [20676, 39584], "li\xE0n": [20678, 22556, 23201, 24651, 25088, 26973, 27539, 27566, 28229, 28491, 28592, 28722, 28860, 29001, 29779, 32244, 32414, 32451, 33840, 37676, 37706, 37832, 38142, 39946], "m\xE0n": [20680, 22657, 24148, 24930, 26364, 28459, 28599, 29107, 29516, 32309, 32550, 34052, 34352, 37156, 37853, 38232], "t\xE0n t\u01CEn": [20683], "y\xEDng": [20684, 21942, 22603, 23348, 25869, 27001, 27391, 28289, 28299, 28386, 28486, 28633, 28634, 28660, 28677, 28699, 28704, 28719, 28752, 28764, 29074, 29151, 29801, 30401, 30408, 31132, 31837, 31855, 32264, 33556, 33639, 33721, 33828, 33829, 33830, 33854, 34021, 34240, 34509, 34631, 34687, 34722, 34821, 35597, 36111, 36194, 36814, 37795], "d\xF2ng": [20685, 20923, 20941, 21160, 21205, 23003, 25113, 25359, 26635, 26847, 28265, 30800, 33e3, 33012, 33110, 36853, 38680, 39399], "zhu\xE0n": [20686, 21869, 22208, 22559, 25776, 28791, 29777, 31686, 33118, 33923, 35144, 35668, 39244, 39316], "xi\xE0ng": [20687, 21224, 21521, 22190, 23008, 23953, 26319, 27233, 29670, 32575, 34771, 34902, 35152, 35937, 37900, 38917, 39033, 40012], "sh\xE0n": [20688, 21892, 22688, 22689, 23319, 25797, 25982, 26923, 27199, 27482, 27733, 28759, 30109, 30960, 32341, 32558, 33203, 34798, 34810, 35349, 35590, 35697, 35754, 36109, 36193, 36216, 37167, 37925, 39245, 39480, 39583, 40019, 40020, 40157], "tu\xED tu\u01D0": [20691], "z\u01D4n": [20692, 22082, 25753, 35664], "p\xFA": [20693, 21261, 22308, 22691, 28654, 29531, 29854, 30632, 31321, 33670, 33744, 33769, 33889, 33969, 33970, 36108, 37242, 37879, 38244], "l\xE1o": [20695, 21171, 21172, 21214, 21744, 23810, 23959, 24997, 26405, 28022, 29282, 30184, 30278, 31362, 31785, 37290, 37906, 38137, 39007, 39645], "ch\u01CEng": [20696, 21424, 24288, 25950, 26166, 27653, 37625], "gu\u0101ng": [20697, 20809, 21667, 22425, 23023, 27960, 28782, 28823, 28826, 28827, 28897, 29654, 33009, 33578, 36612, 37543, 40646], "li\xE1o": [20698, 22073, 23293, 23525, 23534, 23582, 23658, 23930, 23962, 23963, 24299, 24960, 25977, 26296, 27217, 29536, 29849, 30103, 30274, 31426, 31773, 32346, 32557, 32842, 33163, 33195, 34260, 34783, 35906, 36095, 36440, 36797, 36988, 39113, 39630, 40431, 40553], "d\xE8ng": [20700, 20979, 22705, 23965, 27336, 30634, 30964, 35252, 37011, 37159, 38565], "ch\xE1n zh\xE0n zhu\xE0n": [20701], "b\u014D": [20704, 23955, 25320, 25765, 25773, 27874, 28298, 29627, 30326, 30411, 30773, 30854, 31009, 32573, 33760, 34992, 36467, 37474, 38069, 39185, 39293, 39499, 40013], "hu\xEC": [20705, 21295, 21321, 21913, 22034, 22166, 22298, 23314, 23533, 23670, 23671, 24407, 24409, 24410, 24507, 24666, 24693, 24800, 24935, 24979, 25075, 26214, 26291, 27109, 27230, 27269, 27352, 27719, 27851, 28377, 28499, 28905, 29172, 29545, 29860, 30650, 30794, 31229, 31330, 31730, 32117, 32362, 32472, 32729, 32765, 33631, 34087, 34137, 34184, 34185, 34794, 35439, 35496, 35569, 35667, 35711, 35763, 35826, 36036, 36159, 37932, 38368, 38419, 38759, 38958, 39018, 39058, 39215], "chu\u01CEn": [20706, 21912, 33307, 33608, 36403], "ti\u011B ji\xE0n": [20707], "s\u0113ng": [20711, 39705], "xi\xE0n": [20713, 20724, 21743, 22455, 22634, 23021, 23050, 23466, 23704, 23796, 25010, 25738, 26203, 27212, 27258, 28032, 28695, 29486, 29563, 29616, 29694, 30476, 30541, 31919, 31982, 32100, 32171, 32218, 32447, 32528, 32673, 32680, 33146, 33236, 33277, 33483, 33703, 35490, 35919, 37607, 37646, 38480, 38501, 38519, 38704, 39201, 39301, 40626, 40760], "y\xF9 j\xFA": [20714], "\xE8 w\u016B": [20715], "t\xF3ng zhu\xE0ng": [20718], "l\u01D0n": [20719, 20955, 20956, 24297, 24298, 25037, 25044, 25755, 27265, 27305, 28575, 30299, 30301], "g\xF9": [20721, 20933, 22266, 22540, 23827, 23854, 25925, 26767, 26845, 29311, 30204, 31099, 37678, 38178, 38599, 39015, 39038, 39901, 40116], "ji\u0101ng": [20725, 22723, 23004, 27263, 27565, 27743, 30037, 30085, 30995, 32366, 32560, 32734, 33587, 33857, 34193, 34688, 34751, 35911, 38849, 40002, 40137], "m\u01D0n": [20726, 20922, 21025, 21188, 24751, 24829, 24845, 24924, 25003, 25279, 25923, 25935, 25967, 27887, 28515, 30399, 31522, 31549, 31778, 34848, 38292, 38313, 38389, 38397, 39989, 40152, 40701], "j\xECn": [20728, 20954, 22116, 22157, 22672, 22743, 22935, 23335, 25634, 26185, 26187, 26499, 27555, 27989, 28024, 28301, 28613, 28636, 28908, 29025, 29180, 29710, 29800, 29878, 30433, 31090, 32265, 32537, 33641, 34254, 35250, 35280, 36078, 36112, 36166, 36817, 36827, 36914, 38771, 40829], "ji\xE0 jie": [20729], "qi\xE0o": [20730, 23789, 24105, 25772, 27579, 31373, 31429, 35482, 35822, 36488, 38487, 38825, 38866, 39642], "p\xEC": [20731, 23218, 23251, 23617, 28604, 29971, 30088, 35692, 38370, 40447, 40458], "s\xE0i": [20735, 31802, 36093, 36187], "ch\xE1n t\u01CEn sh\xE0n": [20739], "d\u0101ng d\xE0ng": [20741, 24403, 38371], "xu\u0101n": [20743, 21927, 22599, 23191, 23459, 24835, 24843, 25550, 26125, 26244, 29002, 29014, 29764, 30587, 30670, 31140, 31662, 32743, 32766, 33841, 33842, 34002, 34175, 34300, 34320, 34646, 34825, 35552, 35580, 35678, 35862, 36562, 36713, 37753, 39421, 39962], "d\u0101n d\xE0n": [20747, 25812, 30213], "c\xE0n": [20751, 28591, 28799, 29158, 29864, 31922, 34194, 35634], "b\u012Bn b\xECn": [20752], "\xE1n \xE0n": [20753], "t\xE1i": [20755, 22382, 23343, 25260, 25825, 27311, 28849, 28850, 31817, 33274, 34233, 36294, 37040, 39089, 39824, 40080], "l\xE1n": [20758, 20848, 22226, 23146, 23706, 23888, 24177, 25318, 25876, 26003, 26005, 26639, 27396, 27415, 28572, 28734, 28742, 28769, 29155, 29175, 29884, 31726, 31811, 31843, 32383, 33915, 34013, 34253, 34347, 34349, 35124, 35157, 35172, 35188, 35197, 35659, 35733, 35888, 36509, 37997, 38247, 38348, 38417, 38858], "n\u01D0 y\xEC \xE0i y\xED": [20759], "m\xE9ng": [20762, 24170, 26330, 26406, 27223, 27308, 27659, 28309, 28635, 29965, 30015, 30431, 31006, 33384, 33684, 33804, 34116, 34427, 34673, 37171, 37176, 38719, 38720, 39021, 39259, 39885, 40463, 40562], "n\xEDng": [20764, 20957, 21659, 22144, 23331, 26592, 27235, 27320, 29406, 29552, 32845, 32889, 34228, 37967, 39713, 40459], "qi\xF3ng": [20765, 21357, 23430, 24824, 24972, 26703, 27241, 28970, 28973, 29026, 29069, 29756, 29898, 30552, 31351, 31353, 31406, 31430, 31547, 31559, 33340, 33557, 34257, 34285, 34537, 34540, 36217, 36331, 37019, 37518], "li\xE8": [20768, 20925, 21015, 21155, 21181, 22482, 22483, 23028, 23771, 24036, 25362, 25449, 26677, 27916, 27990, 28872, 28910, 29037, 29347, 29454, 29471, 29557, 32855, 33055, 33570, 34522, 36244, 36496, 36862, 39090, 39707, 39715, 39844, 40050, 40247], "ku\u01CEng": [20771, 22844, 25069], "b\xE0o": [20772, 21245, 22577, 24513, 25253, 25265, 26323, 29190, 29350, 33762, 34403, 34475, 35961, 37451, 37988, 38087, 39602, 39665, 39825, 40077], "bi\u0101o": [20774, 22658, 24150, 24426, 26631, 27161, 28398, 28684, 29083, 29186, 29451, 30253, 30950, 33176, 33237, 35620, 36102, 37858, 37987, 38230, 38259, 39086, 39095, 39110, 39111, 39112, 39114, 39121, 39129, 39130, 39531, 39561, 39647], "z\u01CEn": [20775, 20793, 22086, 25861, 26141, 36273, 36274], "h\xE1o": [20779, 21989, 22071, 22097, 22158, 22741, 26883, 27612, 27627, 28640, 29510, 29524, 31443, 31815, 34461, 34836, 35705, 35946], "q\xECng": [20780, 20938, 24198, 24950, 27366, 28650, 30851, 30956, 32580, 38744], "ch\xE8n": [20781, 22187, 27015, 27372, 30114, 34924, 35183, 35734, 35894, 36225, 36226, 40787, 40788, 40832], "t\xE9ng": [20783, 24144, 28373, 28443, 30140, 31824, 31832, 32290, 33150, 34276, 34373, 34723, 35466, 35588, 36998, 39398, 39472, 39523, 39975], "l\u01D2ng l\xF3ng l\xF2ng": [20785], "ch\xE1n ch\xE0n": [20787], "r\xE1ng xi\u0101ng": [20788, 21239], "hu\xEC xi\xE9": [20790], "lu\xF3": [20792, 25886, 26916, 27407, 29473, 29568, 31657, 31854, 32599, 32645, 33078, 33121, 33821, 34367, 34746, 35260, 36923, 37007, 37837, 38012, 38179, 38233, 39264, 39486, 39512, 39585, 40449], "l\xE9i": [20797, 23256, 27281, 27417, 29891, 30078, 32306, 32397, 32413, 32551, 32589, 32696, 34050, 34354, 34374, 36704, 37939, 37976, 38253, 38647, 38721, 40041, 40762], "n\xE0ng n\u0101ng": [20798], "w\xF9 w\u016B": [20800], "y\u01D4n": [20801, 21911, 22845, 25230, 27538, 27550, 29377, 30930, 33658, 36081, 37399, 38445, 38504, 38549, 38691, 39355, 40811, 40819], "z\u0101n": [20802, 27253, 31786, 31790, 31948, 37909, 37919, 40292], "yu\xE1n": [20803, 20870, 21407, 21409, 21429, 22253, 22278, 22286, 22290, 22291, 22435, 22636, 23220, 23236, 25588, 27038, 27052, 27260, 27358, 27781, 28274, 28304, 28306, 29232, 29480, 29503, 31502, 32227, 32257, 32536, 32689, 33554, 34199, 34653, 34671, 34696, 34945, 35108, 35612, 36677, 36757, 37005, 37031, 37211, 37416, 37809, 39477, 39789, 40354, 40368, 40703, 40715], "xi\u014Dng": [20804, 20807, 20982, 21250, 21256, 21701, 24567, 24671, 27769, 27958, 33015, 33016, 33422, 35369, 35454, 35771], "ch\u014Dng": [20805, 22019, 24545, 24963, 24999, 25679, 27798, 28026, 29675, 32639, 32704, 33282, 33375, 33594, 34909, 36438], "zh\xE0o": [20806, 22423, 26064, 26316, 26523, 27330, 29031, 29171, 29411, 30654, 31498, 32576, 32617, 32644, 32897, 32903, 32904, 35412, 35791, 36213, 36249, 39841], "du\xEC ru\xEC yu\xE8": [20810, 20812, 20817], "k\xE8": [20811, 21051, 21184, 21194, 22529, 23060, 23458, 24682, 24857, 27690, 28312, 30886, 32217, 32514, 33360, 34889, 35506, 35838, 37633, 38174, 39437, 39570], "t\xF9": [20814, 20820, 22541, 36812, 40309], "d\u01CEng": [20826, 25897, 27411, 35681, 35740, 35872, 40680], "d\u014Du": [20828, 20832, 21783, 27255, 31740, 34104], "hu\u01CEng": [20836, 22875, 24140, 24627, 24653, 26180, 28862, 29056, 32296, 35428, 35594, 35854], "r\xF9": [20837, 21973, 23223, 25174, 26433, 27955, 28349, 32287, 32539, 34e3, 35109, 40176], "n\xE8i": [20839, 27677, 27678, 37655], "y\xFA sh\xF9": [20842], "li\xF9 l\xF9": [20845], han: [20847, 29235], "ti\u0101n": [20850, 22825, 23126, 28155, 37215, 38740, 38749, 40647], "x\u012Bng x\xECng": [20852], "di\u01CEn": [20856, 22200, 22860, 23152, 25951, 26915, 28857, 30872, 33959, 34119, 36398, 40670], "z\u012B c\xED": [20857], "ji\u0101n": [20860, 20927, 22223, 22362, 22533, 22904, 23014, 23015, 23574, 24181, 24804, 25099, 25108, 25627, 26942, 27179, 27388, 27516, 27569, 27570, 28244, 28688, 28728, 29006, 29086, 29112, 29259, 29770, 30583, 31003, 31031, 31546, 31627, 32216, 32273, 32516, 32547, 32937, 33392, 33393, 33733, 33786, 33868, 33977, 34090, 34129, 34163, 34371, 35708, 35932, 37999, 38595, 38831, 38848, 38857, 39216, 39330, 39956, 39964, 39993, 40099, 40146, 40273, 40307, 40380, 40547, 40585], "sh\xF2u": [20861, 21463, 21806, 22781, 22784, 23551, 25480, 29417, 29539, 29560, 30185, 30246, 32172, 32502, 33156], "j\xEC": [20862, 20864, 21058, 21092, 21137, 21219, 22358, 22413, 22600, 22931, 23395, 23490, 23492, 24301, 24401, 24475, 24524, 24760, 24782, 25083, 25216, 26081, 26082, 26083, 26280, 26281, 26305, 26782, 27285, 27317, 27918, 28419, 28424, 28721, 30197, 30304, 31133, 31273, 31287, 31300, 31306, 31335, 32e3, 32153, 32318, 32331, 32380, 32487, 32489, 32637, 33262, 33456, 33549, 33572, 33898, 34015, 34055, 34186, 34318, 34350, 34363, 35034, 35136, 35244, 35274, 35336, 35352, 35467, 35745, 35760, 36321, 36349, 36447, 36857, 38469, 38555, 38657, 38717, 39525, 39589, 39675, 39742, 39773, 39781, 39898, 39933, 39990, 39999, 4e4, 40045, 40090, 40107, 40267, 40401, 40780], "ji\u014Dng": [20866, 20875, 22384, 22491, 25155, 34319, 34324, 39369, 39403], "m\xE0o": [20867, 20880, 23202, 24125, 24855, 25035, 26259, 26581, 26969, 27639, 29761, 30339, 30474, 30592, 32772, 33538, 33850, 34640, 34980, 35218, 35980, 36031, 36152, 37146, 37166], "r\u01CEn": [20868, 20873, 22988, 23203, 26579, 29635, 33490, 33925], "n\xE8i n\xE0": [20869], "g\u0101ng": [20872, 20910, 21018, 21083, 22536, 22589, 23713, 25478, 25667, 26849, 29288, 29317, 30104, 32177, 32434, 32568, 32577, 32609, 32923, 37357, 37792], "c\xE8": [20874, 20876, 21397, 21408, 22824, 24257, 24699, 24827, 24993, 25927, 27979, 28204, 31527, 31574, 31582, 31604, 31651, 33629, 33815, 33844, 34011], "gu\u01CE": [20878, 21072, 21102, 21479, 23521], "m\xE0o m\xF2": [20882], "g\xF2u": [20883, 21826, 22392, 22434, 22815, 22816, 23230, 24384, 25606, 25728, 26500, 27083, 29049, 35247, 35279, 35389, 35436, 35807, 36092, 36141, 36952, 38602], "x\u01D4": [20884, 21923, 26250, 26665, 29661, 30440, 31944, 35425, 35583, 35817, 37158, 37265], "m\xEC": [20886, 20906, 22055, 22611, 23483, 23494, 23770, 24130, 24142, 24166, 24637, 27027, 27154, 27329, 27752, 28135, 28405, 28446, 28631, 29072, 32643, 34084, 34588, 35219, 35220, 35227, 35269, 35600, 35879, 40719], "y\xF3u y\xEDn": [20888], "xi\u011B": [20889, 20905, 34267], "j\u016Bn": [20891, 21531, 22343, 26750, 27758, 30386, 30392, 30393, 30853, 33689, 34448, 34944, 35232, 36557, 37406, 37505, 37534, 37717, 38055, 38965, 39862, 40106, 40591], "m\xED": [20894, 25823, 28720, 29218, 29461, 29564, 31074, 31152, 32315, 33982, 34252, 34346, 34364, 34990, 35448, 35598, 36855, 37274, 37310, 37311, 37316, 38270, 40461, 40586, 40587, 40603], "gu\u0101n gu\xE0n": [20896, 35212, 35251, 35264, 35266], "m\u011Bng": [20897, 21200, 25077, 25529, 29467, 29556, 33355, 34594, 34835, 37683, 38192, 39917, 40710], "zh\u01D2ng": [20898, 22618, 23600, 27505, 28996, 30215, 32959, 33131, 36405], "zu\xEC": [20899, 23989, 26220, 26368, 26668, 27100, 27271, 27276, 31101, 32074, 32618, 34142, 36768, 37204, 37243, 37257, 37642], "yu\u0101n": [20900, 21064, 22246, 23357, 23491, 26857, 28149, 28161, 28166, 28170, 28181, 28737, 30498, 32921, 33918, 33964, 34574, 34613, 39372, 40182, 40219, 40311, 40482, 40499, 40531, 40728, 40733], "m\xEDng": [20901, 21517, 26126, 26269, 26393, 27040, 27962, 28319, 29501, 30464, 30515, 30609, 33559, 34719, 35245, 35450, 37133, 37528, 38125, 40180, 40483], "k\xF2u": [20902, 21481, 23484, 23495, 25187, 25922, 28401, 31387, 31576, 31750, 34098, 34107, 37350, 40391], "t\xE0i": [20909, 22826, 22835, 24562, 24577, 24907, 27760, 27761, 27888, 28313, 32957, 33318, 37214, 37414, 38043], "f\xE9ng p\xEDng": [20911, 39342], "ch\u014Dng ch\xF2ng": [20914], "ku\xE0ng": [20917, 22329, 22745, 23730, 25068, 26103, 26175, 26336, 26694, 27841, 29196, 30486, 30518, 30719, 30783, 31014, 31340, 32075, 32086, 32394, 32425, 36026, 36150, 36582, 37021, 37178, 37489, 37595, 37979, 40651], "l\u011Bng": [20919], "p\xE0n": [20920, 21028, 21467, 27804, 27886, 28351, 28813, 29257, 30036, 30460, 34978, 35195, 35402, 37612, 38011, 38934, 40293], "f\u0101": [20921, 24386, 27831, 30330, 30332], "xi\u01CEn": [20924, 23583, 23584, 23812, 23982, 24176, 25863, 26174, 27382, 27624, 28774, 28877, 29177, 29405, 29443, 29547, 29550, 29569, 31122, 31557, 31666, 34259, 34330, 34476, 34566, 35683, 36219, 36323, 37708, 38505, 38522, 38570, 38853, 38997, 39023], "qi\xE0": [20926, 22326, 24098, 24688, 27534, 27965, 30792, 32994, 39618], "j\xECng ch\u0113ng": [20928, 20936, 28136], "s\u014Du": [20929, 21974, 24256, 24267, 25436, 25628, 25673, 28338, 29504, 33368, 33936, 34699, 37131, 37273, 37802, 38204, 39100, 39125, 39231, 39306, 39466], "m\u011Bi": [20930, 23172, 23226, 23309, 23876, 25396, 27598, 27599, 28028, 28220, 29144, 32654, 36542, 37762, 38209, 40675], "t\xFA": [20931, 22259, 22270, 22294, 22295, 22615, 23648, 23801, 23902, 24233, 24284, 24466, 24711, 25580, 28034, 30223, 31585, 33135, 33660, 33956, 36351, 36884, 37236, 37423, 37710, 39327, 39420, 40268, 40351, 40395, 40437], "zh\u01D4n": [20934, 20950, 22523, 28310], "li\xE1ng li\xE0ng": [20937, 28092, 37327], "di\u0101o": [20939, 20993, 21023, 21500, 22877, 24372, 24427, 27720, 29745, 30857, 31763, 34413, 34497, 35970, 37677, 38613, 39817, 39899, 40119, 40304, 40742], "c\xF2u": [20945, 28234, 33120, 36659, 36751], "\xE1i": [20946, 21824, 22026, 25457, 28336, 30284, 30353, 30362], "du\xF3": [20953, 21099, 22842, 22890, 30181, 36401, 37420, 37944, 38094], "d\xFA": [20959, 21301, 23355, 26911, 27357, 27568, 28060, 29261, 29272, 29322, 29346, 29420, 29544, 29892, 30398, 35067, 35501, 35712, 35743, 35908, 36117, 37654, 37983, 38855, 38883, 38885, 39475, 39633, 40681, 40695], "j\u01D0 j\u012B": [20960], "f\xE1n": [20961, 20962, 20963, 21285, 22694, 26443, 26569, 26853, 27146, 28735, 28902, 29033, 29140, 29856, 30718, 31020, 31538, 31861, 32208, 32691, 33316, 33319, 34208, 34345, 34844, 35150, 36463, 37353, 37895, 37922, 38034, 40429], "j\u016B": [20965, 21258, 23093, 23150, 23621, 23820, 25221, 25398, 25516, 26798, 26896, 27275, 27625, 27633, 27843, 28090, 29401, 29722, 30141, 30752, 32605, 33106, 33357, 34587, 35070, 35530, 36308, 36376, 36537, 38513, 38606, 38816, 38827, 39378, 39545, 39816, 40225, 40331], "ch\xF9 ch\u01D4": [20966, 22788], "zh\u01D0": [20970, 21159, 21675, 22336, 22375, 24075, 24649, 25210, 25351, 26088, 26547, 27490, 27750, 27802, 27924, 28157, 30139, 30731, 31049, 31190, 32025, 32440, 33463, 33547, 34274, 34937, 35175, 35368, 36286, 36601, 36725, 37231, 38447, 40697], "p\xEDng": [20973, 20980, 21615, 22378, 22592, 23740, 24097, 24114, 24136, 24179, 24959, 24977, 26544, 27956, 28969, 29622, 29942, 29953, 31470, 31667, 31752, 32574, 33619, 33805, 34033, 34482, 34530, 35413, 35780, 36607, 36647, 37105, 39811, 40070], "k\u01CEi": [20975, 20977, 21056, 21108, 22450, 22607, 24698, 24887, 24936, 26271, 33928, 36614, 37703, 37799, 38112, 38196, 38355, 38399, 39101], "g\u0101n": [20978, 22377, 23602, 23604, 23606, 23607, 26577, 27860, 28455, 29589, 29976, 30131, 30712, 31487, 31608, 31891, 32925, 33527, 36800, 37200, 39760], "k\u01CEn qi\u01CEn": [20981], "t\u016B": [20984, 22551, 23936, 25464, 28043, 28261, 30172, 31167, 31171, 31361, 33878, 37621, 40282, 40757], "\u0101o w\u0101": [20985], "ch\u016B": [20986, 21021, 23680, 25716, 27019, 27159, 35993, 40803], "d\xE0ng": [20988, 22325, 22449, 22731, 26723, 27284, 27705, 29847, 29949, 30442, 30602, 30720, 30893, 30993, 31772, 33633, 33770, 34153, 34351, 36260, 36927, 38652], "h\xE1n": [20989, 20990, 21547, 22277, 23074, 23506, 23841, 26199, 26770, 27995, 28085, 28559, 28947, 29696, 29981, 31592, 34604, 37015, 37039, 37601, 38867, 38889], "z\xE1o": [20991, 38015], "d\u0101o": [20992, 20994, 24521, 27672, 33312, 34729, 37334, 39771, 40061], "chu\u0101ng": [20997, 25680, 29262, 29269, 30126, 30241, 31379, 31383, 31419], "f\u0113n f\xE8n": [20998], "qi\xE8 qi\u0113": [20999], "k\u0101n": [21002, 21208, 22570, 25121, 26654, 40853, 40859], "c\u01D4n": [21004, 24534], "ch\xFA": [21005, 21416, 24174, 24282, 27249, 27337, 27365, 28353, 29331, 31720, 32801, 33467, 33954, 33965, 34573, 34805, 35936, 36238, 36464, 36487, 36501, 37455, 37604, 38148, 38500, 38607, 38619, 40373], "hu\xE0 hu\xE1": [21010], "l\xED": [21013, 21075, 21114, 21145, 21400, 21937, 22175, 22212, 23264, 23415, 24306, 24737, 26792, 26808, 26819, 28435, 28757, 29313, 29314, 29432, 29709, 29827, 29896, 30432, 30557, 31163, 31346, 31472, 31587, 31729, 31852, 31950, 32301, 32545, 32633, 33347, 33650, 33758, 34016, 34110, 34268, 34362, 34570, 34765, 34808, 34859, 35125, 35623, 35981, 37288, 37611, 37637, 37867, 37975, 38626, 39530, 39562, 39887, 39916, 40058, 40097, 40313, 40477, 40514, 40654, 40679], "yu\xE8": [21014, 23347, 23684, 23731, 23997, 24689, 24709, 24742, 25097, 25224, 25459, 26376, 27198, 28729, 29210, 29605, 31039, 31156, 31703, 31814, 31845, 31856, 31908, 31925, 34341, 34446, 34447, 35500, 36234, 36288, 36291, 36493, 36559, 37381, 37470, 38e3, 38074, 38321, 38322, 38405, 40465, 40473, 40678, 40864], "li\xFA": [21016, 21129, 22176, 23225, 23911, 26056, 26066, 27060, 27210, 27969, 27983, 28687, 29705, 29792, 29804, 29858, 30020, 30041, 30065, 30081, 30244, 30277, 30827, 33957, 33989, 34761, 35031, 37775, 37840, 37890, 38240, 39104, 39109, 39127, 39392, 39413, 39470, 39505, 39581, 39969, 40377, 40544, 40589], "z\xE9": [21017, 21063, 21863, 22038, 23271, 24123, 24152, 25246, 27149, 27509, 27810, 27854, 28333, 30367, 30612, 30688, 30987, 31654, 31744, 33332, 34102, 34828, 35159, 35630, 36094, 36188, 36846, 40453, 40794, 40816], "chu\xE0ng chu\u0101ng": [21019, 21109], "q\xF9": [21022, 21434, 21435, 38324, 38339, 38418, 40622, 40705], "bi\xE9 bi\xE8": [21029, 21035], "p\xE1o b\xE0o": [21032], "ch\u01CEn ch\xE0n": [21036, 21079, 24157], "gu\u0101": [21038, 21120, 26736, 27460, 29041, 29916, 32973, 36411, 39082, 39091, 39463, 40240, 40505], "g\u0113ng": [21039, 24218, 26921, 28013, 28991, 30026, 32090, 32686, 32697, 32789, 33774, 36065, 36179, 40330, 40530], "d\xE0o": [21040, 22133, 24764, 26913, 27300, 29182, 29913, 30423, 30428, 31282, 31291, 32411, 32767, 33364, 33791, 34908, 34911, 36551, 36947], "chu\xE0ng": [21041, 21071, 21081, 24582, 24884], "k\u016B": [21043, 21741, 22288, 22528, 26543, 26701, 30715, 31391, 36301, 37056, 39607, 39852], "du\xF2": [21044, 21057, 22703, 23598, 24816, 24988, 25349, 26711, 33333, 36325, 36346, 38474, 38479, 39167, 39283, 40317], "shu\u0101 shu\xE0": [21047], "qu\xE0n xu\xE0n": [21048], "ch\xE0 sh\u0101": [21049, 21070], "c\xEC c\u012B": [21050], "gu\xEC": [21053, 21055, 21130, 21132, 25740, 25904, 26123, 26690, 26914, 27126, 27195, 27331, 29476, 31148, 31552, 34005, 35160, 36020, 36149, 36330, 37888, 37966, 38844, 40022, 40037], "l\xF3u": [21061, 23044, 23105, 24276, 27004, 27155, 28295, 28426, 29089, 32807, 32812, 33371, 33932, 34078, 34684, 34747, 35633, 36545, 36977, 38843, 39621, 39631], "cu\xF2": [21065, 21074, 21405, 22798, 25387, 25514, 26852, 33693, 33697, 33996, 36906, 37564, 37679, 38153, 38169], "xi\u0101o xu\u0113": [21066], "k\u0113i k\xE8": [21067, 23557], "l\xE0 l\xE1": [21068], "t\u012B": [21076, 26799, 36386, 37563, 38161, 40392, 40393], "p\u014Du": [21078], "w\u0101n": [21084, 22598, 22762, 24117, 24367, 24398, 28286, 28523, 28771, 30549, 34623, 35916], "b\u0101o b\u014D": [21085, 21093], "du\u014D": [21087, 21636, 21702, 22153, 22810, 22811, 25479, 27634, 30035, 35056], "q\xEDng": [21088, 21197, 22813, 24773, 25806, 26228, 26258, 26878, 27144, 27296, 27696, 29984, 30808, 33885, 40677], "y\u01CEn sh\xE0n": [21089], "d\u016B zhu\xF3": [21090], "y\u0101n": [21094, 23267, 23846, 23958, 24697, 25045, 25064, 27182, 28106, 28153, 28473, 28895, 28937, 28945, 29017, 29658, 31734, 33005, 33241, 33784, 37154, 37251, 38329, 38409, 40683], "hu\u014D": [21096, 21136, 21529, 25865, 31220, 32800, 38186, 39454], "sh\xE8ng": [21097, 21104, 21213, 22307, 22701, 23882, 26208, 27066, 27251, 29726, 32854, 34114, 36025, 36088], "du\u0101n zh\xEC": [21100], "w\u016B": [21101, 21596, 21978, 22316, 23627, 24043, 24345, 26439, 27469, 27737, 27738, 27745, 27967, 28879, 31375, 31676, 34704, 35464, 35491, 35820, 37036, 37140, 37794, 38056, 39966, 40238], "g\u0113": [21106, 21733, 22314, 24385, 25096, 25107, 25128, 27468, 28370, 29365, 32912, 35004, 35596, 37814, 40218, 40255, 40509], "d\xE1 zh\xE1": [21107], "chu\xE1n": [21110, 26295, 26941, 31685, 33313, 33321, 33337, 36658, 36932], "tu\xE1n zhu\u0101n": [21112, 28441, 31743], "l\xF9 ji\u016B": [21113], "p\u0113ng": [21115, 21257, 22061, 24614, 24690, 25256, 26760, 28921, 30768, 36591, 39373], "pi\u0101o": [21117, 21217, 24915, 26074, 29349, 32754, 34741, 39107, 39108, 39128, 39762], "k\u014Du": [21118, 24388, 25248, 25715, 30477, 30616, 33444], "ji\u01CEo ch\u0101o": [21119, 21131, 21222, 25719], "qi\u0101o": [21121, 21226, 22685, 24167, 25970, 27207, 27587, 29126, 30807, 30973, 32337, 36268, 36343, 36365, 36474, 36475, 37115, 37153, 37157, 37739, 37740, 37936, 38201, 38941], "hu\xE1 hu\xE0": [21123], "zh\u0101 zh\xE1": [21124], "p\u012B p\u01D0": [21128, 24706], "t\u0101ng": [21135, 22049, 32688, 34202, 34666, 36442, 38842, 40734], "ch\xE1n": [21142, 22197, 22757, 23157, 23307, 24009, 24283, 26830, 27610, 28281, 28537, 28538, 28598, 28685, 28730, 29016, 29521, 30939, 32254, 32399, 32402, 32544, 33388, 34633, 34768, 34796, 34814, 35479, 35730, 35863, 36500, 37181, 37185, 37579, 38001, 38261, 39262, 39307], "zu\u0101n": [21143, 36508, 36518, 37446, 37978], "m\xF3": [21144, 23275, 23332, 23351, 23579, 25721, 25845, 27205, 31970, 33180, 34278, 34321, 35624, 35625, 35871, 39235, 39261, 39309, 39629, 39764, 39801], "zh\xFA": [21146, 26040, 26351, 27416, 28767, 28834, 28891, 29165, 29221, 30211, 31481, 31489, 31516, 33331, 33599, 34027, 34827, 34878, 36485, 36880, 36907, 38019, 40001], "qu\xE0n": [21149, 21223, 21240, 29302, 38863], "j\xECn j\xECng": [21156, 21170, 21185], "k\u0113ng": [21157, 22353, 29308, 30785, 30812, 35481, 37557, 37726, 37847, 38143, 38444], "xi\xE9 li\xE8": [21158], "zh\xF9 ch\xFA": [21161], "n\u01D4": [21162, 24361, 30766, 33004], "sh\xE0o": [21165, 21362, 21736, 28530, 32057, 32164, 32461, 34961, 37045], "mi\u01CEo": [21168, 26474, 28156, 28218, 30471, 31186, 31694, 32242, 32520, 34256, 37e3], "k\u01D2u": [21174, 21475], "w\u0101": [21176, 22380, 23090, 23207, 23666, 25366, 25896, 27964, 28315, 28453, 29950, 30038, 31349, 31370, 31402, 34521, 38856, 40707], "ku\u0101ng": [21179, 21281, 21289, 21712, 24647, 27949, 31568, 31610, 35462, 35795, 36589, 37052], "h\xE9": [21182, 21642, 21853, 22976, 23750, 25926, 26359, 26567, 26945, 27644, 27827, 28088, 28206, 28565, 29062, 30380, 30407, 30409, 30413, 30418, 31166, 31701, 31866, 31917, 32750, 33743, 33794, 35208, 35384, 35429, 37059, 37339, 37452, 37961, 38305, 38356, 38402, 38422, 38824, 38940, 39172, 39288, 39802, 40534, 40615, 40789, 40833, 40866], "g\xE0o": [21186, 21567, 21578, 23804, 31086, 31088, 31134, 31606, 35493, 35824, 37084, 37615, 38150], "b\xF3 b\xE8i": [21187], "l\xE1ng": [21190, 23247, 24266, 25999, 26745, 27028, 27139, 27444, 29436, 29701, 29807, 30816, 31234, 33350, 33992, 34571, 34690, 36532, 37074, 37086, 37571, 37807, 38162], "x\u016Bn": [21195, 21211, 21234, 21235, 22161, 22339, 22489, 22628, 22734, 22758, 26331, 29179, 29551, 30660, 32385, 33232, 34219, 34224, 34317, 37306], "ju\xE0n ju\u0101n": [21196, 29945], "l\xE8 l\u0113i": [21202], "k\xE0i": [21203, 28812, 28887, 37774], "w\u011Bng y\u01CEng": [21212], "q\xEDn": [21220, 21994, 22105, 23964, 24200, 25027, 25028, 25446, 25810, 26035, 27278, 28607, 29665, 29748, 29753, 30269, 31165, 31206, 32825, 33449, 33465, 33766, 34707, 34820, 37401, 37419, 38594, 38770, 40185, 40301], "ji\xE0ng": [21221, 21278, 21280, 23929, 24348, 24374, 25726, 27364, 27930, 28400, 29343, 31969, 31976, 32115, 32475, 35645, 37233, 37284, 37292], "f\u0101n": [21227, 23311, 24070, 24161, 24539, 24995, 26073, 26075, 32345, 32763, 34281, 36691, 39103, 39132, 40021], "ju\u0101n": [21228, 23010, 23071, 25424, 28051, 34866, 35024, 37816, 37931, 38220, 40515], "t\xF3ng d\xF2ng": [21229, 28884, 29137, 29418], "l\u01DC": [21236, 22415, 23874, 24459, 24942, 27695, 28388, 28670, 29192, 31675, 32160, 32322, 33183, 33870, 34385, 37986], "ch\xE8": [21238, 22396, 24443, 24505, 25507, 25764, 28552, 28898, 29217, 30638, 30825, 32837, 36832, 38937], "sh\xE1o": [21242, 29631, 38902], "g\u014Du g\xF2u": [21246], "c\u014Dng": [21254, 22250, 22257, 24553, 24625, 24740, 26288, 27180, 28439, 29821, 29825, 30619, 31733, 32369, 32865, 32870, 32874, 32880, 33473, 33552, 33905, 34031, 34085, 34764, 37743, 37843, 37862, 39448, 39492, 39586], "t\xE1o y\xE1o": [21259, 38518], "p\xE1o": [21263, 21638, 22409, 24214, 29230, 29389, 34957, 35100, 36595, 38788, 40581], "d\xE1": [21266, 22962, 24603, 28831, 29173, 30051, 31530, 32653, 33625, 34200, 34813, 35418, 36798, 36815, 36822, 36826, 36921, 36948, 37949, 38780, 38801, 38851, 40854, 40856], "hu\xE0 hu\u0101": [21270], "b\u011Bi b\xE8i": [21271], "n\u01CEo": [21272, 22452, 22550, 23248, 24700, 24745, 24817, 29785, 30895, 33041, 33075, 33126], "ch\xED shi": [21273], "f\u0101ng": [21274, 22543, 26041, 28115, 29285, 33459, 37025, 37377, 37690, 38059, 40203], "z\u0101": [21277, 21634, 24064, 27806, 33244, 33250, 36810, 37460, 39795], "qi\xE8": [21287, 21394, 22974, 24623, 24719, 24812, 24860, 25352, 31317, 31363, 31434, 31521, 31655, 31691, 31841, 36389, 37733, 38194, 39900], "z\u0101ng c\xE1ng": [21288], "f\u011Bi": [21290, 22876, 24753, 26832, 27047, 31706, 32737, 34140, 35513, 35837], "ku\xEC gu\xEC": [21294, 21297], "su\u01CEn": [21300], "p\u01D0": [21305, 22141, 22189, 22318, 24192, 30174, 30294, 33076, 33481, 37538, 40196], "q\u016B \u014Du": [21306, 21312], "k\u0113 qi\xE0": [21308], "y\u01CEn y\xE0n": [21309, 26858], "bi\u01CEn": [21310, 24828, 25561, 30885, 31272, 31366, 34250, 35082, 36022, 36140, 40216], "n\xEC": [21311, 22532, 23263, 23354, 24772, 24885, 26165, 26289, 27708, 30500, 30568, 32268, 32978, 33147, 33193, 36870], "ni\xE0n": [21316, 21816, 22493, 24319, 24565, 24791, 33356], "s\xE0": [21317, 27346, 33038, 33832, 34159, 34217, 37394, 38561, 39087, 39122, 39354], "z\xFA": [21318, 21739, 23850, 26063, 31652, 36275, 36388, 38238], "sh\u0113ng": [21319, 21583, 22768, 26008, 26119, 26363, 26529, 27525, 27881, 28262, 28986, 29298, 29636, 29983, 29989, 31444, 31513, 32882, 37454, 37727, 38441, 38494, 38521, 40319, 40746], "w\xE0n": [21325, 21328, 24552, 26468, 30627, 33045, 33109, 33836, 34755, 36110, 36624, 37693], "hu\xE1 hu\xE0 hu\u0101": [21326, 33775], "b\u0113i": [21329, 24754, 25593, 26479, 26734, 30403, 30865, 34275, 40303, 40526], "z\xFA c\xF9": [21330], "d\u0101n sh\xE0n ch\xE1n": [21333, 21934], "n\xE1n n\u0101": [21335], "shu\xE0i l\u01DC": [21339], "b\u01D4 bo p\xFA": [21340], "ku\xE0ng gu\xE0n": [21341], "bi\xE0n": [21342, 21464, 22793, 23749, 24321, 24487, 24557, 25219, 26154, 27763, 27764, 29603, 33361, 33476, 35213, 35546, 35722, 36769, 36775, 36776, 36777, 36779, 36782, 36783, 36941, 37318], "b\u01D4": [21343, 21754, 25429, 34917, 35036, 40468], "zh\xE0n zh\u0101n": [21344, 35249], "k\u01CE qi\u01CE": [21345], "l\xFA": [21346, 22183, 22406, 22746, 24208, 24300, 26341, 26534, 26636, 27368, 27896, 28696, 28809, 29200, 29561, 29576, 29904, 30439, 30673, 31834, 32401, 32591, 33002, 33242, 33326, 33339, 33387, 33446, 34310, 34854, 36708, 36723, 37417, 37994, 39025, 39045, 39359, 39639, 39794, 40056, 40072, 40469, 40492, 40696], "l\u01D4": [21348, 22647, 25523, 25796, 27152, 27257, 27347, 27660, 28407, 28571, 28674, 30837, 30944, 31326, 33379, 33386, 34046, 34383, 34396, 37824, 37930, 37989, 38245, 39791, 40065, 40565], "gu\xE0": [21350, 21865, 25346, 25499, 32611, 35074, 35455, 35798], "\xE1ng y\u01CEng": [21356], "y\xECn": [21360, 22461, 22583, 24277, 24941, 24982, 24983, 25050, 27925, 28250, 29452, 30282, 32996, 33562, 37235, 39843], "qu\xE8": [21364, 21371, 22617, 23813, 24747, 24872, 24932, 25609, 27063, 29161, 29751, 30389, 30830, 30906, 31021, 38347, 38421, 40306, 40522], "lu\u01CEn": [21365], "ju\xE0n ju\u01CEn": [21367, 24059], "ch\u01CEng \u0101n h\xE0n": [21378], "w\u011Bi y\xE1n": [21379], "t\u012Bng": [21381, 21403, 21548, 24193, 24304, 24307, 27712, 28867, 28916, 32142, 32787, 32884, 32892, 32893, 38803], "zh\xE9 zh\xE1i": [21383], "h\xE0n \xE0n": [21384, 23677], "y\u01CE": [21386, 21782, 24204, 30166, 30210, 34149], "sh\xE8": [21389, 21401, 24381, 24913, 24948, 25086, 25666, 27399, 28041, 28091, 28169, 28384, 28740, 31038, 33294, 34062, 34818, 35373, 35774, 36198, 39431, 40605], "d\u01D0": [21390, 21607, 22360, 24356, 25269, 25310, 25483, 29300, 30757, 33767, 35293, 35398, 35787, 36583, 37048, 38458, 39606, 39923], "zh\u01CE zh\u01CEi": [21391], "p\xE1ng": [21392, 23246, 24222, 24492, 33152, 33341, 34691, 36868, 39967, 40145, 40846, 40848], "zh\xEC sh\u012B": [21396], "m\xE1ng": [21398, 21506, 21732, 23055, 24537, 24702, 26455, 26471, 27730, 27997, 29307, 30173, 30450, 30829, 31488, 33426, 33579, 34313, 37017, 37359, 37609, 38099, 39417], "zu\u012B": [21404, 27190, 32407, 34773], "sh\xE0 xi\xE0": [21414, 24264], "\xE1o": [21419, 22007, 22008, 24274, 25942, 28406, 29522, 29523, 29832, 32753, 32758, 32762, 32881, 34076, 34735, 35639, 35640, 36968, 37846, 38558, 39986, 40140, 40404, 40711], "l\xE1n qi\u0101n": [21425], "s\u012B m\u01D2u": [21430], "g\u014Dng h\xF3ng": [21431], "l\xEDn mi\u01CEo": [21432], "qi\xFA r\xF3u": [21433], "d\u016B": [21438, 22047, 30563, 37263], "xi\xE0n xu\xE1n": [21439, 32291], "c\u0101n sh\u0113n c\u0113n s\u0101n": [21442, 21443, 21444, 21445], "\xE0i y\u01D0": [21446], "ch\u0101 ch\xE0 ch\u01CE ch\xE1": [21449], "shu\u0101ng": [21452, 23360, 23367, 27398, 31029, 33389, 38617, 38684, 39483, 39526, 39590, 40414, 40472, 40564], "sh\u014Du": [21454, 25910], "gu\xE1i": [21455], "b\xE1": [21456, 22957, 25244, 25300, 28838, 30329, 32968, 33543, 33757, 35417, 36299, 36599, 39747, 40741], "f\u0101 f\xE0": [21457], "zhu\xF3 y\u01D0 l\xEC ju\xE9": [21461], "q\u01D4": [21462, 23094, 31468, 34682, 35411, 40818, 40843], "ji\u01CE xi\xE1": [21466, 24486], "w\xE8i y\xF9": [21470, 23561, 34074], "di\xE9": [21472, 22436, 22558, 23756, 24137, 24654, 24821, 25116, 26337, 27548, 27662, 29251, 29266, 29918, 30067, 30082, 30089, 30090, 30879, 32112, 32470, 32778, 32779, 32965, 33363, 33525, 34600, 34678, 35083, 35396, 35548, 35853, 36334, 36416, 36845, 38267, 39944, 40125, 40233], "ru\xEC": [21473, 26520, 27757, 29790, 30591, 33454, 34443, 34617, 37555, 37613, 38160], "j\xF9 g\u014Du": [21477], "l\xECng": [21478, 21604, 28841, 34342], "d\u0101o d\xE1o t\u0101o": [21480], "zh\u012B zh\u01D0": [21482], "ji\xE0o": [21483, 21580, 22018, 22054, 22093, 23315, 25997, 26016, 28376, 28438, 29541, 29651, 30381, 31382, 34272, 35334, 35685, 36269, 36611, 36686, 36735, 36739, 37237, 37294, 37314], "zh\xE0o sh\xE0o": [21484], "k\u011B k\xE8": [21487], "t\xE1i t\u0101i": [21488, 33492], "p\u01D2": [21493, 23552, 31544, 31653, 37461, 38071, 39370], "y\xE8 xi\xE9": [21494], "h\xE0o h\xE1o": [21495], "t\xE0n": [21497, 22022, 25506, 27470, 28256, 28845, 30899, 33301], "h\u014Dng h\xF3ng": [21503], "mi\u0113": [21504, 21673, 21750, 23405], "x\u016B y\u016B y\xF9": [21505], "ch\u012B": [21507, 21735, 21931, 21988, 22084, 22939, 23224, 24424, 24434, 25691, 25889, 27558, 29947, 30196, 30305, 30517, 30621, 31518, 31898, 33013, 34473, 34733, 35381, 39761, 40223, 40260, 40497, 40656, 40797], "xu\u0101n s\xF2ng": [21509], "y\u0101o": [21510, 21907, 22829, 22934, 24186, 26950, 27520, 31045, 33136, 33917, 35358, 36992, 40193, 40226], "z\u01D0": [21511, 22985, 22986, 23376, 26445, 26771, 27039, 27252, 28371, 30711, 31213, 31531, 31869, 32043, 32788, 34424, 35391, 37352], "h\xE9 g\u011B": [21512, 40068], "c\xF9n y\u012Bngc\xF9n": [21515], "t\xF3ng t\xF2ng": [21516], "t\u01D4 t\xF9": [21520, 21771], "zh\xE0 zh\u0101": [21522, 22867], "xi\xE0 h\xE8": [21523], "\u0101 y\u0101": [21526], "ma m\xE1 m\u01CE": [21527], "l\xECn": [21533, 24673, 24715, 27209, 28955, 29968, 33190, 34106, 34298, 36035, 36161, 36472, 36495, 36505, 36522, 36709, 38325], "t\u016Bn": [21534, 26302, 26396, 28958], "b\u01D0 p\u01D0": [21537], "q\xECn": [21538, 21539, 21786, 25227, 25599, 25607, 25779, 27777, 28697, 33763, 34301], "ji\xE8 g\xE8": [21540], "f\u01D2u p\u01D0": [21542], "ba b\u0101": [21543], "d\u016Bn": [21544, 22136, 22697, 22698, 24775, 25737, 25780, 29340, 29540, 30981, 34611, 36478, 39504], "f\u0113n": [21545, 24073, 26128, 26374, 26788, 26875, 27675, 31445, 32027, 32439, 32706, 33452, 34927, 35356, 36526, 37210, 37398, 38640, 39220, 39257, 39322], "\xE9 hu\u0101": [21546], "k\u0113ng h\xE1ng": [21549, 22932], "sh\u01D4n": [21550], "zh\u012B z\u012B": [21553], "y\u01D0n sh\u011Bn": [21554], "w\xFA": [21555, 21556, 21577, 22706, 23807, 26791, 27206, 27595, 27926, 28015, 28961, 29688, 29841, 31078, 33436, 33571, 33665, 34154, 34568, 34801, 35669, 37082, 37593, 38139, 39875, 40272, 40417, 40512, 40751], "ch\u01CEo ch\u0101o": [21557], "n\xE0 n\xE8": [21558], "xu\xE8 chu\xF2 ju\xE9": [21559], "chu\u012B": [21561, 28810, 40865], "d\u014Du r\xFA": [21562], "h\u01D2u": [21564, 29372], "h\u014Dng h\u01D2u \u014Du": [21565], "w\xFA y\xF9": [21566], "ya y\u0101": [21568], "\xE8 e": [21571], "d\u0101i": [21574, 25051, 29507], "m\xE8n q\u01D0": [21575], "h\u014Dng": [21581, 22173, 25544, 28788, 28888, 28962, 30817, 34216, 35335, 35902, 36579, 36663, 36703, 36720, 37735], "ch\u01D0 y\u012Bngch\u01D0": [21582], "n\xE0": [21584, 25466, 31517, 32013, 32435, 32941, 33971, 34930, 35965, 35968, 36572, 37069, 37385, 38048, 38777, 39798], "t\u016Bn ti\u0101n": [21585], "\u1E3F": [21586], "d\u0101i t\u01CEi": [21588], "\u01D2u \u014Du \xF2u": [21589], "b\xE0i bei": [21591], "yu\xE1n y\xFAn y\xF9n": [21592, 21729], "gu\u014D": [21593, 21871, 22035, 22490, 22557, 22670, 23838, 24393, 24397, 25046, 29459, 30225, 32850, 34632, 34760, 37101, 37403, 37707, 38149], "hu\xE1 q\xEC": [21594], "qi\xE0ng qi\u0101ng": [21595, 36292], "sh\u012B": [21598, 22833, 23608, 23629, 24072, 24107, 26045, 27977, 28260, 28287, 28334, 28348, 28629, 29422, 29509, 29793, 32065, 33913, 33938, 33997, 34417, 34664, 35127, 35193, 35433, 35799, 37055, 37315, 37447, 37734, 39924, 39972, 40122, 40178, 40190, 40371, 40484], "ju\u01CEn": [21599, 22477, 33223, 33764, 37640, 38185], "p\u011Bn": [21600, 32760], "w\u011Bn m\u01D0n": [21601], "ne n\xED": [21602], "\u1E3F m\u0300": [21603], "r\xE1n": [21605, 22059, 28982, 29123, 32334, 32944, 34470, 34490, 34939, 34951, 34977, 39653, 39663], "ti\xE8 ch\xE8": [21611], "q\xEC zh\u012B": [21614], "z\u01D0 c\u012B": [21616], "gu\u0101 g\u016B gu\u01CE": [21617], "c\u012B z\u012B": [21618], "h\u01D2u x\u01D4 g\xF2u": [21620], "h\u0113 \u0101 \xE1 \u01CE \xE0 a": [21621], "n\xE1o": [21622, 22802, 23793, 23977, 24014, 25376, 25747, 29489, 30791, 34546, 34799, 35401, 35658, 37891, 38105], "xi\u0101 g\u0101": [21623], "p\u0113i": [21624, 24588, 32935, 32986, 34883, 37253], "h\xE1o xi\u0101o": [21626], "m\xECng": [21629, 25525], "d\xE1 d\xE0n": [21630], "zu\u01D0 j\u01D4": [21632], "xi\xE1n g\u0101n": [21633], "p\u01D2u": [21637, 21731, 29315], "y\u01CEng y\u0101ng": [21641], "z\u01CE z\xE9 zh\u0101": [21643], "h\xE9 h\xE8 hu\xF3 hu\xF2 h\xFA": [21644], "h\u0101i": [21645], "d\u0101": [21649, 21714, 22112, 22710, 25645, 25752, 32823, 35105, 37789], "k\u01CE k\u0101": [21652], "g\u016B": [21653, 21762, 21763, 22993, 23284, 23396, 24044, 24045, 26599, 27245, 27837, 27858, 31250, 31519, 31629, 31643, 31696, 32603, 33533, 33735, 33776, 33991, 35290, 36593, 36594, 36721, 36764, 37220, 37426, 39829, 40227, 40490], "k\u0101 g\u0101": [21654], zuo: [21655], "l\xF3ng": [21657, 22184, 23952, 24003, 24004, 26173, 26344, 26407, 26634, 27102, 27379, 28272, 28381, 28427, 29206, 29649, 29903, 30275, 30508, 30675, 30779, 31025, 31026, 31423, 31452, 32843, 32894, 32999, 33551, 34338, 34858, 34860, 35185, 35909, 37863, 37992, 38707, 38727, 39521, 40471, 40845, 40850, 40857], "xi\xE0n xi\xE1n": [21662], "q\xEC": [21664, 21805, 22096, 22120, 22817, 24323, 24967, 25001, 26275, 26820, 27435, 27668, 27671, 27683, 27732, 27773, 27875, 28230, 28231, 28801, 29960, 30453, 30709, 30875, 30902, 30940, 30951, 32586, 33438, 33914, 34258, 34815, 35350, 35755, 36804, 37905], "x\xEC di\xE9": [21669], "li\u0113 li\u011B li\xE9 lie": [21671], "z\u012B": [21672, 21982, 22997, 23039, 23388, 23411, 23414, 23856, 23915, 26661, 26900, 28100, 28285, 28363, 28588, 29574, 31116, 31222, 31906, 32014, 32199, 32213, 32387, 32513, 33546, 33586, 33880, 35566, 35864, 36018, 36039, 36160, 36164, 36220, 36241, 36262, 36636, 36666, 36750, 37137, 37421, 37657, 37759, 37793, 38193, 38211, 38974, 38975, 39661, 39892, 39974, 40123, 40325, 40722, 40781, 40796, 40839], "m\u012B": [21674], "j\u012B x\u012B qi\xE0": [21677], "g\u0113 lu\xF2 k\u01CE lo": [21679], "sh\xF9 x\xFAn": [21680], "z\xE1n z\xE1 z\u01CE zan": [21681], "h\u0101i k\xE9": [21683], "hu\u012B": [21684, 22085, 22101, 23118, 23176, 24145, 24509, 24674, 25339, 25381, 25582, 26198, 26249, 26958, 27907, 28680, 28784, 28787, 28899, 30579, 31112, 32730, 32748, 34355, 34950, 35096, 35452, 35801, 35927, 36637, 36745, 39988, 40638], "hu\xE0i sh\xEC": [21686], "t\xE1o": [21687, 21845, 26691, 27310, 27950, 28120, 31097, 32175, 32505, 33796, 34602, 35050, 36847, 36867, 37252, 37630, 38784, 38793, 39232, 39395, 39434, 40727], "xi\xE1n": [21688, 21859, 23092, 23097, 23153, 23244, 23290, 23291, 24358, 25382, 25743, 28046, 28282, 28566, 29961, 30187, 30279, 30286, 32067, 32984, 33335, 34262, 34495, 34525, 34900, 34904, 35512, 35572, 36066, 36114, 36132, 36657, 37262, 37532, 37990, 38289, 38386, 40435, 40436, 40444, 40519, 40569, 40601], "\xE8 \xE0n": [21689], "xu\u0101n xu\u01CEn": [21690, 28892], "w\u0101i h\xE9 w\u01D2 gu\u01CE gu\u014D": [21692], "y\xE0n y\xE8 y\u0101n": [21693], "\u0101i": [21696, 21710, 22467, 28350, 37552, 37764, 38207], "p\u01D0n": [21697, 27008], "sh\u011Bn": [21698, 23158, 23352, 23457, 23479, 23529, 24350, 26315, 28182, 28683, 30635, 30692, 30695, 35262, 35360, 35543, 35717, 35842, 35849, 37029, 38947, 39787], "h\u01D2ng h\u014Dng h\xF2ng": [21700], "w\u0101 wa": [21703], "h\u0101 h\u01CE h\xE0": [21704], "z\u0101i": [21705, 26685, 28221, 28328, 28797, 28798, 28886, 30581, 36083], "d\xEC di\xE8": [21707], "p\xE0i": [21708, 27808, 27966, 28178, 28227, 33934, 37763], "g\xE9n h\u011Bn": [21711], "y\u01CE y\u0101": [21713, 38597], "yu\u011B hu\xEC": [21717, 22118], "ni\xE1n": [21718, 24180, 31178, 31205, 39822, 39920, 40071, 40118, 40263, 40655], "hu\xE1 hu\u0101": [21719, 22057], "j\xEC ji\u0113 zh\u0101i": [21724, 22156], "m\u014Du": [21726], "y\u014D yo": [21727, 21938], "l\xF2ng": [21730, 26759, 36122], "\xF2 \xF3 \xE9": [21734], "l\u012B l\u01D0 li": [21737], "n\u01CE na n\u01CEi n\xE9 n\u011Bi": [21738], "h\xE8": [21740, 22414, 22737, 23497, 24786, 28931, 28994, 29178, 29184, 30283, 30859, 32751, 35088, 35614, 36032, 36154, 36203, 38733, 38734, 38735, 40372, 40470, 40548], "b\u014D p\xF2 b\u0101": [21745], "zh\xE9": [21746, 21856, 21894, 22174, 22481, 24714, 25722, 26210, 26211, 27517, 30714, 30739, 30932, 31863, 31885, 34420, 34544, 34756, 34985, 35423, 35627, 35642, 35713, 35723, 35882, 36626, 36633, 36685, 36740, 36761, 39871], "li\xE0ng l\xE1ng": [21748], "li\xE8 l\u01DC": [21751], "h\u0101n": [21755, 25e3, 34486, 35901, 37219, 38919, 39032, 39328, 39805, 40766], "h\u0113ng hng": [21756], "g\u011Bng": [21757, 22466, 23802, 25389, 26775, 32134, 32480, 32831, 33668, 37088, 39614, 39873, 40096], "chu\xF2 yu\xE8": [21758], "g\u011B ji\u0101": [21759], "bei b\xE0i": [21764], "h\xE1n h\xE0n": [21765], "ch\xFAn": [21767, 28017, 28283, 28387, 28440, 29321, 32020, 32431, 33059, 33724, 33939, 34036, 37255, 37269, 37662, 38489, 39897, 40329, 40529], "\xE0i \u0101i": [21769], "ji\xE1 qi\u01CEn": [21770], "y\xE1n d\xE0n xi\xE1n": [21772], "ch\u0113": [21779, 30743, 30824, 33687, 34556], "w\xFA \u0144g \u0144": [21780], "z\xE0o": [21781, 21795, 22122, 24933, 26765, 28790, 29040, 29157, 30337, 30338, 31427, 31432, 31753, 33345, 35679, 36270, 36481, 36896], "d\xED": [21785, 21831, 22016, 22145, 23265, 24312, 25932, 25973, 26769, 28068, 28364, 29380, 31515, 31860, 31988, 33494, 33659, 34059, 34064, 34273, 35263, 35276, 35956, 36842, 38766, 38932, 39344, 39650, 40464], "g\xF2ng h\u01D2ng g\u01D2ng": [21789, 21962], "d\xF3u": [21790], "l\xE0o l\xE1o": [21792, 22062, 24998], "li\u01CEng y\u012Bngli\u01CEng": [21793], "hu\xE0n": [21796, 21914, 22850, 22864, 23462, 23880, 24187, 24739, 24844, 25442, 25563, 25808, 25868, 26777, 27125, 28003, 28067, 28185, 28470, 28579, 28873, 28949, 29029, 29773, 30186, 30227, 30534, 32914, 34279, 35938, 36696, 36909, 39879, 39926, 39936, 40105], "l\xE9ng": [21797, 22596, 26974, 30864, 34192], "w\u014D w\u011Bi": [21801], "f\u011Bng": [21802, 35202, 35575, 35773], "y\xEDn j\xECn": [21803], "h\u01D4 xi\xE0": [21804], "w\xE9i": [21807, 22260, 22285, 22749, 23767, 23774, 23916, 24079, 24119, 24131, 24799, 26693, 27817, 27912, 28064, 28235, 28296, 28493, 28505, 28543, 28656, 29353, 30656, 32173, 32500, 34038, 35257, 36829, 36949, 37164, 37248, 37711, 38344, 38385, 38859, 38886, 39840], "shu\u0101": [21808], "ch\xE0ng": [21809, 24581, 24757, 26274, 28987, 30021, 30076, 35503, 38868, 39727], "\xE9r w\u0101": [21810], "qi\xE0ng": [21812, 28829, 29079, 32699], "y\u014D": [21815], "y\u016B": [21817, 28132, 30208, 30419, 31626, 32006, 32417, 36796, 36802, 36803, 38483], "l\xE0i": [21819, 28625, 28712, 28716, 30302, 30313, 30544, 30558, 31809, 31839, 34302, 36058, 36084, 36169, 36182, 38972, 38978, 40291], "tu\xF2": [21822, 23966, 26589, 27620, 27643, 31656, 31836, 33818, 34304, 36293], "zh\u014Du zh\u0101o ti\xE0o": [21825], "k\u011Bn": [21827, 22438, 22718, 24691, 25031, 32910, 32943, 32955, 35940, 37689], "zhu\xF3 zh\xE0o": [21829, 28655], "h\u0113ng h\xE8ng": [21832, 24729], "l\xEDn l\xE1n": [21833], "a \u0101 \xE1 \u01CE \xE0": [21834], "qi\u0101ng": [21836, 22004, 23944, 25109, 25700, 26024, 26538, 27085, 28332, 29252, 29456, 29511, 32652, 32663, 33108, 34595, 35602, 37848, 38166, 38197], "t\u016Bn zh\u016Bn xi\u0101ng du\u01D0": [21837], "w\xE8n": [21839, 22927, 25598, 25653, 29882, 38382, 38992], "cu\xEC qi": [21840], "di\xE9 sh\xE0 ji\xE9 t\xEC": [21841], "yu\u0113 w\u0101": [21848], "z\u01D0 c\u01D0": [21849], "b\u01D0 t\xFA": [21850], "chu\xF2 chu\xE0i": [21852], "y\u01CE y\u0101 \xE8": [21854], "f\u0113i": [21857, 23123, 23124, 25161, 26243, 28164, 29446, 32203, 32495, 35062, 38671, 38750, 38751, 39131, 39133, 39134, 39205, 39329, 39441, 39451, 39905, 40113], "p\xED": [21860, 22720, 26503, 27607, 27608, 28983, 29749, 30130, 30382, 31738, 32628, 32646, 33086, 33111, 33165, 34445, 34493, 34609, 34743, 34863, 35964, 35988, 37099, 37433, 38448, 38516, 38566, 39790, 39821, 40079, 40295, 40729], "sh\xE1": [21861], "l\u0101 la": [21862], "y\u012Bng q\xEDng": [21864], "p\u0101": [21866, 22929, 33317, 33897, 36276], "zh\u011B sh\xEC": [21867], "s\xE8": [21868, 21959, 25038, 25804, 26652, 27502, 28073, 28171, 28544, 28545, 28615, 28623, 28690, 29791, 29873, 30263, 31313, 31329, 31343, 32364, 35653, 36694, 37547, 37884, 38127, 39115], "ni\xE8": [21870, 21995, 22107, 22169, 22209, 22227, 22332, 23420, 23421, 23922, 23981, 24021, 24071, 25948, 26559, 27127, 27377, 28037, 28284, 30150, 31710, 31819, 31985, 31989, 32834, 32886, 33260, 33266, 34326, 34853, 35736, 36354, 36375, 36377, 36433, 36513, 37660, 37811, 37960, 38007, 38016, 38218, 38221, 38353, 38503, 38537, 39027, 39070, 40807], "lu\u014D lu\xF3 luo": [21872, 22217], "t\u0101n ch\u01CEn tu\u014D": [21876], bo: [21877, 34068], "d\xECng": [21878, 23450, 26903, 30708, 30855, 30880, 30968, 32866, 33114, 33827, 35330, 35746, 37664, 38189, 38977, 39139, 39268], "l\u0101ng": [21879], "\xE1n \u0101n": [21885], "k\u0101": [21888, 25814], "y\xF3ng y\xFA": [21889], "l\u0101 l\xE1 l\u01CE": [21895], "ji\u0113": [21896, 21948, 21983, 22566, 23192, 25509, 25522, 25809, 28253, 29039, 30102, 30158, 30308, 30342, 31224, 31277, 33083, 34644, 34903, 35631, 38454, 38542, 38786, 40347], "h\xF3u": [21897, 24127, 29492, 30218, 30586, 31692, 31943, 32749, 33876, 37127, 37741, 39217, 39610, 39928], "di\xE9 zh\xE1": [21899], "w\u0101i": [21902, 27498, 31477], "nu\xF2 r\u011B": [21903], "x\xF9 hu\xF2 gu\xF3": [21904], "z\xE1n": [21906], "w\u014D \u014D": [21908], "h\xFA": [21910, 22045, 22251, 22774, 22775, 22778, 23209, 24359, 25648, 26011, 26972, 27122, 28246, 28715, 28928, 29043, 29392, 29474, 29786, 29939, 31670, 32087, 32288, 32993, 33899, 34075, 34676, 34716, 34906, 35315, 37264, 37752, 38966, 39212, 39693, 39793, 39959, 40288, 40344, 40358, 40533], "hu\xE0n yu\xE1n xu\u01CEn h\xE9": [21915], "x\u01D0": [21916, 22221, 22736, 23651, 24473, 24985, 26546, 27250, 27478, 28423, 29626, 29885, 30678, 31143, 32304, 33864, 33912, 34032, 34786, 35601, 36445, 36519, 37410, 37480, 37481, 40026], "h\u0113 h\xE8 y\xE8": [21917], "ku\xEC": [21919, 22067, 23231, 23303, 24870, 24871, 24978, 31697, 31779, 31812, 32873, 32877, 32885, 33197, 34146, 35593, 39229, 39243, 39304], "zh\u01D2ng chu\xE1ng": [21920], "w\xE9i w\xE8i": [21921, 28858, 29234], "du\xF3 zh\xE0": [21925], "s\u0101ng s\xE0ng": [21930], "qi\xE1o ji\u0101o": [21932], "p\xE8n b\u0113n": [21935], "c\u0101n s\u016Bn q\u012B": [21936], "zh\u0101 ch\u0101": [21939], "mi\u0101o": [21941], "p\u0113n p\xE8n": [21943], "ku\xED": [21945, 22804, 22862, 24025, 25123, 25542, 26182, 26252, 26959, 26961, 27334, 29354, 30589, 33909, 34248, 34359, 34369, 34672, 36520, 36917, 37128, 37736, 37751, 38959, 39319, 39460, 39577, 39745], "lou l\xF3u": [21949], "z\xE0o qi\u0101o": [21951], "h\xE8 xi\u0101o xi\xE0o h\xF9": [21955], "\xE1 sh\xE0": [21956], "xi\xF9": [21957, 23723, 23744, 28340, 29659, 29703, 29843, 31168, 32137, 32333, 32353, 32483, 34705, 34966, 35086, 35087, 37561, 37861, 37885, 38152, 40773], "qi\u0101ng qi\xE0ng": [21958, 25111, 25127, 36428, 36449], "\xE0i y\xEC": [21964, 33406], "m\xE1 m\u01CE ma": [21966], "k\xE8 k\u0113": [21969], "d\u0101 t\xE0": [21970, 37769], "s\u01CEng": [21971, 25633, 30921, 35116, 37791, 39001, 39073], "ch\u0113n": [21972, 25275, 29723, 30603, 35523, 35603, 36061, 37108], "w\u0101 g\u01D4": [21975], "p\u01CEng b\u0113ng": [21977], "xi\xE1n qi\u01CEn qi\u0101n": [21979], "l\xE0o": [21984, 23274, 27247, 28061, 28551, 32802, 32814, 36540, 36546, 37226], "w\u0113ng": [21985, 32705, 32876, 34697, 37779, 40370, 40543], "w\xE0": [21986, 33149, 33155, 34972, 35178, 38884], "h\u0113i h\u0101i": [21992], "h\u0113": [21996, 27441, 34842, 35382, 35779], zi: [21997], "s\u01CEi": [21998], "\u01F9g \u0144g \u0148g": [21999], "g\u011B": [22e3, 33336], "n\xE1": [22001, 25295, 25343, 37823, 38222], "di\u01CE": [22002], "\xE0i \u01CEi \u0101i": [22003], "t\u014Dng": [22005, 27147, 28853, 34026], "zu\u012B su\u012B": [22010], "zh\u0113 zh\xE8 zh\xF9 zhe": [22011], "m\xF2": [22012, 22333, 22651, 22696, 22970, 23292, 23518, 24094, 26153, 26411, 26554, 27519, 27521, 27819, 28448, 29189, 29519, 30268, 30348, 30525, 30527, 30608, 30617, 30750, 31027, 31203, 32072, 32390, 32817, 33545, 33672, 34022, 34536, 34772, 35971, 35978, 35992, 37510, 37836, 38214, 38476, 38778, 39488, 39785, 40664, 40665], "s\xF2u": [22013, 30262], "t\u01CEn": [22015, 22374, 24528, 25011, 25019, 26298, 27631, 29870, 33788, 34962, 35170, 37267, 37485, 38077], "ji\xE0o d\u01CEo": [22020], "k\u01CEi g\u011B": [22021], "sh\u0101n c\xE0n": [22023], "c\xE1o": [22024, 23942, 26361, 26362, 27133, 28437, 33370, 34040, 34732, 35135, 37866], "pi\xE0o": [22028, 24497, 34056, 39491], "l\xF3u lou": [22029], "g\u01CE": [22030, 23573, 29581], "g\u01D4 ji\u01CE": [22031], "ji\u0101o xi\u0101o": [22032], "x\u016B sh\u012B": [22040, 22099], "p\xF3": [22041, 22185, 23110, 27335, 30372, 37169], "d\u0113 d\u0113i": [22042], "ma m\xE1": [22043], "l\u0113 lei": [22046], "g\u0101 g\xE1 g\u01CE": [22048], "s\u0101i": [22053, 22139, 27618, 33134, 38987, 39955], "zu\u014D chu\xE0i": [22060], "ch\xE1o zh\u0101o": [22066, 26397, 40706], "zu\u01D0": [22068, 22143, 23946, 29883], "f\u01D4 \u1E3F": [22072], "qi\xE1o qi\xE0o": [22074, 32761, 35887], "ch\xF9 x\xF9 sh\xF2u": [22076], "t\u0101n ch\u01CEn": [22077], "d\xE0n t\xE1n": [22078, 24382, 24392, 24788, 28601], "h\u0113i m\xF2": [22079], "\u011B": [22081, 30760, 38923, 39424, 40264], "f\u0101n bo": [22083], "chu\xE1ng": [22087, 24202, 29248], "c\xF9 z\u0101 h\xE9": [22088], "t\u016Bn ku\xF2": [22091], "c\u0113ng ch\u0113ng": [22092], "d\u0113ng": [22100, 23297, 28783, 29128, 29842, 30331, 31475, 31782, 33376, 35915], "p\u016B": [22103, 25169, 25778, 25908, 25909, 28541, 28807, 38496], "ju\u0113": [22104, 23657, 23659, 25767], "l\u016B": [22108, 22165, 25784, 25852, 35618], "zh\u0101n": [22113, 23742, 24777, 26051, 26076, 26540, 26676, 27617, 27656, 27658, 27838, 30651, 34205, 34501, 35392, 35449, 35691, 35893, 36232, 36997, 38298, 38673, 39142, 39256, 39513, 39769, 40035, 40455, 40559], "\u014D": [22114], "zh\xF2u zhu\xF3": [22115], "ji\xE0o qi\xE0o ch\u012B": [22125], "yu\xE0n": [22126, 22964, 24616, 24895, 25534, 29783, 31120, 33489, 34895, 35051, 35089, 38498, 39e3], "\u01CEi \xE0i \u0101i": [22127], "y\u014Dng y\u01D2ng": [22128, 28589], "ju\xE9 xu\xE9": [22129], "p\u0113n p\xE8n f\xE8n": [22132], "g\xE1": [22134, 23580, 37331, 37687, 38022], "hm h\u011Bn x\u012Bn h\xE8n": [22135], "d\u0101ng": [22137, 28578, 29680, 29867, 31580, 31801, 33377, 34807, 35014, 35168], "l\xE0n": [22146, 28389, 28651, 28866, 29143, 29185, 29211, 29220, 29907, 31991, 38020], "t\xE0": [22147, 22202, 23817, 25374, 25640, 25787, 27067, 27261, 27646, 28094, 28606, 28620, 31138, 31887, 35515, 35702, 36427, 36473, 36482, 36514, 36957, 37652, 38354, 38373, 38396, 38424, 38812, 38835], "hu\u014D hu\xF2 \u01D2": [22148], "h\u0101o": [22150, 33568, 33983, 34181], "h\xE8 xi\xE0": [22151], "xi\xF9 p\xEC": [22154], "zh\u014Du ch\xF3u": [22155, 30441, 35818], "m\u0113": [22162], "ch\u0101 c\u0101": [22163], "b\xF3 p\xE0o b\xE0o": [22167], "me m\xE8i m\xF2": [22172], "xi\xE9 h\xE1i": [22177], "\xE1o xi\u0101o": [22179], "m\u014D": [22180, 25720], "p\xEDn": [22188, 23078, 23252, 23338, 29613, 30665, 34226, 34841, 36007, 36139, 39024, 39078], "m\xE8": [22192, 28665], "r\u01CEng r\u0101ng": [22199], "l\xE1": [22201, 26095], "ji\xE1o ju\xE9 ji\xE0o": [22204], "chu\xF2": [22205, 23062, 25801, 27488, 28080, 30957, 36352, 36639, 36749, 36789, 36790, 37227, 37985, 39199, 40810, 40842], "hu\u0101n hu\xE0n": [22206], "z\xE1 c\xE0": [22211], "ch\xE0i": [22214, 34431, 34822, 34947, 35341], "n\xE1ng n\u0101ng": [22218], "z\xE1 z\xE0n c\u0101n": [22219], "s\u016B": [22220, 27375, 29990, 31267, 31308, 31395, 34311, 34323, 37221, 39874], "z\xE8ng": [22222, 29111, 29969, 36104, 36192, 37605, 38147], "z\xE1 ni\xE8 y\xE0n": [22224], "n\u0101ng": [22228], "lu\xF3 lu\u014D luo": [22230], "w\xE9i gu\xF3": [22231], "hu\xED": [22232, 22238, 22252, 24315, 24317, 24667, 27908, 30160, 33588, 34456, 34516, 34517, 34582, 36852, 36901, 39856], "n\xEDn": [22236, 24744, 33036], "ji\u01CEn n\u0101n": [22237], "n\u0101n": [22241], "tu\xE1n": [22242, 22243, 22296, 24945, 25247, 25718, 27314, 31984, 37828, 40402, 40443], "t\xFAn d\xF9n": [22244, 22345], "gu\xF3": [22255, 22262, 22267, 22269, 22272, 22283, 24124, 24151, 24918, 25681, 28429, 32861, 33112, 33173, 34094, 34402, 39320], "k\xF9n": [22256, 28035, 30543], "w\xE9i t\u014Dng": [22258], "q\u016Bn": [22263, 22795, 36897], "r\xEC": [22264, 26085, 34933, 37412, 39353, 39538], "t\u0101i": [22268, 23393, 32974], "p\u01D4": [22275, 22289, 25800, 26222, 26268, 27192, 27279, 27654, 28006, 28325, 28915, 35561, 35676, 35889, 36476, 37920, 38248], "qu\u0101n ju\xE0n ju\u0101n": [22280, 22287], "chu\xED chu\xE1n": [22284], "tu\u01CEn": [22293, 30077, 30083], "l\xFC\xE8": [22297, 25504, 30053, 30055, 31268, 37597, 37602, 38154], "hu\xE1n yu\xE1n": [22300], "lu\xE1n": [22301, 22302, 22897, 23048, 23372, 23402, 23423, 23782, 24018, 25371, 25891, 26347, 26686, 27410, 28390, 28772, 30324, 30325, 32649, 33044, 33248, 34378, 37550, 38014, 40265, 40478, 40510], "t\u01D4": [22303, 22305, 37367, 38029], "x\u016B w\xE9i": [22313], "d\xEC de": [22320, 23987], "qi\u0101n s\xFA": [22321], "zh\xE8n": [22323, 22630, 25355, 25391, 26389, 26650, 30013, 30521, 32022, 32124, 32444, 35499, 36049, 36168, 37620, 37805, 37806, 38215, 38453, 38499, 38663, 40198, 40489], "ch\u01CEng ch\xE1ng": [22330, 22580, 22642], "q\xED y\xEDn": [22331], "ji\xE1": [22335, 24550, 24669, 25118, 25204, 33061, 33626, 33698, 34545, 34554, 35020, 36338, 37071, 37087, 37583, 38103, 38956, 38960, 39050, 40246, 40266], "zh\u01D0 zh\xEC": [22337], "b\u01CEn": [22338, 23685, 26116, 26495, 29256, 29930, 31876, 33320, 34626, 37393, 38051, 38442, 39788], "q\u01D0n": [22341, 23505, 23517, 23522, 26129, 26795, 31497, 34748, 36222, 37599, 38163], "m\xE9i f\xE9n": [22342], "r\u01D2ng k\u0113ng": [22344], "f\u0101ng f\xE1ng": [22346], "f\xE8n b\xE8n": [22347], "t\u0101n": [22349, 24633, 25674, 25849, 25892, 28393, 28760, 30251, 30321, 33297, 36010, 36138], "hu\xE0i p\u0113i p\u012B p\xE9i": [22351], "d\xEC l\xE0n": [22356], "t\xE1n": [22363, 22704, 22709, 22727, 22748, 23122, 24987, 26137, 26311, 27011, 27264, 28525, 29122, 30192, 30969, 32584, 32590, 34283, 35527, 35674, 35680, 35848, 35885, 35994, 37103, 37296, 37663, 38979], "b\xE0": [22365, 22459, 22761, 24349, 27419, 28766, 29240, 30706, 35207, 38712, 39809, 40069], "f\xE9n": [22367, 22707, 22946, 23694, 24169, 26508, 26876, 27774, 28954, 29132, 29139, 32658, 32693, 33974, 34145, 34464, 34465, 35950, 35958, 36690, 37948, 38571, 39337, 39797, 40642, 40726, 40738], "zhu\xEC": [22368, 22684, 24820, 29952, 30071, 30984, 32180, 32267, 32512, 32530, 33103, 33159, 35528, 36101, 36184, 37258, 37667, 37958], "p\u014D": [22369, 23717, 27900, 28300, 28497, 37337, 37882, 38027, 38935, 39047], "p\u01CEn b\xE0n": [22370], "k\u016Bn": [22372, 22531, 22546, 23824, 23825, 26118, 26204, 28489, 28956, 29108, 29457, 29736, 29819, 33742, 34603, 35016, 35049, 35084, 37260, 37653, 38175, 39433, 39648, 39649, 39656, 39908, 40114, 40318, 40356, 40525], "di\xE0n": [22379, 22443, 22666, 22722, 22880, 23133, 24215, 24806, 25154, 27202, 27583, 28096, 28593, 29623, 29716, 30005, 30300, 31775, 34580, 37439, 38651, 38747, 39508], "m\xF9 m\u01D4": [22390], "k\u0113 k\u011B": [22391, 36603], "xu\xE8": [22393, 23716, 26710, 28709, 29400, 30642, 35604, 35857, 36240], "d\u01D0 ch\xED": [22395, 26594], "l\u0101": [22403, 26566, 33736, 37003], "l\u01D2ng": [22404, 22405, 22751, 22752, 25314, 25871, 31433, 38471, 38580], "m\xEDn": [22410, 22980, 23735, 23823, 25450, 26107, 26108, 27665, 29641, 29720, 29725, 29769, 30203, 30463, 30727, 32205, 32225, 32535, 32608, 33504, 37425, 37641, 37746, 40214], "d\xF2ng t\xF3ng": [22412, 23762, 27934], "c\xED": [22416, 23336, 24904, 26572, 28648, 29633, 29943, 29958, 30913, 31008, 31072, 31949, 33576, 35422, 35789, 36765, 36766, 36772, 36781, 38604, 39162, 39176, 40220, 40383, 40384, 40538], "du\u012B": [22422, 22534, 22624, 30205, 30931, 37907, 37916, 40237], "du\xF2 du\u01D2": [22427], "du\u01D2 du\xF2": [22428, 25350], "ch\xE1": [22430, 23519, 23894, 25661, 27086, 27307, 29497, 33580, 33590, 35431, 38763], "sh\u01CEng": [22439, 26188, 27145, 36062, 36120, 36175, 37631, 37851, 37980], "sh\u01D2u": [22440, 23432, 25163, 25164, 33359, 39318], da: [22447, 32360, 36342], "h\xE1ng": [22451, 26043, 26477, 31573, 32078, 32471, 33322, 33472, 34466, 35012, 36005, 36818, 38927, 39043, 39783], "\u0101n \u01CEn": [22453], "x\u012Bng": [22454, 24826, 26143, 26320, 29003, 29481, 29766, 30376, 31682, 33125, 33288, 35306, 35314, 35587, 39426, 39565, 39823, 39929], "yu\xE0n hu\xE1n": [22456], "b\u0101ng": [22457, 24110, 24135, 24154, 24171, 25440, 26758, 27996, 37030, 37035, 38820], "p\xF3u f\xFA": [22458], "c\xE9n": [22465, 23697, 28052], "b\u011Bng f\u0113ng": [22468], "d\xEC f\xE1ng": [22469], "xi\xE1 ji\u0101": [22473], "m\xE1i m\xE1n": [22475], "l\xE0ng": [22476, 23808, 28010, 33943, 38316], "sh\u0101n y\xE1n": [22479], "q\xEDn j\u012Bn": [22480], "p\u01D4 b\xF9": [22484], "hu\u0101": [22486, 23154, 26907, 30836, 31936, 33457, 33930, 34340, 35502, 37685], "su\xEC s\xF9": [22499], "p\xED p\xEC": [22500], "q\u012Bng zh\u0113ng": [22501, 40109], "w\u01CEn w\u0101n": [22502], "l\u01D4n": [22504, 31248], "zh\u0113ng ch\xE9ng": [22505], "k\u014Dng": [22506, 23814, 31644, 36539, 37651, 40316], "c\u01CEi c\xE0i": [22512, 23488, 37319], "ch\xF9 t\xF2u": [22513], "b\u011Bng": [22514, 29739, 33782, 38811], "k\u01CEn xi\xE0n": [22515], "y\xEC sh\xEC": [22518, 37299], "p\xE9i": [22521, 27632, 35060, 35061, 36064, 36180, 37639, 38187, 38443, 38506], "s\xE0o s\u01CEo": [22525], "j\u01D0n q\u012Bn j\xECn": [22535], "p\xE9ng b\xE8ng": [22539], "qi\xE0n z\xE0n ji\xE0n": [22545], "\xE0n": [22547, 23669, 23736, 25353, 26263, 26696, 33018, 33612, 35963, 35979, 37644, 38343, 38540, 40687], "du\xF2 hu\u012B": [22549, 22702], "hu\xE1n": [22554, 23503, 23536, 23768, 26707, 27961, 28596, 29506, 29615, 29872, 31979, 32367, 32563, 32678, 33601, 33800, 33809, 35954, 37744, 37942, 38206, 38254, 38372, 38427, 38600, 39711, 40558], "b\u01CEo b\u01D4 p\xF9": [22561], "m\xE1o m\xF3u w\u01D4": [22565], "ru\xE1n": [22567, 22742, 25739], "\xE0i \xE8 y\xE8": [22568], "g\xE8ng": [22569, 26245], "m\xE9i": [22579, 22650, 23186, 23883, 24510, 25879, 26522, 26626, 26757, 26979, 26995, 27089, 28228, 28232, 29028, 29496, 29611, 29691, 29762, 30473, 30530, 31126, 33028, 33058, 33116, 33530, 33683, 33919, 37119, 37238, 37767, 38213, 38665, 40357, 40539, 40692], "d\u01D4": [22581, 29757, 30585, 31491, 31716, 35241, 36077, 36172], "f\xE9ng": [22584, 32152, 33346, 36898], "h\xE8ng": [22588], "ch\u016Bn": [22590, 23179, 26110, 26149, 26265, 26486, 26943, 27078, 27201, 27332, 29763, 31674, 33797, 34685, 36660, 39942, 40350], "ji\u01CEng": [22594, 22870, 22888, 22892, 26728, 27123, 29518, 32809, 33177, 33931, 34083, 35611, 35762, 39004], "hu\u0101ng": [22595, 24031, 24908, 32915, 33618, 34881], "du\xE0n": [22597, 26029, 26039, 26932, 27573, 27592, 28997, 29782, 30891, 31766, 31850, 32222, 32526, 33142, 33902, 36502, 37723, 38203], "t\u01CE": [22612, 22678, 29549, 29562, 39833, 39976, 40142], "w\u011Bng": [22613, 22883, 23905, 25882, 26273, 30600, 33994], "s\u0101i s\xE0i s\xE8": [22622], "z\xE0ng": [22623, 24329, 33235, 33247, 33900, 34101, 37562], "ti\xE1n": [22625, 23623, 24684, 27834, 28233, 29875, 29979, 29980, 3e4, 30027, 30033, 30901, 30924, 32971, 38352, 38423, 40235, 40390, 40399], "zh\xE8ng": [22627, 24129, 25919, 35388, 35533, 35657, 35777, 35812, 37073, 37165, 38741, 40202], "ti\xE1n zh\xE8n": [22635], "w\u0113n": [22637, 26167, 27058, 27551, 28201, 28331, 29797, 30239, 34160, 35953, 36668, 36672, 36754, 37822, 39234, 39963, 39982, 40129], "li\xF9": [22639, 24263, 30943, 32719, 38625, 38692, 39230, 39736, 40410, 40552], "h\u01CEi": [22640, 28023, 28920, 37244, 37282], "l\u01CEng": [22641, 26390, 26391, 26404, 28922, 34018], "b\xE8ng": [22644, 25596, 27893, 29967, 32179, 36454, 36856, 36908, 37872, 38234], "ch\xE9n": [22645, 23480, 23576, 24561, 25936, 25974, 26216, 26335, 26645, 27140, 27785, 28993, 30222, 33251, 33566, 33664, 33680, 34095, 34236, 34740, 35366, 35574, 36569, 36784, 36839, 37378, 38472, 38515, 38659, 40400, 40590], "\u014Du qi\u016B": [22648], "qi\xE0n ji\xE0n": [22649], "zhu\u0101n tu\xE1n": [22652], "shu\u01CEng": [22653, 24929, 28474, 29245, 32276, 37871], "sh\xFA": [22654, 23116, 23408, 29881, 31211, 36118, 36174], "l\u01D2u": [22655, 23901, 23937, 29962, 31699, 31757], "ch\xED": [22656, 24347, 25345, 27744, 28454, 31486, 31554, 31630, 31722, 33548, 33614, 34483, 35608, 36030, 36223, 36383, 36831, 36833, 36933, 36959, 36978, 37705, 39347, 39536], "sh\xF9": [22661, 24246, 24251, 24631, 24661, 25101, 26463, 26641, 27193, 27821, 28465, 28484, 28630, 31446, 31466, 32073, 33127, 33623, 33921, 34410, 34899, 35019, 35918, 36848, 37477, 37680, 37859, 38676, 40336], "d\xEC zh\xEC": [22662, 30096], "k\xE0n": [22664, 23809, 30640, 30681, 30945, 34894, 39723], "ch\u011Bn": [22667, 22822, 30838, 30876, 30947, 36098, 36283, 36408, 37718], "zh\u01D0 zhu\xF3": [22668], "qi\u01CEng": [22671, 32328, 32358, 32677, 35137], "z\u0113ng": [22679, 22686, 24974, 29844, 30704, 30963, 32638, 35652, 37163, 40027], "qi\xE1ng": [22681, 22715, 23281, 23321, 27183, 27299, 28434, 29254, 33378, 34051, 34103, 34336], "ku\xE0i tu\xED": [22692], "tu\u01CEn d\u01D2ng": [22693], "qi\xE1o qu\xE8": [22695], "z\u016Bn d\u016Bn": [22699], "qi\u0101o \xE1o": [22717], "y\xEC t\xFA": [22719], "xu\xE9 b\xF3 ju\xE9": [22726], "l\u01CEn": [22728, 23358, 23364, 23375, 25042, 25078, 25597, 25829, 25900, 27012, 27414, 28008, 28452, 28768, 32412, 32518, 32625, 35239, 35261, 35272, 37250, 39026], "hu\xE0i": [22730, 22750, 34366], "r\u01CEng": [22732, 22756, 25880, 29209], "l\xE0n xi\xE0n": [22735], "d\u01CEo": [22740, 23548, 23566, 23707, 23798, 23947, 23948, 23993, 25443, 25623, 25827, 27101, 31095, 31106, 31153, 36424, 38502, 38557, 38575], "ru\u01D0": [22753, 26741, 27236, 32352, 34122, 34123, 34306, 34307], san: [22765], "zhu\xE0ng": [22766, 22767, 22773, 25758, 28939, 29366, 29376], "k\xE9 qi\xE0o": [22771, 27580], "k\u01D4n": [22776, 22780, 24707, 25414, 26801, 30833, 31093, 31239, 31259, 32145, 35021, 38315, 38328, 38403], "m\u01CEng": [22782, 28461, 33595, 33725, 33726, 34830], "c\xFAn": [22783, 23384], "zh\u01D0 zh\u014Dng": [22786], "g\u01D4 y\xEDng": [22787], "ji\xE0ng xi\xE1ng": [22789, 38477], "p\xE1ng f\xE9ng f\u0113ng": [22790], "zh\u0101i": [22792, 25434, 25688, 25995, 25998, 27064, 31874, 40779], "xu\xE0n xi\xF2ng": [22800], "w\xE0i": [22806, 39009], "w\u01CEn yu\xE0n w\u0101n yu\u0101n": [22807], "m\u01CEo w\u01CEn": [22808], "m\xE8ng": [22818, 22819, 23391, 26790, 30310, 38693], "d\xE0 d\xE0i": [22823], "f\u016B f\xFA": [22827, 22983, 26510, 31920], "gu\xE0i": [22828, 24618, 24672], "y\u0101ng": [22830, 22990, 25264, 27523, 27889, 31207, 32998, 37472, 37704, 38645, 40230, 40495], "h\u0101ng b\xE8n": [22831], "g\u01CEo": [22832, 25630, 26482, 27072, 27073, 27322, 31233, 31294, 31295, 32286, 32543, 33746, 34241, 34291], "t\u0101o b\u011Bn": [22834], "t\xF3u tou": [22836], "y\u01CEn t\u0101o": [22837], "ku\u0101 ku\xE0": [22840, 35463], "ji\xE1 ji\u0101 g\u0101 xi\xE1": [22841], "hu\xE0": [22843, 23155, 23295, 23301, 23819, 25702, 26489, 26528, 26726, 27116, 27194, 28549, 30011, 30059, 30069, 32355, 33305, 35441, 35545, 35694, 35805, 40650], "ji\u0101 ji\xE1 g\u0101 xi\xE1": [22846], "\u0113n": [22848, 24681, 33981], "d\u012B t\xEC": [22851], "y\u01CEn y\u0101n": [22852, 28208], "p\xE0o": [22853, 30129, 30384, 30770, 31007, 31022, 38756, 40621], "n\xE0i": [22856, 26608, 28223, 32784, 33816, 35110, 37692, 40720], "qu\u0101n ju\xE0n": [22861, 24366, 26860], "z\xF2u": [22863, 25549], "q\xEC qi\xE8 xi\xE8": [22865], "k\u0101i": [22866, 24320, 25577, 37926, 38158, 38283], "b\u0113n b\xE8n": [22868, 27853], "t\xE0o": [22871], "z\xE0ng zhu\u01CEng": [22872], "b\u011Bn": [22873, 26412, 26957, 30042, 32713, 33519], "x\xF9n zhu\xEC": [22878], "sh\u0113": [22882, 27304, 29470, 30061, 30066, 36050, 36054, 36170, 36619], "h\u01CE p\xF2 t\u01CEi": [22884], "\xE0o y\xF9": [22885, 22887, 28570], "y\u016Bn": [22891, 27698, 27699, 33920, 33941, 34681, 36103, 36191], "du\u01D2 ch\u011B": [22898], "n\u01DA r\u01D4": [22899], "n\xFA": [22900, 23397, 31535, 39377, 39549], "d\u012Bng d\u01D0ng ti\u01CEn": [22901], "t\u0101 ji\u011B": [22905], "nu\xE1n": [22907], "h\u01CEo h\xE0o": [22909], "f\xE0n": [22911, 23310, 26805, 27726, 27867, 28412, 28714, 29359, 30024, 30421, 31541, 31684, 33539, 35337, 36009, 36137, 36588, 36669, 39151, 39152, 39277], "shu\xF2": [22913, 25632, 26388, 27082, 28865, 29197, 30687, 33972, 37785, 37984, 38084], "f\u0113i p\xE8i": [22915], "w\xE0ng": [22916, 24536, 26106, 26395, 26402], "zhu\u0101ng": [22918, 22941, 23076, 24196, 24210, 26729, 26761, 27137, 31911, 31962, 33624, 33674, 35013, 35037], "m\u0101": [22920, 23229], "f\u016B y\u014Du": [22923], "h\xE0i ji\xE8": [22926], "d\xF9": [22930, 22956, 26460, 27564, 28193, 31226, 33423, 33648, 34713, 34855, 34873, 37709, 38208, 38767], "mi\xE0o": [22937, 24217, 24255, 24287, 29573, 31447], "f\u01D2u p\u0113i p\u012B": [22938], "yu\xE8 ju\xE9": [22940], "ni\u016B": [22942], "n\xE0 n\xE0n": [22944], "tu\u01D2": [22949, 23287, 24249, 26925, 26965, 27234, 39692, 39958, 40270], "w\xE0n yu\xE1n": [22951], "f\xE1ng": [22952, 25151, 32938, 38450, 39796, 40066], "n\u012B": [22958], "zh\xF3u": [22959, 30881], "zh\u0101o": [22961, 24054, 25307, 26157, 37335, 37450, 37731, 38026, 39371], "n\u01CEi n\u01D0": [22963], "t\u01D2u": [22965, 25960, 32015, 34339, 40648], "xi\xE1n xu\xE1n x\xF9": [22966], "zh\xED y\xEC": [22967, 31175], "\u0113": [22968, 22975, 23104, 23641], "m\xE8i": [22969, 23194, 23504, 25274, 26048, 26151, 27820, 29021, 30167, 30491, 30584, 31065, 31683, 34654, 34946, 36298, 39741, 39749], "q\u012B q\xEC": [22971], "x\u016B x\u01D4": [22977, 31280], "sh\u0101n sh\xE0n": [22989, 22999, 33515, 37348, 38032], "m\xE1n": [22991, 24946, 27168, 34542, 34875, 35646, 39237, 39314, 39703, 39704, 39995, 40151], "ji\u011B": [22992, 23182, 27294, 27601, 39159], "w\u011Bi w\u0113i": [22996], "p\u012Bn": [23e3, 25340, 30999, 31334, 39338, 39518], "hu\xE1 hu\xF3": [23009], "ji\u0101o xi\xE1o": [23011], "g\xF2u d\xF9": [23012], "l\u01CEo m\u01D4": [23013], "ni\xE1n ni\xE0n": [23017], "zh\u011Bn": [23019, 23634, 24363, 25262, 26147, 26517, 30043, 30137, 30485, 31289, 32285, 32293, 32540, 32836, 33817, 34967, 35030, 35225, 35386, 35786, 36587, 36728, 36788, 39383, 39698], "h\xE9ng": [23022, 24646, 24658, 28870, 29673, 33019, 34309, 34913, 37957, 40244, 40262, 40507], "j\u016Bn x\xFAn": [23024], "ku\u0101 h\xF9": [23025], "\xE8 y\xE0": [23030], "xi\u0101n sh\u0113n": [23034], "w\xE1": [23043], "r\xE1o r\u01CEo": [23046, 23304], "sh\xE0o sh\u0101o": [23051], "xi\u0113": [23054, 25587, 26964, 27463, 34638, 34829], "w\u01D4 m\xE9i m\u01D4": [23058], "chu\xF2 l\xE0i": [23061], "ni\xE1ng": [23064, 23330, 23363], "n\xE0 nu\xF3": [23068], "p\u014Du b\u01D0": [23069], "n\u011Bi su\u012B": [23070], "tu\xEC": [23079, 29050, 34555, 34581, 36864, 39422], "m\u01CEn": [23080, 23640, 28288, 28385, 28415, 34728, 34766, 35156, 37835], "w\xFA w\xF9 y\xFA": [23082], "x\u012B \u0101i": [23085], "zhu\xEC shu\xEC": [23095], "d\u014Dng d\xF2ng": [23099], "\u01CEi \xE1i \xE8": [23102], "\u0113 \u011B": [23103], "mi\xE1n": [23106, 23349, 23424, 26467, 26825, 27312, 27339, 30496, 30664, 30666, 30671, 32191, 32220, 32501, 33415, 34642], "p\u01D2u p\xE9i b\xF9": [23108], "bi\u01CEo": [23114, 33087, 34920, 35057, 35134, 35544, 37686], "f\xF9 f\xE0n": [23119], "w\u01D2": [23120, 23121, 25105], "n\xED n\u01D0": [23127, 26879], "qu\xE1n ju\xE0n": [23128, 24787], "h\u016Bn": [23130, 26127, 26156, 26836, 28093, 30567, 30575, 30856, 33636, 33911, 34066, 36683, 38333, 38413], "qi\u0101n j\u01D0n": [23132], "w\u0101n w\xE0": [23136], "l\xE1i l\xE0i": [23137, 24469, 24480], "zh\u014Du ch\u014Du": [23140], "chu\xF2 n\xE0o": [23141], "n\xFC\xE8 \xE0n": [23145], "h\xF9n k\u016Bn": [23147], "d\xE0ng y\xE1ng": [23160], "n\xE0n": [23163], "ru\xF2 chu\xF2": [23164], "ji\u01CE": [23165, 23724, 26010, 26013, 27022, 27098, 27295, 29630, 30002, 32987, 37440, 38078], "t\u014Du y\xFA": [23166, 23214], "y\xF9 y\xFA": [23168], "w\xE9i w\u011Bi": [23169], "d\xEC t\xED": [23170, 29686, 33488], "r\xF3u": [23171, 25545, 26580, 28184, 29027, 29768, 29895, 31160, 31880, 31941, 33052, 33132, 33863, 34650, 36418, 36654, 37714, 38819, 39461, 39943, 40340], "ru\u01CEn n\xE8n": [23174], "mi\xE1o": [23180, 23289, 25551, 30596, 33495, 40339, 40523], "y\xED p\xE8i": [23184], "mi\xE1n mi\u01CEn": [23188], "t\xED sh\xEC": [23198, 24831], "du\xF2 tu\xF3": [23200, 27826], "\u01CEo": [23210, 23228, 33401, 33466, 34948, 35158, 38266], "ch\xFA z\xF2u": [23216], "y\xECng": [23221, 26144, 26254, 30828, 33185, 40038], "q\xEDn sh\u0113n": [23232], "ji\xE0": [23233, 24143, 26550, 27042, 31292, 39381, 39550], "s\u01CEo": [23234], "zh\u0113n zh\u011Bn": [23235], "ji\u0113 su\u01D2": [23237], "m\xEDng m\u01D0ng": [23239], "ni\u01CEo": [23243, 23325, 23346, 33553, 34086, 34949, 35018, 35117, 40479], "t\u0101o": [23245, 24141, 24354, 24902, 25487, 25647, 27076, 28059, 28372, 28644, 29803, 32091, 32282, 32295, 32486, 35420, 35615, 36673, 38833, 38876, 38892, 39160, 39253], "bi\xE1o": [23249], "pi\xE1o pi\u0101o": [23254, 34232], "xu\xE1n": [23257, 24748, 25080, 26294, 27272, 28457, 29572, 29831, 29887, 30147, 34561], "m\xE0n m\u0101n": [23258], "k\u0101ng": [23261, 23931, 24247, 24951, 27130, 28462, 30730, 31301, 31968, 36543, 37870, 40007], "h\u0101n n\u01CEn": [23272], "n\xE8n": [23273, 23280], "zh\u0113": [23276, 36974], "m\u0101 m\xE1": [23282], "pi\xE8": [23283], "zh\u01CEn": [23288, 23637, 25612, 26025, 26028, 29718, 30415, 30430, 36670, 37254, 39085, 39120], "xi\u0101n y\u01CEn j\xECn": [23312], "li\u01CEn": [23322, 25947, 25986, 29711, 29833, 32695, 33080, 33225, 34105, 34333, 34334, 35043, 35165, 37179], "qi\xF3ng hu\xE1n xu\u0101n": [23323], "d\u01D2ng": [23326, 25026, 31677, 33891, 34155, 35532], "c\u0101n": [23328, 28236, 29208, 39137, 39184, 39490, 39574], "ti\u01CEo": [23333, 23464, 26176, 26387, 31409, 33025], "b\xED": [23350, 33656, 40763], "li\u01D4": [23356, 26611, 26625, 26718, 26746, 27246, 29102, 29643, 32185, 32506, 32630, 32640, 37622, 38157], "qi\u0101n xi\u0101n": [23365, 27430], "xi\xE9 hu\u012B": [23368], "hu\u0101n qu\xE1n": [23369], "l\xED l\xEC": [23371, 40599], "zh\xFA chu\xF2": [23374], "k\u01D2ng": [23380, 24656], "m\u0101 z\u012B": [23382], "s\u016Bn x\xF9n": [23385, 23403], "b\xE8i b\xF3": [23387, 35478], "y\xF2u ni\u016B": [23399], "zhu\u01CEn": [23400, 31473, 36681], "h\xE1i": [23401, 39608], "n\u0101o": [23404], "ch\xE1n c\xE0n": [23409], "b\xF2": [23417, 27287, 34327, 35666], "n\xE1i": [23419, 33097], "n\xEDng n\xECng": [23425, 23501, 23511, 23516, 23527, 29999], "zh\xE1i": [23429], "t\u016B ji\u0101": [23434], "s\xF2ng": [23435, 35359, 35494, 35772, 35829, 36865, 37817, 38924, 39042, 39224], "r\xF2u": [23437, 32905, 35699], "zh\u016Bn": [23442, 31360, 34912, 35524, 35846, 36813], "m\xEC f\xFA": [23443], "d\xE0ng t\xE0n": [23445], "w\u01CEn yu\u0101n": [23451], "ch\u01D2ng": [23456, 23541], "q\xFAn": [23469, 23790, 24108, 32675, 32676, 35033, 35040], "z\u01CEi": [23472, 23869], "b\u01CEo sh\xED": [23474], "ji\u0101 jia jie": [23478], "hu\u0101ng hu\u01CEng": [23482], "ku\u0101n": [23485, 23515, 23532, 33239, 37991, 39627, 39638], "s\xF9 xi\u01D4 xi\xF9": [23487], "ji\xE9 z\u01CEn": [23489], "b\xECng b\u01D0ng": [23502], "j\xECn q\u01D0n": [23510], "l\xF3u j\xF9": [23520], "xi\u011B xi\xE8": [23531], "q\u012Bn q\xECn": [23540], "c\xF9n": [23544, 31871], "du\xEC": [23545, 23550, 23565, 24636, 24989, 25055, 28647, 28713, 30867, 31051, 32144, 34225, 35656, 35701, 36699, 38431, 38510], "l\xFC\xE8 lu\xF3": [23549], "sh\xE8 y\xE8 y\xEC": [23556], "ji\u0101ng ji\xE0ng qi\u0101ng": [23558], "ji\u0101ng ji\xE0ng": [23559, 27974, 28479, 30074], "z\u016Bn": [23562, 23967, 27197, 32583, 36981, 37903, 40018, 40159, 40334, 40439], "sh\xF9 zh\xF9": [23564, 28557], "xi\u01CEo": [23567, 26195, 26241, 26313, 30363, 30370, 31601, 31615, 31712, 35599], "ji\xE9 j\xED": [23568, 35800, 38794], "sh\u01CEo sh\xE0o": [23569], "\u011Br": [23570, 23571, 23572, 26670, 27622, 27953, 29246, 29669, 32819, 34238, 34888, 36272, 36841, 36999, 37498, 38098, 39180, 39285, 39404], "w\u0101ng y\xF3u": [23586], "w\u0101ng": [23587, 23593, 23594, 23595, 27754], "li\xE0o": [23589, 23590, 24278, 25730, 26009, 28819, 31415, 37904, 38243], "m\xE9ng m\xE1ng l\xF3ng p\xE1ng": [23592], "g\xE0": [23596, 39744], "ku\xEC ku\u01D0": [23599], "tu\xED": [23605, 24346, 31336, 34312, 36458, 38564, 38969, 38970, 38973, 39059, 39755], "y\u01D0n": [23609, 23998, 24341, 26372, 27267, 27324, 27389, 28158, 28645, 30270, 30318, 31884, 34335, 34451, 34750, 35732, 36218, 36251, 36625, 37391, 38775], "ch\u01D0 ch\u011B": [23610], "k\u0101o": [23611, 39643], "j\xECn j\u01D0n": [23613], "w\u011Bi y\u01D0": [23614], "ni\xE0o su\u012B": [23615], "c\xE9ng": [23618, 23652, 23954, 39507], "di\u01CEo": [23628], "b\u012Bng p\xEDng b\u01D0ng": [23631], uu: [23639, 26338, 32833, 34418, 34634, 38375], "l\xF2u": [23642, 28431, 30232, 30266, 30267, 37860, 38210, 38475], "sh\u01D4 zh\u01D4": [23646, 23660], "xi\xE8 t\xEC": [23647], "ch\xE8 c\u01CEo": [23662], "t\xFAn zh\u016Bn": [23663], "n\xEC j\u01D0": [23664], "h\xF3ng l\xF3ng": [23672], "q\u01D0 k\u01CEi": [23682, 35912], "\xE1ng": [23687, 26114, 26171], "g\u01CEng g\u0101ng": [23703, 23831], "k\u011B": [23714, 25956, 28167, 28212, 28835], "g\u01D2u": [23715, 29399, 29629, 31537, 32775, 32776, 32777, 33503, 35967], "ti\xE1o": [23719, 23737, 27172, 31058, 31524, 33408, 33812, 34010, 34024, 34601, 36834, 37594, 37797, 38807, 39659, 39880, 39991, 40102, 40800, 40838], "q\u016B j\u016B": [23720], "l\u01D0ng": [23725, 23994, 38936, 39046], "p\xF2": [23734, 25920, 27942, 28240, 28894, 29632, 30772, 30774, 31893, 33962, 39748], "b\u0101 k\xE8": [23751], "lu\xF2": [23752, 25694, 27931, 27932, 29334, 29662, 31551, 32409, 33638, 35451, 38610, 39409, 39558, 40261], "f\xF9 ni\xE8": [23754], "\u011Bn": [23758], "zh\xEC sh\xEC": [23769, 23867], "qi\u01CE": [23776, 36306, 37216, 38800], "qi\xE1o ji\xE0o": [23780, 30276], "xi\xE9 y\xE9": [23787], "b\u016B": [23788, 24239, 26209, 35495, 36875, 37437, 37691, 38072, 39188, 40271], "ch\xF3ng": [23815, 23816, 29214, 34411, 34665, 34802, 35080, 38528], "z\xFA cu\xEC": [23826, 26890], "l\xEDng l\xE9ng": [23834], "d\xF2ng d\u014Dng": [23840], "xi\xE1o": [23844, 27944, 28102, 35364, 35509], "p\xED b\u01D0": [23845, 33432], "zh\u01CEn ch\xE1n": [23853, 23939, 23940], "w\u01CEi w\u0113i": [23860], "y\xE1ng d\xE0ng": [23861], "sh\xEC di\xE9": [23868], "y\xE0o": [23870, 26332, 29070, 29183, 30661, 31358, 31380, 31556, 32768, 33374, 33647, 33903, 34220, 34277, 34958, 35230, 35407, 35729, 38783, 40386, 40542, 40764], "k\u0101n zh\xE0n": [23873], "h\xE1n d\u01CEng": [23877], "qi\xE0n k\xE0n": [23884], "w\xF9 m\xE1o": [23885], "k\u011B ji\xE9": [23889, 23985], "w\u0113i w\u011Bi": [23892], "k\u0113": [23897, 26607, 26869, 27068, 27158, 29249, 29297, 29328, 29634, 30132, 30604, 30933, 31002, 31185, 31262, 31392, 33834, 34198, 34485, 34636, 36279, 36722, 37272, 37427, 38070, 38950, 38982, 39063, 39617], "d\xE0ng t\xE1ng": [23907], "r\xF3ng y\xEDng": [23908, 29187], "\xE1i k\u01CEi": [23910], "k\u0101o qi\u0101o": [23914], "cu\xF3": [23919, 23923, 30180, 30700, 33963, 34070, 34392, 40570, 40574], "qi\u01CEn q\u012Bn": [23920], "d\xEC di\xE9": [23933], "c\u0113n": [23934], "d\u01D0ng": [23935, 33404, 34209, 37924, 38914, 39030, 40718, 40721], "\xE1o \xE0o": [23941], "p\u01D0 p\xE8i": [23951], "ji\xE0o qi\xE1o": [23968, 28496], "ju\xE9 gu\xEC": [23969, 40156], "zh\u0101n sh\xE0n": [23974, 40163], "xi\xE8 ji\xE8": [23984], "gu\u012B x\u012B ju\xE0n": [23986], "r\u016B": [23999], "l\xEC li\xE8": [24001, 26841, 29188, 32159], "x\u012B gu\u012B ju\xE0n": [24002], "y\xEDng h\u014Dng": [24006], "y\u01D0ng": [24010, 24302, 24433, 25708, 26796, 28481, 30271, 30317, 30696, 31310, 37090, 37915, 38964, 39053, 39061, 39062], "ch\u01CEo": [24016, 28818, 29052, 30503, 40616], "cu\xE1n": [24017, 27349, 27409], "chu\u0101n": [24027, 24029, 27674, 29775, 31359], "j\u012Bng x\xEDng": [24032], "ch\xE1o": [24034, 24035, 26177, 28421, 28526, 29258, 31410, 32634, 35647, 36680, 37147, 40716], "qi\u01CEo": [24039, 24832, 39644], "g\u01D2ng": [24041, 24318, 25329, 25330, 26673, 27742, 29657, 36609, 38799], "ch\xE0 ch\u0101 ch\u0101i c\u012B": [24046], "xi\xE0ng h\xE0ng": [24055], "shu\xE0i": [24069, 24101, 34752], "p\xE0": [24074, 24085, 24597, 34969], "t\u01CEng n\xFA": [24081], "m\xF2 w\xE0": [24083], "ti\u0113 ti\u011B ti\xE8": [24086], "zh\u01D2u": [24090, 26221, 30107, 30573, 31634, 32920, 33783, 39902], "ju\u01CEn ju\xE0n": [24099], "shu\xEC": [24104, 28055, 28058, 30561, 31237, 31246, 35038], "ch\xF3u d\xE0o": [24113, 24172], "ji\u01CEn ji\u0101n s\xE0n": [24116], "sh\xE0 qi\xE8": [24121], "q\xED j\xEC": [24122, 33632], "sh\u0101n qi\u0101o sh\u0113n": [24147], "zhu\xE0ng chu\xE1ng": [24162], "ch\u0101n ch\xE0n": [24168], "mi\xE8": [24173, 25073, 25635, 28357, 28781, 28885, 31011, 31742, 34065, 34190, 34843, 34890, 37974, 40052, 40211], "g\u0101n g\xE0n": [24178], "b\xECng b\u012Bng": [24182, 24183], "j\u012B j\u01D0": [24190], "gu\u01CEng \u0101n": [24191], "gu\u01CEng": [24195, 24291, 29367, 29559], me: [24197], "d\xF9n t\xFAn": [24201], "b\xE0i t\u012Bng": [24205], "y\xECng y\u012Bng": [24212], "d\u01D0 de": [24213], "d\xF9 du\xF3": [24230], "m\xE1ng m\xE9ng p\xE1ng": [24236], "b\xECng p\xEDng": [24240], "ch\u011Bng": [24241, 24732, 30536, 36894, 39425, 39563], "j\u012B cu\xF2": [24244], "q\u01D0ng": [24252, 24270, 27326, 28416, 33496, 35531, 35622, 35831, 38915, 39031], "gu\u012B w\u011Bi hu\xEC": [24262], "j\u01D0n q\xEDn": [24273], "ku\xF2": [24275, 25193, 25313, 25844, 28662, 31560, 33855, 33856, 34526, 38346, 38420, 38697, 38815, 38841, 38869, 38946, 39712], "qi\xE1ng s\xE8": [24295, 34196], "y\u01D0n y\xECn": [24308, 38544, 38560, 38577, 39150, 39154, 39278], "p\xF2 p\u01CEi": [24313, 36843], "n\xF2ng l\xF2ng": [24324], "d\xEC t\xEC tu\xED": [24351], "ju\xE9 zh\u0101ng": [24353], "m\xED m\u01D0": [24357, 24396, 38753], "ch\u0101o": [24360, 24586, 25220, 27433, 35372, 36229, 37396, 38046], yi: [24364], "sh\u0101o": [24368, 26067, 28903, 28988, 29138, 31602, 33348, 33847, 34161, 36622, 39678, 39865], "xu\u0101n yu\u0101n": [24370], "qi\xE1ng qi\u01CEng ji\xE0ng": [24375, 24378], "t\xE1n d\xE0n": [24377, 37256], "bi\xE8": [24390], "qi\xE1ng ji\xE0ng qi\u01CEng": [24394], "j\xEC xu\u011B": [24400], "tu\xE0n": [24406, 35094], "yu\u0113": [24415, 26352, 26353, 30705], "sh\u0101n xi\u01CEn": [24417], "w\xE9n": [24419, 25991, 28806, 29683, 30226, 32359, 32862, 33440, 34441, 34442, 34721, 34753, 38330, 38335, 38341, 38374, 38395, 38412, 38639, 39356, 39367, 39792, 40188, 40205, 40740], "p\xE9ng b\u0101ng": [24429], "pi\u0101o pi\xE0o": [24431], "zhu\xF3 b\xF3": [24436], "tu\u01D2 y\xED": [24437], "p\xE1ng f\u01CEng": [24439], "w\u01CEng": [24442, 24448, 24451, 24792, 26505, 26850, 32178, 32593, 32594, 32595, 32596, 32598, 33781, 34535, 34628, 35511, 36638, 36747, 39757], "c\xFA": [24450, 27522], "d\xE0i d\u0101i": [24453], "hu\xE1i": [24458, 24576, 25040, 25079, 27088, 28142, 32818, 34361, 35106, 35121, 36381], "w\u0101 w\xE0ng ji\u0101": [24461], "ch\u011Bng zh\xE8ng": [24462], "d\xE9 d\u011Bi de": [24471], "c\xF3ng z\xF2ng": [24478], "sh\xEC t\u01D0": [24485], "t\xED ch\xED": [24498, 40343, 40345], "d\xE9": [24499, 24503, 24692, 24755, 24810, 28098, 37696, 38173], "zh\u01D0 zh\u0113ng": [24500, 24501], "bi\xE9": [24502, 30335, 33666, 34498, 35154, 36457], "ch\u014Dng zh\u01D2ng": [24504], "ji\u01CEo ji\xE0o": [24508, 31493, 31562], "l\xF2ng l\u01D2ng": [24511], "q\xFA j\xF9": [24514, 28192, 30655, 34742], "d\xECng t\xECng": [24522], "g\u01CEi": [24523, 25913], "r\u011Bn": [24525, 26656, 26659, 31225, 31252, 32155, 33615, 33653, 36533], "ch\xE0n": [24527, 25076, 25082, 30815, 32700, 38850, 39019], "t\xE8": [24529, 24925, 29305, 34776, 37617, 38141], "t\xE8 t\u0113i tu\u012B": [24530], "g\u0101n h\xE0n": [24531, 25916], "y\xEC q\xEC": [24532], "t\xE0i sh\xEC": [24533], "x\u012B li\u011B": [24538], "y\u012Bng y\xECng": [24540, 25033, 35661], "m\u01D0n w\u011Bn m\xEDn": [24542, 24543], "s\u014Dng zh\u014Dng": [24554], "y\xF9 sh\u016B": [24556, 24710], "q\xED sh\xEC": [24559, 32774], "t\xFAn zh\u016Bn d\xF9n": [24563], "qi\xE1n q\xEDn": [24564, 25202], "h\xFAn": [24566, 27985, 28222, 39195, 39300, 39746, 40754], "ni\u01D4": [24568, 25197, 28804, 29379, 32016, 32445, 33701, 37397, 38062, 38773], "ku\xE1ng w\u01CEng": [24569], "k\u0101ng h\xE0ng": [24572], "k\xE0i x\xEC": [24574, 24894], "\xF2u": [24580, 24938], "b\u01CEo b\xE0o": [24585], "m\xEDn m\xE9n": [24587], "zu\xF2 zh\xE0": [24589], "z\u011Bn": [24590], "y\xE0ng": [24591, 24665, 26679, 27096, 27171, 28478, 32661, 35399], "k\xF2u j\xF9": [24592], "n\xE1o ni\xFA": [24595], "zh\u0113ng zh\xE8ng": [24596, 25497, 38066, 38126], "ti\u0113 zh\u0101n": [24599], "h\xF9 g\xF9": [24600], "c\u016B j\xF9 z\u016B": [24602], "s\u012B s\u0101i": [24605], "y\xF3u ch\xF3u": [24606], "t\u016B di\xE9": [24610], "y\u014Du y\xE0o": [24622], "xu\xE0n": [24624, 26145, 26982, 27883, 28210, 28843, 29700, 30505, 30905, 32098, 32316, 32335, 32474, 34073, 34898, 34984, 36121, 37449, 37831, 38089, 38239, 39092], "x\xF9 xu\xE8": [24628], "b\xEC p\u012B": [24630], "x\u012B sh\xF9": [24632], "n\xE8n n\xEDn": [24641], "ti\u0101o y\xE1o": [24652], "x\u012B q\u012B x\xF9": [24659], "xi\xE0o ji\u01CEo": [24660], "h\u016B ku\u0101": [24663], "n\u01DC": [24679, 26386, 34882, 34884], "h\xE8n": [24680], "d\xF2ng t\u014Dng": [24683], "qu\xE1n zhu\u0101n": [24686], "\xE8 w\xF9 \u011B w\u016B": [24694, 24801], "t\xF2ng": [24696, 24927, 24965, 30171, 34901], "yu\u0101n ju\xE0n": [24705], "qi\u0101o qi\u01CEo": [24708], "ji\xE8 k\xE8": [24712], "h\xE0o ji\xE0o": [24718], "hu\u01D0": [24724, 27283, 27584, 27585, 27591, 29164, 35693], "m\xE1n m\xE8n": [24727, 38804], "y\u012B y\xEC": [24728, 34915], "qu\u0101n": [24731, 31646, 37897], "ku\u012B l\u01D0": [24733], "y\xEC ni\xE0n": [24741], "m\xE8n m\u0113n": [24758], "gu\xE0n": [24761, 24762, 24815, 24931, 25532, 25692, 27148, 27423, 27892, 28075, 28485, 28748, 29215, 29912, 30437, 31030, 31100, 32582, 32592, 36011, 36143, 36480, 36966, 37830, 38005, 40057, 40475, 40563], "k\u014Dng k\u01D2ng": [24766], "l\u01D4n l\xF9n": [24768], "gu\u01D2": [24776, 26524, 26881, 27112, 31935, 32182, 33747, 34622, 35065, 35073, 36640, 39196, 39299], "yu\u0101n w\u01CEn": [24780, 31650], "l\xE1n l\xEDn": [24783], "y\xF9 x\xF9": [24784, 28130], "chu\xF2 chu\xEC": [24793], "h\u016Bn m\xE8n": [24795], "ch\u01CEng t\u01CEng": [24797], "su\u01D2 ru\u01D0": [24802], "c\u01CEn": [24808, 24920, 25007, 40682, 40690], "c\xE1n": [24813, 24921, 24922, 27531, 27544, 34453, 34629, 34870, 34874], "d\xE0n d\xE1": [24814, 24986], "r\u011B": [24825], "y\xFA t\u014Du": [24841], "k\xE0i q\xEC": [24850], "d\xE0ng t\xE1ng sh\u0101ng y\xE1ng": [24851], "ch\xE9n x\xECn d\u0101n": [24854], "k\xE8 qi\xE0": [24856], "nu\xF2": [24862, 25062, 25063, 25535, 25638, 27026, 31276, 31332, 31953, 31973, 31983, 35582, 35834, 36419, 36925, 37737, 38168], "g\u01CEn": [24863, 25792, 25954, 26751, 27204, 28553, 28600, 30383, 31174, 31240, 31540, 33417, 34918, 36214, 36245, 40036, 40161], "c\xF2ng s\u014Dng": [24865], "s\u0101i s\u012B s\u01D0": [24866], "g\u014Dng g\xF2ng h\u01D2ng": [24873, 24912], "shu\xF2 s\xF9": [24876, 27948], "y\xE1o y\xE0o": [24878], "hu\xE0ng": [24880, 26306, 27045, 28361, 30365, 30377, 37796], "zh\u011Bng": [24888, 25229, 25327, 25972, 26232], "c\u01CEo": [24890, 33400, 33609, 39474], "x\xEC xi\xE9": [24896], "c\u01CEo s\u0101o": [24901], "x\xF9 ch\xF9": [24905], "qi\xE8 qi\xE0n": [24906], "c\xE1o c\xF3ng": [24914], "\xE0o \xE1o": [24928], "li\xE1n li\u01CEn": [24937, 26815, 27108, 27363], "j\xECn q\xEDn j\u01D0n": [24940], "d\xEC ch\xEC": [24952], "zh\xED zh\xE9": [24953], "l\xF3u l\u01DA": [24954, 40412], "c\xF2ng": [24961, 35621], "zh\u012B zh\xEC": [24964, 30693, 32340, 32455], "ch\u0113ng": [24966, 25690, 25744, 25745, 26239, 26621, 26854, 27221, 27273, 27871, 28030, 29732, 30624, 30848, 32253, 32585, 34511, 34806, 36202, 36204, 37887, 37923, 38455, 38743, 38963, 39251], "bi\u0113": [24971, 34380, 40009, 40150, 40712, 40862], "ch\xE9ng d\xE8ng zh\xE8ng": [24981], "x\u01D0 x\u012B": [24984], "du\xEC d\xF9n t\u016Bn": [24990], "xi\u0101o ji\u0101o": [24994], "xi\xE1n xi\xE0n": [25002], "li\xE1o li\u01CEo": [25005, 29134, 29198, 29202], "sh\xE9ng": [25012, 32260, 32329, 32361, 32499, 35677], "n\xE1o n\u01CEo n\xE1ng": [25017], "j\u01D0ng j\xECng": [25020], "j\u01D0 ji\u01CEo": [25023], "xu\u0101n hu\u0101n": [25025], "c\u01CEo s\u0101o s\xE0o": [25030], "m\xE8n": [25041, 25059, 26282, 28950, 29148], "m\xE8ng m\xE9ng m\u011Bng": [25052], "\xE0i y\xEC n\u01D0": [25053], "m\xE9ng m\u011Bng": [25054, 30626, 30674], "q\xED j\u012B j\xEC": [25056], "m\u01D2": [25057], "l\xE1n xi\xE0n": [25058], "y\u014Du y\u01D2u": [25070], "li\xFA li\u01D4": [25072, 34288], "r\xE0ng": [25081, 35698, 35731, 35753], "hu\u0101n": [25085, 27426, 27475, 27489, 29566, 35737, 35995, 37188, 39529, 40197, 40269], "n\u01CEn": [25089, 25543, 28275, 29045, 33129, 34683, 36199], "m\xED m\xF3": [25090], "g\xE0ng zhu\xE0ng": [25093, 25094], "zhu\xE0ng g\xE0ng": [25095], "qu x\u016B": [25100], "x\xEC h\u016B": [25103, 25135, 25138], "ji\xE1 g\u0101": [25115], "z\xE9i": [25117, 34824, 36042, 36156, 39938, 40033, 40087], "d\u011Bng": [25125, 31561], "h\u016B x\xEC": [25137], "chu\u014D": [25139, 36372, 36916], "bi\u01CEn pi\u0101n": [25153], "sh\u01CEng ji\u014Dng": [25156], "sh\xE0n sh\u0101n": [25159], "c\xE1i": [25165, 26448, 32404, 35009, 36001, 36130], "zh\u0101 z\u0101 zh\xE1": [25166], "l\xE8 l\xEC c\xE1i": [25168], "b\u0101 p\xE1": [25170], "d\u01CE d\xE1": [25171], "r\u0113ng": [25172], "f\u01CEn f\xFA": [25173], "di\u01CEo d\xED yu\u0113 l\xEC": [25178], "k\xE1ng g\u0101ng": [25179], "y\u016B w\u016B": [25180], "y\u016B w\u016B k\u016B": [25181], "tu\u014D ch\u01D0 y\u01D0": [25185], "g\u01D4 ji\xE9 x\xEC g\u0113": [25186], "d\xE8n": [25189, 25213], "s\u01CEo s\xE0o": [25195, 25475], "r\u01CEo": [25200, 25854, 38562], "x\u012B ch\u0101 q\xEC": [25201], "b\u0101n p\u0101n": [25203], "b\u0101 \xE0o": [25207], "x\u012B zh\xE9": [25208], "zh\xEC s\u01D4n k\u01CEn": [25211], "zh\u01CEo": [25214, 27836, 29813], "ku\xE1ng w\u01CEng z\xE0i": [25218], "h\xFA g\u01D4": [25223, 40516, 40536], "b\u01CE b\xE0": [25226], "d\u01CEn sh\u011Bn": [25228], "n\xE8 n\xEC ru\xEC n\xE0": [25232], "zhu\u0101": [25235, 27291, 31803, 33212, 39677], "p\xF3u": [25236, 35026], "zh\xE9 sh\xE9 zh\u0113": [25240], "p\xF3u p\u014Du f\u016B": [25241, 25418], "p\u0101o": [25243, 25291, 33068, 33826], "\u01CEo \xE0o ni\xF9": [25245], "l\u016Bn l\xFAn": [25249, 25476], "qi\u01CEng qi\u0101ng ch\u0113ng": [25250], "zh\u01D0 zh\u01CEi": [25255], "b\xF9 p\u016B": [25258, 26600], "y\u01CEo t\u0101o": [25261], "h\u0113 h\xE8 qi\u0101": [25266], "n\u01D0 n\xED": [25267], "p\u012B p\u0113i": [25271], "m\u01D2 m\xF2 m\u0101": [25273], "ch\u014Du": [25277, 29352, 29355, 30259, 31704], "ji\u0101 y\xE1": [25281], "f\xFA b\xEC": [25282, 30032, 40349], "zh\u01CE": [25283, 30504, 30751, 39866, 40093], "d\u0101n d\xE0n d\u01CEn": [25285], "ch\u0101i c\u0101": [25286], "ni\u0101n": [25288, 34091], "l\u0101 l\xE1 l\u01CE l\xE0": [25289], "b\xE0n p\xE0n": [25292], "p\u0101i": [25293], "l\u012Bn": [25294], "gu\u01CEi": [25296, 26548, 26618], "tu\xF2 t\xE0 zh\xED": [25299], "\xE0o \u01CEo ni\xF9": [25303], "j\u016B g\u014Du": [25304], "p\u012Bn p\xE0n f\u0101n": [25306], "b\xE0i b\xE1i": [25308], "b\xE0i": [25309, 25943, 31255, 31930, 34221, 36097, 36133, 38875], "qi\xE1": [25316], "n\u01D0ng n\xEDng n\xECng": [25319], "z\xE9 zh\xE1i": [25321, 25799], "h\xE9n": [25323, 30165, 38798], "ku\xF2 gu\u0101": [25324], "ji\xE9 ji\xE1": [25326], "n\u01D0n": [25328], "shu\u0101n": [25332, 26643, 38274, 38377], "c\xFAn z\xF9n": [25333], "z\u0101 z\u01CEn": [25334, 26714], "k\u01CEo": [25335, 25911, 26674, 28900, 32771], "y\xED ch\u01D0 h\xE0i": [25336], "c\xE8 s\xE8 chu\xF2": [25338], "zhu\xE0i zhu\u0101i y\xE8": [25341], "sh\xED sh\xE8": [25342], "b\u0101i": [25344, 25520], "ku\xF2 gu\u0101ng": [25348], "n\xF2ng": [25354, 25397, 40776], "ji\xE0o ji\u0101o": [25357, 25934, 25945], "ku\xE0 k\u016B": [25358], "n\xE1 r\xFA": [25360], "ti\u0101o ti\u01CEo": [25361], "di\xE9 sh\xE8": [25365], "li\u011B": [25368, 27615], "y\xE0 y\u01CE": [25372, 25495], "w\u014D zhu\u0101": [25373], "xi\xE9 ji\u0101": [25375, 25406], "d\u01CEng d\xE0ng": [25377, 25803], "zh\xE8ng zh\u0113ng": [25379, 27491, 30151], "\u0101i \xE1i": [25384], "tu\u014D shu\xEC": [25385, 25437], "t\u01D0 t\xEC": [25390], "su\u014D sh\u0101": [25393], "s\u0101 sh\u0101 su\u014D": [25394], "k\u0113ng qi\u0101n": [25395, 25724], "b\xE0ng p\xE9ng": [25399], "ru\xF3 ru\xE1": [25404], "ji\u01CEo k\xF9": [25409], "w\u01D4 w\xFA": [25410], "t\u01D2ng": [25413, 26742, 31570, 31593, 32113, 32130, 32479], "hu\xF2 ch\xEC": [25415], "t\xFA sh\u016B ch\xE1": [25416], "l\u01DA lu\u014D": [25419], "sh\u0101o sh\xE0o": [25422, 31245], "ni\u0113": [25423, 25553], "sh\xF9 s\u01D2ng s\u014Du": [25426], "y\xE9 y\xFA": [25427], "ju\xE9 zhu\xF3": [25428], "b\xF9 p\xFA zh\xEC": [25431], "z\xF9n": [25432, 37516], "l\u0101o": [25438, 25736, 31913], "s\u01D4n": [25439, 25613, 27051, 31499, 31565, 31664, 37800, 38588], "w\xE0n w\u01CEn w\u0101n y\xF9": [25445], "p\u011Bng": [25447, 28110, 30351], "sh\u011B": [25448], "f\u01D4 f\xF9 b\u01D4": [25452], "d\xE1o": [25455], "lu\xF2 lu\u01D2 w\u01D2": [25456], "ju\u01CEn qu\xE1n": [25458], "ch\u0113n ti\u01CEn": [25461], "ni\u01CEn ni\u0113": [25467], "ru\xF3 w\u011Bi r\xE9": [25468], "zu\xF3": [25469, 26152, 31208, 31251, 31600, 33675, 37436], "w\xF2 xi\xE1": [25470], "q\xECng qi\xE0n": [25477], "p\xF3u p\u01D2u": [25482], "qi\u0101": [25488, 33884], "p\xE1i p\u01CEi": [25490], "qi\u0101n w\xE0n": [25492], "y\xE8 y\u0113": [25494], "ni\xE8 n\u01D0 y\xEC": [25500], "hu\xF2 x\xF9": [25501], "y\xE0n sh\xE0n y\u01CEn": [25502], "zh\u011Bng d\xECng": [25503], "k\xF2ng": [25511, 38810], "tu\u012B": [25512, 34039, 34284], "z\u014Du zh\u014Du ch\u014Du": [25515], "ti\xE0n": [25517, 33306], "k\xE8n": [25519, 35017, 35075], "p\xE1": [25521, 26487, 28502, 29228, 29750, 31586], "gu\xF3 gu\u0101i": [25524], "d\u01CEn sh\xE0n": [25528, 25763], "ch\u0101n xi\u0101n c\xE0n sh\u01CEn": [25530], "s\u0101o": [25531, 25620, 28318, 32325, 32555, 34726, 39442, 39479, 39968, 40034, 40139], "p\xE8ng": [25533, 26922, 27120, 30896, 36395], "zh\u0113ng k\u0113ng": [25537], "ji\u016B y\xF3u": [25538], "ji\u0101n ji\u01CEn": [25539, 31835], "p\xEC ch\xE8": [25546], "s\u0101i z\u01D2ng c\u0101i": [25548], "t\xED d\u012B d\u01D0": [25552], "z\u01D2ng s\u014Dng": [25556], "hu\xE1ng y\xF3ng": [25560], "z\u01CEn zu\xE0n": [25565], "x\u016B j\u016B": [25567], "k\xE9 qi\u0101": [25570], "chu\u0101i chu\u01CEi chu\xE0i tu\xE1n zhu\u012B": [25571], "d\xEC t\xEC": [25573], "l\xE1 l\xE0": [25574], "l\xE0": [25575, 26955, 28290, 29902, 30220, 32715, 33240, 34635, 34674, 34847, 36770, 36771, 37982, 38260, 39694, 39931], "ji\u0113 q\xEC": [25581], "ch\xF2ng d\u01D2ng": [25584], "di\xE9 sh\xE9 y\xE8": [25586], "ji\xE0n qi\xE1n ji\u01CEn": [25589], "y\xE9": [25590, 29239, 29242, 29784, 37603, 37761, 38104], "ch\u0101n": [25600, 25723, 25881, 35047, 35164, 35224, 35271, 36799, 37587], "g\u0113 g\xE9": [25601, 25841], "l\u01D2u l\u014Du": [25602, 25695], "ch\u014Du z\u01D2u": [25610], "chu\u0101i": [25611], "s\u016Bn": [25614, 27074, 29426, 29499, 33642, 33984, 34165, 34206, 39143, 39153], "r\xF3ng n\xE1ng n\u01CEng": [25617], "p\xE9ng b\xE0ng": [25618], "cu\u014D": [25619, 29811, 30923, 36425, 36979, 37277], "k\u0113 \xE8": [25621], "n\xF9 nu\xF2 n\xF2u": [25625], "l\u0101 xi\xE9 xi\xE0n": [25626], "qi\u01D4": [25629, 31959], "xi\u01CEn xi\u0101n": [25631], "ji\xE9 zh\xE9": [25641], "p\xE1n b\u0101n p\xF3": [25643], "b\u0101n": [25644, 25917, 26001, 26002, 29677, 30242, 30285, 32934, 34689, 34700, 35113, 36780, 38930, 39041], "zh\xEC n\xE1i": [25649], "w\u0101 w\u01CE w\xE0": [25650], "hu\xE1": [25651, 25782, 28369, 29502, 34128, 34710, 35649, 37877, 38119, 39498, 39557, 40424], "qi\u0101ng qi\u01CEng ch\u0113ng": [25654], "ti\xE1n sh\u0113n": [25655], "n\xE1 nu\xF2": [25659], "\xE8n": [25665], "sh\xE8 ni\xE8": [25668, 25885], "b\xECn": [25672, 25839, 27553, 27567, 33169, 33231, 39628, 39637, 39657, 39682, 39699, 39714], "sh\u0101 s\xE0 sh\u01CEi": [25675], "ch\u01CEn s\xF9n": [25676], "ji\u016B li\xFA li\xE1o ji\u01CEo n\xE1o": [25678], "f\xE9ng p\u011Bng": [25683], "shu\u0101i": [25684], "d\xEC t\xFA zh\xED": [25685], "q\xEC j\xEC ch\xE1": [25686], "s\u014Du s\u01D2ng": [25687], "li\u01CEn li\xE0n": [25689], "g\xE0i x\xEC": [25697], "h\xF9 ch\u016B": [25698], "t\xE0ng": [25701, 28907, 29145, 37899], "n\xE1i zh\xEC": [25704], "m\xF3 m\u0101": [25705], "ji\u0101ng qi\xE0ng": [25706], "\xE1o qi\xE1o": [25710], "ni\xE8 ch\xE8": [25712], "m\xE1n m\xE0n": [25713], "ch\xE0n c\xE1n": [25714], "s\xE8 m\xED s\xF9": [25717], "bi\u0101o bi\xE0o": [25725], "ju\u0113 ju\xE9": [25733], "pi\u0113": [25734, 26300, 27669, 30629], "pi\u011B pi\u0113": [25735], "z\u01CEn z\u0101n z\u0113n qi\xE1n": [25741], "s\u0101 s\u01CE": [25746], "h\xF2ng": [25748, 35340, 35751, 38336, 39720], "h\xE9ng gu\xE0ng": [25751], "ni\u01CEn": [25754, 25781, 25862, 28042, 28990, 30910, 31760, 36429, 36456, 36494, 36646, 36743], "ch\xE9ng zh\u011Bng": [25756], "hu\u012B w\xE9i": [25757], "c\u0101o": [25761, 25805, 31961], "xi\u0101o s\u014Du": [25768], "li\xE1o li\u0101o": [25769], "cu\u014D zu\u01D2": [25774], "w\u011Bi tu\u01D2": [25777], "cu\u0101n": [25786, 25883, 27718, 36479, 36517, 38009, 38249], "qi\xE0o y\u0101o j\u012B": [25789], "zhu\u0101 w\u014D": [25790], "l\xE8i l\xE9i": [25794], "n\u01CEng": [25795, 25902, 26345, 28770], "q\xEDng j\u01D0ng": [25807], "ku\u01CEi": [25811, 33967], "p\u01D0 b\xF2": [25815], "b\xF2 b\u0101i": [25816], "j\xF9 j\u01D0": [25818], "m\u0113ng": [25821], "s\u01D2u s\xF2u": [25822], "x\u01D0ng": [25828, 31669, 37266], "c\u0101": [25830], "n\xEDng n\u01D0ng n\xECng": [25840], "zh\xEC ji\xE9": [25843], "l\xE0 li\xE8": [25848, 29193], "s\xF2u s\u01D2u": [25851], "l\xEC lu\xF2 yu\xE8": [25853], "t\u012B zh\u0101i zh\xEC": [25855], "p\u0101n": [25856, 28504, 30469, 33824], "l\xE8i": [25858, 27882, 28057, 28122, 31159, 31867, 32391, 34353, 37241, 37511, 37649, 38939, 38954, 39006, 39075], "c\u0101 s\u01CE": [25859], "j\xF9n p\xE8i": [25864], "l\xEC lu\xF2": [25866, 36498], "l\xE0 l\xE0i": [25867, 27380], "l\xFA lu\xF3": [25870], "z\u01CEn cu\xE1n": [25874], "xi\u0101n ji\u0101n": [25877], "m\xED m\u01D0 m\xF3": [25888], "z\u01CEn cu\xE1n z\xE0n zu\u0101n": [25890], "zu\xE0n": [25893], "l\xEC sh\xE0i": [25894], "l\xEC lu\u01D2": [25901], "gu\u01D0 gu\xEC": [25905], "j\u012B q\u012B y\u01D0": [25906], "f\xE0ng": [25918], "w\xF9 m\xF3u": [25924], "ch\xF9 sh\u014Du": [25930], "g\xE9 gu\xF3 \xE8": [25931], "du\xF3 du\xEC": [25939, 25946], "du\u014D qu\xE8": [25952, 25962], "s\xE0n s\u01CEn": [25955], "d\u016Bn du\xEC": [25958, 38246], "q\u012B y\u01D0 j\u012B": [25959], "xi\xE0o xu\xE9": [25961], "sh\xF9 sh\u01D4 shu\xF2": [25968, 25976], "\xE1i zh\xFA": [25969, 25971], "xi\xF2ng xu\xE0n": [25979], "zhu\xF3 zh\xFA": [25984], "y\xEC d\xF9": [25985], "l\xED t\xE1i": [25988], "f\u011Bi f\u0113i": [26e3], "y\u01D4 zh\u014Dng": [26004], "d\xF2u d\u01D2u": [26007], "w\xF2 gu\u01CEn": [26017], "t\u01D2u ti\u01CEo": [26018], "d\xF2u": [26019, 26794, 28002, 30168, 31398, 31431, 33072, 33651, 35910, 36887, 37078, 37208, 38295, 38360, 39190, 39294, 39717, 39718, 39722, 39724, 39725], "y\xEDn zh\xEC": [26022], "ch\u01CEn ji\xE8": [26042], "w\u016B y\u016B y\xFA": [26044], "y\xF3u li\xFA": [26047], "p\xE1ng b\xE0ng": [26049], "m\xE1o m\xE0o": [26052], "p\u012B b\xEC": [26055], "xu\xE1n xu\xE0n": [26059], "w\xFA m\xF3": [26080], "z\u01CEo": [26089, 26531, 26630, 26839, 28577, 29866, 34235, 34299, 34468], "g\u0101": [26094], "g\xE0n h\xE0n": [26096], "t\xE1i y\u012Bng": [26098], "x\u016B x\xF9": [26100], "t\u016Bn zh\xF9n": [26109], "w\xF9 w\u01D4": [26111], "p\xF2 p\xE8i": [26146], "z\xF2ng": [26158, 29460, 30125, 30258, 31933, 31945, 31981, 32294], "\u01CEi": [26169, 27600, 30702, 34108, 34297, 35690, 36535, 38701, 38724], "hu\xE0ng hu\u01CEng": [26179], "xu\u01CEn": [26181, 30307, 30316, 36873, 36984], "x\xF9 ku\u0101": [26183], "h\u01D2ng": [26190], "sh\xE0i": [26194, 26348], "y\u016Bn y\xF9n": [26197, 29044], "sh\xE8ng ch\xE9ng": [26207, 26889, 30427], "j\u01D0ng y\u01D0ng": [26223], "sh\u01CEn": [26225, 29068, 30546, 35234, 38275, 38378, 38485, 38493], "q\u01D0 d\xF9": [26229], "\u01CEn \xE0n y\u01CEn": [26235], "w\u01CEng w\xE0ng": [26240], "z\xE0n": [26242, 26283, 29897, 29906, 29914, 31158, 35192, 35715, 35738, 36059, 36106, 36190, 36436, 37180, 37694, 37864, 39265], "y\xF9n y\u016Bn": [26248], "m\xEDn m\u01D0n": [26251], "d\u01D4 sh\u01D4": [26255], "sh\u01D4": [26257, 26329, 28539, 30297, 31980, 32626, 34213, 34223, 34295, 34560, 34868, 35169, 35177, 40042, 40048, 40653, 40736, 40737], "ji\u01CEn l\xE1n": [26261], "nu\u01CEn": [26262, 29015, 39210], "b\xE0o p\xF9": [26292], "x\u012B x\u01D0": [26303], "p\xF9 b\xE0o": [26333, 28689], "q\u016B q\u01D4": [26354, 32054], "g\xE8ng g\u0113ng": [26356], "h\u016B h\xF9": [26358, 38653], "z\u0113ng c\xE9ng": [26365, 27239], "c\xE9ng z\u0113ng": [26366, 31474], "c\u01CEn qi\xE1n ji\xE0n": [26369], "qi\xE8 h\xE9": [26373], "b\xEC p\xED": [26375, 31110, 31507, 35048], "y\u01D2u y\xF2u": [26377], "b\u0101n f\xE9n": [26380, 40187], "f\xFA f\xF9": [26381, 27921], "f\u011Bi k\u016B": [26383, 32976], "q\xFA x\xF9 ch\u01D4n": [26384], "ju\u0101n zu\u012B": [26392], "hu\u0101ng m\xE1ng w\xE1ng": [26394], "q\u012B j\u012B": [26399], "t\xF3ng chu\xE1ng": [26403, 27238], "zh\xE1": [26413, 29264, 31642, 34491, 35671, 37720, 38113, 38296, 38392], "zh\xFA sh\xF9 sh\xFA": [26414], "sh\xF9 sh\xFA zh\xFA": [26415], "zh\u016B sh\xFA": [26417], "p\u01D4 p\xF2 p\u014D pi\xE1o": [26420], "d\u0101o ti\xE1o m\xF9": [26423], "gu\u01D0 qi\xFA": [26425], "xi\u01D4": [26429, 28395, 28483, 31956], "ch\xE9ng ch\u0113ng": [26430], "z\xE1": [26434, 27823, 30776, 35149, 38609, 38620, 38629, 38900], "y\xFA w\u016B": [26437], "g\u0101n g\u01CEn": [26438], "ch\u0101 ch\xE0": [26440], "sh\u0101n sh\u0101": [26441], "c\u016Bn": [26449, 30388, 31476, 33189, 36358, 37032], "r\xE8n \xE9r": [26450, 26773], "sh\xE1o bi\u0101o": [26451], "d\xEC du\xF2": [26453, 26532], "g\u016B g\xE0i": [26458], "y\xED zh\xEC l\xED du\xF2": [26461], "g\xE0ng g\u0101ng": [26464], "ti\xE1o ti\u0101o": [26465, 26781], "m\xE0 m\u01CE": [26473], "s\xEC zh\u01D0 x\u01D0": [26475], "yu\xE1n w\xE1n": [26476, 34454], "b\xE8i f\xE8i": [26478], "sh\u016B du\xEC": [26488], "ni\u01D4 ch\u01D2u": [26491], "w\xF2 yu\xE8": [26498, 33234], "m\xE1o": [26502, 27611, 27650, 28213, 29286, 30683, 32606, 33541, 33542, 34661, 34762, 36574, 37205, 37502, 37672, 38170, 39654, 40348], "p\u012B m\xEC": [26504], "\xE0ng": [26506, 30414, 37280], "f\u0101ng b\xECng": [26507], "h\xF9 d\u01D0": [26513], "x\xEDn": [26516, 35153, 37908, 39733], "y\u0101o y\u01CEo": [26518], "\u011B \xE8": [26521], "zh\u012B q\xED": [26525], "c\u014Dng z\u014Dng": [26526, 27141], "xi\u0101n zh\u0113n": [26542], "t\xE1i s\xEC": [26545], "g\u01D2u j\u01D4 g\u014Du": [26552], "b\u0101o f\xFA": [26553], "y\xEC xi\xE8": [26555, 26663], "tu\xF3 du\xF2": [26561, 39345, 39364, 39534], "y\xED du\xF2 l\xED": [26562], "n\u01D0 ch\xEC": [26565], "p\xE1n b\xE0n": [26568, 36312], "y\u01CEng y\xE0ng y\u0101ng y\u012Bng": [26573], "f\xF9 f\u016B f\u01D4": [26574], "b\u01CEi b\xF3 b\xF2": [26575], "m\u01D2u": [26576], "sh\xE1o sh\xE0o": [26582], "zh\xE8": [26584, 27164, 27993, 28123, 34071, 34757, 36889, 40403, 40551], "y\xF2u y\xF3u": [26586, 27390], "gu\xEC j\u01D4": [26588], "zh\xE0 zu\xF2": [26590], "di\xE9 zh\xEC": [26595, 30512], "zh\u0101 z\u01D4 z\u016B": [26596], "ch\xE1 zh\u0101": [26597, 26619], "\u0101o \xE0o": [26602, 36586], "b\u0101 f\xFA p\xE8i b\xF3 bi\u0113": [26605], "du\xF2 zu\xF3 w\xF9": [26606], "b\xEC bi\xE9": [26610], "zh\xF9 ch\xF9": [26615], "b\u0113i p\u0113i": [26616], "sh\xEC f\xE8i": [26617], "sh\u0101n zh\xE0 shi c\xE8": [26629], "l\xEC yu\xE8": [26638, 27359], "q\xEC qi\xE8": [26644, 30732], "q\u012B x\u012B": [26646, 36426], "gu\u0101 ku\xF2": [26653], "b\u012Bng b\u0113n": [26655], "xi\xE0o ji\xE0o": [26657], "ji\xE0n z\xF9n": [26667, 35e3], "y\u01D2u y\xF9": [26671], "h\xE9 h\xFA": [26680], "g\u0113n": [26681, 36319], "zh\u012B y\xEC": [26682], "g\xE9 g\u0113": [26684], "h\xE9ng h\xE1ng": [26689], "gu\xE0ng gu\u0101ng": [26692], "y\xED t\xED": [26699, 33617], "s\u0101ng": [26705, 26706, 27105], "j\xFA ji\xE9": [26708], "y\xFA m\xF3u": [26713], "r\xE1o n\xE1o": [26721, 27208], "gu\xEC hu\xEC": [26727, 27292], "ch\xE9n zh\xE8n": [26733], "t\u012Bng y\xEDng": [26735], po: [26738], "b\xE8n f\xE0n": [26739], "f\u0113ng f\xE8ng": [26747, 33873], "s\xF9 y\xECn": [26752], "t\u01D0ng t\xECng": [26755], "xu\u0101n ju\u0101n xi\xE9": [26763], "t\xFA ch\xE1": [26764], "\u0101o y\xF2u": [26766], "ku\u01CEn": [26785, 27445, 27454, 27456], "sh\u0101o s\xE0o": [26786], "q\xEDn ch\xE9n c\xE9n": [26787], "l\xED s\xEC q\u01D0": [26793], "ch\u0101n y\xE1n": [26804], "b\u012Bn b\u012Bng": [26809, 27103, 27315], "t\xE1o ch\xF3u d\xE0o": [26812], "c\u014Dng s\u014Dng": [26823], "g\xF9n h\xF9n": [26829], "d\xE9 zh\xE9": [26831], "p\xE1i b\xE8i p\xE8i": [26833], "b\xE0ng p\u01D2u b\xE8i b\u0113i": [26835], "d\xEC d\xE0i t\xEC": [26851], "s\u0113n": [26862, 26926, 27118, 35138], "r\u011Bn sh\u011Bn": [26863], "l\xE9ng l\u0113ng l\xEDng": [26865], "f\xFA s\xF9": [26868], "z\u014Du s\u01D2u": [26871], "z\u014Du": [26872, 31619, 32197, 35535, 35833, 37049, 37104, 37138, 37177, 38508, 39478, 39546, 39915, 40112, 40640, 40817, 40826], "zh\xE0o zhu\u014D": [26873], "ch\u0113n sh\u0113n": [26877], "ji\u0113 qi\xE8": [26884], "y\u01D0 y\u012B": [26885], "ch\xF3u zh\xF2u di\u0101o": [26886], "qi\u0101ng k\u014Dng": [26892], "zhu\u012B chu\xED": [26894], "b\u0113i p\xED": [26897], "m\u0113n": [26906], "qu\u0101n ju\xE0n qu\xE1n": [26918], "du\u01D2 chu\xE1n": [26927], "w\u011Bi hu\u012B": [26930], "ji\u01CE ji\u0101": [26933], "h\xE1n ji\u0101n": [26935], "sh\xE8n zh\u0113n": [26937], "y\xE0n y\xE0": [26939], "zh\u0101 ch\xE1": [26946], "gu\u014D ku\u01CE": [26951], "j\xED zh\xEC": [26966], "k\u01D4 h\xF9": [26971], "y\xF3u y\u01D2u": [26978], "s\u01D2ng c\u014Dng": [26980], "yu\xE1n xu\xE0n": [26981], "y\u01CEng y\xE0ng y\u012Bng": [26983], "pi\xE1n": [26985, 33020, 33089, 36038, 36417, 39394, 39432, 39560, 39615], "di\xE9 y\xE8": [26986], "d\xF9n sh\u01D4n": [26991], "c\xF2u z\xF2u": [26993], "d\xEC d\u01D0 sh\xEC": [26996], "k\u01CEi ji\u0113": [26999], "r\xF3u r\xF2u": [27002], "l\xE8 yu\xE8": [27005], "w\u0113n y\xF9n": [27013, 38832], "l\u01D8": [27016, 27354, 27648, 33186, 34264, 38317, 38398, 39522, 39540], "sh\xE9n": [27018, 31070, 37486, 39984], "b\u012B pi": [27020], "zh\u01CEn ni\u01CEn zh\xE8n": [27024], "f\xFA f\xF9 b\xF3": [27025], "ji\xE0n j\xECn": [27031], "b\u01CEng b\xE0ng": [27036], "sh\u0101 xi\xE8": [27037, 27175], "n\xF2u": [27080, 32808, 37778, 37918], "qi\u01CEn li\xE1n xi\xE0n": [27087], "g\xE0ng": [27091, 28981, 28985, 31611], "g\u0101o": [27092, 27129, 27248, 27356, 30590, 31705, 31957, 32660, 33263, 38879, 39227, 39640, 39641, 40398, 40433, 40731], "di\u0101n zh\u011Bn zh\u0113n": [27097], "k\u01CEn ji\xE0n": [27099], "x\xED di\xE9": [27106], "j\u012B gu\u012B": [27107], "r\xF3ng y\u014Dng": [27110], "tu\xE1n shu\xE0n qu\xE1n": [27115], "q\xEC s\xE8": [27117], "cu\u012B zh\u01D0": [27119], "y\u01D2u ch\u01CEo": [27121], "m\xE0n w\xE0n": [27134], "l\xED ch\u012B": [27142], "l\xE9i l\u011Bi": [27151, 27345, 30988], "ch\xE1o ji\u01CEo ch\u0101o": [27156], "ch\u0113ng t\xE1ng": [27160], "ji\u016B li\xE1o": [27163], "m\xF3 m\xFA": [27169], "ni\u01CEo m\xF9": [27170], "h\xE9ng h\xE8ng": [27178, 27243], "xu\u011B": [27184, 33188, 33373, 36684, 38634, 40008, 40149], "f\xE1 f\xE8i": [27203], "r\xF9n": [27213, 28070, 28516, 33206, 38287, 38304, 38384], "zh\u01CEn ji\u01CEn": [27215], "sh\xF9n": [27219, 30618, 30636, 33308, 34147, 38918, 39034, 39690], "tu\xED d\u016Bn": [27220], "t\xE1ng ch\u0113ng": [27222], "s\xF9 qi\u016B": [27226], "t\xE1n di\xE0n": [27229], "f\xE9n f\xE8n f\xE8i": [27240], "r\u01CEn y\u0101n": [27242], "c\u016B chu": [27259], "sh\u016B qi\u0101o": [27262], "p\xEDng b\xF2": [27288], "zh\xE1i sh\xEC t\xFA": [27297], "bi\u01CEo bi\u0101o": [27302], "qi\u0101n li\xE1n": [27318], "n\u01D0 m\xED": [27319], "ji\xE0n k\u01CEn": [27323], "n\xF2u ru\u01CEn r\xFA": [27325], "j\u012B j\xEC": [27333, 31144], "hu\u01CEng gu\u01D2 g\u01D4": [27342], "l\u01DC ch\u016B": [27350], "mi\xE8 m\xE8i": [27351], "\u014Du": [27353, 27431, 27472, 27572, 27590, 29935, 29964, 33170, 34290, 35635, 35764, 37826, 40206, 40407, 40485], "zh\xF9 zhu\xF3": [27361], "ju\xE9 j\xEC": [27373], "hu\xE1i gu\u012B": [27376], "ch\xE1n zh\xE0n": [27395], "w\xE9i zu\xEC": [27400], "c\xE1ng": [27404, 38006], "y\xF9 y\xEC": [27429], "ch\xF9 q\xF9 x\xEC": [27434], "k\xE0i \xE0i": [27436], "y\xEC y\u012Bn": [27437], "x\xEC k\xE0i": [27439], "shu\xF2 s\xF2u": [27446], "\u01CEi \u0113i \xE9i \u011Bi \xE8i": [27448], "q\u012B y\u012B": [27449], "chu\u0101 x\u016B": [27451], "ch\u01D0 chu\xE0i": [27452], "k\u01CEn qi\xE0n": [27455], "k\u01CEn k\xE8": [27457], "chu\u01CEn chu\xE1n": [27458], "y\u012Bn y\u0101n": [27461], "j\xECn q\u016Bn": [27471], "p\u0113n": [27477], "x\u016B chu\u0101": [27480], "x\u012B sh\xE8": [27481], "li\u01CEn h\u0101n": [27483], "zh\xEC ch\xED": [27501], "s\xE8 sh\xE0": [27504], "s\u01D0": [27515], "w\u011Bn m\xF2": [27518], "pi\u01CEo": [27533, 30379, 30623, 37285, 39008], "q\xEDng j\xECng": [27537], "f\u01D2u b\xF3": [27541], "zh\xED shi": [27542], "y\xE8 y\u0101n y\xE0n": [27543], "h\u016Bn m\xE8i": [27545], "ch\xF2u": [27552, 33264, 36954], "ku\xEC hu\xEC": [27560, 28291, 28528], "cu\xE0n": [27561, 29110, 29224, 31388, 31428, 31713, 31762], "y\u012Bn y\u0101n y\u01D0n": [27575], "q\xECng k\u0113ng sh\u0113ng": [27576], "y\xE1o xi\xE1o xi\xE0o": [27581], "g\u016B g\u01D4": [27586, 34500], "gu\xE0n w\u0101n": [27596], "d\xFA d\xE0i": [27602], "x\xFAn x\xF9n": [27621], "m\xFA": [27626, 27649], "d\xF2u nu\xF2": [27629], "s\u0101i su\u012B": [27640], lu: [27655], "s\xE0o": [27657, 30233, 30658, 39646], "sh\xEC zh\u012B": [27663], "d\u012B d\u01D0": [27664], "m\xE1ng m\xE9ng": [27667], "y\xE1ng r\xEC": [27676], "shu\u01D0": [27700, 27701, 27706, 38294], "zh\u011Bng ch\xE9ng zh\xE8ng": [27702], "t\u01D4n": [27709], "f\xE1n f\xE0n": [27710], "gu\u01D0 ji\u01D4": [27711], "b\u012Bn p\xE0 p\u0101": [27715], "zhu\xF3 qu\xE8": [27723], "d\xE0 t\xE0i": [27727], "p\xECn": [27734, 29277, 32856], "h\xE0n h\xE1n": [27735, 39343], tu: [27746], "t\u0101ng sh\u0101ng": [27748, 28271], "zh\u012B j\xEC": [27749], "g\xE0n h\xE1n c\xE9n": [27765], "w\xE8n m\xE9n": [27766], "f\u0101ng p\u0101ng": [27768], "h\u01D4 hu\u01CEng": [27771], "ni\xFA y\xF3u": [27772], "h\xE0ng": [27782], "sh\u011Bn ch\xE9n": [27784], "d\xF9n zhu\xE0n": [27788], "n\u01DC ni\u01D4": [27793], "m\xE9i m\xF2": [27794, 27809], "t\xE0 d\xE1": [27795], "m\xEC w\xF9": [27797], "h\xF3ng p\u0101ng": [27799], "sh\u0101 sh\xE0": [27801], "zhu\u01D0 z\u01D0": [27805], "\u014Du \xF2u": [27812, 28442], "j\u01D4 j\xF9": [27822], "tu\u014D du\xF3": [27824], "m\u01D0 l\xEC": [27829], "y\xED ch\xED": [27830], "xi\xE8 y\xEC": [27844], "b\xF3 p\u014D": [27850], "m\xEC b\xEC": [27852, 31192], "ch\xF9 sh\xE8": [27855], "y\u014Du y\xF2u \u0101o": [27857], "p\u0113ng p\xEDng": [27865, 30801], "p\xE0o p\u0101o": [27873], "n\xED n\xEC": [27877, 31196], "yu\xE8 s\xE0": [27879], "ju\xE9 xu\xE8": [27884, 30118], "l\xF3ng shu\u0101ng": [27895, 28711], "lu\xF2 p\u014D": [27898, 28668], "z\xE9 sh\xEC": [27901, 28580], "s\u01CE x\u01D0": [27922], "s\xE8 q\xEC z\xEC": [27923], "x\u01D0 xi\u01CEn": [27927], "k\u01CEo k\xE0o": [27928], "\xE0n y\xE0n \xE8": [27933], "l\u011Bi l\xE8i": [27937], "qi\xE8 ji\xE9": [27951], "qi\u01CEn ji\u0101n": [27973], "j\xEC j\u01D0": [27982, 28168, 28639, 32426], "h\u01D4 x\u01D4": [27986, 28408], "j\xF9n x\xF9n": [27994, 28652], "y\u01D0ng ch\xE9ng y\xEDng": [28007], "li\xE0n l\xEC": [28016], "f\xE9ng h\xF3ng": [28018, 28292], "ji\u01D2ng ji\u014Dng": [28027], "su\u012B n\u011Bi": [28029], "y\u01D2ng ch\u014Dng": [28044], "t\u016Bn y\u016Bn": [28050], "w\u014D gu\u014D": [28065, 28198], "h\u0113ng": [28069, 33053], "zh\u01CEng zh\xE0ng": [28072, 28466], "sh\xF2u t\u0101o": [28077], "shu\xE0n": [28078, 33128], "k\u014Dng n\xE1ng": [28083], "w\xF2 w\u01CEn yu\u0101n": [28084], "tu\u014D tu\xF2": [28086], "w\u014D": [28089, 29479, 31389, 31401, 33716, 33845, 34583, 34680, 36370], "qi\xE8 j\xED": [28097], "gu\u01D2 gu\xE0n": [28105], "l\xEDn l\xECn": [28107, 29532, 30084], "t\u01CEng ch\u01CEng": [28108], "n\xE0o chu\xF2 zhu\u014D": [28118], "p\xE9ng p\xEDng": [28124], "f\xE9i": [28125, 32933, 33107, 34608], "p\xEC p\xE8i": [28128], "ni\u01CEn sh\u011Bn": [28144], "bi\u0101o h\u01D4": [28146], "ch\xFAn zh\u016Bn": [28147], "h\xF9n h\xFAn": [28151], "qi\u01CEn": [28154, 32382, 32561, 32951, 33153, 34616, 35700, 35892, 36963, 37971], "w\xE8n m\xEDn": [28162], "r\xE8 ru\xF2 lu\xF2": [28163], "d\xFA d\xF2u": [28174, 28678, 35835], "ji\xE0n ji\u0101n": [28176, 28293, 28472, 28666], "mi\u01CEn sh\xE9ng": [28177, 28576], "nu\u01CEn nu\xE1n": [28188], "qi\xFA w\xF9": [28190], "t\xEDng t\u012Bng": [28191], "d\xEC t\xED d\u012B": [28199], "g\u01CEng ji\u01CEng": [28207], "h\u014Dng q\xECng": [28217], "tu\u0101n": [28237, 29011], "hu\xEC m\u01D0n x\u016B": [28239], "x\u01D4 x\xF9": [28241], "p\xE9n": [28243, 29931, 30406, 33872], "m\u01D0n h\u016Bn": [28259], "tu\xE0n nu\u01CEn": [28266], "qi\u016B ji\u01CEo": [28267, 28268], "y\u0101n y\u012Bn": [28270], "b\xE0n p\xE1n": [28276], "zhu\u0101ng h\xFAn": [28279], "y\xE0n gu\xEC": [28302], "li\xE1n li\u01CEn ni\xE1n xi\xE1n xi\xE0n": [28307], "d\xE1 t\u01CE": [28314], "li\u016B li\xF9": [28316, 28561, 36435], "l\xF9n": [28323], "m\u01CE": [28324, 29368, 29505, 29595, 29802, 30721, 30908, 36964, 37815, 39340, 39532, 39970, 40396], "zh\u0113n q\xEDn": [28337], "n\xEC ni\xE0o": [28346], "ch\xF9 x\xF9": [28352, 30044], "w\u011Bng w\u0113ng": [28355], "h\xE0o xu\xE8": [28360], "q\xEC x\xEC xi\u0113": [28362], "x\xEDng y\xEDng": [28366], "z\xE9 h\xE0o": [28380], "pi\u0101o pi\xE0o pi\u01CEo": [28418], "c\xF3ng s\u01D2ng": [28430], "f\xE9ng p\xE9ng": [28456], "lu\xF2 t\xE0": [28463], "p\u0113ng b\u0113n": [28464], "ch\xF3ng shu\u0101ng": [28468], "hu\u01D2 ku\xF2 hu\xF2": [28471], "li\xE1o li\xFA": [28475], "cu\u01D0 cu\u012B": [28476], "c\xF3ng z\u01D2ng": [28480], "c\xF3ng z\u014Dng": [28488], "p\xEC pi\u0113": [28494], "d\xE0ng xi\xE0ng": [28498], "hu\xE1ng gu\u0101ng": [28514], "li\xE1o l\xE0o l\u01CEo": [28518], "c\u014Dng z\xF2ng": [28520], "zh\xED zh\xEC": [28522], "t\u0101n sh\xE0n": [28524], "t\xFA zh\u0101": [28531], "s\xE0n s\u01CE": [28533], "h\u0113i": [28534, 40657, 40658], "ch\xE9ng d\xE8ng": [28548, 28691], "c\u016Bn c\xFAn": [28554], "p\xE9ng p\u0113ng": [28558], "h\xF2ng g\u01D2ng": [28562, 37566], "w\xE0n m\xE0n": [28587], "ku\xE0i hu\xEC": [28590], "gu\u014D w\u014D": [28612], "p\u0113n f\xE9n": [28614], "j\xED sh\xE0": [28616], "hu\xEC hu\xF2": [28618], "d\u01D0ng t\xECng": [28622], "m\u01D0 n\u01D0": [28628], "b\xEC p\xEC": [28638], "cu\xEC zu\u01D0": [28642], "h\xF9 hu\xF2": [28649], "\u01CEi k\xE0i k\xE8": [28653], "w\u011Bi du\xEC": [28667, 28706], "z\xE0n cu\xE1n": [28669, 28754], "y\u01CEng y\xE0ng": [28673], "w\u01CEng w\u0101ng": [28679], "m\xF2 mi\xE8": [28686, 30492], "su\u01D0": [28705, 33208, 39635], "hu\xE1i w\u0101i": [28708], "z\xF9n ji\xE0n": [28723], "y\u012Bng y\u01D0ng y\xECng": [28724], "r\xE1ng r\xE0ng": [28732], "shu\xE0ng": [28736], "zhu\xF3 ji\xE0o z\xE9": [28738], "s\u01CE": [28753, 35375, 38776], "lu\xE1n lu\xE0n": [28755], "d\u01CEng t\u01CEng": [28761], "x\xFAn qu\xE1n qu\xE0n": [28773], "hu\u01D2 bi\u0101o": [28780], "zh\xE0 y\xF9": [28793], "f\xE9n b\xE8n": [28803], "ji\u01D2ng gu\xEC": [28805], "p\xE0ng f\u0113ng": [28816], "qu\u0113": [28820, 32570, 32572, 33947], "bi\u0101n": [28830, 29048, 29954, 30765, 31550, 31663, 31849, 32232, 32534, 34649, 37001, 37002, 37757, 38829, 39934, 39935, 40138], "zh\u0101o zh\xE0o": [28836], "zhu\u014D ch\xF9": [28842], "p\xE0o p\xE1o b\u0101o": [28846], "p\xE1o f\u01D2u": [28848], "sh\u01CEn qi\xE1n sh\u0101n": [28854], "zh\xE0 zh\xE1": [28856], "ji\u01CEo y\xE0o": [28868], "qu\u01CEn": [28871, 29356, 29357, 30030, 32163, 32507, 34375], "y\xE0ng y\xE1ng": [28874], "l\xE0o lu\xF2": [28889], "hu\xED hu\u01D0": [28896], "r\xE8": [28909, 29105], "f\xFA p\xE1o": [28912], "xi\xE8 ch\xE8": [28914, 28942], "y\xE0n sh\u0101n": [28923], "h\u016Bn x\u016Bn": [28932], "k\xE0o": [28933, 29330, 37548, 38096, 38752, 39859, 39884, 40083], "ju\u0101n y\xE8": [28934], "j\xF9n q\u016B": [28940], "t\u0101o d\xE0o": [28952], "ch\u01CEo j\xF9": [28963], "w\xF2 \xE0i": [28965], "z\u01D2ng c\u014Dng": [28967], "x\u012B y\xEC": [28972], "x\xECn x\u012Bn": [28974], "ch\u0101o zhu\u014D": [28975], "xi\u01D2ng y\u012Bng": [28984, 28989], "ku\u01D0": [28995, 36332, 36446, 38925], "hu\u012B y\xF9n x\u016Bn": [28999], "ji\u01CEo qi\u0101o": [29005], "qi\xE1n sh\u01CEn sh\u0101n": [29012], "x\u012B y\xED": [29013], "sh\xE0 sh\u0101": [29022], "y\xE8 zh\xE1": [29024], "y\xE1ng y\xE0ng": [29036], "\u0113n y\u016Bn": [29054], "y\u016Bn y\u01D4n": [29061], "h\xE8 xi\u0101o": [29063], "xi\xF3ng": [29066, 29067, 38596], "x\u016Bn x\xF9n": [29071, 29195], "g\xF2ng": [29077, 36002, 36129], "li\u016B": [29080], "c\u014Dng z\u01D2ng": [29084], "l\xF9 \u0101o": [29085], "sh\xFA sh\xF3u": [29087], "f\u0113ng p\xE9ng": [29090], "cu\u01D0 su\u012B": [29091], "t\u0113ng": [29093, 33199, 40735], "y\xF9n y\xF9": [29096], "\xE1o \u0101o": [29100], "h\xE0n r\u01CEn": [29103], "\u014Du \u01D2u": [29104], "hu\xE1ng hu\u01CEng": [29119], "ch\u01CEn d\u01CEn ch\xE0n": [29120], "ji\u0101o zhu\xF3 qi\xE1o ju\xE9": [29131], "y\xE0n y\u0101n": [29141], "t\xE0i li\xE8": [29156], "\u0101o": [29194], "y\xE0n x\xFAn": [29203], "ju\xE9 ji\xE0o": [29213, 35216, 35226, 35258, 35273], "l\u01CEn l\xE0n": [29222], "zhu\u01CE zh\u01CEo": [29226], "zh\u01CEo zhu\u01CE": [29227], "f\xF9 f\u01D4": [29238], "di\u0113": [29241, 35130, 36300], "z\u0101ng": [29250, 32664, 33255, 36045, 36056, 36115, 36124, 36163, 39634], "pi\xE0n pi\u0101n": [29255], "bi\u0101n mi\xE0n": [29265], "b\u01CEng": [29267, 32129, 32465], "y\u01D2u y\u014Dng": [29271], "ch\u0113ng ch\xE8ng": [29274, 31424], "ni\xFA": [29275, 29276], "ji\u016B l\xE8": [29278], "m\xF9 m\xF3u": [29279], "m\u0101ng": [29284], "g\u0113 qi\xFA": [29291], "y\xF2u ch\u014Du": [29296], "t\xE8 zh\xED": [29318], "b\u0113n": [29319, 37659, 38171], "ji\u0101n qi\xE1n": [29325, 29610], "m\xE1": [29336, 30194, 34100, 34759, 40635], "m\xE1o l\xED": [29339], "b\xE1 qu\u01CEn": [29358], "zhu\xF3 b\xE0o": [29363], "\xE0n h\u0101n": [29364], "k\xE0ng g\u01CEng": [29370], "p\xE8i f\xE8i": [29371], "f\u0101n hu\u0101n": [29375], "ku\xE1ng": [29378, 29381, 35473, 35827, 36566, 36576, 40287], "y\xED qu\xE1n ch\xED": [29387], "x\u012Bng sh\u0113ng": [29388], "tu\xF3 y\xED": [29391], "k\u01D4": [29404, 33510], "hu\xE1n hu\u0101n": [29407], "h\xE9 m\xF2": [29410], "t\xE0 sh\xEC": [29415], "m\xE1ng d\xF2u": [29429], "x\u012B sh\u01D0": [29430], "su\u0101n": [29435, 30176, 37240], "b\xE0i p\xED": [29448], "ji\u0101n y\xE0n": [29455, 35939], "y\u012B y\u01D0": [29463], "y\xE1 w\xE8i": [29466], "c\u0101i": [29468], "m\u0101o m\xE1o": [29483, 35987], "chu\xE0n chu\u0101n": [29485], "tu\u0101n tu\xE0n": [29487, 35986], "y\xE0 ji\xE1 qi\xE8": [29488], "h\xE8 xi\u0113 g\xE9 h\xE0i": [29490], "bi\u0101n pi\xE0n": [29493, 29553], "b\xF3 p\xF2": [29500], "h\xE1o g\u0101o": [29515], "f\xE9n f\xE8n": [29526], "y\xE0o xi\u0101o": [29535], "shu\xF2 x\u012B": [29537], "g\xE9 li\xE8 xi\u0113": [29542], "n\xF2u r\xFA": [29555], "n\xE1o n\u01CEo y\u014Du": [29558], "r\xE1ng": [29565, 29924, 31155, 31331, 31344, 34328, 36511, 39716], "n\xE1o y\u014Du": [29567], "l\u01DC shu\xE0i": [29575], "w\xE1ng w\xE0ng": [29579], "y\xE1ng ch\xE0ng": [29594], "m\xEDn w\xE9n": [29599], "b\u012Bn f\u0113n": [29602], "m\xE9n y\u01D4n": [29607], "qi\u0101ng c\u0101ng": [29617, 29810, 31724], "\xE1n g\u0101n": [29621], "xu\xE1n xi\xE1n": [29625], "c\u012B c\u01D0": [29628, 36304], "y\xED t\u0101i": [29638], "z\u01D4 j\xF9": [29639], "f\xE0": [29648, 29754, 34143, 39658, 39662], "y\xEDn k\xE8n": [29666], "hu\u012B h\xFAn": [29682], "xu\xE1n qi\xF3ng": [29697], "f\xFA f\u016B": [29704], "b\u01D0ng p\xEDn": [29717], "cu\xEC s\xE8": [29719], "y\xF9 w\xE9i": [29727], "ti\u01CEn ti\xE0n": [29728], "zhu\xF3 zu\xF3": [29730], "b\u011Bng p\u011Bi": [29731], "gu\u01CEn": [29743, 29869, 30191, 31590, 31649, 33304, 36648, 37671, 39208, 39302, 40164], "h\xFAn hu\u012B": [29759], "xi\xE9 ji\u0113": [29774], "ch\xE0ng d\xE0ng y\xE1ng": [29778], "ti\xE0n zh\xE8n": [29809], "b\u012Bn pi\xE1n": [29816, 29880], "t\xFA sh\u016B": [29817], "cu\u01D0": [29824, 30368, 36257], "z\u01CEo su\u01D2": [29829], "ju\xE9 qi\xF3ng": [29850], "l\xFA f\u016B": [29879], "j\xEC z\u012B": [29886], "su\xED": [29901, 32143, 32485, 36928, 38543, 38568, 39620], "m\xED x\u01D0": [29909], "qi\xF3ng w\u011Bi w\xE8i": [29911], "hu\xE1n y\xE8 y\xE0": [29915], "b\xF3 p\xE1o": [29919], "zh\xED h\xFA": [29921], "pi\xE1o": [29922, 38365], "w\u01CE w\xE0": [29926], "xi\xE1ng h\xF3ng": [29928], "w\xE8ng": [29934, 29973, 32587, 34169, 40774], "b\u01CEiw\u01CE": [29944], "sh\xE8n sh\xE9n": [29978], "ru\xED": [29988, 32204, 34148], "y\xF2ng": [29992, 30781, 33498, 33935, 37279], "shu\u01CEi": [29993], "b\xE9ng": [29997, 29998], "y\xF3u zh\xE1": [30004], "di\xE0n ti\xE1n sh\xE8ng": [30008], "t\u01D0ng d\u012Bng": [30010, 30012], "z\u0101i z\u012B": [30014], "b\xEC q\xED": [30017], "d\xE1 f\xFA": [30039], "c\xE8 j\xEC": [30047], "z\u0101i z\u012B ti\xE1n": [30048], "zh\xEC ch\xF3u sh\xEC": [30052], "f\u0101n p\u0101n": [30056, 30058], "sh\u0113 y\xFA": [30060], "d\u0101ng d\xE0ng d\u01CEng": [30070], "ji\u0101ng qi\xE1ng": [30086], "p\u01D0 y\u01CE sh\u016B": [30091], "ji\xE9 qi\xE8": [30092], "y\xED n\u01D0": [30097], "n\xE8": [30098, 30514, 35365, 35767], "g\u0113 y\xEC": [30105], "n\xFC\xE8 y\xE0o": [30111, 30247], "l\xEC l\xE0i": [30112, 30296], "y\u01CE xi\u0101": [30120], "xu\u0113": [30134, 33926, 34203, 36773, 36778, 38772, 38846], "d\u01CEn da": [30136], "f\xE1 bi\u01CEn": [30138], "f\xE8i f\xE9i": [30143, 30193], "sh\u0101n di\xE0n": [30145], "t\xE9ng ch\xF3ng": [30155], "t\u014Dng t\xF3ng": [30156], "w\u011Bi y\xF2u y\xF9": [30159], "t\u0101n sh\u01D0": [30161], "p\u016B p\xF9": [30177, 37610], "b\u0113ng p\xE9ng": [30189], "m\xE1 l\xECn": [30195], "ti\u01CEn di\xE0n": [30198], "\u0101n y\xE8 \xE8": [30199], "k\u0113 \u0113": [30206], "zh\xEC ch\xEC": [30216], "ji\u01CE xi\xE1 xi\u0101": [30229], "l\u011Bi hu\xEC": [30243], "ch\xE0i cu\xF3": [30245], "di\u0101n ch\u0113n": [30248], "da d\xE1": [30249], "bi\u011B bi\u0113": [30250], "qu\xE9": [30264], "d\xE0n d\u0101n": [30281], "gu\xEC w\u0113i": [30288], "n\xF2ng n\xF3ng": [30289], "bi\u0113 bi\u011B": [30303], "b\u014D b\u01D2": [30327], "b\xE1i": [30333], "j\xED b\u012B": [30336], "de d\xEC d\xED d\u012B": [30340], "p\u0101 b\xE0": [30341], "g\u0101o h\xE1o": [30347], "g\u0101o y\xE1o": [30352], "l\xEC lu\xF2 b\u014D": [30378], "zh\u0101 c\u01D4": [30395], "zh\u0101o zh\u01CEn d\u01CEn": [30397], "ji\u0101n ji\xE0n": [30417, 30435, 37627, 38388, 38828], "g\xE0i g\u011B h\xE9": [30422], "m\xE1ng w\xE0ng": [30451], "yu\u01CEn": [30454, 36922, 36960], "ti\xE1n xi\xE1n": [30455], "xi\u0101ng xi\xE0ng": [30456], "d\u01D4n": [30457, 36280, 36489], "x\xEC p\u01CEn": [30459], "sh\u011Bng x\u01D0ng": [30465], "y\xFAn h\xF9n": [30467], "mi\u01CEn mi\xE0n": [30468], "k\xE0n k\u0101n": [30475], "y\xECng y\u0101ng y\u01CEng": [30479], "y\u01CEo \u0101o \u01CEo": [30481], "j\u016B x\u016B k\u014Du": [30487], "y\xED ch\xEC": [30489], "di\xE9 t\xEC": [30499], "b\u01D0ng f\u01CEng": [30506], "p\xE0ng p\xE1n": [30507], "m\u012B m\xED": [30511, 30599], "xu\xE0n sh\xF9n x\xFAn": [30516], "ti\xE0o": [30522, 31900, 31990, 35228, 36242], "zhe zhu\xF3 zh\xE1o zh\u0101o": [30528], "qi\xE1o sh\xE0o xi\u0101o": [30532], "cu\xF3 zhu\xE0i": [30537], "g\xF9n": [30548, 35636], "su\xEC zu\xEC": [30559], "p\xEC b\xEC": [30565, 31275, 36767], "y\xEC z\xE9 g\u0101o": [30570], "x\u01D0ng x\xECng": [30578], "gu\xEC w\xE8i ku\xEC": [30598], "k\xF2u j\xEC": [30601], "qi\xF3ng hu\xE1n": [30607], "m\xE1n m\xE9n": [30610, 30622], "di\u0101o d\u014Du": [30615], "lou l\xF3u l\u01D8": [30620], "sh\xF9n r\xFAn": [30628], "li\xE0o li\u01CEo": [30637, 38028], "ji\xE0n xi\xE1n": [30639], "w\u01D4 m\xED": [30644], "gu\xEC ku\xEC": [30646], "n\u01D0ng ch\u0113ng": [30659], "hu\xF2 yu\xE8": [30662], "m\u0113ng m\xE9ng": [30663], "ku\xE0ng gu\u014D": [30668], "gu\xE0n qu\xE1n": [30676], "m\u01CEn m\xE1n": [30677], "j\u012Bn gu\u0101n q\xEDn": [30684], "j\u012Bn q\xEDn gu\u0101n": [30685], "y\xF9 x\xF9 ju\xE9": [30686], "ji\u01CEo ji\xE1o": [30699, 30703], "du\u01CEn": [30701], "sh\xED d\xE0n": [30707], "g\u0101ng qi\u0101ng k\xF2ng": [30716], "hu\u0101 x\u016B": [30729], "p\u012Bn b\u012Bn f\u0113n": [30735], "y\xE1n y\xE0n": [30740, 30799], "lu\u01D2 k\u0113": [30754], "f\xFA f\xE8i": [30761, 31536], "zh\u01D4 zh\xF9": [30763], "l\xE1 l\xEC l\u0101": [30764], "ku\u0101ng gu\u0101ng": [30788], "g\xE8 lu\xF2": [30796], "shu\xF2 sh\xED": [30805, 30889], "w\xE8i w\xE9i \xE1i": [30809], "qu\xE8 k\xE8 k\xF9": [30814], "m\u01CEng b\xE0ng": [30821], "lu\xF2 l\xF2ng": [30822], "y\u01D2ng t\xF3ng": [30823], "n\xFC\xE8": [30840, 34384], "k\u0113ng k\u011Bng": [30843], "y\u0101n y\u01CEn": [30845], "zhu\xEC chu\xED du\u01D2": [30846], "k\u014Dng k\xF2ng": [30847], "z\xF2ng c\xF3ng": [30850], "ji\u0101n zh\xE0n": [30858], "l\xF9 li\xF9": [30860, 38470], "qu\xE8 x\u012B": [30863], "l\xFAn l\u01D4n l\xF9n": [30870], "n\xE1o g\u0101ng": [30873], "ji\xE9 y\xE0": [30883], "w\xE8i w\u011Bi": [30888], "t\xED d\u012B": [30894], "ch\xE1 ch\u0101": [30900], "qi\u0101o qu\xE8": [30907], "s\xF9 xi\xE8": [30911], "li\xFA li\xF9": [30914, 36955, 37798, 39311], "s\u012B t\xED": [30915], "b\xE0ng p\xE1ng": [30917], "hu\xE1 k\u011B g\u016B": [30918], "w\u011Bi ku\u01D0": [30920], "xi\xE1 qi\xE0 y\xE0": [30925], "li\xE1n qi\u0101n": [30927], "w\xE8i \xE1i g\xE0i": [30929], "l\xE1 l\u0101": [30934], "\xE1o qi\u0101o": [30941], "p\u0113ng p\xE8ng": [30942, 38299], "y\u012Bn y\u01D0n": [30948], "l\u011Bi l\xE9i": [30949], "m\xF3 m\xF2": [30952], "q\xEC zh\xFA": [30953], "l\xE1o lu\xF2": [30961], "p\xE1n b\u014D": [30971], "j\xED sh\xE9": [30972], "h\xE9 qi\u0101o qi\xE0o": [30985], "k\xE8 hu\xF2": [30986], "qu\xE8 h\xFA": [30992], "\xE8 q\xEC": [31e3], "c\u01CE": [31012, 31032], "xi\xE1n x\xEDn": [31013], "l\xE9i l\u011Bi l\xE8i": [31015], "y\xE1n y\u01CEn": [31033], "q\xED zh\u01D0": [31047, 34452], "b\u0113ng f\u0101ng": [31050], "b\xEC m\xEC": [31061], "su\xE0n": [31064, 31495, 31597, 31639, 33948], "pi\xE0o pi\u0101o": [31080], "j\xEC zh\xE0i": [31085], "shu\xEC l\xE8i": [31089], "j\xECn j\u012Bn": [31105], "ch\xE1n sh\xE0n": [31109], "y\xE1ng sh\u0101ng": [31123], "zh\u012B zh\u01D0 t\xED": [31124], "sh\xE0n ch\xE1n": [31146], "y\xFA y\xF9 \u01D2u": [31162], "z\u01D0 z\xEC": [31172], "ch\xE1 n\xE1": [31173], "zh\xF2ng zh\u01D2ng ch\xF3ng": [31181], "h\xE0o m\xE0o": [31183], "k\xF9 k\u016B": [31193], "z\u016B": [31199, 33861], "ch\xE8ng": [31204, 31338], "hu\xF3 ku\xF2": [31214, 31219], "ch\u0113ng ch\xE8n ch\xE8ng": [31216, 31281], "sh\xEC zh\xEC": [31218, 37556], "f\xF9 p\u016B": [31231], "x\xF9n z\xE8": [31236], "t\xFA sh\u01D4": [31244], "zh\xF9n zh\u01D4n": [31253], "j\u012B q\xED": [31256, 32168, 35309], "l\xE9ng l\xEDng": [31260], "zu\xEC z\xFA s\u016B": [31265], "x\xEC qi\xE8": [31271, 37060], "zh\u01D2ng zh\xF2ng": [31278], "z\u014Dng z\u01D2ng": [31279], "xi\xE1n ji\u0101n li\xE0n": [31284], "z\u012B ji\u016B": [31285], "j\u012B q\u01D0": [31293], "r\xF2ng": [31299], "sh\u0101n c\u01CEn c\u0113n": [31303], "m\xE9n m\xE9i": [31304], "j\u01D0 j\xEC": [31318], "xi\u0101o r\xE0o": [31320], "zhu\u014D b\xF3": [31323], "t\xF3ng zh\u01D2ng zh\xF2ng": [31324], "zu\u014D": [31325], "bi\u0101o p\u0101o": [31342, 34280], "zhu\u014D ju\xE9": [31345], "cu\xE1n z\xE0n": [31347], "k\u014Dng k\xF2ng k\u01D2ng": [31354], "y\u016B y\u01D4": [31355], "zh\u01CEi": [31364, 37465], "b\xE1o": [31367, 38649], "k\u016B zh\xFA": [31371], "ji\xE0o li\xE1o li\xF9": [31372], "w\u0101 gu\u012B": [31376], "ti\u01CEo y\xE1o": [31381], "x\u016Bn y\xECn": [31400], "y\xE0 y\u0113": [31403], "ti\xE1n di\u0101n y\u01CEn": [31412], "ch\u0101o k\u0113": [31420], "ku\u01CEn cu\xE0n": [31421, 31422], "ch\xF9 q\xEC": [31440], "q\u01D4 k\u01D2u": [31448], "j\xECng zh\u011Bn": [31463], "k\u01CEn k\xE0n": [31479], "zh\xFA d\u01D4": [31482], "l\xE8 j\u012Bn": [31483], "zhu\xEC ru\xEC": [31501], "h\xE1ng h\xE0ng": [31504], "c\xE9n j\xECn h\xE1n": [31506], "d\u0101 xi\xE1 n\xE0": [31514], "z\xE9 zu\xF3": [31534], "l\xF3ng l\u01D2ng": [31548, 31725, 31840, 36504, 40851], "zh\xF9 zh\xFA": [31569, 31689], "d\xE1 d\u0101": [31572, 33605], "sh\u0101i": [31579, 31721, 31745, 31853], "y\xFAn j\u016Bn": [31584], "l\xE1ng l\xE0ng": [31588, 37070, 38406], "zh\xEC zh\u01D0": [31595], o: [31613], "p\xF3u b\xF9 f\xFA p\xFA": [31617], "p\xE1i b\u0113i": [31620], "g\xE8": [31623, 34428, 37499, 38124], "t\xE1i ch\xED": [31624], "gu\u01CEi d\xE0i": [31625], "zh\xE0o d\xE0o": [31628], "j\u012Bng q\xECng": [31632], "l\xEDn l\u01D0n": [31638], "j\xF9n q\u016Bn": [31640], "sh\u012B y\xED": [31671, 37366], "yu\u0113 y\xE0o chu\xF2": [31673], "xi\u0101o shu\xF2 qi\xE0o": [31678], "g\u014Dng g\u01CEn l\u01D2ng": [31714], "p\xE1ng p\xE9ng": [31715], "zhu\xF3 hu\xF2": [31719], "ji\u01CEn ji\u0101n": [31727], "d\xED zh\xFA": [31732], "z\u0101n c\u0113n c\u01CEn": [31736], "zhu\xE0n su\u01CEn zu\xE0n": [31737], "pi\u01CEo bi\u0101o": [31739], "gu\xF3 gu\xEC": [31746], "c\xE8 j\xED": [31758], "m\xEC mi\xE8": [31770], "sh\u0101i s\u012B": [31771], "s\u01D4n zhu\xE0n": [31784], "g\xE0n g\u01CEn": [31795], "b\xF2 b\u01D2": [31800], "b\xF3 b\xF9": [31807], shi: [31810], "zh\u0113n ji\u0101n": [31816], "zhu\xE0n zu\u01CEn": [31825], "f\u0101n p\u0101n bi\u0101n": [31827], "s\u01D2u sh\u01D4": [31828], "zu\u01CEn": [31851, 32356, 32386, 32393, 32408, 32565], "n\u01DA": [31865, 37369, 38037], "sh\u0101 ch\u01CEo": [31878], "k\u0101ng j\u012Bng": [31879], "f\u011Bn": [31881, 40698], "c\u016B": [31895, 35285, 40577, 40580, 40612], "ni\xE1n zh\u0101n": [31896], "c\xE8 s\xE8": [31907], "zh\u014Du y\xF9": [31909], "sh\u0113n s\u01CEn": [31937], "bi\u0101n bi\u01CEn": [31940, 33849], "mi\xE0n": [31942, 38754, 38755, 40618, 40619, 40629, 40634], "h\xFA h\u016B h\xF9": [31946], "g\u01D4 g\xF2u": [31955], "m\xED m\xE9i": [31964], "s\u01CEn sh\u0113n": [31965, 31971], "z\u0101o": [31967, 36455, 36973, 37289], "m\xEC s\u012B": [31992], "ji\u016B ji\u01D4": [31994], "x\xEC j\xEC": [31995, 32363], "zh\u0113ng zh\u011Bng": [31997], "ch\xE0 ch\u01CE": [32001, 34921], "yu\u0113 y\u0101o": [32004, 32422], "h\xF3ng g\u014Dng": [32005, 32418], "h\xE9 g\u0113": [32007, 32421], "w\xE9n w\xE8n": [32011, 32441], "f\xF3u": [32017], "j\xEC ji\xE9 ji\xE8": [32018], "p\u012B p\xED b\u01D0": [32021, 32432], "j\u012Bn j\xECn": [32031], "zh\u0101 z\u0101": [32037, 32046], "h\u0101": [32038], "f\u016B f\xF9": [32040], "ch\u014Du ch\xF3u": [32044], "l\xE8i l\xE9i l\u011Bi": [32047], "b\u014D b\xEC": [32052], "ti\u01CEn zh\u011Bn": [32062], "ji\u014Dng ji\u01D2ng": [32069], "ji\xE9 ji\u0113": [32080, 32467, 33410], "gu\xE0 ku\u0101": [32083], "b\u01CEi m\xF2": [32084], "g\u0113ng hu\xE1n": [32089], "ji\xE9 xi\xE9": [32092], "qu\xE1n shu\u0101n": [32095], "g\u01CEi \u01CEi": [32096], "lu\xF2 l\xE0o": [32097, 32476], "b\u012Bng b\u0113ng p\u0113ng": [32099], "g\u011Bi j\u01D0": [32102, 32473], "t\xF3ng t\u014Dng d\xF2ng": [32103], "ti\xE0o di\xE0o d\xE0o": [32105], "l\u011Bi l\xE8i l\xE9i": [32107], "g\u0101i h\xE0i": [32111], "ch\u012B zh\u01D0": [32122], "w\xE8n mi\u01CEn m\xE1n w\xE0n": [32123], "hu\xE1n hu\xE0n w\xE0n": [32132], "q\u012Bn xi\u0101n": [32133], "t\xEC t\xED": [32136], "y\xE1n xi\xE0n": [32150], "z\u014Dng z\xE8ng z\xF2ng": [32156], "ch\u0113n l\xEDn": [32157], "zh\u01D4n zh\xF9n": [32167], "qi\xE0n q\u012Bng zh\u0113ng": [32170], "q\xECng q\u01D0": [32174], "l\xFAn gu\u0101n": [32184, 32438], "chu\xF2 ch\u0101o": [32189, 32496], "ti\xE1n t\u01CEn ch\u0101n": [32194], "l\u01DC l\xF9": [32209, 32511], "ru\u01CEn ru\xE0n": [32219], "j\xED q\u012B": [32221], "zh\xF2ng ch\xF3ng": [32223, 37325], "mi\xE1o m\xE1o": [32226], "xi\xE8 y\xE8": [32228], "hu\u01CEn": [32233, 32531], "g\u0113ng g\xE8ng": [32234, 32262], "t\u014Du x\u016B sh\u016B": [32240], "z\u014Dng z\xF2ng": [32245, 32332], "y\xF9n g\u01D4n": [32247], "gu\u0101 w\u014D": [32250], "y\xF9n y\u016Bn w\u0113n": [32252, 32277], "b\u0101ng b\xE0ng": [32269], "g\u01D4 h\xFA": [32270, 40379], "c\u012B cu\xF2 su\u01D2": [32274], "cu\u012B shu\u0101i": [32279], "r\xF3ng r\u01D2ng r\xF2ng": [32281], "z\xE0i z\u0113ng": [32289], "c\xE0i": [32297, 33756, 34081], "f\xE9ng f\xE8ng": [32299], "su\u014D s\xF9": [32302, 32553], "y\u01CEn y\u01D0n": [32303, 37203], "z\xF2ng z\u01D2ng": [32305, 32437], "zhu\xE0n ju\xE0n": [32307], "m\xF2 m\xF9": [32312, 33707], "pi\u01CEo pi\u0101o": [32313, 32549], "f\xE1n p\xF3": [32321], "b\u0113ng b\xE8ng": [32323], "m\xF3u mi\xF9 mi\xE0o li\u01CEo": [32326], "y\xE1o y\xF3u zh\xF2u": [32327], "z\u0113ng z\xE8ng": [32338, 32559], "j\xFA ju\xE9": [32344], "chu\u014D chu\xF2": [32347], "z\u016Bn z\u01D4n": [32348], "r\xE0o": [32350, 32469, 36982], "ch\u01CEn ch\xE1n": [32351], "hu\xEC hu\xED": [32354, 32523, 34289], "qi\u0101o s\u0101o z\u01CEo": [32368], "ji\u01CEo zhu\xF3": [32371, 32564], "d\xE0n t\xE1n ch\xE1n": [32373], "n\u01D2ng": [32375], "p\xFA f\xFA": [32384], "y\xE0o l\xEC": [32389], "r\u01CEng xi\u0101ng": [32405], "l\xED s\u01CE x\u01D0 l\u01D0": [32410], "xi\u0101n qi\xE0n": [32420], "j\u012Bng j\xECng": [32463], "t\xED t\xEC": [32488], "b\u0113ng b\u011Bng b\xE8ng": [32503], "z\u014Dng z\xE8ng": [32508], "j\u012B q\u012B": [32521], "w\u0113n y\xF9n y\u016Bn": [32522], "f\xE8ng f\xE9ng": [32541], "shu\u0101i cu\u012B su\u012B": [32542], "mi\xF9 m\xF3u li\xE1o mi\xE0o m\xF9": [32554], "qi\u0101o s\u0101o": [32562], "f\u01D2u": [32566, 32569, 32571, 38636, 40192], "b\xE0 ba p\xED": [32610, 32631], "gu\xE0 gu\u01CEi": [32619], "y\xE1ng xi\xE1ng": [32650, 32655], "m\u011Bi g\u0101o": [32665], "y\xEC x\u012B": [32667], "qi\u01CEng qi\u0101n": [32671], "qi\u0101ng k\xF2ng": [32683], "qi\xE1n xi\xE1n y\xE1n": [32684], "n\xF3u": [32698], "h\xF3ng g\xF2ng": [32702], "p\u012B b\xEC p\u014D": [32717], "q\xFA y\xF9": [32721], "k\xE9": [32727], "qi\xE0o qi\xE1o": [32728], "zh\xE1i d\xED": [32735], "d\xE0o zh\u014Du": [32738], "h\xF3u q\xFA": [32757], "shu\u01CE": [32781], "ru\u01CEn nu\xF2": [32782], "\xE9r n\xE0i": [32783], "zhu\u0101n du\u0101n": [32785], "p\xE1 b\xE0": [32793], "ch\xED s\xEC": [32795], "q\xF9 ch\xFA": [32797], "l\xFAn l\u01D4n": [32803], "j\xED ji\xE8": [32804], "t\u0101ng t\u01CEng": [32805], "p\u01CEng": [32810, 35243], "zh\xE1 z\xE9": [32811], "y\u0113 y\xE9": [32822], "y\xFAn y\xEDng": [32826], "w\xE0 tu\u01D0 zhu\xF3": [32841], "\xE9r n\u01DC": [32847], "ti\u0113 zh\xE9": [32849], "d\u01D0 zh\xEC": [32860], "qi\xE9": [32890], "n\u01D0 ji\xE0n": [32891], "l\xE8i l\u0113": [32907], "c\xE0o": [32911, 35161, 37173, 40732], "b\xF3 d\xED": [32913], "xi\xE0o xi\u0101o": [32918], "d\xF9 d\u01D4": [32922], "ch\u0101i": [32926, 37365, 38039], "h\xE1n q\xEDn h\xE0n": [32931], "p\xE0ng p\xE1n p\xE0n": [32936, 32982], "zh\u016Bn ch\xFAn": [32939], "\u0101ng": [32942, 39599], "y\xF9 y\u014D": [32946], "p\xED b\u01D0 b\xEC": [32950], "f\xE8i b\xEC": [32967], "b\xE8i b\u0113i": [32972], "f\xE8i z\u01D0": [32975], "p\xEDng p\u0113ng": [32979, 33529], "f\u016B f\xFA zh\u01D2u": [32981], "sh\xE8ng sh\u0113ng": [32988], "ku\xE0": [33007, 36328, 39611], "g\u01CEi h\u01CEi": [33010], "g\u0113 g\xE9 g\u0101": [33011], "n\xE9ng n\xE0i": [33021], "gu\u012B ku\xEC": [33023], "m\xE0i m\xF2": [33033], "z\u0101ng z\xE0ng": [33039], "ji\u01CEo ju\xE9": [33050, 35282], "cu\u01D2": [33054], "de te": [33062], "zu\u012B ju\u0101n": [33063], "n\u011Bi": [33070, 33095, 39186, 39297, 39870, 39896], "p\xFA f\u01D4": [33071], "ni\xE0o": [33074], "shu\xED": [33085], "gu\xF2": [33090, 36942, 37945], "l\xE0 x\u012B": [33098], "y\u0101n \u0101": [33100], "g\u0101o g\xE0o": [33167], "l\xF9 bi\u0101o": [33172], "chu\xE1i": [33175], "zhu\u0101n chu\xE1n ch\xFAn zhu\u01CEn": [33182], "chu\xE0i": [33194, 36409], "f\xE1n p\xE1n": [33200], "w\u01D4 h\u016B": [33204], "sh\u0101n d\xE0n": [33211], "t\xFAn": [33216, 33227, 34508, 35928, 35930, 36568, 38677, 39145, 39272, 39784, 40064, 40663], "b\xEC bei": [33218], "l\xE0 g\xE9": [33224], "s\xE0o s\u0101o": [33226], "n\xE0o": [33233, 38297, 38393, 39719], "n\xED lu\xE1n": [33249], "qi\u0101n xi\xE1n": [33252], "gu\xE0ng ji\u01D2ng": [33254], "gu\u01CEng ji\u01D2ng": [33257], "ch\xF2u xi\xF9": [33261], "mi\xE1n bi\u0101n": [33265], "di\xE9 zh\xED": [33271], "zh\u012B j\xECn": [33272], "sh\xE8 sh\u011B": [33293], "p\xF9": [33302, 33303], "b\u0101n b\u014D p\xE1n": [33324], "ku\u0101": [33343], "g\xE8n g\u011Bn": [33390], "s\xE8 sh\u01CEi": [33394], "f\xFA b\xF3": [33396], "ji\u0101o qi\xFA": [33405], "ch\u0101i ch\u0101": [33414], "sh\xE1o qu\xE8": [33421], "h\xF9 xi\xE0": [33424], "z\xEC z\u01D0": [33427], "hu\xEC h\u016B": [33428], "t\xFAn ch\u016Bn": [33434], "ji\xE8 g\xE0i": [33445], "x\xF9 zh\xF9": [33447], "yu\xE1n y\xE1n": [33451], "x\u012Bn x\xECn": [33455], "l\xFAn hu\u0101": [33458], "w\xF9 h\u016B": [33460], "g\u014Du g\u01D2u": [33462], "m\xE0o m\xE1o": [33468], "f\xE8i f\xFA": [33470], "ch\xE1n y\xEDn": [33474], "qi\u0113": [33478], "s\u016B s\xF9": [33487], "ti\xE1o sh\xE1o": [33493], "l\xEC j\u012B": [33497], "k\u0113 h\u0113": [33499], "j\xF9 q\u01D4": [33507], "ru\xF2 r\u011B": [33509], "zh\xF9 n\xEDng": [33511], "p\u0101 b\xF3": [33513], "xi\xFA": [33516], "zh\u01CE zu\xF3": [33522], "j\u016B ch\xE1": [33524], "ni\xE9": [33526], "sh\u0113ng ru\xED": [33532], "qi\xE9 ji\u0101": [33540], "z\u01D0 c\xED": [33544], "qi\xE0n x\u012B": [33564], "ch\u01CEi": [33565], "f\xE1 p\xE8i": [33591], "r\xE1o": [33627, 34136, 35155, 39250, 39286], "y\xEDng x\xEDng": [33637], "qi\xE1n x\xFAn": [33640, 34113], "y\xECn y\u012Bn": [33643], "h\xE9 h\xE8": [33655], "sh\u0101 su\u014D": [33678], "p\xE9ng f\u0113ng": [33681], "sh\u0113n x\u012Bn": [33688], "w\u01CEn gu\u0101n gu\u01CEn": [33694], "y\xF3u s\xF9": [33700], "sh\u0101o xi\u0101o": [33702, 34552], "l\xE0ng li\xE1ng": [33704], "pi\u01CEo f\xFA": [33705], "w\xE8n w\u01CEn mi\u01CEn": [33708], "sh\xEC sh\xED": [33715, 33940], "t\xF9 t\xFA": [33717], "xi\u0101n li\u01CEn": [33718, 34207], "w\u01CEn y\xF9": [33728], "z\u014Du ch\xF9": [33734], "l\xF9 l\u01DC": [33737], "j\u016Bn j\xF9n": [33740], "ni\xE8 r\u011Bn": [33741], "z\u012B z\xEC z\u0101i": [33745], "t\xFA t\xF9": [33759], "ji\u0113 sh\xE0": [33768], "qi\xE1o zh\u01CEo": [33772], "t\xE1i zh\u012B ch\xED": [33773], "f\u0113i f\u011Bi": [33778, 34586], "q\xEDn q\u012Bn j\u012Bn": [33779], "z\u016B j\xF9": [33785, 33961], "l\u01D0n m\xE1": [33787], "ti\xE1n ti\xE0n": [33790], "ti\u0113": [33820, 36028, 36148], "lu\xF2 l\xE0 l\xE0o lu\u014D": [33853], "zh\xF9 zhu\xF3 zhe": [33879], "sh\xE8n r\xE8n": [33882], "g\u011B g\xE9": [33883], "j\xF9n su\u01D2": [33904], "ku\xEC ku\xE0i": [33929], "r\xFA n\xE1": [33944], "m\xE9ng m\u0113ng m\u011Bng": [33945], "yu\xE1n hu\xE1n": [33949], "x\xFA sh\xFA": [33955], "x\xED x\xEC": [33973], "m\xEC m\xEDng": [33986], "s\u014Du s\u01D2u": [33987], "g\xE0i g\u011B h\xE9 h\xE0i": [33995], "y\u01CEo zhu\xF3": [34004], "di\xE0o ti\xE1o d\xED": [34023], "x\u016B qi\u016B f\u016B": [34034], "z\xED j\xFA": [34043], "li\u01CEo l\xF9": [34044], xu: [34047], "h\xE0n h\u01CEn": [34058], "m\xE0n w\xE0n m\xE1n": [34067], "p\xF3 b\xF2": [34082], "f\u0101n f\xE1n b\u014D": [34115], "h\xF3ng h\xF2ng": [34171], "y\xF9 \xE0o": [34177, 38569], "x\xED xi\xE0o": [34178], "b\xE1o b\xF3 b\xF2": [34180], "c\xED z\u012B": [34187], "w\xE0n lu\xE0n": [34189], "k\u01CEo h\u0101o": [34215], "yu\u01CEn w\u011Bi": [34227], "zh\xF2u ch\xF3u": [34229], "w\u014D m\xE1i": [34230], "xi\u0101o h\xE0o": [34243], "y\xF9 x\xF9 x\u016B": [34247], "ji\xE8 j\xED": [34249], "di\xE0o zhu\xF3": [34251], "c\xE1ng z\xE0ng": [34255], "l\u01CE": [34270], "ch\xFA zh\u016B": [34296], "p\xEDn p\xEDng": [34315], "g\u0101n h\xE1n": [34423], "h\xF3ng ji\xE0ng": [34425], "hu\u012B hu\u01D0": [34426], "xi\u0101 h\xE1": [34430], "m\u01CE m\xE0 m\u0101": [34434], "f\u0101ng b\xE0ng": [34436], "b\xE0ng b\xE8ng": [34444], "ju\xE9 qu\u0113": [34455], "q\xEDn qi\xE1n": [34457], "g\u014Dng zh\u014Dng": [34467], "f\u01D4 f\xF9": [34469], "d\xE0i d\xE9": [34478], "g\u01D2u q\xFA x\xF9": [34492], "b\u01D2 p\xED": [34494], "sh\xE9 y\xED": [34503], "ti\u011B": [34504, 37444, 37525, 37921, 37941, 38081, 39510], "g\xE9 lu\xF2": [34514], "m\xE1ng b\xE0ng": [34518], "y\xEC x\u01D4": [34529], "h\xE1 g\xE9": [34532], "qi\xE8 n\xED": [34538], "\xE9 y\u01D0": [34558], "zh\u0113 zh\xE9": [34567], "l\xE0 zh\xE0": [34593], "su\xF2": [34614, 36900], "y\xF3u qi\xFA": [34660], "xi\u0101 h\u0101": [34662], "x\u012B q\u012B": [34695], "b\u012B p\xED": [34709], "n\xE0i n\u011Bng": [34714], "h\xE9 xi\xE1": [34715], "gu\xEC hu\u01D0": [34717], "m\u01CE m\u0101 m\xE0": [34718], "sh\xEC zh\u0113": [34731], "zh\xEC di\xE9": [34738], "ji\xE0n ch\xE1n": [34745], "ma m\xE1 m\xF2": [34758], "m\u01CEng m\u011Bng": [34770], "bi\u0113 bi\xE9": [34782], "b\u0113n f\xE8i": [34790], "l\xE1o li\xE1o": [34791], "y\xEDn x\xFAn": [34795], "l\xED l\u01D0": [34849], "xu\xE8 xi\u011B": [34880], "x\xEDng h\xE1ng h\xE0ng h\xE9ng": [34892], "shu\u0101i cu\u012B": [34928], "tu\xF3 tu\u014D": [34953], "l\u01D0ng l\xEDng": [34954], "b\xE0o p\xE1o p\xE0o": [34956], "j\xF9 ji\u0113": [34963], "h\xE8 k\xE8": [34964], "y\xED y\xEC": [34968, 36004], "n\xE0 ju\xE9": [34982], "b\xE8i p\u012B": [34987], "ch\u01D0 nu\u01D2": [34994], "ch\u01D0 q\u01D0 du\u01D2 nu\u01D2": [34995], "ji\xE1 qi\u0101 ji\xE9": [34999], "b\xF3 m\xF2": [35001], "gu\u012B gu\xE0": [35007], "li\xE8 li\u011B": [35010], "ch\xE9ng ch\u011Bng": [35022], "ji\u0113 g\xE9": [35027], "d\u0101o ch\xF3u": [35055], "shang ch\xE1ng": [35059], "yu\u0101n g\u01D4n": [35063], "y\u01CEn \u0101n": [35066], "t\xEC x\u012B": [35068], "f\xF9 f\xFA": [35092], "ch\u01D4 zh\u01D4": [35098], "tu\xEC t\xF9n": [35114], "l\u01CEi": [35184], "y\xE0o y\u0101o": [35201], "q\xEDn t\xE1n": [35203], "ji\xE0n xi\xE0n": [35211, 35265], "pi\u01CEn": [35217, 35550, 35869, 36021], "pi\u0113 mi\xE8": [35221], "y\xEDng y\u01D0ng": [35246], "q\xF9 q\u016B": [35248, 35255, 35281], "ji\xE0n bi\u01CEn": [35253], "lu\xF3 lu\u01CEn": [35254], "z\u012B zu\u01D0": [35292], "hu\xE0 xi\xE8": [35295], "ji\u011B ji\xE8 xi\xE8": [35299, 35303], "xu\xE9 h\xF9": [35319], "l\xEC l\xF9": [35323], "t\u01CEo": [35342, 35752], "zh\xF9n": [35376], "z\u012B z\u01D0": [35390], "y\xED d\xE0i": [35410, 35794], "xi\xF2ng": [35415, 35783], "di\xE0o ti\u01CEo": [35458], "y\xED ch\u01D0 ch\xEC": [35459], "l\u01CEng l\xE0ng": [35471], "\u0113i \xE9i \u011Bi \xE8i x\u012B": [35474, 35830], "shu\xE0": [35484], "y\u01D4 y\xF9": [35486, 35821, 38632], "shu\u014D shu\xEC yu\xE8": [35498, 35828], "shu\xED sh\xE9i": [35504, 35841], "q\u016B ju\xE8": [35507], "ch\u012B l\xE0i": [35514], "n\xEC n\xE1": [35517], "di\xE0o ti\xE1o": [35519], "p\u01D0 b\u0113i": [35520], "j\xEC j\u012B": [35525], "z\xE9 zu\xF2 zh\u01CE cu\xF2": [35534], "ch\xF9 j\xED": [35540], "h\xE1o xi\xE0": [35541], "l\xF9n l\xFAn": [35542, 35770], "sh\xEC d\xEC": [35551], "hu\xE0 gu\u0101": [35555], "x\u01D0 sh\u0101i \u0101i": [35568], "n\xE1n n\xE0n": [35573, 38627], "mi\xF9": [35628, 35884], "z\xE8n": [35670, 35886], "sh\xED zh\xEC": [35672, 35782], "ju\xE0n xu\u0101n": [35714], "y\xED tu\u012B": [35721], "zh\xE1n": [35741], "x\u01D4 h\u01D4": [35768], "xi\xE1ng y\xE1ng": [35814], "ti\xE1o di\xE0o zh\u014Du": [35843], "ch\xE9n sh\xE8n": [35852], "m\xED m\xE8i": [35868], "m\xE0n m\xE1n": [35881], "g\u01D4 y\xF9": [35895], "hu\u014D hu\xF2 hu\xE1": [35905], "zh\xEC zh\xE0i": [35960], "hu\u0101n hu\xE1n": [35974], "k\u011Bn k\u016Bn": [35975], "m\xF2 h\xE9": [35976], "m\xF2 h\xE9 h\xE1o": [35977], "j\xF9 l\xF3u": [35991], "z\xE9 zh\xE0i": [36012, 36131], "d\xE0i t\xE8": [36024], "b\xEC b\u0113n": [36033], "ji\u01CE g\u01D4 ji\xE0": [36040], "xi\u014Dng m\xEDn": [36079], "c\xE0ng": [36086], "zhu\xE0n zu\xE0n": [36090, 36186], "w\xE0n zhu\xE0n": [36099], "g\xE0n g\xF2ng zhu\xE0ng": [36123], "yu\xE1n y\xF9n": [36128], "b\u0113n b\xEC": [36146], "ji\u01CE g\u01D4": [36158], "z\u01D2u": [36208, 36209, 39888], "di\xE9 t\xFA": [36227], "j\u016B qi\xE8": [36228], "q\u016B c\xF9": [36235, 36264], "j\xED ji\xE9": [36236], "gu\u0101 hu\xF3": [36239], "qu\xE8 q\xEC j\xED": [36254], "t\xE0ng t\u0101ng": [36255], "chu\u014D zhu\xF3": [36256], "q\xF9 c\xF9": [36259], "yu\xE8 t\xEC": [36271], "b\u014D b\xE0o": [36277], "ku\xE0 w\xF9": [36278], "gu\xEC ju\xE9": [36281], "f\u0101ng f\xE0ng p\xE1ng": [36285], "p\xE1o b\xE0": [36289], "q\xED q\u01D0": [36290], "ji\xE0n ch\xE9n": [36296], "p\u01CEo p\xE1o": [36305], "di\u01CEn di\u0113 ti\u0113": [36309], "j\u016B j\xF9 qi\xE8": [36313], "b\u01D2": [36315], "lu\xF2 l\xEC": [36318], "d\xE0i du\xF2 du\u014D ch\xED": [36322], "zhu\u01CEi": [36329], "b\xE8ng pi\xE1n": [36336], "ti\xE0o t\xE1o": [36339], "sh\u016B ch\u014Du": [36350], "li\xE0ng li\xE1ng": [36361], "t\xE0 t\u0101": [36367], "ch\u01CE": [36421, 37972, 38258], "d\xED zh\xED": [36450], "d\u0113ng d\xE8ng": [36460, 37913, 38251], "c\xE8ng": [36461], "d\u016Bn c\xFAn": [36466], "ju\u011B ju\xE9": [36470], "li\u0101o": [36477], "xi\xE8 s\u01CE": [36512], "t\u01D0": [36528, 36550, 39605], "y\xE0 zh\xE1 g\xE1": [36555], "x\xECn xi\xE0n": [36560], "f\xE0n gu\u01D0": [36563], "zhu\xE0n zhu\u01CEn": [36578], "zh\xF3u zh\xF2u": [36600, 36724], "b\xFA": [36688, 37293, 40170], "zhu\u01CEn zhu\xE0n zhu\u01CEi": [36716], "z\u01CEi z\xE0i": [36733], "ni\u01CEn zh\u01CEn": [36759], "bi\u0101n bian": [36793], "d\xE0o bi\u0101n": [36794], "y\u01D0 y\xED": [36806, 36836, 36849], "gu\xF2 guo gu\u014D": [36807], "w\xE0ng ku\u0101ng": [36811], "h\xE1i hu\xE1n": [36824], "zh\xE8 zh\xE8i": [36825], "yu\u01CEn yu\xE0n": [36828], "zh\xEC l\xEC": [36835], "zh\xF9 w\u01CEng": [36844], "zhu\u012B du\u012B": [36861], "sh\xEC ku\xF2": [36866], "t\xF2u": [36879], "t\u014Dng t\xF2ng": [36890], "gu\xE0ng": [36891], "d\u01CEi d\xE0i": [36910], "su\xEC su\xED": [36930], "t\xED d\xEC": [36934], "y\xED w\xE8i": [36951], "sh\xEC d\xED zh\xE9": [36969], "c\xE0": [36970], "hu\xE1n h\xE1i": [36996], "l\xED ch\xED": [37004], "k\xE0ng h\xE1ng": [37023], "n\xE0 n\xE8i n\u0101": [37027], "xi\xE9 y\xE1 y\xE9 y\xFA x\xFA": [37034], "g\u0101i h\xE1i": [37058], "hu\xE1n x\xFAn": [37063], "ch\u012B x\u012B": [37079], "h\u01CEo": [37085], "l\xEC zh\xED": [37094], "xi\xE1o \u01CEo": [37097], "d\u014Du d\u016B": [37117], "li\u01CEo": [37149, 38269], "z\xE0n cu\xE1n cu\xF3": [37186, 37191], "d\u012Bng d\u01D0ng": [37194], "c\xF9 zu\xF2": [37218], "f\u0101 p\u014D": [37222], "sh\u0101i sh\u012B": [37246], "ni\xE0ng": [37247, 37304], "qi\xFA ch\u014Du": [37268], "p\u014D f\u0101": [37271, 37297], "ch\u01CEn ch\u011Bn": [37286], "y\xE0n li\u01CEn xi\u0101n": [37302], "ni\xE0ng ni\xE1ng": [37312], "l\u01D0 li": [37324], "l\xED x\u01D0 x\u012B": [37328], "li\u01CEo li\xE0o": [37333], "d\u012Bng d\xECng": [37336, 38025], "qi\u01CEo ji\u01CEo": [37349], "y\xFA hu\xE1": [37354], "hu\xE1 w\u016B": [37355], "r\xEC r\xE8n ji\xE0n": [37360, 37372], "d\xEC d\xE0i": [37361], "p\u012B zh\u0101o": [37373], "y\xE1 y\xE9": [37374], "b\u01CE p\xE1": [37376, 38063], "t\u0101 tu\xF3": [37448, 38090], "b\u011Bi": [37491], "b\u01D0ng p\xEDng": [37500], "h\u0101 k\u0113": [37503, 38122], "ch\xF2ng": [37507, 38131], "xi\u01CEng ji\u014Dng": [37508], "y\xF9 s\xEC": [37513], "x\xF9 hu\xEC": [37514], "r\xE9n r\u011Bn": [37515], "sh\xE0n shu\xF2": [37519], "ch\xEC l\xEC": [37520], "xi\u01CEn x\u01D0": [37521, 38115], "h\xF3u xi\xE0ng": [37527], "di\xE0o ti\xE1o y\xE1o": [37530], "xi\u0101n ku\xF2 ti\u01CEn gu\u0101": [37531, 37565, 38118], "zh\xE9 ni\xE8": [37560], "zh\u014Dng y\u014Dng": [37567], "t\u014Du t\xF9 d\xF2u": [37568], "m\xE9i m\xE9ng": [37570], "w\xE0n ji\u01CEn": [37572, 37803], "t\u01D0ng d\xECng": [37580, 38116], "ju\u0101n ji\u0101n cu\u0101n": [37585], "s\u012B tu\xF3": [37590], "ju\u0101n xu\u0101n ju\xE0n": [37591], "w\xFA hu\xE1 w\u016B": [37592], "zhu\xF3 chu\xF2": [37596], "x\xEDng x\xECng j\u012Bng": [37598], "j\u016B j\xFA": [37606, 38164], "zu\xEC ni\xE8": [37623], "yu\u0101n yu\u01CEn w\u01CEn w\u0101n": [37626], "g\u0101ng g\xE0ng": [37628, 38050], "zhu\u012B": [37648, 38181, 39429, 39571, 40315], "\u0101": [37650, 38165], "cu\u014D ch\u0101": [37768], "su\u01D2 s\xE8": [37773], "y\xE1o z\xFA": [37776], "y\xE8 t\xE0 g\xE9": [37777], "qi\u0101ng ch\u0113ng": [37783], "g\xE9 l\xEC": [37784, 38217, 39730], "b\u012B p\u012B b\xEC": [37790], "g\u01CEo h\xE0o": [37804], "z\xFA chu\xF2": [37827], "xi\u016B xi\xF9": [37829], "sh\xF2u s\u014Du": [37833], "d\xED d\u012B": [37841, 38237], "qi\u0101o s\u01CEn c\xE0n": [37842], "l\xF9 \xE1o": [37845], "t\u0101ng t\xE1ng": [37852], "ji\xE0n z\xE0n": [37865], "hu\xEC su\xEC ru\xEC": [37880], "qi\u01CEng qi\u0101ng": [37881, 38250], "s\u01CEn xi\xE0n s\xE0": [37886], "ji\u01CEn ji\xE0n": [37927, 38159], "d\u0101ng ch\u0113ng": [37946, 38107], "zu\u0101n zu\xE0n": [38013], "s\xE0 x\xEC": [38033], "y\xE0o yu\xE8": [38053], "t\u01D2u d\u01D2u": [38061], "zu\xE0n zu\u0101n": [38075], "qi\u0101n y\xE1n": [38085], "p\xED p\u012B": [38093], "y\xE1o di\xE0o ti\xE1o": [38123], "t\u0101ng t\xE0ng": [38132], "p\xF9 p\u016B": [38138], "t\xE1n xi\u0101n": [38188], "li\xF9 li\xFA": [38223], "h\xE0o g\u01CEo": [38224], "t\xE1ng t\u0101ng": [38231], "t\xE1n ch\xE1n x\xEDn": [38241], "hu\xF2 sh\u01CEn": [38276], "h\xE0n b\xEC": [38280, 38380], "k\u0101ng k\xE0ng": [38284, 38390], "xi\xE1n ji\xE0n ji\u0101n ji\u01CEn": [38290], "xi\u0101 xi\u01CE": [38293], "xi\u01CE k\u011B": [38300], "bi\xE0n gu\u0101n": [38302], "h\xE9 g\xE9": [38308, 39052], "h\xF2ng xi\xE0ng": [38311], "s\u0113 x\u012B": [38314], "t\xEDng t\u01D0ng": [38318], "\xE8 y\u0101n": [38332, 38415], "h\xF2ng ju\u01CEn xi\xE0ng": [38338], "b\u01CEn p\xE0n": [38342], "d\u016B sh\xE9": [38349, 38407], "qu\xE8 qu\u0113": [38357], "t\u0101ng t\xE1ng ch\u0101ng": [38363], "k\xE0n h\u01CEn": [38366, 38426], "x\xEC s\xE8 t\xE0": [38367], "m\u0113n m\xE8n": [38391], "qu\u0113 qu\xE8": [38425], "y\xE1n di\xE0n": [38461], "\u0101 \u0113": [38463], "b\u0113i p\u014D p\xED": [38466], "y\xE0n y\u01CEn": [38529], "y\xFA y\xE1o sh\xF9": [38531], "l\xF3ng l\u014Dng": [38534], "du\xEC zhu\xEC": [38538], "su\xED du\xF2": [38539], "g\u0101i q\xED \xE1i": [38545], "hu\u012B du\xF2": [38547, 38579], "w\u011Bi ku\xED": [38551], "l\xEC d\xE0i": [38584], "zhu\u012B cu\u012B w\xE9i": [38585], "h\xE8 h\xFA": [38586, 40366], "j\xF9n ju\xE0n": [38589, 38603], "n\xE1n n\xE0n nu\xF3": [38590], "qu\xE8 qi\u0101o qi\u01CEo": [38592], "gu\xE0n hu\xE1n": [38618], "gu\u012B x\u012B": [38623], "s\xE8 x\xED": [38637], "\xE1n": [38648], "w\xF9 m\xE9ng": [38650], "t\xE8ng": [38703], "l\xF9 l\xF2u": [38706], "m\xE1i": [38718], "j\xECng li\xE0ng": [38746], "g\xE9 j\xED": [38761], "b\u01CE": [38774], "y\u0101ng y\xE0ng": [38789], "g\xE9 t\xE0 s\u01CE": [38792], "bi\u0101n y\xECng": [38805], "qi\xE0o sh\u0101o": [38808], "ju\u0101n xu\u0101n": [38809], "sh\xE0ng zh\u01CEng": [38813], "p\xED b\u01D0ng b\xEC b\u0113i": [38814], la: [38817], "xi\xE8 di\xE9": [38818], "\u0113ng": [38821], "m\xF3u m\xF9": [38826], "b\xEC b\u01D0ng": [38840], "m\xE8i w\xE0": [38862], "r\u01D2u": [38870], "sh\xE8 xi\xE8": [38872], "y\xF9n w\u0113n": [38891], "d\xF9n d\xFA": [38931, 39039], "du\u01D0": [38951], "lu\u014D": [38961], "b\u012Bn p\xEDn": [38971], "y\xF3ng": [38994, 39065, 39979], "m\u0101n": [39010, 39071], "j\u01D0ng g\u011Bng": [39048], "ji\xE9 xi\xE9 ji\xE1": [39049], "k\u0113 k\xE9": [39055], "p\xEDn b\u012Bn": [39057], "ch\xE0n zh\xE0n": [39076], "f\u0113ng f\u011Bng": [39080, 39118], "bi\u0101o di\u016B": [39081], "b\xE1 f\xFA": [39088], "s\u0101o s\u014Du": [39102], "li\xF9 li\xE1o": [39106], "sh\xED s\xEC y\xEC": [39135], "y\u01CEng ju\xE0n": [39148], "zh\xF9 t\u01D2u": [39155], "y\xED s\xEC": [39156], "zu\xF2 z\xE9 zh\u0101": [39157], "ti\xE8": [39163, 39214], "xi\u01CEng n\xE1ng": [39263], "t\xE1ng x\xEDng": [39271], "g\u0113 le": [39289], "ch\u0101 zha": [39303], "n\xE1ng n\u01CEng": [39317], "y\u016Bn w\xF2": [39335], "zh\u012B sh\xEC": [39350], "x\xECn j\xECn": [39352], "ku\xE0i ju\xE9": [39363], "z\u01CEng": [39380, 39541], "t\xE1i d\xE0i": [39384], "x\xFAn xu\u0101n": [39400], "li\xE1ng l\xE1ng": [39418], "pi\xE0n": [39447, 39449, 39575, 39800], "d\xE0i t\xE1i": [39552], "s\u0101o s\u01CEo": [39578], "g\u01D4 g\u016B": [39592], "b\xE8i m\xF3": [39603], "xi\u0101o qi\u0101o": [39609], "b\u01CEng p\u01CEng": [39624], "b\xF3 ju\xE9": [39625], "b\xEC p\u01D2": [39666], "m\xE1o m\xE9ng": [39667], "ku\xF2 yu\xE8": [39674], "b\u0101 b\xE0": [39774, 40067], "j\xEC c\u01D0": [39814], "b\xF3 b\xE0": [39818], "zh\u01CE zh\xE0": [39827, 40074], "ch\xF3u d\xE0i": [39832], "lu\xF2 g\xE9": [39845], "gu\u012B xi\xE9 w\u0101 ku\xED": [39853], "xi\u0101n xi\u01CEn": [39854, 40092], "p\u016B b\u016B": [39878], "y\xEC s\u012B": [39907], "b\xE0 b\xF3": [40076], "gu\u012B xi\xE9": [40081], "s\u0101i x\u01D0": [40131], "ni\u01CEo di\u01CEo": [40165], "di\u0101o zh\u0101o": [40173], "g\u0101n h\xE0n y\xE0n": [40177], "f\u016B gu\u012B": [40186], "ji\u0101n qi\u0101n zh\u0101n": [40189], "h\xE9 ji\xE8": [40353], "pi\u0101n bi\u01CEn": [40355], "chu\xE0n zh\xEC": [40360], "c\u0101ng qi\u0101ng": [40364], "s\u01D4n x\xF9n": [40381], "bi\u0101o p\xE1o": [40579], "zh\xF9 c\u016B": [40582], "j\u016Bn q\xFAn": [40583, 40597], chi: [40630], "m\xF3 me": [40636], "m\xF3 me ma": [40637], "m\xED m\u01D2": [40639], "d\xE0n sh\xE8n": [40686], "zh\u011Bn y\u0101n": [40688], "d\u01CEn zh\u01CEn": [40693], "mi\u01CEn m\u01D0n m\u011Bng": [40702], "h\u014Du": [40769], "n\xE0ng": [40777], "q\xED j\xEC z\u012B zh\u0101i": [40784], "y\xEDn k\u011Bn y\u01CEn": [40834], "y\xEDn k\u011Bn": [40840], "g\u014Dng w\xF2": [40847], "gu\u012B j\u016Bn qi\u016B": [40860, 40863] }, o = [];
  Object.keys(s).forEach(function(n2) {
    for (var h2 = 0, g2 = s[n2]; h2 < g2.length; h2++) {
      var i2 = g2[h2];
      o[i2] = n2;
    }
  });
  var y = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  function j(n2) {
    return n2.replace(y, "_").length;
  }
  var c = {};
  var d = function() {
    return c;
  };
  var b = [{}, {}, { "\u4E00\u4E2A": "y\xED g\xE8", "\u8FD9\u4E2A": "zh\xE8 ge", "\u4E0D\u662F": "b\xFA sh\xEC", "\u6210\u4E3A": "ch\xE9ng w\xE9i", "\u4E00\u79CD": "y\u012B zh\u01D2ng", "\u8BA4\u4E3A": "r\xE8n w\xE9i", "\u4F5C\u4E3A": "zu\xF2 w\xE9i", "\u90E8\u5206": "b\xF9 f\xE8n", "\u8981\u6C42": "y\u0101o qi\xFA", "\u5404\u79CD": "g\xE8 zh\u01D2ng", "\u5E94\u8BE5": "y\u012Bng g\u0101i", "\u589E\u957F": "z\u0113ng zh\u01CEng", "\u4E0D\u4F1A": "b\xFA hu\xEC", "\u63D0\u4F9B": "t\xED g\u014Dng", "\u90A3\u4E9B": "n\xE8i xi\u0113", "\u89C9\u5F97": "ju\xE9 de", "\u4EFB\u52A1": "r\xE8n wu", "\u90A3\u4E2A": "n\xE0 ge", "\u79F0\u4E3A": "ch\u0113ng w\xE9i", "\u4E3A\u4E3B": "w\xE9i zh\u01D4", "\u4E86\u89E3": "li\u01CEo ji\u011B", "\u5904\u7406": "ch\u01D4 l\u01D0", "\u7687\u4E0A": "hu\xE1ng shang", "\u53EA\u8981": "zh\u01D0 y\xE0o", "\u5FC3\u91CC": "x\u012Bn li", "\u5927\u91CF": "d\xE0 li\xE0ng", "\u529B\u91CF": "l\xEC li\xE0ng", "\u51E0\u4E4E": "j\u012B h\u016B", "\u5E72\u90E8": "g\xE0n b\xF9", "\u76EE\u7684": "m\xF9 d\xEC", "\u884C\u4E3A": "x\xEDng w\xE9i", "\u53EA\u89C1": "zh\u01D0 ji\xE0n", "\u8BA4\u8BC6": "r\xE8n shi", "\u5E02\u957F": "sh\xEC zh\u01CEng", "\u5E08\u7236": "sh\u012B fu", "\u8C03\u67E5": "di\xE0o ch\xE1", "\u91CD\u65B0": "ch\xF3ng x\u012Bn", "\u5206\u4E3A": "f\u0113n w\xE9i", "\u77E5\u8BC6": "zh\u012B shi", "\u5BFC\u5F39": "d\u01CEo d\xE0n", "\u884C\u4E1A": "h\xE1ng y\xE8", "\u8D28\u91CF": "zh\xEC li\xE0ng", "\u94F6\u884C": "y\xEDn h\xE1ng", "\u53C2\u4E0E": "c\u0101n y\xF9", "\u5145\u5206": "ch\u014Dng f\xE8n", "\u5C3D\u7BA1": "j\u01D0n gu\u01CEn", "\u751F\u957F": "sh\u0113ng zh\u01CEng", "\u6570\u91CF": "sh\xF9 li\xE0ng", "\u5E94\u5F53": "y\u012Bng d\u0101ng", "\u9662\u957F": "yu\xE0n zh\u01CEng", "\u5F3A\u8C03": "qi\xE1ng di\xE0o", "\u53EA\u80FD": "zh\u01D0 n\xE9ng", "\u97F3\u4E50": "y\u012Bn yu\xE8", "\u4EE5\u4E3A": "y\u01D0 w\xE9i", "\u5904\u4E8E": "ch\u01D4 y\xFA", "\u5206\u5B50": "f\xE8n z\u01D0", "\u665A\u4E0A": "w\u01CEn shang", "\u90E8\u957F": "b\xF9 zh\u01CEng", "\u8499\u53E4": "m\u011Bng g\u01D4", "\u53EA\u6709": "zh\u01D0 y\u01D2u", "\u9002\u5F53": "sh\xEC d\xE0ng", "\u54C1\u79CD": "p\u01D0n zh\u01D2ng", "\u53EA\u597D": "zh\u01D0 h\u01CEo", "\u6210\u957F": "ch\xE9ng zh\u01CEng", "\u9AD8\u5174": "g\u0101o x\xECng", "\u4E0D\u4E86": "b\xF9 li\u01CEo", "\u4EA7\u91CF": "ch\u01CEn li\xE0ng", "\u80D6\u5B50": "p\xE0ng zi", "\u79CD\u7C7B": "zh\u01D2ng l\xE8i", "\u663E\u5F97": "xi\u01CEn de", "\u53EA\u662F": "zh\u01D0 sh\xEC", "\u4F3C\u7684": "sh\xEC de", "\u7387\u9886": "shu\xE0i l\u01D0ng", "\u6539\u4E3A": "g\u01CEi w\xE9i", "\u4E0D\u7981": "b\xF9 j\u012Bn", "\u6210\u5206": "ch\xE9ng f\xE8n", "\u7B54\u5E94": "d\u0101 y\xECng", "\u5C11\u5E74": "sh\xE0o ni\xE1n", "\u5174\u8DA3": "x\xECng q\xF9", "\u592A\u76D1": "t\xE0i ji\xE0n", "\u4F11\u606F": "xi\u016B xi", "\u6821\u957F": "xi\xE0o zh\u01CEng", "\u66F4\u65B0": "g\u0113ng x\u012Bn", "\u5408\u540C": "h\xE9 tong", "\u559D\u9053": "h\xE8 d\xE0o", "\u91CD\u5E86": "ch\xF3ng q\xECng", "\u91CD\u5EFA": "ch\xF3ng ji\xE0n", "\u4F7F\u5F97": "sh\u01D0 de", "\u5BA1\u67E5": "sh\u011Bn zh\u0101", "\u7D2F\u8BA1": "l\u011Bi j\xEC", "\u7ED9\u4E88": "j\u01D0 y\u01D4", "\u4E0A\u53BB": "sh\u01CEng q\xF9", "\u884C\u60C5": "h\xE1ng q\xEDng", "\u79CD\u79CD": "zh\u01D2ng zh\u01D2ng", "\u6781\u4E3A": "j\xED w\xE9i", "\u51A0\u519B": "gu\xE0n j\u016Bn", "\u4EFF\u4F5B": "f\u01CEng f\xFA", "\u5934\u53D1": "t\xF3u fa", "\u6295\u964D": "t\xF3u xi\xE1ng", "\u5BB6\u957F": "ji\u0101 zh\u01CEng", "\u4ED4\u7EC6": "z\u01D0 x\xEC", "\u8981\u662F": "y\xE0o shi", "\u5C06\u9886": "ji\xE0ng l\u01D0ng", "\u542B\u91CF": "h\xE1n li\xE0ng", "\u66F4\u4E3A": "g\xE8ng w\xE9i", "\u53EA\u5F97": "zh\u01D0 de", "\u54EA\u4E9B": "n\u011Bi xi\u0113", "\u79EF\u7D2F": "j\u012B l\u011Bi", "\u5730\u5904": "d\xEC ch\u01D4", "\u53BF\u957F": "xi\xE0n zh\u01CEng", "\u5C11\u5973": "sh\xE0o n\u01DA", "\u8DEF\u4E0A": "l\xF9 shang", "\u53EA\u6015": "zh\u01D0 p\xE0", "\u80FD\u91CF": "n\xE9ng li\xE0ng", "\u4E00\u5EA6": "y\xED d\xF9", "\u50A8\u91CF": "ch\u01D4 li\xE0ng", "\u4F9B\u5E94": "g\u014Dng y\xECng", "\u6311\u6218": "ti\u01CEo zh\xE0n", "\u897F\u85CF": "x\u012B z\xE0ng", "\u8BB0\u5F97": "j\xEC de", "\u5F71\u7247": "y\u01D0ng pi\u0101n", "\u603B\u91CF": "z\u01D2ng li\xE0ng", "\u5F53\u771F": "d\xE0ng zh\u0113n", "\u5C06\u58EB": "ji\xE0ng sh\xEC", "\u5DEE\u522B": "ch\u0101 bi\xE9", "\u8F83\u4E3A": "ji\xE0o w\xE9i", "\u4E00\u5904": "y\u012B ch\u01D4", "\u7167\u7247": "zh\xE0o pi\u0101n", "\u957F\u8001": "zh\u01CEng l\u01CEo", "\u5927\u592B": "d\xE0i f\u016B", "\u5DEE\u5F02": "ch\u0101 y\xEC", "\u61C2\u5F97": "d\u01D2ng de", "\u5C3D\u91CF": "j\u01D0n li\xE0ng", "\u6A21\u6837": "m\xFA y\xE0ng", "\u7684\u786E": "d\xED qu\xE8", "\u9C7C\u809A": "y\xFA d\u01D4", "\u79CD\u5B50": "zh\u01D2ng zi", "\u4E3A\u9996": "w\xE9i sh\u01D2u", "\u4FBF\u5B9C": "pi\xE1n y\xED", "\u66F4\u540D": "g\u0113ng m\xEDng", "\u77F3\u5934": "sh\xED tou", "\u5DDE\u957F": "zh\u014Du zh\u01CEng", "\u4E3A\u6B62": "w\xE9i zh\u01D0", "\u6F02\u4EAE": "pi\xE0o li\xE0ng", "\u70AE\u5F39": "p\xE0o d\xE0n", "\u85CF\u65CF": "z\xE0ng z\xFA", "\u54EA\u4E2A": "n\u011Bi g\xE8", "\u89D2\u8272": "ju\xE9 s\xE8", "\u5F53\u4F5C": "d\xE0ng zu\xF2", "\u5C3D\u5FEB": "j\u01D0n ku\xE0i", "\u4EBA\u4E3A": "r\xE9n w\xE9i", "\u91CD\u590D": "ch\xF3ng f\xF9", "\u80E1\u540C": "h\xFA t\xF2ng", "\u5DEE\u8DDD": "ch\u0101 j\xF9", "\u5F1F\u5144": "d\xEC xiong", "\u5927\u5C06": "d\xE0 ji\xE0ng", "\u51E0\u79CD": "j\u01D0 zh\u01D2ng", "\u809A\u5B50": "d\u01D4 zi", "\u7761\u89C9": "shu\xEC ji\xE0o", "\u56E2\u957F": "tu\xE1n zh\u01CEng", "\u961F\u957F": "du\xEC zh\u01CEng", "\u533A\u957F": "q\u016B zh\u01CEng", "\u96BE\u5F97": "n\xE1n de", "\u4E2B\u5934": "y\u0101 tou", "\u6253\u542C": "d\u01CE ting", "\u4F1A\u957F": "hu\xEC zh\u01CEng", "\u5F1F\u5F1F": "d\xEC di", "\u738B\u7237": "w\xE1ng ye", "\u5F53\u5929": "d\xE0ng ti\u0101n", "\u91CD\u91CF": "zh\xF2ng li\xE0ng", "\u9C7C\u79CD": "y\xFA zh\u01D2ng", "\u8A89\u4E3A": "y\xF9 w\xE9i", "\u5BB6\u4F19": "ji\u0101 huo", "\u534E\u5C71": "hu\xE0 sh\u0101n", "\u6905\u5B50": "y\u01D0 zi", "\u6D41\u91CF": "li\xFA li\xE0ng", "\u957F\u5927": "zh\u01CEng d\xE0", "\u52C9\u5F3A": "mi\u01CEn qi\u01CEng", "\u4F1A\u8BA1": "ku\xE0i j\xEC", "\u5206\u6563": "f\u0113n s\u01CEn", "\u8FC7\u5206": "gu\xF2 f\xE8n", "\u4E09\u79CD": "s\u0101n zh\u01D2ng", "\u6D4E\u5357": "j\u01D0 n\xE1n", "\u8C03\u52A8": "di\xE0o d\xF2ng", "\u71D5\u4EAC": "y\u0101n j\u012Bng", "\u5C11\u5C06": "sh\xE0o ji\xE0ng", "\u4E2D\u6BD2": "zh\xF2ng d\xFA", "\u6653\u5F97": "xi\u01CEo de", "\u7279\u79CD": "t\xE8 zh\u01D2ng", "\u53D8\u66F4": "bi\xE0n g\u0113ng", "\u8BA4\u5F97": "r\xE8n de", "\u82F9\u679C": "p\xEDn gu\u01D2", "\u5FF5\u5934": "ni\xE0n tou", "\u6323\u624E": "zh\u0113ng zh\xE1", "\u4E09\u85CF": "s\u0101n z\xE0ng", "\u5265\u524A": "b\u014D xu\u0113", "\u4E1E\u76F8": "ch\xE9ng xi\xE0ng", "\u5C11\u91CF": "sh\u01CEo li\xE0ng", "\u5BFB\u601D": "x\xEDn s\u012B", "\u593A\u5F97": "du\xF3 de", "\u5E72\u7EBF": "g\xE0n xi\xE0n", "\u547C\u5401": "h\u016B y\xF9", "\u620F\u66F2": "x\xEC q\u01D4", "\u5904\u7F5A": "ch\u01D4 f\xE1", "\u957F\u5B98": "zh\u01CEng gu\u0101n", "\u89C1\u957F": "ji\xE0n zh\u01CEng", "\u67CF\u6797": "b\xF3 l\xEDn", "\u4EB2\u621A": "q\u012Bn qi", "\u8EAB\u5206": "sh\u0113n f\xE8n", "\u80F3\u818A": "g\u0113 bo", "\u7740\u624B": "zhu\xF3 sh\u01D2u", "\u70B8\u5F39": "zh\xE0 d\xE0n", "\u54B3\u55FD": "k\xE9 sou", "\u897F\u8FB9": "x\u012B bian", "\u8D62\u5F97": "y\xEDng de", "\u53F6\u5B50": "y\xE8 zi", "\u5916\u957F": "w\xE0i zh\u01CEng", "\u4F9B\u7ED9": "g\u014Dng j\u01D0", "\u5E08\u957F": "sh\u012B zh\u01CEng", "\u53D8\u91CF": "bi\xE0n li\xE0ng", "\u5E94\u6709": "y\u012Bng y\u01D2u", "\u4E0B\u8F7D": "xi\xE0 z\xE0i", "\u4E50\u5668": "yu\xE8 q\xEC", "\u95F4\u63A5": "ji\xE0n ji\u0113", "\u5E95\u4E0B": "d\u01D0 xia", "\u79CD\u65CF": "zh\u01D2ng z\xFA", "\u6253\u626E": "d\u01CE ban", "\u5B50\u5F39": "z\u01D0 d\xE0n", "\u5F39\u836F": "d\xE0n y\xE0o", "\u70ED\u91CF": "r\xE8 li\xE0ng", "\u524A\u5F31": "xu\u0113 ru\xF2", "\u9AA8\u5E72": "g\u01D4 g\xE0n", "\u5BB9\u91CF": "r\xF3ng li\xE0ng", "\u6A21\u7CCA": "m\xF3 hu", "\u8F6C\u52A8": "zhu\xE0n d\xF2ng", "\u843D\u4E0B": "l\xE0 xi\xE0", "\u79F0\u547C": "ch\u0113ng hu", "\u79D1\u957F": "k\u0113 zh\u01CEng", "\u5904\u7F6E": "ch\u01D4 zh\xEC", "\u6B4C\u66F2": "g\u0113 q\u01D4", "\u7740\u91CD": "zhu\xF3 zh\xF2ng", "\u7740\u6025": "zh\xE1o j\xED", "\u5F3A\u8FEB": "qi\u01CEng p\xF2", "\u5EAD\u957F": "t\xEDng zh\u01CEng", "\u9996\u76F8": "sh\u01D2u xi\xE0ng", "\u5587\u561B": "l\u01CE ma", "\u9547\u957F": "zh\xE8n zh\u01CEng", "\u53EA\u7BA1": "zh\u01D0 gu\u01CEn", "\u91CD\u91CD": "ch\xF3ng ch\xF3ng", "\u514D\u5F97": "mi\u01CEn de", "\u707E\u96BE": "z\u0101i n\xE0n", "\u7740\u5B9E": "zhu\xF3 sh\xED", "\u6240\u5F97": "su\u01D2 de", "\u5EA6\u5047": "d\xF9 ji\xE0", "\u771F\u76F8": "zh\u0113n xi\xE0ng", "\u76F8\u8C8C": "xi\xE0ng m\xE0o", "\u5904\u5206": "ch\u01D4 f\xE8n", "\u5E72\u9884": "g\xE0n y\xF9", "\u59D4\u5C48": "w\u011Bi qu", "\u4E3A\u671F": "w\xE9i q\u012B", "\u4F2F\u4F2F": "b\xF3 bo", "\u5708\u5B50": "qu\u0101n zi", "\u89C1\u8BC6": "ji\xE0n shi", "\u7B3C\u7F69": "l\u01D2ng zh\xE0o", "\u5916\u8FB9": "w\xE0i bian", "\u4E0E\u4F1A": "y\xF9 hu\xEC", "\u90FD\u7763": "d\u016B du", "\u5BB0\u76F8": "z\u01CEi xi\xE0ng", "\u8F83\u91CF": "ji\xE0o li\xE0ng", "\u5BF9\u79F0": "du\xEC ch\xE8n", "\u603B\u957F": "z\u01D2ng zh\u01CEng", "\u76F8\u516C": "xi\xE0ng gong", "\u7A7A\u767D": "k\xF2ng b\xE1i", "\u5927\u738B": "d\xE0i w\xE1ng", "\u6253\u91CF": "d\u01CE liang", "\u6C34\u5206": "shu\u01D0 f\xE8n", "\u820C\u5934": "sh\xE9 tou", "\u6CA1\u6536": "m\xF2 sh\u014Du", "\u884C\u674E": "x\xEDng li", "\u5224\u5904": "p\xE0n ch\u01D4", "\u6563\u6587": "s\u01CEn w\xE9n", "\u5904\u5883": "ch\u01D4 j\xECng", "\u6811\u79CD": "sh\xF9 zh\u01D2ng", "\u5B59\u5B50": "s\u016Bn zi", "\u62F3\u5934": "qu\xE1n tou", "\u6253\u53D1": "d\u01CE fa", "\u7EC4\u957F": "z\u01D4 zh\u01CEng", "\u9AA8\u5934": "g\xFA tou", "\u5B81\u53EF": "n\xECng k\u011B", "\u66F4\u6362": "g\u0113ng hu\xE0n", "\u8584\u5F31": "b\xF3 ru\xF2", "\u8FD8\u539F": "hu\xE1n yu\xE1n", "\u91CD\u4FEE": "ch\xF3ng xi\u016B", "\u4E1C\u8FB9": "d\u014Dng bian", "\u540C\u884C": "t\xF3ng h\xE1ng", "\u53EA\u987E": "zh\u01D0 g\xF9", "\u7231\u597D": "\xE0i h\xE0o", "\u9992\u5934": "m\xE1n tou", "\u519B\u957F": "j\u016Bn zh\u01CEng", "\u6563\u53D1": "s\xE0n f\xE0", "\u9996\u957F": "sh\u01D2u zh\u01CEng", "\u5382\u957F": "ch\u01CEng zh\u01CEng", "\u53F8\u957F": "s\u012B zh\u01CEng", "\u957F\u5B50": "zh\u01CEng z\u01D0", "\u5F3A\u52B2": "qi\xE1ng j\xECng", "\u6070\u5F53": "qi\xE0 d\xE0ng", "\u5934\u513F": "tou er", "\u7AD9\u957F": "zh\xE0n zh\u01CEng", "\u6298\u817E": "zh\u0113 teng", "\u76F8\u5904": "xi\u0101ng ch\u01D4", "\u7EDF\u7387": "t\u01D2ng shu\xE0i", "\u4E2D\u5C06": "zh\u014Dng ji\xE0ng", "\u547D\u4E2D": "m\xECng zh\xF2ng", "\u540D\u5C06": "m\xEDng ji\xE0ng", "\u5DE6\u8FB9": "zu\u01D2 bian", "\u6728\u5934": "m\xF9 tou", "\u52A8\u5F39": "d\xF2ng d\xE0n", "\u5730\u58F3": "d\xEC qi\xE0o", "\u5E72\u6D3B": "g\xE0n hu\xF3", "\u5C11\u7237": "sh\xE0o ye", "\u96BE\u6C11": "n\xE0n m\xEDn", "\u6C34\u91CF": "shu\u01D0 li\xE0ng", "\u8865\u7ED9": "b\u01D4 j\u01D0", "\u5C3E\u5DF4": "w\u011Bi ba", "\u6765\u5F97": "l\xE1i de", "\u597D\u5947": "h\xE0o q\xED", "\u94A5\u5319": "y\xE0o shi", "\u5F53\u505A": "d\xE0ng zu\xF2", "\u6C89\u7740": "ch\xE9n zhu\xF3", "\u54D1\u5DF4": "y\u01CE ba", "\u8F66\u5B50": "ch\u0113 zi", "\u4E0A\u5C06": "sh\xE0ng ji\xE0ng", "\u64AD\u79CD": "b\u014D zh\u01D2ng", "\u6076\u5FC3": "\u011B xin", "\u4E0D\u5BF9": "b\xFA du\xEC", "\u62C5\u5B50": "d\xE0n zi", "\u5E94\u5C4A": "y\u012Bng ji\xE8", "\u884C\u5217": "h\xE1ng li\xE8", "\u4E3B\u89D2": "zh\u01D4 ju\xE9", "\u8FD0\u8F6C": "y\xF9n zhu\xE0n", "\u5144\u957F": "xi\u014Dng zh\u01CEng", "\u683C\u5F0F": "g\xE9 shi", "\u6B63\u6708": "zh\u0113ng yu\xE8", "\u8425\u957F": "y\xEDng zh\u01CEng", "\u5F53\u6210": "d\xE0ng ch\xE9ng", "\u53F3\u8FB9": "y\xF2u bian", "\u5973\u5A7F": "n\u01DA xu", "\u54BD\u5589": "y\u0101n h\xF3u", "\u5F53\u665A": "d\xE0ng w\u01CEn", "\u91CD\u9633": "ch\xF3ng y\xE1ng", "\u5316\u4E3A": "hu\xE0 w\xE9i", "\u53CC\u91CD": "shu\u0101ng ch\xF3ng", "\u5410\u8543": "t\u01D4 b\u014D", "\u94BB\u8FDB": "zu\u0101n j\xECn", "\u4E50\u961F": "yu\xE8 du\xEC", "\u4E0D\u5F53": "b\xF9 d\xE0ng", "\u4EAE\u76F8": "li\xE0ng xi\xE0ng", "\u88AB\u5B50": "b\xE8i zi", "\u820D\u5F97": "sh\u011B de", "\u6749\u6728": "sh\u0101 m\xF9", "\u51FB\u4E2D": "j\u012B zh\xF2ng", "\u65E0\u5904": "w\xFA ch\u01D4", "\u91CC\u8FB9": "l\u01D0 bian", "\u6392\u957F": "p\xE1i zh\u01CEng", "\u5047\u671F": "ji\xE0 q\u012B", "\u5206\u91CF": "f\xE8n li\xE0ng", "\u6570\u6B21": "shu\xF2 c\xEC", "\u63D0\u9632": "d\u012B f\xE1ng", "\u5406\u559D": "y\u0101o he", "\u67E5\u5904": "ch\xE1 ch\u01D4", "\u91CF\u5B50": "li\xE0ng z\u01D0", "\u91CC\u5934": "l\u01D0 tou", "\u4E24\u884C": "li\u01CEng h\xE1ng", "\u8C03\u7814": "di\xE0o y\xE1n", "\u4F3A\u5019": "c\xEC hou", "\u91CD\u7533": "ch\xF3ng sh\u0113n", "\u6795\u5934": "zh\u011Bn tou", "\u62DA\u547D": "p\xE0n m\xECng", "\u793E\u957F": "sh\xE8 zh\u01CEng", "\u82E6\u96BE": "k\u01D4 n\xE0n", "\u5F52\u8FD8": "gu\u012B hu\xE1n", "\u5371\u96BE": "w\u0113i n\xE0n", "\u6279\u91CF": "p\u012B li\xE0ng", "\u755C\u7267": "x\xF9 m\xF9", "\u70B9\u7740": "di\u01CEn zh\xE1o", "\u751A\u4E3A": "sh\xE8n w\xE9i", "\u5C0F\u5C06": "xi\u01CEo ji\xE0ng", "\u7740\u773C": "zhu\xF3 y\u01CEn", "\u5904\u6B7B": "ch\u01D4 s\u01D0", "\u538C\u6076": "y\xE0n w\xF9", "\u9F13\u4E50": "g\u01D4 yu\xE8", "\u6811\u5E72": "sh\xF9 g\xE0n", "\u79D8\u9C81": "b\xEC l\u01D4", "\u5927\u65B9": "d\xE0 fang", "\u5916\u5934": "w\xE0i tou", "\u73ED\u957F": "b\u0101n zh\u01CEng", "\u661F\u5BBF": "x\u012Bng xi\xF9", "\u5B81\u613F": "n\xECng yu\xE0n", "\u94A6\u5DEE": "q\u012Bn ch\u0101i", "\u4E3A\u6570": "w\xE9i sh\xF9", "\u52FE\u5F53": "g\xF2u d\xE0ng", "\u524A\u51CF": "xu\u0113 ji\u01CEn", "\u4E00\u53D1": "y\u012B f\xE0", "\u95F4\u8C0D": "ji\xE0n di\xE9", "\u57CB\u6028": "m\xE1n yu\xE0n", "\u7ED3\u5B9E": "ji\u0113 shi", "\u8BA1\u91CF": "j\xEC li\xE0ng", "\u6DF9\u6CA1": "y\u0101n m\xF2", "\u6751\u957F": "c\u016Bn zh\u01CEng", "\u8FDE\u957F": "li\xE1n zh\u01CEng", "\u81EA\u7ED9": "z\xEC j\u01D0", "\u4E0B\u8FB9": "xi\xE0 bian", "\u7269\u79CD": "w\xF9 zh\u01D2ng", "\u6B66\u5C06": "w\u01D4 ji\xE0ng", "\u6E29\u5DEE": "w\u0113n ch\u0101", "\u76F4\u5954": "zh\xED b\xE8n", "\u4F9B\u6C42": "g\u014Dng qi\xFA", "\u5242\u91CF": "j\xEC li\xE0ng", "\u9053\u957F": "d\xE0o zh\u01CEng", "\u6CC4\u9732": "xi\xE8 l\xF2u", "\u738B\u516B": "w\xE1ng ba", "\u5207\u5272": "qi\u0113 g\u0113", "\u95F4\u9694": "ji\xE0n g\xE9", "\u4E00\u6643": "y\u012B hu\u01CEng", "\u957F\u5047": "ch\xE1ng ji\xE0", "\u4EE4\u72D0": "l\xEDng h\xFA", "\u4E3A\u5BB3": "w\xE9i h\xE0i", "\u53E5\u5B50": "j\xF9 zi", "\u507F\u8FD8": "ch\xE1ng hu\xE1n", "\u7599\u7629": "g\u0113 d\u0101", "\u71D5\u5C71": "y\u0101n sh\u0101n", "\u5835\u585E": "d\u01D4 s\xE8", "\u593A\u51A0": "du\xF3 gu\xE0n", "\u4E0B\u8C03": "xi\xE0 di\xE0o", "\u624E\u5B9E": "zh\u0101 shi", "\u7535\u8377": "di\xE0n h\xE8", "\u770B\u5B88": "k\u0101n sh\u01D2u", "\u590D\u8F9F": "f\xF9 b\xEC", "\u90C1\u95F7": "y\xF9 m\xE8n", "\u5C3D\u65E9": "j\u01D0n z\u01CEo", "\u5207\u65AD": "qi\u0113 du\xE0n", "\u6307\u5934": "zh\u01D0 tou", "\u4E3A\u751F": "w\xE9i sh\u0113ng", "\u755C\u751F": "ch\xF9 sheng", "\u5207\u9664": "qi\u0113 ch\xFA", "\u7740\u529B": "zhu\xF3 l\xEC", "\u7740\u60F3": "zhu\xF3 xi\u01CEng", "\u7EA7\u5DEE": "j\xED ch\u0101", "\u6295\u5954": "t\xF3u b\xE8n", "\u68CD\u5B50": "g\xF9n zi", "\u542B\u7CCA": "h\xE1n hu", "\u5C11\u5987": "sh\xE0o f\xF9", "\u5174\u81F4": "x\xECng zh\xEC", "\u6742\u79CD": "z\xE1 zh\u01D2ng", "\u56DB\u79CD": "s\xEC zh\u01D2ng", "\u7EB3\u95F7": "n\xE0 m\xE8n", "\u5E72\u6D41": "g\xE0n li\xFA", "\u5377\u8D77": "ju\u01CEn q\u01D0", "\u6247\u5B50": "sh\xE0n zi", "\u66F4\u6539": "g\u0113ng g\u01CEi", "\u7B3C\u7EDC": "l\u01D2ng lu\xF2", "\u5587\u53ED": "l\u01CE ba", "\u8F7D\u8377": "z\xE0i h\xE8", "\u59A5\u5F53": "tu\u01D2 d\xE0ng", "\u4E3A\u96BE": "w\xE9i n\xE1n", "\u7740\u9646": "zhu\xF3 l\xF9", "\u71D5\u5B50": "y\xE0n zi", "\u5E72\u5417": "g\xE0n m\xE1", "\u767D\u53D1": "b\xE1i f\xE0", "\u603B\u5F97": "z\u01D2ng d\u011Bi", "\u5939\u51FB": "ji\u0101 j\u012B", "\u66DD\u5149": "b\xE0o gu\u0101ng", "\u66F2\u8C03": "q\u01D4 di\xE0o", "\u76F8\u673A": "xi\xE0ng j\u012B", "\u53EB\u5316": "ji\xE0o hu\u0101", "\u89D2\u9010": "ju\xE9 zh\xFA", "\u554A\u54DF": "\u0101 y\u014D", "\u8F7D\u91CD": "z\xE0i zh\xF2ng", "\u957F\u8F88": "zh\u01CEng b\xE8i", "\u51FA\u5DEE": "ch\u016B ch\u0101i", "\u579B\u53E3": "du\u01D2 k\u01D2u", "\u6487\u5F00": "pi\u0113 k\u0101i", "\u5385\u957F": "t\u012Bng zh\u01CEng", "\u7EC4\u5206": "z\u01D4 f\xE8n", "\u8BEF\u5DEE": "w\xF9 ch\u0101", "\u5BB6\u5F53": "ji\u0101 d\xE0ng", "\u4F20\u8BB0": "zhu\xE0n j\xEC", "\u4E2A\u5B50": "g\xE8 zi", "\u94FA\u8BBE": "p\u016B sh\xE8", "\u5E72\u4E8B": "g\xE0n sh\xEC", "\u6746\u83CC": "g\u01CEn j\u016Bn", "\u4E94\u66F4": "w\u01D4 g\u0113ng", "\u5B9A\u91CF": "d\xECng li\xE0ng", "\u8FD0\u8F7D": "y\xF9n z\xE0i", "\u4F1A\u513F": "hu\xEC er", "\u914B\u957F": "qi\xFA zh\u01CEng", "\u91CD\u8FD4": "ch\xF3ng f\u01CEn", "\u5DEE\u989D": "ch\u0101 \xE9", "\u9732\u9762": "l\xF2u mi\xE0n", "\u94BB\u7814": "zu\u0101n y\xE1n", "\u5927\u57CE": "d\xE0i ch\xE9ng", "\u4E0A\u5F53": "sh\xE0ng d\xE0ng", "\u9500\u91CF": "xi\u0101o li\xE0ng", "\u6D0B\u884C": "y\xE1ng h\xE1ng", "\u4F5C\u574A": "zu\u014D fang", "\u7167\u76F8": "zh\xE0o xi\xE0ng", "\u54CE\u5440": "\u0101i y\u0101", "\u8C03\u96C6": "di\xE0o j\xED", "\u770B\u4E2D": "k\xE0n zh\xF2ng", "\u8BAE\u957F": "y\xEC zh\u01CEng", "\u98CE\u7B5D": "f\u0113ng zheng", "\u4E00\u5E94": "y\u012B y\u012Bng", "\u8F9F\u90AA": "b\xEC xi\xE9", "\u7A7A\u9699": "k\xF2ng x\xEC", "\u66F4\u8FED": "g\u0113ng di\xE9", "\u504F\u5DEE": "pi\u0101n ch\u0101", "\u58F0\u8C03": "sh\u0113ng di\xE0o", "\u519C\u884C": "n\xF3ng h\xE1ng", "\u9002\u91CF": "sh\xEC li\xE0ng", "\u5C6F\u5B50": "t\xFAn zi", "\u641C\u67E5": "s\u014Du zh\u0101", "\u65E0\u91CF": "w\xFA li\xE0ng", "\u7A7A\u5730": "k\xF2ng d\xEC", "\u8C03\u5EA6": "di\xE0o d\xF9", "\u4E00\u66F2": "y\u012B q\u01D4", "\u6563\u5C04": "s\u01CEn sh\xE8", "\u79CD\u59D3": "zh\u01D2ng x\xECng", "\u592A\u884C": "t\xE0i h\xE1ng", "\u521B\u4F24": "chu\u0101ng sh\u0101ng", "\u6D77\u53C2": "h\u01CEi sh\u0113n", "\u6EE1\u8F7D": "m\u01CEn z\xE0i", "\u91CD\u53E0": "ch\xF3ng di\xE9", "\u519B\u79CD": "j\u016Bn zh\u01D2ng", "\u843D\u5DEE": "lu\xF2 ch\u0101", "\u5355\u8C03": "d\u0101n di\xE0o", "\u8001\u5C06": "l\u01CEo ji\xE0ng", "\u4EBA\u53C2": "r\xE9n sh\u0113n", "\u95F4\u65AD": "ji\xE0n du\xE0n", "\u91CD\u73B0": "ch\xF3ng xi\xE0n", "\u5939\u6742": "ji\u0101 z\xE1", "\u8C03\u7528": "di\xE0o y\xF2ng", "\u841D\u535C": "lu\xF3 bo", "\u9644\u7740": "f\xF9 zhu\xF3", "\u5E94\u58F0": "y\u012Bng sh\u0113ng", "\u4E3B\u5C06": "zh\u01D4 ji\xE0ng", "\u7F6A\u8FC7": "zu\xEC guo", "\u5480\u56BC": "j\u01D4 ju\xE9", "\u4E3A\u653F": "w\xE9i zh\xE8ng", "\u8FC7\u91CF": "gu\xF2 li\xE0ng", "\u4E50\u66F2": "yu\xE8 q\u01D4", "\u8D1F\u8377": "f\xF9 h\xE8", "\u67AA\u5F39": "qi\u0101ng d\xE0n", "\u6084\u7136": "qi\u01CEo r\xE1n", "\u5904\u65B9": "ch\u01D4 f\u0101ng", "\u6084\u58F0": "qi\u01CEo sh\u0113ng", "\u66F2\u5B50": "q\u01D4 zi", "\u60C5\u8C03": "q\xEDng di\xE0o", "\u4E00\u7740": "y\u012B zh\u0101o", "\u6311\u8845": "ti\u01CEo x\xECn", "\u4EE3\u4E3A": "d\xE0i w\xE9i", "\u4E86\u7ED3": "li\u01CEo ji\xE9", "\u6253\u4E2D": "d\u01CE zh\xF2ng", "\u9152\u5427": "ji\u01D4 b\u0101", "\u4F5C\u66F2": "zu\xF2 q\u01D4", "\u61D2\u5F97": "l\u01CEn de", "\u589E\u91CF": "z\u0113ng li\xE0ng", "\u8863\u7740": "y\u012B zhu\xF3", "\u90E8\u5C06": "b\xF9 ji\xE0ng", "\u8981\u585E": "y\xE0o s\xE0i", "\u8336\u51E0": "ch\xE1 j\u012B", "\u6760\u6746": "g\xE0ng g\u01CEn", "\u51FA\u6CA1": "ch\u016B m\xF2", "\u9C9C\u6709": "xi\u01CEn y\u01D2u", "\u95F4\u9699": "ji\xE0n x\xEC", "\u91CD\u62C5": "zh\xF2ng d\xE0n", "\u91CD\u6F14": "ch\xF3ng y\u01CEn", "\u5E94\u916C": "y\xECng chou", "\u53EA\u5F53": "zh\u01D0 d\u0101ng", "\u6BCB\u5B81": "w\xFA n\xECng", "\u5305\u624E": "b\u0101o z\u0101", "\u524D\u5934": "qi\xE1n tou", "\u5377\u70DF": "ju\u01CEn y\u0101n", "\u975E\u5F97": "f\u0113i d\u011Bi", "\u4E94\u79CD": "w\u01D4 zh\u01D2ng", "\u5F39\u9053": "d\xE0n d\xE0o", "\u4E0A\u8C03": "sh\xE0ng di\xE0o", "\u6746\u5B50": "g\u0101n zi", "\u95E8\u5C06": "m\xE9n ji\xE0ng", "\u540E\u5934": "h\xF2u tou", "\u6807\u8BC6": "bi\u0101o zh\xEC", "\u559D\u5F69": "h\xE8 c\u01CEi", "\u6696\u548C": "nu\u01CEn huo", "\u66F4\u6DF1": "g\u0113ng sh\u0113n", "\u7D2F\u79EF": "l\u011Bi j\u012B", "\u5F15\u5F97": "y\u01D0n de", "\u8C03\u9063": "di\xE0o qi\u01CEn", "\u5014\u5F3A": "ju\xE9 ji\xE0ng", "\u5B9D\u85CF": "b\u01CEo z\xE0ng", "\u4E27\u4E8B": "s\u0101ng sh\xEC", "\u7EA6\u83AB": "yu\u0113 mo", "\u7EA4\u592B": "qi\xE0n f\u016B", "\u66F4\u66FF": "g\u0113ng t\xEC", "\u88C5\u8F7D": "zhu\u0101ng z\xE0i", "\u80CC\u5305": "b\u0113i b\u0101o", "\u5E16\u5B50": "ti\u011B zi", "\u79CD\u7FA4": "zh\u01D2ng q\xFAn", "\u677E\u6563": "s\u014Dng s\u01CEn", "\u652F\u884C": "zh\u012B h\xE1ng", "\u547C\u559D": "h\u016B h\xE8", "\u53EF\u6076": "k\u011B w\xF9", "\u81EA\u8F6C": "z\xEC zhu\xE0n", "\u4F9B\u7535": "g\u014Dng di\xE0n", "\u53CD\u7701": "f\u01CEn x\u01D0ng", "\u5766\u7387": "t\u01CEn shu\xE0i", "\u82CF\u6253": "s\u016B d\xE1", "\u672C\u5206": "b\u011Bn f\xE8n", "\u843D\u5F97": "lu\xF2 de", "\u9119\u8584": "b\u01D0 b\xF3", "\u76F8\u95F4": "xi\u0101ng ji\xE0n", "\u5355\u8584": "d\u0101n b\xF3", "\u6DF7\u86CB": "h\xFAn d\xE0n", "\u53D1\u96BE": "f\u0101 n\xE0n", "\u8D1E\u89C2": "zh\u0113n gu\xE0n", "\u8BED\u79CD": "y\u01D4 zh\u01D2ng", "\u9644\u548C": "f\xF9 h\xE8", "\u80B2\u79CD": "y\xF9 zh\u01D2ng", "\u80FD\u8010": "n\xE9ng nai", "\u5413\u552C": "xi\xE0 hu", "\u672A\u4E86": "w\xE8i li\u01CEo", "\u5F15\u7740": "y\u01D0n zh\xE1o", "\u62BD\u8C03": "ch\u014Du di\xE0o", "\u6C99\u5B50": "sh\u0101 zi", "\u5E2D\u5377": "x\xED ju\u01CEn", "\u6807\u7684": "bi\u0101o d\xEC", "\u4EBA\u79CD": "r\xE9n zh\u01D2ng", "\u522B\u626D": "bi\xE8 niu", "\u601D\u91CF": "s\u012B liang", "\u559D\u91C7": "h\xE8 c\u01CEi", "\u8BBA\u8BED": "l\xFAn y\u01D4", "\u76D6\u5B50": "g\xE0i zi", "\u66F2\u827A": "q\u01D4 y\xEC", "\u5206\u5916": "f\xE8n w\xE0i", "\u5F04\u5802": "l\xF2ng t\xE1ng", "\u4E50\u821E": "yu\xE8 w\u01D4", "\u96E8\u91CF": "y\u01D4 li\xE0ng", "\u6BDB\u53D1": "m\xE1o f\xE0", "\u5DEE\u9063": "ch\u0101i qi\u01CEn", "\u66F2\u76EE": "q\u01D4 m\xF9", "\u80CC\u8D1F": "b\u0113i f\xF9", "\u8F6C\u901F": "zhu\xE0n s\xF9", "\u58F0\u4E50": "sh\u0113ng yu\xE8", "\u5939\u653B": "ji\u0101 g\u014Dng", "\u4F9B\u6C34": "g\u014Dng shu\u01D0", "\u4E3B\u5E72": "zh\u01D4 g\xE0n", "\u9003\u96BE": "t\xE1o n\xE0n", "\u60E9\u5904": "ch\xE9ng ch\u01D4", "\u957F\u76F8": "zh\u01CEng xi\xE0ng", "\u516C\u5DEE": "g\u014Dng ch\u0101i", "\u884C\u5F53": "h\xE1ng dang", "\u69B4\u5F39": "li\xFA d\xE0n", "\u7701\u5F97": "sh\u011Bng de", "\u6761\u5B50": "ti\xE1o zi", "\u91CD\u56F4": "ch\xF3ng w\xE9i", "\u963B\u585E": "z\u01D4 s\xE8", "\u52B2\u98CE": "j\xECng f\u0113ng", "\u7EA0\u845B": "ji\u016B g\xE9", "\u98A0\u7C38": "di\u0101n b\u01D2", "\u70B9\u4E2D": "di\u01CEn zh\xF2ng", "\u907F\u96BE": "b\xEC n\xE0n", "\u91CD\u521B": "zh\xF2ng chu\u0101ng", "\u59E5\u59E5": "l\u01CEo lao", "\u8FF7\u7CCA": "m\xED hu", "\u516C\u5BB6": "g\u014Dng jia", "\u51E0\u7387": "j\u012B l\u01DC", "\u82E6\u95F7": "k\u01D4 m\xE8n", "\u5EA6\u91CF": "d\xF9 li\xE0ng", "\u5DEE\u9519": "ch\u0101 cu\xF2", "\u6691\u5047": "sh\u01D4 ji\xE0", "\u53C2\u5DEE": "c\u0113n c\u012B", "\u642D\u8F7D": "d\u0101 z\xE0i", "\u52A9\u957F": "zh\xF9 zh\u01CEng", "\u76F8\u79F0": "xi\u0101ng ch\xE8n", "\u7EA2\u6655": "h\xF3ng y\xF9n", "\u820D\u547D": "sh\u011B m\xECng", "\u559C\u597D": "x\u01D0 h\xE0o", "\u5217\u4F20": "li\xE8 zhu\xE0n", "\u52B2\u654C": "j\xECng d\xED", "\u86E4\u87C6": "h\xE1 m\xE1", "\u4E09\u91CD": "s\u0101n ch\xF3ng", "\u8BF7\u5047": "q\u01D0ng ji\xE0", "\u9489\u5B50": "d\u012Bng zi", "\u5267\u79CD": "j\xF9 zh\u01D2ng", "\u6C89\u6CA1": "ch\xE9n m\xF2", "\u9AD8\u4E3D": "g\u0101o l\xED", "\u4F11\u5047": "xi\u016B ji\xE0", "\u65E0\u4E3A": "w\xFA w\xE9i", "\u5DF4\u7ED3": "b\u0101 j\xEC", "\u4E86\u5F97": "li\u01CEo de", "\u53D8\u76F8": "bi\xE0n xi\xE0ng", "\u6838\u5F39": "h\xE9 d\xE0n", "\u4EB2\u5BB6": "q\xECng jia", "\u627F\u8F7D": "ch\xE9ng z\xE0i", "\u884C\u5BB6": "h\xE1ng jia", "\u559D\u95EE": "h\xE8 w\xE8n", "\u8FD8\u51FB": "hu\xE1n j\u012B", "\u4EA4\u8FD8": "ji\u0101o hu\xE1n", "\u5F53\u591C": "d\xE0ng y\xE8", "\u5C06\u4EE4": "ji\xE0ng l\xECng", "\u5355\u4E8E": "ch\xE1n y\xFA", "\u7A7A\u7F3A": "k\xF2ng qu\u0113", "\u7EFF\u6797": "l\xF9 l\xEDn", "\u80C6\u91CF": "d\u01CEn li\xE0ng", "\u6267\u7740": "zh\xED zhu\xF3", "\u4F4E\u8C03": "d\u012B di\xE0o", "\u8D23\u96BE": "z\xE9 n\xE0n", "\u95ED\u585E": "b\xEC s\xE8", "\u8F7B\u8584": "q\u012Bng b\xF3", "\u5F97\u5F53": "d\xE9 d\xE0ng", "\u5360\u535C": "zh\u0101n b\u01D4", "\u6392\u884C": "p\xE1i h\xE1ng", "\u626B\u5E1A": "s\xE0o zhou", "\u9F9F\u5179": "qi\u016B c\xED", "\u5E74\u957F": "ni\xE1n zh\u01CEng", "\u5916\u4F20": "w\xE0i zhu\xE0n", "\u5934\u5B50": "t\xF3u zi", "\u88C1\u7F1D": "c\xE1i f\xE9ng", "\u793C\u4E50": "l\u01D0 yu\xE8", "\u8840\u6CCA": "xu\xE8 p\u014D", "\u6563\u4E71": "s\u01CEn lu\xE0n", "\u52A8\u91CF": "d\xF2ng li\xE0ng", "\u5012\u817E": "d\u01CEo teng", "\u53D6\u820D": "q\u01D4 sh\u011B", "\u54B1\u5BB6": "z\xE1 ji\u0101", "\u957F\u53D1": "ch\xE1ng f\xE0", "\u722A\u54C7": "zh\u01CEo w\u0101", "\u5F39\u58F3": "d\xE0n k\xE9", "\u7701\u609F": "x\u01D0ng w\xF9", "\u56B7\u56B7": "r\u0101ng rang", "\u8FDE\u7D2F": "li\xE1n l\u011Bi", "\u5E94\u5F97": "y\u012Bng d\xE9", "\u65CF\u957F": "z\xFA zh\u01CEng", "\u60A3\u96BE": "hu\xE0n n\xE0n", "\u62BD\u67E5": "ch\u014Du zh\u0101", "\u67DC\u5B50": "gu\xEC zi", "\u64C2\u9F13": "l\xE9i g\u01D4", "\u7729\u6655": "xu\xE0n y\xF9n", "\u8C03\u914D": "di\xE0o p\xE8i", "\u8EAF\u5E72": "q\u016B g\xE0n", "\u5DEE\u5F79": "ch\u0101i y\xEC", "\u574E\u5777": "k\u01CEn k\u011B", "\u5C11\u513F": "sh\xE0o \xE9r", "\u4E50\u56E2": "yu\xE8 tu\xE1n", "\u517B\u5206": "y\u01CEng f\xE8n", "\u9000\u8FD8": "tu\xEC hu\xE1n", "\u683C\u8C03": "g\xE9 di\xE0o", "\u8BED\u8C03": "y\u01D4 di\xE0o", "\u97F3\u8C03": "y\u012Bn di\xE0o", "\u4E50\u5E9C": "yu\xE8 f\u01D4", "\u53E4\u6734": "g\u01D4 pi\xE1o", "\u6253\u70B9": "d\u01CE dian", "\u5DEE\u4F7F": "ch\u0101i sh\u01D0", "\u78E8\u96BE": "m\xF3 n\xE0n", "\u5300\u79F0": "y\xFAn ch\xE8n", "\u7626\u524A": "sh\xF2u xu\u0113", "\u53D8\u79CD": "bi\xE0n zh\u01D2ng", "\u818F\u836F": "g\u0101o yao", "\u541E\u6CA1": "t\u016Bn m\xF2", "\u8C03\u4EFB": "di\xE0o r\xE8n", "\u6563\u5C45": "s\u01CEn j\u016B", "\u4E0A\u5934": "sh\xE0ng tou", "\u5927\u96BE": "d\xE0 n\xE0n", "\u98CE\u9761": "f\u0113ng m\u01D0", "\u653E\u5047": "f\xE0ng ji\xE0", "\u4F30\u91CF": "g\u016B liang", "\u5931\u5F53": "sh\u012B d\xE0ng", "\u4E2D\u5F39": "zh\xF2ng d\xE0n", "\u5984\u4E3A": "w\xE0ng w\xE9i", "\u957F\u8005": "zh\u01CEng zh\u011B", "\u8D77\u54C4": "q\u01D0 h\xF2ng", "\u672B\u4E86": "m\xF2 li\u01CEo", "\u76F8\u58F0": "xi\xE0ng sheng", "\u6821\u6B63": "ji\xE0o zh\xE8ng", "\u529D\u964D": "qu\xE0n xi\xE1ng", "\u77E2\u91CF": "sh\u01D0 li\xE0ng", "\u6C89\u95F7": "ch\xE9n m\xE8n", "\u7ED9\u4E0E": "j\u01D0 y\u01D4", "\u89E3\u6CD5": "xi\xE8 f\u01CE", "\u585E\u5916": "s\xE0i w\xE0i", "\u5C06\u6821": "ji\xE0ng xi\xE0o", "\u55DC\u597D": "sh\xEC h\xE0o", "\u6CA1\u843D": "m\xF2 lu\xF2", "\u6734\u5200": "p\u014D d\u0101o", "\u826F\u79CD": "li\xE1ng zh\u01D2ng", "\u7247\u5B50": "pi\u0101n zi", "\u5207\u524A": "qi\u0113 xi\u0101o", "\u5F39\u4E38": "d\xE0n w\xE1n", "\u6606\u66F2": "k\u016Bn q\u01D4", "\u96C5\u81F4": "y\u01CE zhi", "\u7A00\u8584": "x\u012B b\xF3", "\u4E8F\u5F97": "ku\u012B de", "\u6B7B\u96BE": "s\u01D0 n\xE0n", "\u95F4\u6B47": "ji\xE0n xi\u0113", "\u7FD8\u9996": "qi\xE1o sh\u01D2u", "\u540C\u79CD": "t\xF3ng zh\u01D2ng", "\u8272\u8C03": "s\xE8 di\xE0o", "\u5904\u51B3": "ch\u01D4 ju\xE9", "\u8868\u7387": "bi\u01CEo shu\xE0i", "\u5C3A\u5B50": "ch\u01D0 zi", "\u5175\u79CD": "b\u012Bng zh\u01D2ng", "\u62DB\u964D": "zh\u0101o xi\xE1ng", "\u6709\u79CD": "y\u01D2u zh\u01D2ng", "\u79F0\u804C": "ch\xE8n zh\xED", "\u6597\u7BF7": "d\u01D2u peng", "\u94FA\u5B50": "p\xF9 zi", "\u5E95\u5B50": "d\u01D0 zi", "\u8D1F\u8F7D": "f\xF9 z\xE0i", "\u5E72\u8B66": "g\xE0n j\u01D0ng", "\u5012\u6570": "d\xE0o sh\u01D4", "\u5C06\u5B98": "ji\xE0ng gu\u0101n", "\u9504\u5934": "ch\xFA tou", "\u5F52\u964D": "gu\u012B xi\xE1ng", "\u759F\u75BE": "n\xFC\xE8 ji", "\u5520\u53E8": "l\xE1o dao", "\u9650\u91CF": "xi\xE0n li\xE0ng", "\u4E00\u6253": "y\u012B d\xE1", "\u5C4F\u606F": "b\u01D0ng x\u012B", "\u91CD\u9022": "ch\xF3ng f\xE9ng", "\u5668\u4E50": "q\xEC yu\xE8", "\u6C22\u5F39": "q\u012Bng d\xE0n", "\u8116\u9888": "b\xF3 g\u011Bng", "\u5983\u5B50": "f\u0113i zi", "\u8FFD\u67E5": "zhu\u012B zh\u0101", "\u5904\u4E8B": "ch\u01D4 sh\xEC", "\u53C2\u91CF": "c\u0101n li\xE0ng", "\u8F7B\u7387": "q\u012Bng shu\xE0i", "\u7F25\u7F08": "pi\u0101o mi\u01CEo", "\u5E78\u5F97": "x\xECng de", "\u4E2D\u5956": "zh\xF2ng ji\u01CEng", "\u624D\u5E72": "c\xE1i g\xE0n", "\u65BD\u820D": "sh\u012B sh\u011B", "\u5377\u5B50": "ju\u01CEn zi", "\u6E38\u8BF4": "y\xF3u shu\xEC", "\u5DF7\u5B50": "xi\xE0ng zi", "\u81C2\u8180": "b\xEC b\u01CEng", "\u5207\u52FF": "qi\u0113 w\xF9", "\u770B\u7BA1": "k\u0101n gu\u01CEn", "\u98CE\u5934": "f\u0113ng tou", "\u7CBE\u5E72": "j\u012Bng g\xE0n", "\u9AD8\u5DEE": "g\u0101o ch\u0101", "\u6050\u5413": "k\u01D2ng h\xE8", "\u6241\u62C5": "bi\u01CEn d\xE0n", "\u7ED9\u517B": "j\u01D0 y\u01CEng", "\u683C\u5B50": "g\xE9 zi", "\u4F9B\u9700": "g\u014Dng x\u016B", "\u53CD\u5DEE": "f\u01CEn ch\u0101", "\u98DE\u5F39": "f\u0113i d\xE0n", "\u5FAE\u8584": "w\u0113i b\xF3", "\u53D1\u578B": "f\xE0 x\xEDng", "\u52D8\u67E5": "k\u0101n zh\u0101", "\u5373\u5174": "j\xED x\xECng", "\u6512\u52A8": "cu\xE1n d\xF2ng", "\u95F4\u6216": "ji\xE0n hu\xF2", "\u6D45\u8584": "qi\u01CEn b\xF3", "\u4E50\u7AE0": "yu\xE8 zh\u0101ng", "\u987A\u5DEE": "sh\xF9n ch\u0101", "\u8C03\u5B50": "di\xE0o zi", "\u76F8\u4F4D": "xi\xE0ng w\xE8i", "\u8F6C\u5B50": "zhu\xE0n z\u01D0", "\u52B2\u65C5": "j\xECng l\u01DA", "\u5494\u5693": "k\u0101 ch\u0101", "\u4E86\u4E8B": "li\u01CEo sh\xEC", "\u8F6C\u60A0": "zhu\xE0n you", "\u828D\u836F": "sh\xE1o yao", "\u5F53\u94FA": "d\xE0ng p\xF9", "\u722A\u5B50": "zhu\u01CE zi", "\u5355\u5B50": "d\u0101n zi", "\u597D\u6218": "h\xE0o zh\xE0n", "\u71D5\u9EA6": "y\u0101n m\xE0i", "\u53EA\u8BB8": "zh\u01D0 x\u01D4", "\u5E72\u7EC3": "g\xE0n li\xE0n", "\u5973\u5C06": "n\u01DA ji\xE0ng", "\u9152\u91CF": "ji\u01D4 li\xE0ng", "\u5212\u8239": "hu\xE1 chu\xE1n", "\u4F0E\u4FE9": "j\xEC li\u01CEng", "\u6311\u62E8": "ti\u01CEo b\u014D", "\u5C11\u6821": "sh\xE0o xi\xE0o", "\u7740\u843D": "zhu\xF3 lu\xF2", "\u618E\u6076": "z\u0113ng w\xF9", "\u523B\u8584": "k\xE8 b\xF3", "\u53E3\u89D2": "k\u01D2u ju\xE9", "\u9A6C\u5C3E": "m\u01CE y\u01D0", "\u8981\u631F": "y\u0101o xi\xE9", "\u5F15\u79CD": "y\u01D0n zh\u01D2ng", "\u7528\u5904": "y\xF2ng ch\u01D4", "\u8FD8\u624B": "hu\xE1n sh\u01D2u", "\u6A21\u5177": "m\xFA j\xF9", "\u6267\u8457": "zh\xED zhu\xF3", "\u559D\u4EE4": "h\xE8 l\xECng", "\u706B\u79CD": "hu\u01D2 zh\u01D2ng", "\u4E89\u5F97": "zh\u0113ng de", "\u4FDD\u957F": "b\u01CEo zh\u01CEng", "\u5438\u7740": "x\u012B zhu\xF3", "\u75C7\u7ED3": "zh\u0113ng ji\xE9", "\u516C\u8F6C": "g\u014Dng zhu\xE0n", "\u6821\u52D8": "ji\xE0o k\u0101n", "\u91CD\u63D0": "ch\xF3ng t\xED", "\u626B\u5174": "s\u01CEo x\xECng", "\u821E\u66F2": "w\u01D4 q\u01D4", "\u94FA\u76D6": "p\u016B g\xE0i", "\u957F\u53F2": "zh\u01CEng sh\u01D0", "\u5DEE\u4EF7": "ch\u0101 ji\xE0", "\u538B\u6839": "y\xE0 g\u0113n", "\u6014\u4F4F": "zh\xE8ng zh\xF9", "\u5F3A\u4EBA": "qi\u01CEng r\xE9n", "\u5E94\u5141": "y\u012Bng y\u01D4n", "\u5207\u5165": "qi\u0113 r\xF9", "\u6218\u5C06": "zh\xE0n ji\xE0ng", "\u5E74\u5C11": "ni\xE1n sh\xE0o", "\u820D\u8EAB": "sh\u011B sh\u0113n", "\u6267\u62D7": "zh\xED ni\xF9", "\u5904\u4E16": "ch\u01D4 sh\xEC", "\u4E2D\u98CE": "zh\xF2ng f\u0113ng", "\u7B49\u91CF": "d\u011Bng li\xE0ng", "\u4E0D\u83F2": "b\xF9 f\u011Bi", "\u653E\u91CF": "f\xE0ng li\xE0ng", "\u8154\u8C03": "qi\u0101ng di\xE0o", "\u8001\u5C11": "l\u01CEo sh\xE0o", "\u6CA1\u5165": "m\xF2 r\xF9", "\u74DC\u845B": "gu\u0101 g\xE9", "\u5C06\u5E05": "ji\xE0ng shu\xE0i", "\u8F66\u8F7D": "ch\u0113 z\xE0i", "\u7A9D\u56CA": "w\u014D n\u0101ng", "\u957F\u8FDB": "zh\u01CEng j\xECn", "\u53EF\u6C57": "k\xE8 h\xE1n", "\u5E76\u5DDE": "b\u012Bng zh\u014Du", "\u4F9B\u9500": "g\u014Dng xi\u0101o", "\u5207\u7247": "qi\u0113 pi\xE0n", "\u5DEE\u4E8B": "ch\u0101i sh\xEC", "\u77E5\u4F1A": "zh\u012B hui", "\u9E70\u722A": "y\u012Bng zh\u01CEo", "\u5904\u5973": "ch\u01D4 n\u01DA", "\u5207\u78CB": "qi\u0113 cu\u014D", "\u65E5\u5934": "r\xEC tou", "\u62BC\u89E3": "y\u0101 ji\xE8", "\u6ECB\u957F": "z\u012B zh\u01CEng", "\u9053\u89C2": "d\xE0o gu\xE0n", "\u811A\u8272": "ju\xE9 s\xE8", "\u5F53\u91CF": "d\u0101ng li\xE0ng", "\u5A46\u5BB6": "p\xF3 jia", "\u7F18\u5206": "yu\xE1n f\xE8n", "\u7A7A\u95F2": "k\xF2ng xi\xE1n", "\u66F2\u724C": "q\u01D4 p\xE1i", "\u597D\u8272": "h\xE0o s\xE8", "\u884C\u4F1A": "h\xE1ng hu\xEC", "\u6012\u559D": "n\xF9 h\xE8", "\u7B3C\u7EDF": "l\u01D2ng t\u01D2ng", "\u8FB9\u585E": "bi\u0101n s\xE0i", "\u4F55\u66FE": "h\xE9 z\u0113ng", "\u91CD\u5408": "ch\xF3ng h\xE9", "\u63D2\u66F2": "ch\u0101 q\u01D4", "\u96F6\u6563": "l\xEDng s\u01CEn", "\u8F70\u9686": "h\u014Dng l\u014Dng", "\u5316\u5B50": "hu\u0101 zi", "\u5185\u8499": "n\xE8i m\u011Bng", "\u6570\u843D": "sh\u01D4 luo", "\u9006\u5DEE": "n\xEC ch\u0101", "\u725F\u5229": "m\xF3u l\xEC", "\u6805\u680F": "zh\xE0 lan", "\u4E2D\u6807": "zh\xF2ng bi\u0101o", "\u8C03\u6863": "di\xE0o d\xE0ng", "\u4F5D\u507B": "g\u014Du l\xF3u", "\u573A\u5B50": "ch\u01CEng zi", "\u7532\u58F3": "ji\u01CE qi\xE0o", "\u91CD\u6E29": "ch\xF3ng w\u0113n", "\u70AE\u5236": "p\xE1o zh\xEC", "\u8FD4\u8FD8": "f\u01CEn hu\xE1n", "\u81EA\u4F20": "z\xEC zhu\xE0n", "\u9AD8\u8C03": "g\u0101o di\xE0o", "\u8BCD\u66F2": "c\xED q\u01D4", "\u53D7\u96BE": "sh\xF2u n\xE0n", "\u6BB7\u7EA2": "y\u0101n h\xF3ng", "\u8981\u7EA6": "y\u0101o yu\u0113", "\u56FA\u7740": "g\xF9 zhu\xF3", "\u5F3A\u6C42": "qi\u01CEng qi\xFA", "\u672C\u76F8": "b\u011Bn xi\xE0ng", "\u9A84\u6A2A": "ji\u0101o h\xE8ng", "\u8349\u7387": "c\u01CEo shu\xE0i", "\u6C14\u95F7": "q\xEC m\xE8n", "\u7740\u8272": "zhu\xF3 s\xE8", "\u5B81\u80AF": "n\xECng k\u011Bn", "\u5174\u5934": "x\xECng tou", "\u62D8\u6CE5": "j\u016B n\xEC", "\u5939\u89D2": "ji\u0101 ji\u01CEo", "\u53D1\u9AFB": "f\xE0 j\xEC", "\u731B\u5C06": "m\u011Bng ji\xE0ng", "\u52AB\u96BE": "ji\xE9 n\xE0n", "\u7EA6\u6478": "yu\u0113 mo", "\u62D6\u7D2F": "tu\u014D l\u011Bi", "\u5462\u7ED2": "n\xED r\xF3ng", "\u94BB\u63A2": "zu\u0101n t\xE0n", "\u5939\u5C42": "ji\u0101 c\xE9ng", "\u628A\u5B50": "b\xE0 zi", "\u843D\u9B44": "lu\xF2 tu\xF2", "\u5DF7\u9053": "h\xE0ng d\xE0o", "\u8FD0\u91CF": "y\xF9n li\xE0ng", "\u5934\u91CC": "t\xF3u li", "\u89E3\u95F7": "ji\u011B m\xE8n", "\u7A7A\u513F": "k\xF2ng \xE9r", "\u4F30\u6478": "g\u016B mo", "\u597D\u5BA2": "h\xE0o k\xE8", "\u5C0F\u66F2": "xi\u01CEo q\u01D4", "\u6298\u8877": "sh\xE9 zh\u014Dng", "\u94BB\u5B54": "zu\u0101n k\u01D2ng", "\u5E8F\u66F2": "x\xF9 q\u01D4", "\u7CCA\u5F04": "h\xF9 nong", "\u8365\u9633": "x\xEDng y\xE1ng", "\u9053\u884C": "d\xE0o h\xE9ng", "\u70E6\u95F7": "f\xE1n m\xE8n", "\u4ED3\u5352": "c\u0101ng c\xF9", "\u5206\u53C9": "f\u0113n ch\xE0", "\u66F2\u7387": "q\u01D4 l\u01DC", "\u76F8\u7247": "xi\xE0ng pi\u0101n", "\u5185\u884C": "n\xE8i h\xE1ng", "\u5DE5\u79CD": "g\u014Dng zh\u01D2ng", "\u5382\u5B50": "ch\u01CEng zi", "\u5C0F\u8C03": "xi\u01CEo di\xE0o", "\u5C11\u9633": "sh\xE0o y\xE1ng", "\u53D7\u964D": "sh\xF2u xi\xE1ng", "\u67D3\u574A": "r\u01CEn f\xE1ng", "\u80F3\u81C2": "g\u0113 bei", "\u5C06\u95E8": "ji\xE0ng m\xE9n", "\u6A21\u677F": "m\xFA b\u01CEn", "\u914D\u7ED9": "p\xE8i j\u01D0", "\u4E3A\u4F0D": "w\xE9i w\u01D4", "\u8DDF\u5934": "g\u0113n tou", "\u5212\u7B97": "hu\xE1 su\xE0n", "\u7D2F\u8D58": "l\xE9i zhui", "\u54C4\u7B11": "h\u014Dng xi\xE0o", "\u6655\u7729": "y\xF9n xu\xE0n", "\u5E72\u6389": "g\xE0n di\xE0o", "\u7F1D\u5236": "f\xE9ng zh\xEC", "\u96BE\u5904": "n\xE1n ch\u01D4", "\u7740\u610F": "zhu\xF3 y\xEC", "\u86EE\u6A2A": "m\xE1n h\xE8ng", "\u5E72\u5C06": "g\xE0n ji\xE0ng", "\u5947\u6570": "j\u012B sh\xF9", "\u77ED\u53D1": "du\u01CEn f\xE0", "\u751F\u8FD8": "sh\u0113ng hu\xE1n", "\u8FD8\u6E05": "hu\xE1n q\u012Bng", "\u770B\u62A4": "k\u0101n h\xF9", "\u76F4\u7387": "zh\xED shu\xE0i", "\u594F\u4E50": "z\xF2u yu\xE8", "\u8F7D\u5BA2": "z\xE0i k\xE8", "\u4E13\u6A2A": "zhu\u0101n h\xE8ng", "\u6E6E\u6CA1": "y\u0101n m\xF2", "\u7A7A\u683C": "k\xF2ng g\xE9", "\u94FA\u57AB": "p\u016B di\xE0n", "\u826F\u5C06": "li\xE1ng ji\xE0ng", "\u54D7\u5566": "hu\u0101 l\u0101", "\u6563\u6F2B": "s\u01CEn m\xE0n", "\u8131\u53D1": "tu\u014D f\xE0", "\u4E24\u91CD": "li\u01CEng ch\xF3ng", "\u9001\u8FD8": "s\xF2ng hu\xE1n", "\u57CB\u6CA1": "m\xE1i m\xF2", "\u7D2F\u53CA": "l\u011Bi j\xED", "\u8584\u96FE": "b\xF3 w\xF9", "\u8C03\u79BB": "di\xE0o l\xED", "\u820C\u82D4": "sh\xE9 t\u0101i", "\u673A\u957F": "j\u012B zh\u01CEng", "\u6813\u585E": "shu\u0101n s\xE8", "\u914D\u89D2": "p\xE8i ju\xE9", "\u5207\u53E3": "qi\u0113 k\u01D2u", "\u521B\u53E3": "chu\u0101ng k\u01D2u", "\u54C8\u6B20": "h\u0101 qian", "\u5B9E\u5F39": "sh\xED d\xE0n", "\u94FA\u5E73": "p\u016B p\xEDng", "\u54C8\u8FBE": "h\u01CE d\xE1", "\u61D2\u6563": "l\u01CEn s\u01CEn", "\u5B9E\u5E72": "sh\xED g\xE0n", "\u586B\u7A7A": "ti\xE1n k\xF2ng", "\u5201\u94BB": "di\u0101o zu\u0101n", "\u4E50\u5E08": "yu\xE8 sh\u012B", "\u91CF\u53D8": "li\xE0ng bi\xE0n", "\u8BF1\u964D": "y\xF2u xi\xE1ng", "\u642A\u585E": "t\xE1ng s\xE8", "\u8D2D\u5F97": "g\xF2u de", "\u5F81\u8C03": "zh\u0113ng di\xE0o", "\u5939\u9053": "ji\u0101 d\xE0o", "\u5E72\u54B3": "g\u0101n k\xE9", "\u4E50\u5DE5": "yu\xE8 g\u014Dng", "\u5546\u884C": "sh\u0101ng h\xE1ng", "\u5212\u8FC7": "hu\xE1 gu\xF2", "\u7740\u706B": "zh\xE1o hu\u01D2", "\u66F4\u6B63": "g\u0113ng zh\xE8ng", "\u7ED9\u4ED8": "j\u01D0 f\xF9", "\u7A7A\u5B50": "k\xF2ng zi", "\u54EA\u5412": "n\xE9 zh\u0101", "\u6563\u66F2": "s\u01CEn q\u01D4", "\u884C\u89C4": "h\xE1ng gu\u012B", "\u6B63\u7740": "zh\xE8ng zh\xE1o", "\u5201\u96BE": "di\u0101o n\xE0n", "\u5237\u5B50": "shu\u0101 zi", "\u4E27\u846C": "s\u0101ng z\xE0ng", "\u5939\u5E26": "ji\u0101 d\xE0i", "\u5B89\u5206": "\u0101n f\xE8n", "\u4E2D\u610F": "zh\xF2ng y\xEC", "\u957F\u5B59": "zh\u01CEng s\u016Bn", "\u6821\u8BA2": "ji\xE0o d\xECng", "\u5377\u66F2": "ju\u01CEn q\u016B", "\u8F7D\u8FD0": "z\xE0i y\xF9n", "\u6295\u5F39": "t\xF3u d\xE0n", "\u67DE\u8695": "zu\xF2 c\xE1n", "\u4EFD\u91CF": "f\xE8n li\xE0ng", "\u5916\u884C": "w\xE0i h\xE1ng", "\u8C03\u6362": "di\xE0o hu\xE0n", "\u4E86\u7136": "li\u01CEo r\xE1n", "\u54A7\u5634": "li\u011B zu\u01D0", "\u5178\u5F53": "di\u01CEn d\xE0ng", "\u5BD2\u5047": "h\xE1n ji\xE0", "\u957F\u5144": "zh\u01CEng xi\u014Dng", "\u7ED9\u6C34": "j\u01D0 shu\u01D0", "\u987B\u53D1": "x\u016B f\xE0", "\u679D\u5E72": "zh\u012B g\xE0n", "\u5C5E\u76F8": "sh\u01D4 xiang", "\u54C4\u62A2": "h\u014Dng qi\u01CEng", "\u523B\u5212": "k\xE8 hu\xE1", "\u624B\u628A": "sh\u01D2u b\xE0", "\u585E\u5B50": "s\u0101i zi", "\u5355\u5E72": "d\u0101n g\xE0n", "\u8FD8\u4E61": "hu\xE1n xi\u0101ng", "\u5146\u5934": "zh\xE0o tou", "\u5BFA\u89C2": "s\xEC gu\xE0n", "\u7763\u7387": "d\u016B shu\xE0i", "\u53D7\u7D2F": "sh\xF2u l\u011Bi", "\u5929\u53F0": "ti\u0101n t\u0101i", "\u554A\u54C8": "\u0101 h\u0101", "\u5272\u820D": "g\u0113 sh\u011B", "\u62B9\u5E03": "m\u0101 b\xF9", "\u597D\u6076": "h\xE0o w\xF9", "\u4E0B\u5904": "xi\xE0 ch\u01D4", "\u6D88\u957F": "xi\u0101o zh\u01CEng", "\u79BB\u95F4": "l\xED ji\xE0n", "\u51C6\u5934": "zh\u01D4n tou", "\u6821\u5BF9": "ji\xE0o du\xEC", "\u4EC0\u7269": "sh\xED w\xF9", "\u756A\u79BA": "p\u0101n y\xFA", "\u4F5B\u7237": "f\xF3 ye", "\u5907\u67E5": "b\xE8i zh\u0101", "\u5417\u5561": "m\u01CE f\u0113i", "\u76D0\u5206": "y\xE1n f\xE8n", "\u5F53\u6708": "d\xE0ng yu\xE8", "\u864E\u5C06": "h\u01D4 ji\xE0ng", "\u8584\u8377": "b\xF2 he", "\u72EC\u5904": "d\xFA ch\u01D4", "\u7A7A\u4F4D": "k\xF2ng w\xE8i", "\u94FA\u8DEF": "p\u016B l\xF9", "\u4E4C\u62C9": "w\xF9 la", "\u8C03\u56DE": "di\xE0o hu\xED", "\u6765\u5934": "l\xE1i tou", "\u95F2\u6563": "xi\xE1n s\u01CEn", "\u80F6\u5377": "ji\u0101o ju\u01CEn", "\u5192\u5931": "m\xE0o shi", "\u5E72\u52B2": "g\xE0n j\xECn", "\u5F26\u4E50": "xi\xE1n yu\xE8", "\u884C\u4F0D": "h\xE1ng w\u01D4", "\u76F8\u56FD": "xi\xE0ng gu\xF3", "\u67E5\u67E5": "zh\u0101 zh\u0101", "\u4E39\u53C2": "d\u0101n sh\u0113n", "\u52A9\u5174": "zh\xF9 x\xECng", "\u94FA\u5F00": "p\u016B k\u0101i", "\u6B21\u957F": "c\xEC zh\u01CEng", "\u53D1\u5361": "f\xE0 qi\u01CE", "\u62EE\u636E": "ji\xE9 j\u016B", "\u5239\u8F66": "sh\u0101 ch\u0113", "\u751F\u53D1": "sh\u0113ng f\xE0", "\u91CD\u64AD": "ch\xF3ng b\u014D", "\u7F1D\u5408": "f\xE9ng h\xE9", "\u97F3\u91CF": "y\u012Bn li\xE0ng", "\u5C11\u5C09": "sh\xE0o w\xE8i", "\u6B89\u96BE": "x\xF9n n\xE0n", "\u51B2\u538B": "ch\xF2ng y\u0101", "\u82CD\u52B2": "c\u0101ng j\xECng", "\u539A\u8584": "h\xF2u b\xF3", "\u5A01\u5413": "w\u0113i h\xE8", "\u5916\u76F8": "w\xE0i xi\xE0ng", "\u66F2\u8C31": "q\u01D4 p\u01D4", "\u547C\u53F7": "h\u016B h\xE1o", "\u7740\u8FF7": "zh\xE1o m\xED", "\u6311\u62C5": "ti\u0101o d\xE0n", "\u7EB9\u8DEF": "w\xE9n lu", "\u4E00\u6C93": "y\u012B d\xE1", "\u8FD8\u4FD7": "hu\xE1n s\xFA", "\u5F3A\u6A2A": "qi\xE1ng h\xE8ng", "\u56DB\u884C": "s\xEC h\xE1ng", "\u7740\u6570": "zh\u0101o sh\xF9", "\u56FD\u96BE": "gu\xF3 n\xE0n", "\u964D\u987A": "xi\xE1ng sh\xF9n", "\u6311\u660E": "ti\u01CEo m\xEDng", "\u772F\u7F1D": "m\u012B feng", "\u5206\u5185": "f\xE8n n\xE8i", "\u66F4\u8863": "g\u0113ng y\u012B", "\u8F6F\u548C": "ru\u01CEn huo", "\u5C3D\u5174": "j\xECn x\xECng", "\u53F7\u5B50": "h\xE0o zi", "\u722A\u7259": "zh\u01CEo y\xE1", "\u8D25\u5C06": "b\xE0i ji\xE0ng", "\u731C\u4E2D": "c\u0101i zh\xF2ng", "\u7ED3\u624E": "ji\xE9 z\u0101", "\u6CA1\u7A7A": "m\xE9i k\xF2ng", "\u5939\u7F1D": "ji\u0101 f\xE8ng", "\u62FE\u6387": "sh\xED duo", "\u63BA\u548C": "ch\u0101n huo", "\u7C38\u7B95": "b\xF2 ji", "\u7535\u91CF": "di\xE0n li\xE0ng", "\u8377\u8F7D": "h\xE8 z\u01CEi", "\u6F2F\u6CB3": "lu\xF2 t\xE0 h\xE9", "\u8C03\u5F0F": "di\xE0o sh\xEC", "\u5904\u8EAB": "ch\u01D4 sh\u0113n", "\u6253\u624B": "d\u01CE shou", "\u5F39\u5F13": "d\xE0n g\u014Dng", "\u6A2A\u86EE": "h\xE8ng m\xE1n", "\u80FD\u5E72": "n\xE9ng g\xE0n", "\u6821\u70B9": "ji\xE0o di\u01CEn", "\u52A0\u8F7D": "ji\u0101 z\xE0i", "\u5E72\u6821": "g\xE0n xi\xE0o", "\u54C4\u4F20": "h\u014Dng chu\xE1n", "\u6821\u6CE8": "ji\xE0o zh\xF9", "\u6DE4\u585E": "y\u016B s\xE8", "\u9A6C\u624E": "m\u01CE zh\xE1", "\u6708\u6C0F": "yu\xE8 zh\u012B", "\u9AD8\u5E72": "g\u0101o g\xE0n", "\u7ECF\u4F20": "j\u012Bng zhu\xE0n", "\u66FE\u5B59": "z\u0113ng s\u016Bn", "\u597D\u6597": "h\xE0o d\xF2u", "\u5173\u5361": "gu\u0101n qi\u01CE", "\u9003\u5954": "t\xE1o b\xE8n", "\u78E8\u8E6D": "m\xF3 ceng", "\u725F\u53D6": "m\xF3u q\u01D4", "\u98A4\u6817": "zh\xE0n l\xEC", "\u8682\u86B1": "m\xE0 zha", "\u64AE\u5408": "cu\u014D he", "\u8D94\u8D84": "li\xE8 qie", "\u6454\u6253": "shu\u0101i d\xE1", "\u53F0\u5B50": "t\xE1i zi", "\u5206\u5F97": "f\u0113n de", "\u7C98\u7740": "ni\xE1n zhu\xF3", "\u91C7\u9091": "c\xE0i y\xEC", "\u6563\u88C5": "s\u01CEn zhu\u0101ng", "\u5A40\u5A1C": "\u0113 nu\xF3", "\u5174\u5473": "x\xECng w\xE8i", "\u884C\u5934": "x\xEDng tou", "\u6C14\u91CF": "q\xEC li\xE0ng", "\u8C03\u8FD0": "di\xE0o y\xF9n", "\u5904\u6CBB": "ch\u01D4 zh\xEC", "\u4E50\u97F3": "yu\xE8 y\u012Bn", "\u7EC4\u66F2": "z\u01D4 q\u01D4", "\u5145\u585E": "ch\u014Dng s\xE8", "\u606B\u5413": "d\xF2ng h\xE8", "\u8BBA\u8C03": "l\xF9n di\xE0o", "\u76F8\u4E2D": "xi\u0101ng zh\xF2ng", "\u6C11\u4E50": "m\xEDn yu\xE8", "\u70AE\u4ED7": "p\xE0o zhang", "\u4E27\u670D": "s\u0101ng f\xFA", "\u9A81\u5C06": "xi\u0101o ji\xE0ng", "\u91CF\u5211": "li\xE0ng x\xEDng", "\u7F1D\u8865": "f\xE9ng b\u01D4", "\u8D22\u4F1A": "c\xE1i ku\xE0i", "\u5927\u5E72": "d\xE0 g\xE0n", "\u5471\u5471": "g\u016B g\u016B", "\u5386\u6570": "l\xEC sh\u01D4", "\u6821\u573A": "ji\xE0o ch\u01CEng", "\u585E\u5317": "s\xE0i b\u011Bi", "\u8BC6\u76F8": "sh\xED xi\xE0ng", "\u8FB1\u6CA1": "r\u01D4 m\xF2", "\u9C9C\u4EAE": "xi\u0101n liang", "\u8BED\u585E": "y\u01D4 s\xE8", "\u9732\u8138": "l\xF2u li\u01CEn", "\u51C9\u5FEB": "li\xE1ng kuai", "\u8170\u6746": "y\u0101o g\u01CEn", "\u6E9C\u8FBE": "li\u016B da", "\u560E\u560E": "g\u0101 g\u0101", "\u516C\u5E72": "g\u014Dng g\xE0n", "\u6854\u6897": "ji\xE9 g\u011Bng", "\u6311\u9017": "ti\u01CEo d\xF2u", "\u770B\u95E8": "k\u0101n m\xE9n", "\u6D77\u96BE": "h\u01CEi n\xE0n", "\u4E50\u6B4C": "yu\xE8 g\u0113", "\u62D3\u7247": "t\xE0 pi\xE0n", "\u6311\u52A8": "ti\u01CEo d\xF2ng", "\u51C6\u5C06": "zh\u01D4n ji\xE0ng", "\u843D\u96BE": "lu\xF2 n\xE0n", "\u9052\u52B2": "qi\xFA j\xECng", "\u78E8\u574A": "m\xF2 f\xE1ng", "\u9036\u8FE4": "w\u0113i y\xED", "\u6405\u548C": "ji\u01CEo huo", "\u6469\u6332": "m\u0101 s\u0101", "\u4F5C\u5F04": "zu\u014D n\xF2ng", "\u82D7\u5934": "mi\xE1o tou", "\u6253\u98A4": "d\u01CE zh\xE0n", "\u5927\u85CF": "d\xE0 z\xE0ng", "\u755C\u7272": "ch\xF9 sheng", "\u52FE\u642D": "g\u014Du da", "\u6811\u836B": "sh\xF9 y\u012Bn", "\u6811\u6748": "sh\xF9 ch\xE0", "\u94C1\u6746": "ti\u011B g\u01CEn", "\u5C06\u76F8": "ji\xE0ng xi\xE0ng", "\u4EFD\u5B50": "f\xE8n zi", "\u89C6\u5DEE": "sh\xEC ch\u0101", "\u7EFF\u836B": "l\u01DC y\u012Bn", "\u67AA\u6746": "qi\u0101ng g\u01CEn", "\u7F1D\u7EAB": "f\xE9ng r\xE8n", "\u6101\u95F7": "ch\xF3u m\xE8n", "\u70B9\u5C06": "di\u01CEn ji\xE0ng", "\u534E\u4F57": "hu\xE0 tu\xF3", "\u52B2\u5C04": "j\xECng sh\xE8", "\u7BB1\u7B3C": "xi\u0101ng l\u01D2ng", "\u7EC8\u4E86": "zh\u014Dng li\u01CEo", "\u9B13\u53D1": "b\xECn f\xE0", "\u7ED3\u5DF4": "ji\u0113 ba", "\u82E6\u5E72": "k\u01D4 g\xE0n", "\u770B\u5BB6": "k\u0101n ji\u0101", "\u6B63\u65E6": "zh\u0113ng d\xE0n", "\u4E2D\u80AF": "zh\xF2ng k\u011Bn", "\u6587\u79CD": "w\xE9n zh\u01D2ng", "\u98DF\u91CF": "sh\xED li\xE0ng", "\u5BAB\u8C03": "g\u014Dng di\xE0o", "\u95F4\u4F5C": "ji\xE0n zu\xF2", "\u5F39\u7247": "d\xE0n pi\xE0n", "\u5DEE\u6C60": "ch\u0101 ch\xED", "\u6F02\u767D": "pi\u01CEo b\xE1i", "\u6760\u5B50": "g\xE0ng zi", "\u8C03\u5904": "ti\xE1o ch\u01D4", "\u597D\u52A8": "h\xE0o d\xF2ng", "\u8F6C\u7089": "zhu\xE0n l\xFA", "\u5C4F\u6C14": "b\u01D0ng q\xEC", "\u5939\u677F": "ji\u0101 b\u01CEn", "\u54C0\u4E50": "\u0101i yu\xE8", "\u5E72\u9053": "g\xE0n d\xE0o", "\u82E6\u5904": "k\u01D4 ch\u01D4", "\u5288\u67F4": "p\u01D0 ch\xE1i", "\u957F\u52BF": "zh\u01CEng sh\xEC", "\u5929\u534E": "ti\u0101n hu\u0101", "\u5171\u5904": "g\xF2ng ch\u01D4", "\u4E25\u67E5": "y\xE1n zh\u0101", "\u6821\u9A8C": "ji\xE0o y\xE0n", "\u51FA\u585E": "ch\u016B s\xE0i", "\u5F39\u5B50": "d\xE0n z\u01D0", "\u78E8\u76D8": "m\xF2 p\xE1n", "\u840E\u9761": "w\u011Bi m\u01D0", "\u5954\u4E27": "b\u0113n s\u0101ng", "\u5531\u548C": "ch\xE0ng h\xE8", "\u5927\u8C03": "d\xE0 di\xE0o", "\u975E\u5206": "f\u0113i f\xE8n", "\u94BB\u8425": "zu\u0101n y\xEDng", "\u5939\u5B50": "ji\u0101 zi", "\u8D85\u8F7D": "ch\u0101o z\xE0i", "\u66F4\u59CB": "g\u0113ng sh\u01D0", "\u94C3\u94DB": "l\xEDng dang", "\u62AB\u6563": "p\u012B s\u01CEn", "\u906D\u96BE": "z\u0101o n\xE0n", "\u53D1\u8FD8": "f\u0101 hu\xE1n", "\u8F6C\u8F6E": "zhu\xE0n l\xFAn", "\u6A2A\u8D22": "h\xE8ng c\xE1i", "\u6CE1\u6850": "p\u0101o t\xF3ng", "\u629B\u6492": "p\u0101o s\u01CE", "\u5929\u5440": "ti\u0101n y\u0101", "\u7CCA\u7CCA": "h\u016B h\u016B", "\u8EAF\u58F3": "q\u016B qi\xE0o", "\u901A\u91CF": "t\u014Dng li\xE0ng", "\u5949\u8FD8": "f\xE8ng hu\xE1n", "\u5348\u89C9": "w\u01D4 ji\xE0o", "\u95F7\u68CD": "m\xE8n g\xF9n", "\u6D6A\u5934": "l\xE0ng tou", "\u781A\u53F0": "y\xE0n t\u0101i", "\u6CB9\u574A": "y\xF3u f\xE1ng", "\u5B66\u957F": "xu\xE9 zh\u01CEng", "\u8FC7\u8F7D": "gu\xF2 z\xE0i", "\u7B14\u8C03": "b\u01D0 di\xE0o", "\u8863\u88AB": "y\xEC b\xE8i", "\u755C\u4EA7": "x\xF9 ch\u01CEn", "\u6253\u66F4": "d\u01CE g\u0113ng", "\u8C03\u9605": "di\xE0o yu\xE8", "\u86EE\u5E72": "m\xE1n g\xE0n", "\u66FE\u7956": "z\u0113ng z\u01D4", "\u672C\u884C": "b\u011Bn h\xE1ng", "\u63D0\u5E72": "t\xED g\xE0n", "\u53D8\u8C03": "bi\xE0n di\xE0o", "\u8986\u6CA1": "f\xF9 m\xF2", "\u6A21\u5B50": "m\xFA zi", "\u4E50\u5F8B": "yu\xE8 l\u01DC", "\u79F0\u5FC3": "ch\xE8n x\u012Bn", "\u6728\u6746": "m\xF9 g\u01CEn", "\u5957\u66F2": "t\xE0o q\u01D4", "\u91CD\u5370": "ch\xF3ng y\xECn", "\u81EA\u7701": "z\xEC x\u01D0ng", "\u63D0\u8C03": "t\xED di\xE0o", "\u770B\u76F8": "k\xE0n xi\xE0ng", "\u828B\u5934": "y\xF9 tou", "\u4E0B\u5207": "xi\xE0 qi\u0113", "\u585E\u4E0A": "s\xE0i sh\xE0ng", "\u94FA\u5F20": "p\u016B zh\u0101ng", "\u85E4\u8513": "t\xE9ng w\xE0n", "\u8584\u5E78": "b\xF3 x\xECng", "\u975E\u96BE": "f\u0113i n\xE0n", "\u89E3\u6570": "xi\xE8 sh\xF9", "\u52A3\u79CD": "li\xE8 zh\u01D2ng", "\u892A\u53BB": "t\xF9n q\xF9", "\u9730\u5F39": "xi\xE0n d\xE0n", "\u67DA\u6728": "y\xF3u m\xF9", "\u91CD\u8F7D": "zh\xF2ng z\xE0i", "\u4E8C\u91CD": "\xE8r ch\xF3ng", "\u75D5\u91CF": "h\xE9n li\xE0ng", "\u96C5\u4E50": "y\u01CE yu\xE8", "\u53F7\u54ED": "h\xE1o k\u016B", "\u8BC8\u964D": "zh\xE0 xi\xE1ng", "\u732A\u5708": "zh\u016B ju\xE0n", "\u548B\u820C": "z\xE9 sh\xE9", "\u94E3\u5E8A": "x\u01D0 chu\xE1ng", "\u9632\u5F39": "f\xE1ng d\xE0n", "\u5065\u5C06": "ji\xE0n ji\xE0ng", "\u4E3D\u6C34": "l\xED shu\u01D0", "\u524A\u53D1": "xu\u0113 f\xE0", "\u7A7A\u5F53": "k\xF2ng d\u0101ng", "\u591A\u76F8": "du\u014D xi\xE0ng", "\u9C9C\u89C1": "xi\u01CEn ji\xE0n", "\u5212\u6868": "hu\xE1 ji\u01CEng", "\u8F7D\u6CE2": "z\xE0i b\u014D", "\u8DF3\u86A4": "ti\xE0o zao", "\u4FCF\u76AE": "qi\xE0o pi", "\u5427\u55D2": "b\u0101 d\u0101", "\u7ED3\u53D1": "ji\xE9 f\xE0", "\u4E86\u65AD": "li\u01CEo du\xE0n", "\u540C\u8C03": "t\xF3ng di\xE0o", "\u77F3\u78E8": "sh\xED m\xF2", "\u65F6\u5DEE": "sh\xED ch\u0101", "\u9F3B\u585E": "b\xED s\xE8", "\u6311\u5B50": "ti\u0101o zi", "\u63A8\u78E8": "tu\u012B m\xF2", "\u6B66\u4FAF": "w\u01D4 h\xF2u", "\u62B9\u715E": "m\u01D2 sh\u0101", "\u8C03\u8F6C": "di\xE0o zhu\u01CEn", "\u7C4D\u6CA1": "j\xED m\xF2", "\u6D4B\u5EA6": "c\xE8 du\xF3", "\u8FD8\u503A": "hu\xE1n zh\xE0i", "\u8C03\u6F14": "di\xE0o y\u01CEn", "\u5206\u5212": "f\u0113n hu\xE1", "\u5947\u5076": "j\u012B \u01D2u", "\u65AD\u559D": "du\xE0n h\xE8", "\u95F7\u96F7": "m\xE8n l\xE9i", "\u72FC\u85C9": "l\xE1ng j\xED", "\u996D\u91CF": "f\xE0n li\xE0ng", "\u8FD8\u793C": "hu\xE1n l\u01D0", "\u8F6C\u8C03": "zhu\u01CEn di\xE0o", "\u661F\u76F8": "x\u012Bng xi\xE0ng", "\u624B\u76F8": "sh\u01D2u xi\xE0ng", "\u914D\u4E50": "p\xE8i yu\xE8", "\u76D6\u5934": "g\xE0i tou", "\u8FDE\u6746": "li\xE1n g\u01CEn", "\u7C3F\u8BB0": "b\xF9 j\xEC", "\u5200\u628A": "d\u0101o b\xE0", "\u91CF\u8BCD": "li\xE0ng c\xED", "\u540D\u89D2": "m\xEDng ju\xE9", "\u6B65\u8C03": "b\xF9 di\xE0o", "\u6821\u672C": "ji\xE0o b\u011Bn", "\u66F2\u6C5F": "q\u01D4 ji\u0101ng", "\u8D26\u7C3F": "zh\xE0ng b\xF9", "\u96BD\u6C38": "ju\xE0n y\u01D2ng", "\u54C8\u7F57": "h\u0101 luo", "\u7A0D\u4E3A": "sh\u0101o w\xE9i", "\u6613\u4F20": "y\xEC zhu\xE0n", "\u4E50\u8C31": "yu\xE8 p\u01D4", "\u7275\u7D2F": "qi\u0101n l\u011Bi", "\u7B54\u7406": "d\u0101 li", "\u559D\u65A5": "h\xE8 ch\xEC", "\u541F\u54E6": "y\xEDn \xE9", "\u5E72\u6E20": "g\xE0n q\xFA", "\u6D77\u91CF": "h\u01CEi li\xE0ng", "\u7CBE\u5F53": "j\u012Bng d\xE0ng", "\u7740\u5E8A": "zhu\xF3 chu\xE1ng", "\u6708\u76F8": "yu\xE8 xi\xE0ng", "\u5EB6\u51E0": "sh\xF9 j\u012B", "\u5BAB\u89C2": "g\u014Dng gu\xE0n", "\u8BBA\u5904": "l\xF9n ch\u01D4", "\u5F81\u8F9F": "zh\u0113ng b\xEC", "\u539A\u6734": "h\xF2u p\xF2", "\u4ECB\u58F3": "ji\xE8 qi\xE0o", "\u542D\u54E7": "k\u0113ng chi", "\u54AF\u8840": "k\u01CE xi\u011B", "\u94FA\u9648": "p\u016B ch\xE9n", "\u91CD\u751F": "ch\xF3ng sh\u0113ng", "\u4E50\u7406": "yu\xE8 l\u01D0", "\u54C0\u53F7": "\u0101i h\xE1o", "\u85CF\u5386": "z\xE0ng l\xEC", "\u7434\u66F2": "q\xEDn q\u01D4", "\u795E\u66F2": "sh\xE9n q\u01D4", "\u521A\u52B2": "g\u0101ng j\xECng", "\u524A\u5E73": "xu\u0113 p\xEDng", "\u6D53\u836B": "n\xF3ng y\u012Bn", "\u57CE\u579B": "ch\xE9ng du\u01D2", "\u94A2\u79CD": "g\u0101ng zh\u01D2ng", "\u8BC6\u8BB0": "zh\xEC j\xEC", "\u5F53\u5DEE": "d\u0101ng ch\u0101i", "\u6B63\u4F20": "zh\xE8ng zhu\xE0n", "\u5E76\u5904": "b\xECng ch\u01D4", "\u7A7A\u96BE": "k\u014Dng n\xE0n", "\u521B\u9762": "chu\u0101ng mi\xE0n", "\u65E6\u89D2": "d\xE0n ju\xE9", "\u8584\u793C": "b\xF3 l\u01D0", "\u6643\u8361": "hu\xE0ng dang", "\u81CA\u5B50": "s\xE0o zi", "\u5BB6\u4EC0": "ji\u0101 sh\xED", "\u95F7\u5934": "m\xE8n t\xF3u", "\u7F8E\u53D1": "m\u011Bi f\xE0", "\u5EA6\u6570": "d\xF9 shu", "\u7740\u51C9": "zh\xE1o li\xE1ng", "\u95EF\u5C06": "chu\u01CEng ji\xE0ng", "\u51E0\u6848": "j\u012B \xE0n", "\u59D8\u5934": "p\u012Bn tou", "\u6025\u96BE": "j\xED n\xE0n", "\u5DEE\u6570": "ch\u0101 sh\xF9", "\u6563\u788E": "s\u01CEn su\xEC", "\u58C5\u585E": "y\u014Dng s\xE8", "\u5BD2\u98A4": "h\xE1n zh\xE0n", "\u7275\u5F3A": "qi\u0101n qi\u01CEng", "\u65E0\u95F4": "w\xFA ji\xE0n", "\u8F6E\u8F6C": "l\xFAn zhu\xE0n", "\u53F7\u53EB": "h\xE1o ji\xE0o", "\u94FA\u6392": "p\u016B p\xE1i", "\u964D\u4F0F": "xi\xE1ng f\xFA", "\u8F67\u94A2": "zh\xE1 g\u0101ng", "\u4E1C\u963F": "d\u014Dng \u0113", "\u75C5\u5047": "b\xECng ji\xE0", "\u7D2F\u52A0": "l\u011Bi ji\u0101", "\u6897\u585E": "g\u011Bng s\xE8", "\u5F39\u5939": "d\xE0n ji\u0101", "\u94BB\u5FC3": "zu\u0101n x\u012Bn", "\u6643\u773C": "hu\u01CEng y\u01CEn", "\u9B54\u722A": "m\xF3 zh\u01CEo", "\u6807\u91CF": "bi\u0101o li\xE0ng", "\u618B\u95F7": "bi\u0113 m\xE8n", "\u731C\u5EA6": "c\u0101i du\xF3", "\u5904\u58EB": "ch\u01D4 sh\xEC", "\u5B98\u5DEE": "gu\u0101n ch\u0101i", "\u8BA8\u8FD8": "t\u01CEo hu\xE1n", "\u957F\u95E8": "zh\u01CEng m\xE9n", "\u998F\u5206": "li\xFA f\xE8n", "\u91CC\u5F04": "l\u01D0 l\xF2ng", "\u8272\u76F8": "s\xE8 xi\xE0ng", "\u96C5\u5174": "y\u01CE x\xECng", "\u89D2\u529B": "ju\xE9 l\xEC", "\u5F39\u5751": "d\xE0n k\u0113ng", "\u679D\u6748": "zh\u012B ch\xE0", "\u5939\u5177": "ji\u0101 j\xF9", "\u5904\u5211": "ch\u01D4 x\xEDng", "\u608D\u5C06": "h\xE0n ji\xE0ng", "\u597D\u5B66": "h\xE0o xu\xE9", "\u94F6\u53D1": "y\xEDn f\xE0", "\u626B\u628A": "s\xE0o b\u01CE", "\u6CD5\u76F8": "f\u01CE xi\xE0ng", "\u8D35\u5E72": "gu\xEC g\xE0n", "\u4F9B\u6C14": "g\u014Dng q\xEC", "\u7A7A\u4F59": "k\xF2ng y\xFA", "\u6346\u624E": "k\u01D4n z\u0101", "\u7620\u8584": "j\xED b\xF3", "\u6D46\u7CCA": "ji\xE0ng hu", "\u560E\u5431": "g\u0101 zh\u012B", "\u4E0D\u9042": "b\xF9 su\xED", "\u8C03\u4EE4": "di\xE0o l\xECng", "\u6CD5\u5E16": "f\u01CE ti\xE8", "\u6DCB\u75C5": "l\xECn b\xECng", "\u8C03\u6D3E": "di\xE0o p\xE0i", "\u8F6C\u76D8": "zhu\xE0n p\xE1n", "\u4F9B\u7A3F": "g\u014Dng g\u01CEo", "\u5DEE\u5B98": "ch\u0101i gu\u0101n", "\u5FE7\u95F7": "y\u014Du m\xE8n", "\u91CD\u72AF": "ch\xF3ng f\xE0n", "\u6559\u957F": "ji\xE0o zh\u01CEng", "\u91CD\u5531": "ch\xF3ng ch\xE0ng", "\u7A0E\u79CD": "shu\xEC zh\u01D2ng", "\u7EDD\u79CD": "ju\xE9 zh\u01D2ng", "\u9152\u5174": "ji\u01D4 x\xECng", "\u4E50\u575B": "yu\xE8 t\xE1n", "\u82B1\u5462": "hu\u0101 n\xED", "\u53F1\u559D": "ch\xEC h\xE8", "\u8180\u81C2": "b\u01CEng b\xEC", "\u91CD\u5934": "ch\xF3ng t\xF3u", "\u5F97\u7A7A": "d\xE9 k\xF2ng", "\u8F6C\u5708": "zhu\xE0n qu\u0101n", "\u6A2A\u66B4": "h\xE8ng b\xE0o", "\u54C4\u62AC": "h\u014Dng t\xE1i", "\u5F15\u542D": "y\u01D0n h\xE1ng", "\u8F7D\u8D27": "z\xE0i hu\xF2", "\u4E2D\u8BA1": "zh\xF2ng j\xEC", "\u5B98\u957F": "gu\u0101n zh\u01CEng", "\u76F8\u9762": "xi\xE0ng mi\xE0n", "\u770B\u5934": "k\xE0n tou", "\u76FC\u5934": "p\xE0n tou", "\u610F\u5174": "y\xEC x\xECng", "\u519B\u4E50": "j\u016Bn yu\xE8", "\u7D2F\u6B21": "l\u011Bi c\xEC", "\u9AA8\u561F": "g\u016B d\u016B", "\u71D5\u8D75": "y\u0101n zh\xE0o", "\u62A5\u4E27": "b\xE0o s\u0101ng", "\u5F25\u6492": "m\xED sa", "\u6328\u6597": "\xE1i d\xF2u", "\u6241\u821F": "pi\u0101n zh\u014Du", "\u4E11\u89D2": "ch\u01D2u ju\xE9", "\u540A\u4E27": "di\xE0o s\u0101ng", "\u5F3A\u5C06": "qi\xE1ng ji\xE0ng", "\u884C\u53F7": "h\xE1ng h\xE1o", "\u91CD\u594F": "ch\xF3ng z\xF2u", "\u53D1\u8FAB": "f\xE0 bi\xE0n", "\u7740\u9B54": "zh\xE1o m\xF3", "\u7740\u6CD5": "zh\u0101o f\u01CE", "\u76DB\u653E": "ch\xE9ng f\xE0ng", "\u586B\u585E": "ti\xE1n s\xE8", "\u51F6\u6A2A": "xi\u014Dng h\xE8ng", "\u7A3D\u9996": "q\u01D0 sh\u01D2u", "\u7891\u5E16": "b\u0113i ti\xE8", "\u51B2\u91CF": "ch\u014Dng li\xE0ng", "\u53D1\u83DC": "f\xE0 c\xE0i", "\u5047\u53D1": "ji\u01CE f\xE0", "\u7FFB\u5377": "f\u0101n ju\u01CEn", "\u5C0F\u91CF": "xi\u01CEo li\xE0ng", "\u80F6\u7740": "ji\u0101o zhu\xF3", "\u91CC\u5B50": "l\u01D0 zi", "\u8C03\u8C03": "di\xE0o diao", "\u6563\u5175": "s\u01CEn b\u012Bng", "\u9AD8\u6311": "g\u0101o ti\u01CEo", "\u64AD\u6492": "b\u014D s\u01CE", "\u5939\u5FC3": "ji\u0101 x\u012Bn", "\u6247\u52A8": "sh\u0101n d\xF2ng", "\u53E8\u6270": "t\u0101o r\u01CEo", "\u9713\u88F3": "n\xED ch\xE1ng", "\u637B\u5B50": "ni\u01CEn zi", "\u5F25\u7F1D": "m\xED f\xE9ng", "\u6492\u5E03": "s\u01CE b\xF9", "\u5143\u66F2": "yu\xE1n q\u01D4", "\u573A\u9662": "ch\xE1ng yu\xE0n", "\u7EAF\u79CD": "ch\xFAn zh\u01D2ng", "\u7701\u4EB2": "x\u01D0ng q\u012Bn", "\u63D0\u62C9": "d\u012B le", "\u60EF\u91CF": "gu\xE0n li\xE0ng", "\u5F3A\u903C": "qi\u01CEng b\u012B", "\u5F3A\u5F81": "qi\u01CEng zh\u0113ng", "\u6655\u8F66": "y\xF9n ch\u0113", "\u6570\u9053": "sh\u01D4 d\xE0o", "\u5E26\u7D2F": "d\xE0i l\u011Bi", "\u62D3\u672C": "t\xE0 b\u011Bn", "\u5ACC\u6076": "xi\xE1n w\xF9", "\u5BBF\u5C06": "s\xF9 ji\xE0ng", "\u9F9F\u88C2": "j\u016Bn li\xE8", "\u7F20\u5939": "ch\xE1n ji\u0101", "\u53D1\u5F0F": "f\xE0 sh\xEC", "\u9694\u6247": "g\xE9 sh\u0101n", "\u884C\u8D27": "h\xE1ng hu\xF2", "\u5929\u5206": "ti\u0101n f\xE8n", "\u7656\u597D": "p\u01D0 h\xE0o", "\u56DB\u901A": "s\xEC t\xF2ng", "\u767D\u672F": "b\xE1i zh\xFA", "\u5212\u4F24": "hu\xE1 sh\u0101ng", "\u89D2\u6597": "ju\xE9 d\xF2u", "\u542C\u5DEE": "t\u012Bng ch\u0101i", "\u5C81\u5DEE": "su\xEC ch\u0101", "\u4E27\u793C": "s\u0101ng l\u01D0", "\u8109\u8109": "m\xF2 m\xF2", "\u524A\u7626": "xu\u0113 sh\xF2u", "\u6492\u64AD": "s\u01CE b\u014D", "\u838E\u8349": "su\u014D c\u01CEo", "\u728D\u4E3A": "qi\xE1n w\xE9i", "\u8C03\u5934": "di\xE0o t\xF3u", "\u9F99\u5377": "l\xF3ng ju\u01CEn", "\u5916\u8C03": "w\xE0i di\xE0o", "\u5B57\u5E16": "z\xEC ti\xE8", "\u5377\u53D1": "ju\u01CEn f\xE0", "\u5B6C\u79CD": "n\u0101o zh\u01D2ng", "\u4E5D\u79CD": "ji\u01D4 zh\u01D2ng", "\u63E3\u5EA6": "chu\u01CEi du\xF3", "\u6D0B\u76F8": "y\xE1ng xi\xE0ng", "\u6563\u5149": "s\u01CEn gu\u0101ng", "\u9AA8\u788C": "g\u016B lu", "\u8584\u547D": "b\xF3 m\xECng", "\u7B3C\u5934": "l\xF3ng tou", "\u54BD\u708E": "y\u0101n y\xE1n", "\u788C\u78A1": "li\xF9 zhou", "\u7247\u513F": "pi\u0101n er", "\u7EA4\u624B": "qi\xE0n sh\u01D2u", "\u6563\u4F53": "s\u01CEn t\u01D0", "\u5185\u7701": "n\xE8i x\u01D0ng", "\u5F3A\u7559": "qi\u01CEng li\xFA", "\u89E3\u9001": "ji\xE8 s\xF2ng", "\u53CD\u95F4": "f\u01CEn ji\xE0n", "\u5C11\u58EE": "sh\xE0o zhu\xE0ng", "\u4E00\u670D": "y\u012B f\xF9", "\u7559\u7A7A": "li\xFA k\xF2ng", "\u544A\u5047": "g\xE0o ji\xE0", "\u54B3\u8840": "k\xE9 xi\u011B", "\u8584\u66AE": "b\xF3 m\xF9", "\u94FA\u8F68": "p\u016B gu\u01D0", "\u78E8\u524A": "m\xF3 xu\u0113", "\u6CBB\u4E27": "zh\xEC s\u0101ng", "\u53C9\u5B50": "ch\u0101 zi", "\u54C4\u52A8": "h\u014Dng d\xF2ng", "\u86FE\u5B50": "\xE9 zi", "\u7CDC\u5B50": "m\xE9i zi", "\u51FA\u843D": "ch\u016B l\xE0", "\u80A1\u957F": "g\u01D4 zh\u01CEng", "\u8D35\u5904": "gu\xEC ch\u01D4", "\u8FD8\u9B42": "hu\xE1n h\xFAn", "\u4F8B\u5047": "l\xEC ji\xE0", "\u66F2\u6C60": "q\u01D4 ch\xED", "\u5239\u4F4F": "sh\u0101 zh\xF9", "\u8EAB\u91CF": "sh\u0113n li\xE0ng", "\u61C2\u884C": "d\u01D2ng h\xE1ng", "\u540C\u597D": "t\xF3ng h\xE0o", "\u5B7D\u79CD": "ni\xE8 zh\u01D2ng", "\u9009\u79CD": "xu\u01CEn zh\u01D2ng", "\u5C0F\u79CD": "xi\u01CEo zh\u01D2ng", "\u6A21\u91CF": "m\xF3 li\xE0ng", "\u66F4\u751F": "g\u0113ng sh\u0113ng", "\u670D\u4E27": "f\xFA s\u0101ng", "\u7387\u76F4": "shu\xE0i zh\xED", "\u5B57\u6A21": "z\xEC m\xFA", "\u6563\u67B6": "s\u01CEn ji\xE0", "\u7B54\u8154": "d\u0101 qi\u0101ng", "\u4EA4\u6076": "ji\u0101o w\xF9", "\u8584\u60C5": "b\xF3 q\xEDng", "\u773C\u6CE1": "y\u01CEn p\u0101o", "\u8885\u5A1C": "ni\u01CEo nu\xF3", "\u8349\u579B": "c\u01CEo du\u01D2", "\u51B2\u52B2": "ch\xF2ng j\xECn", "\u5462\u5583": "n\xED n\xE1n", "\u5207\u4E2D": "qi\xE8 zh\xF2ng", "\u6311\u706F": "ti\u01CEo d\u0113ng", "\u8FD8\u613F": "hu\xE1n yu\xE0n", "\u6FC0\u5C06": "j\u012B ji\xE0ng", "\u66F4\u9F13": "g\u0113ng g\u01D4", "\u6CA1\u836F": "m\xF2 y\xE0o", "\u96BE\u53CB": "n\xE0n y\u01D2u", "\u8D25\u5174": "b\xE0i x\xECng", "\u5207\u9762": "qi\u0113 mi\xE0n", "\u6563\u6237": "s\u01CEn h\xF9", "\u7D2F\u8FDB": "l\u011Bi j\xECn", "\u80CC\u5E26": "b\u0113i d\xE0i", "\u79E4\u6746": "ch\xE8ng g\u01CEn", "\u78BE\u574A": "ni\u01CEn f\xE1ng", "\u7C3F\u5B50": "b\xF9 zi", "\u6273\u624B": "b\u0101n shou", "\u94C5\u5C71": "y\xE1n sh\u0101n", "\u5112\u5C06": "r\xFA ji\xE0ng", "\u91CD\u5149": "ch\xF3ng gu\u0101ng", "\u526A\u53D1": "ji\u01CEn f\xE0", "\u884C\u8BDD": "h\xE1ng hu\xE0", "\u957F\u4E0A": "zh\u01CEng sh\xE0ng", "\u914D\u79CD": "p\xE8i zh\u01D2ng", "\u5C0F\u4F20": "xi\u01CEo zhu\xE0n", "\u538B\u8F74": "y\u0101 zh\xF2u", "\u8C31\u66F2": "p\u01D4 q\u01D4", "\u5F31\u51A0": "ru\xF2 gu\xE0n", "\u82B1\u5377": "hu\u0101 ju\u01CEn", "\u6A2A\u7978": "h\xE8ng hu\xF2", "\u5939\u514B": "ji\u0101 k\xE8", "\u5149\u6655": "gu\u0101ng y\xF9n", "\u62AB\u9761": "p\u012B m\u01D0", "\u5BF9\u8C03": "du\xEC di\xE0o", "\u5939\u6301": "ji\u0101 ch\xED", "\u7A7A\u989D": "k\xF2ng \xE9", "\u5E73\u8C03": "p\xEDng di\xE0o", "\u94FA\u5E8A": "p\u016B chu\xE1ng", "\u4E27\u949F": "s\u0101ng zh\u014Dng", "\u4F5C\u4E50": "zu\xF2 yu\xE8", "\u5C11\u5E9C": "sh\xE0o f\u01D4", "\u6570\u6570": "shu\xF2 shu\xF2", "\u5954\u5934": "b\xE8n tou", "\u8FDB\u7ED9": "j\xECn j\u01D0", "\u7387\u6027": "shu\xE0i x\xECng", "\u4E50\u5B50": "l\xE8 zi", "\u7ED1\u624E": "b\u01CEng z\u0101", "\u6311\u5506": "ti\u01CEo su\u014D", "\u6F02\u6D17": "pi\u01CEo x\u01D0", "\u5939\u5899": "ji\u0101 qi\xE1ng", "\u54B3\u5598": "k\xE9 chu\u01CEn", "\u4E5C\u659C": "mi\u0113 xie", "\u9519\u5904": "cu\xF2 ch\u01D4", "\u590D\u79CD": "f\xF9 zh\u01D2ng", "\u95F7\u9152": "m\xE8n ji\u01D4", "\u65F6\u8C03": "sh\xED di\xE0o", "\u91CD\u5B59": "ch\xF3ng s\u016Bn", "\u7ECF\u5E62": "j\u012Bng chu\xE1ng", "\u5729\u573A": "x\u016B ch\xE1ng", "\u8C03\u95E8": "di\xE0o m\xE9n", "\u82B1\u5934": "hu\u0101 tou", "\u5212\u62C9": "hu\xE1 la", "\u5957\u8272": "t\xE0o sh\u01CEi", "\u7C97\u7387": "c\u016B shu\xE0i", "\u76F8\u7387": "xi\u0101ng shu\xE0i", "\u6B3E\u8BC6": "ku\u01CEn zh\xEC", "\u5401\u8BF7": "y\xF9 q\u01D0ng", "\u836B\u853D": "y\u012Bn b\xEC", "\u6587\u86E4": "w\xE9n g\xE9", "\u5600\u55D2": "d\u012B d\u0101", "\u8C03\u53D6": "di\xE0o q\u01D4", "\u4EA4\u5DEE": "ji\u0101o ch\u0101i", "\u843D\u5B50": "l\xE0o z\u01D0", "\u76F8\u518C": "xi\xE0ng c\xE8", "\u7D6E\u53E8": "x\xF9 d\xE1o", "\u843D\u53D1": "lu\xF2 f\xE0", "\u5F02\u76F8": "y\xEC xi\xE0ng", "\u6D78\u6CA1": "j\xECn m\xF2", "\u89D2\u62B5": "ju\xE9 d\u01D0", "\u5378\u8F7D": "xi\xE8 z\xE0i", "\u6625\u5377": "ch\u016Bn ju\u01CEn", "\u624E\u6323": "zh\xE1 zheng", "\u755C\u517B": "x\xF9 y\u01CEng", "\u5421\u54AF": "b\u01D0 lu\xF2", "\u579B\u5B50": "du\u01D2 zi", "\u6076\u5C11": "\xE8 sh\xE0o", "\u53D1\u9645": "f\xE0 j\xEC", "\u7EA2\u82D5": "h\xF3ng sh\xE1o", "\u7CE8\u7CCA": "ji\xE0ng h\xF9", "\u54ED\u4E27": "k\u016B sang", "\u6CE1\u5B50": "p\u0101o z\u01D0", "\u7A0D\u606F": "sh\xE0o x\u012B", "\u6655\u8239": "y\xF9n chu\xE1n", "\u6821\u6837": "ji\xE0o y\xE0ng", "\u5916\u5DEE": "w\xE0i ch\u0101i", "\u7EA2\u66F2": "h\xF3ng q\u01D4", "\u811A\u722A": "ji\u01CEo zh\u01CEo", "\u94FA\u5C55": "p\u016B zh\u01CEn", "\u9A6E\u5B50": "du\xF2 zi", "\u82AB\u837D": "y\xE1n sui", "\u5939\u7D27": "ji\u0101 j\u01D0n", "\u5C3F\u6CE1": "su\u012B p\xE0o", "\u4E27\u4E71": "s\u0101ng lu\xE0n", "\u51F6\u76F8": "xi\u014Dng xi\xE0ng", "\u534E\u53D1": "hu\xE1 f\xE0", "\u6253\u573A": "d\u01CE ch\xE1ng", "\u4E91\u91CF": "y\xFAn li\xE0ng", "\u6B63\u5207": "zh\xE8ng qi\u0113", "\u5904\u5B50": "ch\u01D4 z\u01D0", "\u7559\u96BE": "li\xFA n\xE0n", "\u5212\u62F3": "hu\xE1 qu\xE1n", "\u5212\u8247": "hu\xE1 t\u01D0ng", "\u8BC4\u4F20": "p\xEDng zhu\xE0n", "\u62C9\u7EA4": "l\u0101 qi\xE0n", "\u53E5\u8BFB": "j\xF9 d\xF2u", "\u6563\u5242": "s\u01CEn j\xEC", "\u9AA8\u6B96": "g\u01D4 shi", "\u585E\u97F3": "s\xE8 y\u012Bn", "\u94FA\u53D9": "p\u016B x\xF9", "\u960F\u6C0F": "y\u0101n zh\u012B", "\u51B7\u98A4": "l\u011Bng zh\xE0n", "\u715E\u4F4F": "sh\u0101 zh\xF9", "\u591C\u66F2": "y\xE8 q\u01D4", "\u79CD\u7C7D": "zh\u01D2ng z\u01D0", "\u91C7\u79CD": "c\u01CEi zh\u01D2ng", "\u5C11\u7537": "sh\xE0o n\xE1n", "\u683C\u767B": "g\u0113 d\u0113ng", "\u7BA1\u4E50": "gu\u01CEn yu\xE8", "\u53F7\u5555": "h\xE1o t\xE1o", "\u7EB3\u964D": "n\xE0 xi\xE1ng", "\u62E5\u585E": "y\u014Dng s\xE8", "\u4E07\u4E58": "w\xE0n sh\xE8ng", "\u6746\u513F": "g\u01CEn \xE9r", "\u845B\u85E4": "g\xE9 t\xE9ng", "\u82AF\u5B50": "x\xECn zi", "\u7C3F\u7C4D": "b\xF9 j\xED", "\u57AB\u5708": "di\xE0n ju\xE0n", "\u76AE\u5939": "p\xED ji\u0101", "\u6821\u51C6": "ji\xE0o zh\u01D4n", "\u884C\u6B3E": "h\xE1ng ku\u01CEn", "\u9ED1\u79CD": "h\u0113i zh\u01D2ng", "\u9F99\u79CD": "l\xF3ng zh\u01D2ng", "\u5141\u5F53": "y\u01D4n d\xE0ng", "\u5668\u91CF": "q\xEC li\xE0ng", "\u9009\u8C03": "xu\u01CEn di\xE0o", "\u626E\u76F8": "b\xE0n xi\xE0ng", "\u5E72\u624D": "g\xE0n c\xE1i", "\u57FA\u5E72": "j\u012B g\xE0n", "\u4E09\u6821": "s\u0101n ji\xE0o", "\u5272\u5207": "g\u0113 qi\u0113", "\u56FD\u4E50": "gu\xF3 yu\xE8", "\u5361\u58F3": "qi\u01CE k\xE9", "\u5462\u5B50": "n\xED zi", "\u8F9F\u8C37": "b\xEC g\u01D4", "\u78E8\u623F": "m\xF2 f\xE1ng", "\u54BF\u5440": "y\u012B y\u0101", "\u82A5\u672B": "ji\xE8 mo", "\u8584\u6280": "b\xF3 j\xEC", "\u4EA7\u5047": "ch\u01CEn ji\xE0", "\u8BD7\u5174": "sh\u012B x\xECng", "\u91CD\u51FA": "ch\xF3ng ch\u016B", "\u8F6C\u6905": "zhu\xE0n y\u01D0", "\u914C\u91CF": "zhu\xF3 li\xE0ng", "\u7C3F\u518C": "b\xF9 c\xE8", "\u85CF\u9752": "z\xE0ng q\u012Bng", "\u7684\u58EB": "d\xED sh\xEC", "\u8C03\u4EBA": "di\xE0o r\xE9n", "\u89E3\u5143": "ji\xE8 yu\xE1n", "\u830E\u5E72": "j\u012Bng g\xE0n", "\u5DE8\u91CF": "j\xF9 li\xE0ng", "\u6994\u5934": "l\xE1ng tou", "\u7387\u771F": "shu\xE0i zh\u0113n", "\u55B7\u9999": "p\xE8n xi\u0101ng", "\u9501\u94A5": "su\u01D2 yu\xE8", "\u867E\u87C6": "h\xE1 m\xE1", "\u76F8\u56FE": "xi\xE0ng t\xFA", "\u5174\u4F1A": "x\xECng hu\xEC", "\u7076\u5934": "z\xE0o tou", "\u91CD\u5A5A": "ch\xF3ng h\u016Bn", "\u94BB\u6D1E": "zu\u0101n d\xF2ng", "\u5FD6\u5EA6": "c\u01D4n du\xF3", "\u515A\u53C2": "d\u01CEng sh\u0113n", "\u8C03\u6E29": "di\xE0o w\u0113n", "\u6746\u5854": "g\u01CEn t\u01CE", "\u845B\u5E03": "g\xE9 b\xF9", "\u62F1\u5238": "g\u01D2ng xu\xE0n", "\u51A0\u5B50": "gu\xE0n zi", "\u5212\u5B50": "hu\xE1 z\u01D0", "\u5939\u751F": "ji\u0101 sh\u0113ng", "\u9732\u9985": "l\xF2u xi\xE0n", "\u6070\u5207": "qi\xE0 qi\u0113", "\u6563\u89C1": "s\u01CEn ji\xE0n", "\u54E8\u5361": "sh\xE0o qi\u01CE", "\u70EB\u53D1": "t\xE0ng f\xE0", "\u4F53\u91CF": "t\u01D0 li\xE0ng", "\u633A\u62EC": "t\u01D0ng gu\u0101", "\u7CFB\u5E26": "j\xEC d\xE0i", "\u76F8\u58EB": "xi\xE0ng sh\xEC", "\u7F8A\u5708": "y\xE1ng ju\xE0n", "\u8F6C\u77E9": "zhu\xE0n j\u01D4", "\u5427\u53F0": "b\u0101 t\xE1i", "\u82CD\u672F": "c\u0101ng zh\xFA", "\u83F2\u8584": "f\u011Bi b\xF3", "\u86E4\u86A7": "g\xE9 ji\xE8", "\u86E4\u870A": "g\xE9 l\xED", "\u74DC\u8513": "gu\u0101 w\xE0n", "\u602A\u76F8": "gu\xE0i xi\xE0ng", "\u7F79\u96BE": "l\xED n\xE0n", "\u4E34\u5E16": "l\xEDn ti\xE8", "\u5973\u7EA2": "n\u01DA g\u014Dng", "\u5228\u5E8A": "b\xE0o chu\xE1ng", "\u7FD8\u695A": "qi\xE1o ch\u01D4", "\u6570\u4E5D": "sh\u01D4 ji\u01D4", "\u8C08\u5174": "t\xE1n x\xECng", "\u5FC3\u66F2": "x\u012Bn q\u01D4", "\u96C4\u52B2": "xi\xF3ng j\xECng", "\u624E\u67D3": "z\u0101 r\u01CEn", "\u906E\u836B": "zh\u0113 y\u012Bn", "\u5468\u6B63": "zh\u014Du zh\u0113ng", "\u8D5A\u5934": "zhu\xE0n tou", "\u6252\u624B": "p\xE1 sh\u01D2u", "\u6400\u548C": "ch\u0101n huo", "\u8BDA\u6734": "ch\xE9ng pi\xE1o", "\u809A\u91CF": "d\xF9 li\xE0ng", "\u5E72\u7ED3": "g\xE0n ji\xE9", "\u5DE5\u5C3A": "g\u014Dng ch\u011B", "\u5BB6\u7D2F": "ji\u0101 l\u011Bi", "\u66F2\u6C34": "q\u01D4 shu\u01D0", "\u6C99\u53C2": "sh\u0101 sh\u0113n", "\u6311\u82B1": "ti\u01CEo hu\u0101", "\u884C\u8DDD": "h\xE1ng j\xF9", "\u79CD\u522B": "zh\u01D2ng bi\xE9", "\u79CD\u8349": "zh\u01D2ng c\u01CEo", "\u963F\u95E8": "\u0101 m\u0113n", "\u80CC\u7BD3": "b\u0113i l\u01D2u", "\u762A\u4E09": "bi\u0113 s\u0101n", "\u88C1\u5904": "c\xE1i ch\u01D4", "\u521B\u75DB": "chu\u0101ng t\xF2ng", "\u798F\u76F8": "f\xFA xi\xE0ng", "\u66F4\u52A8": "g\u0113ng d\xF2ng", "\u8C6A\u5174": "h\xE1o x\xECng", "\u8FD8\u9633": "hu\xE1n y\xE1ng", "\u8FD8\u5634": "hu\xE1n zu\u01D0", "\u501F\u8C03": "ji\xE8 di\xE0o", "\u5377\u4E91": "ju\u01CEn y\xFAn", "\u5361\u5B50": "qi\u01CE zi", "\u6D41\u5F39": "li\xFA d\xE0n", "\u7EDC\u5B50": "l\xE0o zi", "\u78E8\u5B50": "m\xF2 z\u01D0", "\u4E0B\u79CD": "xi\xE0 zh\u01D2ng", "\u60F3\u5934": "xi\u01CEng tou", "\u524A\u4EF7": "xu\u0113 ji\xE0", "\u6821\u9605": "ji\xE0o yu\xE8", "\u516B\u884C": "b\u0101 h\xE1ng", "\u96C5\u91CF": "y\u01CE li\xE0ng", "\u522B\u4F20": "bi\xE9 zhu\xE0n", "\u8584\u9152": "b\xF3 ji\u01D4", "\u6625\u5047": "ch\u016Bn ji\xE0", "\u53D1\u59BB": "f\xE0 q\u012B", "\u54D7\u54D7": "hu\u0101 hu\u0101", "\u5BBD\u7EF0": "ku\u0101n chuo", "\u4E86\u609F": "li\u01CEo w\xF9", "\u5207\u82B1": "qi\u0113 hu\u0101", "\u5BA1\u5EA6": "sh\u011Bn du\xF3", "\u5E94\u8BB8": "y\u012Bng x\u01D4", "\u8F6C\u53F0": "zhu\xE0n t\xE1i", "\u4ED4\u732A": "z\u01D0 zh\u016B", "\u5954\u547D": "b\xE8n m\xECng", "\u88C1\u91CF": "c\xE1i li\xE0ng", "\u8695\u79CD": "c\xE1n zh\u01D2ng", "\u85CF\u620F": "z\xE0ng x\xEC", "\u4E58\u5174": "ch\xE9ng x\xECng", "\u7EF8\u7F2A": "ch\xF3u m\xF3u", "\u6467\u6298": "cu\u012B sh\xE9", "\u8C03\u7ECF": "di\xE0o j\u012Bng", "\u8C03\u804C": "di\xE0o zh\xED", "\u7F1D\u7F00": "f\xE9ng zhu\xEC", "\u9AA8\u6735": "g\u016B du\u01D2", "\u6838\u513F": "h\xFA \xE9r", "\u6052\u91CF": "h\xE9ng li\xE0ng", "\u8FD8\u4EF7": "hu\xE1n ji\xE0", "\u6D51\u6734": "h\xFAn pi\xE1o", "\u82E6\u5DEE": "k\u01D4 ch\u0101i", "\u9762\u7CCA": "mi\xE0n h\xF9", "\u66F2\u5F20": "q\u01D4 zh\u0101ng", "\u715E\u8F66": "sh\u0101 ch\u0113", "\u7701\u89C6": "x\u01D0ng sh\xEC", "\u4EC0\u9526": "sh\xED j\u01D0n", "\u4FE1\u5DEE": "x\xECn ch\u0101i", "\u4F59\u5207": "y\xFA qi\u0113", "\u6512\u7709": "cu\xE1n m\xE9i", "\u70B8\u7CD5": "zh\xE1 g\u0101o", "\u94BB\u6746": "zu\xE0n g\u01CEn", "\u6252\u7070": "p\xE1 hu\u012B", "\u767D\u79CD": "b\xE1i zh\u01D2ng", "\u62CC\u548C": "b\xE0n hu\xF2", "\u957F\u8C03": "ch\xE1ng di\xE0o", "\u5927\u6E9C": "d\xE0 li\xF9", "\u6296\u6402": "d\u01D2u l\u014Du", "\u98DE\u8F6C": "f\u0113i zhu\xE0n", "\u8D74\u96BE": "f\xF9 n\xE0n", "\u5E72\u4ED7": "g\xE0n zh\xE0ng", "\u597D\u80DC": "h\xE0o sh\xE8ng", "\u753B\u7247": "hu\xE0 pi\u0101n", "\u6405\u6DF7": "ji\u01CEo g\u01D4n", "\u87BA\u6746": "lu\xF3 g\u01CEn", "\u6728\u6A21": "m\xF9 m\xFA", "\u6012\u53F7": "n\xF9 h\xE1o", "\u9891\u6570": "p\xEDn shu\xF2", "\u65E0\u5B81": "w\xFA n\xECng", "\u9009\u66F2": "xu\u01CEn q\u01D4", "\u9057\u5C11": "y\xED sh\xE0o", "\u90AE\u5DEE": "y\xF3u ch\u0101i", "\u5360\u5366": "zh\u0101n gu\xE0", "\u5360\u661F": "zh\u0101n x\u012Bng", "\u91CD\u5BA1": "ch\xF3ng sh\u011Bn", "\u81EA\u91CF": "z\xEC li\xE0ng", "\u5F85\u67E5": "d\xE0i zh\u0101", "\u8C03\u9632": "di\xE0o f\xE1ng", "\u53D1\u5ECA": "f\xE0 l\xE1ng", "\u7FFB\u67E5": "f\u0101n zh\u0101", "\u53CD\u8C03": "f\u01CEn di\xE0o", "\u7F1D\u5B50": "f\xE8ng zi", "\u66F4\u592B": "g\u0113ng f\u016B", "\u9AA8\u5B50": "g\u01D4 zi", "\u5149\u6746": "gu\u0101ng g\u01CEn", "\u5939\u68CD": "ji\u0101 g\xF9n", "\u5C45\u4E27": "j\u016B s\u0101ng", "\u5DE8\u8D3E": "j\xF9 g\u01D4", "\u770B\u62BC": "k\u0101n y\u0101", "\u7A7A\u8F6C": "k\u014Dng zhu\xE0n", "\u91CF\u529B": "li\xE0ng l\xEC", "\u8499\u5C18": "meng chen", "\u8499\u96BE": "m\xE9ng n\xE0n", "\u70AE\u70D9": "p\xE1o lu\xF2", "\u8D54\u8FD8": "p\xE9i hu\xE1n", "\u6251\u6247": "p\u016B sh\u0101n", "\u6563\u8BB0": "s\u01CEn j\xEC", "\u6563\u4EF6": "s\u01CEn ji\xE0n", "\u5220\u524A": "sh\u0101n xu\u0113", "\u5C04\u5E72": "y\xE8 g\xE0n", "\u6761\u51E0": "ti\xE1o j\u012B", "\u5077\u7A7A": "t\u014Du k\xF2ng", "\u524A\u58C1": "xu\u0113 b\xEC", "\u6821\u6838": "ji\xE0o h\xE9", "\u9634\u5E72": "y\u012Bn g\xE0n", "\u62E9\u83DC": "zh\xE1i c\xE0i", "\u79CD\u9A6C": "zh\u01D2ng m\u01CE", "\u91CD\u4E5D": "ch\xF3ng ji\u01D4", "\u4E3B\u8C03": "zh\u01D4 di\xE0o", "\u81EA\u7981": "z\xEC j\u012Bn", "\u5427\u5527": "b\u0101 j\u012B", "\u5821\u5B50": "b\u01D4 zi", "\u4FBF\u6EBA": "bi\xE0n ni\xE0o", "\u8BCD\u8C03": "c\xED di\xE0o", "\u53E8\u5495": "d\xE1o gu", "\u5E72\u7C89": "g\xE0n f\u011Bn", "\u4FDA\u66F2": "l\u01D0 q\u01D4", "\u843D\u6795": "l\xE0o zh\u011Bn", "\u94FA\u780C": "p\u016B q\xEC", "\u5237\u767D": "shu\xE0 b\xE1i", "\u59D4\u9761": "w\u011Bi m\u01D0", "\u7CFB\u6CCA": "j\xEC b\xF3", "\u76F8\u9A6C": "xi\xE0ng m\u01CE", "\u884C\u8F88": "h\xE1ng b\xE8i", "\u71A8\u5E16": "y\xF9 ti\u0113", "\u8F6C\u7B4B": "zhu\xE0n j\u012Bn", "\u7C7D\u79CD": "z\u01D0 zh\u01D2ng", "\u68D2\u559D": "b\xE0ng h\xE8", "\u50A7\u76F8": "b\u012Bn xi\xE0ng", "\u4F20\u79CD": "chu\xE1n zh\u01D2ng", "\u9550\u5934": "g\u01CEo t\xF3u", "\u95F4\u82D7": "ji\xE0n mi\xE1o", "\u4E50\u6C60": "yu\xE8 ch\xED", "\u5356\u76F8": "m\xE0i xi\xE0ng", "\u96BE\u4E3A": "n\xE1n w\xE9i", "\u5C4F\u5F03": "b\u01D0ng q\xEC", "\u94C5\u5F39": "qi\u0101n d\xE0n", "\u5207\u53D8": "qi\u0113 bi\xE0n", "\u8BF7\u8C03": "q\u01D0ng di\xE0o", "\u66F2\u5EA6": "q\u01D4 d\xF9", "\u7FA4\u6C13": "q\xFAn m\xE9ng", "\u6563\u677F": "s\u01CEn b\u01CEn", "\u7701\u5BDF": "x\u01D0ng ch\xE1", "\u4E8B\u5047": "sh\xEC ji\xE0", "\u7EA4\u7EF3": "qi\xE0n sh\xE9ng", "\u79CD\u9EBB": "zh\u01D2ng m\xE1", "\u91CD\u5F71": "ch\xF3ng y\u01D0ng" }, { "\u4E3A\u4EC0\u4E48": "w\xE8i sh\xE9n me", "\u5B9E\u9645\u4E0A": "sh\xED j\xEC shang", "\u68C0\u5BDF\u957F": "ji\u01CEn ch\xE1 zh\u01CEng", "\u4E0D\u7531\u5F97": "b\xF9 y\xF3u de", "\u5DEE\u4E0D\u591A": "ch\xE0 bu du\u014D", "\u53EA\u4E0D\u8FC7": "zh\u01D0 bu gu\xF2", "\u56FD\u5185\u5916": "gu\xF3 n\xE8i wai", "\u8001\u4EBA\u5BB6": "l\u01CEo ren jia", "\u5E72\u4EC0\u4E48": "g\xE0n sh\xE9n me", "\u53EF\u4E0D\u662F": "k\u011B b\xF9 sh\xEC", "\u8FD9\u4F1A\u513F": "zh\xE8 hu\xEC er", "\u5C3D\u53EF\u80FD": "j\u01D0n k\u011B n\xE9ng", "\u8463\u4E8B\u957F": "d\u01D2ng sh\xEC zh\u01CEng", "\u4E86\u4E0D\u8D77": "li\u01CEo b\xF9 q\u01D0", "\u53C2\u8C0B\u957F": "c\u0101n m\xF3u zh\u01CEng", "\u820D\u4E0D\u5F97": "sh\u011B bu de", "\u671D\u9C9C\u65CF": "ch\xE1o xi\u01CEn z\xFA", "\u6068\u4E0D\u5F97": "h\xE8n bu de", "\u6D77\u5185\u5916": "h\u01CEi n\xE8i wai", "\u7981\u4E0D\u4F4F": "j\u012Bn b\xFA zh\xF9", "\u67CF\u62C9\u56FE": "b\xF3 l\u0101 t\xFA", "\u602A\u4E0D\u5F97": "gu\xE0i bu de", "\u4E0D\u5728\u4E4E": "b\xF9 z\xE0i hu", "\u6D1B\u6749\u77F6": "lu\xF2 sh\u0101n ji", "\u6709\u70B9\u513F": "y\u01D2u di\u01CEnr", "\u8FEB\u51FB\u70AE": "p\u01CEi j\u012B p\xE0o", "\u5927\u4E08\u592B": "d\xE0 zh\xE0ng fu", "\u8FDB\u884C\u66F2": "j\xECn x\xEDng q\u01D4", "\u514D\u4E0D\u4E86": "mi\u01CEn bu li\u01CEo", "\u4E0D\u5F97\u4E86": "b\xF9 d\xE9 li\u01CEo", "\u8FC7\u65E5\u5B50": "gu\xF2 r\xEC zi", "\u9A6C\u5C3E\u677E": "m\u01CE w\u011Bi s\u014Dng", "\u8FD0\u8F93\u91CF": "y\xF9n sh\u016B li\xE0ng", "\u53D1\u813E\u6C14": "f\u0101 p\xED qi", "\u8FC7\u4E0D\u53BB": "gu\xF2 bu q\xF9", "\u81ED\u8C46\u8150": "ch\xF2u d\xF2u fu", "\u58EB\u5927\u592B": "sh\xEC d\xE0 f\u016B", "\u4E09\u90E8\u66F2": "s\u0101n b\xF9 q\u01D4", "\u5C11\u4E0D\u4E86": "sh\u01CEo bu li\u01CEo", "\u4EE1\u4F6C\u65CF": "g\u0113 l\u01CEo z\xFA", "\u4EA4\u54CD\u66F2": "ji\u0101o xi\u01CEng q\u01D4", "\u5206\u5B50\u5F0F": "f\u0113n z\u01D0 sh\xEC", "\u597D\u65E5\u5B50": "h\u01CEo r\xEC zi", "\u770B\u6837\u5B50": "k\xE0n y\xE0ng zi", "\u9E2D\u7EFF\u6C5F": "y\u0101 l\xF9 ji\u0101ng", "\u5DF4\u4E0D\u5F97": "b\u0101 bu de", "\u534F\u594F\u66F2": "xi\xE9 z\xF2u q\u01D4", "\u6CA1\u5173\u7CFB": "m\xE9i gu\u0101n xi", "\u4E0D\u89C1\u5F97": "b\xFA ji\xE0n de", "\u538B\u6839\u513F": "y\xE0 g\u0113nr", "\u5BF9\u5F97\u8D77": "du\xEC de q\u01D0", "\u90A3\u4F1A\u513F": "n\xE0 hu\xECr", "\u81EA\u4E2A\u513F": "z\xEC g\u011Br", "\u7269\u7406\u91CF": "w\xF9 l\u01D0 li\xE0ng", "\u600E\u4E48\u7740": "z\u011Bn me zh\u0101o", "\u660E\u6643\u6643": "m\xEDng hu\u01CEng hu\u01CEng", "\u8282\u5047\u65E5": "ji\xE9 ji\xE0 r\xEC", "\u5FC3\u91CC\u8BDD": "x\u012Bn l\u01D0 hu\xE0", "\u53D1\u884C\u91CF": "f\u0101 x\xEDng li\xE0ng", "\u5174\u51B2\u51B2": "x\xECng ch\u014Dng ch\u014Dng", "\u5206\u5B50\u91CF": "f\u0113n z\u01D0 li\xE0ng", "\u5927\u4E0D\u4E86": "d\xE0 bu li\u01CEo", "\u56FD\u5B50\u76D1": "gu\xF3 z\u01D0 ji\xE0n", "\u8001\u5927\u96BE": "l\u01CEo d\xE0 n\xE1n", "\u4E86\u4E0D\u5F97": "li\u01CEo bu d\xE9", "\u77F3\u72EE\u5B50": "sh\xED sh\u012B zi", "\u83AB\u4E0D\u662F": "m\xF2 b\xF9 sh\xEC", "\u5C11\u4E0D\u5F97": "sh\u01CEo bu d\xE9", "\u515A\u5185\u5916": "d\u01CEng n\xE8i wai", "\u8FD9\u4E48\u7740": "zh\xE8 me zh\u0101o", "\u5C11\u5976\u5976": "sh\xE0o n\u01CEi nai", "\u6697\u5730\u91CC": "\xE0n d\xEC li", "\u770B\u4E0D\u8D77": "k\xE0n bu q\u01D0", "\u66F4\u5E74\u671F": "g\u0113ng ni\xE1n q\u012B", "\u5DE5\u4F5C\u91CF": "g\u014Dng zu\xF2 li\xE0ng", "\u80CC\u5730\u91CC": "b\xE8i d\xEC li", "\u5C71\u91CC\u7EA2": "sh\u0101n li h\xF3ng", "\u597D\u597D\u513F": "h\u01CEo h\u0101or", "\u4EA4\u54CD\u4E50": "ji\u0101o xi\u01CEng yu\xE8", "\u597D\u610F\u601D": "h\u01CEo y\xEC si", "\u5410\u8C37\u6D51": "t\u01D4 y\xF9 h\xFAn", "\u6CA1\u610F\u601D": "m\xE9i y\xEC si", "\u7406\u53D1\u5E08": "l\u01D0 f\xE0 sh\u012B", "\u594F\u9E23\u66F2": "z\xF2u m\xEDng q\u01D4", "\u5854\u4EC0\u5E72": "t\u01CE sh\xED g\xE0n", "\u5145\u5176\u91CF": "ch\u014Dng q\xED li\xE0ng", "\u9760\u5F97\u4F4F": "k\xE0o de zh\xF9", "\u8F66\u884C\u9053": "ch\u0113 h\xE1ng d\xE0o", "\u4E2D\u90CE\u5C06": "zh\u014Dng l\xE1ng ji\xE0ng", "\u72AF\u4E0D\u7740": "f\xE0n bu zh\xE1o", "\u7167\u660E\u5F39": "zh\xE0o m\xEDng d\xE0n", "\u4E00\u6E9C\u70DF": "y\u012B li\xF9 y\u0101n", "\u70DF\u5E55\u5F39": "y\u0101n m\xF9 d\xE0n", "\u6CA1\u5948\u4F55": "m\xF2 n\xE0i h\xE9", "\u4E71\u54C4\u54C4": "lu\xE0n h\u014Dng h\u014Dng", "\u60E0\u66F4\u65AF": "hu\xEC g\u0113ng s\u012B", "\u8F7D\u91CD\u91CF": "z\xE0i zh\xF2ng li\xE0ng", "\u77A7\u5F97\u8D77": "qi\xE1o de q\u01D0", "\u7EAA\u4F20\u4F53": "j\xEC zhu\xE0n t\u01D0", "\u868C\u57E0\u5E02": "b\xE8ng b\xF9 sh\xEC", "\u51B7\u4E0D\u4E01": "l\u011Bng bu d\u012Bng", "\u963F\u623F\u5BAB": "\u0113 p\xE1ng g\u014Dng", "\u6028\u4E0D\u5F97": "yu\xE0n bu de", "\u5377\u5FC3\u83DC": "ju\u01CEn x\u012Bn c\xE0i", "\u620F\u73ED\u5B50": "x\xEC b\u0101n zi", "\u8FC7\u5F97\u53BB": "gu\xF2 d\u011Bi q\xF9", "\u5927\u809A\u5B50": "d\xE0 d\xF9 zi", "\u82B1\u5C97\u77F3": "hu\u0101 g\u0101ng sh\xED", "\u5916\u7525\u5973": "w\xE0i sheng n\u01DA", "\u56E2\u56E2\u8F6C": "tu\xE1n tu\xE1n zhu\xE0n", "\u5927\u5821\u7901": "d\xE0 p\xF9 ji\u0101o", "\u71C3\u70E7\u5F39": "r\xE1n sh\u0101o d\xE0n", "\u52B3\u4EC0\u5B50": "l\xE1o sh\xED zi", "\u6447\u6EDA\u4E50": "y\xE1o g\u01D4n yu\xE8", "\u8EAB\u5B50\u9AA8": "sh\u0113n zi g\u01D4", "\u5939\u7AF9\u6843": "ji\u0101 zh\xFA t\xE1o", "\u4E00\u5200\u5207": "y\u012B d\u0101o qi\u0113", "\u95F9\u54C4\u54C4": "n\xE0o h\u014Dng h\u014Dng", "\u4E09\u8FDE\u51A0": "s\u0101n li\xE1n gu\xE0n", "\u91CD\u5934\u620F": "zh\xF2ng t\xF3u x\xEC", "\u4E8C\u4EBA\u8F6C": "\xE8r r\xE9n zhu\xE0n", "\u8282\u9AA8\u773C": "ji\u0113 gu y\u01CEn", "\u77E5\u8BC6\u9762": "zh\u012B sh\u012B mi\xE0n", "\u62A4\u58EB\u957F": "h\xF9 sh\xEC zh\u01CEng", "\u67B6\u5B50\u8F66": "ji\xE0 zi ch\u0113", "\u4FE1\u53F7\u5F39": "x\xECn h\xE0o d\xE0n", "\u5E72\u7535\u6C60": "g\xE0n di\xE0n ch\xED", "\u67AA\u6746\u5B50": "qi\u0101ng g\u01CEn zi", "\u54ED\u4E27\u68D2": "k\u016B s\u0101ng b\xE0ng", "\u9F3B\u54BD\u764C": "b\xED y\u0101n \xE1i", "\u74E6\u5C97\u519B": "w\u01CE g\u0101ng j\u016Bn", "\u4E70\u5F97\u8D77": "m\u01CEi de q\u01D0", "\u62D7\u4E0D\u8FC7": "ni\xF9 bu gu\xF2", "\u765E\u86E4\u87C6": "l\xE0i h\xE1 ma", "\u810A\u6881\u9AA8": "j\u01D0 liang g\u01D4", "\u5B50\u6BCD\u5F39": "z\u01D0 m\u01D4 d\xE0n", "\u5F00\u5C0F\u5DEE": "k\u0101i xi\u01CEo ch\u0101i", "\u5973\u5F3A\u4EBA": "n\u01DA qi\xE1ng r\xE9n", "\u82F1\u96C4\u4F20": "y\u012Bng xi\xF3ng zhu\xE0n", "\u5927\u5AC2\u5B50": "d\xE0 s\u01CEo zi", "\u7235\u58EB\u4E50": "ju\xE9 sh\xEC yu\xE8", "\u8BF4\u7B11\u8BDD": "shu\u014D xi\xE0o hua", "\u6DF7\u65E5\u5B50": "h\xF9n r\xEC zi", "\u5927\u9F3B\u5B50": "d\xE0 b\xED zi", "\u78B0\u5934\u4F1A": "p\xE8ng t\xF3u ku\xE0i", "\u73BB\u7483\u94A2": "b\u014D li g\u0101ng", "\u66F3\u5149\u5F39": "y\xE8 gu\u0101ng d\xE0n", "\u5C11\u6797\u62F3": "sh\xE0o l\xEDn qu\xE1n", "\u548F\u53F9\u8C03": "y\u01D2ng t\xE0n di\xE0o", "\u8C46\u8150\u5E72": "d\xF2u f\u01D4 g\xE0n", "\u4E00\u4E2A\u52B2": "y\u012B g\xE8 j\xECn", "\u5C11\u5148\u961F": "sh\xE0o xi\u0101n du\xEC", "\u7075\u957F\u76EE": "l\xEDng zh\u01CEng m\xF9", "\u5BF9\u7740\u5E72": "du\xEC zhe g\xE0n", "\u8499\u8499\u4EAE": "m\u0113ng m\u0113ng li\xE0ng", "\u8F6F\u9AA8\u5934": "ru\u01CEn g\u01D4 tou", "\u4E0D\u7701\u5F97": "b\xF9 x\u01D0ng de", "\u94FA\u76D6\u5377": "p\u016B g\xE0i ju\u01CEn", "\u548C\u7A00\u6CE5": "hu\xF2 x\u012B n\xED", "\u4EAD\u5B50\u95F4": "t\xEDng zi ji\u0101n", "\u80CC\u9ED1\u9505": "b\u0113i h\u0113i gu\u014D", "\u7EA2\u5F64\u5F64": "h\xF3ng t\u014Dng t\u014Dng", "\u6B66\u4FAF\u7960": "w\u01D4 h\xF3u c\xED", "\u6253\u54C6\u55E6": "d\u01CE du\u014D suo", "\u5730\u7AA8\u5B50": "d\xEC y\xECn zi", "\u72C2\u60F3\u66F2": "ku\xE1ng xi\u01CEng q\u01D4", "\u5E7B\u60F3\u66F2": "hu\xE0n xi\u01CEng q\u01D4", "\u6237\u53E3\u7C3F": "h\xF9 k\u01D2u b\xF9", "\u817F\u809A\u5B50": "tu\u01D0 d\xF9 zi", "\u9A6C\u5C3E\u85FB": "m\u01CE w\u011Bi z\u01CEo", "\u7EC3\u4E60\u66F2": "li\xE0n x\xED q\u01D4", "\u591C\u732B\u5B50": "y\xE8 m\u0101o zi", "\u6298\u5B50\u620F": "zh\xE9 zi x\xEC", "\u6253\u624B\u52BF": "d\u01CE sh\u01D2u sh\xEC", "\u9F99\u738B\u7237": "l\xF3ng w\xE1ng y\xE9", "\u8981\u9762\u5B50": "y\xE0o mi\xE0n zi", "\u6C14\u5934\u4E0A": "q\xEC t\xF3u shang", "\u7CCA\u6D82\u866B": "h\xFA tu ch\xF3ng", "\u7B14\u6746\u5B50": "b\u01D0 g\u01CEn zi", "\u5360\u4FBF\u5B9C": "zh\xE0n pi\xE1n yi", "\u6253\u4E3B\u610F": "d\u01CE zh\u01D4 yi", "\u591A\u5F39\u5934": "du\u014D d\xE0n t\xF3u", "\u9732\u4E00\u624B": "l\xF2u y\u012B sh\u01D2u", "\u5830\u585E\u6E56": "y\xE0n s\xE8 h\xFA", "\u4FDD\u5F97\u4F4F": "b\u01CEo de zh\xF9", "\u8DB5\u7A81\u6CC9": "b\xE0o t\u016B qu\xE1n", "\u94BB\u7A7A\u5B50": "zu\u0101n k\xF2ng zi", "\u5965\u5F97\u6CB3": "\xE0o de h\xE9", "\u53F8\u52A1\u957F": "s\u012B w\xF9 zh\u01CEng", "\u7981\u4E0D\u8D77": "j\u012Bn bu q\u01D0", "\u4EC0\u5239\u6D77": "sh\xED ch\xE0 h\u01CEi", "\u83B2\u82B1\u843D": "li\xE1n hu\u0101 l\xE0o", "\u4E00\u573A\u7A7A": "y\u012B ch\xE1ng k\u014Dng", "\u524D\u594F\u66F2": "qi\xE1n z\xF2u q\u01D4", "\u89C1\u4E16\u9762": "xi\xE0n sh\xEC mi\xE0n", "\u5206\u5B50\u7B5B": "f\u0113n z\u01D0 sh\u0101i", "\u8C41\u51FA\u53BB": "hu\u014D chu qu", "\u7535\u4F4D\u5DEE": "di\xE0n w\xE8i ch\u0101", "\u6328\u4E2A\u513F": "\u0101i g\xE8r", "\u90A3\u9635\u513F": "n\xE0 zh\xE8nr", "\u7ED9\u9762\u5B50": "g\u011Bi mi\xE0n zi", "\u80BA\u6D3B\u91CF": "f\xE8i hu\xF3 li\xE0ng", "\u5927\u5E08\u5085": "d\xE0 sh\u012B f\u016B", "\u63B7\u5F39\u7B52": "zh\xEC d\xE0n t\u01D2ng", "\u6253\u547C\u565C": "d\u01CE h\u016B lu", "\u5E7F\u6E20\u95E8": "\u0101n q\xFA m\xE9n", "\u672A\u89C1\u5F97": "w\xE8i ji\xE0n de", "\u5927\u5A76\u513F": "d\xE0 sh\u011Bnr", "\u8C08\u5F97\u6765": "t\xE1n de l\xE1i", "\u72EE\u5B50\u5934": "sh\u012B zi t\xF3u", "\u811A\u4E2B\u5B50": "ji\u01CEo y\u0101 zi", "\u53D8\u594F\u66F2": "bi\xE0n z\xF2u q\u01D4", "\u7A7A\u5305\u5F39": "k\u014Dng b\u0101o d\xE0n", "\u7A9D\u91CC\u6597": "w\u014D li d\xF2u", "\u5F39\u7740\u70B9": "d\xE0n zhu\xF3 di\u01CEn", "\u514D\u4E0D\u5F97": "mi\u01CEn bu de", "\u4E2A\u5934\u513F": "g\xE8 t\xF3ur", "\u770B\u5F97\u8D77": "k\xE0n de q\u01D0", "\u6765\u4E0D\u5F97": "l\xE1i bu de", "\u7CCA\u6D82\u8D26": "h\xFA tu zh\xE0ng", "\u5927\u7329\u7329": "d\xE0 x\u012Bng xing", "\u4E00\u6E9C\u513F": "y\u012B li\xF9 \xE9r", "\u7981\u5F97\u8D77": "j\u012Bn de q\u01D0", "\u6CD5\u76F8\u5B97": "f\u01CE xi\u0101ng z\u014Dng", "\u53EF\u601C\u76F8": "k\u011B li\xE1n xi\xE0ng", "\u5403\u5F97\u4E0B": "ch\u012B de xi\xE0", "\u6C49\u5821\u5305": "h\xE0n p\xF9 b\u0101o", "\u95F9\u56B7\u56B7": "n\xE0o r\u0101ng r\u0101ng", "\u6570\u6765\u5B9D": "sh\u01D4 l\xE1i b\u01CEo", "\u62B9\u8116\u5B50": "m\u01D2 b\xF3 zi", "\u5408\u5F97\u6765": "h\xE9 de l\xE1i", "\u5E72\u6027\u6CB9": "g\xE0n x\xECng y\xF3u", "\u4E0A\u8F88\u5B50": "sh\xE0ng b\xE8i zi", "\u95F7\u846B\u82A6": "m\xE8n h\xFA l\xFA", "\u5471\u5471\u53EB": "gu\u0101 gu\u0101 ji\xE0o", "\u897F\u6D0B\u53C2": "x\u012B y\xE1ng sh\u0113n", "\u78B0\u9489\u5B50": "p\xE8ng d\xECng z\u01D0", "\u6797\u836B\u9053": "l\xEDn y\u012Bn d\xE0o", "\u62C9\u5BB6\u5E38": "l\xE1 ji\u0101 ch\xE1ng", "\u5377\u94FA\u76D6": "ju\u01CEn p\u016B g\xE0i", "\u8FC7\u5F97\u786C": "gu\xF2 de y\xECng", "\u98DE\u5C06\u519B": "f\u0113i ji\xE0ng j\u016Bn", "\u6311\u5927\u6881": "ti\u01CEo d\xE0 li\xE1ng", "\u54C8\u5DF4\u72D7": "h\u01CE b\u0101 g\u01D2u", "\u8FC7\u5BB6\u5BB6": "gu\u014D ji\u0101 ji\u0101", "\u50AC\u6CEA\u5F39": "cu\u012B l\xE8i d\xE0n", "\u96E8\u5939\u96EA": "y\u01D4 ji\u0101 xu\u011B", "\u6572\u7AF9\u6760": "qi\u0101o zh\u016B g\xE0ng", "\u5217\u8F66\u957F": "li\xE8 ch\u0113 zh\u01CEng", "\u56DE\u65CB\u66F2": "hu\xED xu\xE1n q\u01D4", "\u534E\u8FBE\u5462": "hu\xE1 d\xE1 n\xED", "\u72AF\u5F97\u7740": "f\xE0n de zh\xE1o", "\u571F\u7599\u7629": "t\u01D4 g\u0113 da", "\u715E\u98CE\u666F": "sh\u0101 f\u0113ng j\u01D0ng", "\u8F7B\u91CF\u7EA7": "q\u012Bng li\xE0ng j\xED", "\u7F9E\u7B54\u7B54": "xi\u016B d\u0101 d\u0101", "\u77F3\u5B50\u513F": "sh\xED z\u01D0 er", "\u5927\u5E3D\u5B50": "d\xE0 m\xE0o zi", "\u8FBE\u59C6\u5F39": "d\xE1 m\u01D4 d\xE0n", "\u6447\u7BEE\u66F2": "y\xE1o l\xE1n q\u01D4", "\u79D1\u6559\u7247": "k\u0113 ji\xE0o pi\u0101n", "\u4F83\u5927\u5C71": "k\u01CEn t\xE0i sh\u0101n", "\u4E01\u70B9\u513F": "d\u012Bng di\u01CEn er", "\u5403\u5F97\u6D88": "ch\u012B de xi\u0101o", "\u634B\u864E\u987B": "lu\u014D h\u01D4 x\u016B", "\u95F4\u594F\u66F2": "ji\xE0n z\xF2u q\u01D4", "\u9AD8\u4E3D\u53C2": "g\u0101o l\xED sh\u0113n", "\u5B89\u9B42\u66F2": "\u0101n h\xFAn q\u01D4", "\u4F17\u751F\u76F8": "zh\xF2ng sh\u0113ng xi\xE0ng", "\u54BD\u5CE1\u708E": "y\u0101n xi\xE1 y\xE1n", "\u7981\u5F97\u4F4F": "j\u012Bn de zh\xF9", "\u6253\u62CD\u5B50": "d\u01CE p\u0101i zi", "\u50AC\u7720\u66F2": "cu\u012B mi\xE1n q\u01D4", "\u81ED\u67B6\u5B50": "ch\xF2u ji\xE0 zi", "\u5403\u5F97\u5F00": "ch\u012B de k\u0101i", "\u67DE\u4E1D\u7EF8": "zu\xF2 s\u012B ch\xF3u", "\u5E94\u58F0\u866B": "y\xECng sh\u0113ng ch\xF3ng", "\u6570\u5F97\u7740": "sh\u01D4 de zh\xE1o", "\u50BB\u52B2\u513F": "sh\u01CE j\xECn er", "\u94C5\u73BB\u7483": "qi\u0101n b\u014D li", "\u62B9\u4E0D\u5F00": "m\xF2 b\xF9 k\u0101i", "\u53EF\u7684\u677E": "k\u011B d\xEC s\u014Dng", "\u5212\u5F97\u6765": "hu\xE1 de l\xE1i", "\u7EA2\u5E3D\u5B50": "h\xF3ng m\xE0o zi", "\u5B69\u5B50\u738B": "h\xE1i zi w\xE1ng", "\u6655\u4E4E\u4E4E": "y\xF9n h\u016B h\u016B", "\u53F0\u67F1\u5B50": "t\xE1i zh\xF9 zi", "\u5C4E\u58F3\u90CE": "sh\u01D0 ke l\xE0ng", "\u5C25\u8E76\u5B50": "li\xE0o ju\xE9 z\u01D0", "\u7A7A\u67B6\u5B50": "k\u014Dng ji\xE0 zi", "\u85CF\u7EA2\u82B1": "z\xE0ng h\xF3ng hu\u0101", "\u8BF4\u4E0D\u7740": "shu\u014D b\xF9 zh\xE1o", "\u95F7\u7F50\u8F66": "m\xE8n gu\xE0n ch\u0113", "\u5361\u8116\u5B50": "qi\u01CE b\xF3 zi", "\u7EA2\u6F84\u6F84": "h\xF3ng deng deng", "\u8D76\u5F97\u53CA": "g\u01CEn de j\xED", "\u5F53\u95F4\u513F": "d\u0101ng ji\xE0n \xE9r", "\u9732\u9A6C\u811A": "l\xF2u m\u01CE ji\u01CEo", "\u9E21\u5185\u91D1": "j\u012B n\xE0 j\u012Bn", "\u72AF\u5F97\u4E0A": "f\xE0n d\u011Bi sh\xE0ng", "\u9489\u9F7F\u8019": "d\u012Bng ch\u01D0 b\xE0", "\u9971\u548C\u70B9": "b\u01CEo hu\xF3 di\u01CEn", "\u6587\u66F2\u661F": "w\xE9n q\u01D4 x\u012Bng", "\u7FD8\u8FAB\u5B50": "qi\xE0o bi\xE0n zi", "\u9F99\u722A\u69D0": "l\xF3ng zh\u01CEo hu\xE1i", "\u559D\u5012\u5F69": "h\xE8 d\xE0o c\u01CEi", "\u9E3D\u5B50\u7B3C": "g\u0113 zi l\xF3ng", "\u5B9A\u51A0\u8BCD": "d\xECng gu\xE0n c\xED", "\u62C5\u62C5\u9762": "d\xE0n dan mi\xE0n", "\u5403\u5F97\u4F4F": "ch\u012B de zh\xF9", "\u722A\u5C16\u513F": "zhu\u01CE ji\u0101n er", "\u652F\u7740\u513F": "zh\u012B zh\u0101o \xE9r", "\u6298\u8DDF\u5934": "zh\u0113 g\u0113n tou", "\u70B8\u4E38\u5B50": "zh\xE1 w\xE1n z\u01D0", "\u9634\u7740\u513F": "y\u012Bn zh\u0101o \xE9r", "\u70DF\u5377\u513F": "y\u0101n ju\u01CEn \xE9r", "\u5BA3\u4F20\u5F39": "xu\u0101n chu\xE1n d\xE0n", "\u4FE1\u76AE\u513F": "x\xECn p\xED er", "\u5F26\u5207\u89D2": "xi\xE1n qi\u0113 ji\u01CEo", "\u8DF3\u623F\u5B50": "ti\xE0o f\xE1ng zi", "\u7F29\u7802\u5BC6": "s\xF9 sh\u0101 m\xEC", "\u8BF4\u5F97\u6765": "shu\u014D de l\xE1i", "\u6C34\u6F02\u513F": "shu\u01D0 pi\u01CEo \xE9r", "\u800D\u7B14\u6746": "shu\u01CE b\u01D0 g\u01CEn", "\u6570\u5F97\u4E0A": "sh\u01D4 d\u011Bi sh\xE0ng", "\u6570\u4E0D\u7740": "sh\u01D4 b\xF9 zh\xE1o", "\u6570\u4E0D\u6E05": "sh\u01D4 b\xF9 q\u012Bng", "\u4EC0\u4EF6\u513F": "sh\xED ji\xE0n \xE9r", "\u72EE\u5B50\u4F1A": "sh\u012B zi hu\xEC", "\u751F\u6B7B\u7C3F": "sh\u0113ng s\u01D0 b\xF9", "\u6247\u98CE\u673A": "sh\u0101n f\u0113ng j\u012B", "\u6563\u644A\u5B50": "s\xE0n t\u0101n zi", "\u6492\u5453\u6323": "s\u0101 y\xEC zh\u0113ng", "\u65E5\u8BB0\u7C3F": "r\xEC j\xEC b\xF9", "\u70ED\u5F97\u5FEB": "r\xE8 de ku\xE0i", "\u66F2\u522B\u9488": "q\u01D4 bi\xE9 zh\u0113n", "\u4EB2\u5BB6\u516C": "q\xECng ji\u0101 g\u014Dng", "\u5947\u51FD\u6570": "j\u012B h\xE1n sh\xF9", "\u70AE\u5B50\u513F": "p\xE0o z\u01D0 er", "\u62CD\u7EB8\u7C3F": "p\u0101i zh\u01D0 b\xF9", "\u52AA\u52B2\u513F": "n\u01D4 j\xECn er", "\u6CE5\u5A03\u5A03": "n\xED w\xE1 wa", "\u5185\u5207\u5706": "n\xE8i qi\u0113 yu\xE1n", "\u54EA\u4F1A\u513F": "n\u011Bi hu\xEC er", "\u6478\u4E0D\u7740": "m\u014D b\xF9 zh\xE1o", "\u95F7\u5934\u513F": "m\xE8n tou er", "\u6CA1\u8C31\u513F": "m\xE9i p\u01D4 er", "\u94C6\u52B2\u513F": "m\u01CEo j\xECn er", "\u6E9C\u80A9\u8180": "li\u016B ji\u0101n b\u01CEng", "\u4E86\u671B\u53F0": "li\xE0o w\xE0ng t\xE1i", "\u8001\u6765\u5C11": "l\u01CEo l\xE1i sh\xE0o", "\u5764\u89D2\u513F": "k\u016Bn ju\xE9 \xE9r", "\u8003\u52E4\u7C3F": "k\u01CEo q\xEDn b\xF9", "\u5377\u7B14\u5200": "ju\u01CEn b\u01D0 d\u0101o", "\u4E5D\u91CD\u9704": "ji\u01D4 ch\xF3ng xi\u0101o", "\u8FDB\u7ED9\u91CF": "j\xECn j\u01D0 li\xE0ng", "\u5212\u4E0D\u6765": "hu\xE1 b\xF9 l\xE1i", "\u6C57\u8902\u513F": "h\xE0n gu\xE0 er", "\u9F13\u56CA\u56CA": "g\u01D4 n\u0101ng nang", "\u591F\u52B2\u513F": "g\xF2u j\xECn er", "\u516C\u5207\u7EBF": "g\u014Dng qi\u0113 xi\xE0n", "\u6401\u5F97\u4F4F": "g\xE9 de zh\xF9", "\u6401\u4E0D\u4F4F": "g\xE9 b\xFA zh\xF9", "\u8D76\u6D6A\u5934": "g\u01CEn l\xE0ng t\xF3u", "\u8D76\u5F97\u4E0A": "g\u01CEn d\u011Bi sh\xE0ng", "\u5E72\u9175\u6BCD": "g\xE0n ji\xE0o m\u01D4", "\u560E\u6E23\u513F": "g\u0101 zh\u0101 \xE9r", "\u560E\u5623\u8106": "g\u0101 b\u0113ng cu\xEC", "\u5BF9\u5F97\u4F4F": "du\xEC de zh\xF9", "\u9017\u95F7\u5B50": "d\xF2u m\xE8n z\u01D0", "\u8C46\u89D2\u513F": "d\xF2u ju\xE9 \xE9r", "\u9876\u5471\u5471": "d\u01D0ng gu\u0101 gu\u0101", "\u6EF4\u6E9C\u513F": "d\u012B li\xF9 \xE9r", "\u5927\u8F74\u5B50": "d\xE0 zh\xF2u z\u01D0", "\u6253\u677F\u5B50": "d\u01CE b\u01CEn zi", "\u5BF8\u52B2\u513F": "c\xF9n j\xECn er", "\u918B\u52B2\u513F": "c\xF9 j\xECn er", "\u521B\u724C\u5B50": "chu\xE0ng p\xE1i zi", "\u63E3\u624B\u513F": "chu\u0101i sh\u01D2u er", "\u51B2\u52B2\u513F": "ch\xF2ng j\xECn er", "\u5403\u5F97\u6765": "ch\u012B de l\xE1i", "\u4E0D\u66F4\u4E8B": "b\xF9 g\u0113ng sh\xEC", "\u5954\u5934\u513F": "b\xE8n tou er", "\u767E\u592B\u957F": "b\u01CEi f\u016B zh\u01CEng", "\u5A03\u5A03\u4EB2": "w\xE1 wa q\u012Bn", "\u6B7B\u52B2\u513F": "s\u01D0 j\xECng er", "\u9AA8\u6735\u513F": "g\u016B du\u01D2 er", "\u529F\u52B3\u7C3F": "g\u014Dng l\xE1o b\xF9" }, { "\u6210\u5409\u601D\u6C57": "ch\xE9ng j\xED s\u012B h\xE1n", "\u56DB\u901A\u516B\u8FBE": "s\xEC t\u014Dng b\u0101 d\xE1", "\u4E00\u6A21\u4E00\u6837": "y\u012B m\xFA y\u012B y\xE0ng", "\u9752\u85CF\u9AD8\u539F": "q\u012Bng z\xE0ng g\u0101o yu\xE1n", "\u963F\u5F25\u9640\u4F5B": "\u0113 m\xED tu\xF3 f\xF3", "\u89E3\u653E\u601D\u60F3": "ji\xE8 f\xE0ng s\u012B xi\u01CEng", "\u591A\u79CD\u591A\u6837": "du\u014D zh\u01D2ng du\u014D y\xE0ng", "\u6240\u4F5C\u6240\u4E3A": "su\u01D2 zu\xF2 su\u01D2 w\xE9i", "\u8FF7\u8FF7\u7CCA\u7CCA": "m\xED m\xED hu h\u016B", "\u8377\u67AA\u5B9E\u5F39": "h\xE8 qi\u0101ng sh\xED d\xE0n", "\u5174\u9AD8\u91C7\u70C8": "x\xECng g\u0101o c\u01CEi li\xE8", "\u65E0\u80FD\u4E3A\u529B": "w\xFA n\xE9ng w\xE9i l\xEC", "\u878D\u4E3A\u4E00\u4F53": "r\xF3ng w\xE9i y\u012B t\u01D0", "\u5E03\u9C81\u585E\u5C14": "b\xF9 l\u01D4 s\xE0i \u011Br", "\u4E3A\u6240\u6B32\u4E3A": "w\xE9i su\u01D2 y\xF9 w\xE9i", "\u5BA1\u65F6\u5EA6\u52BF": "sh\u011Bn sh\xED du\xF3 sh\xEC", "\u514B\u4EC0\u7C73\u5C14": "k\xE8 sh\xED m\u01D0 \u011Br", "\u6CA1\u5B8C\u6CA1\u4E86": "m\xE9i w\xE1n m\xE9i li\u01CEo", "\u4E0D\u4E3A\u4EBA\u77E5": "b\xF9 w\xE9i r\xE9n zh\u012B", "\u7ED3\u7ED3\u5DF4\u5DF4": "ji\u0113 ji\u0113 b\u0101 b\u0101", "\u5DF4\u5C14\u5E72\u534A\u5C9B": "b\u0101 \u011Br g\xE0n b\xE0n d\u01CEo", "\u524D\u4EC6\u540E\u7EE7": "qi\xE1n p\u016B h\xF2u j\xEC", "\u4E00\u5E74\u4E00\u5EA6": "y\xEC ni\xE1n y\xED d\xF9", "\u5404\u884C\u5404\u4E1A": "g\xE8 h\xE1ng g\xE8 y\xE8", "\u5E03\u5C14\u4EC0\u7EF4\u514B": "b\xF9 \u011Br sh\xED w\xE9i k\xE8", "\u5408\u4E8C\u4E3A\u4E00": "h\xE9 \xE8r w\xE9i y\u012B", "\u88AB\u5B50\u690D\u7269": "b\xE8i z\u01D0 zh\xED w\xF9", "\u94FA\u5929\u76D6\u5730": "p\u016B ti\u0101n g\xE0i d\xEC", "\u76F4\u622A\u4E86\u5F53": "zh\xED ji\xE9 li\u01CEo d\xE0ng", "\u4F9B\u4E0D\u5E94\u6C42": "g\u014Dng b\xF9 y\xECng qi\xFA", "\u5FA1\u53F2\u5927\u592B": "y\xF9 sh\u01D0 d\xE0 f\u016B", "\u4E0D\u4E3A\u74E6\u5168": "b\xF9 w\xE9i w\u01CE qu\xE1n", "\u4E0D\u53EF\u6536\u62FE": "b\xF9 k\u011B sh\u014Du shi", "\u80E1\u4F5C\u975E\u4E3A": "h\xFA zu\xF2 f\u0113i w\xE9i", "\u5206\u6BEB\u4E0D\u5DEE": "f\u0113n h\xE1o b\xF9 ch\u0101", "\u6A21\u6A21\u7CCA\u7CCA": "m\xF3 m\xF3 hu h\u016B", "\u4E0D\u8DB3\u4E3A\u5947": "b\xF9 z\xFA w\xE9i q\xED", "\u5982\u4E4B\u5948\u4F55": "r\xFA zh\u012B nai h\xE9", "\u6084\u65E0\u58F0\u606F": "qi\u01CEo w\xFA sh\u0113ng x\u012B", "\u5377\u571F\u91CD\u6765": "ju\u01CEn t\u01D4 ch\xF3ng l\xE1i", "\u4E86\u5982\u6307\u638C": "li\u01CEo r\xFA zh\u01D0 zh\u01CEng", "\u6DF1\u6076\u75DB\u7EDD": "sh\u0113n w\xF9 t\xF2ng ju\xE9", "\u9AD8\u9AD8\u5174\u5174": "g\u0101o g\u0101o x\xECng x\xECng", "\u5509\u58F0\u53F9\u6C14": "\u0101i sh\u0113ng t\xE0n q\xEC", "\u6DF7\u4E3A\u4E00\u8C08": "h\xF9n w\xE9i y\u012B t\xE1n", "\u4E0D\u4E86\u4E86\u4E4B": "b\xF9 li\u01CEo li\u01CEo zh\u012B", "\u6C49\u85CF\u8BED\u7CFB": "h\xE0n z\xE0ng y\u01D4 x\xEC", "\u5904\u5FC3\u79EF\u8651": "ch\u01D4 x\u012Bn j\u012B l\u01DC", "\u6CE3\u4E0D\u6210\u58F0": "q\u01D0 b\xF9 ch\xE9ng sh\u0113ng", "\u534A\u591C\u4E09\u66F4": "b\xE0n y\xE8 s\u0101n g\u0113ng", "\u5931\u9B42\u843D\u9B44": "sh\u012B h\xFAn lu\xF2 p\xF2", "\u4E8C\u5341\u516B\u5BBF": "\xE8r sh\xED b\u0101 xi\xF9", "\u8F6C\u6765\u8F6C\u53BB": "zhu\xE0n l\xE1i zhu\xE0n q\xF9", "\u6570\u4EE5\u4E07\u8BA1": "sh\u01D4 y\u01D0 w\xE0n j\xEC", "\u76F8\u4F9D\u4E3A\u547D": "xi\u0101ng y\u012B w\xE9i m\xECng", "\u604B\u604B\u4E0D\u820D": "li\xE0n li\xE0n b\xF9 sh\u011B", "\u5C48\u6307\u53EF\u6570": "q\u016B zh\u01D0 k\u011B sh\u01D4", "\u795E\u51FA\u9B3C\u6CA1": "sh\xE9n ch\u016B gu\u01D0 m\xF2", "\u7ED3\u7ED3\u5B9E\u5B9E": "ji\u0113 ji\u0113 sh\xED sh\xED", "\u6709\u7684\u653E\u77E2": "y\u01D2u d\xEC f\xE0ng sh\u01D0", "\u53FD\u54E9\u5495\u565C": "j\u012B l\u01D0 g\u016B l\u016B", "\u5408\u800C\u4E3A\u4E00": "h\xE9 \xE9r w\xE9i y\u012B", "\u8C03\u5175\u9063\u5C06": "di\xE0o b\u012Bng qi\u01CEn ji\xE0ng", "\u8F7D\u6B4C\u8F7D\u821E": "z\xE0i g\u0113 z\xE0i w\u01D4", "\u8F6C\u5371\u4E3A\u5B89": "zhu\u01CEn w\u0113i w\xE9i \u0101n", "\u8E0F\u8E0F\u5B9E\u5B9E": "t\u0101 t\u0101 shi sh\xED", "\u6851\u7ED9\u5DF4\u5C14": "s\u0101ng j\u01D0 b\u0101 \u011Br", "\u88C5\u6A21\u4F5C\u6837": "zhu\u0101ng m\xFA zu\xF2 y\xE0ng", "\u89C1\u4E49\u52C7\u4E3A": "ji\xE0n y\xEC y\u01D2ng w\xE9i", "\u76F8\u5DEE\u65E0\u51E0": "xi\u0101ng ch\u0101 w\xFA j\u01D0", "\u53F9\u4E3A\u89C2\u6B62": "t\xE0n w\xE9i gu\u0101n zh\u01D0", "\u95F7\u95F7\u4E0D\u4E50": "m\xE8n m\xE8n b\xF9 l\xE8", "\u559C\u6012\u54C0\u4E50": "x\u01D0 n\xF9 \u0101i l\xE8", "\u9C9C\u4E3A\u4EBA\u77E5": "xi\u01CEn w\xE9i r\xE9n zh\u012B", "\u5F20\u7259\u821E\u722A": "zh\u0101ng y\xE1 w\u01D4 zh\u01CEo", "\u4E3A\u975E\u4F5C\u6B79": "w\xE9i f\u0113i zu\xF2 d\u01CEi", "\u4E00\u8E76\u4E0D\u632F": "y\u012B ju\xE9 b\xF9 zh\xE8n", "\u542B\u7CCA\u5176\u8F9E": "h\xE1n h\xFA q\xED c\xED", "\u75B2\u4E8E\u5954\u547D": "p\xED y\xFA b\u0113n m\xECng", "\u52C9\u4E3A\u5176\u96BE": "mi\u01CEn w\xE9i q\xED n\xE1n", "\u4F9D\u4F9D\u4E0D\u820D": "y\u012B y\u012B b\xF9 sh\u011B", "\u4F55\u4E50\u800C\u4E0D\u4E3A": "h\xE9 l\xE8 \xE9r b\xF9 w\xE9i", "\u9876\u5934\u4E0A\u53F8": "d\u01D0ng t\xF3u sh\xE0ng si", "\u4E0D\u7740\u8FB9\u9645": "b\xF9 zhu\xF3 bi\u0101n j\xEC", "\u5927\u6A21\u5927\u6837": "d\xE0 m\xFA d\xE0 y\xE0ng", "\u5BFB\u6B22\u4F5C\u4E50": "x\xFAn hu\u0101n zu\xF2 l\xE8", "\u4E00\u8D70\u4E86\u4E4B": "y\u012B z\u01D2u li\u01CEo zh\u012B", "\u4E00\u5E74\u5230\u5934": "y\xEC ni\xE1n d\xE0o t\xF3u", "\u5B57\u91CC\u884C\u95F4": "z\xEC l\u01D0 h\xE1ng ji\u0101n", "\u542B\u542B\u7CCA\u7CCA": "h\xE1n h\xE1n hu h\u016B", "\u6570\u4E00\u6570\u4E8C": "sh\u01D4 y\u012B sh\u01D4 \xE8r", "\u6070\u5982\u5176\u5206": "qi\xE0 r\xFA q\xED f\xE8n", "\u7834\u6D95\u4E3A\u7B11": "p\xF2 t\xEC w\xE9i xi\xE0o", "\u5148\u4E0B\u624B\u4E3A\u5F3A": "xi\u0101n xi\xE0 sh\u01D2u w\xE9i qi\xE1ng", "\u6DF1\u66F4\u534A\u591C": "sh\u0113n g\u0113ng b\xE0n y\xE8", "\u5343\u5DEE\u4E07\u522B": "qi\u0101n ch\u0101 w\xE0n bi\xE9", "\u6570\u4E0D\u80DC\u6570": "sh\u01D4 b\xF9 sh\xE8ng sh\u01D4", "\u636E\u4E3A\u5DF1\u6709": "j\xF9 w\xE9i j\u01D0 y\u01D2u", "\u5929\u65CB\u5730\u8F6C": "ti\u0101n xu\xE1n d\xEC zhu\xE0n", "\u517B\u5C0A\u5904\u4F18": "y\u01CEng z\u016Bn ch\u01D4 y\u014Du", "\u73BB\u7483\u7EA4\u7EF4": "b\u014D li xi\u0101n w\xE9i", "\u5435\u5435\u95F9\u95F9": "ch\u0101o chao n\xE0o n\xE0o", "\u6655\u5934\u8F6C\u5411": "y\u016Bn t\xF3u zhu\xE0n xi\xE0ng", "\u571F\u751F\u571F\u957F": "t\u01D4 sh\u0113ng t\u01D4 zh\u01CEng", "\u5B81\u6B7B\u4E0D\u5C48": "n\xECng s\u01D0 b\xF9 q\u016B", "\u4E0D\u7701\u4EBA\u4E8B": "b\xF9 x\u01D0ng r\xE9n sh\xEC", "\u5C3D\u529B\u800C\u4E3A": "j\xECn l\xEC \xE9r w\xE9i", "\u7CBE\u660E\u5F3A\u5E72": "j\u012Bng m\xEDng qi\xE1ng g\xE0n", "\u5520\u5520\u53E8\u53E8": "l\xE1o lao d\u0101o d\u0101o", "\u53FD\u53FD\u55B3\u55B3": "j\u012B ji zh\u0101 zh\u0101", "\u529F\u4E0D\u53EF\u6CA1": "g\u014Dng b\xF9 k\u011B m\xF2", "\u9532\u800C\u4E0D\u820D": "qi\xE8 \xE9r b\xF9 sh\u011B", "\u6392\u5FE7\u89E3\u96BE": "p\xE1i y\u014Du ji\u011B n\xE0n", "\u7A00\u91CC\u7CCA\u6D82": "x\u012B li h\xFA t\xFA", "\u5F02\u66F2\u540C\u5DE5": "y\xEC q\u01D4 t\xF3ng g\u014Dng", "\u5404\u6709\u6240\u957F": "g\xE8 y\u01D2u su\u01D2 ch\xE9ng", "\u7684\u7684\u786E\u786E": "d\xED d\xED qu\xE8 qu\xE8", "\u4E00\u8A00\u4E3A\u5B9A": "y\u012B y\xE1n w\xE9i d\xECng", "\u54C4\u5802\u5927\u7B11": "h\u014Dng t\xE1ng d\xE0 xi\xE0o", "\u542C\u800C\u4E0D\u95FB": "t\u012Bng \xE9r b\xFA w\xE9n", "\u5200\u8015\u706B\u79CD": "d\u0101o g\u0113ng hu\u01D2 zh\xF2ng", "\u8BF4\u4E0D\u8FC7\u53BB": "shu\u014D bu gu\xF2 q\xF9", "\u5185\u5206\u6CCC\u817A": "n\xE8i f\xE8n m\xEC xi\xE0n", "\u5316\u9669\u4E3A\u5937": "hu\xE0 xi\u01CEn w\xE9i y\xED", "\u767E\u53D1\u767E\u4E2D": "b\u01CEi f\u0101 b\u01CEi zh\xF2ng", "\u91CD\u89C1\u5929\u65E5": "ch\xF3ng ji\xE0n ti\u0101n r\xEC", "\u53CD\u8D25\u4E3A\u80DC": "f\u01CEn b\xE0i w\xE9i sh\xE8ng", "\u4E00\u4E86\u767E\u4E86": "y\u012B li\u01CEo b\u01CEi li\u01CEo", "\u5927\u5927\u54A7\u54A7": "d\xE0 da li\u0113 li\u0113", "\u5FC3\u6025\u706B\u71CE": "x\u012Bn j\xED hu\u01D2 li\u01CEo", "\u7C97\u5FC3\u5927\u610F": "c\u016B x\u012Bn d\xE0 yi", "\u9E21\u76AE\u7599\u7629": "j\u012B p\xED g\u0113 da", "\u5937\u4E3A\u5E73\u5730": "y\xED w\xE9i p\xEDng d\xEC", "\u65E5\u79EF\u6708\u7D2F": "r\xEC j\u012B yu\xE8 l\u011Bi", "\u8BBE\u8EAB\u5904\u5730": "sh\xE8 sh\u0113n ch\u01D4 d\xEC", "\u6295\u5176\u6240\u597D": "t\xF3u q\xED su\u01D2 h\xE0o", "\u95F4\u4E0D\u5BB9\u53D1": "ji\u0101n b\xF9 r\xF3ng f\xE0", "\u4EBA\u6EE1\u4E3A\u60A3": "r\xE9n m\u01CEn w\xE9i hu\xE0n", "\u7A77\u8FFD\u4E0D\u820D": "qi\xF3ng zhu\u012B b\xF9 sh\u011B", "\u4E3A\u65F6\u5DF2\u665A": "w\xE9i sh\xED y\u01D0 w\u01CEn", "\u5982\u6570\u5BB6\u73CD": "r\xFA sh\u01D4 ji\u0101 zh\u0113n", "\u5FC3\u91CC\u6709\u6570": "x\u012Bn l\u01D0 y\u01D2u sh\xF9", "\u4E00\u76D8\u6563\u6C99": "y\u012B p\xE1n s\u01CEn sh\u0101", "\u4EE5\u7259\u8FD8\u7259": "y\u01D0 y\xE1 hu\xE1n y\xE1", "\u795E\u4E0D\u5B88\u820D": "sh\xE9n b\xF9 sh\u01D2u sh\u011B", "\u5B5F\u4EC0\u7EF4\u514B": "m\xE8ng sh\xED w\xE9i k\xE8", "\u5404\u81EA\u4E3A\u6218": "g\xE8 z\xEC w\xE9i zh\xE0n", "\u6028\u58F0\u8F7D\u9053": "yu\xE0n sh\u0113ng z\xE0i d\xE0o", "\u4E00\u54C4\u800C\u6563": "y\u012B h\xF2ng \xE9r s\xE0n", "\u4E9A\u5F97\u91CC\u4E9A\u6D77": "y\xE0 de l\u01D0 y\xE0 h\u01CEi", "\u6551\u82E6\u6551\u96BE": "ji\xF9 k\u01D4 ji\xF9 n\xE0n", "\u597D\u597D\u5148\u751F": "h\u01CEo h\u01CEo xi\u0101n sheng", "\u602A\u6A21\u602A\u6837": "gu\xE0i m\xFA gu\xE0i y\xE0ng", "\u629B\u5934\u9732\u9762": "p\u0101o t\xF3u l\xF9 mi\xE0n", "\u6E38\u624B\u597D\u95F2": "y\xF3u sh\u01D2u h\xE0o xi\xE1n", "\u65E0\u6240\u4E0D\u4E3A": "w\xFA su\u01D2 b\xF9 w\xE9i", "\u8C03\u864E\u79BB\u5C71": "di\xE0o h\u01D4 l\xED sh\u0101n", "\u6B65\u6B65\u4E3A\u8425": "b\xF9 b\xF9 w\xE9i y\xEDng", "\u597D\u5927\u559C\u529F": "h\xE0o d\xE0 x\u01D0 g\u014Dng", "\u4F17\u77E2\u4E4B\u7684": "zh\xF2ng sh\u01D0 zh\u012B d\xEC", "\u957F\u751F\u4E0D\u6B7B": "ch\xE1ng sh\u0113ng b\u016B s\u01D0", "\u851A\u4E3A\u58EE\u89C2": "w\xE8i w\xE9i zhu\xE0ng gu\u0101n", "\u4E0D\u53EF\u80DC\u6570": "b\xF9 k\u011B sh\xE8ng sh\u01D4", "\u9B3C\u4F7F\u795E\u5DEE": "gu\u01D0 sh\u01D0 sh\xE9n ch\u0101i", "\u6D01\u8EAB\u81EA\u597D": "ji\xE9 sh\u0113n z\xEC h\xE0o", "\u6562\u4F5C\u6562\u4E3A": "g\u01CEn zu\xF2 g\u01CEn w\xE9i", "\u8499\u5F97\u7EF4\u7684\u4E9A": "m\xE9ng de w\xE9i de y\xE0", "\u5DF4\u5C14\u5580\u4EC0\u6E56": "b\u0101 \u011Br k\u0101 sh\xED h\xFA", "\u8305\u585E\u987F\u5F00": "m\xE1o s\xE8 d\xF9n k\u0101i", "\u8D70\u9A6C\u6362\u5C06": "z\u01D2u m\u01CE hu\xE0n ji\xE0ng", "\u4E3A\u65F6\u8FC7\u65E9": "w\xE9i sh\xED gu\xF2 z\u01CEo", "\u4E3A\u4EBA\u5E08\u8868": "w\xE9i r\xE9n sh\u012B bi\u01CEo", "\u9634\u5DEE\u9633\u9519": "y\u012Bn ch\u0101 y\xE1ng cu\xF2", "\u6CB9\u8154\u6ED1\u8C03": "y\xF3u qi\u0101ng hu\xE1 di\xE0o", "\u91CD\u8E48\u8986\u8F99": "ch\xF3ng d\u01CEo f\xF9 zh\xE9", "\u9A82\u9A82\u54A7\u54A7": "m\xE0 ma li\u0113 li\u0113", "\u7D6E\u7D6E\u53E8\u53E8": "x\xF9 x\xF9 d\u0101o d\u0101o", "\u5982\u5C65\u8584\u51B0": "r\xFA l\u01DA b\xF3 b\u012Bng", "\u635F\u5175\u6298\u5C06": "s\u01D4n b\u012Bng zh\xE9 ji\xE0ng", "\u65E0\u53EF\u6BD4\u62DF": "w\xFA k\u011B b\u01D0 n\xEC", "\u62D0\u5F2F\u62B9\u89D2": "gu\u01CEi w\u0101n m\xF2 ji\u01CEo", "\u50CF\u6A21\u50CF\u6837": "xi\xE0ng m\xFA xi\xE0ng y\xE0ng", "\u4F9B\u8FC7\u4E8E\u6C42": "g\u014Dng gu\xF2 y\xFA qi\xFA", "\u5F00\u82B1\u7ED3\u679C": "k\u0101i hu\u0101 ji\u0113 gu\u01D2", "\u4ED4\u4ED4\u7EC6\u7EC6": "z\u01D0 z\u01D0 x\xEC x\xEC", "\u5DDD\u85CF\u516C\u8DEF": "chu\u0101n z\xE0ng g\u014Dng l\xF9", "\u6CB3\u5317\u6886\u5B50": "h\xE9 b\u011Bi b\u0101ng zi", "\u957F\u5E74\u7D2F\u6708": "ch\xE1ng ni\xE1n l\u011Bi yu\xE8", "\u6B63\u513F\u516B\u7ECF": "zh\xE8ng er b\u0101 j\u012Bng", "\u4E0D\u8BC6\u62AC\u4E3E": "b\xF9 sh\xED t\xE1i ju", "\u91CD\u632F\u65D7\u9F13": "ch\xF3ng zh\xE8n q\xED g\u01D4", "\u6C14\u606F\u5944\u5944": "q\xEC x\u012B y\u0101n y\u0101n", "\u7D27\u8FFD\u4E0D\u820D": "j\u01D0n zhu\u012B b\xF9 sh\u011B", "\u670D\u670D\u5E16\u5E16": "f\xFA fu ti\u0113 ti\u0113", "\u5F3A\u8BCD\u593A\u7406": "qi\u01CEng c\xED du\xF3 l\u01D0", "\u567C\u91CC\u556A\u5566": "p\u012B li p\u0101 l\u0101", "\u4EBA\u624D\u6D4E\u6D4E": "r\xE9n c\xE1i j\u01D0 j\u01D0", "\u53D1\u4EBA\u6DF1\u7701": "f\u0101 r\xE9n sh\u0113n x\u01D0ng", "\u4E0D\u8DB3\u4E3A\u51ED": "b\xF9 z\xFA w\xE9i p\xEDng", "\u4E3A\u5BCC\u4E0D\u4EC1": "w\xE9i f\xF9 b\xF9 r\xE9n", "\u8FDE\u7BC7\u7D2F\u724D": "li\xE1n pi\u0101n l\u011Bi d\xFA", "\u547C\u5929\u62A2\u5730": "h\u016B ti\u0101n qi\u0101ng d\xEC", "\u843D\u843D\u5927\u65B9": "lu\xF2 lu\xF2 d\xE0 f\u0101ng", "\u81EA\u5439\u81EA\u64C2": "z\xEC chu\u012B z\xEC l\xE9i", "\u4E50\u5584\u597D\u65BD": "l\xE8 sh\xE0n h\xE0o sh\u012B", "\u4EE5\u653B\u4E3A\u5B88": "y\u01D0 g\u014Dng w\xE9i sh\u01D2u", "\u78E8\u78E8\u8E6D\u8E6D": "m\xF3 m\xF3 c\xE8ng c\xE8ng", "\u524A\u94C1\u5982\u6CE5": "xu\u0113 ti\u011B r\xFA n\xED", "\u52A9\u7EA3\u4E3A\u8650": "zh\xF9 zh\xF2u w\xE9i n\xFC\xE8", "\u4EE5\u9000\u4E3A\u8FDB": "y\u01D0 tu\xEC w\xE9i j\xECn", "\u91CD\u6574\u65D7\u9F13": "ch\xF3ng zh\u011Bng q\xED g\u01D4", "\u5601\u5601\u55B3\u55B3": "q\u012B q\u012B ch\u0101 ch\u0101", "\u67AA\u6797\u5F39\u96E8": "qi\u0101ng l\xEDn d\xE0n y\u01D4", "\u98CE\u60C5\u4E07\u79CD": "f\u0113ng q\xEDng w\xE0n zh\u01D2ng", "\u4EE4\u4EBA\u53D1\u6307": "l\xECng r\xE9n f\xE0 zh\u01D0", "\u8F6C\u8D25\u4E3A\u80DC": "zhu\u01CEn b\xE0i w\xE9i sh\xE8ng", "\u8F6C\u5F2F\u62B9\u89D2": "zhu\u01CEn w\u0101n m\xF2 ji\u01CEo", "\u5728\u52AB\u96BE\u9003": "z\xE0i ji\xE9 n\xE1n t\xE1o", "\u6B63\u5F53\u9632\u536B": "zh\xE8ng d\xE0ng f\xE1ng w\xE8i", "\u4E0D\u8DB3\u4E3A\u602A": "b\xF9 z\xFA w\xE9i gu\xE0i", "\u96BE\u5144\u96BE\u5F1F": "n\xE0n xi\u014Dng n\xE0n d\xEC", "\u54BF\u54BF\u5440\u5440": "y\u012B y\u012B y\u0101 y\u0101", "\u5F39\u5C3D\u7CAE\u7EDD": "d\xE0n j\xECn li\xE1ng ju\xE9", "\u516B\u65D7\u5B50\u5F1F": "b\u0101 q\xED zi d\xEC", "\u963F\u8C00\u5949\u627F": "\u0113 y\xFA f\xE8ng ch\xE9ng", "\u7A00\u91CC\u54D7\u5566": "x\u012B li hu\u0101 l\u0101", "\u8FD4\u8001\u8FD8\u7AE5": "f\u01CEn l\u01CEo hu\xE1n t\xF3ng", "\u597D\u9AD8\u9A9B\u8FDC": "h\xE0o g\u0101o w\xF9 yu\u01CEn", "\u707E\u96BE\u6DF1\u91CD": "z\u0101i n\xE1n sh\u0113n zh\xF2ng", "\u9E7F\u6B7B\u8C01\u624B": "l\xF9 s\u01D0 sh\xE9i sh\u01D2u", "\u5DEE\u5F3A\u4EBA\u610F": "ch\u0101 qi\xE1ng r\xE9n y\xEC", "\u5927\u5439\u5927\u64C2": "d\xE0 chu\u012B d\xE0 l\xE9i", "\u6210\u5BB6\u7ACB\u4E1A": "ch\xE9ng ji\u0101 l\xEC yi\xE8", "\u81EA\u6028\u81EA\u827E": "z\xEC yu\xE0n z\xEC y\xEC", "\u8D1F\u503A\u7D2F\u7D2F": "f\xF9 zhai l\u011Bi l\u011Bi", "\u53E4\u4E3A\u4ECA\u7528": "g\u01D4 w\xE9i j\u012Bn y\xF2ng", "\u5165\u571F\u4E3A\u5B89": "r\xF9 t\u01D4 w\xE9i \u0101n", "\u4E0B\u4E0D\u4E3A\u4F8B": "xi\xE0 b\xF9 w\xE9i l\xEC", "\u4E00\u54C4\u800C\u4E0A": "y\xEC h\u014Dng \xE9r sh\xE0ng", "\u4E00\u80A1\u52B2\u513F": "y\u012B g\u01D4 j\xECn er", "\u6CA1\u5934\u82CD\u8747": "m\xE9i t\xF3u c\u0101ng ying", "\u5929\u5DEE\u5730\u8FDC": "ti\u0101n ch\u0101 d\xEC yu\u01CEn", "\u98CE\u5377\u6B8B\u4E91": "f\u0113ng ju\u01CEn c\xE1n y\xFAn", "\u591A\u707E\u591A\u96BE": "du\u014D z\u0101i du\u014D n\xE0n", "\u4E73\u81ED\u672A\u5E72": "r\u01D4 xi\xF9 w\xE8i g\u0101n", "\u884C\u5BB6\u91CC\u624B": "h\xE1ng ji\u0101 l\u01D0 sh\u01D2u", "\u72FC\u72C8\u4E3A\u5978": "l\xE1ng b\xE8i w\xE9i ji\u0101n", "\u5904\u53D8\u4E0D\u60CA": "ch\u01D4 bi\xE0n b\xF9 j\u012Bng", "\u4E00\u5531\u4E00\u548C": "y\u012B ch\xE0ng y\u012B h\xE8", "\u4E00\u5FF5\u4E4B\u5DEE": "y\u012B ni\xE0n zh\u012B ch\u0101", "\u91D1\u8749\u8131\u58F3": "j\u012Bn ch\xE1n tu\u014D qi\xE0o", "\u6EF4\u6EF4\u7B54\u7B54": "d\u012B d\u012B d\u0101 d\u0101", "\u7855\u679C\u7D2F\u7D2F": "shu\xF2 gu\u01D2 l\xE9i l\xE9i", "\u53EA\u77E5\u5176\u4E00": "zh\u01D0 zh\u012B q\xED y\u012B", "\u597D\u6574\u4EE5\u6687": "h\xE0o zh\u011Bng y\u01D0 xi\xE1", "\u7EA2\u5F97\u53D1\u7D2B": "h\xF3ng de f\u0101 z\u01D0", "\u4F20\u4E3A\u7F8E\u8C08": "chu\xE1n w\xE9i m\u011Bi t\xE1n", "\u5BCC\u5546\u5927\u8D3E": "f\xF9 sh\u0101ng d\xE0 g\u01D4", "\u56DB\u6D77\u4E3A\u5BB6": "s\xEC h\u01CEi w\xE9i ji\u0101", "\u5931\u800C\u590D\u5F97": "sh\u012B \xE9r f\xF9 de", "\u4E86\u82E5\u6307\u638C": "li\u01CEo ru\xF2 zh\u01D0 zh\u01CEng", "\u5927\u6709\u53EF\u4E3A": "d\xE0 y\u01D2u k\u011B w\xE9i", "\u51FA\u5934\u9732\u9762": "ch\u016B t\xF3u l\xF9 mi\xE0n", "\u9F13\u9F13\u56CA\u56CA": "g\u01D4 gu n\u0101ng n\u0101ng", "\u7A97\u660E\u51E0\u51C0": "chu\u0101ng m\xEDng j\u012B j\xECng", "\u6CF0\u7136\u5904\u4E4B": "t\xE0i r\xE1n ch\u01D4 zh\u012B", "\u6012\u53D1\u51B2\u51A0": "n\xF9 f\xE0 ch\u014Dng gu\u0101n", "\u4E0D\u751A\u4E86\u4E86": "b\xF9 sh\xE8n li\u01CEo li\u01CEo", "\u6709\u673A\u73BB\u7483": "y\u01D2u j\u012B b\u014D li", "\u9AA8\u5934\u67B6\u5B50": "g\xFA tou ji\xE0 zi", "\u4E49\u8584\u4E91\u5929": "y\xEC b\xF3 y\xFAn ti\u0101n", "\u4E00\u4E01\u70B9\u513F": "y\u012B d\u012Bng di\u01CEnr", "\u65F6\u6765\u8FD0\u8F6C": "sh\xED l\xE1i y\xF9n zhu\u01CEn", "\u9648\u8BCD\u6EE5\u8C03": "ch\xE9n c\xED l\xE0n di\xE0o", "\u4E03\u5341\u4E8C\u884C": "q\u012B sh\xED \xE8r h\xE1ng", "\u5316\u6574\u4E3A\u96F6": "hu\xE0 zh\u011Bng w\xE9i l\xEDng", "\u7269\u4EE5\u7A00\u4E3A\u8D35": "w\xF9 y\u01D0 x\u012B w\xE9i gu\xEC", "\u6C11\u4EE5\u98DF\u4E3A\u5929": "m\xEDn y\u01D0 sh\xED w\xE9i ti\u0101n", "\u706B\u70E7\u706B\u71CE": "hu\u01D2 sh\u0101o hu\u01D2 li\u01CEo", "\u5E72\u8106\u5229\u7D22": "g\xE0n cu\xEC l\xEC su\u01D2", "\u540A\u513F\u90CE\u5F53": "di\xE0o er l\xE1ng d\u0101ng", "\u5E7F\u79CD\u8584\u6536": "gu\u01CEng zh\xF2ng b\xF3 sh\u014Du", "\u96BE\u820D\u96BE\u5206": "n\xE1n sh\u011B n\xE1n f\u0113n", "\u6B43\u8840\u4E3A\u76DF": "sh\xE0 xu\xE8 w\xE9i m\xE9ng", "\u594B\u53D1\u6709\u4E3A": "f\xE8n f\u0101 y\u01D2u w\xE9i", "\u9634\u9519\u9633\u5DEE": "y\u012Bn cu\xF2 y\xE1ng ch\u0101", "\u4E1C\u8EB2\u897F\u85CF": "d\u014Dng du\u01D2 x\u012B c\xE1ng", "\u70DF\u718F\u706B\u71CE": "y\u0101n x\u016Bn hu\u01D2 li\u01CEo", "\u94BB\u725B\u89D2\u5C16": "zu\u0101n ni\xFA ji\u01CEo ji\u0101n", "\u4E54\u88C5\u6253\u626E": "qi\xE1o zhu\u0101ng d\u01CE b\xE0n", "\u6539\u5F26\u66F4\u5F20": "g\u01CEi xi\xE1n g\u0113ng zh\u0101ng", "\u6CB3\u5357\u6886\u5B50": "h\xE9 n\xE1n b\u0101ng zi", "\u597D\u5403\u61D2\u505A": "h\xE0o ch\u012B l\u01CEn zu\xF2", "\u4F55\u4E50\u4E0D\u4E3A": "h\xE9 l\xE8 b\xF9 w\xE9i", "\u5927\u51FA\u98CE\u5934": "d\xE0 ch\u016B f\u0113ng t\xF3u", "\u653B\u57CE\u63A0\u5730": "g\u014Dng ch\xE9ng l\xFC\u011B d\xEC", "\u6F02\u6F02\u4EAE\u4EAE": "pi\xE0o pi\xE0o liang liang", "\u6298\u8877\u4E3B\u4E49": "zh\xE9 zh\u014Dng zh\u01D4 y\xEC", "\u5927\u9A6C\u54C8\u9C7C": "d\xE0 m\u01CE h\u01CE y\xFA", "\u7EFF\u6811\u6210\u836B": "l\u01DC sh\xF9 ch\xE9ng y\u012Bn", "\u7387\u5148\u5782\u8303": "shu\xE0i xi\u0101n chu\xED f\xE0n", "\u5BB6\u957F\u91CC\u77ED": "ji\u0101 ch\xE1ng l\u01D0 du\u01CEn", "\u5BBD\u5927\u4E3A\u6000": "ku\u0101n d\xE0 w\xE9i hu\xE1i", "\u5DE6\u8180\u53F3\u81C2": "zu\u01D2 b\u01CEng y\xF2u b\xEC", "\u5F71\u5B50\u5185\u9601": "y\u01D0ng zi n\xE8i g\xE9", "\u4E00\u7B11\u4E86\u4E4B": "y\u012B xi\xE0o li\u01CEo zh\u012B", "\u5929\u4E0B\u4E3A\u516C": "ti\u0101n xi\xE0 w\xE9i g\u014Dng", "\u8FD8\u6211\u6CB3\u5C71": "hu\xE1n w\u01D2 h\xE9 sh\u0101n", "\u4F55\u8DB3\u4E3A\u5947": "h\xE9 z\xFA w\xE9i q\xED", "\u597D\u81EA\u4E3A\u4E4B": "h\xE0o z\xEC w\xE9i zh\u012B", "\u98CE\u59FF\u7EF0\u7EA6": "f\u0113ng z\u012B chu\u014D yu\xE9", "\u5927\u96E8\u6EC2\u6CB1": "d\xE0 y\u01D4 p\xE1ng tu\xF3", "\u4F20\u4E3A\u4F73\u8BDD": "chu\xE1n w\xE9i ji\u0101 hu\xE0", "\u5403\u91CC\u6252\u5916": "ch\u012B l\u01D0 p\xE1 w\xE0i", "\u91CD\u64CD\u65E7\u4E1A": "ch\xF3ng c\u0101o ji\xF9 y\xE8", "\u5C0F\u5BB6\u5B50\u6C14": "xi\u01CEo ji\u0101 zi q\xEC", "\u5C11\u4E0D\u66F4\u4E8B": "sh\xE0o b\xF9 g\u0113ng sh\xEC", "\u96BE\u5206\u96BE\u820D": "n\xE1n f\u0113n n\xE1n sh\u011B", "\u53EA\u4E89\u671D\u5915": "zh\u01D0 zh\u0113ng zh\u0101o x\u012B", "\u6DFB\u7816\u52A0\u74E6": "ti\u0101n zhu\u0101n ji\u0113 w\u01CE", "\u662F\u975E\u5206\u660E": "sh\xEC f\u0113i f\u0113n m\xEDng", "\u820D\u6211\u5176\u8C01": "sh\u011B w\u01D2 q\xED shu\xED", "\u504F\u542C\u504F\u4FE1": "pi\u0101n t\u012Bng pi\u0101ng x\xECn", "\u91CF\u5165\u4E3A\u51FA": "li\xE0ng r\xF9 w\xE9i ch\u016B", "\u964D\u9F99\u4F0F\u864E": "xi\xE1ng l\xF3ng f\xFA h\u01D4", "\u6545\u4F0E\u91CD\u6F14": "g\xF9 j\xEC zh\xF2ng y\u01CEn", "\u94A2\u5316\u73BB\u7483": "g\u0101ng hu\xE0 b\u014D li", "\u6709\u9F3B\u5B50\u6709\u773C": "y\u01D2u b\xED zi y\u01D2u y\u01CEn", "\u6B63\u4E2D\u4E0B\u6000": "zh\xE8ng zh\xF2ng xi\xE0 hu\xE1i", "\u4EE5\u8EAB\u8BB8\u56FD": "y\u01D0 sh\u0113ng x\u01D4 gu\xF3", "\u4E00\u8BED\u4E2D\u7684": "y\u012B y\u01D4 zh\u014Dng d\xEC", "\u4E27\u9B42\u843D\u9B44": "s\xE0ng h\xFAn lu\xF2 p\xF2", "\u4E09\u5EA7\u5927\u5C71": "s\u0101n zu\xF2 t\xE0i sh\u0101n", "\u6D4E\u6D4E\u4E00\u5802": "j\u01D0 j\u01D0 y\u012B t\xE1ng", "\u597D\u4E8B\u4E4B\u5F92": "h\xE0o sh\xEC zh\u012B t\xFA", "\u5E72\u51C0\u5229\u7D22": "g\xE0n j\xECng l\xEC su\u01D2", "\u51FA\u5C06\u5165\u76F8": "ch\u016B ji\xE0ng r\xF9 xi\xE0ng", "\u7AF9\u7B52\u5012\u8C46\u5B50": "zh\xFA t\u01D2ng d\u01CEo d\xF2u zi", "\u8885\u8885\u5A1C\u5A1C": "ni\u01CEo ni\u01CEo nu\xF3 nu\xF3", "\u72D0\u72F8\u5C3E\u5DF4": "h\xFA li w\u011Bi ba", "\u597D\u9038\u6076\u52B3": "h\xE0o y\xEC w\xF9 l\xE1o", "\u5927\u800C\u65E0\u5F53": "d\xE0 \xE9r w\xFA d\xE0ng", "\u6253\u9A6C\u864E\u773C": "d\u01CE m\u01CE hu y\u01CEn", "\u677F\u4E0A\u9489\u9489": "b\u01CEn sh\xE0ng d\xECng d\u012Bng", "\u773C\u4E0D\u89C1\u4E3A\u51C0": "y\u01CEn b\xF9 ji\xE0n w\xE9i j\xECng", "\u5406\u4E94\u559D\u516D": "y\u0101o w\u01D4 h\xE8 li\xF9", "\u867E\u5175\u87F9\u5C06": "xi\u0101 b\u012Bng xi\xE8 ji\xE0ng", "\u6C34\u8C03\u6B4C\u5934": "shu\u01D0 di\xE0o g\u0113 t\xF3u", "\u6570\u5178\u5FD8\u7956": "sh\u01D4 di\u01CEn w\xE0ng z\u01D4", "\u4EBA\u4E8B\u4E0D\u7701": "r\xE9n sh\xEC b\xF9 x\u01D0ng", "\u66F2\u9AD8\u548C\u5BE1": "q\u01D4 g\u0101o h\xE8 gu\u01CE", "\u5076\u4E00\u4E3A\u4E4B": "\u01D2u y\u012B w\xE9i zh\u012B", "\u5C61\u6559\u4E0D\u6539": "l\u01DA ji\xE0n b\xF9 g\u01CEi", "\u4E92\u4E3A\u56E0\u679C": "h\xF9 w\xE9i y\u012Bn gu\xF2", "\u4E92\u4E3A\u8868\u91CC": "h\xF9 w\xE9i bi\u01CEo l\u01D0", "\u539A\u6B64\u8584\u5F7C": "h\xF2u c\u01D0 b\xF3 b\u01D0", "\u8FC7\u5173\u65A9\u5C06": "gu\xF2 gu\u0101n zh\u01CEn ji\xE0ng", "\u7599\u7599\u7629\u7629": "g\u0113 g\u0113 d\u0101 d\xE1", "\u5426\u6781\u6CF0\u6765": "p\u01D0 j\xED t\xE0i l\xE1i", "\u5927\u8179\u4FBF\u4FBF": "d\xE0 f\xF9 pi\xE1n pi\xE1n", "\u884C\u884C\u51FA\u72B6\u5143": "h\xE1ng h\xE1ng ch\u016B zhu\xE0ng yu\xE1n", "\u62E7\u6210\u4E00\u80A1\u7EF3": "n\xEDng ch\xE9ng y\u012B g\u01D4 sh\xE9ng", "\u8D70\u4E3A\u4E0A\u7B56": "z\u01D2u w\xE9i sh\xE0ng c\xE8", "\u51A4\u5BB6\u5BF9\u5934": "yu\u0101n jia du\xEC t\xF3u", "\u6709\u9699\u53EF\u4E58": "y\u01D2u x\xEC k\u011B ch\xE8ng", "\u4E00\u65E0\u6240\u5F97": "y\u012B w\xFA su\u01D2 d\xE9", "\u4E00\u9CDE\u534A\u722A": "y\u012B l\xEDn b\xE0n zh\u01CEo", "\u4E00\u54C4\u800C\u8D77": "y\u012B h\u014Dng \xE9r q\u01D0", "\u7247\u8A00\u53EA\u8BED": "pi\xE0n y\xE1n zh\u01D0 y\u01D4", "\u5F00\u82B1\u7ED3\u5B9E": "k\u0101i hu\u0101 ji\xE9 sh\xED", "\u65E7\u5730\u91CD\u6E38": "ji\xF9 d\xEC ch\xF3ng y\xF3u", "\u7ECF\u5E74\u7D2F\u6708": "j\u012Bng ni\xE1n l\u011Bi yu\xE8", "\u542B\u7CCA\u5176\u8BCD": "h\xE1n h\xFA q\xED c\xED", "\u5BE1\u5EC9\u9C9C\u803B": "gu\u01CE li\xE1n xi\u01CEn ch\u01D0", "\u6210\u5E74\u7D2F\u6708": "ch\xE9ng ni\xE1n l\u011Bi yu\xE8", "\u4E0D\u5F87\u79C1\u60C5": "b\xF9 x\xFAn s\u012B q\xEDng", "\u4E0D\u5F53\u4EBA\u5B50": "b\xF9 d\u0101ng r\xE9n z\u01D0", "\u8180\u5927\u8170\u5706": "b\u01CEng d\xE0 y\u0101o yu\xE1n", "\u6307\u8179\u4E3A\u5A5A": "zh\u01D0 f\xF9 w\xE9i h\u016Bn", "\u8FD9\u4E48\u70B9\u513F": "zh\xE8 me di\u01CEn er", "\u610F\u5174\u7D22\u7136": "y\xEC x\u012Bng su\u01D2 r\xE1n", "\u7EE3\u82B1\u6795\u5934": "xi\xF9 hu\u0101 zh\u011Bn t\xF3u", "\u65E0\u7684\u653E\u77E2": "w\xFA d\xEC f\xE0ng sh\u01D0", "\u671B\u95FB\u95EE\u5207": "w\xE0ng w\xE9n w\xE8n qi\u0113", "\u820D\u5DF1\u4E3A\u4EBA": "sh\u011B j\u01D0 w\xE8i r\xE9n", "\u7A77\u5E74\u7D2F\u6708": "qi\xF3ng ni\xE1n l\u011Bi yu\xE8", "\u6392\u96BE\u89E3\u7EB7": "p\xE1i n\xE0n ji\u011B f\u0113n", "\u5904\u4E4B\u6CF0\u7136": "ch\u01D4 zh\u012B t\xE0i r\xE1n", "\u6307\u9E7F\u4E3A\u9A6C": "zh\u01D0 l\xF9 w\xE9i m\u01CE", "\u4E00\u5410\u4E3A\u5FEB": "y\u012B t\u01D4 w\xE9i ku\xE0i", "\u4E00\u4E18\u4E4B\u8C89": "y\u012B qi\u016B zh\u012B h\xE9", "\u5371\u5982\u7D2F\u5375": "w\u0113i r\xFA l\u011Bi lu\u01CEn", "\u5929\u5175\u5929\u5C06": "ti\u0101n b\u012Bng ti\u0101n ji\xE0ng", "\u820D\u8FD1\u6C42\u8FDC": "sh\u011B j\xECn qi\xFA yu\u01CEn", "\u5357\u8154\u5317\u8C03": "n\xE1n qi\u0101ng b\u011Bi di\xE0o", "\u82E6\u4E2D\u4F5C\u4E50": "k\u01D4 zh\u014Dng zu\xF2 l\xE8", "\u539A\u79EF\u8584\u53D1": "h\xF2u j\u012B b\xF3 f\u0101", "\u6234\u7EFF\u5E3D\u5B50": "d\xE0i l\u01DC m\xE0o zi", "\u81ED\u5473\u76F8\u6295": "xi\xF9 w\xE8i xi\u0101ng t\xF3u", "\u957F\u5E7C\u6709\u5E8F": "zh\u01CEng y\xF2u y\u01D2u x\xF9", "\u903C\u826F\u4E3A\u5A3C": "b\u012B li\xE1ng w\xE9i ch\u0101ng", "\u60B2\u60B2\u5207\u5207": "b\u0113i b\u0113i qi\xE8 qi\u0113", "\u8D25\u519B\u4E4B\u5C06": "b\xE0i j\u016Bn zh\u012B ji\xE0ng", "\u8D76\u9E2D\u5B50\u4E0A\u67B6": "g\u01CEn y\u0101 z\u012B sh\xE0ng ji\xE0", "\u6B3A\u884C\u9738\u5E02": "q\u012B h\xE1ng b\xE0 sh\xEC", "\u524A\u8DB3\u9002\u5C65": "xu\u0113 z\xFA sh\xEC l\u01DA", "\u5148\u7779\u4E3A\u5FEB": "xi\u0101n d\u01D4 w\xE9i ku\xE0i", "\u557C\u9965\u53F7\u5BD2": "t\xED j\u012B h\xE1o h\xE1n", "\u758F\u4E0D\u95F4\u4EB2": "sh\u016B b\xF9 ji\xE0n q\u012Bn", "\u795E\u5DEE\u9B3C\u4F7F": "sh\xE9n ch\u0101i gu\u01D0 sh\u01D0", "\u6572\u6572\u6253\u6253": "qi\u0101o qi\u0101o d\u0101 d\u0101", "\u5E73\u94FA\u76F4\u53D9": "p\xEDng p\u016B zh\xED x\xF9", "\u6CA1\u5934\u6CA1\u5C3E": "m\xE9i t\xF3u m\xF2 w\u011Bi", "\u5BE5\u5BE5\u53EF\u6570": "li\xE1o li\xE1o k\u011B sh\u01D4", "\u54FC\u54C8\u4E8C\u5C06": "h\u0113ng h\u0101 \xE8r ji\xE0ng", "\u9E64\u53D1\u7AE5\u989C": "h\xE8 f\xE0 t\xF3ng y\xE1n", "\u5404\u5954\u524D\u7A0B": "g\xE8 b\xE8n qi\xE1n ch\xE9ng", "\u5F39\u65E0\u865A\u53D1": "d\xE0n w\xFA x\u016B f\u0101", "\u5927\u4EBA\u5148\u751F": "d\xE0 r\xE9n xi\u0101n sheng", "\u4E0E\u6C11\u66F4\u59CB": "y\u01D4 r\xE9n g\u0113ng sh\u01D0", "\u53F6\u843D\u5F52\u6839": "y\xE8 lu\xF2 hu\u012B g\u0113n", "\u4E00\u76EE\u5341\u884C": "y\u012B m\xF9 sh\xED h\xE1ng", "\u865A\u6643\u4E00\u67AA": "xi\xF9 hu\xE0ng y\u012B qi\u0101ng", "\u6811\u7891\u7ACB\u4F20": "sh\xF9 b\u0113i l\xEC zhu\xE0n", "\u662F\u975E\u5F97\u5931": "sh\xEC f\u0113i d\xE9 sh\u012B", "\u5B9E\u903C\u5904\u6B64": "sh\xED b\u012B ch\u01D4 c\u01D0", "\u585E\u7FC1\u5931\u9A6C": "s\xE0i w\u0113ng sh\u012B m\u01CE", "\u65E5\u8584\u897F\u5C71": "r\xEC b\xF3 x\u012B sh\u0101n", "\u5207\u8EAB\u4F53\u4F1A": "qi\u0113 sh\u0113n t\u01D0 hu\xEC", "\u7247\u8A00\u53EA\u5B57": "pi\xE0n y\xE1n zh\u01D0 z\xEC", "\u8DD1\u9A6C\u5356\u89E3": "p\u01CEo m\u01CE m\xE0i xi\xE8", "\u5B81\u6298\u4E0D\u5F2F": "n\xECng zh\xE9 b\xF9 w\u0101n", "\u96F6\u96F6\u6563\u6563": "l\xEDng l\xEDng s\u01CEn s\u01CEn", "\u91CF\u4F53\u88C1\u8863": "li\xE0ng t\u01D0 c\xE1i y\u012B", "\u8FDE\u4E2D\u4E09\u5143": "li\xE1n zh\xF2ng s\u0101n yu\xE1n", "\u793C\u5D29\u4E50\u574F": "l\u01D0 b\u0113ng yu\xE8 hu\xE0i", "\u80E1\u5B50\u62C9\u78B4": "h\xFA z\u01D0 l\u0101 ch\u0101", "\u4E0D\u4E3A\u5DF2\u751A": "b\xF9 w\xE9i y\u01D0 sh\xE8n", "\u8F6C\u60B2\u4E3A\u559C": "zhu\u01CEn b\u0113i w\xE9i x\u01D0", "\u4EE5\u773C\u8FD8\u773C": "y\u01D0 y\u01CEn hu\xE1n y\u01CEn", "\u851A\u4E3A\u5927\u89C2": "w\xE8i w\xE9i d\xE0 gu\u0101n", "\u672A\u4E3A\u4E0D\u53EF": "w\xE8i w\xE9i b\xF9 k\u011B", "\u7AE5\u989C\u9E64\u53D1": "t\xF3ng y\xE1n h\xE8 f\xE0", "\u670B\u6BD4\u4E3A\u5978": "p\xE9ng b\u01D0 w\xE9i ji\u0101n", "\u83AB\u6B64\u4E3A\u751A": "m\xF2 c\u01D0 w\xE9i sh\xE8n", "\u8001\u8C03\u91CD\u5F39": "l\u01CEo di\xE0o zh\xF2ng d\xE0n", "\u5939\u67AA\u5E26\u68D2": "ji\u0101 qi\u0101ng d\xE0i b\xE0ng", "\u5BCC\u5546\u5DE8\u8D3E": "f\xF9 sh\u0101ng j\xF9 ji\u01CE", "\u591A\u52B3\u591A\u5F97": "du\u014D l\xE1o du\u014D de", "\u6DE1\u7136\u5904\u4E4B": "d\xE0n r\xE1n ch\u01D4 zh\u012B", "\u7BAA\u98DF\u58F6\u6D46": "d\u0101n s\xEC h\xFA ji\u0101ng", "\u521B\u5DE8\u75DB\u6DF1": "chu\u0101ng j\xF9 t\xF2ng sh\u0113n", "\u8349\u957F\u83BA\u98DE": "c\u01CEo zh\u01CEng y\u012Bng f\u0113i", "\u5750\u89C6\u4E0D\u6551": "zu\xF2 sh\u012B b\xF9 ji\xF9", "\u91CD\u8D77\u7089\u7076": "ch\xF3ng q\u01D0 l\xFA z\xE0o", "\u4EE5\u5DF1\u5EA6\u4EBA": "y\u01D0 j\u01D0 du\xF3 r\xE9n", "\u968F\u884C\u5C31\u5E02": "su\xED h\xE1ng ji\xF9 sh\xEC", "\u6587\u4EE5\u8F7D\u9053": "w\xE9n y\u01D0 z\xE0i d\xE0o", "\u6587\u4E0D\u5BF9\u9898": "w\xE9n b\xF9 du\xEC t\xED", "\u94C1\u677F\u9489\u9489": "ti\u011B b\u01CEn d\xECng d\u012Bng", "\u8EAB\u4F53\u53D1\u80A4": "sh\u0113n t\u01D0 f\xE0 f\u016B", "\u7F3A\u5403\u5C11\u7A7F": "qu\u0113 ch\u012B xh\u01CEo chu\u0101n", "\u76EE\u65E0\u5C0A\u957F": "m\xF9 w\xFA z\u016Bn zh\u01CEng", "\u5409\u4EBA\u5929\u76F8": "j\xED r\xE9n ti\u0101n xi\xE0ng", "\u6BC1\u5BB6\u7EBE\u96BE": "hu\u01D0 ji\u0101 sh\u016B n\xE0n", "\u94A2\u7B4B\u94C1\u9AA8": "g\u0101ng j\u012Bng ti\u011B g\u01D4", "\u4E22\u5352\u4FDD\u8F66": "di\u016B z\xFA b\u01CEo j\u016B", "\u4E22\u4E09\u843D\u56DB": "di\u016B s\u0101n l\xE0 s\xEC", "\u95ED\u76EE\u585E\u542C": "b\xEC m\xF9 s\xE8 t\u012Bng", "\u4E0D\u5E78\u800C\u8A00\u4E2D": "b\xF9 x\xECng \xE9r y\xE1n zh\xF2ng", "\u524A\u5C16\u8111\u888B": "xu\u0113 ji\u0101n n\u01CEo d\xE0i", "\u4E3A\u975E\u4F5C\u6076": "w\xE9i f\u0113i zu\xF2 \xE8", "\u4EBA\u624D\u96BE\u5F97": "r\xE9n c\xE1i c\xE1i d\xE9", "\u60C5\u975E\u5F97\u5DF2": "q\xEDng f\u0113i d\xE9 y\u01D0", "\u5207\u4E2D\u8981\u5BB3": "qi\u0113 zh\u014Dng y\xE0o h\xE0i", "\u706B\u6025\u706B\u71CE": "hu\u01D2 j\xED hu\u01D2 li\u01CEo", "\u753B\u5730\u4E3A\u7262": "hu\xE0 d\xEC w\xE9i l\xE1o", "\u597D\u9152\u8D2A\u676F": "h\xE0o ji\u01D4 t\u0101n b\u0113i", "\u957F\u6B4C\u5F53\u54ED": "ch\xE1ng g\u0113 d\xE0ng k\u016B", "\u4E8B\u540E\u8BF8\u845B\u4EAE": "sh\xEC h\xF2u zh\u016B g\xE9 li\xE0ng", "\u8F7D\u6C89\u8F7D\u6D6E": "z\xE0i ch\xE9n z\xE0i f\xFA", "\u9047\u96BE\u5448\u7965": "y\xF9 n\xE0n ch\xE9ng xi\xE1ng", "\u6986\u6728\u7599\u7629": "y\xFA m\xF9 g\u0113 da", "\u4EE5\u90BB\u4E3A\u58D1": "y\u01D0 l\xEDn w\xE9i h\xE8", "\u6D0B\u4E3A\u4E2D\u7528": "y\xE1ng w\xE9i zh\u014Dng y\xF2ng", "\u8A00\u4E3A\u5FC3\u58F0": "y\xE1n w\xE9i x\u012Bn sh\u0113ng", "\u8A00\u5FC5\u6709\u4E2D": "y\xE1n b\xEC y\u01D2u zh\xF2ng", "\u56FE\u7A77\u5315\u89C1": "t\xFA qi\xF3ng b\u01D0 xi\xE0n", "\u6EC2\u6CB1\u5927\u96E8": "p\xE1ng tu\xF3 d\xE0 y\u01D4", "\u76EE\u4E0D\u6687\u7ED9": "m\xF9 b\xF9 xi\xE1 j\u01D0", "\u91CF\u624D\u5F55\u7528": "li\xE0ng c\xE1i l\xF9 y\xF2ng", "\u6559\u5B66\u76F8\u957F": "ji\xE0o xu\xE9 xi\u0101ng zh\u01CEng", "\u6094\u4E0D\u5F53\u521D": "hu\u01D0 b\xF9 d\u0101ng ch\u016B", "\u547C\u5E7A\u559D\u516D": "h\u016B y\u0101o h\xE8 li\xF9", "\u4E0D\u8DB3\u4E3A\u8BAD": "b\xF9 z\xFA w\xE9i x\xF9n", "\u4E0D\u62D8\u5F62\u8FF9": "b\xF9 j\u016B x\xEDng j\u012B", "\u508D\u82E5\u65E0\u4EBA": "p\xE1ng ru\xF2 w\xFA r\xE9n", "\u516B\u5927\u5C71\u4EBA": "b\u0101 t\xE0i sh\u0101n r\xE9n", "\u7F6A\u8D23\u96BE\u9003": "zu\xEC z\xE9 n\xE1n t\xE1o", "\u81EA\u6211\u5439\u5618": "z\xEC w\u01D2 chu\xED x\u016B", "\u8F6C\u7978\u4E3A\u798F": "zhu\u01CEn hu\xF2 w\xE9i f\xFA", "\u91CD\u5CE6\u53E0\u5D82": "ch\xF3ng lu\xE1n di\xE9 zh\xE0ng", "\u52C7\u51A0\u4E09\u519B": "y\u01D2ng gu\xE0n s\u0101n j\u016Bn", "\u6613\u5730\u800C\u5904": "y\xEC d\xEC \xE9r ch\u01D4", "\u4E00\u8BED\u7834\u7684": "y\u012B y\u01D4 p\xF2 d\xEC", "\u5378\u78E8\u6740\u9A74": "xi\xE8 m\xF2 sh\u0101 l\u01D8", "\u73A9\u513F\u4E0D\u8F6C": "w\xE1n \xE9r b\xF9 zhu\xE0n", "\u5929\u9053\u597D\u8FD8": "ti\u0101n d\xE0o h\u01CEo hu\xE1n", "\u8EAB\u5355\u529B\u8584": "sh\u0113n d\u0101n l\xEC b\xF3", "\u6492\u8C46\u6210\u5175": "s\u01CE d\xF2u ch\xE9ng b\u012Bng", "\u66F2\u91CC\u62D0\u5F2F": "q\u016B l\u01D0 gu\u01CEn w\u0101n", "\u7247\u7EB8\u53EA\u5B57": "pi\xE0n zh\u01D0 y\xE1n z\xEC", "\u5B81\u7F3A\u6BCB\u6EE5": "n\xECng qu\u0113 w\xF9 l\xE0n", "\u6CA1\u6CA1\u65E0\u95FB": "m\xF2 m\xF2 w\xFA w\xE9n", "\u91CF\u529B\u800C\u4E3A": "li\xE0ng l\xEC \xE9r w\xE9i", "\u5386\u5386\u53EF\u6570": "l\xEC l\xEC k\u011B sh\u01D4", "\u53E3\u7891\u8F7D\u9053": "k\u01D2u b\u0113i z\xE0i d\xE0o", "\u541B\u5B50\u597D\u9011": "j\u016Bn z\u01D0 h\xE0o qi\xFA", "\u597D\u4E3A\u4EBA\u5E08": "h\xE0o w\xE9i r\xE9n sh\u012B", "\u8C6A\u5546\u5DE8\u8D3E": "h\xE1o sh\u0101ng j\xF9 ji\u01CE", "\u5404\u6709\u6240\u597D": "g\xE8 y\u01D2u su\u01D2 h\xE0o", "\u5EA6\u5FB7\u91CF\u529B": "du\xF3 d\xE9 li\xE0ng l\xEC", "\u8BFB\u4E66\u79CD\u5B50": "d\xFA sh\u016B zh\u01D2ng z\u01D0", "\u4FBF\u5B9C\u4ECE\u4E8B": "bi\xE0n y\xED c\xF3ng sh\xEC", "\u82DB\u653F\u731B\u4E8E\u864E": "k\u0113 zh\xE8 m\u011Bng y\xFA h\u01D4", "\u6307\u5929\u4E3A\u8A93": "zh\u01D0 ti\u0101n w\xE9i sh\xEC", "\u9038\u5174\u9044\u98DE": "y\xEC x\xECng chu\xE1n f\u0113i", "\u5FC3\u5BBD\u4F53\u80D6": "x\u012Bn ku\u0101n t\u01D0 p\xE1n", "\u4E3A\u5FB7\u4E0D\u5352": "w\xE9i d\xE9 b\xF9 z\xFA", "\u7EA8\u88B4\u5B50\u5F1F": "w\xE1n k\u01D4 z\u01D0 d\xEC", "\u5929\u4E0B\u4E3A\u5BB6": "ti\u0101n xi\xE0 w\xE9i ji\u0101", "\u89C6\u4E3A\u754F\u9014": "sh\xEC w\xE9i w\xE8i t\xFA", "\u820D\u5DF1\u4ECE\u4EBA": "sh\u011B j\u01D0 c\xF3ng r\xE9n", "\u4E09\u707E\u516B\u96BE": "s\u0101n z\u0101i b\u0101 n\xE0n", "\u4EBA\u81EA\u4E3A\u6218": "r\xE9n z\xEC w\xE9i zh\xE0n", "\u7FA4\u96CC\u7CA5\u7CA5": "q\xFAn c\xED y\xF9 y\xF9", "\u90A3\u4E48\u70B9\u513F": "n\xE0 me di\u01CEn er", "\u6C90\u7334\u800C\u51A0": "m\xF9 h\xF3u \xE9r gu\xE0n", "\u8C0B\u4E3A\u4E0D\u8F68": "m\xF3u w\xE9i b\xF9 gu\u01D0", "\u660E\u7A97\u51C0\u51E0": "m\xEDng chu\u0101ng j\xECng j\u012B", "\u54E9\u54E9\u5566\u5566": "li li l\u0101 l\u0101", "\u89C1\u7F1D\u5C31\u94BB": "ji\xE0n f\xE8ng ji\xF9 zu\u0101n", "\u5939\u5C42\u73BB\u7483": "ji\u0101 c\xE9ng b\u014D li", "\u6025\u516C\u597D\u4E49": "j\xED g\u014Dng h\xE0o y\xEC", "\u79EF\u5E74\u7D2F\u6708": "j\u012B ni\xE1n l\u011Bi yu\xE8", "\u5212\u5730\u4E3A\u7262": "hu\xE1 d\xEC w\xE9i l\xE1o", "\u66F4\u540D\u6539\u59D3": "g\xE8ng m\xEDng g\u01CEi x\xECng", "\u5949\u4E3A\u572D\u81EC": "f\xE8ng w\xE9i gu\u012B ni\xE8", "\u591A\u96BE\u5174\u90A6": "du\u014D n\xE0n x\u012Bng b\u0101ng", "\u987F\u5F00\u8305\u585E": "d\xF9n k\u0101i m\xE1o s\xE8", "\u5F39\u5C3D\u63F4\u7EDD": "d\xE0n j\xECn yu\xE1n ju\xE9", "\u5927\u8116\u5B50\u75C5": "d\xE0 b\xF3 zi b\xECng", "\u4E0D\u7834\u4E0D\u7ACB": "b\xF9 pu\xF2 b\xF9 l\xEC", "\u5750\u5730\u81EA\u5212": "zu\xF2 d\xEC z\xEC hu\xE1", "\u5750\u4E0D\u91CD\u5E2D": "zu\xF2 b\xF9 ch\xF3ng x\xED", "\u5750\u4E0D\u7AA5\u5802": "z\xF9o b\xF9 ku\u012B t\xE1ng", "\u4F5C\u820D\u9053\u65C1": "zu\xF2 sh\u011B d\xE0o p\xE1ng", "\u4F5C\u5AC1\u8863\u88F3": "zu\xF2 ji\xE0 y\u012B sh\u0101ng", "\u5DE6\u652F\u53F3\u543E": "zu\u01D2 zh\u012B y\xF2u w\u016B", "\u5DE6\u679D\u53F3\u68A7": "zu\u01D2 zh\u012B y\xF2u w\u016B", "\u5DE6\u5B9C\u53F3\u6709": "zu\u01D2 y\xED y\xF2u f\xFA", "\u7F6A\u5E94\u4E07\u6B7B": "zu\xEC y\u012Bng w\xE0n s\u01D0", "\u94BB\u5FC3\u523A\u9AA8": "zu\xE0n x\u012Bn c\xEC g\u01D4", "\u94BB\u7A74\u903E\u5899": "zu\u0101n xu\xE9 y\xFA qi\xE1ng", "\u94BB\u7A74\u903E\u9699": "zu\u0101n xu\xE9 y\xFA x\xEC", "\u94BB\u9699\u903E\u5899": "zu\u0101n x\xEC y\xFA qi\xE1ng", "\u94BB\u5934\u89C5\u7F1D": "zu\u0101n t\xF3u m\xEC f\xE8ng", "\u94BB\u5929\u89C5\u7F1D": "zu\xE0n ti\u0101n m\xEC f\xE9ng", "\u94BB\u5929\u6253\u6D1E": "zu\u0101n ti\u0101n d\u01CE d\xF2ng", "\u94BB\u76AE\u51FA\u7FBD": "zu\u0101n p\xED ch\u016B y\u01D4", "\u94BB\u61D2\u5E2E\u95F2": "zu\u0101n l\u01CEn b\u0101ng xi\xE1n", "\u94BB\u706B\u5F97\u51B0": "zu\u0101n hu\u01D2 d\xE9 b\u012Bng", "\u94BB\u6D1E\u89C5\u7F1D": "zu\xE0n d\xF2ng m\xEC f\xE9ng", "\u94BB\u51B0\u6C42\u706B": "zu\u0101n b\u012Bng qi\xFA hu\u01D2", "\u94BB\u51B0\u6C42\u9165": "zu\u0101n b\u012Bng qi\xFA s\u016B", "\u8D70\u4E3A\u4E0A\u7740": "z\u01D2u w\xE8i sh\xE0ng zha\u014D", "\u8D70\u82B1\u6E9C\u6C34": "z\u01D2u hu\u0101 li\u016B b\u012Bng", "\u7EB5\u66F2\u6789\u76F4": "z\xF2ng q\u01D4 w\u01CEng zh\xED", "\u81EA\u76F8\u60CA\u5FE7": "z\xEC xi\u0101ng j\u012Bng r\u01CEo", "\u5B50\u4E3A\u7236\u9690": "z\u01D0 w\xE9i f\xF9 y\u01D0n", "\u8D44\u6DF1\u671B\u91CD": "z\u012B sh\u0113ng w\xE0ng zh\xF2ng", "\u64E2\u53D1\u96BE\u6570": "zhu\xF3 f\xE0 n\xE1n sh\u01D4", "\u64E2\u53D1\u83AB\u6570": "zhu\xF3 f\xE0 m\xF2 sh\u01D4", "\u7740\u4E66\u7ACB\u8BF4": "zh\xF9 sh\u016B l\xEC shu\u014D", "\u7740\u4EBA\u5148\u97AD": "zhu\xF3 r\xE9n xi\u0101n bi\u0101n", "\u65AB\u7431\u4E3A\u6734": "zhu\xF3 di\u0101o w\xE9i p\u01D4", "\u65AB\u96D5\u4E3A\u6734": "zhu\xF3 di\u0101o w\xE9i p\u01D4", "\u9525\u5904\u56CA\u4E2D": "zhu\u012B ch\u01D4 n\xE1ng zh\u014Dng", "\u690E\u81BA\u987F\u8DB3": "chu\xED y\u012Bng d\xF9n z\xFA", "\u690E\u80F8\u8DCC\u8DB3": "chu\xED xi\u014Dng di\u0113 z\xFA", "\u690E\u80F8\u987F\u8DB3": "chu\xED xi\u014Dng d\xF9n z\xFA", "\u690E\u5FC3\u996E\u6CE3": "chu\xED x\u012Bn y\u01D0n q\xEC", "\u690E\u5FC3\u6CE3\u8840": "chu\xED x\u012Bn q\xEC xu\xE8", "\u690E\u5FC3\u5455\u8840": "chu\xED x\u012Bn \u01D2u xu\xE8", "\u690E\u5FC3\u987F\u8DB3": "chu\xED x\u012Bn d\xF9n z\xFA", "\u690E\u5929\u62A2\u5730": "chu\xED ti\u0101n qi\u01CEng d\xEC", "\u690E\u725B\u98E8\u58EB": "chu\xED ni\xFA xi\u01CEng sh\xEC", "\u690E\u725B\u6B43\u8840": "chu\xED ni\xFA sh\xE0 xu\xE8", "\u690E\u725B\u53D1\u51A2": "chu\xED ni\xFA f\u0101 zh\u01D2ng", "\u690E\u57CB\u5C60\u72D7": "chu\xED m\xE1i t\xFA g\u01D2u", "\u690E\u57CB\u72D7\u7A83": "chu\xED m\xE1i g\u01D2u qi\xE8", "\u690E\u80A4\u5265\u4F53": "chu\xED f\u016B b\u014D t\u01D0", "\u690E\u80A4\u5265\u9AD3": "chu\xED f\u016B b\u014D su\u01D0", "\u690E\u950B\u9677\u9635": "chu\xED f\u0113ng xi\xE0n zh\xE8n", "\u690E\u950B\u9677\u9648": "chu\u012B f\u0113ng xi\xE0n ch\xE9n", "\u8FFD\u6B22\u4F5C\u4E50": "zhu\u012B hu\u0101n zu\xF2 l\xE8", "\u8FFD\u98CE\u6444\u666F": "zhu\u012B f\u0113ng ni\xE8 j\u01D0ng", "\u58EE\u53D1\u51B2\u51A0": "zhu\xE0ng f\u0101 ch\u014Dng gu\xE0n", "\u5E84\u4E25\u5B9D\u76F8": "zhu\u0101ng y\xE1n b\u01CEo xi\xE0ng", "\u8F6C\u707E\u4E3A\u798F": "zhu\u01CEn z\u0101i w\xE9i f\xFA", "\u8F6C\u6E7E\u62B9\u89D2": "zhu\u01CEn w\u0101n m\xF2 ji\u01CEo", "\u8F6C\u6101\u4E3A\u559C": "zhu\u01CEn ch\xF3u w\xE9i x\u01D0", "\u8F6C\u55D4\u4E3A\u559C": "zhu\u01CEn ch\u0113n w\xE9i x\u01D0", "\u8F6C\u8D25\u4E3A\u6210": "zhu\u01CEn b\xE0i w\xE9i ch\xE9ng", "\u8F6C\u8D25\u4E3A\u529F": "zhu\u01CEn b\xE0i w\xE9i g\u014Dng", "\u62FD\u5DF7\u651E\u8857": "zhu\xE0i xi\xE0ng lu\u01D2 ji\u0113", "\u62FD\u5DF7\u5570\u8857": "zhu\xE0i xi\xE0ng lu\xF3 ji\u0113", "\u62FD\u8019\u6276\u7281": "zhu\u0101i p\xE1 f\xFA l\xED", "\u62FD\u5E03\u62D6\u9EBB": "zhu\u0101i b\xF9 tu\u014D m\xE1", "\u7BB8\u957F\u7897\u77ED": "zh\xF9 ch\xE0ng w\u01CEn du\u01CEn", "\u94F8\u5251\u4E3A\u7281": "zh\xF9 ji\xE0n w\xE9i l\xED", "\u677C\u67DA\u4E4B\u7A7A": "zh\xF9 zh\xF3u zh\u012B k\u014Dng", "\u677C\u67DA\u5176\u7A7A": "zh\xF9 zh\xF3u q\xED k\u014Dng", "\u677C\u67DA\u7A7A\u865A": "zh\xF9 zh\xF3u k\u014Dng x\u016B", "\u52A9\u5929\u4E3A\u8650": "zh\xF9 ti\u0101n w\xE9i n\xFC\xE8", "\u52A9\u6840\u4E3A\u8650": "zh\xF9 ji\xE9 w\xE9i n\xFC\xE8", "\u5C5E\u57A3\u6709\u8033": "zh\u01D4 yu\xE1n y\u01D2u \u011Br", "\u5C5E\u6BDB\u79BB\u91CC": "zh\u01D4 m\xE1o l\xED l\u01D0", "\u5C5E\u8F9E\u6BD4\u4E8B": "zh\u01D4 c\xED b\u01D0 sh\xEC", "\u5C5E\u8BCD\u6BD4\u4E8B": "zh\u01D4 c\xED b\u01D0 sh\xEC", "\u9010\u7269\u4E0D\u8FD8": "zh\xFA w\xF9 b\xF9 hu\xE1n", "\u94E2\u94E2\u6821\u91CF": "zh\u016B zh\u016B xi\xE0o li\xE0ng", "\u94E2\u91CF\u5BF8\u5EA6": "zh\u016B li\xE1ng c\xF9n du\xF3", "\u94E2\u4E24\u6089\u79F0": "zh\u016B li\u01CEng x\u012B ch\xE8n", "\u94E2\u79EF\u5BF8\u7D2F": "zh\u016B j\u012B c\xF9n l\u011Bi", "\u4F8F\u5112\u4E00\u8282": "zh\u016B r\u01D4 y\u012B ji\xE9", "\u4F8F\u5112\u89C2\u620F": "zh\u016B r\u01D4 gu\u0101n x\xEC", "\u6731\u69C3\u7389\u6566": "zh\u016B p\xE1n y\xF9 du\xEC", "\u6731\u76D8\u7389\u6566": "zh\u016B p\xE1n y\xF9 du\xEC", "\u6731\u8F53\u7681\u76D6": "zh\u016B f\u0101n h\u01CEi g\xE0i", "\u663C\u5E72\u5915\u60D5": "zh\xF2u g\xE0n x\u012B t\xEC", "\u663C\u5EA6\u591C\u601D": "zh\xF2u du\xF3 y\xE8 s\u012B", "\u8BEA\u5F20\u4E3A\u5E7B": "zh\u014Du zh\u0101ng w\xE9i hu\xE0n", "\u5468\u90CE\u987E\u66F2": "zh\u014Du l\xE1ng g\xF9 q\u01D4", "\u4F9C\u5F20\u4E3A\u5E7B": "zh\u014Du zh\u0101ng w\xE9i hu\xE0n", "\u91CD\u8DB3\u4E00\u8FF9": "ch\xF3ng z\xFA y\u012B j\xEC", "\u91CD\u8DB3\u5C4F\u606F": "ch\xF3ng z\xFA b\u01D0ng x\u012B", "\u91CD\u8DB3\u5C4F\u6C14": "ch\xF3ng z\xFA b\u01D0ng q\xEC", "\u91CD\u8DB3\u7D2F\u606F": "ch\xF3ng z\xFA l\xE8i x\u012B", "\u91CD\u8DB3\u800C\u7ACB": "ch\xF3ng z\xFA \xE9r l\xEC", "\u91CD\u7EB8\u7D2F\u672D": "ch\xF3ng zh\u01D0 l\xE8i zh\xE1", "\u91CD\u57A3\u53E0\u9501": "ch\xF3ng yu\xE1n di\xE9 su\u01D2", "\u91CD\u57A3\u8FED\u9501": "ch\xF3ng yu\xE1n di\xE9 su\u01D2", "\u91CD\u88C0\u5217\u9F0E": "ch\xF3ng y\u012Bn li\xE8 d\u01D0ng", "\u91CD\u5CA9\u53E0\u5D82": "ch\xF3ng y\xE1n di\xE9 zh\xE0ng", "\u91CD\u5174\u65D7\u9F13": "ch\xF3ng x\u012Bng q\xED g\u01D4", "\u91CD\u7199\u7D2F\u53F6": "ch\xF3ng x\u012B l\u011Bi y\xE8", "\u91CD\u7199\u7D2F\u76DB": "ch\xF3ng x\u012B l\u011Bi sh\xE8ng", "\u91CD\u624B\u7D2F\u8DB3": "ch\xF3ng sh\u01D2u l\u011Bi z\xFA", "\u91CD\u5C71\u5CFB\u5CAD": "ch\xF3ng sh\u0101n j\xF9n l\u01D0ng", "\u91CD\u5C71\u590D\u6C34": "ch\xF3ng sh\u0101n f\xF9 shu\u01D0", "\u91CD\u5C71\u590D\u5CAD": "ch\xF3ng sh\u0101n f\xF9 l\u01D0ng", "\u91CD\u4E09\u53E0\u56DB": "ch\xF3ng s\u0101n di\xE9 s\xEC", "\u91CD\u4E09\u8FED\u56DB": "ch\xF3ng s\u0101n di\xE9 s\xEC", "\u91CD\u6C14\u5F87\u547D": "zh\xF2ng q\xEC x\xF9n m\xEDng", "\u91CD\u7EB0\u8CA4\u7F2A": "ch\xF3ng p\u012B y\xED mi\xF9", "\u91CD\u8469\u7D2F\u85FB": "ch\xF3ng p\u0101 l\xE8i z\u01CEo", "\u91CD\u660E\u7EE7\u7130": "ch\xF3ng m\xEDng j\xEC y\xE0n", "\u91CD\u5CE6\u590D\u5D82": "ch\xF3ng lu\xE1n f\xF9 zh\xE0ng", "\u91CD\u5CE6\u53E0\u5DD8": "ch\xF3ng lu\xE1n di\xE9 y\u01CEn", "\u91CD\u5CE6\u8FED\u5DD8": "ch\xF3ng lu\xE1n di\xE9 y\u01CEn", "\u91CD\u7406\u65E7\u4E1A": "ch\xF3ng l\u01D0 ji\xF9 y\xE8", "\u91CD\u91D1\u88AD\u6C64": "ch\xF3ng j\u012Bn x\xED t\u0101ng", "\u91CD\u91D1\u517C\u7D2B": "ch\xF3ng j\u012Bn ji\u0101n z\u01D0", "\u91CD\u8FF9\u5C4F\u6C14": "ch\xF3ng j\xEC b\u01D0ng q\xEC", "\u91CD\u73EA\u53E0\u7EC4": "ch\xF3ng gu\u012B di\xE9 z\u01D4", "\u91CD\u89C4\u88AD\u77E9": "ch\xF3ng gu\u012B x\xED j\u01D4", "\u91CD\u89C4\u53E0\u77E9": "ch\xF3ng gu\u012B di\xE9 j\u01D4", "\u91CD\u89C4\u7D2F\u77E9": "ch\xF3ng gu\u012B l\xE8i j\u01D4", "\u91CD\u89C4\u8FED\u77E9": "ch\xF3ng gu\u012B di\xE9 j\u01D4", "\u91CD\u89C4\u6C93\u77E9": "ch\xF3ng gu\u012B t\xE0 j\u01D4", "\u91CD\u572D\u53E0\u7EC4": "ch\xF3ng gu\u012B di\xE9 z\u01D4", "\u91CD\u7779\u5929\u65E5": "ch\xF3ng d\u01D4 ti\u0101n r\xEC", "\u91CD\u5E8A\u53E0\u5C4B": "ch\xF3ng chu\xE1ng di\xE9 w\u016B", "\u91CD\u5E8A\u53E0\u67B6": "ch\xF3ng chu\xE1ng di\xE9 ji\xE0", "\u91CD\u5E8A\u8FED\u5C4B": "ch\xF3ng chu\xE1ng di\xE9 w\u016B", "\u91CD\u5E8A\u8FED\u67B6": "ch\xF3ng chu\xE1ng di\xE9 ji\xE0", "\u4F17\u5544\u540C\u97F3": "zh\xF2ng zh\xF2u t\xF3ng y\u012Bn", "\u4F17\u661F\u6512\u6708": "zh\xF2ng x\u012Bng cu\xE1n yu\xE8", "\u4F17\u6BDB\u6512\u88D8": "zh\xF2ng m\xE1o cu\xE1n qi\xFA", "\u4F17\u597D\u4F17\u6076": "zh\xF2ng h\xE0o zh\xF2ng w\xF9", "\u949F\u9F0E\u4EBA\u5BB6": "zh\u014Dng d\u01D0ng r\xE9n jia", "\u64FF\u690D\u7D22\u6D82": "zh\u0101i zh\xED su\u01D2 t\xFA", "\u64FF\u57F4\u7D22\u6D82": "zh\u0101i zh\xED su\u01D2 t\xFA", "\u64FF\u57F4\u7D22\u9014": "zh\u0101i zh\xED su\u01D2 t\xFA", "\u7A1A\u9F7F\u5A51\u5AA0": "zh\xEC ch\u01D0 w\u01D2 tu\u01D2", "\u81F4\u8FDC\u4EFB\u91CD": "zh\xEC yu\u01CEn r\xE8n zh\xE0ng", "\u6809\u6BD4\u9CDE\u5DEE": "zh\xEC b\u01D0 l\xEDn c\u01D0", "\u81F3\u5F53\u4E0D\u6613": "zh\xEC d\xE0ng b\xF9 y\xEC", "\u6307\u7681\u4E3A\u767D": "zh\u01D0 z\xE0o w\xE9i b\xE1i", "\u6307\u7682\u4E3A\u767D": "zh\u01D0 z\xE0o w\xE9i b\xE1i", "\u6307\u96C1\u4E3A\u7FB9": "zh\u01D0 y\xE0n w\xE9i g\u0113ng", "\u6307\u6811\u4E3A\u59D3": "zh\u01D0 sh\xF9 w\xE9i x\xECng", "\u6307\u5C71\u8BF4\u78E8": "zh\u01D0 sh\u0101n shu\u014D m\xF2", "\u6307\u5C71\u5356\u78E8": "zh\u01D0 sh\u0101n m\xE0i m\xF2", "\u53EA\u4E89\u65E6\u5915": "zh\u01D0 zh\u0113ng d\xE0n x\u012B", "\u6B62\u6208\u4E3A\u6B66": "zh\u01D0 g\u0113 w\xE9i w\u01D4", "\u690D\u53D1\u7A7F\u51A0": "zh\xED f\xE0 chu\u0101n gu\xE0n", "\u690D\u53D1\u51B2\u51A0": "zh\xED f\xE0 ch\u014Dng gu\xE0n", "\u76F4\u8A00\u5207\u8C0F": "zh\xED y\xE1n qi\u0113 ji\xE0n", "\u76F4\u6251\u65E0\u534E": "zh\xED p\u01D4 w\xFA hu\xE1", "\u77E5\u75BC\u7740\u75D2": "zh\u012B t\xE9ng zh\xE1o y\u01CEng", "\u679D\u53F6\u76F8\u6301": "zh\u012B y\xE8 x\u012Bng ch\xED", "\u679D\u5E72\u76F8\u6301": "zh\u012B g\xE0n xi\u0101ng xh\xED", "\u679D\u9644\u53F6\u7740": "zh\u012B f\xF9 yi\xE8 zhu\xF3", "\u679D\u9644\u53F6\u8457": "zh\u012B f\xF9 yi\xE8 zhu\xF3", "\u679D\u5927\u4E8E\u672C": "zh\u012B d\xE0 y\xF9 b\u011Bn", "\u652F\u543E\u5176\u8BCD": "zh\u012B w\u016B q\xED c\xED", "\u652F\u5206\u65CF\u89E3": "zh\u012B f\u0113 z\xFA ji\u011B", "\u6B63\u4E2D\u5DF1\u6000": "zh\xE8ng zh\xF2ng j\u01D0 hu\xE1i", "\u6B63\u8EAB\u7387\u4E0B": "zh\xE8ng sh\u0113n shu\xE0i xi\xE0", "\u6B63\u51A0\u7EB3\u5C65": "zh\xE8ng gu\xE0n n\xE0 l\u01DA", "\u6B63\u51A0\u674E\u4E0B": "zh\xE8ng gu\xE0n l\u01D0 xi\xE0", "\u6574\u51A0\u7EB3\u5C65": "zh\u011Bng gu\xE0n n\xE0 l\u01DA", "\u6574\u8EAC\u7387\u7269": "zh\u011Bng g\u014Dng shu\xE0i w\xF9", "\u6574\u987F\u5E72\u5764": "zh\u011Bng d\xF9n g\xE0n k\u016Bn", "\u84B8\u6C99\u4E3A\u996D": "zh\u0113ng sh\u0101 w\xE9i f\xE0n", "\u632F\u5175\u6CFD\u65C5": "zh\xE8n b\u012Bng sh\xEC l\u01DA", "\u6795\u5E2D\u8FD8\u5E08": "zh\u011Bn x\xED hu\xE1n sh\u012B", "\u6795\u77F3\u6F31\u6D41": "zh\u011Bn sh\xED s\xF2u li\xFA", "\u6795\u77F3\u55FD\u6D41": "zh\u011Bn sh\xED sh\xF9 li\xFA", "\u771F\u76F8\u6BD5\u9732": "zh\u0113n xi\u0101ng b\xEC l\xF9", "\u9488\u5934\u524A\u94C1": "zh\u0113n t\xF3u xu\u0113 ti\u011B", "\u8D1E\u677E\u52B2\u67CF": "zh\u0113n s\u014Dng j\xECng b\u01CEi", "\u8D6D\u8863\u585E\u8DEF": "zh\u011B y\u012B s\xE0i l\xF9", "\u6298\u8170\u4E94\u6597": "sh\xE9 y\u0101o w\u01D4 d\xF2u", "\u6298\u7BAD\u4E3A\u8A93": "sh\xE9 ji\xE0n w\xE9i sh\xEC", "\u6298\u800C\u65CF\u4E4B": "zhe er zu zi", "\u662D\u5FB7\u585E\u8FDD": "zh\u0101o d\xE9 s\xE8 w\xE9i", "\u5F70\u660E\u8F83\u7740": "zh\u0101ng m\xEDng ji\xE0o zh\xF9", "\u7AE0\u53E5\u5C0F\u5112": "zh\u0101ng j\xF9 xi\u0101o r\xFA", "\u6E5B\u6069\u6C6A\u6FCA": "zh\xE0n \u0113n w\u0101ng h\xFAn", "\u5360\u98CE\u671B\u6C14": "zh\u0101n f\u0113ng w\xE0ng q\xEC", "\u5360\u98CE\u4F7F\u5E06": "zh\u0101n f\u0113ng sh\u01D0 f\u0101n", "\u65A9\u5C06\u5208\u65D7": "zh\u01CEn ji\xE0ng y\xEC q\xED", "\u65A9\u5C06\u6434\u65D7": "zh\u01CEn ji\xE0ng qi\u0101n q\xED", "\u65A9\u9489\u5207\u94C1": "zh\u01CEn d\u012Bng qi\u0113 ti\u011B", "\u8A79\u8A00\u66F2\u8BF4": "zh\u0101n y\xE1n q\u01D4 shu\u014D", "\u6CBE\u6CBE\u81EA\u597D": "zh\u0101n zh\u0101n z\xEC h\xE0o", "\u66FE\u6BCD\u6295\u677C": "z\u0113ng m\u01D4 t\xF3u zh\xF9", "\u66FE\u53C2\u6740\u4EBA": "z\u0113ng sh\u0113n sh\u0101 r\xE9n", "\u66FE\u4E0D\u60E8\u7136": "zeng bu chan ran", "\u9020\u8C23\u4E2D\u4F24": "z\xE0o y\xE1o zh\xF2ng sh\u0101ng", "\u65E9\u5360\u52FF\u836F": "z\u01CEo zh\u0101n w\xF9 y\xE0o", "\u51FF\u9F9F\u6570\u7B56": "z\xE1o gu\u012B sh\u01D4 c\xE8", "\u6512\u4E09\u96C6\u4E94": "cu\xE1n s\u0101n j\xED w\u01D4", "\u6512\u4E09\u805A\u4E94": "cu\xE1n s\u0101n j\xF9 w\u01D4", "\u6512\u7709\u82E6\u8138": "z\u01CEn m\xE9i k\u01D4 li\u01CEn", "\u6512\u7709\u8E59\u989D": "cu\xE1n mei c\xF9 \xE9", "\u6512\u96F6\u5408\u6574": "cu\xE1n l\xEDng h\xE9 zh\u011Bng", "\u6512\u950B\u805A\u955D": "cu\xE1n f\u0113ng j\xF9 d\xED", "\u8F7D\u821F\u8986\u821F": "z\xE0i zh\u014Du f\xF9 zh\u014Du", "\u8F7D\u4E00\u62B1\u7D20": "z\xE0i y\u012B b\xE0o s\xF9", "\u8F7D\u7B11\u8F7D\u8A00": "z\xE0i xi\xE0o z\xE0i y\xE1n", "\u8F7D\u9A71\u8F7D\u9A70": "z\xE0i q\u016B z\xE0i ch\xED", "\u8F7D\u9152\u95EE\u5B57": "z\xE0i ji\u01D4 w\xE8n z\xEC", "\u8F7D\u6B4C\u4E14\u821E": "z\xE0i g\u0113 qi\u011B w\u01D4", "\u8FD0\u8F6C\u65F6\u6765": "y\xF9n zhu\u01CEn sh\xED l\xE1i", "\u6B92\u8EAB\u4E0D\u6064": "y\u01D4n sh\u0113n b\xFA x\xF9", "\u4E91\u8212\u971E\u5377": "y\xFAn sh\u016B xi\xE1 ju\u01CEn", "\u4E91\u6CE5\u4E4B\u5DEE": "y\xFAn n\xED zh\u012B ch\u0101", "\u5CB3\u9547\u6E0A\u6E1F": "yu\xE8 zh\xE8n yu\u0101n t\u012Bng", "\u6708\u4E2D\u6298\u6842": "yu\xE8 zh\u014Dng sh\xE9 gu\xEC", "\u6708\u6CA1\u53C2\u6A2A": "yu\xE8 m\xF2 sh\u0113n h\xE9ng", "\u6708\u843D\u53C2\u6A2A": "yu\xE8 lu\xF2 sh\u0113n h\xE9ng", "\u8FDC\u4E0D\u95F4\u4EB2": "yu\u01CEn b\xF9 ji\xE0n q\u012Bn", "\u9B3B\u9A7D\u7A83\u4EF7": "y\xF9 n\u01D4 qi\xE8 ji\xE0", "\u9B3B\u9E21\u4E3A\u51E4": "y\xF9 j\u012B w\xE9i f\xE8ng", "\u9047\u96BE\u6210\u7965": "y\xF9 n\xE0n ch\xE9ng xi\xE1ng", "\u90C1\u90C1\u7D2F\u7D2F": "y\xF9 y\xF9 l\u011Bi l\u011Bi", "\u5401\u5929\u547C\u5730": "y\xF9 ti\u0101n h\u016B d\xEC", "\u5401\u5488\u90FD\u4FDE": "y\xF9 f\xFA d\u014Du y\xFA", "\u7389\u536E\u65E0\u5F53": "y\xF9 zh\u012B w\xFA d\xE0ng", "\u8BED\u7B11\u55A7\u9617": "y\u01D4 xi\xE0o xu\u0101n ti\u0101n", "\u4E0E\u4E16\u6C89\u6D6E": "y\xFA sh\xEC ch\xE9n f\xFA", "\u4E0E\u65F6\u6D88\u606F": "y\u01D4 sh\xED xi\u0101o xi", "\u4E0E\u6C11\u9664\u5BB3": "y\u01D4 h\u01D4 ch\xFA h\xE0i", "\u903E\u5899\u94BB\u9699": "y\xFA qi\xE1ng zu\u0101n x\xEC", "\u6E14\u9633\u979E\u9F13": "y\u01D4 y\xE1ng p\xED g\u01D4", "\u6E14\u593A\u4FB5\u725F": "y\xFA du\xF3 q\u012Bn m\xF3u", "\u9C7C\u76EE\u6DF7\u73CE": "y\xFA m\xF9 h\xF9n zh\u016B", "\u6745\u7A7F\u76AE\u8839": "y\xFA chu\u0101n shu\u01D0 d\xF9", "\u4F59\u52C7\u53EF\u8D3E": "y\xFA y\u01D2ng k\u011B g\u01D4", "\u4E88\u667A\u4E88\u96C4": "y\xFA zh\xEC y\xFA xi\xF3ng", "\u4E88\u53D6\u4E88\u643A": "y\xFA q\u01D4 y\xFA xi\xE9", "\u4E88\u53D6\u4E88\u6C42": "y\xFA q\u01D4 y\xFA qi\xFA", "\u4E88\u53D6\u4E88\u593A": "y\xFA q\u01D4 y\xFA du\xF3", "\u4E8E\u5BB6\u4E3A\u56FD": "y\xFA ji\u0101 w\xE9i gu\xF3", "\u53C8\u5F31\u4E00\u4E2A": "y\xF2u ru\xF2 y\u012B g\xE8", "\u6709\u501F\u65E0\u8FD8": "y\u01D2u ji\xE8 w\xFA hu\xE1n", "\u6709\u52A0\u65E0\u5DF2": "y\u01D2u ji\u0101 w\u01D4 y\u01D0", "\u6709\u56FD\u96BE\u6295": "y\u01D2u gu\xF3 n\xE1n t\xF3u", "\u6709\u8819\u53EF\u4E58": "y\u01D2u b\u012Bn k\u011B ch\xE9ng", "\u6E38\u5FC5\u6709\u65B9": "y\u014Du b\xEC y\u01D2u f\u0101ng", "\u6CB9\u5E72\u706F\u5C3D": "y\xF3u g\xE0n d\u0113ng j\xECn", "\u5C24\u4E91\u6BA2\u96E8": "y\xF3u y\xFAn zh\xEC y\u01D4", "\u9954\u98E7\u4E0D\u7ED9": "y\u014Dng s\u016Bn b\xF9 j\u01D0", "\u5EB8\u4E2D\u76A6\u76A6": "y\u014Dng zh\u014Dng b\xEC t\xF3ng", "\u8747\u6512\u8681\u805A": "y\xEDng cu\xE1n y\u01D0 j\xF9", "\u90E2\u4E66\u71D5\u8BF4": "y\u01D0ng sh\u016B y\u0101n shu\u014D", "\u8747\u6512\u8681\u9644": "y\xEDng cu\xE1n y\u01D0 f\xF9", "\u8425\u8747\u6590\u9526": "y\xEDng y\xEDng f\u0113i j\u01D0n", "\u76C8\u5343\u7D2F\u4E07": "y\xEDng qi\u0101n l\u011Bi w\xE0n", "\u76C8\u7BC7\u7D2F\u724D": "y\xEDng pi\u0101n l\u011Bi d\xFA", "\u9E70\u5FC3\u96C1\u722A": "y\u012Bng x\u012Bn y\xE0n zh\u01CEo", "\u83BA\u541F\u71D5\u511B": "y\u012Bng y\xEDn y\xE0n s\u0101i", "\u5E94\u5929\u987A\u65F6": "y\u012Bng ti\u0101n sh\xF9n sh\xED", "\u5370\u7D2F\u7EF6\u82E5": "y\xECn l\xE9i sh\xF2u ru\xF2", "\u9690\u5360\u8EAB\u4F53": "yin zhan shen qi", "\u996E\u728A\u4E0A\u6D41": "y\xECn d\xFA sh\xE0ng li\xFA", "\u996E\u51B0\u98DF\u8616": "y\u01D0n b\u012Bng sh\xED b\xF2", "\u5F15\u7EF3\u5207\u58A8": "y\u01D0n sh\xE9ng qi\u0113 m\xF2", "\u9F88\u9F7F\u5F39\u820C": "y\xEDn ch\u01D0 d\xE0n sh\xE9", "\u6DEB\u8A00\u5A9F\u8BED": "y\xEDn y\xE1n li\u01CEng y\u01D4", "\u6DEB\u8BCD\u8273\u66F2": "y\xEDn c\xED y\xE0n q\u01D4", "\u56E0\u7F18\u4E3A\u5E02": "y\u012Bn yu\xE1n w\xE9i sh\xEC", "\u56E0\u6811\u4E3A\u5C4B": "y\u012Bn sh\xF9 w\xE9i w\u016B", "\u56E0\u7978\u4E3A\u798F": "y\u012Bn hu\xF2 w\xE9i f\xFA", "\u56E0\u654C\u4E3A\u8D44": "y\u012Bn d\xED w\xE9i z\u012B", "\u6EA2\u7F8E\u6EA2\u6076": "y\xEC m\u011Bi y\xEC l\xE8", "\u9038\u5174\u4E91\u98DE": "y\xEC x\xECng y\xFAn f\u0113i", "\u9038\u5174\u6A2A\u98DE": "y\xEC x\xECng h\xE9ng f\u0113i", "\u6291\u585E\u78CA\u843D": "y\xEC s\xE8 l\u011Bi lu\xF2", "\u501A\u95FE\u671B\u5207": "y\u01D0 l\u01D8 w\xE0ng qi\u0113", "\u8681\u62E5\u8702\u6512": "y\u01D0 y\u014Dng f\u0113ng cu\xE1n", "\u4EE5\u7D2B\u4E3A\u6731": "y\u01D0 z\u01D0 w\xE9i zh\u016B", "\u4EE5\u610F\u4E3A\u4E4B": "y\u01D0 y\xEC w\xE9i zh\u012B", "\u4EE5\u8A00\u4E3A\u8BB3": "y\u01D0 y\xE1n w\xE9i hu\xEC", "\u4EE5\u5FAE\u77E5\u7740": "y\u01D0 w\u0113i zh\u012B zh\xF9", "\u4EE5\u758F\u95F4\u4EB2": "y\u01D0 sh\u016B ji\xE0n q\u012Bn", "\u4EE5\u6C34\u6D4E\u6C34": "y\u01D0 shu\u01D0 j\u01D0 shu\u01D0", "\u4EE5\u4E66\u4E3A\u5FA1": "y\u01D0 sh\u016B w\xE9i y\xF9", "\u4EE5\u5B88\u4E3A\u653B": "y\u01D0 sh\u01D2u w\xE9i g\u014Dng", "\u4EE5\u5347\u91CF\u77F3": "y\u01D0 sh\u0113ng li\xE1ng d\xE0n", "\u4EE5\u614E\u4E3A\u952E": "y\u01D0 sh\xE8n w\xE9i ji\xE0n", "\u4EE5\u65E5\u4E3A\u5E74": "y\u01D0 r\xEC w\xE9i ni\xE1n", "\u4EE5\u7B4C\u4E3A\u9C7C": "y\u01D0 qu\xE1n w\xE9i y\xFA", "\u4EE5\u9E7F\u4E3A\u9A6C": "y\u01D0 l\xF9 w\xE9i m\u01CE", "\u4EE5\u5229\u7D2F\u5F62": "y\u01D0 l\xEC l\u011Bi x\xEDng", "\u4EE5\u6BC1\u4E3A\u7F5A": "y\u01D0 hu\u01D0 w\xE9i f\xE1", "\u4EE5\u9ED1\u4E3A\u767D": "y\u01D0 h\u0113i w\xE9i b\xE1i", "\u4EE5\u89C4\u4E3A\u7471": "y\u01D0 gu\u012B w\xE9i ti\xE0n", "\u4EE5\u53E4\u4E3A\u9274": "y\u01D0 g\u01D4 w\xE9i ji\xE0n", "\u4EE5\u5BAB\u7B11\u89D2": "y\u01D0 g\u014Dng xi\xE0o ju\xE9", "\u4EE5\u6CD5\u4E3A\u6559": "y\u01D0 f\u01CE w\xE9i ji\xE0o", "\u4EE5\u8033\u4E3A\u76EE": "y\u01D0 \u011Br w\xE9i m\xF9", "\u4EE5\u5927\u6076\u7EC6": "y\u01D0 d\xE0 w\xF9 x\xEC", "\u4EE5\u4E0D\u6D4E\u53EF": "y\u01D0 f\u01D2u j\xEC k\u011B", "\u4EE5\u767D\u4E3A\u9ED1": "y\u01D0 b\xE1i w\xE9i h\u0113i", "\u4E59\u79CD\u5C04\u7EBF": "y\u01D0 zh\u01D2ng sh\xE8 xi\xE0n", "\u4E59\u79CD\u7C92\u5B50": "y\u01D0 zh\u01D2ng l\xEC z\u01D0", "\u9057\u4E16\u5FD8\u7D2F": "y\xED sh\xEC w\xE0ng l\u011Bi", "\u9057\u5BDD\u8F7D\u6000": "y\xED q\u01D0n z\xE0i hu\xE1i", "\u79FB\u5B5D\u4E3A\u5FE0": "y\xED xi\xE0o w\xE9i zh\u014Dng", "\u79FB\u7684\u5C31\u7BAD": "y\xED d\xEC ji\xF9 ji\xE0n", "\u4F9D\u5934\u7F15\u5F53": "y\u012B t\xF3u l\u01DA d\xE0ng", "\u8863\u79DF\u98DF\u7A0E": "y\xEC z\u016B sh\xED shu\xEC", "\u8863\u8F7B\u4E58\u80A5": "y\xEC q\u012Bng ch\xE9ng f\xE9i", "\u8863\u88F3\u4E4B\u4F1A": "y\u012B sh\u0101ng zh\u012B hu\xEC", "\u8863\u9526\u98DF\u8089": "y\xEC j\u01D0n sh\xED r\xF2u", "\u8863\u9526\u8FC7\u4E61": "y\xEC j\u01D0n gu\xF2 xi\u0101ng", "\u8863\u5355\u98DF\u8584": "y\u012B d\u0101n sh\xED b\xF3", "\u4E00\u91CD\u4E00\u63A9": "y\u012B ch\xF3ng y\u012B y\u01CEn", "\u4E00\u4E4B\u4E3A\u751A": "y\u012B zh\u012B w\xE9i sh\xE8n", "\u4E00\u7B11\u4E86\u4E8B": "y\u012B xi\xE0o le sh\xEC", "\u4E00\u73B0\u6619\u534E": "y\u012B xi\xE0n t\xE1n hu\u0101", "\u4E00\u5C81\u8F7D\u8D66": "y\u012B su\xEC z\xE0i sh\xE8", "\u4E00\u5207\u4E07\u7269": "y\u012B qi\u0113 w\xE0n w\xF9", "\u4E00\u76EE\u4E94\u884C": "y\u012B m\xF9 w\u01D4 h\xE1ng", "\u4E00\u9CDE\u4E00\u722A": "y\u012B l\xEDn y\u012B zh\u01CEo", "\u4E00\u9CDE\u7247\u722A": "y\u012B l\xEDn pi\xE0n zh\u01CEo", "\u4E00\u4E86\u767E\u5F53": "y\u012B li\u01CEo b\u01CEi d\xE0ng", "\u4E00\u89C1\u4E86\u7136": "y\u012B ji\xE0n le r\xE1n", "\u4E00\u8FD8\u4E00\u62A5": "y\u012B hu\xE1n y\u012B b\xE0o", "\u4E00\u6BEB\u4E0D\u5DEE": "y\u012B h\xE1o b\xF9 ch\u0101", "\u4E00\u5021\u767E\u548C": "y\u012B ch\xE0ng b\u01CEi h\xE8", "\u4E00\u97AD\u5148\u8457": "y\u012B bi\u0101n xi\u0101n zhu\xF3", "\u4E00\u7B14\u62B9\u644B": "y\u012B b\u01D0 m\xF2 s\xE0", "\u4E00\u66B4\u5341\u5BD2": "y\u012B p\xF9 sh\xED h\xE1n", "\u591C\u9759\u66F4\u9611": "y\xE8 j\xECng g\u0113ng l\xE1n", "\u53F6\u516C\u597D\u9F99": "y\xE8 g\u014Dng h\xE0o l\xF3ng", "\u91CE\u8C03\u65E0\u8154": "y\u011B di\xE0o w\xFA qi\u0101ng", "\u54AC\u8840\u4E3A\u76DF": "y\u01CEo xu\xE8 w\xE9i m\xE9ng", "\u7476\u6C60\u5973\u4F7F": "y\xE1o shi n\u01DA sh\u01D0", "\u5E7A\u9EBD\u5C0F\u4E11": "y\u0101o m\u01D2 xi\u01CEo ch\u01D2u", "\u517B\u7CBE\u755C\u9510": "y\u01CEng j\u012Bng x\xF9 ru\xEC", "\u4EF0\u5C4B\u7740\u4E66": "y\u01CEng w\u016B zh\xF9 sh\u016B", "\u536C\u9996\u4FE1\u7709": "\xE1ng sh\u01D2u sh\u0113n m\xE9i", "\u6D0B\u6D0B\u7E9A\u7E9A": "y\xE1ng y\xE1ng s\u01CE s\u01CE", "\u7F8A\u7F94\u7F8E\u9152": "y\xE1n g\u0101o m\u011Bi ji\u01D4", "\u7F8A\u80A0\u4E5D\u66F2": "y\xE1ng ch\xE1ng ji\u01D4 q\u01D4", "\u626C\u7709\u7734\u76EE": "y\xE1ng m\xE9i sh\xF9n m\xF9", "\u626C\u5389\u94FA\u5F20": "y\xE1ng l\xEC p\xF9 zh\u0101ng", "\u626C\u98CE\u6262\u96C5": "y\xE1ng f\u0113ng b\xE0o y\u01CE", "\u71D5\u5B50\u8854\u98DF": "y\xE0n z\u01D0 xi\xE1n sh\xED", "\u71D5\u662D\u5E02\u9A8F": "y\u0101n zh\u0101o sh\xEC j\xF9n", "\u71D5\u662D\u597D\u9A6C": "y\u0101n zh\u0101o h\u01CEo m\u01CE", "\u71D5\u77F3\u5984\u73CD": "y\u0101n sh\xED w\xE0ng zh\u0113n", "\u71D5\u96C0\u5904\u5C4B": "y\xE0n qu\xE8 ch\u01D4 w\u016B", "\u71D5\u9A8F\u5343\u91D1": "y\u0101n j\xF9n qi\u0101n j\u012Bn", "\u71D5\u91D1\u52DF\u79C0": "y\u0101n j\u012Bn m\xF9 xi\xF9", "\u71D5\u9A7E\u8D8A\u6BC2": "y\u0101n ji\xE0 yu\xE8 g\u016B", "\u71D5\u6B4C\u8D75\u821E": "y\u0101n g\u0113 zh\xE0o w\u01D4", "\u71D5\u5CB1\u4E4B\u77F3": "y\u0101n d\xE0i zh\u012B sh\xED", "\u71D5\u5904\u711A\u5DE2": "y\xE0n ch\u01D4 f\xE9n ch\xE1o", "\u71D5\u5904\u5371\u5DE2": "y\xE0n ch\u01D4 w\u0113i ch\xE1o", "\u71D5\u5DE2\u5E59\u4E0A": "y\xE0n ch\xE1o y\xFA sh\xE0ng", "\u639E\u85FB\u98DE\u58F0": "sh\u01CEn z\u01CEo f\u0113i sh\u0113ng", "\u5043\u9769\u4E3A\u8F69": "y\u01CEn g\xE9 w\xE9i xu\u0101n", "\u5CA9\u6816\u7A74\u5904": "y\xE1n q\u012B xu\xE9 ch\u01D4", "\u5CA9\u5C45\u7A74\u5904": "y\xE1n j\u016B xu\xE9 ch\u01D4", "\u598D\u86A9\u597D\u6076": "y\xE1n ch\u012B h\u01CEo \xE8", "\u538B\u826F\u4E3A\u8D31": "y\u0101 li\xE1ng w\xE9i ji\xE0n", "\u6400\u884C\u593A\u5E02": "ch\u0101n h\xE1ng du\xF3 sh\xEC", "\u4E09\u5341\u516D\u884C": "s\u0101n sh\xED li\xF9 h\xE1ng", "\u6CE3\u6570\u884C\u4E0B": "q\xEC sh\xF9 h\xE1ng xi\xE0", "\u5F53\u884C\u51FA\u8272": "d\u0101ng h\xE1ng ch\u016B s\xE8", "\u76EE\u4E0B\u5341\u884C": "m\xF9 xi\xE0 sh\xED h\xE1ng", "\u79C0\u51FA\u73ED\u884C": "xi\xF9 ch\u016B b\u0101n h\xE1ng", "\u513F\u5973\u6210\u884C": "\xE9r n\u01DA ch\xE9ng h\xE1ng", "\u5927\u884C\u5927\u5E02": "d\xE0 h\xE1ng d\xE0 sh\xEC", "\u5341\u884C\u4FF1\u4E0B": "sh\xED h\xE1ng j\xF9 xi\xE0", "\u5BFB\u884C\u6570\u58A8": "x\xFAn h\xE1ng sh\u01D4 m\xF2", "\u718F\u83B8\u540C\u5668": "x\xFAn y\xF3u t\xF3ng q\xEC", "\u57D9\u7BEA\u76F8\u548C": "x\u016Bn ch\xED xi\u0101ng h\xE8", "\u8840\u503A\u7D2F\u7D2F": "xu\xE8 zh\xE0i l\u011Bi l\u011Bi", "\u96EA\u9E3F\u6307\u722A": "xu\u011B h\xF3ng zh\u01D0 zh\u01CEo", "\u8852\u7389\u8D3E\u77F3": "zu\xEC y\xF9 ji\u01CE sh\xED", "\u70AB\u7389\u8D3E\u77F3": "xu\xE0n y\xF9 g\u01D4 sh\xED", "\u70AB\u77F3\u4E3A\u7389": "xu\xE0n sh\xED w\xE9i y\xF9", "\u65CB\u5E72\u8F6C\u5764": "xu\xE1n qi\xE1n zhu\u01CEn k\u016Bn", "\u60AC\u77F3\u7A0B\u4E66": "xu\xE1n d\xE0n ch\xE9ng sh\u016B", "\u60AC\u72DF\u7D20\u98E1": "xu\xE1n hu\xE1n s\xF9 k\xF2u", "\u60AC\u9F9F\u7CFB\u9C7C": "xu\xE1n gu\u012B j\xEC y\xFA", "\u63CE\u62F3\u6370\u8896": "xu\u0101n qu\xE1n l\u01D2ng xi\xF9", "\u63CE\u62F3\u634B\u8896": "xu\u0101n qu\xE1n lu\u014D xi\xF9", "\u8F69\u9E64\u51A0\u7334": "xu\u0101n h\xE8 gu\xE0n h\xF3u", "\u755C\u59BB\u517B\u5B50": "x\xF9 q\u012B y\u01CEng z\u01D0", "\u9B46\u98CE\u9AA4\u96E8": "zhu\u014D f\u0113ng zh\xF2u y\u01D4", "\u890E\u7136\u51A0\u9996": "y\xF2u r\xE1n gu\xE0n sh\u01D2u", "\u7F9E\u4EBA\u7B54\u7B54": "xi\u016B r\xE9n d\u0101 d\u0101", "\u4FEE\u9CDE\u517B\u722A": "xi\u016B l\xEDn y\u01CEng zh\u01CEo", "\u718A\u636E\u864E\u8DF1": "xi\xF3ng j\xF9 h\u01D4 sh\u0113n", "\u6C79\u6D8C\u6DDC\u6E43": "xi\u014Dng y\u01D2ng p\xE9ng pai", "\u5144\u6B7B\u5F1F\u53CA": "xi\u014Dng f\xE9i d\xEC j\xED", "\u8165\u95FB\u5728\u4E0A": "x\xEDng w\xE9n z\xE0i sh\xE0ng", "\u5174\u6587\u533D\u6B66": "x\u012Bng w\xE9n di\xE0o w\u01D4", "\u5174\u5982\u56BC\u8721": "x\xECng r\xFA ji\xE1o l\xE0", "\u5174\u89C2\u7FA4\u6028": "x\xECng gu\u0101n q\xFAn yu\xE0n", "\u5174\u9AD8\u5F69\u70C8": "x\xECng g\u0101o c\u01CEi li\xE8", "\u5FC3\u77BB\u9B4F\u9619": "x\u012Bn zh\u0101n w\xE8i qu\xE8", "\u5FC3\u5728\u9B4F\u9619": "x\u012Bn z\xE0i w\xE8i qu\xE8", "\u5FC3\u540C\u6B62\u6C34": "x\u012Bn r\xFA zh\u01D0 shu\u01D0", "\u5FC3\u624B\u76F8\u5E94": "x\u012Bn sh\u01D2u xi\u0101ng y\xECng", "\u5FC3\u624B\u76F8\u5FD8": "x\u012Bn sh\u01D2u xi\u0101ng w\xE0ng", "\u5FC3\u53E3\u76F8\u5E94": "x\u012Bn k\u01D2u xi\u0101ng y\u012Bng", "\u5FC3\u5E7F\u4F53\u80D6": "x\u012Bn gu\u01CEng t\u01D0 p\xE1n", "\u5FC3\u9A70\u9B4F\u9619": "x\u012Bn ch\xED w\xE8i qu\xE8", "\u5FC3\u4E0D\u5E94\u53E3": "x\u012Bn b\xF9 y\u012Bng k\u01D2u", "\u631F\u52BF\u5F04\u6743": "ji\u0101 sh\xEC n\xF2ng qu\xE1n", "\u80C1\u80A9\u7D2F\u8DB3": "xi\xE9 ji\u0101n l\u011Bi z\xFA", "\u90AA\u9B54\u5916\u795F": "xi\xE9 m\xF3 wai su\xEC", "\u6569\u5B66\u76F8\u957F": "zu\xE0n xu\xE9 xi\u0101ng ch\xE1ng", "\u6821\u77ED\u91CF\u957F": "ji\xE0o du\u01CEn li\xE1ng ch\xE1ng", "\u5C0F\u773C\u8584\u76AE": "xi\u01CEo y\u01CEn b\xF3 p\xED", "\u5C0F\u5EC9\u66F2\u8C28": "xi\u01CEo li\xE1n q\u01D4 j\u01D0n", "\u785D\u4E91\u5F39\u96E8": "xi\u0101o y\xFAn d\xE0n y\u01D4", "\u9E2E\u9E23\u9F20\u66B4": "zh\u0101ng m\xEDng sh\u01D4 b\xE0o", "\u524A\u682A\u6398\u6839": "xu\u0113 zh\u016B ju\xE9 g\u0113n", "\u524A\u94C1\u65E0\u58F0": "xu\u0113 ti\u011B w\xFA sh\u0113ng", "\u524A\u804C\u4E3A\u6C11": "xu\u0113 zh\xED w\xE9i m\xEDn", "\u524A\u6728\u4E3A\u540F": "xu\u0113 m\xF9 w\xE9i l\xEC", "\u524A\u8349\u9664\u6839": "xu\u0113 c\u01CEo ch\xFA g\u0113n", "\u6A61\u76AE\u9489\u5B50": "xi\xE0ng p\xED d\xECng z\u01D0", "\u60F3\u671B\u98CE\u8931": "xi\u01CEng w\xE0ng f\u0113ng sh\xE8ng", "\u9999\u57F9\u7389\u7422": "xiang pei yu zuo", "\u76F8\u4E0E\u4E3A\u4E00": "xi\u0101ng y\u01D4 w\xE9i y\u012B", "\u76F8\u9F20\u6709\u76AE": "xi\xE0ng sh\u01D4 y\u01D2u p\xED", "\u76F8\u65F6\u800C\u52A8": "xi\xE0ng sh\xED \xE9r d\xF2ng", "\u76F8\u5207\u76F8\u78CB": "xi\u0101ng qi\u0113 xi\u0101ng cu\u014D", "\u76F8\u5973\u914D\u592B": "xi\xE0ng n\u01DA p\xE8i f\u016B", "\u76F8\u95E8\u6709\u76F8": "xi\xE0ng m\xE9n y\u01D2u xi\xE0ng", "\u6326\u7AE0\u64A6\u53E5": "l\xF3ng zh\u0101ng z\u014Dng j\xF9", "\u95F2\u6101\u4E07\u79CD": "xi\xE1n ch\xF3u w\xE0n zh\u01D2ng", "\u5148\u6211\u7740\u97AD": "xi\u0101n w\u01D2 zhu\xF3 bi\u0101n", "\u4E60\u7109\u4E0D\u5BDF": "x\u012B y\u0101n b\xF9 ch\xE1", "\u6B59\u6F06\u963F\u80F6": "sh\xE8 q\u012B \u0113 ji\u0101o", "\u6670\u6BDB\u8FA8\u53D1": "x\u012B m\xE1o bi\xE0n f\xE0", "\u6089\u7D22\u8584\u8D4B": "x\u012B su\u01D2 b\xF3 f\xF9", "\u96FE\u9CDE\u4E91\u722A": "w\xF9 l\xEDn y\xFAn zh\u01CEo", "\u8BEF\u4F5C\u975E\u4E3A": "w\xF9 zu\xF2 f\u0113i w\xE9i", "\u7269\u7A00\u4E3A\u8D35": "w\xF9 x\u012B w\xE9i gu\xEC", "\u821E\u722A\u5F20\u7259": "w\u01D4 zh\u01CEo zh\u0101ng y\xE1", "\u7894\u7806\u6DF7\u7389": "zh\xEC f\u016B h\xF9n y\xF9", "\u6B66\u65AD\u4E13\u6A2A": "w\u01D4 du\xE0n zhu\u0101n h\xE9ng", "\u4E94\u77F3\u516D\u9E62": "w\u01D4 sh\xED li\xF9 y\u012B", "\u4E94\u8272\u76F8\u5BA3": "w\u01D4 s\xE8 xi\u0101ng xu\u0101n", "\u4E94\u4FAF\u4E03\u8D35": "w\u01D4 h\xF2u q\u012B gu\xEC", "\u4E94\u4FAF\u8721\u70DB": "w\u01D4 h\xF2u l\xE0 zh\xFA", "\u4E94\u7F96\u5927\u592B": "w\u01D4 g\u01D4 d\xE0 f\u016B", "\u543E\u81EA\u6709\u5904": "wu zi you chu", "\u65E0\u4E0E\u4E3A\u6BD4": "w\xFA y\u01D4 w\xE9i b\u01D0", "\u65E0\u4E0B\u7BB8\u5904": "w\xFA xi\xE0 zh\xF9 ch\u01D4", "\u65E0\u9069\u65E0\u83AB": "w\xFA d\xED w\xFA m\xF2", "\u65E0\u4F24\u65E0\u81ED": "w\xFA sh\u0113ng w\xFA xi\xF9", "\u65E0\u80FD\u4E3A\u5F79": "w\xFA n\xE9ng w\xE9i y\xEC", "\u65E0\u5BC7\u66B4\u6B7B": "wu kou b\xE0o shi", "\u65E0\u5B54\u4E0D\u94BB": "w\xFA k\u01D2ng b\xF9 zu\u0101n", "\u65E0\u95F4\u53EF\u4F3A": "w\xFA ji\u0101n k\u011B s\xEC", "\u65E0\u95F4\u53EF\u4E58": "w\xFA ji\u0101n k\u011B ch\xE9ng", "\u65E0\u95F4\u51AC\u590F": "w\xFA ji\u0101n d\u014Dng xi\xE0", "\u65E0\u7F1D\u5929\u8863": "w\xFA f\xE9ng ti\u0101n y\u012B", "\u65E0\u6076\u4E0D\u4E3A": "w\xFA \xE8 b\xF9 w\xE9i", "\u65E0\u52A8\u4E3A\u5927": "w\xFA d\xF2ng w\xE9i d\xE0", "\u65E0\u5730\u81EA\u5904": "w\xFA d\xEC z\xEC ch\u01D4", "\u8BEC\u826F\u4E3A\u76D7": "w\u016B li\xE1ng w\xE9i d\xE0o", "\u63E1\u7C9F\u51FA\u535C": "w\xF2 s\xF9 ch\u016B bo", "\u63E1\u62F3\u900F\u722A": "w\xF2 qu\xE1n t\xF2u zh\u01CEo", "\u7A33\u64CD\u5DE6\u5238": "w\xE9n c\u0101o zu\u01D2 qu\xE0n", "\u95FB\u98CE\u54CD\u5E94": "w\xE9n f\u0113ng xi\u01CEng y\u012Bng", "\u6587\u6B66\u5DEE\u4E8B": "w\xE9n w\u01D4 ch\xE0 sh\xEC", "\u6587\u8EAB\u526A\u53D1": "w\xE9n sh\u0113n ji\u01CEn f\u0101", "\u6587\u623F\u56DB\u4FAF": "w\xE9n f\xE1ng s\xEC h\xF2u", "\u6E29\u6795\u6247\u5E2D": "w\u0113n zh\u011Bn sh\u0101n x\xED", "\u6E29\u5E2D\u6247\u6795": "w\u0113n x\xED sh\u0101n zh\u011Bn", "\u6E29\u51CA\u5B9A\u7701": "w\u0113n q\u01D0ng d\xECng sh\u011Bng", "\u6E29\u887E\u6247\u6795": "w\u0113n q\u012Bn sh\u0101n zh\u011Bn", "\u4EB9\u4EB9\u4E0D\u5026": "t\u0101n w\u011Bi b\xF9 ju\xE0n", "\u59D4\u59D4\u4F57\u4F57": "w\u0113i w\u0113i tu\xF3 tu\xF3", "\u59D4\u66F2\u6210\u5168": "w\u011Bi q\u01D4 ch\xE9ng qu\xE1n", "\u5C3E\u5927\u96BE\u6389": "w\u011Bi d\xE0 n\xE1n di\xE0o", "\u60DF\u6240\u6B32\u4E3A": "w\xE9i su\u01D2 y\xF9 w\xE9i", "\u60DF\u65E5\u4E3A\u5C81": "w\xE9i r\xEC w\xE9i su\xEC", "\u60DF\u5229\u662F\u8D8B": "w\xE9i l\xEC sh\xEC q\xFA", "\u5E37\u8584\u4E0D\u4FEE": "w\xE9i b\xF3 b\xF9 xi\u016B", "\u552F\u552F\u5426\u5426": "w\u011Bi w\u011Bi f\u01D2u f\u01D2u", "\u552F\u6240\u6B32\u4E3A": "w\xE9i su\u01D2 y\xF9 w\xE9i", "\u4E3A\u86C7\u6DFB\u8DB3": "w\xE9i sh\xE9 ti\u0101n z\xFA", "\u4E3A\u5584\u6700\u4E50": "w\xE9i sh\xE0n zu\xEC l\xE8", "\u4E3A\u86C7\u753B\u8DB3": "w\xE9i sh\xE9 hu\xE0 z\xFA", "\u4E3A\u5C71\u6B62\u7BD1": "w\xE9i sh\u0101n zh\u01D0 ku\xEC", "\u4E3A\u4EC1\u4E0D\u5BCC": "w\xE9i r\xE9n b\xF9 f\xF9", "\u4E3A\u88D8\u4E3A\u7B95": "w\xE9i qi\xFA w\xE9i j\u012B", "\u4E3A\u6C11\u7236\u6BCD": "w\xE9i m\xEDn f\xF9 m\u01D4", "\u4E3A\u867A\u5F17\u6467": "w\xE9i hu\u01D0 f\xFA cu\u012B", "\u4E3A\u597D\u6210\u6B49": "w\xE9i h\u01CEo ch\xE9ng qi\xE0n", "\u4E3A\u9B3C\u4E3A\u872E": "w\xE9i gu\u01D0 w\xE9i y\xF9", "\u4E3A\u6CD5\u81EA\u5F0A": "w\xE9i f\u01CE z\xEC b\xEC", "\u4E3A\u6076\u4E0D\u609B": "w\xE9i \xE8 b\xF9 qu\u0101n", "\u4E3A\u5FB7\u4E0D\u7EC8": "w\xE9i d\xE9 b\xF9 zh\u014Dng", "\u7168\u5E72\u5C31\u6E7F": "w\u0113i g\xE0n ji\xF9 sh\u012B", "\u7168\u5E72\u907F\u6E7F": "w\u0113i g\xE0n b\xEC sh\u012B", "\u5371\u4E8E\u7D2F\u5375": "w\u0113i y\xFA l\u011Bi lu\u01CEn", "\u671B\u98CE\u54CD\u5E94": "w\xE0ng f\u0113ng xi\u01CEng y\u012Bng", "\u671B\u5C18\u50C4\u58F0": "w\xE0ng ch\xE9n b\xF9 sh\u0113ng", "\u6789\u66F2\u76F4\u51D1": "w\u01CEng q\u01D4 zh\xED c\xF2u", "\u5F80\u6E1A\u8FD8\u6C40": "w\u01CEng zh\u01D4 hu\xE1n t\u012Bng", "\u738B\u8D21\u5F39\u51A0": "w\xE1ng g\xF2ng d\xE0n gu\xE0n", "\u4EA1\u9B42\u5931\u9B44": "w\xE1ng h\xFAn sh\u012B h\xFAn", "\u4EA1\u56FD\u5927\u592B": "w\xE1ng gu\xF3 d\xE0 f\u016B", "\u4E07\u8F7D\u5343\u79CB": "w\xE0n z\xE0i qi\u0101n qi\u016B", "\u4E07\u8D2F\u5BB6\u79C1": "w\xE0n gu\xE0n ji s\u012B", "\u4E07\u592B\u4E0D\u5F53": "w\xE0n f\u016B b\xF9 d\u0101ng", "\u4E07\u522B\u5343\u5DEE": "w\xE0n bi\xE9 qi\u0101n ch\u0101", "\u665A\u98DF\u5F53\u8089": "w\u01CEn sh\xED d\xE0ng r\xF2u", "\u665A\u8282\u4E0D\u4FDD": "w\u01CEn j\xEDe b\xF9 b\u01CEo", "\u73A9\u5C81\u6112\u6708": "w\xE1n su\xEC y\u012B yu\xE8", "\u73A9\u5C81\u6112\u65F6": "w\xE1n su\xEC y\u012B sh\xED", "\u73A9\u65F6\u6112\u65E5": "w\xE1n sh\xED \xE0i r\xEC", "\u86D9\u87C6\u80DC\u8D1F": "w\u0101 m\xE1 sh\xE8ng f\xF9", "\u541E\u8A00\u54BD\u7406": "t\u016Bn y\xE1n y\u0101n l\u01D0", "\u9893\u57A3\u65AD\u5811": "tu\xED yu\xE1n du\xE0n pi\xE0n", "\u63A8\u67AF\u6298\u8150": "tu\u012B k\u016B sh\xE9 f\u01D4", "\u63A8\u5E72\u5C31\u6E7F": "tu\u012B g\xE0n ji\xF9 sh\u012B", "\u5278\u7E41\u6CBB\u5267": "sh\xED f\xE1n zh\xEC j\xF9", "\u5278\u7E41\u51B3\u5267": "sh\xED f\xE1n ju\xE9 j\xF9", "\u56E2\u5934\u805A\u9762": "tu\xE0n t\xF3u j\xF9 mi\xE0n", "\u5154\u8D70\u9E58\u843D": "t\xF9 z\u01D2u g\u01D4 lu\xF2", "\u5154\u4E1D\u71D5\u9EA6": "t\xF9 s\u012B y\xE0n m\xE0i", "\u5154\u5934\u9E9E\u8111": "t\xF9 t\xF3u su\u014D n\u01CEo", "\u5154\u8475\u71D5\u9EA6": "t\xF9 ku\xED y\xE0n m\xE0i", "\u5154\u89D2\u9F9F\u6BDB": "tu jiao gui mao", "\u5410\u54FA\u63E1\u53D1": "t\u01D4 b\u01D4 w\xF2 f\xE0", "\u5F92\u8BAC\u7A7A\u8A00": "t\xFA t\xFAn k\u014Dng y\xE1n", "\u6295\u4F20\u800C\u53BB": "t\xF3u zhu\xE0n \xE9r q\xF9", "\u5934\u8DB3\u5F02\u5904": "t\xF3u z\xFA y\xEC ch\u01D4", "\u5934\u4E0A\u8457\u5934": "t\xF3u sh\xE0ng zhu\xF3 t\xF3u", "\u5934\u6CA1\u676F\u6848": "t\xF3u m\xF2 b\u0113i \xE0n", "\u5934\u660F\u8111\u95F7": "t\xF3u h\u016Bn n\u01CEo m\xE8n", "\u5934\u4F1A\u7B95\u655B": "t\xF3u ku\xE0n j\u012B li\u01CEn", "\u5934\u4F1A\u7B95\u8D4B": "t\xF3u ku\xE0i j\u012B f\xF9", "\u5934\u51FA\u5934\u6CA1": "t\xF3u ch\u016B t\xF3u m\xF2", "\u75DB\u81EA\u521B\u827E": "t\xF2ng z\xEC chu\u0101ng y\xEC", "\u75DB\u6DF1\u6076\u7EDD": "t\xF2ng sh\u0113n w\xF9 ju\xE9", "\u540C\u6E90\u5F02\u6D3E": "t\xF3ng yu\xE1n y\xEC pai", "\u540C\u5FC3\u50C7\u529B": "t\xF3ng x\u012Bn ji\xE9 l\xEC", "\u540C\u5DE5\u5F02\u66F2": "t\xF3ng g\u014Dng y\xEC q\u01D4", "\u540C\u6076\u76F8\u52A9": "t\xF3ng w\xF9 xi\u0101ng zh\xF9", "\u540C\u6076\u76F8\u6064": "t\xF3ng w\xF9 xi\u0101ng x\xF9", "\u75CC\u761D\u5728\u62B1": "t\u014Dng gu\u0101n z\xE0o b\xE0o", "\u901A\u6587\u8C03\u6B66": "t\u014Dng w\xE9n di\xE0o w\u01D4", "\u901A\u540C\u4E00\u6C14": "t\u014Dng t\xF3ng y\u012B y\xEC", "\u94E4\u9E7F\u8D70\u9669": "d\xECng l\xF9 z\u01D2u xi\u01CEn", "\u505C\u7559\u957F\u667A": "t\xEDng li\xFA zh\u01CEng zh\xEC", "\u94C1\u6811\u5F00\u534E": "ti\u011B sh\xF9 k\u0101i hu\u0101", "\u6761\u8D2F\u90E8\u5206": "ti\xE1o gu\xE0n b\xF9 f\u0113n", "\u6311\u7259\u6599\u5507": "ti\u01CEo y\xE1 li\xE0o ch\xFAn", "\u6311\u4E48\u6311\u516D": "ti\u0101o y\u0101o ti\u0101o li\xF9", "\u6311\u5507\u6599\u5634": "ti\u01CEo ch\xFAn li\xE0o zu\u01D0", "\u9766\u989C\u4E8B\u4EC7": "ti\u01CEn y\xE1n sh\xEC ch\xF3u", "\u606C\u4E0D\u4E3A\u610F": "ti\xE1n b\xF9 w\xE9i y\xEC", "\u606C\u4E0D\u4E3A\u602A": "ti\xE1n b\xF9 w\xE9i gu\xE0i", "\u5929\u4E0B\u4E3A\u7B3C": "ti\u0101n xi\xE0 w\xE9i l\xF3ng", "\u5929\u53F0\u8DEF\u8FF7": "ti\u0101n t\xE1i l\xF9 m\xED", "\u5929\u5E74\u4E0D\u9042": "ti\u0101n ni\xE1n b\xF9 su\xEC", "\u5929\u5B9D\u5F53\u5E74": "tian bao dang nian", "\u6843\u8E4A\u67F3\u66F2": "t\xE1o q\u012B li\u01D4 q\u01D4", "\u5802\u7687\u51A0\u5195": "t\xE1ng hu\xE1ng gu\xE0n mi\u01CEn", "\u63A2\u56CA\u80E0\u7BA7": "t\xE0n n\xE1ng w\xFA qi\xE8", "\u8C2D\u8A00\u5FAE\u4E2D": "t\xE1n y\xE1n w\u0113i zh\xF2ng", "\u8C08\u8A00\u5FAE\u4E2D": "t\xE1n y\xE1n w\u0113i zh\xF2ng", "\u8D2A\u592B\u72E5\u8D22": "t\u0101n f\u016B hu\xE1i c\xE1i", "\u6CF0\u5C71\u76D8\u77F3": "tai sh\u0101n p\xE1n sh\xED", "\u6CF0\u6765\u5426\u5F80": "t\xE0i l\xE1i p\u01D0 w\u01CEng", "\u6CF0\u6765\u5426\u6781": "tai l\xE1i f\u01D2u j\xED", "\u6CF0\u6781\u800C\u5426": "t\xE0i j\xED \xE9r p\u01D0", "\u72E7\u7A45\u53CA\u7C73": "sh\xEC k\u01CEn j\xED m\u01D0", "\u635F\u519B\u6298\u5C06": "s\u01D4n j\u016Bn zh\xE9 ji\xE0ng", "\u9042\u5FC3\u5E94\u624B": "su\xEC x\u012Bn y\u012Bng sh\u01D2u", "\u9042\u8FF7\u4E0D\u7AB9": "su\xED m\xE9i b\xF9 w\xF9", "\u5C81\u6708\u4E0D\u5C45": "su\xEC yu\xE8 b\xF9 j\xFA", "\u5C81\u807F\u5176\u83AB": "su\xEC y\xF9 q\xED m\xF9", "\u968F\u7269\u5E94\u673A": "su\xED w\xF9 y\u012Bng j\u012B", "\u968F\u98CE\u800C\u9761": "su\xED f\u0113ng \xE9r m\u01D0", "\u5BBF\u96E8\u9910\u98CE": "xi\u01D4 y\u01D4 c\u0101n f\u0113ng", "\u5BBF\u6C34\u98E1\u98CE": "xi\u01D4 shu\u01D0 c\u0101n f\u0113ng", "\u5BBF\u6C34\u9910\u98CE": "xi\u01D4 shu\u01D0 c\u0101n f\u0113ng", "\u5919\u5174\u591C\u5904": "s\xF9 x\u012Bng y\xE8 ch\u01D4", "\u641C\u5CA9\u91C7\u5E72": "s\u014Du y\xE1n c\u01CEi g\xE0n", "\u85AE\u4E2D\u8346\u66F2": "s\u01D2u zh\u014Dng j\xED q\u01D4", "\u5B8B\u65A4\u9C81\u524A": "s\xF2ng j\u012Bn l\u01D4 xu\u0113", "\u677E\u7B60\u4E4B\u8282": "s\u014Dng j\u016Bn zh\u012B ji\xE9", "\u9A03\u7AE5\u949D\u592B": "\xE1i t\xF3ng d\xF9n f\u016B", "\u9A03\u5973\u75F4\u7537": "\xE1i n\u01DA ch\u012B n\xE1n", "\u56DB\u4EAD\u516B\u5F53": "s\xEC t\xEDng b\u0101 d\xE0ng", "\u56DB\u9A6C\u6512\u8E44": "s\xEC m\u01CE cu\xE1n t\xED", "\u56DB\u4E0D\u62D7\u516D": "s\xEC b\xF9 ni\xF9 li\xF9", "\u65AF\u4E8B\u4F53\u5927": "\u012B sh\xEC t\u01D0 d\xE0", "\u601D\u6240\u9010\u4E4B": "si shuo zhu zi", "\u4E1D\u6069\u53D1\u6028": "s\u012B \u0113n f\xE0 yu\xE0n", "\u7855\u671B\u5BBF\u5FB7": "shu\xF2 w\xE0ng xi\u01D4 d\xE9", "\u94C4\u53E4\u5207\u4ECA": "shu\xF2 g\u01D4 qi\u0113 j\u012Bn", "\u987A\u5929\u5E94\u65F6": "sh\xF9n ti\u0101n y\u012Bng sh\xED", "\u987A\u98CE\u8F6C\u8235": "sh\u01D4n f\u0113ng zhu\u01CEn du\xF2", "\u987A\u98CE\u9A76\u8239": "sh\u01D4n f\u0113ng sh\u01D0 chu\xE1n", "\u987A\u98CE\u4F7F\u8239": "sh\u01D4n f\u0113ng sh\u01D0 chu\xE1n", "\u987A\u98CE\u800C\u547C": "sh\u01D4n f\u0113ng \xE9r h\u016B", "\u987A\u98CE\u5439\u706B": "sh\u01D4n f\u0113ng chu\u012B hu\u01D2", "\u6C34\u4E2D\u6349\u6708": "shui zhong zhuo yue", "\u6C34\u4E2D\u8457\u76D0": "shu\u01D0 zh\u014Dng zhu\xF3 y\xE1n", "\u6C34\u5BBF\u98CE\u9910": "shu\u01D0 xi\u01D4 f\u0113ng c\u0101n", "\u6C34\u7C73\u65E0\u5E72": "shu\u01D0 m\u01D0 w\xFA g\xE0n", "\u6C34\u957F\u8239\u9AD8": "shu\u01D0 zh\u01CEng chu\xE1n g\u0101o", "\u53CC\u8DB3\u91CD\u8327": "shu\u0101ng z\xFA ch\xF3ng ji\u01CEn", "\u53CC\u67D1\u6597\u9152": "shu\xE0i g\u0101n d\u01D2u ji\u01D4", "\u6570\u7C73\u800C\u708A": "sh\u01D4 m\u01D0 \xE9r chu\u012B", "\u6570\u5F80\u77E5\u6765": "sh\u01D4 w\u01CEng zh\u012B l\xE1i", "\u6570\u7C73\u91CF\u67F4": "sh\u01D4 m\u01D0 \xE9r ch\xE1i", "\u6570\u7406\u903B\u8F91": "sh\xF9 l\u01D0 lu\xF3 ji", "\u6570\u89C1\u4E0D\u9C9C": "shu\xF2 ji\xE0n b\xF9 xi\u0101n", "\u6570\u9EC4\u9053\u9ED1": "shu huang dao hei", "\u6570\u9ED1\u8BBA\u9EC4": "sh\u01D4 h\u0113i l\xF9n hu\xE1ng", "\u6570\u77ED\u8BBA\u957F": "sh\u01D4 du\u01CEn l\xF9n ch\xE1ng", "\u6570\u767D\u8BBA\u9EC4": "sh\u01D4 b\xE1i l\xF9n hu\xE1ng", "\u675F\u7F0A\u8FD8\u5987": "sh\xF9 y\u016Bn hu\xE1n f\xF9", "\u675F\u7F0A\u4E3E\u706B": "sh\xF9 y\u016Bn j\u01D4 hu\u01D2", "\u675F\u8EAB\u81EA\u597D": "sh\xF9 sh\u0113n z\xEC h\xE0o", "\u675F\u84B2\u4E3A\u812F": "sh\xF9 p\xFA w\xE9i p\xFA", "\u675F\u5E26\u7ED3\u53D1": "sh\xF9 d\xE0i ji\xE9 f\u0101", "\u675F\u693D\u4E3A\u67F1": "sh\xF9 chu\xE1n w\xE9i zh\xF9", "\u4E66\u7F3A\u6709\u95F4": "sh\u016B qu\u0113 y\u01D2u ji\xE0n", "\u7626\u9AA8\u68AD\u68F1": "sh\xF2u g\u01D4 l\xE9ng l\xE9ng", "\u9996\u8DB3\u5F02\u5904": "sh\u01D2u z\xFA y\xEC ch\u01D4", "\u624B\u8DB3\u91CD\u8327": "sh\u01D2u z\xFA ch\xF3ng ji\u01CEn", "\u624B\u8DB3\u5F02\u5904": "sh\u01D2u z\xFA y\xEC ch\u01D4", "\u624B\u811A\u5E72\u51C0": "sh\u01D2u ji\u01CEo g\xE0n j\xECng", "\u624B\u4E0D\u5E94\u5FC3": "sh\u01D2u b\xF9 y\u012Bng x\u012Bn", "\u6536\u56E0\u79CD\u679C": "sh\u014Du y\u012Bn zh\u01D2ng gu\u01D2", "\u87AB\u624B\u89E3\u8155": "sh\xEC sh\u01D2u j\u01D0e w\u01CEn", "\u91CA\u77E5\u9057\u5F62": "sh\xEC sh\xEC y\xED x\xEDng", "\u9002\u65F6\u5E94\u52A1": "sh\xEC sh\xED y\u012Bng w\xF9", "\u9002\u5982\u5176\u5206": "sh\xEC r\xFA q\xED f\xE8n", "\u9002\u60C5\u7387\u610F": "sh\xEC q\xEDng shu\xE0i y\xEC", "\u9002\u5C45\u5176\u53CD": "sh\xEC j\xFA q\xED f\u01CEn", "\u9002\u5F53\u5176\u65F6": "sh\xEC d\u0101ng q\xED sh\xED", "\u9002\u5F53\u5176\u51B2": "sh\xEC d\u0101ng q\xED ch\u014Dng", "\u9970\u975E\u9042\u8FC7": "sh\xEC f\u0113i su\xED gu\xF2", "\u89C6\u4E3A\u77E5\u5DF1": "sh\xEC w\xE9i zh\u012B j\u01D0", "\u89C6\u4E3A\u513F\u620F": "sh\xEC w\xE9i \xE9r x\xEC", "\u89C6\u5FAE\u77E5\u8457": "sh\xEC w\u0113i zh\u012B zhu\xF3", "\u4E8B\u4E0E\u5FC3\u8FDD": "sh\xEC y\xF9 x\u012Bn w\xE9i", "\u4F7F\u7F8A\u5C06\u72FC": "sh\u01D0 y\xE1ng ji\xE0ng l\xE1ng", "\u98DF\u4E3A\u6C11\u5929": "sh\xED w\xE9i m\xEDn ti\u0101n", "\u98DF\u4E0D\u91CD\u5473": "sh\xED b\xF9 ch\xF3ng w\xE8i", "\u98DF\u4E0D\u91CD\u8089": "sh\xED b\xF9 zh\xF3ng r\xF2u", "\u62FE\u6387\u65E0\u9057": "shi duo wu yi", "\u62FE\u5E26\u91CD\u8FD8": "sh\xED d\xE0i zh\xF2ng hu\xE1n", "\u5B9E\u4E0E\u6709\u529B": "sh\xED y\xF9 y\u01D2u l\xEC", "\u5B9E\u506A\u5904\u6B64": "sh\xED b\xE8ng ch\u01D4 c\u01D0", "\u8BC6\u5FAE\u77E5\u8457": "sh\xED w\u0113i zh\u012B zhu\xF3", "\u65F6\u8FD0\u4E0D\u9F50": "sh\xED y\xF9n b\xF9 j\xEC", "\u65F6\u4EA8\u8FD0\u6CF0": "sh\xED h\u0113ng y\xF9n tai", "\u77F3\u82F1\u73BB\u7483": "sh\xED y\u012Bng b\u014D li", "\u77F3\u5BA4\u91D1\u532E": "sh\xED sh\xEC j\u012Bn gu\xEC", "\u4EC0\u88AD\u73CD\u85CF": "sh\xED x\xED zh\u0113n c\xE1ng", "\u4EC0\u88AD\u4EE5\u85CF": "sh\xED x\xED y\u01D0 c\xE1ng", "\u4EC0\u4F0D\u4E1C\u897F": "sh\xED w\u01D4 d\u014Dng x\u012B", "\u4EC0\u88AD\u800C\u85CF": "sh\xED x\u012B \xE9r c\xE1ng", "\u4EC0\u56F4\u4F0D\u653B": "sh\xED w\xE9i w\u01D4 g\u014Dng", "\u5341\u9B54\u4E5D\u96BE": "sh\xED m\xF3 ji\u01D4 n\xE0n", "\u5341\u592B\u697A\u690E": "sh\xED f\u016B zh\u012B zhu\u012B", "\u5341\u4E0D\u5F53\u4E00": "sh\xED b\xF9 hu\xF2 y\u012B", "\u8BD7\u4E66\u53D1\u51A2": "sh\u012B sh\u016B f\xE0 zh\u01D2ng", "\u8671\u5904\u88C8\u4E2D": "sh\u012B ch\u01D4 k\u016Bn zh\u014Dng", "\u5E08\u76F4\u4E3A\u58EE": "sh\u012B zh\xED w\xE9i zhu\xE0ng", "\u5931\u9A6C\u585E\u7FC1": "sh\u012B m\u01CE s\xE0i w\u0113ng", "\u5C38\u5C45\u9F99\u89C1": "sh\u012B j\u016B l\xF3ng xi\xE0n", "\u76DB\u6C34\u4E0D\u6F0F": "ch\xE9ng shu\u01D0 b\xF9 l\xF2u", "\u5723\u7ECF\u8D24\u4F20": "sh\xE8ng j\u012Bng xi\xE1n zhu\xE0n", "\u5723\u541B\u8D24\u76F8": "sh\xE8ng j\u012Bng xi\xE1n xi\xE0ng", "\u751F\u62D6\u6B7B\u62FD": "sh\u0113ng tu\u014D s\u01D0 zhu\u0101i", "\u5BA1\u66F2\u9762\u57F6": "sh\u011Bn q\u01D4 mi\xE0n x\u012Bn", "\u5BA1\u5DF1\u5EA6\u4EBA": "sh\u011Bn j\u01D0 du\xF3 r\xE9n", "\u6C88\u535A\u7EDD\u4E3D": "ch\xE9n b\xF3 ju\xE9 l\xEC", "\u795E\u6B66\u6302\u51A0": "sh\xE9n w\u01D4 gu\xE0 gu\xE0n", "\u795E\u9F99\u5931\u57F6": "sh\xE9n l\xF3ng sh\u012B zh\xEC", "\u795E\u53F7\u9B3C\u54ED": "sh\xE9n h\xE1o gu\u01D0 k\u016B", "\u795E\u4E0D\u6536\u820D": "sh\xE9n b\xF9 sh\u014Du sh\u011B", "\u6DF1\u6587\u5468\u5185": "sh\u0113n w\xE9n zh\u014Du n\xE0", "\u6DF1\u6587\u66F2\u6298": "sh\u0113n w\xE9n q\u01D4 sh\xE9", "\u6DF1\u5207\u7740\u660E": "sh\u0113n qi\u0113 zhe m\xEDng", "\u6DF1\u5207\u7740\u767D": "sh\u0113n qi\u0113 zhe b\xE1i", "\u6DF1\u5389\u6D45\u63ED": "sh\u0113n l\xEC qi\u01CEn q\xEC", "\u6DF1\u8C37\u4E3A\u9675": "sh\u0113n g\u01D4 w\xE9i l\xEDng", "\u6DF1\u6076\u75DB\u75BE": "sh\u0113n w\xF9 t\xF2ng j\xED", "\u6DF1\u6076\u75DB\u5AC9": "sh\u0113n w\xF9 t\xF2ng j\xED", "\u6DF1\u4EC7\u5BBF\u6028": "sh\u0113n ch\xF3u xi\u01D4 yu\xE0n", "\u8BBE\u5FC3\u5904\u8651": "sh\xE8 x\u012Bn ch\u01D4 l\u01DC", "\u820D\u8FD1\u52A1\u8FDC": "sh\u011B j\xECn w\xF9 yu\u01CEn", "\u820D\u5DF1\u4E3A\u516C": "sh\u011B j\u01D0 w\xE8i g\u014Dng", "\u820D\u8FD1\u5373\u8FDC": "sh\u011B j\xECn j\xED yu\u01CEn", "\u820D\u77ED\u53D6\u957F": "sh\u011B du\u01CEn q\u01D4 ch\xE1ng", "\u820D\u7B56\u8FFD\u7F8A": "sh\u011B c\xE8 zhu\u012B y\xE1ng", "\u86C7\u874E\u4E3A\u5FC3": "sh\xE9 xi\u0113 w\xE9i x\u012Bn", "\u5C11\u5E74\u8001\u8BDA": "sh\u01CEo ni\xE1n l\u01CEo ch\xE9ng", "\u5C11\u6210\u82E5\u6027": "sh\xE0o ch\xE9ng ru\xF2 x\xECng", "\u5C11\u4E0D\u7ECF\u4E8B": "sh\xE0o b\xF9 j\u012Bng sh\xEC", "\u4E0A\u5F53\u5B66\u4E56": "sh\xE0ng d\u0101ng xu\xE9 gu\u0101i", "\u8D4F\u4E0D\u5F53\u529F": "sh\u01CEng b\xF9 d\u0101ng g\u014Dng", "\u5584\u81EA\u4E3A\u8C0B": "sh\xE0n z\xEC w\xE9i m\xF3u", "\u5584\u4E3A\u8BF4\u8F9E": "sh\xE0n w\xE9i shu\u014D c\xED", "\u5584\u5584\u6076\u6076": "sh\xE0n sh\xE0n w\xF9 \xE8", "\u5584\u8D3E\u800C\u6CBD": "sh\xE0n ji\xE0 \xE9r g\u016B", "\u5584\u8D22\u96BE\u820D": "sh\xE0n c\xE1i n\xE1n sh\u011B", "\u6247\u6795\u6E29\u5E2D": "sh\u0101n zh\u011Bn w\u0113n x\xED", "\u6247\u6795\u6E29\u88AB": "sh\u0101n zh\u011Bn w\u0113n chu\xE1ng", "\u82EB\u773C\u94FA\u7709": "sh\u0101n y\u01CEn p\u016B m\xE9i", "\u8BAA\u7259\u95F2\u55D1": "sh\xE0n y\xE1 xi\xE1n k\u0113", "\u5C71\u5CD9\u6E0A\u6E1F": "sh\u0101n zh\xEC yu\u0101n z\u012B", "\u5C71\u9634\u4E58\u5174": "sh\u0101n y\u012Bn ch\xE9ng x\u012Bng", "\u5C71\u6BBD\u91CE\u6E4B": "sh\u0101n y\u0101o y\u011B f\xF9", "\u5C71\u6E9C\u7A7F\u77F3": "sh\u0101n li\xF9 chu\u0101n sh\xED", "\u5C71\u8282\u85FB\u68C1": "sh\u0101n ji\xE9 z\u01CEo l\xEC", "\u6C99\u9E25\u7FD4\u96C6": "sha ou xiang ji", "\u6740\u8863\u7F29\u98DF": "sh\xE0i y\u012B su\u014D sh\xED", "\u6740\u9E21\u4E3A\u9ECD": "sh\u0101 j\u012B w\xE9i sh\u01D4", "\u8272\u5389\u80C6\u8584": "s\xE8 l\xEC d\u01CEn b\xF3", "\u4E27\u80C6\u9500\u9B42": "s\xE0ng h\xFAn xi\u0101o h\xFAn", "\u6851\u836B\u672A\u79FB": "s\u0101ng y\u012Bn w\xE8i y\xED", "\u6851\u836B\u4E0D\u5F99": "s\u0101ng y\u012Bn b\xF9 x\u01D0", "\u6851\u571F\u7EF8\u7F2A": "s\u0101ng t\u01D4 ch\xF3u mi\xF9", "\u6851\u6237\u68EC\u67A2": "s\u0101ng h\xF9 ju\xE0n sh\u016B", "\u4E09\u6218\u4E09\u5317": "s\u0101n zh\u0101n s\u0101n b\u011Bi", "\u4E09\u5360\u4ECE\u4E8C": "s\u0101n zh\u0101n c\xF3ng \xE8r", "\u4E09\u74E6\u4E24\u820D": "s\u0101n w\u01CE li\u01CEng sh\u011B", "\u4E09\u4EBA\u4E3A\u4F17": "s\u0101n r\xE9n w\xE8i zh\xF2ng", "\u4E09\u5DEE\u4E94\u9519": "s\u0101n ch\u0101 w\u01D4 cu\xF2", "\u4E09\u5DEE\u4E24\u9519": "s\u0101n ch\u0101 li\u01CEng cu\xF2", "\u4E09\u4E0D\u62D7\u516D": "s\u0101n b\xF9 ni\xF9 li\xF9", "\u585E\u7FC1\u4E4B\u9A6C": "s\xE0i w\u0113ng zh\u012B m\u01CE", "\u585E\u7FC1\u5F97\u9A6C": "s\xE0i w\u0113ng d\xE9 m\u01CE", "\u585E\u4E95\u711A\u820D": "s\u0101i j\u01D0ng f\xE9n sh\u011B", "\u6D12\u5FC3\u66F4\u59CB": "s\u01CE x\u012Bn g\xE8ng sh\u01D0", "\u6D12\u626B\u5E94\u5BF9": "s\u01CE s\xE0o y\xECng du\xEC", "\u8F6F\u7EA2\u9999\u571F": "ru\u01CEn h\xF3ng xi\u0101ng y\xF9", "\u5165\u5B5D\u51FA\u5F1F": "r\xF9 xi\xE0o ch\u016B t\xEC", "\u5165\u543E\u5F40\u4E2D": "r\xF9 w\u01D4 g\xF2u zh\u014Dng", "\u5165\u94C1\u4E3B\u7C3F": "r\xF9 ti\u011B zh\u01D4 b\xF9", "\u5165\u7406\u5207\u60C5": "r\xF9 l\u01D0 qi\u0113 q\xEDng", "\u6C5D\u6210\u4EBA\u8036": "nu cheng ren ye", "\u5982\u6C34\u6295\u77F3": "r\xFA sh\u01D4 t\xF3u sh\xED", "\u5982\u5207\u5982\u78CB": "r\xFA qi\u0113 r\xFA cu\u014D", "\u5982\u767B\u6625\u53F0": "r\xFA d\xE9 ch\u016Bn t\xE1i", "\u8089\u8584\u9AA8\u5E76": "r\xF2u b\xF3 g\u01D4 b\xECng", "\u67D4\u60C5\u7EF0\u6001": "r\xF3u q\xEDng chu\u014D tai", "\u620E\u9A6C\u52BB\u52F7": "r\xF3ng m\u01CE d\u0101n xi\xE0o", "\u65E5\u6718\u6708\u524A": "r\xEC ju\u0101n yu\xE8 xu\u0113", "\u65E5\u4E2D\u4E3A\u5E02": "r\xEC zh\u014Dng w\xE9i sh\xEC", "\u65E5\u4E2D\u5FC5\u6E72": "r\xEC zh\u014Dng b\xEC t\xF3ng", "\u65E5\u6708\u53C2\u8FB0": "r\xEC yu\xE8 sh\u0113n ch\xE9n", "\u65E5\u7701\u6708\u4FEE": "r\xEC x\u01D0ng yu\xE8 xi\u016B", "\u65E5\u524A\u6708\u5272": "r\xEC xu\u0113 yu\xE8 g\u0113", "\u65E5\u524A\u6708\u6718": "r\xEC xu\u0113 yu\xE8 ju\u0101n", "\u65E5\u7701\u6708\u8BD5": "r\xEC x\u01D0ng yu\xE8 sh\xEC", "\u65E5\u7701\u6708\u8BFE": "r\xEC x\u01D0ng yu\xE8 k\xE8", "\u65E5\u4E0D\u6687\u7ED9": "r\xEC b\xF9 xi\xE1 j\u01D0", "\u8BA4\u8D3C\u4E3A\u7236": "r\xE8n z\xE9i w\xE9i f\xF9", "\u4EFB\u8FBE\u4E0D\u62D8": "r\xE8n l\xE1o b\xF9 j\u016B", "\u8BA4\u5F71\u4E3A\u5934": "r\xE8n y\u01D0ng w\xE9i t\xF3u", "\u8BA4\u8D3C\u4E3A\u5B50": "r\xE8n z\xE9i w\xE9i z\u01D0", "\u4EBA\u8DB3\u5BB6\u7ED9": "r\xE9n z\xFA ji\u0101 j\u01D0", "\u4EBA\u8A00\u85C9\u85C9": "r\xE9n y\xE1n j\xED j\xED", "\u4EBA\u6A21\u72D7\u6837": "r\xE9n m\xFA g\u01D2u y\xE0ng", "\u4EBA\u83AB\u4E88\u6BD2": "r\xE9n m\xF2 y\xFA d\xFA", "\u4EBA\u7ED9\u5BB6\u8DB3": "r\xE9n j\u01D0 ji\u0101 z\xFA", "\u70ED\u71AC\u7FFB\u997C": "r\u011B \xE1o f\u0101n b\u01D0ng", "\u67D3\u987B\u79CD\u9F7F": "r\u01CEn x\u016B zh\u01D2ng ch\u01D0", "\u7FA4\u5C45\u7A74\u5904": "q\xFAn j\u016B xu\xE9 ch\u01D4", "\u5374\u8001\u8FD8\u7AE5": "qu\xE8 l\u01CEo hu\xE1n t\xF3ng", "\u6743\u503E\u4E2D\u5916": "qu\xE1n q\u012Bng zh\u014Dng wai", "\u5708\u7262\u517B\u7269": "ju\xE0n l\xE1o y\u01CEng w\xF9", "\u53BB\u592A\u53BB\u751A": "q\xF9 tai q\xF9 sh\xE8n", "\u53D6\u4E88\u6709\u8282": "q\u01D4 y\xF9 y\u01D2u ji\xE9", "\u8BCE\u8981\u6861\u8158": "q\u016B y\xE0o r\xE1o y\xF9", "\u66F2\u7EC8\u594F\u96C5": "q\u01D4 zh\u014Dng z\xF2u y\u01CE", "\u66F2\u610F\u8FCE\u5408": "q\u01D4 y\xEC y\xEDng h\xE9", "\u66F2\u610F\u5949\u8FCE": "q\u01D4 y\xEC f\xE8ng y\xEDng", "\u66F2\u610F\u627F\u8FCE": "q\u01D4 y\xEC ch\xE9ng y\xEDng", "\u66F2\u5B66\u963F\u4E16": "q\u01D4 xu\xE9 \u0101 sh\xEC", "\u66F2\u7A81\u79FB\u85AA": "q\u01D4 t\u016B y\xED x\u012Bn", "\u66F2\u7709\u4E30\u988A": "q\u01D4 m\xE9i f\u0113ng ji\xE1", "\u66F2\u80B1\u800C\u6795": "q\u01D4 g\u014Dng \xE9r zh\u011Bn", "\u79CB\u5B9E\u6625\u534E": "qi\u016B sh\xED ch\u016Bn hu\u0101", "\u7A77\u5F62\u5C3D\u76F8": "qi\xF3ng x\xEDng j\xECn xi\xE0ng", "\u7A77\u5E74\u7D2F\u4E16": "qi\xF3ng ni\xE1n l\u011Bi sh\xEC", "\u60C5\u51C4\u610F\u5207": "q\xEDng q\u012B y\xEC qi\u0113", "\u60C5\u89C1\u57F6\u7AED": "q\xEDng ji\xE0n zh\u014Du ji\xE9", "\u60C5\u89C1\u52BF\u5C48": "q\xEDng xi\xE0n sh\xEC q\u016B", "\u60C5\u89C1\u529B\u5C48": "q\xEDng xi\xE0n l\xEC q\u016B", "\u60C5\u89C1\u4E4E\u8F9E": "q\xEDng xi\xE0n h\u016B c\xED", "\u6E05\u98CE\u52B2\u8282": "q\u012Bng f\u0113ng j\xECng ji\xE9", "\u6E05\u90FD\u7EDB\u9619": "q\u012Bng d\u014Du ji\xE0ng qu\xE8", "\u6E05\u8F9E\u4E3D\u66F2": "q\u012Bng c\xED l\xEC q\u01D4", "\u503E\u80A0\u5012\u809A": "q\u012Bng ch\xE1ng d\xE0o d\u01D4", "\u8F7B\u5634\u8584\u820C": "q\u012Bng zu\u01D0 b\xF3 sh\xE9", "\u8F7B\u509C\u8584\u8D4B": "q\u012Bng y\u0101o b\xE1o f\xF9", "\u8F7B\u9A91\u7B80\u4ECE": "q\u012Bng j\xEC ji\u01CEn c\xF3ng", "\u8F7B\u8D22\u597D\u4E49": "q\u012Bng c\xE1i h\xE0o y\xEC", "\u8F7B\u8584\u65E0\u77E5": "q\u012Bng b\xE1o w\xFA zh\u012B", "\u8F7B\u624D\u597D\u65BD": "q\u012Bng c\xE1i h\xE0o sh\u012B", "\u8F7B\u8584\u65E0\u793C": "q\u012Bng b\xE1o w\xFA l\u01D0", "\u9752\u7D2B\u88AB\u4F53": "q\u012Bng z\u01D0 p\u012B t\u01D0", "\u9752\u6797\u9ED1\u585E": "q\u012Bng l\xEDn h\u0113i s\xE0i", "\u9752\u7EA2\u7681\u767D": "q\u012Bng h\xF3ng t\xF3u b\xE1i", "\u5BDD\u82EB\u6795\u5E72": "q\u01D0n sh\u0101n zh\u011Bn g\xE0n", "\u8793\u9996\u86FE\u7709": "q\xEDn sh\u01D2u \xE9r m\xE9i", "\u64D2\u5978\u64FF\u4F0F": "q\xEDn ji\u0101n f\u0101 f\xFA", "\u7434\u745F\u4E4B\u597D": "q\xED s\xE8 zh\u012B h\u01CEo", "\u6308\u74F6\u4E4B\u77E5": "qi\xE8 p\xEDng zh\u012B zh\xEC", "\u4E14\u4F4F\u4E3A\u4F73": "qi\u011B zh\xF9 w\xE9i ji\u0101", "\u5207\u6811\u5012\u6839": "qi\u0113 sh\xF9 d\u01CEo g\u0113n", "\u5207\u7406\u990D\u5FC3": "qi\u0113 l\u01D0 y\xE0n x\u012Bn", "\u5207\u7406\u538C\u5FC3": "qi\u0113 l\u01D0 y\xE0n x\u012Bn", "\u5207\u7406\u4F1A\u5FC3": "qi\u0113 l\u01D0 hu\xEC x\u012Bn", "\u5207\u8FD1\u7684\u5F53": "qi\u0113 j\xECn de d\u0101ng", "\u5207\u7473\u7422\u78E8": "qi\u0113 c\xF9n zhu\xF3 m\xF3", "\u7FD8\u8DB3\u5F15\u9886": "qi\xE1o z\xFA y\u01D0n l\u01D0ng", "\u7FD8\u8DB3\u800C\u5F85": "qi\xE1o z\xFA \xE9r d\xE0i", "\u5DE7\u53D1\u5947\u4E2D": "qi\u01CEo f\u0101 q\xED zh\xF2ng", "\u62A2\u5730\u547C\u5929": "qi\u0101ng d\xEC h\u016B ti\u0101n", "\u5F3A\u5634\u62D7\u820C": "ji\xE0ng zu\u01D0 ni\xF9 sh\xE9", "\u5F3A\u81EA\u53D6\u6298": "qi\xE1ng z\xEC q\u01D4 sh\xE9", "\u5F3A\u76F4\u81EA\u9042": "qi\xE1ng zh\xED z\xEC su\xED", "\u5F3A\u6587\u6D49\u918B": "qi\u01CEng w\xE9n ji\u01CE c\xF9", "\u5F3A\u6587\u5047\u918B": "qi\u01CEng w\xE9n ji\u01CE c\xF9", "\u5F3A\u6B7B\u5F3A\u6D3B": "qi\u01CEng s\u01D0 qi\u01CEng hu\xF3", "\u5F3A\u6B7B\u8D56\u6D3B": "qi\u01CEng s\u01D0 l\xE0i hu\xF3", "\u5F3A\u98DF\u81EA\u7231": "qi\u01CEng sh\xED z\xEC \xE0i", "\u5F3A\u98DF\u9761\u89D2": "qi\u01CEng sh\xED m\xED ji\u01CEo", "\u5F3A\u8BC6\u535A\u95FB": "qi\u01CEng sh\xED b\xF3 w\xE9n", "\u5F3A\u5F13\u52B2\u5F29": "qi\xE1ng g\u014Dng j\xECng n\u01D4", "\u5F3A\u8052\u4E0D\u820D": "qi\u01CEng gu\u014D b\xF9 sh\u011B", "\u5F3A\u51EB\u53D8\u9E64": "qi\u01CEng f\xFA bi\xE0n h\xE8", "\u5F3A\u800C\u540E\u53EF": "qi\u01CEng \xE9r h\xF2u k\u011B", "\u5F3A\u8BCD\u593A\u6B63": "qi\u01CEng c\xED du\xF3 zh\xE8ng", "\u5F3A\u5F97\u6613\u8D2B": "qi\u01CEng d\xE9 y\xEC p\xEDn", "\u9063\u5174\u9676\u60C5": "qi\u01CEn x\xECng t\xE1o q\xEDng", "\u9063\u5C06\u8C03\u5175": "qi\u01CEn ji\u0101ng di\xE0o b\u012Bng", "\u9063\u5175\u8C03\u5C06": "qi\u01CEn b\u012Bng di\xE0o ji\xE0ng", "\u524D\u8DCB\u540E\u7590": "qi\xE1n b\xE1 h\xF2u m\xE1o", "\u6434\u65D7\u65A9\u5C06": "qi\u0101n q\xED zh\u01CEn ji\xE0ng", "\u6434\u65D7\u53D6\u5C06": "qi\u0101n q\xED q\u01D4 ji\xE0ng", "\u7275\u7F8A\u62C5\u9152": "qi\u0101n y\xE1ng d\xE0n ji\u01D4", "\u7275\u5F3A\u9644\u5408": "qi\u0101n qi\xE1ng f\xF9 h\xE9", "\u5343\u59FF\u4E07\u6001": "qi\u0101n z\u012B w\xE0n tai", "\u5343\u72B6\u4E07\u6001": "qi\u0101n zhu\xE0ng w\xE0n tai", "\u5343\u8F7D\u4E00\u5408": "qi\u0101n z\xE0i y\u012B h\xE9", "\u5343\u8F7D\u4E00\u5F39": "qi\u0101n z\u01CEi y\u012B d\xE0n", "\u5343\u6001\u4E07\u72B6": "qi\u0101n tai w\xE0n zhu\xE0ng", "\u5343\u78E8\u767E\u6298": "qi\u0101n m\xF3 b\u01CEi sh\xE9", "\u5343\u4E86\u4E07\u5F53": "qi\u0101n le w\xE0n d\xE0ng", "\u5343\u4E86\u767E\u5F53": "qi\u0101n li\u01CEo b\u01CEi d\xE0ng", "\u5343\u53E4\u7EDD\u8C03": "qi\u0101n g\u01D4 ju\xE9 di\xE0o", "\u6CE3\u4E0B\u5982\u96E8": "q\u01D0 xi\xE0 r\xFA y\u01D4", "\u5F03\u4E4B\u5EA6\u5916": "q\xEC zh\u012B d\xF9 wai", "\u6C14\u514B\u6597\u725B": "q\xEC k\xE8 d\u01D2u ni\xFA", "\u8D77\u5043\u4E3A\u7AD6": "q\u01D0 y\u01CEn w\xE9i sh\xF9", "\u5C82\u5F1F\u541B\u5B50": "k\u01CEi t\xEC j\u016Bn z\u01D0", "\u7DA6\u6EAA\u5229\u8DC2": "q\xED x\u012B l\xEC gu\xEC", "\u68CB\u8F93\u5148\u7740": "q\xED sh\u016B xi\u0101n zh\u0101o", "\u68CB\u8F93\u5148\u8457": "q\xED sh\u016B xi\u0101n zhu\xF3", "\u5947\u8469\u5F02\u5349": "q\xED p\u0101 y\xEC h\xF9i", "\u9F50\u738B\u820D\u725B": "q\xED w\xE1ng sh\u011B ni\xFA", "\u9F50\u91CF\u7B49\u89C2": "q\xED li\xE0ng d\u011Bng gu\u0101n", "\u6B3A\u5929\u8BF3\u5730": "q\u012B ti\u0101n ku\u0101ng d\xEC", "\u6816\u98CE\u5BBF\u96E8": "q\u012B f\u0113ng xi\u01D4 y\u01D4", "\u59BB\u6885\u5B50\u9E64": "q\u012B m\xE9n z\u01D0 h\xE8", "\u59BB\u513F\u8001\u5C11": "q\u012B \xE9r l\u01CEo sh\u01CEo", "\u666E\u5929\u7387\u571F": "p\u01D4 ti\u0101n shu\xE0i t\u01D4", "\u94FA\u80F8\u7EB3\u5730": "p\u016B xi\u014Dng n\xE0 d\xEC", "\u94FA\u7709\u82EB\u773C": "p\u016B m\xE9i sh\xE0n y\u01CEn", "\u94FA\u7709\u8499\u773C": "p\u016B m\xE9i m\xE9ng y\u01CEn", "\u94FA\u9526\u5217\u7EE3": "p\u016B j\u01D0n li\xE8 xi\xF9", "\u7834\u77E9\u4E3A\u5706": "p\xF2 j\u01D4 w\xE9i yu\xE1n", "\u7834\u955C\u91CD\u5408": "p\xF2 j\xECng zh\xF2ng h\xE9", "\u7834\u5BB6\u4E3A\u56FD": "p\xF2 ji\u0101 w\xE9i gu\xF3", "\u7834\u89DA\u4E3A\u571C": "p\xF2 g\u016B w\xE9i yu\xE1n", "\u7834\u6101\u4E3A\u7B11": "p\xF2 ch\xF3u w\xE9i xi\xE0o", "\u74F6\u5760\u7C2A\u6298": "p\xEDng zh\xF9i z\u0101n zh\xE9", "\u840D\u98D8\u84EC\u8F6C": "p\xEDng pi\u0101o p\xE9ng zhu\xE0n", "\u5E21\u5929\u6781\u5730": "j\xFA ti\u0101n j\xED d\xEC", "\u5C4F\u58F0\u606F\u6C14": "b\u01D0ng sh\u0113ng x\u012B q\xEC", "\u5C4F\u6C14\u541E\u58F0": "p\xEDng q\xEC t\u016Bn sh\u0113ng", "\u51ED\u51E0\u636E\u6756": "p\xEDng j\u012B j\xF9 zh\xE0ng", "\u5A09\u5A77\u5A40\u5A1C": "p\u012Bng t\xEDng \u0113 n\xE0", "\u54C1\u7AF9\u8C03\u5F26": "p\u01D0n zh\xFA di\xE0o xi\xE1n", "\u8D2B\u5634\u8584\u820C": "p\xEDn zu\u01D0 b\xF3 sh\xE9", "\u9A88\u80A9\u7D2F\u8DB3": "pi\xE1n ji\u0101n l\u011Bi z\xFA", "\u9A88\u80A9\u7D2F\u8FF9": "pi\xE1n ji\u0101n l\u011Bi j\xEC", "\u7FE9\u7FE9\u5E74\u5C11": "pi\u0101n pi\u0101n ni\xE1n sh\u01CEo", "\u7247\u8BED\u53EA\u8F9E": "pi\xE0n y\xE1n zh\u01D0 c\xED", "\u7247\u9CDE\u534A\u722A": "pi\xE0n l\xEDn b\xE0n zh\u01CEo", "\u7247\u7532\u4E0D\u8FD8": "pi\xE0n ji\u01CE b\xF9 hu\xE1n", "\u62AB\u53D1\u7F28\u51A0": "p\u012B f\u0101 y\u012Bng gu\xE0n", "\u62AB\u53D1\u6587\u8EAB": "p\u012B f\xE0 w\xE9n sh\u0113n", "\u6279\u7809\u5BFC\u7ABE": "p\u012B hu\u0101 d\u01CEo t\xE1o", "\u6279\u9699\u5BFC\u7ABE": "p\u012B x\xEC d\u01CEo y\xEDn", "\u6279\u542D\u6363\u865A": "p\u012B h\xE1ng d\u01CEo x\u016B", "\u6279\u98CE\u62B9\u6708": "p\u012B f\u0113ng m\xF2 yu\xE8", "\u70F9\u9F99\u70AE\u51E4": "p\u0113ng l\xF3ng p\xE1o f\xE8ng", "\u70B0\u9CD6\u810D\u9CA4": "f\xE8ng bi\u0113 ku\xE0i l\u01D0", "\u70AE\u51E4\u70F9\u9F99": "p\xE1o f\xE8ng p\u0113ng l\xF3ng", "\u65C1\u6307\u66F2\u8C15": "p\xE1ng zh\u01D0 q\u01D4 y\xF9", "\u65C1\u5F15\u66F2\u8BC1": "p\xE1ng y\u01D0n q\u01D4 zh\xE8ng", "\u65C1\u901A\u66F2\u7545": "p\xE1ng t\u014Dng q\u01D4 ch\xE0ng", "\u5E9E\u7709\u7693\u53D1": "p\xE1ng m\xE9i h\xE0o f\xE0", "\u6500\u82B1\u6298\u67F3": "p\u0101n hu\u0101 sh\xE9 li\u01D4", "\u6500\u87FE\u6298\u6842": "p\u0101n ch\xE1n sh\xE9 gu\xEC", "\u5973\u5927\u96BE\u7559": "n\u01DA d\xE0 n\xE1n li\xFA", "\u5973\u957F\u987B\u5AC1": "n\u01DA zh\u01CEng x\u016B ji\xE0", "\u5973\u957F\u5F53\u5AC1": "n\u01DA zh\u01CEng d\u0101ng ji\xE0", "\u5F04\u7AF9\u5F39\u4E1D": "n\xF2ng zh\xFA d\xE0n s\u012B", "\u5F04\u7389\u5439\u7BAB": "n\xF2ng y\xF9 chu\xED xi\u0101o", "\u5F04\u7BA1\u8C03\u5F26": "n\xF2ng gu\u01CEn di\xE0o xi\xE1n", "\u5F04\u7C89\u8C03\u6731": "n\xF2ng f\u011Bn di\xE0o zh\u016B", "\u5F04\u5175\u6F62\u6C60": "n\xF2ng b\u012Bng hu\xE1ng shi", "\u6D53\u88C5\u8273\u62B9": "n\xF3ng zhu\u0101ng y\xE0n m\xF2", "\u6D53\u62B9\u6DE1\u5986": "n\xF3ng m\xF2 d\xE0n zhu\u0101ng", "\u626D\u8F6C\u5E72\u5764": "ni\u01D4 zhu\u01CEn g\xE0n k\u016Bn", "\u626D\u76F4\u4F5C\u66F2": "ni\u01D4 zh\xED zu\xF2 q\u016B", "\u725B\u9AA5\u540C\u7681": "ni\xFA j\xEC t\xF3ng w\u011Bn", "\u5B81\u7F3A\u52FF\u6EE5": "n\xECng qu\u0113 w\xF9 l\xE0n", "\u5B7D\u969C\u79CD\u5B50": "ni\xE8 zh\xE0ng zh\u01D2ng z\u01D0", "\u556E\u8840\u4E3A\u76DF": "ni\xE8 xu\xE8 w\xE9i m\xE9ng", "\u637B\u571F\u4E3A\u9999": "ni\u01CEn t\u01D4 w\xE9i xi\u0101ng", "\u5E74\u8C0A\u4E16\u597D": "ni\xE1n y\xEC sh\xEC h\xE0o", "\u5E74\u534E\u5782\u66AE": "ni\xE1n hu\xE1 thu\xED m\xF9", "\u5117\u4E0D\u4E8E\u4F26": "l\u01D0 b\xF9 y\xFA l\xFAn", "\u6CE5\u540D\u5931\u5B9E": "n\xEC m\xEDng sh\u012B sh\xED", "\u6CE5\u800C\u4E0D\u6ED3": "ni\xE8 \xE9r b\xF9 z\u01D0", "\u80FD\u8005\u4E3A\u5E08": "n\xE9ng zh\u011B w\xE9i sh\u012B", "\u80FD\u4E0D\u79F0\u5B98": "n\xE9ng b\xF9 ch\xE8n gu\u0101n", "\u6320\u76F4\u4E3A\u66F2": "n\xE1o zh\xED w\xE9i q\u016B", "\u56CA\u8424\u7167\u8BFB": "n\xE1ng y\xEDng zh\xE0o sh\u016B", "\u96BE\u8FDB\u6613\u9000": "nan jin yi tui", "\u96BE\u4E4E\u4E3A\u7EE7": "n\xE1n h\u016B w\xE9i j\xEC", "\u96BE\u4E4E\u4E3A\u60C5": "n\xE1n h\u016B w\xE9i q\xEDng", "\u96BE\u66F4\u4EC6\u6570": "n\xE1n g\u0113ng p\xFA sh\u01D4", "\u96BE\u5F97\u7CCA\u6D82": "n\xE1n d\xE9 h\xFA t\xFA", "\u5357\u86EE\u9D02\u820C": "n\xE1n m\xE1n xi\u0101ng sh\xE9", "\u5357\u8D29\u5317\u8D3E": "n\xE1n f\xE0n b\u011Bi g\u01D4", "\u5185\u4FEE\u5916\u6518": "n\xE8i xi\u016B wai r\u01CEng", "\u5185\u67D4\u5916\u521A": "n\xE8i r\xF3u wai g\u0101ng", "\u5185\u5CFB\u5916\u548C": "n\xE8i j\xF9n wai h\xE9", "\u62FF\u8154\u4F5C\u8C03": "n\xE1 qi\u0101ng zu\xF2 di\xE0o", "\u62FF\u7C97\u5939\u7EC6": "n\xE1 c\u016B ji\u0101 x\xEC", "\u6155\u53E4\u8584\u4ECA": "m\xF9 g\u01D4 b\xF3 j\u012Bn", "\u7267\u732A\u5974\u620F": "m\xF9 zh\xF2u n\xFA x\xEC", "\u6C90\u7334\u8863\u51A0": "m\xF9 h\xF3u y\u012B gu\xE0n", "\u76EE\u7722\u5FC3\u5FF3": "m\xF9 yu\u0101n x\u012Bn w\u01CEng", "\u76EE\u6311\u5FC3\u62DB": "m\xF9 ti\u01CEo x\u012Bn zh\u0101o", "\u76EE\u7A7A\u4F59\u5B50": "m\xF9 k\u014Dng y\xFA z\u01D0", "\u76EE\u91CF\u610F\u8425": "m\xF9 li\xE0ng y\xEC y\xEDng", "\u76EE\u77AA\u820C\u5F4A": "m\xF9 d\xE8ng sh\xE9 ji\xE0ng", "\u6728\u5934\u6728\u8111": "m\xF9 t\xF3u m\xF9 n\u01CEo", "\u6728\u5E72\u9E1F\u6816": "m\xF9 g\xE0n ni\u01CEo q\u012B", "\u4F94\u8272\u63E3\u79F0": "m\xF3u s\xE8 chu\u01CEi ch\xE8n", "\u83AB\u77E5\u6240\u4E3A": "m\xF2 zh\u012B su\u01D2 w\xE9i", "\u83AB\u4E88\u6BD2\u4E5F": "m\xF2 y\xF9 d\xFA y\u011B", "\u83AB\u4E3A\u5DF2\u751A": "m\xF2 w\xE9i y\u01D0 sh\xE8n", "\u62B9\u6708\u79D5\u98CE": "m\u01D2 yu\xE8 p\u012B f\u0113ng", "\u62B9\u7C89\u65BD\u8102": "m\xF2 f\u011Bn sh\u012B zh\u012B", "\u78E8\u783B\u954C\u5207": "m\xF3 l\xF3ng ju\u0101n qi\u0113", "\u78E8\u68F1\u5213\u89D2": "m\xF3 l\xE9ng li\u01CEng ji\u01CEo", "\u6478\u5934\u4E0D\u7740": "m\u014D t\xF3u b\xF9 zh\xE1o", "\u6478\u95E8\u4E0D\u7740": "m\u014D m\xE9n b\xF9 zh\xE1o", "\u6478\u4E0D\u7740\u8FB9": "m\u014D b\xF9 zhu\xF3 bi\u0101n", "\u7F2A\u79CD\u6D41\u4F20": "mi\xF9 zh\u01D2ng li\xFA chu\xE1n", "\u547D\u4E2D\u6CE8\u5B9A": "m\xECng zh\u014Dng zh\xF9 d\xECng", "\u9E23\u9E64\u4E4B\u5E94": "m\xEDng h\xE8 zh\u012B y\u012Bng", "\u9E23\u51E4\u671D\u9633": "m\xEDng f\xE8ng zh\u0101o y\xE1ng", "\u660E\u6548\u5927\u9A8C": "m\xEDng xi\xE0o d\xE0 y\xE0", "\u540D\u6211\u56FA\u5F53": "ming wo gu dang", "\u706D\u666F\u8FFD\u98CE": "mi\xE8 y\u01D0ng zhu\u012B f\u0113ng", "\u9088\u5904\u6B3F\u89C6": "mi\u01CEo ch\u01D4 j\u012B sh\xEC", "\u9762\u6298\u5EAD\u4E89": "mi\xE0n sh\xE9 t\xEDng zh\u0113ng", "\u4FDB\u62FE\u5730\u82A5": "b\xEC sh\xED d\xEC ji\xE8", "\u4FDB\u9996\u5E16\u8033": "m\u01CE sh\u01D2u ti\u0113 \u011Br", "\u9EFE\u7A74\u9E32\u5DE2": "m\u011Bng xu\xE9 q\xFA ch\xE1o", "\u7EF5\u529B\u8584\u6750": "mi\xE1n l\xEC b\xF3 c\xE1i", "\u7EF5\u91CC\u8584\u6750": "mi\xE1n l\u01D0 b\xF3 c\xE1i", "\u9761\u6709\u5B51\u9057": "m\u01D0 y\u01D2u ji\xE9 y\xED", "\u9761\u8863\u5AAE\u98DF": "m\u01D0 y\u012B t\u014Du sh\xED", "\u9761\u8863\u5077\u98DF": "m\u01D0 y\u012B t\u014Du sh\xED", "\u9761\u7136\u4ECE\u98CE": "m\u01D0 r\xE1n c\xF3ng f\u0113ng", "\u9761\u9761\u4E4B\u4E50": "m\u01D0 m\u01D0 zh\u012B yu\xE8", "\u8FF7\u604B\u9AB8\u9AA8": "m\xED li\xE0n h\xE0i g\u01D4", "\u8499\u5934\u8F6C\u5411": "m\u0113ng t\xF3u zhu\xE0n xi\xE0ng", "\u95F7\u6D77\u6101\u5C71": "m\xE8n h\u01CEi ch\xF3u sh\u0101n", "\u626A\u53C2\u5386\u4E95": "m\xE9n sh\u0113n l\xEC j\u01D0ng", "\u95E8\u5355\u6237\u8584": "m\xE9n d\u0101n h\xF9 b\xF3", "\u6627\u65E6\u6668\u5174": "m\xE8i d\xE0n ch\xFAn x\u012Bng", "\u6CA1\u8877\u4E00\u662F": "m\xF2 zh\u014Dng y\u012B sh\xEC", "\u6CA1\u91D1\u996E\u7FBD": "m\xF2 j\u012Bn y\u01D0n y\u01D4", "\u5192\u540D\u63A5\u811A": "m\xE0o m\xEDng ji\u011B ji\u01CEo", "\u6BDB\u5934\u5C0F\u5B50": "m\xE1o t\xF3u xi\u01CEo zi", "\u6BDB\u9042\u5815\u4E95": "m\xE1o su\xED du\xF2 j\u01D0ng", "\u6BDB\u53D1\u8038\u7136": "m\xE1o f\u0101 s\u01D2ng r\xE1n", "\u6BDB\u53D1\u5012\u7AD6": "m\xE1o f\u0101 d\u01CEo sh\xF9", "\u6BDB\u53D1\u4E0D\u723D": "m\xE1o f\u0101 b\xF9 shu\u01CEng", "\u732B\u9F20\u540C\u5904": "m\u0101o sh\u01D4 t\xF3ng ch\u01D4", "\u5C28\u7709\u7693\u53D1": "m\xE1ng m\xE9i h\xE0o f\xE0", "\u6F2B\u5929\u904D\u5730": "m\xE0n sh\u0101n bi\xE0n d\xEC", "\u8109\u8109\u76F8\u901A": "m\xE0i m\xE0i xi\u0101ng t\u014Dng", "\u5356\u6587\u4E3A\u751F": "m\xE0i w\xE9n w\xE9i sh\u0113n", "\u5356\u674E\u94BB\u6838": "m\xE0i l\u01D0 zu\u0101n h\xE9", "\u4E70\u691F\u8FD8\u73E0": "m\u01CEi d\xFA hu\xE1n zh\u016B", "\u57CB\u5929\u6028\u5730": "m\xE1n ti\u0101n yu\xE0n d\xEC", "\u57CB\u4E09\u6028\u56DB": "m\xE1n s\u0101n yu\xE0n s\xEC", "\u9A6C\u4E0A\u623F\u5B50": "m\u01CE sh\xE0ng f\xE1ng zi", "\u9A6C\u5165\u534E\u5C71": "m\u01CE r\xF9 hu\xE1 sh\u0101n", "\u843D\u9B44\u6C5F\u6E56": "lu\xF2 p\xF2 j\u012Bng h\xFA", "\u843D\u9B44\u4E0D\u5076": "luo tuo bu ou", "\u843D\u9B44\u4E0D\u7F81": "lu\xF2 p\xF2 b\xF9 j\u012B", "\u843D\u843D\u96BE\u5408": "lu\xF2 lu\xF2 n\xE1n h\xE9", "\u843D\u8349\u4E3A\u5BC7": "lu\xF2 c\u01CEo w\xE9i k\xF2u", "\u88F8\u88CE\u8892\u88FC": "lu\u01D2 ch\xE9ng t\u01CEn x\u012B", "\u7F57\u7EC7\u6784\u9677": "lu\xF2 zh\u012B g\xF2u xi\xE0n", "\u634B\u8896\u63CE\u62F3": "lu\u014D xi\xF9 xu\u0101n qu\xE1n", "\u8BBA\u9EC4\u6570\u9ED1": "l\xF9n hu\xE1ng sh\u01D4 h\u0113i", "\u4E71\u4F5C\u80E1\u4E3A": "lu\xE0n zu\xF2 h\xFA w\xE9i", "\u4E71\u7BAD\u6512\u5FC3": "lu\xE0n ji\xE0n cu\xE1n x\u012Bn", "\u9E3E\u51E4\u548C\u9E23": "lu\xE1n f\xE8ng h\xE8 m\xEDng", "\u7EFF\u53F6\u6210\u836B": "l\u01DC y\xE8 ch\xE9ng y\u012Bn", "\u7EFF\u5973\u7EA2\u7537": "l\u01DC n\u01DA h\xF3ng n\xE1n", "\u7387\u7531\u65E7\u7AE0": "shu\xE0i y\xF3u ji\xF9 zh\u0101ng", "\u7387\u7531\u65E7\u5219": "shu\xE0i y\xF3u ji\xF9 z\xE9", "\u7387\u4EE5\u4E3A\u5E38": "shu\xE0i y\u01D0 w\xE9i ch\xE1ng", "\u7387\u571F\u5B85\u5FC3": "shu\xE0i t\u01D4 zh\xE1i x\u012Bn", "\u7387\u571F\u540C\u5E86": "shu\xE0i t\u01D4 t\xF3ng q\xECng", "\u7387\u517D\u98DF\u4EBA": "shu\xE0i sh\xF2u sh\xED r\xE9n", "\u7387\u571F\u5F52\u5FC3": "shu\xE0i t\u01D4 gu\u012B x\u012Bn", "\u7387\u9A6C\u4EE5\u9AA5": "shu\xE0i m\u01CE y\u01D0 j\xEC", "\u7387\u5C14\u6210\u7AE0": "shu\xE0i \u011Br ch\xE9ng zh\u0101ng", "\u5C65\u8584\u4E34\u6DF1": "l\u01DA b\xF3 l\xEDn sh\u0113n", "\u9C81\u65A4\u71D5\u524A": "l\u01D4 j\u012Bn y\xE0n xu\u0113", "\u9732\u9762\u629B\u5934": "l\xF9 mi\xE0n p\u0101o t\xF3u", "\u6F0F\u5C3D\u66F4\u9611": "l\xF2u j\xECn g\u0113ng l\xE1n", "\u7B3C\u9E1F\u69DB\u733F": "l\xF3ng ni\u01CEo ji\xE0n yu\xE1n", "\u7B3C\u9E1F\u6C60\u9C7C": "l\xF3ng ni\u01CEo shi y\xFA", "\u9F99\u6E38\u66F2\u6CBC": "long you qu zhao", "\u9F99\u8840\u7384\u9EC4": "l\xF3ng xu\u011B xu\xE1n hu\xE1ng", "\u9F99\u96D5\u51E4\u5480": "l\xF3ng di\u0101o f\xE8ng j\u01D4", "\u9F99\u96CF\u51E4\u79CD": "l\xF3ng ch\xFA f\xE8ng zh\u01D2ng", "\u516D\u795E\u4E0D\u5B89": "li\xF9 sh\xE9n b\u01D4 \u0101n", "\u516D\u5C3A\u4E4B\u8BAC": "li\xF9 ch\u01D0 zh\u012B qu\xE0n", "\u67F3\u5DF7\u82B1\u8857": "li\u01D4 xi\xF2ng hu\u0101 ji\u0113", "\u67F3\u8857\u82B1\u5DF7": "li\u01D4 ji\u0113 hu\u0101 xi\xF2ng", "\u67F3\u9AA8\u989C\u7B4B": "ji\u01D4 g\u01D4 y\xE1n j\u012Bn", "\u6D41\u79BB\u98A0\u7590": "li\xFA l\xED di\u0101n sh\u01D4", "\u4EE4\u539F\u4E4B\u621A": "l\xEDng yu\xE1n zh\u012B q\u012B", "\u4EE4\u4EBA\u6367\u8179": "l\xECng r\xE9n p\u011Bng f\u01D4", "\u9675\u52B2\u6DEC\u783A": "l\xEDng j\xECng cu\xEC l\xEC", "\u4E34\u96BE\u4E0D\u60E7": "l\xEDn n\xE0n b\xF9 j\u01D4", "\u4E34\u654C\u6613\u5C06": "l\xEDn d\xED y\xEC ji\xE0ng", "\u88C2\u88F3\u8863\u75AE": "li\xE8 sh\xE1ng y\u012B chu\u0101ng", "\u88C2\u88F3\u88F9\u8DB3": "li\xE8 ch\xE1ng gu\u01D2 z\xFA", "\u88C2\u51A0\u6BC1\u5195": "li\xE8 gu\xE0n hu\u01D0 mi\u01CEn", "\u57D2\u624D\u89D2\u5999": "li\xE8 c\xE1i ju\xE9 mi\xE0o", "\u4E86\u65E0\u60E7\u8272": "li\u01CEo w\u016B j\u01D4 s\xE8", "\u4E86\u8EAB\u8FBE\u547D": "li\u01CEo sh\u0113n d\xE1 m\xECng", "\u4E86\u7136\u65E0\u95FB": "le r\xE1n w\xFA w\xE9n", "\u4E86\u4E0D\u53EF\u89C1": "li\u01CEo b\xF9 k\u011B ji\xE0n", "\u4E86\u4E0D\u957F\u8FDB": "li\u01CEo b\xF9 zh\u01CEng j\u01D0n", "\u71CE\u5982\u89C2\u706B": "li\u01CEo r\xFA gu\u0101n hu\u01D2", "\u71CE\u53D1\u6467\u67AF": "li\u01CEo f\xE0 cu\u012B k\u016B", "\u91CF\u5C0F\u529B\u5FAE": "li\xE0ng xi\u01CEo l\xEC w\u0113i", "\u91CF\u65F6\u5EA6\u529B": "li\xE0ng sh\xED d\xF9 l\xEC", "\u91CF\u6798\u5236\u51FF": "li\xE0ng ru\xEC zh\xEC z\xE1o", "\u91CF\u5165\u8BA1\u51FA": "li\xE0ng r\xF9 j\xEC ch\u016B", "\u91CF\u5982\u6C5F\u6D77": "li\xE0ng r\xFA ji\u0101ng h\u01CEi", "\u91CF\u529B\u5EA6\u5FB7": "li\xE0ng l\xEC du\xF3 d\xE9", "\u91CF\u91D1\u4E70\u8D4B": "li\xE0ng j\u012Bn m\u01CEi f\xF9", "\u91CF\u5DF1\u5BA1\u5206": "li\xE0ng j\u01D0 sh\u011Bn f\u0113n", "\u91CF\u6750\u5F55\u7528": "li\xE0ng c\xE1i l\xF9 y\xF2ng", "\u91CF\u624D\u5668\u4F7F": "li\xE0ng c\xE1i q\xEC sh\u01D0", "\u91CF\u624D\u800C\u4E3A": "li\xE0ng c\xE1i \xE9r w\xE9i", "\u6881\u5B5F\u76F8\u656C": "li\xE1ng m\xE8ng xi\u0101ng j\xECn", "\u604B\u604B\u96BE\u820D": "li\xE0n li\xE0n n\xE1n sh\u011B", "\u655B\u58F0\u5C4F\u606F": "li\u01CEn sh\u0113ng p\xEDng x\u012B", "\u655B\u9AA8\u5439\u9B42": "li\u01CEn g\u01D4 chu\xED h\xFAn", "\u8054\u7BC7\u7D2F\u724D": "li\xE1n pi\u0101n l\u011Bi d\xFA", "\u8FDE\u7F16\u7D2F\u724D": "li\xE1n bi\u0101n l\u011Bi d\xFA", "\u8A48\u5937\u4E3A\u8DD6": "l\xEC y\xED w\xE9i zh\xED", "\u5229\u4EE4\u5FD7\u60DB": "l\xEC l\xECng zh\xEC z\xE0o", "\u5386\u7CBE\u4E3A\u6CBB": "l\xEC j\u012Bng w\xE9i zh\xEC", "\u5386\u7CBE\u66F4\u59CB": "l\xEC j\u012Bng g\xE8ng sh\u01D0", "\u54E9\u54E9\u7F57\u7F57": "li li lu\u014D lu\u014D", "\u674E\u5E7F\u4E0D\u4FAF": "l\u01D0 gu\u01CEng b\xF9 h\xF2u", "\u793C\u4E3A\u60C5\u8C8C": "l\u01D0 w\xE9i q\xEDng m\xE0o", "\u793C\u8BA9\u4E3A\u56FD": "l\u01D0 r\xE0ng w\xE9i gu\xF3", "\u793C\u574F\u4E50\u5D29": "l\u01D0 hu\xE0i yu\xE8 b\u0113ng", "\u7281\u5EAD\u626B\u95FE": "l\xED t\xEDng s\u01CEo l\u01DA", "\u7281\u751F\u9A8D\u89D2": "l\xED sh\u0113ng yu\xE8 ji\u01CEo", "\u7281\u725B\u9A8D\u89D2": "l\xED ni\xFA m\xE0i ji\u01CEo", "\u79BB\u5C71\u8C03\u864E": "l\xED sh\u0101n di\xE0o h\u01D4", "\u79BB\u672C\u8DA3\u672B": "l\xED b\u011Bn q\u016B m\xF2", "\u79BB\u672C\u5FBC\u672B": "l\xED b\u011Bn y\u0101o m\xF2", "\u695E\u7709\u6A2A\u773C": "l\xE8ng m\xE9i h\xE9ng y\u01CEn", "\u64C2\u5929\u5012\u5730": "l\xE9i ti\u0101n d\u01CEo d\xEC", "\u7D2F\u8DB3\u6210\u6B65": "l\u011Bi z\xFA ch\xE9ng b\xF9", "\u7D2F\u6708\u7ECF\u5E74": "l\u011Bi yu\xE8 j\u012Bng ni\xE1n", "\u7D2F\u5C4B\u91CD\u67B6": "l\u011Bi w\u016B ch\xF3ng ji\xE0", "\u7D2F\u74E6\u7ED3\u7EF3": "l\u011Bi w\u01CE ji\xE9 sh\xE9ng", "\u7D2F\u571F\u81F3\u5C71": "l\u011Bi t\u01D4 zh\xEC sh\u0101n", "\u7D2F\u571F\u805A\u6C99": "l\u011Bi t\u01D4 j\xF9 sh\u0101", "\u7D2F\u82CF\u79EF\u5757": "l\u011Bi s\u016B j\u012B ku\xE0i", "\u7D2F\u5375\u4E4B\u5371": "l\u011Bi lu\u01CEn zh\u012B w\u0113i", "\u7D2F\u7D2F\u5982\u73E0": "l\u011Bi l\u011Bi r\xFA zh\u016B", "\u7D2F\u5757\u79EF\u82CF": "l\u011Bi ku\xE0i j\u012B s\u016B", "\u7D2F\u6559\u4E0D\u6539": "l\u011Bi ji\xE0o b\xF9 g\u01CEi", "\u7D2F\u724D\u8FDE\u7BC7": "l\u011Bi d\xFA li\xE1n pi\u0101n", "\u4E50\u5C71\u4E50\u6C34": "y\xE0o sh\u0101n y\xE0o shu\u01D0", "\u6F66\u539F\u6D78\u5929": "l\u01CEo yu\xE1n j\xECn ti\u0101n", "\u8001\u5E08\u5BBF\u5112": "l\u01CEo sh\u012B xi\u01D4 r\xFA", "\u7262\u4EC0\u53E4\u5B50": "l\xE1o sh\xED g\u01D4 zi", "\u7405\u5B1B\u798F\u5730": "l\xE1ng hu\xE1n f\xFA d\xEC", "\u72FC\u53F7\u9B3C\u54ED": "l\xE1ng h\xE1o gu\u01D0 k\u016B", "\u72FC\u98E1\u864E\u54BD": "l\xE1ng c\u0101n h\u01D4 y\u0101n", "\u9611\u98CE\u957F\u96E8": "l\xE1n f\u0113ng zh\xE0ng y\u01D4", "\u62C9\u67AF\u6298\u673D": "l\u0101 k\u016B sh\xE9 xi\u01D4", "\u63C6\u60C5\u5EA6\u7406": "ku\xED q\xEDng du\xF3 l\u01D0", "\u63C6\u7406\u5EA6\u60C5": "ku\xED l\u01D0 du\xF3 q\xEDng", "\u7AA5\u95F4\u4F3A\u9699": "ku\u012B ji\xE0n s\xEC x\xEC", "\u65F7\u65E5\u7D2F\u65F6": "ku\xE0ng r\xEC l\u011Bi sh\xED", "\u5321\u6551\u5F25\u7F1D": "ku\u0101ng ji\xF9 m\xED f\xE8ng", "\u67AF\u6811\u751F\u534E": "k\u016B sh\xF9 sh\u0113ng hu\u0101", "\u53E3\u8F7B\u820C\u8584": "k\u01D2u q\u012Bng sh\xE9 b\xF3", "\u53E3\u89D2\u751F\u98CE": "k\u01D2u ji\u01CEo sh\u0113ng f\u0113ng", "\u53E3\u89D2\u6625\u98CE": "k\u01D2u ji\u01CEo ch\u016Bn f\u0113ng", "\u53E3\u89D2\u98CE\u60C5": "k\u01D2u ji\u01CEo f\u0113ng q\xEDng", "\u53E3\u5E72\u820C\u7126": "k\u01D2u g\xE0n sh\xE9 ji\u0101o", "\u53E3\u8179\u4E4B\u7D2F": "k\u01D2u f\xF9 zh\u012B l\u011Bi", "\u53E3\u51FA\u5927\u8A00": "k\u01D2u ch\u016B d\u0101 y\xE1n", "\u7A7A\u8179\u4FBF\u4FBF": "k\u014Dng f\xF9 pi\xE1n pi\xE1n", "\u55D1\u7259\u6599\u5634": "k\u0113 y\xE1 li\xE0o zu\u01D0", "\u523B\u6728\u4E3A\u540F": "k\xE8 m\xF9 w\xE9i l\xEC", "\u523B\u6728\u4E3A\u9E44": "k\xE8 m\xF9 w\xE9i h\xFA", "\u54B3\u73E0\u553E\u7389": "k\xE9 zh\u016B tu\xF2 y\xF9", "\u54B3\u553E\u6210\u73E0": "k\xE9 tu\xF2 ch\xE9ng zh\u016B", "\u6297\u989C\u4E3A\u5E08": "k\xE0ng y\xE1n w\xE9i sh\u012B", "\u7CE0\u8C46\u4E0D\u8D61": "kang dou bu shan", "\u5F00\u534E\u7ED3\u679C": "k\u0101i hu\u0101 ji\xE9 gu\u01D2", "\u5CFB\u962A\u76D0\u8F66": "j\xF9n b\u01CEn y\xFAn ch\u0113", "\u652B\u4E3A\u5DF1\u6709": "ju\xE9 w\xE9i j\u01D0 y\u01D2u", "\u56BC\u94C1\u5480\u91D1": "ji\xE1o ti\u011B j\u01D4 j\u012Bn", "\u56BC\u58A8\u55B7\u7EB8": "ju\xE9 m\xF2 p\u0113n zh\u01D0", "\u5014\u5934\u5F3A\u8111": "ju\xE8 t\xF3u ji\xE0ng n\u01CEo", "\u5014\u5934\u5014\u8111": "ju\xE8 tou ju\xE8 n\u01CEo", "\u5026\u9E1F\u77E5\u8FD8": "ju\xE0n ni\u01CEo zh\u012B hu\xE1n", "\u5377\u5E2D\u800C\u846C": "ju\u01CEn x\xED \xE9r z\xE0ng", "\u5377\u65D7\u606F\u9F13": "ju\u01CEn q\xED x\u012B g\u01D4", "\u5377\u7532\u500D\u9053": "ju\u01CEn ji\u01CE b\xE8i d\xE0o", "\u805A\u7C73\u4E3A\u5C71": "j\xF9 m\u01D0 w\xE9i sh\u0101n", "\u805A\u7C73\u4E3A\u8C37": "j\xF9 m\u01D0 w\xE9i g\u01D4", "\u952F\u7259\u94A9\u722A": "j\xF9 y\xE1 g\u014Du zh\u01CEo", "\u4E3E\u624B\u76F8\u5E86": "j\u01D4 sh\u01D2u xi\u0101ng q\xECng", "\u4E3E\u4E16\u6DF7\u6D4A": "j\u01D4 sh\xEC h\xFAn zhu\xF3", "\u97AB\u4E3A\u8302\u8349": "j\u016B w\xE9i m\xE0o c\u01CEo", "\u97A0\u4E3A\u8302\u8349": "j\u016B w\xE9i m\xE0o c\u01CEo", "\u62D8\u795E\u9063\u5C06": "j\u016B sh\xE9n qi\u01CEn ji\xE0ng", "\u5C45\u8F74\u5904\u4E2D": "j\u016B zh\xF3u ch\u01D4 zh\u014Dng", "\u5C45\u4E0B\u8BAA\u4E0A": "j\xFA xi\xE0 sh\xE0n sh\xE0ng", "\u5C45\u4E0D\u91CD\u8335": "j\u016B b\xF9 ch\xF3ng y\u012Bn", "\u5C45\u4E0D\u91CD\u5E2D": "j\u016B b\xF9 ch\xF3ng x\xED", "\u65E7\u4E8B\u91CD\u63D0": "ji\xF9 sh\xEC zh\xF2ng t\xED", "\u65E7\u8C03\u91CD\u5F39": "ji\xF9 di\xE0o ch\xF3ng t\xE1n", "\u7078\u827E\u5206\u75DB": "ji\xF9 \xE0i f\u0113n t\xF2ng", "\u4E45\u8981\u4E0D\u5FD8": "ji\u01D4 y\u0101o b\xF9 w\xE0ng", "\u4E5D\u8F6C\u529F\u6210": "ji\u01D4 zhu\xE0n g\u014Dng ch\xE9ng", "\u4E5D\u84B8\u4E09\u71AF": "ji\u01D4 zh\u0113ng s\u0101n sh\u0113ng", "\u656C\u4E1A\u4E50\u7FA4": "j\xECng y\xE8 y\xE0o q\xFAn", "\u4E95\u5E95\u867E\u87C6": "j\u01D0ng d\u01D0 xi\u0101 m\xE1", "\u65CC\u65D7\u5377\u8212": "j\u012Bng q\xED ju\u01CEn sh\u016B", "\u60CA\u9B42\u843D\u9B44": "j\u012Bng h\xFAn lu\xF2 p\xF2", "\u8346\u68D8\u8F7D\u9014": "j\u012Bng j\xED z\xE0i t\xFA", "\u8346\u68D8\u585E\u9014": "j\u012Bng j\xED s\xE8 t\xFA", "\u7ECF\u7EB6\u6D4E\u4E16": "jing lun ji shi", "\u7981\u820D\u5F00\u585E": "j\xECn sh\u011B k\u0101i s\u0101i", "\u7972\u5A01\u76DB\u5BB9": "l\xF3ng w\u0113i sh\xE8ng r\xF3ng", "\u8FDB\u79CD\u5584\u7FA4": "j\xECn zh\u01D2ng sh\xE0n q\xFAn", "\u8FDB\u9000\u4E2D\u5EA6": "j\xECn tu\xEC zh\xF2ng d\xF9", "\u8FDB\u9000\u6D88\u957F": "j\xECn tu\xEC xi\u0101o ch\xE1ng", "\u8FDB\u9000\u5E94\u77E9": "j\xECn tu\xEC y\u012Bng j\u01D4", "\u8FDB\u9000\u89E6\u7C53": "j\xECn tu\xEC ch\xF9 z\u01D4", "\u8FDB\u9000\u51FA\u5904": "j\xECn tu\xEC ch\u016B ch\u01D4", "\u8FDB\u9000\u8DCB\u7590": "j\xECn tu\xEC b\xE1 z\u01D4", "\u8FDB\u5BF8\u9000\u5C3A": "j\u01D0n c\xF9n tu\xEC ch\u01D0", "\u5C3D\u591A\u5C3D\u5C11": "j\u01D0n du\u014D j\u01D0n sh\u01CEo", "\u9526\u56CA\u8FD8\u77E2": "j\u01D0n n\xE1ng hu\xE1n sh\u01D0", "\u77DC\u540D\u5AC9\u80FD": "j\u012Bn m\xEDng j\xEC n\xE9ng", "\u77DC\u5DF1\u81EA\u9970": "j\u012Bn j\u01D0 zh\xEC sh\xEC", "\u77DC\u529F\u8D1F\u6C14": "j\u012Bn g\u014Dng f\u01D4 q\xEC", "\u6D25\u5173\u9669\u585E": "j\u012Bn gu\u0101n xi\u01CEn s\xE0i", "\u91D1\u543E\u4E0D\u7981": "j\u012Bn w\xFA b\xF9 j\xECn", "\u91D1\u532E\u77F3\u5BA4": "j\u012Bn gu\xEC sh\xED sh\xEC", "\u91D1\u7FC5\u64D8\u6D77": "j\u012Bn ch\xEC b\u0101i h\u01CEi", "\u6212\u5962\u5B81\u4FED": "ji\xE8 sh\u0113 n\xECng ji\u0101n", "\u89E3\u8863\u8863\u4EBA": "ji\xE8 y\u012B y\u012B r\xE9n", "\u89E3\u4EBA\u96BE\u5F97": "ji\u011B r\xE9n n\xE1n d\xE9", "\u89E3\u94C3\u7CFB\u94C3": "ji\u011B l\xEDng j\xEC l\xEDng", "\u89E3\u53D1\u4F6F\u72C2": "ji\u011B f\xE0 y\xE1ng ku\xE1ng", "\u622A\u94C1\u65A9\u9489": "ji\xE9 ti\u011B zh\u01CEn d\xECng", "\u8BD8\u5C48\u8B37\u7259": "ji\xE9 q\u016B d\xE0 y\xE1", "\u8BD8\u5C48\u78DD\u78BB": "ji\xE9 q\u016B b\xECng zh\xF2u", "\u8BD8\u66F2\u8071\u7259": "ji\xE9 q\u01D4 \xE1o y\xE1", "\u6559\u4E00\u8BC6\u767E": "ji\u0101o y\u012B sh\xED b\u01CEi", "\u6559\u7331\u5347\u6728": "ji\u0101o n\xE1o sh\u0113ng m\xF9", "\u8F83\u7626\u91CF\u80A5": "ji\xE0o sh\xF2u li\xE0ng f\xE9i", "\u77EB\u77EB\u4E0D\u7FA4": "ji\u01CEo ji\u01CEo b\xF9 q\xF9n", "\u77EB\u56FD\u66F4\u4FD7": "ji\u01CEo gu\xF3 g\u0113ng s\xFA", "\u768E\u9633\u4F3C\u706B": "ji\u01CEo y\xE1ng sh\xEC hu\u01D2", "\u6322\u6282\u8FC7\u6B63": "ji\u01CEo ku\u0101ng gu\xF2 zh\xE8ng", "\u89D2\u7ACB\u6770\u51FA": "jiao li jie chu", "\u7126\u6C99\u70C2\u77F3": "ji\u0101o sh\u0101 sh\xED l\xE0n", "\u7126\u5507\u5E72\u820C": "ji\u0101o ch\xFAn g\xE0n sh\xE9", "\u9A84\u6CF0\u6DEB\u6CC6": "ji\u0101o tai y\xEDn zhu\xE0ng", "\u9A84\u5962\u6DEB\u6CC6": "ji\u0101o sh\u0113 y\xEDn y\xED", "\u9A84\u513F\u9A03\u5973": "ji\u0101o \xE9r b\u0101 n\u01DA", "\u6D47\u98CE\u8584\u4FD7": "ji\u0101o f\u0113ng b\xF3 s\xFA", "\u964D\u5996\u6349\u602A": "xi\xE1ng y\u0101o zhu\u014D gu\xE0i", "\u5C06\u9047\u826F\u6750": "ji\xE0ng y\xF9 li\xE1ng c\xE1i", "\u5C06\u53D6\u56FA\u4E88": "ji\u0101ng q\u01D4 g\u016B y\u01D4", "\u5C06\u95E8\u6709\u5C06": "ji\xE0ng m\xE9n y\u01D2u ji\xE0ng", "\u5C06\u529F\u6298\u8FC7": "ji\u0101ng g\u014Dng sh\xE9 gu\xF2", "\u5C06\u593A\u56FA\u4E0E": "ji\u0101ng du\xF3 g\u016B y\u01D4", "\u5C06\u4F2F\u4E4B\u52A9": "qi\u0101ng b\xF3 zh\u012B zh\xF9", "\u5C06\u4F2F\u4E4B\u547C": "qi\u0101ng b\xF3 zh\u012B h\u016B", "\u69DB\u82B1\u7B3C\u9E64": "ji\xE0n hu\u0101 l\xF3ng h\xE8", "\u9274\u5F71\u5EA6\u5F62": "ji\xE0n y\u01D0ng du\xF3 x\xEDng", "\u6E10\u4E0D\u53EF\u957F": "ji\xE0n b\xF9 k\u011B zh\u01CEng", "\u5251\u9996\u4E00\u5437": "ji\xE0n sh\u01D2u y\u012B gu\u012B", "\u89C1\u4E49\u6562\u4E3A": "ji\xE0n y\xEC g\u01CEn w\xE9i", "\u89C1\u4E49\u5F53\u4E3A": "ji\xE0n y\xEC d\u0101ng w\xE9i", "\u89C1\u4E49\u5FC5\u4E3A": "ji\xE0n y\xEC b\xEC w\xE9i", "\u89C1\u7D20\u62B1\u6734": "xi\xE0n s\xF9 b\xE0o p\u01D4", "\u89C1\u5F03\u4E8E\u4EBA": "ji\xE0n q\xEC y\u01D4 r\xE9n", "\u89C1\u51E0\u800C\u4F5C": "ji\xE0n j\u012B \xE9r zu\xF2", "\u89C1\u5F39\u6C42\u9E2E": "ji\xE0n d\xE0n qi\xFA h\xE1o", "\u7B80\u4E1D\u6570\u7C73": "ji\u01CEn s\u012B sh\u01D4 m\u01D0", "\u4FED\u4E0D\u4E2D\u793C": "ji\u01CEn b\xF9 zh\xF2ng l\u01D0", "\u95F4\u89C1\u5C42\u51FA": "ji\xE0n xi\xE0n c\xE9ng ch\u016B", "\u95F4\u4E0D\u5BB9\u606F": "ji\xE0n b\xF9 r\xF3ng x\u012B", "\u95F4\u4E0D\u5BB9\u779A": "ji\u0101n b\xF9 r\xF3ng x\u01D0", "\u5C16\u5634\u8584\u820C": "ji\u0101n zu\u01D0 b\xF3 sh\xE9", "\u5047\u6D0B\u9B3C\u5B50": "ji\u01CE y\xE1ng gu\u01D0 zi", "\u7532\u51A0\u5929\u4E0B": "ji\u01CE gu\xE0n ti\u0101n xi\xE0", "\u846D\u83A9\u4E4B\u4EB2": "ji\u0101 f\xFA zh\u012B q\u012Bn", "\u5BB6\u65E0\u62C5\u77F3": "ji\u0101 w\xFA d\xE0n sh\xED", "\u5BB6\u7D2F\u5343\u91D1": "ji\u0101 l\xE8i qi\u0101n j\u012Bn", "\u5BB6\u7ED9\u4EBA\u8DB3": "ji\u0101 j\u01D0 r\xE9n z\xFA", "\u5BB6\u7ED9\u6C11\u8DB3": "ji\u0101 j\u01D0 m\xEDn z\xFA", "\u5BB6\u9053\u4ECE\u5BB9": "ji\u0101 d\xE0o c\u014Dng r\xF3ng", "\u5BB6\u957F\u793C\u77ED": "ji\u0101 ch\xE1ng l\u01D0 du\u01CEn", "\u5939\u67AA\u5E26\u68CD": "ji\u0101 qi\u0101ng d\xE0i g\xF9n", "\u5939\u888B\u4EBA\u7269": "ji\u0101 d\xE0i r\xE9n w\xF9", "\u9701\u98CE\u6717\u6708": "j\u012B f\u0113ng l\u01CEng yu\xE8", "\u5BC4\u5174\u5BD3\u60C5": "j\xEC x\xECng y\xF9 q\xEDng", "\u7EAA\u7EB2\u4EBA\u8BBA": "j\xEC g\u0101ng r\xE9n l\xFAn", "\u8BA1\u6DF1\u8651\u8FDC": "j\xEC sh\u0113ng l\u01DC yu\u01CEn", "\u8BA1\u529F\u91CF\u7F6A": "j\xEC g\u014Dng li\xE0ng zu\xEC", "\u638E\u88F3\u8FDE\u897C": "j\u01D0 shang li\xE1n zh\u0113ng", "\u866E\u8671\u76F8\u540A": "j\u01D0 sh\u012B xi\u0113ng di\xE0o", "\u51E0\u4E0D\u6B32\u751F": "j\u012B b\xF9 y\xF9 sh\u0113ng", "\u96C6\u814B\u4E3A\u88D8": "j\xED y\xE8 w\xE9i qi\xFA", "\u75BE\u4E0D\u53EF\u4E3A": "j\xED b\xF9 k\u011B w\xE9i", "\u6025\u8109\u7F13\u7078": "j\xED m\xE0i hu\u01CEn ji\xF9", "\u6025\u666F\u51CB\u5E74": "j\xED y\u01D0ng di\u0101o ni\xE1n", "\u6025\u516C\u597D\u65BD": "j\xED g\u014Dng h\xE0o sh\u012B", "\u6781\u6DF1\u7814\u51E0": "j\xED sh\u0113n y\xE1n j\u012B", "\u53CA\u5BBE\u6709\u9C7C": "j\xED b\u012Bn yo\u01D4 y\xFA", "\u6FC0\u8584\u505C\u6D47": "j\u012B b\xF3 t\xEDng ji\u0101o", "\u7A3D\u53E4\u63C6\u4ECA": "j\u012B g\u01D4 zh\xE8n j\u012Bn", "\u8D4D\u5FD7\u800C\u6CA1": "j\u012B zh\xEC \xE9r m\xF2", "\u79EF\u94E2\u7D2F\u5BF8": "j\u012B zh\u016B l\u011Bi c\xF9n", "\u79EF\u5C81\u7D2F\u6708": "j\u012B su\xEC l\u011Bi yu\xE8", "\u79EF\u7D20\u7D2F\u65E7": "j\u012B s\xF9 l\u011Bi ji\xF9", "\u79EF\u65F6\u7D2F\u65E5": "j\u012B sh\xED l\u011Bi r\xEC", "\u79EF\u65E5\u7D2F\u5C81": "j\u012B r\xEC l\u011Bi su\xEC", "\u79EF\u65E5\u7D2F\u6708": "j\u012B r\xEC l\u011Bi yu\xE8", "\u79EF\u65E5\u7D2F\u4E45": "j\u012B r\xEC l\u011Bi ji\u01D4", "\u79EF\u5E74\u7D2F\u5C81": "j\u012B ni\xE1n l\u011Bi su\xEC", "\u79EF\u9732\u4E3A\u6CE2": "j\u012B l\xF9 w\xE9i b\u014D", "\u79EF\u5FB7\u7D2F\u4EC1": "j\u012B d\xE9 l\u011Bi r\xE9n", "\u79EF\u5FB7\u7D2F\u5584": "j\u012B d\xE9 l\u011Bi sh\xE0n", "\u79EF\u5FB7\u7D2F\u529F": "j\u012B d\xE9 l\u011Bi g\u014Dng", "\u79EF\u8C17\u7CDC\u9AA8": "j\u012B ch\xE1n m\xE9i g\u01D4", "\u9E21\u76AE\u9E64\u53D1": "j\u012B p\xED h\xE8 f\xE0", "\u9965\u5BD2\u4EA4\u5207": "j\u012B h\xE1n ji\u0101o qi\u0113", "\u9965\u51BB\u4EA4\u5207": "j\u012B d\xF2ng ji\u0101o qi\u0113", "\u51FB\u6392\u5192\u6CA1": "j\u012B p\xE1i m\xE0o m\xF2", "\u7978\u4E3A\u798F\u5148": "hu\xF2 w\xE9i f\xFA xi\u0101n", "\u7978\u798F\u76F8\u4F9D": "hu\xF2 f\xFA xi\u0101ng y\u012B", "\u7978\u798F\u76F8\u751F": "hu\xF2 f\xFA xi\u0101ng sh\u0113ng", "\u83B7\u96BD\u516C\u8F66": "hu\xF2 j\u016Bn g\u014Dng ch\u0113", "\u8D27\u800C\u4E0D\u552E": "huo er bu shou", "\u706B\u8015\u6D41\u79CD": "hu\u01D2 g\u0113ng li\xFA zh\u01D2ng", "\u6DF7\u5E94\u6EE5\u5E94": "h\xF9n y\u012Bng l\xE0n y\u012Bng", "\u9B42\u98DE\u9B44\u4E27": "h\xFAn f\u0113i p\xF2 s\u0101ng", "\u9B42\u4E0D\u7740\u4F53": "h\xFAn b\xF9 zhu\xF3 t\u01D0", "\u9B42\u4E0D\u8457\u4F53": "h\xFAn b\xF9 zhu\xF3 t\u01D0", "\u6D51\u62A1\u541E\u67A3": "h\xFAn l\xFAn t\u016Bn z\u01CEo", "\u660F\u8FF7\u4E0D\u7701": "h\u016Bn m\xED b\xF9 x\u01D0ng", "\u660F\u955C\u91CD\u78E8": "h\u016Bn j\xECng ch\xF3ng m\xF3", "\u660F\u955C\u91CD\u660E": "h\u016Bn j\xECng ch\xF3ng m\xEDng", "\u660F\u5B9A\u6668\u7701": "h\u016Bn d\xECng ch\xE9n x\u01D0ng", "\u6BC1\u821F\u4E3A\u6755": "hu\u01D0 zh\u014Du w\xE9i du\xF2", "\u6BC1\u949F\u4E3A\u94CE": "hu\u01D0 zh\u014Dng w\xE9i du\xF3", "\u6BC1\u51A0\u88C2\u88F3": "hu\u01D0 gu\u0101n li\xE8 ch\xE1ng", "\u6666\u76F2\u5426\u585E": "hu\xEC m\xE1ng p\u01D0 s\xE8", "\u8BF2\u4EBA\u4E0D\u60D3": "hu\xEC r\xE9n b\xF9 ti\u011B", "\u6094\u8FC7\u81EA\u8D23": "hu\u01D0 gu\xF2 z\xEC z\xE8", "\u56DE\u8239\u8F6C\u8235": "hu\xED chu\xE1n zh\u01CEn du\xF2", "\u6F62\u6C60\u76D7\u5F04": "hu\xE1ng shi d\xE0o n\xF2ng", "\u9EC4\u51A0\u91CE\u670D": "hu\xE1ng gu\xE0n y\u011B f\xFA", "\u9EC4\u51A0\u8349\u5C65": "hu\xE1ng gu\xE0n c\u01CEo l\u01DA", "\u9EC4\u51A0\u8349\u670D": "hu\xE1ng gu\xE0n c\u01CEo f\xFA", "\u9EC4\u53D1\u513F\u9F7F": "hu\xE1ng f\xE0 \xE9r ch\u01D0", "\u9EC4\u53D1\u5782\u9AEB": "hu\xE1ng f\xE0 chu\xED ti\xE1o", "\u8FD8\u73E0\u5408\u6D66": "hu\xE1n zh\u016B h\xE9 p\u01D4", "\u8FD8\u73E0\u8FD4\u74A7": "hu\xE1n zh\u016B f\u01CEn b\xEC", "\u8FD8\u5143\u8FD4\u672C": "hu\xE1n yu\xE1n f\u01CEn b\u011Bn", "\u8FD8\u6734\u53CD\u53E4": "hu\xE1n p\u01D4 f\u01CEn g\u01D4", "\u8FD8\u5E74\u9A7B\u8272": "hu\xE1n ni\xE1n zh\xF9 s\xE8", "\u8FD8\u5E74\u5374\u8001": "hu\xE1n ni\xE1n qu\xE8 l\u01CEo", "\u8FD8\u5E74\u537B\u8001": "hu\xE1n ni\xE1n qu\xE8 l\u01CEo", "\u8FD8\u9187\u8FD4\u6734": "hu\xE1n ch\xFAn f\u01CEn p\u01D4", "\u8FD8\u6DF3\u8FD4\u6734": "hu\xE1n ch\xFAn f\u01CEn p\u01D4", "\u8FD8\u6DF3\u53CD\u7D20": "hu\xE1n ch\xFAn f\u01CEn s\xF9", "\u8FD8\u6DF3\u53CD\u6734": "hu\xE1n ch\xFAn f\u01CEn p\u01D4", "\u8FD8\u6DF3\u53CD\u53E4": "hu\xE1n ch\xFAn f\u01CEn g\u01D4", "\u574F\u88F3\u4E3A\u88E4": "hu\xE0i shang w\xE9i k\xF9", "\u69D0\u5357\u4E00\u68A6": "hu\xE1i n\xE1n y\u012B m\u0113ng", "\u753B\u86C7\u8457\u8DB3": "hu\xE0 sh\xE9 zhu\xF3 z\xFA", "\u753B\u5730\u4E3A\u72F1": "hu\xE0 d\xEC w\xE9i y\xF9", "\u753B\u837B\u548C\u4E38": "hu\xE0 d\xED hu\xF2 w\xE1n", "\u5316\u67AD\u4E3A\u9E20": "hu\xE0 xi\u0101o w\xE9i ji\u016B", "\u5316\u96F6\u4E3A\u6574": "hu\xE0 l\xEDng w\xE9i zh\u011Bng", "\u5316\u8150\u4E3A\u5947": "hu\xE0 f\u01D4 w\xE9i q\xED", "\u5316\u9E31\u4E3A\u51E4": "hu\xE0 ch\u012B w\xE9i f\xE8ng", "\u534E\u4EAD\u9E64\u5533": "hu\xE0 t\xEDng h\xE8 l\xEC", "\u82B1\u6512\u9526\u805A": "hu\u0101 cu\xE1n j\u01D0n j\xF9", "\u82B1\u6512\u9526\u7C07": "hu\u0101 cu\xE1n j\u01D0n c\xF9", "\u82B1\u7C07\u9526\u6512": "hu\u0101 c\xF9 j\u01D0n cu\xE1n", "\u82B1\u4E0D\u68F1\u767B": "hu\u0101 b\xF9 l\u0113ng d\u0113ng", "\u6237\u9650\u4E3A\u7A7F": "h\xF9 xi\xE0n w\xE9i chu\u0101n", "\u80E1\u4F5C\u4E71\u4E3A": "h\xFA zu\xF2 lu\xE0n w\xE9i", "\u80E1\u4F5C\u80E1\u4E3A": "h\xFA zu\xF2 h\xFA w\xE9i", "\u80E1\u601D\u4E71\u91CF": "h\xFA s\u012B lu\xE0n li\xE0ng", "\u547C\u5929\u5401\u5730": "h\u016B ti\u0101n y\xF9 d\xEC", "\u547C\u5362\u559D\u96C9": "h\u016B l\xFA h\xE8 zh\xEC", "\u547C\u6765\u559D\u53BB": "h\u016B l\xE1i h\xE8 q\xF9", "\u547C\u4E0D\u7ED9\u5438": "h\u016B b\xF9 j\u01D0 x\u012B", "\u539A\u5473\u814A\u6BD2": "h\xF2u w\xE8i x\u012B d\xFA", "\u539A\u4ECA\u8584\u53E4": "h\xF2u j\u012Bn b\xF3 g\u01D4", "\u539A\u5FB7\u8F7D\u7269": "h\xF2u d\xE9 z\xE0i w\xF9", "\u9E3F\u6CE5\u96EA\u722A": "h\xF3ng n\xED xu\u011B zh\u01CEo", "\u9E3F\u6E10\u4E8E\u5E72": "h\xF3ng ji\xE0n y\xFA g\xE0n", "\u9E3F\u98DE\u96EA\u722A": "h\xF3ng f\u0113i xu\u011B zh\u01CEo", "\u6D2A\u7089\u71CE\u53D1": "h\xF3ng l\xFA li\xE1o f\xE0", "\u7EA2\u7EF3\u7CFB\u8DB3": "h\xF3ng sh\xE9ng j\xEC z\xFA", "\u7EA2\u4E0D\u68F1\u767B": "h\xF3ng b\xF9 l\u0113ng d\u0113ng", "\u8861\u77F3\u91CF\u4E66": "h\xE9ng sh\xED li\xE0ng sh\u016B", "\u6A2A\u5F81\u82DB\u5F79": "h\xE8ng zh\u0113ng k\u0113 y\xEC", "\u6A2A\u5F81\u82DB\u655B": "h\xE8ng zh\u0113ng k\u0113 li\u01CEn", "\u6A2A\u5F81\u66B4\u8D4B": "h\xE8ng zh\u0113ng b\xE0o f\xF9", "\u6A2A\u707E\u98DE\u7978": "h\xE8ng z\u0101i f\u0113i hu\xF2", "\u6A2A\u6B83\u98DE\u7978": "h\xE8ng y\u0101ng f\u0113i hu\xF2", "\u6A2A\u65E0\u5FCC\u60EE": "h\xE8ng w\xFA j\xEC d\xE0n", "\u6A2A\u62D6\u5012\u62FD": "h\xE9ng tu\u014D d\xE0o zhu\u0101i", "\u6A2A\u62A2\u786C\u593A": "h\xE8ng qi\u01CEng y\xECng du\xF3", "\u6A2A\u62A2\u6B66\u593A": "h\xE8ng qi\u01CEng w\u01D4 du\xF3", "\u6A2A\u79D1\u66B4\u655B": "h\xE8ng k\u0113 b\xE0o li\u01CEn", "\u6A2A\u6069\u6EE5\u8D4F": "h\xE8ng \u0113n l\xE0n sh\u01CEng", "\u6068\u6D77\u96BE\u586B": "h\xE8n h\u01CEi n\xE1n ti\xE1n", "\u9ED1\u66F4\u534A\u591C": "h\u0113i g\u0113ng b\xE0n y\xE8", "\u9E64\u53D1\u677E\u59FF": "h\xE8 f\xE0 s\u014Dng z\u012B", "\u9E64\u53D1\u9E21\u76AE": "h\xE8 f\xE0 j\u012B p\xED", "\u9E64\u5904\u9E21\u7FA4": "h\xE8 ch\u01D4 j\u012B q\xFAn", "\u6DB8\u601D\u5E72\u8651": "h\xE9 s\u012B qi\xE1n l\u01DC", "\u6CB3\u6DB8\u6D77\u5E72": "h\xE9 h\xE9 h\u01CEi qi\xE1n", "\u548C\u989C\u8BF4\u8272": "h\xE9 y\xE1n yu\xE8 s\xE8", "\u4F55\u6240\u4E0D\u4E3A": "h\xE9 su\u01D2 b\xF9 w\xE9i", "\u5408\u6D66\u8FD8\u73E0": "h\xE9 p\u01D4 hu\xE1n zh\u016B", "\u5408\u4E24\u4E3A\u4E00": "h\xE9 li\u01CEng w\xE9i y\u012B", "\u5408\u4ECE\u8FDE\u8861": "h\xE9 z\xF2ng li\xE1n h\xE9ng", "\u6D69\u6D69\u6C64\u6C64": "h\xE0o h\xE0o sh\u0101ng sh\u0101ng", "\u53F7\u54B7\u5927\u54ED": "h\xE1o t\xE1o d\xE0 k\u016B", "\u53F7\u5BD2\u557C\u9965": "h\xE1o h\xE1n t\xED j\u012B", "\u597D\u52C7\u6597\u72E0": "h\xE0o y\u01D2ng d\xF2u h\u011Bn", "\u597D\u4F5A\u6076\u52B3": "h\u01CEo y\xEC w\xF9 l\xE1o", "\u597D\u95EE\u5219\u88D5": "h\xE0o w\xE8n z\xE9 y\xF9", "\u597D\u4E3A\u4E8B\u7AEF": "h\xE0o w\xE9i sh\xEC du\u0101n", "\u597D\u95EE\u51B3\u7591": "h\xE0o w\xE8n ju\xE9 y\xED", "\u597D\u751F\u4E4B\u5FB7": "h\xE0o sh\u0113ng zh\u012B d\xE9", "\u597D\u5584\u4E50\u65BD": "h\xE0o sh\xE0n l\xE8 sh\u012B", "\u597D\u5584\u6076\u6076": "h\u01CEo sh\xE0n w\xF9 \xE8", "\u597D\u9A91\u8005\u5815": "h\xE0o q\xED zh\u011B du\xF2", "\u597D\u5947\u5C1A\u5F02": "h\u01CEo q\xED sh\xE0ng y\xEC", "\u597D\u8C0B\u5584\u65AD": "h\xE0o m\xF3u sh\xE0n du\xE0n", "\u597D\u6076\u4E0D\u540C": "h\u01CEo \xE8 b\xF9 t\xF3ng", "\u597D\u4E39\u975E\u7D20": "h\xE0o d\u0101n f\u0113i s\xF9", "\u8C6A\u5E72\u66B4\u53D6": "h\xE1o g\xE0n b\xE0o q\u01D4", "\u6BEB\u53D1\u4E0D\u723D": "h\xE1o f\xE0 b\xF9 shu\u01CEng", "\u5BD2\u9178\u843D\u9B44": "h\xE1n su\u0101n lu\xF2 p\xF2", "\u90AF\u90F8\u91CD\u6B65": "h\xE1n d\u0101n zh\xF3ng b\xF9", "\u542B\u82F1\u5480\u534E": "h\xE1n y\u012Bng j\u01D4 hu\xE1", "\u542B\u5546\u5480\u5F81": "h\xE1n sh\u0101ng j\u01D4 zh\u0113ng", "\u542B\u83C1\u5480\u534E": "h\xE1n j\u012Bng j\u01D4 hu\xE1", "\u542B\u7CCA\u4E0D\u660E": "h\xE1n h\xFA b\xF9 m\xEDng", "\u542B\u57A2\u85CF\u75BE": "h\xE1n g\u01D2u c\xE1ng j\xED", "\u542B\u5BAB\u5480\u5F81": "h\xE1n g\u014Dng j\u01D4 zh\u0113ng", "\u8FC7\u9699\u767D\u9A79": "gu\xF2 x\u012B b\xE1i j\u016B", "\u8FC7\u4E3A\u5DF2\u751A": "gu\xF2 w\xE9i y\u01D0 sh\xE8n", "\u6842\u6298\u4E00\u679D": "gu\xEC sh\xE9 y\u012B zh\u012B", "\u6842\u6298\u5170\u6467": "gu\xEC sh\xE9 l\xE1n cu\u012B", "\u89C4\u91CD\u77E9\u53E0": "gu\u012B ch\xF3ng j\u01D4 di\xE9", "\u89C4\u65CB\u77E9\u6298": "gu\u012B xu\xE1n j\u01D4 sh\xE9", "\u5E7F\u6587\u5148\u751F": "gu\u01CEng w\xE9n xi\u0101n sheng", "\u5E7F\u8B6C\u66F2\u8C15": "gu\u01CEng p\xEC q\u01D4 y\xF9", "\u5E7F\u9675\u6563\u7EDD": "gu\u01CEng l\xEDng s\u01CEn ju\xE9", "\u51A0\u5C71\u6234\u7C92": "gu\xE0n sh\u0101n d\xE0i l\xEC", "\u51A0\u7EDD\u4E00\u65F6": "gu\xE0n ju\xE9 y\u012B sh\xED", "\u51A0\u5C66\u5012\u65BD": "gu\xE0n j\xF9 d\u01CEo sh\u012B", "\u5B98\u5B98\u76F8\u4E3A": "gu\u0101n gu\u0101n xi\u0101ng w\xE9i", "\u5173\u60C5\u8109\u8109": "gu\u0101n q\xEDng m\xE0i m\xE0i", "\u6302\u5E2D\u4E3A\u95E8": "gu\xE0 x\xED w\xE9i m\xE9n", "\u5BE1\u89C1\u9C9C\u95FB": "gu\u01CE ji\xE0n xi\u01CEn w\xE9n", "\u74DC\u845B\u76F8\u8FDE": "gu\u0101 g\u011B xi\u0101ng li\xE1n", "\u987E\u66F2\u5468\u90CE": "g\xF9 q\u01D4 zh\u014Du l\xE1ng", "\u987E\u666F\u60ED\u5F62": "g\xF9 y\u01D0ng c\xE1n x\xEDng", "\u6545\u6001\u590D\u8FD8": "g\xF9 t\xE0i f\xF9 hu\xE1n", "\u9F13\u543B\u594B\u722A": "g\u01D4 w\u011Bn f\xE8n zh\u01CEo", "\u9F13\u5507\u548B\u820C": "g\u01D4 ch\xFAn z\u01CE sh\xE9", "\u53E4\u8C03\u5355\u5F39": "g\u01D4 di\xE0o d\u0101n t\xE1n", "\u53E4\u8C03\u4E0D\u5F39": "g\u01D4 di\xE0o b\xF9 t\xE1n", "\u6CBD\u540D\u5E72\u8A89": "g\u016B m\xEDng g\xE0n y\xF9", "\u5B64\u72EC\u77DC\u5BE1": "g\u016B d\xFA gu\u0101n gu\u01CE", "\u59D1\u5C04\u795E\u4EBA": "g\u016B y\xE8 sh\xE9n r\xE9n", "\u82DF\u5408\u53D6\u5BB9": "g\u01D2u h\xE9 q\u01D4 \u0101n", "\u72D7\u7EED\u4FAF\u51A0": "g\u01D2u x\xF9 h\xF2u gu\xE0n", "\u94A9\u722A\u952F\u7259": "g\u014Du zh\u01CEo j\xF9 y\xE1", "\u5171\u679D\u522B\u5E72": "g\xF2ng zh\u012B bi\xE9 g\xE0n", "\u5171\u4E3A\u5507\u9F7F": "g\xF2ng w\xE9i ch\xFAn ch\u01D0", "\u62F1\u624B\u800C\u964D": "g\u01D2ng sh\xF2u \xE9r xi\xE1ng", "\u62F1\u80A9\u7F29\u80CC": "g\u01D2ng j\u0101n su\u014D b\xE8i", "\u529F\u8584\u8749\u7FFC": "g\u014Dng b\xF3 ch\xE1n y\xEC", "\u5F13\u8C03\u9A6C\u670D": "g\u014Dng di\xE0o m\u01CE f\xFA", "\u66F4\u59D3\u6539\u7269": "g\u0113ng x\xECng g\u01CEi w\xF9", "\u66F4\u5F26\u6613\u8F99": "g\u0113ng xi\xE1n y\xEC zh\xE9", "\u66F4\u5F26\u6539\u8F99": "g\u0113ng xi\xE1n g\u01CEi zh\xE9", "\u66F4\u4EC6\u96BE\u7EC8": "g\u0113ng p\xFA n\xE1n zh\u014Dng", "\u66F4\u4EC6\u96BE\u6570": "g\u0113ng p\xFA n\xE1n sh\u01D4", "\u66F4\u96BE\u4EC6\u6570": "g\u0113ng n\xE1n p\xFA sh\xF9", "\u66F4\u4EE4\u660E\u53F7": "g\u0113ng l\xECng m\xEDng h\xE0o", "\u66F4\u9611\u4EBA\u9759": "g\u0113ng l\xE1n r\xE9n j\u01D0ng", "\u66F4\u5F85\u5E72\u7F62": "g\xE8ng d\xE0i g\xE0n b\xE0", "\u66F4\u5531\u53E0\u548C": "g\u0113ng ch\xE0ng di\xE9 h\xE9", "\u66F4\u5531\u8FED\u548C": "g\u0113ng ch\xE0ng di\xE9 h\xE9", "\u66F4\u957F\u68A6\u77ED": "g\u0113ng ch\xE1ng m\xE8ng du\u01CEn", "\u4E98\u53E4\u5947\u95FB": "g\xE8n g\u01D4 q\u012B w\xE9n", "\u6839\u751F\u571F\u957F": "g\u0113n sh\u0113n t\u01D4 zh\u01CEng", "\u5404\u8272\u540D\u6837": "g\xE8 s\xE8 g\xE8 y\xE0ng", "\u683C\u683C\u4E0D\u7EB3": "g\u0113 g\u0113 b\xF9 n\xE0", "\u683C\u683C\u4E0D\u5410": "g\u0113 g\u0113 b\xF9 t\u01D4", "\u6B4C\u83BA\u821E\u71D5": "g\u0113 y\xEDng w\u01D4 y\xE0n", "\u544A\u6714\u9969\u7F8A": "g\xF9 shu\xF2 x\xEC y\xE1ng", "\u544A\u8001\u8FD8\u5BB6": "g\xE0o l\u01CEo hu\xE1n ji\u0101", "\u818F\u5507\u5C90\u820C": "g\xE0o ch\xFAn q\xED sh\xE9", "\u818F\u5507\u8D29\u820C": "g\xE0o ch\xFAn f\xE0n sh\xE9", "\u818F\u8F66\u79E3\u9A6C": "g\xE0o ch\u0113 m\xF2 m\u01CE", "\u9AD8\u4E49\u8584\u4E91": "g\u0101o y\xEC b\xF3 y\xFAn", "\u9AD8\u98CE\u52B2\u8282": "g\u0101o f\u0113ng j\xECng ji\xE9", "\u5C97\u5934\u6CFD\u5E95": "g\u0101ng t\xF3u z\xE9 d\u01D0", "\u6562\u4E3A\u6562\u505A": "g\u01CEn w\xE9i g\u01CEn zu\xF2", "\u7AFF\u5934\u65E5\u4E0A": "g\u0101n t\xF3u r\xED sh\xE0ng", "\u7518\u5206\u968F\u65F6": "g\u0101n f\xE8n su\xED sh\xED", "\u7518\u5904\u4E0B\u6D41": "g\u0101n ch\u01D4 xi\xE0 li\xFA", "\u5E72\u9704\u853D\u65E5": "g\xE0n xi\u0101o b\xEC r\xEC", "\u5E72\u557C\u6E7F\u54ED": "g\xE0n t\xED sh\u012B k\u016B", "\u5E72\u540D\u72AF\u4E49": "g\xE0n m\xEDng f\xE0n y\xEC", "\u5E72\u5C06\u83AB\u90AA": "g\u0101n ji\xE0ng m\xF2 y\xE9", "\u5E72\u7AEF\u5764\u502A": "g\xE0n du\u0101n k\u016Bn n\xED", "\u5E72\u57CE\u4E4B\u5C06": "g\u0101n ch\xE9ng zh\u012B ji\xE0ng", "\u6539\u5F20\u6613\u8C03": "g\u01CEi zh\u0101ng y\xEC di\xE0o", "\u6539\u5F26\u6613\u8C03": "g\u01CEi xi\xE1n y\xEC di\xE0o", "\u6539\u66F2\u6613\u8C03": "g\u01CEi q\u01D4 y\xEC di\xE0o", "\u6539\u6076\u4E3A\u5584": "g\u01CEi \xE8 w\xE9i sh\xE0n", "\u8179\u8F7D\u4E94\u8F66": "f\xF9 z\xE0i w\u01D4 ch\u0113", "\u5BCC\u56FD\u5F4A\u5175": "f\xF9 gu\xF3 ji\u0101ng b\u012Bng", "\u7236\u503A\u5B50\u8FD8": "f\xF9 zh\xE0i z\u01D0 hu\xE1n", "\u7236\u4E3A\u5B50\u9690": "f\xF9 w\xE9i z\u01D0 y\u01D0n", "\u8F85\u4E16\u957F\u6C11": "f\u01D4 sh\xEC zh\u01CEng m\xEDn", "\u62CA\u80CC\u6424\u542D": "f\u01D4 b\xE8i h\xE8 k\u0113ng", "\u798F\u4E3A\u7978\u5148": "f\xFA w\xE9i hu\xF2 xi\u0101n", "\u798F\u4E3A\u7978\u59CB": "f\xFA w\xE9i hu\xF2 sh\u01D0", "\u7B26\u53F7\u903B\u8F91": "f\xFA h\xE0o lu\xF3 ji", "\u6D6E\u6536\u52D2\u6298": "f\xFA sh\u014Du l\xE8 sh\xE9", "\u4F0F\u864E\u964D\u9F99": "f\xFA h\u01D4 xi\xE1ng l\xF3ng", "\u80A4\u53D7\u4E4B\u612C": "f\u016B sh\xF2u zh\u012B xi\u0101ng", "\u80A4\u76AE\u6F66\u8349": "f\u016B p\u01D0 li\u01CEo c\u01CEo", "\u80A4\u89C1\u8B2D\u8BC6": "f\u016B ji\xE0n gu\u01CEng sh\xED", "\u5426\u7EC8\u5219\u6CF0": "p\u01D0 zh\u014Dng z\xE9 t\xE0i", "\u5426\u7EC8\u590D\u6CF0": "p\u01D0 zh\u014Dng f\xF9 t\xE0i", "\u5426\u5F80\u6CF0\u6765": "p\u01D0 w\u01CEng t\xE0i l\xE1i", "\u5426\u53BB\u6CF0\u6765": "p\u01D0 q\xF9 t\xE0i l\xE1i", "\u5426\u6781\u9633\u56DE": "p\u01D0 j\xED y\xE1ng hu\xED", "\u5426\u6781\u6CF0\u56DE": "p\u01D0 j\xED t\xE0i hu\xED", "\u4F5B\u5934\u8457\u7CAA": "f\xF3 t\xF3u zhu\xF3 f\xE8n", "\u5949\u4E3A\u6977\u6A21": "f\xE8ng w\xE9i k\u01CEi m\xF3", "\u51E4\u9E23\u671D\u9633": "f\xE8ng m\xEDng zh\u0101o y\xE1ng", "\u51E4\u9761\u9E3E\u542A": "f\xE8ng m\u01D0 lu\xE1n \xE9", "\u9022\u573A\u4F5C\u4E50": "f\xE9ng ch\u01CEng zu\xF2 l\xE8", "\u8702\u6512\u8681\u805A": "f\u0113ng cu\xE1n y\u01D0 j\xF9", "\u8702\u6512\u8681\u96C6": "f\u0113ng cu\xE1n y\u01D0 j\xED", "\u8702\u8170\u524A\u80CC": "f\u0113ng y\u0101o xu\u0113 b\xE8i", "\u8702\u6247\u8681\u805A": "f\u0113ng sh\u0101n y\u01D0 j\xF9", "\u5C01\u8C68\u4FEE\u86C7": "f\u0113ng x\u012B y\u01D2u sh\xE9", "\u98CE\u5F71\u6577\u884D": "f\u0113ng y\u01D0ng f\u016B y\u0101n", "\u98CE\u9A70\u4E91\u5377": "f\u0113ng ch\xED y\xFAn ju\u01CEn", "\u98CE\u9A70\u7535\u5377": "f\u0113ng ch\xED di\xE0n ju\u01CEn", "\u98CE\u9A70\u8349\u9761": "f\u0113ng ch\xED c\u01CEo m\u01D0", "\u4E30\u5C4B\u8500\u5BB6": "f\u0113ng w\u016B zh\u012B ji\u0101", "\u7CAA\u571F\u4E0D\u5982": "f\xE8n t\xFA b\xF9 r\xFA", "\u5206\u98CE\u5288\u6D41": "f\u0113n f\u0113ng p\u01D0 li\xFA", "\u6CB8\u6CB8\u6C64\u6C64": "f\xE8i f\xE8i sh\u0101ng sh\u0101ng", "\u532A\u4F0A\u671D\u5915": "f\u011Bi y\xED zh\u0101o x\u012B", "\u83F2\u98DF\u8584\u8863": "f\u011Bi sh\xED b\xF3 y\u012B", "\u98DE\u6C99\u8D70\u783E": "f\u0113i sh\u0113 z\u01D2u l\xEC", "\u98DE\u5C06\u6570\u5947": "f\u0113 ji\xE0ng sh\xF9 j\u012B", "\u98DE\u9E3F\u96EA\u722A": "f\u0113i h\xF3ng xu\u011B zh\u01CEo", "\u653E\u8F9F\u90AA\u4F88": "f\xE0ng p\xEC xi\xE9 ch\u01D0", "\u65B9\u9886\u5706\u51A0": "f\u0101ng l\u01D0ng yu\xE1n gu\xE0n", "\u65B9\u5BF8\u4E07\u91CD": "f\u0101ng c\xF9n w\xE0n ch\xF3ng", "\u8D29\u592B\u7681\u96B6": "f\xE0n f\u016B y\u011B l\xEC", "\u6CDB\u5E94\u66F2\u5F53": "f\xE0n y\u012Bng q\u01D4 d\u0101ng", "\u72AF\u800C\u4E0D\u6821": "f\xE0n \xE9r b\xF9 ji\xE0o", "\u8FD4\u6734\u8FD8\u771F": "f\u01CEn p\u01D4 hu\xE1n zh\u0113n", "\u8FD4\u672C\u8FD8\u6E90": "f\u01CEn b\u011Bn hu\xE1n yu\xE1n", "\u8FD4\u672C\u8FD8\u5143": "f\u01CEn b\u011Bn hu\xE1n yu\xE1n", "\u53CD\u8001\u8FD8\u7AE5": "f\u01CEn l\u01CEo hu\xE1n t\xF3ng", "\u53CD\u52B3\u4E3A\u9038": "f\u01CEn l\xE1o w\xE9i y\xEC", "\u7FFB\u9EC4\u5012\u7681": "f\u0101n hu\xE1ng d\u01CEo y\xED", "\u7FFB\u80A0\u5012\u809A": "f\u0101n ch\xE1ng d\u01CEo d\u01D4", "\u6CD5\u8F6E\u5E38\u8F6C": "f\u01CE l\xFAn ch\xE1ng zhu\xE0n", "\u7F5A\u4E0D\u5F53\u7F6A": "f\xE1 b\xF9 d\u0101ng zu\xEC", "\u53D1\u690D\u7A7F\u51A0": "f\xE0 zh\xED chu\u0101n gu\u0101n", "\u53D1\u8E0A\u51B2\u51A0": "f\xE0 y\u01D2ng ch\u014Dng gu\u0101n", "\u53D1\u5F15\u5343\u94A7": "f\xE0 y\u01D0n qi\u0101n j\u016Bn", "\u53D1\u4E0A\u6307\u51A0": "f\u0101 sh\xE0ng zh\u01D0 gu\xE0n", "\u53D1\u4E0A\u51B2\u51A0": "f\u0101 sh\xE0ng ch\u014Dng gu\xE0n", "\u53D1\u6012\u7A7F\u51A0": "f\xE0 n\xF9 chu\u0101n gu\u0101n", "\u53D1\u6012\u51B2\u51A0": "f\u0101 n\xF9 ch\u014Dng gu\xE0n", "\u53D1\u8499\u89E3\u7F1A": "f\u0101 m\xE9ng ji\u011B fu", "\u53D1\u5978\u64FF\u4F0F": "f\u0101 ji\u0101n t\xEC f\xFA", "\u53D1\u77ED\u5FC3\u957F": "f\xE0 du\u01CEn x\u012Bn ch\xE1ng", "\u4E8C\u7AD6\u4E3A\u8650": "\xE8r sh\xF9 w\xE9i n\xFC\xE8", "\u8033\u76EE\u95ED\u585E": "\u011Br m\xF9 b\xEC s\u0101i", "\u513F\u5973\u5FC3\u80A0": "\xE9r n\u01D8 x\u012Bn ch\xE1ng", "\u513F\u5973\u4EB2\u5BB6": "\xE9r n\u01DA q\xECng ji\u0101", "\u6069\u4E0D\u653E\u503A": "\u0113n b\xF9 f\xE0ng zhai", "\u904F\u6076\u626C\u5584": "\xE8 \xE8 y\xE1n sh\xE0n", "\u997F\u6B8D\u6795\u85C9": "\xE8 pi\u01CEo zh\u011Bn j\xED", "\u997F\u6B8D\u8F7D\u9053": "\xE8 pi\u01CEo z\xE0i d\xE0o", "\u6076\u7D2B\u593A\u6731": "w\xF9 z\u01D0 du\xF3 zh\u016B", "\u6076\u9189\u5F3A\u9152": "w\xF9 zu\xEC qi\u01CEng ji\u01D4", "\u6076\u610F\u4E2D\u4F24": "\xE8 y\xEC zh\xF2ng sh\u0101ng", "\u6076\u6E7F\u5C45\u4E0B": "w\xF9 sh\u012B j\u016B xi\xE0", "\u6076\u5C45\u4E0B\u6D41": "w\xF9 j\u016B xi\xE0 li\xFA", "\u6076\u6076\u4ECE\u77ED": "w\xF9 w\xF9 c\xF3ng du\u01CEn", "\u6076\u4E0D\u53BB\u5584": "w\xF9 b\xF9 q\xF9 sh\xE0n", "\u627C\u542D\u62CA\u80CC": "\xE8 g\u0101ng f\u01D4 b\xE8i", "\u627C\u542D\u593A\u98DF": "\xE8 g\u0101ng du\xF3 sh\xED", "\u627C\u895F\u63A7\u54BD": "\xE8 j\u012Bn k\xF2ng y\u0101n", "\u989D\u624B\u76F8\u5E86": "\xE9 sh\u01D2u xi\u0101ng q\xECng", "\u5CE8\u5CE8\u6C64\u6C64": "\xE9 \xE9 sh\u0101ng sh\u0101ng", "\u5C59\u91D1\u6EBA\u94F6": "\u0113 j\u012Bn ni\xE0o y\xEDn", "\u6735\u9890\u5927\u56BC": "du\u01D2 y\u012B d\xE0 ji\xE1o", "\u593A\u4EBA\u6240\u597D": "du\xF3 r\xE9n su\u01D2 h\xE0o", "\u591A\u8A00\u6570\u7A77": "du\u014D y\xE1n shu\xF2 qi\xF3ng", "\u591A\u6587\u4E3A\u5BCC": "du\u014D w\xE9n w\xE9i f\xF9", "\u591A\u94B1\u5584\u8D3E": "du\u014D qi\xE1n sh\xE0n g\u01D4", "\u591A\u7AEF\u5BE1\u8981": "du\u014D du\u0101n gu\u01CEi y\xE0o", "\u591A\u8D22\u5584\u8D3E": "du\u014D c\xE1i sh\xE0n g\u01D4", "\u9041\u9038\u65E0\u95F7": "d\xF9n y\xEC w\xFA m\xE8n", "\u9041\u4FD7\u65E0\u95F7": "d\xF9n s\xFA w\xFA m\xE8n", "\u9041\u4E16\u65E0\u95F7": "d\xF9n sh\xEC w\xFA m\xE8n", "\u9041\u8FF9\u9EC4\u51A0": "d\xF9n j\xEC hu\xE1ng gu\xE0n", "\u987F\u5B66\u7D2F\u529F": "d\xF9n xu\xE9 l\u011Bi g\u014Dng", "\u5BF9\u8584\u516C\u5802": "du\xEC b\xF9 g\u014Dng t\xE1ng", "\u5806\u6848\u76C8\u51E0": "du\u012B \xE0n y\xEDng j\u012B", "\u65AD\u8FD8\u5F52\u5B97": "du\xE0n hu\xE1n gu\u012B z\u014Dng", "\u65AD\u53D1\u6587\u8EAB": "du\xE0n f\xE0 w\xE9n sh\u0113n", "\u65AD\u957F\u7EED\u77ED": "du\xE0n ch\u0101ng x\xF9 du\u01CEn", "\u65AD\u957F\u8865\u77ED": "du\xE0n ch\u0101ng b\u01D4 du\u01CEn", "\u77ED\u89C1\u8584\u8BC6": "du\u01CEn ji\xE0n b\xF3 sh\xED", "\u8839\u5C45\u68CB\u5904": "d\xF9 j\u016B q\xED ch\u01D4", "\u8839\u5C45\u68CA\u5904": "d\xF9 j\u016B qu\xE8 ch\u01D4", "\u5EA6\u5DF1\u4EE5\u7EF3": "du\xF3 j\u01D0 y\u01D0 sh\xE9ng", "\u675C\u9ED8\u4E3A\u8BD7": "d\xF9 m\xF2 w\xE9i sh\u012B", "\u675C\u9E43\u557C\u8840": "d\xF9 ju\u0101n t\xED xu\u011B", "\u7B03\u5FD7\u597D\u5B66": "d\u01D4 zh\xEC h\u01CEo xu\xE9", "\u7B03\u8FD1\u4E3E\u8FDC": "d\u01D4 j\xECn j\u01D4 ju\u01CEn", "\u72EC\u6709\u5343\u79CB": "d\xFA y\xF2u qi\u0101n qi\u016B", "\u8BFB\u4E66\u5F97\u95F4": "d\xFA sh\u016B d\xE9 ji\xE0n", "\u6597\u8F6C\u53C2\u6A2A": "d\u01D2u zhu\u01CEn sh\u0113n h\xE9ng", "\u515C\u809A\u8FDE\u80A0": "d\u014Du d\u01D4 li\xE1n ch\xE1ng", "\u6D1E\u89C1\u75C7\u7ED3": "d\xF2ng ji\xE0n zh\xE8ng ji\xE9", "\u680B\u6298\u69B1\u574F": "d\xF2ng sh\xE9 cu\u012B hu\xE0i", "\u606B\u7591\u865A\u7332": "d\xF2ng y\xED x\u016B g\xE9", "\u606B\u7591\u865A\u559D": "d\xF2ng y\xED x\u016B h\xE8", "\u52A8\u4E2D\u7ABE\u8981": "d\xF2ng zh\u014Dng zhe y\xE0o", "\u4E1C\u62B9\u897F\u6D82": "d\u014Dng m\xF2 x\u012B t\xFA", "\u4E1C\u9E23\u897F\u5E94": "d\u014Dng m\xEDng x\u012B y\u012Bng", "\u4E1C\u9CDE\u897F\u722A": "d\u014Dng l\xEDn x\u012B zh\u01CEo", "\u4E1C\u91CF\u897F\u6298": "d\u014Dng li\xE0ng x\u012B sh\xE9", "\u4E1C\u5BB6\u897F\u820D": "d\u014Dng ji\u0101 x\u012B sh\u011B", "\u4E1C\u89C2\u897F\u671B": "d\u014Dng gu\u0101ng x\u012B w\xE0ng", "\u4E1C\u65B9\u5C06\u767D": "dong fang jiang bai", "\u4E1C\u626F\u897F\u62FD": "d\u014Dng ch\u011B x\u012B zhu\u0101i", "\u4E22\u9B42\u4E27\u80C6": "diu1 h\xFAn s\xE0ng d\u01CEn", "\u9F0E\u6298\u9917\u8986": "d\u01D0ng sh\xE9 s\xF9 f\xF9", "\u9F0E\u6298\u8986\u9917": "d\u01D0ng sh\xE9 f\xF9 s\xF9", "\u9F0E\u9F10\u8C03\u548C": "d\u01D0ng nai ti\xE1o h\xE9", "\u9F0E\u94DB\u6709\u8033": "d\u01D0ng ch\u0113ng y\u01D2u \u011Br", "\u9F0E\u94DB\u7389\u77F3": "d\u01D0ng ch\u0113ng y\xF9 sh\xED", "\u9489\u5934\u78F7\u78F7": "ding tou lin lin", "\u53E0\u77E9\u91CD\u89C4": "di\xE9 j\u01D4 ch\xF3ng gu\u012B", "\u8FED\u77E9\u91CD\u89C4": "di\xE9 j\u01D4 ch\xF3ng gu\u012B", "\u8DCC\u5B95\u4E0D\u7F81": "di\xE9 d\xE0ng b\xF9 j\u012B", "\u8DCC\u5F39\u6591\u9E20": "di\u0113 d\xE0n b\u0101n ji\u016B", "\u8C03\u5634\u8C03\u820C": "ti\xE1o zu\u01D0 di\xE0o sh\xE9", "\u8C03\u5F26\u54C1\u7AF9": "di\xE0o xi\xE1n p\u01D0n zh\xFA", "\u540A\u5C14\u90CE\u5F53": "di\xE0o er l\xE1ng d\u0101ng", "\u96D5\u5FC3\u96C1\u722A": "di\u0101o x\u012Bn y\xE0n zh\u01CEo", "\u96D5\u866B\u8584\u6280": "di\u0101o ch\xF3ng b\xE1o j\xEC", "\u5201\u94BB\u4FC3\u642F": "di\u0101o zu\xE0n c\xF9 ch\u0101o", "\u70B9\u6307\u5212\u811A": "di\u01CEn zh\u01D0 j\xED ji\u01CEo", "\u70B9\u77F3\u4E3A\u91D1": "di\u01CEn sh\xED w\xE9i j\u012Bn", "\u70B9\u624B\u5212\u811A": "di\u01CEn sh\u01D2u j\xED ji\u01CEo", "\u98A0\u4E7E\u5012\u5764": "di\u0101n qi\u0101n d\u01CEo k\u016Bn", "\u98A0\u6765\u7C38\u53BB": "di\u0101n l\xE1i b\u01D2 q\xF9", "\u98A0\u5012\u8863\u88F3": "di\u0101n d\u01CEo y\u012B ch\xE1ng", "\u98A0\u5012\u5E72\u5764": "di\u0101n d\u01CEo g\xE0n k\u016Bn", "\u6382\u65A4\u62B9\u4E24": "di\u0101n j\u012Bn m\xF2 li\u01CEng", "\u4F4E\u5531\u6D45\u914C": "d\xEC ch\xE0ng qi\u01CEn zhu\xF3", "\u4F4E\u5531\u6D45\u659F": "d\xEC ch\xE0ng qi\u01CEn zh\u0113n", "\u767B\u53F0\u62DC\u5C06": "d\u0113ng t\xE1i b\xE0i ji\xE0ng", "\u706F\u5C3D\u6CB9\u5E72": "d\u0113ng j\xECn y\xF3u g\xE0n", "\u706F\u86FE\u6251\u706B": "d\xE9 \xE9 p\u016B hu\u01D2", "\u7684\u4E00\u786E\u4E8C": "d\xED y\u012B qu\xE8 \xE8r", "\u5FB7\u8584\u80FD\u9C9C": "d\xE9 b\xF3 n\xE9ng xi\u01CEn", "\u5F97\u624B\u5E94\u5FC3": "d\xE9 sh\u01D2u y\u012Bng x\u012Bn", "\u5F97\u9A6C\u6298\u8DB3": "d\xE9 m\u01CE sh\xE9 z\xFA", "\u5F97\u8584\u80FD\u9C9C": "d\xE9 b\xF3 n\xE9ng xi\u0101n", "\u9053\u8FDC\u65E5\u66AE": "d\xE0o yu\xE0n r\xEC m\xF9", "\u8E48\u5176\u8986\u8F99": "d\u01CEo q\xEC f\xF9 zh\xE9", "\u6363\u865A\u6487\u6297": "d\u01CEo x\u016B pi\u0113 k\xE0ng", "\u5012\u8F7D\u5E72\u6208": "d\xE0o z\xE0i g\u0101n g\u0113", "\u5012\u56E0\u4E3A\u679C": "d\u01CEo y\u012Bn w\xE9i gu\u01D2", "\u5012\u88F3\u7D22\u9886": "d\xE0o ch\xE1ng su\u01D2 l\u01D0ng", "\u5012\u679C\u4E3A\u56E0": "d\xE0o gu\u01D2 w\xE9i y\u012Bn", "\u53E8\u5728\u77E5\u5DF1": "t\u0101o z\xE0i zh\u012B j\u01D0", "\u53E8\u966A\u672B\u5EA7": "t\u0101o p\xE9i m\xF2 zu\xF2", "\u515A\u8C7A\u4E3A\u8650": "d\u01CEng ch\xE1i w\xE9i n\xFC\xE8", "\u5F53\u8F74\u5904\u4E2D": "d\u0101ng zh\xF3u ch\u01D4 zh\u014Dng", "\u5F53\u7740\u4E0D\u7740": "d\u0101ng zhu\xF3 b\xF9 zhu\xF3", "\u5F53\u52A1\u59CB\u7EC8": "dang wu shi zhong", "\u6DE1\u5986\u8F7B\u62B9": "d\xE0n zhu\u0101ng q\u012Bng m\xF2", "\u6DE1\u6C5D\u6D53\u62B9": "d\xE0n zhu\u0101ng n\xF3ng m\u01D2", "\u5F39\u96E8\u67AA\u6797": "d\xE0n y\u01D4 qi\u0101ng l\xEDn", "\u5F39\u4E38\u8131\u624B": "t\xE1n w\xE1n tu\u014D sh\u01D2u", "\u5F39\u94D7\u65E0\u9C7C": "d\xE0n ji\xE1 w\xFA y\xFA", "\u80C6\u5927\u5FC3\u7C97": "d\u01CEn d\u0101 x\u012Bn c\u016B", "\u7BAA\u98DF\u74E2\u996E": "d\u0101n s\xEC pi\xE1o y\u01D0n", "\u7BAA\u98DF\u58F6\u9152": "d\u0101n s\xEC h\xFA ji\u01D4", "\u5927\u559C\u82E5\u72C2": "d\u0101 x\u01D0 ru\xF2 ku\xE1ng", "\u5927\u749E\u4E0D\u5B8C": "t\xE0i b\xFA b\xF9 w\xE1n", "\u5927\u660E\u6CD5\u5EA6": "d\xE0 j\xEDng f\u01CE d\xF9", "\u5927\u5904\u7740\u58A8": "d\xE0 ch\xF9 zhu\xF3 m\xF2", "\u5927\u8F66\u4EE5\u8F7D": "d\xE0 ch\u0113 y\u01D0 z\xE0i", "\u6253\u95F7\u846B\u82A6": "d\u01CE m\xE8n h\xFA lu", "\u6253\u5BB6\u622A\u820D": "d\u01CE ji\u0101 ji\xE9 sh\u011B", "\u6C93\u6765\u8E35\u81F3": "t\u01CE l\xE1i zh\u01D2ng zh\xEC", "\u6C93\u6765\u9E95\u81F3": "t\xE0 l\xE1i y\u01D2u zh\xEC", "\u539D\u706B\u71CE\u539F": "cu\xF2 hu\u01D2 li\u01CEo yu\xE1n", "\u64AE\u571F\u711A\u9999": "cu\u014D g\u01D4 f\xE9n xi\u0101ng", "\u64AE\u79D1\u6253\u54C4": "cu\u014D k\u0113 d\u01CE h\xF2ng", "\u5BF8\u79EF\u94E2\u7D2F": "c\xF9n j\u012B zh\u016B l\u011Bi", "\u555B\u555B\u55B3\u55B3": "cu\xEC cu\xEC ch\u0101 ch\u0101", "\u69B1\u680B\u5D29\u6298": "cu\u012B d\xF2ng b\u0113ng sh\xE9", "\u69B1\u5D29\u680B\u6298": "cu\u012B b\u0113ng d\xF2ng sh\xE9", "\u6467\u6298\u8C6A\u5F3A": "cu\u012B zh\xE9 h\xE1o qi\xE1ng", "\u6467\u521A\u4E3A\u67D4": "cu\u012B g\u0101ng w\xE9i r\xF3u", "\u4ECE\u4FD7\u5C31\u7B80": "c\xF3ng s\xFA ji\xF9 ji\u01CE", "\u6B64\u547C\u5F7C\u5E94": "c\u01D0 h\u016B b\u01D0 y\u012Bng", "\u6B64\u53D1\u5F7C\u5E94": "c\u01D0 f\u0101 b\u01D0 y\u012Bng", "\u6B64\u52A8\u5F7C\u5E94": "c\u01D0 d\xF2ng b\u01D0 y\u012Bng", "\u6B64\u5531\u5F7C\u548C": "c\u01D0 ch\xE0ng b\u01D0 h\xE8", "\u6148\u60B2\u4E3A\u672C": "c\xED b\u0113i w\xE9i b\u011Bn", "\u7EAF\u5C5E\u9A97\u5C40": "ch\xFAn sh\xFA pi\xE0n j\xFA", "\u6625\u7B0B\u6012\u53D1": "ch\u016Bn s\u01D4n m\xF9 f\u0101", "\u6625\u98CE\u4E00\u5EA6": "ch\u016Bn f\u0113ng y\u012B d\xF9", "\u6625\u98CE\u98CE\u4EBA": "ch\u016Bn f\u0113ng f\xE8ng r\xE9n", "\u5782\u5934\u6428\u7FFC": "chu\xED t\xF3u d\xE1 y\xEC", "\u5439\u7AF9\u5F39\u4E1D": "chu\xED zh\xFA d\xE0n s\u012B", "\u4F20\u4E3A\u7B11\u8C08": "chu\xE1n w\xE9i xi\xE0o t\xE1n", "\u4F20\u4E3A\u7B11\u67C4": "chu\xE1n w\xE9i xi\xE0o b\u01D0ng", "\u4F20\u98CE\u6247\u706B": "chu\xE1n f\u0113ng sh\u0101n hu\u01D2", "\u4F20\u98CE\u6427\u706B": "chu\xE1n f\u0113ng y\u01D2u hu\u01D2", "\u7A7F\u7EA2\u7740\u7EFF": "chu\u0101n h\xF3ng zhu\xF3 l\u01DC", "\u5DDD\u6E1F\u5CB3\u5CD9": "chu\u0101n t\u012Bng yu\xE8 zh\xEC", "\u555C\u82F1\u5480\u534E": "chu\xF2 y\u012Bng j\u01D4 hu\xE1", "\u63E3\u65F6\u5EA6\u529B": "chu\u01CEi sh\xED du\xF3 l\xEC", "\u89E6\u5904\u673A\u6765": "ch\xF9 ch\u01D4 j\u012B l\xE1i", "\u5904\u5C0A\u5C45\u663E": "ch\u01D4 z\u016Bn j\u016B xi\u01CEn", "\u5904\u5802\u71D5\u9E4A": "ch\u01D4 t\xE1ng y\xE0n qu\xE8", "\u5904\u5802\u71D5\u96C0": "ch\u01D4 t\xE1ng y\xE0n qu\xE8", "\u5904\u5B9E\u6548\u529F": "ch\u01D4 sh\xED xi\xE0o g\u014Dng", "\u5904\u9AD8\u4E34\u6DF1": "ch\u01D4 g\u0101o l\xEDn sh\u0113n", "\u51FA\u5165\u65E0\u95F4": "ch\u016B r\xF9 w\xFA ji\u0101n", "\u51FA\u5947\u5212\u7B56": "ch\u016B q\xED hu\xE1 c\xE8", "\u51FA\u95E8\u5E94\u8F99": "ch\u016B m\xE9n y\u012Bng zh\xE9", "\u51FA\u5904\u8BED\u9ED8": "ch\u016B ch\u01D4 y\u01D4 m\xF2", "\u51FA\u5904\u6B8A\u9014": "ch\u016B ch\u01D4 sh\u016B t\xFA", "\u51FA\u5904\u6B8A\u6D82": "ch\u016B ch\u01D4 sh\u016B t\xFA", "\u51FA\u5904\u8FDB\u9000": "ch\u016B ch\u01D4 j\xECn tu\xEC", "\u6101\u5C71\u95F7\u6D77": "ch\xF3u sh\u0101n m\xE8n h\u01CEi", "\u6101\u7EA2\u60E8\u7EFF": "ch\xF3u h\xF3ng c\u01CEn l\xFC", "\u51B2\u51A0\u7726\u88C2": "ch\u014Dng gu\xE0n z\xEC li\xE8", "\u51B2\u51A0\u6012\u53D1": "ch\u014Dng gu\xE0n n\xF9 f\xE0", "\u51B2\u51A0\u53D1\u6012": "ch\u014Dng gu\xE0n f\u0101 n\xF9", "\u8D64\u7EF3\u7CFB\u8DB3": "ch\xEC sh\xE9ng j\xEC z\xFA", "\u803B\u4E0E\u54D9\u4F0D": "ch\u01D0 y\xFA ku\xE0i w\u01D4", "\u9F7F\u7259\u4E3A\u7978": "ch\u01D0 y\xE1 w\xE9i hu\xF2", "\u5C3A\u4E8C\u51A4\u5BB6": "ch\u01D0 \xE8r yu\u0101n jia", "\u5C3A\u77ED\u5BF8\u957F": "ch\u01D0 du\u01CEn c\xF9 ch\xE1ng", "\u5C3A\u5BF8\u4E4B\u529F": "ch\u01D0 c\xF9 zh\u012B g\u014Dng", "\u5403\u7740\u4E0D\u5C3D": "ch\u012B zhu\xF3 b\xF9 j\xECn", "\u4E58\u80A5\u8863\u8F7B": "ch\xE9ng f\xE9i y\xEC q\u012Bng", "\u57CE\u5317\u5F90\u516C": "ch\xE9ng b\u011Bi x\u01D8 g\u014Dng", "\u6210\u4E00\u5BB6\u8A00": "ch\u011Bng y\u012B ji\u0101n y\xE1n", "\u6210\u8D25\u5174\u5E9F": "ch\xE9ng b\xE0i x\u012Bng f\xE8i", "\u8D81\u6C34\u548C\u6CE5": "ch\xE8n shu\u01D0 hu\xF2 n\xED", "\u8D81\u54C4\u6253\u52AB": "ch\xE8n h\u014Dng d\u01CE ji\xE9", "\u79F0\u96E8\u9053\u6674": "ch\u0113ng y\u01D4 d\xE0o a\xEDng", "\u79F0\u4F53\u8F7D\u8863": "ch\xE8n t\u01D0 c\xE1i y\u012B", "\u79F0\u4F53\u88C1\u8863": "ch\xE8n t\u01D0 c\xE1i y\u012B", "\u79F0\u5BB6\u6709\u65E0": "ch\xE8n ji\u0101 y\u01D2u w\xFA", "\u79F0\u5FB7\u5EA6\u529F": "ch\u0113ng d\xE9 du\xF3 g\u014Dng", "\u6C89\u541F\u7AE0\u53E5": "ch\xE9n y\u012Bn zh\u0101ng j\xF9", "\u6C89\u541F\u4E0D\u51B3": "ch\xE9n y\u012Bn b\xF9 ju\xE9", "\u6C89\u8C0B\u91CD\u8651": "ch\xE9n m\xF3u ch\xF3ng l\u01DC", "\u6C89\u75B4\u5BBF\u75BE": "ch\xE9n k\u0113 s\xF9 j\xEC", "\u55D4\u76EE\u5207\u9F7F": "ch\u0113n m\xF9 qi\u0113 ch\u01D0", "\u626F\u7EA4\u62C9\u70DF": "ch\u011B qi\xE0n l\u0101 y\u0101n", "\u626F\u987A\u98CE\u65D7": "ch\u011B sh\u01D4n f\u0113ng q\xED", "\u8F66\u8F7D\u8239\u88C5": "ch\u0113 z\u01CEi chu\xE1n zhu\u0101ng", "\u8F66\u5C18\u9A6C\u8FF9": "ch\u0113 zh\xE9n m\u01CE j\xEC", "\u671D\u79CD\u66AE\u83B7": "zh\u0101o zh\u01D2ng m\xF9 h\xF9", "\u671D\u6298\u66AE\u6298": "zh\u0101o sh\xE9 m\xF9 sh\xE9", "\u671D\u9633\u9E23\u51E4": "zh\u0101o y\xE1ng m\xEDng f\xE8ng", "\u671D\u5347\u66AE\u5408": "zh\u0101o sh\u0113ng m\xF9 g\u011B", "\u671D\u4E7E\u5915\u6113": "zh\u0101o qi\xE1n x\u012B d\xE0ng", "\u671D\u524D\u5915\u60D5": "zh\u0101o qi\xE1ng x\u012B t\xEC", "\u671D\u6500\u66AE\u6298": "zh\u0101o p\u0101n m\xF9 sh\xE9", "\u671D\u6210\u66AE\u5FA7": "ch\xE1o ch\xE9ng m\xF9 sh\xED", "\u5DE2\u5C45\u7A74\u5904": "ch\xE1o j\u016B xu\xE9 ch\u01D4", "\u8D85\u4ECA\u51A0\u53E4": "ch\u0101o j\u012Bn gu\xE0n g\u01D4", "\u5021\u6761\u51B6\u53F6": "ch\u0101ng ti\xE1o y\u011B y\xE8", "\u5021\u800C\u4E0D\u548C": "ch\xE0ng \xE9r b\xF9 h\xE8", "\u7545\u6240\u6B32\u4E3A": "ch\xE0ng su\u01D2 y\xF9 w\xE9i", "\u82CC\u5F18\u78A7\u8840": "ch\xE1ng h\xF3ng b\xEC xu\u011B", "\u957F\u5E7C\u5C0A\u5351": "zh\u01CEng y\xF2u z\u016Bn b\u0113i", "\u957F\u5E7C\u6709\u53D9": "zh\u01CEng y\xF2u y\u01D2u x\xF9", "\u957F\u7EF3\u7CFB\u65E5": "ch\xE1ng sh\xE9ng j\xEC r\xEC", "\u957F\u7BC7\u7D2F\u724D": "ch\xE1ng pi\u0101n l\u011Bi d\xFA", "\u957F\u5E74\u4E09\u8001": "zh\u01CEng ni\xE1n s\u0101n l\u01CEo", "\u957F\u867A\u6210\u86C7": "zh\u01CEng hu\u01D0 ch\xE9ng sh\xE9", "\u957F\u6076\u9761\u609B": "ch\xE1ng \xE8 m\u01D0 qu\u0101n", "\u957F\u6625\u4E0D\u8001": "ch\xE1ng ch\xFAn b\xF9 l\u01CEo", "\u957F\u50B2\u9970\u975E": "zh\u01CEng \xE0o sh\xEC f\u0113i", "\u660C\u4EAD\u65C5\u98DF": "ch\xE1ng t\xEDng l\u01DA sh\xED", "\u8C04\u4E0A\u6291\u4E0B": "ch\u01CEn sh\xE0ng yi xi\xE0", "\u7985\u7D6E\u6CBE\u6CE5": "ch\xE1n x\u016B zh\u0101n n\xED", "\u5DEE\u4E09\u9519\u56DB": "ch\u0101 s\u0101n cu\xF2 s\xEC", "\u5C42\u53F0\u7D2F\u69AD": "c\xE9ng t\xE1i l\u011Bi xi\xE8", "\u5C42\u89C1\u8FED\u51FA": "c\xE9ng ch\u016B di\xE9 ji\xE0n", "\u8349\u7387\u5C06\u4E8B": "c\u01CEo l\u01DC ji\u0101ng sh\xEC", "\u64CD\u5947\u9010\u8D62": "c\u0101o q\xEC zh\xF9 y\xEDng", "\u64CD\u6208\u540C\u5BA4": "c\u0101o g\u0113 t\xF3on sh\xEC", "\u85CF\u8E2A\u8E51\u8FF9": "c\xE1ng z\u014Dng ni\xE8 j\u012B", "\u82CD\u8747\u89C1\u8840": "c\u0101ng y\xEDng ji\xE0n xu\u011B", "\u60E8\u7EFF\u6101\u7EA2": "c\u01CEn l\xFC ch\xF3u h\xF3ng", "\u9910\u677E\u5556\u67CF": "c\u0101n s\u014Dng d\xE0n bi\u01CE", "\u9910\u98CE\u5BBF\u8349": "c\u0101n f\u0113ng s\xF9 xu\u011B", "\u9A96\u98CE\u9A77\u971E": "c\u0113n f\u0113ng s\xEC xi\xE1", "\u53C2\u4F0D\u9519\u7EFC": "c\u0113n w\u01D4 cu\xF2 z\u014Dng", "\u53C2\u6A2A\u6597\u8F6C": "sh\u0113n h\xE9ng d\u01D2u zhu\u01CEn", "\u53C2\u56DE\u6597\u8F6C": "sh\u0113n hu\xED d\u01D2u zhu\u01CEn", "\u53C2\u8FB0\u536F\u9149": "sh\u0113n ch\xE9n m\u01CEo y\u01D2u", "\u53C2\u8FB0\u65E5\u6708": "sh\u0113n ch\xE9n r\xEC yu\xE8", "\u6750\u4F18\u5E72\u6D4E": "c\xE1i y\u014Du g\xE0n j\u01D0", "\u6750\u8F7B\u5FB7\u8584": "c\xE1i q\u012Bng d\xE9 b\xF3", "\u6750\u5927\u96BE\u7528": "c\xE1i d\xE0 n\xE1n y\xF2ng", "\u6750\u8584\u8D28\u8870": "c\xE1i b\xF3 zh\xEC shu\u0101i", "\u624D\u5360\u516B\u6597": "c\xE1i zh\u0101n b\u0101 d\u01D2u", "\u624D\u758F\u5FB7\u8584": "c\xE1i sh\u016B d\xE9 b\xF3", "\u624D\u8F7B\u5FB7\u8584": "c\xE1i q\u012Bng d\xE9 b\xF3", "\u624D\u5927\u96BE\u7528": "c\xE1i d\xE0 n\xE1n y\xF2ng", "\u624D\u8584\u667A\u6D45": "c\u0101i b\xF3 zh\xEC qi\u01CEn", "\u64E6\u62F3\u62B9\u638C": "c\u0101 qu\xE1n m\xF2 zh\u01CEng", "\u4E0D\u8DB3\u4E3A\u610F": "b\xF9 z\xFA w\xE9i y\xEC", "\u4E0D\u8DB3\u4E3A\u636E": "b\xF9 z\xFA w\xE9i j\xF9", "\u4E0D\u8DB3\u4E3A\u6CD5": "b\xF9 z\xFA w\xE9i f\u01CE", "\u4E0D\u8DB3\u9F7F\u6570": "b\xF9 z\xFA ch\u01D0 sh\u01D4", "\u4E0D\u7740\u75BC\u70ED": "b\xF9 zhu\xF3 t\xE9ng r\xE8", "\u4E0D\u77E5\u85A1\u856B": "b\xF9 zh\u012B d\u012Bng d\u01D2ng", "\u4E0D\u8D8A\u96F7\u6C60": "b\xF9 yu\xE8 l\xE9i shi", "\u4E0D\u4EA6\u5584\u592B": "b\xF9 yi sh\xE0n f\u016B", "\u4E0D\u76F8\u4E3A\u8C0B": "b\xF9 xi\u0101ng w\xE9i m\xF3u", "\u4E0D\u8D2A\u4E3A\u5B9D": "b\xF9 t\u0101n w\xE9 b\u01CEo", "\u4E0D\u968F\u4EE5\u6B62": "bu shui yi zi", "\u4E0D\u5948\u4E4B\u4F55": "b\xF9 nai zh\u012B h\xE9", "\u4E0D\u9732\u950B\u94D3": "b\xF9 l\xF9 f\u0113ng hu\xEC", "\u4E0D\u4E86\u800C\u4E86": "b\xF9 li\u01CEo \xE9r li\u01CEo", "\u4E0D\u53EF\u80DC\u4E3E": "b\xF9 k\u011B sh\xE8ng j\xF9", "\u4E0D\u53EF\u5948\u4F55": "b\xF9 k\u011B m\xE0i h\xE9", "\u4E0D\u53EF\u63C6\u5EA6": "b\xF9 k\u011B ku\xED du\xF3", "\u4E0D\u7EDD\u5982\u53D1": "b\xF9 ju\xE9 r\xFA f\xE0", "\u4E0D\u63EA\u4E0D\u776C": "b\xF9 ch\u01D2u b\xF9 c\u01CEi", "\u4E0D\u95F4\u4E0D\u754C": "b\xF9 g\u0101n b\xF9 g\xE0", "\u4E0D\u9051\u542F\u5904": "b\xF9 hu\xE1ng q\u01D0 ch\u01D4", "\u4E0D\u9051\u5B81\u5904": "b\xF9 hu\xE1ng n\xEDng ch\u01D4", "\u4E0D\u6839\u4E4B\u8C08": "b\xF9 g\u0101n zh\u012B t\xE1n", "\u4E0D\u5206\u9752\u767D": "b\xF9 f\u0113n q\u012Bng b\xE9i", "\u4E0D\u5F53\u4E0D\u6B63": "b\xF9 d\u0101ng b\xF9 zh\xE8ng", "\u4E0D\u5DEE\u4EC0\u4E48": "b\xF9 ch\xE0 sh\xED m\u01D2", "\u4E0D\u5DEE\u4E0A\u4E0B": "b\xF9 ch\u0101 sh\xE0ng xi\xE0", "\u4E0D\u5DEE\u7D2F\u9ECD": "b\xF9 ch\u0101 l\u011Bi sh\u01D4", "\u4E0D\u5DEE\u6BEB\u5398": "b\xF9 ch\u0101 h\xE1o l\xED", "\u4E0D\u5DEE\u6BEB\u53D1": "b\xF9 ch\u0101 h\xE1o f\xE0", "\u4E0D\u8F9F\u65A7\u94BA": "b\xF9 b\xEC f\u01D4 yu\xE8", "\u4E0D\u62D4\u4E00\u6BDB": "b\xF9 b\xE1 y\xEC m\xE1o", "\u9914\u7CDF\u555C\u6F13": "b\u01D4 z\u0101o chu\xF2 l\xED", "\u64D8\u4E24\u5206\u661F": "b\xF3 li\u01CEng f\u0113n x\u012Bng", "\u7C38\u571F\u626C\u6C99": "b\u01D2 t\u01D4 y\xE1ng sh\u0101", "\u8584\u7269\u7EC6\u6545": "b\xF3 w\xF9 x\xEC g\xF9", "\u8584\u60C5\u65E0\u4E49": "b\xE1o q\xEDng w\xFA y\xEC", "\u8584\u5BD2\u4E2D\u4EBA": "b\xF3 h\xE1n zh\xF2ng r\xE9n", "\u535A\u6587\u7EA6\u793C": "b\xF3 w\xE9n yu\xE8 l\u01D0", "\u4F2F\u4E50\u4E00\u987E": "b\u014D l\xE8 y\u012B g\xF9", "\u64AD\u7CE0\u772F\u76EE": "b\u014D k\u0101ng m\u01D0 m\xF9", "\u64AD\u7A45\u772F\u76EE": "b\u014D k\u0101ng m\u01D0 m\xF9", "\u5265\u76AE\u62BD\u7B4B": "b\u014D p\xED ch\u014Du j\u012Bn", "\u5265\u80A4\u690E\u9AD3": "b\u014D f\u016B chu\xED su\u01D0", "\u6CE2\u5C5E\u4E91\u59D4": "b\u014D zh\u01D4 y\xFAn w\u011Bi", "\u6CE2\u9A87\u4E91\u5C5E": "b\u014D h\xE0i y\xFAn zh\u01D4", "\u62E8\u4E71\u4E3A\u6CBB": "b\u014D lu\xE0n w\xE9i zh\xEC", "\u75C5\u5165\u9AA8\u96A8": "b\xECng r\xF9 g\u01D4 su\u01D0", "\u5E76\u8D43\u62FF\u8D3C": "b\xECng zhu\u014D n\xE1 z\xE9i", "\u5E76\u4E3A\u4E00\u8C08": "b\xECng w\xE9i y\u012B t\xE1n", "\u4E19\u79CD\u5C04\u7EBF": "b\u01D0ng zh\u01D2ng sh\xE8 xi\xE0n", "\u5175\u672A\u8840\u5203": "b\u012Bng w\xE8i xu\u011B r\xE8n", "\u5175\u5FAE\u5C06\u5BE1": "b\u012Bng w\u0113i ji\xE0ng gu\u01CE", "\u5175\u5F3A\u5C06\u52C7": "b\u012Bng qi\xE1ng \xE0ng y\u01D2ng", "\u5175\u591A\u5C06\u5E7F": "b\u012Bng du\u014D ji\xE0ng gu\u01CEng", "\u5175\u4E0D\u7531\u5C06": "b\u012Bng b\xF9 y\xF3u ji\xE0ng", "\u51B0\u89E3\u7684\u7834": "b\u012Bng ji\u011B d\xEC p\xF2", "\u5F6C\u5F6C\u6D4E\u6D4E": "b\u012Bn b\u012Bn j\u01D0 j\u01D0", "\u522B\u7C7B\u5206\u95E8": "bi\xE9 l\xE8i f\u0101n m\xE9n", "\u522B\u5F00\u4E00\u683C": "bi\xE9 k\u0101i y\xED g\xE9", "\u522B\u9E64\u79BB\u9E3E": "bi\xE9 h\xE8 l\xED l\xE1un", "\u522B\u521B\u4E00\u683C": "bi\xE9 chu\xE0ng y\xED g\xE9", "\u647D\u6885\u4E4B\u5E74": "bi\xE0o m\xE9n zh\u012B ni\xE1n", "\u8868\u91CC\u4E3A\u5978": "bi\u01CEo l\u01D0 w\xE9i ji\u0101n", "\u98D9\u53D1\u7535\u4E3E": "bi\u0101o f\u0101 di\xE0n j\xF9", "\u53D8\u8D2A\u5389\u8584": "bi\u01CEn t\u0101n l\xEC b\xF3", "\u53D8\u5371\u4E3A\u5B89": "bi\xE0n w\u0113i w\xE9i \u0101n", "\u53D8\u5E7B\u4E0D\u6D4B": "bi\xE0n hu\xE0 b\xF9 c\xE8", "\u53D8\u98CE\u6539\u4FD7": "bi\xE0n f\u0113ng y\xEC s\xFA", "\u97AD\u7EA6\u8FD1\u91CC": "bi\u0101n yu\u0113 j\u012Bn l\u01D0", "\u97AD\u64D7\u5411\u91CC": "bi\u0101n b\xEC xi\xE0ng l\u01D0", "\u97AD\u64D7\u8FDB\u91CC": "b\u012Ban p\xEC j\xECn l\u01D0", "\u97AD\u8F9F\u7740\u91CC": "bi\u0101n b\xEC zhu\xF3 l\u01D0", "\u97AD\u8F9F\u5411\u91CC": "bi\u0101n b\xEC xi\xE0ng l\u01D0", "\u907F\u96BE\u8D8B\u6613": "b\xEC n\xE1n qi\xF9 y\xEC", "\u853D\u660E\u585E\u806A": "b\xEC m\xEDng s\xE8 c\u014Dng", "\u853D\u806A\u585E\u660E": "b\xEC c\u014Dng s\xE8 m\xEDng", "\u655D\u5E37\u4E0D\u5F03": "b\u01D0 w\xE9i b\xF9 q\xEC", "\u655D\u76D6\u4E0D\u5F03": "b\u01D0 g\xE0i b\xF9 q\xEC", "\u95ED\u76EE\u585E\u8033": "b\xEC m\xF9 s\xE8 \u011Br", "\u95ED\u660E\u585E\u806A": "b\xEC m\xEDng s\xE8 c\u014Dng", "\u95ED\u95E8\u601D\u6106": "b\xEC g\xE9 s\u012B qi\u0101n", "\u95ED\u95E8\u626B\u8FF9": "b\xEC k\u01D2u s\u01CEo gu\u01D0", "\u95ED\u95E8\u585E\u6237": "b\xEC k\u01D2u s\xE8 h\xF9", "\u95ED\u95E8\u585E\u7AA6": "b\xEC k\u01D2u s\xE8 d\xF2u", "\u95ED\u95E8\u5408\u8F99": "b\xEC k\u01D2u h\xE9 sh\xE9", "\u95ED\u5408\u81EA\u8D23": "b\xEC g\xE9 z\xEC z\xE9", "\u95ED\u5408\u601D\u8FC7": "b\xEC g\xE9 s\u012B gu\xF2", "\u79D5\u8A00\u8C2C\u8BF4": "b\u01D0 y\xE1n mi\xF9 shu\xF2", "\u5F7C\u5531\u6B64\u548C": "b\u01D0 ch\xE0ng c\u01D0 h\xE8", "\u5F7C\u5021\u6B64\u548C": "b\u01D0 ch\xE0ng c\u01D0 h\xE8", "\u6BD4\u7269\u5C5E\u4E8B": "b\u01D0 w\xF9 zh\u01D4 sh\xEC", "\u6BD4\u91CF\u9F50\u89C2": "b\u01D0 li\xE0ng q\xED gu\u0101n", "\u672C\u679D\u767E\u4E16": "b\u011Bn zh\u012B b\u01D2i sh\xEC", "\u88AB\u5C71\u5E26\u6CB3": "p\u012B sh\u0101n d\xE0i h\xE9", "\u88AB\u7532\u6267\u5175": "p\u012B ji\u01CE zh\xED b\u012Bng", "\u88AB\u7532\u6795\u6208": "p\u012B ji\u01CE zh\u011Bn g\u0113", "\u88AB\u7532\u636E\u978D": "p\u012B ji\u01CE j\xF9 \u0101n", "\u88AB\u7532\u6301\u5175": "p\u012B ji\u01CE ch\xED b\u012Bng", "\u88AB\u8910\u6000\u73E0": "p\u012B h\xE8 hu\xE1i zh\u016B", "\u88AB\u8910\u6000\u7389": "p\u012B h\xE8 hu\xE1i y\xF9", "\u88AB\u53D1\u7F28\u51A0": "p\u012B f\xE0 y\u012Bng gu\xE0n", "\u88AB\u53D1\u6587\u8EAB": "p\u012B f\xE0 w\xE9n sh\u0113n", "\u80CC\u4E49\u5FD8\u6069": "b\xE8i y\xF9 w\xE0ng \u0113n", "\u80CC\u4E49\u8D1F\u4FE1": "b\xE8i y\xF9 f\xF9 x\xECn", "\u80CC\u4E49\u8D1F\u6069": "b\xE8i y\xF9 f\xF9 \u0113n", "\u80CC\u66F2\u8170\u5F2F": "b\xE8i q\u01D4 y\u0101o w\u0101n", "\u80CC\u66F2\u8170\u8EAC": "b\xE8i q\u01D4 y\u0101o g\u014Dng", "\u5317\u95E8\u7BA1\u94A5": "b\u011Bi m\xE9n gu\u01CEn yu\xE8", "\u5317\u7A97\u9AD8\u5367": "b\u0113i chu\u0101ng g\u0101o w\xF2", "\u5317\u8FB0\u661F\u62F1": "b\u0113i ch\xE9n x\u012Bng g\u01D2ng", "\u5317\u9119\u4E4B\u97F3": "b\u0113i b\u01D0 zh\u012B y\u012Bn", "\u5317\u9119\u4E4B\u58F0": "b\u0113i b\u01D0 zh\u012B sh\u0113ng", "\u60B2\u58F0\u8F7D\u9053": "b\u0113i sh\u0113ng z\xE0i d\xE0o", "\u5351\u5BAB\u83F2\u98DF": "b\u0113i g\u014Dng f\u011Bi sh\xED", "\u66B4\u8863\u9732\u51A0": "p\xF9 y\u012B l\xF9 gu\xE0n", "\u66B4\u8863\u9732\u76D6": "p\xF9 y\u012B l\xF9 g\xE0i", "\u66B4\u816E\u9F99\u95E8": "p\xF9 s\u0101i l\xF3ng m\xE9n", "\u66B4\u9732\u6587\u5B66": "b\xE0o l\xF2u w\xE9n xu\xE9", "\u66B4\u864E\u51AF\u6CB3": "b\xE0o h\u01D4 p\xEDng h\xE9", "\u62B1\u8513\u6458\u74DC": "b\xE0o w\xE0n zh\u0101i gu\u0101", "\u62B1\u5173\u6267\u94A5": "b\xE0o gu\u0101n zh\xED yu\xE8", "\u62B1\u6CD5\u5904\u52BF": "b\xE0o f\u01CE ch\u01D4 sh\xEC", "\u8912\u8D2C\u4E0E\u593A": "b\u01CEo bi\u01CEn y\u01D4 du\xF3", "\u5E2E\u95F2\u94BB\u61D2": "b\u0101ng xi\xE1n zu\u0101n l\u01CEn", "\u534A\u4E0A\u843D\u4E0B": "b\xE0n sh\xE0ng lu\xF2 xi\xE0", "\u534A\u95F4\u4E0D\u754C": "b\xE0n g\u0101n b\xF9 g\xE0", "\u534A\u95F4\u534A\u754C": "b\xE0n g\u0101n b\xE0n g\xE0", "\u534A\u7B79\u83AB\u5C55": "b\xE0n ch\xF3u m\xF2 ch\u01CEn", "\u62DC\u5C06\u5C01\u4FAF": "b\xE0i ji\xE0ng f\u0113ng h\xF3u", "\u767E\u4E2D\u767E\u53D1": "b\u01CEi zh\xF2ng b\u01CEi f\u0101", "\u767E\u4E0B\u767E\u7740": "b\u01CEi xi\xE0 b\u01CEi zh\xE1o", "\u767E\u517D\u7387\u821E": "b\u01CEi sh\xF2u shu\xE0i w\u01D4", "\u767E\u820D\u91CD\u8DBC": "b\u01CEi sh\xE8 ch\xF3ng ji\u01CEn", "\u767E\u820D\u91CD\u8327": "b\u01CEi sh\xE8 ch\xF3ng ji\u01CEn", "\u767E\u4E86\u5343\u5F53": "b\u01CEi li\u01CEo qi\u0101n d\u0101ng", "\u767E\u5B54\u5343\u521B": "b\u01CEi k\u01D2ng qi\u0101n chu\u0101ng", "\u767E\u5815\u4FF1\u4E3E": "b\u01CEi hu\u012B j\xF9 j\u01D4", "\u767E\u4E0D\u5F53\u4E00": "b\u01CEi b\xF9 d\u0101ng y\u012B", "\u767D\u8863\u537F\u76F8": "b\xE1i y\u012B q\u012Bng xi\xE0ng", "\u767D\u9996\u76F8\u5E84": "b\xE1i sh\u01D2u xi\u0101ng zhu\u0101ng", "\u767D\u9996\u4E3A\u90CE": "b\xE1i sh\u01D2u w\xE9i l\xE1ng", "\u767D\u9996\u76F8\u77E5": "b\xE1i sh\u01D2u xi\u0101ng zh\u012B", "\u767D\u4E0D\u5472\u54A7": "b\xE1i b\xF9 c\u012B li\u011B", "\u628A\u73A9\u65E0\u538C": "b\u01CE w\xE1n w\u01D4 y\xE0n", "\u62D4\u9505\u5377\u5E2D": "b\xE1 gu\u014D ju\u01CEn x\xED", "\u62D4\u672C\u585E\u6E90": "b\xE1 b\u011Bn s\xE8 yu\xE1n", "\u62D4\u672C\u585E\u539F": "b\xE1 b\u011Bn s\xE8 yu\xE1n", "\u6252\u8033\u6414\u816E": "p\xE1 \u011Br s\u0101o s\u0101i", "\u516B\u96BE\u4E09\u707E": "b\u0101 n\xE0n s\u0101n z\u0101i", "\u50B2\u4E0D\u53EF\u957F": "\xE0o b\xF9 k\u011B zh\u01CEng", "\u9CCC\u9E23\u9CD6\u5E94": "\xE1o m\xEDng bi\u0113 y\u012Bng", "\u71AC\u66F4\u5B88\u591C": "\xE1o g\u0113ng sh\u01D2u y\xE8", "\u6556\u4E0D\u53EF\u957F": "\xE0o b\xF9 k\u011B zh\u01CEng", "\u6697\u7BAD\u4E2D\u4EBA": "\xE0n ji\xE0n zh\xF2ng r\xE9n", "\u5B89\u65F6\u5904\u987A": "\u0101n sh\xED ch\u01D4 sh\xF9n", "\u5B89\u8EAB\u4E3A\u4E50": "\u0101n sh\u0113n w\xE9i l\xE8", "\u5B89\u8001\u6000\u5C11": "\u0101n l\u01CEo hu\xE1i sh\xE0o", "\u5B89\u5E38\u5904\u987A": "\u0101n ch\xE1ng ch\u01D4 sh\xF9n", "\u5B89\u6B65\u5F53\u8F66": "\u0101n b\xF9 d\xE0ng ch\u0113", "\u7231\u751F\u6076\u6B7B": "\xE0i sh\u0113ng w\xF9 s\u01D0", "\u7231\u4EBA\u597D\u58EB": "\xE0i r\xE9n h\xE0o sh\xEC", "\u77EE\u5B50\u89C2\u573A": "\u01CEi z\u01D0 gu\u0101n ch\xE1ng", "\u77EE\u4EBA\u89C2\u573A": "\u01CEi r\xE9n gu\u0101n ch\xE1ng", "\u6371\u98CE\u7F09\u7F1D": "\u0101i f\u0113ng q\u012B f\xE8ng", "\u6328\u5C71\u585E\u6D77": "\u0101i sh\u0101n s\xE8 h\u01CEi", "\u6328\u80A9\u64E6\u8180": "\u0101i ji\u0101n c\u0101 b\u01CEng", "\u963F\u5176\u6240\u597D": "\u0113 q\xED su\u01D2 h\xE0o", "\u963F\u5BB6\u963F\u7FC1": "\u0101 g\u016B \u0101 w\u0113ng", "\u963F\u515A\u76F8\u4E3A": "\u0113 d\u01CEng xi\u0101ng w\xE9i", "\u8FFD\u4EA1\u9010\u5317": "zhu\u012B b\u0113n zh\xFA b\u011Bi", "\u8F6C\u5FE7\u4E3A\u559C": "zhu\u01CEn y\u014Du w\xE9i x\u01D0", "\u7AF9\u7BEE\u6253\u6C34": "zh\xFA l\xE1n d\xE1 shu\u01D0", "\u91CD\u94EC\u9178\u94BE": "ch\xF3ng g\xE8 su\u0101n ji\u01CE", "\u77E5\u75BC\u7740\u70ED": "zh\u012B t\xE9ng zh\xE1o r\xE8", "\u8BED\u4E0D\u60CA\u4EBA": "y\u01D4 b\xF9 j\u012Bng r\xE8n", "\u4E8E\u4ECA\u4E3A\u70C8": "y\xFA j\u012Bn w\xE9i li\xE8", "\u4EE5\u53E4\u4E3A\u955C": "y\u01D0 g\u01D4 w\xE9i j\xECng", "\u4E00\u65E5\u4E09\u7701": "y\u012B r\xEC s\u0101n x\u01D0ng", "\u71D5\u96C0\u5904\u5802": "y\xE0n qu\xE8 ch\u01D4 t\xE1ng", "\u7A74\u5C45\u91CE\u5904": "xu\xE9 j\u016B y\u011B ch\u01D4", "\u4E94\u810A\u516D\u517D": "w\u01D4 j\xED li\xF9 sh\xF2u", "\u65E0\u58F0\u65E0\u81ED": "w\xFA sh\u0113ng w\xFA xi\xF9", "\u8C13\u4E88\u4E0D\u4FE1": "w\xE8i y\xFA b\xF9 x\xECn", "\u4E07\u7BAD\u6512\u5FC3": "w\xE0n ji\xE0n cu\xE1n x\u012Bn", "\u820D\u8EAB\u4E3A\u56FD": "sh\u011B sh\u0113n w\xE9i gu\xF3", "\u6740\u59BB\u6C42\u5C06": "sh\u0101 q\u012B qi\xFA ji\xE0ng", "\u66F2\u4E0D\u79BB\u53E3": "q\u01D4 b\xF9 l\xED k\u01D2u", "\u5F3A\u4F5C\u89E3\u4EBA": "qi\u01CEng zu\xF2 ji\u011B r\xE9n", "\u6C14\u51B2\u6597\u725B": "q\xEC ch\u014Dng d\u01D2u ni\xFA", "\u6BDB\u53D1\u609A\u7136": "m\xE1o f\u0101 s\u01D2ng r\xE1n", "\u4E34\u6DF1\u5C65\u8584": "l\xEDn sh\u0113n l\u01DA b\xF3", "\u8001\u8C03\u91CD\u8C08": "l\u01CEo di\xE0o ch\xF3ng t\xE1n", "\u94A7\u5929\u5E7F\u4E50": "j\u016Bn ti\u0101n gu\u01CEng yu\xE8", "\u8270\u96BE\u7AED\u8E76": "ji\u0101n n\xE1n ji\xE9 ju\xE9", "\u5939\u4E03\u5939\u516B": "ji\u0101 q\u012B ji\u0101 b\u0101", "\u9701\u6708\u5149\u98CE": "j\u012B yu\xE8 gu\u0101ng f\u0113ng", "\u6025\u529F\u597D\u5229": "j\xED g\u014Dng h\xE0o l\xEC", "\u7978\u798F\u76F8\u501A": "hu\xF2 f\xFA xi\u0101ng y\u012B", "\u6DF7\u6DF7\u5669\u5669": "h\xFAn h\xFAn \xE8 \xE8", "\u539A\u53E4\u8584\u4ECA": "h\xF2u g\u01D4 b\xF3 j\u012Bn", "\u9B3C\u6015\u6076\u4EBA": "gu\u01D0 p\xE0 \xE8r \xE9n", "\u4F3D\u9A6C\u5C04\u7EBF": "g\u0101 m\u01CE sh\xE8 xi\xE0n", "\u4F5B\u5934\u7740\u7CAA": "f\xF3 t\xF3u zhu\xF3 f\xE8n", "\u5949\u4E3A\u81F3\u5B9D": "f\xE8ng w\xE9i zh\xEC b\u01CEo", "\u6076\u8BED\u4E2D\u4F24": "\xE8 y\u01D4 zh\xF2ng sh\u0101ng", "\u4E22\u4E09\u62C9\u56DB": "diu s\u0101n l\u0101 s\xEC", "\u767B\u575B\u62DC\u5C06": "d\u0113ng t\xE1n b\xE0i ji\xE0ng", "\u6668\u660F\u5B9A\u7701": "ch\xE9n h\u016Bn d\xECng x\u01D0ng", "\u5BDF\u5BDF\u4E3A\u660E": "ch\xE1 ch\xE1 w\xE9i m\xEDng", "\u535A\u95FB\u5F3A\u8BC6": "b\xF3 w\xE9n qi\xE1ng zh\xEC", "\u907F\u96BE\u5C31\u6613": "b\xEC n\xE1n ji\xF9 y\xEC" }, { "\u5DF4\u5C14\u5E72\u534A\u5C9B": "b\u0101 \u011Br g\xE0n b\xE0n d\u01CEo", "\u5DF4\u5C14\u5580\u4EC0\u6E56": "b\u0101 \u011Br k\u0101 sh\xED h\xFA", "\u4E0D\u5E78\u800C\u8A00\u4E2D": "b\xF9 x\xECng \xE9r y\xE1n zh\xF2ng", "\u5E03\u5C14\u4EC0\u7EF4\u514B": "b\xF9 \u011Br sh\xED w\xE9i k\xE8", "\u8D76\u9E2D\u5B50\u4E0A\u67B6": "g\u01CEn y\u0101 z\u012B sh\xE0ng ji\xE0", "\u4F55\u4E50\u800C\u4E0D\u4E3A": "h\xE9 l\xE8 \xE9r b\xF9 w\xE9i", "\u82DB\u653F\u731B\u4E8E\u864E": "k\u0113 zh\xE8 m\u011Bng y\xFA h\u01D4", "\u8499\u5F97\u7EF4\u7684\u4E9A": "m\xE9ng de w\xE9i de y\xE0", "\u6C11\u4EE5\u98DF\u4E3A\u5929": "m\xEDn y\u01D0 sh\xED w\xE9i ti\u0101n", "\u62E7\u6210\u4E00\u80A1\u7EF3": "n\xEDng ch\xE9ng y\u012B g\u01D4 sh\xE9ng", "\u4E8B\u540E\u8BF8\u845B\u4EAE": "sh\xEC h\xF2u zh\u016B g\xE9 li\xE0ng", "\u7269\u4EE5\u7A00\u4E3A\u8D35": "w\xF9 y\u01D0 x\u012B w\xE9i gu\xEC", "\u5148\u4E0B\u624B\u4E3A\u5F3A": "xi\u0101n xi\xE0 sh\u01D2u w\xE9i qi\xE1ng", "\u884C\u884C\u51FA\u72B6\u5143": "h\xE1ng h\xE1ng ch\u016B zhu\xE0ng yu\xE1n", "\u4E9A\u5F97\u91CC\u4E9A\u6D77": "y\xE0 de l\u01D0 y\xE0 h\u01CEi", "\u773C\u4E0D\u89C1\u4E3A\u51C0": "y\u01CEn b\xF9 ji\xE0n w\xE9i j\xECng", "\u6709\u9F3B\u5B50\u6709\u773C": "y\u01D2u b\xED zi y\u01D2u y\u01CEn", "\u7AF9\u7B52\u5012\u8C46\u5B50": "zh\xFA t\u01D2ng d\u01CEo d\xF2u zi" }], x = function(n2) {
    var h2 = n2.charCodeAt(0), g2 = o[h2];
    return g2 ? g2.split(" ")[0] : n2;
  }, t$1 = function(n2, h2, g2, i2) {
    if (h2 > 5)
      t$1(n2, 5, g2, i2);
    else if (h2 <= 1)
      for (var u2 = 0; u2 < n2.length; u2++) {
        var z2 = n2[u2], s2 = x(z2);
        g2[i2 + u2] = { origin: z2, result: s2, isZh: s2 !== z2, originPinyin: s2 };
      }
    else {
      var o2 = function(u3) {
        var z3 = n2.indexOf(u3);
        if (z3 > -1) {
          b[h2][u3].split(" ").forEach(function(n3, h3) {
            g2[i2 + z3 + h3] = { origin: u3[h3], result: n3, isZh: true, originPinyin: n3 };
          });
          var s3 = n2.slice(0, z3);
          t$1(s3, s3.length, g2, i2);
          var o3 = n2.slice(z3 + u3.length);
          return t$1(o3, o3.length, g2, i2 + z3 + u3.length), { value: void 0 };
        }
      };
      for (var y2 in b[h2]) {
        var j2 = o2(y2);
        if ("object" == typeof j2)
          return j2.value;
      }
      t$1(n2, h2 - 1, g2, i2);
    }
  }, q = function(n2, h2, g2, i2) {
    var u2 = function(h3) {
      var u3 = n2.indexOf(h3);
      if (u3 > -1) {
        z[h3].split(" ").forEach(function(n3, z2) {
          g2[i2 + u3 + z2] = { origin: h3[z2], result: n3, isZh: true, originPinyin: n3 };
        });
        var s3 = n2.slice(0, u3);
        q(s3, s3.length, g2, i2);
        var o3 = n2.slice(u3 + h3.length);
        return q(o3, o3.length, g2, i2 + u3 + h3.length), { value: void 0 };
      }
    };
    for (var s2 in z) {
      var o2 = u2(s2);
      if ("object" == typeof o2)
        return o2.value;
    }
    t$1(n2, h2, g2, i2);
  }, w = function(n2, h2, g2, i2, u2) {
    var z2 = function(h3) {
      var z3 = n2.indexOf(h3);
      if (z3 > -1) {
        d()[h3].split(" ").forEach(function(n3, u3) {
          g2[i2 + z3 + u3] = { origin: h3[u3], result: n3, isZh: true, originPinyin: n3 };
        });
        var s3 = n2.slice(0, z3);
        w(s3, s3.length, g2, i2, u2);
        var o3 = n2.slice(z3 + h3.length);
        return w(o3, o3.length, g2, i2 + z3 + h3.length, u2), { value: void 0 };
      }
    };
    for (var s2 in d()) {
      var o2 = z2(s2);
      if ("object" == typeof o2)
        return o2.value;
    }
    "surname" === u2 ? q(n2, h2, g2, i2) : t$1(n2, h2, g2, i2);
  }, m = function(n2) {
    return n2.replace(/(ā|á|ǎ|à)/g, "a").replace(/(ō|ó|ǒ|ò)/g, "o").replace(/(ē|é|ě|è)/g, "e").replace(/(ī|í|ǐ|ì)/g, "i").replace(/(ū|ú|ǔ|ù)/g, "u").replace(/(ǖ|ǘ|ǚ|ǜ)/g, "\xFC").replace(/(ń|ň|ǹ)/g, "n");
  }, f = function(u2) {
    for (var z2 = [], s2 = [], o2 = 0, y2 = u2.split(" "); o2 < y2.length; o2++)
      for (var j2 = y2[o2], c2 = 0, l2 = n; c2 < l2.length; c2++) {
        var d2 = l2[c2];
        if (j2.startsWith(d2)) {
          var b2 = j2.slice(d2.length);
          -1 !== h.indexOf(d2) && -1 !== g.indexOf(b2) && (b2 = i[b2]), z2.push(d2), s2.push(b2);
          break;
        }
      }
    return { final: s2.join(" "), initial: z2.join(" ") };
  }, r = function(n2) {
    var h2 = f(n2).final, g2 = "", i2 = "", z2 = "";
    return -1 !== u.indexOf(m(h2)) ? (g2 = h2[0], i2 = h2[1], z2 = h2.slice(2)) : (i2 = h2[0] || "", z2 = h2.slice(1) || ""), { head: g2, body: i2, tail: z2 };
  }, p = function(n2) {
    var h2 = /(ā|ō|ē|ī|ū|ǖ)/, g2 = /(á|ó|é|í|ú|ǘ|ń)/, i2 = /(ǎ|ǒ|ě|ǐ|ǔ|ǚ|ň)/, u2 = /(à|ò|è|ì|ù|ǜ|ǹ)/, z2 = /(a|o|e|i|u|ü|n)/, s2 = [];
    return n2.split(" ").forEach(function(n3) {
      h2.test(n3) ? s2.push("1") : g2.test(n3) ? s2.push("2") : i2.test(n3) ? s2.push("3") : u2.test(n3) ? s2.push("4") : z2.test(n3) ? s2.push("0") : s2.push("");
    }), s2.join(" ");
  }, e = function(n2) {
    var h2 = [];
    return n2.split(" ").forEach(function(n3) {
      h2.push(n3[0]);
    }), h2.join(" ");
  }, k = function(n2, h2) {
    return !(1 !== j(n2) || !h2.multiple) && function(n3) {
      var h3 = n3.charCodeAt(0), g2 = o[h3];
      return g2 ? g2.split(" ").map(function(h4) {
        return { origin: n3, result: h4, isZh: true, originPinyin: h4 };
      }) : [{ origin: n3, result: n3, isZh: false, originPinyin: n3 }];
    }(n2);
  }, a = function(n2, h2) {
    switch (h2.toneType) {
      case "symbol":
        break;
      case "none":
        n2.forEach(function(n3) {
          n3.result = m(n3.result);
        });
        break;
      case "num":
        n2.forEach(function(n3) {
          n3.result = function(n4, h3) {
            var g2 = m(n4).split(" "), i2 = p(h3).split(" "), u2 = [];
            return g2.forEach(function(n5, h4) {
              u2.push("" + n5 + i2[h4]);
            }), u2.join(" ");
          }(n3.result, n3.originPinyin);
        });
    }
  }, v = { pattern: "pinyin", toneType: "symbol", type: "string", multiple: false, mode: "normal", removeNonZh: false, nonZh: "spaced", v: false };
  function E(n2, h2) {
    if (void 0 === h2 && (h2 = v), !function(n3) {
      return "string" == typeof n3 || (formatAppLog("error", "at node_modules/pinyin-pro/dist/index.es.js:1", "The first param of pinyin is error: " + n3 + ' is not assignable to type "string".'), false);
    }(n2))
      return n2;
    if ("" === n2)
      return "array" === h2.type || "all" === h2.type ? [] : "";
    "all" === h2.type && (h2.pattern = "pinyin"), "num" === h2.pattern && (h2.toneType = "none"), h2.removeNonZh && (h2.nonZh = "removed");
    var g2 = function(n3, h3, g3) {
      var i2 = Array(n3.length);
      g3 ? w(n3, n3.length, i2, 0, h3) : "surname" === h3 ? q(n3, n3.length, i2, 0) : t$1(n3, n3.length, i2, 0);
      for (var u2 = i2.length - 2; u2 >= 0; u2--) {
        var z2 = i2[u2], s2 = i2[u2 + 1];
        /[\uD800-\uDBFF]/.test(z2.result) && /[\uDC00-\uDFFF]/.test(s2.result) && (z2.origin += s2.origin, z2.result += s2.result, z2.originPinyin = z2.result, s2.delete = true, u2--);
      }
      return i2.filter(function(n4) {
        return !n4.delete;
      });
    }(n2, h2.mode || "normal", !!Object.keys(c).length);
    return g2 = function(n3, h3) {
      var g3 = h3.nonZh;
      if ("removed" === g3)
        return n3.filter(function(n4) {
          return n4.isZh;
        });
      if ("consecutive" === g3) {
        for (var i2 = n3.length - 2; i2 >= 0; i2--) {
          var u2 = n3[i2], z2 = n3[i2 + 1];
          u2.isZh || z2.isZh || (u2.origin += z2.origin, u2.result += z2.result, z2.delete = true);
        }
        return n3.filter(function(n4) {
          return !n4.delete;
        });
      }
      return n3;
    }(g2, h2), k(n2, h2) && (g2 = k(n2, h2)), function(n3, h3) {
      switch (h3.pattern) {
        case "pinyin":
          break;
        case "num":
          n3.forEach(function(n4) {
            n4.result = p(n4.result);
          });
          break;
        case "initial":
          n3.forEach(function(n4) {
            n4.result = f(n4.result).initial;
          });
          break;
        case "final":
          n3.forEach(function(n4) {
            n4.result = f(n4.result).final;
          });
          break;
        case "first":
          n3.forEach(function(n4) {
            n4.result = e(n4.result);
          });
          break;
        case "finalHead":
          n3.forEach(function(n4) {
            n4.result = r(n4.result).head;
          });
          break;
        case "finalBody":
          n3.forEach(function(n4) {
            n4.result = r(n4.result).body;
          });
          break;
        case "finalTail":
          n3.forEach(function(n4) {
            n4.result = r(n4.result).tail;
          });
      }
    }(g2, h2), a(g2, h2), function(n3, h3) {
      h3.v && n3.forEach(function(n4) {
        n4.result = n4.result.replace(/ü/g, "v");
      });
    }(g2, h2), function(n3, h3, g3) {
      if (h3.multiple && 1 === j(g3)) {
        var i2 = "";
        n3 = n3.filter(function(n4) {
          var h4 = n4.result !== i2;
          return i2 = n4.result, h4;
        });
      }
      return "array" === h3.type ? n3.map(function(n4) {
        return n4.result;
      }) : "all" === h3.type ? n3.map(function(n4) {
        var h4 = n4.isZh ? n4.result : "", g4 = f(h4), i3 = g4.initial, u2 = g4.final, z2 = r(h4), s2 = z2.head, o2 = z2.body, y2 = z2.tail;
        return { origin: n4.origin, pinyin: h4, initial: i3, final: u2, first: n4.isZh ? e(n4.result) : "", finalHead: s2, finalBody: o2, finalTail: y2, num: Number(p(n4.originPinyin)), isZh: n4.isZh };
      }) : n3.map(function(n4) {
        return n4.result;
      }).join(" ");
    }(g2, h2, n2);
  }
  const _sfc_main$b = {
    __name: "friends",
    setup(__props) {
      let userId = vue.ref(10);
      let friendsList = vue.ref([]);
      let overAppendList = vue.ref([]);
      let UserInfo = vue.ref("");
      onShow(() => {
        addressBook.value.forEach((item) => {
          item.data.length = 0;
        });
        UserInfo.value = JSON.parse(uni.getStorageSync("UserInfo"));
        userId.value = UserInfo.value.Id;
        ajax.searchFriends(userId.value).then((res) => {
          if (!res.data.data)
            return;
          friendsList.value = res.data.data;
          let s2;
          friendsList.value.forEach((item1) => {
            s2 = E(item1.AccName, {
              toneType: "none"
            }).substr(0, 1);
            addressBook.value.forEach((item2) => {
              if (item2.id == s2.toUpperCase()) {
                item2.data.push(item1);
                overAppendList.value.push(item1.Id);
              }
            });
          });
          friendsList.value.forEach((item) => {
            if (overAppendList.value.indexOf(item.Id) == -1) {
              formatAppLog("log", "at pages/friends/friends.vue:78", overAppendList.value);
              addressBook.value[26].data.push(item);
            }
          });
        });
      });
      let toView = vue.ref("");
      const toSelectIndex = (item) => {
        toView.value = item;
      };
      const openChat = (Id, Name) => {
        let opt = JSON.stringify({
          Id,
          Name
        });
        uni.navigateTo({
          url: `/pages/friends/chatPage/chatPage?opt=${opt}`
        });
      };
      let indexList = vue.ref([
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "_"
      ]);
      let addressBook = vue.ref([
        {
          id: "A",
          data: []
        },
        {
          id: "B",
          data: []
        },
        {
          id: "C",
          data: []
        },
        {
          id: "D",
          data: []
        },
        {
          id: "E",
          data: []
        },
        {
          id: "F",
          data: []
        },
        {
          id: "G",
          data: []
        },
        {
          id: "H",
          data: []
        },
        {
          id: "I",
          data: []
        },
        {
          id: "J",
          data: []
        },
        {
          id: "K",
          data: []
        },
        {
          id: "L",
          data: []
        },
        {
          id: "M",
          data: []
        },
        {
          id: "N",
          data: []
        },
        {
          id: "O",
          data: []
        },
        {
          id: "P",
          data: []
        },
        {
          id: "Q",
          data: []
        },
        {
          id: "R",
          data: []
        },
        {
          id: "S",
          data: []
        },
        {
          id: "T",
          data: []
        },
        {
          id: "U",
          data: []
        },
        {
          id: "V",
          data: []
        },
        {
          id: "W",
          data: []
        },
        {
          id: "X",
          data: []
        },
        {
          id: "Y",
          data: []
        },
        {
          id: "Z",
          data: []
        },
        {
          id: "_",
          data: []
        }
      ]);
      vue.ref([
        {
          id: "A",
          data: []
        },
        {
          id: "B",
          data: []
        },
        {
          id: "C",
          data: []
        },
        {
          id: "D",
          data: []
        },
        {
          id: "E",
          data: []
        },
        {
          id: "F",
          data: []
        },
        {
          id: "G",
          data: []
        },
        {
          id: "H",
          data: []
        },
        {
          id: "I",
          data: []
        },
        {
          id: "J",
          data: []
        },
        {
          id: "K",
          data: []
        },
        {
          id: "L",
          data: []
        },
        {
          id: "M",
          data: []
        },
        {
          id: "N",
          data: []
        },
        {
          id: "O",
          data: []
        },
        {
          id: "P",
          data: []
        },
        {
          id: "Q",
          data: []
        },
        {
          id: "R",
          data: []
        },
        {
          id: "S",
          data: []
        },
        {
          id: "T",
          data: []
        },
        {
          id: "U",
          data: []
        },
        {
          id: "V",
          data: []
        },
        {
          id: "W",
          data: []
        },
        {
          id: "X",
          data: []
        },
        {
          id: "Y",
          data: []
        },
        {
          id: "Z",
          data: []
        },
        {
          id: "_",
          data: []
        }
      ]);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "friends-container" }, [
          vue.createElementVNode("view", { class: "friends" }, [
            vue.createElementVNode("scroll-view", {
              class: "scroll-container",
              "scroll-y": "true",
              "scroll-into-view": vue.unref(toView),
              "scroll-with-animation": "true"
            }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(addressBook), (item1, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "address-book",
                  id: item1.id
                }, [
                  vue.withDirectives(vue.createElementVNode("view", { class: "address-book-index" }, vue.toDisplayString(item1.id == "_" ? "#" : item1.id), 513), [
                    [vue.vShow, item1.data.length]
                  ]),
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item1.data, (item, index2) => {
                    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
                      key: index2,
                      onClick: ($event) => openChat(item.Id, item.AccName)
                    }, [
                      vue.createElementVNode("view", {
                        class: "contact-container",
                        style: { "display": "flex" }
                      }, [
                        vue.createElementVNode("view", { class: "contact-img" }, [
                          vue.createElementVNode("image", {
                            src: "/static/image/userAvt.png",
                            alt: ""
                          })
                        ]),
                        vue.createElementVNode("view", { class: "contact-detail-container" }, [
                          vue.createElementVNode("view", { class: "contact-name" }, vue.toDisplayString(item.AccName), 1)
                        ]),
                        vue.createCommentVNode(' <image class="splayPhone" src="../../../static/images/playPhone.png" mode=""></image> ')
                      ]),
                      !(item1.data.length == 1) && !(item1.data.length == index2 + 1) ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "bottombor"
                      })) : vue.createCommentVNode("v-if", true)
                    ], 8, ["onClick"])), [
                      [vue.vShow, item1.data.length]
                    ]);
                  }), 128))
                ], 8, ["id"]);
              }), 256))
            ], 8, ["scroll-into-view"]),
            vue.createElementVNode("view", { class: "letter-nav" }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(indexList), (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "item",
                  key: index,
                  onClick: ($event) => toSelectIndex(item)
                }, vue.toDisplayString(item == "_" ? "#" : item), 9, ["onClick"]);
              }), 128))
            ])
          ])
        ]);
      };
    }
  };
  const PagesFriendsFriends = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-db42cae2"], ["__file", "/Users/fox/project/uniapp/ftu/pages/friends/friends.vue"]]);
  const _sfc_main$a = {
    __name: "my",
    setup(__props) {
      vue.onMounted(() => {
      });
      const gotoPage = (index) => {
        switch (index) {
          case 0:
            uni.navigateTo({
              url: "/pages/my/settingUserInfo/settingUserInfo"
            });
            break;
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "my-container" }, [
          vue.createElementVNode("view", { class: "main1" }, [
            vue.createElementVNode("view", { class: "left" }, [
              vue.createElementVNode("image", {
                src: "/static/image/userAvt.png",
                mode: ""
              })
            ]),
            vue.createElementVNode("view", { class: "right" }, [
              vue.createElementVNode("view", { class: "title" }, " 123 "),
              vue.createElementVNode("view", { class: "phone" }, " \u5FAE\u4FE1\u53F7\uFF1A ")
            ])
          ]),
          vue.createElementVNode("view", { class: "main2" }, [
            vue.createElementVNode("view", {
              class: "updateUserInfo",
              onClick: _cache[0] || (_cache[0] = ($event) => gotoPage(0))
            }, [
              vue.createElementVNode("view", { class: "updateUserInfo_image" }, [
                vue.createElementVNode("image", {
                  src: "/static/image/setting.png",
                  mode: ""
                })
              ]),
              vue.createTextVNode(" \u4FEE\u6539\u4FE1\u606F ")
            ]),
            (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(10, (item) => {
              return vue.createElementVNode("view", {
                class: "updateUserInfo",
                style: { "margin-top": "0", "margin-bottom": "0" }
              }, [
                vue.createElementVNode("view", { class: "updateUserInfo_image" }, [
                  vue.createElementVNode("image", {
                    src: "/static/image/find_1.png",
                    mode: ""
                  })
                ]),
                vue.createElementVNode("view", { class: "" }, " \u5F85\u6DFB\u52A0 ")
              ]);
            }), 64))
          ])
        ]);
      };
    }
  };
  const PagesMyMy = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-2f1ef635"], ["__file", "/Users/fox/project/uniapp/ftu/pages/my/my.vue"]]);
  const icons = {
    "id": "2852637",
    "name": "uniui\u56FE\u6807\u5E93",
    "font_family": "uniicons",
    "css_prefix_text": "uniui-",
    "description": "",
    "glyphs": [
      {
        "icon_id": "25027049",
        "name": "yanse",
        "font_class": "color",
        "unicode": "e6cf",
        "unicode_decimal": 59087
      },
      {
        "icon_id": "25027048",
        "name": "wallet",
        "font_class": "wallet",
        "unicode": "e6b1",
        "unicode_decimal": 59057
      },
      {
        "icon_id": "25015720",
        "name": "settings-filled",
        "font_class": "settings-filled",
        "unicode": "e6ce",
        "unicode_decimal": 59086
      },
      {
        "icon_id": "25015434",
        "name": "shimingrenzheng-filled",
        "font_class": "auth-filled",
        "unicode": "e6cc",
        "unicode_decimal": 59084
      },
      {
        "icon_id": "24934246",
        "name": "shop-filled",
        "font_class": "shop-filled",
        "unicode": "e6cd",
        "unicode_decimal": 59085
      },
      {
        "icon_id": "24934159",
        "name": "staff-filled-01",
        "font_class": "staff-filled",
        "unicode": "e6cb",
        "unicode_decimal": 59083
      },
      {
        "icon_id": "24932461",
        "name": "VIP-filled",
        "font_class": "vip-filled",
        "unicode": "e6c6",
        "unicode_decimal": 59078
      },
      {
        "icon_id": "24932462",
        "name": "plus_circle_fill",
        "font_class": "plus-filled",
        "unicode": "e6c7",
        "unicode_decimal": 59079
      },
      {
        "icon_id": "24932463",
        "name": "folder_add-filled",
        "font_class": "folder-add-filled",
        "unicode": "e6c8",
        "unicode_decimal": 59080
      },
      {
        "icon_id": "24932464",
        "name": "yanse-filled",
        "font_class": "color-filled",
        "unicode": "e6c9",
        "unicode_decimal": 59081
      },
      {
        "icon_id": "24932465",
        "name": "tune-filled",
        "font_class": "tune-filled",
        "unicode": "e6ca",
        "unicode_decimal": 59082
      },
      {
        "icon_id": "24932455",
        "name": "a-rilidaka-filled",
        "font_class": "calendar-filled",
        "unicode": "e6c0",
        "unicode_decimal": 59072
      },
      {
        "icon_id": "24932456",
        "name": "notification-filled",
        "font_class": "notification-filled",
        "unicode": "e6c1",
        "unicode_decimal": 59073
      },
      {
        "icon_id": "24932457",
        "name": "wallet-filled",
        "font_class": "wallet-filled",
        "unicode": "e6c2",
        "unicode_decimal": 59074
      },
      {
        "icon_id": "24932458",
        "name": "paihangbang-filled",
        "font_class": "medal-filled",
        "unicode": "e6c3",
        "unicode_decimal": 59075
      },
      {
        "icon_id": "24932459",
        "name": "gift-filled",
        "font_class": "gift-filled",
        "unicode": "e6c4",
        "unicode_decimal": 59076
      },
      {
        "icon_id": "24932460",
        "name": "fire-filled",
        "font_class": "fire-filled",
        "unicode": "e6c5",
        "unicode_decimal": 59077
      },
      {
        "icon_id": "24928001",
        "name": "refreshempty",
        "font_class": "refreshempty",
        "unicode": "e6bf",
        "unicode_decimal": 59071
      },
      {
        "icon_id": "24926853",
        "name": "location-ellipse",
        "font_class": "location-filled",
        "unicode": "e6af",
        "unicode_decimal": 59055
      },
      {
        "icon_id": "24926735",
        "name": "person-filled",
        "font_class": "person-filled",
        "unicode": "e69d",
        "unicode_decimal": 59037
      },
      {
        "icon_id": "24926703",
        "name": "personadd-filled",
        "font_class": "personadd-filled",
        "unicode": "e698",
        "unicode_decimal": 59032
      },
      {
        "icon_id": "24923351",
        "name": "back",
        "font_class": "back",
        "unicode": "e6b9",
        "unicode_decimal": 59065
      },
      {
        "icon_id": "24923352",
        "name": "forward",
        "font_class": "forward",
        "unicode": "e6ba",
        "unicode_decimal": 59066
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrow-right",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrowthinright",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrow-left",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrowthinleft",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrow-up",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrowthinup",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrow-down",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrowthindown",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "bottom",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "arrowdown",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "right",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "arrowright",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "top",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "arrowup",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "left",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "arrowleft",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923334",
        "name": "eye",
        "font_class": "eye",
        "unicode": "e651",
        "unicode_decimal": 58961
      },
      {
        "icon_id": "24923335",
        "name": "eye-filled",
        "font_class": "eye-filled",
        "unicode": "e66a",
        "unicode_decimal": 58986
      },
      {
        "icon_id": "24923336",
        "name": "eye-slash",
        "font_class": "eye-slash",
        "unicode": "e6b3",
        "unicode_decimal": 59059
      },
      {
        "icon_id": "24923337",
        "name": "eye-slash-filled",
        "font_class": "eye-slash-filled",
        "unicode": "e6b4",
        "unicode_decimal": 59060
      },
      {
        "icon_id": "24923305",
        "name": "info-filled",
        "font_class": "info-filled",
        "unicode": "e649",
        "unicode_decimal": 58953
      },
      {
        "icon_id": "24923299",
        "name": "reload-01",
        "font_class": "reload",
        "unicode": "e6b2",
        "unicode_decimal": 59058
      },
      {
        "icon_id": "24923195",
        "name": "mic_slash_fill",
        "font_class": "micoff-filled",
        "unicode": "e6b0",
        "unicode_decimal": 59056
      },
      {
        "icon_id": "24923165",
        "name": "map-pin-ellipse",
        "font_class": "map-pin-ellipse",
        "unicode": "e6ac",
        "unicode_decimal": 59052
      },
      {
        "icon_id": "24923166",
        "name": "map-pin",
        "font_class": "map-pin",
        "unicode": "e6ad",
        "unicode_decimal": 59053
      },
      {
        "icon_id": "24923167",
        "name": "location",
        "font_class": "location",
        "unicode": "e6ae",
        "unicode_decimal": 59054
      },
      {
        "icon_id": "24923064",
        "name": "starhalf",
        "font_class": "starhalf",
        "unicode": "e683",
        "unicode_decimal": 59011
      },
      {
        "icon_id": "24923065",
        "name": "star",
        "font_class": "star",
        "unicode": "e688",
        "unicode_decimal": 59016
      },
      {
        "icon_id": "24923066",
        "name": "star-filled",
        "font_class": "star-filled",
        "unicode": "e68f",
        "unicode_decimal": 59023
      },
      {
        "icon_id": "24899646",
        "name": "a-rilidaka",
        "font_class": "calendar",
        "unicode": "e6a0",
        "unicode_decimal": 59040
      },
      {
        "icon_id": "24899647",
        "name": "fire",
        "font_class": "fire",
        "unicode": "e6a1",
        "unicode_decimal": 59041
      },
      {
        "icon_id": "24899648",
        "name": "paihangbang",
        "font_class": "medal",
        "unicode": "e6a2",
        "unicode_decimal": 59042
      },
      {
        "icon_id": "24899649",
        "name": "font",
        "font_class": "font",
        "unicode": "e6a3",
        "unicode_decimal": 59043
      },
      {
        "icon_id": "24899650",
        "name": "gift",
        "font_class": "gift",
        "unicode": "e6a4",
        "unicode_decimal": 59044
      },
      {
        "icon_id": "24899651",
        "name": "link",
        "font_class": "link",
        "unicode": "e6a5",
        "unicode_decimal": 59045
      },
      {
        "icon_id": "24899652",
        "name": "notification",
        "font_class": "notification",
        "unicode": "e6a6",
        "unicode_decimal": 59046
      },
      {
        "icon_id": "24899653",
        "name": "staff",
        "font_class": "staff",
        "unicode": "e6a7",
        "unicode_decimal": 59047
      },
      {
        "icon_id": "24899654",
        "name": "VIP",
        "font_class": "vip",
        "unicode": "e6a8",
        "unicode_decimal": 59048
      },
      {
        "icon_id": "24899655",
        "name": "folder_add",
        "font_class": "folder-add",
        "unicode": "e6a9",
        "unicode_decimal": 59049
      },
      {
        "icon_id": "24899656",
        "name": "tune",
        "font_class": "tune",
        "unicode": "e6aa",
        "unicode_decimal": 59050
      },
      {
        "icon_id": "24899657",
        "name": "shimingrenzheng",
        "font_class": "auth",
        "unicode": "e6ab",
        "unicode_decimal": 59051
      },
      {
        "icon_id": "24899565",
        "name": "person",
        "font_class": "person",
        "unicode": "e699",
        "unicode_decimal": 59033
      },
      {
        "icon_id": "24899566",
        "name": "email-filled",
        "font_class": "email-filled",
        "unicode": "e69a",
        "unicode_decimal": 59034
      },
      {
        "icon_id": "24899567",
        "name": "phone-filled",
        "font_class": "phone-filled",
        "unicode": "e69b",
        "unicode_decimal": 59035
      },
      {
        "icon_id": "24899568",
        "name": "phone",
        "font_class": "phone",
        "unicode": "e69c",
        "unicode_decimal": 59036
      },
      {
        "icon_id": "24899570",
        "name": "email",
        "font_class": "email",
        "unicode": "e69e",
        "unicode_decimal": 59038
      },
      {
        "icon_id": "24899571",
        "name": "personadd",
        "font_class": "personadd",
        "unicode": "e69f",
        "unicode_decimal": 59039
      },
      {
        "icon_id": "24899558",
        "name": "chatboxes-filled",
        "font_class": "chatboxes-filled",
        "unicode": "e692",
        "unicode_decimal": 59026
      },
      {
        "icon_id": "24899559",
        "name": "contact",
        "font_class": "contact",
        "unicode": "e693",
        "unicode_decimal": 59027
      },
      {
        "icon_id": "24899560",
        "name": "chatbubble-filled",
        "font_class": "chatbubble-filled",
        "unicode": "e694",
        "unicode_decimal": 59028
      },
      {
        "icon_id": "24899561",
        "name": "contact-filled",
        "font_class": "contact-filled",
        "unicode": "e695",
        "unicode_decimal": 59029
      },
      {
        "icon_id": "24899562",
        "name": "chatboxes",
        "font_class": "chatboxes",
        "unicode": "e696",
        "unicode_decimal": 59030
      },
      {
        "icon_id": "24899563",
        "name": "chatbubble",
        "font_class": "chatbubble",
        "unicode": "e697",
        "unicode_decimal": 59031
      },
      {
        "icon_id": "24881290",
        "name": "upload-filled",
        "font_class": "upload-filled",
        "unicode": "e68e",
        "unicode_decimal": 59022
      },
      {
        "icon_id": "24881292",
        "name": "upload",
        "font_class": "upload",
        "unicode": "e690",
        "unicode_decimal": 59024
      },
      {
        "icon_id": "24881293",
        "name": "weixin",
        "font_class": "weixin",
        "unicode": "e691",
        "unicode_decimal": 59025
      },
      {
        "icon_id": "24881274",
        "name": "compose",
        "font_class": "compose",
        "unicode": "e67f",
        "unicode_decimal": 59007
      },
      {
        "icon_id": "24881275",
        "name": "qq",
        "font_class": "qq",
        "unicode": "e680",
        "unicode_decimal": 59008
      },
      {
        "icon_id": "24881276",
        "name": "download-filled",
        "font_class": "download-filled",
        "unicode": "e681",
        "unicode_decimal": 59009
      },
      {
        "icon_id": "24881277",
        "name": "pengyouquan",
        "font_class": "pyq",
        "unicode": "e682",
        "unicode_decimal": 59010
      },
      {
        "icon_id": "24881279",
        "name": "sound",
        "font_class": "sound",
        "unicode": "e684",
        "unicode_decimal": 59012
      },
      {
        "icon_id": "24881280",
        "name": "trash-filled",
        "font_class": "trash-filled",
        "unicode": "e685",
        "unicode_decimal": 59013
      },
      {
        "icon_id": "24881281",
        "name": "sound-filled",
        "font_class": "sound-filled",
        "unicode": "e686",
        "unicode_decimal": 59014
      },
      {
        "icon_id": "24881282",
        "name": "trash",
        "font_class": "trash",
        "unicode": "e687",
        "unicode_decimal": 59015
      },
      {
        "icon_id": "24881284",
        "name": "videocam-filled",
        "font_class": "videocam-filled",
        "unicode": "e689",
        "unicode_decimal": 59017
      },
      {
        "icon_id": "24881285",
        "name": "spinner-cycle",
        "font_class": "spinner-cycle",
        "unicode": "e68a",
        "unicode_decimal": 59018
      },
      {
        "icon_id": "24881286",
        "name": "weibo",
        "font_class": "weibo",
        "unicode": "e68b",
        "unicode_decimal": 59019
      },
      {
        "icon_id": "24881288",
        "name": "videocam",
        "font_class": "videocam",
        "unicode": "e68c",
        "unicode_decimal": 59020
      },
      {
        "icon_id": "24881289",
        "name": "download",
        "font_class": "download",
        "unicode": "e68d",
        "unicode_decimal": 59021
      },
      {
        "icon_id": "24879601",
        "name": "help",
        "font_class": "help",
        "unicode": "e679",
        "unicode_decimal": 59001
      },
      {
        "icon_id": "24879602",
        "name": "navigate-filled",
        "font_class": "navigate-filled",
        "unicode": "e67a",
        "unicode_decimal": 59002
      },
      {
        "icon_id": "24879603",
        "name": "plusempty",
        "font_class": "plusempty",
        "unicode": "e67b",
        "unicode_decimal": 59003
      },
      {
        "icon_id": "24879604",
        "name": "smallcircle",
        "font_class": "smallcircle",
        "unicode": "e67c",
        "unicode_decimal": 59004
      },
      {
        "icon_id": "24879605",
        "name": "minus-filled",
        "font_class": "minus-filled",
        "unicode": "e67d",
        "unicode_decimal": 59005
      },
      {
        "icon_id": "24879606",
        "name": "micoff",
        "font_class": "micoff",
        "unicode": "e67e",
        "unicode_decimal": 59006
      },
      {
        "icon_id": "24879588",
        "name": "closeempty",
        "font_class": "closeempty",
        "unicode": "e66c",
        "unicode_decimal": 58988
      },
      {
        "icon_id": "24879589",
        "name": "clear",
        "font_class": "clear",
        "unicode": "e66d",
        "unicode_decimal": 58989
      },
      {
        "icon_id": "24879590",
        "name": "navigate",
        "font_class": "navigate",
        "unicode": "e66e",
        "unicode_decimal": 58990
      },
      {
        "icon_id": "24879591",
        "name": "minus",
        "font_class": "minus",
        "unicode": "e66f",
        "unicode_decimal": 58991
      },
      {
        "icon_id": "24879592",
        "name": "image",
        "font_class": "image",
        "unicode": "e670",
        "unicode_decimal": 58992
      },
      {
        "icon_id": "24879593",
        "name": "mic",
        "font_class": "mic",
        "unicode": "e671",
        "unicode_decimal": 58993
      },
      {
        "icon_id": "24879594",
        "name": "paperplane",
        "font_class": "paperplane",
        "unicode": "e672",
        "unicode_decimal": 58994
      },
      {
        "icon_id": "24879595",
        "name": "close",
        "font_class": "close",
        "unicode": "e673",
        "unicode_decimal": 58995
      },
      {
        "icon_id": "24879596",
        "name": "help-filled",
        "font_class": "help-filled",
        "unicode": "e674",
        "unicode_decimal": 58996
      },
      {
        "icon_id": "24879597",
        "name": "plus-filled",
        "font_class": "paperplane-filled",
        "unicode": "e675",
        "unicode_decimal": 58997
      },
      {
        "icon_id": "24879598",
        "name": "plus",
        "font_class": "plus",
        "unicode": "e676",
        "unicode_decimal": 58998
      },
      {
        "icon_id": "24879599",
        "name": "mic-filled",
        "font_class": "mic-filled",
        "unicode": "e677",
        "unicode_decimal": 58999
      },
      {
        "icon_id": "24879600",
        "name": "image-filled",
        "font_class": "image-filled",
        "unicode": "e678",
        "unicode_decimal": 59e3
      },
      {
        "icon_id": "24855900",
        "name": "locked-filled",
        "font_class": "locked-filled",
        "unicode": "e668",
        "unicode_decimal": 58984
      },
      {
        "icon_id": "24855901",
        "name": "info",
        "font_class": "info",
        "unicode": "e669",
        "unicode_decimal": 58985
      },
      {
        "icon_id": "24855903",
        "name": "locked",
        "font_class": "locked",
        "unicode": "e66b",
        "unicode_decimal": 58987
      },
      {
        "icon_id": "24855884",
        "name": "camera-filled",
        "font_class": "camera-filled",
        "unicode": "e658",
        "unicode_decimal": 58968
      },
      {
        "icon_id": "24855885",
        "name": "chat-filled",
        "font_class": "chat-filled",
        "unicode": "e659",
        "unicode_decimal": 58969
      },
      {
        "icon_id": "24855886",
        "name": "camera",
        "font_class": "camera",
        "unicode": "e65a",
        "unicode_decimal": 58970
      },
      {
        "icon_id": "24855887",
        "name": "circle",
        "font_class": "circle",
        "unicode": "e65b",
        "unicode_decimal": 58971
      },
      {
        "icon_id": "24855888",
        "name": "checkmarkempty",
        "font_class": "checkmarkempty",
        "unicode": "e65c",
        "unicode_decimal": 58972
      },
      {
        "icon_id": "24855889",
        "name": "chat",
        "font_class": "chat",
        "unicode": "e65d",
        "unicode_decimal": 58973
      },
      {
        "icon_id": "24855890",
        "name": "circle-filled",
        "font_class": "circle-filled",
        "unicode": "e65e",
        "unicode_decimal": 58974
      },
      {
        "icon_id": "24855891",
        "name": "flag",
        "font_class": "flag",
        "unicode": "e65f",
        "unicode_decimal": 58975
      },
      {
        "icon_id": "24855892",
        "name": "flag-filled",
        "font_class": "flag-filled",
        "unicode": "e660",
        "unicode_decimal": 58976
      },
      {
        "icon_id": "24855893",
        "name": "gear-filled",
        "font_class": "gear-filled",
        "unicode": "e661",
        "unicode_decimal": 58977
      },
      {
        "icon_id": "24855894",
        "name": "home",
        "font_class": "home",
        "unicode": "e662",
        "unicode_decimal": 58978
      },
      {
        "icon_id": "24855895",
        "name": "home-filled",
        "font_class": "home-filled",
        "unicode": "e663",
        "unicode_decimal": 58979
      },
      {
        "icon_id": "24855896",
        "name": "gear",
        "font_class": "gear",
        "unicode": "e664",
        "unicode_decimal": 58980
      },
      {
        "icon_id": "24855897",
        "name": "smallcircle-filled",
        "font_class": "smallcircle-filled",
        "unicode": "e665",
        "unicode_decimal": 58981
      },
      {
        "icon_id": "24855898",
        "name": "map-filled",
        "font_class": "map-filled",
        "unicode": "e666",
        "unicode_decimal": 58982
      },
      {
        "icon_id": "24855899",
        "name": "map",
        "font_class": "map",
        "unicode": "e667",
        "unicode_decimal": 58983
      },
      {
        "icon_id": "24855825",
        "name": "refresh-filled",
        "font_class": "refresh-filled",
        "unicode": "e656",
        "unicode_decimal": 58966
      },
      {
        "icon_id": "24855826",
        "name": "refresh",
        "font_class": "refresh",
        "unicode": "e657",
        "unicode_decimal": 58967
      },
      {
        "icon_id": "24855808",
        "name": "cloud-upload",
        "font_class": "cloud-upload",
        "unicode": "e645",
        "unicode_decimal": 58949
      },
      {
        "icon_id": "24855809",
        "name": "cloud-download-filled",
        "font_class": "cloud-download-filled",
        "unicode": "e646",
        "unicode_decimal": 58950
      },
      {
        "icon_id": "24855810",
        "name": "cloud-download",
        "font_class": "cloud-download",
        "unicode": "e647",
        "unicode_decimal": 58951
      },
      {
        "icon_id": "24855811",
        "name": "cloud-upload-filled",
        "font_class": "cloud-upload-filled",
        "unicode": "e648",
        "unicode_decimal": 58952
      },
      {
        "icon_id": "24855813",
        "name": "redo",
        "font_class": "redo",
        "unicode": "e64a",
        "unicode_decimal": 58954
      },
      {
        "icon_id": "24855814",
        "name": "images-filled",
        "font_class": "images-filled",
        "unicode": "e64b",
        "unicode_decimal": 58955
      },
      {
        "icon_id": "24855815",
        "name": "undo-filled",
        "font_class": "undo-filled",
        "unicode": "e64c",
        "unicode_decimal": 58956
      },
      {
        "icon_id": "24855816",
        "name": "more",
        "font_class": "more",
        "unicode": "e64d",
        "unicode_decimal": 58957
      },
      {
        "icon_id": "24855817",
        "name": "more-filled",
        "font_class": "more-filled",
        "unicode": "e64e",
        "unicode_decimal": 58958
      },
      {
        "icon_id": "24855818",
        "name": "undo",
        "font_class": "undo",
        "unicode": "e64f",
        "unicode_decimal": 58959
      },
      {
        "icon_id": "24855819",
        "name": "images",
        "font_class": "images",
        "unicode": "e650",
        "unicode_decimal": 58960
      },
      {
        "icon_id": "24855821",
        "name": "paperclip",
        "font_class": "paperclip",
        "unicode": "e652",
        "unicode_decimal": 58962
      },
      {
        "icon_id": "24855822",
        "name": "settings",
        "font_class": "settings",
        "unicode": "e653",
        "unicode_decimal": 58963
      },
      {
        "icon_id": "24855823",
        "name": "search",
        "font_class": "search",
        "unicode": "e654",
        "unicode_decimal": 58964
      },
      {
        "icon_id": "24855824",
        "name": "redo-filled",
        "font_class": "redo-filled",
        "unicode": "e655",
        "unicode_decimal": 58965
      },
      {
        "icon_id": "24841702",
        "name": "list",
        "font_class": "list",
        "unicode": "e644",
        "unicode_decimal": 58948
      },
      {
        "icon_id": "24841489",
        "name": "mail-open-filled",
        "font_class": "mail-open-filled",
        "unicode": "e63a",
        "unicode_decimal": 58938
      },
      {
        "icon_id": "24841491",
        "name": "hand-thumbsdown-filled",
        "font_class": "hand-down-filled",
        "unicode": "e63c",
        "unicode_decimal": 58940
      },
      {
        "icon_id": "24841492",
        "name": "hand-thumbsdown",
        "font_class": "hand-down",
        "unicode": "e63d",
        "unicode_decimal": 58941
      },
      {
        "icon_id": "24841493",
        "name": "hand-thumbsup-filled",
        "font_class": "hand-up-filled",
        "unicode": "e63e",
        "unicode_decimal": 58942
      },
      {
        "icon_id": "24841494",
        "name": "hand-thumbsup",
        "font_class": "hand-up",
        "unicode": "e63f",
        "unicode_decimal": 58943
      },
      {
        "icon_id": "24841496",
        "name": "heart-filled",
        "font_class": "heart-filled",
        "unicode": "e641",
        "unicode_decimal": 58945
      },
      {
        "icon_id": "24841498",
        "name": "mail-open",
        "font_class": "mail-open",
        "unicode": "e643",
        "unicode_decimal": 58947
      },
      {
        "icon_id": "24841488",
        "name": "heart",
        "font_class": "heart",
        "unicode": "e639",
        "unicode_decimal": 58937
      },
      {
        "icon_id": "24839963",
        "name": "loop",
        "font_class": "loop",
        "unicode": "e633",
        "unicode_decimal": 58931
      },
      {
        "icon_id": "24839866",
        "name": "pulldown",
        "font_class": "pulldown",
        "unicode": "e632",
        "unicode_decimal": 58930
      },
      {
        "icon_id": "24813798",
        "name": "scan",
        "font_class": "scan",
        "unicode": "e62a",
        "unicode_decimal": 58922
      },
      {
        "icon_id": "24813786",
        "name": "bars",
        "font_class": "bars",
        "unicode": "e627",
        "unicode_decimal": 58919
      },
      {
        "icon_id": "24813788",
        "name": "cart-filled",
        "font_class": "cart-filled",
        "unicode": "e629",
        "unicode_decimal": 58921
      },
      {
        "icon_id": "24813790",
        "name": "checkbox",
        "font_class": "checkbox",
        "unicode": "e62b",
        "unicode_decimal": 58923
      },
      {
        "icon_id": "24813791",
        "name": "checkbox-filled",
        "font_class": "checkbox-filled",
        "unicode": "e62c",
        "unicode_decimal": 58924
      },
      {
        "icon_id": "24813794",
        "name": "shop",
        "font_class": "shop",
        "unicode": "e62f",
        "unicode_decimal": 58927
      },
      {
        "icon_id": "24813795",
        "name": "headphones",
        "font_class": "headphones",
        "unicode": "e630",
        "unicode_decimal": 58928
      },
      {
        "icon_id": "24813796",
        "name": "cart",
        "font_class": "cart",
        "unicode": "e631",
        "unicode_decimal": 58929
      }
    ]
  };
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$9 = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: icons.glyphs
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v2) => v2.font_class === this.type);
        if (code) {
          return unescape(`%u${code.unicode}`);
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("text", {
      style: vue.normalizeStyle({ color: $props.color, "font-size": $options.iconSize }),
      class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
      onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
    }, null, 6);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$4], ["__scopeId", "data-v-d31e1c47"], ["__file", "/Users/fox/project/uniapp/ftu/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const _sfc_main$8 = {
    __name: "find",
    setup(__props) {
      const gotoPage = (index) => {
        if (index == 0)
          ;
        else if (index == 1 || index == 2) {
          uni.navigateTo({
            url: `/pages/find/addFriends/addFriends?relationshipList=${JSON.stringify(relationshipList.value)}`
          });
        } else
          ;
      };
      let relationshipList = vue.ref([]);
      vue.onMounted(() => {
      });
      onShow(() => {
        ajax.relationship({
          MId: store.state.UserInfo.Id,
          Type: "3"
        }).then((res) => {
          relationshipList.value = res.data.data;
        });
      });
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "find-container" }, [
          vue.createElementVNode("view", { class: "searchFriends" }, [
            vue.createElementVNode("view", { class: "" }, [
              vue.createElementVNode("view", { class: "addFriend-view" }, [
                vue.createElementVNode("image", {
                  src: "/static/image/find_1.png",
                  mode: ""
                })
              ]),
              vue.createTextVNode(" \u670B\u53CB\u5708 ")
            ]),
            vue.createVNode(_component_uni_icons, {
              type: "forward",
              size: "16"
            })
          ]),
          vue.createElementVNode("view", {
            class: "searchFriends",
            onClick: _cache[0] || (_cache[0] = ($event) => gotoPage(1))
          }, [
            vue.createElementVNode("view", { class: "" }, [
              vue.createElementVNode("view", { class: "addFriend-view" }, [
                vue.createElementVNode("image", {
                  src: "/static/image/addFriend.png",
                  mode: ""
                })
              ]),
              vue.createTextVNode(" \u6DFB\u52A0\u597D\u53CB ")
            ]),
            vue.createVNode(_component_uni_icons, {
              type: "forward",
              size: "16"
            })
          ]),
          vue.createElementVNode("view", {
            class: "searchFriends",
            onClick: _cache[1] || (_cache[1] = ($event) => gotoPage(2))
          }, [
            vue.createElementVNode("view", { class: "" }, [
              vue.createElementVNode("view", { class: "addFriend-view" }, [
                vue.createElementVNode("image", {
                  src: "/static/image/loding.png",
                  mode: ""
                })
              ]),
              vue.createTextVNode(" \u597D\u53CB\u7533\u8BF7 ")
            ]),
            vue.createVNode(_component_uni_icons, {
              type: "forward",
              size: "16"
            })
          ])
        ]);
      };
    }
  };
  const PagesFindFind = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-1c765c2e"], ["__file", "/Users/fox/project/uniapp/ftu/pages/find/find.vue"]]);
  const _sfc_main$7 = {
    __name: "chatPage",
    setup(__props) {
      vue.getCurrentInstance();
      let input = vue.ref("");
      let TargetId = vue.ref();
      let userInfo = JSON.parse(uni.getStorageSync("UserInfo"));
      vue.ref({
        sendTime: "",
        sendType: "",
        formId: "",
        toId: "",
        content: ""
      });
      vue.nextTick(() => {
        setTimeout(() => {
          uni.createSelectorQuery().select(".ChatView").boundingClientRect((res) => {
            formatAppLog("log", "at pages/friends/chatPage/chatPage.vue:64", res);
            uni.pageScrollTo({
              scrollTop: res.height,
              duration: 200
            });
          });
        }, 50);
      });
      const submit = () => {
        if (!input.value)
          return;
        let form = {
          Content: input.value,
          Type: 1,
          TargetId: TargetId.value,
          FormId: userInfo.Id,
          SendTime: new Date().getTime()
        };
        store.commit("AddChatsList", form);
        uni.sendSocketMessage({
          data: JSON.stringify(form),
          success() {
            input.value = "";
          }
        });
      };
      let opts = vue.ref({});
      onLoad((option) => {
        let opt = JSON.parse(option.opt);
        TargetId.value = opt.Id;
        opts.value = option.opt;
        uni.setNavigationBarTitle({
          title: opt.Name
        });
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "chats-container" }, [
          vue.createElementVNode("scroll-view", {
            "scroll-y": "true",
            class: "scroll-Y",
            onScroll: _cache[1] || (_cache[1] = (...args) => _ctx.scroll && _ctx.scroll(...args))
          }, [
            vue.createElementVNode("view", { class: "ChatView" }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(store).state.ChatsList, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", { class: "ChatContent" }, [
                  vue.unref(userInfo).Id != item.FormId ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "left"
                  }, [
                    vue.createElementVNode("view", { class: "imageView" }, [
                      vue.createElementVNode("image", {
                        src: "/static/image/userAvt.png",
                        mode: ""
                      })
                    ]),
                    vue.createElementVNode("view", { class: "content" }, [
                      vue.createElementVNode("text", null, vue.toDisplayString(item.Content), 1)
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.unref(userInfo).Id == item.FormId ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "right"
                  }, [
                    vue.createElementVNode("view", { class: "content" }, [
                      vue.createElementVNode("text", { class: "" }, vue.toDisplayString(item.Content), 1)
                    ]),
                    vue.createElementVNode("view", { class: "imageView" }, [
                      vue.createElementVNode("image", {
                        src: "/static/image/userAvt.png",
                        mode: ""
                      })
                    ])
                  ])) : vue.createCommentVNode("v-if", true)
                ]);
              }), 256))
            ]),
            vue.createElementVNode("view", { class: "text-area-view" }, [
              vue.withDirectives(vue.createElementVNode("textarea", {
                "auto-height": "",
                class: "text-area",
                type: "text",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(input) ? input.value = $event : input = $event)
              }, null, 512), [
                [vue.vModelText, vue.unref(input)]
              ]),
              vue.createElementVNode("button", {
                class: "submit",
                onClick: submit
              }, "submit")
            ])
          ], 32)
        ]);
      };
    }
  };
  const PagesFriendsChatPageChatPage = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-0823cd2d"], ["__file", "/Users/fox/project/uniapp/ftu/pages/friends/chatPage/chatPage.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation(options);
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn2) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn2);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn2 === "function" && fn2();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn2) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn2 === "function" && fn2();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$6 = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i2 in styles) {
          let line = this.toLine(i2);
          transform += line + ":" + styles[i2] + ";";
        }
        return transform;
      },
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i2 in obj) {
          try {
            if (typeof obj[i2] === "object") {
              this.animation[i2](...obj[i2]);
            } else {
              this.animation[i2](obj[i2]);
            }
          } catch (e2) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:139", `\u65B9\u6CD5 ${i2} \u4E0D\u5B58\u5728`);
          }
        }
        this.animation.step(config);
        return this;
      },
      run(fn2) {
        if (!this.animation)
          return;
        this.animation.run(fn2);
      },
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 1 : 0,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.isShow ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$3], ["__file", "/Users/fox/project/uniapp/ftu/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$5 = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      animation: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: "center"
      },
      isMaskClick: {
        type: Boolean,
        default: null
      },
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      }
    },
    watch: {
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: this.isDesktop ? "fixforpc-top" : "top"
      };
    },
    computed: {
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    unmounted() {
      this.setH5Visible();
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible() {
      },
      closeMask() {
        this.maskShow = false;
      },
      disableMask() {
        this.mkclick = false;
      },
      clear(e2) {
        e2.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          clearTimeout(this.timer);
          this.showPopup = false;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:280", "\u7F3A\u5C11\u7C7B\u578B\uFF1A", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
    }, [
      vue.createElementVNode("view", {
        onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
      }, [
        $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
          key: "1",
          name: "mask",
          "mode-class": "fade",
          styles: $data.maskClass,
          duration: $data.duration,
          show: $data.showTrans,
          onClick: $options.onTap
        }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
        vue.createVNode(_component_uni_transition, {
          key: "2",
          "mode-class": $data.ani,
          name: "content",
          styles: $data.transClass,
          duration: $data.duration,
          show: $data.showTrans,
          onClick: $options.onTap
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
              style: vue.normalizeStyle({ backgroundColor: $options.bg }),
              onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
            }, [
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ], 6)
          ]),
          _: 3
        }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
      ], 32)
    ], 2)) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$2], ["__scopeId", "data-v-4dd3c44b"], ["__file", "/Users/fox/project/uniapp/ftu/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  const popup = {
    data() {
      return {};
    },
    created() {
      this.popup = this.getParent();
    },
    methods: {
      getParent(name = "uniPopup") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  const en = {
    "uni-popup.cancel": "cancel",
    "uni-popup.ok": "ok",
    "uni-popup.placeholder": "pleace enter",
    "uni-popup.title": "Hint",
    "uni-popup.shareTitle": "Share to"
  };
  const zhHans = {
    "uni-popup.cancel": "\u53D6\u6D88",
    "uni-popup.ok": "\u786E\u5B9A",
    "uni-popup.placeholder": "\u8BF7\u8F93\u5165",
    "uni-popup.title": "\u63D0\u793A",
    "uni-popup.shareTitle": "\u5206\u4EAB\u5230"
  };
  const zhHant = {
    "uni-popup.cancel": "\u53D6\u6D88",
    "uni-popup.ok": "\u78BA\u5B9A",
    "uni-popup.placeholder": "\u8ACB\u8F38\u5165",
    "uni-popup.title": "\u63D0\u793A",
    "uni-popup.shareTitle": "\u5206\u4EAB\u5230"
  };
  const messages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  const { t } = initVueI18n(messages);
  const _sfc_main$4 = {
    name: "uniPopupDialog",
    mixins: [popup],
    emits: ["confirm", "close"],
    props: {
      inputType: {
        type: String,
        default: "text"
      },
      value: {
        type: [String, Number],
        default: ""
      },
      placeholder: {
        type: [String, Number],
        default: ""
      },
      type: {
        type: String,
        default: "error"
      },
      mode: {
        type: String,
        default: "base"
      },
      title: {
        type: String,
        default: ""
      },
      content: {
        type: String,
        default: ""
      },
      beforeClose: {
        type: Boolean,
        default: false
      },
      cancelText: {
        type: String,
        default: ""
      },
      confirmText: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        dialogType: "error",
        focus: false,
        val: ""
      };
    },
    computed: {
      okText() {
        return this.confirmText || t("uni-popup.ok");
      },
      closeText() {
        return this.cancelText || t("uni-popup.cancel");
      },
      placeholderText() {
        return this.placeholder || t("uni-popup.placeholder");
      },
      titleText() {
        return this.title || t("uni-popup.title");
      }
    },
    watch: {
      type(val) {
        this.dialogType = val;
      },
      mode(val) {
        if (val === "input") {
          this.dialogType = "info";
        }
      },
      value(val) {
        this.val = val;
      }
    },
    created() {
      this.popup.disableMask();
      if (this.mode === "input") {
        this.dialogType = "info";
        this.val = this.value;
      } else {
        this.dialogType = this.type;
      }
    },
    mounted() {
      this.focus = true;
    },
    methods: {
      onOk() {
        if (this.mode === "input") {
          this.$emit("confirm", this.val);
        } else {
          this.$emit("confirm");
        }
        if (this.beforeClose)
          return;
        this.popup.close();
      },
      closeDialog() {
        this.$emit("close");
        if (this.beforeClose)
          return;
        this.popup.close();
      },
      close() {
        this.popup.close();
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-popup-dialog" }, [
      vue.createElementVNode("view", { class: "uni-dialog-title" }, [
        vue.createElementVNode("text", {
          class: vue.normalizeClass(["uni-dialog-title-text", ["uni-popup__" + $data.dialogType]])
        }, vue.toDisplayString($options.titleText), 3)
      ]),
      $props.mode === "base" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-dialog-content"
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode("text", { class: "uni-dialog-content-text" }, vue.toDisplayString($props.content), 1)
        ], true)
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "uni-dialog-content"
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.withDirectives(vue.createElementVNode("input", {
            class: "uni-dialog-input",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.val = $event),
            type: $props.inputType,
            placeholder: $options.placeholderText,
            focus: $data.focus
          }, null, 8, ["type", "placeholder", "focus"]), [
            [vue.vModelDynamic, $data.val]
          ])
        ], true)
      ])),
      vue.createElementVNode("view", { class: "uni-dialog-button-group" }, [
        vue.createElementVNode("view", {
          class: "uni-dialog-button",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.closeDialog && $options.closeDialog(...args))
        }, [
          vue.createElementVNode("text", { class: "uni-dialog-button-text" }, vue.toDisplayString($options.closeText), 1)
        ]),
        vue.createElementVNode("view", {
          class: "uni-dialog-button uni-border-left",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.onOk && $options.onOk(...args))
        }, [
          vue.createElementVNode("text", { class: "uni-dialog-button-text uni-button-color" }, vue.toDisplayString($options.okText), 1)
        ])
      ])
    ]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$1], ["__scopeId", "data-v-d78c88b7"], ["__file", "/Users/fox/project/uniapp/ftu/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue"]]);
  const _sfc_main$3 = {
    __name: "addFriends",
    setup(__props) {
      let proxy = vue.getCurrentInstance();
      let searchResult = vue.ref({
        AccName: ""
      });
      let userPhone = vue.ref("");
      let userInfo = vue.ref({});
      const searchFriends2 = () => {
        let form2 = {
          Phone: userPhone.value
        };
        ajax.selectUserByPhone(form2).then((res) => {
          if (res.data.data != "") {
            searchResult.value = res.data.data;
            userPhone.value = "";
          } else {
            searchResult.value.AccName = res.data.msg;
            userPhone.value = "";
          }
        });
      };
      const step2 = () => {
        if (!searchResult.value.Id)
          return;
        proxy.refs.alertDialog.open();
      };
      const dialogConfirm = () => {
        if (userInfo.value.Id == searchResult.value.Id) {
          uni.showToast({
            title: "\u4E0D\u8981\u8BD5\u56FE\u6DFB\u52A0\u81EA\u5DF1\u4E3A\u597D\u53CB",
            icon: "none"
          });
          return;
        }
        let form = {
          MId: userInfo.value.Id,
          FId: searchResult.value.Id
        };
        ajax.addFriend(form).then((res) => {
          uni.showToast({
            title: res.data.msg,
            icon: "none"
          });
        });
      };
      const agreen = (id) => {
        let form = {
          MId: userInfo.value.Id,
          FId: id
        };
        ajax.agreeAdd(form).then((res) => {
          let list = meauItems.value.filter((item) => {
            return item.Id != id;
          });
          meauItems.value = list;
        });
      };
      const openPopup = () => {
        proxy.refs.popup.open();
      };
      let heightHeaderTop = vue.ref("");
      vue.onMounted(() => {
        uni.getSystemInfo({
          success: (res) => {
            heightHeaderTop.value = res.statusBarHeight + 45;
          }
        });
        userInfo.value = store.state.UserInfo;
      });
      onLoad((option) => {
        let Id = "";
        let list = JSON.parse(option.relationshipList);
        if (!list.length)
          return;
        list.forEach((item, index) => {
          if (index < list.length - 1) {
            Id += item.TargetId + ",";
          } else {
            Id += item.TargetId;
          }
        });
        ajax.searchAllFriendsById(Id).then((res) => {
          formatAppLog("log", "at pages/find/addFriends/addFriends.vue:165", res);
          meauItems.value = res.data.data;
        });
      });
      let meauItems = vue.ref([]);
      vue.ref([
        {
          name: "test1",
          title: "test1",
          introduction: "test1",
          src: "../../../static/image/loding.png",
          bottonLinear: true,
          color: "red"
        },
        {
          name: "test1",
          title: "test1",
          introduction: "test1",
          src: "../../../static/image/loding.png",
          bottonLinear: true,
          color: "green"
        },
        {
          name: "test1",
          title: "test1",
          introduction: "test1",
          src: "../../../static/image/loding.png",
          bottonLinear: true,
          color: "pink"
        },
        {
          name: "test1",
          title: "test1",
          introduction: "test1",
          src: "../../../static/image/loding.png",
          bottonLinear: true,
          color: "yellow"
        },
        {
          name: "test1",
          title: "test1",
          introduction: "test1",
          src: "../../../static/image/loding.png",
          bottonLinear: false,
          color: "skyblue"
        }
      ]);
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$1);
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_1);
        const _component_uni_popup_dialog = resolveEasycom(vue.resolveDynamicComponent("uni-popup-dialog"), __easycom_2);
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", { class: "addFriend-container" }, [
            vue.createElementVNode("view", { class: "main1" }, [
              vue.createElementVNode("view", {
                class: "selectView",
                onClick: openPopup
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "search",
                  color: "#c7c7c7",
                  style: { "margin-right": "5px" },
                  size: "18"
                }),
                vue.createTextVNode("\u624B\u673A\u53F7 ")
              ]),
              vue.createElementVNode("view", { class: "myPhone" }, [
                vue.createElementVNode("image", {
                  src: "",
                  mode: ""
                }),
                vue.createTextVNode(" \u6211\u7684\u624B\u673A\u53F7:" + vue.toDisplayString(vue.unref(userInfo).Phone), 1)
              ])
            ]),
            vue.unref(meauItems).length ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "main2"
            }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(meauItems), (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: vue.normalizeClass(["main2-item", item.bottonLinear ? "borderBottom" : ""])
                }, [
                  vue.createElementVNode("view", { class: "item-left" }, [
                    vue.createElementVNode("view", { class: "item-image" }, [
                      vue.createElementVNode("image", {
                        src: "/static/image/loding.png",
                        mode: ""
                      })
                    ]),
                    vue.createElementVNode("view", { class: "" }, [
                      vue.createElementVNode("view", { class: "" }, vue.toDisplayString(item.AccName), 1),
                      vue.createElementVNode("view", { class: "introduction" }, vue.toDisplayString(item.Name), 1)
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "btns" }, [
                    vue.createElementVNode("view", { class: "noSubmit" }, " \u62D2\u7EDD "),
                    vue.createElementVNode("view", {
                      class: "okSubmit",
                      onClick: ($event) => agreen(item.Id)
                    }, " \u540C\u610F ", 8, ["onClick"])
                  ])
                ], 2);
              }), 256))
            ])) : vue.createCommentVNode("v-if", true)
          ]),
          vue.createVNode(_component_uni_popup, {
            ref: "popup",
            type: "center"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "popupViews" }, [
                vue.createElementVNode("view", { class: "inputView" }, [
                  vue.createElementVNode("view", { class: "input-item" }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "search",
                      size: "18"
                    }),
                    vue.withDirectives(vue.createElementVNode("input", {
                      onInput: _cache[0] || (_cache[0] = (...args) => _ctx.input && _ctx.input(...args)),
                      placeholder: "\u641C\u7D22\u7528\u6237",
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.isRef(userPhone) ? userPhone.value = $event : userPhone = $event),
                      style: { "width": "100%" },
                      type: "text"
                    }, null, 544), [
                      [vue.vModelText, vue.unref(userPhone)]
                    ])
                  ]),
                  vue.createElementVNode("view", {
                    class: "searchBtn",
                    onClick: _cache[2] || (_cache[2] = ($event) => vue.unref(proxy).refs.popup.close())
                  }, " \u53D6\u6D88 ")
                ]),
                vue.unref(userPhone) ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "searchResult",
                  onClick: searchFriends2
                }, [
                  vue.createElementVNode("image", {
                    class: "searchResultImage",
                    src: "/static/image/addFriend.png",
                    mode: ""
                  }),
                  vue.createTextVNode(" \u641C\u7D22\uFF1A"),
                  vue.createElementVNode("text", { style: { "color": "green" } }, vue.toDisplayString(vue.unref(userPhone)), 1)
                ])) : vue.createCommentVNode("v-if", true),
                vue.unref(searchResult).AccName ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "searchResult2",
                  onClick: step2
                }, [
                  vue.createElementVNode("image", {
                    class: "searchResultImage",
                    src: "/static/image/userAvt.png",
                    mode: ""
                  }),
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(searchResult).AccName), 1)
                ])) : vue.createCommentVNode("v-if", true)
              ])
            ]),
            _: 1
          }, 512),
          vue.createVNode(_component_uni_popup, {
            ref: "alertDialog",
            type: "dialog"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_popup_dialog, {
                type: "success",
                mode: "base",
                cancelText: "\u5173\u95ED",
                confirmText: "\u540C\u610F",
                content: "\u786E\u5B9A\u8981\u6DFB\u52A0\u8BE5\u597D\u53CB\u5417",
                onConfirm: dialogConfirm
              })
            ]),
            _: 1
          }, 512)
        ], 64);
      };
    }
  };
  const PagesFindAddFriendsAddFriends = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-628f9f38"], ["__file", "/Users/fox/project/uniapp/ftu/pages/find/addFriends/addFriends.vue"]]);
  const _sfc_main$2 = {
    __name: "settingUserInfo",
    setup(__props) {
      let userInfo = JSON.parse(uni.getStorageSync("UserInfo"));
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "UserInfo-container" }, [
          vue.createElementVNode("view", { class: "list1" }, [
            vue.createTextVNode(" \u5934\u50CF "),
            vue.createElementVNode("view", { class: "profile" }, [
              vue.createElementVNode("image", {
                src: "/static/image/userAvt.png",
                mode: ""
              })
            ])
          ]),
          vue.createElementVNode("view", { class: "list1" }, [
            vue.createTextVNode(" \u7528\u6237\u540D "),
            vue.createElementVNode("view", { class: "text" }, vue.toDisplayString(vue.unref(userInfo).AccName), 1)
          ]),
          vue.createElementVNode("view", { class: "list1" }, [
            vue.createTextVNode(" \u624B\u673A\u53F7\u7801 "),
            vue.createElementVNode("view", { class: "text" }, vue.toDisplayString(vue.unref(userInfo).Phone), 1)
          ]),
          vue.createElementVNode("view", { class: "list1" }, [
            vue.createTextVNode(" \u6027\u522B "),
            vue.createElementVNode("view", { class: "text" }, vue.toDisplayString(vue.unref(userInfo).Sex ? "\u7537" : "\u5973"), 1)
          ]),
          vue.createElementVNode("view", { class: "list1" }, [
            vue.createTextVNode(" \u90AE\u7BB1 "),
            vue.createElementVNode("view", { class: "text" }, vue.toDisplayString(vue.unref(userInfo).Email), 1)
          ])
        ]);
      };
    }
  };
  const PagesMySettingUserInfoSettingUserInfo = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-21a09cb4"], ["__file", "/Users/fox/project/uniapp/ftu/pages/my/settingUserInfo/settingUserInfo.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesFindFriendsSpacesFriendsSpaces = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "/Users/fox/project/uniapp/ftu/pages/find/friendsSpaces/friendsSpaces.vue"]]);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/login/regise/regise", PagesLoginRegiseRegise);
  __definePage("pages/chat/index", PagesChatIndex);
  __definePage("pages/friends/friends", PagesFriendsFriends);
  __definePage("pages/my/my", PagesMyMy);
  __definePage("pages/find/find", PagesFindFind);
  __definePage("pages/friends/chatPage/chatPage", PagesFriendsChatPageChatPage);
  __definePage("pages/find/addFriends/addFriends", PagesFindAddFriendsAddFriends);
  __definePage("pages/my/settingUserInfo/settingUserInfo", PagesMySettingUserInfoSettingUserInfo);
  __definePage("pages/find/friendsSpaces/friendsSpaces", PagesFindFriendsSpacesFriendsSpaces);
  const _sfc_main = {
    data() {
      return {
        ChatsList: []
      };
    },
    onLaunch: function() {
      uni.onSocketOpen(function(res) {
        formatAppLog("log", "at App.vue:12", "WebSocket\u8FDE\u63A5\u5DF2\u6253\u5F00\uFF01");
      });
      uni.onSocketError(function(res) {
        formatAppLog("log", "at App.vue:15", "WebSocket\u8FDE\u63A5\u6253\u5F00\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\uFF01");
      });
      uni.onSocketMessage(function(res) {
        let resDate = JSON.parse(res.data);
        if (resDate.Type == 1) {
          store.commit("AddChatsList", resDate);
        } else if (resDate.Type == 2)
          ;
        else {
          uni.showToast({
            title: resDate.Content,
            icon: "none"
          });
        }
      });
      uni.onSocketClose(function(res) {
        formatAppLog("log", "at App.vue:31", "WebSocket \u5DF2\u5173\u95ED\uFF01");
      });
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:35", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:38", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/fox/project/uniapp/ftu/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(store);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
