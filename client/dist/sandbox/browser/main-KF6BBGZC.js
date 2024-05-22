import{a as X,b as Y}from"./chunk-7SO5VYT4.js";import{a as O,b as V,c as B,d as U,e as L,f as H,g as c,h as $,i as z,j as q,k as G,l as W,m as Z,n as K,o as Q,p as ee}from"./chunk-HWALBNDX.js";import{l as J}from"./chunk-BDBREKTO.js";import"./chunk-D75ILFX5.js";import{Ab as S,Bb as D,Cb as A,Cc as j,Db as E,Ec as _,Fa as v,Gb as T,Pa as b,cb as w,hb as P,ja as g,ka as y,la as s,mb as x,qa as d,rb as R,rc as k,ta as a,u as h,ua as l,v as f,xa as C,xb as F,ya as M,yb as N,zb as I}from"./chunk-BF5C4A5R.js";var te=(()=>{let e=class e{constructor(t,r,n){this.httpClient=t,this.router=r,this.dialog=n}getNavs(){return[{label:"\u0421\u0444\u0435\u0440\u044B",description:"RxJs, NgRx",callback:()=>this.callbackSphere()},{label:"\u041C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440",description:"\u0412\u0435\u0431-\u0441\u043E\u043A\u0435\u0442\u044B",callback:()=>this.callbackMessenger()}]}callbackSphere(){this.router.navigateByUrl("spheres")}callbackMessenger(){h(this.httpClient.request("GET",$+"/rest/users")).then(t=>this.dialog.open(G,{data:t})).then(t=>f(t.afterClosed()).then(r=>this.router.navigateByUrl(`messenger/user/${r}/chat`)))}};e.\u0275fac=function(r){return new(r||e)(d(O),d(H),d(z))},e.\u0275prov=y({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();function pe(i,e){if(i&1){let o=E();S(0,"sb-card",0),T("action",function(){let n=C(o).$implicit;return M(n.callback())}),D()}if(i&2){let o=e.$implicit;R("title",o.label)}}var oe=(()=>{let e=class e{constructor(t){this.navCards=t.getNavs()}};e.\u0275fac=function(r){return new(r||e)(P(te))},e.\u0275cmp=a({type:e,selectors:[["sb-main-page"]],decls:2,vars:0,consts:[["actionLabel","\u041F\u0435\u0440\u0435\u0439\u0442\u0438",3,"title","action"],["actionLabel","\u041F\u0435\u0440\u0435\u0439\u0442\u0438",3,"title"]],template:function(r,n){r&1&&N(0,pe,1,1,"sb-card",1,F),r&2&&I(n.navCards)},dependencies:[q],styles:["[_nghost-%COMP%]{display:flex;justify-content:space-around;height:100%;flex-wrap:wrap;align-content:space-around}"],changeDetection:0});let i=e;return i})();var ue=[{path:"",component:oe},{path:"spheres",component:X,loadChildren:()=>import("./chunk-H55P7ACM.js").then(i=>i.SpheresModule)},{path:"messenger/user/:id/chat",component:W,loadChildren:()=>import("./chunk-3EEDXWZI.js").then(i=>i.MessengerModule)}],re=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=l({type:e}),e.\u0275inj=s({imports:[c.forRoot(ue),c]});let i=e;return i})();var ie=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275cmp=a({type:e,selectors:[["sb-nav-panel"]],decls:0,vars:0,template:function(r,n){},styles:["[_nghost-%COMP%]{display:block;color:#112d4e;background-color:#112d4e;min-height:48px}"],changeDetection:0});let i=e;return i})();var ne=(()=>{let e=class e{constructor(){this.title="sandbox";let t={arms:2,legs:2,head:{eyes:"dark",mouth:!0}},r={},n={arms:2,legs:2,head:{eyes:void 0,mouth:!0}};t.head.eyes!==null&&t.head.eyes!==void 0&&console.log(123),r?.head?.eyes&&console.log(r?.head?.eyes),n?.head?.eyes&&console.log(n?.head?.eyes)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275cmp=a({type:e,selectors:[["app-root"]],decls:2,vars:0,template:function(r,n){r&1&&A(0,"sb-nav-panel")(1,"router-outlet")},dependencies:[L,ie],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;flex:1}"]});let i=e;return i})();var se=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=l({type:e}),e.\u0275inj=s({imports:[_]});let i=e;return i})();var fe="@",p=class{constructor(e,o,t,r,n){this.doc=e,this.delegate=o,this.zone=t,this.animationType=r,this.moduleImpl=n,this._rendererFactoryPromise=null}loadImpl(){return(this.moduleImpl??import("./chunk-Z7A3YG6M.js")).catch(o=>{throw new g(5300,!1)}).then(({\u0275createEngine:o,\u0275AnimationRendererFactory:t})=>{let r=o(this.animationType,this.doc),n=new t(this.delegate,r,this.zone);return this.delegate=n,n})}createRenderer(e,o){let t=this.delegate.createRenderer(e,o);if(t.\u0275type===0)return t;typeof t.throwOnSyntheticProps=="boolean"&&(t.throwOnSyntheticProps=!1);let r=new u(t);return o?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(n=>{let me=n.createRenderer(e,o);r.use(me)}).catch(n=>{r.use(t)}),r}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}},u=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let o of this.replay)o(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,o){return this.delegate.createElement(e,o)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,o){this.delegate.appendChild(e,o)}insertBefore(e,o,t,r){this.delegate.insertBefore(e,o,t,r)}removeChild(e,o,t){this.delegate.removeChild(e,o,t)}selectRootElement(e,o){return this.delegate.selectRootElement(e,o)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,o,t,r){this.delegate.setAttribute(e,o,t,r)}removeAttribute(e,o,t){this.delegate.removeAttribute(e,o,t)}addClass(e,o){this.delegate.addClass(e,o)}removeClass(e,o){this.delegate.removeClass(e,o)}setStyle(e,o,t,r){this.delegate.setStyle(e,o,t,r)}removeStyle(e,o,t){this.delegate.removeStyle(e,o,t)}setProperty(e,o,t){this.shouldReplay(o)&&this.replay.push(r=>r.setProperty(e,o,t)),this.delegate.setProperty(e,o,t)}setValue(e,o){this.delegate.setValue(e,o)}listen(e,o,t){return this.shouldReplay(o)&&this.replay.push(r=>r.listen(e,o,t)),this.delegate.listen(e,o,t)}shouldReplay(e){return this.replay!==null&&e.startsWith(fe)}};function ae(i="animations"){return v([{provide:w,useFactory:(e,o,t)=>new p(e,o,t,i),deps:[k,V,x]},{provide:b,useValue:i==="noop"?"NoopAnimations":"BrowserAnimations"}])}var le=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=l({type:e,bootstrap:[ne]}),e.\u0275inj=s({providers:[ae(),{provide:j,useValue:{dateFormat:"HH:mm, dd.MM.yyyy"}}],imports:[U,re,Y,se,Z,ee,J.forRoot({}),K.forRoot([]),Q.forRoot()]});let i=e;return i})();B().bootstrapModule(le).catch(i=>console.error(i));