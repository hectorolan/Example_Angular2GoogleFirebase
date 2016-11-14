import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Console } from '../../models/console';
import { Section } from '../../models/section';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  title: string = '';
  console: string = '';
  sections = Section.Sections;

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.console = params['console'];
      this.title = Console.Consoles[this.console];
      if (this.title === '') {
        //return to main page. console not found
      }
   });
  }

  keys(dictionary): Array<string> {
    return Object.keys(dictionary);
  }
}
