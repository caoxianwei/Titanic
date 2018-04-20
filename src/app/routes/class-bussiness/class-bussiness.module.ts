import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';


import { VoteManagementComponent } from './vote-management/vote-management.component';
import { StageManagementComponent } from './stage-management/stage-management.component';
import { CreateOrEditStageManagementComponent } from './stage-management/create-or-edit-stage-management.component';
import { CreateVoteComponent } from './vote-management/create-vote.component';
import { CreateEventComponent } from './student-management/create-event.component';
import { CheckEventComponent } from './student-management/check-event.component';
import { ResultComponent } from './vote-management/result.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import { EnterCorrectComponent } from './enter-correct/enter-correct.component';
import { DoEnterCorrectComponent } from './enter-correct/do-enter-correct.component';
import { CreateNoticeComponent } from './notice-management/create-notice.component';
import { NoticeManagementComponent } from './notice-management/notice-management.component';



import { ClassBussinessRoutingModule } from './class-bussiness-routing.module';

const COMPONENTS_NOROUNT = [CreateVoteComponent, ResultComponent, StageManagementComponent, CreateOrEditStageManagementComponent, CreateEventComponent, CheckEventComponent, DoEnterCorrectComponent, CreateNoticeComponent];

@NgModule({
    imports: [
        SharedModule,
        ClassBussinessRoutingModule
    ],
    declarations: [
        VoteManagementComponent,
        StudentManagementComponent,
        NoticeManagementComponent,
        EnterCorrectComponent,
        StageManagementComponent,
        ...COMPONENTS_NOROUNT
    ],
    entryComponents: COMPONENTS_NOROUNT
})
export class ClassBussinessModule { }
