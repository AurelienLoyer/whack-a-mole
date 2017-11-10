<template>
    <div class="game">
        <score></score>
        <board :message="boardMessage" @click="start = true"></board>
        <countdown :seconde="120"></countdown>
    </div>
</template>


<script>

    import Score from './Score.vue';
    import Board from './Board.vue';
    import Countdown from './Countdown.vue';

    export default {
        name: "game",
        components: {
            Board,
            Countdown,
            Score,
        },
        data() {
            return {
                start: false,
                boardMessage: '',
            }
        },
        mounted() {
            setTimeout(() => {
                this.$socket.onmessage = (message) => {
                    const parsedMessage = JSON.parse(message.data)

                    if (parsedMessage.type === 'end') {
                        this.$router.push('end', parsedMessage.data)
                    }
                    else {
                        this.boardMessage = parsedMessage
                    }
                }
            }, 10)
        },
    };

</script>

<style lang="scss" scoped>
    .game{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
