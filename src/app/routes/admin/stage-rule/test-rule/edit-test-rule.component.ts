import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { AdminService } from '../../admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logger } from 'angular2-logger/core';

@Component({
    templateUrl: './edit-test-rule.component.html'
})
export class EditTestRuleComponent implements OnInit {
    loading = false;
    @Input() obj: any;
    constructor(
        private subject: NzModalSubject,
        private service: AdminService,
        private log: Logger) { }
    choice_count;
    choice_rate;
    judge_count;
    judge_rate;
    completion_count;
    completion_rate;
    answer_count;
    answer_rate;
    project_rate;
    ngOnInit() {
        this.loading = true;
        this.choice_count = this.obj.choice_count;
        this.choice_rate = Math.round(this.obj.choice_rate * 100);
        this.judge_count = this.obj.judge_count;
        this.judge_rate = Math.round(this.obj.judge_rate * 100);
        this.completion_count = this.obj.completion_count;
        this.completion_rate = Math.round(this.obj.completion_rate * 100);
        this.answer_count = this.obj.answer_count;
        this.answer_rate = Math.round(this.obj.answer_rate * 100);
        this.project_rate = Math.round(this.obj.project_rate * 100);
        this.loading = false;
    }
    cancel() {
        this.subject.destroy();
    }
    save() {
        this.loading = true;
        this.service.updateStageTestRule(this.obj.id, this.choice_count, this.choice_rate, this.judge_count, this.judge_rate, this.completion_count, this.completion_rate, this.answer_count, this.answer_rate, this.project_rate).subscribe(() => {
            const result = {};
            result['finish'] = true;
            this.subject.next(result); // 通知主页面,已完成测试
            this.subject.destroy();
        });
    }
}
