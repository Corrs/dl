<template>
  <!--下线列表-->
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
      <div class="tab">
        <tab :line-width=2 active-color="#fc378c" v-model="index">
          <tab-item class="vux-center" @on-item-click="onSearch">
            <img v-if="index==0" class="icon" src="../../images/icon/all.png" alt="">
            <img v-else class="icon" src="../../images/icon/all-disable.png" alt="">全部
          </tab-item>
          <tab-item class="vux-center" @on-item-click="onSearch">
            <img v-if="index==1" class="icon" src="../../images/icon/one.png" alt="">
            <img v-else class="icon" src="../../images/icon/one-disable.png" alt="">一代
          </tab-item>
          <tab-item class="vux-center" @on-item-click="onSearch">
            <img v-if="index==2" class="icon" src="../../images/icon/two.png" alt="">
            <img v-else class="icon" src="../../images/icon/two-disable.png" alt="">二代
          </tab-item>
          <tab-item class="vux-center" @on-item-click="onSearch">
            <img v-if="index==3" class="icon" src="../../images/icon/normal.png" alt="">
            <img v-else class="icon" src="../../images/icon/normal-disable.png" alt="">普通用户
          </tab-item>
        </tab>
      </div>
      <div class="result">
        <scroller lock-x :height="height" @on-scroll-bottom="onScrollBottom" ref="scroller"
                  :scroll-bottom-offst="200" :key="index">
          <group>
            <cell class="weui-cell" v-for="(item, index) in datas" :key="index" link="/user-info">
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
  import {Cell, Group, Scroller, LoadMore, XInput, Tab, TabItem} from 'vux'
  import {mapMutations} from 'vuex'
  import {offline} from '@/mock/proxy'

  export default {
    name: 'offline',
    data () {
      return {
        datas: [],
        pageNo: 1,
        pageSize: 20,
        total: 11,
        search: '',
        index: 0
      }
    },
    components: {
      Cell,
      Group,
      Scroller,
      LoadMore,
      XInput,
      Tab,
      TabItem
    },
    computed: {
      height () {
        return (window.document.body.clientHeight - 160) + 'px'
      },
      isShowLoading () {
        return this.total > this.pageSize
      },
      tip () {
        return this.total > this.pageSize ? '查询更多' : '无其他数据'
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
          backText: '代理',
          showBack: true,
          title: '下线列表',
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
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          this.$nextTick (() => {
            this.$refs.scroller.reset ()
          })
          if (this.pageSize < this.total && this.pageSize + 10 >= this.total) {
            this.pageSize = this.total;
          }
          else if (this.pageSize >= this.total) {
            return
          }
          else {
            this.pageSize += 10
          }

          this.onFetching = false
        }
      },
      onSearch () {
        this.queryData ()
      },
      queryData () {
        this.$axios.get ('http://offline.cn').then (response => {
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

  .icon {
    width: 2rem;
    height: 2rem;
    display: block;
    margin: .1rem auto;
  }

  .tab {
    height: 3.5rem;
    margin-top: .5rem;
  }

</style>
