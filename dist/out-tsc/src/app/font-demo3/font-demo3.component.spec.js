import { async, TestBed } from '@angular/core/testing';
import { FontDemo3Component } from './font-demo3.component';
describe('FontDemo3Component', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FontDemo3Component]
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
//# sourceMappingURL=font-demo3.component.spec.js.map