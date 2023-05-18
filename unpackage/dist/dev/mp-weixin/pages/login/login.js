"use strict";
const common_vendor = require("../../common/vendor.js");
const ajax_axios = require("../../ajax/axios.js");
require("../../ajax/req.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    let form = common_vendor.ref({
      Phone: "",
      Password: ""
    });
    const login = () => {
      if (!form.value.Password && !form.value.Phone)
        return;
      ajax_axios.ajax.login(form.value).then((res) => {
        common_vendor.index.setStorageSync("Phone", form.value.Phone);
        common_vendor.index.setStorageSync("Password", form.value.Password);
        if (res.data.code == 1e3) {
          common_vendor.index.setStorageSync("token", res.data.token);
          common_vendor.index.setStorageSync("UserInfo", JSON.stringify(res.data.data));
          setTimeout(() => {
            common_vendor.index.reLaunch({
              url: "/pages/chat/index"
            });
          }, 1e3);
        }
      });
    };
    const gotoRegister = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/regise/regise"
      });
    };
    common_vendor.onMounted(() => {
      form.value.Phone = common_vendor.index.getStorageSync("Phone");
      form.value.Password = common_vendor.index.getStorageSync("Password");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(form).Phone,
        b: common_vendor.o(($event) => common_vendor.unref(form).Phone = $event.detail.value),
        c: common_vendor.unref(form).Password,
        d: common_vendor.o(($event) => common_vendor.unref(form).Password = $event.detail.value),
        e: common_vendor.o(gotoRegister),
        f: common_vendor.o(login)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "/Users/fox/project/uniapp/ftu/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
