import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { UserListComponent } from './user-management/user-list/user-list.component';
import { AddUserComponent } from './user-management/user-list/add-user.component';
import { CreateOrEditRoleComponent } from './role-management/create-or-edit-role.component';
import { EditStageRuleComponent } from './stage-rule/edit-stage-rule.component';
import { PermitManagementComponent } from './permit-management/permit-management.component';
import { RoleListComponent } from './role-management/role-list.component';
import { LogIndexComponent } from './log/log-index.component';
import { StageRuleIndexComponent } from './stage-rule/stage-rule-index.component';
import { FeedbackIndexComponent } from './feedback/feedback-index.component';
import { CheckFeedbackComponent } from './feedback/check-feedback.component';
import { TestRuleIndexComponent } from './stage-rule/test-rule/test-rule-index.component';
import { EditTestRuleComponent } from './stage-rule/test-rule/edit-test-rule.component';

import { AdminRoutingModule } from './admin-routing.module';
const COMPONENTS_NOROUNT = [AddUserComponent, CreateOrEditRoleComponent, EditStageRuleComponent, CheckFeedbackComponent, EditTestRuleComponent];

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule
    ],
    declarations: [
        UserListComponent,
        PermitManagementComponent,
        RoleListComponent,
        LogIndexComponent,
        TestRuleIndexComponent,
        StageRuleIndexComponent,
        FeedbackIndexComponent,
        ...COMPONENTS_NOROUNT
    ],
    entryComponents: COMPONENTS_NOROUNT
})
export class AdminModule { }
