import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { StudentService } from '@core/common/common.service';
import { Logger } from 'angular2-logger/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { I18NService } from '@core/i18n/i18n.service';
@Component({
    selector: 'do-homework',
    templateUrl: './do-homework.component.html'
})
export class DoHomeworkComponent implements OnInit {
    tip; // 答案候选提示文
    loading = false;
    @Input() obj: any;
    constructor(
        private subject: NzModalSubject,
        private studentService: StudentService,
        private i18: I18NService,
        private msg: NzMessageService,
        private fb: FormBuilder,
        private log: Logger) { }
    homeworkObj = {
        'task': {
            'id': 'init',
            'name': 'init',
            'starttime': 'init',
            'endtime': 'init',
            'content': 'init'
        },
        'status': 'init'
    };
    form: FormGroup;
    initValidator() {
        this.form = this.fb.group({
            title: [null],
            content: [null],
            startTime: [null],
            endTime: [null],
            answer: [null, [Validators.required]]
        });
        this.form.setValue({
            title: this.homeworkObj.task.name,
            content: this.homeworkObj.task.content,
            startTime: this.homeworkObj.task.starttime,
            endTime: this.homeworkObj.task.endtime,
            answer: ''
        });
    }
    ngOnInit() {
        this.log.log('打印从第一层页面传过来的obj');
        this.log.debug(this.obj);
        if (this.i18.currentLang === 'zh-CN') {
            this.tip = '请输入你想提交的答案';
        } else {
            this.tip = 'Please enter the answers you want to submit';
        }
        this.loading = true;
        this.studentService.getHomeworkDetails(this.obj.id).subscribe((data: any) => {
            this.homeworkObj = data;
            this.loading = false;
            this.initValidator();
        });
    }
    cancel() {
        this.subject.destroy();
    }
    save() {
        const result = {};
        result['finished'] = true;
        result['id'] = this.obj.id;
        result['answer'] = this.form.value.answer;
        this.subject.next(result);
        this.subject.destroy();
        this.msg.success('保存成功!');
        /* 
        result['finish'] = true;
        if (this.obj) {
            result['recordId'] = this.obj.id;
        } */
        /* result['title'] = this.form.value.title;
        result['content'] = this.form.value.content;
        result['startTime'] = this.form.value.startTime;
        result['endTime'] = this.form.value.endTime; */
        // this.log.debug(result);
        // this.subject.next(result); // 通知主页面,已完成测试
    }
}
