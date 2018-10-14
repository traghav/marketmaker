<template>
  <div id="app">
    
    <HelloWorld/>
    <Vanilla/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Vanilla from './components/Vanilla'
export default {
  name: 'App',
  components: {
    HelloWorld,
    Vanilla
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: anti aliased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
