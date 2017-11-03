<template>
    <footer>
        Made with <i class="fa fa-heart" aria-hidden="true"></i> by Aurelien.L & Nathan.D
    </footer>
</template>

<style lang="scss" scoped>
    footer{
        position: fixed;
        bottom: 10px;
        i{
            color:red;
            animation: heartbit 1s infinite;
        }

        @keyframes heartbit {
            0%   {  }
            50%   { transform: scale(1.2) }
            100% {  }
        }

    }
</style>
