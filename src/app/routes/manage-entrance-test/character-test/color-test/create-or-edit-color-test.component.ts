import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject, NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';
import { CharacterTestService } from '@core/common/common.service';


@Component({
    selector: 'create-or-edit-color-test',
    templateUrl: './create-or-edit-color-test.component.html'
})
export class CreateOrEditColorTestComponent implements OnInit {
    loading: boolean;
    @Input() obj: any;
    title: string;
    constructor(
        private modalHelper: ModalHelper,
        private model: NzModalService,
        private subject: NzModalSubject,
        private fb: FormBuilder,
        private msg: NzMessageService,
        private characterTestService: CharacterTestService) { }

    ngOnInit() {
        if (!this.obj) {
            this.obj = {
                'id': '',
                'index': '',
                'question': '',
                'A': '',
                'B': '',
                'C': '',
                'D': ''
            };
        }
        this.title = this.obj.question;
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 1000);

    }

    cancel() {
        this.subject.destroy();
    }
    save() {
        // execute save
        this.msg.info('id=' + this.obj.id);
        this.msg.info('index=' + this.obj.index);
        this.msg.info('question=' + this.obj.question);
        this.msg.info('A=' + this.obj.A);
        this.msg.info('B=' + this.obj.B);
        this.msg.info('C=' + this.obj.C);
        this.msg.info('D=' + this.obj.D);
        this.subject.destroy();
    }
}
