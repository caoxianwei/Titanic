import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { AdminService } from '../admin.service';
import { Logger } from 'angular2-logger/core';
import { I18NService } from '@core/i18n/i18n.service';
@Component({
    templateUrl: './log-index.component.html'
})
export class LogIndexComponent implements OnInit {
    constructor(
        private modal: NzModalService,
        private service: AdminService,
        private i18: I18NService,
        private log: Logger) {
    }
    tableData = [];
    tablePageIndex = 1;
    tablePageSize = 10;
    tableTotal = 0;
    tableLoading = false;
    catelog = undefined;
    userId;
    ipAddress;
    roleId;
    getTableData() {
        this.tableLoading = true;
        this.service.getLogs(this.userId, this.ipAddress, this.catelog, this.roleId, this.tablePageIndex, this.tablePageSize).subscribe((data: any) => {
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    if (element.catalog === 'create') {
                        element.opType = '新增';
                    } else if (element.catalog === 'update') {
                        element.opType = '编辑';
                    } else if (element.catalog === 'delete') {
                        element.opType = '删除';
                    }
                }
            }
            this.tableData = data;
            this.tableLoading = false;
            this.tableTotal = 10;
        });
    }
    catelogChange() {
        setTimeout(() => {
            this.getTableData();
        }, 1);
    }
    userIdTip;
    ipAddressTip;
    roleIdTip;
    ngOnInit() {
        if (this.i18.currentLang === 'zh-CN') {
            this.userIdTip = '请输入学号/工号';
            this.ipAddressTip = '请输入ip地址';
            this.roleIdTip = '请选择角色';
        } else if (this.i18.currentLang === 'en') {
            this.userIdTip = 'Please enter the Id';
            this.ipAddressTip = 'Please enter the IP address';
            this.roleIdTip = 'Please select the role';
        }
        this.getTableData();
    }
}
