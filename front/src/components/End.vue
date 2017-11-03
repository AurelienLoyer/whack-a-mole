<template>
    <div class="end">
        <div class="result">
            <h1>NomSuperLongEst.L</h1>
            <h2>Votre score pour cette partie !</h2>
            <div class="score">
                <div class="number">2400</div>
                <div class="rubban">zenika points</div>
            </div>
        </div>
        <div class="content">
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
                    <span class="who">NomSuperLongEst.L</span>
                    <span class="you">< VOUS ></span>
                </li>
                <li>
                    <span class="num">3</span>
                    <span class="res">1300</span>
                    <span class="who">Aurelien.L</span>
                </li>
            </ul>

            <div class="grey">
                <h3>Consultants</h3>
                <ul>
                    <li>
                        <div class="circle">
                            <img src="../../statics/img/Zenika-6.jpg"/>
                        </div>
                        <span class="name">Aurelien.L</span>
                        <span class="hit">131</span>
                    </li>
                    <li>
                        <div class="circle">
                            <img src="../../statics/img/Zenika-7.jpg"/>
                        </div>
                        <span class="name">Aurelien.L</span>
                        <span class="hit">90</span>
                    </li>
                    <li>
                        <div class="circle">
                            <img src="../../statics/img/Zenika-8.jpg"/>
                        </div>
                        <span class="name">Aurelien.L</span>
                        <span class="hit">30</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="again" @click="$router.push('/')">
            Play Again
        </div>
    </div>
</template>

<script>
export default {
  name: "endgame"
};
</script>

<style lang="scss" scoped>
.end {
  width: 100%;
}

.again{
    color:white;
    background: red;
    width: 20%;
    margin: 50px auto;
    font-size: 20px;
    padding:5px 20px;
    cursor: pointer;
}

.result {
  background: #22282a;
  color: white;
  padding: 2%;
  .score {
    width: 10%;
    margin: auto;
    .number {
      background: #fbb831;
      font-size: 4em;
    }
    .rubban {
      background: #1c91a0;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 1em;
      margin-top: 0px;
      width: 120%;
      margin-left: -14%;
      padding: 4%;
    }
  }
}
.content {
  display: flex;
  justify-content: space-around;
  padding-top: 2%;

  .scores {
    width:40%;
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
        background: red;
        padding: 3px 12px;
        font-weight: bold;
      }
    }
  }
  .grey {
    background: #f3f3f3;
    width:20%;
    min-height: 200px;
    ul {
      list-style: none;
      margin: 0;
      list-style: none;
      padding: 4px 20px;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 5px;
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
      }
    }
  }
}
</style>
