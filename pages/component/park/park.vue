<template>
	<view style="height: 100%;">
		<map :latitude="latitude" :longitude="longitude" :markers="markers" id="2" @markertap='markertap' :scale="scale">
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
				markers: [{
						id: 'B0FFG8BX05',
						longitude: 117.199722,
						latitude: 39.084060,
						label: {
							content: '三轻楼地上停车场'
						},
						// #ifdef APP-PLUS
						iconPath: '/static/app-plus/location@3x.png',
						// #endif
						// #ifndef APP-PLUS
						iconPath: '/static/location.png',
						// #endif
					}, {
						id: 'B0FFHGLKOG',
						longitude: 117.200725,
						latitude: 39.083156,
						label: {
							content: '天津市人民政府地面停车场'
						},
						// #ifdef APP-PLUS
						iconPath: '/static/app-plus/location@3x.png',
						// #endif
						// #ifndef APP-PLUS
						iconPath: '/static/location.png',
						// #endif
					},
					{
						id: 'B0FFGXZZKU',
						longitude: 117.200109,
						latitude: 39.083304,
						label: {
							content: '停车场(欧亚花园东北)'
						},
						// #ifdef APP-PLUS
						iconPath: '/static/app-plus/location@3x.png',
						// #endif
						// #ifndef APP-PLUS
						iconPath: '/static/location.png',
						// #endif
					}
				],
			}
		},
		onReady() {
			var mapContext = uni.createMapContext('2', this);
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(true);
			var aMap = mapContext.$getAppMap();
			aMap.getUserLocation(function(state, point) {
				console.log('state:' + state);
				console.log('经度:' + point.getLng() + ',纬度:' + point.getLat());
			});
			plus.geolocation.getCurrentPosition((position) => {
				console.log("经度:" + position.coords.longitude);
				console.log("纬度:" + position.coords.latitude);
				this.longitude = position.coords.longitude;
				this.latitude = position.coords.latitude;
			})
			// #endif
			mapContext.moveToLocation();
			mapContext.getCenterLocation({
				success(res) {
					console.log(res.longitude)
					console.log(res.latitude)
				}
			})
		},
		methods: {
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
