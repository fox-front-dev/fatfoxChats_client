<script>
	import store from "./store/index.js"
	export default {
		data(){
			return{
				ChatsList:[]
				
			}
		},
		onLaunch: function() {
			uni.onSocketOpen(function(res) {
				console.log('WebSocket连接已打开！');
			});
			uni.onSocketError(function(res) {
				console.log('WebSocket连接打开失败，请检查！');
			});
			uni.onSocketMessage(function(res) {
				// console.log(res.data);
				// let resDate=JSON.parse(res.data)
				// if(resDate.Type==1){
				// 	// store.commit("AddChatsList" ,resDate)
				// }else if (resDate.Type==2){
				// 	// 文件
				// }else{
				// 	uni.showToast({
				// 		title: resDate.Content,
				// 		icon:"none"
				// 	});
				// }
			});
			uni.onSocketClose(function(res) {
				console.log('WebSocket 已关闭！');
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>


<style>
	/*每个页面公共css */
	image {
		width: 100% !important;
		height: 100% !important;
	}
</style>
