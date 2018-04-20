import { Component } from '@angular/core';
import { SettingsService, MenuService, TitleService } from '@delon/theme';
import { I18NService } from '@core/i18n/i18n.service';
import { BasicConfigurationService } from '@core/common/common.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { zip } from 'rxjs/observable/zip';
@Component({
    selector: 'header-i18n',
    template: `
    <nz-dropdown>
        <div nz-dropdown>
            <i class="anticon anticon-edit"></i>
            {{ 'language' | translate}}
            <i class="anticon anticon-down"></i>
        </div>
        <ul nz-menu>
            <li nz-menu-item *ngFor="let item of langs"
            [nzSelected]="item.code === settings.layout.lang"
                (click)="change(item.code)">{{item.text}}</li>
        </ul>
    </nz-dropdown>
    `
})
export class HeaderI18nComponent {

    langs: any[];

    constructor(
        private basicService: BasicConfigurationService,
        private httpClient: HttpClient,
        private menuService: MenuService,
        public settings: SettingsService,
        public tsServ: I18NService,
        private titleService: TitleService
    ) {
        this.langs = this.tsServ.getLangs();
    }
    change(lang: string) {
        // 修改语言的时候,同时修改标题后缀,内容取自菜单配置文件
        this.tsServ.use(lang, false).subscribe(() => {
            /* this.basicService.getMenuJson().subscribe((data: any) => {
                console.log(data);
                if (lang === 'zh-CN') {
                    this.titleService.suffix = data.app.name;
                } else if (lang === 'en') {
                    this.titleService.suffix = data.app.enName;
                }
                this.menuService.resume();
                this.titleService.setTitle();
            }); */
            this.basicService.setTitle();
        });
        this.settings.setLayout('lang', lang);
    }
}
