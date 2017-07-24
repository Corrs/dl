<template>
  <div class="msginfo">
    <div class="content">
      <div class="title">
        <h5>关于代理调整的通知</h5>
      </div>
      <div class="info">
        <span>
          如果你无法简洁的表达你的想法，那只说明你还不够了解它。
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: 'msginfo',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted() {
      this.initHeader()
    },
    methods: {
      ...mapMutations({
        updateHeader: 'UPDATE_HEADER'
      }),
      initHeader() {
        this.updateHeader({
          backText: '消息',
          showBack: true,
          title: '消息详情',
          backUrl: '/msg',
          showMsgtip: false,
          showRight: false,
          paddingTop: '45px'
        })
      }
    }
  }
</script>

<style>
  .msginfo {
    height: 100%;
  }

  .title {
    border: 1px solid #BBBBBB;
    height: 1.5rem;
    text-align: center;
    background: #fff;
    margin: .25rem;
  }

  .info {
    background: #fff;
    border: 1px solid #BBBBBB;
    margin: .25rem;
    padding: .5rem .4rem;
    font-size: .5rem;
  }
</style>
