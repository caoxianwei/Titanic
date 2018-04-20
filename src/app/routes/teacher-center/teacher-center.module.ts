import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

// 课堂考勤
import { AttendanceComponent } from './attendance/attendance.component';
// 我的课表
import { MyLessonComponent } from './my-lesson/my-lesson.component';
// 作业批改
import { HomeworkCorrectComponent } from './homework-correct/homework-correct.component';
// 作业管理
import { HomeworkManagementComponent } from './homework-management/homework-management.component';
import { CreateOrEditHomeworkManagementComponent } from './homework-management/create-or-edit-homework-management.component';
import { DoCorrectComponent } from './homework-correct/do-correct.component';

import { TeacherCenterRoutingModule } from './teacher-center-routing.module';
const COMPONENTS_NOROUNT = [CreateOrEditHomeworkManagementComponent, DoCorrectComponent];

@NgModule({
    imports: [
        SharedModule,
        TeacherCenterRoutingModule
    ],
    declarations: [
        AttendanceComponent,
        HomeworkCorrectComponent,
        HomeworkManagementComponent,
        MyLessonComponent,
        ...COMPONENTS_NOROUNT
    ],
    entryComponents: COMPONENTS_NOROUNT
})
export class TeacherCenterModule { }
