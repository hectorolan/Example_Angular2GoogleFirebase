import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdCoreModule } from '@angular/material/core';
import { MdButtonModule } from '@angular/material/button';
import { MdCardModule } from '@angular/material/card';
import { MdListModule } from '@angular/material/list';
import { MdSidenavModule } from '@angular/material/sidenav';
import { MdToolbarModule } from '@angular/material/toolbar';
import { MdIconModule } from '@angular/material/icon';
import { MdInputModule } from '@angular/material/input';
import { MdCheckboxModule } from '@angular/material/checkbox';
import { MdRadioModule } from '@angular/material/radio';
import { AdlistComponent } from '../components/adlist/adlist.component';
import { AdlistRoutingModule } from '../components/adlist/adlist-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MdCoreModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdSidenavModule,
    MdToolbarModule,
    MdIconModule,
    MdInputModule,
    MdCheckboxModule,
    MdRadioModule,
    AdlistRoutingModule
  ],
  declarations: [
    AdlistComponent
  ],
  exports: [
    FormsModule,
    CommonModule,
    MdCoreModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdSidenavModule,
    MdToolbarModule,
    MdIconModule,
    MdInputModule,
    MdCheckboxModule,
    MdRadioModule,
    AdlistComponent
  ]
})
export class GCSharedModule { }
