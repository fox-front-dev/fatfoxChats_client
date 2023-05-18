"use strict";
const common_vendor = require("../../../common/vendor.js");
const ajax_axios = require("../../../ajax/axios.js");
const store_index = require("../../../store/index.js");
require("../../../ajax/req.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  (_easycom_uni_icons2 + _easycom_uni_popup2 + _easycom_uni_popup_dialog2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup + _easycom_uni_popup_dialog)();
}
const _sfc_main = {
  __name: "addFriends",
  setup(__props) {
    let proxy = common_vendor.getCurrentInstance();
    let searchResult = common_vendor.ref({
      AccName: ""
    });
    let userPhone = common_vendor.ref("");
    let userInfo = common_vendor.ref({});
    const searchFriends = () => {
      let form2 = {
        Phone: userPhone.value
      };
      ajax_axios.ajax.selectUserByPhone(form2).then((res) => {
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
        common_vendor.index.showToast({
          title: "\u4E0D\u8981\u8BD5\u56FE\u6DFB\u52A0\u81EA\u5DF1\u4E3A\u597D\u53CB",
          icon: "none"
        });
        return;
      }
      let form = {
        MId: userInfo.value.Id,
        FId: searchResult.value.Id
      };
      ajax_axios.ajax.addFriend(form).then((res) => {
        common_vendor.index.showToast({
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
      ajax_axios.ajax.agreeAdd(form).then((res) => {
        let list = meauItems.value.filter((item) => {
          return item.Id != id;
        });
        meauItems.value = list;
      });
    };
    const openPopup = () => {
      proxy.refs.popup.open();
    };
    let heightHeaderTop = common_vendor.ref("");
    common_vendor.onMounted(() => {
      common_vendor.index.getSystemInfo({
        success: (res) => {
          heightHeaderTop.value = res.statusBarHeight + 45;
        }
      });
      userInfo.value = store_index.store.state.UserInfo;
    });
    common_vendor.onLoad((option) => {
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
      ajax_axios.ajax.searchAllFriendsById(Id).then((res) => {
        console.log(res);
        meauItems.value = res.data.data;
      });
    });
    let meauItems = common_vendor.ref([]);
    common_vendor.ref([
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
      return common_vendor.e({
        a: common_vendor.p({
          type: "search",
          color: "#c7c7c7",
          size: "18"
        }),
        b: common_vendor.o(openPopup),
        c: common_vendor.t(common_vendor.unref(userInfo).Phone),
        d: common_vendor.unref(meauItems).length
      }, common_vendor.unref(meauItems).length ? {
        e: common_vendor.f(common_vendor.unref(meauItems), (item, index, i0) => {
          return {
            a: common_vendor.t(item.AccName),
            b: common_vendor.t(item.Name),
            c: common_vendor.o(($event) => agreen(item.Id)),
            d: common_vendor.n(item.bottonLinear ? "borderBottom" : "")
          };
        })
      } : {}, {
        f: common_vendor.p({
          type: "search",
          size: "18"
        }),
        g: common_vendor.o([($event) => common_vendor.isRef(userPhone) ? userPhone.value = $event.detail.value : userPhone = $event.detail.value, (...args) => _ctx.input && _ctx.input(...args)]),
        h: common_vendor.unref(userPhone),
        i: common_vendor.o(($event) => common_vendor.unref(proxy).refs.popup.close()),
        j: common_vendor.unref(userPhone)
      }, common_vendor.unref(userPhone) ? {
        k: common_vendor.t(common_vendor.unref(userPhone)),
        l: common_vendor.o(searchFriends)
      } : {}, {
        m: common_vendor.unref(searchResult).AccName
      }, common_vendor.unref(searchResult).AccName ? {
        n: common_vendor.t(common_vendor.unref(searchResult).AccName),
        o: common_vendor.o(step2)
      } : {}, {
        p: common_vendor.sr("popup", "628f9f38-1"),
        q: common_vendor.p({
          type: "center"
        }),
        r: common_vendor.o(dialogConfirm),
        s: common_vendor.p({
          type: "success",
          mode: "base",
          cancelText: "\u5173\u95ED",
          confirmText: "\u540C\u610F",
          content: "\u786E\u5B9A\u8981\u6DFB\u52A0\u8BE5\u597D\u53CB\u5417"
        }),
        t: common_vendor.sr("alertDialog", "628f9f38-3"),
        v: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-628f9f38"], ["__file", "/Users/fox/project/uniapp/ftu/pages/find/addFriends/addFriends.vue"]]);
wx.createPage(MiniProgramPage);
