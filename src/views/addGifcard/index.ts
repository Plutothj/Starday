import Button from "../../components/Button.vue";
import api from "../../request/api";
import Vue from "vue";
import { NavBar,CellGroup,Cell,RadioGroup,Radio,Divider, Toast,Field} from 'vant'
Vue.use(NavBar).use(Cell).use(Divider).use(Radio).use(RadioGroup).use(CellGroup).use(Field)

import Component from 'vue-class-component'

@Component({
components:{
    Button
}
})
export default class Addgifcard extends Vue {

      username:String= ""
      password:String= ""
      checked:Boolean= false
      isClick:Boolean= true

      get hangle():Boolean{
      console.log("tag", this.username);
      if (this.username && this.password) {
        return false;
      } else {
        return true;
      }
    }

    onClickLeft() {
      let that = (this as any);
      that.$router.go(-1);
    }
    bang() {
      let that = (this as any)
      if (this.isClick) {
        console.log("---------this.isClick",this.isClick)
       
        that.$axios({
          method: "post",
          url: api.addGiftcard,
          //url:'http://192.168.100.17:8190/cardInfo/bindCard',
          data: {
            cardNo: this.username,
            cardPass: this.password
          }
        }).then((res:any) => {
          console.log("-----------------礼品卡", res);
          // this.isClick = true;
          if (res.data.code == "200") {
            that.$toast(that.$t("like.add"));
            that.$router.go(-1);
          } else {
            that.$toast(that.$t("supply.p23"));
          }
        });
      }
    }


}

