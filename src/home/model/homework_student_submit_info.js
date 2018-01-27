'use strict';
/**
 * model
 */
export default class extends think.model.base {
	/*homeworkSubmitId(id){
		return this.query("select count(*) as hisTotal from pre_homework_student_submit_info where student_id="+id+" and submit_time=0;");
	}*/
	// select id,student_id,publish_id,submit_time,inputtime,updatetime from pre_homework_student_submit_info where student_id=951;
// select work_time,work_name from pre_homework_publish where id=414;
///联合查询
// SELECT a.student_id,a.publish_id,submit_time,a.inputtime,a.updatetime,work_time,work_name  FROM pre_homework_student_submit_info  a LEFT JOIN pre_homework_publish b ON a.id=b.id WHERE a.student_id=951;
	homeworkPublishId(id){
		return this.query("select student_id,publish_id,submit_time,inputtime,updatetime from pre_homework_student_submit_info where student_id="+id+" and submit_time=0");
	}
	homeworkDetailId(id){
		return this.query("select FROM_UNIXTIME(work_time,'%m') as month,FROM_UNIXTIME(work_time,'%d') as day,work_name,work_type from pre_homework_publish where id="+id);
	}
}