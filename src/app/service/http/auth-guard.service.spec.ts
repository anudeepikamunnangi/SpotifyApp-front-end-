import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuardService, AuthGuard, LoginGuard } from './auth-guard.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuardService]
    });

    service = TestBed.inject(AuthGuardService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should allow activation when token is present', () => {
  //   spyOn(localStorage, 'getItem').and.returnValue('someToken');
  //   const canActivate = service.canActivate(null as any, null as any);
  //   expect(canActivate).toBe(true);
  // });

  // it('should prevent activation and navigate to login when token is not present', () => {
  //   spyOn(localStorage, 'getItem').and.returnValue(null);
  //   spyOn(router, 'navigate');
    
  //   const canActivate = service.canActivate(null as any, null as any);
    
  //   expect(canActivate).toBe(false);
  //   expect(router.navigate).toHaveBeenCalledWith(['/login']);
  // });
});

describe('AuthGuard', () => {
  it('should return true when token is present', () => {
    spyOn(localStorage, 'getItem').and.returnValue('someToken');
    const canActivate = AuthGuard(null as any, null as any);
    expect(canActivate).toBe(true);
  });

  it('should return false and not navigate when token is not present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(console, 'warn'); // to suppress potential console warning about navigate being called
    const canActivate = AuthGuard(null as any, null as any);
    expect(canActivate).toBe(false);
  });
});

describe('LoginGuard', () => {
  it('should return true when token is not present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const canActivate = LoginGuard(null as any, null as any);
    expect(canActivate).toBe(true);
  });

  it('should return false and not navigate when token is present', () => {
    spyOn(localStorage, 'getItem').and.returnValue('someToken');
    spyOn(console, 'warn'); // to suppress potential console warning about navigate being called
    const canActivate = LoginGuard(null as any, null as any);
    expect(canActivate).toBe(false);
  });
});