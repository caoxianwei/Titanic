import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { WelcomeComponent } from './passport/welcome/welcome.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
import { ACLGuard } from '@delon/acl';
// canActivate: [ACLGuard]
const routes: Routes = [
    {
        path: '',
        component: LayoutDefaultComponent,
        children: [
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: 'manage-chracter-test', loadChildren: './manage-entrance-test/manage-entrance-test.module#ManageEntranceTestModule', canActivate: [ACLGuard] },
            { path: 'student-center', loadChildren: './student-center/student-center.module#StudentCenterModule', canActivate: [ACLGuard] },
            { path: 'teacher-center', loadChildren: './teacher-center/teacher-center.module#TeacherCenterModule', canActivate: [ACLGuard] },
            { path: 'class-bussiness', loadChildren: './class-bussiness/class-bussiness.module#ClassBussinessModule', canActivate: [ACLGuard] },
            { path: 'common-function', loadChildren: './common-function/common-function.module#CommonFunctionModule'},
            { path: 'management', loadChildren: './admin/admin.module#AdminModule'},
            { path: 'welcome', component: WelcomeComponent }
            /* { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, data: { title: '仪表盘' } }, */
            // 业务子模块
            // { path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule' }
        ],
        canActivateChild: [ACLGuard]
    },
    // passport
    {
        path: 'passport',
        component: LayoutPassportComponent,
        children: [
            { path: 'login', component: UserLoginComponent },
            { path: 'register', component: UserRegisterComponent },
            { path: 'register-result', component: UserRegisterResultComponent }
        ]
    },
    // 单页不包裹Layout
    { path: 'callback/:type', component: CallbackComponent },
    { path: '403', component: Exception403Component },
    { path: '404', component: Exception404Component },
    { path: '500', component: Exception500Component },
    { path: '**', redirectTo: 'welcome' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
    exports: [RouterModule]
})
export class RouteRoutingModule { }
