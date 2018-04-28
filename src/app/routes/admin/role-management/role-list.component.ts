import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { AdminService } from '../admin.service';
import { Logger } from 'angular2-logger/core';
import { CreateOrEditRoleComponent } from './create-or-edit-role.component';
import { I18NService } from '@core/i18n/i18n.service';
@Component({
    templateUrl: './role-list.component.html'
})
export class RoleListComponent implements OnInit {
    constructor(
        private modal: NzModalService,
        private msg: NzMessageService,
        private service: AdminService,
        private log: Logger,
        private i18: I18NService) {
    }
    tableData = [];
    tablePageIndex = 1;
    tablePageSize = 10;
    tableTotal = 0;
    tableLoading = false;
    sort;
    getTableData() {
        this.tableLoading = true;
        this.service.getRoleList(this.sort, this.tablePageIndex, this.tablePageSize).subscribe((data: any) => {
            this.tableData = data.role;
            this.tableTotal = data.count;
            this.tableLoading = false;
        });
    }
    confirmText;
    ngOnInit() {
        if (this.i18.currentLang === 'zh-CN') {
            this.confirmText = '确认要删除吗?';
        } else if (this.i18.currentLang === 'zh-CN') {
            this.confirmText = 'wanna delete it?';
        }
        this.getTableData();
    }
    createOrEdit(obj?: any) {
        if (!obj) {
            this.modal.open({
                wrapClassName: 'modal-md',
                content: CreateOrEditRoleComponent,
                footer: false,
                maskClosable: false,
                componentParams: {
                    obj: obj
                }
            }).subscribe(result => {
                if (result['finish'] === true) {
                    this.service.addRole(result['name']).subscribe(() => {
                        this.getTableData();
                    });
                }
            });
        } else {
            this.modal.open({
                wrapClassName: 'modal-md',
                content: CreateOrEditRoleComponent,
                footer: false,
                maskClosable: false,
                componentParams: {
                    obj: obj
                }
            }).subscribe(result => {
                if (result['finish'] === true) {
                    this.service.updateRole(obj.id, result['name']).subscribe(() => {
                        this.getTableData();
                    });
                }
            });
        }
    }
    delete(id: any) {
        this.tableLoading = true;
        this.service.deleteRole(id).subscribe((data: any) => {
            this.getTableData();
            this.msg.success('删除成功！');
        });
    }
}
