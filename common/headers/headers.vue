<template>
	<view class="title_tabbar" :style="{'height':heightHeaderTop+'px'}">
		<view class="title" :style="{'paddingTop':statusBarH+'px'}">
			<view class="title-item" v-if="props.leftState">
				<view class="titleLeft">上海市<uni-icons class="iconWH" type="bottom" size="16"></uni-icons>
				</view>
				<view class="titleCenter">
					添加好友
				</view>
				<view></view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		defineProps
	} from "vue"

	const props = defineProps({
		leftState: {
			type: Boolean,
			default: false
		}
	})
	let heightHeaderTop = ref(0)
	let statusBarH = ref(0)
	// 获取自定义header高度
	let getHeaderHight = () => {
		// 获取自定义导航的高
		uni.getSystemInfo({
			success: res => {
				heightHeaderTop.value = res.statusBarHeight + 45
				statusBarH.value = res.statusBarHeight
			}
		})
	}
	onMounted(() => {
		getHeaderHight()
	})
</script>
<style>
	.title_tabbar {
		height: 100px;
		z-index: 99;
		background-color: #FFFFFF;
	}

	.title {
		box-sizing: border-box;
	}

	.title-item {
		display: flex;
		line-height: 45px;
		justify-content: space-between;
		height: 100%;
		

	}

	.title-item view {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.titleLeft {
		font-size: 16px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		padding-left: 16px;
		box-sizing: border-box;
		display: flex;
		
	}

	.titleCenter {
		justify-content: center;
		font-size: 18px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
	}
	.titleLeft{
		height: 100%;
	}
	.iconWH{
		display: flex;
		height: 30px;
		align-items: center;
	}

</style>
