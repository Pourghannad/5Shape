<script>
const scale = 2;
const incentiveDistance = 5;
export default {
  methods: {
    touchmoveTest(event) {
      event.preventDefault();
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
        event.target.style.transform = `translate3D(${touchX}px, ${touchY}px, 0px) scale3D(${scale}, ${scale}, 1)rotate3d(1, 1, 1, 45deg`;
      }
      return false;
    },
    touchEnd(event) {
      event.preventDefault();
      event.target.style.transform = `${
        event.target.style.transform.split(" scale3d")[0]
      } scale3D(1, 1, 1)`;
      return false;
    },
    onSubmit() {
      const boxOneX = this.$refs.boxOne.getBoundingClientRect().x - (this.$refs.boxOne.getBoundingClientRect().width / scale) + incentiveDistance;
      console.log('event', boxOneX, this.$refs.boxOne.getBoundingClientRect().x - this.$refs.boxOne.offsetParent.offsetLeft - this.$refs.boxOne.offsetWidth / 2);
    }
  },
};
</script>

<template>
  <section>
    <div class="correct-item">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="game-box">
      <div ref="boxOne" class="item" @touchmove="touchmoveTest" @touchend="touchEnd"></div>
      <div ref="boxTWO" class="item" @touchmove="touchmoveTest" @touchend="touchEnd"></div>
      <div ref="boxThree" class="item" @touchmove="touchmoveTest" @touchend="touchEnd"></div>
      <div ref="boxFour" class="item" @touchmove="touchmoveTest" @touchend="touchEnd"></div>
      <div ref="boxFive" class="item" @touchmove="touchmoveTest" @touchend="touchEnd"></div>
    </div>
    <button class="submit" @click="onSubmit">Submit</button>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1em;
  .correct-item {
    width: 90px;
    height: 90px;
    box-shadow: 0px 0px 0px 1px #19953c;
    margin-bottom: 2em;
    span {
      width: 12px;
      height: 12px;
      position: absolute;
      transform: translate3D(0px, 0px, 0px);
      background-color: #fff;
      &:nth-of-type(1) {
        transform: translate3D(0px, 0px, 0px);
      }
      &:nth-of-type(2) {
        transform: translate3D(0px, 19px, 0px);
      }
      &:nth-of-type(3) {
        transform: translate3D(0px, 38px, 0px);
      }
      &:nth-of-type(4) {
        transform: translate3D(0px, 57px, 0px);
      }
      &:nth-of-type(5) {
        transform: translate3D(0px, 76px, 0px);
      }
    }
  }
  .game-box {
    width: 300px;
    height: 300px;
    position: relative;
    box-shadow: 0px 0px 0px 1px #c8102e;
    .item {
      position: absolute;
      top: 0px;
      right: 0px;
      width: 30px;
      height: 30px;
      background-color: #eee;
      will-change: transform;
      transition-property: transform;
      transition-timing-function: linear;
      transition-duration: 50ms;
      touch-action: auto;
      -webkit-overflow-scrolling: touch;
      transform: translate3D(0px, 0px, 0px);
      &:nth-of-type(1) {
        background-color: #00f;
        transform: translate3D(-40px, 40px, 0px);
      }
      &:nth-of-type(2) {
        transform: translate3D(-10px, 90px, 0px);
      }
      &:nth-of-type(3) {
        transform: translate3D(-160px, 100px, 0px);
      }
      &:nth-of-type(4) {
        transform: translate3D(-200px, 250px, 0px);
      }
      &:nth-of-type(5) {
        transform: translate3D(-20px, 0px, 0px);
      }
    }
  }
  .submit {
    margin-top: 5em;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: rgba(69,27,122,.6);
    color: #fff;
    padding: 1em 2em;
    border: 3px solid #371265;
    width: 76%;
    cursor: pointer;
  }
}
</style>
