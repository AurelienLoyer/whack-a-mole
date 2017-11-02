<template>
    <div class="board">
        <ball v-for="(ball, i) in buttons" :key="`ball${i}`" :pop="ball.isActive" @poped="ball.isActive = false" :id="i"
              :image="ball.image"></ball>
    </div>
</template>

<script>
  import Ball from './Ball.vue';

  const defaultBtnModel = {
    color: 'firebrick',
    isActive: false,
    image: '',
  };

  export default {
    name: 'WhackAMole',
    components: { Ball },
    data() {
      return {
        usersWithAvatar: [],
        buttons: [
          { ...defaultBtnModel }, { ...defaultBtnModel }, { ...defaultBtnModel },
          { ...defaultBtnModel }, { ...defaultBtnModel }, { ...defaultBtnModel },
          { ...defaultBtnModel }, { ...defaultBtnModel }, { ...defaultBtnModel },
        ],
        imagesIndex: [],
        buttonsIndex: [],
      };
    },
    mounted() {
      setInterval(() => {
        const ball = this.getRandomBall();
        ball.image = this.getRandomImage();
        ball.isActive = true;
      }, 500);
    },
    methods: {
      getRandomBall() {
        return this.buttons[this.getRandomBallIndex()];
      },
      getRandomBallIndex() {
        const randomNumber = (Math.random() * 8) + 1;
        this.buttonsIndex[Math.floor(randomNumber)] = true;
        return Math.floor(randomNumber);
      },
      getRandomImage() {
        return `./statics/img/Zenika-${this.getRandomImageIndex()}.jpg`;
      },
      getRandomImageIndex() {
        const randomNumber = (Math.random() * 23) + 1;
        this.imagesIndex[Math.floor(randomNumber)] = true;
        return Math.floor(randomNumber);
      },
    },
  };
</script>

<style scoped>
    .board {
        display: flex; /* establish flex container */
        flex-wrap: wrap; /* enable flex items to wrap */
        justify-content: space-around;
        width: 50%;
        margin: auto;
        z-index: 10;
    }

    svg {
        width: 33%;
        height: 33%;
    }
</style>
