<script setup>
import { LogoGithub } from '@vicons/ionicons5'
</script>

<template>
  <div class="flex flex-col justify-center items-center content-center">
    <n-space vertical>
      <n-h4 data-sal="slide-up" data-sal-duration="500" data-sal-delay="800" class="text-center">
        <n-text type="info">
          Web2vsWeb3
        </n-text>
      </n-h4>
      <n-thing class="text-center items-center ustify-items-center justify-center" data-sal="slide-up" data-sal-duration="500" data-sal-delay="100">
        ⚔️
      </n-thing>
      <br>
      <n-thing class="text-center items-center ustify-items-center justify-center" data-sal="slide-up" data-sal-duration="500" data-sal-delay="100">
        <a href="https://github.com/RaidasGrisk/web2vsweb3" target="_blank">
          <n-button size="large" type="primary" >
            <template #icon>
              <n-icon color="var(--info-color)">
                <logo-github/>
              </n-icon>
            </template>
          </n-button>
        </a>
      </n-thing>
    </n-space>
  </div>
</template>

<style scoped>
</style>
