import { Component, OnInit, HostListener } from '@angular/core';
import { TogglenavService } from './services/togglenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GAMES Clasificados';
  constructor(private tooglenavService: TogglenavService) {
      this.tooglenavService.toggle();
  }

  ngOnInit() {
    if (window.innerWidth <= 500) {
      this.tooglenavService.showNavToggleBtn = true;
    }
  }

  toggleNav() {
    this.tooglenavService.toggle();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth && event.target.innerWidth > 500) {
      this.tooglenavService.showNavToggleBtn = false;
    }else {
      this.tooglenavService.showNavToggleBtn = true;
    }
  }
}
