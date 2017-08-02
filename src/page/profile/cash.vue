<template>
  <!--提现-->
  <div>
    <div v-if="show">
      <div class="panel">
        <p>累计提现金额（元）</p>
        <h4 v-text="data.total"></h4>
      </div>
      <div class="panel">
        <p>可用提现余额</p>
        <h4 v-text="data.cash"></h4>
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
        <div class="card-info" @click="showCards=!showCards" >
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
        </div>
        <group title="提现金额">
          <x-input title="￥" placeholder="输入大于0的提现金额"  v-model="cash" ></x-input>
        </group>
        <cell class="weui-cell" :title="'可提现余额 ' + data.cash + '元'">
          <div slot="default"><a @click="cash=data.cash"><span style="color: #1c74d9">全部提现</span></a></div>
        </cell>
      </group>
      <div class="text" v-if="showTip">
        <p>每月可提现两次，每次最多可提现1000元，最少100元。每笔手续费0.5元</p>
      </div>
      <div class="btn">
        <a>
          <x-button @click.native="apply">申请提现</x-button>
        </a>
      </div>
      <x-dialog v-model="showValid" :scroll="false" hide-on-blur>
        <phone-valid ref="phoneValid" @hide="hideValid"></phone-valid>
      </x-dialog>
    </div>
    <toast v-model="showToast" type="text" :time="800" width="20em" is-show-mask :text="ToastMsg" position="middle"></toast>

    <div v-transfer-dom>
      <popup v-model="showCards" position="bottom" max-height="80%">
        <!--<div class="search">
          <group>
            <x-input placeholder="输入昵称" v-model="search" :show-clear="false">
              <div slot="right">
                <a @click="onSearch"><i class="fa fa-search"></i></a>
              </div>
            </x-input>
          </group>
        </div>-->
        <div class="bank-card">
          <div class="card" @click="selectCard(item)" v-for="(item, index) in cardItems" :key="index">
            <group>
              <card>
                <div slot="content">
                  <div class="left">
                    <img :src="item.img" alt="">
                  </div>
                  <div class="content">
                    <p v-text="item.bank"></p>
                    <p class="type" v-text="item.type"></p>
                    <p class="no">
                      <span v-for="i in item.c" :key="i">****</span>
                      <span class="suffix" v-text="item.suffix"></span>
                    </p>
                  </div>
                </div>
              </card>
            </group>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import {TransferDom, Popup, Card, Cell, Group, XInput, XButton, XDialog, Toast} from 'vux'
  import PhoneValid from '@/components/common/PhoneValid'
  import {mapMutations} from 'vuex'
  import {cash, bankCard} from '@/mock/profile'

  export default {
    name: 'cash',
    directives: {
      TransferDom
    },
    data () {
      return {
        show: true,
        showValid: false,
        showCards: false,
        data: {},
        card: {},
        cash: 0,
        showToast: false,
        ToastMsg: '',
        datas: []
      }
    },
    components: {
      Popup,
      Card,
      Cell,
      Group,
      XInput,
      XButton,
      XDialog,
      PhoneValid,
      Toast
    },
    computed: {
      showTip () {
        return this.cash == 0 || this.cash == ''
      },
      cardItems () {
        return this.datas.map (function (currentValue, index, array) {
          let i = parseInt(currentValue.no.length % 4)
          let count = parseInt(currentValue.no.length / 4)
          let suffix = ''
          if (i == 0) {
            suffix = currentValue.no.substr (-4)
            currentValue.c = count - 1;
          } else {
            suffix = currentValue.no.substr (0 - i)
            currentValue.c = count;
          }
          currentValue.suffix = suffix
          return currentValue
        })
      }
    },
    mounted () {
      this.initHeader ()
      this.queryData ()
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
      },
      queryData () {
        this.$axios.get ('http://cash.cn').then (response => {
          console.log (response)
          this.data = response.data.data
          this.card = response.data.card
        }).catch (error => {

        })

        this.$axios.get ('http://bankCard.cn').then (response => {
          console.log (response)
          this.datas = response.data.datas
        }).catch (error => {

        })
      },
      apply() {
        if (!(/^\d+(\.\d{1,2})?$/.test(this.cash)) || this.cash <= 0) {
          this.showToast = true
          this.ToastMsg = '提现金额必须为大于0的数字，小数最多保留两位小数'
          return
        } else if (this.cash > this.data.cash) {
          this.showToast = true
          this.ToastMsg = '提现金额超出余额'
          return
        }
        this.showValid=!this.showValid
      },
      hideValid() {
        this.$router.push('/cash-list')
        this.showValid=!this.showValid
      },/*
      changeCard() {
        console.log('更改银行卡')
      },*/
      selectCard(item) {
        console.log(item)
        this.card = item
        this.showCards = !this.showCards
      }
    },
    watch: {
      // 监测是否显示手机验证 重置子页面中的dialogShow
      showValid(value) {
        this.$refs.phoneValid.dialogShow = false
        this.$refs.phoneValid.validCode = ''
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

  .left {
    height: 4rem;
    float: left;
    padding-left: 1rem;
    padding-right: .5rem;
  }

  .content {
    height: 4rem;
    padding-top: .6rem;
    padding-left: 3.5rem;
  }

  p.type {
    font-size: .6rem;
    color: #BEBEBE;
  }

  span {
    margin-right: .5rem;
    line-height: 1rem;
  }

  .suffix {
    font-size: 1rem;
  }

</style>
