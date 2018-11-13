<template>
  <div id="app">
    <PredictionExplainer/>
    <Vanilla/>
    <Depth />
    <Simulator />
  </div>
</template>

<script>
import Vanilla from './components/Vanilla'
import Depth from './components/Depth'
import Simulator from './components/Simulator'
import PredictionExplainer from './components/PredictionExplainer'
import './assets/font-awesome-4.7.0/css/font-awesome.css'
import './assets/style.css'

export default {
  name: 'App',
  components: {
    PredictionExplainer,
    Vanilla,
    Depth,
    Simulator
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
