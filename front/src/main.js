import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import Router from './Router'
import env from './environment/env'
import VueNativeSock from 'vue-native-websocket'

Vue.use(VueNativeSock, env.socket_url, { format: 'json' })
Vue.use(VueResource)

new Vue({
  el: '#app',
  router: Router,
  render: h => h(App)
})
