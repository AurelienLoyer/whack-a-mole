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
                const parsedMessage = JSON.parse(message.data)

                if (parsedMessage.type === 'press' && parsedMessage.data && parsedMessage.data <= this.buttons.length) {
                    this.press(parsedMessage.data - 1)
                }

                if (parsedMessage.type === 'pop' && parsedMessage.data && parsedMessage.data.index <= this.buttons.length) {
                    this.pop(parsedMessage.data.index - 1, parsedMessage.data.image)
                }

                if (parsedMessage.type === 'end') {
                    this.$router.push('end')
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
            pop(index, image) {
                this.buttons[index].isActive = true
                this.buttons[index].image = image
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
