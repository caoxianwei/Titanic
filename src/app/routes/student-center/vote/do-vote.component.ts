import { Component, OnInit, Input } from '@angular/core';
import { NzModalService, NzNotificationService, NzModalSubject } from 'ng-zorro-antd';
import { StudentService } from '@core/common/common.service';
import { Logger } from 'angular2-logger/core';
@Component({
    templateUrl: './do-vote.component.html'
})
export class DoVoteComponent implements OnInit {
    @Input() id: any;
    constructor(
        private modal: NzModalService,
        private studentService: StudentService,
        private log: Logger,
        private subject: NzModalSubject,
        private notice: NzNotificationService) {
    }
    tableData = [];
    tableLoading = false;
    maxVote;
    getTable() {
        this.tableLoading = true;
        this.studentService.getVoteList(this.id).subscribe((data: any) => {
            this.tableData = data.user;
            this.maxVote = data.maxvote;
            this.tableLoading = false;
        });
    }
    ngOnInit() {
        this.getTable();
    }
    controlSubmit = true;
    updateSubmitStatus() {
        this.log.log('into updateSubmitStatus');
        let count = 0;
        for (const key in this.tableData) {
            if (this.tableData.hasOwnProperty(key)) {
                const element = this.tableData[key];
                if (this.tableData[key].selected === true) {
                    count++;
                }
            }
        }
        this.log.debug('count=' + (count));
        this.log.debug('this.maxVote=' + (this.maxVote));
        if (count > 0 && count <= this.maxVote) {
            this.controlSubmit = false;
        } else {
            this.controlSubmit = true;
        }
    }
    submit() {
        let result = '';
        for (const key in this.tableData) {
            if (this.tableData.hasOwnProperty(key)) {
                const element = this.tableData[key];
                if (this.tableData[key].selected === true) {
                    result += this.tableData[key].Noid + ',';
                }
            }
        }
        this.log.debug(this.tableData);
        this.log.debug(result.substring(0, result.length - 1));
        this.studentService.vote(this.id, result).subscribe(() => {
            this.cancel();
        });
    }
    cancel() {
        this.subject.destroy();
    }
}
