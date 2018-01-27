'use strict';
/**
 * model
 */
export default class extends think.model.base {
	sel(){
		return this.where({'id':8}).find();
	}
	selbyId(id){
		return this.where({'id':id}).find();
	}
}