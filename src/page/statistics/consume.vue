<template>
  <!--消费排行-->
  <div>
    <div>
      <div class="search">
        <group>
          <x-input placeholder="输入昵称" v-model="search" :show-clear="false">
            <div slot="right">
              <a @click="onSearch"><i class="fa fa-search"></i></a>
            </div>
          </x-input>
        </group>
      </div>
      <div class="result">
        <scroller lock-x :height="height" @on-scroll-bottom="onScrollBottom" ref="scroller"
                  :scroll-bottom-offst="200">
          <group>
            <cell class="weui-cell" v-for="(item, index) in datas" :key="index">
              <div slot="title">
                <p class="index" v-text="index+1"></p>
                <p v-text="item.name"></p>
              </div>
              <div slot="value">
                <span v-text="item.consume"></span>
              </div>
            </cell>
          </group>
          <load-more :tip="tip" v-if="isShowLoading"></load-more>
          <p v-if="!isShowLoading" v-text="tip" class="no-more"></p>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
  import {Cell, Group, Scroller, LoadMore, XInput} from 'vux'
  import {mapMutations} from 'vuex'
  import {consume} from '@/mock/statistics'

  export default {
    name: 'hello',
    data () {
      return {
        datas: [],
        bottomCount: 20,
        total: 11,
        search: ''
      }
    },
    components: {
      Cell,
      Group,
      Scroller,
      LoadMore,
      XInput
    },
    computed: {

      height () {
        return (window.document.body.clientHeight - 95) + 'px'
      },
      isShowLoading () {
        return this.total > this.bottomCount
      },
      tip () {
        return this.total > this.bottomCount ? '查询更多' : '无其他数据'
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
      },
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          this.$nextTick (() => {
            this.$refs.scroller.reset ()
          })
          if (this.bottomCount < this.total && this.bottomCount + 10 >= this.total) {
            this.bottomCount = this.total;
          }
          else if (this.bottomCount >= this.total) {
            return
          }
          else {
            this.bottomCount += 10
            //this.queryData()
          }


          this.onFetching = false
        }
      },
      onSearch () {
        this.queryData()
      },
      queryData () {
        this.$axios.get ('http://consume.cn').then (response => {
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

  p.index {
    float: left;
    width: 2rem;
  }

  .search {
    width: 100%;
    height: 2rem;
  }

  .no-more {
    font-size: .7rem;
    text-align: center;
  }

</style>
