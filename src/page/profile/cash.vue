<template>
  <!--提现-->
  <div>
    <div>
      <div class="panel">
        <p>累计提现金额（元）</p>
        <h4>3125.00</h4>
      </div>
      <div class="panel">
        <p>可用提现余额</p>
        <h4>3125.00</h4>
      </div>
      <div class="w-panel">
        <p><a>申请提现</a></p>
      </div>
      <group>
        <cell class="weui-cell" link="/cash-list">
          <div slot="title">
            <span class="cell-title">历史提现记录</span>
          </div>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
  import {Cell, Group} from 'vux'
  import {mapMutations} from 'vuex'

  export default {
    name: 'cash',
    data () {
      return {}
    },
    components: {
      Cell,
      Group
    },
    mounted () {
      this.initHeader ()
    },
    methods: {
      ...mapMutations ({
        updateHeader: 'UPDATE_HEADER'
      }),
      initHeader () {
        this.updateHeader ({
          backText: '返回',
          showBack: true,
          title: '提现',
          backUrl: '/',
          showMsgtip: false,
          showRight: true,
          paddingTop: '45px',
          rightType: 'question'
        })
      }
    }
  }
</script>

<style scoped>
  .panel {
    background: #EA5147;
    text-align: center;
    margin-bottom: .5rem;
  }

  .panel p {
    font-size: .7rem;
    font-weight: lighter;
  }

  .panel h4 {
    color: #FFFFFF;
  }

  .w-panel {
    background: #FFFFFF;
    text-align: center;
    margin-top: -0.5rem;
    height: 2rem;
  }

  .w-panel a {
    color: #9482D2 !important;
    text-decoration: underline;
    font-size: .7rem;
  }

  .cell-title {
    font-size: .7rem;
  }
</style>
