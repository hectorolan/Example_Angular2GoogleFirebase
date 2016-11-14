import { NgModule } from '@angular/core';
import { GCSharedModule } from '../shared/gcshared/gcshared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ConsolesComponent } from './consoles/consoles.component';
import { SectionComponent } from './section/section.component';
import { ShowroomComponent } from './showroom/showroom.component';

@NgModule({
  imports: [
    GCSharedModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
    ConsolesComponent,
    SectionComponent,
    ShowroomComponent
  ]
})
export class MainModule {
}
