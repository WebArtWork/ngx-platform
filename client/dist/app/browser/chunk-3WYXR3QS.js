import{e as $}from"./chunk-NXRWAXSA.js";import{$ as V,$a as U,A as p,Aa as W,C as T,Ca as j,Da as N,E as w,Ea as P,H as h,I as u,J as x,M as I,N as S,Na as D,O as F,Sa as E,W as g,Y as M,Ya as z,Z as A,Za as B,_ as L,_a as R,k as v,m as b,n as k,p as _,q as C,z as y}from"./chunk-HX6QBN7E.js";function G(m,n){if(m&1&&g(0),m&2){let a=n.$implicit;M(" ",a.components==null?null:a.components.length," ")}}function H(m,n){if(m&1){let a=I();h(0,"label",3)(1,"input",4),S("ngModelChange",function(){let o=_(a).$implicit,l=F();return C(l.changeStatus(o))}),V("ngModelChange",function(o){let l=_(a).$implicit;return L(l.active,o)||(l.active=o),C(o)}),u(),x(2,"span",5),h(3,"span",6),g(4,"Active"),u()()}if(m&2){let a=n.$implicit;y(),A("ngModel",a.active)}}var q=(()=>{let n=class n{get rows(){return this._cfs.customforms}constructor(s,o,l,d){this._translate=s,this._cfs=o,this._alert=l,this._form=d,this.columns=["formId","components","active"],this.form=this._form.getForm("form",{formId:"form",title:"Custom form",components:[{name:"Text",key:"title",focused:!0,fields:[{name:"Placeholder",value:"fill title"},{name:"Label",value:"Title"}]},{name:"Select",key:"formId",fields:[{name:"Placeholder",value:"Select form id"},{name:"Label",value:"Form ID"},{name:"Items",value:this._form.formIds}]}]}),this.components=[],this.formComponents=this._form.getForm("formComponents",{formId:"formComponents",title:"Custom components",components:[{components:this.components},{name:"Select",key:"addComponent",fields:[{name:"Placeholder",value:"Select form componnet"},{name:"Label",value:"Form Component"},{name:"Value",value:"name",skipTranslation:!0},{name:"Items",value:this._form.getTemplateComponentsNames()}]}]}),this.config={create:()=>{this._form.modal(this.form,{label:"Create",click:(t,i)=>{this._cfs.create(t,{callback:i.bind(this)})}}).then(this._cfs.create.bind(this))},update:t=>{this._form.modal(this.form,{label:"Update",click:(i,f)=>{this._cfs.update(i,{callback:f.bind(this)})}},t).then(this._cfs.update.bind(this))},delete:t=>{this._alert.question({text:this._translate.translate("Common.Are you sure you want to delete this user?"),buttons:[{text:this._translate.translate("Common.No")},{text:this._translate.translate("Common.Yes"),callback:()=>{this._cfs.delete(t)}}]})},buttons:[{icon:"text_fields",click:t=>{console.log(this.formComponents),this.components.splice(0,this.components.length);let i={addComponent:"Text"};t.components=t.components||[];for(let e=t.components.length-1;e>=0;e--){let r=this._form.getTemplateFields(t.components[e].name);t.components[e].fields=t.components[e].fields.filter(c=>r.includes(c.name));for(let c of r)t.components[e].fields.find(K=>K.name===c)||t.components[e].fields.push({value:"",name:c});i["key"+e]=t.components[e].key;for(let c of t.components[e].fields)i[c.name+e]=c.value}let f=e=>{this.components.splice(e,1),t.components.splice(e,1),this._cfs.updateAfterWhile(t)};(t.components||[]).forEach(e=>{this.components.push(this._addCustomComponent(e.name,this.components.length,f))}),this._form.modal(this.formComponents,{label:"Add component",click:()=>{let e=i.addComponent;this.components.push(this._addCustomComponent(e,this.components.length,f)),t.components.push({name:i.addComponent,fields:this._form.getTemplateFields(e).map(r=>({value:"",name:r}))})}},i,()=>{},{size:"big"}).then(()=>{for(let e=0;e<t.components.length;e++){t.components[e].key=i["key"+e];for(let r of t.components[e].fields)r.value=i[r.name+e]}this._cfs.updateAfterWhile(t)})}}]}}_addCustomComponent(s,o,l){let d=this._form.getTemplateFields(s).map(i=>({name:this._form.getCustomTemplateFields(s)[i]||"Text",key:i+o,fields:[{name:"Placeholder",value:"fill "+i},{name:"Label",value:i.charAt(0).toUpperCase()+i.slice(1,i.length)}]}));return{class:"d-f mt10",components:[{name:"Text",key:"key"+o,fields:[{name:"Placeholder",value:"fill key"},{name:"Label",value:"Key"}]},...d,{name:"Button",fields:[{name:"Label",value:"Remove"},{name:"Click",value:()=>{l(o)}}]}]}}changeStatus(s){setTimeout(()=>{if(s.active)for(let o of this._cfs.customforms)o._id===s._id||o.formId!==s.formId||o.active&&(o.active=!1,this._cfs.updateAfterWhile(o));this._cfs.updateAfterWhile(s)})}};n.\u0275fac=function(o){return new(o||n)(p(E),p(R),p(D),p(U))},n.\u0275cmp=b({type:n,selectors:[["ng-component"]],decls:3,vars:3,consts:[["title","Forms Customization",3,"columns","config","rows"],["cell","components"],["cell","active"],[1,"container-box"],["type","checkbox",1,"w-input__checkbox",3,"ngModelChange","ngModel"],[1,"checkmark"],[1,"checkmark-text"]],template:function(o,l){o&1&&(h(0,"wtable",0),T(1,G,1,1,"ng-template",1)(2,H,5,1,"ng-template",2),u()),o&2&&w("columns",l.columns)("config",l.config)("rows",l.rows)},dependencies:[j,N,P,B,z]});let m=n;return m})();var J=[{path:"",component:q}],le=(()=>{let n=class n{};n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=k({type:n}),n.\u0275inj=v({imports:[W.forChild(J),$]});let m=n;return m})();export{le as CustomformsModule};