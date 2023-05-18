
import http from "./req.js"


const register=(data)=>{
	return http.post({
		url:"/user/createUser",
		data:{
			...data
		}
	})
}
const login=(data)=>{
	return http.post({
		url:"/user/loginUser",
		data:{
			...data
		}
	})
}

const searchFriends=(data)=>{
	return http.get({
		url:`/user/searchFriends?userId=${data}`
	})
}
// 根据手机号获取用户id
const selectUserByPhone=(data)=>{
	return http.post({
		url:`/user/selectUserByPhone`,
		data:{
			...data
		}
	})
}
// 根据id查询好友信息
const searchAllFriendsById=(data)=>{
	return http.get({
		url:`/user/selectUserList?selectId=${data}`
	})
}
// 添加好友
const addFriend=(data)=>{
	return http.post({
		url:`/user/addFriend`,
		data:{
			...data
		}
	})
}
// 获取type为3的好友列表
const relationship=(data)=>{
	return http.post({
		url:`/user/relationship`,
		data:{
			...data
		}
	})
}
// 同意
const agreeAdd=(data)=>{
	return http.post({
		url:`/user/agreeAdd`,
		data:{
			...data
		}
	})
}
// 获取用户聊天记录
const selectChats=(data)=>{
	return http.post({
		url:`/message/selectChatsRecord`,
		data:{
			...data
		}
	})
}
// 获取正在聊天的用户
const selectHistoryUser=()=>{
	return http.get({
		url:`/message/selectHistoryChats`,
	})
}

export default{
	register,
	login,
	searchFriends,
	searchAllFriendsById,
	addFriend,
	selectUserByPhone,
	relationship,
	agreeAdd,
	selectChats,
	selectHistoryUser,
}