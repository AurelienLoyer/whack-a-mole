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
    start: {
      type: Boolean,
      default: true
    }
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
    }
  },
  watch: {
    start(newValue) {
      if (newValue) {
        this.startCount();
      } else {
        this.stop();
      }
    }
  }
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
