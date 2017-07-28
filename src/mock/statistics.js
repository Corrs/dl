import Mock from 'mockjs';

let Random = Mock.Random

let consume = Mock.mock ('http://consume.cn', {
  'datas|10-100': [
    {
      'name': '@cname',
      'consume': Random.float(1, 99999, 2, 2)
    }
  ]
})

let roomData = Mock.mock ('http://room.cn', {
  'consume': Random.integer(1, 5000),
  'direct': Random.integer(1, 5000),
  'proxy': Random.integer(1, 5000),
  'f_proxy': Random.integer(1, 5000),
  's_proxy': Random.integer(1, 5000)
})

let data = Mock.mock ('http://data.cn', {

  'consume': Random.float(1, 99999, 2, 2), // 累计消费金额
  /*'down_consume': Random.float(1, 99999, 2, 2), // 下线累计消费金额
  'total': Random.float(1, 99999, 2, 2), // 累计提现金额
  'brokerage': Random.float(1, 99999, 2, 2),   // 累计佣金金额*/
  'user_no': Random.integer(1, 5000), // 新增用户数
  'consume_no': Random.integer(1, 5000), // 消费人数
  'f_no': Random.integer(1, 5000), // 新增一级代理数
  's_no': Random.integer(1, 5000), // 新增二级代理数
  'n_u_no': Random.integer(1, 5000), // 新增用户消费率
  'o_u_no': Random.integer(1, 5000), // 老用户消费率
  'n_a_no': Random.integer(1, 5000), // 新用户活跃度
  'o_a_no': Random.integer(1, 5000), // 老用户活跃度
  'o_s_no': Random.integer(1, 5000), // 老用户留存率
  'r_no': Random.integer(1, 5000) // 房卡购买总数

})

export {consume, roomData, data}
