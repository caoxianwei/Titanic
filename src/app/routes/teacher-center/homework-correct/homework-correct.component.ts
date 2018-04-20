import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { TeacherService } from '@core/common/common.service';
import { Logger } from 'angular2-logger/core';
import { DoCorrectComponent } from './do-correct.component';
@Component({
    selector: 'homework-correct',
    templateUrl: './homework-correct.component.html'
})
export class HomeworkCorrectComponent implements OnInit {
    constructor(
        private modal: NzModalService,
        private teacherService: TeacherService,
        private msg: NzMessageService,
        private log: Logger) {
    }
    radioValue = 'hasSubmitted';
    filterChange() {
        setTimeout(() => {
            if (this.radioValue === 'notSubmitted') {
                this.tableData = this.notSubmittedTableData;
            } else if (this.radioValue === 'hasSubmitted') {
                this.tableData = this.hasSubmittedTableData;
            }
        }, 1);
    }
    refreshHomeworkList() {
        this.homeworkId = undefined;
        setTimeout(() => {
            this.getReleaseTaskList();
        }, 1);
    }
    tableData = [];
    tableLoading = false;
    classInfo;
    homeworkInfo;
    teach_id;
    homeworkId;
    tabs = [
        {
            index: '未提交'
        },
        {
            index: '已提交'
        }
    ];
    initData() {
        this.teacherService.getClassInfo().subscribe((data: any) => {
            for (const key in data.Teach) {
                data.Teach[key].content = '班级名:' + data.Teach[key].Class_Name + ' 课程名:' + data.Teach[key].Course_Name;
            }
            this.classInfo = data.Teach;
        });
    }
    getReleaseTaskList() {
        this.teacherService.getReleaseTaskList(this.teach_id).subscribe((data: any) => {
            this.homeworkInfo = data;
        });
    }
    hasSubmittedTableData = [];
    notSubmittedTableData = [];
    getTable() {
        this.tableLoading = true;
        this.tableData = [];
        this.hasSubmittedTableData = [];
        this.notSubmittedTableData = [];
        this.teacherService.getHomeworkSubmitInfo(this.homeworkId).subscribe((data: any) => {
            for (const key in data.HasSubmitted) {
                data.HasSubmitted[key].hasSubmitted = true;
                this.tableData.push(data.HasSubmitted[key]);
                this.hasSubmittedTableData.push(data.HasSubmitted[key]);
            }
            for (const key in data.Unsubmitted) {
                data.Unsubmitted[key].hasSubmitted = false;
                this.tableData.push(data.Unsubmitted[key]);
                this.notSubmittedTableData.push(data.Unsubmitted[key]);
            }
            if (this.radioValue === 'notSubmitted') {
                this.tableData = this.notSubmittedTableData;
            } else if (this.radioValue === 'hasSubmitted') {
                this.tableData = this.hasSubmittedTableData;
            }
            this.log.log('打印从第一层页面传递过来的上交情况元数据');
            this.log.debug(this.tableData);
            this.tableLoading = false;
        });
    }
    // 批改作业
    correctHomework(obj: any) {
        this.modal.open({
            wrapClassName: 'modal-md',
            content: DoCorrectComponent,
            footer: false,
            maskClosable: false,
            componentParams: {
                obj: obj
            }
        }).subscribe((result) => {
            if (result['finished'] === true) {
                this.msg.success('批改成功!');
                this.teacherService.correctHomework(obj.id, result['score'], result['comment']).subscribe();
            }
        });
    }
    ngOnInit() {
        this.initData();
    }
}
