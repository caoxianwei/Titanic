import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class NoticeListService {
    baseURL = 'http://120.78.212.113:81/';
    constructor(
        private httpClient: HttpClient
    ) {
    }
    /**
     * 获取全部消息通知
     */
    getNotices(): any {
        return this.httpClient.get(this.baseURL + 'api/message/index');
    }
}
