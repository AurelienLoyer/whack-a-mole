<template>
  <div id="app">
    <img id="logo" src="../statics/img/logo.png" alt="Zenika logo" height="200">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>

<style>

  body {
    background-color: rgb(15, 29, 42);
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
    display: flex;
    justify-content: center;
  }

  #logo {
    position: fixed;
    z-index: 1;
  }
</style>
