
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserProfileDataService } from './user-profile-data.service';
import { API_URL_USERPROFILE } from 'src/app/app-constants';
import { UserProfile } from 'src/app/model/UserProfile';

describe('UserProfileDataService', () => {
  let userProfileDataService: UserProfileDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserProfileDataService],
    });

    userProfileDataService = TestBed.inject(UserProfileDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([UserProfileDataService], (service: UserProfileDataService) => {
    expect(service).toBeTruthy();
  }));

  it('should register a user', () => {
    const mockUser: UserProfile = {
      username: 'testuser',
      password: 'testpassword',
      email: 'test@example.com',
      firstName:'mockfist',
      lastName:'mocklast',
      dateOfBirth:'mockdob'
    };

    userProfileDataService.register(mockUser.username, mockUser.password, mockUser.email).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne('${API_URL_USERPROFILE}/addUser');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should get user by ID', () => {
    const mockUser: UserProfile = {
      username: 'testuser',
      password: 'testpassword',
      email: 'test@example.com',
      firstName:'mockfist',
      lastName:'mocklast',
      dateOfBirth:'mockdob'
    };

    userProfileDataService.getUserById().subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne('${API_URL_USERPROFILE}/getUserById/${mockUser.username}');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should update a user', () => {
    const mockUser: UserProfile = {
      username: 'testuser',
      password: 'testpassword',
      email: 'test@example.com',
      firstName:'mockfist',
      lastName:'mocklast',
      dateOfBirth:'mockdob'
    };

    userProfileDataService.updateuser(mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne('${API_URL_USERPROFILE}/update/${mockUser.username}');
    expect(req.request.method).toBe('PUT');
    req.flush(mockUser);
  });
});