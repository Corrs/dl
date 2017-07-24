<template>
  <!--佣金（回扣）规则-->
  <div>
    <div class="text">
      <p>佣金总百分比占消费总数百分比的60%</p>
      <p>县代占15%</p>
      <p>一代占15%</p>
      <p>二代占35%</p></div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    name: 'rebate',
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
          title: '佣金规则',
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
