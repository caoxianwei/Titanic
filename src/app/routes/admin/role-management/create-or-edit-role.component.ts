import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { AdminService } from '../admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logger } from 'angular2-logger/core';

@Component({
    selector: 'create-or-edit-role',
    templateUrl: './create-or-edit-role.component.html'
})
export class CreateOrEditRoleComponent implements OnInit {
    loading = false;
    @Input() obj: any;
    constructor(
        private subject: NzModalSubject,
        private msg: NzMessageService,
        private service: AdminService,
        private fb: FormBuilder,
        private log: Logger) { }
    form: FormGroup;
    initValidator() {
        this.form = this.fb.group({
            name: [null, [Validators.required]],
        });
        this.form.setValue({
            name: this.obj ? this.obj.name : '',
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
        result['finish'] = true;
        result['name'] = this.form.value.name;
        this.subject.next(result);
        this.subject.destroy();
        this.msg.success('保存成功！');
    }
}
