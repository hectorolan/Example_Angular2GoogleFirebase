import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Console } from '../../models/console';
import { Section } from '../../models/section';
import { Ad } from '../../models/ad';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.css']
})
export class ShowroomComponent implements OnInit {

  title: string = '';
  console: string;
  section: string;
  ads: Ad[];

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.console = Console.Consoles[params['console']];
      this.section = Section.Sections[params['section']];
      if (!this.ngOnInit_ifValidURL(params)) {
        return;
      }
      this.title = this.console + '/' + this.section;
      this.ads = Ad.Ads;
    });
  }

  ngOnInit_ifValidURL(params: Params) {
      if (this.console === undefined) {
        this.router.navigate(['/games']);
        return false;
      } else if (this.section === undefined) {
        this.router.navigate(['/games/' + params['console']]);
        return false;
      }
      return true;
  }
}
