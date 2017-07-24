<template>
  <!--提现-->
  <div>
    <masker style="border-radius: 2px;">
      <div class="m-img" ></div>
      <div slot="content" class="m-title">

        <br/>
        <span class="m-time"></span>
      </div>
    </masker>
    <masker style="border-radius: 2px;">
      <div class="m-img" ></div>
      <div slot="content" class="m-title">

        <br/>
        <span class="m-time"></span>
      </div>
    </masker>
  </div>
</template>

<script>
  import { Masker } from 'vux'
  import {mapMutations} from 'vuex'
  export default {
    name: 'cash',
    data () {
      return {

      }
    },
    components: {
      Masker
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
          title: '提现',
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
