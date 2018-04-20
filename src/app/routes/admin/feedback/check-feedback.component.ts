import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { AdminService } from '../admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logger } from 'angular2-logger/core';

@Component({
    templateUrl: './check-feedback.component.html'
})
export class CheckFeedbackComponent implements OnInit {
    loading = false;
    @Input() id: any;
    constructor(
        private subject: NzModalSubject,
        private service: AdminService,
        private log: Logger) { }
    content;
    contact;
    user_id;
    name;
    created_at;
    ngOnInit() {
        this.service.getFeedbackDetail(this.id).subscribe((data: any) => {
            this.content = data.content;
            this.contact = data.contact;
            this.name = data.name;
            this.user_id = data.user_id;
            this.created_at = data.created_at;
            const result = {};
            result['finish'] = true;
            this.subject.next(result);
        });
    }
}
