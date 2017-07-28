import Mock from 'mockjs';

let Random = Mock.Random

let msg = Mock.mock ('http://msg.cn', {
  'datas|4-10': [
    {
      'id|+1': 1,
      'img': '@img',
      'type': /[1-4]/,
      'datetime': '@datetime',
      'title|5-10': '@cword',
      'content|5-10': '@cword'
    }
  ]
})

let cashmsg = Mock.mock ('http://cash-msg.cn', {
  'title|5-10': '@cword',
  'id': '@id', // 编号
  'submit': '@datetime',      // 提交时间
  'no': /\d{4}/,         // 银行卡号
  'bank': '@bankname',       // 开户行
  'state': '@shstate',      // 状 态
  'reason|5-10': '@cword',     // 原因
  'money': Random.float (1, 99999, 2, 2),      // 提现金额
  'remark|5-10': '@cword',
  'name': '@cname',
  'img': '@img',
  'phone': /^1[3458][0-9]\d{8}$/
})

let newProxyMsg =  Mock.mock ('http://new-proxy-msg.cn', {
  'title|5-10': '@cword',
  'f_proxy': /\d{1,4}/,
  's_proxy': /\d{1,4}/,
  'n_user': /\d{1,4}/
})

let controlProxyMsg = Mock.mock ('http://control-proxy-msg.cn', {
  'title|5-10': '@cword',
  'up_f': /\d{1,4}/,
  'down_f': /\d{1,4}/,
  'up_s': /\d{1,4}/,
  'down_s': /\d{1,4}/
})

let systemMsg = Mock.mock ('http://sys-msg.cn', {
  'title|5-10': '@cword',
  'content|0-100': '@cword'
})

export {msg, cashmsg, controlProxyMsg, newProxyMsg, systemMsg}
