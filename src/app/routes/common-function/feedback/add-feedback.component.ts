import { Component, Inject } from '@angular/core';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { Logger } from 'angular2-logger/core';
import { CommonFunctionService } from '../common-function.service';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
@Component({
    templateUrl: './add-feedback.component.html'
})
export class AddFeedbackComponent {
    loading = false;
    constructor(
        private msg: NzMessageService,
        private subject: NzModalSubject,
        private service: CommonFunctionService,
        private log: Logger) { }
    cancel() {
        this.subject.destroy();
    }
    content;
    contact;
    save() {
        this.service.addFeedback(this.content, this.contact).subscribe(() => {
            this.msg.success('保存成功!');
            this.subject.destroy();
        });
    }
}
