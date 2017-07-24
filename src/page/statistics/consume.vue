<template>
  <!--消费排行-->
  <div>
    <div>
      <search top="50px"></search>
      <group>
        <cell class="weui-cell" v-for="(item, index) in formatDatas" :key="index">
          <div slot="title">
            <p class="index" v-text="index+1"></p>
            <p v-text="item.name"></p>
          </div>
          <div slot="value">
            <span v-text="item.consume"></span>
          </div>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
  import {Cell, Group, Search} from 'vux'
  import {mapMutations} from 'vuex'

  export default {
    name: 'hello',
    data () {
      return {
        data: [{
          name: '习近平',
          consume: 0
        }, {
          name: '李克强',
          consume: 0
        }, {
          name: '周恩来',
          consume: 0
        }, {
          name: '习近平',
          consume: 0
        }, {
          name: '李克强',
          consume: 0
        }, {
          name: '周恩来',
          consume: 0
        }, {
          name: '习近平',
          consume: 0
        }, {
          name: '李克强',
          consume: 0
        }, {
          name: '周恩来',
          consume: 0
        }, {
          name: '习近平',
          consume: 0
        }, {
          name: '李克强',
          consume: 0
        }]
      }
    },
    components: {
      Cell,
      Group,
      Search
    },
    computed: {
      formatDatas () {
        return this.data.map (function (currentValue, index, array) {
          currentValue.consume = currentValue.consume.toFixed(2)
          return currentValue
        })
      }
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
          backText: '统计',
          showBack: true,
          title: '消费总排行',
          backUrl: '/Statistics',
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
  color: #000000;
}
p.index {
  float: left;
  width: 2rem;
}
</style>
