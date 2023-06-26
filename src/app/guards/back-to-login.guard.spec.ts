import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BackToLoginGuard } from './back-to-login.guard';

describe('BackToLoginGuardGuard', () => {
  let guard: BackToLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackToLoginGuard]
    });

    guard = TestBed.inject(BackToLoginGuard);
  });

  it('should allow access if user is not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const canActivateResult: boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> = guard.canActivate(route, state);

    expect(canActivateResult).toBeTrue();
    expect(localStorage.getItem).toHaveBeenCalledWith('user');
  });

  it('should deny access if user is logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue('user');

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const canActivateResult: boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> = guard.canActivate(route, state);

    expect(canActivateResult).toBeFalse();
    expect(localStorage.getItem).toHaveBeenCalledWith('user');
  });
});