import { Component, OnInit } from '@angular/core';
import { TeacherService } from '@core/common/common.service';
import { Logger } from 'angular2-logger/core';
import { Router } from '@angular/router';
@Component({
    selector: 'student-attendance',
    templateUrl: './attendance.component.html'
})
export class AttendanceComponent implements OnInit {
    constructor(
        private teacherService: TeacherService,
        private log: Logger) {
    }
    param_class;
    param_course;
    classes;
    course;
    getData() {
        this.teacherService.getLessonInformation().subscribe((data: any) => {
            this.classes = data.class;
            this.course = data.course;
        });
    }
    ngOnInit() {
        this.getData();
    }
    paramChange() {
        if (this.param_class !== undefined && this.param_course !== undefined) {
            setTimeout(() => {
                this.teacherService.getClassRecord(this.param_class, this.param_course).subscribe((data: any) => {
                    this.log.log('打印已经上过的课程记录');
                    this.log.debug(data);
                    for (const key in data) {
                        let day;
                        if (data[key].day === '1') {
                            day = '周一';
                        } else if (data[key].day === '2') {
                            day = '周二';
                        } else if (data[key].day === '3') {
                            day = '周三';
                        } else if (data[key].day === '4') {
                            day = '周四';
                        } else if (data[key].day === '5') {
                            day = '周五';
                        } else if (data[key].day === '6') {
                            day = '周六';
                        } else if (data[key].day === '7') {
                            day = '周日';
                        }
                        this.log.log('打印day');
                        this.log.debug(day);
                        let section;
                        if (data[key].Section === '1') {
                            section = '上午第一二节';
                        } else if (data[key].Section === '2') {
                            section = '上午第三四节';
                        } else if (data[key].Section === '3') {
                            section = '下午第一二节';
                        } else if (data[key].Section === '4') {
                            section = '下午第三四节';
                        }
                        this.log.log('打印section');
                        this.log.debug(section);
                        data[key].content = data[key].week + day + section;
                        this.log.log('打印处理后的已经上过的课程记录');
                        this.log.debug(data);
                        this.historyClassInfo = data;
                    }
                });
            }, 1);
        }
    }
    type = 'attendance';
    catelogChange() {
        setTimeout(() => {
            this.log.log('打印考勤类别数据');
            this.log.debug(this.attendanceInfo);
            this.tableLoading = true;
            if (this.type === 'attendance') {
                this.tableData = this.attendanceInfo.attendance;
            } else if (this.type === 'absence') {
                this.tableData = this.attendanceInfo.absence;
            } else if (this.type === 'late') {
                this.tableData = this.attendanceInfo.late;
            } else if (this.type === 'leaveearly') {
                this.tableData = this.attendanceInfo.leaveearly;
            }
            this.tableLoading = false;
        }, 1);
    }
    attendanceInfo = {
        'absence': [],
        'attendance': [],
        'late': [],
        'leaveearly': []
    };
    historyClassInfo;
    param_content;
    tableLoading = false;
    tableData = [];
    search() {
        this.tableLoading = true;
        this.teacherService.getHistoryAttendanceInfo(this.param_class, this.param_content).subscribe((data: any) => {
            this.log.log('打印讲师的学生考勤信息');
            this.log.debug(data);
            this.attendanceInfo = data;
            if (this.type === 'attendance') {
                this.tableData = this.attendanceInfo.attendance;
            } else if (this.type === 'absence') {
                this.tableData = this.attendanceInfo.absence;
            } else if (this.type === 'late') {
                this.tableData = this.attendanceInfo.late;
            } else if (this.type === 'leaveearly') {
                this.tableData = this.attendanceInfo.leaveearly;
            }
            this.tableLoading = false;
        });
    }
}
