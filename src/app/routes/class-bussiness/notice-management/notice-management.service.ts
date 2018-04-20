import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class NoticeManagementService {
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
    /**
     * 发布通知
     * @param title 标题
     * @param description 描述
     */
    addNotice(title, description) {
        const params = new HttpParams()
            .set('title', title)
            .set('description', description);
        return this.httpClient.post(this.baseURL + 'api/add_message', params);
    }
    /**
     * 删除通知
     * @param id 要删除的通知id
     */
    deleteNotice(id): any {
        return this.httpClient.get(this.baseURL + 'api/message/recall/' + id);
    }
}
