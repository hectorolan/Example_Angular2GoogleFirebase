import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { ConsolesComponent } from './consoles/consoles.component';
import { SectionComponent } from './section/section.component';
import { ShowroomComponent } from './showroom/showroom.component';
import { AuthService } from '../services/auth.service';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'games',
    component: MainComponent,
    children: [
    {
      path: '',
      component: ConsolesComponent
    },
    {
      path: ':console',
      component: SectionComponent
    },
    {
      path: ':console/:section',
      component: ShowroomComponent
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
export class MainRoutingModule { }