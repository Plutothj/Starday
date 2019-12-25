import Reg from '../../until/reg'
import ConstKey from "../../until/const_key"
import api from '../../request/api'
import {
    Toast,
    CellGroup,
    Field,
    Button,
    Icon
} from "vant";
import Vue from 'vue'
Vue.use(Toast).use(CellGroup).use(Field).use(Button).use(Icon)
import Router from 'vue-router'

import Component from 'vue-class-component'
import {  
  State,
  Getter,
  Action,
  Mutation,
  namespace } from 'vuex-class'


@Component({
    
})
export default class Login extends Vue {
    
    @State('accountid') accountid:any
    @Action('saveId') saveId:any
    @Action('saveEmile')  saveEmile:any
    @Action('saveName')  saveName:any
    isRouterAlive: boolean = true
    username:string= ''
    password:string= ''
    errormsg:string= ''
    tog:string= 'closed-eye'
    onof:boolean= true
    ispwd:string= 'password'

    
        toIndex() {
            this.$router.push("/");
        }
        toggle() {
            console.log('tag', '')
            this.onof = !this.onof
            if (!this.onof) {
                this.tog = 'closed-eye'
                this.ispwd = 'password'
            } else {
                this.tog = 'eye'
                this.ispwd = 'text'
            }
        }
        reg() {

            const regmail = new RegExp(Reg.mailbox)
            if (!regmail.test(this.username)) {
                this.errormsg = (this as any).$t('login.err')
            } else {
                this.errormsg = ''
            }
        }
        login() {

            const regmail = new RegExp(Reg.mailbox)
            let that = this
            if (regmail.test(this.username) && that.username.length && that.password.length) {
                (this as any).$post(api.login, {
                    userName: that.username,
                    password: that.password,
                    type: '2'
                }).then((res:any) => {
                    console.log(res)
                    if (res.code != '200') {
                        Toast(res.message);
                    } else if (res.code == '200') {
                        //存入登录Token
                        localStorage.setItem('token', res.context.token);
                        localStorage.setItem('accountid', res.context.accountId);
                        that.saveId(res.context.accountId)
                        that.saveEmile(that.username)
                        that.saveName(res.context.userName)
                        // Toast(this.$t('register.message'));
                        // this.$router.go(-1)
                        // console.log(this.$route)
                        let obj = {}
                        console.log(this.$route)
                        if (this.$route.query == obj) {
                            (this as any).$router.push(this.$route.query.redirect)
                        } else {
                            this.$router.go(-1)
                        }

                    }
                })
            } else {
                that.errormsg = (this as any).$t('register.err')
            }
        }
        goreg() {
            this.$router.push('/register')
        }
        forgetpwd() {
            this.$router.push('/foundpwd')
        }

}

