import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { Logger } from 'angular2-logger/core';
/* import { StageDebateComponent } from '../stage-debate/stage-debate.component';
import { AddFeedbackComponent } from '../feedback/add-feedback.component';
import { StudentListComponent } from '../evaluate/student-list.component'; */
import { ShowReportComponent } from './show-report.component';

@Component({
    templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit {
    constructor(
        public msg: NzMessageService,
        private router: Router,
        private modal: NzModalService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private log: Logger,
    ) { }
    execute(value) {
        if (value === 'entrace-report') {
            this.modal.open({
                wrapClassName: 'modal-md',
                content: ShowReportComponent,
                footer: false,
                maskClosable: false,
                componentParams: {
                    type: 1
                }
            });
        } else if (value === 'stage-report') {
            this.modal.open({
                wrapClassName: 'modal-md',
                content: ShowReportComponent,
                footer: false,
                maskClosable: false,
                componentParams: {
                    type: 2
                }
            });
        } else if (value === 'graduation-report') {
            this.modal.open({
                wrapClassName: 'modal-md',
                content: ShowReportComponent,
                footer: false,
                maskClosable: false,
                componentParams: {
                    type: 3
                }
            });
        }
    }
    ngOnInit() {
    }
}
