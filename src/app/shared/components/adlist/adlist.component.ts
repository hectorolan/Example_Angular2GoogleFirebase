import { Component, OnInit, Input } from '@angular/core';
import { Ad } from '../../../models/ad';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-adlist',
  templateUrl: './adlist.component.html',
  styleUrls: ['./adlist.component.css']
})
export class AdlistComponent implements OnInit {

  @Input()
  ads: Ad[];

  constructor(
    private authService: AuthService) { }

  ngOnInit() {
  }

}
