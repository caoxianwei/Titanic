import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { BasicConfigurationService, CharacterTestService } from '@core/common/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'create-or-edit-animal-test',
    templateUrl: './create-or-edit-animal-test.component.html'
})
export class CreateOrEditAnimalTestComponent implements OnInit {
    loading: boolean;
    language: string;
    @Input() obj: any;
    constructor(
        private subject: NzModalSubject,
        private fb: FormBuilder,
        private characterTestService: CharacterTestService,
        private basicConfigurationService: BasicConfigurationService) { }
    options = [];
    form: FormGroup;
    subIndex: any;
    initValidator() {
        this.form = this.fb.group({
            question: [null, [Validators.required]],
            num: [null, [Validators.required]],
            score_5: [null, [Validators.required]],
            score_4: [null, [Validators.required]],
            score_3: [null, [Validators.required]],
            score_2: [null, [Validators.required]],
            score_1: [null, [Validators.required]],
        });
        // 产生1-30的序号
        for (let index = 1; index <= 30; index++) {
            this.options.push(index);
        }
        if (this.obj) {
            // 从数组中找到num下标,方便表单赋值
            for (let index = 0; index < this.options.length; index++) {
                if (this.options[index] === this.obj.num) {
                    this.subIndex = index;
                    break;
                }
            }
        } else {
            // 编辑状态下,不允许num重复
            this.characterTestService.getAnimalTests().subscribe(data => {
                const Data = data.list;
                for (const key in Data) {
                    for (let i = 0; i < this.options.length; i++) {
                        if (this.options[i] === Data[key].num) {
                            this.options.splice(i, 1);
                            break;
                        }
                    }
                }
            });
        }
        this.form.setValue({
            question: this.obj ? this.obj.title : '',
            num: this.obj ? this.options[this.subIndex] : '',
            score_5: this.obj ? this.obj.info.A : '',
            score_4: this.obj ? this.obj.info.B : '',
            score_3: this.obj ? this.obj.info.C : '',
            score_2: this.obj ? this.obj.info.D : '',
            score_1: this.obj ? this.obj.info.E : '',
        });
    }
    ngOnInit() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 1000);
        this.language = this.basicConfigurationService.getCurrentLanguage();
        this.initValidator();
    }
    cancel() {
        this.subject.destroy();
    }
    save() {
        // execute save
        // this.CharacterTestService.saveAnimalTest(this.obj);
        this.subject.destroy();
    }
}
