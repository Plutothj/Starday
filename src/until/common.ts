
export default {
    
    install(Vue:any,options:any){
     //登录或注册后，获取交换Token
     Vue.prototype.getAccessToken=function(login_token:any,success_call:any,error_call:any){
        let token = "Bearer%" + login_token;
        let aftertoken = token.replace("%", " ");
        // this.$axios({
        //   method: "GET",
        //   url: "login",
        //   headers: {
        //     "Content-Type": "application/json", //设置请求头请求格式为JSON
        //     "Authorization": aftertoken //设置token 
        //   },
        //   params: {}
        // }).then(res => {
        //   console.log(res);
        //   if(res.data.code == "K-000000"){
        //     localStorage.setItem("access_token", res.data.context);
        //     localStorage.setItem("access_token_expire", Date.now() + 1000*60);//60分钟
        //     typeof success_call === "function" ? success_call() : false;
        //   }else{
        //     typeof error_call === "function" ? error_call() : false;
        //   }

        // })
     },
     //更新AccessToken
     Vue.prototype.updateAccessToken=function(){
       console.log('common:begin update token........');
      var login_token = localStorage.getItem("login_token");
      var access_token_expire:any= localStorage.getItem("access_token_expire")
      if(access_token_expire!=null&&access_token_expire<Date.now()){
        console.log('common:begin update token........toupdate');
        this.getAccessToken(login_token);
        console.log('common:begin update token........toupdate end.');
      }
      return false;
     },
     //检查是否已登录
     Vue.prototype.checkIsLogin=function(){
      var login_token = localStorage.getItem("login_token");
      var access_token= localStorage.getItem("access_token");
      if(login_token&&access_token){
        return true;
      }
      return false;
     },
     //退出登录，清理登录数据缓存
     Vue.prototype.login_out=function(){
      localStorage.removeItem("login_token");
      localStorage.removeItem("access_token");
      
     },
     //检查是否是在H5+SDK上执行
     Vue.prototype.checkIsH5Plus=function(){
      if(navigator.userAgent.indexOf("Html5Plus") > -1 ){  
         return true;
      }    
      return false;
     },
     //检查是否是IOS
     Vue.prototype.checkIsIOS=function(){
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      return isiOS;
     },
     //Oss转换Img格式为Jpg
     Vue.prototype.ImgToJpg=function(img:any){
      img=img+"?x-oss-process=image/format,jpg";
      return img;
     },
     //WebpToJpg
     Vue.prototype.WebpToJpg=function(img:any){
      // if(img.indexOf('.webp')>-1){
      //   img=img+"?x-oss-process=image/format,jpg";
      // }
      return img;
     }
     
  },
  showLoad(){
    window.localStorage.setItem("showLoad",'true')
  },
  closeLoad(){
    window.localStorage.setItem("showLoad",'false')
  }
}