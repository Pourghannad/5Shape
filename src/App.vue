<script setup>
import Play from './components/Play.vue'
</script>

<template>
  <main>
    <Play msg="5Shape" />
  </main>
</template>

<style scoped>
main {
    max-width: 500px;
    margin: auto;
    height: 100%;
    box-shadow: 0 0 35px -30px #fff;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: 100vh;
}
</style>
