import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayName = 'Account';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.displayName = this.authService.user.name == '' ? 'Account' : this.authService.user.name;
  }

  logout() {
    this.authService.logout();
  }

}
