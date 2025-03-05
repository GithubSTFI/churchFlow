import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componenet/login/login.component';
import { RegisterComponent } from './componenet/register/register.component';
import { ForgotPasswordComponent } from './componenet/forgot-password/forgot-password.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'forgot-password',component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { } 