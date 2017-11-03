<template>
    <div class="recap">
        <div class="content">
            <scores></scores>
            <zenikien></zenikien>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
import Footer from "./Footer.vue";
import Zenikien from "./Zenikien.vue";
import Scores from "./Scores.vue";

export default {
  name: "recap",
  components: {
      Scores,
      Zenikien,
    "v-footer": Footer
  },
  methods: {
    send() {
      this.$router.push("start");
    }
  }
};
</script>

<style lang="scss" scoped>
.recap {
  width: 100%;
}

.content {
    display: flex;
    justify-content: space-around;
    padding-top: 2%;
    width: 100%;

    & > *:nth-child(1){
        width: 40%;
    }
    & > *:nth-child(2){
        width: 20%;
    }
}
</style>
