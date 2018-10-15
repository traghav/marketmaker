<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Price A {{priceA.toFixed(4)}} | Price B {{priceB.toFixed(4)}}</h2>
    <input v-model="orderA" placeholder="Order Quantity A">
    <button v-on:click="placeAorder">Buy A</button>
    <input v-model="orderB" placeholder="Order Quantity B">
    <button v-on:click="placeBorder">Buy B</button>
    <hr>
    <hr>
    {{b}}
    {{outstandingA}}
    {{outstandingB}}
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Market Maker',
      outstandingA: 0,
      outstandingB: 0,
      orderA:0,
      orderB:0,
      b:100,
      priceA:0,
      priceB:0
    }
  },
  methods: {
    updatePrice(){
      
      
      this.e=2.71828
      this.den=Math.pow(this.e,(this.outstandingA)/this.b)+Math.pow(this.e,(this.outstandingB)/this.b)
      console.log(this.den)
      this.priceA=Math.pow(this.e,(this.outstandingA)/this.b)/this.den
      this.priceB=Math.pow(this.e,(this.outstandingB)/this.b)/this.den

    },
    placeAorder() {
      this.outstandingA+=+this.orderA
      this.orderA=0
      this.updatePrice()
    },
    placeBorder() {
      this.outstandingB+=+this.orderB
      this.orderB=0
      this.updatePrice()
    }


  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
