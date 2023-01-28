<script>
export default {
  methods: {
    touchmoveTest(event) {
      const touchX =
        event.touches[0].clientX -
        event.target.offsetLeft -
        event.target.offsetParent.offsetLeft -
        event.target.offsetWidth / 2;
      const touchY =
        event.touches[0].clientY -
        event.target.offsetTop -
        event.target.offsetParent.offsetTop -
        event.target.offsetHeight / 2;
      const offsetX =
        event.touches[0].pageX -
        event.target.offsetParent.offsetLeft -
        event.target.offsetWidth / 2;
      const offsetY =
        event.touches[0].pageY -
        event.target.offsetParent.offsetTop -
        event.target.offsetHeight / 2;
      if (
        offsetX > 0 &&
        offsetX <
          event.target.offsetParent.offsetWidth - event.target.offsetWidth &&
        offsetY > 0 &&
        offsetY <
          event.target.offsetParent.offsetHeight - event.target.offsetHeight
      ) {
        event.target.style.transform = `translate3D(${touchX}px, ${touchY}px, 0px)`;
      }
    },
  },
};
</script>

<template>
  <section>
    <div class="item" @touchmove="touchmoveTest"></div>
    <div class="item" @touchmove="touchmoveTest"></div>
    <div class="item" @touchmove="touchmoveTest"></div>
    <div class="item" @touchmove="touchmoveTest"></div>
    <div class="item" @touchmove="touchmoveTest"></div>
  </section>
</template>

<style lang="scss" scoped>
section {
  width: 300px;
  height: 300px;
  position: relative;
  box-shadow: 0px 0px 0px 1px #c8102e;
  .item {
    position: absolute;
    width: 35px;
    height: 35px;
    background-color: #eee;
    will-change: transform;
    transition-property: transform;
    transition-timing-function: linear;
    transition-duration: 50ms;
    touch-action: auto;
    -webkit-overflow-scrolling: touch;
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
      left: 15px;
    }
  }
}
</style>
