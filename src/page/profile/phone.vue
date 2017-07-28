<template>
  <div>
    <div v-if="show">
      <group>
        <cell class="weui-cell" title="手机号" :value="$route.params.no"></cell>
      </group>
      <div class="btn">
        <a @click="show=!show">
          <x-button>更换手机号</x-button>
        </a>
      </div>
    </div>
    <div v-if="!show">
      <group>
        <cell title="国家和地区" value="中国大陆" is-link></cell>
        <group>
          <x-input title="+86" placeholder="请输入新的手机号码" required v-model="changePhone.no"></x-input>
        </group>
        <cell class="weui-cell">
          <div slot="title">
            <x-input placeholder="验证码" required v-model="changePhone.code"></x-input>
          </div>
          <div slot="default">
            <a @click="getValidCode">
              <x-button mini>获取验证码</x-button>
            </a>
            <a><i class="fa fa-refresh"></i></a>
          </div>
        </cell>
      </group>
      <div class="btn">
        <a @click="show=!show">
          <x-button>提交</x-button>
        </a>
      </div>
    </div>
    <div class="text">
      <p>一个手机号只能绑定一个账号，如需解绑请联系客服；请确保之前绑定手机能够收到短信，若原手机号已无法使用，请联系客服人工解决。</p>
    </div>
  </div>
</template>

<script>
  import {XInput, Group, Cell, XButton} from 'vux'
  import {mapMutations} from 'vuex'

  export default {
    name: 'phone',
    data () {
      return {
        show: true,
        changePhone: {
          no: '',
          code: ''
        }
      }
    },
    components: {
      XInput,
      Group,
      Cell,
      XButton
    },
    mounted () {
      this.initHeader ()
      this.initFotter ()
    },
    methods: {
      ...mapMutations ({
        updateHeader: 'UPDATE_HEADER',
        updateShowFotter: 'UPDATE_SHOW_FOTTER'
      }),
      initHeader () {
        this.updateHeader ({
          backText: '我的',
          showBack: true,
          title: '手机号码',
          backUrl: '/profile',
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
      getValidCode() {
        console.log('获取验证码')
      }
    }
  }
</script>

<style scoped>
  * {
    font-size: .7rem;
  }

  .btn {
    margin: 1rem .5rem .5rem .5rem;
  }

  button {
    background-color: #1B82D2;
    height: 1.5rem;
    line-height: 1.5rem;
    color: #FFFFFF;
    font-size: .7rem;
  }

  .text {
    background: #FFFFFF;
    margin-top: .5rem;
    padding: 0 .5rem;
    font-size: .7rem;
    color: #888888;
  }

  i {
    margin-left: .2rem;
  }

</style>
