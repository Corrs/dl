<template>
  <!--提现记录-->
  <div>
    <div>
      <group v-for="(item, index) in datas" :key="index">
        <div @click="item.show = !item.show">
          <cell class="weui-cell">
            <div slot="title" class="title">
              <span v-text="item.apply.substr(0, 10)"></span>
              <span v-text="item.money.toFixed(2)"></span>
              <span v-text="item.state"></span>
            </div>
            <div slot="default" class="default">
              <a><span>详情</span></a>
            </div>
          </cell>
        </div>
        <card v-if="item.show">
          <div slot="content">
            <div class="content">
              <p class="left" v-text="'申请编号：' + item.id"></p>
              <p class="right" v-text="'申请时间：' + item.apply"></p>
              <div class="clear"></div>
            </div>
            <div class="content">
              <p class="left" v-text="'银行卡：' + item.bank + '(' + item.no.substr(-4) + ')'"></p>
              <p class="right" v-text="'审核时间：' + item.verify"></p>
              <div class="clear"></div>
            </div>
            <div class="content">
              <p v-text="'状态：' + item.state"></p>
            </div>
            <div class="content">
              <p v-text="'原因：' + item.reason"></p>
            </div>
          </div>
        </card>
      </group>
    </div>
  </div>
</template>

<script>
  import {Cell, Group, Scroller, LoadMore, Card} from 'vux'
  import {mapMutations} from 'vuex'

  export default {
    name: 'cash-list',
    data () {
      return {
        datas: []
      }
    },
    components: {
      Cell,
      Group,
      Scroller,
      LoadMore,
      Card
    },
    mounted () {
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
          backText: '返回',
          showBack: true,
          title: '提现记录',
          backUrl: '/',
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
        this.$axios.get ('http://cashList.cn').then (response => {
          this.datas = response.data.datas
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

  .title span {
    width: 30%;
    display: inline-block;
    text-align: center;
  }

  .default span {
    color: #1c74d9;
    text-decoration: underline;
  }

  p {
    font-size: .6rem;
    padding: .1rem;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .clear {
    clear: both;
  }
</style>
