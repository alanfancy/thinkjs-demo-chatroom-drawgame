'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  /**
   * index action logic
   * @return {} []
   */
  indexAction(){
   
  }
  loginvalidAction(){
  	let rules = {
  		mobile:{
  			required:true,
  			int:true,
  			length:11
  		},
  		password:{
  			required:true,
  			minLength:6,
  			maxLength:14,
  			alphaNumericDash:true
  		}
  	}
  	let flag = this.validate(rules);
    if(!flag){
      return this.fail("validate error", this.errors());
      //如果出错，返回值格式为：{"errno":1000,"errmsg":"validate error","data":{"mobile_number":"mobile_number need is a mobile phone number"}}
    }
  }
  signupvalidAction(){
  	let rules = {
  		mobile:{
  			required:true,
  			int:true,
  			length:11
  		},
  		password:{
  			required:true,
  			minLength:6,
  			maxLength:14,
  			alphaNumericDash:true
  		}
  	}
  	let flag = this.validate(rules);
    if(!flag){
      return this.fail("validate error", this.errors());
      //如果出错，返回值格式为：{"errno":1000,"errmsg":"validate error","data":{"mobile_number":"mobile_number need is a mobile phone number"}}
    }
  }
}