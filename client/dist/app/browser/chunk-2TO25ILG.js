import{$a as l,Na as c,Sa as a,Ya as u,ab as d,bb as m,db as g,q as n,t as s}from"./chunk-UK3JTJHV.js";var y=(()=>{class i extends l{constructor(e,t,o,h,p){super({name:"user"},e,t,o,h),this._router=p,this.roles=(a.roles||[]).concat(["admin"]),this.employees=a.roles||[],this.mode="",this.users=this.getDocs(),this.user=localStorage.getItem("waw_user")?JSON.parse(localStorage.getItem("waw_user")):this.new(),this._changingPassword=!1,this.store=t,this.http=e,this.alert=o,this.core=h,this.fetch({},{name:"me"}).subscribe(r=>{r?(!localStorage.getItem("waw_user")&&this._router.url==="/sign"&&this._router.navigateByUrl("/profile"),this.setUser(r),this.get()):localStorage.getItem("waw_user")&&this.logout()}),this.store.get("mode",r=>{r&&this.setMode(r)})}setMode(e=""){e?(this.store.set("mode",e),document.body.parentNode.classList.add(e)):(this.store.remove("mode"),document.body.parentNode.classList.remove("dark")),this.mode=e}setUser(e){this.user=e,localStorage.setItem("waw_user",JSON.stringify(e)),this.core.complete("us.user")}role(e){return!!(this.user?.is||{})[e]}updateMe(){this.setUser(this.user),this.update(this.user)}updateMeAfterWhile(){this.setUser(this.user),this.updateAfterWhile(this.user)}changePassword(e,t){this._changingPassword||(this._changingPassword=!0,this.http.post("/api/user/changePassword",{newPass:t,oldPass:e},o=>{this._changingPassword=!1,o?this.alert.info({text:"Successfully changed password"}):this.alert.error({text:"Incorrect current password"})}))}logout(){this.user=this.new(),localStorage.removeItem("waw_user"),this.http.remove("token"),this.http.get("/api/user/logout"),this._router.navigateByUrl("/sign"),setTimeout(()=>{location.reload()},100)}updateAdmin(e){this.update(e,{name:"admin"})}deleteAdmin(e){this.delete(e,{name:"admin"})}static{this.\u0275fac=function(t){return new(t||i)(s(m),s(d),s(g),s(u),s(c))}}static{this.\u0275prov=n({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();export{y as a};