import { Component, OnInit, HostListener, ElementRef, ViewChild, Renderer} from '@angular/core';
import { Console } from '../models/console';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  consoles = Console.Consoles;
  @ViewChild('navpanel') navpanel: ElementRef;

  constructor(private authService: AuthService, private rd: Renderer) { }

  ngOnInit() {
    if (window.innerHeight <= 500) {
      this.rd.invokeElementMethod(this.navpanel, 'close');
    }
  }

  logout() {
    this.authService.logout();
  }

  keys(dictionary): Array<string> {
    return Object.keys(dictionary);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(event.target.innerWidth && event.target.innerWidth > 500){
      this.rd.invokeElementMethod(this.navpanel, 'open');
    }else{
      this.rd.invokeElementMethod(this.navpanel, 'close');
    }
  }
}
