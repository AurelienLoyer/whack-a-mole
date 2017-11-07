<template>
    <div>
        <span v-if="value" class="count">{{value}}</span>
    </div>
</template>

<script>

    export default {
        name: "startgame",
        data() {
            return {
                items: [
                    '3','2','1','GO'
                ],
                value: '',
            }
        },
        mounted() {
            let i = 0
            this.value = this.items[0]
            let inter = setInterval(()=> {
                if( (i + 1) < this.items.length){
                    i = i + 1;
                }
                else {
                    clearInterval(inter);
                    this.$router.push('game');
                }
                this.value = this.items[i];
            }, 950)
        }
    };

</script>

<style lang="scss" scoped>
    .count {
        animation-name: anim;
        animation-duration: 1s;
        animation-iteration-count: 4;
        color: #0F1E2A;
        display: block;
        left: 0;
        position: fixed;
        text-align: center;
        top: 50%;
        width: 100%;
        font-weight: bold;
    }

    @keyframes anim {
        0% {
            display: block;
            color: #0F1E2A;
            transform: scale(1);
            opacity: 1;
        }
        100% {
            opacity: 0;
            color: white;
            transform: scale(100)
        }
    }
</style>
