// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import {sync} from 'vuex-router-sync'
import FastClick from 'fastclick'
import router from './router'
import store from './vuex/store'
import axios from 'axios'
import {user, system}  from './mock/mock'
import './style/base.css'
import './style/font-awesome-4.7.0/css/font-awesome.min.css'
import topbar from './components/header/header'
import App from './App'
import Vuex from 'vuex'
import VueD3 from 'vue-d3'

Vue.prototype.$axios = axios;

Vue.use (VueD3)
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
sync (store, router)


axios.get ('http://system.cn').then (response => {
  let system = {
    'ch': response.data.ch // 客服电话
  }
  store.commit('UPDATE_SYSTEM', system)
}).catch (error => {
  console.log (error)
})

router.beforeEach (function (to, from, next) {
  store.commit ('UPDATE_LOADING', {isLoading: true})
  if (typeof localStorage.username == 'undefined') {
    axios.get ('http://login.cn').then (response => {
      console.log (response.data)
      for (let key in response.data) {
        localStorage.setItem (key, response.data[key])
      }
    }).catch (error => {
      console.log (error)
    })
  }

  let user = {
    name: localStorage.getItem('username'),
    id: localStorage.getItem('userid'),
    proxy: localStorage.getItem('userproxy'),
    img: localStorage.getItem('userimg'),
    code: localStorage.getItem('paperno'),
    hometown: localStorage.getItem('hometown'),
    sex: localStorage.getItem('sex'),
    type: localStorage.getItem('papertype'),
    end: localStorage.getItem('paperend'),
    phone: localStorage.getItem('phone'),
    isAttest: true
  }

  store.commit('UPDATE_SHOW_FOTTER', {isShowFotter: true})
  store.commit('UPDATE_USER', user)
  next ()
})

router.afterEach (function (to) {
  store.commit ('UPDATE_LOADING', {isLoading: false})
})
/* eslint-disable no-new */
new Vue ({
  store,
  router,
  render: h => h (App)
}).$mount ('#app-box')
