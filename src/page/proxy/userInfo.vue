<template>
  <!--用户详情-->
  <div>
    <div>
      <div class="panel">
        <p>累计消费金额（元）</p>
        <h4 v-text="data.consume"></h4>
      </div>
      <div class="panel">
        <p>下线累计消费金额（元）</p>
        <h4 v-text="data.down_consume"></h4>
      </div>
      <div class="panel">
        <p>累计佣金金额（元）</p>
        <h4 v-text="data.brokerage"></h4>
      </div>
      <div class="panel">
        <p>累计提现金额（元）</p>
        <h4 v-text="data.total"></h4>
      </div>
      <div class="default">
        <div class="left"><span>时间</span></div>
        <div class="right">
          <div>
            <datetime v-model="start" :readonly="false" @on-change="change"></datetime>
          </div>

          <div>
            <datetime v-model="end" :readonly="false" @on-change="change"></datetime>
          </div>
        </div>
      </div>

      <group>
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
              <p>下线二级代理总人数</p>
              <p v-text="data.d_s_no"></p>
            </td>
          </tr>
          <tr>
            <td>
              <p>下线普通用户总人数</p>
              <p v-text="data.d_n_no"></p>
            </td>
            <td>
              <p>上线邀请码</p>
              <p v-text="data.u_i_no"></p>
            </td>
          </tr>
          <tr>
            <td>
              <p>房卡购买总数</p>
              <p v-text="data.r_no"></p>
            </td>
            <td>
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
  import {userInfo} from '@/mock/proxy'

  export default {
    name: 'user-info',
    data () {
      return {
        data: {},
        start: '2020-07-23',
        end: '2017-07-09'
      }
    },
    components: {
      Group,
      Card,
      Cell,
      Datetime,
      XTable
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
          title: '用户详情',
          backUrl: '/offline',
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
        this.queryData ()
      },
      queryData () {
        this.$axios.get ('http://userinfo.cn').then (response => {
          this.data = response.data
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
