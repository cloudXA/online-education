import Cookies from 'js-cookie'
const TokenKey = 'Cloud-Token'

class Token {
  getToken() {
    return Cookies.get(TokenKey)
  }

  setToken(token) {
    return Cookies.set(TokenKey, token)
  }

  removeToken() {
    return Cookies.remove(TokenKey)
  }

  setUserInfo(userInfo) {
    return Cookies.set('User', JSON.stringify(userInfo))
  }

  getUserInfo() {
    return Cookies.get('User')
  }
}

let tokenInstance = new Token();


export default tokenInstance;

