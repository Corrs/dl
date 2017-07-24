import Vue from 'vue'
import Router from 'vue-router'

Vue.use (Router)
const Home = resolve => require (['@/page/home/home'], resolve)
const Statistics = resolve => require (['@/page/statistics/statistics'], resolve)
const msginfo = resolve => require (['@/page/msg/msginfo'], resolve)
const msg = resolve => require (['@/page/msg/msg'], resolve)
const profile = resolve => require (['@/page/profile/profile'], resolve)
const cash = resolve => require (['@/page/profile/cash'], resolve)
const phone = resolve => require (['@/page/profile/phone'], resolve)
const spread = resolve => require (['@/page/profile/spread'], resolve)
const contact = resolve => require (['@/page/profile/contact'], resolve)
const rebate = resolve => require (['@/page/profile/rebate'], resolve)
const proxyLift = resolve => require (['@/page/profile/proxyLift'], resolve)
const proxy = resolve => require (['@/page/proxy/proxy'], resolve)
const appendProxy = resolve => require (['@/page/proxy/appendProxy'], resolve)
export default new Router ({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Statistics',
      name: 'Statistics',
      component: Statistics
    },
    {
      path: '/msg',
      name: 'msg',
      component: msg
    },
    {
      path: '/msginfo',
      name: 'msginfo',
      component: msginfo
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/cash',
      name: 'cash',
      component: cash
    },
    {
      path: '/phone',
      name: 'phone',
      component: phone
    },
    {
      path: '/spread',
      name: 'spread',
      component: spread
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact
    },
    {
      path: '/rebate',
      name: 'rebate',
      component: rebate
    },
    {
      path: '/proxyLift',
      name: 'proxyLift',
      component: proxyLift
    },
    {
      path: '/proxy',
      name: 'proxy',
      component: proxy
    },
    {
      path: '/appendProxy',
      name: 'appendProxy',
      component: appendProxy
    }
  ]
})
