import { Component, OnInit, Input } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { StudentService } from '@core/common/common.service';
import { Logger } from 'angular2-logger/core';
@Component({
    templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {
    @Input() id: any;
    constructor(
        private modal: NzModalService,
        private studentService: StudentService,
        private log: Logger,
        private notice: NzNotificationService) {
    }
    tableData = [];
    tableLoading = false;
    getTable() {
        this.tableLoading = true;
        this.studentService.getVoteDetail(this.id).subscribe((data: any) => {
            this.tableData = data.Vote;
            this.tableLoading = false;
        });
    }
    ngOnInit() {
        this.getTable();
    }
}
