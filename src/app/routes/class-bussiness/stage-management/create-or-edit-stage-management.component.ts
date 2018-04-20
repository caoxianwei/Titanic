import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { TeacherService } from '@core/common/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logger } from 'angular2-logger/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'create-or-edit-stage-management',
    templateUrl: './create-or-edit-stage-management.component.html'
})
export class CreateOrEditStageManagementComponent implements OnInit {
    loading = false;
    @Input() obj: any;
    constructor(
        private subject: NzModalSubject,
        private fb: FormBuilder,
        private msg: NzMessageService,
        private teacherService: TeacherService,
        private datePipe: DatePipe,
        private log: Logger) { }
    form: FormGroup;
    initValidator() {
        this.form = this.fb.group({
            title: [null, [Validators.required]],
            detail: [null, [Validators.required]],
            startTime: [null, [Validators.required]],
            endTime: [null, [Validators.required]],
        });
        this.form.setValue({
            title: this.obj ? this.obj.project_name : '',
            detail: this.obj ? this.obj.project_detail : '',
            startTime: this.obj ? this.obj.starttime_at : '',
            endTime: this.obj ? this.obj.endtime_at : '',
        });
    }
    ngOnInit() {
        this.initValidator();
    }
    cancel() {
        this.subject.destroy();
    }
    save() {
        const result = {};
        result['finished'] = true;
        result['Project_Name'] = this.form.value.title;
        result['Project_Detail'] = this.form.value.detail;
        result['startime_at'] = this.datePipe.transform(new Date(this.form.value.startTime), 'yyyy-MM-dd HH:mm:ss');
        result['endtime_at'] = this.datePipe.transform(new Date(this.form.value.endTime), 'yyyy-MM-dd HH:mm:ss');
        this.subject.next(result);
        this.subject.destroy();
        this.msg.success('发布成功!');
    }
}
