import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Console } from '../../models/console';
import { Section } from '../../models/section';
import { Ad } from '../../models/ad';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

  title: string = '';
  console: string;
  section: string;
  id: number;
  ad: Ad;

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.console = Console.Consoles[params['console']];
      this.section = Section.Sections[params['section']];
      this.id = +params['id'];
      if (!this.ngOnInit_ifValidURL(params)) {
        return;
      }
      this.title = this.ad + '';
    });
  }

  ngOnInit_ifValidURL(params: Params) {
      if (this.console === undefined) {
        //console not valid
        this.router.navigate(['/games']);
        return false;
      } else if (this.section === undefined) {
        //section not valid
        this.router.navigate(['/games/' + params['console']]);
        return false;
      } else if (this.id === NaN){
        //id not valid
        this.router.navigate(['/games/' + params['console'] + '/' + params['section']]);
        return false;
      }
      this.ad = Ad.Ads.find(ad => ad.id === this.id);
      if (this.ad === undefined) {
        //ad does not exists not valid
        this.router.navigate(['/games/' + params['console'] + '/' + params['section']]);
        return false;
      }
      return true;
  }

}
