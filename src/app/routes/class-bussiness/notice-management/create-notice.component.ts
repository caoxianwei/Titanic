import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { NoticeManagementService } from './notice-management.service';
import { Logger } from 'angular2-logger/core';

@Component({
    templateUrl: './create-notice.component.html'
})
export class CreateNoticeComponent implements OnInit {
    loading = false;
    constructor(
        private subject: NzModalSubject,
        private msg: NzMessageService,
        private service: NoticeManagementService,
        private log: Logger) { }
    ngOnInit() {
    }
    cancel() {
        this.subject.destroy();
    }
    title;
    description;
    save() {
        this.loading = true;
        this.service.addNotice(this.title, this.description).subscribe(() => {
            this.msg.success('发布成功!');
            this.subject.next(true);
            this.subject.destroy();
        });
    }
}
