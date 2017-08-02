<template>
  <div class="msginfo">
    <div class="content">
      <!--系统信息详情-->
      <div v-if="params.type==1">
        <div class="title">
          <h5 v-text="system.title"></h5>
        </div>
        <div class="info">
          <span v-text="system.content"></span>
        </div>
      </div>
      <!--提现信息详情-->
      <div v-else-if="params.type==2">
        <div class="title">
          <h5 v-text="cash.title"></h5>
        </div>
        <div class="info" @click="$router.push('/cash-list')">
          <card>
            <div slot="content" class="cashInfo">
              <p>
                <img :src="cash.img" alt="">
              </p>
              <p>
                <span v-text="cash.bank"></span>
              </p>
              <p>
                <span style="font-size: 1rem; font-weight: bold;" v-text="cash.money"></span>
              </p>
              <p>
                <span v-text="cash.state"></span>
              </p>
            </div>
          </card>
          <group>
            <cell title="提现说明" :value="cash.remark"></cell>
            <cell title="提现到" :value="cash.bank+'('+cash.no+') '+cash.name"></cell>
            <cell title="提交时间" :value="cash.submit"></cell>
            <cell title="编号" :value="cash.id"></cell>
          </group>
        </div>
        <div class="bottom">
          <a @click="show=!show">
            <span>对此单有疑问？联系客服</span>
          </a>
        </div>
        <!--<confirm v-model="show"
                 title="确认拨打电话"
                 close-on-confirm>
          <p class="confirm-content">
            <img src="../../images/icon/call.png" alt="">
            <span v-text="cash.phone"></span>
          </p>
        </confirm>-->
        <x-dialog v-model="show" :scroll="false" hide-on-blur>
          <div class="dialog">
            <div class="dialog-content">
              <p class="dialog-title">确认拨打电话</p>
              <p class="confirm-content">
                <img src="../../images/icon/call.png" alt="">
                <span v-text="systemInfo.ch"></span>
              </p>
            </div>
            <hr>
            <div class="cancel">
              <a @click="show=!show">
                <span>取消</span>
              </a>
            </div>
            <div class="confirm">
              <a :href="'tel://'+systemInfo.ch">
                <span>确定</span>
              </a>
            </div>
          </div>
        </x-dialog>
      </div>
      <!--新增用户信息详情-->
      <div v-else-if="params.type==3">
        <div class="title">
          <h5 v-text="newProxy.title"></h5>
        </div>
        <div class="info">
          <group>
            <cell title="一级代理新增" :value="newProxy.f_proxy"></cell>
            <cell title="二级代理新增" :value="newProxy.s_proxy"></cell>
            <cell title="普通用户新增" :value="newProxy.n_user"></cell>
          </group>
        </div>
        <div class="bottom">
          <a @click="$router.push('/offline')">
            <span>去看看</span>
          </a>
        </div>
      </div>
      <!--可升降级代理信息详情-->
      <div v-else>
        <div class="title">
          <h5 v-text="controlProxy.title"></h5>
        </div>
        <div class="info">
          <group>
            <cell title="可升级一级代理" :value="controlProxy.up_f"></cell>
            <cell title="可降级一级代理" :value="controlProxy.down_f"></cell>
            <cell title="可升级二级代理" :value="controlProxy.up_s"></cell>
            <cell title="可降级二级代理" :value="controlProxy.down_s"></cell>
          </group>
        </div>
        <div class="bottom">
          <a @click="$router.push('/controlProxy')">
            <span>去看看</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Card, Cell, Group, Confirm, XDialog} from 'vux'
  import {mapMutations, mapState} from 'vuex'
  import {cashmsg, controlProxyMsg, newProxyMsg, systemMsg} from '@/mock/msg'

  export default {
    name: 'msginfo',
    data () {
      return {
        system: {},
        cash: {},
        newProxy: {},
        controlProxy: {},
        params: {
          id: '',
          type: 1 // 默认系统消息 1系统消息 2提现消息 3新增代理（用户） 4可升降级
        },
        show: false
      }
    },
    components: {
      Card,
      Cell,
      Group,
      Confirm,
      XDialog
    },
    computed: {
      ...mapState({
        systemInfo: state => state.system
      })
    },
    mounted () {
      this.params.id = this.$route.params.id
      this.params.type = this.$route.params.type
      this.initHeader ()
      this.initFotter ()
      this.queryData ()
    },
    methods: {
      ...mapMutations ({
        updateHeader: 'UPDATE_HEADER',
        updateShowFotter: 'UPDATE_SHOW_FOTTER'
      }),
      initHeader () {
        this.updateHeader ({
          backText: '消息',
          showBack: true,
          title: '消息详情',
          backUrl: '/msg',
          showMsgtip: false,
          showRight: false,
          paddingTop: '45px'
        })
      },
      initFotter () {
        this.updateShowFotter ({
          isShowFotter: false
        })
      },
      queryData () {
        let url = 'http://cash-msg.cn'
        if (this.params.type == 1) {url = 'http://sys-msg.cn'}
        else if (this.params.type == 2) {url = 'http://cash-msg.cn'}
        else if (this.params.type == 3) {url = 'http://new-proxy-msg.cn'}
        else {url = 'http://control-proxy-msg.cn'}

        this.$axios.get (url).then (response => {
          console.log(response.data)
          this.system = this.newProxy = this.controlProxy = this.cash = response.data
        }).catch (error => {

        })
      }
    }
  }
</script>

<style scoped>
  * {
    font-size: .7rem;
  }

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

  .bottom {
    width: 100%;
    text-align: center;
  }

  .bottom span {
    text-decoration: underline;
    color: #1c74d9;
  }

  .cashInfo {
    padding: .3rem auto;
  }

  .cashInfo p {
    text-align: center;
  }

  img {
    width: 2rem;
    height: 2rem;
  }

  .confirm-content {
    text-align: center;
    padding-top: .3rem
  }

  .confirm-content img {
    width: 1rem;
    height: 1rem;
  }

  .confirm-content span {
    font-size: 1rem;
    color: #000;
  }

  p.dialog-title {
    font-size: 1rem;
    font-weight: bold;
  }

  .cancel {
    float: left;
    width: 50%;
    text-align: center;
    height: 1.8rem;
    line-height: 1.8rem;
    border-right: 1px solid #9A9A9A;
  }

  .cancel span {
    color: #9A9A9A;
  }

  .confirm {
    text-align: center;
    line-height: 1.8rem;
  }

  .confirm span {
    color: #1c74d9;
  }

  .dialog-content {
    height: 4rem;
  }

  a {
    display: block;
    width: 100%;
  }
</style>
