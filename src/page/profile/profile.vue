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
                <span class="type" v-text="user.proxy"></span>
              </div>
            </div>
          </card>
        </div>
        <group>
          <cell class="weui-cell" title="可提现余额" :value="formatData.cash+'元'" :link="'/cash'">
            <img class="icon" src="../../images/icon/cash2.png" slot="icon" alt="">
          </cell>
        </group>
        <group>
          <cell class="weui-cell" title="身份证" :value="formatData.person_bind" link="/person">
            <img class="icon" src="../../images/icon/id_card.png" slot="icon" alt="">
          </cell>
          <cell class="weui-cell" title="手机号" :value="formatData.phone.substr(0,3)+'****'+formatData.phone.substr(-4)" :link="'/phone/'+formatData.phone.substr(0,3)+'****'+formatData.phone.substr(-4)">
            <img class="icon" src="../../images/icon/phone.png" slot="icon" alt="">
          </cell>
          <cell class="weui-cell" title="银行卡" :value="formatData.bank_bind" link="/bankCard">
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
  import {Card, Cell, Group} from 'vux'
  import {mapMutations, mapState} from 'vuex'
  import {profile} from '@/mock/profile'

  export default {
    name: 'profile',
    components: {
      Card,
      Cell,
      Group
    },
    data () {
      return {
        data: {}
      }
    },
    computed: {
      ...mapState ({
        user: state => state.user
      }),
      formatData() {
        console.log()
        this.data.phone = '' + this.data.phone
        return this.data
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
          title: '',
          backUrl: '/',
          showMsgtip: true,
          showRight: false,
          paddingTop: '80px'
        })
      },
      queryData () {
        this.$axios.get ('http://profile.cn').then (response => {
          console.log(response)
          this.data = response.data
        }).catch (error => {

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
    border-radius: 5rem;
  }

  img.icon {
    width: 1.5rem;
    height: 1.5rem;
    margin: .5rem .3rem .3rem .3rem;
    border-radius: 0;
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
