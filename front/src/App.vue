<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app',
        mounted() {
            this.$options.sockets.onmessage = this.onmessage
        },
        methods: {
            onmessage(message) {
                const parsedMessage = JSON.parse(message.data)
                window.console.log(`${message.type} : `, parsedMessage)
            },
        }
    }
</script>

<style>

    body {
        background-color: white;
        padding: 0;
        margin: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        display: flex;
        justify-content: center;
    }

    #logo {
        position: fixed;
        z-index: 1;
    }
</style>
