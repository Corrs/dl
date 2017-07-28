<template>
  <div class="msglist">
    <scroller lock-x :height="height" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom"
              :scroll-bottom-offst="200">
      <div class="box2">
        <a class="panel" @click="showMsg(data)" v-for="data in msgDatas">
          <img :src="data.img" slot="icon"/>
          <div class="content">
            <p class="type-title" v-text="data.typeTitle"></p>
            <p class="little" v-text="data.datetime"></p>
            <h5 v-text="data.title"></h5>
            <p class="msg little" v-text="data.content"></p>
          </div>
          <img class="system" src="../../images/icon/official.png" slot="icon" v-if="data.isSystemMsg"/>
        </a>
        <load-more :tip="tip" v-if="isShowLoading"></load-more>
        <p v-if="!isShowLoading" v-text="tip" class="no-more"></p>
      </div>
    </scroller>
  </div>
</template>

<script>
  import {Scroller, Divider, LoadMore} from 'vux'
  import {mapMutations} from 'vuex'
  import {msg} from '@/mock/msg'

  export default {
    name: 'msg',
    components: {
      Scroller,
      Divider,
      LoadMore
    },
    data () {
      return {
        bottomCount: 20,
        total: 4,
        msgDatas: []
      }
    },
    computed: {
      height () {
//        console.log("可见区域高度：", window.document.body.clientHeight)
        return (window.document.body.clientHeight - 105) + 'px'
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
      this.queryData ()
    },
    methods: {
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          this.$nextTick (() => {
            this.$refs.scrollerBottom.reset ()
          })
          if (this.bottomCount < this.total && this.bottomCount + 10 >= this.total) {
            this.bottomCount = this.total;
          }
          else if (this.bottomCount >= this.total) {
            return
          }
          else {
            this.bottomCount += 10
          }


          this.onFetching = false
        }
      },
      showMsg (data) {
        console.log ('显示消息')
        this.$router.push ('/msginfo/' + data.id + '/' + data.type)
      },
      ...mapMutations ({
        updateHeader: 'UPDATE_HEADER'
      }),
      initHeader () {
        this.updateHeader ({
          backText: '返回',
          showBack: true,
          title: '我的消息',
          backUrl: '/',
          showMsgtip: false,
          showRight: false,
          paddingTop: '45px'
        })
      },
      queryData () {
        this.$axios.get ('http://msg.cn').then (response => {
          this.msgDatas = response.data.datas.map ((value, index, array) => {
            switch (value.type) {
              case '1':
                value.typeTitle = '系统通知'
                value.isSystemMsg = true
                break
              case '2':
                value.typeTitle = '提现助手'
                value.isSystemMsg = false
                break
              case '3':
              case '4':
                value.typeTitle = '代理助手'
                value.title = '你有一条代理消息'
                value.isSystemMsg = false
                break
            }
            value.datetime = value.datetime.substr(5, 11)
            return value
          })
        }).catch (error => {

        })
      }
    }
  }
</script>

<style scoped>
  .msglist {
    height: 100%;
  }

  .panel {
    background: #fff;
    margin: .5rem 0;
  }

  a {
    display: block;
    height: 4rem;
    padding: .5rem;
  }

  img {
    float: left;
    width: 2rem;
    height: 2rem;
  }

  img.system {
    float: right;
    width: 3.25rem;
    height: 2.4rem;
    transform: rotateZ(40deg);
    -ms-transform: rotateZ(40deg); /* IE 9 */
    -moz-transform: rotateZ(40deg); /* Firefox */
    -webkit-transform: rotateZ(40deg); /* Safari 和 Chrome */
    -o-transform: rotateZ(40deg);
    margin-top: .7rem;
  }

  p.type-title {
    font-size: .8rem;
  }

  p.little {
    font-size: .4rem;
  }

  .content {
    float: left;
    padding-left: .5rem;
    width: 61%;
  }

  h5, p.msg {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .no-more {
    font-size: .7rem;
    text-align: center;
  }
</style>
