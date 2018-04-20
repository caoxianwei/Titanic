import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { AdminService } from '../admin.service';
import { Logger } from 'angular2-logger/core';
import { I18NService } from '@core/i18n/i18n.service';
import { CheckFeedbackComponent } from './check-feedback.component';
@Component({
    templateUrl: './feedback-index.component.html'
})
export class FeedbackIndexComponent implements OnInit {
    constructor(
        private modal: NzModalService,
        private service: AdminService,
        private log: Logger,
        private i18: I18NService) {
    }
    tableData = [];
    tablePageIndex = 1;
    tablePageSize = 10;
    tableTotal = 0;
    tableLoading = false;
    userId;
    getTableData() {
        this.tableLoading = true;
        this.service.getFeedbackList(this.userId, this.tablePageIndex, this.tablePageSize).subscribe((data: any) => {
            for (const key in data.data) {
                if (data.data.hasOwnProperty(key)) {
                    const element = data.data[key];
                    const content = element.content;
                    if (content.length > 7) {
                        element.content = element.content.substring(0, 7);
                        element.content += '...';
                    }
                }
            }
            this.tableData = data.data;
            this.tableTotal = data.count;
            this.tableLoading = false;
        });
    }
    check(id) {
        this.modal.open({
            wrapClassName: 'modal-md',
            content: CheckFeedbackComponent,
            footer: false,
            maskClosable: false,
            componentParams: {
                id: id
            }
        }).subscribe(result => {
            if (result['finish'] === true) {
                this.getTableData();
            }
        });
    }
    userIdTip;
    ngOnInit() {
        if (this.i18.currentLang === 'zh-CN') {
            this.userIdTip = '请输入学号/工号';
        } else if (this.i18.currentLang === 'en') {
            this.userIdTip = 'Please enter the Id';
        }
        this.getTableData();
    }
}
