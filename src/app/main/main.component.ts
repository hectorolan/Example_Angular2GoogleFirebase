import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild, Renderer} from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { Console } from '../models/console';
import { AuthService } from '../services/auth.service';
import { TogglenavService } from '../services/togglenav.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  togglenavSubscription: Subscription;
  consoles = Console.Consoles;
  @ViewChild('navpanel') navpanel: ElementRef;
  navMode: string = 'side';
  initOpened: boolean = true;

  constructor(
    private authService: AuthService,
    private rd: Renderer,
    private togglenavService: TogglenavService) {
      this.togglenavSubscription = this.togglenavService.togglerNav$.subscribe(() => {
        this.rd.invokeElementMethod(this.navpanel, 'toggle');
      });
    }

  ngOnInit() {
    if (window.innerWidth <= 500) {
      this.togglenavService.showNavToggleBtn = true;
      this.initOpened = false;
      this.navMode = 'over';
    }
  }

  ngOnDestroy() {
    this.togglenavSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  keys(dictionary): Array<string> {
    return Object.keys(dictionary);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth && event.target.innerWidth > 500) {
      this.rd.invokeElementMethod(this.navpanel, 'open');
      this.navMode = 'side';
    }else {
      this.rd.invokeElementMethod(this.navpanel, 'close');
      this.navMode = 'over';
    }
  }
}
