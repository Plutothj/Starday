import api from "../../request/api";
import Vue from 'vue'
import Reg from "../../until/reg";


import {
  
  getdate
} from '../../until/until'
import {
  Toast,
  Cell,
  CellGroup,
  Field,
  RadioGroup,
  Radio,
  Button,
  NavBar,
  Checkbox,
  CheckboxGroup,
  Popup,
  DatetimePicker
} from "vant";
Vue.use(Cell).use(Toast).use(DatetimePicker).use(Popup).use(CheckboxGroup).use(Checkbox).use(NavBar).use(Button).use(Radio).use(RadioGroup).use(Field).use(CellGroup)
import Component from 'vue-class-component'
@Component({
  components: {
    

  }
})
export default class Register extends Vue{
      sms:string= ''
      disabled:boolean= false
      time:number= 35
      loadtext:string= '发送验证码'

      username:string= ""
      show:boolean= false
      emile:string= ""
      currentDate:any= new Date()
      minDate:any= new Date(1950, 1, 1)
      password:string= ""
      xing:string= ""
      ming:string= ""
      xing1:string= ""
      ming1:string= ""
      checked:string= ""
      check:string= ""
      radio:string= ""
      
      brithday:string= ''
      errormsg:string= ""
      tog:string= "closed-eye"
      onof:boolean= false
      ispwd:string= "password"
      token:string= ""
      dateshow:boolean= false


    formatter(type:string, value:any):any {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      return value;
    }
    confirm(value:any) {
      let that = (this as any)

      let date = getdate('Y-m-d', new Date(value).getTime() / 1000)
      console.log(date);
      that.brithday = date
      that.dateshow = false

    }
    showPopup() {
      this.dateshow = true;
    }
    popup() {
      if (!this.check) {
        this.show = true;
      }
    }
    toggle() {
      console.log("tag", "");
      this.onof = !this.onof;
      if (!this.onof) {
        this.tog = "closed-eye";
        this.ispwd = "password";
      } else {
        this.tog = "eye";
        this.ispwd = "text";
      }
    }
    Regemil() {
      let that = (this as any)
      console.log("tag", "");
      const regmail = new RegExp(Reg.mailbox);
      if (!regmail.test(that.emile)) {
        that.errormsg = that.$t("register.err");
        that.disabled = false
      } else {
        
        let formdata:any = new FormData()
        formdata.append('email',that.emile)
        formdata.append('type',2)
        that.$post(
          api.getAccountByEmail,
          // {
          //   email:that.emile
          // }
          formdata
        ).then((res:any)=>{
          console.log('tag', res)
          if (res.context !== null) {
            that.errormsg = that.$t("register.msg");
            that.disabled = true
          }else{
            that.errormsg = '';
          }
        })

      }
    }

    sendCode() {
      let that = (this as any)
      const regmail = new RegExp(Reg.mailbox);
      if (regmail.test(that.emile)) {
        that.time = 35;
        that.disabled = true;
        that.timer();
        that.$post(
          api.SendEmail, {
            email: that.emile

          }


        ).then((res:any) => {
          if (res.code == '200') {
            Toast('发送成功')



          } else {

            Toast(res.message)
          }

      })
      } else {
        Toast('请输入正确邮箱')
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

    // getUuid() {
    //     var s = [];
    //     var hexDigits = "0123456789abcdef";
    //     for (var i = 0; i < 36; i++) {
    //         s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    //     }
    //     s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    //     s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    //     s[8] = s[13] = s[18] = s[23] = "-";

    //     return s.join("");
    // },
    onClickLeft() {
      this.$router.go(-1);
    }
    gologin() {
      let that = (this as any)
      Toast.loading({
        mask: true,
        message: that.$t("register.reg")
      });
      
      if (that.password.length &&
        that.emile.length &&
        that.ming.length &&
        that.xing.length&&
        that.sms.length
      ) {
        that.$post(

          api.register, 
          {
            email: that.emile,
            password: that.password,
            userName: that.username,
            falSur: that.xing,
            falName: that.ming,
            trueSur: that.xing1,
            trueName: that.ming1,
            birthday: that.brithday !== '' ? that.brithday : "1900-01-01",
            type: 2,
            sex: that.radio ? that.radio : '1',
            valiCode:that.sms

          }
        ).then((res:any) => {
          if (res.code == '200') {
            that.$router.push('/login')
          }
        })



      } else {
        that.$toast(that.$t("supply.input"));
      }






    }

    handelChange() {}

}
