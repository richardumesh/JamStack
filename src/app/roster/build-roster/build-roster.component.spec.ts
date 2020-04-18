import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildRosterComponent } from './build-roster.component';

describe('BuildRosterComponent', () => {
  let component: BuildRosterComponent;
  let fixture: ComponentFixture<BuildRosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildRosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
