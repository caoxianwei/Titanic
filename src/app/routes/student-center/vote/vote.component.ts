import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { StudentService } from '@core/common/common.service';
import { Logger } from 'angular2-logger/core';
import { I18NService } from '@core/i18n/i18n.service';
import { ResultComponent } from './result.component';
import { DoVoteComponent } from './do-vote.component';
@Component({
    selector: 'vote',
    templateUrl: './vote.component.html'
})
export class VoteComponent implements OnInit {
    constructor(
        private modal: NzModalService,
        private studentService: StudentService,
        private log: Logger,
        private msg: NzMessageService,
        private i18: I18NService) {
    }
    statusRadio = 'underWay';
    filterChange() {
        setTimeout(() => {
            if (this.statusRadio === 'underWay') {
                this.tableData = this.currentTableData;
            } else if (this.statusRadio === 'future') {
                this.tableData = this.futureTableData;
            } else if (this.statusRadio === 'finished') {
                this.tableData = this.historyTableData;
            }
        }, 1);
    }
    tableData = [];
    currentTableData = [];
    futureTableData = [];
    historyTableData = [];
    tableLoading = false;
    getTable() {
        this.tableLoading = true;
        this.currentTableData = [];
        this.futureTableData = [];
        this.historyTableData = [];
        this.studentService.getVoteContent().subscribe((data: any) => {
            this.currentTableData = data.Current;
            this.futureTableData = data.Future;
            this.historyTableData = data.History;
            if (this.statusRadio === 'underWay') {
                this.tableData = this.currentTableData;
            } else if (this.statusRadio === 'future') {
                this.tableData = this.futureTableData;
            } else if (this.statusRadio === 'finished') {
                this.tableData = this.historyTableData;
            }
            this.tableLoading = false;
        });
    }
    vote(id: any) {
        this.studentService.hasVoted(id).subscribe((data: any) => {
            if (data.Is_Voted > 0) {
                if (this.i18.currentLang === 'zh-CN') {
                    this.msg.create('warning', '请勿重复投票');
                } else {
                    this.msg.create('warning', 'Do not repeat the vote');
                }
            } else {
                this.modal.open({
                    wrapClassName: 'modal-md',
                    content: DoVoteComponent,
                    footer: false,
                    maskClosable: false,
                    componentParams: {
                        id: id
                    }
                });
            }
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
    check(id: any) {
        this.studentService.hasVoted(id).subscribe((data: any) => {
            if (data.Is_Voted === 0) {
                if (this.i18.currentLang === 'zh-CN') {
                    this.msg.create('warning', '投票后方可查看');
                } else {
                    this.msg.create('warning', 'Look at the rear of the vote');
                }
            } else {
                this.modal.open({
                    wrapClassName: 'modal-md',
                    content: ResultComponent,
                    footer: false,
                    maskClosable: false,
                    componentParams: {
                        id: id
                    }
                });
            }
        });
    }
}
