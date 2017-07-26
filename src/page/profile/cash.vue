<template>
  <!--提现-->
  <div>
    <div v-if="show">
      <div class="panel">
        <p>累计提现金额（元）</p>
        <h4 v-text="data.total.toFixed(2)"></h4>
      </div>
      <div class="panel">
        <p>可用提现余额</p>
        <h4 v-text="data.over.toFixed(2)"></h4>
      </div>
      <div class="w-panel">
        <p><a @click="show=!show">申请提现</a></p>
      </div>
      <group>
        <cell class="weui-cell" link="/cash-list">
          <div slot="title">
            <span class="cell-title">历史提现记录</span>
          </div>
        </cell>
      </group>
    </div>
    <div v-if="!show">
      <group>
        <cell class="weui-cell" is-link>
          <div slot="title" class="title">
            <img :src="card.img" alt="">
            <div>
              <p v-text="card.bank"></p>
              <p>
                <span v-text="'尾号' + card.no.substr(-4)"></span>
                <span v-text="card.type"></span>
              </p>
            </div>
          </div>
        </cell>

        <group title="提现金额">
          <x-input title="￥" v-model.trim="cash"></x-input>
        </group>
        <cell class="weui-cell" :title="'可提现余额 ' + data.over + '元'">
          <div slot="default"><a @click="cash=data.over"><span style="color: #1c74d9">全部提现</span></a></div>
        </cell>
      </group>
      <div class="text" v-if="showTip">
        <p>每月可提现两次，每次最多可提现1000元，最少100元。每笔手续费0.5元</p>
      </div>
      <div class="btn">
        <a>
          <x-button>申请提现</x-button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import {Cell, Group, XInput, XButton} from 'vux'
  import {mapMutations} from 'vuex'

  export default {
    name: 'cash',
    data () {
      return {
        show: true,
        data: {
          total: 3125, // 累计提现金额
          over: 7000   // 可用提现余额
        },
        card: {
          bank: '中国工商银行', // 开户行
          no: '1111111111111111689',   // 卡号
          type: '储蓄卡', // 卡类型
          img: '..'   // 银行logo
        },
        cash: 0
      }
    },
    components: {
      Cell,
      Group,
      XInput,
      XButton
    },
    computed: {
      showTip() {
        return this.cash == 0 || this.cash == ''
      }
    },
    mounted () {
      this.initHeader ()
    },
    methods: {
      ...mapMutations ({
        updateHeader: 'UPDATE_HEADER'
      }),
      initHeader () {
        this.updateHeader ({
          backText: '返回',
          showBack: true,
          title: '提现',
          backUrl: '/',
          showMsgtip: false,
          showRight: true,
          paddingTop: '45px',
          rightType: 'question'
        })
      }
    }
  }
</script>

<style scoped>
  * {
    font-size: .7rem;
  }

  .panel {
    background: #EA5147;
    text-align: center;
    margin-bottom: .5rem;
  }

  .panel p {
    font-weight: lighter;
  }

  .panel h4 {
    color: #FFFFFF;
  }

  .w-panel {
    background: #FFFFFF;
    text-align: center;
    height: 2rem;
    line-height: 2rem;
  }

  .w-panel a {
    color: #9482D2 !important;
    text-decoration: underline;
  }

  img {
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 20%;
  }

  .title div {
    display: inline-block;
    height: 2rem;
    padding-left: 2.3rem;
  }

  .title div span {
    margin-right: .3rem;
  }

  .text {
    background: transparent;
    margin-top: .5rem;
    padding: 0 .5rem;
    font-size: .7rem;
    color: #888888;
  }

  .btn {
    margin: 1rem .5rem .5rem .5rem;
  }

  button {
    background-color: #1B82D2;
    height: 1.5rem;
    line-height: 1.5rem;
    color: #FFFFFF;
    font-size: .7rem;
  }
</style>
