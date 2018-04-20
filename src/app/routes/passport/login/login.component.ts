import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, Inject, Optional, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { TitleService, SettingsService, ThemesService, ThemeType } from '@delon/theme';
import { Observable } from 'rxjs/Observable';
import { zip } from 'rxjs/observable/zip';
import { catchError } from 'rxjs/operators';
import { I18NService } from '@core/i18n/i18n.service';
import { TranslateService } from '@ngx-translate/core';
import { ACLService } from '@delon/acl';
import 'rxjs/add/observable/zip';
import { UserAuthService } from '@core/common/common.service';
@Component({
    selector: 'passport-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [SocialService]
})
export class UserLoginComponent implements OnDestroy, OnInit {

    form: FormGroup;
    error = '';
    type = 0;
    loading = false;

    constructor(
        fb: FormBuilder,
        private aclService: ACLService,
        private httpClient: HttpClient,
        private i18n: I18NService,
        private translate: TranslateService,
        private themeServ: ThemesService,
        private titleService: TitleService,
        private router: Router,
        public msg: NzMessageService,
        private settingsService: SettingsService,
        private socialService: SocialService,
        private userAuthService: UserAuthService,
        @Optional() @Inject(ReuseTabService) private reuseTabService: ReuseTabService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
        this.form = fb.group({
            userName: [null, [Validators.required, Validators.minLength(5)]],
            password: [null, Validators.required],
            mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
            captcha: [null, [Validators.required]],
            remember: [true]
        });
    }

    // region: fields

    get userName() { return this.form.controls.userName; }
    get password() { return this.form.controls.password; }
    // endregion

    switch(ret: any) {
        this.type = ret.index;
    }

    // region: get captcha

    count = 0;
    interval$: any;

    // endregion

    submit() {
        this.error = '';
        if (this.type === 0) {
            this.userName.markAsDirty();
            this.password.markAsDirty();
            if (this.userName.invalid || this.password.invalid) return;
        }
        // mock http
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
            if (this.type === 0) {
                this.userAuthService.getUserInfo(this.userName.value, this.password.value).subscribe((data: any) => {
                    console.log(data);
                    if (data.code === 200) {// 登录成功
                        this.tokenService.set({
                            token: 'token',
                            Noid: data.data.Noid,
                            permits: data.data.permits,
                            role: data.data.role,
                            name: data.data.Name
                        });
                        console.log(data.data.permits);
                        this.aclService.setAbility(JSON.parse('[' + String(data.data.permits) + ']'));
                        const role = data.data.role;
                        if (role[0] === 6) {
                            this.router.navigate(['/common-function/index']);
                        } else {
                            this.router.navigate(['/welcome']);
                        }
                    } else if (data.code === 400) {// 登录信息错误
                        if (this.i18n.currentLang === 'zh-CN') {
                            this.error = `账户或密码错误`;
                        } else if (this.i18n.currentLang === 'en') {
                            this.error = `Account or password error`;
                        }
                        return;
                    }
                });
            }
        }, 1000);
    }
    // endregion

    ngOnDestroy(): void {
        if (this.interval$) clearInterval(this.interval$);
    }

    accountPlaceHolder = '请输入学号/工号';
    accountNotNull = '用户名不能为空!';
    accountLengthWarning = '至少5个字符';
    passwordPlaceHolder = '请输入密码';
    passwordNoutNull = '密码不能为空!';
    themes: { l: ThemeType, bg: string, nav: string, con: string }[] = [
        { l: 'A', bg: '#108ee9', nav: '#fff', con: '#f5f7fa' },
        { l: 'B', bg: '#00a2ae', nav: '#fff', con: '#f5f7fa' },
        { l: 'C', bg: '#00a854', nav: '#fff', con: '#f5f7fa' },
        { l: 'D', bg: '#f04134', nav: '#fff', con: '#f5f7fa' },
        { l: 'E', bg: '#373d41', nav: '#fff', con: '#f5f7fa' },
        { l: 'F', bg: '#108ee9', nav: '#404040', con: '#f5f7fa' },
        { l: 'G', bg: '#00a2ae', nav: '#404040', con: '#f5f7fa' },
        { l: 'H', bg: '#00a854', nav: '#404040', con: '#f5f7fa' },
        { l: 'I', bg: '#f04134', nav: '#404040', con: '#f5f7fa' },
        { l: 'J', bg: '#373d41', nav: '#404040', con: '#f5f7fa' }
    ];
    changeTheme(theme: ThemeType) {
        this.themeServ.setTheme(theme);
        this.settingsService.setLayout('theme', theme);
    }
    // 登录过的用户不允许重新再登录
    ngOnInit() {
        this.changeTheme(this.themes[6].l);
        // 针对国际化做参数配置
        if (this.i18n.currentLang === 'zh-CN') {
            this.titleService.setTitle('登录');
        } else if (this.i18n.currentLang === 'en') {
            this.titleService.setTitle('Login');
            this.accountPlaceHolder = 'Please input your id';
            this.accountNotNull = 'The username can not be empty';
            this.accountLengthWarning = 'At least 5 characters';
            this.passwordPlaceHolder = 'Please input your password';
            this.passwordNoutNull = 'The password can not be empty';
        }
        if (this.tokenService.get().token) {
            this.msg.error('请勿重复登录!');
            this.router.navigate(['/welcome']);
        }
    }
}
