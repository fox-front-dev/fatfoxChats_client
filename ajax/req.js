
// let baseUrl = "http://127.0.0.1:4000"
let baseUrl = "http://81.68.206.160:4000"

export default {
	get(opt) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + opt.url,
				header:{
					"Authorization":uni.getStorageSync("token")
				},
				method: "GET",
				success(res) {
					resolve(res)
				},
				fail() {
					reject()
				}
			})
		})
	},
	post(opt) {
		console.log(1);
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + opt.url,
				data: opt.data,
				header:{
					"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
					"Authorization":uni.getStorageSync("token")
				},
				method: "POST",
				success(res) {
					if(res.data.code!=1000){
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						});
					}
					resolve(res)
				},
				fail() {
					console.log(3);
					reject()
				}
			})
		})
	}
}
