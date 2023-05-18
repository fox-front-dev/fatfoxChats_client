"use strict";
const common_vendor = require("../common/vendor.js");
let baseUrl = "http://81.68.206.160:4000";
const http = {
  get(opt) {
    return new Promise((resolve, reject) => {
      common_vendor.index.request({
        url: baseUrl + opt.url,
        header: {
          "Authorization": common_vendor.index.getStorageSync("token")
        },
        method: "GET",
        success(res) {
          resolve(res);
        },
        fail() {
          reject();
        }
      });
    });
  },
  post(opt) {
    console.log(1);
    return new Promise((resolve, reject) => {
      common_vendor.index.request({
        url: baseUrl + opt.url,
        data: opt.data,
        header: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Authorization": common_vendor.index.getStorageSync("token")
        },
        method: "POST",
        success(res) {
          if (res.data.code != 1e3) {
            common_vendor.index.showToast({
              title: res.data.msg,
              icon: "none"
            });
          }
          resolve(res);
        },
        fail() {
          console.log(3);
          reject();
        }
      });
    });
  }
};
exports.http = http;
