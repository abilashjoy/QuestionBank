import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { QuestionComponent } from './question/question.component';
import { StudentComponent } from './student/student.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherComponent } from './teacher/teacher.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/Student' },
  { path: 'TeacherLogin', component: TeacherLoginComponent },
  { path: 'Teacher', component: TeacherComponent },
  { path: 'AdminLogin', component: AdminLoginComponent },
  { path: 'Admin', component: AdminComponent },
  { path: 'Question', component: QuestionComponent },
  { path: 'Student', component: StudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
