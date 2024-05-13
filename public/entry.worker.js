function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
self.addEventListener("install", (event) => {
  console.log(...oo_oo(`4103074995_8_2_8_41_4`, "Service worker installed"));
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", (event) => {
  console.log(...oo_oo(`4103074995_14_2_14_41_4`, "Service worker activated"));
  event.waitUntil(self.clients.claim());
});
function oo_cm() {
  try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)(`/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x71a422=_0x42d0;(function(_0x23d4bd,_0x5da54a){var _0x358bee=_0x42d0,_0x3396f0=_0x23d4bd();while(!![]){try{var _0x4412b0=-parseInt(_0x358bee(0x280))/0x1+parseInt(_0x358bee(0x1e6))/0x2*(parseInt(_0x358bee(0x263))/0x3)+parseInt(_0x358bee(0x2ab))/0x4*(-parseInt(_0x358bee(0x200))/0x5)+-parseInt(_0x358bee(0x270))/0x6+parseInt(_0x358bee(0x210))/0x7*(parseInt(_0x358bee(0x253))/0x8)+-parseInt(_0x358bee(0x28a))/0x9*(parseInt(_0x358bee(0x2b7))/0xa)+parseInt(_0x358bee(0x2b2))/0xb*(parseInt(_0x358bee(0x1f7))/0xc);if(_0x4412b0===_0x5da54a)break;else _0x3396f0['push'](_0x3396f0['shift']());}catch(_0x50895c){_0x3396f0['push'](_0x3396f0['shift']());}}}(_0x287d,0x593ab));var K=Object[_0x71a422(0x222)],Q=Object['defineProperty'],G=Object[_0x71a422(0x25d)],ee=Object['getOwnPropertyNames'],te=Object['getPrototypeOf'],ne=Object[_0x71a422(0x29a)][_0x71a422(0x2a6)],re=(_0x298aa6,_0x3398f3,_0x4760c4,_0x16968c)=>{var _0x17b321=_0x71a422;if(_0x3398f3&&typeof _0x3398f3=='object'||typeof _0x3398f3==_0x17b321(0x1e7)){for(let _0x35b5d3 of ee(_0x3398f3))!ne[_0x17b321(0x20b)](_0x298aa6,_0x35b5d3)&&_0x35b5d3!==_0x4760c4&&Q(_0x298aa6,_0x35b5d3,{'get':()=>_0x3398f3[_0x35b5d3],'enumerable':!(_0x16968c=G(_0x3398f3,_0x35b5d3))||_0x16968c[_0x17b321(0x1ec)]});}return _0x298aa6;},V=(_0x53c1d4,_0x265284,_0x295083)=>(_0x295083=_0x53c1d4!=null?K(te(_0x53c1d4)):{},re(_0x265284||!_0x53c1d4||!_0x53c1d4['__es'+'Module']?Q(_0x295083,_0x71a422(0x267),{'value':_0x53c1d4,'enumerable':!0x0}):_0x295083,_0x53c1d4)),x=class{constructor(_0x48b54d,_0x4b9674,_0x3624cf,_0x17219f,_0x4412df,_0x117ec6){var _0x365a61=_0x71a422;this[_0x365a61(0x21d)]=_0x48b54d,this[_0x365a61(0x294)]=_0x4b9674,this[_0x365a61(0x2a1)]=_0x3624cf,this['nodeModules']=_0x17219f,this['dockerizedApp']=_0x4412df,this[_0x365a61(0x2b0)]=_0x117ec6,this['_allowedToSend']=!0x0,this[_0x365a61(0x1e4)]=!0x0,this[_0x365a61(0x264)]=!0x1,this[_0x365a61(0x22a)]=!0x1,this['_inNextEdge']=_0x48b54d[_0x365a61(0x228)]?.[_0x365a61(0x208)]?.[_0x365a61(0x28f)]==='edge',this[_0x365a61(0x29c)]=!this[_0x365a61(0x21d)][_0x365a61(0x228)]?.[_0x365a61(0x2a5)]?.[_0x365a61(0x26a)]&&!this['_inNextEdge'],this['_WebSocketClass']=null,this[_0x365a61(0x24e)]=0x0,this[_0x365a61(0x2b5)]=0x14,this['_webSocketErrorDocsLink']=_0x365a61(0x254),this[_0x365a61(0x277)]=(this['_inBrowser']?_0x365a61(0x281):_0x365a61(0x21a))+this[_0x365a61(0x1e1)];}async['getWebSocketClass'](){var _0x117597=_0x71a422;if(this['_WebSocketClass'])return this['_WebSocketClass'];let _0x576c13;if(this['_inBrowser']||this[_0x117597(0x220)])_0x576c13=this[_0x117597(0x21d)][_0x117597(0x25a)];else{if(this[_0x117597(0x21d)][_0x117597(0x228)]?.['_WebSocket'])_0x576c13=this[_0x117597(0x21d)][_0x117597(0x228)]?.[_0x117597(0x21c)];else try{let _0x2f373b=await import(_0x117597(0x24b));_0x576c13=(await import((await import('url'))['pathToFileURL'](_0x2f373b[_0x117597(0x219)](this[_0x117597(0x269)],'ws/index.js'))[_0x117597(0x295)]()))[_0x117597(0x267)];}catch{try{_0x576c13=require(require(_0x117597(0x24b))[_0x117597(0x219)](this['nodeModules'],'ws'));}catch{throw new Error(_0x117597(0x1ea));}}}return this[_0x117597(0x1f0)]=_0x576c13,_0x576c13;}[_0x71a422(0x224)](){var _0x3ef251=_0x71a422;this[_0x3ef251(0x22a)]||this[_0x3ef251(0x264)]||this['_connectAttemptCount']>=this[_0x3ef251(0x2b5)]||(this['_allowedToConnectOnSend']=!0x1,this['_connecting']=!0x0,this[_0x3ef251(0x24e)]++,this['_ws']=new Promise((_0x45f6bd,_0x4f3986)=>{var _0x4f0e1c=_0x3ef251;this[_0x4f0e1c(0x248)]()['then'](_0x58f075=>{var _0x44ca75=_0x4f0e1c;let _0x4a70da=new _0x58f075('ws://'+(!this[_0x44ca75(0x29c)]&&this['dockerizedApp']?_0x44ca75(0x1e5):this[_0x44ca75(0x294)])+':'+this['port']);_0x4a70da[_0x44ca75(0x28d)]=()=>{var _0x2bcc11=_0x44ca75;this['_allowedToSend']=!0x1,this[_0x2bcc11(0x2b4)](_0x4a70da),this['_attemptToReconnectShortly'](),_0x4f3986(new Error(_0x2bcc11(0x2b9)));},_0x4a70da['onopen']=()=>{var _0x204c02=_0x44ca75;this[_0x204c02(0x29c)]||_0x4a70da['_socket']&&_0x4a70da[_0x204c02(0x261)][_0x204c02(0x283)]&&_0x4a70da[_0x204c02(0x261)][_0x204c02(0x283)](),_0x45f6bd(_0x4a70da);},_0x4a70da[_0x44ca75(0x1f1)]=()=>{var _0x4f1118=_0x44ca75;this[_0x4f1118(0x1e4)]=!0x0,this[_0x4f1118(0x2b4)](_0x4a70da),this[_0x4f1118(0x276)]();},_0x4a70da[_0x44ca75(0x201)]=_0x26914d=>{var _0xc6b872=_0x44ca75;try{if(!_0x26914d?.['data']||!this[_0xc6b872(0x2b0)])return;let _0x59639e=JSON['parse'](_0x26914d['data']);this[_0xc6b872(0x2b0)](_0x59639e[_0xc6b872(0x247)],_0x59639e[_0xc6b872(0x22b)],this['global'],this['_inBrowser']);}catch{}};})['then'](_0x13d419=>(this['_connected']=!0x0,this[_0x4f0e1c(0x22a)]=!0x1,this['_allowedToConnectOnSend']=!0x1,this['_allowedToSend']=!0x0,this[_0x4f0e1c(0x24e)]=0x0,_0x13d419))[_0x4f0e1c(0x27e)](_0x5ac844=>(this[_0x4f0e1c(0x264)]=!0x1,this['_connecting']=!0x1,console[_0x4f0e1c(0x29e)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20'+this[_0x4f0e1c(0x1e1)]),_0x4f3986(new Error(_0x4f0e1c(0x1e2)+(_0x5ac844&&_0x5ac844['message'])))));}));}[_0x71a422(0x2b4)](_0x2bbc31){var _0x35da38=_0x71a422;this['_connected']=!0x1,this[_0x35da38(0x22a)]=!0x1;try{_0x2bbc31[_0x35da38(0x1f1)]=null,_0x2bbc31['onerror']=null,_0x2bbc31['onopen']=null;}catch{}try{_0x2bbc31[_0x35da38(0x1fc)]<0x2&&_0x2bbc31['close']();}catch{}}[_0x71a422(0x276)](){var _0x20289d=_0x71a422;clearTimeout(this['_reconnectTimeout']),!(this['_connectAttemptCount']>=this[_0x20289d(0x2b5)])&&(this['_reconnectTimeout']=setTimeout(()=>{var _0xa10f2c=_0x20289d;this[_0xa10f2c(0x264)]||this[_0xa10f2c(0x22a)]||(this[_0xa10f2c(0x224)](),this['_ws']?.[_0xa10f2c(0x27e)](()=>this['_attemptToReconnectShortly']()));},0x1f4),this[_0x20289d(0x256)][_0x20289d(0x283)]&&this[_0x20289d(0x256)][_0x20289d(0x283)]());}async[_0x71a422(0x215)](_0x20d29b){var _0x3e099d=_0x71a422;try{if(!this[_0x3e099d(0x232)])return;this[_0x3e099d(0x1e4)]&&this['_connectToHostNow'](),(await this[_0x3e099d(0x1f2)])[_0x3e099d(0x215)](JSON[_0x3e099d(0x1de)](_0x20d29b));}catch(_0x2749f9){console[_0x3e099d(0x29e)](this[_0x3e099d(0x277)]+':\\x20'+(_0x2749f9&&_0x2749f9[_0x3e099d(0x1fa)])),this[_0x3e099d(0x232)]=!0x1,this[_0x3e099d(0x276)]();}}};function q(_0x40c1fa,_0x325316,_0x2365a5,_0x396382,_0x5d892d,_0xe17c49,_0x223617,_0x43e360=ie){var _0x4af393=_0x71a422;let _0x1e1d98=_0x2365a5[_0x4af393(0x24c)](',')[_0x4af393(0x271)](_0x21d077=>{var _0x10741e=_0x4af393;try{if(!_0x40c1fa['_console_ninja_session']){let _0x2f735a=_0x40c1fa[_0x10741e(0x228)]?.['versions']?.[_0x10741e(0x26a)]||_0x40c1fa['process']?.['env']?.[_0x10741e(0x28f)]==='edge';(_0x5d892d===_0x10741e(0x227)||_0x5d892d===_0x10741e(0x1ef)||_0x5d892d==='astro'||_0x5d892d===_0x10741e(0x216))&&(_0x5d892d+=_0x2f735a?'\\x20server':'\\x20browser'),_0x40c1fa[_0x10741e(0x24f)]={'id':+new Date(),'tool':_0x5d892d},_0x223617&&_0x5d892d&&!_0x2f735a&&console[_0x10741e(0x1e8)]('%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20'+(_0x5d892d[_0x10741e(0x257)](0x0)['toUpperCase']()+_0x5d892d['substr'](0x1))+',',_0x10741e(0x242),_0x10741e(0x240));}let _0x3c8412=new x(_0x40c1fa,_0x325316,_0x21d077,_0x396382,_0xe17c49,_0x43e360);return _0x3c8412[_0x10741e(0x215)][_0x10741e(0x275)](_0x3c8412);}catch(_0x1c509b){return console[_0x10741e(0x29e)](_0x10741e(0x288),_0x1c509b&&_0x1c509b[_0x10741e(0x1fa)]),()=>{};}});return _0xe51849=>_0x1e1d98[_0x4af393(0x286)](_0x319abb=>_0x319abb(_0xe51849));}function _0x287d(){var _0x26d1ec=['_keyStrRegExp','Error','current','pop','autoExpandMaxDepth','valueOf','env','[object\\x20Date]','origin','call','_dateToString','timeStamp','_additionalMetadata','[object\\x20Set]','4367678zPztGc','type','capped','indexOf','setter','send','angular','','reduceLimits','join','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','stackTraceLimit','_WebSocket','global','_objectToString','perf_hooks','_inNextEdge','_type','create','_setNodeId','_connectToHostNow','console','reload','next.js','process','props','_connecting','args','time','String','_HTMLAllCollection','autoExpandPropertyCount','constructor','substr','_allowedToSend','_isSet','_setNodeExpressionPath','_addFunctionsNode','totalStrLength','_sortProps','level','50135','concat','undefined','_setNodeQueryPath','allStrLength','hostname','_isArray','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','parent','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','name','autoExpand','disabledLog','symbol','method','getWebSocketClass','length','toLowerCase','path','split','_getOwnPropertyDescriptor','_connectAttemptCount','_console_ninja_session','_processTreeNodeResult','positiveInfinity','_Symbol','8KxYpZk','https://tinyurl.com/37x8b79t','_isNegativeZero','_reconnectTimeout','charAt',["localhost","127.0.0.1","example.cypress.io","192-168-1-128.lan","192.168.1.128"],"/Users/seannorwood/.vscode/extensions/wallabyjs.console-ninja-1.0.321/node_modules",'WebSocket','127.0.0.1','serialize','getOwnPropertyDescriptor','_isPrimitiveWrapperType','value','_numberRegExp','_socket','Number','6IyszgT','_connected','_hasSetOnItsPath','negativeInfinity','default','null','nodeModules','node','date','elapsed','push','_p_','_propertyName','2547036ObttJT','map','cappedProps','Buffer','performance','bind','_attemptToReconnectShortly','_sendErrorMessage','autoExpandLimit','error','Boolean','_capIfString','Set','HTMLAllCollection','catch','disabledTrace','592408UqrGNg','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','count','unref','strLength','autoExpandPreviousObjects','forEach','_setNodePermissions','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','location','230355oGccKc','now','[object\\x20Array]','onerror','expressionsToEvaluate','NEXT_RUNTIME','1','_addLoadNode','_cleanNode','1.0.0','host','toString','_consoleNinjaAllowedToStart','getter','_console_ninja','isArray','prototype','coverage','_inBrowser','bigint','warn','POSITIVE_INFINITY','negativeZero','port','hits','index','cappedElements','versions','hasOwnProperty','rootExpression','test','set','includes','180iiKRNp','_getOwnPropertyNames','_hasMapOnItsPath','boolean','sort','eventReceivedCallback','NEGATIVE_INFINITY','55ogmyQb','object','_disposeWebsocket','_maxConnectAttemptCount','_addProperty','250rOaYsJ','number','logger\\x20websocket\\x20error','slice','RegExp','_addObjectProperty','_setNodeExpandableState','unknown','root_exp','isExpressionToEvaluate','remix','_property','_isMap','Map','[object\\x20BigInt]','_blacklistedProperty','array','stringify','replace','_setNodeLabel','_webSocketErrorDocsLink','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','edge','_allowedToConnectOnSend','gateway.docker.internal','32098rjxFzq','function','log','noFunctions','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','_quotedRegExp','enumerable','_regExpToString','_treeNodePropertiesAfterFullValue','remix','_WebSocketClass','onclose','_ws','string','depth','expId','resolveGetters','5009520GpZGhG','match','_treeNodePropertiesBeforeFullValue','message','elements','readyState','trace','_isPrimitiveType','_undefined','80120ARKncr','onmessage'];_0x287d=function(){return _0x26d1ec;};return _0x287d();}function ie(_0x16fd96,_0x2ba066,_0x322438,_0x2e144f){var _0xd9ccfd=_0x71a422;_0x2e144f&&_0x16fd96===_0xd9ccfd(0x226)&&_0x322438[_0xd9ccfd(0x289)][_0xd9ccfd(0x226)]();}function b(_0x387d99){var _0x5baf58=_0x71a422;let _0xcd003f=function(_0x2252c0,_0x15e262){return _0x15e262-_0x2252c0;},_0x2277d7;if(_0x387d99[_0x5baf58(0x274)])_0x2277d7=function(){var _0x2c9bb2=_0x5baf58;return _0x387d99[_0x2c9bb2(0x274)][_0x2c9bb2(0x28b)]();};else{if(_0x387d99[_0x5baf58(0x228)]&&_0x387d99[_0x5baf58(0x228)]['hrtime']&&_0x387d99[_0x5baf58(0x228)]?.[_0x5baf58(0x208)]?.[_0x5baf58(0x28f)]!==_0x5baf58(0x1e3))_0x2277d7=function(){var _0x2dae44=_0x5baf58;return _0x387d99[_0x2dae44(0x228)]['hrtime']();},_0xcd003f=function(_0x53e2f2,_0x4e32be){return 0x3e8*(_0x4e32be[0x0]-_0x53e2f2[0x0])+(_0x4e32be[0x1]-_0x53e2f2[0x1])/0xf4240;};else try{let {performance:_0x50778b}=require(_0x5baf58(0x21f));_0x2277d7=function(){var _0x4e681a=_0x5baf58;return _0x50778b[_0x4e681a(0x28b)]();};}catch{_0x2277d7=function(){return+new Date();};}}return{'elapsed':_0xcd003f,'timeStamp':_0x2277d7,'now':()=>Date['now']()};}function X(_0x33764b,_0x333766,_0x4b029a){var _0x135132=_0x71a422;if(_0x33764b[_0x135132(0x296)]!==void 0x0)return _0x33764b[_0x135132(0x296)];let _0x42d5e1=_0x33764b[_0x135132(0x228)]?.['versions']?.[_0x135132(0x26a)]||_0x33764b[_0x135132(0x228)]?.[_0x135132(0x208)]?.[_0x135132(0x28f)]===_0x135132(0x1e3);return _0x42d5e1&&_0x4b029a==='nuxt'?_0x33764b['_consoleNinjaAllowedToStart']=!0x1:_0x33764b[_0x135132(0x296)]=_0x42d5e1||!_0x333766||_0x33764b[_0x135132(0x289)]?.[_0x135132(0x23e)]&&_0x333766[_0x135132(0x2aa)](_0x33764b[_0x135132(0x289)][_0x135132(0x23e)]),_0x33764b['_consoleNinjaAllowedToStart'];}function H(_0x71abf3,_0x5ecfe2,_0x1fac2a,_0x48a8c3){var _0x180451=_0x71a422;_0x71abf3=_0x71abf3,_0x5ecfe2=_0x5ecfe2,_0x1fac2a=_0x1fac2a,_0x48a8c3=_0x48a8c3;let _0x552533=b(_0x71abf3),_0x423390=_0x552533[_0x180451(0x26c)],_0x12449d=_0x552533['timeStamp'];class _0x4370cf{constructor(){var _0x1cac8c=_0x180451;this[_0x1cac8c(0x202)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x1cac8c(0x260)]=/^(0|[1-9][0-9]*)$/,this[_0x1cac8c(0x1eb)]=/'([^\\\\']|\\\\')*'/,this[_0x1cac8c(0x1ff)]=_0x71abf3['undefined'],this[_0x1cac8c(0x22e)]=_0x71abf3['HTMLAllCollection'],this[_0x1cac8c(0x24d)]=Object[_0x1cac8c(0x25d)],this['_getOwnPropertyNames']=Object['getOwnPropertyNames'],this[_0x1cac8c(0x252)]=_0x71abf3['Symbol'],this['_regExpToString']=RegExp[_0x1cac8c(0x29a)][_0x1cac8c(0x295)],this[_0x1cac8c(0x20c)]=Date[_0x1cac8c(0x29a)][_0x1cac8c(0x295)];}[_0x180451(0x25c)](_0x39ed43,_0x1d3210,_0x9285c2,_0x44c4ab){var _0x4e18ee=_0x180451,_0x583d72=this,_0x42a0c4=_0x9285c2[_0x4e18ee(0x244)];function _0x242cd4(_0x4f8644,_0xb543d8,_0x391ac){var _0x40bcfb=_0x4e18ee;_0xb543d8[_0x40bcfb(0x211)]=_0x40bcfb(0x2be),_0xb543d8[_0x40bcfb(0x279)]=_0x4f8644[_0x40bcfb(0x1fa)],_0x1c70cb=_0x391ac[_0x40bcfb(0x26a)][_0x40bcfb(0x204)],_0x391ac[_0x40bcfb(0x26a)][_0x40bcfb(0x204)]=_0xb543d8,_0x583d72['_treeNodePropertiesBeforeFullValue'](_0xb543d8,_0x391ac);}try{_0x9285c2[_0x4e18ee(0x238)]++,_0x9285c2[_0x4e18ee(0x244)]&&_0x9285c2[_0x4e18ee(0x285)][_0x4e18ee(0x26d)](_0x1d3210);var _0x568321,_0x2e7603,_0x1ef011,_0x31056e,_0x3b7e0d=[],_0x53e933=[],_0x295981,_0x4c8ecb=this['_type'](_0x1d3210),_0x308a3e=_0x4c8ecb===_0x4e18ee(0x1dd),_0x439889=!0x1,_0x2af787=_0x4c8ecb===_0x4e18ee(0x1e7),_0x2ed17c=this['_isPrimitiveType'](_0x4c8ecb),_0x47dbbd=this[_0x4e18ee(0x25e)](_0x4c8ecb),_0xf63ca4=_0x2ed17c||_0x47dbbd,_0x1aaf52={},_0x503c8d=0x0,_0x496f23=!0x1,_0x1c70cb,_0x5c51d2=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x9285c2[_0x4e18ee(0x1f4)]){if(_0x308a3e){if(_0x2e7603=_0x1d3210[_0x4e18ee(0x249)],_0x2e7603>_0x9285c2['elements']){for(_0x1ef011=0x0,_0x31056e=_0x9285c2[_0x4e18ee(0x1fb)],_0x568321=_0x1ef011;_0x568321<_0x31056e;_0x568321++)_0x53e933[_0x4e18ee(0x26d)](_0x583d72[_0x4e18ee(0x2b6)](_0x3b7e0d,_0x1d3210,_0x4c8ecb,_0x568321,_0x9285c2));_0x39ed43[_0x4e18ee(0x2a4)]=!0x0;}else{for(_0x1ef011=0x0,_0x31056e=_0x2e7603,_0x568321=_0x1ef011;_0x568321<_0x31056e;_0x568321++)_0x53e933['push'](_0x583d72[_0x4e18ee(0x2b6)](_0x3b7e0d,_0x1d3210,_0x4c8ecb,_0x568321,_0x9285c2));}_0x9285c2[_0x4e18ee(0x22f)]+=_0x53e933[_0x4e18ee(0x249)];}if(!(_0x4c8ecb===_0x4e18ee(0x268)||_0x4c8ecb===_0x4e18ee(0x23b))&&!_0x2ed17c&&_0x4c8ecb!==_0x4e18ee(0x22d)&&_0x4c8ecb!==_0x4e18ee(0x273)&&_0x4c8ecb!=='bigint'){var _0x345ce6=_0x44c4ab['props']||_0x9285c2[_0x4e18ee(0x229)];if(this[_0x4e18ee(0x233)](_0x1d3210)?(_0x568321=0x0,_0x1d3210[_0x4e18ee(0x286)](function(_0x5e13b4){var _0x255930=_0x4e18ee;if(_0x503c8d++,_0x9285c2[_0x255930(0x22f)]++,_0x503c8d>_0x345ce6){_0x496f23=!0x0;return;}if(!_0x9285c2['isExpressionToEvaluate']&&_0x9285c2[_0x255930(0x244)]&&_0x9285c2[_0x255930(0x22f)]>_0x9285c2[_0x255930(0x278)]){_0x496f23=!0x0;return;}_0x53e933[_0x255930(0x26d)](_0x583d72[_0x255930(0x2b6)](_0x3b7e0d,_0x1d3210,'Set',_0x568321++,_0x9285c2,function(_0x2f9d81){return function(){return _0x2f9d81;};}(_0x5e13b4)));})):this['_isMap'](_0x1d3210)&&_0x1d3210[_0x4e18ee(0x286)](function(_0x43636f,_0x4a016c){var _0xdd181=_0x4e18ee;if(_0x503c8d++,_0x9285c2[_0xdd181(0x22f)]++,_0x503c8d>_0x345ce6){_0x496f23=!0x0;return;}if(!_0x9285c2[_0xdd181(0x1d6)]&&_0x9285c2[_0xdd181(0x244)]&&_0x9285c2[_0xdd181(0x22f)]>_0x9285c2[_0xdd181(0x278)]){_0x496f23=!0x0;return;}var _0x1224b5=_0x4a016c['toString']();_0x1224b5[_0xdd181(0x249)]>0x64&&(_0x1224b5=_0x1224b5[_0xdd181(0x2ba)](0x0,0x64)+'...'),_0x53e933['push'](_0x583d72['_addProperty'](_0x3b7e0d,_0x1d3210,_0xdd181(0x1da),_0x1224b5,_0x9285c2,function(_0x404774){return function(){return _0x404774;};}(_0x43636f)));}),!_0x439889){try{for(_0x295981 in _0x1d3210)if(!(_0x308a3e&&_0x5c51d2[_0x4e18ee(0x2a8)](_0x295981))&&!this[_0x4e18ee(0x1dc)](_0x1d3210,_0x295981,_0x9285c2)){if(_0x503c8d++,_0x9285c2['autoExpandPropertyCount']++,_0x503c8d>_0x345ce6){_0x496f23=!0x0;break;}if(!_0x9285c2['isExpressionToEvaluate']&&_0x9285c2[_0x4e18ee(0x244)]&&_0x9285c2[_0x4e18ee(0x22f)]>_0x9285c2['autoExpandLimit']){_0x496f23=!0x0;break;}_0x53e933[_0x4e18ee(0x26d)](_0x583d72['_addObjectProperty'](_0x3b7e0d,_0x1aaf52,_0x1d3210,_0x4c8ecb,_0x295981,_0x9285c2));}}catch{}if(_0x1aaf52['_p_length']=!0x0,_0x2af787&&(_0x1aaf52['_p_name']=!0x0),!_0x496f23){var _0x10ba85=[][_0x4e18ee(0x23a)](this[_0x4e18ee(0x2ac)](_0x1d3210))[_0x4e18ee(0x23a)](this['_getOwnPropertySymbols'](_0x1d3210));for(_0x568321=0x0,_0x2e7603=_0x10ba85[_0x4e18ee(0x249)];_0x568321<_0x2e7603;_0x568321++)if(_0x295981=_0x10ba85[_0x568321],!(_0x308a3e&&_0x5c51d2[_0x4e18ee(0x2a8)](_0x295981['toString']()))&&!this[_0x4e18ee(0x1dc)](_0x1d3210,_0x295981,_0x9285c2)&&!_0x1aaf52['_p_'+_0x295981[_0x4e18ee(0x295)]()]){if(_0x503c8d++,_0x9285c2[_0x4e18ee(0x22f)]++,_0x503c8d>_0x345ce6){_0x496f23=!0x0;break;}if(!_0x9285c2[_0x4e18ee(0x1d6)]&&_0x9285c2['autoExpand']&&_0x9285c2[_0x4e18ee(0x22f)]>_0x9285c2['autoExpandLimit']){_0x496f23=!0x0;break;}_0x53e933[_0x4e18ee(0x26d)](_0x583d72[_0x4e18ee(0x2bc)](_0x3b7e0d,_0x1aaf52,_0x1d3210,_0x4c8ecb,_0x295981,_0x9285c2));}}}}}if(_0x39ed43[_0x4e18ee(0x211)]=_0x4c8ecb,_0xf63ca4?(_0x39ed43[_0x4e18ee(0x25f)]=_0x1d3210[_0x4e18ee(0x207)](),this[_0x4e18ee(0x27b)](_0x4c8ecb,_0x39ed43,_0x9285c2,_0x44c4ab)):_0x4c8ecb===_0x4e18ee(0x26b)?_0x39ed43[_0x4e18ee(0x25f)]=this[_0x4e18ee(0x20c)][_0x4e18ee(0x20b)](_0x1d3210):_0x4c8ecb===_0x4e18ee(0x29d)?_0x39ed43[_0x4e18ee(0x25f)]=_0x1d3210[_0x4e18ee(0x295)]():_0x4c8ecb===_0x4e18ee(0x2bb)?_0x39ed43[_0x4e18ee(0x25f)]=this[_0x4e18ee(0x1ed)][_0x4e18ee(0x20b)](_0x1d3210):_0x4c8ecb===_0x4e18ee(0x246)&&this[_0x4e18ee(0x252)]?_0x39ed43[_0x4e18ee(0x25f)]=this['_Symbol'][_0x4e18ee(0x29a)]['toString'][_0x4e18ee(0x20b)](_0x1d3210):!_0x9285c2['depth']&&!(_0x4c8ecb===_0x4e18ee(0x268)||_0x4c8ecb===_0x4e18ee(0x23b))&&(delete _0x39ed43['value'],_0x39ed43[_0x4e18ee(0x212)]=!0x0),_0x496f23&&(_0x39ed43[_0x4e18ee(0x272)]=!0x0),_0x1c70cb=_0x9285c2['node'][_0x4e18ee(0x204)],_0x9285c2[_0x4e18ee(0x26a)][_0x4e18ee(0x204)]=_0x39ed43,this['_treeNodePropertiesBeforeFullValue'](_0x39ed43,_0x9285c2),_0x53e933[_0x4e18ee(0x249)]){for(_0x568321=0x0,_0x2e7603=_0x53e933[_0x4e18ee(0x249)];_0x568321<_0x2e7603;_0x568321++)_0x53e933[_0x568321](_0x568321);}_0x3b7e0d[_0x4e18ee(0x249)]&&(_0x39ed43[_0x4e18ee(0x229)]=_0x3b7e0d);}catch(_0xb91d11){_0x242cd4(_0xb91d11,_0x39ed43,_0x9285c2);}return this['_additionalMetadata'](_0x1d3210,_0x39ed43),this[_0x4e18ee(0x1ee)](_0x39ed43,_0x9285c2),_0x9285c2[_0x4e18ee(0x26a)][_0x4e18ee(0x204)]=_0x1c70cb,_0x9285c2[_0x4e18ee(0x238)]--,_0x9285c2[_0x4e18ee(0x244)]=_0x42a0c4,_0x9285c2[_0x4e18ee(0x244)]&&_0x9285c2['autoExpandPreviousObjects'][_0x4e18ee(0x205)](),_0x39ed43;}['_getOwnPropertySymbols'](_0x1502a1){return Object['getOwnPropertySymbols']?Object['getOwnPropertySymbols'](_0x1502a1):[];}[_0x180451(0x233)](_0x12425b){var _0x2db0b9=_0x180451;return!!(_0x12425b&&_0x71abf3[_0x2db0b9(0x27c)]&&this[_0x2db0b9(0x21e)](_0x12425b)===_0x2db0b9(0x20f)&&_0x12425b[_0x2db0b9(0x286)]);}['_blacklistedProperty'](_0x2448b1,_0x887dc3,_0x425807){var _0x536832=_0x180451;return _0x425807[_0x536832(0x1e9)]?typeof _0x2448b1[_0x887dc3]==_0x536832(0x1e7):!0x1;}['_type'](_0x30ed85){var _0x1c7f83=_0x180451,_0x47e04d='';return _0x47e04d=typeof _0x30ed85,_0x47e04d===_0x1c7f83(0x2b3)?this[_0x1c7f83(0x21e)](_0x30ed85)===_0x1c7f83(0x28c)?_0x47e04d='array':this[_0x1c7f83(0x21e)](_0x30ed85)===_0x1c7f83(0x209)?_0x47e04d=_0x1c7f83(0x26b):this[_0x1c7f83(0x21e)](_0x30ed85)===_0x1c7f83(0x1db)?_0x47e04d=_0x1c7f83(0x29d):_0x30ed85===null?_0x47e04d=_0x1c7f83(0x268):_0x30ed85[_0x1c7f83(0x230)]&&(_0x47e04d=_0x30ed85['constructor'][_0x1c7f83(0x243)]||_0x47e04d):_0x47e04d===_0x1c7f83(0x23b)&&this['_HTMLAllCollection']&&_0x30ed85 instanceof this[_0x1c7f83(0x22e)]&&(_0x47e04d=_0x1c7f83(0x27d)),_0x47e04d;}[_0x180451(0x21e)](_0x2fb381){var _0x52cbde=_0x180451;return Object[_0x52cbde(0x29a)][_0x52cbde(0x295)][_0x52cbde(0x20b)](_0x2fb381);}[_0x180451(0x1fe)](_0x4ee9ed){var _0x493488=_0x180451;return _0x4ee9ed===_0x493488(0x2ae)||_0x4ee9ed===_0x493488(0x1f3)||_0x4ee9ed===_0x493488(0x2b8);}[_0x180451(0x25e)](_0xd6de08){var _0x5a3442=_0x180451;return _0xd6de08===_0x5a3442(0x27a)||_0xd6de08===_0x5a3442(0x22d)||_0xd6de08==='Number';}[_0x180451(0x2b6)](_0x1cc530,_0x5192a9,_0x1e553d,_0x4d1d3a,_0x2a74f7,_0x422dbb){var _0x39586c=this;return function(_0x563b52){var _0x47957f=_0x42d0,_0xe9fdd8=_0x2a74f7[_0x47957f(0x26a)][_0x47957f(0x204)],_0x3fb9a3=_0x2a74f7['node']['index'],_0x223cc4=_0x2a74f7[_0x47957f(0x26a)][_0x47957f(0x241)];_0x2a74f7['node'][_0x47957f(0x241)]=_0xe9fdd8,_0x2a74f7[_0x47957f(0x26a)][_0x47957f(0x2a3)]=typeof _0x4d1d3a==_0x47957f(0x2b8)?_0x4d1d3a:_0x563b52,_0x1cc530[_0x47957f(0x26d)](_0x39586c[_0x47957f(0x1d8)](_0x5192a9,_0x1e553d,_0x4d1d3a,_0x2a74f7,_0x422dbb)),_0x2a74f7[_0x47957f(0x26a)][_0x47957f(0x241)]=_0x223cc4,_0x2a74f7[_0x47957f(0x26a)][_0x47957f(0x2a3)]=_0x3fb9a3;};}[_0x180451(0x2bc)](_0x2a49f0,_0x4b8dbf,_0x1d2fd5,_0x58bd0d,_0x41af09,_0x5dff4a,_0x5f489a){var _0x1eea3b=_0x180451,_0xba7c5c=this;return _0x4b8dbf[_0x1eea3b(0x26e)+_0x41af09[_0x1eea3b(0x295)]()]=!0x0,function(_0x1807cc){var _0x270e30=_0x1eea3b,_0x24a944=_0x5dff4a[_0x270e30(0x26a)][_0x270e30(0x204)],_0x56893d=_0x5dff4a['node'][_0x270e30(0x2a3)],_0x1daae8=_0x5dff4a[_0x270e30(0x26a)][_0x270e30(0x241)];_0x5dff4a[_0x270e30(0x26a)]['parent']=_0x24a944,_0x5dff4a['node'][_0x270e30(0x2a3)]=_0x1807cc,_0x2a49f0[_0x270e30(0x26d)](_0xba7c5c[_0x270e30(0x1d8)](_0x1d2fd5,_0x58bd0d,_0x41af09,_0x5dff4a,_0x5f489a)),_0x5dff4a['node']['parent']=_0x1daae8,_0x5dff4a[_0x270e30(0x26a)]['index']=_0x56893d;};}['_property'](_0x276003,_0x1f8737,_0x49e34d,_0x101345,_0x51175f){var _0x455833=_0x180451,_0x267223=this;_0x51175f||(_0x51175f=function(_0x7bdc38,_0x5c12a2){return _0x7bdc38[_0x5c12a2];});var _0x233616=_0x49e34d['toString'](),_0xaeaac=_0x101345[_0x455833(0x28e)]||{},_0x385004=_0x101345[_0x455833(0x1f4)],_0x45d808=_0x101345[_0x455833(0x1d6)];try{var _0x318d08=this[_0x455833(0x1d9)](_0x276003),_0x22e8f5=_0x233616;_0x318d08&&_0x22e8f5[0x0]==='\\x27'&&(_0x22e8f5=_0x22e8f5['substr'](0x1,_0x22e8f5['length']-0x2));var _0x58d155=_0x101345[_0x455833(0x28e)]=_0xaeaac[_0x455833(0x26e)+_0x22e8f5];_0x58d155&&(_0x101345[_0x455833(0x1f4)]=_0x101345[_0x455833(0x1f4)]+0x1),_0x101345[_0x455833(0x1d6)]=!!_0x58d155;var _0x1fd496=typeof _0x49e34d==_0x455833(0x246),_0x2677bb={'name':_0x1fd496||_0x318d08?_0x233616:this['_propertyName'](_0x233616)};if(_0x1fd496&&(_0x2677bb[_0x455833(0x246)]=!0x0),!(_0x1f8737===_0x455833(0x1dd)||_0x1f8737===_0x455833(0x203))){var _0x4c135a=this[_0x455833(0x24d)](_0x276003,_0x49e34d);if(_0x4c135a&&(_0x4c135a[_0x455833(0x2a9)]&&(_0x2677bb[_0x455833(0x214)]=!0x0),_0x4c135a['get']&&!_0x58d155&&!_0x101345[_0x455833(0x1f6)]))return _0x2677bb[_0x455833(0x297)]=!0x0,this[_0x455833(0x250)](_0x2677bb,_0x101345),_0x2677bb;}var _0x5d3e80;try{_0x5d3e80=_0x51175f(_0x276003,_0x49e34d);}catch(_0x41290a){return _0x2677bb={'name':_0x233616,'type':_0x455833(0x2be),'error':_0x41290a[_0x455833(0x1fa)]},this[_0x455833(0x250)](_0x2677bb,_0x101345),_0x2677bb;}var _0x28231e=this[_0x455833(0x221)](_0x5d3e80),_0x140e0a=this['_isPrimitiveType'](_0x28231e);if(_0x2677bb[_0x455833(0x211)]=_0x28231e,_0x140e0a)this['_processTreeNodeResult'](_0x2677bb,_0x101345,_0x5d3e80,function(){var _0x521bfa=_0x455833;_0x2677bb[_0x521bfa(0x25f)]=_0x5d3e80['valueOf'](),!_0x58d155&&_0x267223[_0x521bfa(0x27b)](_0x28231e,_0x2677bb,_0x101345,{});});else{var _0x572e8c=_0x101345[_0x455833(0x244)]&&_0x101345[_0x455833(0x238)]<_0x101345[_0x455833(0x206)]&&_0x101345[_0x455833(0x285)][_0x455833(0x213)](_0x5d3e80)<0x0&&_0x28231e!=='function'&&_0x101345[_0x455833(0x22f)]<_0x101345[_0x455833(0x278)];_0x572e8c||_0x101345['level']<_0x385004||_0x58d155?(this[_0x455833(0x25c)](_0x2677bb,_0x5d3e80,_0x101345,_0x58d155||{}),this['_additionalMetadata'](_0x5d3e80,_0x2677bb)):this['_processTreeNodeResult'](_0x2677bb,_0x101345,_0x5d3e80,function(){var _0x3a1685=_0x455833;_0x28231e===_0x3a1685(0x268)||_0x28231e===_0x3a1685(0x23b)||(delete _0x2677bb[_0x3a1685(0x25f)],_0x2677bb['capped']=!0x0);});}return _0x2677bb;}finally{_0x101345[_0x455833(0x28e)]=_0xaeaac,_0x101345[_0x455833(0x1f4)]=_0x385004,_0x101345[_0x455833(0x1d6)]=_0x45d808;}}['_capIfString'](_0x5b85eb,_0x424837,_0x1f7521,_0x1efc44){var _0x2aa7bd=_0x180451,_0x1b31cf=_0x1efc44[_0x2aa7bd(0x284)]||_0x1f7521[_0x2aa7bd(0x284)];if((_0x5b85eb===_0x2aa7bd(0x1f3)||_0x5b85eb===_0x2aa7bd(0x22d))&&_0x424837[_0x2aa7bd(0x25f)]){let _0x3d9499=_0x424837['value']['length'];_0x1f7521[_0x2aa7bd(0x23d)]+=_0x3d9499,_0x1f7521[_0x2aa7bd(0x23d)]>_0x1f7521[_0x2aa7bd(0x236)]?(_0x424837[_0x2aa7bd(0x212)]='',delete _0x424837[_0x2aa7bd(0x25f)]):_0x3d9499>_0x1b31cf&&(_0x424837[_0x2aa7bd(0x212)]=_0x424837['value'][_0x2aa7bd(0x231)](0x0,_0x1b31cf),delete _0x424837[_0x2aa7bd(0x25f)]);}}[_0x180451(0x1d9)](_0x1ab4a4){var _0x5b7e35=_0x180451;return!!(_0x1ab4a4&&_0x71abf3[_0x5b7e35(0x1da)]&&this['_objectToString'](_0x1ab4a4)==='[object\\x20Map]'&&_0x1ab4a4[_0x5b7e35(0x286)]);}[_0x180451(0x26f)](_0x39bc29){var _0x13a630=_0x180451;if(_0x39bc29[_0x13a630(0x1f8)](/^\\d+$/))return _0x39bc29;var _0x5647a6;try{_0x5647a6=JSON[_0x13a630(0x1de)](''+_0x39bc29);}catch{_0x5647a6='\\x22'+this[_0x13a630(0x21e)](_0x39bc29)+'\\x22';}return _0x5647a6[_0x13a630(0x1f8)](/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?_0x5647a6=_0x5647a6[_0x13a630(0x231)](0x1,_0x5647a6[_0x13a630(0x249)]-0x2):_0x5647a6=_0x5647a6['replace'](/'/g,'\\x5c\\x27')[_0x13a630(0x1df)](/\\\\"/g,'\\x22')['replace'](/(^"|"$)/g,'\\x27'),_0x5647a6;}[_0x180451(0x250)](_0x9e5e92,_0x3776df,_0x385b5e,_0x42f1f4){var _0x281d86=_0x180451;this[_0x281d86(0x1f9)](_0x9e5e92,_0x3776df),_0x42f1f4&&_0x42f1f4(),this[_0x281d86(0x20e)](_0x385b5e,_0x9e5e92),this[_0x281d86(0x1ee)](_0x9e5e92,_0x3776df);}[_0x180451(0x1f9)](_0x57947c,_0x32ba18){var _0x810884=_0x180451;this[_0x810884(0x223)](_0x57947c,_0x32ba18),this['_setNodeQueryPath'](_0x57947c,_0x32ba18),this[_0x810884(0x234)](_0x57947c,_0x32ba18),this[_0x810884(0x287)](_0x57947c,_0x32ba18);}['_setNodeId'](_0x361d93,_0xfbe422){}[_0x180451(0x23c)](_0x35e121,_0x11d6af){}[_0x180451(0x1e0)](_0x13fbcd,_0x31f663){}['_isUndefined'](_0x2138ea){var _0x358a1c=_0x180451;return _0x2138ea===this[_0x358a1c(0x1ff)];}[_0x180451(0x1ee)](_0x54b86f,_0x4a5807){var _0x5e821e=_0x180451;this[_0x5e821e(0x1e0)](_0x54b86f,_0x4a5807),this[_0x5e821e(0x2bd)](_0x54b86f),_0x4a5807['sortProps']&&this[_0x5e821e(0x237)](_0x54b86f),this['_addFunctionsNode'](_0x54b86f,_0x4a5807),this[_0x5e821e(0x291)](_0x54b86f,_0x4a5807),this[_0x5e821e(0x292)](_0x54b86f);}[_0x180451(0x20e)](_0x354cb9,_0x42ec05){var _0x5abe8a=_0x180451;let _0x1156b1;try{_0x71abf3[_0x5abe8a(0x225)]&&(_0x1156b1=_0x71abf3[_0x5abe8a(0x225)]['error'],_0x71abf3[_0x5abe8a(0x225)][_0x5abe8a(0x279)]=function(){}),_0x354cb9&&typeof _0x354cb9[_0x5abe8a(0x249)]==_0x5abe8a(0x2b8)&&(_0x42ec05[_0x5abe8a(0x249)]=_0x354cb9[_0x5abe8a(0x249)]);}catch{}finally{_0x1156b1&&(_0x71abf3[_0x5abe8a(0x225)]['error']=_0x1156b1);}if(_0x42ec05[_0x5abe8a(0x211)]===_0x5abe8a(0x2b8)||_0x42ec05[_0x5abe8a(0x211)]===_0x5abe8a(0x262)){if(isNaN(_0x42ec05[_0x5abe8a(0x25f)]))_0x42ec05['nan']=!0x0,delete _0x42ec05[_0x5abe8a(0x25f)];else switch(_0x42ec05[_0x5abe8a(0x25f)]){case Number[_0x5abe8a(0x29f)]:_0x42ec05[_0x5abe8a(0x251)]=!0x0,delete _0x42ec05[_0x5abe8a(0x25f)];break;case Number[_0x5abe8a(0x2b1)]:_0x42ec05[_0x5abe8a(0x266)]=!0x0,delete _0x42ec05[_0x5abe8a(0x25f)];break;case 0x0:this[_0x5abe8a(0x255)](_0x42ec05[_0x5abe8a(0x25f)])&&(_0x42ec05[_0x5abe8a(0x2a0)]=!0x0);break;}}else _0x42ec05[_0x5abe8a(0x211)]===_0x5abe8a(0x1e7)&&typeof _0x354cb9[_0x5abe8a(0x243)]=='string'&&_0x354cb9[_0x5abe8a(0x243)]&&_0x42ec05[_0x5abe8a(0x243)]&&_0x354cb9[_0x5abe8a(0x243)]!==_0x42ec05[_0x5abe8a(0x243)]&&(_0x42ec05['funcName']=_0x354cb9[_0x5abe8a(0x243)]);}[_0x180451(0x255)](_0x205c83){var _0x192c28=_0x180451;return 0x1/_0x205c83===Number[_0x192c28(0x2b1)];}[_0x180451(0x237)](_0x27a9e0){var _0x453d4c=_0x180451;!_0x27a9e0[_0x453d4c(0x229)]||!_0x27a9e0[_0x453d4c(0x229)][_0x453d4c(0x249)]||_0x27a9e0['type']===_0x453d4c(0x1dd)||_0x27a9e0[_0x453d4c(0x211)]===_0x453d4c(0x1da)||_0x27a9e0[_0x453d4c(0x211)]==='Set'||_0x27a9e0['props'][_0x453d4c(0x2af)](function(_0x431658,_0x3cf733){var _0x224e14=_0x453d4c,_0x38c485=_0x431658[_0x224e14(0x243)][_0x224e14(0x24a)](),_0x233895=_0x3cf733[_0x224e14(0x243)][_0x224e14(0x24a)]();return _0x38c485<_0x233895?-0x1:_0x38c485>_0x233895?0x1:0x0;});}[_0x180451(0x235)](_0x53f3e1,_0x41a494){var _0x4a1b32=_0x180451;if(!(_0x41a494[_0x4a1b32(0x1e9)]||!_0x53f3e1['props']||!_0x53f3e1['props']['length'])){for(var _0x1a79f8=[],_0x5d7ca9=[],_0x1ee238=0x0,_0x3d52e9=_0x53f3e1[_0x4a1b32(0x229)]['length'];_0x1ee238<_0x3d52e9;_0x1ee238++){var _0x94aa0=_0x53f3e1[_0x4a1b32(0x229)][_0x1ee238];_0x94aa0[_0x4a1b32(0x211)]==='function'?_0x1a79f8['push'](_0x94aa0):_0x5d7ca9[_0x4a1b32(0x26d)](_0x94aa0);}if(!(!_0x5d7ca9[_0x4a1b32(0x249)]||_0x1a79f8[_0x4a1b32(0x249)]<=0x1)){_0x53f3e1[_0x4a1b32(0x229)]=_0x5d7ca9;var _0x48e6ae={'functionsNode':!0x0,'props':_0x1a79f8};this[_0x4a1b32(0x223)](_0x48e6ae,_0x41a494),this[_0x4a1b32(0x1e0)](_0x48e6ae,_0x41a494),this[_0x4a1b32(0x2bd)](_0x48e6ae),this['_setNodePermissions'](_0x48e6ae,_0x41a494),_0x48e6ae['id']+='\\x20f',_0x53f3e1[_0x4a1b32(0x229)]['unshift'](_0x48e6ae);}}}[_0x180451(0x291)](_0x5a4de4,_0x378c61){}['_setNodeExpandableState'](_0x53fb3c){}[_0x180451(0x23f)](_0x2c2342){var _0x3708d6=_0x180451;return Array[_0x3708d6(0x299)](_0x2c2342)||typeof _0x2c2342==_0x3708d6(0x2b3)&&this[_0x3708d6(0x21e)](_0x2c2342)==='[object\\x20Array]';}[_0x180451(0x287)](_0x4b676a,_0x45baff){}[_0x180451(0x292)](_0x17a0e1){var _0x3ccdf0=_0x180451;delete _0x17a0e1['_hasSymbolPropertyOnItsPath'],delete _0x17a0e1[_0x3ccdf0(0x265)],delete _0x17a0e1[_0x3ccdf0(0x2ad)];}[_0x180451(0x234)](_0x1a4445,_0x35b488){}}let _0xe8b592=new _0x4370cf(),_0x4c5306={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x3b5b43={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x4ad045(_0x44176d,_0x17d852,_0x1032e5,_0x58f488,_0x566c9b,_0x2e1a7d){var _0x3eae3c=_0x180451;let _0x20c0b6,_0x58836e;try{_0x58836e=_0x12449d(),_0x20c0b6=_0x1fac2a[_0x17d852],!_0x20c0b6||_0x58836e-_0x20c0b6['ts']>0x1f4&&_0x20c0b6[_0x3eae3c(0x282)]&&_0x20c0b6[_0x3eae3c(0x22c)]/_0x20c0b6[_0x3eae3c(0x282)]<0x64?(_0x1fac2a[_0x17d852]=_0x20c0b6={'count':0x0,'time':0x0,'ts':_0x58836e},_0x1fac2a[_0x3eae3c(0x2a2)]={}):_0x58836e-_0x1fac2a[_0x3eae3c(0x2a2)]['ts']>0x32&&_0x1fac2a['hits'][_0x3eae3c(0x282)]&&_0x1fac2a[_0x3eae3c(0x2a2)][_0x3eae3c(0x22c)]/_0x1fac2a['hits'][_0x3eae3c(0x282)]<0x64&&(_0x1fac2a[_0x3eae3c(0x2a2)]={});let _0x407495=[],_0x207013=_0x20c0b6[_0x3eae3c(0x218)]||_0x1fac2a[_0x3eae3c(0x2a2)]['reduceLimits']?_0x3b5b43:_0x4c5306,_0x576857=_0xa82e75=>{var _0x387aa2=_0x3eae3c;let _0x4a3f6d={};return _0x4a3f6d[_0x387aa2(0x229)]=_0xa82e75[_0x387aa2(0x229)],_0x4a3f6d[_0x387aa2(0x1fb)]=_0xa82e75[_0x387aa2(0x1fb)],_0x4a3f6d[_0x387aa2(0x284)]=_0xa82e75[_0x387aa2(0x284)],_0x4a3f6d[_0x387aa2(0x236)]=_0xa82e75[_0x387aa2(0x236)],_0x4a3f6d['autoExpandLimit']=_0xa82e75[_0x387aa2(0x278)],_0x4a3f6d[_0x387aa2(0x206)]=_0xa82e75['autoExpandMaxDepth'],_0x4a3f6d['sortProps']=!0x1,_0x4a3f6d[_0x387aa2(0x1e9)]=!_0x5ecfe2,_0x4a3f6d[_0x387aa2(0x1f4)]=0x1,_0x4a3f6d[_0x387aa2(0x238)]=0x0,_0x4a3f6d[_0x387aa2(0x1f5)]='root_exp_id',_0x4a3f6d[_0x387aa2(0x2a7)]=_0x387aa2(0x1d5),_0x4a3f6d[_0x387aa2(0x244)]=!0x0,_0x4a3f6d['autoExpandPreviousObjects']=[],_0x4a3f6d[_0x387aa2(0x22f)]=0x0,_0x4a3f6d['resolveGetters']=!0x0,_0x4a3f6d['allStrLength']=0x0,_0x4a3f6d[_0x387aa2(0x26a)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x4a3f6d;};for(var _0xae1718=0x0;_0xae1718<_0x566c9b[_0x3eae3c(0x249)];_0xae1718++)_0x407495[_0x3eae3c(0x26d)](_0xe8b592[_0x3eae3c(0x25c)]({'timeNode':_0x44176d==='time'||void 0x0},_0x566c9b[_0xae1718],_0x576857(_0x207013),{}));if(_0x44176d===_0x3eae3c(0x1fd)){let _0x48ed5b=Error[_0x3eae3c(0x21b)];try{Error[_0x3eae3c(0x21b)]=0x1/0x0,_0x407495['push'](_0xe8b592[_0x3eae3c(0x25c)]({'stackNode':!0x0},new Error()['stack'],_0x576857(_0x207013),{'strLength':0x1/0x0}));}finally{Error[_0x3eae3c(0x21b)]=_0x48ed5b;}}return{'method':_0x3eae3c(0x1e8),'version':_0x48a8c3,'args':[{'ts':_0x1032e5,'session':_0x58f488,'args':_0x407495,'id':_0x17d852,'context':_0x2e1a7d}]};}catch(_0x7448a9){return{'method':'log','version':_0x48a8c3,'args':[{'ts':_0x1032e5,'session':_0x58f488,'args':[{'type':'unknown','error':_0x7448a9&&_0x7448a9['message']}],'id':_0x17d852,'context':_0x2e1a7d}]};}finally{try{if(_0x20c0b6&&_0x58836e){let _0x10571a=_0x12449d();_0x20c0b6[_0x3eae3c(0x282)]++,_0x20c0b6[_0x3eae3c(0x22c)]+=_0x423390(_0x58836e,_0x10571a),_0x20c0b6['ts']=_0x10571a,_0x1fac2a['hits'][_0x3eae3c(0x282)]++,_0x1fac2a['hits']['time']+=_0x423390(_0x58836e,_0x10571a),_0x1fac2a[_0x3eae3c(0x2a2)]['ts']=_0x10571a,(_0x20c0b6[_0x3eae3c(0x282)]>0x32||_0x20c0b6['time']>0x64)&&(_0x20c0b6[_0x3eae3c(0x218)]=!0x0),(_0x1fac2a[_0x3eae3c(0x2a2)]['count']>0x3e8||_0x1fac2a[_0x3eae3c(0x2a2)][_0x3eae3c(0x22c)]>0x12c)&&(_0x1fac2a[_0x3eae3c(0x2a2)][_0x3eae3c(0x218)]=!0x0);}}catch{}}}return _0x4ad045;}function _0x42d0(_0x21bc93,_0x3055e6){var _0x287de3=_0x287d();return _0x42d0=function(_0x42d071,_0x5b5660){_0x42d071=_0x42d071-0x1d5;var _0xf68319=_0x287de3[_0x42d071];return _0xf68319;},_0x42d0(_0x21bc93,_0x3055e6);}((_0x56b8af,_0x37299b,_0x300dd9,_0x28edb1,_0x164663,_0x23b8f7,_0x241bfb,_0x368cff,_0x442aa1,_0x36f949,_0x1b9513)=>{var _0x50f5d4=_0x71a422;if(_0x56b8af[_0x50f5d4(0x298)])return _0x56b8af[_0x50f5d4(0x298)];if(!X(_0x56b8af,_0x368cff,_0x164663))return _0x56b8af[_0x50f5d4(0x298)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x56b8af[_0x50f5d4(0x298)];let _0x5a483d=b(_0x56b8af),_0x42d893=_0x5a483d[_0x50f5d4(0x26c)],_0x5245ac=_0x5a483d[_0x50f5d4(0x20d)],_0x7e4936=_0x5a483d[_0x50f5d4(0x28b)],_0x17c92d={'hits':{},'ts':{}},_0x5ed942=H(_0x56b8af,_0x442aa1,_0x17c92d,_0x23b8f7),_0x2cd489=_0x5918fc=>{_0x17c92d['ts'][_0x5918fc]=_0x5245ac();},_0x3ae26a=(_0x2174e4,_0x1eae29)=>{var _0x41ba2d=_0x50f5d4;let _0x2adbcd=_0x17c92d['ts'][_0x1eae29];if(delete _0x17c92d['ts'][_0x1eae29],_0x2adbcd){let _0xbd7cd7=_0x42d893(_0x2adbcd,_0x5245ac());_0x26c7e9(_0x5ed942(_0x41ba2d(0x22c),_0x2174e4,_0x7e4936(),_0x2bc6a2,[_0xbd7cd7],_0x1eae29));}},_0x269384=_0x2d7fb6=>(_0x164663==='next.js'&&_0x56b8af[_0x50f5d4(0x20a)]&&_0x2d7fb6?.[_0x50f5d4(0x22b)]?.['length']&&(_0x2d7fb6[_0x50f5d4(0x22b)][0x0][_0x50f5d4(0x20a)]=_0x56b8af['origin']),_0x2d7fb6);_0x56b8af[_0x50f5d4(0x298)]={'consoleLog':(_0x343f40,_0x1fe2cd)=>{var _0x519be7=_0x50f5d4;_0x56b8af[_0x519be7(0x225)][_0x519be7(0x1e8)]['name']!==_0x519be7(0x245)&&_0x26c7e9(_0x5ed942(_0x519be7(0x1e8),_0x343f40,_0x7e4936(),_0x2bc6a2,_0x1fe2cd));},'consoleTrace':(_0x57c878,_0x1c82f7)=>{var _0x1672e5=_0x50f5d4;_0x56b8af[_0x1672e5(0x225)]['log']['name']!==_0x1672e5(0x27f)&&_0x26c7e9(_0x269384(_0x5ed942(_0x1672e5(0x1fd),_0x57c878,_0x7e4936(),_0x2bc6a2,_0x1c82f7)));},'consoleTime':_0x9aa6c5=>{_0x2cd489(_0x9aa6c5);},'consoleTimeEnd':(_0x4f6d42,_0x10d4ed)=>{_0x3ae26a(_0x10d4ed,_0x4f6d42);},'autoLog':(_0x5ca931,_0x12554a)=>{_0x26c7e9(_0x5ed942('log',_0x12554a,_0x7e4936(),_0x2bc6a2,[_0x5ca931]));},'autoLogMany':(_0x30042d,_0x907286)=>{_0x26c7e9(_0x5ed942('log',_0x30042d,_0x7e4936(),_0x2bc6a2,_0x907286));},'autoTrace':(_0x3e89f1,_0x431b53)=>{var _0x50db82=_0x50f5d4;_0x26c7e9(_0x269384(_0x5ed942(_0x50db82(0x1fd),_0x431b53,_0x7e4936(),_0x2bc6a2,[_0x3e89f1])));},'autoTraceMany':(_0x39f295,_0x304e64)=>{var _0x4c63a3=_0x50f5d4;_0x26c7e9(_0x269384(_0x5ed942(_0x4c63a3(0x1fd),_0x39f295,_0x7e4936(),_0x2bc6a2,_0x304e64)));},'autoTime':(_0x5bc97b,_0x1eca40,_0x26c2ad)=>{_0x2cd489(_0x26c2ad);},'autoTimeEnd':(_0x3c73d1,_0x2ac6e7,_0x22edcf)=>{_0x3ae26a(_0x2ac6e7,_0x22edcf);},'coverage':_0x4ba328=>{var _0x21d466=_0x50f5d4;_0x26c7e9({'method':_0x21d466(0x29b),'version':_0x23b8f7,'args':[{'id':_0x4ba328}]});}};let _0x26c7e9=q(_0x56b8af,_0x37299b,_0x300dd9,_0x28edb1,_0x164663,_0x36f949,_0x1b9513),_0x2bc6a2=_0x56b8af[_0x50f5d4(0x24f)];return _0x56b8af[_0x50f5d4(0x298)];})(globalThis,_0x71a422(0x25b),_0x71a422(0x239),_0x71a422(0x259),_0x71a422(0x1d7),_0x71a422(0x293),'1715538041661',_0x71a422(0x258),'',_0x71a422(0x217),_0x71a422(0x290));`);
  } catch (e) {
  }
}
function oo_oo(i, ...v) {
  try {
    oo_cm().consoleLog(i, v);
  } catch (e) {
  }
  return v;
}
const entryWorker = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$m = Object.getOwnPropertyNames;
var __commonJS$m = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$m(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$m = __commonJS$m({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$m = require_worker_runtime$m();
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$m
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$l = Object.getOwnPropertyNames;
var __commonJS$l = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$l(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$l = __commonJS$l({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$l = require_worker_runtime$l();
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$l
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$k = Object.getOwnPropertyNames;
var __commonJS$k = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$k(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$k = __commonJS$k({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$k = require_worker_runtime$k();
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$k
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$j = Object.getOwnPropertyNames;
var __commonJS$j = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$j(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$j = __commonJS$j({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$j = require_worker_runtime$j();
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$j
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$i = Object.getOwnPropertyNames;
var __commonJS$i = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$i(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$i = __commonJS$i({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$i = require_worker_runtime$i();
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$i
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$h = Object.getOwnPropertyNames;
var __commonJS$h = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$h(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$h = __commonJS$h({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$h = require_worker_runtime$h();
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$h
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$g = Object.getOwnPropertyNames;
var __commonJS$g = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$g(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$g = __commonJS$g({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$g = require_worker_runtime$g();
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$g
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$f = Object.getOwnPropertyNames;
var __commonJS$f = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$f(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$f = __commonJS$f({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$f = require_worker_runtime$f();
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$f
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$e = Object.getOwnPropertyNames;
var __commonJS$e = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$e(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$e = __commonJS$e({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$e = require_worker_runtime$e();
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$e
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$d = Object.getOwnPropertyNames;
var __commonJS$d = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$d(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$d = __commonJS$d({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$d = require_worker_runtime$d();
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$d
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$c = Object.getOwnPropertyNames;
var __commonJS$c = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$c(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$c = __commonJS$c({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$c = require_worker_runtime$c();
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$c
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$b = Object.getOwnPropertyNames;
var __commonJS$b = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$b(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$b = __commonJS$b({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$b = require_worker_runtime$b();
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$b
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$a = Object.getOwnPropertyNames;
var __commonJS$a = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$a(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$a = __commonJS$a({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$a = require_worker_runtime$a();
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$a
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$9 = Object.getOwnPropertyNames;
var __commonJS$9 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$9(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$9 = __commonJS$9({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$9 = require_worker_runtime$9();
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$9
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$8 = Object.getOwnPropertyNames;
var __commonJS$8 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$8(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$8 = __commonJS$8({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$8 = require_worker_runtime$8();
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$8
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$7 = Object.getOwnPropertyNames;
var __commonJS$7 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$7(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$7 = __commonJS$7({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$7 = require_worker_runtime$7();
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$7
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$6 = Object.getOwnPropertyNames;
var __commonJS$6 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$6(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$6 = __commonJS$6({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$6 = require_worker_runtime$6();
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$6
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$5 = Object.getOwnPropertyNames;
var __commonJS$5 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$5(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$5 = __commonJS$5({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$5 = require_worker_runtime$5();
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$5
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$4 = Object.getOwnPropertyNames;
var __commonJS$4 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$4(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$4 = __commonJS$4({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$4 = require_worker_runtime$4();
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$4
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$3 = Object.getOwnPropertyNames;
var __commonJS$3 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$3(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$3 = __commonJS$3({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$3 = require_worker_runtime$3();
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$3
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$2 = Object.getOwnPropertyNames;
var __commonJS$2 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$2 = __commonJS$2({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$2 = require_worker_runtime$2();
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$2
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames$1 = Object.getOwnPropertyNames;
var __commonJS$1 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames$1(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime$1 = __commonJS$1({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default$1 = require_worker_runtime$1();
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default$1
}, Symbol.toStringTag, { value: "Module" }));
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_worker_runtime = __commonJS({
  "@remix-pwa/worker-runtime"(exports, module) {
    module.exports = {};
  }
});
var worker_runtime_default = require_worker_runtime();
const route22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: worker_runtime_default
}, Symbol.toStringTag, { value: "Module" }));
const assets = [
  "/browserconfig.xml",
  "/entry.worker.js",
  "/logo.jpg",
  "/oops.html",
  "/worker.js",
  "/icons/OrangeSlice2.svg",
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png",
  "/icons/apple-touch-icon.png",
  "/icons/favicon-16x16.png",
  "/icons/favicon-32x32.png",
  "/icons/mstile-150x150.png",
  "/icons/safari-pinned-tab.svg",
  "/splash_screens/10.2__iPad_landscape.png",
  "/splash_screens/10.2__iPad_portrait.png",
  "/splash_screens/10.5__iPad_Air_landscape.png",
  "/splash_screens/10.5__iPad_Air_portrait.png",
  "/splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png",
  "/splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png",
  "/splash_screens/12.9__iPad_Pro_landscape.png",
  "/splash_screens/12.9__iPad_Pro_portrait.png",
  "/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png",
  "/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",
  "/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png",
  "/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",
  "/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png",
  "/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",
  "/splash_screens/iPhone_11__iPhone_XR_landscape.png",
  "/splash_screens/iPhone_11__iPhone_XR_portrait.png",
  "/splash_screens/iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png",
  "/splash_screens/iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",
  "/splash_screens/iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png",
  "/splash_screens/iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",
  "/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png",
  "/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",
  "/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png",
  "/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",
  "/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png",
  "/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",
  "/splash_screens/icon.png",
  "/fonts/hubot-sans/Hubot-Sans.woff",
  "/fonts/hubot-sans/Hubot-Sans.woff2",
  "/fonts/hubot-sans/LICENSE.txt",
  "/fonts/mona-sans/LICENSE.txt",
  "/fonts/mona-sans/Mona-Sans.woff",
  "/fonts/mona-sans/Mona-Sans.woff2",
  "/icons/android/android-launchericon-144-144.png",
  "/icons/android/android-launchericon-192-192.png",
  "/icons/android/android-launchericon-48-48.png",
  "/icons/android/android-launchericon-512-512.png",
  "/icons/android/android-launchericon-72-72.png",
  "/icons/android/android-launchericon-96-96.png",
  "/icons/ios/100.png",
  "/icons/ios/1024.png",
  "/icons/ios/114.png",
  "/icons/ios/120.png",
  "/icons/ios/128.png",
  "/icons/ios/144.png",
  "/icons/ios/152.png",
  "/icons/ios/16.png",
  "/icons/ios/167.png",
  "/icons/ios/180.png",
  "/icons/ios/192.png",
  "/icons/ios/20.png",
  "/icons/ios/256.png",
  "/icons/ios/29.png",
  "/icons/ios/32.png",
  "/icons/ios/40.png",
  "/icons/ios/50.png",
  "/icons/ios/512.png",
  "/icons/ios/57.png",
  "/icons/ios/58.png",
  "/icons/ios/60.png",
  "/icons/ios/64.png",
  "/icons/ios/72.png",
  "/icons/ios/76.png",
  "/icons/ios/80.png",
  "/icons/ios/87.png",
  "/icons/windows11/LargeTile.scale-100.png",
  "/icons/windows11/LargeTile.scale-125.png",
  "/icons/windows11/LargeTile.scale-150.png",
  "/icons/windows11/LargeTile.scale-200.png",
  "/icons/windows11/LargeTile.scale-400.png",
  "/icons/windows11/SmallTile.scale-100.png",
  "/icons/windows11/SmallTile.scale-125.png",
  "/icons/windows11/SmallTile.scale-150.png",
  "/icons/windows11/SmallTile.scale-200.png",
  "/icons/windows11/SmallTile.scale-400.png",
  "/icons/windows11/SplashScreen.scale-100.png",
  "/icons/windows11/SplashScreen.scale-125.png",
  "/icons/windows11/SplashScreen.scale-150.png",
  "/icons/windows11/SplashScreen.scale-200.png",
  "/icons/windows11/SplashScreen.scale-400.png",
  "/icons/windows11/Square150x150Logo.scale-100.png",
  "/icons/windows11/Square150x150Logo.scale-125.png",
  "/icons/windows11/Square150x150Logo.scale-150.png",
  "/icons/windows11/Square150x150Logo.scale-200.png",
  "/icons/windows11/Square150x150Logo.scale-400.png",
  "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",
  "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",
  "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",
  "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",
  "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",
  "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",
  "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",
  "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",
  "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",
  "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",
  "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",
  "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",
  "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",
  "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",
  "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",
  "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",
  "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",
  "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",
  "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",
  "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",
  "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",
  "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",
  "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",
  "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",
  "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",
  "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",
  "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",
  "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",
  "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",
  "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",
  "/icons/windows11/Square44x44Logo.scale-100.png",
  "/icons/windows11/Square44x44Logo.scale-125.png",
  "/icons/windows11/Square44x44Logo.scale-150.png",
  "/icons/windows11/Square44x44Logo.scale-200.png",
  "/icons/windows11/Square44x44Logo.scale-400.png",
  "/icons/windows11/Square44x44Logo.targetsize-16.png",
  "/icons/windows11/Square44x44Logo.targetsize-20.png",
  "/icons/windows11/Square44x44Logo.targetsize-24.png",
  "/icons/windows11/Square44x44Logo.targetsize-256.png",
  "/icons/windows11/Square44x44Logo.targetsize-30.png",
  "/icons/windows11/Square44x44Logo.targetsize-32.png",
  "/icons/windows11/Square44x44Logo.targetsize-36.png",
  "/icons/windows11/Square44x44Logo.targetsize-40.png",
  "/icons/windows11/Square44x44Logo.targetsize-44.png",
  "/icons/windows11/Square44x44Logo.targetsize-48.png",
  "/icons/windows11/Square44x44Logo.targetsize-60.png",
  "/icons/windows11/Square44x44Logo.targetsize-64.png",
  "/icons/windows11/Square44x44Logo.targetsize-72.png",
  "/icons/windows11/Square44x44Logo.targetsize-80.png",
  "/icons/windows11/Square44x44Logo.targetsize-96.png",
  "/icons/windows11/StoreLogo.scale-100.png",
  "/icons/windows11/StoreLogo.scale-125.png",
  "/icons/windows11/StoreLogo.scale-150.png",
  "/icons/windows11/StoreLogo.scale-200.png",
  "/icons/windows11/StoreLogo.scale-400.png",
  "/icons/windows11/Wide310x150Logo.scale-100.png",
  "/icons/windows11/Wide310x150Logo.scale-125.png",
  "/icons/windows11/Wide310x150Logo.scale-150.png",
  "/icons/windows11/Wide310x150Logo.scale-200.png",
  "/icons/windows11/Wide310x150Logo.scale-400.png"
];
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: false,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route0
  },
  "routes/resource.manifest[.webmanifest]": {
    id: "routes/resource.manifest[.webmanifest]",
    parentId: "root",
    path: "resource/manifest.webmanifest",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: false,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route1
  },
  "routes/resource.cloudinary-upload": {
    id: "routes/resource.cloudinary-upload",
    parentId: "root",
    path: "resource/cloudinary-upload",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: true,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route2
  },
  "routes/manifest[.webmanifest]": {
    id: "routes/manifest[.webmanifest]",
    parentId: "root",
    path: "manifest.webmanifest",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: false,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route3
  },
  "routes/resource.user-options": {
    id: "routes/resource.user-options",
    parentId: "root",
    path: "resource/user-options",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: true,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route4
  },
  "routes/recipes.imported.$id": {
    id: "routes/recipes.imported.$id",
    parentId: "root",
    path: "recipes/imported/:id",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: false,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route5
  },
  "routes/recipes.created.$id": {
    id: "routes/recipes.created.$id",
    parentId: "root",
    path: "recipes/created/:id",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: false,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route6
  },
  "routes/resource.set-theme": {
    id: "routes/resource.set-theme",
    parentId: "root",
    path: "resource/set-theme",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: true,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route7
  },
  "routes/user.created.index": {
    id: "routes/user.created.index",
    parentId: "routes/user.created",
    path: "index",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: false,
    hasAction: false,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route8
  },
  "routes/resource.imported": {
    id: "routes/resource.imported",
    parentId: "root",
    path: "resource/imported",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: true,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route9
  },
  "routes/recipes.favorite": {
    id: "routes/recipes.favorite",
    parentId: "root",
    path: "recipes/favorite",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: true,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route10
  },
  "routes/resource.weather": {
    id: "routes/resource.weather",
    parentId: "root",
    path: "resource/weather",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: false,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route11
  },
  "routes/user.created.new": {
    id: "routes/user.created.new",
    parentId: "routes/user.created",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: true,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route12
  },
  "routes/user.favorites": {
    id: "routes/user.favorites",
    parentId: "root",
    path: "user/favorites",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: false,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route13
  },
  "routes/user.imported": {
    id: "routes/user.imported",
    parentId: "root",
    path: "user/imported",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: true,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route14
  },
  "routes/user.settings": {
    id: "routes/user.settings",
    parentId: "root",
    path: "user/settings",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: false,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route15
  },
  "routes/_auth.logout": {
    id: "routes/_auth.logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: true,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route16
  },
  "routes/user.created": {
    id: "routes/user.created",
    parentId: "root",
    path: "user/created",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: false,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route17
  },
  "routes/_auth.login": {
    id: "routes/_auth.login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: true,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route18
  },
  "routes/healthcheck": {
    id: "routes/healthcheck",
    parentId: "root",
    path: "healthcheck",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: false,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route19
  },
  "routes/recipes.$id": {
    id: "routes/recipes.$id",
    parentId: "root",
    path: "recipes/:id",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: false,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route20
  },
  "routes/_auth.join": {
    id: "routes/_auth.join",
    parentId: "root",
    path: "join",
    index: void 0,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: true,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route21
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    hasLoader: true,
    hasAction: false,
    hasWorkerLoader: false,
    hasWorkerAction: false,
    module: route22
  }
};
const entry = { module: entryWorker };
/**
 * @remix-run/router v1.16.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
const PopStateEventType = "popstate";
function createMemoryHistory(options) {
  if (options === void 0) {
    options = {};
  }
  let {
    initialEntries = ["/"],
    initialIndex,
    v5Compat = false
  } = options;
  let entries;
  entries = initialEntries.map((entry2, index2) => createMemoryLocation(entry2, typeof entry2 === "string" ? null : entry2.state, index2 === 0 ? "default" : void 0));
  let index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
  let action = Action.Pop;
  let listener = null;
  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }
  function getCurrentLocation() {
    return entries[index];
  }
  function createMemoryLocation(to, state, key) {
    if (state === void 0) {
      state = null;
    }
    let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to));
    return location;
  }
  function createHref(to) {
    return typeof to === "string" ? to : createPath(to);
  }
  let history = {
    get index() {
      return index;
    },
    get action() {
      return action;
    },
    get location() {
      return getCurrentLocation();
    },
    createHref,
    createURL(to) {
      return new URL(createHref(to), "http://localhost");
    },
    encodeLocation(to) {
      let path = typeof to === "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },
    push(to, state) {
      action = Action.Push;
      let nextLocation = createMemoryLocation(to, state);
      index += 1;
      entries.splice(index, entries.length, nextLocation);
      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation,
          delta: 1
        });
      }
    },
    replace(to, state) {
      action = Action.Replace;
      let nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation;
      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation,
          delta: 0
        });
      }
    },
    go(delta) {
      action = Action.Pop;
      let nextIndex = clampIndex(index + delta);
      let nextLocation = entries[nextIndex];
      index = nextIndex;
      if (listener) {
        listener({
          action,
          location: nextLocation,
          delta
        });
      }
    },
    listen(fn) {
      listener = fn;
      return () => {
        listener = null;
      };
    }
  };
  return history;
}
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window2, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window2.location;
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
function createHashHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createHashLocation(window2, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window2.location.hash.substr(1));
    if (!pathname.startsWith("/") && !pathname.startsWith(".")) {
      pathname = "/" + pathname;
    }
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createHashHref(window2, to) {
    let base = window2.document.querySelector("base");
    let href = "";
    if (base && base.getAttribute("href")) {
      let url = window2.location.href;
      let hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href + "#" + (typeof to === "string" ? to : createPath(to));
  }
  function validateHashLocation(location, to) {
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
  }
  return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined")
      console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index
  };
}
function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }
  let location = _extends({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });
  return location;
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window: window2 = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window2.history;
  let action = Action.Pop;
  let listener = null;
  let index = getIndex();
  if (index == null) {
    index = 0;
    globalHistory.replaceState(_extends({}, globalHistory.state, {
      idx: index
    }), "");
  }
  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }
  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    index = getIndex() + 1;
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }
  function replace(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    index = getIndex();
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
    let href = typeof to === "string" ? to : createPath(to);
    href = href.replace(/ $/, "%20");
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace,
    go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
}
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
const immutableRouteKeys = /* @__PURE__ */ new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
function isIndexRoute(route) {
  return route.index === true;
}
function convertRoutesToDataRoutes(routes2, mapRouteProperties, parentPath, manifest) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  if (manifest === void 0) {
    manifest = {};
  }
  return routes2.map((route, index) => {
    let treePath = [...parentPath, index];
    let id = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(route.index !== true || !route.children, "Cannot specify children on an index route");
    invariant(!manifest[id], 'Found a route id collision on id "' + id + `".  Route id's must be globally unique within Data Router usages`);
    if (isIndexRoute(route)) {
      let indexRoute = _extends({}, route, mapRouteProperties(route), {
        id
      });
      manifest[id] = indexRoute;
      return indexRoute;
    } else {
      let pathOrLayoutRoute = _extends({}, route, mapRouteProperties(route), {
        id,
        children: void 0
      });
      manifest[id] = pathOrLayoutRoute;
      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties, treePath, manifest);
      }
      return pathOrLayoutRoute;
    }
  });
}
function matchRoutes(routes2, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes2);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(branches[i], decoded);
  }
  return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
  let {
    route,
    pathname,
    params
  } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}
function flattenRoutes(routes2, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = (route, index, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes2.forEach((route, index) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0)
    return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
}
const paramRe = /^:[\w-]+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = (s) => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname) {
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    if (!match)
      return null;
    Object.assign(matchedParams, match.params);
    let route = meta.route;
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function generatePath(originalPath, params) {
  if (params === void 0) {
    params = {};
  }
  let path = originalPath;
  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    warning(false, 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
    path = path.replace(/\*$/, "/*");
  }
  const prefix = path.startsWith("/") ? "/" : "";
  const stringify = (p) => p == null ? "" : typeof p === "string" ? p : String(p);
  const segments = path.split(/\/+/).map((segment, index, array) => {
    const isLastSegment = index === array.length - 1;
    if (isLastSegment && segment === "*") {
      const star = "*";
      return stringify(params[star]);
    }
    const keyMatch = segment.match(/^:([\w-]+)(\??)$/);
    if (keyMatch) {
      const [, key, optional] = keyMatch;
      let param = params[key];
      invariant(optional === "?" || param != null, 'Missing ":' + key + '" param');
      return stringify(param);
    }
    return segment.replace(/\?$/g, "");
  }).filter((segment) => !!segment);
  return prefix + segments.join("/");
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce((memo, _ref, index) => {
    let {
      paramName,
      isOptional
    } = _ref;
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    const value = captureGroups[index];
    if (isOptional && !value) {
      memo[paramName] = void 0;
    } else {
      memo[paramName] = (value || "").replace(/%2F/g, "/");
    }
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
    params.push({
      paramName,
      isOptional: isOptional != null
    });
    return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    params.push({
      paramName: "*"
    });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else
    ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1)
        segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function getResolveToMatches(matches, v7_relativeSplatPath) {
  let pathMatches = getPathContributingMatches(matches);
  if (v7_relativeSplatPath) {
    return pathMatches.map((match, idx) => idx === matches.length - 1 ? match.pathname : match.pathnameBase);
  }
  return pathMatches.map((match) => match.pathnameBase);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
function getToPathname(to) {
  return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? parsePath(to).pathname : to.pathname;
}
const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
const normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
const normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
const normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
const json$1 = function json(data, init) {
  if (init === void 0) {
    init = {};
  }
  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  let headers = new Headers(responseInit.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }
  return new Response(JSON.stringify(data), _extends({}, responseInit, {
    headers
  }));
};
class AbortedDeferredError extends Error {
}
class DeferredData {
  constructor(data, responseInit) {
    this.pendingKeysSet = /* @__PURE__ */ new Set();
    this.subscribers = /* @__PURE__ */ new Set();
    this.deferredKeys = [];
    invariant(data && typeof data === "object" && !Array.isArray(data), "defer() only accepts plain objects");
    let reject;
    this.abortPromise = new Promise((_, r) => reject = r);
    this.controller = new AbortController();
    let onAbort = () => reject(new AbortedDeferredError("Deferred data aborted"));
    this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", onAbort);
    this.controller.signal.addEventListener("abort", onAbort);
    this.data = Object.entries(data).reduce((acc, _ref2) => {
      let [key, value] = _ref2;
      return Object.assign(acc, {
        [key]: this.trackPromise(key, value)
      });
    }, {});
    if (this.done) {
      this.unlistenAbortSignal();
    }
    this.init = responseInit;
  }
  trackPromise(key, value) {
    if (!(value instanceof Promise)) {
      return value;
    }
    this.deferredKeys.push(key);
    this.pendingKeysSet.add(key);
    let promise = Promise.race([value, this.abortPromise]).then((data) => this.onSettle(promise, key, void 0, data), (error) => this.onSettle(promise, key, error));
    promise.catch(() => {
    });
    Object.defineProperty(promise, "_tracked", {
      get: () => true
    });
    return promise;
  }
  onSettle(promise, key, error, data) {
    if (this.controller.signal.aborted && error instanceof AbortedDeferredError) {
      this.unlistenAbortSignal();
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      return Promise.reject(error);
    }
    this.pendingKeysSet.delete(key);
    if (this.done) {
      this.unlistenAbortSignal();
    }
    if (error === void 0 && data === void 0) {
      let undefinedError = new Error('Deferred data for key "' + key + '" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.');
      Object.defineProperty(promise, "_error", {
        get: () => undefinedError
      });
      this.emit(false, key);
      return Promise.reject(undefinedError);
    }
    if (data === void 0) {
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      this.emit(false, key);
      return Promise.reject(error);
    }
    Object.defineProperty(promise, "_data", {
      get: () => data
    });
    this.emit(false, key);
    return data;
  }
  emit(aborted, settledKey) {
    this.subscribers.forEach((subscriber) => subscriber(aborted, settledKey));
  }
  subscribe(fn) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }
  cancel() {
    this.controller.abort();
    this.pendingKeysSet.forEach((v, k) => this.pendingKeysSet.delete(k));
    this.emit(true);
  }
  async resolveData(signal) {
    let aborted = false;
    if (!this.done) {
      let onAbort = () => this.cancel();
      signal.addEventListener("abort", onAbort);
      aborted = await new Promise((resolve) => {
        this.subscribe((aborted2) => {
          signal.removeEventListener("abort", onAbort);
          if (aborted2 || this.done) {
            resolve(aborted2);
          }
        });
      });
    }
    return aborted;
  }
  get done() {
    return this.pendingKeysSet.size === 0;
  }
  get unwrappedData() {
    invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds");
    return Object.entries(this.data).reduce((acc, _ref3) => {
      let [key, value] = _ref3;
      return Object.assign(acc, {
        [key]: unwrapTrackedPromise(value)
      });
    }, {});
  }
  get pendingKeys() {
    return Array.from(this.pendingKeysSet);
  }
}
function isTrackedPromise$1(value) {
  return value instanceof Promise && value._tracked === true;
}
function unwrapTrackedPromise(value) {
  if (!isTrackedPromise$1(value)) {
    return value;
  }
  if (value._error) {
    throw value._error;
  }
  return value._data;
}
const defer$1 = function defer(data, init) {
  if (init === void 0) {
    init = {};
  }
  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  return new DeferredData(data, responseInit);
};
const redirect$1 = function redirect(url, init) {
  if (init === void 0) {
    init = 302;
  }
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = {
      status: responseInit
    };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  let headers = new Headers(responseInit.headers);
  headers.set("Location", url);
  return new Response(null, _extends({}, responseInit, {
    headers
  }));
};
const redirectDocument$1 = (url, init) => {
  let response = redirect$1(url, init);
  response.headers.set("X-Remix-Reload-Document", "true");
  return response;
};
class ErrorResponseImpl {
  constructor(status, statusText, data, internal) {
    if (internal === void 0) {
      internal = false;
    }
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data instanceof Error) {
      this.data = data.toString();
      this.error = data;
    } else {
      this.data = data;
    }
  }
}
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
const validMutationMethodsArr = ["post", "put", "patch", "delete"];
const validMutationMethods = new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
const validRequestMethods = new Set(validRequestMethodsArr);
const redirectStatusCodes$1 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
const redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]);
const IDLE_NAVIGATION = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
const IDLE_FETCHER = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
const IDLE_BLOCKER = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
};
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const defaultMapRouteProperties = (route) => ({
  hasErrorBoundary: Boolean(route.hasErrorBoundary)
});
const TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
function createRouter(init) {
  const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : void 0;
  const isBrowser = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
  const isServer = !isBrowser;
  invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let mapRouteProperties;
  if (init.mapRouteProperties) {
    mapRouteProperties = init.mapRouteProperties;
  } else if (init.detectErrorBoundary) {
    let detectErrorBoundary = init.detectErrorBoundary;
    mapRouteProperties = (route) => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else {
    mapRouteProperties = defaultMapRouteProperties;
  }
  let manifest = {};
  let dataRoutes = convertRoutesToDataRoutes(init.routes, mapRouteProperties, void 0, manifest);
  let inFlightDataRoutes;
  let basename = init.basename || "/";
  let dataStrategyImpl = init.unstable_dataStrategy || defaultDataStrategy;
  let future = _extends({
    v7_fetcherPersist: false,
    v7_normalizeFormMethod: false,
    v7_partialHydration: false,
    v7_prependBasename: false,
    v7_relativeSplatPath: false,
    unstable_skipActionErrorRevalidation: false
  }, init.future);
  let unlistenHistory = null;
  let subscribers = /* @__PURE__ */ new Set();
  let savedScrollPositions = null;
  let getScrollRestorationKey = null;
  let getScrollPosition = null;
  let initialScrollRestored = init.hydrationData != null;
  let initialMatches = matchRoutes(dataRoutes, init.history.location, basename);
  let initialErrors = null;
  if (initialMatches == null) {
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    });
    let {
      matches,
      route
    } = getShortCircuitMatches(dataRoutes);
    initialMatches = matches;
    initialErrors = {
      [route.id]: error
    };
  }
  let initialized;
  let hasLazyRoutes = initialMatches.some((m) => m.route.lazy);
  let hasLoaders = initialMatches.some((m) => m.route.loader);
  if (hasLazyRoutes) {
    initialized = false;
  } else if (!hasLoaders) {
    initialized = true;
  } else if (future.v7_partialHydration) {
    let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
    let errors2 = init.hydrationData ? init.hydrationData.errors : null;
    let isRouteInitialized = (m) => {
      if (!m.route.loader) {
        return true;
      }
      if (typeof m.route.loader === "function" && m.route.loader.hydrate === true) {
        return false;
      }
      return loaderData && loaderData[m.route.id] !== void 0 || errors2 && errors2[m.route.id] !== void 0;
    };
    if (errors2) {
      let idx = initialMatches.findIndex((m) => errors2[m.route.id] !== void 0);
      initialized = initialMatches.slice(0, idx + 1).every(isRouteInitialized);
    } else {
      initialized = initialMatches.every(isRouteInitialized);
    }
  } else {
    initialized = init.hydrationData != null;
  }
  let router2;
  let state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: init.hydrationData != null ? false : null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  };
  let pendingAction = Action.Pop;
  let pendingPreventScrollReset = false;
  let pendingNavigationController;
  let pendingViewTransitionEnabled = false;
  let appliedViewTransitions = /* @__PURE__ */ new Map();
  let removePageHideEventListener = null;
  let isUninterruptedRevalidation = false;
  let isRevalidationRequired = false;
  let cancelledDeferredRoutes = [];
  let cancelledFetcherLoads = [];
  let fetchControllers = /* @__PURE__ */ new Map();
  let incrementingLoadId = 0;
  let pendingNavigationLoadId = -1;
  let fetchReloadIds = /* @__PURE__ */ new Map();
  let fetchRedirectIds = /* @__PURE__ */ new Set();
  let fetchLoadMatches = /* @__PURE__ */ new Map();
  let activeFetchers = /* @__PURE__ */ new Map();
  let deletedFetchers = /* @__PURE__ */ new Set();
  let activeDeferreds = /* @__PURE__ */ new Map();
  let blockerFunctions = /* @__PURE__ */ new Map();
  let ignoreNextHistoryUpdate = false;
  function initialize() {
    unlistenHistory = init.history.listen((_ref) => {
      let {
        action: historyAction,
        location,
        delta
      } = _ref;
      if (ignoreNextHistoryUpdate) {
        ignoreNextHistoryUpdate = false;
        return;
      }
      warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
      let blockerKey = shouldBlockNavigation({
        currentLocation: state.location,
        nextLocation: location,
        historyAction
      });
      if (blockerKey && delta != null) {
        ignoreNextHistoryUpdate = true;
        init.history.go(delta * -1);
        updateBlocker(blockerKey, {
          state: "blocked",
          location,
          proceed() {
            updateBlocker(blockerKey, {
              state: "proceeding",
              proceed: void 0,
              reset: void 0,
              location
            });
            init.history.go(delta);
          },
          reset() {
            let blockers = new Map(state.blockers);
            blockers.set(blockerKey, IDLE_BLOCKER);
            updateState({
              blockers
            });
          }
        });
        return;
      }
      return startNavigation(historyAction, location);
    });
    if (isBrowser) {
      restoreAppliedTransitions(routerWindow, appliedViewTransitions);
      let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
      routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
      removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
    }
    if (!state.initialized) {
      startNavigation(Action.Pop, state.location, {
        initialHydration: true
      });
    }
    return router2;
  }
  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }
    if (removePageHideEventListener) {
      removePageHideEventListener();
    }
    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach((_, key) => deleteFetcher(key));
    state.blockers.forEach((_, key) => deleteBlocker(key));
  }
  function subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  }
  function updateState(newState, opts) {
    if (opts === void 0) {
      opts = {};
    }
    state = _extends({}, state, newState);
    let completedFetchers = [];
    let deletedFetchersKeys = [];
    if (future.v7_fetcherPersist) {
      state.fetchers.forEach((fetcher, key) => {
        if (fetcher.state === "idle") {
          if (deletedFetchers.has(key)) {
            deletedFetchersKeys.push(key);
          } else {
            completedFetchers.push(key);
          }
        }
      });
    }
    [...subscribers].forEach((subscriber) => subscriber(state, {
      deletedFetchers: deletedFetchersKeys,
      unstable_viewTransitionOpts: opts.viewTransitionOpts,
      unstable_flushSync: opts.flushSync === true
    }));
    if (future.v7_fetcherPersist) {
      completedFetchers.forEach((key) => state.fetchers.delete(key));
      deletedFetchersKeys.forEach((key) => deleteFetcher(key));
    }
  }
  function completeNavigation(location, newState, _temp) {
    var _location$state, _location$state2;
    let {
      flushSync
    } = _temp === void 0 ? {} : _temp;
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location.state) == null ? void 0 : _location$state._isRedirect) !== true;
    let actionData;
    if (newState.actionData) {
      if (Object.keys(newState.actionData).length > 0) {
        actionData = newState.actionData;
      } else {
        actionData = null;
      }
    } else if (isActionReload) {
      actionData = state.actionData;
    } else {
      actionData = null;
    }
    let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData;
    let blockers = state.blockers;
    if (blockers.size > 0) {
      blockers = new Map(blockers);
      blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER));
    }
    let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location.state) == null ? void 0 : _location$state2._isRedirect) !== true;
    if (inFlightDataRoutes) {
      dataRoutes = inFlightDataRoutes;
      inFlightDataRoutes = void 0;
    }
    if (isUninterruptedRevalidation)
      ;
    else if (pendingAction === Action.Pop)
      ;
    else if (pendingAction === Action.Push) {
      init.history.push(location, location.state);
    } else if (pendingAction === Action.Replace) {
      init.history.replace(location, location.state);
    }
    let viewTransitionOpts;
    if (pendingAction === Action.Pop) {
      let priorPaths = appliedViewTransitions.get(state.location.pathname);
      if (priorPaths && priorPaths.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: state.location,
          nextLocation: location
        };
      } else if (appliedViewTransitions.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: location,
          nextLocation: state.location
        };
      }
    } else if (pendingViewTransitionEnabled) {
      let toPaths = appliedViewTransitions.get(state.location.pathname);
      if (toPaths) {
        toPaths.add(location.pathname);
      } else {
        toPaths = /* @__PURE__ */ new Set([location.pathname]);
        appliedViewTransitions.set(state.location.pathname, toPaths);
      }
      viewTransitionOpts = {
        currentLocation: state.location,
        nextLocation: location
      };
    }
    updateState(_extends({}, newState, {
      actionData,
      loaderData,
      historyAction: pendingAction,
      location,
      initialized: true,
      navigation: IDLE_NAVIGATION,
      revalidation: "idle",
      restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
      preventScrollReset,
      blockers
    }), {
      viewTransitionOpts,
      flushSync: flushSync === true
    });
    pendingAction = Action.Pop;
    pendingPreventScrollReset = false;
    pendingViewTransitionEnabled = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    cancelledDeferredRoutes = [];
    cancelledFetcherLoads = [];
  }
  async function navigate(to, opts) {
    if (typeof to === "number") {
      init.history.go(to);
      return;
    }
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, to, future.v7_relativeSplatPath, opts == null ? void 0 : opts.fromRouteId, opts == null ? void 0 : opts.relative);
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future.v7_normalizeFormMethod, false, normalizedPath, opts);
    let currentLocation = state.location;
    let nextLocation = createLocation(state.location, path, opts && opts.state);
    nextLocation = _extends({}, nextLocation, init.history.encodeLocation(nextLocation));
    let userReplace = opts && opts.replace != null ? opts.replace : void 0;
    let historyAction = Action.Push;
    if (userReplace === true) {
      historyAction = Action.Replace;
    } else if (userReplace === false)
      ;
    else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
      historyAction = Action.Replace;
    }
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0;
    let flushSync = (opts && opts.unstable_flushSync) === true;
    let blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey) {
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: nextLocation
          });
          navigate(to, opts);
        },
        reset() {
          let blockers = new Map(state.blockers);
          blockers.set(blockerKey, IDLE_BLOCKER);
          updateState({
            blockers
          });
        }
      });
      return;
    }
    return await startNavigation(historyAction, nextLocation, {
      submission,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace,
      enableViewTransition: opts && opts.unstable_viewTransition,
      flushSync
    });
  }
  function revalidate() {
    interruptActiveLoads();
    updateState({
      revalidation: "loading"
    });
    if (state.navigation.state === "submitting") {
      return;
    }
    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return;
    }
    startNavigation(pendingAction || state.historyAction, state.navigation.location, {
      overrideNavigation: state.navigation
    });
  }
  async function startNavigation(historyAction, location, opts) {
    pendingNavigationController && pendingNavigationController.abort();
    pendingNavigationController = null;
    pendingAction = historyAction;
    isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
    saveScrollPosition(state.location, state.matches);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let loadingNavigation = opts && opts.overrideNavigation;
    let matches = matchRoutes(routesToUse, location, basename);
    let flushSync = (opts && opts.flushSync) === true;
    if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      });
      let {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(routesToUse);
      cancelActiveDeferreds();
      completeNavigation(location, {
        matches: notFoundMatches,
        loaderData: {},
        errors: {
          [route.id]: error
        }
      }, {
        flushSync
      });
      return;
    }
    if (state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location, {
        matches
      }, {
        flushSync
      });
      return;
    }
    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission);
    let pendingActionResult;
    if (opts && opts.pendingError) {
      pendingActionResult = [findNearestBoundary(matches).route.id, {
        type: ResultType.error,
        error: opts.pendingError
      }];
    } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      let actionResult = await handleAction2(request, location, opts.submission, matches, {
        replace: opts.replace,
        flushSync
      });
      if (actionResult.shortCircuited) {
        return;
      }
      pendingActionResult = actionResult.pendingActionResult;
      loadingNavigation = getLoadingNavigation(location, opts.submission);
      flushSync = false;
      request = createClientSideRequest(init.history, request.url, request.signal);
    }
    let {
      shortCircuited,
      loaderData,
      errors: errors2
    } = await handleLoaders(request, location, matches, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, opts && opts.initialHydration === true, flushSync, pendingActionResult);
    if (shortCircuited) {
      return;
    }
    pendingNavigationController = null;
    completeNavigation(location, _extends({
      matches
    }, getActionDataForCommit(pendingActionResult), {
      loaderData,
      errors: errors2
    }));
  }
  async function handleAction2(request, location, submission, matches, opts) {
    if (opts === void 0) {
      opts = {};
    }
    interruptActiveLoads();
    let navigation = getSubmittingNavigation(location, submission);
    updateState({
      navigation
    }, {
      flushSync: opts.flushSync === true
    });
    let result;
    let actionMatch = getTargetMatch(matches, location);
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      result = {
        type: ResultType.error,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location.pathname,
          routeId: actionMatch.route.id
        })
      };
    } else {
      let results = await callDataStrategy("action", request, [actionMatch], matches);
      result = results[0];
      if (request.signal.aborted) {
        return {
          shortCircuited: true
        };
      }
    }
    if (isRedirectResult(result)) {
      let replace;
      if (opts && opts.replace != null) {
        replace = opts.replace;
      } else {
        let location2 = normalizeRedirectLocation(result.response.headers.get("Location"), new URL(request.url), basename);
        replace = location2 === state.location.pathname + state.location.search;
      }
      await startRedirectNavigation(request, result, {
        submission,
        replace
      });
      return {
        shortCircuited: true
      };
    }
    if (isDeferredResult(result)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      if ((opts && opts.replace) !== true) {
        pendingAction = Action.Push;
      }
      return {
        pendingActionResult: [boundaryMatch.route.id, result]
      };
    }
    return {
      pendingActionResult: [actionMatch.route.id, result]
    };
  }
  async function handleLoaders(request, location, matches, overrideNavigation, submission, fetcherSubmission, replace, initialHydration, flushSync, pendingActionResult) {
    let loadingNavigation = overrideNavigation || getLoadingNavigation(location, submission);
    let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location, future.v7_partialHydration && initialHydration === true, future.unstable_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult);
    cancelActiveDeferreds((routeId) => !(matches && matches.some((m) => m.route.id === routeId)) || matchesToLoad && matchesToLoad.some((m) => m.route.id === routeId));
    pendingNavigationLoadId = ++incrementingLoadId;
    if (matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
      let updatedFetchers2 = markFetchRedirectsDone();
      completeNavigation(location, _extends({
        matches,
        loaderData: {},
        // Commit pending error if we're short circuiting
        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
          [pendingActionResult[0]]: pendingActionResult[1].error
        } : null
      }, getActionDataForCommit(pendingActionResult), updatedFetchers2 ? {
        fetchers: new Map(state.fetchers)
      } : {}), {
        flushSync
      });
      return {
        shortCircuited: true
      };
    }
    if (!isUninterruptedRevalidation && (!future.v7_partialHydration || !initialHydration)) {
      revalidatingFetchers.forEach((rf) => {
        let fetcher = state.fetchers.get(rf.key);
        let revalidatingFetcher = getLoadingFetcher(void 0, fetcher ? fetcher.data : void 0);
        state.fetchers.set(rf.key, revalidatingFetcher);
      });
      let actionData;
      if (pendingActionResult && !isErrorResult(pendingActionResult[1])) {
        actionData = {
          [pendingActionResult[0]]: pendingActionResult[1].data
        };
      } else if (state.actionData) {
        if (Object.keys(state.actionData).length === 0) {
          actionData = null;
        } else {
          actionData = state.actionData;
        }
      }
      updateState(_extends({
        navigation: loadingNavigation
      }, actionData !== void 0 ? {
        actionData
      } : {}, revalidatingFetchers.length > 0 ? {
        fetchers: new Map(state.fetchers)
      } : {}), {
        flushSync
      });
    }
    revalidatingFetchers.forEach((rf) => {
      if (fetchControllers.has(rf.key)) {
        abortFetcher(rf.key);
      }
      if (rf.controller) {
        fetchControllers.set(rf.key, rf.controller);
      }
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f) => abortFetcher(f.key));
    if (pendingNavigationController) {
      pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    }
    let {
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, request);
    if (request.signal.aborted) {
      return {
        shortCircuited: true
      };
    }
    if (pendingNavigationController) {
      pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
    }
    revalidatingFetchers.forEach((rf) => fetchControllers.delete(rf.key));
    let redirect3 = findRedirect([...loaderResults, ...fetcherResults]);
    if (redirect3) {
      if (redirect3.idx >= matchesToLoad.length) {
        let fetcherKey = revalidatingFetchers[redirect3.idx - matchesToLoad.length].key;
        fetchRedirectIds.add(fetcherKey);
      }
      await startRedirectNavigation(request, redirect3.result, {
        replace
      });
      return {
        shortCircuited: true
      };
    }
    let {
      loaderData,
      errors: errors2
    } = processLoaderData(state, matches, matchesToLoad, loaderResults, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds);
    activeDeferreds.forEach((deferredData, routeId) => {
      deferredData.subscribe((aborted) => {
        if (aborted || deferredData.done) {
          activeDeferreds.delete(routeId);
        }
      });
    });
    if (future.v7_partialHydration && initialHydration && state.errors) {
      Object.entries(state.errors).filter((_ref2) => {
        let [id] = _ref2;
        return !matchesToLoad.some((m) => m.route.id === id);
      }).forEach((_ref3) => {
        let [routeId, error] = _ref3;
        errors2 = Object.assign(errors2 || {}, {
          [routeId]: error
        });
      });
    }
    let updatedFetchers = markFetchRedirectsDone();
    let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
    let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
    return _extends({
      loaderData,
      errors: errors2
    }, shouldUpdateFetchers ? {
      fetchers: new Map(state.fetchers)
    } : {});
  }
  function fetch2(key, routeId, href, opts) {
    if (isServer) {
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
    }
    if (fetchControllers.has(key))
      abortFetcher(key);
    let flushSync = (opts && opts.unstable_flushSync) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, href, future.v7_relativeSplatPath, routeId, opts == null ? void 0 : opts.relative);
    let matches = matchRoutes(routesToUse, normalizedPath, basename);
    if (!matches) {
      setFetcherError(key, routeId, getInternalRouterError(404, {
        pathname: normalizedPath
      }), {
        flushSync
      });
      return;
    }
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future.v7_normalizeFormMethod, true, normalizedPath, opts);
    if (error) {
      setFetcherError(key, routeId, error, {
        flushSync
      });
      return;
    }
    let match = getTargetMatch(matches, path);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    if (submission && isMutationMethod(submission.formMethod)) {
      handleFetcherAction(key, routeId, path, match, matches, flushSync, submission);
      return;
    }
    fetchLoadMatches.set(key, {
      routeId,
      path
    });
    handleFetcherLoader(key, routeId, path, match, matches, flushSync, submission);
  }
  async function handleFetcherAction(key, routeId, path, match, requestMatches, flushSync, submission) {
    interruptActiveLoads();
    fetchLoadMatches.delete(key);
    if (!match.route.action && !match.route.lazy) {
      let error = getInternalRouterError(405, {
        method: submission.formMethod,
        pathname: path,
        routeId
      });
      setFetcherError(key, routeId, error, {
        flushSync
      });
      return;
    }
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(key, getSubmittingFetcher(submission, existingFetcher), {
      flushSync
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let actionResults = await callDataStrategy("action", fetchRequest, [match], requestMatches);
    let actionResult = actionResults[0];
    if (fetchRequest.signal.aborted) {
      if (fetchControllers.get(key) === abortController) {
        fetchControllers.delete(key);
      }
      return;
    }
    if (future.v7_fetcherPersist && deletedFetchers.has(key)) {
      if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      }
    } else {
      if (isRedirectResult(actionResult)) {
        fetchControllers.delete(key);
        if (pendingNavigationLoadId > originatingLoadId) {
          updateFetcherState(key, getDoneFetcher(void 0));
          return;
        } else {
          fetchRedirectIds.add(key);
          updateFetcherState(key, getLoadingFetcher(submission));
          return startRedirectNavigation(fetchRequest, actionResult, {
            fetcherSubmission: submission
          });
        }
      }
      if (isErrorResult(actionResult)) {
        setFetcherError(key, routeId, actionResult.error);
        return;
      }
    }
    if (isDeferredResult(actionResult)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    }
    let nextLocation = state.navigation.location || state.location;
    let revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal);
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let loadFetcher = getLoadingFetcher(submission, actionResult.data);
    state.fetchers.set(key, loadFetcher);
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, submission, nextLocation, false, future.unstable_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, [match.route.id, actionResult]);
    revalidatingFetchers.filter((rf) => rf.key !== key).forEach((rf) => {
      let staleKey = rf.key;
      let existingFetcher2 = state.fetchers.get(staleKey);
      let revalidatingFetcher = getLoadingFetcher(void 0, existingFetcher2 ? existingFetcher2.data : void 0);
      state.fetchers.set(staleKey, revalidatingFetcher);
      if (fetchControllers.has(staleKey)) {
        abortFetcher(staleKey);
      }
      if (rf.controller) {
        fetchControllers.set(staleKey, rf.controller);
      }
    });
    updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf) => abortFetcher(rf.key));
    abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    let {
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
    if (abortController.signal.aborted) {
      return;
    }
    abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
    fetchReloadIds.delete(key);
    fetchControllers.delete(key);
    revalidatingFetchers.forEach((r) => fetchControllers.delete(r.key));
    let redirect3 = findRedirect([...loaderResults, ...fetcherResults]);
    if (redirect3) {
      if (redirect3.idx >= matchesToLoad.length) {
        let fetcherKey = revalidatingFetchers[redirect3.idx - matchesToLoad.length].key;
        fetchRedirectIds.add(fetcherKey);
      }
      return startRedirectNavigation(revalidationRequest, redirect3.result);
    }
    let {
      loaderData,
      errors: errors2
    } = processLoaderData(state, state.matches, matchesToLoad, loaderResults, void 0, revalidatingFetchers, fetcherResults, activeDeferreds);
    if (state.fetchers.has(key)) {
      let doneFetcher = getDoneFetcher(actionResult.data);
      state.fetchers.set(key, doneFetcher);
    }
    abortStaleFetchLoads(loadId);
    if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
      invariant(pendingAction, "Expected pending action");
      pendingNavigationController && pendingNavigationController.abort();
      completeNavigation(state.navigation.location, {
        matches,
        loaderData,
        errors: errors2,
        fetchers: new Map(state.fetchers)
      });
    } else {
      updateState({
        errors: errors2,
        loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors2),
        fetchers: new Map(state.fetchers)
      });
      isRevalidationRequired = false;
    }
  }
  async function handleFetcherLoader(key, routeId, path, match, matches, flushSync, submission) {
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(key, getLoadingFetcher(submission, existingFetcher ? existingFetcher.data : void 0), {
      flushSync
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let results = await callDataStrategy("loader", fetchRequest, [match], matches);
    let result = results[0];
    if (isDeferredResult(result)) {
      result = await resolveDeferredData(result, fetchRequest.signal, true) || result;
    }
    if (fetchControllers.get(key) === abortController) {
      fetchControllers.delete(key);
    }
    if (fetchRequest.signal.aborted) {
      return;
    }
    if (deletedFetchers.has(key)) {
      updateFetcherState(key, getDoneFetcher(void 0));
      return;
    }
    if (isRedirectResult(result)) {
      if (pendingNavigationLoadId > originatingLoadId) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      } else {
        fetchRedirectIds.add(key);
        await startRedirectNavigation(fetchRequest, result);
        return;
      }
    }
    if (isErrorResult(result)) {
      setFetcherError(key, routeId, result.error);
      return;
    }
    invariant(!isDeferredResult(result), "Unhandled fetcher deferred data");
    updateFetcherState(key, getDoneFetcher(result.data));
  }
  async function startRedirectNavigation(request, redirect3, _temp2) {
    let {
      submission,
      fetcherSubmission,
      replace
    } = _temp2 === void 0 ? {} : _temp2;
    if (redirect3.response.headers.has("X-Remix-Revalidate")) {
      isRevalidationRequired = true;
    }
    let location = redirect3.response.headers.get("Location");
    invariant(location, "Expected a Location header on the redirect Response");
    location = normalizeRedirectLocation(location, new URL(request.url), basename);
    let redirectLocation = createLocation(state.location, location, {
      _isRedirect: true
    });
    if (isBrowser) {
      let isDocumentReload = false;
      if (redirect3.response.headers.has("X-Remix-Reload-Document")) {
        isDocumentReload = true;
      } else if (ABSOLUTE_URL_REGEX.test(location)) {
        const url = init.history.createURL(location);
        isDocumentReload = // Hard reload if it's an absolute URL to a new origin
        url.origin !== routerWindow.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        stripBasename(url.pathname, basename) == null;
      }
      if (isDocumentReload) {
        if (replace) {
          routerWindow.location.replace(location);
        } else {
          routerWindow.location.assign(location);
        }
        return;
      }
    }
    pendingNavigationController = null;
    let redirectHistoryAction = replace === true ? Action.Replace : Action.Push;
    let {
      formMethod,
      formAction,
      formEncType
    } = state.navigation;
    if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) {
      submission = getSubmissionFromNavigation(state.navigation);
    }
    let activeSubmission = submission || fetcherSubmission;
    if (redirectPreserveMethodStatusCodes.has(redirect3.response.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) {
      await startNavigation(redirectHistoryAction, redirectLocation, {
        submission: _extends({}, activeSubmission, {
          formAction: location
        }),
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    } else {
      let overrideNavigation = getLoadingNavigation(redirectLocation, submission);
      await startNavigation(redirectHistoryAction, redirectLocation, {
        overrideNavigation,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission,
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    }
  }
  async function callDataStrategy(type, request, matchesToLoad, matches) {
    try {
      let results = await callDataStrategyImpl(dataStrategyImpl, type, request, matchesToLoad, matches, manifest, mapRouteProperties);
      return await Promise.all(results.map((result, i) => {
        if (isRedirectHandlerResult(result)) {
          let response = result.result;
          return {
            type: ResultType.redirect,
            response: normalizeRelativeRoutingRedirectResponse(response, request, matchesToLoad[i].route.id, matches, basename, future.v7_relativeSplatPath)
          };
        }
        return convertHandlerResultToDataResult(result);
      }));
    } catch (e) {
      return matchesToLoad.map(() => ({
        type: ResultType.error,
        error: e
      }));
    }
  }
  async function callLoadersAndMaybeResolveData(currentMatches, matches, matchesToLoad, fetchersToLoad, request) {
    let [loaderResults, ...fetcherResults] = await Promise.all([matchesToLoad.length ? callDataStrategy("loader", request, matchesToLoad, matches) : [], ...fetchersToLoad.map((f) => {
      if (f.matches && f.match && f.controller) {
        let fetcherRequest = createClientSideRequest(init.history, f.path, f.controller.signal);
        return callDataStrategy("loader", fetcherRequest, [f.match], f.matches).then((r) => r[0]);
      } else {
        return Promise.resolve({
          type: ResultType.error,
          error: getInternalRouterError(404, {
            pathname: f.path
          })
        });
      }
    })]);
    await Promise.all([resolveDeferredResults(currentMatches, matchesToLoad, loaderResults, loaderResults.map(() => request.signal), false, state.loaderData), resolveDeferredResults(currentMatches, fetchersToLoad.map((f) => f.match), fetcherResults, fetchersToLoad.map((f) => f.controller ? f.controller.signal : null), true)]);
    return {
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    isRevalidationRequired = true;
    cancelledDeferredRoutes.push(...cancelActiveDeferreds());
    fetchLoadMatches.forEach((_, key) => {
      if (fetchControllers.has(key)) {
        cancelledFetcherLoads.push(key);
        abortFetcher(key);
      }
    });
  }
  function updateFetcherState(key, fetcher, opts) {
    if (opts === void 0) {
      opts = {};
    }
    state.fetchers.set(key, fetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    }, {
      flushSync: (opts && opts.flushSync) === true
    });
  }
  function setFetcherError(key, routeId, error, opts) {
    if (opts === void 0) {
      opts = {};
    }
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key);
    updateState({
      errors: {
        [boundaryMatch.route.id]: error
      },
      fetchers: new Map(state.fetchers)
    }, {
      flushSync: (opts && opts.flushSync) === true
    });
  }
  function getFetcher(key) {
    if (future.v7_fetcherPersist) {
      activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
      if (deletedFetchers.has(key)) {
        deletedFetchers.delete(key);
      }
    }
    return state.fetchers.get(key) || IDLE_FETCHER;
  }
  function deleteFetcher(key) {
    let fetcher = state.fetchers.get(key);
    if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) {
      abortFetcher(key);
    }
    fetchLoadMatches.delete(key);
    fetchReloadIds.delete(key);
    fetchRedirectIds.delete(key);
    deletedFetchers.delete(key);
    state.fetchers.delete(key);
  }
  function deleteFetcherAndUpdateState(key) {
    if (future.v7_fetcherPersist) {
      let count = (activeFetchers.get(key) || 0) - 1;
      if (count <= 0) {
        activeFetchers.delete(key);
        deletedFetchers.add(key);
      } else {
        activeFetchers.set(key, count);
      }
    } else {
      deleteFetcher(key);
    }
    updateState({
      fetchers: new Map(state.fetchers)
    });
  }
  function abortFetcher(key) {
    let controller = fetchControllers.get(key);
    invariant(controller, "Expected fetch controller: " + key);
    controller.abort();
    fetchControllers.delete(key);
  }
  function markFetchersDone(keys) {
    for (let key of keys) {
      let fetcher = getFetcher(key);
      let doneFetcher = getDoneFetcher(fetcher.data);
      state.fetchers.set(key, doneFetcher);
    }
  }
  function markFetchRedirectsDone() {
    let doneKeys = [];
    let updatedFetchers = false;
    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant(fetcher, "Expected fetcher: " + key);
      if (fetcher.state === "loading") {
        fetchRedirectIds.delete(key);
        doneKeys.push(key);
        updatedFetchers = true;
      }
    }
    markFetchersDone(doneKeys);
    return updatedFetchers;
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];
    for (let [key, id] of fetchReloadIds) {
      if (id < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, "Expected fetcher: " + key);
        if (fetcher.state === "loading") {
          abortFetcher(key);
          fetchReloadIds.delete(key);
          yeetedKeys.push(key);
        }
      }
    }
    markFetchersDone(yeetedKeys);
    return yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    if (blockerFunctions.get(key) !== fn) {
      blockerFunctions.set(key, fn);
    }
    return blocker;
  }
  function deleteBlocker(key) {
    state.blockers.delete(key);
    blockerFunctions.delete(key);
  }
  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
    let blockers = new Map(state.blockers);
    blockers.set(key, newBlocker);
    updateState({
      blockers
    });
  }
  function shouldBlockNavigation(_ref4) {
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = _ref4;
    if (blockerFunctions.size === 0) {
      return;
    }
    if (blockerFunctions.size > 1) {
      warning(false, "A router only supports one blocker at a time");
    }
    let entries = Array.from(blockerFunctions.entries());
    let [blockerKey, blockerFunction] = entries[entries.length - 1];
    let blocker = state.blockers.get(blockerKey);
    if (blocker && blocker.state === "proceeding") {
      return;
    }
    if (blockerFunction({
      currentLocation,
      nextLocation,
      historyAction
    })) {
      return blockerKey;
    }
  }
  function cancelActiveDeferreds(predicate) {
    let cancelledRouteIds = [];
    activeDeferreds.forEach((dfd, routeId) => {
      if (!predicate || predicate(routeId)) {
        dfd.cancel();
        cancelledRouteIds.push(routeId);
        activeDeferreds.delete(routeId);
      }
    });
    return cancelledRouteIds;
  }
  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions = positions;
    getScrollPosition = getPosition;
    getScrollRestorationKey = getKey || null;
    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      let y = getSavedScrollPosition(state.location, state.matches);
      if (y != null) {
        updateState({
          restoreScrollPosition: y
        });
      }
    }
    return () => {
      savedScrollPositions = null;
      getScrollPosition = null;
      getScrollRestorationKey = null;
    };
  }
  function getScrollKey(location, matches) {
    if (getScrollRestorationKey) {
      let key = getScrollRestorationKey(location, matches.map((m) => convertRouteMatchToUiMatch(m, state.loaderData)));
      return key || location.key;
    }
    return location.key;
  }
  function saveScrollPosition(location, matches) {
    if (savedScrollPositions && getScrollPosition) {
      let key = getScrollKey(location, matches);
      savedScrollPositions[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions) {
      let key = getScrollKey(location, matches);
      let y = savedScrollPositions[key];
      if (typeof y === "number") {
        return y;
      }
    }
    return null;
  }
  function _internalSetRoutes(newRoutes) {
    manifest = {};
    inFlightDataRoutes = convertRoutesToDataRoutes(newRoutes, mapRouteProperties, void 0, manifest);
  }
  router2 = {
    get basename() {
      return basename;
    },
    get future() {
      return future;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes;
    },
    get window() {
      return routerWindow;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch: fetch2,
    revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (to) => init.history.createHref(to),
    encodeLocation: (to) => init.history.encodeLocation(to),
    getFetcher,
    deleteFetcher: deleteFetcherAndUpdateState,
    dispose,
    getBlocker,
    deleteBlocker,
    _internalFetchControllers: fetchControllers,
    _internalActiveDeferreds: activeDeferreds,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes
  };
  return router2;
}
const UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");
function createStaticHandler(routes2, opts) {
  invariant(routes2.length > 0, "You must provide a non-empty routes array to createStaticHandler");
  let manifest = {};
  let basename = (opts ? opts.basename : null) || "/";
  let mapRouteProperties;
  if (opts != null && opts.mapRouteProperties) {
    mapRouteProperties = opts.mapRouteProperties;
  } else if (opts != null && opts.detectErrorBoundary) {
    let detectErrorBoundary = opts.detectErrorBoundary;
    mapRouteProperties = (route) => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else {
    mapRouteProperties = defaultMapRouteProperties;
  }
  let future = _extends({
    v7_relativeSplatPath: false,
    v7_throwAbortReason: false
  }, opts ? opts.future : null);
  let dataRoutes = convertRoutesToDataRoutes(routes2, mapRouteProperties, void 0, manifest);
  async function query(request, _temp3) {
    let {
      requestContext,
      skipLoaderErrorBubbling,
      unstable_dataStrategy
    } = _temp3 === void 0 ? {} : _temp3;
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename);
    if (!isValidMethod(method) && method !== "HEAD") {
      let error = getInternalRouterError(405, {
        method
      });
      let {
        matches: methodNotAllowedMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    } else if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      });
      let {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    let result = await queryImpl(request, location, matches, requestContext, unstable_dataStrategy || null, skipLoaderErrorBubbling === true, null);
    if (isResponse$1(result)) {
      return result;
    }
    return _extends({
      location,
      basename
    }, result);
  }
  async function queryRoute(request, _temp4) {
    let {
      routeId,
      requestContext,
      unstable_dataStrategy
    } = _temp4 === void 0 ? {} : _temp4;
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename);
    if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS") {
      throw getInternalRouterError(405, {
        method
      });
    } else if (!matches) {
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }
    let match = routeId ? matches.find((m) => m.route.id === routeId) : getTargetMatch(matches, location);
    if (routeId && !match) {
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    } else if (!match) {
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }
    let result = await queryImpl(request, location, matches, requestContext, unstable_dataStrategy || null, false, match);
    if (isResponse$1(result)) {
      return result;
    }
    let error = result.errors ? Object.values(result.errors)[0] : void 0;
    if (error !== void 0) {
      throw error;
    }
    if (result.actionData) {
      return Object.values(result.actionData)[0];
    }
    if (result.loaderData) {
      var _result$activeDeferre;
      let data = Object.values(result.loaderData)[0];
      if ((_result$activeDeferre = result.activeDeferreds) != null && _result$activeDeferre[match.route.id]) {
        data[UNSAFE_DEFERRED_SYMBOL] = result.activeDeferreds[match.route.id];
      }
      return data;
    }
    return void 0;
  }
  async function queryImpl(request, location, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, routeMatch) {
    invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");
    try {
      if (isMutationMethod(request.method.toLowerCase())) {
        let result2 = await submit(request, matches, routeMatch || getTargetMatch(matches, location), requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, routeMatch != null);
        return result2;
      }
      let result = await loadRouteData(request, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, routeMatch);
      return isResponse$1(result) ? result : _extends({}, result, {
        actionData: null,
        actionHeaders: {}
      });
    } catch (e) {
      if (isHandlerResult(e) && isResponse$1(e.result)) {
        if (e.type === ResultType.error) {
          throw e.result;
        }
        return e.result;
      }
      if (isRedirectResponse$1(e)) {
        return e;
      }
      throw e;
    }
  }
  async function submit(request, matches, actionMatch, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, isRouteRequest) {
    let result;
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: ResultType.error,
        error
      };
    } else {
      let results = await callDataStrategy("action", request, [actionMatch], matches, isRouteRequest, requestContext, unstable_dataStrategy);
      result = results[0];
      if (request.signal.aborted) {
        throwStaticHandlerAbortedError(request, isRouteRequest, future);
      }
    }
    if (isRedirectResult(result)) {
      throw new Response(null, {
        status: result.response.status,
        headers: {
          Location: result.response.headers.get("Location")
        }
      });
    }
    if (isDeferredResult(result)) {
      let error = getInternalRouterError(400, {
        type: "defer-action"
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: ResultType.error,
        error
      };
    }
    if (isRouteRequest) {
      if (isErrorResult(result)) {
        throw result.error;
      }
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: {
          [actionMatch.route.id]: result.data
        },
        errors: null,
        // Note: statusCode + headers are unused here since queryRoute will
        // return the raw Response or value
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    });
    if (isErrorResult(result)) {
      let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
      let context2 = await loadRouteData(loaderRequest, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, null, [boundaryMatch.route.id, result]);
      return _extends({}, context2, {
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : result.statusCode != null ? result.statusCode : 500,
        actionData: null,
        actionHeaders: _extends({}, result.headers ? {
          [actionMatch.route.id]: result.headers
        } : {})
      });
    }
    let context = await loadRouteData(loaderRequest, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, null);
    return _extends({}, context, {
      actionData: {
        [actionMatch.route.id]: result.data
      }
    }, result.statusCode ? {
      statusCode: result.statusCode
    } : {}, {
      actionHeaders: result.headers ? {
        [actionMatch.route.id]: result.headers
      } : {}
    });
  }
  async function loadRouteData(request, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, routeMatch, pendingActionResult) {
    let isRouteRequest = routeMatch != null;
    if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader) && !(routeMatch != null && routeMatch.route.lazy)) {
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch == null ? void 0 : routeMatch.route.id
      });
    }
    let requestMatches = routeMatch ? [routeMatch] : pendingActionResult && isErrorResult(pendingActionResult[1]) ? getLoaderMatchesUntilBoundary(matches, pendingActionResult[0]) : matches;
    let matchesToLoad = requestMatches.filter((m) => m.route.loader || m.route.lazy);
    if (matchesToLoad.length === 0) {
      return {
        matches,
        // Add a null for all matched routes for proper revalidation on the client
        loaderData: matches.reduce((acc, m) => Object.assign(acc, {
          [m.route.id]: null
        }), {}),
        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
          [pendingActionResult[0]]: pendingActionResult[1].error
        } : null,
        statusCode: 200,
        loaderHeaders: {},
        activeDeferreds: null
      };
    }
    let results = await callDataStrategy("loader", request, matchesToLoad, matches, isRouteRequest, requestContext, unstable_dataStrategy);
    if (request.signal.aborted) {
      throwStaticHandlerAbortedError(request, isRouteRequest, future);
    }
    let activeDeferreds = /* @__PURE__ */ new Map();
    let context = processRouteLoaderData(matches, matchesToLoad, results, pendingActionResult, activeDeferreds, skipLoaderErrorBubbling);
    let executedLoaders = new Set(matchesToLoad.map((match) => match.route.id));
    matches.forEach((match) => {
      if (!executedLoaders.has(match.route.id)) {
        context.loaderData[match.route.id] = null;
      }
    });
    return _extends({}, context, {
      matches,
      activeDeferreds: activeDeferreds.size > 0 ? Object.fromEntries(activeDeferreds.entries()) : null
    });
  }
  async function callDataStrategy(type, request, matchesToLoad, matches, isRouteRequest, requestContext, unstable_dataStrategy) {
    let results = await callDataStrategyImpl(unstable_dataStrategy || defaultDataStrategy, type, request, matchesToLoad, matches, manifest, mapRouteProperties, requestContext);
    return await Promise.all(results.map((result, i) => {
      if (isRedirectHandlerResult(result)) {
        let response = result.result;
        throw normalizeRelativeRoutingRedirectResponse(response, request, matchesToLoad[i].route.id, matches, basename, future.v7_relativeSplatPath);
      }
      if (isResponse$1(result.result) && isRouteRequest) {
        throw result;
      }
      return convertHandlerResultToDataResult(result);
    }));
  }
  return {
    dataRoutes,
    query,
    queryRoute
  };
}
function getStaticContextFromError(routes2, context, error) {
  let newContext = _extends({}, context, {
    statusCode: isRouteErrorResponse(error) ? error.status : 500,
    errors: {
      [context._deepestRenderedBoundaryId || routes2[0].id]: error
    }
  });
  return newContext;
}
function throwStaticHandlerAbortedError(request, isRouteRequest, future) {
  if (future.v7_throwAbortReason && request.signal.reason !== void 0) {
    throw request.signal.reason;
  }
  let method = isRouteRequest ? "queryRoute" : "query";
  throw new Error(method + "() call aborted: " + request.method + " " + request.url);
}
function isSubmissionNavigation(opts) {
  return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
}
function normalizeTo(location, matches, basename, prependBasename, to, v7_relativeSplatPath, fromRouteId, relative) {
  let contextualMatches;
  let activeRouteMatch;
  if (fromRouteId) {
    contextualMatches = [];
    for (let match of matches) {
      contextualMatches.push(match);
      if (match.route.id === fromRouteId) {
        activeRouteMatch = match;
        break;
      }
    }
  } else {
    contextualMatches = matches;
    activeRouteMatch = matches[matches.length - 1];
  }
  let path = resolveTo(to ? to : ".", getResolveToMatches(contextualMatches, v7_relativeSplatPath), stripBasename(location.pathname, basename) || location.pathname, relative === "path");
  if (to == null) {
    path.search = location.search;
    path.hash = location.hash;
  }
  if ((to == null || to === "" || to === ".") && activeRouteMatch && activeRouteMatch.route.index && !hasNakedIndexQuery(path.search)) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (prependBasename && basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function normalizeNavigateOptions(normalizeFormMethod, isFetcher, path, opts) {
  if (!opts || !isSubmissionNavigation(opts)) {
    return {
      path
    };
  }
  if (opts.formMethod && !isValidMethod(opts.formMethod)) {
    return {
      path,
      error: getInternalRouterError(405, {
        method: opts.formMethod
      })
    };
  }
  let getInvalidBodyError = () => ({
    path,
    error: getInternalRouterError(400, {
      type: "invalid-body"
    })
  });
  let rawFormMethod = opts.formMethod || "get";
  let formMethod = normalizeFormMethod ? rawFormMethod.toUpperCase() : rawFormMethod.toLowerCase();
  let formAction = stripHashFromPath(path);
  if (opts.body !== void 0) {
    if (opts.formEncType === "text/plain") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(opts.body.entries()).reduce((acc, _ref5) => {
          let [name, value] = _ref5;
          return "" + acc + name + "=" + value + "\n";
        }, "")
      ) : String(opts.body);
      return {
        path,
        submission: {
          formMethod,
          formAction,
          formEncType: opts.formEncType,
          formData: void 0,
          json: void 0,
          text
        }
      };
    } else if (opts.formEncType === "application/json") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      try {
        let json3 = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
        return {
          path,
          submission: {
            formMethod,
            formAction,
            formEncType: opts.formEncType,
            formData: void 0,
            json: json3,
            text: void 0
          }
        };
      } catch (e) {
        return getInvalidBodyError();
      }
    }
  }
  invariant(typeof FormData === "function", "FormData is not available in this environment");
  let searchParams;
  let formData;
  if (opts.formData) {
    searchParams = convertFormDataToSearchParams(opts.formData);
    formData = opts.formData;
  } else if (opts.body instanceof FormData) {
    searchParams = convertFormDataToSearchParams(opts.body);
    formData = opts.body;
  } else if (opts.body instanceof URLSearchParams) {
    searchParams = opts.body;
    formData = convertSearchParamsToFormData(searchParams);
  } else if (opts.body == null) {
    searchParams = new URLSearchParams();
    formData = new FormData();
  } else {
    try {
      searchParams = new URLSearchParams(opts.body);
      formData = convertSearchParamsToFormData(searchParams);
    } catch (e) {
      return getInvalidBodyError();
    }
  }
  let submission = {
    formMethod,
    formAction,
    formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
    formData,
    json: void 0,
    text: void 0
  };
  if (isMutationMethod(submission.formMethod)) {
    return {
      path,
      submission
    };
  }
  let parsedPath = parsePath(path);
  if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
    searchParams.append("index", "");
  }
  parsedPath.search = "?" + searchParams;
  return {
    path: createPath(parsedPath),
    submission
  };
}
function getLoaderMatchesUntilBoundary(matches, boundaryId) {
  let boundaryMatches = matches;
  if (boundaryId) {
    let index = matches.findIndex((m) => m.route.id === boundaryId);
    if (index >= 0) {
      boundaryMatches = matches.slice(0, index);
    }
  }
  return boundaryMatches;
}
function getMatchesToLoad(history, state, matches, submission, location, isInitialLoad, skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult) {
  let actionResult = pendingActionResult ? isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : pendingActionResult[1].data : void 0;
  let currentUrl = history.createURL(state.location);
  let nextUrl = history.createURL(location);
  let boundaryId = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[0] : void 0;
  let boundaryMatches = boundaryId ? getLoaderMatchesUntilBoundary(matches, boundaryId) : matches;
  let actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : void 0;
  let shouldSkipRevalidation = skipActionErrorRevalidation && actionStatus && actionStatus >= 400;
  let navigationMatches = boundaryMatches.filter((match, index) => {
    let {
      route
    } = match;
    if (route.lazy) {
      return true;
    }
    if (route.loader == null) {
      return false;
    }
    if (isInitialLoad) {
      if (typeof route.loader !== "function" || route.loader.hydrate) {
        return true;
      }
      return state.loaderData[route.id] === void 0 && // Don't re-run if the loader ran and threw an error
      (!state.errors || state.errors[route.id] === void 0);
    }
    if (isNewLoader(state.loaderData, state.matches[index], match) || cancelledDeferredRoutes.some((id) => id === match.route.id)) {
      return true;
    }
    let currentRouteMatch = state.matches[index];
    let nextRouteMatch = match;
    return shouldRevalidateLoader(match, _extends({
      currentUrl,
      currentParams: currentRouteMatch.params,
      nextUrl,
      nextParams: nextRouteMatch.params
    }, submission, {
      actionResult,
      unstable_actionStatus: actionStatus,
      defaultShouldRevalidate: shouldSkipRevalidation ? false : (
        // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
        isRevalidationRequired || currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search || // Search params affect all loaders
        currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
      )
    }));
  });
  let revalidatingFetchers = [];
  fetchLoadMatches.forEach((f, key) => {
    if (isInitialLoad || !matches.some((m) => m.route.id === f.routeId) || deletedFetchers.has(key)) {
      return;
    }
    let fetcherMatches = matchRoutes(routesToUse, f.path, basename);
    if (!fetcherMatches) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: null,
        match: null,
        controller: null
      });
      return;
    }
    let fetcher = state.fetchers.get(key);
    let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
    let shouldRevalidate = false;
    if (fetchRedirectIds.has(key)) {
      shouldRevalidate = false;
    } else if (cancelledFetcherLoads.includes(key)) {
      shouldRevalidate = true;
    } else if (fetcher && fetcher.state !== "idle" && fetcher.data === void 0) {
      shouldRevalidate = isRevalidationRequired;
    } else {
      shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends({
        currentUrl,
        currentParams: state.matches[state.matches.length - 1].params,
        nextUrl,
        nextParams: matches[matches.length - 1].params
      }, submission, {
        actionResult,
        unstable_actionStatus: actionStatus,
        defaultShouldRevalidate: shouldSkipRevalidation ? false : isRevalidationRequired
      }));
    }
    if (shouldRevalidate) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: fetcherMatches,
        match: fetcherMatch,
        controller: new AbortController()
      });
    }
  });
  return [navigationMatches, revalidatingFetchers];
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew = (
    // [a] -> [a, b]
    !currentMatch || // [a, b] -> [a, c]
    match.route.id !== currentMatch.route.id
  );
  let isMissingData = currentLoaderData[match.route.id] === void 0;
  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
  );
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }
  return arg.defaultShouldRevalidate;
}
async function loadLazyRouteModule(route, mapRouteProperties, manifest) {
  if (!route.lazy) {
    return;
  }
  let lazyRoute = await route.lazy();
  if (!route.lazy) {
    return;
  }
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  let routeUpdates = {};
  for (let lazyRouteProperty in lazyRoute) {
    let staticRouteValue = routeToUpdate[lazyRouteProperty];
    let isPropertyStaticallyDefined = staticRouteValue !== void 0 && // This property isn't static since it should always be updated based
    // on the route updates
    lazyRouteProperty !== "hasErrorBoundary";
    warning(!isPropertyStaticallyDefined, 'Route "' + routeToUpdate.id + '" has a static property "' + lazyRouteProperty + '" defined but its lazy function is also returning a value for this property. ' + ('The lazy route property "' + lazyRouteProperty + '" will be ignored.'));
    if (!isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty)) {
      routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty];
    }
  }
  Object.assign(routeToUpdate, routeUpdates);
  Object.assign(routeToUpdate, _extends({}, mapRouteProperties(routeToUpdate), {
    lazy: void 0
  }));
}
function defaultDataStrategy(opts) {
  return Promise.all(opts.matches.map((m) => m.resolve()));
}
async function callDataStrategyImpl(dataStrategyImpl, type, request, matchesToLoad, matches, manifest, mapRouteProperties, requestContext) {
  let routeIdsToLoad = matchesToLoad.reduce((acc, m) => acc.add(m.route.id), /* @__PURE__ */ new Set());
  let loadedMatches = /* @__PURE__ */ new Set();
  let results = await dataStrategyImpl({
    matches: matches.map((match) => {
      let shouldLoad = routeIdsToLoad.has(match.route.id);
      let resolve = (handlerOverride) => {
        loadedMatches.add(match.route.id);
        return shouldLoad ? callLoaderOrAction(type, request, match, manifest, mapRouteProperties, handlerOverride, requestContext) : Promise.resolve({
          type: ResultType.data,
          result: void 0
        });
      };
      return _extends({}, match, {
        shouldLoad,
        resolve
      });
    }),
    request,
    params: matches[0].params,
    context: requestContext
  });
  matches.forEach((m) => invariant(loadedMatches.has(m.route.id), '`match.resolve()` was not called for route id "' + m.route.id + '". You must call `match.resolve()` on every match passed to `dataStrategy` to ensure all routes are properly loaded.'));
  return results.filter((_, i) => routeIdsToLoad.has(matches[i].route.id));
}
async function callLoaderOrAction(type, request, match, manifest, mapRouteProperties, handlerOverride, staticContext) {
  let result;
  let onReject;
  let runHandler = (handler) => {
    let reject;
    let abortPromise = new Promise((_, r) => reject = r);
    onReject = () => reject();
    request.signal.addEventListener("abort", onReject);
    let actualHandler = (ctx) => {
      if (typeof handler !== "function") {
        return Promise.reject(new Error("You cannot call the handler for a route which defines a boolean " + ('"' + type + '" [routeId: ' + match.route.id + "]")));
      }
      return handler({
        request,
        params: match.params,
        context: staticContext
      }, ...ctx !== void 0 ? [ctx] : []);
    };
    let handlerPromise;
    if (handlerOverride) {
      handlerPromise = handlerOverride((ctx) => actualHandler(ctx));
    } else {
      handlerPromise = (async () => {
        try {
          let val = await actualHandler();
          return {
            type: "data",
            result: val
          };
        } catch (e) {
          return {
            type: "error",
            result: e
          };
        }
      })();
    }
    return Promise.race([handlerPromise, abortPromise]);
  };
  try {
    let handler = match.route[type];
    if (match.route.lazy) {
      if (handler) {
        let handlerError;
        let [value] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          runHandler(handler).catch((e) => {
            handlerError = e;
          }),
          loadLazyRouteModule(match.route, mapRouteProperties, manifest)
        ]);
        if (handlerError !== void 0) {
          throw handlerError;
        }
        result = value;
      } else {
        await loadLazyRouteModule(match.route, mapRouteProperties, manifest);
        handler = match.route[type];
        if (handler) {
          result = await runHandler(handler);
        } else if (type === "action") {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(405, {
            method: request.method,
            pathname,
            routeId: match.route.id
          });
        } else {
          return {
            type: ResultType.data,
            result: void 0
          };
        }
      }
    } else if (!handler) {
      let url = new URL(request.url);
      let pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    } else {
      result = await runHandler(handler);
    }
    invariant(result.result !== void 0, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ('"' + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
  } catch (e) {
    return {
      type: ResultType.error,
      result: e
    };
  } finally {
    if (onReject) {
      request.signal.removeEventListener("abort", onReject);
    }
  }
  return result;
}
async function convertHandlerResultToDataResult(handlerResult) {
  let {
    result,
    type,
    status
  } = handlerResult;
  if (isResponse$1(result)) {
    let data;
    try {
      let contentType = result.headers.get("Content-Type");
      if (contentType && /\bapplication\/json\b/.test(contentType)) {
        if (result.body == null) {
          data = null;
        } else {
          data = await result.json();
        }
      } else {
        data = await result.text();
      }
    } catch (e) {
      return {
        type: ResultType.error,
        error: e
      };
    }
    if (type === ResultType.error) {
      return {
        type: ResultType.error,
        error: new ErrorResponseImpl(result.status, result.statusText, data),
        statusCode: result.status,
        headers: result.headers
      };
    }
    return {
      type: ResultType.data,
      data,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (type === ResultType.error) {
    return {
      type: ResultType.error,
      error: result,
      statusCode: isRouteErrorResponse(result) ? result.status : status
    };
  }
  if (isDeferredData$1(result)) {
    var _result$init, _result$init2;
    return {
      type: ResultType.deferred,
      deferredData: result,
      statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status,
      headers: ((_result$init2 = result.init) == null ? void 0 : _result$init2.headers) && new Headers(result.init.headers)
    };
  }
  return {
    type: ResultType.data,
    data: result,
    statusCode: status
  };
}
function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename, v7_relativeSplatPath) {
  let location = response.headers.get("Location");
  invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header");
  if (!ABSOLUTE_URL_REGEX.test(location)) {
    let trimmedMatches = matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1);
    location = normalizeTo(new URL(request.url), trimmedMatches, basename, true, location, v7_relativeSplatPath);
    response.headers.set("Location", location);
  }
  return response;
}
function normalizeRedirectLocation(location, currentUrl, basename) {
  if (ABSOLUTE_URL_REGEX.test(location)) {
    let normalizedLocation = location;
    let url = normalizedLocation.startsWith("//") ? new URL(currentUrl.protocol + normalizedLocation) : new URL(normalizedLocation);
    let isSameBasename = stripBasename(url.pathname, basename) != null;
    if (url.origin === currentUrl.origin && isSameBasename) {
      return url.pathname + url.search + url.hash;
    }
  }
  return location;
}
function createClientSideRequest(history, location, signal, submission) {
  let url = history.createURL(stripHashFromPath(location)).toString();
  let init = {
    signal
  };
  if (submission && isMutationMethod(submission.formMethod)) {
    let {
      formMethod,
      formEncType
    } = submission;
    init.method = formMethod.toUpperCase();
    if (formEncType === "application/json") {
      init.headers = new Headers({
        "Content-Type": formEncType
      });
      init.body = JSON.stringify(submission.json);
    } else if (formEncType === "text/plain") {
      init.body = submission.text;
    } else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) {
      init.body = convertFormDataToSearchParams(submission.formData);
    } else {
      init.body = submission.formData;
    }
  }
  return new Request(url, init);
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of formData.entries()) {
    searchParams.append(key, typeof value === "string" ? value : value.name);
  }
  return searchParams;
}
function convertSearchParamsToFormData(searchParams) {
  let formData = new FormData();
  for (let [key, value] of searchParams.entries()) {
    formData.append(key, value);
  }
  return formData;
}
function processRouteLoaderData(matches, matchesToLoad, results, pendingActionResult, activeDeferreds, skipLoaderErrorBubbling) {
  let loaderData = {};
  let errors2 = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {};
  let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : void 0;
  results.forEach((result, index) => {
    let id = matchesToLoad[index].route.id;
    invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");
    if (isErrorResult(result)) {
      let error = result.error;
      if (pendingError !== void 0) {
        error = pendingError;
        pendingError = void 0;
      }
      errors2 = errors2 || {};
      if (skipLoaderErrorBubbling) {
        errors2[id] = error;
      } else {
        let boundaryMatch = findNearestBoundary(matches, id);
        if (errors2[boundaryMatch.route.id] == null) {
          errors2[boundaryMatch.route.id] = error;
        }
      }
      loaderData[id] = void 0;
      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    } else {
      if (isDeferredResult(result)) {
        activeDeferreds.set(id, result.deferredData);
        loaderData[id] = result.deferredData.data;
        if (result.statusCode != null && result.statusCode !== 200 && !foundError) {
          statusCode = result.statusCode;
        }
        if (result.headers) {
          loaderHeaders[id] = result.headers;
        }
      } else {
        loaderData[id] = result.data;
        if (result.statusCode && result.statusCode !== 200 && !foundError) {
          statusCode = result.statusCode;
        }
        if (result.headers) {
          loaderHeaders[id] = result.headers;
        }
      }
    }
  });
  if (pendingError !== void 0 && pendingActionResult) {
    errors2 = {
      [pendingActionResult[0]]: pendingError
    };
    loaderData[pendingActionResult[0]] = void 0;
  }
  return {
    loaderData,
    errors: errors2,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, matchesToLoad, results, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds) {
  let {
    loaderData,
    errors: errors2
  } = processRouteLoaderData(
    matches,
    matchesToLoad,
    results,
    pendingActionResult,
    activeDeferreds,
    false
    // This method is only called client side so we always want to bubble
  );
  for (let index = 0; index < revalidatingFetchers.length; index++) {
    let {
      key,
      match,
      controller
    } = revalidatingFetchers[index];
    invariant(fetcherResults !== void 0 && fetcherResults[index] !== void 0, "Did not find corresponding fetcher result");
    let result = fetcherResults[index];
    if (controller && controller.signal.aborted) {
      continue;
    } else if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, match == null ? void 0 : match.route.id);
      if (!(errors2 && errors2[boundaryMatch.route.id])) {
        errors2 = _extends({}, errors2, {
          [boundaryMatch.route.id]: result.error
        });
      }
      state.fetchers.delete(key);
    } else if (isRedirectResult(result)) {
      invariant(false, "Unhandled fetcher revalidation redirect");
    } else if (isDeferredResult(result)) {
      invariant(false, "Unhandled fetcher deferred data");
    } else {
      let doneFetcher = getDoneFetcher(result.data);
      state.fetchers.set(key, doneFetcher);
    }
  }
  return {
    loaderData,
    errors: errors2
  };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors2) {
  let mergedLoaderData = _extends({}, newLoaderData);
  for (let match of matches) {
    let id = match.route.id;
    if (newLoaderData.hasOwnProperty(id)) {
      if (newLoaderData[id] !== void 0) {
        mergedLoaderData[id] = newLoaderData[id];
      }
    } else if (loaderData[id] !== void 0 && match.route.loader) {
      mergedLoaderData[id] = loaderData[id];
    }
    if (errors2 && errors2.hasOwnProperty(id)) {
      break;
    }
  }
  return mergedLoaderData;
}
function getActionDataForCommit(pendingActionResult) {
  if (!pendingActionResult) {
    return {};
  }
  return isErrorResult(pendingActionResult[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [pendingActionResult[0]]: pendingActionResult[1].data
    }
  };
}
function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find((m) => m.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes2) {
  let route = routes2.length === 1 ? routes2[0] : routes2.find((r) => r.index || !r.path || r.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route
    }],
    route
  };
}
function getInternalRouterError(status, _temp5) {
  let {
    pathname,
    routeId,
    method,
    type
  } = _temp5 === void 0 ? {} : _temp5;
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";
  if (status === 400) {
    statusText = "Bad Request";
    if (method && pathname && routeId) {
      errorMessage = "You made a " + method + ' request to "' + pathname + '" but ' + ('did not provide a `loader` for route "' + routeId + '", ') + "so there is no way to handle the request.";
    } else if (type === "defer-action") {
      errorMessage = "defer() is not supported in actions";
    } else if (type === "invalid-body") {
      errorMessage = "Unable to encode submission body";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = 'Route "' + routeId + '" does not match URL "' + pathname + '"';
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = 'No route matches URL "' + pathname + '"';
  } else if (status === 405) {
    statusText = "Method Not Allowed";
    if (method && pathname && routeId) {
      errorMessage = "You made a " + method.toUpperCase() + ' request to "' + pathname + '" but ' + ('did not provide an `action` for route "' + routeId + '", ') + "so there is no way to handle the request.";
    } else if (method) {
      errorMessage = 'Invalid request method "' + method.toUpperCase() + '"';
    }
  }
  return new ErrorResponseImpl(status || 500, statusText, new Error(errorMessage), true);
}
function findRedirect(results) {
  for (let i = results.length - 1; i >= 0; i--) {
    let result = results[i];
    if (isRedirectResult(result)) {
      return {
        result,
        idx: i
      };
    }
  }
}
function stripHashFromPath(path) {
  let parsedPath = typeof path === "string" ? parsePath(path) : path;
  return createPath(_extends({}, parsedPath, {
    hash: ""
  }));
}
function isHashChangeOnly(a, b) {
  if (a.pathname !== b.pathname || a.search !== b.search) {
    return false;
  }
  if (a.hash === "") {
    return b.hash !== "";
  } else if (a.hash === b.hash) {
    return true;
  } else if (b.hash !== "") {
    return true;
  }
  return false;
}
function isHandlerResult(result) {
  return result != null && typeof result === "object" && "type" in result && "result" in result && (result.type === ResultType.data || result.type === ResultType.error);
}
function isRedirectHandlerResult(result) {
  return isResponse$1(result.result) && redirectStatusCodes$1.has(result.result.status);
}
function isDeferredResult(result) {
  return result.type === ResultType.deferred;
}
function isErrorResult(result) {
  return result.type === ResultType.error;
}
function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect;
}
function isDeferredData$1(value) {
  let deferred = value;
  return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
}
function isResponse$1(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isRedirectResponse$1(result) {
  if (!isResponse$1(result)) {
    return false;
  }
  let status = result.status;
  let location = result.headers.get("Location");
  return status >= 300 && status <= 399 && location != null;
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toLowerCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toLowerCase());
}
async function resolveDeferredResults(currentMatches, matchesToLoad, results, signals, isFetcher, currentLoaderData) {
  for (let index = 0; index < results.length; index++) {
    let result = results[index];
    let match = matchesToLoad[index];
    if (!match) {
      continue;
    }
    let currentMatch = currentMatches.find((m) => m.route.id === match.route.id);
    let isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== void 0;
    if (isDeferredResult(result) && (isFetcher || isRevalidatingLoader)) {
      let signal = signals[index];
      invariant(signal, "Expected an AbortSignal for revalidating fetcher deferred result");
      await resolveDeferredData(result, signal, isFetcher).then((result2) => {
        if (result2) {
          results[index] = result2 || results[index];
        }
      });
    }
  }
}
async function resolveDeferredData(result, signal, unwrap) {
  if (unwrap === void 0) {
    unwrap = false;
  }
  let aborted = await result.deferredData.resolveData(signal);
  if (aborted) {
    return;
  }
  if (unwrap) {
    try {
      return {
        type: ResultType.data,
        data: result.deferredData.unwrappedData
      };
    } catch (e) {
      return {
        type: ResultType.error,
        error: e
      };
    }
  }
  return {
    type: ResultType.data,
    data: result.deferredData.data
  };
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some((v) => v === "");
}
function getTargetMatch(matches, location) {
  let search = typeof location === "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    return matches[matches.length - 1];
  }
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
function getSubmissionFromNavigation(navigation) {
  let {
    formMethod,
    formAction,
    formEncType,
    text,
    formData,
    json: json3
  } = navigation;
  if (!formMethod || !formAction || !formEncType) {
    return;
  }
  if (text != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json: void 0,
      text
    };
  } else if (formData != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData,
      json: void 0,
      text: void 0
    };
  } else if (json3 !== void 0) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json: json3,
      text: void 0
    };
  }
}
function getLoadingNavigation(location, submission) {
  if (submission) {
    let navigation = {
      state: "loading",
      location,
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text
    };
    return navigation;
  } else {
    let navigation = {
      state: "loading",
      location,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    };
    return navigation;
  }
}
function getSubmittingNavigation(location, submission) {
  let navigation = {
    state: "submitting",
    location,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  };
  return navigation;
}
function getLoadingFetcher(submission, data) {
  if (submission) {
    let fetcher = {
      state: "loading",
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text,
      data
    };
    return fetcher;
  } else {
    let fetcher = {
      state: "loading",
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
      data
    };
    return fetcher;
  }
}
function getSubmittingFetcher(submission, existingFetcher) {
  let fetcher = {
    state: "submitting",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data: existingFetcher ? existingFetcher.data : void 0
  };
  return fetcher;
}
function getDoneFetcher(data) {
  let fetcher = {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data
  };
  return fetcher;
}
function restoreAppliedTransitions(_window, transitions) {
  try {
    let sessionPositions = _window.sessionStorage.getItem(TRANSITIONS_STORAGE_KEY);
    if (sessionPositions) {
      let json3 = JSON.parse(sessionPositions);
      for (let [k, v] of Object.entries(json3 || {})) {
        if (v && Array.isArray(v)) {
          transitions.set(k, new Set(v || []));
        }
      }
    }
  } catch (e) {
  }
}
function persistAppliedTransitions(_window, transitions) {
  if (transitions.size > 0) {
    let json3 = {};
    for (let [k, v] of transitions) {
      json3[k] = [...v];
    }
    try {
      _window.sessionStorage.setItem(TRANSITIONS_STORAGE_KEY, JSON.stringify(json3));
    } catch (error) {
      warning(false, "Failed to save applied view transitions in sessionStorage (" + error + ").");
    }
  }
}
const router$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AbortedDeferredError,
  get Action() {
    return Action;
  },
  IDLE_BLOCKER,
  IDLE_FETCHER,
  IDLE_NAVIGATION,
  UNSAFE_DEFERRED_SYMBOL,
  UNSAFE_DeferredData: DeferredData,
  UNSAFE_ErrorResponseImpl: ErrorResponseImpl,
  UNSAFE_convertRouteMatchToUiMatch: convertRouteMatchToUiMatch,
  UNSAFE_convertRoutesToDataRoutes: convertRoutesToDataRoutes,
  UNSAFE_getResolveToMatches: getResolveToMatches,
  UNSAFE_invariant: invariant,
  UNSAFE_warning: warning,
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
  createPath,
  createRouter,
  createStaticHandler,
  defer: defer$1,
  generatePath,
  getStaticContextFromError,
  getToPathname,
  isDeferredData: isDeferredData$1,
  isRouteErrorResponse,
  joinPaths,
  json: json$1,
  matchPath,
  matchRoutes,
  normalizePathname,
  parsePath,
  redirect: redirect$1,
  redirectDocument: redirectDocument$1,
  resolvePath,
  resolveTo,
  stripBasename
}, Symbol.toStringTag, { value: "Module" }));
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else
    a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var mode$2 = {};
