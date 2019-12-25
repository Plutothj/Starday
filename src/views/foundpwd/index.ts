import Reg from '../../until/reg'
import ConstKey from "../../until/const_key"
import api from '../../request/api'
import {
    Toast,
    CellGroup,
    Field,
    Button,
    Icon,
    Loading

} from "vant";
import Vue from 'vue'
Vue.use(Toast).use(CellGroup).use(Field).use(Button).use(Icon).use(Loading)
import Component from 'vue-class-component'
import { 
  State,
  Getter,
  Action,
  Mutation,
  namespace
  } from 'vuex-class'

@Component({

})
export default class Foundpwd extends Vue {
    @State('userEmile') userEmile:any
    @Action('saveEmile') saveEmile:any 

    username: String = ''
    emile: String = ''
    toggle: Boolean = false
    flag: Number = 0
    hiddle: Boolean = true
    msg: String = '请输入邮箱'
    emcode: String = '确认修改'
    load: Boolean = false
    show: Boolean = true
    password: String = ''
    password1: String = ''
    valcode: String = ''

    //method
    onClickLeft() {
        this.$router.go(-1)
        if (this.flag = 1) {
            this.flag = 0
        }
    }
    goreg() {
        this.$router.push('/register')
    }
    send() {
        let that = (this as any)



        that.load = true
        that.$post(
            api.SendEmail, 
            {
                email: that.username

            }


        ).then((res:any) => {
            if (res.code == '200') {
                that.saveEmile(that.username)
                that.load = false
                that.toggle = true
                that.show = false
                that.hiddle = true
                    

            } else {
                that.load = false
                Toast(res.message)
            }

        })



    }
    sendcode() {
        let that = (this as any)
        that.load = true
        console.log('tag', that.userEmile)
        that.$post(
            api.forgetPass, {
                email: that.userEmile,
                password: that.password, //一次密码
                passwordSec: that.password1, //二次密码
                valiCode: that.valcode //邮箱中得到的验证码


            }
        ).then((res:any )=> {
            console.log('tag',res)
            if (res.code == '200') {
                that.load = false
                Toast(res.message)

                that.$router.push('/login')

            }else {
                that.load = false
                Toast(res.message)
            }
        })
    }
    change() {
        this.hiddle = false
    }
}

