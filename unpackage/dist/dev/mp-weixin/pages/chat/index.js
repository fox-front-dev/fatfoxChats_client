"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const ajax_axios = require("../../ajax/axios.js");
require("../../ajax/req.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref([]);
    common_vendor.ref([]);
    let UserInfo = common_vendor.ref(null);
    common_vendor.ref([]);
    let currentChatsList = common_vendor.ref([]);
    let currentChatsList2 = common_vendor.ref([]);
    common_vendor.computed$1(() => {
      return store_index.store.state.CList;
    });
    let getCurrentTimeMessage = () => {
      ajax_axios.ajax.selectHistoryUser().then((res) => {
        currentChatsList.value = res.data.data;
        currentChatsList.value.forEach((item) => {
          let list = [];
          list.push(item.CId);
          ajax_axios.ajax.searchAllFriendsById(list).then((res2) => {
            item.AccName = res2.data.data[0].AccName;
          });
        });
        currentChatsList2.value = currentChatsList.value;
      });
    };
    common_vendor.onMounted(() => {
      let userInfo = common_vendor.index.getStorageSync("UserInfo");
      try {
        UserInfo.value = JSON.parse(userInfo);
      } catch (e) {
      }
      store_index.store.commit("CreateWebSocket", UserInfo.value.Id);
      store_index.store.commit("getUserInfo");
      common_vendor.index.onSocketMessage(function(res) {
        getCurrentTimeMessage();
      });
    });
    const gotoChatsPage = (id, Name) => {
      let s = JSON.stringify({
        "Id": id,
        "Name": Name
      });
      common_vendor.index.navigateTo({
        url: `/pages/friends/chatPage/chatPage?opt=${s}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(currentChatsList2), (item, index, i0) => {
          return {
            a: common_vendor.t(item.AccName),
            b: common_vendor.t(item.LastChats),
            c: common_vendor.o(($event) => gotoChatsPage(item.CId, item.AccName))
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/fox/project/uniapp/ftu/pages/chat/index.vue"]]);
wx.createPage(MiniProgramPage);
