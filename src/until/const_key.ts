export default   {
   //服务端返回代码
    SUCCESS:'200',
    //页数
    PAGE_SIZE:20,
    
  //CACHE_CONST_KEY===Storm存储Key值
  LOGIN_TOKEN:'login_token',//用户登录、注册返回的Token
  ACCESS_TOKEN:'access_token',//访问接口，使用LoginToken交换获得的TOKEN

  SEARCH_HIS_KEYWORD:'search_his_keyword',//搜索历史

  //全分类缓存
  CACHE_ALL_CATEGORY:'CACHE_ALL_CATEGORY',
  CACHE_ALL_CATEGORY_EXPIR:'CACHE_ALL_CATEGORY_EXPIR',
}