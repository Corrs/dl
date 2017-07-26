<template>
  <div>
    <div class="charts">
      <div id="chart" class="chart"></div>
    </div>
    <div class="card">
      <card>
        <div slot="content">
          <div class="content border-r">
            <span v-text="data.n_count"></span>
            <span>7天消费</span>
          </div>
          <div class="content border-r">
            <span v-text="data.a_count"></span>
            <span>单日最高</span>
          </div>
          <div class="content">
            <span v-text="data.f_count"></span>
            <span>日均</span>
          </div>
        </div>
      </card>
    </div>
    <div>
      <group>
        <cell title="数据统计" link="/controlProxy"></cell>
      </group>
      <group>
        <cell title="消费排行" link="/consume"></cell>
      </group>
      <group>
        <cell title="业绩排行" link="/score"></cell>
      </group>
      <group>
        <cell title="房卡购买统计" link="/score"></cell>
      </group>
    </div>
  </div>
</template>

<script>
  import {Group, Card, Cell} from 'vux'
  import {mapMutations} from 'vuex'
  export default {
    name: 'statustics',
    data() {
      return {
        chartOptions: {
          title: [{
            show: false
          }],
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
          }]
        },
        data: {
          n_count: 0, // 新增用户数  new user
          a_count: 0, // 活跃用户数  active user
          f_count: 0, // 新增一级代理数
          s_count: 0, // 新增二级代理数
          c_count: 26 // 可升降级代理数
        }
      }
    },
    components: {
      Group,
      Card,
      Cell
    },
    mounted () {
      this.initHeader ()
      this.initChart ()
    },
    methods: {
      ...mapMutations({
        updateHeader: 'UPDATE_HEADER'
      }),
      initHeader() {
        this.updateHeader({
          backText: '返回',
          showBack: true,
          title: '统计',
          backUrl: '/',
          showMsgtip: false,
          showRight: false,
          paddingTop: '45px'
        })
      },
      initChart () {
        let chart = this.$echarts.init (document.getElementById ('chart'))
        chart.setOption (this.chartOptions)
      }
    }
  }
</script>

<style scoped>
  * {
    font-size: .7rem;
  }

  .chart {
    height: 10rem;
    width: 100%;
    background-color: #FFFFFF;
  }

  .card {
    width: 100%;
    height: 2.5rem;
    text-align: center;
  }

  hr {
    width: 80%;
    margin: 0 auto;
  }

  hr.vertical {
    width: 4.5rem;
    transform:rotate(90deg);
    -ms-transform:rotate(90deg); 	/* IE 9 */
    -moz-transform:rotate(90deg); 	/* Firefox */
    -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
    -o-transform:rotate(90deg); 	/* Opera */
  }

  .content {
    height: 2rem;
    width: 30%;
    display: inline-block;
    margin: .3rem auto;
  }

  .content span {
    color: #FFFFFF;
    display: block;
    font-size: .5rem;
  }

  span.default {
    color: #000000;
  }

  .weui-panel {
    background: #EA5147 !important;
  }

  .border-1px-r {
    border-right: none;
  }

  .border-r {
    border-right: 1px solid #FFFFFF;
  }

  .border-b {
    border-bottom: 1px solid #000000;
  }
</style>
