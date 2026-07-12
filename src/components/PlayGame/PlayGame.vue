<script>
const SCALE = 1;
const INCENTIVE_DISTANCE = 0;
const TOUCH_MOVE_OFFSET = 20;

export default {
  name: "GameLevel",
  data() {
    return {
      fullScreen: false,
      countDown: true,
      score: 0,
      level: {},
      boxPositions: [],
    };
  },
  watch: {
    "$route.query.level": {
      handler() {
        this.getLevel(this.$route.query.level || 1);
      },
    },
  },
  mounted() {
    this.getLevel(this.$route.query.level || 1);
  },
  methods: {
    getLevel(level) {
      fetch(`./levels/${level}.json`)
        .then((res) => res.json())
        .then((data) => {
          this.level = data;
          this.boxPositions = data.init.map((item) => ({
            x: item.x || 0,
            y: item.y || 0,
          }));
        })
        .catch((err) => console.error("Failed to load level:", err));
    },
    touchmoveItems(event, index) {
      event.preventDefault();
      const target = event.target;
      const parent = target.offsetParent;

      const touchX =
        event.touches[0].clientX -
        target.offsetLeft -
        parent.offsetLeft -
        target.offsetWidth / 2;
      const touchY =
        event.touches[0].clientY -
        target.offsetTop -
        parent.offsetTop -
        target.offsetHeight / 2;

      const offsetX =
        event.touches[0].pageX - parent.offsetLeft - target.offsetWidth / 2;
      const offsetY =
        event.touches[0].pageY - parent.offsetTop - target.offsetHeight / 2;

      const parentWidth = parent.offsetWidth;
      const parentHeight = parent.offsetHeight;
      const targetWidth = target.offsetWidth;
      const targetHeight = target.offsetHeight;

      const inBounds =
        offsetX > -TOUCH_MOVE_OFFSET &&
        offsetX < parentWidth - targetWidth + TOUCH_MOVE_OFFSET &&
        offsetY > -TOUCH_MOVE_OFFSET &&
        offsetY < parentHeight - targetHeight + TOUCH_MOVE_OFFSET;

      if (inBounds) {
        this.boxPositions[index].x = touchX;
        this.boxPositions[index].y = touchY;
        target.style.transform = `translate3D(${touchX}px, ${touchY}px, 0px) scale3D(${SCALE}, ${SCALE}, 1)`;
      }
      return false;
    },

    touchEnd(event) {
      event.preventDefault();
      setTimeout(() => {
        this.onSubmit();
      }, 100);
    },

    calcuteBoxPosition(clientRect, index) {
      const gameBoxRect = this.$refs.gameBox.getBoundingClientRect();
      const windowSpaceToGameX = (window.innerWidth - gameBoxRect.width) / 2;
      const windowSpaceToGameY = (window.innerHeight - gameBoxRect.height) / 2;

      const boxX = Math.floor(
        clientRect.x - windowSpaceToGameX - INCENTIVE_DISTANCE
      );
      const boxY = Math.floor(
        clientRect.y - windowSpaceToGameY - INCENTIVE_DISTANCE
      );

      const correct = this.level.correct?.[index];
      if (!correct) return 0;
      return Math.abs(boxX - correct.x) + Math.abs(boxY - correct.y);
    },

    onSubmit() {
      const boxRefs = ["boxOne", "boxTwo", "boxThree", "boxFour", "boxFive"];
      let totalScore = 0;

      boxRefs.forEach((ref, index) => {
        const el = this.$refs[ref];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const distance = this.calcuteBoxPosition(rect, index);
        totalScore += distance;
      });
      this.score = 100 - totalScore;
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
      setTimeout(() => {
        this.countDown = false;
      }, 1500);
    },
    calcuteBg(score) {
      let result = "#7a4cdf";
      if (score < -1000) {
        result = "#810000";
      } else if (score > -1000 && score < -500) {
        result = "#813900";
      } else if (score > -500 && score < -150) {
        result = "#816f00";
      } else if (score > -150 && score < 0) {
        result = "#778100";
      } else if (score >= 0 && score < 65) {
        result = "#3e8100";
      } else if (score > 65) {
        result = "#81d82f";
      }
      return result;
    },
  },
};
</script>

<template>
  <div
    v-if="fullScreen"
    class="intro"
    :style="{
      background: score !== 0 ? calcuteBg(score) : undefined,
      color: score !== 0 ? '#fff' : undefined,
      textAlign: score === 0 ? 'left' : 'center',
    }"
  >
    <p>
      {{
        score === 0
          ? "Tap, hold, and slide each item to reposition it, and refine the set so everything aligns with a single, unified resolve."
          : `${score}/100`
      }}
    </p>
  </div>
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
    <div v-if="countDown" class="start-count-down">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
    </div>
    <div ref="gameBox" class="game-box">
      <div
        ref="boxOne"
        class="item"
        :style="[
          {
            transform: `translate3D(${boxPositions[0]?.x || 0}px, ${
              boxPositions[0]?.y || 0
            }px, 0px)`,
          },
          level.init?.[0]?.css,
        ]"
        @touchmove="touchmoveItems($event, 0)"
        @touchend="touchEnd"
      >
        {{ level.init?.[0]?.content }}
      </div>
      <div
        ref="boxTwo"
        class="item"
        :style="[
          {
            transform: `translate3D(${boxPositions[1]?.x || 0}px, ${
              boxPositions[1]?.y || 0
            }px, 0px)`,
          },
          level.init?.[1]?.css,
        ]"
        @touchmove="touchmoveItems($event, 1)"
        @touchend="touchEnd"
      >
        {{ level.init?.[1]?.content }}
      </div>
      <div
        ref="boxThree"
        class="item"
        :style="[
          {
            transform: `translate3D(${boxPositions[2]?.x || 0}px, ${
              boxPositions[2]?.y || 0
            }px, 0px)`,
          },
          level.init?.[2]?.css,
        ]"
        @touchmove="touchmoveItems($event, 2)"
        @touchend="touchEnd"
      >
        {{ level.init?.[2]?.content }}
      </div>
      <div
        ref="boxFour"
        class="item"
        :style="[
          {
            transform: `translate3D(${boxPositions[3]?.x || 0}px, ${
              boxPositions[3]?.y || 0
            }px, 0px)`,
          },
          level.init?.[3]?.css,
        ]"
        @touchmove="touchmoveItems($event, 3)"
        @touchend="touchEnd"
      >
        {{ level.init?.[3]?.content }}
      </div>
      <div
        ref="boxFive"
        class="item"
        :style="[
          {
            transform: `translate3D(${boxPositions[4]?.x || 0}px, ${
              boxPositions[4]?.y || 0
            }px, 0px)`,
          },
          level.init?.[4]?.css,
        ]"
        @touchmove="touchmoveItems($event, 4)"
        @touchend="touchEnd"
      >
        {{ level.init?.[4]?.content }}
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "./style.scss";
</style>
