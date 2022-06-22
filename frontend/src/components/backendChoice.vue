<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { CheckmarkCircle, EllipseOutline } from '@vicons/ionicons5'
import { useLoadingBar } from 'naive-ui'
import { useMessage } from 'naive-ui'

const loadingBar = useLoadingBar()
const message = useMessage()
const store = useStore()
const web3Connection = computed(() => { store.getters['web3/getContract'] })

const clickEvent = (backend) => {
  store.dispatch('global/setLoading', true)
  store.dispatch('global/setBackend', backend)
  loadingBar.start()

  if (backend === 'web3') {
    store.dispatch('web3/setupConnection').then(() => {
      store.dispatch('web3/getMessages').then(() => {
        store.dispatch('global/setLoading', false)
        loadingBar.finish()
        message.info('Backend set to: WEB3')
      })
    })
  }
  if (backend === 'web2') {
    store.dispatch('web2/getMessages').then(() => {
      store.dispatch('global/setLoading', false)
      loadingBar.finish()
      message.info('Backend set to WEB2')
    })
  }

}

</script>

<template>
  <div class="flex flex-col justify-center items-center content-center">
    <n-space vertical :size="[0, 50]">
      <n-h1 data-sal="slide-up" data-sal-duration="500" data-sal-delay="800" class="text-center">
        <n-text type="info">
          Switch between web2 and web3 backends ⚙️
        </n-text>
      </n-h1>
      <n-thing data-sal="slide-up" data-sal-duration="500" data-sal-delay="100">
        <n-grid x-gap="12" y-gap="24" :cols="2">
          <n-gi>
            <n-card title="WEB2"
              :segmented="{ content: true, footer: 'soft', action: 'soft' }"
              :style="'cursor: pointer; ' + (store.getters['global/getBackend'] == 'web2' ? 'border-color: var(--info-color); border-width: 5px;' : '')"
              @click="clickEvent('web2')"
            >
              <template #header-extra>
                <n-icon size="30" color="var(--primary-color)">
                  <checkmark-circle v-if="store.getters['global/getBackend'] === 'web2'" />
                  <ellipse-outline v-else/>
                </n-icon>
              </template>
              <template #footer>
                <n-text depth="3">
                  Node.js + Mongo.db
                </n-text>
              </template>
              <template #action>
                <n-text depth="3" type="primary">
                Runs on 2 separate VMs
                </n-text>
              </template>
            </n-card>
          </n-gi>
          <n-gi>
            <n-card
              title="WEB3"
              :segmented="{ content: true, footer: 'soft', action: 'soft' }"
              :style="'cursor: pointer; ' + (store.getters['global/getBackend'] == 'web3' ? 'border-color: var(--info-color); border-width: 5px;' : '')"
              @click="clickEvent('web3')"
            >
              <template #header-extra>
                <n-icon size="30" color="var(--primary-color)">
                  <checkmark-circle v-if="store.getters['global/getBackend'] === 'web3'" />
                  <ellipse-outline v-else/>
                </n-icon>
              </template>
              <template #footer>
                <n-text depth="3">
                  Ethereum VM<br>
                </n-text>
              </template>
              <template #action>
                <n-text depth="3" type="primary">
                Runs on distributed EVM
                </n-text>
              </template>
            </n-card>
          </n-gi>
        </n-grid>
      </n-thing>
    </n-space>
  </div>
</template>

<style scoped>
</style>
