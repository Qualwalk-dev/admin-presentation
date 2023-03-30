import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { CourseComponent } from './components/course/course.component';
import { LoginComponent } from './components/login/login.component';
import { LoggedInUsersGuard } from './services/logged-in-users-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent,  },
  { path: 'admin-home', component: AdminHomeComponent, canActivate: [LoggedInUsersGuard] },
  { path: 'courses', component: CourseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
