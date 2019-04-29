<template>
	<view style="height: 100%;">
		<map :latitude="latitude" :longitude="longitude" :markers="markers" id="park" @markertap='markertap' :scale="scale">
		</map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scale: 16,
				// 经度
				longitude: 118.752973,
				// 纬度
				latitude: 32.152974,
				markers: [],
			}
		},
		onShow() {
			var mapContext = uni.createMapContext('park', this);
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(true);
			var aMap = mapContext.$getAppMap();
			plus.geolocation.getCurrentPosition((position) => {
				this.longitude = position.coords.longitude;
				this.latitude = position.coords.latitude;
				this.request();
			})
			// #endif
		},
		methods: {
			request() {
				uni.request({
					url: 'http://chopper.6655.la/parking/getParkingInfo',
					method: 'post',
					data: {
						'longitude': this.longitude,
						'latitude': this.latitude
					},
					success: (data, statusCode, header) => {
						this.markers = data.data;
					}
				})
			},
			markertap(e) {
				var markerId = e.detail.markerId;
				this.markers.forEach((element) => {
					if (element.id === markerId) {
						this.$store.commit("setParkInfo", element);
						uni.navigateTo({
							url: '/pages/park/parkInfo'
						})
					}
				})
			}
		}
	}
</script>

<style>
	map {
		width: 100%;
		height: 100%;
	}
</style>
