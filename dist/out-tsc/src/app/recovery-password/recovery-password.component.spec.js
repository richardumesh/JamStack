import { async, TestBed } from '@angular/core/testing';
import { RecoveryPasswordComponent } from './recovery-password.component';
describe('RecoveryPasswordComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecoveryPasswordComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(RecoveryPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=recovery-password.component.spec.js.map