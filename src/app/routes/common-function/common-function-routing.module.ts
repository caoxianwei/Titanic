import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleSelectComponent } from './schedule-select/schedule-select.component';
import { CommonFunctionComponent } from './container/common-function..component';
import { IndexComponent } from './index/index.component';



const routes: Routes = [
  { path: 'schedule-select', component: ScheduleSelectComponent },
  { path: 'common-function', component: CommonFunctionComponent },
  { path: 'index', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonFunctionRoutingModule { }
