import Mock from 'mockjs';

let Random = Mock.Random

export default Mock.mock ('http://home.cn', {

  'money': Random.float(1, 99999, 2, 2),

  'n_u_c': Random.integer(1, 5000),

  'n_f_c': Random.integer(1, 5000),

  'n_s_c': Random.integer(1, 5000)

})
