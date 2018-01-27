'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  /*indexAction(){
    //auto render template file index_index.html
    return this.display();
  }*/
  async __before(){
      /*let blankActions=['home'];
      if(blankActions.indexOf(this.http.action)){
        return;
      }*/
      let userinfo=await this.session('userinfo');
      console.log(userinfo);
      if(think.isEmpty(userinfo)){
         return this.redirect('/login')
      }
  }
  async indexAction(){
    this.assign({
      title:'首页',
      navType:"home"
    });
    let userinfo=await this.session('userinfo');
    if(userinfo){
        let useId=userinfo.stu_id;
    }else{
        // this.fail(3100,"userinfo","用户未登陆");
        return this.display();
    };
    return this.display();
  }
  worklistAction(){
    this.assign({
      title:'作业列表',
      navType:"worklist"
    });
    return this.display();
  }
  workdetailAction(){
    this.assign({
      title:'做作业',
      navType:"workdetail"
    });
    return this.display();
  }
  readingAction(){
    this.assign({
      title:'晨读',
      navType:"reading"
    });
    return this.display();
  }
}



    /*let model = this.model('article');
    let p1 = model.sel();
    let p2 = model.selbyId(9);
    let [p1Data, p2Data] = await Promise.all([p1, p2]);
    console.log(p1Data);
    console.log(p2Data);*/
    /*
    let submitModel = this.model('homework_student_submit_info');
    let submitTable=await submitModel.homeworkPublishId(useId);

    let p1Data = submitTable;

    p1Data.map(function(_this){
      if(_this.submit_time!=0) return;
      arrSql.push(submitModel.homeworkDetailId(_this.publish_id));
    });
    let arrData = await Promise.all(arrSql);
    */