const state = {
    isAll: ""
    
}


const mutations = {
    SET_ISALL: (state, isAll) => {
        state.isAll = isAll
    },

}

const actions = {
    set_isAll({ commit }, isAll) {
        commit('SET_ISALL', isAll)
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}