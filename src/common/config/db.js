'use strict';
/**
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: 'mysql.sql17.eznowdata.com',//127.0.0.1
      port: '',
      database: 'sq_yongsheng',//qitian_data
      user: 'sq_yongsheng',
      password: 'yongsheng123',
      prefix: 'pre_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};