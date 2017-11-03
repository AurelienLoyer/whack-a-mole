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
    countdown: Boolean,
    message: String,
    start: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      timer: null,
      time: "",
      label: this.message ? this.message : "Time's up!",
    };
  },
  computed: {

  },

  mounted() {

  },
  methods: {
    start() {

    },
    stop() {

    },
    timeExpire() {
      this.$emit("time-expire");
      this.time = this.label;
    }
  },
  watch: {
    start(newValue) {
      if (newValue) {
        this.start();
      } else {
        this.stop();
      }
    }
  }
};
</script>
