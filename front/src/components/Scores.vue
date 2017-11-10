<template>
    <div>
        <h3>Top {{filteredUsers.length}} / {{ users.length }} Joueurs</h3>
        <ul class="scores">
            <li v-for="(user, i) in filteredUsers" :key="`user-${i}`">
                <span v-if="i === 0" class="fa-stack fa-lg num">
                    <i class="fa fa-circle fa-stack-2x"></i>
                    <i class="fa fa-trophy fa-stack-1x fa-inverse"></i>
                </span>
                <span class="num" v-else>{{i + 1}}</span>
                <span class="res">{{user.score}}</span>
                <span class="who">{{user.name}}</span>
                <span class="you" v-if="user.name === currentUser.name">< VOUS ></span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "scores",
        props: {
            users: {
                type: Array,
                default: [],
                required: false,
            },
            currentUser: {
                type: Object,
                default: {}
            }
        },
        computed: {
            filteredUsers(){
                return this.users.sort((b,a) => (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0)).slice(0, 6)
            }
        }
    };
</script>

<style lang="scss" scoped>
    h3 {
        text-align: left;
    }

    .scores {
        margin: 0;
        list-style: none;
        font-size: large;
        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-right: 20px;
            position: relative;
            &:nth-child(1) {
                background: #feedc8;
                .res {
                    color: #52bcb5;
                    font-weight: bold;
                    font-size: 1.3em;
                }
            }
            .num {
                margin-left: -21px;
                width: 42px;
                height: 42px;
                display: flex;
                justify-content: center;
                align-items: center;
                .fa-circle {
                    color: #fbb831;
                }
            }
            .res {
                display: block;
                width: 35%;
                text-align: right;
            }
            .who {
                width: 40%;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: right;
                overflow: hidden;
            }
            .you {
                position: absolute;
                right: -100px;
                font-size: 13px;
                color: white;
                background: #C8293E;
                padding: 3px 12px;
                font-weight: bold;
            }
        }
    }
</style>
