import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: require('./components/Home.vue')},
  {path: '/start', component: require('./components/Start.vue')},
  {path: '/game', component: require('./components/Game.vue')},
  {path: '/end', component: require('./components/End.vue')},
  {path: '/scores', component: require('./components/Scores.vue')},
  {path: '/zenikien', component: require('./components/Zenikien.vue')},
  {path: '/recap', component: require('./components/Recap.vue')},
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
