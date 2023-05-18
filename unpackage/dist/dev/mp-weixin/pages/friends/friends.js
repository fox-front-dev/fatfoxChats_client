"use strict";
const common_vendor = require("../../common/vendor.js");
const ajax_axios = require("../../ajax/axios.js");
require("../../ajax/req.js");
const _sfc_main = {
  __name: "friends",
  setup(__props) {
    let userId = common_vendor.ref(10);
    let friendsList = common_vendor.ref([]);
    let overAppendList = common_vendor.ref([]);
    let UserInfo = common_vendor.ref("");
    common_vendor.onShow(() => {
      addressBook.value.forEach((item) => {
        item.data.length = 0;
      });
      UserInfo.value = JSON.parse(common_vendor.index.getStorageSync("UserInfo"));
      userId.value = UserInfo.value.Id;
      ajax_axios.ajax.searchFriends(userId.value).then((res) => {
        if (!res.data.data)
          return;
        friendsList.value = res.data.data;
        let s;
        friendsList.value.forEach((item1) => {
          s = common_vendor.E(item1.AccName, {
            toneType: "none"
          }).substr(0, 1);
          addressBook.value.forEach((item2) => {
            if (item2.id == s.toUpperCase()) {
              item2.data.push(item1);
              overAppendList.value.push(item1.Id);
            }
          });
        });
        friendsList.value.forEach((item) => {
          if (overAppendList.value.indexOf(item.Id) == -1) {
            addressBook.value[26].data.push(item);
          }
        });
      });
    });
    let toView = common_vendor.ref("");
    const toSelectIndex = (item) => {
      toView.value = item;
    };
    const openChat = (Id, Name) => {
      let opt = JSON.stringify({
        Id,
        Name
      });
      common_vendor.index.navigateTo({
        url: `/pages/friends/chatPage/chatPage?opt=${opt}`
      });
    };
    let indexList = common_vendor.ref([
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "_"
    ]);
    let addressBook = common_vendor.ref([
      {
        id: "A",
        data: []
      },
      {
        id: "B",
        data: []
      },
      {
        id: "C",
        data: []
      },
      {
        id: "D",
        data: []
      },
      {
        id: "E",
        data: []
      },
      {
        id: "F",
        data: []
      },
      {
        id: "G",
        data: []
      },
      {
        id: "H",
        data: []
      },
      {
        id: "I",
        data: []
      },
      {
        id: "J",
        data: []
      },
      {
        id: "K",
        data: []
      },
      {
        id: "L",
        data: []
      },
      {
        id: "M",
        data: []
      },
      {
        id: "N",
        data: []
      },
      {
        id: "O",
        data: []
      },
      {
        id: "P",
        data: []
      },
      {
        id: "Q",
        data: []
      },
      {
        id: "R",
        data: []
      },
      {
        id: "S",
        data: []
      },
      {
        id: "T",
        data: []
      },
      {
        id: "U",
        data: []
      },
      {
        id: "V",
        data: []
      },
      {
        id: "W",
        data: []
      },
      {
        id: "X",
        data: []
      },
      {
        id: "Y",
        data: []
      },
      {
        id: "Z",
        data: []
      },
      {
        id: "_",
        data: []
      }
    ]);
    common_vendor.ref([
      {
        id: "A",
        data: []
      },
      {
        id: "B",
        data: []
      },
      {
        id: "C",
        data: []
      },
      {
        id: "D",
        data: []
      },
      {
        id: "E",
        data: []
      },
      {
        id: "F",
        data: []
      },
      {
        id: "G",
        data: []
      },
      {
        id: "H",
        data: []
      },
      {
        id: "I",
        data: []
      },
      {
        id: "J",
        data: []
      },
      {
        id: "K",
        data: []
      },
      {
        id: "L",
        data: []
      },
      {
        id: "M",
        data: []
      },
      {
        id: "N",
        data: []
      },
      {
        id: "O",
        data: []
      },
      {
        id: "P",
        data: []
      },
      {
        id: "Q",
        data: []
      },
      {
        id: "R",
        data: []
      },
      {
        id: "S",
        data: []
      },
      {
        id: "T",
        data: []
      },
      {
        id: "U",
        data: []
      },
      {
        id: "V",
        data: []
      },
      {
        id: "W",
        data: []
      },
      {
        id: "X",
        data: []
      },
      {
        id: "Y",
        data: []
      },
      {
        id: "Z",
        data: []
      },
      {
        id: "_",
        data: []
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(addressBook), (item1, index, i0) => {
          return {
            a: common_vendor.t(item1.id == "_" ? "#" : item1.id),
            b: item1.data.length,
            c: common_vendor.f(item1.data, (item, index2, i1) => {
              return common_vendor.e({
                a: common_vendor.t(item.AccName),
                b: !(item1.data.length == 1) && !(item1.data.length == index2 + 1)
              }, !(item1.data.length == 1) && !(item1.data.length == index2 + 1) ? {} : {}, {
                c: index2,
                d: common_vendor.o(($event) => openChat(item.Id, item.AccName), index2)
              });
            }),
            d: item1.data.length,
            e: item1.id
          };
        }),
        b: common_vendor.unref(toView),
        c: common_vendor.f(common_vendor.unref(indexList), (item, index, i0) => {
          return {
            a: common_vendor.t(item == "_" ? "#" : item),
            b: index,
            c: common_vendor.o(($event) => toSelectIndex(item), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-db42cae2"], ["__file", "/Users/fox/project/uniapp/ftu/pages/friends/friends.vue"]]);
wx.createPage(MiniProgramPage);
