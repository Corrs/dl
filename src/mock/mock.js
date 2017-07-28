import Mock from 'mockjs';

var Random = Mock.Random

Random.extend ({
  state: function (date) {
    let list = ['区域代理', '一级代理', '二级代理', '普通用户']
    return this.pick (list)
  }
})

Random.extend ({
  bind: function (date) {
    let list = ['已绑定', '未绑定']
    return this.pick (list)
  }
})

Random.extend ({
  proxy: function (date) {
    let list = ['区域代理', '一级代理', '二级代理', '普通用户']
    return this.pick (list)
  }
})

Random.extend ({
  bankname: function (date) {
    let list = ['中国工商银行', '中国建设银行', '中国农业银行', '中国银行']
    return this.pick (list)
  }
})

Random.extend ({
    bankcardtype: function (date) {
      let list = ['储蓄卡', '借记卡']
      return this.pick (list)
    }
  }
)

Random.extend ({
  shstate: function (date) {
    let list = ['待审核', '已通过', '未通过']
    return this.pick (list)
  }
})

// 性别
Random.extend ({
  sex: function (date) {
    let list = ['男', '女']
    return this.pick (list)
  }
})

// 证件类型
Random.extend ({
  papertype: function (date) {
    let list = ['身份证', '护照']
    return this.pick (list)
  }
})

export default Mock.mock ('http://login.cn', {
  'username|1': '@cname',
  'userid|+1': 1,
  'userproxy': '@proxy',
  'userimg': '@img',
  'sex': '@sex',
  'hometown': '@region',
  'papertype': '@papertype',
  'paperno': /^\d{18}$/,
  'paperend': '@date'
})


