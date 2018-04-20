import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class StudentManagementService {
    baseURL = 'http://120.78.212.113:81/';
    constructor(
        private httpClient: HttpClient
    ) {
    }
    /**
     * 获取班主任的学生列表
     */
    getStudentList(): any {
        return this.httpClient.get(this.baseURL + 'api/headmaster/index');
    }
    /**
     * 获取事件类型选项
     */
    getEventOption(): any {
        return this.httpClient.get(this.baseURL + 'api/accident/choice');
    }
    /**
     * 查看特定学生的事件记录
     */
    getStudentEvent(id): any {
        return this.httpClient.get(this.baseURL + 'api/accident/' + id);
    }
    /**
     * 删除特定学生的事件记录
     */
    deleteStudentEvent(id): any {
        return this.httpClient.get(this.baseURL + 'api/accident/del/' + id);
    }
    /**
     * 添加特定学生的事件
     */
    addStudentEvent(id, Score_Type, Detail): any {
        const params = new HttpParams()
            .set('Score_Type', Score_Type)
            .set('Detail', Detail);
        return this.httpClient.post(this.baseURL + 'api/accident/' + id + '/add', params);
    }
    /**
     * 向学生发生消息
     * @param msg 消息内容
     * @param ids 发送目标群体
     */
    sendMessage(msg, ids): any {
        const params = new HttpParams()
            .set('Noids', ids)
            .set('msg', msg);
        return this.httpClient.post(this.baseURL + 'api/add_message', params);
    }
}
