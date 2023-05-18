"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/login/regise/regise.js";
  "./pages/chat/index.js";
  "./pages/friends/friends.js";
  "./pages/my/my.js";
  "./pages/find/find.js";
  "./pages/friends/chatPage/chatPage.js";
  "./pages/find/addFriends/addFriends.js";
  "./pages/my/settingUserInfo/settingUserInfo.js";
  "./pages/find/friendsSpaces/friendsSpaces.js";
}
const _sfc_main = {
  data() {
    return {
      ChatsList: []
    };
  },
  onLaunch: function() {
    common_vendor.index.onSocketOpen(function(res) {
      console.log("WebSocket\u8FDE\u63A5\u5DF2\u6253\u5F00\uFF01");
    });
    common_vendor.index.onSocketError(function(res) {
      console.log("WebSocket\u8FDE\u63A5\u6253\u5F00\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\uFF01");
    });
    common_vendor.index.onSocketMessage(function(res) {
    });
    common_vendor.index.onSocketClose(function(res) {
      console.log("WebSocket \u5DF2\u5173\u95ED\uFF01");
    });
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/fox/project/uniapp/ftu/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
