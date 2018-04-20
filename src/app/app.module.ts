import { NgModule, LOCALE_ID, APP_INITIALIZER, Injector } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DelonModule } from './delon.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { LayoutModule } from './layout/layout.module';
import { StartupService } from '@core/startup/startup.service';
import { DefaultInterceptor } from '@core/net/default.interceptor';
import { SimpleInterceptor } from '@delon/auth';
import { DA_STORE_TOKEN } from '@delon/auth';
// ngx-cookie
import { CookieModule } from 'ngx-cookie';
// angular i18n
import { registerLocaleData, DatePipe } from '@angular/common';
// 服务模块
import { ServiceModule } from './service.module';
import localeZhHans from '@angular/common/locales/zh-Hans';
registerLocaleData(localeZhHans);
// i18n
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ALAIN_I18N_TOKEN } from '@delon/theme';
import { I18NService } from '@core/i18n/i18n.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, `assets/i18n/`, '.json');
}

// JSON-Schema form
import { JsonSchemaModule } from '@shared/json-schema/json-schema.module';

export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load();
}

// import { CookieModule, CookieService } from 'ngx-cookie';
import { ReuseTabService } from '@delon/abc/reuse-tab/reuse-tab.service';
import { Logger, Options } from 'angular2-logger/core';
import { isDevMode } from '@angular/core';
import { environment } from '../environments/environment';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ServiceModule,
        DelonModule.forRoot(),
        CoreModule, 
        SharedModule,
        LayoutModule,
        JsonSchemaModule,
        RoutesModule,
        // ngx-cookie
        CookieModule.forRoot(),
        // i18n
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [/* 
        Logger,
        { provide: Options, useValue: { level: environment.logger, store: true } }, */
        Logger,
        Options,
        DatePipe,
        { provide: LOCALE_ID, useValue: 'zh-Hans' },
        // { provide: DA_STORE_TOKEN, useClass: CookieStorage, multi: false },  // 在此处注入后, 就可以通过DA_SERVICE_TOKEN获取被注入的类型.
        { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
        { provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false },
        StartupService,
        ReuseTabService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private logger: Logger) {
        this.logger.level = environment.logger.Level;
    }
}
