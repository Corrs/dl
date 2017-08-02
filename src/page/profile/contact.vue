<template>
  <!--联系客服-->
  <div>
    <div>
      <group>
        <cell class="weui-cell">
          <div slot="title">
            <span>客服电话</span>
          </div>
          <div slot="default">
            <span v-text="system.ch"></span>
          </div>
        </cell>
      </group>
      <group>
        <x-input placeholder="输入标题" type="text" v-model="model.title">
          <div slot="label">
            <span>标题：</span>
          </div>
        </x-input>
        <x-textarea placeholder="请详细描述您的问题" :rows="6" v-model="model.content">
          <div slot="label">
            <span>内容：</span>
          </div>
        </x-textarea>
        <div class="btn">
          <x-button :mini="true" link="/profile">提交</x-button>
        </div>
      </group>
    </div>
  </div>
</template>

<script>
  import {XInput, XTextarea, Group, XButton, Cell} from 'vux'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'contact',
    data () {
      return {
        model: {
          title: '',
          content: ''
        }
      }
    },
    components: {
      XInput,
      XTextarea,
      Group,
      XButton,
      Cell
    },
    computed: {
      ...mapState({
        system: state => state.system
      })
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
          title: '联系客服',
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

  span {
    color: #000000;
    font-size: .7rem;
  }

  .btn {
    text-align: center;
    margin-bottom: .5rem;
  }

</style>
