<script scoped>
export default {};
</script>

<template>
  <main>
    <router-view />
  </main>
</template>

<style scoped lang="scss">
main {
  max-width: 500px;
  margin: auto;
  box-shadow: 0 0 35px -30px #fff;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  height: 100vh;
  background-color: #090304;
}
</style>
