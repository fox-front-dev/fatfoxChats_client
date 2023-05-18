"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../../store/index.js");
const ajax_axios = require("../../../ajax/axios.js");
require("../../../ajax/req.js");
const _sfc_main = {
  __name: "chatPage",
  setup(__props) {
    let input = common_vendor.ref("");
    let TargetId = common_vendor.ref();
    let userInfo = JSON.parse(common_vendor.index.getStorageSync("UserInfo"));
    common_vendor.ref({
      sendTime: "",
      sendType: "",
      formId: "",
      toId: "",
      content: ""
    });
    let ChatsList = common_vendor.ref([]);
    let scrollToView = common_vendor.ref("");
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
      common_vendor.index.sendSocketMessage({
        data: JSON.stringify(form),
        success() {
        }
      });
    };
    let opts = common_vendor.ref({});
    let formData = common_vendor.ref({
      TargetId: "",
      FormId: "",
      Offset: 1,
      Limit: 20
    });
    common_vendor.onLoad((option) => {
      let opt = JSON.parse(option.opt);
      TargetId.value = opt.Id;
      opts.value = option.opt;
      common_vendor.index.setNavigationBarTitle({
        title: opt.Name
      });
      formData.value.TargetId = opt.Id;
      formData.value.FormId = userInfo.Id;
      getChats();
      common_vendor.index.onSocketMessage(function(res) {
        if (res.data == "ok") {
          getChats();
        }
      });
    });
    const getChats = () => {
      ajax_axios.ajax.selectChats(formData.value).then((res) => {
        ChatsList.value = res.data.data;
        input.value = "";
        ChatsList.value.sort(function(a, b) {
          return a.ID - b.ID;
        });
        scrollToView.value = "msg" + ChatsList.value[ChatsList.value.length - 1].ID;
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(ChatsList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.unref(userInfo).Id != item.FormId
          }, common_vendor.unref(userInfo).Id != item.FormId ? {
            b: common_vendor.t(item.Content)
          } : {}, {
            c: common_vendor.unref(userInfo).Id == item.FormId
          }, common_vendor.unref(userInfo).Id == item.FormId ? {
            d: common_vendor.t(item.Content)
          } : {}, {
            e: "msg" + item.ID
          });
        }),
        b: common_vendor.unref(input),
        c: common_vendor.o(($event) => common_vendor.isRef(input) ? input.value = $event.detail.value : input = $event.detail.value),
        d: common_vendor.o(submit),
        e: common_vendor.unref(scrollToView),
        f: common_vendor.o((...args) => _ctx.scroll && _ctx.scroll(...args))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0823cd2d"], ["__file", "/Users/fox/project/uniapp/ftu/pages/friends/chatPage/chatPage.vue"]]);
wx.createPage(MiniProgramPage);
