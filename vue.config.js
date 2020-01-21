
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
var path = require('path');

const devProxy = ['/api','/api','/api'];  // 代理
var proEnv = require('./config/pro.env');  // 生产环境
var uatEnv = require('./config/uat.env');  // 测试环境
var devEnv = require('./config/dev.env');  // 本地环境
const env = process.env.NODE_ENV;
let target = '';
// 默认是本地环境
if(env==='production'){  // 生产环境
    target = proEnv.hosturl;
}else if(env==='test'){ // 测试环境
    target = uatEnv.hosturl;
}else{  // 本地环境
    target = devEnv.hosturl;
}
// 生成代理配置对象
let proxyObj = {};
devProxy.forEach((value, index) => {
    proxyObj[value] = {
        ws: true, 
        secure: false,
        changeOrigin:true,
        target: target,
        pathRewrite: {
            [`^/${value}`]: value
        }
    };
});
module.exports = {
  
  lintOnSave: false,
  // baseUrl: process.env.NODE_ENV === 'production'
  //   ? '//your_url'
  //   : '/',

  outputDir: 'dist',

  assetsDir: 'static',

  filenameHashing: true,

  // When building in multi-pages mode, the webpack config will contain different plugins
  // (there will be multiple instances of html-webpack-plugin and preload-webpack-plugin).
  // Make sure to run vue inspect if you are trying to modify the options for those plugins.
  // pages: {
  //   index: {
  //     // entry for the pages
  //     entry: 'src/pages/index/index.js',
  //     // the source template
  //     template: 'src/pages/index/index.html',
  //     // output as dist/index.html
  //     filename: 'index.html',
  //     // when using title option,
  //     // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: '首页',
  //     // chunks to include on this pages, by default includes
  //     // extracted common chunks and vendor chunks.
  //     chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   }
  //   // when using the entry-only string format,
  //   // template is inferred to be `public/subpage.html`
  //   // and falls back to `public/index.html` if not found.
  //   // Output filename is inferred to be `subpage.html`.
  //   // subpage: ''
  // },
  

  // eslint-loader 是否在保存的时候检查
  // lintOnSave: true,

  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,

  // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
  transpileDependencies: [],

  // 生产环境 sourceMap
  productionSourceMap: false,

  // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
  // corsUseCredentials: false,
  // webpack 配置，键值对象时会合并配置，为方法时会改写配置
  // https://cli.vuejs.org/guide/webpack.html#simple-configuration
  configureWebpack: (config) => {
    let path = require('path')
    
    // config.plugins.push(
    //   new PrerenderSPAPlugin({
    //     staticDir: path.join(__dirname, './dist'),
    //     indexPath: path.join(__dirname, './dist', 'index.html'),
    //     // 需要进行预渲染的路由路径 我这里做的是首页
    //     routes: ['/'],
    //     // html文件压缩
    //     minify: {
    //         minifyCSS: true, // css压缩
    //         removeComments: true // 移除注释
    //     },
    //     renderer: new Renderer({
    //         // Optional - The name of the property to add to the window object with the contents of `inject`.
    //         injectProperty: '__PRERENDER_INJECTED',
    //         // Optional - Any values you'd like your app to have access to via `window.injectProperty`.
    //         inject: {},
    //         // 在 main.js 中 new Vue({ mounted () {document.dispatchEvent(new Event('render-event'))}})，两者的事件名称要对应上。
    //         // renderAfterDocumentEvent: 'render-event'
    //     }),
    //     renderAfterDocumentEvent: 'render-active' 
    //   })
    // )
    Object.assign(config, {
      // 开发生产共同配置
 
     
      resolve: {
        extensions: [".js", ".vue", ".json",".ts",".png",".jpg",".png","jpeg",".svg",".gif",".tiff",".ttf",".otf"], //文件优先解析后缀名顺序
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@s": path.resolve(__dirname, "./static"),
        }, // 别名配置
        plugins: []
      },
      
    });


  },

  // webpack 链接 API，用于生成和修改 webapck 配置
  // https://github.com/mozilla-neutrino/webpack-chain
  chainWebpack: (config) => {
    // 因为是多页面，所以取消 chunks，每个页面只对应一个单独的 JS / CSS
    config.optimization
      .splitChunks({
        cacheGroups: {}
      });
    
    // 'src/lib' 目录下为外部库文件，不参与 eslint 检测
    config.module
      .rule('eslint')
      .exclude
      .add('/Users/maybexia/Downloads/FE/community_built-in/src/lib')
      .end()
    
     
     
          
  },

  // 配置高于chainWebpack中关于 css loader 的配置
  css: {
    // 是否开启支持 foo.module.css 样式
    modules: false,

    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
    extract: true,

    // 是否构建样式地图，false 将提高构建速度
    sourceMap: false,

    // css预设器配置项
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },

      postcss: {
        // options here will be passed to postcss-loader
        plugins: [
          require('autoprefixer')({overrideBrowserslist: ['> 0.15% in CN']})// 自动添加css前缀
          ]
      }
    }
  },

  // All options for webpack-dev-server are supported
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    open: true,

    host: '0.0.0.0',

    port: 8081,
    hotOnly: false,
    disableHostCheck: true,

    proxy: proxyObj,

    before: app => {
    }
  },
  // 构建时开启多进程处理 babel 编译
  parallel: require('os').cpus().length > 1,

  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  // 第三方插件配置
  pluginOptions: {
    
  },

};