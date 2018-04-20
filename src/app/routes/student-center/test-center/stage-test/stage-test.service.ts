import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class StageTestService {
    baseURL = 'http://120.78.212.113:81/';
    constructor(
        private httpClient: HttpClient
    ) {
    }
    /**
     * 获取阶段测试试题
     * @param id 测试记录id
     */
    getStageTestQestions(id): any {
        return this.httpClient.get(this.baseURL + 'api/intesting/show/' + id);
    }
    /**
     * 
     * @param intest_id 测试记录id
     * @param choice_reply 选择题测试情况
     * @param judgment_reply 判断题测试情况
     */
    submitStageTest(intest_id, choice_reply, judgment_reply) {
        const params = new HttpParams()
            .set('intest_id', intest_id)
            .set('choice_reply', choice_reply)
            .set('judgment_reply', judgment_reply);
        return this.httpClient.post(this.baseURL + 'api/intesting/submit', params);
    }
    /**
     * 提交答辩试题结果
     * @param id 阶段测试id
     * @param project 项目路径
     * @param file 文档路径
     */
    submitStageTestProject(id, project, file, formData) {
        const params = new HttpParams()
            .set('id', id)
            .set('project', project)
            .set('file', file);
        return this.httpClient.post(this.baseURL + 'api/intesting/debate', params, formData);
    }
}
