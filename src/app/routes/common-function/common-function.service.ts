import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class CommonFunctionService {
    baseURL = 'http://120.78.212.113:81/';
    constructor(
        private httpClient: HttpClient
    ) {
    }
    /**
     * 添加反馈信息
     * @param content 反馈内容
     * @param contact 联系方式
     */
    addFeedback(content, contact) {
        const params = new HttpParams()
            .set('content', content)
            .set('contact', contact);
        return this.httpClient.post(this.baseURL + 'api/feedback', params);
    }
    /**
     * 班主任或助教获取全部学生列表
     */
    getStudentList() {
        return this.httpClient.get(this.baseURL + 'api/headmaster/index');
    }
    /**
     * 讲师获取任教班级列表
     */
    getClassList() {
        return this.httpClient.get(this.baseURL + 'api/evaluation/front');
    }
    /**
     * 根据班级id获取学生列表
     * @param class_id 班级id
     */
    getStudentListByClass(class_id) {
        const params = new HttpParams()
            .set('class_id', class_id);
        return this.httpClient.post(this.baseURL + 'api/evaluation/choice', params);
    }
    /**
     * 添加评价信息
     * @param role_id 角色id 0为自评
     * @param morality 道德评分
     * @param citizen 行为素质
     * @param study 学习能力
     * @param cooperation 合作交际
     * @param sport 体育锻炼
     * @param Noid 对方学号
     * @param summary 总结
     * @param autograph 签名
     */
    addEvaluation(role_id, morality, citizen, study, cooperation, sport, Noid, summary, autograph) {
        const params = new HttpParams()
            .set('role_id', role_id)
            .set('morality', morality)
            .set('citizen', citizen)
            .set('study', study)
            .set('cooperation', cooperation)
            .set('sport', sport)
            .set('Noid', Noid)
            .set('summary', summary)
            .set('autograph', autograph);
        return this.httpClient.post(this.baseURL + 'api/evaluation/evaluating', params);
    }
}
