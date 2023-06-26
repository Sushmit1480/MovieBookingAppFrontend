import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminGuard } from './admin.guard';

describe('RouteInterceptorGuard', () => {
  let guard: AdminGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard, { provide: Router, useClass: RouterStub }]
    });

    guard = TestBed.inject(AdminGuard);
    router = TestBed.inject(Router);
  });

  it('should allow access for admin user', () => {
    const adminUser = { email: 'admin@gmail.com' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(adminUser));
    spyOn(window, 'alert');

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const canActivateResult: boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> = guard.canActivate(route, state);

    expect(canActivateResult).toBeTrue();
    expect(localStorage.getItem).toHaveBeenCalledWith('user');
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('should deny access for non-admin user', () => {
    const nonAdminUser = { email: 'user@gmail.com' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(nonAdminUser));
    spyOn(window, 'alert');

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const canActivateResult: boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> = guard.canActivate(route, state);

    expect(canActivateResult).toBeFalse();
    expect(localStorage.getItem).toHaveBeenCalledWith('user');
    expect(window.alert).toHaveBeenCalledWith('You dont have access to this route!!');
  });

  afterEach(() => {
    localStorage.removeItem('user');
  });
});

// Stub for Router
class RouterStub {
  navigateByUrl(url: string) {
    return url;
}
}