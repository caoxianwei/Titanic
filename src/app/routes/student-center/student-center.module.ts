import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { TestListComponent } from './test-center/container/test-list.component';
import { AnimalTestComponent } from './test-center/character-test/animal-test/animal-test.component';
import { ColorTestComponent } from './test-center/character-test/color-test/color-test.component';
import { NineHouseTestComponent } from './test-center/character-test/nine-house-test/nine-house-test.component';
import { ProfessionTestComponent } from './test-center/profession-test/profession-test.component';
import { ThinkingTestComponent } from './test-center/thinking-test/thinking-test.component';
import { HomeworkListComponent } from './homework-list/homework-list.component';
import { DoHomeworkComponent } from './homework-list/do-homework.component';
import { ProjectComponent } from './test-center/stage-test/project.component';
import { CheckHomeworkComponent } from './homework-list/check-homework.component';
import { StudentCenterRoutingModule } from './student-center-routing.module';
import { VoteComponent } from './vote/vote.component';
import { StageTestComponent } from './test-center/stage-test/stage-test.component';
import { UtilsModule } from '../utils/utils.module';
import { ResultComponent } from './vote/result.component';
import { DoVoteComponent } from './vote/do-vote.component';
import { NoticeListComponent } from './notice-list/notice-list.component';
import { ReportComponent } from './report/report.component';
import { ShowReportComponent } from './report/show-report.component';
const COMPONENTS_NOROUNT = [AnimalTestComponent, ColorTestComponent, NineHouseTestComponent, ProfessionTestComponent, ThinkingTestComponent, DoHomeworkComponent, CheckHomeworkComponent, ResultComponent, DoVoteComponent, ProjectComponent, ShowReportComponent];

@NgModule({
    imports: [
        SharedModule,
        StudentCenterRoutingModule,
        UtilsModule
    ],
    declarations: [
        TestListComponent,
        HomeworkListComponent,
        ReportComponent,
        StageTestComponent,
        NoticeListComponent,
        VoteComponent,
        ...COMPONENTS_NOROUNT
    ],
    entryComponents: COMPONENTS_NOROUNT
})
export class StudentCenterModule { }
