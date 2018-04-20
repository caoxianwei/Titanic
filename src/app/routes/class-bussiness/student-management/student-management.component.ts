import { Component, OnInit } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { StudentManagementService } from './student-management.service';
import { Logger } from 'angular2-logger/core';
import { CreateEventComponent } from './create-event.component';
import { CheckEventComponent } from './check-event.component';
@Component({
    selector: 'student-management',
    templateUrl: './student-management.component.html'
})
export class StudentManagementComponent implements OnInit {
    constructor(
        private modal: NzModalService,
        private service: StudentManagementService,
        private log: Logger) {
    }
    tableData = [];
    tableLoading = false;
    getTable() {
        this.tableLoading = true;
        this.service.getStudentList().subscribe((data: any) => {
            this.tableData = data.user;
            this.tableLoading = false;
        });
    }
    create() {
        this.modal.open({
            wrapClassName: 'modal-md',
            content: CreateEventComponent,
            footer: false,
            maskClosable: false,
            componentParams: {
                students: this.tableData
            }
        });
    }
    hasRole(point): boolean {
        let _result = false;
        this.role.forEach(element => {
            if (point === element) {
                _result = true;
            }
        });
        return _result;
    }
    role;
    deleteRange;
    confirmText;
    ngOnInit() {
        this.getTable();
    }
    check(id: any) {
        this.modal.open({
            wrapClassName: 'modal-lg',
            content: CheckEventComponent,
            footer: false,
            maskClosable: false,
            componentParams: {
                id: id
            }
        });
    }
    delete(id: any) {
        /* this.teacherService.deleteSelectionResult(id).subscribe((data: any) => {
            this.getTable();
        }); */
    }
}
