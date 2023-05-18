<template>
	<view class="addFriend-container">
		<view class="main1">
			<view class="selectView" @click="openPopup">
				<uni-icons type="search" color="#c7c7c7" style="margin-right: 5px;" size="18"></uni-icons>手机号
			</view>
			<view class="myPhone">
				<image src="" mode=""></image>
				我的手机号:{{userInfo.Phone}}
			</view>
		</view>
		<view class="main2" v-if="meauItems.length">
			<view class="main2-item" :class="item.bottonLinear?'borderBottom':''" v-for="item,index in meauItems">
				<view class="item-left">
					<view class="item-image" >
						<image src="../../../static/image/loding.png" mode=""></image>
					</view>
					<view class="">
						<view class="">
							{{item.AccName}}
						</view>
						<view class="introduction">
							{{item.Name}}
						</view>
					</view>
				</view>
				<view class="btns">
					<view class="noSubmit">
						拒绝
					</view>
					<view class="okSubmit" @click="agreen(item.Id)">
						同意
					</view>
				</view>
			</view>
		</view>
	</view>
	<uni-popup ref="popup" type="center">
		<view class="popupViews">
			<view class="inputView">
				<view class="input-item">
					<uni-icons type="search" size="18"></uni-icons>
					<input @input="input" placeholder="搜索用户" v-model="userPhone" style="width: 100%;" type="text" />
				</view>
				<view class="searchBtn" @click="proxy.refs.popup.close()">
					取消
				</view>
			</view>
			<view class="searchResult" v-if="userPhone" @click="searchFriends">
				<image class="searchResultImage" src="../../../static/image/addFriend.png" mode=""></image>
				搜索：<text style="color: green;">{{userPhone}}</text>
			</view>
			<view class="searchResult2" v-if="searchResult.AccName" @click="step2">
				<image class="searchResultImage" src="../../../static/image/userAvt.png" mode=""></image>
				<text>{{searchResult.AccName}}</text>
			</view>
		</view>
	</uni-popup>
	<uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog type="success" mode="base" cancelText="关闭" confirmText="同意" content="确定要添加该好友吗"
			@confirm="dialogConfirm"></uni-popup-dialog>
	</uni-popup>
</template>

<script setup>
	import {
		onLoad,
		onHide,
		onUnload,
		onShow
	} from "@dcloudio/uni-app"
	import {
		ref,
		getCurrentInstance,
		onMounted
	} from "vue"
	import ajax from "../../../ajax/axios.js"
	import store from "../../../store/index.js"

	let proxy = getCurrentInstance()
	let searchResult = ref({
		AccName:""
	})
	let userPhone = ref("")
	let userInfo = ref({})
	const searchFriends = () => {
		let form2 = {
			Phone: userPhone.value
		}
		ajax.selectUserByPhone(form2).then(res => {
			if (res.data.data != "") {
				searchResult.value = res.data.data
				userPhone.value = ""
			} else {
				searchResult.value.AccName = res.data.msg
				userPhone.value = ""
			}
		})
	}
	const step2 = () => {
		if(!searchResult.value.Id) return
		proxy.refs.alertDialog.open()
	}
	
	const dialogConfirm = () => {
		if (userInfo.value.Id == searchResult.value.Id) {
			uni.showToast({
				title: "不要试图添加自己为好友",
				icon: "none"
			})
			return
		}
		let form = {
			MId: userInfo.value.Id,
			FId: searchResult.value.Id
		}
		// 添加好友操作
		ajax.addFriend(form).then(res => {
			uni.showToast({
				title: res.data.msg,
				icon: "none"
			})
		})

	}
	const agreen=(id)=>{
		let form={
			MId:userInfo.value.Id,
			FId:id
		}
		ajax.agreeAdd(form).then(res=>{
			let list= meauItems.value.filter(item=>{
				return item.Id!=id
			})
			meauItems.value=list
		})
	}

	const openPopup = () => {
		proxy.refs.popup.open()
	}
	let heightHeaderTop = ref("")
	onMounted(() => {
		uni.getSystemInfo({
			success: res => {
				heightHeaderTop.value = res.statusBarHeight + 45
			}
		})
		userInfo.value=store.state.UserInfo

	})
	
	onLoad((option)=>{
		let Id = ""
		let list = JSON.parse(option.relationshipList)
		if(!list.length) return
		list.forEach((item,index)=>{
			if(index < list.length-1){
				Id+=item.TargetId+","
			}else{
				Id+=item.TargetId
			}
		})
		ajax.searchAllFriendsById(Id).then(res=>{
			console.log(res);
			meauItems.value=res.data.data
		})
	})
	
	let meauItems=ref([])
	
	let meauItem = ref([{
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
		},
	])
</script>

<style scoped>
	.inputView {
		height: 32px;
		border-radius: 4px;
		margin: auto;
		margin-top: 15px;
		padding-left: 10px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.input-item {
		align-items: center;
		border-radius: 5px;
		box-sizing: border-box;
		background-color: white;
		display: flex;
		width: 100%;
		height: 100%;
		padding: 5px 10px;
	}

	.input-item input {
		margin-left: 6px;
		height: 100%;
	}

	.searchBtn {
		width: 20%;
		height: 100%;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f5f5f5;
		color: #00454d;

	}

	.addFriend-container {
		background-color: rgb(248, 248, 248);
		height: 100vh;
		padding-top: 10px;
		box-sizing: border-box;
	}

	.selectView {
		background-color: white;
		width: 95%;
		margin: auto;
		padding: 5px 0;
		border-radius: 8px;
		color: #c7c7c7;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.myPhone {
		text-align: center;
		font-size: 14px;
		color: #585858;
	}

	.main2 {
		width: 100%;
		background-color: white;
		padding: 10px;
		box-sizing: border-box;
		margin-top: 30px;
	}

	.item-image {
		width: 30px;
		height: 30px;
		margin-right: 10px;
		padding: 5px;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.item-left {
		display: flex;
		align-items: center;
	}

	.main2-item {
		display: flex;
		justify-content: space-between;
		padding: 10px 0px;
		align-items: center;
		box-sizing: border-box;
	}

	.borderBottom {
		border-bottom: 1px solid #e6e6e6;
	}

	.introduction {
		color: #585858;
		font-size: 14px;
	}

	.popupViews {
		height: 100vh;
		width: 100vw;
		z-index: 999;
		background-color: white;
		background-color: #f5f5f5;
		padding-top: 50px;
		box-sizing: border-box;
	}

	.inputs-item {
		display: flex;
		background-color: white;
		padding: 5px 10px;
		box-sizing: border-box;
		margin: 0 20px;
		border-radius: 10px;
	}

	.inputs {
		display: flex;
	}

	.searchResult {
		background-color: white;
		width: 100%;
		padding: 10px;
		display: flex;
		align-items: center;
		margin-top: 10px;
	}

	.searchResult2 {
		background-color: white;
		width: 100%;
		padding: 10px;
		display: flex;
		margin-top: 10px;
	}

	.searchResult .searchResultImage,
	.searchResult2 .searchResultImage {
		width: 40px !important;
		height: 40px !important;
		margin-right: 20px;
	}
	.okSubmit{
		background-color: #0289ff;
		padding:5px 10px;
		color: white;
		border-radius: 10px;
		margin-left: 10px;
	}
	.noSubmit{
		background-color: #cecece;
		padding:5px 10px;
		color: white;
		border-radius: 10px;
		margin-left: 10px;
	}
	.btns{
		display: flex;
	}
</style>
