import axios from 'axios'

const state = () => ({
  messages: [],
  backend: 'web2',
});

const getters = {
  getState(state) {
    return state.messages.slice(state.messages.length - 5, state.messages.length)
  },
  getBackend(state) {
    return state.backend
  }
}

const actions = {
  async getMessages({ commit }) {
    await axios({
      method: 'get',
      url: 'https://web2vsweb3backendnode.vercel.app/getMessages',
    }).then((res) => {
      const msgArray = res.data.map(msg => msg.message)
      console.log(msgArray)
      commit("saveMessages", msgArray)
    })
    .catch((error) => {
      console.log(error)
    })
  },
  async postMessage({ commit }, msg) {
    await axios({
      method: 'post',
      url: 'https://web2vsweb3backendnode.vercel.app/pushMessage',
      data: {
        message: msg, // This is the body part
      }
    }).then((res) => {
      console.log(res)
      commit("addMessage", msg)
    })
    .catch((error) => {
      console.log(error)
    })
  },
  setBackend({ commit }, backend) {
    commit("setBackend", backend)
  }
};

const mutations = {
  saveMessages(state, messages) {
    state.messages = messages
  },
  addMessage(state, message) {
    state.messages.push(message)
  },
  setBackend(state, backend) {
    state.backend = backend
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
