import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendActivityComponent } from './send-activity.component';

describe('SendActivityComponent', () => {
  let component: SendActivityComponent;
  let fixture: ComponentFixture<SendActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
