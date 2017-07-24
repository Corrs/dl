<template>
  <div>
    <div>
      <group>
        <cell class="weui-cell">
          <div slot="title">
            <span>推广码</span>
          </div>
          <div slot="default">
            <span>91013</span>
          </div>
        </cell>
      </group>
      <group>
        <cell class="weui-cell">
          <div slot="title">
            <span>推广链接</span>
          </div>
          <div slot="inline-desc" class="inline-desc">
            <span>http://www.baidu.com/code/woshinibaba</span>
          </div>
        </cell>
      </group>
      <group>
        <cell class="weui-cell">
          <div slot="title">
            <span>推广二维码</span>
          </div>
          <div slot="inline-desc" class="inline-desc">
            <img src="../../images/person/qr_code2.png">
          </div>
          <div slot="default">
            <span>长按复制</span>
          </div>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
  import {Group, Cell } from 'vux'
  import {mapMutations} from 'vuex'
  export default {
    name: 'spread',
    data () {
      return {

      }
    },
    components: {
      Group,
      Cell
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
          title: '我的推广',
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
  span {
    color: #000000;
    font-size: .7rem;
  }

  .inline-desc {
    text-align: center;
    margin-top: .5rem;
  }

  img {
    width: 5rem;
    height: 5rem;
  }
</style>
