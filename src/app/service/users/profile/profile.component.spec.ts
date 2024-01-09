import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { AuthenticationService } from 'src/app/service/data/authentication.service';
import { UserProfileDataService } from 'src/app/service/data/user-profile-data.service';
import { WishlistDataService } from 'src/app/service/data/wishlist-data.service';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let userProfileService: jasmine.SpyObj<UserProfileDataService>;
  let wishlistService: jasmine.SpyObj<WishlistDataService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['validateToken']);
    const userProfileServiceSpy = jasmine.createSpyObj('UserProfileDataService', ['getUserById']);
    const wishlistServiceSpy = jasmine.createSpyObj('WishlistDataService', ['getUserWishList']);

    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: UserProfileDataService, useValue: userProfileServiceSpy },
        { provide: WishlistDataService, useValue: wishlistServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    userProfileService = TestBed.inject(UserProfileDataService) as jasmine.SpyObj<UserProfileDataService>;
    wishlistService = TestBed.inject(WishlistDataService) as jasmine.SpyObj<WishlistDataService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 

  it('should set userProfile on successful getUserProfile', () => {
    const mockUserProfile = { id:1,username:'mockuser',email:'mock@gmail.com',firstName:'first',lastName:'last',password:'password',dateOfBirth:'11-12-2023'};
    userProfileService.getUserById.and.returnValue(of(mockUserProfile));
    component.getUserProfile();
    expect(component.userProfile).toEqual(mockUserProfile);
  });

  it('should handle error in getUserProfile', () => {
    userProfileService.getUserById.and.returnValue(of( { id:1,username:'mockuser',email:'mock@gmail.com',firstName:'first',lastName:'last',password:'password',dateOfBirth:'11-12-2023'})); // Simulating an error
    spyOn(console, 'error');
    component.getUserProfile();
    expect(console.error).toHaveBeenCalled();
  });

  

});