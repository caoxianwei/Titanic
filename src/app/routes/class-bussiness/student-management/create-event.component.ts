import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { StudentManagementService } from './student-management.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logger } from 'angular2-logger/core';

@Component({
    selector: 'create-event-management',
    templateUrl: './create-event.component.html'
})
export class CreateEventComponent implements OnInit {
    loading = false;
    @Input() students: any;
    constructor(
        private subject: NzModalSubject,
        private msg: NzMessageService,
        private service: StudentManagementService,
        private log: Logger) { }
    level2AllOptions = []; // 将所有二级事件存放于此,用于下拉框改变事件时使用
    level1Options = []; // 将所有一级事件存放于此
    level2Options = []; // 当前需要显示的二级事件列表
    getEventOption() {
        this.service.getEventOption().subscribe(data => {
            this.level1Options = data;
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const level1Element = data[key].subordinate;
                    for (const key2 in level1Element) {
                        if (level1Element.hasOwnProperty(key2)) {
                            const level2Element = level1Element[key2];
                            this.level2AllOptions.push(level2Element);
                        }
                    }
                }
            }
        });
    }
    studentsInfo = [];
    processStudents() {
        for (const key in this.students) {
            if (this.students.hasOwnProperty(key)) {
                const element = this.students[key];
                const obj = {
                    content: '学号:' + element.Noid + '姓名:' + element.name,
                    id: element.Noid
                };
                this.studentsInfo.push(obj);
            }
        }
    }
    level1;
    level2;
    detail;
    paramChange() {
        setTimeout(() => {
            this.level2 = undefined;
            this.log.log('into paramChange');
            this.level2Options = [];
            for (const key in this.level2AllOptions) {
                if (this.level2AllOptions.hasOwnProperty(key)) {
                    const element = this.level2AllOptions[key];
                    this.log.debug('element.pid=' + (element.pid));
                    this.log.debug('level1=' + (this.level1));
                    if (element.pid === this.level1) {
                        this.level2Options.push(element);
                    }
                }
            }
            this.log.log('show level2Options');
            this.log.debug(this.level2Options);
        }, 1);
    }
    ngOnInit() {
        this.getEventOption();
        this.processStudents();
    }
    cancel() {
        this.subject.destroy();
    }
    student;
    save() {
        this.loading = true;
        this.service.addStudentEvent(this.student, this.level2, this.detail).subscribe(() => {
            this.msg.success('保存成功!');
            this.subject.destroy();
        });
    }
}
