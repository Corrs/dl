<template>
  <div>
    <div style="overflow: hidden">
        <div class="box2">
          <div class="card">
            <card>
              <div slot="content">
                <img :src="user.img" alt="">
                <div>
                  <span v-text="user.name"></span>
                  <span class="type" v-text="user.type"></span>
                </div>
              </div>
            </card>
          </div>
          <group>
            <cell class="weui-cell" title="可提现余额" value="3125.00元" link="/cash">
              <img class="icon" src="../../images/icon/cash2.png" slot="icon" alt="">
            </cell>
          </group>
          <group>
            <cell class="weui-cell" title="身份证" value="已绑定" link="/component/radio">
              <img class="icon" src="../../images/icon/id_card.png" slot="icon" alt="">
            </cell>
            <cell class="weui-cell" title="手机号" value="189****6689" link="/component/radio">
              <img class="icon" src="../../images/icon/phone.png" slot="icon" alt="">
            </cell>
            <cell class="weui-cell" title="银行卡" value="未绑定" link="/component/radio">
              <img class="icon" src="../../images/icon/bank_card.png" slot="icon" alt="">
            </cell>
            <cell class="weui-cell" title="推广" link="/spread">
              <img class="icon" src="../../images/icon/qr_code.png" slot="icon" alt="">
            </cell>
            <cell class="weui-cell" title="联系客服" link="/contact">
              <img class="icon" src="../../images/icon/contact.png" slot="icon" alt="">
            </cell>
            <cell class="weui-cell" title="佣金规则" link="/rebate">
              <img class="icon" src="../../images/icon/question.png" slot="icon" alt="">
            </cell>
            <cell class="weui-cell" title="代理升降级规则" link="/proxyLift">
              <img class="icon" src="../../images/icon/question.png" slot="icon" alt="">
            </cell>
          </group>
        </div>
    </div>
  </div>
</template>

<script>
  import {Card, Scroller, Cell, Group} from 'vux'
  import {mapMutations} from 'vuex'

  export default {
    name: 'profile',
    components: {
      Card,
      Scroller,
      Cell,
      Group
    },
    data() {
      return {
        user: {
          img: require('../../images/person/person.png'),
          name: '我是你爸爸',
          type: '区域代理'
        }
      }
    },
    computed: {
      /*height() {
        return (window.document.body.clientHeight - 140) + 'px'
      }*/
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
          backText: '返回',
          showBack: true,
          title: '',
          backUrl: '/',
          showMsgtip: true,
          showRight: false,
          paddingTop: '80px'
        })
      }
    }
  }
</script>

<style scoped>
  .card {
    background: #1B82D2;
    text-align: center;
    color: #fff;
  }

  .weui-panel {
    background: transparent !important;
  }

  .grid {
    background: #fff;
    margin-top: .5rem;
  }

  img {
    width: 3.75rem;
    height: 3.75rem;
    margin-top: .3rem;
  }

  img.icon {
    width: 1.5rem;
    height: 1.5rem;
    margin: .5rem .3rem .3rem .3rem;
  }

  div {
    margin: 0;
    padding: 0;
  }

  span {
    display: block;
    font-size: .7rem;
    margin-top: -0.2rem;
  }

  .type {
    color: #A3CDED;
  }

</style>
