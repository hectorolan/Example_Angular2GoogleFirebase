import { Component, OnInit, Input } from '@angular/core';
import { Ad } from '../../../models/ad';
import { Section } from '../../../models/section';
import { Console } from '../../../models/console';
import { IgdbService } from '../../../services/igdb.service';

@Component({
  selector: 'app-adlist',
  templateUrl: './adlist.component.html',
  styleUrls: ['./adlist.component.css']
})
export class AdlistComponent implements OnInit {
  sections = Section.Sections;
  consoles = Console.Consoles;

  @Input()
  ads: Ad[];

  constructor(
    private igdbService: IgdbService) { }

  ngOnInit() {
  }

}
