<template>
    <div>
        <h1>Whack a mole</h1>
        <form @submit.prevent="send">
            <input required type="text" name="" id="" placeholder="Nom">
            <input required type="email" name="" id="" placeholder="Email">
            <input type="submit" value="valider">
        </form>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import Footer from './Footer.vue'

    export default {
        name: "home",
        components: {
            'v-footer': Footer,
        },
        methods: {
            send() {
                this.$router.push('start');
            }
        }
    };
</script>

<style lang="scss" scoped>

    form{
        input{
            display:block;
            margin:auto;
        }
    }

</style>
