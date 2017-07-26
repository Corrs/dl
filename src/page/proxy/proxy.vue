<template>
  <div>
    <div class="charts">
      <div id="chart" class="chart"></div>
    </div>
    <div class="card">
      <card>
        <div slot="content">
          <div class="content">
            <span v-text="data.n_count"></span>
            <span>新增用户</span>
          </div>
          <div class="content">
            <span v-text="data.a_count"></span>
            <span>活跃用户</span>
          </div>
          <hr>
          <hr class="vertical">
          <div class="content">
            <span v-text="data.f_count"></span>
            <span>新增一级代理</span>
          </div>
          <div class="content">
            <span v-text="data.s_count"></span>
            <span>新增二级代理</span>
          </div>
        </div>
      </card>
    </div>
    <div>
      <group>
        <cell class="weui-cell" title="可升级或降级的代理" link="/controlProxy">
          <div slot="default">
            <span class="default" v-text="data.c_count"></span>
          </div>
        </cell>
      </group>
      <group>
        <cell title="下线列表" link="/offline"></cell>
      </group>
      <group>
        <cell title="添加代理" link="/appendProxy"></cell>
      </group>
    </div>
  </div>
</template>

<script>
  import {Group, Card, Cell} from 'vux'
  import {mapMutations} from 'vuex'

  export default {
    name: 'proxy',
    data () {
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
      ...mapMutations ({
        updateHeader: 'UPDATE_HEADER'
      }),
      initHeader () {
        this.updateHeader ({
          backText: '返回',
          showBack: true,
          title: '代理管理',
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
    height: 5rem;
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
    width: 45%;
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
    border-right: 1px solid #000000;
  }

  .border-b {
    border-bottom: 1px solid #000000;
  }

</style>
