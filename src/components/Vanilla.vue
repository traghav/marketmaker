<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Price A ${{priceA.toFixed(4)}} | Price B ${{priceB.toFixed(4)}}</h2>
    <input v-model="orderA" v-on:keypress="isNumber(event)" placeholder="Order Quantity A" v-on:input="dynamicPrice">
    {{dynamicPriceA.toFixed(2)}}
    <button v-on:click="placeABuyorder">Buy A</button>
    <button v-on:click="placeASellorder">Sell A</button>
    <p></p>
    <input v-model="orderB" v-on:keypress="isNumber(event)" placeholder="Order Quantity B" v-on:input="dynamicPrice">
    {{dynamicPriceB.toFixed(2)}}
    <button v-on:click="placeBBuyorder">Buy B</button>
    <button v-on:click="placeBSellorder">Sell B</button>
    
    <h3>Market Depth ${{b}} </h3>
    <h4>Outstanding orders for A  {{outstandingA}}</h4>
    <h4>Outstanding orders for B  {{outstandingB}}</h4>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'Vanilla',
  data () {
    return {
      msg: 'Buy and Sell',
      outstandingA: 0,
      outstandingB: 0,
      orderA:0,
      orderB:0,
      b:100,
      priceA:0,
      priceB:0,
      dynamicPriceA:0,
      dynamicPriceB:0,
      TransactionLog:[]



    }
  },
  methods: {
    costFunction(q1,q2){
      this.e=2.71828
      this.prelog1=Math.pow(this.e,(q1/this.b))
      this.prelog2=Math.pow(this.e,(q2/this.b))
      this.postlog=Math.log(this.prelog1+this.prelog2)
      return (this.b*this.postlog)
    },
    dynamicPrice() {
      
      this.dynamicPriceA=this.costFunction(this.outstandingA+(+this.orderA),this.outstandingB)-this.costFunction(this.outstandingA,this.outstandingB)
      this.dynamicPriceB=this.costFunction(this.outstandingA,this.outstandingB+(+this.orderB))-this.costFunction(this.outstandingA,this.outstandingB)
      
    },
    isNumber: function(evt) {

      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        evt.preventDefault();;
      } else {
        return true;

      }
      
    },
    updatePrice(){
      
      
      this.e=2.71828
      this.den=Math.pow(this.e,(this.outstandingA)/this.b)+Math.pow(this.e,(this.outstandingB)/this.b)
      this.priceA=Math.pow(this.e,(this.outstandingA)/this.b)/this.den
      this.priceB=Math.pow(this.e,(this.outstandingB)/this.b)/this.den
      this.dynamicPrice()

    },
    placeABuyorder() {
      this.outstandingA+=+this.orderA
      this.orderA=0
      this.updatePrice()
    },
    placeBBuyorder() {
      this.outstandingB+=+this.orderB
      this.orderB=0
      this.updatePrice()
    },
    placeASellorder() {
      if(this.outstandingA>=this.orderA) {
        this.outstandingA-=+this.orderA
        this.orderA=0
        this.updatePrice()
      }
      else
        alert("Not enough outstanding orders for A")
      
    },
    placeBSellorder() {
      if(this.outstandingB>=this.orderB) {
        this.outstandingB-=+this.orderB
        this.orderB=0
        this.updatePrice()
      }
      else
        alert("Not enough outstanding orders for B")
      
    }


  },
  mounted () {
    this.updatePrice();
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
