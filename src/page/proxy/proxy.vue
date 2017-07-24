<template>
  <div>

  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: 'proxy',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted() {
      this.initHeader()
    },
    methods: {
      ...mapMutations({
        updateHeader: 'UPDATE_HEADER'
      }),
      initHeader() {
        this.updateHeader({
          backText: '返回',
          showBack: true,
          title: '代理管理',
          backUrl: '/',
          showMsgtip: false,
          showRight: false,
          paddingTop: '45px'
        })
      }
    }
  }
</script>

<style>

</style>
