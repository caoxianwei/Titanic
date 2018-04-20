import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class NotifyService {
    baseURL = 'http://120.78.212.113:81/';
    constructor(
        private httpClient: HttpClient
    ) {
    }
    /**
     * 获取学生当前消息通知内容
     */
    getNotices(): any {
        return this.httpClient.get(this.baseURL + 'api/message/student/get');
    }
    /**
     * 获取具体消息的信息
     * @param id 消息id
     */
    getNoticeDetail(id): any {
        return this.httpClient.get(this.baseURL + 'api/message/show/' + id);
    }
}
