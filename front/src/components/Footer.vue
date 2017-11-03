<template>
    <footer>
        Made with <i class="fa fa-heart" aria-hidden="true"></i> by Aurelien.L & Nathan.D
    </footer>
</template>

<style lang="scss" scoped>
    footer{

        position: fixed;
        padding: 10px;
        bottom: 0;
        width: 100%;
        color: white;
        background: #23282a;
        z-index: 99;
        border-top: 2px solid #23282a;

        i{
            color:#C62C41;
            animation: heartbit 1s infinite;
        }

        @keyframes heartbit {
            0%   {  }
            50%   { transform: scale(1.2) }
            100% {  }
        }

    }
</style>
