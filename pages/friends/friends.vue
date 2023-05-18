<template>
	<view class="friends-container">
		<view class="friends">
			<scroll-view class="scroll-container" scroll-y="true" :scroll-into-view="toView"
				scroll-with-animation="true">
				<view class="address-book" v-for="(item1, index) in addressBook"  :id="item1.id">
					<view class="address-book-index" v-show="item1.data.length">{{item1.id=="_"?"#":item1.id}}</view>
					<view v-for="(item, index2) in item1.data" v-show="item1.data.length" 
						:key="index2" @click="openChat(item.Id,item.AccName)">
						<view class="contact-container" style="display: flex;">
							<view class="contact-img">
								<image  src="../../static/image/userAvt.png" alt=""></image>
							</view>
							
							<view class="contact-detail-container">
								<view class="contact-name">{{ item.AccName }}</view>
							</view>
							<!-- <image class="splayPhone" src="../../../static/images/playPhone.png" mode=""></image> -->
						</view>
						<view class="bottombor" v-if="!(item1.data.length==1)&&!(item1.data.length==index2+1)"></view>
					</view>
				</view>
			</scroll-view>
			<view class="letter-nav">
				<view class="item" v-for="(item, index) in indexList" :key="index" @click="toSelectIndex(item)">
					{{ item=="_"? "#" :item }}
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
	import {
		onLoad,
		onHide,
		onUnload,
		onShow
	} from "@dcloudio/uni-app"
	import ajax from "../../ajax/axios.js"
	import {
		pinyin
	} from "pinyin-pro"
	let userId = ref(10)
	let friendsList = ref([])
	let overAppendList = ref([])
	let UserInfo = ref("")

	
	onShow(() => {
		addressBook.value.forEach(item=>{
			item.data.length=0
		})
		
		UserInfo.value = JSON.parse(uni.getStorageSync("UserInfo"))
		userId.value = UserInfo.value.Id
		ajax.searchFriends(userId.value).then(res => {
			if(!res.data.data) return
			friendsList.value = res.data.data
			let s;
			friendsList.value.forEach(item1 => {
				s = pinyin(item1.AccName, {
					toneType: 'none'
				}).substr(0, 1)
				addressBook.value.forEach(item2 => {
					if (item2.id == s.toUpperCase()) {
						item2.data.push(item1)
						overAppendList.value.push(item1.Id)
					}
				})
			})
			friendsList.value.forEach(item => {
				if (overAppendList.value.indexOf(item.Id) == -1) {
					addressBook.value[26].data.push(item)
				}
			})
		})
	})

	let toView = ref("")
	const toSelectIndex = (item) => {
		toView.value = item
	}
	const openChat = (Id, Name) => {
		let opt = JSON.stringify({
			Id,
			Name
		})
		uni.navigateTo({
			url: `/pages/friends/chatPage/chatPage?opt=${opt}`
		})
	}
	let indexList = ref(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
		'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '_'
	])
	let addressBook = ref([{
			id: 'A',
			data: []
		},
		{
			id: 'B',
			data: []
		},
		{
			id: 'C',
			data: []
		},
		{
			id: 'D',
			data: []
		},
		{
			id: 'E',
			data: []
		},
		{
			id: 'F',
			data: []
		},
		{
			id: 'G',
			data: []
		},
		{
			id: 'H',
			data: []
		},
		{
			id: 'I',
			data: []
		},
		{
			id: 'J',
			data: []
		},
		{
			id: 'K',
			data: []
		},
		{
			id: 'L',
			data: []
		},
		{
			id: 'M',
			data: []
		},
		{
			id: 'N',
			data: []
		},
		{
			id: 'O',
			data: []
		},
		{
			id: 'P',
			data: []
		},
		{
			id: 'Q',
			data: []
		},
		{
			id: 'R',
			data: []
		},
		{
			id: 'S',
			data: []
		},
		{
			id: 'T',
			data: []
		},
		{
			id: 'U',
			data: []
		},
		{
			id: 'V',
			data: []
		},
		{
			id: 'W',
			data: []
		},
		{
			id: 'X',
			data: []
		},
		{
			id: 'Y',
			data: []
		},
		{
			id: 'Z',
			data: []
		},
		{
			id: '_',
			data: []
		},
	])
	let addressBook2 = ref([{
			id: 'A',
			data: []
		},
		{
			id: 'B',
			data: []
		},
		{
			id: 'C',
			data: []
		},
		{
			id: 'D',
			data: []
		},
		{
			id: 'E',
			data: []
		},
		{
			id: 'F',
			data: []
		},
		{
			id: 'G',
			data: []
		},
		{
			id: 'H',
			data: []
		},
		{
			id: 'I',
			data: []
		},
		{
			id: 'J',
			data: []
		},
		{
			id: 'K',
			data: []
		},
		{
			id: 'L',
			data: []
		},
		{
			id: 'M',
			data: []
		},
		{
			id: 'N',
			data: []
		},
		{
			id: 'O',
			data: []
		},
		{
			id: 'P',
			data: []
		},
		{
			id: 'Q',
			data: []
		},
		{
			id: 'R',
			data: []
		},
		{
			id: 'S',
			data: []
		},
		{
			id: 'T',
			data: []
		},
		{
			id: 'U',
			data: []
		},
		{
			id: 'V',
			data: []
		},
		{
			id: 'W',
			data: []
		},
		{
			id: 'X',
			data: []
		},
		{
			id: 'Y',
			data: []
		},
		{
			id: 'Z',
			data: []
		},
		{
			id: '_',
			data: []
		},
	])
