<template>
    <div class="score">
        {{score}}
    </div>
</template>


<script>

    export default {
        name: "score",
        props: [
            'score',
        ],
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
