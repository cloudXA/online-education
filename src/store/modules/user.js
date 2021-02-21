import loginInfo from '@/api/user';

const state = {
  token: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // user login
  login_vuex({ commit }, userInfo) {
    debugger;
    const { account, password } = userInfo;
    loginInfo.login({ account: account.trim(), password})
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        reject(error)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}