import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Ad } from '../../models/ad';
import { AdService } from '../../services/ad.service';

@Component({
  selector: 'app-myads',
  templateUrl: './myads.component.html',
  styleUrls: ['./myads.component.css']
})
export class MyAdsComponent implements OnInit {

  ads: Ad[];
  counter: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adService: AdService) { }

  ngOnInit() {
      this.ads = this.adService.dummyAd;
      this.counter = this.ads.length + '';
  }

}
