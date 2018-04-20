import { Component, OnInit, Inject } from '@angular/core';
import { MenuService } from '@delon/theme';
import { Router } from '@angular/router';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { Logger } from 'angular2-logger/core';
import { I18NService } from '@core/i18n/i18n.service';
@Component({
    selector: 'welcome',
    styleUrls: ['./welcome.component.less'],
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
    constructor(
        private menuService: MenuService,
        private i18: I18NService,
        private router: Router,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private log: Logger) {
        /* this.log.error('This is a priority level 1 error message...');
        this.log.warn('This is a priority level 2 warning message...');
        this.log.info('This is a priority level 3 warning message...');
        this.log.debug('This is a priority level 4 debug message...');
        this.log.log('This is a priority level 5 log message...'); */
    }
    loading = false;
    data: any = {
        salesData: [],
        offlineData: []
    };
    salesPieData = [
        {
            x: '家用电器',
            y: 4544,
        },
        {
            x: '食用酒水',
            y: 3321,
        },
        {
            x: '个护健康',
            y: 3113,
        },
        {
            x: '服饰箱包',
            y: 2341,
        },
        {
            x: '母婴产品',
            y: 1231,
        },
        {
            x: '其他',
            y: 1231,
        },
    ];
    format(val: number) {
        return (val);
    }
    intro;
    userName;
    partName1;
    partName2;
    partName3;
    ngOnInit() {
        // 若用户未登录则跳转至登录页面
        if (!this.tokenService.get().token) {
            this.router.navigate(['/passport/login']);
        } else {
            if (this.i18.currentLang === 'zh-CN') {
                this.intro = '欢迎使用学员综合素质测评系统';
                this.partName1 = '通知信息';
                this.partName2 = '快速开始';
                this.partName3 = '专题专栏';
            } else if (this.i18.currentLang === 'en') {
                this.intro = 'Welcome to use Comprehensive quality evaluation system for students';
                this.partName1 = 'Notification Information';
                this.partName2 = 'Quick Start';
                this.partName3 = 'Special Column';
            }
            this.userName = this.tokenService.get().name;
            const role = this.tokenService.get().role;
            if (role[0] === 6) {
                this.router.navigate(['/common-function/index']);
            }
        }
        this.menuService.resume();
    }
    notice = [
        {
            title: '2018年党建工作会议',
            description: '4月8日下午，学校在教学科研综合楼A407会议室召开党建工作会议，党委书记符宁平、党委副书记沈建华，纪委书记李明，党委各部门负责人，机关党委，各党总支、直属党支部书记，二级学院院长，全体党支部书记参加会议。会议由沈建华副书记主持。',
            updatedAt: '2018-04-01'
        },
        {
            title: '第五届“教学开放月”活动',
            description: '4月4日下午，随着校长叶舟、副校长徐金寿、教务处长王建军和校企合作单位代表中软国际有关负责人共同触摸点亮启动球，以“开放创新 共享合作”为主题的校第五届“教学开放月”活动在教学科研综合楼105报告厅正式启动。徐金寿副校长主持启动仪式。',
            updatedAt: '2018-04-02'
        },
        {
            title: '机关党员大会',
            description: '3月30日下午，机关党委第一次党员大会在教学科研综合楼A405会议室召开。会议选举产生第一届机关委员会委员。机关全体党员参加会议。',
            updatedAt: '2018-04-03'
        },
        {
            title: '十九大精神学习活动',
            description: '为团结引导党外知识分子，凝聚思想共识、汇聚智慧力量，3月28日，我校知联会在教学科研综合楼407会议室开展了党的十九大精神学习活动。',
            updatedAt: '2018-04-04'
        },
        {
            title: '学校体委工作会议召开',
            description: '3月28日上午，2018年校体育运动委员工作会议在教学科研综合楼A区407室召开，会议由校体委主任徐金寿副校长主持，校体委会委员和体委办公室人员参加了会议。',
            updatedAt: '2018-04-05'
        },
        {
            title: '平安校园建设工作会议',
            description: '3月28日，2018年平安校园建设工作会议在教学科研综合楼105报告厅召开。沈建华副书记主持会议，全体校领导、中层干部及各部门安全员、总务基建处各中心负责人、保卫处全体干事参加会议。',
            updatedAt: '2018-04-06'
        }
    ];
    radarData: any[] = [];

    // region: mock data
    links = [
        {
            title: '课表查询',
            href: '',
        },
        {
            title: '留言反馈',
            href: '',
        },
        {
            title: '阶段答辩',
            href: '',
        },
    ];
    members = [
        {
            id: 'members-1',
            title: '思政在线：专题学习网站',
            link: '',
        },
        {
            id: 'members-2',
            title: '应用技术型本科院校建设',
            link: '',
        },
        {
            id: 'members-3',
            title: '高校科研经费使用公开',
            link: '',
        },
        {
            id: 'members-4',
            title: '招中标信息',
            link: '',
        },
        {
            id: 'members-5',
            title: 'SWH-CDIO试点网',
            link: '',
        },
    ];
    // endregion

}
