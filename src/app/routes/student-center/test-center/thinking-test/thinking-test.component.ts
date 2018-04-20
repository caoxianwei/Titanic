import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject, NzModalService } from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';
import { BasicConfigurationService, QuestionService } from '@core/common/common.service';
import { HttpClient } from '@angular/common/http';
import { Logger } from 'angular2-logger/core';

@Component({
    selector: 'thinking-test',
    templateUrl: './thinking-test.component.html'
})
export class ThinkingTestComponent implements OnInit {
    constructor(
        private questionService: QuestionService,
        private basicConfigurationService: BasicConfigurationService,
        private nzModalSubject: NzModalSubject,
        private nzModalService: NzModalService,
        private httpClient: HttpClient,
        private log: Logger) { }
    questions = [];
    total;
    entest_id;
    getTests(): void {
        this.questionService.getThinkingTests().subscribe((data: any) => {
            this.log.log('打印思维测试返回数据');
            this.log.debug(data);
            this.entest_id = data.questype.id;
            this.questions = data.question;
            this.total = data.count;
            this.resultPrepare['status'] = false;
            this.resultPrepare['type'] = 'success';
            for (let i = 0; i < this.questions.length; i++) {
                this.questions[i].info = JSON.parse(this.questions[i].info);
            }
            const language = this.basicConfigurationService.getCurrentLanguage();
            if (language === 'zh-CN') {
                this.resultPrepare['title'] = '题库已加载完毕!';
            } else if (language === 'en') {
                this.resultPrepare['title'] = 'The question library has been loaded!';
            }
        });
    }
    resultPrepare = {}; // 加载题库完成前的UI配置
    showTest = false;
    ngOnInit() {
        const language = this.basicConfigurationService.getCurrentLanguage();
        if (language === 'zh-CN') {
            this.resultPrepare = {
                type: 'error',
                title: '题库正在加载中...',
                status: 'true'
            };
        } else if (language === 'en') {
            this.resultPrepare = {
                type: 'error',
                title: 'The question library is being loaded...',
                status: 'true'
            };
        }
        this.getTests();
    }
    // 开始答题
    startTest() {
        this.showTest = true;
        this.showPrepare = false;
    }
    tiger = 0;
    peacock = 0;
    koala = 0;
    owl = 0;
    chameleon = 0;
    currentIndex = 0; // 当前题目序号-1
    progress = 0; // 进度条参数
    showPrepare = true; // 在题库加载完毕之前的UI展示
    showSuccess = false; // 用来提醒答题已完成
    controlDisabled = false; // 用来控制单选的可选性
    pre() {// 当用户点击回退时,
        this.currentIndex--;
        this.progress = parseInt((((this.currentIndex) / this.total) * 100).toFixed(0), 10);
    }
    resultSuccess = {}; // 用来提醒[答题已完成]的配置
    // num是题型
    countResult(index) {
        if (!this.controlDisabled) {
            this.controlDisabled = true;
            this.progress = parseInt((((this.currentIndex + 1) / this.total) * 100).toFixed(0), 10);
            setTimeout(() => {
                this.currentIndex++;
                if (this.currentIndex === this.total) {
                    const useranswer = [];
                    let score = 0;
                    let result;
                    for (const key in this.questions) {
                        useranswer.push({ title: this.questions[key].title, info: JSON.stringify(this.questions[key].info), answer: this.questions[key].answer, userAnswer: this.questions[key].userAnswer });
                        if (this.questions[key].userAnswer === this.questions[key].answer) {
                            score++;
                        }
                    }
                    if ((score / this.total) * 100 > 50) {
                        result = 19;
                    } else {
                        result = 20;
                    }
                    this.log.log('打印思维测评分数');
                    this.log.debug((score / this.total) * 100);
                    this.log.log('已完成思维测试,现打印即将发送给服务器的数据');
                    this.log.debug(useranswer);
                    this.questionService.sendEntranceTestsResult(result, this.entest_id, JSON.stringify(useranswer)).subscribe(() => {
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
                    this.hasFinishedTest = true;
                }
            }, 500);
            setTimeout(() => {
                this.controlDisabled = false;
            }, 1000);
        }
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
