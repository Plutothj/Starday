import Vue from "vue";
import api from '../../request/api'
import {NavBar,Cell ,Button ,ActionSheet} from 'vant'
Vue.use(NavBar).use(Button).use(Cell).use(ActionSheet)
import Component from 'vue-class-component'
import { Prop, Watch,  Provide,  Inject} from "vue-property-decorator";
@Component({

})

export default class Setting extends Vue{
      cache:String= "0.0m"
      show2:Boolean= false
      actions2:Array<object>= [{ name: "日本語" }, { name: "简体中文" }]
      language:String= ""
      //inject
      @Inject() private reload = (this as any).reload

      //method
    
    delcache() {
      let that = (this as any)
      that.$toast.loading({
        mask: true,
        message: (this as any) .$t('supply.p9')
      });
    }
    onClickLeft() {
      let that = (this as any)
      that.$router.go(-1);
    }
    changelanguage() {
      this.show2 = true;
    }
    onSelect(item:any) {
      this.show2 = false;
      (this as any) .reload();
      console.log(item.name);
      this.language =
        localStorage.getItem("local") == "zh" ? "简体中文" : "日本語";
      if (item.name == "日本語") {
        (this as any) .$i18n.locale = "jp";
        localStorage.setItem("local", "jp");
      } else {
        (this as any) .$i18n.locale = "zh";
        localStorage.setItem("local", "zh");
      }
    }
    logout() {
      let that = (this as any)
      that.$post(
        api.logOut
      ).then((res:any)=>{
        if (res.code == '200') {
          that.$router.push("/login");
        }
      })
      
    }
    //mounted
   mounted() {
    this.language =
      localStorage.getItem("local") == "zh" ? "简体中文" : "日本語";
    }
}





