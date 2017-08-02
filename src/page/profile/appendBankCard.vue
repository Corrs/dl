<template>
  <!--绑定银行卡-->
  <div>
    <div>
      <group title="请绑定本人的银行卡">
        <x-input title="持卡人" v-model="card.name" readonly>
          <div slot="right">
            <a @click="show=!show"><i class="fa fa-info-circle"></i></a>
          </div>
        </x-input>
        <x-input title="卡号" type="number" required v-model="card.no"></x-input>
        <x-input title="开户行" required v-model="card.bank"></x-input>
      </group>
      <div class="submit">
        <x-button mini link="/bankCard">提交</x-button>
      </div>
      <alert v-model="show" title="持卡人说明" button-text="知道了" content="为了保证用户的利益，只能绑定认证用户本人的银行卡"></alert>
    </div>
  </div>
</template>

<script>
  import {Group, XInput, XButton, Alert} from 'vux'
  import {mapMutations} from 'vuex'

  export default {
    name: 'append-bank-card',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        card: {
          name: '孙连成',
          no: '',
          bank: ''
        },
        show: false
      }
    },
    components: {
      Group,
      XInput,
      XButton,
      Alert
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
          title: '我的银行卡',
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
      }
    }
  }
</script>

<style scoped>
  * {
    font-size: .7rem;
    color: #000000;
  }
  .submit {
    text-align: center;
    margin-top: .5rem;
  }

  i {
    font-size: 1rem !important;
    color: #1c74d9 !important;
  }

</style>
