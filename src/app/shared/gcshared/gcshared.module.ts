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
import { AdlistComponent } from '../adlist/adlist.component';

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
    MdIconModule
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
    AdlistComponent
  ]
})
export class GCSharedModule { }
