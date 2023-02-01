<script setup>
import PlayGame from "./components/PlayGame.vue";
</script>

<script scoped>
export default {
  methods: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<template>
  <main>
    <div v-if="isMobile()">
      <PlayGame />
    </div>
    <div v-else class="use-mobile">Please use a touch mobile phone!</div>
  </main>
</template>

<style scoped lang="scss">
main {
  max-width: 500px;
  margin: auto;
  height: 100%;
  box-shadow: 0 0 35px -30px #fff;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  height: 100vh;
  .use-mobile {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
  }
}
</style>
