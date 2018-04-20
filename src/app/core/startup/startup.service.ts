import { Router } from '@angular/router';
import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs/observable/zip';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '../i18n/i18n.service';
import { ReuseTabService } from '@delon/abc/reuse-tab/reuse-tab.service';
import { BasicConfigurationService } from '@core/common/common.service';
import { Logger } from 'angular2-logger/core';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(
        private basicService: BasicConfigurationService,
        private menuService: MenuService,
        private translate: TranslateService,
        private i18n: I18NService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private httpClient: HttpClient,
        private injector: Injector,
        private reuseTabService: ReuseTabService,
        private log: Logger) {
        reuseTabService.mode = 1;
    }
    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            zip(
                this.httpClient.get(`assets/i18n/${this.i18n.defaultLang}.json`),
                this.httpClient.get('assets/app-data.json')
            ).pipe(
                // 接收其他拦截器后产生的异常消息
                catchError(([langData, appData]) => {
                    resolve(null);
                    return [langData, appData];
                })
            ).subscribe(([langData, appData]) => {
                // setting language data
                this.translate.setTranslation(this.i18n.defaultLang, langData);
                this.translate.setDefaultLang(this.i18n.defaultLang);
                // application data
                const res: any = appData;
                // 应用信息：包括站点名、描述、年份
                this.settingService.setApp(res.app);
                // 用户信息：包括姓名、头像、邮箱地址
                this.settingService.setUser(res.user);
                // ACL：设置权限为全量
                if (this.tokenService.get().permits) {
                    this.aclService.setAbility(JSON.parse('[' + String(this.tokenService.get().permits) + ']'));
                }
                // console.log('当前用户对于1号权限点为:' + (this.aclService.canAbility(1) ? '拥有' : '无'));
                // this.aclService.setFull(true);
                // 初始化菜单
                console.log('初始化菜单');
                this.menuService.add(res.menu);
                // 设置页面标题的后缀
                const language = this.basicService.getCurrentLanguage();
                if (language === 'zh-CN') {
                    this.titleService.suffix = res.app.name;
                } else if (language === 'en') {
                    this.titleService.suffix = res.app.enName;
                }
            },
                () => { },
                () => {
                    resolve(null);
                });
        });
    }
}
