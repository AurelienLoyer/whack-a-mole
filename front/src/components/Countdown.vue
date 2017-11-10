<template>
    <div class="countdown">
        <div class="time">
            {{ time }}
        </div>
    </div>
</template>

<script>

export default {
  name: 'countdown',
  props: {
    seconds: Number,
    message: String,
  },
  data() {
    return {
      timer: null,
      time: '00:00',
      label: this.message ? this.message : 'Time\'s up!',
    };
  },
  computed: {

  },
  mounted() {
    this.startCount();
  },
  methods: {
    startCount() {
        window.console.log('starttttttt')
    },
    stopCount() {
    },
    timeExpire() {
      this.$emit("time-expire");
      this.time = this.label;
    },
  },
};
</script>

<style>
    .countdown{
        width:25%;
        text-align: center;
        font-size: 4em;
        font-weight: bold;
    }
</style>
