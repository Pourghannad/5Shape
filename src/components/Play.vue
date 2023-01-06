<script setup>
  const touchmoveTest = (event) => {
    const touchX = event.touches[0].clientX - event.target.offsetLeft - event.target.offsetParent.offsetLeft;
    const touchY = event.touches[0].clientY - event.target.offsetTop - event.target.offsetParent.offsetTop;
    event.target.style.transform = `translate3D(${touchX}px, ${touchY}px, 0px)`;
  }
</script>

<template>
  <section>
    <div class="item" @touchmove="touchmoveTest"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </section>
</template>

<style lang="scss" scoped>
section {
  width: 300px;
  height: 300px;
  position: relative;
  border: 1px solid #c8102e;
  .item {
    position: absolute;
    width: 35px;
    height: 35px;
    background-color: #eee;
    &:nth-of-type(1) {
      top: 40px;
      right: 40px;
    }
    &:nth-of-type(2) {
      top: 90px;
      right: 10px;
    }
    &:nth-of-type(3) {
      top: 200px;
      left: 10px;
    }
    &:nth-of-type(4) {
      top: 250px;
      right: 150px;
    }
    &:nth-of-type(5) {
      top: 25x;
      left: 15px;
    }
  }
}
</style>
