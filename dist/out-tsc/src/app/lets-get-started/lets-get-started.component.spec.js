import { async, TestBed } from '@angular/core/testing';
import { LetsGetStartedComponent } from './lets-get-started.component';
describe('LetsGetStartedComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LetsGetStartedComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(LetsGetStartedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lets-get-started.component.spec.js.map