<template>
  <div>
    <div class="card">
      <card>
        <div slot="content">
          <h4 class="font-black">今日消费金额（元）</h4>
          <h4>75123.00</h4>
          <div class="card-demo-flex card-demo-content01">
            <div class="border-1px-r">
              新增用户
              <br/>
              <span>1130</span>
            </div>
            <div class="border-1px-r">
              新增一级代理
              <br/>
              <span>15</span>
            </div>
            <div>
              新增二级代理
              <br/>
              <span>0</span>
            </div>
          </div>
        </div>
      </card>
    </div>
    <div class="grid">
      <grid>
        <grid-item link="/controlProxy" label="代理升降级">
          <img slot="icon" src="../../images/icon/proxy2.png">
          <span slot="label">代理升降级</span>
        </grid-item>
        <grid-item :link="{ path: '/cash'}" label="提现管理">
          <img slot="icon" src="../../images/icon/cash.png">
          <span slot="label">提现管理</span>
        </grid-item>
        <grid-item link="/bankCard" label="银行卡管理">
          <img slot="icon" src="../../images/icon/card.png">
          <span slot="label">银行卡管理</span>
        </grid-item>
        <grid-item link="/Statistics" label="数据统计">
          <img slot="icon" src="../../images/icon/statistics.png">
          <span slot="label">数据统计</span>
        </grid-item>
        <grid-item :link="{ path: '/consume'}" label="消费排行榜">
          <img slot="icon" src="../../images/icon/ranking.png">
          <span slot="label">消费排行榜</span>
        </grid-item>
        <grid-item link="/score" label="业绩排行榜">
          <img slot="icon" src="../../images/icon/ranking.png">
          <span slot="label">业绩排行榜</span>
        </grid-item>
      </grid>
    </div>
  </div>
</template>

<script>
  import {Divider, Card, Grid, GridItem} from 'vux'
  import {mapMutations} from 'vuex'
  export default {
    components: {
      Card,
      Divider,
      Grid,
      GridItem
    },
    data() {
      return {
        msg: '我是你爸爸-区域代理'
      }
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
          showBack: false,
          title: this.msg,
          backUrl: '/',
          showMsgtip: true,
          showRight: true,
          paddingTop: '80px',
          rightType: 'appendProxy'
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

  .card-demo-flex {
    display: flex;
  }

  .card-demo-content01 {
    padding: .5rem 0;
  }

  .card-padding {
    padding: .75rem;
  }

  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: .6rem;
  }

  .weui-panel {
    background: transparent !important;
  }

  .grid {
    background: #fff;
    margin-top: .5rem;
  }

  /*img {
    width: 1.8rem !important;
    height: 1.8rem !important;
    margin-bottom: .4rem;
  }*/

  .font-black {
    color: #000;
    font-weight: lighter;
    font-size: .8rem;
    padding-top: .2rem;
  }
</style>
