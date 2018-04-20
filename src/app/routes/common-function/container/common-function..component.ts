import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { Logger } from 'angular2-logger/core';
import { StageDebateComponent } from '../stage-debate/stage-debate.component';
import { AddFeedbackComponent } from '../feedback/add-feedback.component';
import { AddEvaluateComponent } from '../evaluate/add-evaluate.component';
import { StudentListComponent } from '../evaluate/student-list.component';

@Component({
    selector: 'common-function',
    templateUrl: './common-function.component.html'
})
export class CommonFunctionComponent implements OnInit {
    constructor(
        public msg: NzMessageService,
        private router: Router,
        private modal: NzModalService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private log: Logger,
    ) { }
    execute(value) {
        if (value === 'schedule-select') {
            this.router.navigate(['/common-function/schedule-select']);
        } else if (value === 'stage-debate') {
            this.modal.open({
                wrapClassName: 'modal-md',
                content: StageDebateComponent,
                footer: false,
                maskClosable: false
            });
        } else if (value === 'add-feedback') {
            this.modal.open({
                wrapClassName: 'modal-md',
                content: AddFeedbackComponent,
                footer: false,
                maskClosable: false
            });
        } else if (value === 'comprehensive-evaluation') {
            if (this.role[0] === 1) { // 学生自评
                this.modal.open({
                    wrapClassName: 'modal-md',
                    content: AddEvaluateComponent,
                    footer: false,
                    maskClosable: false,
                    componentParams: {
                        noid: this.tokenService.get().Noid,
                        role_id: 0
                    }
                });
            } else { // 不是学生则出现学生列表选择界面
                let showSelect = false;
                if (this.role[0] === 5) {
                    showSelect = true;
                }
                this.modal.open({
                    wrapClassName: 'modal-lg',
                    content: StudentListComponent,
                    footer: false,
                    maskClosable: false,
                    componentParams: {
                        showSelect: showSelect,
                        role_id: this.role[0]
                    }
                });
            }
        }
    }
    // 判断用户是否有对应的角色
    hasRole(point): boolean {
        let _result = false;
        this.role.forEach(element => {
            if (point === element) {
                _result = true;
            }
        });
        return _result;
    }
    role;
    ngOnInit() {
        this.role = this.tokenService.get().role;
    }
}
