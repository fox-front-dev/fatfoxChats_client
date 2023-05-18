"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "settingUserInfo",
  setup(__props) {
    let userInfo = JSON.parse(common_vendor.index.getStorageSync("UserInfo"));
    let proxy = common_vendor.getCurrentInstance();
    const openSettingDialog = (params) => {
      proxy.refs.inputDialog.open();
    };
    common_vendor.ref({
      AccName: "",
      Sex: "",
      Email: "",
      Phone: "",
      Name: "",
      Password: ""
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => openSettingDialog()),
        b: common_vendor.t(common_vendor.unref(userInfo).AccName),
        c: common_vendor.o(($event) => openSettingDialog()),
        d: common_vendor.t(common_vendor.unref(userInfo).Name),
        e: common_vendor.o(($event) => openSettingDialog()),
        f: common_vendor.t(common_vendor.unref(userInfo).Phone),
        g: common_vendor.o(($event) => openSettingDialog()),
        h: common_vendor.t(common_vendor.unref(userInfo).Sex ? "\u7537" : "\u5973"),
        i: common_vendor.o(($event) => openSettingDialog()),
        j: common_vendor.t(common_vendor.unref(userInfo).Email),
        k: common_vendor.o(($event) => openSettingDialog()),
        l: common_vendor.sr("inputClose", "21a09cb4-1,21a09cb4-0"),
        m: common_vendor.o(_ctx.dialogInputConfirm),
        n: common_vendor.p({
          mode: "input",
          title: "\u8F93\u5165\u5185\u5BB9",
          value: "",
          placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
        }),
        o: common_vendor.sr("inputDialog", "21a09cb4-0"),
        p: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-21a09cb4"], ["__file", "/Users/fox/project/uniapp/ftu/pages/my/settingUserInfo/settingUserInfo.vue"]]);
wx.createPage(MiniProgramPage);
