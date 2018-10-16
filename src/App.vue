<template>
  <div id="app">
    
    <!-- <HelloWorld/> -->
    <!-- <Vanilla/> -->
    <Depth />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Vanilla from './components/Vanilla'
import Depth from './components/Depth'
import './assets/font-awesome-4.7.0/css/font-awesome.css'
import './assets/style.css'
export default {
  name: 'App',
  components: {
    HelloWorld,
    Vanilla,
    Depth
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: anti aliased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
</style>
