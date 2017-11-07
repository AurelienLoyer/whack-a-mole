<template>
    <div class="game">
        <score></score>
        <board @click="start = true"></board>
        <countdown :seconde="120" :start="start"></countdown>
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
            }
        },
        mounted() {

        }
    };

</script>

<style lang="scss" scoped>
    .game{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
