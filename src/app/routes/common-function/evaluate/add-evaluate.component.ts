import { Component, Inject, Input } from '@angular/core';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { Logger } from 'angular2-logger/core';
import { CommonFunctionService } from '../common-function.service';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
@Component({
    templateUrl: './add-evaluate.component.html'
})
export class AddEvaluateComponent {
    loading = false;
    @Input() noid: any;
    @Input() role_id: any;
    constructor(
        private msg: NzMessageService,
        private subject: NzModalSubject,
        private service: CommonFunctionService,
        private log: Logger) { }
    cancel() {
        this.subject.destroy();
    }
    morality = 1;
    citizen = 1;
    study = 1;
    cooperation = 1;
    sport = 1;
    save() {
        /* this.log.debug('role_id:' + this.role_id);
        this.log.debug('noid:' + this.noid);
        this.log.debug('morality:' + this.morality);
        this.log.debug('citizen:' + this.citizen);
        this.log.debug('study:' + this.study);
        this.log.debug('cooperation:' + this.cooperation);
        this.log.debug('sport:' + this.sport); */
        this.service.addEvaluation(this.role_id, this.morality, this.citizen, this.study, this.cooperation, this.sport, this.noid, 'summary', 'autograph').subscribe((data: any) => {
            if (data.code === 200) {
                this.msg.success('保存成功!');
            } else {
                this.msg.error('你已评价完成,请勿重复评价!');
            }
            this.subject.destroy();
        });
    }
}
