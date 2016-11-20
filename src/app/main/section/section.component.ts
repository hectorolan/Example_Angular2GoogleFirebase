import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Console } from '../../models/console';
import { Section } from '../../models/section';
import { Ad } from '../../models/ad';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  title: string = '';
  console: string = '';
  sections = Section.Sections;
  ads: Ad[];

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.console = params['console'];
      this.title = Console.Consoles[this.console];
      if (this.title === undefined) {
        //console not valid
        this.router.navigate(['/games']);
      }
      this.ads = Ad.dummyAds;
   });
  }

  keys(dictionary): Array<string> {
    return Object.keys(dictionary);
  }
}
