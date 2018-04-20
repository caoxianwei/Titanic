import { Component, OnInit, Inject, Optional, HostListener } from '@angular/core';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { BasicConfigurationService, QuestionService } from '@core/common/common.service';
import { TitleService } from '@delon/theme';
import { Logger } from 'angular2-logger/core';
import { Router } from '@angular/router';
import { ReuseTabService } from '@delon/abc';
import * as moment from 'moment';
@Component({
    selector: 'profession-test',
    templateUrl: './profession-test.component.html'
})
export class ProfessionTestComponent implements OnInit {
    constructor(
        private questionService: QuestionService,
        private basicConfigurationService: BasicConfigurationService,
        private titleService: TitleService,
        private notification: NzNotificationService,
        private msg: NzMessageService,
        private log: Logger,
        private router: Router,
        @Optional() @Inject(ReuseTabService) private reuseTabService: ReuseTabService
    ) { }
    config: any = {
        template: `$!m!分$!s!秒`,
        leftTime: 900,
        size: 'medium',
        notify: [300]
    };
    alertRestTime() {
        this.msg.warning('剩余答题时间仅剩5分钟,请抓紧时间!');
    }
    toIndex() {
        this.router.navigate(['/welcome']);
        setTimeout(() => {// 延时销毁,适应官方API
            this.reuseTabService.clear();
        }, 100);
    }
    submit() {
        const result = {
            'choice': [],
            'judgment': [],
            'completion': [],
            'answer': []
        };
        for (let index = 0; index < this.choice.length; index++) {
            this.choice[index].info = JSON.stringify(this.choice[index].info);
            result.choice.push(this.choice[index]);
        }
        for (let index = 0; index < this.judgment.length; index++) {
            this.judgment[index].info = JSON.stringify(this.judgment[index].info);
            result.judgment.push(this.judgment[index]);
        }
        for (let index = 0; index < this.completion.length; index++) {
            result.completion.push(this.completion[index]);
        }
        for (let index = 0; index < this.answer.length; index++) {
            result.answer.push(this.answer[index]);
        }
        this.log.log('打印即将发送给服务器的专业测试结果');
        this.log.debug(result);
        this.questionService.sendEntranceTestsResult(undefined, this.entest_id, undefined, JSON.stringify(result.choice), JSON.stringify(result.judgment), JSON.stringify(result.completion), JSON.stringify(result.answer)).subscribe();
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
    }
    panels = [
        {
            active: true,
            disabled: false,
            name: '选择题',
            type: 0,
            questions: ''
        },
        {
            active: false,
            disabled: false,
            name: '判断题',
            type: 2,
            questions: ''
        },
        {
            active: false,
            disabled: false,
            name: '填空题',
            type: 3,
            questions: ''
        },
        {
            active: false,
            disabled: false,
            name: '简答题',
            type: 4,
            questions: ''
        }
    ];
    // 当浏览器关闭的时候自动提交答案
    @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler(event): void {
        this.submit();
    }
    total;
    entest_id;
    choice;
    answer;
    completion;
    judgment;
    getTestsData(): void {
        this.questionService.getProfessionTests().subscribe((data: any) => {
            if (data.code === 400) {// 已做过测试题后服务器返回的数据
                this.toIndex();
            } else {
                this.entest_id = data.questype.id;
                this.choice = data.question.choice;
                for (let i = 0; i < this.choice.length; i++) {
                    this.choice[i].info = JSON.parse(this.choice[i].info);
                    this.choice[i].userAnswer = '';
                }
                this.judgment = data.question.judgment;
                for (let i = 0; i < this.choice.length; i++) {
                    this.judgment[i].info = JSON.parse(this.judgment[i].info);
                    this.judgment[i].userAnswer = false; // 先默认全部是选择错误判断
                }
                this.completion = data.question.completion;
                for (let i = 0; i < this.completion.length; i++) {
                    this.completion[i].userAnswer = '';
                }
                this.answer = data.question.answer;
                for (let i = 0; i < this.answer.length; i++) {
                    this.answer[i].userAnswer = '';
                }
                this.resultPrepare['status'] = false;
                this.resultPrepare['type'] = 'success';
                const language = this.basicConfigurationService.getCurrentLanguage();
                if (language === 'zh-CN') {
                    this.resultPrepare['title'] = '题库已加载完毕!';
                } else if (language === 'en') {
                    this.resultPrepare['title'] = 'The question library has been loaded!';
                }
            }
        });
    }
    resultPrepare = {}; // 加载题库完成前的UI配置
    showTest = false;
    resetCount = true;
    ngOnInit() {
        this.titleService.setTitle('专业能力测试');
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
        this.getTestsData();
    }
    // 开始答题
    showPrepare = true; // 在题库加载完毕之前的UI展示
    startTest() {
        this.showTest = true;
        this.showPrepare = false;
        this.notification.blank('提示', '倒计时结束或关闭浏览器均会自动提交测试结果,请注意把握时间!', {nzDuration: 0});
    }
    resultSuccess = {}; // 用来提醒[答题已完成]的配置
    showSuccess = false; // 用来提醒答题已完成
}
