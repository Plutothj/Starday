import Buttons from "../../components/Button.vue";
import api from "../../request/api";
import Vue from "vue";
import Reg from "../../until/reg";
import {NavBar,Field,Loading,Button,Toast,CellGroup} from 'vant'
Vue.use(NavBar).use(Field).use(Loading).use(Toast).use(Button).use(CellGroup)
import Component from 'vue-class-component'

@Component({
  components: {
    Buttons
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
      emile:string|null = ''
      loadtext:string= '发送验证码'
      disabled:boolean= false
      sms:string= ''
      time:number= 180

    onClickLeft() {
      this.$router.go(-1);
    }
    Regemil() {}
    addcard() {
      let that = (this as any)
      
      if (that.card_NO.length==16&&that.nominee.length&&that.expire.length==4&&that.expire.substring(2,4)<13) {
        that.show=true
        that.$post(
       
        api.addCreitcard,
        {
          cardNO: this.card_NO,
          customerId: this.id,
          expire: this.expire,
          nominee: this.nominee,
          verifyCode:this.sms
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
        this.$toast('正しい形式を入力してください')
      }
      
    }
    sendCode() {
      let that = (this as any)
      const regmail = new RegExp(Reg.mailbox);
      if (regmail.test(that.emile)) {
        that.time = 180;
        that.disabled = true;
        that.timer();
        that.$fetch(
          api.addCreitcardcode
        ).then((res:any) => {
          if (res.code == '200') {
            Toast('发送成功')



          } else {

            Toast(res.message)
          }

      })
      } else {
        Toast('正しいメールアドレスを入力してください')
      }

      
    }

    timer() {
      if (this.time > 0) {
        this.time--;
        //                 console.log(this.time);
        this.loadtext = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.loadtext = "获取验证码";
        this.disabled = false;
      }
    }

   mounted () {
    this.id = localStorage.getItem('accountid');
    this.emile = localStorage.getItem('username')
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