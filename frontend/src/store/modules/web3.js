import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from "ethers"

const state = () => ({
  abi: [ { "inputs": [], "name": "getMessages", "outputs": [ { "internalType": "string[]", "name": "", "type": "string[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "message", "type": "string" } ], "name": "pushMessage", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ],
  contractAddress: "0x520BADb5985e69b82B3fAa51292c15b3DEe6ac9A",
  provider: null,
  contract: null,
  messages: [],
})

const getters = {
  getState(state) {
    return state.messages.slice(state.messages.length - 5, state.messages.length)
  },
  getContract(state) {
    return state.contract
  }
}

const actions = {
  async setupConnection({ commit, state }) {
    const provider = await detectEthereumProvider()
    const checkWeb3Provider = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      commit("saveProvider", provider)
      const signer = provider.getSigner()
      return signer
    }

    // setup and save contract
    if (provider) {
      const signer_ = await checkWeb3Provider()
      console.log('THIS IS THE SIGNER: ', signer_)
      const contract_ = new ethers.Contract(
        state.contractAddress,
        state.abi,
        signer_,
      )
      console.log('SAVING CONTRACT')
      commit("saveContract", contract_)
    } else {
      alert('Please install MetaMask!')
    }
  },
  async getMessages({ commit, state }) {
    console.log('THE CONTRACT: ', state.contract)
    state.contract.getMessages().then((resp) => {
      console.log('web3 messageBoard', resp)
      commit('saveMessages', resp)
    })
  },
  async postMessage({ commit, state }, msg) {
    const transaction = await state.contract.pushMessage(msg)
    await transaction.wait()
    console.log('FINALLY CONFIRMED')
    commit("addMessage", msg)
  },
}

const mutations = {
  saveContract(state, contract) {
    state.contract = contract
  },
  saveProvider(state, provider) {
    state.provider = provider
  },
  saveMessages(state, messages) {
    state.messages = messages
  },
  addMessage(state, message) {
    state.messages = [...state.messages, message]
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
