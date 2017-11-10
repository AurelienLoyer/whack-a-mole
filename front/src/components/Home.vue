<template>
    <div class="home">
        <div class="header">
            <div class="particules"></div>
            <div class="header-content">
                <h2>TENTE TA CHANCE AU</h2>
                <h1>WHACK A
                    <span class="znk"></span>
                </h1>
                <form @submit.prevent="go">
                    <input required type="text" v-model="user.name" placeholder="Nom">
                    <input required type="email" v-model="user.mail" placeholder="Email">
                    <button type="submit">jouer</button>
                </form>
                <button class="simple-play" @click="goAnonymous">Jouer sans score</button>
            </div>
        </div>
        <div class="content">
            <scores :users="users" :currentUser="user"></scores>
            <zenikien :zenikiens="zenikiens"></zenikien>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>

    import env from 'env'
    import Footer from "./Footer.vue";
    import Zenikien from "./Zenikien.vue";
    import Scores from "./Scores.vue";

    export default {
        name: "home",
        data() {
            return {
                user: {
                    name: '',
                    mail: '',
                },
                zenikiens: [],
                users: [],
            }
        },
        components: {
            Scores,
            Zenikien,
            "v-footer": Footer
        },

        mounted() {
            setTimeout(() => {
                this.$socket.send(JSON.stringify({ type: 'getZenikiens' }))
                this.$socket.send(JSON.stringify({ type: 'getUsers' }))
                this.$socket.onmessage = (message) => {
                    const parsedMessage = JSON.parse(message.data)
                    this.processData(parsedMessage)
                }
            }, 10)
        },

        methods: {
            processData(message) {
                if (message.type === 'zenikien') {
                    this.zenikiens = [].concat(Object.values(message.data))
                }
                if (message.type === 'users') {
                    this.users = [].concat(Object.values(message.data))
                }
                if (message.type === 'game') {
                    localStorage.setItem('time', message.data.time / 1000)
                    this.$router.push('start')
                }
            },
            go(anonymous = false) {
                this.$socket.send(JSON.stringify(
                    {
                        type: 'start',
                        data: {
                            'name': this.user.name,
                            'mail': this.user.mail,
                            'anonymous': anonymous,
                        }
                    }
                ))
            },
            goAnonymous() {
                this.user.name = 'Joueur Mystère 😎'
                this.user.mail = 'mysteriousgamer@zenika.com'
                this.go(true)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home {
        width: 100%;
    }

    .header {
        background: #22282a;
        color: white;
        padding: 2%;
        width: 100%;

        .particules {
            background-image: url(https://www.zenika.com/assets/particles/grey.1d53b2992bf8ef7250a46eb11eb74d2e.svg),
            url(https://www.zenika.com/assets/particles/red.5f0007f26b124dc527cfe49790bd899c.svg),
            url(https://www.zenika.com/assets/particles/red-flipped.1affc3e2771bd14f67fa6d6f7cfeadba.svg);
            background-size: auto 20vw;
            background-position: 50% 50%, 30% 50%, 70% 50%;
            background-repeat: no-repeat;
            height: 350px;
            position: absolute;
            width: 100%;
            opacity: 0.4;
            animation: move 4s infinite;
            z-index: 0;
            top: 65px;
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
            width: 100%;

            h1 {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 5em;
                margin: -25px 0 20px;
            }

            .znk {
                display: inline-block;
                background-color: white;
                height: 80px;
                width: 80px;
                border-radius: 50%;
                padding: 8px;
                margin-left: 20px;
                background-image: url(https://www.zenika.com/assets/logos/znk.png);
                background-size: 70%;
                background-position: center center;
                background-repeat: no-repeat;
            }
        }
    }

    form {
        input {
            display: block;
            margin: auto;
            border: none;
            padding: 5px 10px;
            min-width: 280px;
            font-size: 1em;
            text-align: center;
            margin-bottom: 30px;
        }
        button {
            background: #c8293e;
            text-transform: uppercase;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            font-size: 2em;
            color: white;
            border: none;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s;
            outline: none;
            &:hover {
                transform: scale(0.9);
            }
        }
    }

    .simple-play {
        background: #c8293e;
        text-transform: uppercase;
        width: 150px;
        font-size: 1em;
        color: white;
        border: none;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s;
        outline: none;
        position: absolute;
        right: 45px;
        bottom: -15px;
        &:hover {
            transform: scale(0.9);
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
