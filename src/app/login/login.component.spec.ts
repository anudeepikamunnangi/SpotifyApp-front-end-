import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../service/data/authentication.service';
import { UserProfileDataService } from '../service/data/user-profile-data.service';
import { of, throwError } from 'rxjs';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [LoginComponent]
//     });
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });




describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let userServiceSpy: jasmine.SpyObj<UserProfileDataService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['authenticate']);
    userServiceSpy = jasmine.createSpyObj('UserProfileDataService', ['register']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: UserProfileDataService, useValue: userServiceSpy }
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call register method on signUp', () => {
    // Arrange
    const mockUserProfile = { id:1,username:'mockuser',email:'mock@gmail.com',firstName:'first',lastName:'last',password:'password',dateOfBirth:'11-12-2023'};
    userServiceSpy.register.and.returnValue(of(mockUserProfile));

    // Act
    component.signUp();

    // Assert
    expect(userServiceSpy.register).toHaveBeenCalledOnceWith(component.username, component.password, component.email);
    expect(component.userProfile).toEqual(mockUserProfile);
    expect(component.successMessage).toEqual('Your Are Register');
    expect(component.errorMessage2).toEqual('');
  });

  it('should handle error on signUp', () => {
    // Arrange
    const errorMessage = 'User Already Exists';
    userServiceSpy.register.and.returnValue(throwError(errorMessage));

    // Act
    component.signUp();

    // Assert
    expect(userServiceSpy.register).toHaveBeenCalledOnceWith(component.username, component.password, component.email);
    expect(component.errorMessage2).toEqual(errorMessage);
    expect(component.successMessage).toEqual('');
  });

  // it('should call authenticate method on login', () => {
  //   // Arrange
  //   const mockToken = 'mockToken';
  //   authServiceSpy.authenticate.and.returnValue(of({ jwt_token: mockToken }));

  //   // Act
  //   component.login();

  //   // Assert
  //   expect(authServiceSpy.authenticate).toHaveBeenCalledOnceWith(component.loginUsername, component.loginPassword);
  //   expect(localStorage.getItem('token')).toEqual(mockToken);
  //   // You may want to spy on router.navigate and check if it was called with the expected route.
  // });

  it('should handle error on login', () => {
    // Arrange
    const errorMessage = 'Authentication failed. Please check your credentials.';
    authServiceSpy.authenticate.and.returnValue(throwError(errorMessage));

    // Act
    component.login();

    // Assert
    expect(authServiceSpy.authenticate).toHaveBeenCalledOnceWith(component.loginUsername, component.loginPassword);
    expect(component.errorMessage).toEqual(errorMessage);
  });
});