<template>
    <div class="score">
        {{score}}
    </div>
</template>


<script>

    export default {
        name: "score",
        data() {
            return {
                score: 0,
            }
        },
        mounted() {
            setInterval(() => {
                this.score += 100
            }, 1000)
        },
    };

</script>

<style lang="scss" scoped>
    .score {
        width:25%;
        text-align: center;
        font-size: 4em;
        font-weight: bold;
    }
</style>