/**
 * @remix-run/server-runtime v2.9.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
Object.defineProperty(mode$2, "__esModule", { value: true });
let ServerMode = /* @__PURE__ */ function(ServerMode2) {
  ServerMode2["Development"] = "development";
  ServerMode2["Production"] = "production";
  ServerMode2["Test"] = "test";
  return ServerMode2;
}({});
function isServerMode(value) {
  return value === ServerMode.Development || value === ServerMode.Production || value === ServerMode.Test;
}
var ServerMode_1 = mode$2.ServerMode = ServerMode;
var isServerMode_1 = mode$2.isServerMode = isServerMode;
const mode$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  ServerMode: ServerMode_1,
  default: mode$2,
  isServerMode: isServerMode_1
}, [mode$2]);
var responses = {};
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(router$2);
var errors$2 = {};
const require$$1$1 = /* @__PURE__ */ getAugmentedNamespace(mode$1);
/**
 * @remix-run/server-runtime v2.9.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
Object.defineProperty(errors$2, "__esModule", { value: true });
var router$1 = require$$0;
var mode = require$$1$1;
function sanitizeError(error, serverMode) {
  if (error instanceof Error && serverMode !== mode.ServerMode.Development) {
    let sanitized = new Error("Unexpected Server Error");
    sanitized.stack = void 0;
    return sanitized;
  }
  return error;
}
function sanitizeErrors(errors2, serverMode) {
  return Object.entries(errors2).reduce((acc, [routeId, error]) => {
    return Object.assign(acc, {
      [routeId]: sanitizeError(error, serverMode)
    });
  }, {});
}
function serializeError(error, serverMode) {
  let sanitized = sanitizeError(error, serverMode);
  return {
    message: sanitized.message,
    stack: sanitized.stack
  };
}
function serializeErrors(errors2, serverMode) {
  if (!errors2)
    return null;
  let entries = Object.entries(errors2);
  let serialized = {};
  for (let [key, val] of entries) {
    if (router$1.isRouteErrorResponse(val)) {
      serialized[key] = {
        ...val,
        __type: "RouteErrorResponse"
      };
    } else if (val instanceof Error) {
      let sanitized = sanitizeError(val, serverMode);
      serialized[key] = {
        message: sanitized.message,
        stack: sanitized.stack,
        __type: "Error",
        // If this is a subclass (i.e., ReferenceError), send up the type so we
        // can re-create the same type during hydration.  This will only apply
        // in dev mode since all production errors are sanitized to normal
        // Error instances
        ...sanitized.name !== "Error" ? {
          __subType: sanitized.name
        } : {}
      };
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
var sanitizeError_1 = errors$2.sanitizeError = sanitizeError;
var sanitizeErrors_1 = errors$2.sanitizeErrors = sanitizeErrors;
var serializeError_1 = errors$2.serializeError = serializeError;
var serializeErrors_1 = errors$2.serializeErrors = serializeErrors;
const errors$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: errors$2,
  sanitizeError: sanitizeError_1,
  sanitizeErrors: sanitizeErrors_1,
  serializeError: serializeError_1,
  serializeErrors: serializeErrors_1
}, [errors$2]);
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(errors$1);
/**
 * @remix-run/server-runtime v2.9.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
Object.defineProperty(responses, "__esModule", { value: true });
var router = require$$0;
var errors = require$$1;
const json2 = (data, init = {}) => {
  return router.json(data, init);
};
const defer2 = (data, init = {}) => {
  return router.defer(data, init);
};
const redirect2 = (url, init = 302) => {
  return router.redirect(url, init);
};
const redirectDocument = (url, init = 302) => {
  return router.redirectDocument(url, init);
};
function isDeferredData(value) {
  let deferred = value;
  return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
const redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function isRedirectStatusCode(statusCode) {
  return redirectStatusCodes.has(statusCode);
}
function isRedirectResponse(response) {
  return isRedirectStatusCode(response.status);
}
function isTrackedPromise(value) {
  return value != null && typeof value.then === "function" && value._tracked === true;
}
const DEFERRED_VALUE_PLACEHOLDER_PREFIX = "__deferred_promise:";
function createDeferredReadableStream(deferredData, signal, serverMode) {
  let encoder = new TextEncoder();
  let stream = new ReadableStream({
    async start(controller) {
      let criticalData = {};
      let preresolvedKeys = [];
      for (let [key, value] of Object.entries(deferredData.data)) {
        if (isTrackedPromise(value)) {
          criticalData[key] = `${DEFERRED_VALUE_PLACEHOLDER_PREFIX}${key}`;
          if (typeof value._data !== "undefined" || typeof value._error !== "undefined") {
            preresolvedKeys.push(key);
          }
        } else {
          criticalData[key] = value;
        }
      }
      controller.enqueue(encoder.encode(JSON.stringify(criticalData) + "\n\n"));
      for (let preresolvedKey of preresolvedKeys) {
        enqueueTrackedPromise(controller, encoder, preresolvedKey, deferredData.data[preresolvedKey], serverMode);
      }
      let unsubscribe = deferredData.subscribe((aborted, settledKey) => {
        if (settledKey) {
          enqueueTrackedPromise(controller, encoder, settledKey, deferredData.data[settledKey], serverMode);
        }
      });
      await deferredData.resolveData(signal);
      unsubscribe();
      controller.close();
    }
  });
  return stream;
}
function enqueueTrackedPromise(controller, encoder, settledKey, promise, serverMode) {
  if ("_error" in promise) {
    controller.enqueue(encoder.encode("error:" + JSON.stringify({
      [settledKey]: promise._error instanceof Error ? errors.serializeError(promise._error, serverMode) : promise._error
    }) + "\n\n"));
  } else {
    controller.enqueue(encoder.encode("data:" + JSON.stringify({
      [settledKey]: promise._data ?? null
    }) + "\n\n"));
  }
}
var createDeferredReadableStream_1 = responses.createDeferredReadableStream = createDeferredReadableStream;
responses.defer = defer2;
var isDeferredData_1 = responses.isDeferredData = isDeferredData;
var isRedirectResponse_1 = responses.isRedirectResponse = isRedirectResponse;
var isRedirectStatusCode_1 = responses.isRedirectStatusCode = isRedirectStatusCode;
var isResponse_1 = responses.isResponse = isResponse;
var json_1 = responses.json = json2;
var redirect_1 = responses.redirect = redirect2;
responses.redirectDocument = redirectDocument;
function clone(_object) {
  const init = {};
  for (const property in _object) {
    init[property] = _object[property];
  }
  return init;
}
function getURLParameters(request, path = "") {
  const url = new URL(request.url);
  const match = matchPath(path, url.pathname);
  return {
    ...Object.fromEntries(new URL(request.url).searchParams.entries()),
    ...match == null ? void 0 : match.params
  };
}
function stripIndexParameter(request) {
  const url = new URL(request.url);
  const indexValues = url.searchParams.getAll("index");
  const indexValuesToKeep = [];
  url.searchParams.delete("index");
  for (const indexValue of indexValues) {
    if (indexValue) {
      indexValuesToKeep.push(indexValue);
    }
  }
  for (const toKeep of indexValuesToKeep) {
    url.searchParams.append("index", toKeep);
  }
  return new Request(url.href, { ...clone(request), duplex: "half" });
}
function stripDataParameter(request) {
  const url = new URL(request.url);
  url.searchParams.delete("_data");
  return new Request(url.href, { ...clone(request), duplex: "half" });
}
function createArgumentsFrom({ event, loadContext, path }) {
  const request = stripDataParameter(stripIndexParameter(event.request.clone()));
  const parameters = getURLParameters(request, path);
  return {
    request,
    params: parameters,
    context: loadContext
  };
}
function isMethod(request, methods) {
  return methods.includes(request.method.toLowerCase());
}
function isActionRequest(request) {
  const url = new URL(request.url);
  return isMethod(request, ["post", "delete", "put", "patch"]) && url.searchParams.get("_data");
}
function isLoaderRequest(request) {
  const url = new URL(request.url);
  return isMethod(request, ["get"]) && url.searchParams.get("_data");
}
function errorResponseToJson(errorResponse) {
  return json_1(errorResponse.error || { message: "Unexpected Server Error" }, {
    status: errorResponse.status,
    statusText: errorResponse.statusText,
    headers: {
      "X-Remix-Error": "yes"
    }
  });
}
function isRemixResponse(response) {
  return Array.from(response.headers.keys()).some((key) => key.toLowerCase().startsWith("x-remix-"));
}
async function handleRequest({ defaultHandler: defaultHandler2, errorHandler, event, loadContext, routes: routes2 }) {
  var _a;
  const url = new URL(event.request.url);
  const routeId = url.searchParams.get("_data");
  const route = routeId ? routes2[routeId] : void 0;
  const _arguments = {
    request: event.request,
    params: getURLParameters(event.request, route == null ? void 0 : route.path),
    context: loadContext
  };
  try {
    if (isLoaderRequest(event.request) && (route == null ? void 0 : route.module.workerLoader)) {
      return await handleLoader({
        event,
        loader: route.module.workerLoader,
        routeId: route.id,
        routePath: route.path,
        loadContext
      }).then(responseHandler);
    }
    if (isActionRequest(event.request) && ((_a = route == null ? void 0 : route.module) == null ? void 0 : _a.workerAction)) {
      return await handleAction({
        event,
        action: route.module.workerAction,
        routeId: route.id,
        routePath: route.path,
        loadContext
      }).then(responseHandler);
    }
  } catch (error) {
    const handler = (error2) => errorHandler(error2, _arguments);
    return _errorHandler({ error, handler });
  }
  return defaultHandler2(_arguments);
}
async function handleLoader({ event, loadContext, loader, routeId, routePath }) {
  const _arguments = createArgumentsFrom({ event, loadContext, path: routePath });
  const result = await loader(_arguments);
  if (result === void 0) {
    throw new Error(`You defined a loader for route "${routeId}" but didn't return anything from your \`worker loader\` function. Please return a value or \`null\`.`);
  }
  if (isDeferredData_1(result)) {
    if (result.init && isRedirectStatusCode_1(result.init.status || 200)) {
      return redirect_1(new Headers(result.init.headers).get("Location"), result.init);
    }
    const body = createDeferredReadableStream_1(result, event.request.signal, ServerMode_1.Production);
    const init = result.init || {};
    const headers = new Headers(init.headers);
    headers.set("Content-Type", "text/remix-deferred");
    init.headers = headers;
    return new Response(body, init);
  }
  return isResponse_1(result) ? result : json_1(result);
}
async function handleAction({ action, event, loadContext, routeId, routePath }) {
  const _arguments = createArgumentsFrom({ event, loadContext, path: routePath });
  const result = await action(_arguments);
  if (result === void 0) {
    throw new Error(`You defined an action for route "${routeId}" but didn't return anything from your \`worker action\` function. Please return a value or \`null\`.`);
  }
  return isResponse_1(result) ? result : json_1(result);
}
function _errorHandler({ error, handler: handleError }) {
  if (isResponse_1(error)) {
    error.headers.set("X-Remix-Catch", "yes");
    return error;
  }
  if (isRouteErrorResponse(error)) {
    error.error && handleError(error.error);
    return errorResponseToJson(error);
  }
  const errorInstance = error instanceof Error ? error : new Error("Unexpected Server Error");
  handleError(errorInstance);
  return json_1({ message: errorInstance.message }, {
    status: 500,
    headers: {
      "X-Remix-Error": "yes"
    }
  });
}
function responseHandler(response) {
  if (isRedirectResponse_1(response)) {
    const headers = new Headers(response.headers);
    headers.set("X-Remix-Redirect", headers.get("Location"));
    headers.set("X-Remix-Status", String(response.status));
    headers.delete("Location");
    if (response.headers.get("Set-Cookie") !== null) {
      headers.set("X-Remix-Revalidate", "yes");
    }
    return new Response(null, {
      status: 204,
      headers
    });
  }
  !isRemixResponse(response) && response.headers.set("X-Remix-Response", "yes");
  return response;
}
const _self = self;
function createContext(event) {
  var _a, _b;
  const context = ((_b = (_a = entry.module).getLoadContext) == null ? void 0 : _b.call(_a, event)) || {};
  return {
    event,
    fetchFromServer: () => fetch(event.request.clone()),
    // NOTE: we want the user to override the above properties if needed.
    ...context
  };
}
const defaultHandler = entry.module.defaultFetchHandler || ((event) => fetch(event.request.clone()));
const defaultErrorHandler = entry.module.errorHandler || ((error, { request }) => {
  if (!request.signal.aborted) {
    console.error(error);
  }
});
_self.__workerManifest = {
  // Re-publishing this. Somehow it's not available as `latest`
  assets,
  routes
};
_self.addEventListener(
  "fetch",
  (event) => {
    const response = handleRequest({
      event,
      routes,
      defaultHandler,
      errorHandler: defaultErrorHandler,
      loadContext: createContext(event)
    });
    return event.respondWith(response);
  }
);
