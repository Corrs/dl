<template>
  <!--代理升降级-->
  <div>
    <div>
      <group>
        <cell class="weui-cell" v-for="(item, index) in datas" :key="index">
          <div slot="title" class="title">
            <img src="../../images/person/person.png" alt="">
            <div class="inline">
              <p v-text="item.name + '-' + item.level"></p>
              <p class="little" v-text="'可升级到' + item.up_level"></p>
            </div>
          </div>
          <div slot="default">
            <a @click="up(item)"><span class="up">升级</span></a>
            <a @click="down(item)"><span class="down">降级</span></a>
          </div>
        </cell>
      </group>
      <confirm v-model="show"
               title="提示"
               confirm-text="提交申请"
               @on-confirm="$router.push('/proxy')"
               @on-cancel="$router.push('/proxy')">
        <p class="confirm-content" v-text="controlModel.content"></p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import {Group, Cell, Scroller, Confirm} from 'vux'
  import {mapMutations} from 'vuex'

  export default {
    name: 'control-proxy',
    data () {
      return {
        datas: [
          {
            img: '../',
            name: '我是你爸爸',
            level: '二级代理',
            up_level: '一级代理',
            down_level: '普通用户'
          },
          {
            img: '',
            name: '我是你爸爸',
            level: '二级代理',
            up_level: '一级代理',
            down_level: '普通用户'
          },
          {
            img: '',
            name: '我是你爸爸',
            level: '二级代理',
            up_level: '一级代理',
            down_level: '普通用户'
          },
          {
            img: '',
            name: '我是你爸爸',
            level: '二级代理',
            up_level: '一级代理',
            down_level: '普通用户'
          },
          {
            img: '',
            name: '我是你爸爸',
            level: '二级代理',
            up_level: '一级代理',
            down_level: '普通用户'
          },
          {
            img: '',
            name: '我是你爸爸',
            level: '二级代理',
            up_level: '一级代理',
            down_level: '普通用户'
          }, {
            img: '',
            name: '我是你爸爸',
            level: '二级代理',
            up_level: '一级代理',
            down_level: '普通用户'
          },
          {
            img: '',
            name: '我是你爸爸',
            level: '二级代理',
            up_level: '一级代理',
            down_level: '普通用户'
          },
          {
            img: '',
            name: '我是你爸爸',
            level: '二级代理',
            up_level: '一级代理',
            down_level: '普通用户'
          },
          {
            img: '',
            name: '我是你爸爸',
            level: '二级代理',
            up_level: '一级代理',
            down_level: '普通用户'
          },
          {
            img: '',
            name: '我是你爸爸',
            level: '二级代理',
            up_level: '一级代理',
            down_level: '普通用户'
          }
        ],
        show: false,
        controlModel: {}
      }
    },
    components: {
      Group,
      Cell,
      Scroller,
      Confirm
    },
    mounted () {
      this.initHeader ()
      this.initFotter ()
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
        let content = '确定需要将' + item.name + '-' + item.level + '提升到' + item.down_level + '吗？ '
        this.showConfirm (item, content)
      },
      down (item) {
        let content = '确定需要将' + item.name + '-' + item.level + '降级到' + item.down_level + '吗？ '
        this.showConfirm (item, content)
      },
      showConfirm (item, content) {
        this.show = true
        this.controlModel = item
        this.controlModel.content = content
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
  }

  .title {
    height: 2.5rem;
    line-height: 1rem;
    position: relative;
  }

  .confirm-content {
    text-align: justify;
    font-size: .7rem;
    padding: .2rem;
  }
</style>
