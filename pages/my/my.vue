<template>
	<view class="my-container">
		<view class="main1">
			<view class="left">
				<image src="../../static/image/userAvt.png" mode=""></image>
			</view>
			<view class="right">
				<view class="title">
					{{UserInfo.AccName}}
				</view>
				<view class="phone">
					微信号：{{UserInfo.Phone}}
				</view>
			</view>
		</view>
		<view class="main2">
			<view class="updateUserInfo" @click="gotoPage(0)">
				<view class="updateUserInfo_image">
					<image src="../../static/image/setting.png" mode=""></image>
				</view>
				修改信息
			</view>
			<view class="updateUserInfo" style="margin-top: 0;margin-bottom: 0;" v-for="item in 0">
				<view class="updateUserInfo_image">
					<image src="../../static/image/find_1.png" mode=""></image>
				</view>
				<view class="">
					待添加
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from "vue"
	import ajax from "../../ajax/axios.js"
	onMounted(() => {
		getUserInfo()
	})
	const gotoPage=(index)=>{
		switch(index){
			case 0:
			uni.navigateTo({
				url:"/pages/my/settingUserInfo/settingUserInfo"
			})
			break
		}
	}
	let UserInfo = ref({})
	const getUserInfo = ()=>{
		let userInfo=uni.getStorageSync("UserInfo")
		UserInfo.value = JSON.parse(userInfo)
	}
</script>

<style scoped>
	.my-container {
		min-height: 100vh;
		background-color: #e2e2e2;
	}

	.main1 {
		background-color: white;
		display: flex;
		padding: 30px 0 30px 30px;
	}

	.main1 .left {
		width: 60px;
		height: 60px;
		border-radius: 10px;
	}

	.main1 .right {
		flex: 1;
		margin-left: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.main1 .right .title{
		font-weight: 600;
		font-size: 20px;
	}
	.main1 .right .phone{
		color: #7d7d7d;
	}
	.main2 .updateUserInfo{
		background-color: white;
		margin-top: 10px;
		margin-bottom: 10px;
		display: flex;
		padding: 20px 10px;
		align-items: center;
		font-size: 16px;
	}
	.main2 .updateUserInfo_image{
		width: 18px;
		height:18px;
		margin: 0 15px;
		vertical-align: middle;
	}
	
</style>
