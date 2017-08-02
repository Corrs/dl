<template>
  <!--身份证信息-->
  <div>
    <div class="top">
      <div>

      </div>

    </div>
    <div>
      <div class="card">
        <img class="person" :src="person.img" alt="">
        <p v-text="person.name"></p>
        <img class="little" src="../../images/person/person-code.png" alt="">
        <p>
          <span v-text="person.code.substr(0, 1)"></span>
          <span v-for="i in person.code.length-2">*</span>
          <span v-text="person.code.substr(-1)"></span>
        </p>
        <img class="rz" src="../../images/person/truename.png" alt="">
      </div>
      <!--<card>
        <div slot="content">
          <img src="../../images/person/person.png" alt="">
          <p v-text="person.name"></p>
          <img class="little" src="../../images/person/person-code.png" alt="">
          <p>
            <span v-text="person.code.substr(0, 1)"></span>
            <span v-for="i in person.code.length-2">*</span>
            <span v-text="person.code.substr(-1)"></span>
          </p>
        </div>
      </card>-->
    </div>
    <div>
      <group>
        <cell class="weui-cell" title="国籍（地区）">
          <div slot="default">
            <span v-text="person.hometown"></span>
          </div>
        </cell>
        <cell class="weui-cell" title="姓名">
          <div slot="default">
            <span v-text="person.name"></span>
          </div>
        </cell>
        <cell class="weui-cell" title="性别">
          <div slot="default">
            <span v-text="person.sex"></span>
          </div>
        </cell>
      </group>
      <group>
        <cell class="weui-cell" title="证件类型">
          <div slot="default">
            <span v-text="person.type"></span>
          </div>
        </cell>
        <cell class="weui-cell" title="证件号码">
          <div slot="default">
            <span v-text="person.code"></span>
          </div>
        </cell>
        <cell class="weui-cell" title="证件有效期">
          <div slot="default" class="default">
            <div>
              <checker v-model="forever" @on-change="change" default-item-class="check-item" selected-item-class="check-item-selected">
                <checker-item value="1">长期</checker-item>
              </checker>
            </div>
            <div>
              <datetime v-if="forever!=1" v-model="person.end" :readonly="false" @on-change="change"></datetime>
            </div>
          </div>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
  import {Cell, Group, Card, Datetime, Checker, CheckerItem} from 'vux'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'person-code',
    data () {
      return {
        visibility: false,
        forever: '0'
      }
    },
    components: {
      Cell,
      Group,
      Card,
      Datetime,
      Checker,
      CheckerItem
    },
    computed: {
      ...mapState({
        person: state=>state.user
      })
    },
    mounted () {
      this.initHeader ()
      this.initFotter ()
    },
    methods: {
      ...mapMutations ({
        updateHeader: 'UPDATE_HEADER',
        updateShowFotter: 'UPDATE_SHOW_FOTTER',
        updateUser: 'UPDATE_USER'
      }),
      initHeader () {
        this.updateHeader ({
          backText: '返回',
          showBack: true,
          title: '身份验证',
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
      },
      change (value) {

        if(value == 1) {
          console.log('长期')
          this.updateUser({forever: 1, end: ''})
        } else {
          this.updateUser({forever: 0})
          if(value != '') {
            this.updateUser({end: value})
          }
        }

        console.log ('证件有效期：', this.person.end)
      }
    }
  }
</script>

<style scoped>
  * {
    color: #000000;
    font-size: .7rem;
  }

  .top {
    background: #1B82D2;
    height: 7rem;
  }

  .card {
    text-align: center;
    width: 80%;
    height: 4.5rem;
    margin: -4.8rem auto 1rem auto;
    position: relative;
    background-color: #FFFFFF;
    border-radius: .3rem;
  }

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 5rem;
  }

  .person {
    position: absolute;
    top: -1rem;
    left: 40%;
  }

  .little {
    width: 2rem;
    height: 1.5rem;
    border-radius: 0;
  }

  .rz {
    width: 15%;
    height: 15%;
    transform:rotateZ(45deg);
    -ms-transform:rotateZ(45deg); 	/* IE 9 */
    -moz-transform:rotateZ(45deg); 	/* Firefox */
    -webkit-transform:rotateZ(45deg); /* Safari 和 Chrome */
    -o-transform:rotateZ(45deg); 	/* Opera */
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .card:first-child {
    padding-top: 2rem;
  }

  .default div {
    display: inline-block;
    height: 100%;
  }

  .check-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
  }

  .check-item-selected {
    border: 1px solid green;
  }

</style>
