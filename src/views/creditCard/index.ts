import api from "../../request/api";
import Button from "../../components/Button.vue";
import Vue from "vue";
import {NavBar,Cell,ActionSheet,RadioGroup,Radio,CellGroup,Divider,Skeleton} from 'vant'
Vue.use(NavBar).use(Cell).use(ActionSheet).use(RadioGroup).use(Radio).use(CellGroup).use(Divider).use(Skeleton)
import Component from 'vue-class-component'
import { Provide,Inject } from 'vue-property-decorator'

@Component({
  components: {
    Button
  }
})
export default class CreditCard extends Vue {

  @Inject() private reload = (this as any).reload

      radio:Number= 1
      cardList:Array<any> = []
      loading:Boolean= true
      id:String | null=''

    onClickLeft() {
      let that = (this as any)
      that.$router.go(-1);
    }
    delcard(item:any) {

      console.log("-------item",item)
      let that = (this as any)
      that.$axios({
        method: "delete",
        url: api.delCreitcard,
        data: {
          id:item.id,
          customerId:this.id,
          cardSeq:item.cardSeq
        }
      }).then((res:any) => {
        console.log(res);
        if (res.code == 200) {
          that.getData()
          that.reload()
        }
        
      });
    }
    getData(){
      this.id = localStorage.getItem('accountid')
      let that =(this as any)
      that.$post(
       api.Creitcard,
       {
         customerId:that.id
       }
        
      ).then((res:any) => {
        console.log(res);
        // this.cardList = res.data.context;
          if (res.context.length != 0) {
            that.loading = false
            that.cardList = res.context;
          }
          
        
      });
    }
    mounted() {
      let that =(this as any)
      that.getData()
    }
}