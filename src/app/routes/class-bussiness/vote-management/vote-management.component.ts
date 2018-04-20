import { Component, OnInit, Inject } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { TeacherService } from '@core/common/common.service';
import { Logger } from 'angular2-logger/core';
import { I18NService } from '@core/i18n/i18n.service';
import { CreateVoteComponent } from './create-vote.component';
import { ResultComponent } from './result.component';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
@Component({
    selector: 'vote-management',
    templateUrl: './vote-management.component.html'
})
export class VoteManagementComponent implements OnInit {
    constructor(
        private modal: NzModalService,
        private teacherService: TeacherService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private log: Logger,
        private notice: NzNotificationService,
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
        this.teacherService.getVoteContent().subscribe((data: any) => {
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
    create() {
        this.modal.open({
            wrapClassName: 'modal-md',
            content: CreateVoteComponent,
            footer: false,
            maskClosable: false
        }).subscribe(result => {
            if (result['finished'] === true) {
                this.teacherService.addSelection(result['MaxVote'], result['VoteName'], result['startTime'], result['endTime']).subscribe(() => {
                    this.getTable();
                });
            }
        });
    }
    // 判断用户是否有权限删除投票记录
    canDelete(level): boolean {
        let _result = false;
        if (level === 1) {
            _result = true;
        } else if (level === 2) {
            if (this.hasRole(6)) { // 6号是班主任角色点
                _result = true;
            }
        }
        return _result;
    }
    // 判断用户是否有对应的角色
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
    confirmText;
    ngOnInit() {
        this.role = this.tokenService.get().role;
        if (this.i18.currentLang === 'zh-CN') {
            this.confirmText = '确认要删除吗?';
        } else if (this.i18.currentLang === 'zh-CN') {
            this.confirmText = 'wanna delete it?';
        }
        this.getTable();
    }
    check(id: any) {
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
    delete(id: any) {
        this.teacherService.deleteSelectionResult(id).subscribe((data: any) => {
            this.getTable();
        });
    }
}
