import Mock from 'mockjs';

let Random = Mock.Random

let proxy = Mock.mock ('http://proxy.cn', {

  'money': Random.float(1, 99999, 2, 2),

  'n_u_c': Random.integer(1, 5000),

  'n_f_c': Random.integer(1, 5000),

  'n_s_c': Random.integer(1, 5000)

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

export {proxy, controlProxy}
