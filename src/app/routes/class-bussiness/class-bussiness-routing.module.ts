import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoteManagementComponent } from './vote-management/vote-management.component';
import { StageManagementComponent } from './stage-management/stage-management.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import { EnterCorrectComponent } from './enter-correct/enter-correct.component';
import { NoticeManagementComponent } from './notice-management/notice-management.component';


const routes: Routes = [
  { path: 'vote-management', component: VoteManagementComponent },
  { path: 'stage-management', component: StageManagementComponent },
  { path: 'enter-correct', component: EnterCorrectComponent },
  { path: 'notice-management', component: NoticeManagementComponent },
  { path: 'student-management', component: StudentManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassBussinessRoutingModule { }
