<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useLoadingBar } from 'naive-ui'

const loadingBar = useLoadingBar()
const isLoading = computed(() => store.getters['global/isLoading'])
const store = useStore()

const backend = computed(() => store.getters['global/getBackend'])
const messages = computed(() => arrayToObjects(store.getters[store.getters['global/getBackend'] + '/getState']))

const arrayToObjects = (array) => {
  return array.map((str) => ({ 'message': str }))
}

const getMessages = () => {
  loadingBar.start()
  store.dispatch('global/setLoading', true)
  console.log(store.getters['global/isLoading'])
  isLoading.value = true
  store.dispatch(store.getters['global/getBackend'] + '/getMessages').then(() => {
    messages.value = store.getters[store.getters['global/getBackend'] + '/getState']
    store.dispatch('global/setLoading', false)
    loadingBar.finish()
  })
}

onMounted(() => {
  console.log(loadingBar)
  loadingBar.loadingBarRef.value.cssVars['--n-height'] = "10px"
  loadingBar.loadingBarRef.value.cssVars['--n-color-loading'] = "#0D0A0B"

  getMessages()
})

</script>

<template>

  <div class="flex flex-col justify-center items-center content-center">
    <n-space vertical :size="[0, 50]">
      <n-h1 data-sal="slide-up" data-sal-duration="500" data-sal-delay="100" class="text-center">
        <n-text type="info">
          How will we spot the difference?
        </n-text>
      </n-h1>
      <n-thing>
        <n-grid x-gap="12" y-gap="24" :cols="2">
          <n-gi>
            <n-card title="Lets look at a simple web app" style="text-align: center; max-width: 350px;" data-sal="slide-up" data-sal-duration="500" hoverable>
              You write a message and push it to the message board 📝. Simple right?<br><br>
              Below is the thing showing the last 5 messages <br>
              <span style="font-size: 1.8rem;" data-sal="slide-up" data-sal-duration="500">👇</span>
            </n-card>
          </n-gi>
          <n-gi>
            <n-card title="But there's a catch!" style="text-align: center; max-width: 350px;" data-sal="slide-up" data-sal-duration="500" hoverable>
              In fact, there's single app but two backends, not one 👀. Wait what!?<br><br>
              Let's try both of them and see how they differ.<br>
              <span style="font-size: 1.8rem;" data-sal="slide-up" data-sal-duration="500">🤔</span>
            </n-card>
          </n-gi>
        </n-grid>
      </n-thing>
    </n-space>
    <br><br>
    <n-thing style="text-align: center; max-width: 350px; min-height: 320px;">
    <n-spin :show="isLoading" size="large">
      <n-card title="Message board 📝" data-sal="slide-up" data-sal-duration="500">
        <n-data-table
          :columns="[{title: 'Message', key: 'message'}]"
          :data="messages"
          :bordered="false"
          style="max-width: 300px;"
          virtual-scroll
        />
      </n-card>
    </n-spin>
  </n-thing>
  </div>
</template>

<style scoped>
.td {
  padding: 2px;
}
</style>
