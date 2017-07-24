<template>
  <div style="height:100%;">
    <view-box ref="viewBox" :body-padding-top="headerConfig.paddingTop" body-padding-bottom="50px">
      <top-bar slot="header" :backText="headerConfig.backText" :showBack="headerConfig.showBack"
               :title="headerConfig.title" :backUrl="headerConfig.backUrl" :showMsgtip="headerConfig.showMsgtip">
        <a slot="rightContent" v-if="headerConfig.showRight">
          <i class="fa fa-plus"></i>
        </a>
      </top-bar>
      <transition name="vux-pop-in">
        <router-view></router-view>
      </transition>
      <bar slot="bottom" v-if="isShowFotter"></bar>
    </view-box>
  </div>
</template>

<script>
  import {ViewBox} from 'vux'
  import bar from './components/footer/footer.vue'
  import {mapState} from 'vuex'

  export default {
    name: 'App',
    components: {
      bar,
      ViewBox
    },
    computed: {
      ...mapState ({
        isShowFotter: state => state.isShowFotter,
        headerConfig: state => state.headerConfig
      })
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  body {
    background-color: #EAEEEF;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

</style>
