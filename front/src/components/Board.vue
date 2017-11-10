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
        props: [
            'message'
        ],
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
        watch: {
            message() {
                if (this.message.type === 'press' && this.message.data && this.message.data <= this.buttons.length) {
                    this.press(this.message.data - 1)
                }
                if (this.message.type === 'pop' && this.message.data && this.message.data.index <= this.buttons.length) {
                    this.pop(this.message.data.index - 1, this.message.data.image)
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
