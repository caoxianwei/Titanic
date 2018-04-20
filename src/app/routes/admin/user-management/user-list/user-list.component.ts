import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { AdminService } from '../../admin.service';
import { DatePipe } from '@angular/common';
import { Logger } from 'angular2-logger/core';
import { AddUserComponent } from './add-user.component';
import { I18NService } from '@core/i18n/i18n.service';
@Component({
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
    constructor(
        private modal: NzModalService,
        private service: AdminService,
        private log: Logger,
        private datePipe: DatePipe,
        private i18: I18NService) {
    }
    tableData = [];
    tablePageIndex = 1;
    tablePageSize = 10;
    tableTotal = 0;
    tableLoading = false;
    roleOptions;
    sort;
    getTableData() {
        this.tableLoading = true;
        this.service.getUserList(this.roleId, this.studentId, this.sort, this.tablePageIndex, this.tablePageSize).subscribe((data: any) => {
            this.tableData = data.user;
            this.tableLoading = false;
            this.tableTotal = data.count;
            this.roleOptions = data.role;
        });
    }
    sortNzValue;
    sortFunction(param1, param2) {
        this.log.debug('param1=' + param1);
        this.log.debug('param2=' + param2);
        this.log.debug('sortNzValue=' + this.sortNzValue);
    }
    confirmText;
    studentIdTip;
    roleIdTip;
    roleId;
    studentId;
    ngOnInit() {
        if (this.i18.currentLang === 'zh-CN') {
            this.confirmText = '确认要删除吗?';
            this.studentIdTip = '请输入学号/工号';
            this.roleIdTip = '请选择角色';
        } else if (this.i18.currentLang === 'en') {
            this.confirmText = 'wanna delete it?';
            this.studentIdTip = 'Please enter the Id';
            this.roleIdTip = 'Please select role';
        }
        this.getTableData();
    }
    create() {
        this.modal.open({
            wrapClassName: 'modal-md',
            content: AddUserComponent,
            footer: false,
            maskClosable: false
        }).subscribe(result => {
            if (result['finished'] === true) {
                this.getTableData();
            }
        });
    }
    delete(id: any) {
        this.tableLoading = true;
        this.service.deleteUser(id).subscribe((data: any) => {
            this.getTableData();
        });
    }
}
