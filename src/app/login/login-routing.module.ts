import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
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