import { Component, OnInit } from '@angular/core';
import { Console } from '../models/console';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  consoles = Console.Consoles;

  constructor() { }

  ngOnInit() {
  }

  keys(dictionary): Array<string> {
    return Object.keys(dictionary);
  }

}
