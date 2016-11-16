import { Component, OnInit, Input } from '@angular/core';
import { Ad } from '../../models/ad';

@Component({
  selector: 'app-adlist',
  templateUrl: './adlist.component.html',
  styleUrls: ['./adlist.component.css']
})
export class AdlistComponent implements OnInit {

  @Input()
  ads: Ad[];

  constructor() { }

  ngOnInit() {
  }

}
