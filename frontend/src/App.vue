<script setup>
import banner from './components/banner.vue'
import whiteboard from './components/whiteboard.vue'
import backendChoice from './components/backendChoice.vue'
import payload from './components/payload.vue'
import footer_ from './components/footer.vue'

import { lightTheme } from 'naive-ui'
import { NConfigProvider, NGlobalStyle, NMessageProvider, NNotificationProvider, NLoadingBarProvider } from 'naive-ui'

// sal
import sal from "sal.js"
import { onMounted } from 'vue'

onMounted(() => {
  sal({ threshold: 0.05, once: true, disabled: false })
})

const theme = lightTheme
theme.common.primaryColor = '#6E44FF'
theme.common.primaryColorHover = '#6E44FF'
theme.common.successColor = '#ECA400'
theme.common.warningColor = '#F97068'
theme.common.infoColor = '#0D0A0B'

</script>

<template>
  <n-config-provider :theme="theme">
  <n-loading-bar-provider>
  <n-message-provider placement="top-right">
  <n-notification-provider>
  <n-el>

    <n-layout>
      <n-layout-header class="pt-32 pb-16 pr-4 pl-4" style="backgroundColor: var(--primary-color)">
        <banner/>
      </n-layout-header>
      <n-layout-content>
        <n-thing class="pt-16 pb-16 pr-4 pl-4" content-style="padding: 24px;" style="backgroundColor: var(--warning-color)">
          <whiteboard />
        </n-thing>
        <n-thing class="pt-16 pb-16 pr-4 pl-4" content-style="padding: 24px;" style="backgroundColor: var(--primary-color)">
          <backendChoice/>
        </n-thing>
        <n-thing class="pt-16 pb-36 pr-4 pl-4" content-style="padding: 24px;" style="backgroundColor: var(--info-color)">
          <payload />
        </n-thing>
      </n-layout-content>
      <n-layout-footer class="pt-32 pb-32 pr-4 pl-4" content-style="padding: 24px;" style="backgroundColor: #E2DBDD">
        <footer_ />
      </n-layout-footer>
    </n-layout>

  </n-el>
  </n-notification-provider>
  </n-message-provider>
  </n-loading-bar-provider>
  </n-config-provider>
</template>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
}
</style>
