<template>
  <div class="phone">
    <div v-if="!dialogShow">
      <group>
        <x-input readonly text-align="center" v-model="formatPhone"></x-input>
        <cell class="weui-cell">
          <div slot="title">
            <x-input placeholder="验证码" required v-model="code"></x-input>
          </div>
          <div slot="default">
            <x-button @click.native="getValidCode" mini v-text="validCode==''?'获取验证码':validCode"></x-button>
          </div>
        </cell>
      </group>
      <div>
        <x-button @click.native="valid" mini>验证</x-button>
        <a @click="dialogShow=!dialogShow">
          <span>收不到验证码？</span>
        </a>
      </div>
    </div>
    <div class="dialog" v-else>
      <div class="dialog-content">
        <p class="dialog-title">确认拨打电话</p>
        <p class="confirm-content">
          <img src="../../images/icon/call.png" alt="">
          <span v-text="system.ch"></span>
        </p>
      </div>
      <hr>
      <div class="cancel">
        <a @click="dialogShow=!dialogShow">
          <span>取消</span>
        </a>
      </div>
      <div class="confirm">
        <a :href="'tel://'+system.ch">
          <span>确定</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import {XInput, Group, Cell, XButton, XDialog} from 'vux'
  import {mapState} from 'vuex'
  import {validCode} from '@/mock/profile'

  export default {
    name: 'phone-valid',
    data () {
      return {
        validCode: '',
        code: '',
        dialogShow: false
      }
    },
    components: {
      Cell,
      Group,
      XInput,
      XButton,
      XDialog
    },
    computed: {
      ...mapState ({
        user: state => state.user,
        system: state => state.system
      }),
      formatPhone() {
        return this.user.phone.substr(0,3)+'****'+this.user.phone.substr(-4)
      }
    },
    methods: {
      getValidCode () {
        this.$axios.get('http://valid-code.cn').then(response=>{
          this.validCode = response.data.code
          console.log(this.validCode)
        }).catch(error=>{

        })
      },
      valid () {
        this.$emit('hide')
      }
    },
    watch: {
      dialogShow(value) {
        this.validCode = ''
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
    font-size: .5rem;
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

  .confirm-content {
    text-align: center;
    padding-top: .3rem
  }

  .confirm-content img {
    width: 1rem;
    height: 1rem;
  }

  .confirm-content span {
    font-size: 1rem;
    color: #000;
  }

  p.dialog-title {
    font-size: 1rem;
    font-weight: bold;
  }

  .cancel {
    float: left;
    width: 50%;
    text-align: center;
    height: 1.8rem;
    line-height: 1.8rem;
    border-right: 1px solid #9A9A9A;
  }

  .cancel span {
    color: #9A9A9A;
  }

  .confirm {
    text-align: center;
    line-height: 1.8rem;
  }

  .confirm span {
    color: #1c74d9;
  }

  .dialog-content {
    height: 4rem;
  }

  .confirm a,.cancel a {
    display: block;
    width: 100%;
  }

</style>
