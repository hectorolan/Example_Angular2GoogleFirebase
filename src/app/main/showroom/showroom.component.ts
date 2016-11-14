import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Console } from '../../models/console';
import { Section } from '../../models/section';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.css']
})
export class ShowroomComponent implements OnInit {

  title: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let console: string = Console.Consoles[params['console']];
      let section: string = Section.Sections[params['section']];
      if (console === undefined) {
        //console not valid
        this.router.navigate(['/games']);
      } else if (section === undefined) {
        //section not valid
        this.router.navigate(['/games/' + params['console']]);
      }
      this.title = console + "/" + section;
    });
  }
}
