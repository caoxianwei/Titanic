import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './user-management/user-list/user-list.component';
import { PermitManagementComponent } from './permit-management/permit-management.component';
import { RoleListComponent } from './role-management/role-list.component';
import { LogIndexComponent } from './log/log-index.component';
import { StageRuleIndexComponent } from './stage-rule/stage-rule-index.component';
import { TestRuleIndexComponent } from './stage-rule/test-rule/test-rule-index.component';
import { FeedbackIndexComponent } from './feedback/feedback-index.component';


const routes: Routes = [
  { path: 'user-list', component: UserListComponent },
  { path: 'feedback-index', component: FeedbackIndexComponent },
  { path: 'role-list', component: RoleListComponent },
  { path: 'log-index', component: LogIndexComponent },
  { path: 'test-rule-index', component: TestRuleIndexComponent },
  { path: 'stage-rule', component: StageRuleIndexComponent },
  { path: 'permit-management', component: PermitManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
