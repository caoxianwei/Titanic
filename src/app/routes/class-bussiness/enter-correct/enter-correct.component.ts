import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { EnterCorrectService } from './enter-correct.service';
import { DoEnterCorrectComponent } from './do-enter-correct.component';
import { Logger } from 'angular2-logger/core';
@Component({
    selector: 'enter-correct',
    templateUrl: './enter-correct.component.html'
})
export class EnterCorrectComponent implements OnInit {
    constructor(
        private modal: NzModalService,
        private service: EnterCorrectService,
        private msg: NzMessageService,
        private log: Logger) {
    }
    radioValue = 'notCorrect';
    filterChange() {
        setTimeout(() => {
            if (this.radioValue === 'notCorrect') {
                this.tableData = this.notCorrectTableData;
            } else if (this.radioValue === 'hasCorrect') {
                this.tableData = this.hasCorrectTableData;
            }
        }, 1);
    }
    tableData = [];
    tableLoading = false;
    hasCorrectTableData = [];
    notCorrectTableData = [];
    getTable() {
        this.tableLoading = true;
        this.tableData = [];
        this.hasCorrectTableData = [];
        this.notCorrectTableData = [];
        this.service.getStudentList().subscribe((data: any) => {
            for (const key in data.wei) {
                if (data.wei.hasOwnProperty(key)) {
                    data.wei[key].showIcon = true;
                    this.notCorrectTableData.push(data.wei[key]);
                }
            }
            for (const key in data.gai) {
                if (data.gai.hasOwnProperty(key)) {
                    data.gai[key].showIcon = false;
                    this.hasCorrectTableData.push(data.gai[key]);
                }
            }
            this.log.debug(this.notCorrectTableData);
            this.log.debug(this.hasCorrectTableData);
            this.filterChange();
            this.tableLoading = false;
        });
    }
    // 批改作业
    correct(id: any) {
        this.modal.open({
            wrapClassName: 'modal-lg',
            content: DoEnterCorrectComponent,
            footer: false,
            maskClosable: false,
            componentParams: {
                id: id
            }
        }).subscribe((result) => {
            if (result['finished'] === true) {
                this.msg.success('批阅完成!');
                this.getTable();
            }
        });
    }
    ngOnInit() {
        this.getTable();
    }
}
