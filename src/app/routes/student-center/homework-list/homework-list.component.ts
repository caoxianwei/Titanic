import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { StudentService } from '@core/common/common.service';
import { DatePipe } from '@angular/common';
import { Logger } from 'angular2-logger/core';
import { DoHomeworkComponent } from './do-homework.component';
import { CheckHomeworkComponent } from './check-homework.component';
@Component({
    selector: 'homework-list',
    templateUrl: './homework-list.component.html'
})
export class HomeworkListComponent implements OnInit {
    constructor(
        private modal: NzModalService,
        private studentService: StudentService,
        private log: Logger,
        private datePipe: DatePipe) {
    }
    statusRadio = 'notOut';
    filterChange() {
        setTimeout(() => {
            if (this.statusRadio === 'notOut') {
                this.tableData = this.tableNotOutData;
            } else if (this.statusRadio === 'isOut') {
                this.tableData = this.tableIsOutData;
            }
        }, 1);
    }
    paramChange() {
        setTimeout(() => {
            this.getTable();
        }, 100);
    }
    tableData = [];
    tableIsOutData = [];
    tableNotOutData = [];
    tableLoading = false;
    classInfo;
    teach_id = undefined;
    initData() {
        this.studentService.getHomeworkList().subscribe((data: any) => {
            this.classInfo = data.teach;
            for (const key in this.classInfo) {
                this.classInfo[key].info = '教师名:' + this.classInfo[key].TeacherName + ' 课程名:' + this.classInfo[key].CourseName;
            }
        });
    }
    getTable() {
        this.tableLoading = true;
        this.tableData = [];
        this.tableNotOutData = [];
        this.tableIsOutData = [];
        this.studentService.getHomeworkList(this.teach_id).subscribe((data: any) => {
            const implement = data.Task.Implement;
            const end = data.Task.End;
            for (const key in implement) { // 进行中
                implement[key].isOut = false;
                this.tableNotOutData.push(implement[key]);
            }
            for (const key in end) { // 已过期
                end[key].isOut = true;
                this.tableIsOutData.push(end[key]);
            }
            if (this.statusRadio === 'notOut') {
                this.tableData = this.tableNotOutData;
            } else if (this.statusRadio === 'isOut') {
                this.tableData = this.tableIsOutData;
            }
            // this.tableTotal = this.tableIsOutTotal + this.tableNoutOutTotal;
            this.log.log('打印作业列表元数据');
            this.log.debug(this.tableData);
            this.tableLoading = false;
        });
    }
    // 做作业
    doHomework(obj: any) {
        this.modal.open({
            wrapClassName: 'modal-md',
            content: DoHomeworkComponent,
            footer: false,
            maskClosable: false,
            componentParams: {
                obj: obj
            }
        }).subscribe(result => {
            if (result['finished'] === true) {
                this.studentService.submitHomework(result.id, result.answer).subscribe();
            }
        });
    }
    // 查看作业批改情况
    checkScore(obj: any) {
        /* this.studentService.getHomeweorkScore(obj.id).subscribe((data: any) => {
            if (data.code === 403) {
                this.log.log('尚未批改');
            } else {

            }
        }); */
        this.modal.open({
            wrapClassName: 'modal-md',
            content: CheckHomeworkComponent,
            footer: false,
            maskClosable: false,
            componentParams: {
                obj: obj
            }
        });
    }
    ngOnInit() {
        this.initData();
    }
    createOrEdit(obj?: any) {
        if (!obj) {
            this.modal.open({
                wrapClassName: 'modal-md',
                content: 'CreateOrEditHomeworkManagementComponent',
                footer: false,
                maskClosable: false,
                componentParams: {
                    obj: obj
                }
            }).subscribe(result => {
                if (result['finish'] === true) {
                    result.startTime = this.datePipe.transform(new Date(result.startTime), 'yyyy-MM-dd HH:mm:ss');
                    result.endTime = this.datePipe.transform(new Date(result.endTime), 'yyyy-MM-dd HH:mm:ss');
                    /* this.teacherService.addHomework(this.teach_id, result.title, result.content, result.startTime, result.endTime).subscribe((data: any) => {
                        this.getTable();
                    }); */
                }
            });
        } else {
            this.modal.open({
                wrapClassName: 'modal-md',
                content: 'CreateOrEditHomeworkManagementComponent',
                footer: false,
                maskClosable: false,
                componentParams: {
                    obj: obj
                }
            }).subscribe(result => {
                if (result['finish'] === true) {
                    result.startTime = this.datePipe.transform(new Date(result.startTime), 'yyyy-MM-dd HH:mm:ss');
                    result.endTime = this.datePipe.transform(new Date(result.endTime), 'yyyy-MM-dd HH:mm:ss');
                    /* this.teacherService.updateHomework(result.recordId, result.title, result.content, result.startTime, result.endTime).subscribe((data: any) => {
                        this.getTable();
                    }); */
                }
            });
        }
    }
    delete(id: any) {
        /*   this.teacherService.deleteHomework(id).subscribe((data: any) => {
              this.getTable();
          }); */
    }
}
