<template>
  <!--数据统计-->
  <div>
    <div class="panel">
      <p>累计总消费</p>
      <h4 v-text="consume"></h4>
    </div>
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
          <div class="content border-r">
            <span v-text="data.n_count"></span>
            <span v-text="day.key+'天消费'"></span>
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
  import {Checker, CheckerItem, Group, Card, Cell} from 'vux'
  import {mapMutations} from 'vuex'
  import LineChart from '@/page/chart/LineChart'
  import {data, dataChart} from '@/mock/statistics'

  export default {
    name: 'data',
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
        type: 'data', // 类型 data or room  数据统计 或 房卡购买统计
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
    computed: {
      consume () {
        let consume = this.data.consume
        return this.type == 'data' ? (consume ? consume.toFixed (2) : consume) : this.data.consume + '张'
      }
    },
    mounted () {
      this.type = this.$route.params.type
      this.initHeader ()
      this.initChart ()
      this.queryData ()
    },
    methods: {
      ...mapMutations ({
        updateHeader: 'UPDATE_HEADER'
      }),
      initHeader () {
        let title = this.type == 'data' ? '统计' : '房卡统计'
        this.updateHeader ({
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
        let labels = Array (this.day.key)
        this.$axios.get ('http://data-chart.cn').then (response => {
          labels[0] = response.data.chartDateStart
          labels[this.day.key - 1] = response.data.chartDateEnd
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
        }).catch (error => {

        })
      },
      getRandomInt () {
        return Math.floor (Math.random () * (50 - 5 + 1)) + 5
      },
      queryData () {
        this.$axios.get ('http://data.cn').then (response => {
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
    height: 2.5rem;
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
    /*margin-bottom: .5rem;*/
  }

  .panel p {
    font-weight: lighter;
  }

  .panel h4 {
    color: #FFFFFF;
  }
</style>
