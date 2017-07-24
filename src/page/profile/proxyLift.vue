<template>
  <div>
    <div class="text">
      <p>客户留存15%</p>
      <p>活跃度15%</p>
      <p>销售额40%</p>
      <p>新增用户30%</p>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    name: 'proxy-lift',
    data () {
      return {}
    },
    mounted () {
      this.initHeader ()
      this.initFotter ()
    },
    methods: {
      ...mapMutations ({
        updateHeader: 'UPDATE_HEADER',
        updateShowFotter: 'UPDATE_SHOW_FOTTER'
      }),
      initHeader () {
        this.updateHeader ({
          backText: '我的',
          showBack: true,
          title: '代理升降级规则',
          backUrl: '/profile',
          showMsgtip: false,
          showRight: false,
          paddingTop: '45px'
        })
      },
      initFotter () {
        this.updateShowFotter ({
          isShowFotter: false
        })
      }
    }
  }
</script>

<style scoped>
  .text {
    background: #FFFFFF;
    margin-top: .5rem;
    padding: 0;
    font-size: .7rem;
    text-indent: .3rem;
  }
</style>
