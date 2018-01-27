'use strict';
import Base from './base.js';
import captchapng from './captchapng.js';
/*let captchapng=require('captchapng')
think.middleware('captchapng',captchapng);*/
export default class extends Base{
	loginAction(){
		this.assign({
			title:'登陆',
			navType:"login",
		});
		return this.display();
	}
	async loginvalidAction(){
		//如果是get请求，直接显示登录页面
	    if(this.isGet()){
	      return this.display();
	    }
		let _userdata=this.post();
		// let md5 = think.md5('think_' + _userdata.password);
		let model=this.model("user_info");
		let result=await model.field('mobile,name').where({mobile:_userdata.mobile,password:_userdata.password}).find();
		// console.log(result);
		if(think.isEmpty(result)){
			return this.fail(2100,'mobile',{mobile:'用户名或密码有误'});
		}
		await this.session("userinfo", result);
		return this.success('登陆成功');
	}
	signupAction(){
		this.assign({
			title:'注册',
			navType:"signup"
		});
		return this.display();
	}
	async signupvalidAction(){
		/*if(!this.isCli()){//禁止 URL 访问该 Action
	      this.fail("页面禁止访问");
	    }*/
	    //如果是get请求，直接显示登录页面
	    if(this.isGet()){
	      return this.display();
	    }
		let _userdata = this.post();
		if(think.isEmpty(_userdata)){////判断是否为空值
			return this.fail(1100,'isEmpty',{isEmpty:'数据不能为空'});
		}
		// let md5=think.md5('think_'+_userdata.password);///md5加密

		let _vode=await this.session("vcode");///获取验证码
		// console.log(_vode);
		// console.log(_userdata.vcode);
		if(_userdata.vcode!=_vode || _vode==undefined){
			// return this.fail('验证码错误');
			return this.fail(1200,'_userdata.vcode',{vcode:'验证码有误'});
		};
		let model=this.model("user_info");
		//{phone:_userdata.mobile,name:_userdata.name,password:md5}
		let userId=await model.thenAdd(_userdata,{mobile:_userdata.mobile});
		if(userId.type=="exist"){
			return this.fail(1300,'mobile',{mobile:'该号码已注册'});
		}
		return this.success(userId);
	}
	async imgcodeAction(){
		/*let s1=Math.round(Math.random()*10);
	    let s2=Math.round(Math.random()*10);
	    let codenum=s1+s2;
	    await this.session("mathcode", codenum);
	    let _vcode=s1+"+"+s2+"?";*/
	    let _vcode=parseInt(Math.random()*9000+1000);
	    await this.session('vcode', _vcode);
	    let p = new captchapng(120,50,_vcode); 
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

        let img = p.getBase64();
        let imgbase64 = new Buffer(img,'base64');
		this.type('image/png');
		this.end(imgbase64);
	}
}