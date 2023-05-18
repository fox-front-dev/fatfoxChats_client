"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "my",
  setup(__props) {
    common_vendor.onMounted(() => {
      getUserInfo();
    });
    const gotoPage = (index) => {
      switch (index) {
        case 0:
          common_vendor.index.navigateTo({
            url: "/pages/my/settingUserInfo/settingUserInfo"
          });
          break;
      }
    };
    let UserInfo = common_vendor.ref({});
    const getUserInfo = () => {
      let userInfo = common_vendor.index.getStorageSync("UserInfo");
      UserInfo.value = JSON.parse(userInfo);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(UserInfo).AccName),
        b: common_vendor.t(common_vendor.unref(UserInfo).Phone),
        c: common_vendor.o(($event) => gotoPage(0)),
        d: common_vendor.f(0, (item, k0, i0) => {
          return {};
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"], ["__file", "/Users/fox/project/uniapp/ftu/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
