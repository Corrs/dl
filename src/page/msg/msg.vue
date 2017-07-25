<template>
  <div class="msglist">
    <scroller lock-x :height="height" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom"
              :scroll-bottom-offst="200">
      <div class="box2">
        <a class="panel" @click="showMsg" v-for="data in msgDatas">
          <img :src="data.img" slot="icon" />
          <div class="content">
            <p class="type-title" v-text="data.typeTitle"></p>
            <p class="little" v-text="data.datetime"></p>
            <h5 v-text="data.title"></h5>
            <p class="msg little" v-text="data.content"></p>
          </div>
          <img class="system" src="../../images/icon/official.png" slot="icon" v-if="data.isSystemMsg" />
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

  export default {
    name: 'msg',
    components: {
      Scroller,
      Divider,
      LoadMore
    },
    data() {
      return {
        bottomCount: 20,
        total: 4,
        msgDatas: [{img:require('../../images/icon/msgtip2.png'), typeTitle:'系统通知', datetime:'07-09 22：00', title: '关于代理分成调整的通知', content: '如果你无法简洁的表达你的想法，那只说明你还不够了解它。', isSystemMsg: true },
          {img:require('../../images/icon/cash2.png'), typeTitle:'提现助手', datetime:'07-09 22：00', title: '￥580.00', content: '提现申请通过', isSystemMsg: false },
          {img:require('../../images/icon/proxy2.png'), typeTitle:'代理助手', datetime:'07-09 22：00', title: '您有一条代理消息', content: '新增20个代理，20个客户', isSystemMsg: false },
          {img:require('../../images/icon/proxy2.png'), typeTitle:'代理助手', datetime:'07-09 22：00', title: '您有一条代理消息', content: '有3个代理可以升级或降级。', isSystemMsg: false }]
      }
    },
    computed: {
      height() {
//        console.log("可见区域高度：", window.document.body.clientHeight)
        return (window.document.body.clientHeight - 105) + 'px'
      },
      isShowLoading() {
        return this.total > this.bottomCount
      },
      tip() {
        return this.total > this.bottomCount ? '查询更多' : '无其他数据'
      }
    },
    mounted() {
      this.initHeader()
    },
    methods: {
      onScrollBottom() {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          setTimeout(() => {
            if (this.bottomCount < this.total &&this.bottomCount + 10 >= this.total) {
              this.bottomCount = this.total;
            }
            else if (this.bottomCount >= this.total) {
              return
            }
            else {
              this.bottomCount += 10
            }

            this.msgDatas.push({img:require('../../images/icon/msgtip2.png'), typeTitle:'系统通知', datetime:'07-09 22：00', title: '关于代理分成调整的通知', content: '如果你无法简洁的表达你的想法，那只说明你还不够了解它。', isSystemMsg: true });
            this.msgDatas.push({img:require('../../images/icon/msgtip2.png'), typeTitle:'系统通知', datetime:'07-09 22：00', title: '关于代理分成调整的通知', content: '如果你无法简洁的表达你的想法，那只说明你还不够了解它。', isSystemMsg: true });
            this.msgDatas.push({img:require('../../images/icon/msgtip2.png'), typeTitle:'系统通知', datetime:'07-09 22：00', title: '关于代理分成调整的通知', content: '如果你无法简洁的表达你的想法，那只说明你还不够了解它。', isSystemMsg: true });
            this.msgDatas.push({img:require('../../images/icon/msgtip2.png'), typeTitle:'系统通知', datetime:'07-09 22：00', title: '关于代理分成调整的通知', content: '如果你无法简洁的表达你的想法，那只说明你还不够了解它。', isSystemMsg: true });
            this.msgDatas.push({img:require('../../images/icon/msgtip2.png'), typeTitle:'系统通知', datetime:'07-09 22：00', title: '关于代理分成调整的通知', content: '如果你无法简洁的表达你的想法，那只说明你还不够了解它。', isSystemMsg: true });
            this.msgDatas.push({img:require('../../images/icon/msgtip2.png'), typeTitle:'系统通知', datetime:'07-09 22：00', title: '关于代理分成调整的通知', content: '如果你无法简洁的表达你的想法，那只说明你还不够了解它。', isSystemMsg: true });
            this.msgDatas.push({img:require('../../images/icon/msgtip2.png'), typeTitle:'系统通知', datetime:'07-09 22：00', title: '关于代理分成调整的通知', content: '如果你无法简洁的表达你的想法，那只说明你还不够了解它。', isSystemMsg: true });
            this.msgDatas.push({img:require('../../images/icon/msgtip2.png'), typeTitle:'系统通知', datetime:'07-09 22：00', title: '关于代理分成调整的通知', content: '如果你无法简洁的表达你的想法，那只说明你还不够了解它。', isSystemMsg: true });
            this.msgDatas.push({img:require('../../images/icon/msgtip2.png'), typeTitle:'系统通知', datetime:'07-09 22：00', title: '关于代理分成调整的通知', content: '如果你无法简洁的表达你的想法，那只说明你还不够了解它。', isSystemMsg: true });
            this.msgDatas.push({img:require('../../images/icon/msgtip2.png'), typeTitle:'系统通知', datetime:'07-09 22：00', title: '关于代理分成调整的通知', content: '如果你无法简洁的表达你的想法，那只说明你还不够了解它。', isSystemMsg: true });


            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
          }, 2000)
        }
      },
      showMsg() {
        console.log('显示消息')
        this.$router.push('/msginfo')
      },
      ...mapMutations({
        updateHeader: 'UPDATE_HEADER'
      }),
      initHeader() {
        this.updateHeader({
          backText: '返回',
          showBack: true,
          title: '我的消息',
          backUrl: '/',
          showMsgtip: false,
          showRight: false,
          paddingTop: '45px'
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
    transform:rotateZ(40deg);
    -ms-transform:rotateZ(40deg); 	/* IE 9 */
    -moz-transform:rotateZ(40deg); 	/* Firefox */
    -webkit-transform:rotateZ(40deg); /* Safari 和 Chrome */
    -o-transform:rotateZ(40deg);
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
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .no-more {
    font-size: .7rem;
    text-align: center;
  }
</style>
