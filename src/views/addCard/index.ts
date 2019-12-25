import Button from "../../components/Button.vue";
import api from "../../request/api";
import Vue from "vue";
import {NavBar,Field,Loading} from 'vant'
Vue.use(NavBar).use(Field).use(Loading)
import Component from 'vue-class-component'

@Component({
  components: {
    Button
  }
})
export default class Addcard extends Vue{
      checked:string= ""
      str:string= ""
      nominee:string= ""
      card_NO:string= ""
      expire:string= ""
      errormsg:string= ""
      adress:string= ""
      show:Boolean= false
      id:string | null=''



    onClickLeft() {
      this.$router.go(-1);
    }
    Regemil() {}
    addcard() {
      let that = (this as any)
      
      if (that.card_NO.length==16&&that.nominee.length&&that.expire.length) {
        that.show=true
        that.$post(
       
        api.addCreitcard,
        {
          cardNO: this.card_NO,
          customerId: this.id,
          expire: this.expire,
          nominee: this.nominee,
        }
      ).then((res:any)=>{
        console.log(res)
        this.show=false
        if (res.code == "200") {
          this.$toast(that.$t('like.add'))
          this.$router.go(-1)
        } else {
          this.$toast(res.message)
        }
      })
        
      }else{
        this.$toast('请输入正确格式')
      }
      
    }

   mounted () {
    this.id = localStorage.getItem('accountid');
    }
}



// export default {
//   name: "Addcard",
//   data() {
//     return {

//     };
//   },
//   methods: {

//   },


// };