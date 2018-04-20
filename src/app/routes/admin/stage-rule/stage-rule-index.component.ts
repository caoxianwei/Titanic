import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Logger } from 'angular2-logger/core';
import { EditStageRuleComponent } from './edit-stage-rule.component';
@Component({
    templateUrl: './stage-rule-index.component.html'
})
export class StageRuleIndexComponent {
    constructor(
        private modal: NzModalService,
        private service: AdminService,
        private router: Router,
        private log: Logger) {
    }

    execute(value) {
        if (value === 'test-rule') {
            this.router.navigate(['/management/test-rule-index']);
        }
    }
}
