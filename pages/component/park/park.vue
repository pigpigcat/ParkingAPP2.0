<template>
  <view>
    <map :latitude="latitude"
         :longitude="longitude"
         :markers="markers"
         id="2"
         @markertap='markertap'
         :scale="scale">
    </map>
  </view>
</template>

<script>
export default {
  data () {
    return {
      scale: 18,
      // 经度
      longitude: 117.200983,
      // 纬度
      latitude: 39.084158,
      markers: []
    }
  },
  onReady () {
    var mapContext = uni.createMapContext('2', this);
    // #ifdef APP-PLUS
    // 全屏
    plus.navigator.setFullscreen(true);
    // 获取地图对象
    var aMap = mapContext.$getAppMap();
    // 获取经纬度
    plus.geolocation.getCurrentPosition((position) => {
      console.log("经度:" + position.coords.longitude);
      console.log("纬度:" + position.coords.latitude);
      this.longitude = position.coords.longitude;
      this.latitude = position.coords.latitude;
      this.request();
    })
    // #endif
  },
  methods: {
    request () {
      // 发起请求
      uni.request({
        url: 'http://198.10.1.96:8888/parking/getParkingInfo',
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
    markertap (e) {
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
  height: 1000upx;
}
</style>
