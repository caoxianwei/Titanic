import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class EnterCorrectService {
    baseURL = 'http://120.78.212.113:81/';
    constructor(
        private httpClient: HttpClient
    ) {
    }
    /**
     * 获取学生入学专业测试完成情况列表
     */
    getStudentList(): any {
        return this.httpClient.get(this.baseURL + 'api/EnTest/index_tea');
    }
    /**
     * 获取学生入学测评中的专业测评答案
     */
    getEnterTestProfessionAnswerOfStudent(id): any {
        return this.httpClient.get(this.baseURL + 'api/EnTest/Correct/' + id);
    }
    /**
     * 提交批改结果分数
     * @param id 学生Id
     * @param Com_Score 填空题分数
     * @param Ans_Score 简答题分数
     */
    submitEnterTest(id, Com_Score, Ans_Score): any {
        const params = new HttpParams()
            .set('Com_Score', Com_Score)
            .set('Ans_Score', Ans_Score);
        return this.httpClient.post(this.baseURL + 'api/EnTest/Corrected/' + id, params);
    }
    // /**
    //  * 获取事件类型选项
    //  */
    // getEventOption(): any {
    //     return this.httpClient.get(this.baseURL + 'api/accident/choice');
    // }
    // /**
    //  * 查看特定学生的事件记录
    //  */
    // getStudentEvent(id): any {
    //     return this.httpClient.get(this.baseURL + 'api/accident/' + id);
    // }
    // /**
    //  * 删除特定学生的事件记录
    //  */
    // deleteStudentEvent(id): any {
    //     return this.httpClient.get(this.baseURL + 'api/accident/del/' + id);
    // }
    // /**
    //  * 添加特定学生的事件
    //  */
    // addStudentEvent(id, Score_Type, Detail): any {
    //     const params = new HttpParams()
    //         .set('Score_Type', Score_Type)
    //         .set('Detail', Detail);
    //     return this.httpClient.post(this.baseURL + 'api/accident/' + id + '/add', params);
    // }
}
