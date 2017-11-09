<template>
    <div class="zenikien">
        <h3>Top 4 Consultants</h3>
        <ul>
            <li>
                <div class="circle">
                    <img src="/statics/img/Zenika-6.jpg"/>
                </div>
                <span class="name">Aurelien.L</span>
                <span class="hit">131</span>
            </li>
            <li>
                <div class="circle">
                    <img src="/statics/img/Zenika-7.jpg"/>
                </div>
                <span class="name">Guillaume.D</span>
                <span class="hit">90</span>
            </li>
            <li>
                <div class="circle">
                    <img src="/statics/img/Zenika-8.jpg"/>
                </div>
                <span class="name">Vincent.V</span>
                <span class="hit">31</span>
            </li>
            <li>
                <div class="circle">
                    <img src="/statics/img/Zenika-17.jpg"/>
                </div>
                <span class="name">Nathan.D</span>
                <span class="hit">12</span>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.zenikien {
    background: #f3f3f3;
    width: 100%;
    min-height: 200px;
    h3{
        text-align:center;
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
        .name{
            font-weight: bold;
        }
        .hit{
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
