import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { BasicConfigurationService, CharacterTestService } from '@core/common/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logger } from 'angular2-logger/core';

@Component({
    selector: 'create-or-edit-homework-management',
    templateUrl: './create-or-edit-homework-management.component.html'
})
export class CreateOrEditHomeworkManagementComponent implements OnInit {
    loading = false;
    language: string;
    @Input() obj: any;
    constructor(
        private subject: NzModalSubject,
        private fb: FormBuilder,
        private characterTestService: CharacterTestService,
        private basicConfigurationService: BasicConfigurationService,
        private log: Logger) { }
    options = [];
    form: FormGroup;
    subIndex: any;
    initValidator() {
        this.form = this.fb.group({
            title: [null, [Validators.required]],
            content: [null, [Validators.required]],
            startTime: [null, [Validators.required]],
            endTime: [null, [Validators.required]],
        });
        this.form.setValue({
            title: this.obj ? this.obj.name : '',
            content: this.obj ? this.obj.content : '',
            startTime: this.obj ? this.obj.starttime : '',
            endTime: this.obj ? this.obj.endtime : '',
        });
    }
    ngOnInit() {
        this.language = this.basicConfigurationService.getCurrentLanguage();
        this.initValidator();
    }
    cancel() {
        this.subject.destroy();
    }
    save() {
        const result = {};
        result['finish'] = true;
        if (this.obj) {
            result['recordId'] = this.obj.id;
        }
        result['title'] = this.form.value.title;
        result['content'] = this.form.value.content;
        result['startTime'] = this.form.value.startTime;
        this.log.debug('this.form.value.startTime=' + this.form.value.startTime);
        result['endTime'] = this.form.value.endTime;
        // this.log.debug(result);
        this.subject.next(result); // 通知主页面,已完成测试
        /* this.log.log('打印保存信息');
        this.log.debug(this.teach_id);
        this.log.debug(this.form.value.title);
        this.log.debug(this.form.value.content);
        this.log.debug(this.form.value.startTime);
        this.log.debug(this.form.value.endTime); */
        // execute save
        // this.CharacterTestService.saveAnimalTest(this.obj);
        this.subject.destroy();
    }
}
