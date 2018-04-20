import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CommonFunctionComponent } from './container/common-function..component';
import { StageDebateComponent } from './stage-debate/stage-debate.component';
import { AddFeedbackComponent } from './feedback/add-feedback.component';
import { ScheduleSelectComponent } from './schedule-select/schedule-select.component';
import { CommonFunctionRoutingModule } from './common-function-routing.module';
import { IndexComponent } from './index/index.component';
import { AddEvaluateComponent } from './evaluate/add-evaluate.component';
import { StudentListComponent } from './evaluate/student-list.component';

const COMPONENTS_NOROUNT = [StageDebateComponent, AddFeedbackComponent, AddEvaluateComponent, StudentListComponent];
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
    imports: [
        SharedModule,
        NgxEchartsModule,
        CommonFunctionRoutingModule
    ],
    declarations: [
        ScheduleSelectComponent,
        CommonFunctionComponent,
        IndexComponent,
        ...COMPONENTS_NOROUNT
    ],
    entryComponents: COMPONENTS_NOROUNT
})
export class CommonFunctionModule { }
