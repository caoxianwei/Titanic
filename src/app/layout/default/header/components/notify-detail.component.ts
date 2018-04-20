import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { NotifyService } from './notify.service';
import { Logger } from 'angular2-logger/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { I18NService } from '@core/i18n/i18n.service';
@Component({
    templateUrl: './notify-detail.component.html'
})
export class NotifyDedetailComponent implements OnInit {
    loading = false;
    @Input() id: any;
    constructor(
        private subject: NzModalSubject,
        private service: NotifyService,
        private log: Logger) { }
    title;
    describe;
    date;
    projectDescription;
    ngOnInit() {
        this.loading = true;
        this.service.getNoticeDetail(this.id).subscribe((data: any) => {
            this.title = data.title;
            this.describe = data.description;
            this.date = data.datetime;
            this.loading = false;
            const result = {};
            result['finished'] = true;
            this.subject.next(result);
        });
    }
    cancel() {
        this.subject.destroy();
    }
}
