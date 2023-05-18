<template>
	<view class="content">
		<view class="" v-for="item,index in currentChatsList2" @click="gotoChatsPage(item.CId,item.AccName)">
			<view class="leftImage">
				<image src="../../static/image/userAvt.png" mode=""></image>
			</view>
			<view class="rightName">
				<view class="title">
					{{item.AccName}}
				</view>
				<view class="unReadContent">
					{{item.LastChats}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import store from "../../store/index.js"
	import {
		ref,
		onMounted,
		watch,
		computed
	} from 'vue'
	import ajax from "../../ajax/axios.js"
	import {
		onLoad,
		onHide,
		onUnload,
		onShow
	} from "@dcloudio/uni-app"
	import axios from "../../ajax/axios.js";
	let ChatsList = ref([])
	let friendsList = ref([])
	let UserInfo = ref(null)
	let friendsListId = ref([])
	let currentChatsList = ref([])
	let currentChatsList2 = ref([])
	let cChatList=computed(()=>{
		return store.state.CList
	})

	// 获取及时消息
	let  getCurrentTimeMessage=()=>{
		axios.selectHistoryUser().then(res=>{
			currentChatsList.value=res.data.data
			currentChatsList.value.forEach(item=>{
				let list=[]
				list.push(item.CId)
				axios.searchAllFriendsById(list).then(res2=>{
					item.AccName=res2.data.data[0].AccName
				})
			})
			currentChatsList2.value=currentChatsList.value
		})
		
	}
	onMounted(() => {
		let userInfo=uni.getStorageSync("UserInfo")
		try {
			UserInfo.value  = JSON.parse(userInfo)
		} catch (e) {}
		store.commit("CreateWebSocket", UserInfo.value.Id)
		store.commit("getUserInfo")
		// 获取聊天历史
		uni.onSocketMessage(function(res) {
			getCurrentTimeMessage()
		});
	})
	const gotoChatsPage = (id, Name) => {
		let s = JSON.stringify({
			"Id": id,
			"Name": Name
		})
		uni.navigateTo({
			url: `/pages/friends/chatPage/chatPage?opt=${s}`
		})
	}
</script>

<style>
	.content {
		box-sizing: border-box;
	}

	.content>view {
		display: flex;
		margin-left: 10px;
		align-items: center;
	}

	.leftImage {
		width: 50px;
		height: 50px;
		border-radius: 5px;
	}

	.rightName {
		width: 80%;
		height: 70px;
		display: flex;
		margin-left: 10px;
		flex-direction: column;
		justify-content: center;
		border-bottom: 1px solid #e1e1e1;
	}

	.rightName .title {
		font-weight: 500;
		font-size: 18px;
	}

	.unReadContent {
		font-size: 14px;
		color: #9d9d9d;
	}
</style>
