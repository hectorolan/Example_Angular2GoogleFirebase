import { NgModule } from '@angular/core';
// Imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AppRoutingModule } from './app-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { MainModule } from './main/main.module';
import { AdminModule } from './admin/admin.module';
// Declarations
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// Providers
import { AdService } from './services/ad.service';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyA7cHIY_mihlnv4xefUsQEGE6xoxuwyn7k',
  authDomain: 'gamesclasificados.firebaseapp.com',
  databaseURL: 'https://gamesclasificados.firebaseio.com',
  storageBucket: 'gamesclasificados.appspot.com',
  messagingSenderId: '292788060773'
};
const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
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
    AdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
