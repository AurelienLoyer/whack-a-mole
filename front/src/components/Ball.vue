<template>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="400px" height="400px" viewBox="0 0 400 400" enable-background="new 0 0 400 400" xml:space="preserve">
        <g id="svg-hole" clip-path="url(#holeView)">
            <clipPath  id="holeView">
                <path fill="#333333"  d="M324.867,330.098c-15.365-15.557-69.322-27.047-133.529-27.047c-64.206,0-118.163,11.49-133.529,27.047
                    c15.366,15.557,69.323,27.045,133.529,27.045C255.545,357.143,309.502,345.652,324.867,330.098z">
                </path>
                <rect  width="500" height="330" />
            </clipPath>
            <clipPath id="circleView" >
                <circle cx="190" cy="525" r="125" fill="#FFFFFF" />
            </clipPath>
            <g>
                <path fill="#C0C0C0" d="M324.867,330.098c2.863-2.897,4.389-5.938,4.389-9.072c0-19.946-61.748-36.116-137.918-36.116
                    S53.42,301.078,53.42,321.025c0,3.133,1.524,6.174,4.389,9.07c15.366-15.556,69.323-27.046,133.529-27.046
                    C255.545,303.051,309.502,314.541,324.867,330.098z">
                </path>

                <path fill="#333333" d="M324.867,330.098c-15.365-15.557-69.322-27.047-133.529-27.047c-64.206,0-118.163,11.49-133.529,27.047
                    c15.366,15.557,69.323,27.045,133.529,27.045C255.545,357.143,309.502,345.652,324.867,330.098z">
                </path>

            </g>
            <g :id="`ball-${id}`">
                <image  width="500" height="500" x="-50" y="400"  :xlink:href="image" clip-path="url(#circleView)" />
            </g>
        </g>
        <g>
            <image :id="`bam-${id}`" class="bam" width="0" height="0" x="200" y="200" xlink:href="/statics/img/bam.png" />
        </g>
    </svg>
</template>

<script>
  import { TimelineMax } from 'gsap';

  export default {
    name: 'Hole',
    props: {
      image: {
        type: String,
        required: true,
        default: '',
      },
      id: {
        type: [String, Number],
        required: true,
      },
      pop: {
        type: Boolean,
        required: false,
      },
      press: {
        type: Boolean,
        required: false,
      },

    },
    data() {
      return {
        locked: false,
      };
    },
    watch: {
      pop(value) {
        if (value && !this.isLocked) {
          this.jump();
        }
      },
      press(value) {
        if (value) {
          this.bam();
        }
      },

    },
    mounted() {
    },
    methods: {
      bam() {
        const bamIcon = document.getElementById(`bam-${this.id}`);
        bamIcon.setAttribute('x', '0');
        bamIcon.setAttribute('y', '0');
        bamIcon.setAttribute('width', '400');
        bamIcon.setAttribute('height', '400');
        setTimeout(() => {
          bamIcon.setAttribute('x', '200');
          bamIcon.setAttribute('y', '200');
          bamIcon.setAttribute('width', '0');
          bamIcon.setAttribute('height', '0');
        }, 300);
      },
      jump() {
        const tl = new TimelineMax({ repeat: 0 });
        tl.to(`#ball-${this.id}`, 1, { y: -400, yoyo: true, repeat: 1 });
        this.isLocked = true;
        setTimeout(() => {
          this.isLocked = false;
          this.$emit('poped');
        }, tl.totalDuration() * 1000);
      },
    },
  };
</script>

<style scoped>

    svg {
        width: 33%;
        height: 33%;
    }

    .bam {
        transition: all 0.3s;
    }
</style>
