import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceComponent } from './attendance/attendance.component';
import { HomeworkManagementComponent } from './homework-management/homework-management.component';
import { HomeworkCorrectComponent } from './homework-correct/homework-correct.component';
import { MyLessonComponent } from './my-lesson/my-lesson.component';



const routes: Routes = [
  { path: 'class-attendance-record', component: AttendanceComponent },
  { path: 'homework-management', component: HomeworkManagementComponent },
  { path: 'homework-correct', component: HomeworkCorrectComponent },
  { path: 'my-lesson', component: MyLessonComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherCenterRoutingModule { }
