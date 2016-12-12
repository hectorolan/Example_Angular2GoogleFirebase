/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IgdbResultsComponent } from './igdb-results.component';

describe('IgdbResultsComponent', () => {
  let component: IgdbResultsComponent;
  let fixture: ComponentFixture<IgdbResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgdbResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgdbResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