</script>

<style scoped>
	.friends {
		padding: 5px 10px;
	}

	.actimage {
		width: 40px;
		height: 40px;
	}

	.address-book-container {
		background-color: #F7F7F7;
	}

	.address-book {
		background-color: white;
	}

	.contact-img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		overflow: hidden;
	}

	.scroll-container {
		height: 100vh;
	}

	.letter-nav {
		position: fixed;
		right: 15px;
		top: 50%;
		transform: translateY(-45%);
		text-align: center;
	}

	.contact-container {
		display: flex;
		align-items: center;
	}

	.contact-detail-container {
		margin-left: 2%;

	}

	.address-book-index {
		padding-left: 10px;
		margin-top: 5px;
		font-size: 18px;
	}

	.contact-container {
		background-color: white;
		height: 75px;
		padding: 15px;
		box-sizing: border-box;
	}

	.item {
		font-family: PingFangSC-Regular, PingFang SC;
		font-size: 10px;
		font-weight: 400;
		color: #333333;
		width: 7px;
		height: 20px;
		margin-top: 1px;
	}

	.bottombor {
		width: 100%;
		height: 1px;
		background: #EEEEEE;
		margin-left: 30px;
	}

	.searchbtn {
		width: 62px;
		height: 32px;
		background-color: #5C83FC;
		color: white;
		text-align: center;
		line-height: 32px;
		border-radius: 17px;
		margin-left: 15px;
	}

	.input_view {
		display: flex;
		padding-left: 15px;
		flex: 1;
		border-radius: 17px;
		overflow: hidden;
		border: 1px solid #7294FE;
		align-items: center;
	}

	.searchModel {
		box-sizing: border-box;
		display: flex;
		padding: 10px 15px;
	}

	.input {
		height: 100%;
		width: 70%;
		margin-left: 10px;
		color: #333;
	}

	.address-book-index {
		background: #F7F7F7;
		padding-bottom: 5px;
	}

	.playPhone {
		width: 24px;
		height: 24px;
		position: absolute;
		right: 40px;
	}
	.addLoddingFriends{
		padding: 15px;
	}
	.addLoddingFriends> .imageViews{
		width: 40px;
		height: 40px;
	}
</style>
