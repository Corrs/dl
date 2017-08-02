<template>
  <!--代理升降级-->
  <div>
    <div>
      <group>
        <cell class="weui-cell" v-for="(item, index) in datas" :key="index">
          <div slot="title" class="title" @click="$router.push('/user-info')">
            <img :src="item.img" alt="">
            <div class="inline">
              <p v-text="item.name + '-' + item.proxy"></p>
              <p class="little" v-text="'可升级到' + item.up_proxy"></p>
            </div>
          </div>
          <div slot="default">
            <a @click="up(item)"><span class="up">升级</span></a>
            <a @click="down(item)"><span class="down">降级</span></a>
          </div>
        </cell>
      </group>
      <!--<confirm v-model="show"
               title="提示"
               confirm-text="提交申请"
               @on-confirm="$router.push('/proxy')"
               @on-cancel="$router.push('/proxy')">
        <p class="confirm-content" v-text="controlModel.content"></p>
      </confirm>-->
      <x-dialog v-model="show" :scroll="false" hide-on-blur>
        <div class="dialog">
          <div class="dialog-content">
            <p class="dialog-title">提示</p>
            <p class="confirm-content">
              <span v-text="controlModel.content"></span>
            </p>
          </div>
          <hr>
          <div @click="$router.push('/proxy')" class="cancel">
            <span>取消</span>
          </div>
          <div @click="$router.push('/proxy')" class="confirm">
            <span>提交申请</span>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
  import {Group, Cell, Scroller, Confirm, XDialog} from 'vux'
  import {mapMutations} from 'vuex'
  import {controlProxy} from '@/mock/proxy'

  export default {
    name: 'control-proxy',
    data () {
      return {
        datas: [],
        show: false,
        controlModel: {}
      }
    },
    components: {
      Group,
      Cell,
      Scroller,
      Confirm,
      XDialog
    },
    mounted () {
      this.initHeader ()
      this.initFotter ()
      this.queryData ()
    }
    ,
    methods: {
      ...mapMutations ({
        updateHeader: 'UPDATE_HEADER',
        updateShowFotter: 'UPDATE_SHOW_FOTTER'
      }),
      initHeader () {
        this.updateHeader ({
          backText: '返回',
          showBack: true,
          title: '升降级代理',
          backUrl: '/proxy',
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
      up (item) {
        let content = '确定需要将' + item.name + '-' + item.proxy + '提升到' + item.up_proxy + '吗？ '
        this.showConfirm (item, content)
      },
      down (item) {
        let content = '确定需要将' + item.name + '-' + item.proxy + '降级到' + item.down_proxy + '吗？ '
        this.showConfirm (item, content)
      },
      showConfirm (item, content) {
        this.show = true
        this.controlModel = item
        this.controlModel.content = content
      },
      queryData () {
        this.$axios.get ('http://controlProxy.cn').then (response => {
          this.datas = response.data.datas
        }).catch (error => {

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

  span {
    text-decoration: underline;
  }

  .up {
    color: #1B82D2;
  }

  .down {
    color: #BEC2C9;
  }

  .inline {
    display: inline-block;
    height: 100%;
    position: absolute;
    padding-left: .5rem;
  }

  .little {
    margin-top: .2rem;
    font-size: .6rem;
  }

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 5rem;
  }

  .title {
    height: 2.5rem;
    line-height: 1rem;
    position: relative;
  }

  .confirm-content {
    text-align: justify;
    font-size: .7rem;
    padding: .3rem;
  }

  .dialog span {
    font-size: .7rem;
    color: #000;
    text-decoration: none;
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
</style>
