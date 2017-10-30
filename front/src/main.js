import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import Router from './Router'
import env from 'env'
import VueNativeSock from 'vue-native-websocket'

console.log(env.socket_url);

Vue.use(VueNativeSock, env.socket_url)

Vue.use(VueResource)

new Vue({
  el: '#app',
  router: Router,
  render: h => h(App)
})
