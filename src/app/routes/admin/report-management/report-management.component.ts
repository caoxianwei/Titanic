import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { AdminService } from '../admin.service';
import { Logger } from 'angular2-logger/core';
import { CreateOrEditReportManagementEntranComponent } from './create-or-edit-report-management-entran.component';
import { I18NService } from '@core/i18n/i18n.service';
@Component({
    templateUrl: './report-management.component.html'
})
export class ReportManagementComponent implements OnInit {
    constructor(
        private modal: NzModalService,
        private msg: NzMessageService,
        private service: AdminService,
        private log: Logger,
        private i18: I18NService) {
    }
    typeChange() {
        setTimeout(() => {
            this.getTableData();
        }, 1);
    }
    type = 1;
    tableData = [];
    tablePageIndex = 1;
    tablePageSize = 10;
    tableTotal = 0;
    tableLoading = false;
    prepareData;
    getTableData() {
        if (this.type === 1) {
            this.tableLoading = true;
            this.service.getReportList(this.type, this.tablePageIndex, this.tablePageSize).subscribe((data: any) => {
                this.service.getReportPrepare(1).subscribe((prepareData: any) => {
                    this.prepareData = prepareData;
                    for (const key in prepareData.major) {
                        if (prepareData.major.hasOwnProperty(key)) {
                            const element = prepareData.major[key];
                            for (const key2 in data.enreport) {
                                if (data.enreport.hasOwnProperty(key2)) {
                                    const element2 = data.enreport[key2];
                                    if (element.id === element2.major_id) {
                                        element2.majorName = element.name;
                                    }
                                }
                            }
                        }
                    }
                    for (const key in prepareData.characterlabel) {
                        if (prepareData.characterlabel.hasOwnProperty(key)) {
                            const element = prepareData.characterlabel[key];
                            for (const key2 in data.enreport) {
                                if (data.enreport.hasOwnProperty(key2)) {
                                    const element2 = data.enreport[key2];
                                    if (element.id === element2.characterlabel_id) {
                                        element2.characterName = element.name;
                                    }
                                }
                            }
                        }
                    }
                    for (const key in prepareData.branchlabel) {
                        if (prepareData.branchlabel.hasOwnProperty(key)) {
                            const element = prepareData.branchlabel[key];
                            for (const key2 in data.enreport) {
                                if (data.enreport.hasOwnProperty(key2)) {
                                    const element2 = data.enreport[key2];
                                    if (element.id === element2.branchlabel_id) {
                                        element2.branchName = element.name;
                                    }
                                }
                            }
                        }
                    }
                    for (const key in prepareData.majorlabel) {
                        if (prepareData.majorlabel.hasOwnProperty(key)) {
                            const element = prepareData.majorlabel[key];
                            for (const key2 in data.enreport) {
                                if (data.enreport.hasOwnProperty(key2)) {
                                    const element2 = data.enreport[key2];
                                    if (element.id === element2.majorlabel_id) {
                                        element2.majorlabelName = element.name;
                                    }
                                }
                            }
                        }
                    }
                });
                for (const key in data.enreport) {
                    if (data.enreport.hasOwnProperty(key)) {
                        const element = data.enreport[key];
                        const content = element.content;
                        if (content.length > 7) {
                            element.intro = element.content.substring(0, 7);
                            element.intro += '...';
                        } else {
                            element.intro = element.content;
                        }
                    }
                }
                this.log.log('打印入学报告处理结果之后的json');
                this.log.debug(data.enreport);
                this.tableData = data.enreport;
                this.tableTotal = data.count;
                this.tableLoading = false;
            });
        } else if (this.type === 2) {
            this.tableLoading = true;
            this.service.getReportList(this.type, this.tablePageIndex, this.tablePageSize).subscribe((data: any) => {
                for (const key in data.stage_report) {
                    if (data.stage_report.hasOwnProperty(key)) {
                        const element = data.stage_report[key];
                        const content = element.content;
                        if (content.length > 14) {
                            element.intro = element.content.substring(0, 14);
                            element.intro += '...';
                        } else {
                            element.intro = element.content;
                        }
                        if (element.type === 1) {
                            element.typeName = '道德';
                        } else if (element.type === 2) {
                            element.typeName = '素质';
                        } else if (element.type === 3) {
                            element.typeName = '学习能力';
                        } else if (element.type === 4) {
                            element.typeName = '团队交际';
                        } else if (element.type === 5) {
                            element.typeName = '体育';
                        } else if (element.type === 6) {
                            element.typeName = '专业成绩';
                        }
                    }
                }
                this.tableData = data.stage_report;
                this.tableTotal = data.count;
                this.tableLoading = false;
            });
        }
    }
    confirmText;
    ngOnInit() {
        if (this.i18.currentLang === 'zh-CN') {
            this.confirmText = '确认要删除吗?';
        } else if (this.i18.currentLang === 'zh-CN') {
            this.confirmText = 'wanna delete it?';
        }
        this.getTableData();
    }
    createOrEdit(obj?: any) {
        if (!obj) {// 不存在
            this.modal.open({
                wrapClassName: 'modal-md',
                content: CreateOrEditReportManagementEntranComponent,
                footer: false,
                maskClosable: false,
                componentParams: {
                    obj: obj,
                    prepareData: this.prepareData
                }
            }).subscribe(result => {
                if (result['finish'] === true) {
                    this.service.addRole(result['name']).subscribe(() => {
                        this.getTableData();
                    });
                }
            });
        } else {// 存在
            if (this.type === 1) {
                this.modal.open({
                    wrapClassName: 'modal-md',
                    content: CreateOrEditReportManagementEntranComponent,
                    footer: false,
                    maskClosable: false,
                    componentParams: {
                        obj: obj,
                        prepareData: this.prepareData
                    }
                }).subscribe(result => {
                    if (result['finish'] === true) {
                        this.service.updateEntranceReport(obj.id, result['content']).subscribe(() => {
                            this.getTableData();
                        });
                    }
                });
            }
        }
    }
    delete(id: any) {
        this.tableLoading = true;
        this.service.deleteRole(id).subscribe((data: any) => {
            this.getTableData();
            this.msg.success('删除成功！');
        });
    }
}
