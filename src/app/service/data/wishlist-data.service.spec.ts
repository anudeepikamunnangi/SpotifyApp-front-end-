
import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WishlistDataService } from './wishlist-data.service';
import { Wishlist } from 'src/app/model/Wishlist';
import { Track } from 'src/app/model/Track';
import { Album } from 'src/app/model/Album';
import { ExternalUrls } from 'src/app/model/ExternalUrls';

describe('WishlistDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WishlistDataService],
    });
  });

  it('should be created', inject([WishlistDataService], (service: WishlistDataService) => {
    expect(service).toBeTruthy();
  }));

  // it('should get user wishlist when user is authenticated', async(
  //   inject(
  //     [WishlistDataService, HttpTestingController],
  //     (service: WishlistDataService, httpMock: HttpTestingController) => {
  //       const mockUsername = 'testUser';
  //       localStorage.setItem('authenticatedUser', mockUsername);

  //       const mockWishlist: Wishlist = {
  //         username: '',
  //         tracks: []
  //       };

  //       service.getUserWishList().subscribe((wishlist: Wishlist) => {
  //         expect(wishlist).toEqual(mockWishlist);
  //       });

  //       const req = httpMock.expectOne('${API_URL_WISHLIST}/getUserWishLisl?username=${mockUsername}+');
  //       expect(req.request.method).toBe('GET');
  //       req.flush(mockWishlist);

  //       httpMock.verify();
  //     }
  //   )
  // ));

  // it('should not get user wishlist when user is not authenticated', async(
  //   inject([WishlistDataService, HttpTestingController], (service: WishlistDataService, httpMock: HttpTestingController) => {
  //     localStorage.removeItem('authenticatedUser');

  //     service.getUserWishList().subscribe(() => {
  //       fail('Should not have reached here');
  //     }, error => {
  //       expect(error).toBeTruthy();
  //     });

  //     httpMock.expectNone('${API_URL_WISHLIST}/getUserWishLisl');

  //     httpMock.verify();
  //   })
  // ));

  // it('should check if a track exists in the wishlist', async(
  //   inject(
  //     [WishlistDataService, HttpTestingController],
  //     (service: WishlistDataService, httpMock: HttpTestingController) => {
  //       const mockUsername = 'testUser';
  //       localStorage.setItem('authenticatedUser', mockUsername);
  //       const mockTrackId = '123';

  //       service.favoriteExists(mockTrackId).subscribe((exists: boolean) => {
  //         expect(exists).toBeTruthy(); // Assuming the track exists for this test
  //       });

  //       const req = httpMock.expectOne('${API_URL_WISHLIST}/favoriteExists?username=${mockUsername}&trackId=${mockTrackId}');
  //       expect(req.request.method).toBe('GET');
  //       req.flush(true); // Assuming the track exists for this test

  //       httpMock.verify();
  //     }
  //   )
  // ));

  // it('should save a track to the wishlist', async(
  //   inject(
  //     [WishlistDataService, HttpTestingController],
  //     (service: WishlistDataService, httpMock: HttpTestingController) => {
  //       const mockUsername = 'testUser';
  //       localStorage.setItem('authenticatedUser', mockUsername);
  //       const mockTrack: Track = {
  //         album: new Album,
  //         artists: [],
  //         external_urls: new ExternalUrls,
  //         id: '',
  //         name: '',
  //         preview_url: '',
  //         type: ''
  //       };

  //       service.saveTrackToWishlist(mockTrack).subscribe((savedTrack: Track) => {
  //         expect(savedTrack).toEqual(mockTrack);
  //       });

  //       const req = httpMock.expectOne('${API_URL_WISHLIST}/saveTrackToWishlist?username=${mockUsername}');
  //       expect(req.request.method).toBe('POST');
  //       req.flush(mockTrack);

  //       httpMock.verify();
  //     }
  //   )
  // ));

  // it('should delete a track from the wishlist', async(
  //   inject(
  //     [WishlistDataService, HttpTestingController],
  //     (service: WishlistDataService, httpMock: HttpTestingController) => {
  //       const mockUsername = 'testUser';
  //       localStorage.setItem('authenticatedUser', mockUsername);
  //       const mockTrackId = '123';

  //       service.deleteTrackByUsernameAndTrackId(mockTrackId).subscribe(response => {
  //         expect(response).toBeTruthy(); // Assuming a successful delete for this test
  //       });

  //       const req = httpMock.expectOne('${API_URL_WISHLIST}/removeTrack?username=${mockUsername}&trackId=${mockTrackId}');
  //       expect(req.request.method).toBe('DELETE');
  //       req.flush({}); // Assuming a successful delete for this test

  //       httpMock.verify();
  //     }
  //   )
  // ));

});
