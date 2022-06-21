<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const message = ref('')
const isLoading = ref(false)

const sendMessage = (msg) => {
  isLoading.value = true
  console.log(msg)
  if (msg) {
    store.dispatch(store.getters['global/getBackend'] + '/postMessage', msg).then(() => {
      isLoading.value = false
      message.value = ''
    })
  } else {
    alert('no smg')
    isLoading.value = false
  }

}
</script>

<template>

  <div class="w-72 px-4 py-5 mx-auto">
    <div class="max-w-3xl mx-auto text-center items-center ustify-items-center justify-center">

      <label class="relative block p-3 border-2 border-gray-200 rounded-lg" for="message">
        <span class="text-xs font-medium text-gray-500" for="message">
          Your message
        </span>
        <input class="w-full p-0 text-sm border-none focus:ring-0 text-center" v-model="message" id="message" type="text" placeholder="" />
      </label>

      <br>

      <it-button
        type="primary"
        :loading="isLoading"
        class="hover:scale-110"
        @click="sendMessage(message)"
      >
        🚀 <br>Send
      </it-button>

    </div>
  </div>
</template>

<style scoped>
</style>
