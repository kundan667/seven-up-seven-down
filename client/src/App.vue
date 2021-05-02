<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  
}
</script>

<style>
body{
  background-color: #1b1b1b;
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;
  max-width: 400px;
  margin: auto;
  font-family: 'Montserrat', sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
