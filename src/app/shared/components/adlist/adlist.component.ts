import { Component, OnInit, Input } from '@angular/core';
import { Ad } from '../../../models/ad';
import { AuthService } from '../../../services/auth.service';
import { AdService } from '../../../services/ad.service';

@Component({
  selector: 'app-adlist',
  templateUrl: './adlist.component.html',
  styleUrls: ['./adlist.component.css']
})
export class AdlistComponent implements OnInit {

  @Input()
  ads: Ad[];

  constructor(
    private authService: AuthService,
    private adService: AdService) { }

  ngOnInit() {
  }

  deleteAd(ad: Ad) {
    this.adService.deleteAd(ad.id, this.authService.user).then(() => {
      location.reload();
    });
  }

}
