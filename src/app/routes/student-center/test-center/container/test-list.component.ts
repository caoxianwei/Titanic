import { Component, OnInit } from '@angular/core';
import { SimpleTableColumn } from '@delon/abc';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { EntranceTestService, BasicConfigurationService, QuestionService } from '@core/common/common.service';
import { AnimalTestComponent } from '../character-test/animal-test/animal-test.component';
import { ColorTestComponent } from '../character-test/color-test/color-test.component';
import { NineHouseTestComponent } from '../character-test/nine-house-test/nine-house-test.component';
import { ProfessionTestComponent } from '../profession-test/profession-test.component';
import { ThinkingTestComponent } from '../thinking-test/thinking-test.component';
import { ProjectComponent } from '../stage-test/project.component';
import { Logger } from 'angular2-logger/core';
import { MenuService } from '@delon/theme';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';

import swal, { SweetAlertType } from 'sweetalert2';
@Component({
    selector: 'test-center',
    templateUrl: './test-list.component.html'
})
export class TestListComponent implements OnInit {
    constructor(
        private msg: NzMessageService,
        private modal: NzModalService,
        private http: _HttpClient,
        private entranceTestService: EntranceTestService,
        private basicConfigurationService: BasicConfigurationService,
        private questionService: QuestionService,
        public aclSrv: ACLService,
        private menuSrv: MenuService,
        private router: Router,
        private log: Logger) {
    }

    setRole(value: string | boolean) {
        this.aclSrv.setFull(typeof value === 'boolean' ? value : false);
        this.aclSrv.set({ role: [value as string] });
        // this.menuSrv.clear();
        this.menuSrv.resume();
        this.router.navigate(['/welcome']);
    }
    tableData = [];
    tableLoading = true;
    getTableData = () => {
        this.tableLoading = true;
        this.entranceTestService.getEntranceTests().subscribe((data: any) => {
            this.tableLoading = false;
            if (data.value) {
                this.tableData = data.value;
                for (const key in this.tableData) {
                    if (this.tableData.hasOwnProperty(key)) {
                        const element = this.tableData[key];
                        // 入学测试部分
                        if (this.tableData[key].name === '性格测试') {
                            this.tableData[key].describe = '通过一些选择题,快速地了解你的性格特征';
                        } else if (this.tableData[key].name === '专业能力测试') {
                            this.tableData[key].describe = '通过选择、判断、填空、问答的方式,准确地了解你的专业基础';
                        } else if (this.tableData[key].name === '思维能力测试') {
                            this.tableData[key].describe = '通过题目,对你的思维能力有个大致的了解';
                        } else {
                            this.tableData[key].describe = '无';
                        }
                        // 阶段测试部分
                        if (this.tableData[key].stage_id === 1) {
                            this.tableData[key].describe = '2014-2015第一学期';
                            this.tableData[key].name = '阶段测评';
                        } else if (this.tableData[key].stage_id === 2) {
                            this.tableData[key].describe = '2014-2015第二学期';
                            this.tableData[key].name = '阶段测评';
                        } else if (this.tableData[key].stage_id === 3) {
                            this.tableData[key].describe = '2015-2016第一学期';
                            this.tableData[key].name = '阶段测评';
                        } else if (this.tableData[key].stage_id === 4) {
                            this.tableData[key].describe = '2015-2016第二学期';
                            this.tableData[key].name = '阶段测评';
                        } else if (this.tableData[key].stage_id === 5) {
                            this.tableData[key].describe = '2016-2017第一学期';
                            this.tableData[key].name = '阶段测评';
                        } else if (this.tableData[key].stage_id === 6) {
                            this.tableData[key].describe = '2016-2017第二学期';
                            this.tableData[key].name = '阶段测评';
                        } else if (this.tableData[key].stage_id === 7) {
                            this.tableData[key].describe = '2017-2018第一学期';
                            this.tableData[key].name = '阶段测评';
                        } else if (this.tableData[key].stage_id === 8) {
                            this.tableData[key].describe = '2017-2018第二学期';
                            this.tableData[key].name = '阶段测评';
                        }
                    }
                }
            } else {
                this.tableData = [];
            }
        });
    }

    ngOnInit() {
        this.getTableData();
    }
    // 阶段测评主观题部分
    showProject(id) {
        this.log.log('阶段测评主观题部分id:');
        this.log.debug(id);
        this.modal.open({
            wrapClassName: 'modal-md',
            content: ProjectComponent,
            footer: false,
            maskClosable: false,
            componentParams: {
                id: id
            }
        });
    }
    // 开始做题
    doTest(id) {
        let modal;
        const options = {};
        // 获取当前语言环境下其他配置参数
        const result = this.basicConfigurationService.getForbiddanceOptions();
        options['title'] = result['title'];
        options['type'] = result['type'];
        options['confirmButtonText'] = result['confirmButtonText'];
        if (id === 1) {// 性格测试
            this.questionService.getCharacterTests().subscribe((data: any) => {
                if (data.code === 400) {// 已做过测试题后服务器返回的数据
                    swal(options);
                } else {
                    if (data.questype.id === 4) {
                        modal = this.modal.open({
                            wrapClassName: 'modal-md',
                            content: AnimalTestComponent,
                            footer: false,
                            maskClosable: false
                        });
                    } else if (data.questype.id === 5) {
                        modal = this.modal.open({
                            wrapClassName: 'modal-md',
                            content: ColorTestComponent,
                            footer: false,
                            maskClosable: false
                        });
                    } else if (data.questype.id === 6) {
                        modal = this.modal.open({
                            wrapClassName: 'modal-lg',
                            content: NineHouseTestComponent,
                            footer: false,
                            maskClosable: false
                        });
                    }
                    // 监听modal返回值
                    modal.subscribe(res => {
                        if (res === true) {// 当返回值为true时,意味着测试已完成
                            // 刷新table
                            this.getTableData();
                        }
                    });
                }
            });
        } else if (id === 2) {// 专业能力测试
            this.questionService.getProfessionTests().subscribe((data: any) => {
                if (data.code === 400) {// 已做过测试题后服务器返回的数据
                    swal(options);
                } else {
                    this.router.navigate(['student-center/professtion-test']);
                }
            });
        } else if (id === 3) {// 思维能力测试
            this.questionService.getThinkingTests().subscribe((data: any) => {
                if (data.code === 400) {
                    swal(options);
                } else {
                    modal = this.modal.open({
                        wrapClassName: 'modal-md',
                        content: ThinkingTestComponent,
                        footer: false,
                        maskClosable: false
                    }).subscribe(res => {
                        if (res === true) {// 当返回值为true时,意味着测试已完成
                            // 刷新table
                            this.getTableData();
                        }
                    });
                }
            });
        } else {// 阶段测试
            this.router.navigate(['/student-center/stage-test'], { queryParams: { id: id } });
        }
    }
}
