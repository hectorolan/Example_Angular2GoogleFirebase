import { Component, OnInit } from '@angular/core';
import { Section } from '../../models/section';
import { Console } from '../../models/console';

@Component({
  selector: 'app-createad',
  templateUrl: './createad.component.html',
  styleUrls: ['./createad.component.css']
})
export class CreateAdComponent implements OnInit {

  sections = Section.Sections;
  consoles = Console.Consoles;

  constructor() { }

  ngOnInit() {
  }

  keys(dictionary): Array<string> {
    return Object.keys(dictionary);
  }
}
