'use strict';
import Base from './base.js';
let usernames = {};
let numUsers = 0;
export default class extends Base{
	//socket 对象
	//Action 里可以通过 this.http.socket 拿到当前的 socket 对象。
	//事件数据
	//Action 里可以通过 this.http.data 拿到发送过来事件的数据。
	async __before(){
      /*let blankActions=['home'];
      if(blankActions.indexOf(this.http.action)){
        return;
      }*/
      let userinfo=await this.session('userinfo');
      // console.log(userinfo);
      if(think.isEmpty(userinfo)){
         return this.redirect('/login')
      }
  	}
	discussAction(){
		this.assign({
	      title:'在线聊天',
	      navType:"discuss"
	    });
		return this.display();
	}
	//用户进入聊天室事件处理
	async openAction(self){
	    let socket = self.http.socket;
	    let userinfo=await this.session('userinfo');
	    if(think.isEmpty(userinfo)){
	    	return this.fail(4100,'用户未登陆',{name:'请先登陆'})
	    }
	    console.log(numUsers);
	    socket.username=userinfo.name;
	    usernames[userinfo.name]=userinfo.name;
	    numUsers++;
	    // console.log(numUsers);
	    // console.log(userinfo);
	    this.emit('useropen',{
	      username: socket.username,
	      numUsers: numUsers
	    });
	    this.broadcast("userjoin", {
	      username: socket.username,
	      numUsers: numUsers
	    });
	}
	//用户关闭聊天室事件处理
	closeAction(self){
		let socket = self.http.socket;
		if (socket.username) {
		  	delete usernames[socket.username];
		  	if(numUsers>0){
		  		numUsers--;
		  	}else{
		  		numUsers=0;
		  	}
		  	this.broadcast("userleave", {
		      username: socket.username,
		      numUsers: numUsers
		    });
		  }
	  }
	//用户发送消息事件处理
	async sendmsgAction(self){
		let socket=this.http.socket;
		let data=this.http.data;
		console.log("start:"+data);
		/*let userinfo=await this.session('userinfo');
		console.log('session:'+userinfo.name);
		console.log('socket:'+socket.username);*/
		 // socket.username = data.username;
		 // this.emit({message:data.message,username:data.username}, "showmessage");
		this.broadcast("showmessage",{message:data.message,username:socket.username},true);
	}
	adduserAction(self){
		/*let socket = self.http.socket;
	    let userinfo=await this.session('userinfo');
	    socket.username=userinfo.name;
	    usernames[userinfo.name]=userinfo.name;
	    ++numUsers;
	    // console.log(userinfo);
	    this.broadcast("userjoin", {
	      username: socket.username,
	      numUsers: numUsers
	    });*/
	}
	//消息广播
	chatAction(self){
		 let socket=self.http.socket;
		 let data=self.http.data;
		 // console.log(self.http.data);
		 this.broadcast("chat",{message:data.message,username:socket.username},true);
		//想包含当前的 socket，可以设置第三个参数值为 true。
	}
	//轮到本机时处理
	myturnAction(self){
		let socket=this.http.socket;
		//console.log(socket);
		this.emit('isme',{'turnname':usernames['管理员'],username:socket.username});
	}
	//开始绘制
	async paitstartAction(self){
		let socket=this.http.socket;
		let data=this.http.data;
		 //console.log("start:"+data.x+"-"+data.y);
		this.broadcast("sharepaitstart",data,false);
		this.emit('sharepaitstart',data);
	}
    //鼠标移动绘制
	paitmoveAction(self){
		let data=this.http.data;
		// console.log("move:"+data.x+"-"+data.y);
		this.broadcast("sharepaitmove",data,false);
		this.emit('sharepaitmove',data);
	}
	//绘制结束
	paitendAction(self){
		let data=this.http.data;
		// console.log("end:"+data.x+"-"+data.y);
		this.broadcast("sharepaitend",data,false);
		// this.emit('sharepaitend',data);
	}
	//上传图片
	async uploadimgAction(){
		let _imgdata=this.post();
		// console.log(_imgsrc);
		let model=this.model('imgpath');
		let data={img_src:_imgdata.src,name:_imgdata.name};
		let imgid=await model.thenAdd(data);
		return this.success(imgid);
	}
}