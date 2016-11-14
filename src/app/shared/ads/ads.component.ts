import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Console } from '../../models/console';
import { Section } from '../../models/section';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

  title: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let console: string = Console.Consoles[params['console']];
      let section: string = Section.Sections[params['section']];
      let id: number = +params['id'];
      if (console === undefined) {
        //console not valid
        this.router.navigate(['/games']);
      } else if (section === undefined) {
        //section not valid
        this.router.navigate(['/games/' + params['console']]);
      } else if (id === NaN){
        //id not valid
        this.router.navigate(['/games/' + params['console'] + '/' + params['section']]);
      }
      this.title = id +'';
    });
  }

}
