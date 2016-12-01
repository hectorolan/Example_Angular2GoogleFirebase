import { Component, OnInit } from '@angular/core';
import { Console } from '../models/console';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  consoles = Console.Consoles;
  displayName = 'Account';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.displayName = this.authService.getdisplayName();
  }

  logout() {
    this.authService.logout();
  }

  keys(dictionary): Array<string> {
    return Object.keys(dictionary);
  }

}
