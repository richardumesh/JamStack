import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontDemo1Component } from './font-demo1.component';

describe('FontDemo1Component', () => {
  let component: FontDemo1Component;
  let fixture: ComponentFixture<FontDemo1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontDemo1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontDemo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
