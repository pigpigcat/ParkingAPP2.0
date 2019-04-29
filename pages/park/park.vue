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
				scale: 18,
				// 经度
				longitude: 117.200983,
				// 纬度
				latitude: 39.084158,
				markers: [],
			}
		},
		onReady() {
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
			// mapContext.moveToLocation();
			// mapContext.getCenterLocation({
			// 	success(res) {
			// 		console.log(res.longitude)
			// 		console.log(res.latitude)
			// 	}
			// })
		},
		methods: {
			request() {
				uni.request({
					url: 'http://192.168.1.1:8888/parking/getParkingInfo',
					method: 'post',
					data: {
						'longitude': this.longitude,
						'latitude': this.latitude
					},
					success(data, statusCode, header) {
						this.markers = data.data;
					}
				})
			},
			markertap(e) {
				var markerId = e.detail.markerId;
				this.markers.forEach((element) => {
					if (element.id === markerId) {
						console.log(element.label.content);
					}
				})
				uni.navigateTo({
					url: '/pages/component/park/parkInfo'
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
