<template>
	<view class="find-container">
		<view class="searchFriends"  @click="gotoPage(0)">
			<view class="">
				<view class="addFriend-view">
					<image src="../../static/image/find_1.png" mode=""></image>
				</view>
				朋友圈
			</view>
			<uni-icons type="forward" size="16"></uni-icons>
		</view>
		<view class="searchFriends" @click="gotoPage(1)">
			<view class="">
				<view class="addFriend-view">
					<image src="../../static/image/addFriend.png" mode=""></image>
				</view>
				 添加好友
			</view>
			<uni-icons type="forward" size="16"></uni-icons>
		</view>
		<view class="searchFriends"  @click="gotoPage(2)">
			<view class="">
				<view class="addFriend-view">
					<image src="../../static/image/loding.png" mode=""></image>
				</view>
				好友申请
			</view>
			<uni-icons type="forward" size="16"></uni-icons>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onHide,
		onUnload,
		onShow
	} from "@dcloudio/uni-app"
	import{ref,onMounted} from "vue"
	import ajax from "../../ajax/axios.js"
	import store from "../../store/index.js"
	const gotoPage=(index) =>{
		if(index==0){
			uni.navigateTo({
				// 添加好友页面
				url:`/pages/find/friendsSpaces/friendsSpaces`
			})
		}else if(index==1 || index==2 ){
			uni.navigateTo({
				// 添加好友页面
				url:`/pages/find/addFriends/addFriends?relationshipList=${JSON.stringify(relationshipList.value)}`
			})
		}else{
			
		}
	}
	let relationshipList=ref([])
	onMounted(()=>{})
	onShow(()=>{
		ajax.relationship({
			MId:store.state.UserInfo.Id,
			Type:"3"
		}).then(res=>{
			relationshipList.value=res.data.data
		})
	})
</script>

<style scoped>
	.find-container{
		background-color: rgb(248,248,248);
		min-height: 100vh;
		padding: 10px 0;
		box-sizing: border-box;
	}
	.searchFriends{
		height: 30px;
		border-bottom: 1px solid #f7f7f7;
		align-items: center;
		display: flex;
		margin-top: 10px;
		background-color: white;
		padding: 15px 20px;
		justify-content: space-between;
	}
	.searchFriends >view{
		display: flex;
		align-items: center;
		font-size: 18px;
	}
	.addFriend-view{
		width: 25px;
		height: 25px;
		margin-right: 20px;
	}
	image{
		vertical-align: middle;
	}
</style>
