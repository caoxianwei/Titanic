import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { AdminService } from '../admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logger } from 'angular2-logger/core';

@Component({
    templateUrl: './create-or-edit-report-management.component-entran.html'
})
export class CreateOrEditReportManagementEntranComponent implements OnInit {
    loading = false;
    @Input() obj: any;
    @Input() prepareData: any;
    constructor(
        private subject: NzModalSubject,
        private service: AdminService,
        private log: Logger) { }
    major_id;
    characterlabel_id;
    majorlabel_id;
    branchlabel_id;
    content;
    ngOnInit() {
        this.loading = true;
        if (this.obj) {
            /* this.major_id = this.obj.major_id;
            this.characterlabel_id = this.obj.characterlabel_id;
            this.majorlabel_id = this.obj.majorlabel_id;
            this.branchlabel_id = this.obj.branchlabel_id; */
            this.content = this.obj.content;
        }
        this.loading = false;
    }
    cancel() {
        this.subject.destroy();
    }
    save() {
        this.loading = true;
        const result = {};
        result['finish'] = true;
        result['content'] = this.content;
        this.subject.next(result);
        this.subject.destroy();
    }
}
