// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Trend from 'vuetrend';
import App from './App'
import VueSlideBar from 'vue-slide-bar'
Vue.config.productionTip = false
Vue.component('vue-slide-bar', VueSlideBar)
Vue.use(Trend)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
