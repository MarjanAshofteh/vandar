<template>
  <div id="app">
    <div class="menu-bar">
      <img src="./assets/Logo_Green.png" width="30" height="30">
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @font-face {
    font-family: irans;
    font-style: normal;
    font-weight: bold;
    src:  url('./assets/fonts/IRANSansWeb_Bold.woff2') format('woff2');
  }
  @font-face {
    font-family: irans;
    font-style: normal;
    font-weight: normal;
    src: url('./assets/fonts/IRANSansWeb.woff2');
  }
  @font-face {
    font-family: irans;
    font-style: normal;
    font-weight: 200;
    src: url('./assets/fonts/IRANSansWeb_Light.woff2');
  }
  @font-face {
    font-family: fanum;
    font-style: normal;
    font-weight: 100;
    src: url('./assets/fonts/fanum.woff2');
  }

  body{
    margin: 0;
  }
  .menu-bar{
    width:100%;
    height:50px;
    background-color: #3c3b39;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #app {
    font-family: irans, 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #F1F1F1;
  }
</style>
