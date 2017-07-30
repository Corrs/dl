<template>
  <div>
    <div class="checker">
      <checker v-model="day" default-item-class="check-item"
               selected-item-class="check-item-selected">
        <checker-item :value="item" v-for="(item, index) in category" :key="index">{{item.value}}</checker-item>
      </checker>
    </div>
    <div class="chart">
      <line-chart :height="160" :chart-data="datacollection" :options="options"></line-chart>
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
  import {Checker, CheckerItem, Group, Card, Cell} from 'vux'
  import {mapMutations} from 'vuex'
  import LineChart from '@/page/chart/LineChart'
  import {proxy,proxyChart} from '@/mock/proxy'

  export default {
    name: 'proxy',
    data () {
      return {
        datacollection: null,
        options: {
          scales: {
            yAxes: [{
              ticks: {
                display: false
              }
            }],
            xAxes: [{
              ticks: {
                fontColor: '#F5B7B3',
                maxRotation: 0
              },
              gridLines: {
                display: true
              }
            }]
          },
          legend: {
            display: false
          }
        },
        data: {},
        day: {
          key: 7,
          value: '7天'
        },
        category: [{
          key: 7,
          value: '7天'
        }, {
          key: 30,
          value: '30天'
        }, {
          key: 90,
          value: '90天'
        }]
      }
    },
    components: {
      Checker,
      CheckerItem,
      Group,
      Card,
      Cell,
      LineChart
    },
    mounted () {
      this.initHeader ()
      this.queryData ()
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
        let labels = Array(this.day.key)
        this.$axios.get('http://proxy-chart.cn').then(response=>{
          labels[0] = response.data.chartDateStart
          labels[this.day.key-1] = response.data.chartDateEnd
          this.datacollection = {
            labels: labels,
            datasets: [
              {
                fill: false,
                data: response.data.datas,
                borderColor: '#F5B7B3',
                borderWidth: 2,
                borderCapStyle: 'square'
              }
            ]
          }
        }).catch(error=>{

        })

      },
      queryData () {
        this.$axios.get ('http://proxy.cn').then (response => {
          this.data = response.data
        }).catch (error => {

        })
      }
    },
    watch: {
      day (val) {
        this.initChart ()
        this.queryData ()
      }
    }
  }
</script>

<style scoped>
  * {
    font-size: .7rem;
  }

  .checker {
    text-align: center;
    background-color: #EC6C64;
  }

  .check-item {
    padding: 5px 15px;
    color: #F1B4B2;
  }

  .check-item-selected {
    color: #FFFFFF;
  }

  .chart {
    max-width: 100%;
    height: 7rem;
    margin: 0 auto;
    background-color: #EB655B;
    padding: 1rem .3rem 0 .3rem;
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
    transform: rotate(90deg);
    -ms-transform: rotate(90deg); /* IE 9 */
    -moz-transform: rotate(90deg); /* Firefox */
    -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
    -o-transform: rotate(90deg); /* Opera */
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
