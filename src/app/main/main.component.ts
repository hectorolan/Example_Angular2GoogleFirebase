import { Component, OnInit } from '@angular/core';
import { Console } from '../models/console';
import { AuthService } from '../services/auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  consoles = Console.Consoles;

  constructor(private authService: AuthService, private firebase: AngularFire) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  keys(dictionary): Array<string> {
    return Object.keys(dictionary);
  }

}
