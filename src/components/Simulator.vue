<template>
  <div class="component">
      <span class="dummy"></span>
      <div class="title">
        <h1>{{ msg }}</h1>
        <div class="reset">
          <h1><a href="#" v-on:click="initFunc" v-scroll-to="'.dummy'">
            <i class="fa fa-undo"></i>
          </a></h1>
        </div>
      </div>
    <div v-if="depthdecider==false" class="depthDecider">
      <h2>Choose Market Depth</h2>
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
      <button v-on:click="depthdecider=true">Set Market Depth at ${{+this.b}} </button>
    </div>
    <transition name="fade">
      <div v-if="depthdecider==true" class="simulator">
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
          <div class="mean">
            <h4>Set Mean</h4>
            <vue-slide-bar 
              v-model="mean"
              class="slider"
              :min="0"
              :max="100"
              :processStyle="sliderCustomzie.processStyle"
              :lineHeight="sliderCustomzie.lineHeight"
              :paddingless="true"
              :tooltipStyles="sliderCustomzie.tooltipStyles"
              :show-tooltip="false">
            </vue-slide-bar>
            <span class="leftmean">
              <h5>{{(mean/100).toFixed(2)}}</h5>
            </span>
            <span class="rightmean">
              <h5>{{(1-mean/100).toFixed(2)}}</h5>
            </span>
          </div>
          <div class="variance">
            <h4>Set Variance</h4>
            <vue-slide-bar 
              v-model="variance"
              class="slider"
              :min="0"
              :max="100"
              :processStyle="sliderCustomzie.processStyle"
              :lineHeight="sliderCustomzie.lineHeight"
              :paddingless="true"
              :tooltipStyles="sliderCustomzie.tooltipStyles"
              :show-tooltip="false">
            </vue-slide-bar>
            <span class="leftvariance">
              <h5>{{(variance/100).toFixed(2)}}</h5>
            </span>
          </div>
          <div class="orderAmount">
            <h4>Number of orders</h4>
            <vue-slide-bar 
              v-model="orderAmount"
              class="slider"
              :min="0"
              :max="5000"
              :processStyle="sliderCustomzie.processStyle"
              :lineHeight="sliderCustomzie.lineHeight"
              :paddingless="true"
              :tooltipStyles="sliderCustomzie.tooltipStyles"
              :show-tooltip="false">
            </vue-slide-bar>
            <span class="orderAmount"> 
              <p></p>
              <input v-model="orderAmount" v-on:keypress="isNumber(event)" placeholder="Order Amount" >
              
            </span>
          </div>
          <div class="executeOrder">
            <p></p>
            <button v-on:click="playScenario">Execute orders </button>
          </div>
        </div>
        <br>
        <div class="marketInformation">
          <h3>Market Depth ${{b}} </h3>
          <h3>Total Pool ${{totalPool.toFixed(2)}} </h3>
        </div>
        <div class="chartRegion">
          <div class="chart">
            <trend
            :data="orderHistoryA"
            :gradient="['#F27612', '#F27612', '#F27612']"
            auto-draw
            smooth>
            </trend>
          </div>
          <div class="chart2">
            <trend
            :data="orderHistoryB"
            :gradient="['#DA2A04', '#DA2A04', '#DA2A04']"
            auto-draw
            smooth>
            </trend>
          </div>
          <span class="A"><i class="fa fa-circle"></i> Trend Line A</span>
          <span class="B"><i class="fa fa-circle"></i> Trend Line B</span>
         </div>
      

        <div class="transaction" v-if="transactionLog.length>0">
          <button v-on:click="txDisplay=!txDisplay"> 
            Transaction Log
          </button>
          <ul id="logs" v-if="txDisplay">
            <p>
            Number of transactions {{totalTx}}
            </p>
            <li v-for="log in transactionLog">
              {{ log.messageA }}
              <br>
              {{ log.messageB }}
            </li>
          </ul>
        </div>
        <hr>
      </div>
    </transition>
  </div>
</template>

