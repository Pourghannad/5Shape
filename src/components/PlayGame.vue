<script>
const scale = 2;
const incentiveDistance = 5;
export default {
  data() {
    return {
      fullScreen: false,
    };
  },
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
      const boxOneX =
        this.$refs.boxOne.getBoundingClientRect().x -
        this.$refs.boxOne.getBoundingClientRect().width / scale +
        incentiveDistance;
      const boxOneY =
        this.$refs.boxOne.getBoundingClientRect().y -
        this.$refs.boxOne.getBoundingClientRect().height / scale +
        incentiveDistance;
      alert(`X: ${boxOneX.toFixed(2)} Y: ${boxOneY}`);
    },
    onFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          alert(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
      }
      this.fullScreen = true;
    },
  },
};
</script>

<template>
  <div v-if="!fullScreen">
    <button class="full-screen" @click="onFullScreen">
      <svg
        width="700pt"
        height="700pt"
        version="1.1"
        viewBox="0 0 700 700"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m507.5 210c4.6406 0 9.0938-1.8438 12.375-5.125s5.125-7.7344 5.125-12.375v-70c0.015625-2.0469-0.40234-4.0742-1.2266-5.9492-0.84375-1.7031-1.9023-3.293-3.1484-4.7266l-1.3984-1.0508c-1.0391-1.0664-2.293-1.9023-3.6758-2.4492h-1.5742c-1.9023-1.5508-4.1094-2.6836-6.4766-3.3242h-70c-6.2539 0-12.031 3.3359-15.156 8.75s-3.125 12.086 0 17.5 8.9023 8.75 15.156 8.75h27.824l-115.32 115.32-115.32-115.32h45.324c6.2539 0 12.031-3.3359 15.156-8.75s3.125-12.086 0-17.5-8.9023-8.75-15.156-8.75h-87.5c-2.0977 0.039062-4.1719 0.45312-6.125 1.2266h-1.5742c-1.3867 0.54688-2.6367 1.3789-3.6758 2.4492l-1.3984 1.0508c-1.25 1.4336-2.3086 3.0195-3.1523 4.7227-1.2852 2.4766-1.832 5.2734-1.5742 8.0508v87.5c0 6.2539 3.3359 12.031 8.75 15.156s12.086 3.125 17.5 0 8.75-8.9023 8.75-15.156v-45.324l115.32 115.32-115.32 115.32v-45.324c0-6.2539-3.3359-12.031-8.75-15.156s-12.086-3.125-17.5 0-8.75 8.9023-8.75 15.156v87.5c-0.015625 2.0469 0.40234 4.0742 1.2266 5.9492 0.84375 1.7031 1.9023 3.293 3.1484 4.7266l1.3984 1.0508c1.0391 1.0664 2.293 1.9023 3.6758 2.4492l1.5742 0.875c1.9766 1.2383 4.1758 2.0703 6.4766 2.4492h87.5c6.2539 0 12.031-3.3359 15.156-8.75s3.125-12.086 0-17.5-8.9023-8.75-15.156-8.75h-45.324l115.32-115.32 115.32 115.32h-27.824c-6.2539 0-12.031 3.3359-15.156 8.75s-3.125 12.086 0 17.5 8.9023 8.75 15.156 8.75h70c2.2969 0.058594 4.5742-0.42188 6.6484-1.3984 1.7031-0.84375 3.293-1.9023 4.7266-3.1523l1.0508-1.3984c1.0664-1.0391 1.9023-2.2891 2.4492-3.6758 0.35547-0.48438 0.65234-1.0156 0.875-1.5742 0.97266-1.9727 1.5664-4.1094 1.75-6.3008v-70c0-6.2539-3.3359-12.031-8.75-15.156s-12.086-3.125-17.5 0-8.75 8.9023-8.75 15.156v27.824l-115.32-115.32 115.32-115.32v27.824c0 4.6406 1.8438 9.0938 5.125 12.375s7.7344 5.125 12.375 5.125z"
        />
      </svg>
    </button>
  </div>
  <section v-else>
    <div class="correct-item">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="game-box">
      <div
        ref="boxOne"
        class="item"
        @touchmove="touchmoveTest"
        @touchend="touchEnd"
      ></div>
      <div
        ref="boxTWO"
        class="item"
        @touchmove="touchmoveTest"
        @touchend="touchEnd"
      ></div>
      <div
        ref="boxThree"
        class="item"
        @touchmove="touchmoveTest"
        @touchend="touchEnd"
      ></div>
      <div
        ref="boxFour"
        class="item"
        @touchmove="touchmoveTest"
        @touchend="touchEnd"
      ></div>
      <div
        ref="boxFive"
        class="item"
        @touchmove="touchmoveTest"
        @touchend="touchEnd"
      ></div>
    </div>
    <button class="submit" @click="onSubmit">Submit</button>
  </section>
</template>

<style lang="scss" scoped>
.full-screen {
  position: absolute;
  width: 70px;
  height: 70px;
  background-color: #8f8fc1;
  border: 0;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0px);
  box-shadow: 5px 5px 0px #5555a7;
  transition-property: box-shadow;
  transition-duration: 100ms;
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    box-shadow: 0 0 0 2px #fff;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    transform: scale3D(1,1,1);
    animation-name: fullScreenAnimation;
    animation-duration: 400ms;
    animation-iteration-count: 2;
  }
  @keyframes fullScreenAnimation {
    0% {
      transform: scale3D(1,1,1);
      opacity: 1;
    }
    100% {
      transform: scale3D(1.5,1.5,1);
      opacity: 0;
    }
  }
  &:active {
    box-shadow: 2px 2px 0px #5555a7;
  }
  svg {
    width: 100%;
    height: 100%;
    fill: #00f;
    margin-top: 5px;
  }
}
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
    background-color: rgba(69, 27, 122, 0.6);
    color: #fff;
    padding: 1em 2em;
    border: 3px solid #371265;
    width: 76%;
    cursor: pointer;
  }
}
</style>
