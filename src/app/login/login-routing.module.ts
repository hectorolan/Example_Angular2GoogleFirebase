import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { AuthService } from '../services/auth.service';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'verify-email',
    component: EmailVerificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
      AuthService,
      AuthGuardService
  ]
})
export class LoginRoutingModule { }
