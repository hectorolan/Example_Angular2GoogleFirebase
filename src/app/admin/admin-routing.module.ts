import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserComponent } from './user/user.component';
import { CreateAdComponent } from './createad/createad.component';
import { MyAdsComponent } from './myads/myads.component';
import { AuthService } from '../services/auth.service';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuardService],
        children: [
          {
            path: '',
            component: UserComponent
          },
          {
            path: 'createad',
            component: CreateAdComponent
          },
          {
            path: 'myads',
            component: MyAdsComponent
          }
        ]
      }
    ]
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
export class AdminRoutingModule { }