<template>
  <!--银行卡-->
  <div>
    <div class="bank-card" v-if="isShowList">
      <div class="card" @click="showInfo(item)" v-for="(item, index) in cardItems" :key="index">
        <group>
          <card>
            <div slot="content">
              <div class="left">
                <img :src="item.img" alt="">
              </div>
              <div class="content">
                <p v-text="item.bank"></p>
                <p class="type" v-text="item.type"></p>
                <p class="no">
                  <span v-for="i in item.c" :key="i">****</span>
                  <span class="suffix" v-text="item.suffix"></span>
                </p>
              </div>
            </div>
          </card>
        </group>
      </div>
    </div>
    <div class="unbind" v-if="isShowUnbind">
      <group>
        <card>
          <div slot="content">
            <div class="left">
              <!--<x-img :src="item.img" :webp-src="`${item.img}?type=webp`" @on-success="success" @on-error="error"
                     class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body"></x-img>-->
              <img :src="unbindCard.img" alt="">
            </div>
            <div class="content">
              <p v-text="unbindCard.bank"></p>
              <p class="type" v-text="unbindCard.type"></p>
              <p class="no">
                <span v-for="i in unbindCard.c" :key="i">****</span>
                <span class="suffix" v-text="unbindCard.suffix"></span>
              </p>
            </div>
          </div>
        </card>
      </group>
      <group>
        <cell class="weui-cell" :title="unbindCard.type + '(尾号' + unbindCard.suffix + ')'">
          <div slot="default">
            <a @click="unbind">解除绑定</a>
          </div>
        </cell>
      </group>
      <actionsheet v-model="isShowAction" :menus="menus" @on-click-menu="click" show-cancel></actionsheet>
    </div>
    <x-dialog v-model="showValid" :scroll="false" hide-on-blur>
      <phone-valid ref="phoneValid" @hide="hideValid"></phone-valid>
    </x-dialog>
  </div>
</template>

<script>
  import {Card, Group, XImg, Cell, Actionsheet, XDialog} from 'vux'
  import PhoneValid from '@/components/common/PhoneValid'
  import {mapMutations} from 'vuex'
  import {bankCard} from '@/mock/profile'

  export default {
    name: 'bank-card',
    data () {
      return {
        datas: [],
        isShowList: true,
        isShowAppend: false,
        isShowUnbind: false,
        isShowAction: false,
        showValid: false,
        unbindCard: {},
        menus: [
          {
            label: '解除绑定后，提现服务将不可使用',
            type: 'disabled'
          },
          {
            label: '确定解除绑定',
            type: 'default',
            value: 'unbind'
          }
        ]
      }
    },
    components: {
      Card,
      Group,
      XImg,
      Cell,
      Actionsheet,
      XDialog,
      PhoneValid
    },
    computed: {
      cardItems () {
        return this.datas.map (function (currentValue, index, array) {
          let i = parseInt(currentValue.no.length % 4)
          let count = parseInt(currentValue.no.length / 4)
          let suffix = ''
          if (i == 0) {
            suffix = currentValue.no.substr (-4)
            currentValue.c = count - 1;
          } else {
            suffix = currentValue.no.substr (0 - i)
            currentValue.c = count;
          }
          currentValue.suffix = suffix
          return currentValue
        })
      }
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
          backText: '我的',
          showBack: true,
          title: '我的银行卡',
          backUrl: '/profile',
          showMsgtip: false,
          showRight: true,
          paddingTop: '45px',
          rightType: 'appendBankCard'
        })
      },
      initFotter () {
        this.updateShowFotter ({
          isShowFotter: false
        })
      },
      showInfo (card) {
        this.isShowList = false
        this.isShowUnbind = true
        this.unbindCard = card
      },
      unbind () {
        this.isShowAction = true
      },
      click (key) {
        if (key == 'unbind') {
          this.showValid = !this.showValid
//          this.isShowUnbind = false
//          this.isShowList = true
        }
      },
      queryData () {
        this.$axios.get ('http://bankCard.cn').then (response => {
          console.log (response)
          this.datas = response.data.datas
        }).catch (error => {

        })
      },
      hideValid() {
        this.isShowUnbind = false
        this.isShowList = true
        this.showValid = !this.showValid
      }
    },
    watch: {
      // 监测是否显示手机验证 重置子页面中的dialogShow
      showValid(value) {
        this.$refs.phoneValid.dialogShow = false
        this.$refs.phoneValid.validCode = ''
      }
    }
  }
</script>

<style scoped>
  * {
    font-size: .7rem;
  }

  .ximg-error {
    background-color: yellow;
  }

  .ximg-error:after {
    content: '加载失败';
    color: red;
  }

  img {
    width: 2rem;
    height: 2rem;
    margin-top: .8rem;
  }

  .left {
    height: 4rem;
    float: left;
    padding-left: 1rem;
    padding-right: .5rem;
  }

  .content {
    height: 4rem;
    padding-top: .6rem;
    padding-left: .2rem;
  }

  p.type {
    font-size: .6rem;
    color: #BEBEBE;
  }

  span {
    margin-right: .5rem;
    line-height: 1rem;
  }

  .suffix {
    font-size: 1rem;
  }

  a {
    color: #E61C83 !important;
  }

</style>
