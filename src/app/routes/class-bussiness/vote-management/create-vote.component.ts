import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { TeacherService } from '@core/common/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logger } from 'angular2-logger/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'create-vote-management',
    templateUrl: './create-vote.component.html'
})
export class CreateVoteComponent implements OnInit {
    loading = false;
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
            voteName: [null, [Validators.required]],
            maxVote: [null, [Validators.required]],
            startTime: [null, [Validators.required]],
            endTime: [null, [Validators.required]],
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
        result['MaxVote'] = this.form.value.maxVote;
        result['VoteName'] = this.form.value.voteName;
        result['startTime'] = this.datePipe.transform(new Date(this.form.value.startTime), 'yyyy-MM-dd HH:mm:ss');
        result['endTime'] = this.datePipe.transform(new Date(this.form.value.endTime), 'yyyy-MM-dd HH:mm:ss');
        this.subject.next(result);
        this.subject.destroy();
        this.msg.success('保存成功!');
    }
}



/* 
import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { TeacherService } from '@core/common/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logger } from 'angular2-logger/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'create-vote-management',
    templateUrl: './create-vote.component.html'
})
export class CreateVoteComponent implements OnInit {
    loading = false;
    constructor(
        private subject: NzModalSubject,
        private fb: FormBuilder,
        private teacherService: TeacherService,
        private datePipe: DatePipe,
        private log: Logger) { }
    maxVoteChange() {
        const _maxVote = this.obj.maxVote; // 前一刻的值
        setTimeout(() => {
            const reg = new RegExp('^[0-9]*$', 'g'); // 全角数字
            if (!reg.test(this.form.value.maxVote)) {
                this.obj.maxVote = _maxVote;
            }
            this.log.debug((reg.test(this.form.value.maxVote)));
        }, 1);
        // this.form.value.maxVote.reg
    }
    form: FormGroup;
    initValidator() {
        this.form = this.fb.group({
            voteName: [null, [Validators.required]],
            maxVote: [null, [Validators.required]],
            startTime: [null, [Validators.required]],
            endTime: [null, [Validators.required]],
        });
    }
    obj = {
        voteName: '',
        maxVote: '',
        startTime: '',
        endTime: ''
    };
    ngOnInit() {
        // this.initValidator();
    }
    cancel() {
        this.subject.destroy();
    }
    save() {
        const result = {};
        result['finished'] = true;
        result['MaxVote'] = this.form.value.maxVote;
        result['VoteName'] = this.form.value.voteName;
        result['startTime'] = this.datePipe.transform(new Date(this.form.value.startTime), 'yyyy-MM-dd hh-mm-ss');
        result['endTime'] = this.datePipe.transform(new Date(this.form.value.endTime), 'yyyy-MM-dd hh-mm-ss');
        this.subject.next(result);
        this.subject.destroy();
    }
}
 */
