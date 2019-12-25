<template>
  
    <van-button type="warning" size="large"  :to="addadress" @click="clickFunction">{{msg}}</van-button>
  
</template>

<script >
import Vue from "vue";
import { Button} from 'vant'
Vue.use(Button)
import Component from 'vue-class-component'
import { Emit } from "vue-property-decorator";

// @Component({
//   props:{
//     addadress:String,
//     msg:String
//   }

// })
// export default class ButtonF extends Vue{
  
//   @Emit('click')
//   private clickFunction(){
//     console.log('tag', (this as any).msg)
//     this.$emit("click")
//   }

// }

export default {
  name: 'Button',
  props:['addadress','msg'],
  data() {
    return {
      
    }
  },
  methods:{
    clickFunction(){
      this.$emit("click");
    }
  }
}
</script>
<style lang="scss" scoped>
button {
    position: fixed;
    bottom: 0;
    background: rgba(236, 88, 30, 1);
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 42px;
    margin-top: 16px;
    z-index: 999;
}
</style>
