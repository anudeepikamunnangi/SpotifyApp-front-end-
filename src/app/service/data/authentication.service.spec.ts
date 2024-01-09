
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { API_URL_AUTH } from 'src/app/app-constants';
import { AuthAccessToken } from 'src/app/model/AuthAccessToken';
import { Observable } from 'rxjs';

describe('AuthenticationService', () => {
  let authService: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService],
    });

    authService = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  it('should authenticate user', () => {
    const username = 'testuser';
    const password = 'testpassword';

    const mockAccessToken: AuthAccessToken = {
      jwt_token: 'mockToken',
      message: 'Authentication successful',
      role: 'user',
      username: 'testuser',
    };

    authService.authenticate(username, password).subscribe((accessToken) => {
      expect(accessToken).toEqual(mockAccessToken);
    });

    const req = httpTestingController.expectOne('${API_URL_AUTH}/login?username=${username}&password=${password}');
    expect(req.request.method).toBe('POST');

    req.flush(mockAccessToken);
  });

  it('should handle authentication error', () => {
    const username = 'testuser';
    const password = 'testpassword';

    authService.authenticate(username, password).subscribe(
      () => {},
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne('${API_URL_AUTH}/login?username=${username}&password=${password}');
    expect(req.request.method).toBe('POST');

    // Simulate an error response
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('should validate token', () => {
    const mockToken = 'mockToken';

    authService.validateToken(mockToken).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('${API_URL_AUTH}/validate');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(mockToken);

    // Simulate a successful response
    req.flush({});

    // Additional expectations based on your validation response
  });

  it('should handle token validation error', () => {
    const mockToken = 'mockToken';

    authService.validateToken(mockToken).subscribe(
      () => {},
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne('${API_URL_AUTH}/validate');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(mockToken);

    // Simulate an error response
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('should return true for logged-in user', () => {
    localStorage.setItem('token', 'mockToken');

    const isLoggedIn = authService.isUserLoggedIn();

    expect(isLoggedIn).toBe(true);
  });

  it('should return false for logged-out user', () => {
    localStorage.removeItem('token');

    const isLoggedIn = authService.isUserLoggedIn();

    expect(isLoggedIn).toBe(false);
  });

  it('should validate stored token', () => {
    localStorage.setItem('token', 'mockToken');

    const storedToken = authService.tokenValidate();

    expect(storedToken).toBe('Bearer mockToken');
  });

  it('should remove token on validation error', () => {
    localStorage.setItem('token', 'mockToken');

    spyOn(authService, 'validateToken').and.returnValue(
      new Observable((observer) => {
        observer.error(new Error('Validation error'));
      })
    );

    const storedToken = authService.tokenValidate();

    expect(storedToken).toBeNull();
  });
});
