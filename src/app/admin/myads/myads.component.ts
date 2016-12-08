import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Ad } from '../../models/ad';
import { AdService } from '../../services/ad.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-myads',
  templateUrl: './myads.component.html',
  styleUrls: ['./myads.component.css']
})
export class MyAdsComponent implements OnInit {

  ads: Ad[] = [];
  counter: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adService: AdService,
    private authService: AuthService) { }

  ngOnInit() {
    this.adService.getUserAds(this.authService.user).then((ads) => {
      this.ads = ads;
      this.counter = this.ads.length + '';
    });
  }

}
