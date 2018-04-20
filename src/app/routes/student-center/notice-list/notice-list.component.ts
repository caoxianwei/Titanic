import { Component, OnInit } from '@angular/core';
import { NoticeListService } from './notice-list.service';
@Component({
    templateUrl: './notice-list.component.html'
})
export class NoticeListComponent implements OnInit {
    constructor(
        private service: NoticeListService
    ) {
    }
    tableData = [];
    tableLoading = false;
    getTable() {
        this.tableLoading = true;
        this.service.getNotices().subscribe((data: any) => {
            this.tableData = data;
            this.tableLoading = false;
        });
    }
    ngOnInit() {
        this.getTable();
    }
}
