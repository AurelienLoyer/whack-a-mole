<template>
    <div class="zenikien">
        <h3>Top {{sortedZenikiens.length}} Consultants Tapés</h3>
        <ul>
            <li v-for="zenikien in sortedZenikiens" :key="zenikien.name">
                <div class="circle">
                    <img :src="zenikien.image"/>
                </div>
                <span class="name">{{zenikien.name}}</span>
                <span class="hit">{{zenikien.hit}}</span>
            </li>
        </ul>
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
        props: {
            zenikiens: {
                type: Array,
                default: [],
                required: false,
            },
        },
        computed:{
            sortedZenikiens() {
                return this.zenikiens.sort((b,a) => (a.hit > b.hit) ? 1 : ((b.hit > a.hit) ? -1 : 0)).slice(0, 4)
            }
        }
    };
</script>


<style lang="scss" scoped>
    .zenikien {
        background: #f3f3f3;
        width: 100%;
        min-height: 200px;
        h3 {
            text-align: center;
        }
        ul {
            list-style: none;
            margin: 0;
            list-style: none;
            padding: 4px 20px;
            li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 5px;
                margin-bottom: 5px;
                .circle {
                    border-radius: 50%;
                    height: 50px;
                    width: 50px;
                    overflow: hidden;
                    img {
                        width: 100%;
                    }
                }
                .name {
                    font-weight: bold;
                }
                .hit {
                    font-weight: bold;
                    color: white;
                    background: #c82a3e;
                    width: 70px;
                    height: 23px;
                    border-radius: 2Px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
</style>
