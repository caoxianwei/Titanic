import { Component, OnInit, Input } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { TeacherService } from '@core/common/common.service';
import { Logger } from 'angular2-logger/core';
@Component({
    selector: 'result',
    templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {
    @Input() id: any;
    constructor(
        private modal: NzModalService,
        private teacherService: TeacherService,
        private log: Logger,
        private notice: NzNotificationService) {
    }
    tableData = [];
    tableLoading = false;
    getTable() {
        this.tableLoading = true;
        this.teacherService.getVoteResult(this.id).subscribe((data: any) => {
            this.tableData = data;
            this.tableLoading = false;
        });
    }
    ngOnInit() {
        this.getTable();
    }
}
