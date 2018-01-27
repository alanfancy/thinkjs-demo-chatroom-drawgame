'use strict';
/**
 * model
 */
export default class extends think.model.base {
	sel(){
		return this.select();
	}
}