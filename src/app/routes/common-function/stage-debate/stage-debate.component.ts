import { Component, Inject, OnInit } from '@angular/core';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { Logger } from 'angular2-logger/core';
import { StageDebateService } from './stage-debate.service';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
@Component({
    templateUrl: './stage-debate.component.html'
})
export class StageDebateComponent implements OnInit {
    loading = false;
    constructor(
        private subject: NzModalSubject,
        private msg: NzMessageService,
        private service: StageDebateService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private log: Logger) { }
    role;
    class_id;
    stage_id;
    classInfo;
    stageInfo;
    studentId;
    projectscore;
    debatescore;
    filescore;
    ngOnInit() {
        this.loading = true;
        const _role = this.tokenService.get().role;
        this.role = _role[0];
        this.service.getClassList().subscribe((data: any) => {
            this.classInfo = data.class;
            this.loading = false;
        });
    }
    classChange() {
        this.log.log('classChange');
        setTimeout(() => {
            this.service.getStageTestList(this.class_id).subscribe((data: any) => {
                this.stageInfo = data.intest;
            });
        }, 1);
    }
    cancel() {
        this.subject.destroy();
    }
    save() {
        this.service.submitDebateScore(this.stage_id, this.studentId, this.role, this.projectscore, this.debatescore, this.filescore).subscribe(() => {
            this.msg.success('保存成功!');
            this.subject.destroy();
        });
    }
}
