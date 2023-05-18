<template>
	<view class="chats-container">
		<scroll-view scroll-y :scroll-into-view="scrollToView" class="scroll-Y" @scroll="scroll">
			<view class="ChatView">
				<view class="ChatContent" v-for="item,index in ChatsList"  :id="'msg' + item.ID">
					<view class="left" v-if="userInfo.Id!=item.FormId">
						<view class="imageView">
							<image src="../../../static/image/userAvt.png" mode=""></image>
						</view>
						<view class="content">
							<text>
								{{item.Content}}
							</text>
						</view>
					</view>
					<view class="right" v-if="userInfo.Id==item.FormId">
						<view class="content">
							<text class="">
								{{item.Content}}
							</text>
						</view>
						<view class="imageView">
							<image src="../../../static/image/userAvt.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="text-area-view">
				<textarea auto-height class="text-area" type="text" v-model="input"></textarea>
				<button class="submit" @click="submit">submit</button>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		ref,
		getCurrentInstance,
		watch,
		nextTick
	} from "vue"
	import {
		onLoad,
		onHide,
		onUnload
	} from "@dcloudio/uni-app"
	import store from "../../../store";
	import axios from "../../../ajax/axios";
	const proxy = getCurrentInstance()
	let input = ref("")
	let TargetId = ref()
	let userInfo = JSON.parse(uni.getStorageSync("UserInfo"))
	let chats = ref({
		sendTime: "",
		sendType: "",
		formId: "",
		toId: "",
		content: ""
	})
	let ChatsList = ref([])
	let scrollToView=ref("")
	const submit = () => {
		if (!input.value) return
		let form = {
			Content: input.value,
			Type: 1,
			TargetId: TargetId.value,
			FormId: userInfo.Id,
			SendTime: new Date().getTime(),
		}
		uni.sendSocketMessage({
			data: JSON.stringify(form),
			success() {

			}
		})
	}
	let opts = ref({})
	let formData = ref({
		TargetId: "",
		FormId: "",
		Offset: 1,
		Limit: 20,
	})
	onLoad((option) => {
		let opt = JSON.parse(option.opt)
		TargetId.value = opt.Id
		opts.value = (option.opt)
		uni.setNavigationBarTitle({
			title: opt.Name
		})
		formData.value.TargetId = opt.Id
		formData.value.FormId = userInfo.Id
		getChats()
		// 获取聊天记录
		uni.onSocketMessage(function(res) {
			if (res.data == "ok") {
				getChats()
			}
		});
	})
	// 获取聊天记录
	const getChats = () => {
		axios.selectChats(formData.value).then(res => {
			ChatsList.value = res.data.data
			input.value = ""
			ChatsList.value.sort(function(a,b){
				return a.ID-b.ID
			})
			scrollToView.value="msg"+(ChatsList.value[ChatsList.value.length-1].ID)
		})
	}
</script>

<style scoped>
	.text-area {
		width: 80%;
		margin-right: 10px;

		background-color: #ffffff;
		border-radius: 6px;
		font-size: 16px;
		padding: 10px;
	}

	.text-area-view {
		display: flex;
		padding: 10px;
		position: fixed;
		width: 100%;
		box-sizing: border-box;
		background-color: #ebebeb;
		bottom: 0;
		align-items: center;
	}

	.submit {
		height: 35px;
		background-color: #2085ea;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
	}

	.imageView {
		width: 40px;
		height: 40px;
		border-radius: 10px;
		background-color: #fffff;
	}

	.ChatView {
		min-height: 100vh;
		background-color: #f7f7f7;
		padding-bottom: 60px;
		box-sizing: border-box;
	}

	.content {
		min-height: 40px;
		margin-left: 20px;
		margin-right: 20px;
		padding: 5px;
		box-sizing: border-box;
		width: 80%;
		display: flex;
		align-items: center;
	}

	.content>text {
		background-color: #cccccc;
		border-radius: 10px;
		word-break: break-all;
		height: 100%;
		padding: 10px 10px;
	}

	.ChatContent>view {
		display: flex;
		padding: 10px;
		align-items: center;
	}

	.right .content {
		justify-content: flex-end;
	}

	.scroll-Y {
		height: 100vh;
	}
</style>
