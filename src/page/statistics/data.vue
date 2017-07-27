<template>
  <!--数据统计-->
  <div>
    <div class="panel">
      <p>累计总消费</p>
      <h4 v-text="consume"></h4>
    </div>
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
            <span v-text="data.d_most"></span>
            <span>单日最高</span>
          </div>
          <div class="content">
            <span v-text="data.d_count"></span>
            <span>日均</span>
          </div>
        </div>
      </card>
    </div>
    <div>
      <group>
        <cell title="每日统计" :link="'/data-info/'+type+'/day'"></cell>
      </group>
      <group>
        <cell title="每周统计" :link="'/data-info/'+type+'/week'"></cell>
      </group>
      <group>
        <cell title="每月统计" :link="'/data-info/'+type+'/month'"></cell>
      </group>
    </div>
  </div>
</template>

<script>
  import {Group, Card, Cell} from 'vux'
  import {mapMutations} from 'vuex'
  export default {
    name: 'data',
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
          consume: 0, // 总消费
          n_count: 0, // n天消费
          d_most: 0, // 单日最高
          d_count: 0 // 日均
        },
        type: 'data' // 类型 data or room  数据统计 或 房卡购买统计
      }
    },
    components: {
      Group,
      Card,
      Cell
    },
    computed: {
      consume() {
        return this.type == 'data' ? this.data.consume.toFixed(2) : this.data.consume + '张'
      }
    },
    mounted () {
      this.type = this.$route.params.type
      this.initHeader ()
      this.initChart ()
    },
    methods: {
      ...mapMutations({
        updateHeader: 'UPDATE_HEADER'
      }),
      initHeader() {
        let title = this.type == 'data' ? '统计' : '房卡统计'
        this.updateHeader({
          backText: '主页',
          showBack: true,
          title: title,
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
</style>
