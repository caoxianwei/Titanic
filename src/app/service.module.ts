import { NgModule } from '@angular/core';
import { StudentManagementService } from './routes/class-bussiness/student-management/student-management.service';
import { EnterCorrectService } from './routes/class-bussiness/enter-correct/enter-correct.service';
import { StageTestService } from './routes/student-center/test-center/stage-test/stage-test.service';
import { NoticeManagementService } from './routes/class-bussiness/notice-management/notice-management.service';
import { NoticeListService } from './routes/student-center/notice-list/notice-list.service';
import { StageDebateService } from './routes/common-function/stage-debate/stage-debate.service';
import { AdminService } from './routes/admin/admin.service';
import { CommonFunctionService } from './routes/common-function/common-function.service';



import { NotifyService } from './layout/default/header/components/notify.service';

const services = [
    StudentManagementService,
    EnterCorrectService,
    StageTestService,
    NotifyService,
    NoticeManagementService,
    NoticeListService,
    StageDebateService,
    CommonFunctionService,
    AdminService
];

@NgModule({
    providers: [...services]
})
export class ServiceModule {
}
