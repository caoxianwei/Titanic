import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { TeacherService } from '@core/common/common.service';
import { Logger } from 'angular2-logger/core';
import { I18NService } from '@core/i18n/i18n.service';
import { CreateOrEditStageManagementComponent } from './create-or-edit-stage-management.component';
@Component({
    selector: 'stage-management',
    templateUrl: './stage-management.component.html'
})
export class StageManagementComponent implements OnInit {
    constructor(
        private modal: NzModalService,
        private teacherService: TeacherService,
        private log: Logger,
        private msg: NzMessageService,
        private i18: I18NService) {
    }
    tableData = [];
    tableLoading = false;
    getTable() {
        this.tableLoading = true;
        this.teacherService.getStageTest().subscribe((data: any) => {
            this.tableData = data;
            this.tableLoading = false;
        });
    }
    createOrEdit(obj?: any) {
        this.teacherService.getStageTestByRandom().subscribe(data => {
            if (!obj) {
                if (data.code === 403) {
                    let tip;
                    if (this.i18.currentLang === 'zh-CN') {
                        tip = '当前阶段测评已生成,请勿重复添加!';
                    } else {
                        tip = 'The current stage evaluation has been generated, do not repeat!';
                    }
                    this.msg.warning(tip);
                } else {
                    const stage = data.stage;
                    this.modal.open({
                        wrapClassName: 'modal-md',
                        content: CreateOrEditStageManagementComponent,
                        footer: false,
                        maskClosable: false,
                        componentParams: {
                            obj: obj
                        }
                    }).subscribe(result => {
                        if (result['finished'] === true) {
                            this.teacherService.setStageTestProject(stage, result['Project_Name'], result['Project_Detail'], result['startime_at'], result['endtime_at']).subscribe(() => {
                                this.getTable();
                            });
                        }
                    });
                }
            } else {
                this.modal.open({
                    wrapClassName: 'modal-md',
                    content: CreateOrEditStageManagementComponent,
                    footer: false,
                    maskClosable: false,
                    componentParams: {
                        obj: obj
                    }
                }).subscribe(result => {
                    if (result['finished'] === true) {
                        this.teacherService.updateStageTestProject(obj.id, result['Project_Name'], result['Project_Detail'], result['startime_at'], result['endtime_at']).subscribe(() => {
                            this.getTable();
                        });
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
}
