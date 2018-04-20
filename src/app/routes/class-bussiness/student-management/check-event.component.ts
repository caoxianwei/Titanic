import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { StudentManagementService } from './student-management.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logger } from 'angular2-logger/core';
import { I18NService } from '@core/i18n/i18n.service';
@Component({
    selector: 'check-event-management',
    templateUrl: './check-event.component.html'
})
export class CheckEventComponent implements OnInit {
    loading = false;
    @Input() id: any;
    constructor(
        private subject: NzModalSubject,
        private service: StudentManagementService,
        private i18: I18NService,
        private log: Logger) { }
    tableData = [];
    tableLoading = false;
    getTable() {
        this.tableLoading = true;
        this.service.getStudentEvent(this.id).subscribe(data => {
            this.tableData = data.Accidents;
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
        this.getTable();
    }
    delete(id) {
        this.tableLoading = true;
        this.service.deleteStudentEvent(id).subscribe(() => {
            this.getTable();
        });
    }
}
