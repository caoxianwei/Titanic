import { Component, Inject, OnInit } from '@angular/core';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { Logger } from 'angular2-logger/core';
import { AdminService } from '../../admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { I18NService } from '@core/i18n/i18n.service';
@Component({
    templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {
    loading = false;
    form: FormGroup;
    constructor(
        private fb: FormBuilder,
        private msg: NzMessageService,
        private i18: I18NService,
        private subject: NzModalSubject,
        private service: AdminService,
        private log: Logger) {
    }
    initValidator() {
        this.form = this.fb.group({
            userId: [null, [Validators.required, Validators.minLength(5)]],
            name: [null, Validators.required],
            password: [null, [Validators.required, Validators.minLength(6)]],
            branch_id: [null],
            class_id: [null],
            role_id: [null]
        });
    }
    get userId() { return this.form.controls.userId; }
    get name() { return this.form.controls.name; }
    get password() { return this.form.controls.password; }
    get branch_id() { return this.form.controls.branch_id; }
    get class_id() { return this.form.controls.class_id; }
    get role_id() { return this.form.controls.role_id; }
    classInfo;
    roleInfo;
    branchInfo = [
        {
            id: 1,
            name: '文科'
        }, {
            id: 2,
            name: '理科'
        }
    ];
    userIdError = '至少5个字符';
    passwordError = '至少6个字符';
    ngOnInit() {
        this.loading = true;
        this.service.getClassList().subscribe((data: any) => {
            this.classInfo = data.class;
            this.roleInfo = data.role;
            this.loading = false;
        });
        if (this.i18.currentLang === 'en') {
            this.userIdError = 'At least 5 characters';
            this.passwordError = 'At least 6 characters';
        }
        this.initValidator();
    }
    cancel() {
        this.subject.destroy();
    }
    save() {
        this.loading = true;
        this.service.addUser(this.userId.value, this.name.value, this.password.value, this.branch_id.value, this.class_id.value, this.role_id.value).subscribe(() => { 
            const result = {};
            result['finished'] = true;
            this.subject.next(result);
            this.msg.success('保存成功!');
            this.subject.destroy();
        });
    }
}
