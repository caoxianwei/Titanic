import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { AdminService } from '../../admin.service';
import { Logger } from 'angular2-logger/core';
import { EditTestRuleComponent } from './edit-test-rule.component';
@Component({
    templateUrl: './test-rule-index.component.html'
})
export class TestRuleIndexComponent implements OnInit {
    constructor(
        private modal: NzModalService,
        private service: AdminService,
        private log: Logger) {
    }
    tableData = [];
    tableLoading = false;
    sort;
    getTableData() {
        this.tableLoading = true;
        this.service.getStageRoleList().subscribe((data: any) => {
            this.tableData = data;
            this.tableLoading = false;
        });
    }
    ngOnInit() {
        this.getTableData();
    }
    edit(obj: any) {
        this.modal.open({
            wrapClassName: 'modal-md',
            content: EditTestRuleComponent,
            footer: false,
            maskClosable: false,
            componentParams: {
                obj: obj
            }
        }).subscribe(result => {
            if (result['finish'] === true) {
                this.getTableData();
            }
        });
    }
}
