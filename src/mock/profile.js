import Mock from 'mockjs';

let Random = Mock.Random

let profile = Mock.mock ('http://profile.cn', {
  'bank_bind': '@bind',
  'person_bind': '@bind',
  'phone': /^1[3458][0-9]\d{8}$/,
  'cash': Random.float (1, 99999, 2, 2)
})

let bankCard = Mock.mock ('http://bankCard.cn', {
  'datas|1-10': [{
    'img': '@img',
    'name': '@bankname',
    'type': '@bankcardtype',
    'no': Random.integer (1000000000000000, 9999999999999999999).toString ()
  }]
})

let cash = Mock.mock ('http://cash.cn', {
  'data': {
    'total': Random.float (1, 99999, 2, 2),
    'cash': Random.float (1, 99999, 2, 2)
  },
  'card': {
    'bank': '@bankname', // 开户行
    'no': Random.integer (1000000000000000, 9999999999999999999).toString (),   // 卡号
    'type': '@bankcardtype', // 卡类型
    'img': '@img'   // 银行logo
  }
})

let cashList = Mock.mock ('http://cashList.cn', {
  'datas|20-100': [{
    'id': /^\d{8}$/, // 申请编号
    'apply': '@datetime',      // 申请时间
    'verify': '@datetime',     // 审核时间
    'no': Random.integer (1000000000000000, 9999999999999999999).toString (),         // 银行卡号
    'bank': '@bankname',       // 开户行
    'state': '@shstate',      // 状 态
    'reason|0-20': '@cword',     // 原因
    'money': Random.float (1, 99999, 2, 2),      // 提现金额
    'show': false
  }]
})

let spread = Mock.mock ('http://spread.cn', {
  'code': /^\d{5}$/,
  'url': '@url',
  'img': '@img'
})


let validCode = Mock.mock ('http://valid-code.cn', {
  'code': /^\d{5}$/   // 随即5位数验证码
})

export {profile, bankCard, cash, spread, validCode, cashList}
