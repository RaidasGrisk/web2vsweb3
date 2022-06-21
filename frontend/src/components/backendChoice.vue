<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'


const store = useStore()
const web3Connection = computed(() => { store.getters['web3/getContract'] })

const clickEvent = (backend) => {
  console.log('backendSet', backend)
  store.dispatch('global/setLoading', true)
  store.dispatch('global/setBackend', backend)

  if (backend === 'web3') {
    store.dispatch('web3/setupConnection').then(() => {
      store.dispatch('web3/getMessages').then(() => {
        console.log('got the messages from web3: backendCoince.vue')
        store.dispatch('global/setLoading', false)
      })
      console.log('Contract: ', web3Connection.value)
    })
  }
  if (backend === 'web2') {
    store.dispatch('web2/getMessages').then(() => {
      store.dispatch('global/setLoading', false)
    })
  }

}

</script>

<template>
  <div class="text-center pt-10 text-xl font-medium">
    {{ store.getters['global/getBackend'] }}
  </div>
  <div class="w-96 px-4 py-6 mx-auto">
    <div class="grid grid-cols-2 gap-8">

      <div class="relative">
        <input class="hidden group peer" type="radio" name="shippingOption" id="standard_alt" checked="checked" @click="clickEvent('web2')"/>
        <label class="block p-4 text-sm font-medium transition-colors border border-gray-100 rounded-lg shadow-sm cursor-pointer peer-checked:border-blue-500 peer-checked:bg-gray-100 hover:bg-gray-100 peer-checked:ring-1 peer-checked:ring-blue-500" for="standard_alt">
          <span> WEB2  </span>
          <span class="block mt-1 text-xs text-gray-500">
            Node.js <br>mongo.db
          </span>
        </label>
        <svg class="absolute w-5 h-5 text-blue-600 opacity-0 top-4 right-4 peer-checked:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span
          class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 rounded"
        ></span>
      </div>

      <div class="relative">
        <input class="hidden group peer" type="radio" name="shippingOption" value="next_day_alt" id="next_day_alt" @click="clickEvent('web3')"/>
        <label class="block p-4 text-sm font-medium transition-colors border border-gray-100 rounded-lg shadow-sm cursor-pointer peer-checked:border-blue-500 hover:bg-gray-100 peer-checked:ring-1 peer-checked:ring-blue-500" for="next_day_alt">
          <span> WEB3 </span>
          <span class="block mt-1 text-xs text-gray-500">
            Ethereum (EVM)<br>
            {{ web3Connection }}
          </span>
        </label>
        <svg class="absolute w-5 h-5 text-blue-600 opacity-0 top-4 right-4 peer-checked:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span
          class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 rounded"
        ></span>
      </div>

    </div>
  </div>
  <div class="flex-grow border-t border-gray-200 py-4"></div>
</template>

<style scoped>
</style>
