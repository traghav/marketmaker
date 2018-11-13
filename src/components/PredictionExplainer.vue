<template>
  <div class="component">
    <div class="title">
        <h1>{{ msg }}</h1>
        <div class="reset">
          <h1><a href="#"><i class="fa fa-line-chart"></i></a></h1>
        </div>
    </div>
    <div class="what">
      <h2>What are prediction markets?</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PredictionEplainer',
  data () {
    return {
        msg: 'Prediction Markets'
      }
  },
  methods: {
    initFunc(){
      
    }


  },
  mounted () {
    
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .componenet {
  margin: 40px;
 }
</style>
