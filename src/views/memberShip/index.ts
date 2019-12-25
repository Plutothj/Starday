import api from "../../request/api";
import ConstKey from "../../until/const_key"
import Vue from "vue";
import { NavBar, Cell, CellGroup,List,Toast} from "vant";
Vue.use(NavBar).use(Cell).use(CellGroup).use(List).use(Toast)
import Component from 'vue-class-component'

@Component({

})
export default class Membership extends Vue{
      info:Array<any>=[]
      pageSize:Number= 10
      pageNum:Number=1
      loading:Boolean= false
      finished:Boolean= false
      isLoading:Boolean=false

   onClickLeft() {
     let that = (this as any)
      that.$router.go(-1);
    }
    getData(){
      let that = (this as any)
    that.$fetch(
      
       `api/pay/queryCardFlowInfoPage/${this.pageSize}/${this.pageNum}`
      
    ).then((res:any)=>{
      console.log(res)
      this.isLoading = true;
      
      if (res.code == ConstKey.SUCCESS) {
           
           let esList = res.context.data;
            this.info = this.info.concat(esList);
            
           // 数据全部加载完成
             if (res.context.lastPage) {
              this.finished = true;
             
            }
             this.loading = false;
          } else {
             // 加载状态结束
           this.loading = false;
             Toast(res.message);
          }
      
    })
    }
     onLoad() {
       let that = (this as any)
              setTimeout(() => {
              that.pageNum++
              this.getData()
            }, 500);
          
       }

    mounted(){
    this.getData()
    }

}