import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { NoticeManagementService } from './notice-management.service';
import { CreateNoticeComponent } from './create-notice.component';
import { Logger } from 'angular2-logger/core';
import { I18NService } from '@core/i18n/i18n.service';
@Component({
    templateUrl: './notice-management.component.html'
})
export class NoticeManagementComponent implements OnInit {
    constructor(
        private modal: NzModalService,
        private service: NoticeManagementService,
        private log: Logger,
        private msg: NzMessageService,
        private i18: I18NService) {
    }
    tableData = [];
    tableLoading = false;
    getTable() {
        this.tableLoading = true;
        this.service.getNotices().subscribe((data: any) => {
            this.tableData = data;
            this.tableLoading = false;
        });
    }
    create() {
        this.modal.open({
            wrapClassName: 'modal-md',
            content: CreateNoticeComponent,
            footer: false,
            maskClosable: false
        }).subscribe(result => {
            if (result === true) {
                this.getTable();
            }
        });
    }
    confirmText;
    ngOnInit() {
        if (this.i18.currentLang === 'zh-CN') {
            this.confirmText = '确认要删除吗?';
        } else if (this.i18.currentLang === 'zh-CN') {
            this.confirmText = 'wanna delete it?';
        }
        this.getTable();
    }
    delete(id: any) {
        this.service.deleteNotice(id).subscribe((data: any) => {
            if (data.code === 403) {
                this.msg.error('撤回失败,该消息发送时间已超过3分钟.');
            } else {
                this.getTable();
            }
        });
    }
}
