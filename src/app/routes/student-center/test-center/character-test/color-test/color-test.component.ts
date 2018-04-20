import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject, NzModalService } from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';
import { BasicConfigurationService, QuestionService } from '@core/common/common.service';
import { Logger } from 'angular2-logger/core';

@Component({
    selector: 'color-test',
    templateUrl: './color-test.component.html'
})
export class ColorTestComponent implements OnInit {
    constructor(
        private questionService: QuestionService,
        private basicConfigurationService: BasicConfigurationService,
        private nzModalSubject: NzModalSubject,
        private nzModalService: NzModalService,
        private log: Logger
    ) { }
    questions = [];
    total;
    getAnimalTests(): void {
        this.questionService.getCharacterTests().subscribe((data: any) => {
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
        this.getAnimalTests();
    }
    // 开始答题
    startTest() {
        this.showTest = true;
        this.showPrepare = false;
    }
    pre_A = 0;
    pre_B = 0;
    pre_C = 0;
    pre_D = 0;
    suf_A = 0;
    suf_B = 0;
    suf_C = 0;
    suf_D = 0;
    currentIndex = 0; // 当前题目序号-1
    progress = 0; // 进度条参数
    radioValue; // 单选框选中值
    showPrepare = true; // 在题库加载完毕之前的UI展示
    showSuccess = false; // 用来提醒答题已完成
    controlDisabled = false; // 用来控制单选的可选性
    clickEvent = []; // 将每次选中的类型放入数组,每次回退时,根据最后一个元素对该数据进行自减操作
    pre() {// 当用户点击回退时,
        const obj = this.clickEvent.pop(); // 取出最后一个元素并删除
        if (obj.type === 'pre_A') {
            this.pre_A--;
        } else if (obj.type === 'pre_B') {
            this.pre_B--;
        } else if (obj.type === 'pre_C') {
            this.pre_C--;
        } else if (obj.type === 'pre_D') {
            this.pre_D--;
        } else if (obj.type === 'suf_A') {
            this.suf_A--;
        } else if (obj.type === 'suf_B') {
            this.suf_B--;
        } else if (obj.type === 'suf_C') {
            this.suf_C--;
        } else if (obj.type === 'suf_D') {
            this.suf_D--;
        }
        this.currentIndex--;
        this.progress = parseInt((((this.currentIndex) / this.total) * 100).toFixed(0), 10);
        console.warn('-----print color score-----');
        console.log('pre_A=' + (this.pre_A));
        console.log('pre_B=' + (this.pre_B));
        console.log('pre_C=' + (this.pre_C));
        console.log('pre_D=' + (this.pre_D));
        console.log('suf_A=' + (this.suf_A));
        console.log('suf_B=' + (this.suf_B));
        console.log('suf_C=' + (this.suf_C));
        console.log('suf_D=' + (this.suf_D));
    }
    resultSuccess = {}; // 用来提醒[答题已完成]的配置
    countResult(title, info, selected, num) {
        if (!this.controlDisabled) {
            this.controlDisabled = true;
            if (num <= 15) {
                if (this.radioValue === 'A') {
                    // this.clickEvent.push('pre_A');
                    this.clickEvent.push({ title: title, info: JSON.stringify(info), selected: selected, num: num, type: 'pre_A' });
                    this.pre_A++;
                } else if (this.radioValue === 'B') {
                    // this.clickEvent.push('pre_B');
                    this.clickEvent.push({ title: title, info: JSON.stringify(info), selected: selected, num: num, type: 'pre_B' });
                    this.pre_B++;
                } else if (this.radioValue === 'C') {
                    // this.clickEvent.push('pre_C');
                    this.clickEvent.push({ title: title, info: JSON.stringify(info), selected: selected, num: num, type: 'pre_C' });
                    this.pre_C++;
                } else if (this.radioValue === 'D') {
                    // this.clickEvent.push('pre_D');
                    this.clickEvent.push({ title: title, info: JSON.stringify(info), selected: selected, num: num, type: 'pre_D' });
                    this.pre_D++;
                }
            } else {
                if (this.radioValue === 'A') {
                    // this.clickEvent.push('suf_A');
                    this.clickEvent.push({ title: title, info: JSON.stringify(info), selected: selected, num: num, type: 'suf_A' });
                    this.suf_A++;
                } else if (this.radioValue === 'B') {
                    // this.clickEvent.push('suf_B');
                    this.clickEvent.push({ title: title, info: JSON.stringify(info), selected: selected, num: num, type: 'suf_B' });
                    this.suf_B++;
                } else if (this.radioValue === 'C') {
                    // this.clickEvent.push('suf_C');
                    this.clickEvent.push({ title: title, info: JSON.stringify(info), selected: selected, num: num, type: 'suf_C' });
                    this.suf_C++;
                } else if (this.radioValue === 'D') {
                    // this.clickEvent.push('suf_D');
                    this.clickEvent.push({ title: title, info: JSON.stringify(info), selected: selected, num: num, type: 'suf_D' });
                    this.suf_D++;
                }
            }
            console.warn('-----print color score-----');
            console.log('pre_A=' + (this.pre_A));
            console.log('pre_B=' + (this.pre_B));
            console.log('pre_C=' + (this.pre_C));
            console.log('pre_D=' + (this.pre_D));
            console.log('suf_A=' + (this.suf_A));
            console.log('suf_B=' + (this.suf_B));
            console.log('suf_C=' + (this.suf_C));
            console.log('suf_D=' + (this.suf_D));
            this.log.log('-----打印事件记录器-----');
            this.log.debug(this.clickEvent);
            this.progress = parseInt((((this.currentIndex + 1) / this.total) * 100).toFixed(0), 10);
            setTimeout(() => {
                this.radioValue = undefined;
                this.currentIndex++;
                if (this.currentIndex === this.total) {
                    const red = this.pre_A + this.suf_D;
                    const blue = this.pre_B + this.suf_C;
                    const yellow = this.pre_C + this.suf_B;
                    const green = this.pre_D + this.suf_A;
                    const maxScore = Math.max(red, blue, yellow, green);
                    let result: number;
                    if (maxScore === red) {
                        this.log.log('red');
                        result = 6;
                    } else if (maxScore === yellow) {
                        this.log.log('yellow');
                        result = 7;
                    } else if (maxScore === blue) {
                        this.log.log('blue');
                        result = 8;
                    } else if (maxScore === green) {
                        this.log.log('green');
                        result = 9;
                    }
                    this.log.debug('red:' + red);
                    this.log.debug('blue:' + blue);
                    this.log.debug('yellow:' + yellow);
                    this.log.debug('green:' + green);
                    this.questionService.sendEntranceTestsResult(result, 5, JSON.stringify(this.clickEvent)).subscribe(() => { 
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
            }, 2000);
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
