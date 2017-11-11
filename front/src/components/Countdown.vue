<template>
    <div class="countdown">
        <div class="time">
            {{ time }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "countdown",
        props: {
            seconds: Number,
            message: String
        },
        data() {
            return {
                timer: null,
                time: localStorage.getItem("time"),
                label: this.message ? this.message : "Time's up!"
            };
        },
        mounted() {
            let inter = setInterval(() => {
                if(this.time > 0) {
                    this.time = this.time - 1
                }else{
                    this.time = ''
                }
            },1000);
        }
    };
</script>

<style>
    .countdown {
        width: 25%;
        text-align: center;
        font-size: 4em;
        font-weight: bold;
    }
</style>
