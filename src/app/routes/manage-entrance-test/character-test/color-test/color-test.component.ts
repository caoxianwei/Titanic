import { Component, OnInit } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { BasicConfigurationService, CharacterTestService, IAnimalTestDto, AnimalTest } from '@core/common/common.service';
import { CreateOrEditColorTestComponent } from './create-or-edit-color-test.component';
@Component({
    selector: 'color-test',
    templateUrl: './color-test.component.html'
})
export class ColorTestComponent implements OnInit {
    constructor(
        private msg: NzMessageService,
        private modal: NzModalService,
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
        /* this.characterTestService.getColorTests().subscribe((data: any) => {
            this.tableLoading = false;
            this.tableTotal = data.total;
            this.tableData = data.results;
        }); */
    }

    ngOnInit() {
        this.getTableData();
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
    createOrEdit(args?: any) {
        this.modal.open({
            wrapClassName: 'modal-md',
            content: CreateOrEditColorTestComponent,
            footer: false,
            maskClosable: false,
            componentParams: {
                obj: args
            }
        });
    }
}
