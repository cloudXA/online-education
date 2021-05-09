import signOrlogin from '@/api/user';
import tokenInstance from '@/utils/auth';

const state = {
  token: tokenInstance.getToken()  // cookie
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  //登录
  login_vuex({ commit }, userInfo) {
    const { email, password } = userInfo;
    return new Promise((resolve, reject) => {
      signOrlogin.login({ email: email.trim(), password})
        .then(response => {
          commit('SET_TOKEN', response.data.token);      // vuex
          tokenInstance.setToken(response.data.token);   // cookie token
          tokenInstance.setUserInfo(response.data.userInfor[0]._id);   // cookie userInfo
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
    
  },

  // 注册
  sign_vuex({ commit }, userInfo) {
    const { email, password } = userInfo;
    return new Promise((resolve, reject) => {
      signOrlogin.signUp({ email: email.trim(), password})
        .then(response => {
          resolve(response)  
        })
        .catch(error => {
          reject(error)
        })
    })
    
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}