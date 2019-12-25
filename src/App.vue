<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script lang='ts'>

import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch,  Provide,  Inject} from "vue-property-decorator";
import navFoot from "./components/footer.vue";
// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
  // 所有的组件选项都可以放在这里
  // template: '<button @click="onClick">Click!</button>'
})
export default class App extends Vue {
  // 初始数据可以直接声明为实例的属性
  isRouterAlive:boolean = true

  //组件注入
  @Provide() private reload = (this as any).reloadone
   
  // 注入方法
  reloadone(){
      this.isRouterAlive = false
      this.$nextTick(function(){this.isRouterAlive = true})
  }
}




</script>
  


<style lang="scss">
@import "./common/font/font.css";
</style>
