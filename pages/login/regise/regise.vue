<template>
	<view class="phonelogin">
		<view class="phonelogin_title">
			手机号注册
		</view>
		<view class="phonelogin_input phonelogin_input-style">
			<!-- <image style="width: 40rpx;height: 40rpx;margin-right: 20rpx;" src="../../../../static/images/phone.png"
				mode=""></image> -->
			<input v-model="form.AccName" type="text" placeholder="请输入昵称">
		</view>
		<view class="phonelogin_input phonelogin_input-style2">

			<input v-model="form.Name" placeholder="请输入姓名">
		</view>
		<view class="phonelogin_input phonelogin_input-style2">

			<input v-model="form.Phone" placeholder="请输入手机">
		</view>
		<view class="phonelogin_input phonelogin_input-style2">

			<input v-model="password" password placeholder="请输入密码">
		</view>
		<view class="phonelogin_input phonelogin_input-style2">

			<input v-model="okpassword" password placeholder="确认密码">
		</view>
		<view class="phonelogin_input phonelogin_input-style2">
			<uni-data-checkbox v-model="form.Sex" :localdata="sex"></uni-data-checkbox>
		</view>
		<view class="phonelogin_input phonelogin_input-style2">
			<input v-model="form.Email" placeholder="请输入email">
		</view>
		<view class="phonelogin_loginBtn" @click="login">
			注册
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from "vue"
	import ajax from "../../../ajax/axios.js"
	let form = ref({
		AccName: "",
		Name: "",
		Phone: "",
		Password: "",
		Sex: "",
		Email: "",
		ClientIp: "1",
	})
	let okpassword = ref("")
	let password = ref("")
	let sex = ref([{
		text: '男',
		value: 0
	}, {
		text: '女',
		value: 1
	}])
	const login = () => {
		if (form.value.AccName &&
			form.value.Name &&
			form.value.Phone &&
			(form.value.Sex=="0" || form.value.Sex=="1" ) &&
			form.value.Email) {
			if (password.value == okpassword.value) {
				form.value.Password = password.value
				ajax.register(form.value).then(res => {
					if (res.data.code == 1000) {
						uni.showToast({
							title: "创建成功",
							icon: "none"
						})
						setTimeout(() => {
							uni.reLaunch({
								url: "/pages/login/login"
							})
						}, 1000)
					}
				})
			} else {
				uni.showToast({
					icon: "none",
					title: "您输入的两次密码不一致"
				})
			}
		}else{
			uni.showToast({
				icon: "none",
				title: "请填写完整"
			})
		}
	}
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
		margin-top: 270rpx;
	}
</style>
