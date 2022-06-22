<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { ChatbubbleEllipses } from '@vicons/ionicons5'
import { useLoadingBar } from 'naive-ui'
import { useMessage } from 'naive-ui'

const loadingBar = useLoadingBar()
const message = useMessage()
const store = useStore()
const isLoading = ref(false)
const value = ref('')
let messageReactive = null

watch(()=>store.getters['web3/getTRansationState'], () => {
  const state = store.getters['web3/getTRansationState']
  if (state == 'start') {
    message.info('Waiting for your confirmation')
  }
  if (state == 'going') {
    messageReactive = message.create('Awaiting network confirmation', {
      type: 'loading',
      duration: 0
    })
  }
  if (state == 'finished') {
    if (messageReactive) {
      messageReactive.destroy()
      messageReactive = null
    }
    // message.info('Message sent 🤗')
  }
})

const sendMessage = (msg) => {
  loadingBar.start()
  isLoading.value = true
  if (msg) {
    store.dispatch(store.getters['global/getBackend'] + '/postMessage', msg).then(() => {
      isLoading.value = false
      value.value = ''
      loadingBar.finish()
      message.success('Message sent 🤗')
      message.success('Check out the bottom of the message board!')
    })
  } else {
    isLoading.value = false
    loadingBar.error()
    message.error('Message was not sent 😔')
    message.error('Fill in the message and try again!')
  }

}
</script>

<template>
  <div class="flex flex-col justify-center items-center content-center">
    <n-space vertical>
      <n-h1 data-sal="slide-up" data-sal-duration="500" data-sal-delay="800" class="text-center">
        <n-text type="primary">
          Post a message
        </n-text>
      </n-h1>
      <n-thing data-sal="slide-up" data-sal-duration="500" data-sal-delay="100">
        <n-input v-model:value="value" placeholder="Message" style="--n-border-hover:  var(--warning-color); --n-border-focus:  var(--warning-color); --n-border: 5px;">
          <template #prefix>
            <n-icon :component="ChatbubbleEllipses" />
          </template>
        </n-input>
      </n-thing>
      <br>
      <n-thing class="text-center items-center ustify-items-center justify-center">
        <n-button type="primary" @click="sendMessage(value)" class="hover:scale-110" size="large" :loading="isLoading">
          🚀 <br>Send
        </n-button>
      </n-thing>
    </n-space>
  </div>
</template>

<style scoped>
</style>
