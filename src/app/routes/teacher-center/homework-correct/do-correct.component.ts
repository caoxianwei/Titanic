import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { TeacherService } from '@core/common/common.service';
import { Logger } from 'angular2-logger/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
    selector: 'do-correct',
    templateUrl: './do-correct.component.html'
})
export class DoCorrectComponent implements OnInit {
    tip; // 答案候选提示文
    loading = false;
    @Input() obj: any;
    constructor(
        private subject: NzModalSubject,
        private teacherService: TeacherService,
        private fb: FormBuilder,
        private log: Logger) { }
    homeworkObj = {
        'id': 'init',
        'task_id': 'init',
        'user_id': 'init',
        'answer': 'init',
        'comment': 'init',
        'score': 'init',
        'status': 'init',
        'Noid': 'init',
        'name': 'init'
    };
    form: FormGroup;
    initValidator() {
        this.form = this.fb.group({
            name: [null],
            answer: [null],
            score: [null, [Validators.required]],
            comment: [null, [Validators.required]]
        });
        this.form.setValue({
            name: this.homeworkObj.name,
            answer: this.homeworkObj.answer,
            score: this.homeworkObj.score,
            comment: this.homeworkObj.comment
        });
    }
    ngOnInit() {
        this.log.log('打印从第一层页面传过来的obj');
        this.log.debug(this.obj);
        this.loading = true;
        this.teacherService.getHomeworkAnswer(this.obj.id).subscribe((data: any) => {
            this.homeworkObj = data[0];
            this.loading = false;
            this.initValidator();
        });
        /* this.studentService.getHomeworkDetails(this.obj.id).subscribe((data: any) => {
            this.homeworkObj = data;
            this.loading = false;
            this.initValidator();
        }); */
    }
    cancel() {
        this.subject.destroy();
    }
    save() {
        const result = {};
        result['finished'] = true;
        result['score'] = this.form.value.score;
        result['comment'] = this.form.value.comment;
        this.subject.next(result);
        this.subject.destroy();
    }
}
