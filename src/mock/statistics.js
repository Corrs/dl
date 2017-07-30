import Mock from 'mockjs';

let Random = Mock.Random

// 消费页面列表数据
let consume = Mock.mock ('http://consume.cn', {
  'datas|10-100': [
    {
      'name': '@cname',
      'consume': Random.float (1, 99999, 2, 2)
    }
  ]
})

// 房卡统计详情页面的数据
let roomData = Mock.mock ('http://room.cn', {
  'consume': Random.integer (1, 5000),
  'direct': Random.integer (1, 5000),
  'proxy': Random.integer (1, 5000),
  'f_proxy': Random.integer (1, 5000),
  's_proxy': Random.integer (1, 5000)
})

// 数据统计详情页面的数据
let dataInfo = Mock.mock ('http://data-info.cn', {

  'consume': Random.float (1, 99999, 2, 2), // 累计消费金额
  /*'down_consume': Random.float(1, 99999, 2, 2), // 下线累计消费金额
  'total': Random.float(1, 99999, 2, 2), // 累计提现金额
  'brokerage': Random.float(1, 99999, 2, 2),   // 累计佣金金额*/
  'user_no': Random.integer (1, 5000), // 新增用户数
  'consume_no': Random.integer (1, 5000), // 消费人数
  'f_no': Random.integer (1, 5000), // 新增一级代理数
  's_no': Random.integer (1, 5000), // 新增二级代理数
  'n_u_no': Random.integer (1, 5000), // 新增用户消费率
  'o_u_no': Random.integer (1, 5000), // 老用户消费率
  'n_a_no': Random.integer (1, 5000), // 新用户活跃度
  'o_a_no': Random.integer (1, 5000), // 老用户活跃度
  'o_s_no': Random.integer (1, 5000), // 老用户留存率
  'r_no': Random.integer (1, 5000) // 房卡购买总数

})

// 数据统计 和 房卡统计页面的chart图数据
let dataChart = Mock.mock ('http://data-chart.cn', {
  'chartDateStart': Random.date ('M月d日'),
  'chartDateEnd': Random.date ('M月d日'),
  'datas|90': [
    Random.float (1, 99999, 2, 2)
  ]
})

let data = Mock.mock ('http://data.cn', {
  'consume': Random.integer (1, 5000), // 总消费
  'n_count': Random.integer (1, 5000), // n天消费
  'd_most': Random.integer (1, 5000),  // 单日最高
  'd_count': Random.integer (1, 5000)  // 日均
})

// 统计页面数据
let homeData = Mock.mock ('http://home-data.cn', {
  'n_count': Random.float (1, 99999, 2, 2),
  'd_most': Random.float (1, 99999, 2, 2),
  'd_count': Random.float (1, 99999, 2, 2)
})


// 统计页面chart图
let homeChart = Mock.mock ('http://home-chart.cn', {
  'chartDateStart': Random.date ('M月d日'),
  'chartDateEnd': Random.date ('M月d日'),
  'datas|90': [
    Random.float (1, 99999, 2, 2)
  ]
})
export {consume, roomData, dataInfo, dataChart, data, homeData, homeChart}
