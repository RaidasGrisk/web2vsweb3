import { createStore } from "vuex"
import web2Module from './modules/web2'
import web3Module from './modules/web3'
import globalModule from './modules/global'

const store = createStore({
  modules:{
    web2: web2Module,
    web3: web3Module,
    global: globalModule,
  }
})

export default store
