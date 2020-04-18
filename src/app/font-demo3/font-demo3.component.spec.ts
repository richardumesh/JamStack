import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontDemo3Component } from './font-demo3.component';

describe('FontDemo3Component', () => {
  let component: FontDemo3Component;
  let fixture: ComponentFixture<FontDemo3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontDemo3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontDemo3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
