<template>
    <div class="end">
        <div class="header">
            <div class="particules"></div>
            <div class="header-content">
                <h1>{{user.name}}</h1>
                <h2>Votre score pour cette partie !</h2>
                <div class="score">
                    <div class="number">{{user.score}}</div>
                    <div class="rubban">zenika points</div>
                </div>
            </div>
        </div>
        <div class="content">
            <scores :id="12" :users="users" :currentUser="user"></scores>
            <zenikien :zenikiens="zenikiens"></zenikien>
        </div>

        <div class="again" @click="$router.push('/')">
            Rejouer
        </div>
    </div>
</template>

<script>
    import Footer from "./Footer.vue";
    import Scores from "./Scores.vue";
    import Zenikien from "./Zenikien.vue";

    export default {
        name: "endgame",
        components: {
            "v-footer": Footer,
            Scores,
            Zenikien
        },
        data() {
            return {
                zenikiens: [],
                users: [],
                user: {}
            }
        },
        mounted() {
            setTimeout(() => {
                this.$socket.send(JSON.stringify({ type: 'getUsers' }))
                this.$socket.send(JSON.stringify({ type: 'getWinner' }))
                this.$socket.send(JSON.stringify({ type: 'getZenikiens' }))
                this.$socket.onmessage = (message) => {
                    window.console.log('%c ', 'color:blue', message.data)
                    const parsedMessage = JSON.parse(message.data)
                    this.processData(parsedMessage)
                }

            }, 10)
        },

        methods: {
            processData(message) {
                if (message.type === 'zenikien') {
                  window.console.log('%c ', 'color:blue', message.data)
                    this.zenikiens = Object.values(message.data)
                }
                if (message.type === 'users') {
                    this.users = Object.values(message.data)
                }

                if (message.type === 'winner') {
                    window.console.log('%c ', 'color:blue', message.data)
                    this.user = message.data
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .end {
        width: 100%;
    }

    .again {
        color: white;
        background: #c8293e;
        width: 150px;
        height: 150px;
        margin: 50px auto 10px;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        font-size: 2em;
        text-transform: uppercase;
        transition: all 0.2s;
        &:hover {
            transform: scale(0.9);
        }
    }

    .header {
        background: #22282a;
        color: white;
        padding: 2%;

        .particules {
            background-image: url(https://www.zenika.com/assets/particles/grey.1d53b2992bf8ef7250a46eb11eb74d2e.svg),
            url(https://www.zenika.com/assets/particles/red.5f0007f26b124dc527cfe49790bd899c.svg),
            url(https://www.zenika.com/assets/particles/red-flipped.1affc3e2771bd14f67fa6d6f7cfeadba.svg);
            background-size: auto 18vw;
            background-position: 50% 50%, 30% 50%, 70% 50%;
            background-repeat: no-repeat;
            height: 325px;
            position: absolute;
            width: 100%;
            opacity: 0.4;
            animation: move 4s infinite;
            z-index: 0;
            top: 0;
            right: 0;
            left: 0;
        }

        @keyframes move {
            0% {
            }
            50% {
                background-position: 50% 40%, 30% 30%, 70% 60%;
            }
            100% {
            }
        }

        .header-content {
            z-index: 4;
            position: relative;
        }

        .score {
            width: 170px;
            margin: auto;
            .number {
                background: #fbb831;
                font-size: 4em;
            }
            .rubban {
                background: #1c91a0;
                text-transform: uppercase;
                font-weight: bold;
                font-size: 1em;
                margin-top: 0px;
                width: 120%;
                margin-left: -14%;
                padding: 4%;
            }
        }
    }

    .content {
        display: flex;
        justify-content: space-around;
        padding-top: 2%;
        width: 100%;

        & > *:nth-child(1) {
            width: 40%;
        }
        & > *:nth-child(2) {
            width: 20%;
        }
    }
</style>
