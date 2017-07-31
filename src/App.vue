<template>
  <div style="height:100%;">
    <div class="loading">
      <div v-transfer-dom>
        <loading v-model="isLoading"></loading>
      </div>
    </div>
    <view-box ref="viewBox" :body-padding-top="headerConfig.paddingTop" body-padding-bottom="50px" :key="key">
      <top-bar slot="header" :backText="headerConfig.backText" :showBack="headerConfig.showBack"
               :title="headerConfig.title" :backUrl="headerConfig.backUrl" :showMsgtip="headerConfig.showMsgtip">
        <a slot="rightContent" v-if="headerConfig.showRight">
          <i class="fa fa-plus" @click="appendProxy" v-if="headerConfig.rightType == 'appendProxy'"></i>
          <i class="fa fa-plus" @click="appendBankCard" v-if="headerConfig.rightType == 'appendBankCard'"></i>
          <i class="fa fa-question-circle-o" v-if="headerConfig.rightType == 'question'"></i>
        </a>
      </top-bar>
      <!--<transition name="vux-pop-in">
        <router-view></router-view>
      </transition>-->
      <router-view :key="key"></router-view>
      <bar slot="bottom" v-if="isShowFotter"></bar>
    </view-box>
  </div>
</template>

<script>
  import {ViewBox, Loading, TransferDomDirective as TransferDom } from 'vux'
  import bar from './components/footer/footer.vue'
  import {mapState} from 'vuex'

  export default {
    name: 'App',
    directives: {
      TransferDom
    },
    components: {
      bar,
      ViewBox,
      Loading
    },
    computed: {
      ...mapState ({
        isShowFotter: state => state.isShowFotter,
        headerConfig: state => state.headerConfig,
        isLoading: state => state.isLoading
      }),
      key() {
        let now = new Date()
        console.log(this.$route.path+'-'+now.getTime())
        return this.$route.path+'-'+now.getTime()
      }
    },
    methods: {
      appendProxy() {
        this.$router.push('/appendProxy')
      },
      appendBankCard() {
        this.$router.push('/appendBankCard')
      }
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

  .loading {
    z-index: 99999999999999999999;
  }

  i {
    font-size: 1rem !important;
  }
</style>