<script>
import LineChart from './LineChart.js'

export default {
  name: 'Simulator',
  components: {
      LineChart
    },
  data () {
    return {
        msg: 'Market Simulator',
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
        mean:50,
        variance:10,
        totalTx:0,
        txDisplay:false,
        orderAmount:100,
        depthdecider: false,
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
        },
        orderHistoryB:[0,0.5],
        orderHistoryA:[1,0.5],

      }
  },
  methods: {
    initFunc(){
      
      this.msg= 'Market Simulator'
      this.outstandingA= 0
      this.outstandingB= 0
      this.orderA=0
      this.orderB=0
      this.b=100
      this.totalTx=0
      this.mean=50
      this.variance=10
      this.orderAmount=100
      this.priceA=0
      this.priceB=0
      this.priceHistoryA=[]
      this.totalPool=0
      this.depthdecider=false
      this.transactionLog=[]
      this.orderHistoryA=[0.5,0.5]
      this.orderHistoryB=[0.5,0.5]
      this.updateOdds()
  
    },
    randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    },

    playScenario(){
      var sigma=Math.sqrt(this.variance/100)
      var eventAHit=0
      var eventBHit=0
      var totalAPrice=0
      var totalBPrice=0
      var truth=0
      for (var i = 0; i < this.orderAmount; i++) {
        this.totalTx++
        while(true) {
          truth=this.randn_bm()
          truth=(truth*sigma)+(this.mean/100)
          if(truth>0&&truth<1)
            break
        }
        
        if((+this.priceA)<truth){
          var totalPool=this.totalPool
          eventAHit++
          this.orderA=1
          this.dynamicPrice()
          this.placeABuyorder()
          totalAPrice+=this.totalPool-totalPool
        }
        else {
          var totalPool=this.totalPool
          eventBHit++
          this.orderB=1
          this.dynamicPrice()
          this.placeBBuyorder()
          totalBPrice+=this.totalPool-totalPool
        }
      }
      this.transactionLog.push({
        totalAhits:eventAHit,
        totalBhits:eventBHit,
        totalAspent:totalAPrice,
        totalBspent:totalBPrice,
        messageA:"Bought "+eventAHit+" A options for average price $"+(totalAPrice/eventAHit).toFixed(2),
        messageB:"Bought "+eventBHit+" B options for average price $"+(totalBPrice/eventBHit).toFixed(2)
      })
      
      
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
      //this.mean=this.priceA*100

    },
    placeABuyorder() {
      this.outstandingA+=+this.orderA
      this.totalPool+=+this.dynamicBuyPriceA
      this.finishTx()
      
    },
    placeBBuyorder() {
      this.outstandingB+=+this.orderB
      this.totalPool+=+this.dynamicBuyPriceB
      this.finishTx()
      
    },
    finishTx() {
      if(this.totalTx%10==0) {
        this.orderA=1
        this.orderB=1
        this.dynamicPrice
        this.orderHistoryA.push(this.dynamicBuyPriceA)
        this.orderHistoryB.push(this.dynamicBuyPriceB)
      }
      this.orderA=0;
      this.orderB=0;
      this.updateOdds();
      


    }


  },
  watch: {
    b: function(newVal, oldVal) { 
        
      }
  },
  mounted () {
    this.updateOdds();
    

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  


  .component {
    position: relative;
  }
  .mean {
    width: 260px;
    
  }
  .mean h4{
    margin-bottom: 10px;
  }
  .leftmean h5{
    display: inline;
    text-align: left;
  }
  .rightmean h5{
    display: inline;

  }
  .rightmean {
    float: right;
  }


  .variance {
    width: 260px;
    
  }
  .variance h4{
    margin-bottom: 10px;
  }
  .leftvariance h5{
    display: inline;
    text-align: center;
  }

  .orderAmount {
    width: 260px;
    
  }
  .orderAmount h4{
    margin-bottom: 10px;
  }
  .orderAmount h5{
    display: inline;
    text-align: center;
  }

</style>
