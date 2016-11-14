import { Component, OnInit } from '@angular/core';
import { Console } from '../../models/console';

@Component({
  selector: 'app-consoles',
  templateUrl: './consoles.component.html',
  styleUrls: ['./consoles.component.css']
})
export class ConsolesComponent implements OnInit {

  consoles: string[] = [];
  constructor() { }

  ngOnInit() {
  }
}
