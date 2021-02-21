import request from '@/utils/request';

class LoginInfo {
  login(data) {
    debugger;
    return request({
      url: '',
      method: 'post',
      data
    })
  }
}

const loginInfo = new LoginInfo();

export default loginInfo; 