import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdsComponent } from '../ads/ads.component';
import { MdCoreModule } from '@angular/material/core';
import { MdButtonModule } from '@angular/material/button';
import { MdCardModule } from '@angular/material/card';
import { MdListModule } from '@angular/material/list';
import { MdSidenavModule } from '@angular/material/sidenav';
import { MdToolbarModule } from '@angular/material/toolbar';
import { MdIconModule } from '@angular/material/icon';

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
  exports: [
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
    AdsComponent
  ]
})
export class GCSharedModule { }
