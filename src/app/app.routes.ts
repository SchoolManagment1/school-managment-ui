import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { TeacherComponent } from './dashboard/teacher/teacher.component';
import { StudentComponent } from './dashboard/student/student.component';
import { authGuard } from './guards/auth.guard';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { UserComponent } from './dashboard/user/user.component';
import { RegisterComponent } from './pages/register/register.component';
import { AttendanceComponent } from './dashboard/attendance/attendance.component';
import { AssingmentComponent } from './dashboard/assingment/assingment.component';
import { StudentsComponent } from './dashboard/students/students.component';
import { CoursesComponent } from './dashboard/courses/courses.component';
import { CourseCRUDComponent } from './dashboard/course-crud/course-crud.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },{
    path:'register', component:RegisterComponent
  },
  {
    path: 'layout', component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {path:'',component:ProfileComponent},
      { path: 'profile', component: ProfileComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'user', component: UserComponent },
      { path: 'teachers', component: TeacherComponent,canActivate: [authGuard] },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'student', component: StudentComponent },
      { path: 'assignments', component: AssingmentComponent },
      {path:'courses',component:CoursesComponent},
      {path:'courcseCURD',component:CourseCRUDComponent},
    ]
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    children: [
      
      { path: 'teacher', component: TeacherComponent },
      { path: 'student', component: StudentComponent },
    ]
  }
];
