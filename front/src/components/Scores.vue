<template>
    <div>
        <h3>Top 6 Joueurs</h3>
        <ul class="scores">
            <li>
                <span class="num">
                    <span class="fa-stack fa-lg">
                        <i class="fa fa-circle fa-stack-2x"></i>
                        <i class="fa fa-trophy fa-stack-1x fa-inverse"></i>
                    </span>
                </span>
                <span class="res">2500</span>
                <span class="who">Aurelien.L</span>
            </li>
            <li>
                <span class="num">2</span>
                <span class="res">2400</span>
                <span class="who">Magdalena.D</span>
                <span class="you">< VOUS ></span>
            </li>
            <li>
                <span class="num">3</span>
                <span class="res">1300</span>
                <span class="who">Aurelien.L</span>
            </li>
            <li>
                <span class="num">4</span>
                <span class="res">1300</span>
                <span class="who">Aurelien.L</span>
            </li>
            <li>
                <span class="num">5</span>
                <span class="res">1300</span>
                <span class="who">Aurelien.L</span>
            </li>
            <li>
                <span class="num">6</span>
                <span class="res">1300</span>
                <span class="who">Aurelien.L</span>
            </li>
        </ul>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
h3{
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
