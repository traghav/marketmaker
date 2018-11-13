git log --pretty=format:'' | wc -l<template>
  <div class="component">
    <div class="title">
        <h1>{{ msg }}</h1>
        <span class="depthInit">
          <div class="reset">
            <h1><a href="#" v-on:click="initFunc" v-scroll-to="'.depthInit'">
              <i class="fa fa-undo"></i>
            </a></h1>
          </div>
        </span>
    </div>
    <div class="oddsTable">
      <table>
        <tr>
          <td></td>
          <th>Event A</th>
          <th>Event B</th>
        </tr>
        <tr>
          <th>Option pricing</th>
          <td>{{priceA.toFixed(4)}}</td>
          <td>{{priceB.toFixed(4)}}</td>
        </tr>
        <tr>
          <th>Decimal odds</th>
          <td>{{(1/priceA).toFixed(2)}}</td>
          <td>{{(1/priceB).toFixed(2)}}</td>
        </tr>
        <tr>
          <th>Fraction odds</th>
          <td>{{convertToFraction(1/priceA.toFixed(4)-1)}}</td>
          <td>{{convertToFraction(1/priceB.toFixed(4)-1)}}</td>
        </tr>
        <tr>
          <th>Outstanding orders</th>
          <td>{{outstandingA}}</td>
          <td>{{outstandingB}}</td>
        </tr>
      </table>
    </div>
    <div class="orders">
      <input v-model="orderA" v-on:keypress="isNumber(event)" placeholder="Order Quantity A" v-on:input="dynamicPrice">
      
      <p></p>
      <button v-on:click="placeABuyorder">Buy {{+this.orderA}} A options for ${{dynamicBuyPriceA.toFixed(2)}} </button>
      <button v-on:click="placeASellorder">Sell {{+this.orderA}} A options for ${{dynamicSellPriceA.toFixed(2)}}</button>
      <p></p>
      <input v-model="orderB" v-on:keypress="isNumber(event)" placeholder="Order Quantity B" v-on:input="dynamicPrice">
      
      <p></p>
      <button v-on:click="placeBBuyorder">Buy {{+this.orderB}} B options for ${{dynamicBuyPriceB.toFixed(2)}}</button>
      <button v-on:click="placeBSellorder">Sell {{+this.orderB}} B options  for ${{dynamicSellPriceB.toFixed(2)}}</button>
    </div>
    <div class="marketInformation">
      <h3>Market Depth ${{b}} </h3>
      <h3>Total Pool ${{totalPool.toFixed(2)}} </h3>
    </div>
    <div class="depthChanger">
      <vue-slide-bar 
        v-model="b"
        :min="1"
        :max="1000"
        :processStyle="sliderCustomzie.processStyle"
        :lineHeight="sliderCustomzie.lineHeight"
        :tooltipStyles="sliderCustomzie.tooltipStyles">
      </vue-slide-bar>
    </div>
    <div class="transaction">
      <h4 v-if="transactionLog.length>0">Transaction Log</h4>
      <ul id="logs">
        <p>
        Number of transactions {{ transactionLog.length}}
        </p>
        <li v-for="log in transactionLog">
          {{ log.message }}
        </li>
      </ul>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'Depth',
  data () {
    return {
        msg: 'Market Depth',
        event:'',
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
        transactionLog:[],
        sliderCustomzie: {
          lineHeight: 10,
          processStyle: { 
            backgroundColor: '#DA2A04'

          },
          tooltipStyles: { 
            backgroundColor: '#F27612',
            borderColor: '#F27612' 
          }
        }
      }
  },
  methods: {
    initFunc(){
      
      this.msg= 'Market Depth'
      this.outstandingA= 0
      this.outstandingB= 0
      this.orderA=0
      this.orderB=0
      this.b=100
      this.priceA=0
      this.priceB=0
      this.totalPool=0
      this.transactionLog=[]
      this.updateOdds()
      this.playScenario()
  
    },
    depthInitFunc(){
      
      this.msg= 'Market Depth'
      this.outstandingA= 0
      this.outstandingB= 0
      this.orderA=0
      this.orderB=0
      this.priceA=0
      this.priceB=0
      this.totalPool=0
      this.transactionLog=[]
      this.updateOdds()
  
    },
    playScenario(){      
      for (var i = 1; i <= 7; i++) {
        this.orderB=42;
        this.dynamicPrice();
        this.placeBBuyorder();
      }
      
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
        if(+decimal>10000000)
          return "Infinity"
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
    updateOdds(){
      
      
      this.e=2.71828
      this.den=Math.pow(this.e,(this.outstandingA)/this.b)+Math.pow(this.e,(this.outstandingB)/this.b)
      this.priceA=Math.pow(this.e,(this.outstandingA)/this.b)/this.den
      this.priceB=Math.pow(this.e,(this.outstandingB)/this.b)/this.den
      this.dynamicPrice()

    },
    placeABuyorder() {
      this.outstandingA+=+this.orderA
      this.totalPool+=+this.dynamicBuyPriceA
      this.transactionLog.push({
        message:"Bought \t"+(+this.orderA)+" options of Event A at $"+this.dynamicBuyPriceA.toFixed(2),
        txType:'Buy',
        txEvent:'A',
        price:this.dynamicBuyPriceA,
        orderValue:+this.orderA
      })
      this.orderA=0
      this.updateOdds()
      
    },
    placeBBuyorder() {
      this.outstandingB+=+this.orderB
      this.totalPool+=+this.dynamicBuyPriceB
      this.transactionLog.push({
        message:"Bought \t"+(+this.orderB)+" options of Event B at $"+this.dynamicBuyPriceB.toFixed(2),
        txType:'Buy',
        txEvent:'B',
        price:this.dynamicBuyPriceB,
        orderValue:+this.orderB
      })
      this.orderB=0
      this.updateOdds()
    },
    placeASellorder() {
      if(this.outstandingA>=this.orderA) {
        this.outstandingA-=+this.orderA
        this.totalPool-=+this.dynamicSellPriceA
        this.transactionLog.push({
        message: "Sold \t"+(+this.orderA)+" options of Event A at $"+this.dynamicSellPriceA.toFixed(2),
        txType:'Sell',
        txEvent:'A',
        price:this.dynamicSellPriceB,
        orderValue:+this.orderA
        })
        this.orderA=0
        this.updateOdds()
      }
      else
        alert("Not enough outstanding orders for A")
      
    },
    placeBSellorder() {
      if(this.outstandingB>=this.orderB) {
        this.outstandingB-=+this.orderB
        this.totalPool-=+this.dynamicSellPriceB
        this.transactionLog.push({
          message:"Sold \t"+(+this.orderB)+" options of Event B at $"+this.dynamicSellPriceB.toFixed(2),
          txType:'Sell',
          txEvent:'B',
          price:this.dynamicSellPriceB,
          orderValue:+this.orderB
        })
        this.orderB=0
        this.updateOdds()
      }
      else
        alert("Not enough outstanding orders for B")
      
    }


  },
  watch: {
    b: function(newVal, oldVal) { 
        var txlog=this.transactionLog
        this.depthInitFunc()
        for (var i = txlog.length - 1; i >= 0; i--) {
          if(txlog[i].txType=='Buy' && txlog[i].txEvent=='A'){
            this.orderA=txlog[i].orderValue;
            this.dynamicPrice();
            this.placeABuyorder();
          }
          if(txlog[i].txType=='Buy' && txlog[i].txEvent=='B'){
            this.orderB=txlog[i].orderValue;
            this.dynamicPrice();
            this.placeBBuyorder();
          }
          if(txlog[i].txType=='Sell' && txlog[i].txEvent=='A'){
            this.orderA=txlog[i].orderValue;
            this.dynamicPrice();
            this.placeASellorder();
          }
          if(txlog[i].txType=='Sell' && txlog[i].txEvent=='B'){
            this.orderB=txlog[i].orderValue;
            this.dynamicPrice();
            this.placeBBuyorder();
          }
        }
      }
  },
  mounted () {
    this.updateOdds();
    this.playScenario();
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
