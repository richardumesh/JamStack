import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontDemo2Component } from './font-demo2.component';

describe('FontDemo2Component', () => {
  let component: FontDemo2Component;
  let fixture: ComponentFixture<FontDemo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontDemo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontDemo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
