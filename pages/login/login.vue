<template>
	<view class="phonelogin">
		<view class="phonelogin_title">
			手机号登录
		</view>
		<view class="phonelogin_input phonelogin_input-style">
			<!-- <image style="width: 40rpx;height: 40rpx;margin-right: 20rpx;" src="../../../../static/images/phone.png"
				mode=""></image> -->
			<input v-model="form.Phone" type="text" placeholder="用户账号">
		</view>
		<view class="phonelogin_input phonelogin_input-style2">
			<input password v-model="form.Password" placeholder="用户密码">
		</view>
		<view class="register" @click="gotoRegister">
			暂无账号？先去注册
		</view>
		<view class="phonelogin_loginBtn" @click="login">
			登录
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from "vue"
	import ajax from "../../ajax/axios.js"
	let form = ref({
		Phone: "",
		Password: ""
	})
	const login = () => {
		if (!form.value.Password && !form.value.Phone) return
		ajax.login(form.value).then(res => {
			uni.setStorageSync("Phone", form.value.Phone)
			uni.setStorageSync("Password", form.value.Password)
			if (res.data.code == 1000) {
				uni.setStorageSync("token", res.data.token)
				uni.setStorageSync("UserInfo", JSON.stringify(res.data.data))
				setTimeout(() => {
					uni.reLaunch({
						url: "/pages/chat/index"
					})
				}, 1000)
			}
		})
	}
	const gotoRegister = () => {
		uni.navigateTo({
			url: "/pages/login/regise/regise"
		})
	}
	onMounted(() => {
		form.value.Phone = uni.getStorageSync("Phone")
		form.value.Password = uni.getStorageSync("Password")
		// if(form.value.Phone&&form.value.Password){
		// login()
		// }
	})
</script>

<style scoped>
	.phonelogin_title {
		font-size: 20px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 28px;
		margin: 90rpx 0 0 70rpx;
	}

	.phonelogin_input {
		display: flex;
		border-bottom: 1px solid #EEEEEE;
		margin: 0 60rpx;
		font-size: 16px;

	}

	.phonelogin_input>input {
		flex: 1;
	}

	.phonelogin_input-style {
		padding-top: 120rpx;
		padding-bottom: 10rpx;
	}

	.phonelogin_input-style2 {
		padding-top: 50rpx;
		padding-bottom: 10rpx;
		justify-content: space-between;
		flex: 1;
	}

	.phonelogin_ca {
		font-size: 14px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #5C83FC;
		line-height: 20px;
		text-align: center;
	}

	.phonelogin_loginBtn {
		width: 80%;
		height: 88rpx;
		margin: 0 auto;
		background: #92ACFC;
		box-shadow: 0px 4px 8px 0px rgba(21, 59, 178, 0.14);
		border-radius: 22px;
		text-align: center;
		line-height: 88rpx;
		color: white;
		margin-top: 30rpx;
	}

	.register {
		font-size: 14px;
		color: #5C83FC;
		text-align: center;
		margin-top: 30px;
	}
</style>
