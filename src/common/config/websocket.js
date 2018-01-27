'use strict';
export default{
	on:true,
	type:'socket.io',
	allow_origin:"",
	sub_protocal: "",
	adp:undefined,
	path:"",
	messages:{
		open:"home/discuss/open",
		close:"home/discuss/close",
		adduser:"home/discuss/adduser",
		deletuser:"home/discuss/deletuser",
		sendmsg:"home/discuss/sendmsg",
		chat:"home/discuss/chat",
		myturn:"home/discuss/myturn",
		isMe:"home/discuss/isme",
		paitstart:"home/discuss/paitstart",
		paitmove:"home/discuss/paitmove",
		paitend:"home/discuss/paitend",
		uploadimg:"home/discuss/uploadimg",
	}
}