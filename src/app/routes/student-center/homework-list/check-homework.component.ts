import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { StudentService } from '@core/common/common.service';
import { Logger } from 'angular2-logger/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { I18NService } from '@core/i18n/i18n.service';
@Component({
    selector: 'check-homework',
    templateUrl: './check-homework.component.html'
})
export class CheckHomeworkComponent implements OnInit {
    loading = false;
    @Input() obj: any;
    constructor(
        private subject: NzModalSubject,
        private studentService: StudentService,
        private fb: FormBuilder,
        private i18: I18NService,
        private log: Logger) { }
    homeworkObj = {
        'answer': 'init',
        'comment': 'init',
        'score': 'init',
        'status': 'init'
    };
    form: FormGroup;
    initValidator() {
        this.form = this.fb.group({
            answer: [null],
            comment: [null],
            score: [null]
        });
        this.form.setValue({
            answer: this.homeworkObj.answer,
            comment: this.homeworkObj.comment,
            score: this.homeworkObj.score
        });
    }
    whetherSubmit: Boolean;
    hasNotSubmit = {}; // 用来显示[尚未提交]的配置
    ngOnInit() {
        this.log.log('打印从第一层页面传过来的obj');
        this.log.debug(this.obj);
        this.loading = true;
        if (this.i18.currentLang === 'zh-CN') {
            this.hasNotSubmit = {
                title: '尚未提交!',
                description: '请提交作业后再进行查看!'
            };
        } else if (this.i18.currentLang === 'en') {
            this.hasNotSubmit = {
                title: 'Not submitted!',
                description: 'Please submit your homework and check it again!'
            };
        }
        this.studentService.getHomeweorkScore(this.obj.id).subscribe((data: any) => {
            if (data.code === 403) {
                this.log.log('尚未批改');
                this.whetherSubmit = true;
            } else {
                this.whetherSubmit = false;
                this.homeworkObj = data[0];
                this.initValidator();
            }
            this.loading = false;
        });
    }
}
