<template>
  <div>
    <div>
      <group>
        <cell class="weui-cell" title="手机号" value="189****6689"></cell>
      </group>
      <div class="btn">
        <x-button link="/profile" type="primary">更换手机号</x-button>
      </div>
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
        msg: 'Welcome to Your Vue.js App'
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
      }
    }
  }
</script>

<style scoped>
  * {
    font-size: .7rem;
  }

  .btn {
    margin: 1.5rem 1rem .5rem 1rem;
  }
</style>
