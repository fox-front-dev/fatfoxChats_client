"use strict";
const common_vendor = require("../../common/vendor.js");
const ajax_axios = require("../../ajax/axios.js");
const store_index = require("../../store/index.js");
require("../../ajax/req.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "find",
  setup(__props) {
    const gotoPage = (index) => {
      if (index == 0) {
        common_vendor.index.navigateTo({
          url: `/pages/find/friendsSpaces/friendsSpaces`
        });
      } else if (index == 1 || index == 2) {
        common_vendor.index.navigateTo({
          url: `/pages/find/addFriends/addFriends?relationshipList=${JSON.stringify(relationshipList.value)}`
        });
      } else
        ;
    };
    let relationshipList = common_vendor.ref([]);
    common_vendor.onMounted(() => {
    });
    common_vendor.onShow(() => {
      ajax_axios.ajax.relationship({
        MId: store_index.store.state.UserInfo.Id,
        Type: "3"
      }).then((res) => {
        relationshipList.value = res.data.data;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "forward",
          size: "16"
        }),
        b: common_vendor.o(($event) => gotoPage(0)),
        c: common_vendor.p({
          type: "forward",
          size: "16"
        }),
        d: common_vendor.o(($event) => gotoPage(1)),
        e: common_vendor.p({
          type: "forward",
          size: "16"
        }),
        f: common_vendor.o(($event) => gotoPage(2))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1c765c2e"], ["__file", "/Users/fox/project/uniapp/ftu/pages/find/find.vue"]]);
wx.createPage(MiniProgramPage);
