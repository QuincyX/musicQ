import Vex from 'vexflow'
import Vue from 'vue'
declare module 'vue/types/vue' {
  interface Vue {
    $VF: any
  }
}
Vue.prototype.$vex = Vex
Vue.prototype.$VF = Vex.Flow
