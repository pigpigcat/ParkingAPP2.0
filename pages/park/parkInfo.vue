<template>
	<view class="parkInfo">
		<view class="content">
			{{parkInfo.label.content}}
		</view>
		<view class="vacancy">
			空位数:{{vacancy}}
		</view>
		<view class="standard">
			缴费标准: 5元/时
		</view>
		<view class="address">
			地址: {{parkInfo.pname}}{{parkInfo.cityname}}{{parkInfo.adname}}{{parkInfo.address}}
		</view>
		<view class="buttonGroup">
			<button type="primary" plain="true" size="mini" @click="appointment" :disabled="appointmentDisabled">{{second}}</button>
			<button type="primary" plain="true" size="mini" @click="parking" :disabled="parkingDisabled">{{park}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				parkInfo: null,
				second: '预约',
				cutdown: null,
				appointmentDisabled: false,
				parkingDisabled: false,
				vacancy: 0,
				park: '停车'
			}
		},
		onLoad() {
			this.parkInfo = this.$store.state.parkInfo
			this.vacancy = parseInt((Math.random() * 10))
			if (this.vacancy === 0) {
				this.park = '已满'
				this.parkingDisabled = true
				this.appointmentDisabled = true
			}
		},
		methods: {
			appointment() {
				let time = 480;
				this.appointmentDisabled = true;
				this.cutdown = setInterval(() => {
					this.second = (time / 60 < 10 ? '0' + parseInt(time / 60) : parseInt(time / 60)) + ' : ' + (time % 60 < 10 ? '0' +
						time % 60 : time % 60);
					if (time === 1) {
						clearInterval(this.cutdown)
					}
					time--;
					console.log(time);
				}, 1000)
			},
			parking() {
				let userInfo = uni.getStorageSync("userInfo");
				if (!userInfo) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else {
					uni.request({
						url: this.$api + '/doOrder',
						method: 'post',
						data: {
							userInfo: userInfo,
							parkInfo: this.parkInfo
						},
						success: (data) => {								
							if(data.data.code == 200) {
								uni.switchTab({
									url: '/pages/order/order_page'
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.parkInfo {
		.content {
			font-size: 5vw;
			padding: 5vw;
		}

		.vacancy {
			font-size: 5vw;
			padding: 5vw;
		}

		.standard {
			font-size: 5vw;
			padding: 5vw;
		}

		.address {
			font-size: 5vw;
			padding: 5vw;
		}

		.buttonGroup {
			padding: 10vw;
			display: flex;
			justify-content: space-around;

		}

	}
</style>
