import { Component, OnInit, Inject } from '@angular/core';
import { MenuService } from '@delon/theme';
import { Router } from '@angular/router';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { Logger } from 'angular2-logger/core';
import { I18NService } from '@core/i18n/i18n.service';
@Component({
    styleUrls: ['./index.component.less'],
    templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {
    constructor(
        private menuService: MenuService,
        private i18: I18NService,
        private router: Router,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private log: Logger) {
    }
    public echartOption1: any;
    public echartOption2: any;
    initCharts() {
        this.echartOption1 = {
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c}人({d}%)'
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: ['优秀', '中等偏上', '中等', '中等偏下', '良好']
            },
            series: [
                {
                    type: 'pie',
                    radius: '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data: [
                        { value: 5, name: '优秀' },
                        { value: 4, name: '中等偏上' },
                        { value: 10, name: '中等' },
                        { value: 6, name: '中等偏下' },
                        { value: 5, name: '良好' },
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        this.echartOption2 = {
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c}人'
            },
            xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [30, 23, 30, 25, 27],
                type: 'bar'
            }]
        };
    }
    intro;
    userName;
    ngOnInit() {
        // 若用户未登录则跳转至登录页面
        if (!this.tokenService.get().token) {
            this.router.navigate(['/passport/login']);
        } else {
            if (this.i18.currentLang === 'zh-CN') {
                this.intro = '欢迎使用学员综合素质测评系统';
            } else if (this.i18.currentLang === 'en') {
                this.intro = 'Welcome to use Comprehensive quality evaluation system for students';
            }
            this.userName = this.tokenService.get().name;
            this.initCharts();
        }
        this.menuService.resume();
    }
}
