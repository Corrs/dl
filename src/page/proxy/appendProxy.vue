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
              <x-button v-if="upProxy==null" @click.native="changeProxy" mini :disabled="proxyModel.level==1">更换</x-button>
              <span v-else>
                <x-button mini v-text="upProxy.name"></x-button>
                <a style="margin-left: .2rem" @click="upProxy=null"><i class="fa fa-remove"></i></a>
              </span>
            </span>
          </div>
        </cell>
      </group>
      <div v-transfer-dom>
        <popup v-model="show" position="bottom" max-height="80%">
          <div class="search">
            <group>
              <x-input placeholder="输入昵称" v-model="search" :show-clear="false">
                <div slot="right">
                  <a @click="onSearch"><i class="fa fa-search"></i></a>
                </div>
              </x-input>
            </group>
          </div>
          <group>
            <cell class="weui-cell" v-for="(item,index) in datas" :key="index">
              <div slot="title" class="title" @click="selectProxy(item)">
                <img :src="item.img" alt="">
                <div class="inline">
                  <p v-text="item.name + '-' + item.proxy"></p>
                  <p class="little" v-text="'可升级到' + item.up_proxy"></p>
                </div>
              </div>
            </cell>
          </group>
        </popup>
      </div>
      <p class="tip">直接添加的代理账号，需认证身份证及手机号</p>
      <div class="submit">
        <x-button mini link="/proxy">提交</x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {TransferDom, Popup, Group, XInput, Selector, Cell, XButton, XHeader} from 'vux'
  import {mapMutations} from 'vuex'
  import {controlProxy} from '@/mock/proxy'

  export default {
    name: 'apeend-proxy',
    directives: {
      TransferDom
    },
    data () {
      return {
        show: false,
        search: '',
        datas: [],
        upProxy: null,
        proxyModel: {
          no: '',
          level: '1',
          up_level: ''
        },
        list: [{key: '1', value: '一级代理'}, {key: '2', value: '二级代理'}],
      }
    },
    components: {
      Popup,
      Group,
      XInput,
      Selector,
      Cell,
      XButton,
      XHeader
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
      },
      onSearch () {
        this.queryData ()
      },
      changeProxy () {
        this.show = !this.show
        this.queryData ()
      },
      selectProxy(item) {
        this.show = !this.show
        this.upProxy = item
        console.log(this.upProxy)
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

  .label {
    width: 5rem;
  }

  .btn {
    padding-left: 1rem;
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
</style>
