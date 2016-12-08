import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Console } from '../../models/console';
import { Section } from '../../models/section';
import { Ad } from '../../models/ad';
import { AdService } from '../../services/ad.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  console: string;
  section: string;
  id: string;
  ad: Ad;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adService: AdService
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.console = Console.Consoles[params['console']];
      this.section = Section.Sections[params['section']];
      this.id = params['id'];
      this.ngOnInit_ifValidURL(params)
    });
  }

  ngOnInit_ifValidURL(params: Params): Promise<boolean> {
      if (this.console === undefined) {
        //console not valid
        this.router.navigate(['/games']);
        return Promise.resolve(false);
      } else if (this.section === undefined) {
        //section not valid
        this.router.navigate(['/games/' + params['console']]);
        return Promise.resolve(false);
      } else if (this.id === null){
        //id not valid
        this.router.navigate(['/games/' + params['console'] + '/' + params['section']]);
        return Promise.resolve(false);
      }
      this.adService.getAd(this.id).then((ad) => {
        if (!this.checkIfValidAd(ad, params)) {
          this.router.navigate(['/games/' + params['console'] + '/' + params['section']]);
          return false;
        } else {
          this.ad = ad;
          return true;
        }
      });
  }

  checkIfValidAd(ad: Ad, params: Params): boolean{

    return true;
  }

}
