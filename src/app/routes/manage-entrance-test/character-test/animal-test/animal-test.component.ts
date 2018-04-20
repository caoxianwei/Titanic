import { Component, OnInit } from '@angular/core';
import { SimpleTableColumn } from '@delon/abc';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { CreateOrEditAnimalTestComponent } from './create-or-edit-animal-test.component';
import { ACLService } from '@delon/acl';
import { Router } from '@angular/router';
import { BasicConfigurationService, CharacterTestService, IAnimalTestDto, AnimalTest } from '@core/common/common.service';
@Component({
    selector: 'animal-test',
    templateUrl: './animal-test.component.html'
})
export class AnimalTestComponent implements OnInit {
    constructor(
        private msg: NzMessageService,
        private modal: NzModalService,
        private aclService: ACLService,
        private router: Router,
        private http: _HttpClient,
        private basicConfigurationService: BasicConfigurationService,
        private characterTestService: CharacterTestService) {
    }


    tablePageIndex = 1;
    tablePageSize = 10;
    tableTotal = 1;
    tableData = [];
    tableLoading = true;
    getTableData = () => {
        this.tableLoading = true;
        /* this.characterTestService.getAnimalTestsForMaintenance(this.tablePageIndex, this.tablePageSize).subscribe((data: any) => {
            this.tableLoading = false;
            this.tableTotal = data.total;
            this.tableData = data.list;
            for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].info = JSON.parse(this.tableData[i].info);
            }
        }); */
    }

    ngOnInit() {
        this.getTableData();
        /* if (this.aclService.canAbility(1)) {
        } else {
            this.router.navigate(['/welcome']);
        } */
    }
    randomUserUrl = 'https://api.randomuser.me/';

    // 删除
    delete(id: any) {
        // 配置默认参数
        const options = {
            onOk: () => {
                this.msg.success('删除id为' + id + '的记录!');
            },
            maskClosable: false,
        };
        // 获取当前语言环境下其他配置参数
        const result = this.basicConfigurationService.getDeleteOptions();
        options['title'] = result['title'];
        options['content'] = result['content'];
        options['okText'] = result['okText'];
        options['cancelText'] = result['cancelText'];
        this.modal.confirm(options);
    }
    // 新增与编辑
    createOrEdit(operationType: 'create' | 'edit', args?: any) {
        if (operationType === 'edit') {
            this.modal.open({
                wrapClassName: 'modal-md',
                content: CreateOrEditAnimalTestComponent,
                footer: false,
                maskClosable: false,
                componentParams: {
                    obj: args
                }
            });
        } else if (operationType === 'create') {
            if (this.tableTotal < 30) {
                this.modal.open({
                    wrapClassName: 'modal-md',
                    content: CreateOrEditAnimalTestComponent,
                    footer: false,
                    maskClosable: false,
                    componentParams: {
                        obj: args
                    }
                });
            } else {
                const language = this.basicConfigurationService.getCurrentLanguage();
                if (language === 'zh-CN') {
                    this.msg.warning('题库上限至多为30道,请先删除不需要的题目!');
                } else if (language === 'en') {
                    this.msg.warning('The upper limit of the question bank is up to 30. Please delete the subject you do not need!');
                }
            }
        }
    }

}
