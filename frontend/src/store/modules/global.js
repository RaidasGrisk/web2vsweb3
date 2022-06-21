const state = () => ({
  backend: 'web2',
  isLoading: false,
})

const getters = {
  getBackend(state) {
    return state.backend
  },
  isLoading(state) {
    return state.isLoading
  }
}

const actions = {
  async setBackend({ commit }, backend) {
    commit('setBackend', backend)
  },
  setLoading({ commit }, loading) {
    commit('setLoading', loading)
  }
}

const mutations = {
  setBackend(state, backend) {
    state.backend = backend
  },
  setLoading(state, loading) {
    console.log('setting loading to: ', loading)
    state.isLoading = loading
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
