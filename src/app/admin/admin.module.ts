import { NgModule } from '@angular/core';
import { GCSharedModule } from '../shared/gcshared/gcshared.module';
import { AdminComponent } from './admin.component';
import { UserComponent } from './user/user.component';
import { CreateAdComponent } from './createad/createad.component';

@NgModule({
  imports: [
    GCSharedModule
  ],
  declarations: [
    AdminComponent,
    UserComponent,
    CreateAdComponent
    ]
})
export class AdminModule { }
