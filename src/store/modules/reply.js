const state = {
    reply: [],
}

const mutations = {
    SET_REPLY: (state, reply) => {
        state.reply = reply
    }
}

const actions = {
    setReply({ commit }, reply) {
        commit('SET_REPLY', reply)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}