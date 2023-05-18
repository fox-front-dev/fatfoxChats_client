"use strict";
const common_vendor = require("../../../common/vendor.js");
const ajax_axios = require("../../../ajax/axios.js");
require("../../../ajax/req.js");
if (!Array) {
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  _easycom_uni_data_checkbox2();
}
const _easycom_uni_data_checkbox = () => "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
if (!Math) {
  _easycom_uni_data_checkbox();
}
const _sfc_main = {
  __name: "regise",
  setup(__props) {
    let form = common_vendor.ref({
      AccName: "",
      Name: "",
      Phone: "",
      Password: "",
      Sex: "",
      Email: "",
      ClientIp: "1"
    });
    let okpassword = common_vendor.ref("");
    let password = common_vendor.ref("");
    let sex = common_vendor.ref([{
      text: "\u7537",
      value: 0
    }, {
      text: "\u5973",
      value: 1
    }]);
    const login = () => {
      if (form.value.AccName && form.value.Name && form.value.Phone && (form.value.Sex == "0" || form.value.Sex == "1") && form.value.Email) {
        if (password.value == okpassword.value) {
          form.value.Password = password.value;
          ajax_axios.ajax.register(form.value).then((res) => {
            if (res.data.code == 1e3) {
              common_vendor.index.showToast({
                title: "\u521B\u5EFA\u6210\u529F",
                icon: "none"
              });
              setTimeout(() => {
                common_vendor.index.reLaunch({
                  url: "/pages/login/login"
                });
              }, 1e3);
            }
          });
        } else {
          common_vendor.index.showToast({
            icon: "none",
            title: "\u60A8\u8F93\u5165\u7684\u4E24\u6B21\u5BC6\u7801\u4E0D\u4E00\u81F4"
          });
        }
      } else {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u586B\u5199\u5B8C\u6574"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(form).AccName,
        b: common_vendor.o(($event) => common_vendor.unref(form).AccName = $event.detail.value),
        c: common_vendor.unref(form).Name,
        d: common_vendor.o(($event) => common_vendor.unref(form).Name = $event.detail.value),
        e: common_vendor.unref(form).Phone,
        f: common_vendor.o(($event) => common_vendor.unref(form).Phone = $event.detail.value),
        g: common_vendor.unref(password),
        h: common_vendor.o(($event) => common_vendor.isRef(password) ? password.value = $event.detail.value : password = $event.detail.value),
        i: common_vendor.unref(okpassword),
        j: common_vendor.o(($event) => common_vendor.isRef(okpassword) ? okpassword.value = $event.detail.value : okpassword = $event.detail.value),
        k: common_vendor.o(($event) => common_vendor.unref(form).Sex = $event),
        l: common_vendor.p({
          localdata: common_vendor.unref(sex),
          modelValue: common_vendor.unref(form).Sex
        }),
        m: common_vendor.unref(form).Email,
        n: common_vendor.o(($event) => common_vendor.unref(form).Email = $event.detail.value),
        o: common_vendor.o(login)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c6e6a642"], ["__file", "/Users/fox/project/uniapp/ftu/pages/login/regise/regise.vue"]]);
wx.createPage(MiniProgramPage);
