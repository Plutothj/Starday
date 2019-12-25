import Vue from 'vue'
import Component from 'vue-class-component'

import { Prop,Watch } from 'vue-property-decorator'
@Component({
  
})
export default class Empty extends Vue{
  @Prop()
    private isGoods!: {
        type: any;
    };
  @Watch('isGoods',{
        deep:true
      })
  private isGoodss(val:any){
      console.log("---------val", val);
  }

  onClickLeft() {
      this.$router.go(-1);
      console.log("---------val", this.isGoods);
  }
  
}