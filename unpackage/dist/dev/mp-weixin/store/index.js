"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    WS: null,
    ChatsList: [],
    CList: [],
    UserInfo: {}
  },
  mutations: {
    CreateWebSocket(state, id) {
      state.WS = common_vendor.index.connectSocket({
        url: `ws://81.68.206.160:4000/message/sendUserMsg?userId=${id}`,
        complete: () => {
        }
      });
      let chats = common_vendor.index.getStorageSync("ChatsList");
      if (chats) {
        state.ChatsList = JSON.parse(chats);
      }
    },
    getUserInfo(state) {
      try {
        state.UserInfo = common_vendor.index.getStorageSync("UserInfo") || "";
        state.UserInfo = JSON.parse(state.UserInfo);
      } catch (e) {
      }
    }
  },
  actions: {}
});
exports.store = store;
