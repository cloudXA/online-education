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
  // user login
  login_vuex({ commit }, userInfo) {
    const { email, password } = userInfo;
    return new Promise((resolve, reject) => {
      signOrlogin.login({ email: email.trim(), password})
        .then(response => {
          console.log(response, 'response')
          commit('SET_TOKEN', response.data.token);      // vuex
          tokenInstance.setToken(response.data.token);   // cookie
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
          console.log(response)
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