<template>
  <!--添加代理-->
  <div>
    <div>
      <group>
        <x-input v-model="proxyModel.no" placeholder="请输入游戏昵称">
          <div slot="label" class="label">
            <span>帐号</span>
          </div>
        </x-input>
      </group>
      <group>
        <selector v-model="proxyModel.level" title="代理级别" :options="list"></selector>
      </group>
      <group>
        <cell class="weui-cell" value="默认本账号为上线">
          <div slot="title">
            <span class="label">上线代理</span>
            <span class="btn">
              <x-button mini :disabled="proxyModel.level==1">更换</x-button>
            </span>
          </div>
        </cell>
      </group>
      <p class="tip">直接添加的代理账号，需认证身份证及手机号</p>
      <div class="submit">
        <x-button mini link="/proxy">提交</x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Group, XInput, Selector, Cell, XButton} from 'vux'
  import {mapMutations} from 'vuex'

  export default {
    name: 'apeend-proxy',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        proxyModel: {
          no: '',
          level: '1',
          up_level: ''
        },
        list: [{key: '1', value: '一级代理'}, {key: '2', value: '二级代理'}],
      }
    },
    components: {
      Group,
      XInput,
      Selector,
      Cell,
      XButton
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
          title: '添加代理',
          backUrl: '/proxy',
          showMsgtip: false,
          showRight: false,
          paddingTop: '45px'
        })
      }
    }
  }
</script>

<style scoped>
  * {
    font-size: .7rem;
    color: #000000;
  }

  .label {
    width: 5rem;
  }

  .btn {
    padding-left: 2rem;
  }

  .tip {
    text-indent: .1rem;
    font-size: .5rem;
    margin: .3rem auto;
    padding-left: .5rem;
  }

  .submit {
    text-align: center;
  }

</style>
