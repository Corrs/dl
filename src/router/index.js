import Vue from 'vue'
import Router from 'vue-router'

Vue.use (Router)
const Home = resolve => require (['@/page/home/home'], resolve)
const Statistics = resolve => require (['@/page/statistics/statistics'], resolve)
const consume = resolve => require (['@/page/statistics/consume'], resolve)
const score = resolve => require (['@/page/statistics/score'], resolve)
const msginfo = resolve => require (['@/page/msg/msginfo'], resolve)
const msg = resolve => require (['@/page/msg/msg'], resolve)
const profile = resolve => require (['@/page/profile/profile'], resolve)
const cash = resolve => require (['@/page/profile/cash'], resolve)
const cashList = resolve => require (['@/page/profile/cashList'], resolve)
const person = resolve => require (['@/page/profile/person'], resolve)
const phone = resolve => require (['@/page/profile/phone'], resolve)
const bankCard = resolve => require (['@/page/profile/bankCard'], resolve)
const appendBankCard = resolve => require (['@/page/profile/appendBankCard'], resolve)
const spread = resolve => require (['@/page/profile/spread'], resolve)
const contact = resolve => require (['@/page/profile/contact'], resolve)
const rebate = resolve => require (['@/page/profile/rebate'], resolve)
const proxyLift = resolve => require (['@/page/profile/proxyLift'], resolve)
const proxy = resolve => require (['@/page/proxy/proxy'], resolve)
const controlProxy = resolve => require (['@/page/proxy/controlProxy'], resolve)
const offline = resolve => require (['@/page/proxy/offline'], resolve)
const appendProxy = resolve => require (['@/page/proxy/appendProxy'], resolve)
const userInfo = resolve => require (['@/page/proxy/userInfo'], resolve)
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
      path: '/consume',
      name: 'consume',
      component: consume
    },
    {
      path: '/score',
      name: 'score',
      component: score
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
      path: '/cash-list',
      name: 'cashList',
      component: cashList
    },
    {
      path: '/person',
      name: 'person',
      component: person
    },
    {
      path: '/phone',
      name: 'phone',
      component: phone
    },
    {
      path: '/bankCard',
      name: 'bankCard',
      component: bankCard
    },
    {
      path: '/appendBankCard',
      name: 'appendBankCard',
      component: appendBankCard
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
      path: '/controlProxy',
      name: 'controlProxy',
      component: controlProxy
    },
    {
      path: '/offline',
      name: 'offline',
      component: offline
    },
    {
      path: '/appendProxy',
      name: 'appendProxy',
      component: appendProxy
    },
    {
      path: '/user-info',
      name: 'userInfo',
      component: userInfo
    }
  ]
})
