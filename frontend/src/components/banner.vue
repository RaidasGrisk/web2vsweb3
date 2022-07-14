<script setup>
// import { onMounted } from 'vue'
import Atropos from 'atropos/vue';

const headerClass = "text-6xl font-extrabold text-transparent md:text-1xl bg-clip-text bg-gradient-to-r from-blue-600 via-fuchsia-500 to-blue-600"

</script>

<template>

  <atropos class="my-atropos">
    <n-space justify="center">
      <div data-sal="slide-right" data-sal-duration="900">
        <n-text type="info" style="font-size: 4rem; font-weight: 800;">
          web2
        </n-text>
      </div>
      <div data-sal="zoom-in" data-sal-easing="ease-out-back" data-sal-duration="500" data-sal-delay="700">
        <div :class="headerClass + ' text-7xl text-black animate-[pulse_1s_ease-in_1]'" >
          ⚔️
        </div>
      </div>
      <div data-sal="slide-left" data-sal-duration="900">
        <n-text type="info" style="font-size: 4rem; font-weight: 800;">
          web3
        </n-text>
      </div>
    </n-space>
  </atropos>

  <br><br>

  <n-space vertical style="text-align: center;">
    <n-h1 data-sal="slide-up" data-sal-duration="500" data-sal-delay="800">
      <n-text type="success">
        What is the difference?
      </n-text>
    </n-h1>
    <n-h4 data-sal="slide-up" data-sal-duration="800" data-sal-delay="1000">
      <n-text type="success">
        Lets try out both and see what it's like <br>
        <span style="font-size: 1.8rem;" data-sal="slide-up" data-sal-duration="500">🧐️</span>
      </n-text>
    </n-h4>
  </n-space>

</template>

<style scoped>
</style>
