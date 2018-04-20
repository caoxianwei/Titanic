import { Component, OnInit, Inject, Optional, HostListener, Input } from '@angular/core';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { StageTestService } from './stage-test.service';
import { TitleService } from '@delon/theme';
import { Logger } from 'angular2-logger/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReuseTabService } from '@delon/abc';
import { I18NService } from '@core/i18n/i18n.service';
import * as moment from 'moment';
@Component({
    selector: 'stage-test',
    templateUrl: './stage-test.component.html'
})
export class StageTestComponent implements OnInit {
    constructor(
        private service: StageTestService,
        private titleService: TitleService,
        private notification: NzNotificationService,
        private msg: NzMessageService,
        private log: Logger,
        private i18: I18NService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        @Optional() @Inject(ReuseTabService) private reuseTabService: ReuseTabService
    ) {
        this.activatedRoute.queryParams.subscribe(data => {
            this.id = data.id;
            this.log.log(this.id);    
        });
    }
    id: any;
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
        this.service.submitStageTest(this.id, this.choice, this.judgment).subscribe();
        // 提醒成功完成测试
        const language = this.i18.currentLang;
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
        }
    ];
    // 当浏览器关闭的时候自动提交答案
    @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler(event): void {
        this.submit();
    }
    choice;
    judgment;
    getTestsData(): void {
        this.service.getStageTestQestions(this.id).subscribe((data: any) => {
            if (data.code === 400) {// 已做过测试题后服务器返回的数据
                this.toIndex();
            } else {
                this.choice = data.choice;
                for (const key in this.choice) {
                    if (this.choice.hasOwnProperty(key)) {
                        const element = this.choice[key];
                        element.info = JSON.parse(element.info);
                        element.userAnswer = '';
                    }
                }
                this.judgment = data.judgment;
                for (const key in this.judgment) {
                    if (this.judgment.hasOwnProperty(key)) {
                        const element = this.judgment[key];
                        element.info = JSON.parse(element.info);
                        element.userAnswer = false; // 先默认全部是选择错误判断
                    }
                }
                this.resultPrepare['status'] = false;
                this.resultPrepare['type'] = 'success';
                const language = this.i18.currentLang;
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
        this.titleService.setTitle('阶段测试');
        const language = this.i18.currentLang;
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
        this.notification.blank('提示', '倒计时结束或关闭浏览器均会自动提交测试结果,请注意把握时间!', { nzDuration: 0 });
    }
    resultSuccess = {}; // 用来提醒[答题已完成]的配置
    showSuccess = false; // 用来提醒答题已完成
}
