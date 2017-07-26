// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import {sync} from 'vuex-router-sync'
import FastClick from 'fastclick'
import router from './router'
import store from './vuex/store'
import './style/base.css'
import './style/font-awesome-4.7.0/css/font-awesome.min.css'
import topbar from './components/header/header'
import App from './App'
import Vuex from 'vuex'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.use (Vuex)
Vue.use (VueRouter)


FastClick.attach (document.body)

Vue.config.productionTip = false


Vue.component ('top-bar', topbar)

// router.afterEach(function (to) {
//   store.commit('updateLoadingStatus', {isLoading: false})
//   if (process.env.NODE_ENV === 'production') {
//     ga && ga('set', 'page', to.fullPath)
//     ga && ga('send', 'pageview')
//   }
// })
sync(store, router)

router.beforeEach(function (to, from, next) {
  if (to.path.indexOf ('/msginfo') != -1) {
    store.commit ('UPDATE_SHOW_FOTTER', {isShowFotter: false})
  } else {
    store.commit ('UPDATE_SHOW_FOTTER', {isShowFotter: true})
  }
  store.commit('UPDATE_LOADING', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('UPDATE_LOADING', {isLoading: false})
})
/* eslint-disable no-new */
new Vue ({
  store,
  router,
  render: h => h(App)
}).
$mount ('#app-box')
