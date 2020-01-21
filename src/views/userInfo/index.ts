import api from "../../request/api";
import Vue from "vue";
import {
  
  getdate
} from '../../until/until'
import {
  NavBar,
  Uploader,
  Image,
  Icon,
  Cell,
  ActionSheet,
  CellGroup,
  Field,
  Button,
  Radio,
  RadioGroup,
  DatetimePicker,
  Popup
} from "vant";
Vue.use(NavBar).use(Uploader).use(Image).use(Icon).use(Cell).use(ActionSheet).use(CellGroup).use(Field).use(Button).use(Radio).use(RadioGroup).use(DatetimePicker).use(Popup)

import Component from 'vue-class-component'
import {Inject} from 'vue-property-decorator'
import{ State } from 'vuex-class'

@Component({

})
export default class UserInfo extends Vue {
  @Inject() private reload = (this as any).reload 
  @State('userEmile') userEmile!:string
  @State('userName') userName!:string
      fileList:Array<any>= []
      show:Boolean= false
      show1:Boolean= false
      show2:Boolean= false
      morren:String='@s/img/moren.png'
      value:String= ""
      value1:String= ""
      value2:String= ""
      userinfo:Object= {}
      currentDate:any= new Date()
      minDate:any= new Date(1950, 1, 1)
      dateshow:boolean= false
      radio:string='1'
      phonenumber:string=''
      actions2:Array<object>= [{
          name: '日本語'
        },
        {
          name: '简体中文'
        },
      ]
      language: String=''
      customerAccount:any=''
      username:any=''

    afterRead(file:any) {
      let that = (this as any)
      if (this.fileList.length < 1) {
        console.log(this.fileList[0].content.replace(/^data:image\/\w+;base64,/, ''))
        let base  = this.fileList[0].content
        that.$post(api.upImage,{suffix:'headimg',filedir:base}).then((res:any)=>{
          console.log(res)
          that.moren=res.context

        })
        
        that.$post(api.updateCustomer,
          {
           

        }).then((res:any)=>{
          console.log(res)
          that.moren=res.context

        })

      } else {
        this.fileList = []
        this.fileList[0] = file
        // console.log(this.fileList[0].content.replace(/^data:image\/\w+;base64,/, ''))
        console.log(this.fileList[0])
        let base  = this.fileList[0].content
        that.$post(api.upImage,{suffix:'headimg',filedir:base}).then((res:any)=>{
          console.log(res)
          that.moren=res.context
          that.savephone()
        })
      }


    }
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
      that.userinfo.birthday = date
      that.dateshow = false
      that.savephone()
    }
    onClickLeft() {
      let that = (this as any)
      that.$router.go(-1);
    }
    changemile() {
      this.show = true;
    }
    changephone() {
      this.show1 = true;
    }
    // getsax() {
    //   this.$axios({
    //     method: "get",
    //     url: `customer/customerInfoById/{${this.userinfo.customerId}}`
    //   }).then(res => {
    //     console.log(res);
    //   });
    // },
    changesex(){
      this.show2 = true;
    }
    savephone() {
      
      let that = (this as any);
      that.$post(
          
          api.updateCustomer,
          {
            sex:that.userinfo.sex,
            birthday: that.userinfo.birthday,
            falName: that.userinfo.falName,
            falSur: that.userinfo.falSur,
            headImage:that.moren,
            trueName: that.userinfo.trueName,
            trueSur: that.userinfo.trueSur,
            // userName:that.value


          }
        )
        .then((res:any) => {
          console.log(res);
          if (res.code == "200") {
            that.show = false
            that.show1 = false
            that.$toast(that.$t('user_info.success'))
            that.reload()
          }
        })
        .catch((err:any) => {
          console.log(err);
        });
    }


    mounted() {
    let that = (this as any);
    that.language = localStorage.getItem('local') == 'zh' ? "简体中文" : '日本語'
    that.$post(

        api.getAllUserInfo
      )
      .then((res:any) => {
        console.log('---------', res);
        that.userinfo = res.context;
        // this.getsax();
      })
      .catch((err:any) => {});
      console.log('tag', that.userEmile)
      that.customerAccount = that.userEmile
      that.username= that.userName
  }
  
}