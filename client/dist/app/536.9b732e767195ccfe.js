"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[536],{6536:(J,_,a)=>{a.r(_),a.d(_,{FormsModule:()=>Z});var n=a(8256),p=a(722),d=a(6895),l=a(433);function g(o,c){if(1&o&&(n.TgZ(0,"option",14),n._uU(1),n.qZA()),2&o){const t=c.$implicit;n.Q6J("value",t),n.xp6(1),n.hij(" ",t," ")}}function f(o,c){if(1&o&&(n.TgZ(0,"option",14),n._uU(1),n.qZA()),2&o){const t=c.$implicit;n.Q6J("value",t.name),n.xp6(1),n.hij(" ",t.name," ")}}function u(o,c){if(1&o){const t=n.EpF();n.TgZ(0,"div")(1,"label",17)(2,"span"),n._uU(3),n.qZA(),n.TgZ(4,"input",22),n.NdJ("ngModelChange",function(r){const m=n.CHM(t).$implicit;return n.KtG(m.value=r)}),n.qZA()()()}if(2&o){const t=c.$implicit;n.xp6(3),n.Oqu(t.name),n.xp6(1),n.Q6J("ngModel",t.value)}}function C(o,c){if(1&o){const t=n.EpF();n.TgZ(0,"div",15)(1,"span",16),n._uU(2),n.qZA(),n.TgZ(3,"label",17)(4,"span"),n._uU(5,"key"),n.qZA(),n.TgZ(6,"input",18),n.NdJ("ngModelChange",function(r){const m=n.CHM(t).$implicit;return n.KtG(m.key=r)}),n.qZA()(),n.YNc(7,u,5,2,"div",19),n.TgZ(8,"div",20)(9,"button",21),n.NdJ("click",function(){const i=n.CHM(t).index,m=n.oxw();return n.KtG(m.form.components.splice(i,1))}),n._uU(10,"remove"),n.qZA()()()}if(2&o){const t=c.$implicit;n.xp6(2),n.Oqu(t.name),n.xp6(4),n.Q6J("ngModel",t.key),n.xp6(1),n.Q6J("ngForOf",t.fields)}}function M(o,c){if(1&o){const t=n.EpF();n.TgZ(0,"button",23),n.NdJ("click",function(){n.CHM(t);const r=n.oxw();return r.fs.create(r.form),n.KtG(r.close())}),n._uU(1," Create "),n.qZA()}}function h(o,c){if(1&o){const t=n.EpF();n.TgZ(0,"button",24),n.NdJ("click",function(){n.CHM(t);const r=n.oxw();return r.fs.save(r.form),n.KtG(r.close())}),n._uU(1," Update "),n.qZA()}}let s=(()=>{class o{constructor(t){this.fs=t,this.form=this.fs.new(),this.addComponent=""}addField(){const t=this.fs.components.filter(e=>e.name===this.addComponent)[0];this.form.components.push({name:t.name,fields:t.fields.map(e=>({name:e,value:""}))})}}return o.\u0275fac=function(t){return new(t||o)(n.Y36(p.o))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-mutate-form"]],decls:18,vars:9,consts:[[1,"form__wrap"],[1,"form__row"],[1,"form__input"],["type","text","name","formTitle","placeholder","Enter name",3,"ngModel","ngModelChange"],[1,"form__select"],["placeholder","Choose smt.",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],[1,"form__select","form__select--margin"],[1,"form__btn","form__btn--add",3,"disabled","click"],[1,"form__add-list"],["class","form__add",4,"ngFor","ngForOf"],[1,"form__btns"],["class","form__btn form__btn--create",3,"click",4,"ngIf"],["class","form__btn",3,"click",4,"ngIf"],[3,"value"],[1,"form__add"],[1,"form__add-title"],[1,"form__add-label"],["name","componentKey","type","text",3,"ngModel","ngModelChange"],[4,"ngFor","ngForOf"],[1,"form__add-btn"],[3,"click"],["name","componentValue","type","text",3,"ngModel","ngModelChange"],[1,"form__btn","form__btn--create",3,"click"],[1,"form__btn",3,"click"]],template:function(t,e){1&t&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"input",3),n.NdJ("ngModelChange",function(i){return e.form.title=i}),n.qZA()(),n.TgZ(4,"div",4)(5,"select",5),n.NdJ("ngModelChange",function(i){return e.form.formId=i}),n.YNc(6,g,2,2,"option",6),n.qZA()()(),n.TgZ(7,"div",1)(8,"div",7)(9,"select",5),n.NdJ("ngModelChange",function(i){return e.addComponent=i}),n.YNc(10,f,2,2,"option",6),n.qZA()(),n.TgZ(11,"button",8),n.NdJ("click",function(){return e.addField()}),n._uU(12," Add "),n.qZA()(),n.TgZ(13,"div",9),n.YNc(14,C,11,3,"div",10),n.qZA(),n.TgZ(15,"div",11),n.YNc(16,M,2,0,"button",12),n.YNc(17,h,2,0,"button",13),n.qZA()()),2&t&&(n.xp6(3),n.Q6J("ngModel",e.form.title),n.xp6(2),n.Q6J("ngModel",e.form.formId),n.xp6(1),n.Q6J("ngForOf",e.fs.formIds),n.xp6(3),n.Q6J("ngModel",e.addComponent),n.xp6(1),n.Q6J("ngForOf",e.fs.components),n.xp6(1),n.Q6J("disabled",!e.addComponent),n.xp6(3),n.Q6J("ngForOf",e.form.components),n.xp6(2),n.Q6J("ngIf",!e.form._id),n.xp6(1),n.Q6J("ngIf",e.form._id))},dependencies:[d.sg,d.O5,l.YN,l.Kr,l.Fj,l.EJ,l.JJ,l.On],styles:[".form__wrap[_ngcontent-%COMP%]{display:flex;flex-flow:row wrap;justify-content:center}.form__input[_ngcontent-%COMP%]{margin-right:13px;max-width:350px;width:100%}.form__input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{padding:10px 20px;border-radius:15px;border:2px solid var(--c-blue);height:100%;width:100%}.form__row[_ngcontent-%COMP%]{margin-bottom:15px;flex:0 0 100%;display:flex;justify-content:center}.form__row[_ngcontent-%COMP%]:last-child{margin-bottom:0}.form__select[_ngcontent-%COMP%]{max-width:350px;width:100%}.form__select--margin[_ngcontent-%COMP%]{margin-right:13px}.form__select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{padding:10px 20px;border-radius:15px;border:2px solid var(--c-blue);width:100%}.form__btns[_ngcontent-%COMP%]{flex:0 0 100%;text-align:center}.form__btn[_ngcontent-%COMP%]{max-width:715px;width:100%;border-radius:16px;border:none;background:var(--c-blue);color:#fff;cursor:pointer;transition:all .3s;height:49px}.form__btn[_ngcontent-%COMP%]:hover{background-color:#295c86}.form__btn[_ngcontent-%COMP%]:disabled{color:#ffffff80;background:#4a7ba4}.form__btn--add[_ngcontent-%COMP%]{max-width:350px}.form__add[_ngcontent-%COMP%]{flex:0 0 33.333%;max-width:33.333%;display:flex;flex-flow:column wrap;padding:0 10px;margin-bottom:15px}.form__add-title[_ngcontent-%COMP%]{font-weight:600;color:var(--c-blue);padding-bottom:5px}.form__add-list[_ngcontent-%COMP%]{display:flex;flex-flow:row wrap;margin:10px 0 20px;flex:0 0 100%;max-width:715px;overflow-y:scroll;max-height:230px}.form__add-label[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap}.form__add-label[_ngcontent-%COMP%]:first-child{margin-bottom:5px}.form__add-label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{padding:10px 20px;border-radius:8px;border:2px solid var(--c-blue);width:100%}.form__add-btn[_ngcontent-%COMP%]{padding-top:10px}.form__add-btn[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;height:42px;border-radius:8px;border:none;background:var(--c-blue);color:#fff;cursor:pointer;transition:all .3s}.form__add-btn[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#295c86}@media screen and (max-width: 991px){.form__add[_ngcontent-%COMP%]{flex:0 0 50%;max-width:50%}}@media screen and (max-width: 479px){.form__add[_ngcontent-%COMP%]{flex:0 0 100%;max-width:100%;padding:0}.form__select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .form__input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{padding:5px 20px}.form__btn[_ngcontent-%COMP%]{height:39px;padding:11px 0}.form__add-label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{padding:8px 20px}.form__add-label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:14px}.form__add-btn[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:38px}}"]}),o})();var x=a(7208),b=a(2366),O=a(3289);function v(o,c){if(1&o&&n._uU(0),2&o){const t=c.$implicit;n.hij(" ",null==t.components?null:t.components.length," ")}}function P(o,c){if(1&o){const t=n.EpF();n.TgZ(0,"label",3)(1,"input",4),n.NdJ("ngModelChange",function(){const i=n.CHM(t).$implicit,m=n.oxw();return n.KtG(m.changeStatus(i))})("ngModelChange",function(r){const m=n.CHM(t).$implicit;return n.KtG(m.active=r)}),n.qZA(),n._UZ(2,"span",5),n.TgZ(3,"span",6),n._uU(4,"Active"),n.qZA()()}if(2&o){const t=c.$implicit;n.xp6(1),n.Q6J("ngModel",t.active)}}let F=(()=>{class o{constructor(t,e){this._fs=t,this._modal=e,this.columns=["title","components","formId","active"],this.config={create:()=>{this._modal.show({component:s})},update:r=>{this._modal.show({component:s,form:r})},delete:r=>{this._fs.delete(r)}}}get rows(){return this._fs.customForms}changeStatus(t){setTimeout(()=>{if(t.active)for(const e of this._fs.customForms)e._id===t._id||e.formId!==t.formId||e.active&&(e.active=!1,this._fs.save(e));this._fs.save(t)})}}return o.\u0275fac=function(t){return new(t||o)(n.Y36(p.o),n.Y36(x.Z7))},o.\u0275cmp=n.Xpm({type:o,selectors:[["ng-component"]],decls:3,vars:3,consts:[["title","Forms",3,"columns","config","rows"],["cell","components"],["cell","active"],[1,"container-box"],["type","checkbox",1,"w-input__checkbox",3,"ngModel","ngModelChange"],[1,"checkmark"],[1,"checkmark-text"]],template:function(t,e){1&t&&(n.TgZ(0,"wtable",0),n.YNc(1,v,1,1,"ng-template",1),n.YNc(2,P,5,1,"ng-template",2),n.qZA()),2&t&&n.Q6J("columns",e.columns)("config",e.config)("rows",e.rows)},dependencies:[l.Wl,l.JJ,l.On,b.a,O.Y0],styles:['.container-box[_ngcontent-%COMP%]{position:relative;display:flex}.container-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.checkmark[_ngcontent-%COMP%]{position:absolute;cursor:pointer;top:0;left:0;height:20px;width:20px;background-color:#12677a6e;border-radius:50%;transition:all .3s}.container-box[_ngcontent-%COMP%]:hover   input[_ngcontent-%COMP%] ~ .checkmark[_ngcontent-%COMP%]{background-color:#0f353d60}.container-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked ~ .checkmark[_ngcontent-%COMP%]{background-color:var(--c-blue)}.checkmark[_ngcontent-%COMP%]:after{content:"";position:absolute;display:none}.checkmark[_ngcontent-%COMP%]:before{content:"";position:absolute;display:none}.container-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked ~ .checkmark[_ngcontent-%COMP%]:after{display:block}.container-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked ~ .checkmark[_ngcontent-%COMP%]:before{display:block}.container-box[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%]:after{left:6px;top:46%;width:5px;height:10px;border:solid white;border-width:0 1.5px 1.5px 0;transform:rotate(45deg) translate(-50%,-50%)}.check[_ngcontent-%COMP%]{max-width:100px}.checkmark-text[_ngcontent-%COMP%]{margin-left:28px;display:block}']}),o})();var k=a(3968),w=a(7658);const T=[{path:"",component:F}];let Z=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=n.oAB({type:o}),o.\u0275inj=n.cJS({imports:[k.Bz.forChild(T),d.ez,l.u5,w.U]}),o})()}}]);