import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { CommonService } from '@core/common/common.service';
import { Logger } from 'angular2-logger/core';
@Component({
    selector: 'schedule-select',
    templateUrl: './schedule-select.component.html'
})
export class ScheduleSelectComponent implements OnInit {
    constructor(
        private modal: NzModalService,
        private commonService: CommonService,
        private log: Logger) {
    }
    tableData = [];
    tableLoading = false;
    stageInfo;
    stageValue;
    weekInfo;
    weekValue;
    classInfo;
    classValue;
    initData() {
        this.commonService.getLessonParams().subscribe((data: any) => {
            this.stageInfo = data.Stage;
            this.weekInfo = data.week;
            this.classInfo = data.class;
        });
    }
    getTable() {
        this.tableLoading = true;
        this.commonService.getClassLessonInfo(this.stageValue, this.weekValue, this.classValue).subscribe((data: any) => {
            if (data.code === 403) {
                this.tableData = [];
                this.tableLoading = false;
            } else {
                for (const key in data) {
                    if (data[key].day === '1') {
                        data[key].week = '周一';
                    } else if (data[key].day === '2') {
                        data[key].week = '周二';
                    } else if (data[key].day === '3') {
                        data[key].week = '周三';
                    } else if (data[key].day === '4') {
                        data[key].week = '周四';
                    } else if (data[key].day === '5') {
                        data[key].week = '周五';
                    } else if (data[key].day === '6') {
                        data[key].week = '周六';
                    } else if (data[key].day === '7') {
                        data[key].week = '周日';
                    }
                    if (data[key].Section === '1') {
                        data[key].time = '上午第一二节';
                    } else if (data[key].Section === '2') {
                        data[key].time = '上午第三四节';
                    } else if (data[key].Section === '3') {
                        data[key].time = '下午第一二节';
                    } else if (data[key].Section === '4') {
                        data[key].time = '下午第三四节';
                    }
                }
                this.tableData = data;
                this.tableLoading = false;
            }
        });
    }
    ngOnInit() {
        this.initData();
    }
}
