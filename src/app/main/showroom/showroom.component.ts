import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Console } from '../../models/console';
import { Section } from '../../models/section';
import { Ad } from '../../models/ad';
import { AdService } from '../../services/ad.service';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.css']
})
export class ShowroomComponent implements OnInit {

  title: string = '';
  counter: string = '';
  console: string;
  section: string;
  ads: Ad[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adService: AdService
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.console = params['console'];
      this.section = params['section'];
      if (!this.ngOnInit_ifValidURL(params)) {
        return;
      }
      this.title = Console.Consoles[params['console']] + '/' + Section.Sections[params['section']];
      this.ads = this.adService.getAds(this.console, this.section);
      this.counter = this.ads.length + '';
    });
  }

  ngOnInit_ifValidURL(params: Params) {
      if (Console.Consoles[params['console']] === undefined) {
        this.router.navigate(['/games']);
        return false;
      } else if (Section.Sections[params['section']] === undefined) {
        this.router.navigate(['/games/' + params['console']]);
        return false;
      }
      return true;
  }
}
