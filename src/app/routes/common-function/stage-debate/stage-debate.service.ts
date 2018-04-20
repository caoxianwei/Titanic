import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class StageDebateService {
    baseURL = 'http://120.78.212.113:81/';
    constructor(
        private httpClient: HttpClient
    ) {
    }
    /**
     * 提交答辩成绩
     * @param intest_id 测试id
     * @param Noid 学号
     * @param role_id 角色id
     * @param projectscore 源码分数
     * @param debatescore 答辩分数
     * @param filescore 报告分数
     */
    submitDebateScore(intest_id, Noid, role_id, projectscore, debatescore, filescore) {
        const params = new HttpParams()
            .set('Noid', Noid)
            .set('role_id', role_id)
            .set('projectscore', projectscore)
            .set('debatescore', debatescore)
            .set('filescore', filescore);
        return this.httpClient.post(this.baseURL + 'api/intest/defense/' + intest_id, params);
    }
    // 获取班级列表
    getClassList() {
        return this.httpClient.get(this.baseURL + 'api/intest/choice');
    }
    // 获取阶段测试列表
    getStageTestList(class_id) {
        return this.httpClient.get(this.baseURL + 'api/intest/choice?class_id=' + class_id);
    }
}
