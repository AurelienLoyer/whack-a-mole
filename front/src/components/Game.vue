<template>
    <div>
        <board></board>
    </div>
</template>


<script>
    import Board from './Board.vue';

    export default {
        name: "game",
        components: { Board },
        mounted() {
            setTimeout( () => {
                this.$router.push('end');
            },3000)
        }
    };

</script>

<style lang="scss" scoped>
</style>
