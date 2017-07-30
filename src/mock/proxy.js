import Mock from 'mockjs';

let Random = Mock.Random

let proxy = Mock.mock ('http://proxy.cn', {
  'n_count': Random.integer(1, 5000), // 新增用户数  new user
  'a_count': Random.integer(1, 5000), // 活跃用户数  active user
  'f_count': Random.integer(1, 5000), // 新增一级代理数
  's_count': Random.integer(1, 5000), // 新增二级代理数
  'c_count': Random.integer(1, 5000) // 可升降级代理数
})

let proxyChart = Mock.mock ('http://proxy-chart.cn', {
  'chartDateStart': Random.date('M月d日'),
  'chartDateEnd': Random.date('M月d日'),
  'datas|90':[
    Random.float(1, 99999, 2, 2)
  ]
})

let controlProxy = Mock.mock ('http://controlProxy.cn', {

  'datas|20': [{
    'img': '@img',
    'name': '@cname',
    'proxy': '@proxy',
    'up_proxy': '@proxy',
    'down_proxy': '@proxy'
  }]

})

let offline = Mock.mock ('http://offline.cn', {
  'datas|10-100': [
    {
      'name': '@cname',
      'consume': Random.float(1, 99999, 2, 2)
    }
  ]
})


let userInfo = Mock.mock ('http://userinfo.cn', {
  'consume': Random.float(1, 99999, 2, 2), // 累计消费金额
  'down_consume': Random.float(1, 99999, 2, 2), // 下线累计消费金额
  'total': Random.float(1, 99999, 2, 2), // 累计提现金额
  'brokerage': Random.float(1, 99999, 2, 2),   // 累计佣金金额
  'user_no': Random.integer(1, 5000), // 新增用户数
  'consume_no': Random.integer(1, 5000), // 消费人数
  'f_no': Random.integer(1, 5000), // 新增一级代理数
  's_no': Random.integer(1, 5000), // 新增二级代理数
  'n_u_no': Random.integer(1, 5000), // 新增用户消费率
  'o_u_no': Random.integer(1, 5000), // 老用户消费率
  'n_a_no': Random.integer(1, 5000), // 新用户活跃度
  'o_a_no': Random.integer(1, 5000), // 老用户活跃度
  'o_s_no': Random.integer(1, 5000), // 老用户留存率
  'd_s_no': Random.integer(1, 5000), // 下线二级代理总人数
  'd_n_no': Random.integer(1, 5000), // 下级普通用户总人数
  'u_i_no': Random.integer(1, 5000), // 上线邀请码
  'r_no': Random.integer(1, 5000) // 房卡购买总数
})

export {proxy, proxyChart, controlProxy, offline, userInfo}
