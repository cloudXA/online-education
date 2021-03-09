import request from '@/utils/request';

class UserInfo {
  // 登录
  login(data) {
    debugger;
    return request({
      url: '/api/user/login',
      method: 'post',
      data
    })
  }

  // 注册
  signUp(data) {
    return request({
      url: '/api/user/signup',
      method: 'post',
      data
    })
  }
}

const signOrlogin = new UserInfo();

export default signOrlogin; 