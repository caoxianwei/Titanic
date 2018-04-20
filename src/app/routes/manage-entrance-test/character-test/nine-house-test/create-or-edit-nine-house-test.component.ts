import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject, NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';
import { CharacterTestService } from '@core/common/common.service';

@Component({
    selector: 'create-or-edit-nine-house-test',
    templateUrl: './create-or-edit-nine-house-test.component.html'
})
export class CreateOrEditNineHouseTestComponent implements OnInit {
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
                'question': '',
                'type_number': ''
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
        this.subject.destroy();
    }
}
