import{a as j}from"./chunk-O6DR7SXX.js";import{b as F,e as L}from"./chunk-ZYREBFW7.js";import{$ as _,Aa as k,G as m,H as r,K as S,L as w,Ma as y,O as C,Q as c,Qa as b,U as n,V as o,Z as d,_ as a,ab as I,bb as x,cb as E,fb as M,ga as f,hb as P,qb as T,r as v,rb as V,w as p,x as h}from"./chunk-SF5YNM2B.js";function A(t,U){if(t&1){let e=d();n(0,"span",8),a("click",function(){p(e);let i=_();return h(i.us.setMode("dark"))}),f(1," dark_mode "),o()}}function J(t,U){if(t&1){let e=d();n(0,"span",8),a("click",function(){p(e);let i=_();return h(i.us.setMode())}),f(1," light_mode "),o()}}var N=(()=>{class t{constructor(e,s,i,u,q,B,D,H){this.us=e,this.ui=s,this._alert=i,this._http=u,this._hash=q,this._router=B,this._form=D,this._translate=H,this.form=this._form.getForm("sign",{formId:"sign",title:"Sign In / Sign Up",components:[{name:"Email",key:"email",focused:!0,required:!0,fields:[{name:"Placeholder",value:"Enter your email"},{name:"Label",value:"Email"}]},{name:"Password",key:"password",required:!0,fields:[{name:"Placeholder",value:"Enter your password"},{name:"Label",value:"Password"}]},{name:"Number",key:"resetPin",fields:[{name:"Placeholder",value:"Enter code from email"},{name:"Label",value:"code"}],hidden:!0},{name:"Button",fields:[{name:"Label",value:"Let's go"},{name:"Submit",value:!0},{name:"Click",value:()=>{this.submit()}}]}]}),this.user={email:"ceo@webart.work",password:"asdasdasdasd",resetPin:null},this._set=l=>{if(l){let g=l.token||"";g&&this._http.set("token",g),localStorage.setItem("waw_user",JSON.stringify(l)),this.us.setUser(l),this.us.get(),this._router.navigateByUrl("/profile")}else this._alert.error({text:"Something went wrong"})}}submit(){!this.form.components[2].hidden&&this.user.resetPin?this.save():this.user.email||this._alert.error({text:this._translate.translate("Sign.Enter your email")}),this.ui.valid(this.user.email)?this.user.password?(this._hash.set("email",this.user.email),this._http.post("/api/user/status",this.user,e=>{e.email&&e.pass?this.login():e.email?this.reset():this.sign()})):this._alert.error({text:this._translate.translate("Sign.Enter your password")}):this._alert.error({text:this._translate.translate("Sign.Enter proper email")})}login(){this._http.post("/api/user/login",this.user,this._set.bind(this))}sign(){this._http.post("/api/user/sign",this.user,this._set.bind(this))}reset(){this._http.post("/api/user/request",this.user,()=>{this.form.components[2].hidden=!1}),this._alert.info({text:"Mail will sent to your email"})}save(){this._http.post("/api/user/change",this.user,e=>{e?this._alert.info({text:"Password successfully changed"}):this._alert.error({text:"Wrong Code"}),this.login()})}static{this.\u0275fac=function(s){return new(s||t)(r(j),r(M),r(E),r(I),r(x),r(y),r(T),r(P))}}static{this.\u0275cmp=S({type:t,selectors:[["ng-component"]],standalone:!1,decls:9,vars:4,consts:[[1,"auth-wrapper"],[1,"auth__wrap"],[1,"auth__img"],[3,"click"],[1,"auth__form"],[1,"auth"],["class","material-icons auth__icon",3,"click",4,"ngIf"],[3,"wSubmit","submition","config"],[1,"material-icons","auth__icon",3,"click"]],template:function(s,i){s&1&&(n(0,"div",0)(1,"div",1)(2,"div",2)(3,"icon-spider",3),a("click",function(){return i.us.setMode(i.us.mode?"":"dark")}),o()(),n(4,"div",4)(5,"div",5),C(6,A,2,0,"span",6)(7,J,2,0,"span",6),n(8,"wform",7),a("wSubmit",function(){return i.submit()}),o()()()()()),s&2&&(m(6),c("ngIf",!i.us.mode),m(),c("ngIf",i.us.mode),m(),c("submition",i.user)("config",i.form))},dependencies:[k,V,F],encapsulation:2})}}return t})();var O=[{path:"",component:N}],se=(()=>{class t{static{this.\u0275fac=function(s){return new(s||t)}}static{this.\u0275mod=w({type:t})}static{this.\u0275inj=v({imports:[b.forChild(O),L]})}}return t})();export{se as SignModule};
