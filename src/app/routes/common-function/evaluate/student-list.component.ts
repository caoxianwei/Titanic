import { Component, OnInit, Input } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { CommonFunctionService } from '../common-function.service';
import { Logger } from 'angular2-logger/core';
import { AddEvaluateComponent } from './add-evaluate.component';
@Component({
    templateUrl: './student-list.component.html'
})
export class StudentListComponent implements OnInit {
    @Input() showSelect: boolean;
    @Input() role_id: boolean;
    constructor(
        private modal: NzModalService,
        private service: CommonFunctionService,
        private log: Logger) {
    }
    classOptions;
    tableData = [];
    tableLoading = false;
    classId;
    getTable(byClass: boolean) {
        this.tableLoading = true;
        if (byClass) {
            this.service.getStudentListByClass(this.classId).subscribe((data: any) => {
                this.tableData = data;
                this.tableLoading = false;
            });
        } else {
            this.service.getStudentList().subscribe((data: any) => {
                this.tableData = data.user;
                this.tableLoading = false;
            });
        }
    }
    edit(Noid: any) {
        this.modal.open({
            wrapClassName: 'modal-md',
            content: AddEvaluateComponent,
            footer: false,
            maskClosable: false,
            zIndex: 1001,
            componentParams: {
                noid: Noid,
                role_id: this.role_id
            }
        });
    }
    ngOnInit() {
        // this.getTable();
        if (this.showSelect) { // 讲师
            this.service.getClassList().subscribe(data => {
                this.classOptions = data;
            });
        } else {
            this.getTable(false);
        }
    }
}
