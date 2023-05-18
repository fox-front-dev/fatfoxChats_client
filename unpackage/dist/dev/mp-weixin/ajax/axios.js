"use strict";
const ajax_req = require("./req.js");
const register = (data) => {
  return ajax_req.http.post({
    url: "/user/createUser",
    data: {
      ...data
    }
  });
};
const login = (data) => {
  return ajax_req.http.post({
    url: "/user/loginUser",
    data: {
      ...data
    }
  });
};
const searchFriends = (data) => {
  return ajax_req.http.get({
    url: `/user/searchFriends?userId=${data}`
  });
};
const selectUserByPhone = (data) => {
  return ajax_req.http.post({
    url: `/user/selectUserByPhone`,
    data: {
      ...data
    }
  });
};
const searchAllFriendsById = (data) => {
  return ajax_req.http.get({
    url: `/user/selectUserList?selectId=${data}`
  });
};
const addFriend = (data) => {
  return ajax_req.http.post({
    url: `/user/addFriend`,
    data: {
      ...data
    }
  });
};
const relationship = (data) => {
  return ajax_req.http.post({
    url: `/user/relationship`,
    data: {
      ...data
    }
  });
};
const agreeAdd = (data) => {
  return ajax_req.http.post({
    url: `/user/agreeAdd`,
    data: {
      ...data
    }
  });
};
const selectChats = (data) => {
  return ajax_req.http.post({
    url: `/message/selectChatsRecord`,
    data: {
      ...data
    }
  });
};
const selectHistoryUser = () => {
  return ajax_req.http.get({
    url: `/message/selectHistoryChats`
  });
};
const ajax = {
  register,
  login,
  searchFriends,
  searchAllFriendsById,
  addFriend,
  selectUserByPhone,
  relationship,
  agreeAdd,
  selectChats,
  selectHistoryUser
};
exports.ajax = ajax;
