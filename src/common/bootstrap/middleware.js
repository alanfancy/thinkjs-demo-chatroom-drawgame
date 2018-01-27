/**
 * this file will be loaded before server started
 * you can register middleware
 * https://thinkjs.org/doc/middleware.html
 */

/**
 * 
 * think.middleware('xxx', http => {
 *   
 * })
 * 
 */
/* import wechatMiddleware from 'think-wechat';

think.middleware('parse_wechat', wechatMiddleware({
    pathname: 'uc/wechat',    //默认，可配置为其他路径，与公众号对应的服务器URL设置一致
    wechat: {
        token: think.config("setup.wx_Token"),
        appid: think.config("setup.wx_AppID"),
        encodingAESKey: ''
    }
}));*/

