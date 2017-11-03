<template>
  <div class="board">
    <ball v-for="(ball, i) in buttons" :key="`ball${i}`" :press="ball.isPress" :pop="ball.isActive" @poped="ball.isActive = false"
      :id="i" :image="ball.image"></ball>
  </div>
</template>

<script>
  import Ball from './Ball.vue';

  const defaultBtnModel = {
    color: 'firebrick',
    isActive: false,
    isPress: false,
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
      this.$options.sockets.onmessage = (message) => {
        let parsedMessage = JSON.parse(message.data)

        if (parsedMessage.type === 'press' && parsedMessage.data && parsedMessage.data <= this.buttons.length) {
          this.press(parsedMessage.data - 1)
        }
      }
    },
    methods: {
      press(index) {
        this.buttons[index].isPress = true
        setTimeout(() => {
          this.buttons[index].isPress = false
        }, 300)
      },
    },
  };
</script>

<style scoped>
  .board {
    display: flex;
    /* establish flex container */
    flex-wrap: wrap;
    /* enable flex items to wrap */
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
