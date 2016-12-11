import { NgModule } from '@angular/core';
// Imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { MainModule } from './main/main.module';
import { AdminModule } from './admin/admin.module';
// Declarations
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// Providers
import { FirebaseService } from './services/firebase.service';
import { AdService } from './services/ad.service';
import { UserService } from './services/user.service';
import { TogglenavService } from './services/togglenav.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    LoginRoutingModule,
    AdminModule,
    MainModule,
    AppRoutingModule
  ],
  providers: [
    FirebaseService,
    AdService,
    UserService,
    TogglenavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
