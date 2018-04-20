import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { TeacherService } from '@core/common/common.service';
import { DatePipe } from '@angular/common';
import { Logger } from 'angular2-logger/core';
import { CreateOrEditHomeworkManagementComponent } from './create-or-edit-homework-management.component';
import { I18NService } from '@core/i18n/i18n.service';
@Component({
    selector: 'homework-management',
    templateUrl: './homework-management.component.html'
})
export class HomeworkManagementComponent implements OnInit {
    constructor(
        private modal: NzModalService,
        private teacherService: TeacherService,
        private log: Logger,
        private datePipe: DatePipe,
        private i18: I18NService) {
    }
    tableData = [];
    tableLoading = false;
    classInfo;
    teach_id;
    initData() {
        this.teacherService.getClassInfo().subscribe((data: any) => {
            const Data = data.Teach;
            for (const key in Data) {
                Data[key].content = '班级名:' + Data[key].Class_Name + ' 课程名:' + Data[key].Course_Name;
            }
            this.classInfo = Data;
        });
    }
    getTable() {
        this.tableLoading = true;
        this.teacherService.getReleaseTaskList(this.teach_id).subscribe((value: any) => {
            this.tableData = value;
            this.tableLoading = false;
        });
    }
    courseHistoryChange() {
        setTimeout(() => {
            this.getTable();
        }, 1);
    }
    confirmText;
    ngOnInit() {
        if (this.i18.currentLang === 'zh-CN') {
            this.confirmText = '确认要删除吗?';
        } else if (this.i18.currentLang === 'zh-CN') {
            this.confirmText = 'wanna delete it?';
        }
        this.initData();
    }
    createOrEdit(obj?: any) {
        if (!obj) {
            this.modal.open({
                wrapClassName: 'modal-md',
                content: CreateOrEditHomeworkManagementComponent,
                footer: false,
                maskClosable: false,
                componentParams: {
                    obj: obj
                }
            }).subscribe(result => {
                if (result['finish'] === true) {
                    result.startTime = this.datePipe.transform(new Date(result.startTime), 'yyyy-MM-dd HH:mm:ss');
                    result.endTime = this.datePipe.transform(new Date(result.endTime), 'yyyy-MM-dd HH:mm:ss');
                    this.teacherService.addHomework(this.teach_id, result.title, result.content, result.startTime, result.endTime).subscribe((data: any) => {
                        this.getTable();
                    });
                }
            });
        } else {
            this.modal.open({
                wrapClassName: 'modal-md',
                content: CreateOrEditHomeworkManagementComponent,
                footer: false,
                maskClosable: false,
                componentParams: {
                    obj: obj
                }
            }).subscribe(result => {
                if (result['finish'] === true) {
                    result.startTime = this.datePipe.transform(new Date(result.startTime), 'yyyy-MM-dd HH:mm:ss');
                    result.endTime = this.datePipe.transform(new Date(result.endTime), 'yyyy-MM-dd HH:mm:ss');
                    this.teacherService.updateHomework(result.recordId, result.title, result.content, result.startTime, result.endTime).subscribe((data: any) => {
                        this.getTable();
                    });
                }
            });
        }
    }
    delete(id: any) {
        this.teacherService.deleteHomework(id).subscribe((data: any) => {
            this.getTable();
        });
    }
}
