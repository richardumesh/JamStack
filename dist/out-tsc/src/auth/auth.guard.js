import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let AuthGuard = class AuthGuard {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate() {
        if (!this.authService.isTokenExpired()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
};
AuthGuard = tslib_1.__decorate([
    Injectable()
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map