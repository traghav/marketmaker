<template>
  <div class="component">
    <h1>{{ msg }}</h1>
    <div class="reset">
      <h1><a href="#" v-on:click="initFunc">
        <i class="fa fa-refresh"></i>
      </a></h1>
    </div>
    <h3>Option Price A ${{priceA.toFixed(4)}} | Option Price B ${{priceB.toFixed(4)}}</h3>
    <h3>Decimal Odds A {{(1/priceA).toFixed(2)}} | Decimal Odds B {{(1/priceB).toFixed(2)}}</h3>
    <h3>Fraction Odds A {{ convertToFraction(1/priceA.toFixed(4)-1)}} | Fraction Odds B {{ convertToFraction(1/priceB.toFixed(4)-1)}}</h3>
    <input v-model="orderA" v-on:keypress="isNumber(event)" placeholder="Order Quantity A" v-on:input="dynamicPrice">
    
    <p></p>
    <button v-on:click="placeABuyorder">Buy {{+this.orderA}} A options for ${{dynamicBuyPriceA.toFixed(2)}} </button>
    <button v-on:click="placeASellorder">Sell {{+this.orderA}} A options for ${{dynamicSellPriceA.toFixed(2)}}</button>
    <p></p>
    <input v-model="orderB" v-on:keypress="isNumber(event)" placeholder="Order Quantity B" v-on:input="dynamicPrice">
    
    <p></p>
    <button v-on:click="placeBBuyorder">Buy {{+this.orderB}} B options for ${{dynamicBuyPriceB.toFixed(2)}}</button>
    <button v-on:click="placeBSellorder">Sell {{+this.orderB}} B options  for ${{dynamicSellPriceB.toFixed(2)}}</button>
    
    <h3>Market Depth ${{b}} </h3>
    <h3>Total Pool ${{totalPool.toFixed(2)}} </h3>
    <h4>Outstanding orders for A  {{outstandingA}}</h4>
    <h4>Outstanding orders for B  {{outstandingB}}</h4>
    <ul id="logs">
    <li v-for="log in transactionLog">
      {{ log }}
    </li>
  </ul>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'Vanilla',
  data () {
    return {
        msg: 'Buy and Sell',
        initData:[],
        outstandingA: 0,
        outstandingB: 0,
        orderA:0,
        orderB:0,
        b:100,
        priceA:0,
        priceB:0,
        dynamicBuyPriceA:0,
        dynamicBuyPriceB:0,
        dynamicSellPriceA:0,
        dynamicSellPriceB:0,
        totalPool:0,
        transactionLog:[]
      }
  },
  methods: {
    initFunc(){
      
      this.msg= 'Buy and Sell'
      this.initData=[]
      this.outstandingA= 0
      this.outstandingB= 0
      this.orderA=0
      this.orderB=0
      this.b=100
      this.priceA=0
      this.priceB=0
      this.dynamicBuyPriceA=0
      this.dynamicBuyPriceB=0
      this.dynamicSellPriceA=0
      this.dynamicSellPriceB=0
      this.totalPool=0
      this.transactionLog=[]
  
    },
    costFunction(q1,q2){
      this.e=2.71828
      this.prelog1=Math.pow(this.e,(q1/this.b))
      this.prelog2=Math.pow(this.e,(q2/this.b))
      this.postlog=Math.log(this.prelog1+this.prelog2)
      return (this.b*this.postlog)
    },
    dynamicPrice() {
      this.cf=this.costFunction(this.outstandingA,this.outstandingB)
      this.dynamicBuyPriceA=this.costFunction(this.outstandingA+(+this.orderA),this.outstandingB)-this.cf
      this.dynamicSellPriceA=this.cf-this.costFunction(this.outstandingA-(+this.orderA),this.outstandingB)
      this.dynamicBuyPriceB=this.costFunction(this.outstandingA,this.outstandingB+(+this.orderB))-this.cf
      
      this.dynamicSellPriceB=this.cf-this.costFunction(this.outstandingA,this.outstandingB-(+this.orderB))
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
    convertToFraction(decimal){
        var gcd = function(a, b) {
        if (b < 0.0001) return a;
        return gcd(b, Math.floor(a % b));        
      };
      var fraction = decimal.toFixed(2);
      var len = fraction.toString().length - 2;

      var denominator = Math.pow(10, len);
      var numerator = fraction * denominator;

      var divisor = gcd(numerator, denominator);  
      numerator /= divisor;                      
      denominator /= divisor;
      return (Math.floor(numerator) + '/' + Math.floor(denominator))                      
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
      this.totalPool+=+this.dynamicBuyPriceA
      this.transactionLog.push("Bought "+(+this.orderA)+" options of event A at $"+this.dynamicBuyPriceA.toFixed(2))
      this.orderA=0
      this.updatePrice()
      
    },
    placeBBuyorder() {
      this.outstandingB+=+this.orderB
      this.totalPool+=+this.dynamicBuyPriceB
      this.transactionLog.push("Bought "+(+this.orderB)+" options of event B at $"+this.dynamicBuyPriceB.toFixed(2))
      this.orderB=0
      this.updatePrice()
    },
    placeASellorder() {
      if(this.outstandingA>=this.orderA) {
        this.outstandingA-=+this.orderA
        this.totalPool-=+this.dynamicSellPriceA
      this.transactionLog.push("Sold "+(+this.orderA)+" options of event A at $"+this.dynamicSellPriceA.toFixed(2))
        this.orderA=0
        this.updatePrice()
      }
      else
        alert("Not enough outstanding orders for A")
      
    },
    placeBSellorder() {
      if(this.outstandingB>=this.orderB) {
        this.outstandingB-=+this.orderB
        this.totalPool-=+this.dynamicSellPriceB
      this.transactionLog.push("Sold "+(+this.orderB)+" options of event B at $"+this.dynamicSellPriceB.toFixed(2))
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
h1 {
  display: inline;
  color: #F27612;
}

.reset {
  display: inline-block;
  margin-left: 15px;
}
.reset a {
  color: #DA2A04;
}
</style>
