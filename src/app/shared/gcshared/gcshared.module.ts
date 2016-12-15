import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdCoreModule } from '@angular/material/core';
import { MdButtonModule } from '@angular/material/button';
import { MdCardModule } from '@angular/material/card';
import { MdListModule } from '@angular/material/list';
import { MdSidenavModule } from '@angular/material/sidenav';
import { MdToolbarModule } from '@angular/material/toolbar';
import { MdTabsModule } from '@angular/material/tabs';
import { MdIconModule } from '@angular/material/icon';
import { MdInputModule } from '@angular/material/input';
import { MdCheckboxModule } from '@angular/material/checkbox';
import { MdRadioModule } from '@angular/material/radio';
import { MdSnackBarModule } from '@angular/material/snack-bar';
import { AdlistComponent } from '../components/adlist/adlist.component';
import { AdlistRoutingModule } from '../components/adlist/adlist-routing.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MdCoreModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdSidenavModule,
    MdToolbarModule,
    MdTabsModule,
    MdIconModule,
    MdInputModule,
    MdCheckboxModule,
    MdRadioModule,
    MdSnackBarModule,
    AdlistRoutingModule
  ],
  declarations: [
    AdlistComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MdCoreModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdSidenavModule,
    MdToolbarModule,
    MdTabsModule,
    MdIconModule,
    MdInputModule,
    MdCheckboxModule,
    MdRadioModule,
    MdSnackBarModule,
    AdlistComponent
  ]
})
export class GCSharedModule { }
