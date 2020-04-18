import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTopicStatusComponent } from './check-topic-status.component';

describe('CheckTopicStatusComponent', () => {
  let component: CheckTopicStatusComponent;
  let fixture: ComponentFixture<CheckTopicStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckTopicStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTopicStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
