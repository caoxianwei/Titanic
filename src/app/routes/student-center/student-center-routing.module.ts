import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestListComponent } from './test-center/container/test-list.component';
import { ProfessionTestComponent } from './test-center/profession-test/profession-test.component';
import { HomeworkListComponent } from './homework-list/homework-list.component';
import { VoteComponent } from './vote/vote.component';
import { StageTestComponent } from './test-center/stage-test/stage-test.component';
import { NoticeListComponent } from './notice-list/notice-list.component';
import { ReportComponent } from './report/report.component';



const routes: Routes = [
  { path: 'test-center', component: TestListComponent },
  { path: 'stage-test', component: StageTestComponent },
  { path: 'homework-list', component: HomeworkListComponent },
  { path: 'notice-list', component: NoticeListComponent },
  { path: 'professtion-test', component: ProfessionTestComponent },
  { path: 'report', component: ReportComponent },
  { path: 'vote', component: VoteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentCenterRoutingModule { }
