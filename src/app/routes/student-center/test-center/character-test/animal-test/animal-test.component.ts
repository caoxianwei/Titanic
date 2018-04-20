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
    selector: 'animal-test',
    templateUrl: './animal-test.component.html'
})
export class AnimalTestComponent implements OnInit {
    constructor(
        private questionService: QuestionService,
        private basicConfigurationService: BasicConfigurationService,
        private nzModalSubject: NzModalSubject,
        private nzModalService: NzModalService,
        private httpClient: HttpClient,
        private log: Logger) { }
    questions = [];
    total;
    getAnimalTests(): void {
        this.questionService.getCharacterTests().subscribe((data: any) => {
            this.questions = data.question;
            this.log.debug(this.questions);
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
        this.getAnimalTests();
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
    radioValue; // 单选框选中值
    showPrepare = true; // 在题库加载完毕之前的UI展示
    showSuccess = false; // 用来提醒答题已完成
    controlDisabled = false; // 用来控制单选的可选性
    clickEvent = []; // 将每次选中的类型放入数组,每次回退时,根据最后一个元素对该数据进行自减操作
    pre() {// 当用户点击回退时,
        const obj = this.clickEvent.pop(); // 取出最后一个元素并删除
        this.log.log('print last animal data');
        this.log.debug('obj.type=' + (obj.type));
        this.log.debug('obj.score=' + (obj.score));
        if (obj.type === 'tiger') {
            this.tiger -= obj.score;
        } else if (obj.type === 'peacock') {
            this.peacock -= obj.score;
        } else if (obj.type === 'koala') {
            this.koala -= obj.score;
        } else if (obj.type === 'owl') {
            this.owl -= obj.score;
        } else if (obj.type === 'chameleon') {
            this.chameleon -= obj.score;
        }
        this.log.log('-----print animal score-----');
        this.log.debug('tiger=' + (this.tiger));
        this.log.debug('peacock=' + (this.peacock));
        this.log.debug('koala=' + (this.koala));
        this.log.debug('owl=' + (this.owl));
        this.log.debug('chameleon=' + (this.chameleon));
        this.currentIndex--;
        this.progress = parseInt((((this.currentIndex) / this.total) * 100).toFixed(0), 10);
    }
    resultSuccess = {}; // 用来提醒[答题已完成]的配置
    // num是题型
    countResult(title, info, selected, num) {
        if (!this.controlDisabled) {
            this.controlDisabled = true;
            const score = parseInt(this.radioValue, 10); // 将当前题的分数保存并转为number类型
            // 老虎类型
            if (num === 5 || num === 10 || num === 14 || num === 18 || num === 24 || num === 30) {
                // this.clickEvent.push(['tiger', score, title, info, selected, num]);
                this.clickEvent.push({ title: title, info: JSON.stringify(info), selected: selected, num: num, score: score, type: 'tiger' });
                this.tiger += score;
                // 孔雀类型
            } else if (num === 3 || num === 6 || num === 13 || num === 20 || num === 22 || num === 29) {
                // this.clickEvent.push(['peacock', score, title, info, selected, num]);
                this.clickEvent.push({ title: title, info: JSON.stringify(info), selected: selected, num: num, score: score, type: 'peacock' });
                this.peacock += score;
                // 考拉类型
            } else if (num === 2 || num === 8 || num === 15 || num === 17 || num === 25 || num === 28) {
                // this.clickEvent.push(['koala', score, title, info, selected, num]);
                this.clickEvent.push({ title: title, info: JSON.stringify(info), selected: selected, num: num, score: score, type: 'koala' });
                this.koala += score;
                // 猫头鹰类型
            } else if (num === 1 || num === 7 || num === 11 || num === 16 || num === 21 || num === 26) {
                // this.clickEvent.push(['owl', score, title, info, selected, num]);
                this.clickEvent.push({ title: title, info: JSON.stringify(info), selected: selected, num: num, score: score, type: 'owl' });
                this.owl += score;
                // 变色龙类型
            } else if (num === 4 || num === 9 || num === 12 || num === 19 || num === 23 || num === 27) {
                // this.clickEvent.push(['chameleon', score, title, info, selected, num]);
                this.clickEvent.push({ title: title, info: JSON.stringify(info), selected: selected, num: num, score: score, type: 'chameleon' });
                this.chameleon += score;
            }
            this.log.log('-----打印当前全局动物总分-----');
            this.log.debug('tiger=' + (this.tiger));
            this.log.debug('peacock=' + (this.peacock));
            this.log.debug('koala=' + (this.koala));
            this.log.debug('owl=' + (this.owl));
            this.log.debug('chameleon=' + (this.chameleon));
            this.log.log('-----打印事件记录器-----');
            this.log.debug(this.clickEvent);
            this.progress = parseInt((((this.currentIndex + 1) / this.total) * 100).toFixed(0), 10);
            setTimeout(() => {
                this.radioValue = undefined;
                this.currentIndex++;
                if (this.currentIndex === this.total) {
                    const maxScore = Math.max(this.tiger, this.peacock, this.koala, this.owl, this.chameleon);
                    let result: number;
                    this.log.log('-----测评结果-----');
                    if (maxScore === this.tiger) {
                        this.log.debug('tiger');
                        result = 1;
                    } else if (maxScore === this.peacock) {
                        this.log.debug('peacock');
                        result = 2;
                    } else if (maxScore === this.koala) {
                        this.log.debug('koala');
                        result = 3;
                    } else if (maxScore === this.owl) {
                        this.log.debug('owl');
                        result = 4;
                    } else if (maxScore === this.chameleon) {
                        this.log.debug('chameleon');
                        result = 5;
                    }
                    this.log.log('print final result');
                    this.log.debug('tiger=' + this.tiger);
                    this.log.debug('peacock=' + this.peacock);
                    this.log.debug('koala=' + this.koala);
                    this.log.debug('owl=' + this.owl);
                    this.log.debug('chameleon=' + this.chameleon);
                    this.questionService.sendEntranceTestsResult(result, 4, JSON.stringify(this.clickEvent)).subscribe(() => { 
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
