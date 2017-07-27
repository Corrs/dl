<template>
  <!--用户详情-->
  <div>
    <div>
      <div class="panel">
        <div v-if="type=='data'">
          <p>消费金额（元）</p>
          <h4 v-text="data.consume.toFixed(2)"></h4>
        </div>
        <div v-else>
          <p>消费数量</p>
          <h4 v-text="room.consume+'张'"></h4>
        </div>
      </div>
      <div class="default">
        <div class="left"><span v-text="dateTip+':'"></span></div>
        <div class="right" v-if="date=='day'">
          <div>
            <datetime v-model="start" :readonly="false" @on-change="change"></datetime>
          </div>
        </div>
        <div class="right" v-else-if="date=='week'">
          <div>
            <datetime v-model="start" :readonly="false" @on-change="change"></datetime>
          </div>

          <div>
            <datetime v-model="end" :readonly="false" @on-change="change"></datetime>
          </div>
        </div>
        <div class="right" v-else>
          <div>
            <datetime format="YYYY-MM" v-model="start" :readonly="false" @on-change="change"></datetime>
          </div>
        </div>
      </div>
      <group v-if="type=='data'">
        <x-table>
          <tbody>
          <tr>
            <td>
              <p>消费人数</p>
              <p v-text="data.consume_no"></p>
            </td>
            <td>
              <p>新增一级代理数</p>
              <p v-text="data.f_no"></p>
            </td>
          </tr>
          <tr>
            <td>
              <p>新增二级代理数</p>
              <p v-text="data.s_no"></p>
            </td>
            <td>
              <p>新增用户数</p>
              <p v-text="data.user_no"></p>
            </td>
          </tr>
          <tr>
            <td>
              <p>新增用户消费率</p>
              <p v-text="data.n_u_no"></p>
            </td>
            <td>
              <p>老用户消费率</p>
              <p v-text="data.o_u_no"></p>
            </td>
          </tr>
          <tr>
            <td>
              <p>新用户活跃度</p>
              <p v-text="data.n_a_no"></p>
            </td>
            <td>
              <p>老用户活跃度</p>
              <p v-text="data.o_a_no"></p>
            </td>
          </tr>
          <tr>
            <td>
              <p>老用户留存率</p>
              <p v-text="data.o_s_no"></p>
            </td>
            <td>
              <p>房卡购买总数</p>
              <p v-text="data.r_no"></p>
            </td>
          </tr>
          </tbody>
        </x-table>
      </group>
      <group v-else>
        <x-table>
          <tbody>
          <tr>
            <td>
              <p>直客消费</p>
              <p v-text="room.direct+'张'"></p>
            </td>
            <td>
              <p>一二代消费</p>
              <p v-text="room.proxy+'张'"></p>
            </td>
          </tr>
          <tr>
            <td>
              <p>一代消费</p>
              <p v-text="room.f_proxy+'张'"></p>
            </td>
            <td>
              <p>二代消费</p>
              <p v-text="room.s_proxy+'张'"></p>
            </td>
          </tr>
          </tbody>
        </x-table>
      </group>
    </div>
  </div>
</template>

<script>
  import {Group, Card, Cell, Datetime, XTable} from 'vux'
  import {mapMutations} from 'vuex'

  export default {
    name: 'data-info',
    data () {
      return {
        data: {
          consume: 8668, // 累计消费金额
          down_consume: 9999, // 下线累计消费金额
          total: 3125, // 累计提现金额
          brokerage: 7000,   // 累计佣金金额
          user_no: 1, // 新增用户数
          consume_no: 0, // 消费人数
          f_no: 0, // 新增一级代理数
          s_no: 0, // 新增二级代理数
          n_u_no: 0, // 新增用户消费率
          o_u_no: 0, // 老用户消费率
          n_a_no: 0, // 新用户活跃度
          o_a_no: 0, // 老用户活跃度
          o_s_no: 0, // 老用户留存率
          r_no: 0 // 房卡购买总数
        },
        room: {
          consume: 0,
          direct: 0,
          proxy: 500,
          f_proxy: 300,
          s_proxy: 200
        },
        start: '2020-07-23',
        end: '2017-07-09',
        type: 'data',
        date: 'day'
      }
    },
    components: {
      Group,
      Card,
      Cell,
      Datetime,
      XTable
    },
    computed: {
      dateTip () {
        switch (this.date) {
          case 'day':
            return '自然日'
          case 'week':
            return '自然周'
          case 'month':
            return '自然月'
        }
      }
    },
    mounted () {
      this.type = this.$route.params.type
      this.date = this.$route.params.date
      console.log (this.$route.params.type, this.$route.params.date)
      this.initHeader ()
      this.initFotter ()
    },
    methods: {
      ...mapMutations ({
        updateHeader: 'UPDATE_HEADER',
        updateShowFotter: 'UPDATE_SHOW_FOTTER'
      }),
      initHeader () {
        let title = ''
        switch (this.date) {
          case 'day':
            title = '每日统计'
            break
          case 'week':
            title = '每周统计'
            break
          case 'month':
            title = '每月统计'
            break
        }
        this.updateHeader ({
          backText: '返回',
          showBack: true,
          title: title,
          backUrl: '/data-statistics/' + this.type,
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
      change (value) {

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

  .default {
    background-color: #FFFFFF;
    height: 2rem;
    position: relative;
  }

  .default div {
    display: inline-block;
  }

  .default .left {
    padding-left: .2rem;
  }

  .default .right {
    float: right;
  }

  .default span {
    display: inline-block;
    height: 2rem;
    line-height: 2rem;
  }

  td {
    width: 50%;
    text-align: left;
    padding-left: .2rem;
  }

  td > p {
    text-align: left;
    padding-left: .2rem;
    height: 1.5rem;
    margin: 0;
  }
</style>
