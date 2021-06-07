const state = {
    reply: [],
    isCallBack: true,       // 是否展示回显信息
}


const mutations = {
    SET_REPLY: (state, reply) => {
        state.reply = reply
    },

    SET_CALLBACK: (state, callback) => {
        state.isCallBack = callback
    }
}

const actions = {
    setReply({ commit }, reply) {
        commit('SET_REPLY', reply)
    },

    setCallback({ commit }, callback) {
        commit('SET_CALLBACK', callback)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}