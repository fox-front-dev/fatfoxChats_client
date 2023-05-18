<template>
	<view class="UserInfo-container">
		<view class="list1">
			头像
			<view class="profile" @click="openSettingDialog('头像')">
				<image src="../../../static/image/userAvt.png" mode=""></image>
			</view>
		</view>
		<view class="list1">
			用户名
			<view class="text" @click="openSettingDialog('用户名')">
				{{userInfo.AccName}}
			</view>
		</view>
		<view class="list1">
			姓名
			<view class="text" @click="openSettingDialog('姓名')">
				{{userInfo.Name}}
			</view>
		</view>
		<view class="list1">
			手机号码
			<view class="text" @click="openSettingDialog('手机号码')">
				{{userInfo.Phone}}
			</view>
		</view>
		<view class="list1">
			性别
			<view class="text" @click="openSettingDialog('性别')">
				{{userInfo.Sex ? "男":"女"}}
			</view>
		</view>
		<view class="list1">
			邮箱
			<view class="text" @click="openSettingDialog('邮箱')">
				{{userInfo.Email}}
			</view>
		</view>
	</view>
	
	<!-- 输入框示例 -->
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose"  mode="input" title="输入内容" value=""
				placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
	
</template>

<script setup>
	import {
		ref,
		getCurrentInstance,
		onMounted
	} from "vue"
	let userInfo = JSON.parse(uni.getStorageSync("UserInfo"))
	let proxy = getCurrentInstance()
	const openSettingDialog = (params)=>{
		proxy.refs.inputDialog.open()
		switch(params){
			case "头像":
			
			break
			case "用户名":
				
			
			break
			case "手机号码":
			
			break
			case "性别":
			
			break
			case "邮箱":
			
			break
			case "姓名":
			
			break
		}
	}
	let settingForm = ref({
		AccName:"",
		Sex:"",
		Email:"",
		Phone:"",
		Name:"",
		Password:"",
	})
	
</script>

<style scoped>
	.UserInfo-container {
		min-height: 100vh;
		background-color: white;
	}

	.list1 {
		display: flex;
		justify-content: space-between;
		padding: 20px 0;
		border-bottom: 1px solid #cccccc;
		margin: 0 20px;
		align-items: center;
	}

	.profile {
		width: 50px;
		height: 50px;
	}

	.text {
		color: #888888;
	}
</style>
