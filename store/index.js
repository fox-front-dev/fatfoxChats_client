import {createStore} from 'vuex'
const store = createStore({
	state:{
		WS:null,
		ChatsList:[],
		CList:[],
		UserInfo:{}
	},
	mutations:{
		CreateWebSocket(state,id){
			state.WS = uni.connectSocket({
				url: `ws://81.68.206.160:4000/message/sendUserMsg?userId=${id}`,
				// url: `ws://127.0.0.1:4000/message/sendUserMsg?userId=${id}`,
				complete: () => {}
			});
			let chats=uni.getStorageSync("ChatsList")
			if(chats){
				state.ChatsList=JSON.parse(chats)
			}
		},
		getUserInfo(state){
			try{
				state.UserInfo=uni.getStorageSync("UserInfo")||""
				state.UserInfo=JSON.parse(state.UserInfo)
			}catch(e){}
		}
	},
	actions:{
		
	}
	
})
export default store