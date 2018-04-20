import { NzMessageService, NzModalSubject, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicConfigurationService, QuestionService } from '@core/common/common.service';
import { Logger } from 'angular2-logger/core';

@Component({
    selector: 'nine-house-test',
    templateUrl: './nine-house-test.component.html'
})
export class NineHouseTestComponent implements OnInit {
    constructor(
        private questionService: QuestionService,
        private basicConfigurationService: BasicConfigurationService,
        private nzModalSubject: NzModalSubject,
        private nzModalService: NzModalService,
        private msg: NzMessageService,
        private log: Logger
    ) { }
    paginationChange() {
        this.log.log('触发了函数paginationChange()');
        const value = this.nzPageIndex * 30;
        this.column3Start = value - 9;
        this.column3End = value;
        this.column2Start = value - 19;
        this.column2End = value - 10;
        this.column1Start = value - 29;
        this.column1End = value - 20;
    }
    column1Start = 1;
    column1End = 10;
    column2Start = 11;
    column2End = 20;
    column3Start = 21;
    column3End = 30;
    controlSubmit = true;
    questions = [];
    nzPageIndex = 1;
    total;
    getNineHouseTests(): void {
        this.questionService.getCharacterTests().subscribe((data: any) => {
            this.questions = data.question;
            this.total = data.count;
            this.resultPrepare['status'] = false;
            this.resultPrepare['type'] = 'success';
            console.log(this.questions);
            const language = this.basicConfigurationService.getCurrentLanguage();
            if (language === 'zh-CN') {
                this.resultPrepare['title'] = '题库已加载完毕!';
            } else if (language === 'en') {
                this.resultPrepare['title'] = 'The question library has been loaded!';
            }
        });
    }
    enBoolean = false;
    zhBoolean = false;
    resultPrepare = {}; // 加载题库完成前的UI配置
    showTest = false;
    ngOnInit() {
        setTimeout(() => {
            this.getNineHouseTests();
        }, 2000);
        const language = this.basicConfigurationService.getCurrentLanguage();
        if (language === 'en') {
            this.resultPrepare = {
                type: 'error',
                title: 'The question library is being loaded...',
                status: 'true'
            };
            this.enBoolean = true;
        } else if (language === 'zh-CN') {
            this.resultPrepare = {
                type: 'error',
                title: '题库正在加载中...',
                status: 'true'
            };
            this.zhBoolean = true;
        }
    }
    showPrepare = true; // 在题库加载完毕之前的UI展示
    // 开始答题
    startTest() {
        this.controlCountDown = true;
        this.showTest = true;
        this.showPrepare = false;
    }
    // 倒计时运行提交时间
    controlCountDown = false;
    zhConfig: any = {
        template: `还有$!s!秒才能提交`,
        leftTime: 60
    };
    enConfig: any = {
        template: `There are $!s! seconds to submit`,
        leftTime: 60
    };
    updateControlSubmit() {
        this.controlCountDown = false;
        this.controlSubmit = false;
    }
    resultSuccess = {}; // 用来提醒[答题已完成]的配置
    showSuccess = false; // 用来提醒答题已完成
    save() {
        const record = {
            selected: [],
            unSelected: []
        };
        let result;
        for (const key in this.questions) {
            if (this.questions[key].userAnswer === true) {
                record.selected.push({ title: this.questions[key].title, num: this.questions[key].num });
                const num = this.questions[key].num;
                // 判断num属于第几型人格
                if (num === 2 || num === 14 || num === 55 || num === 57 || num === 60 || num === 63 || num === 73 || num === 81 || num === 87 || num === 91 || num === 97 || num === 102 || num === 104 || num === 106) { // 第1种
                    result = 10;
                } else if (num === 6 || num === 8 || num === 22 || num === 30 || num === 69 || num === 71 || num === 79 || num === 82 || num === 85 || num === 86 || num === 89 || num === 90) { // 第2种
                    result = 11;
                } else if (num === 20 || num === 33 || num === 38 || num === 59 || num === 65 || num === 67 || num === 70 || num === 72 || num === 74 || num === 77 || num === 80 || num === 93) { // 第3种
                    result = 12;
                } else if (num === 7 || num === 13 || num === 17 || num === 52 || num === 53 || num === 54 || num === 56 || num === 58 || num === 61 || num === 64 || num === 100 || num === 105) { // 第4种
                    result = 13;
                } else if (num === 3 || num === 19 || num === 23 || num === 32 || num === 42 || num === 43 || num === 47 || num === 48 || num === 51 || num === 83 || num === 88 || num === 99 || num === 101) { // 第5种
                    result = 14;
                } else if (num === 9 || num === 6 || num === 26 || num === 29 || num === 31 || num === 35 || num === 37 || num === 45 || num === 46 || num === 68 || num === 75) { // 第6种
                    result = 15;
                } else if (num === 4 || num === 16 || num === 18 || num === 21 || num === 28 || num === 49 || num === 78 || num === 92 || num === 103) { // 第7种
                    result = 16;
                } else if (num === 5 || num === 11 || num === 24 || num === 27 || num === 40 || num === 44 || num === 50 || num === 66 || num === 76 || num === 84 || num === 95 || num === 96) { // 第8种
                    result = 17;
                } else if (num === 1 || num === 12 || num === 15 || num === 25 || num === 34 || num === 36 || num === 39 || num === 41 || num === 62 || num === 94 || num === 98 || num === 107 || num === 108) { // 第9种
                    result = 18;
                }
            } else {
                record.unSelected.push({ title: this.questions[key].title, num: this.questions[key].num });
            }
        }
        this.log.log('打印即将发送给服务器的用户答案');
        this.log.debug(record);
        this.questionService.sendEntranceTestsResult(result, 6, JSON.stringify(record)).subscribe(() => { 
            this.nzModalSubject.next(true); // 通知主页面,已完成测试
        });
        // 提醒成功完成测试
        const language = this.basicConfigurationService.getCurrentLanguage();
        if (language === 'zh-CN') {
            this.resultSuccess = {
                title: '已完成!',
                description: '我们将对你的测试结果进行保密,由系统自动分析并给出建议,请注意查收!'
            };
        } else if (language === 'en') {
            this.resultSuccess = {
                title: 'Completed!',
                description: 'We will keep your test results confidential, automatically analyze and give advice from the system. Please pay attention to the inspection!'
            };
        }
        this.showSuccess = true;
        this.showTest = false;
        this.hasFinishedTest = true;
    }
    hasFinishedTest = false;
    close() {
        if (this.hasFinishedTest) {
            this.nzModalSubject.destroy();
        } else {
            // 配置默认参数
            const options = {
                zIndex: 1001,
                onOk: () => {
                    this.nzModalSubject.destroy();
                },
                maskClosable: false,
            };
            // 获取当前语言环境下其他配置参数
            const result = this.basicConfigurationService.getStopTestOptions();
            options['title'] = result['title'];
            options['content'] = result['content'];
            options['okText'] = result['okText'];
            options['cancelText'] = result['cancelText'];
            this.nzModalService.confirm(options);
        }
    }
}
