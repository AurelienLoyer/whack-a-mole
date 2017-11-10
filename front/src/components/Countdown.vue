<template>
    <div class="countdown">
        <div class="time">
            00:{{ time }}
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
            setInterval(() => {
                this.time = this.time - 1
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
