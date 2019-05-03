import Vue from 'vue'
import App from './App'

import pageHead from './components/page-head.vue'
import pageFoot from './components/page-foot.vue'

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store
// Vue.prototype.$api = "http://chopper.6655.la"
Vue.prototype.$api = "http://127.0.0.1:8888/parking"
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}

Vue.component('page-head', pageHead)
Vue.component('page-foot', pageFoot)


App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
