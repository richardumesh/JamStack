import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterCbComponent } from './roster-cb.component';

describe('RosterCbComponent', () => {
  let component: RosterCbComponent;
  let fixture: ComponentFixture<RosterCbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterCbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterCbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
