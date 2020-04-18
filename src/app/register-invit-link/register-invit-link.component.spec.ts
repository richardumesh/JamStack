import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInvitLinkComponent } from './register-invit-link.component';

describe('RegisterInvitLinkComponent', () => {
  let component: RegisterInvitLinkComponent;
  let fixture: ComponentFixture<RegisterInvitLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterInvitLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInvitLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
