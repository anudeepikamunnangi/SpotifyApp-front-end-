import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
// import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
// import { HomeComponent } from './home.component';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatTableModule } from '@angular/material/table';
// import { PlayMusicService } from 'src/app/play-music.service';
// import { WishlistDataService } from 'src/app/service/data/wishlist-data.service';
// import { MusicDataService } from 'src/app/service/data/music-data.service';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { AuthenticationService } from 'src/app/service/data/authentication.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
// import { MatDialog } from '@angular/material/dialog';

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;
//   let router: Router;

//   beforeEach(
//     waitForAsync(() => {
//       TestBed.configureTestingModule({
//         declarations: [HomeComponent],
//         imports: [
//           MatPaginatorModule,
//           MatTableModule,
//           RouterTestingModule,
//           HttpClientTestingModule,
//         ],
//         providers: [
//           { provide: PlayMusicService, useValue: jasmine.createSpyObj('PlayMusicService', ['openPlayDialog']) },
//           { provide: MatDialog, useValue: {} },
//           WishlistDataService,
//           MusicDataService,
//           AuthenticationService,
//         ],
//       }).compileComponents();
//     })
//   );

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     router = TestBed.inject(Router);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should toggle heart state correctly', () => {
//     const trackId = 'some-track-id';
//     component.toggleHeartState(trackId);
//     expect(component.getHeartState(trackId)).toEqual('active');
//     component.toggleHeartState(trackId);
//     expect(component.getHeartState(trackId)).toEqual('inactive');
//   });

//   it('should save track to wishlist', () => {
//     const trackId = 'some-track-id';
//     spyOn(component, 'saveTrackToWishList').and.callThrough();
//     component.toggleHeartState(trackId);
//     expect(component.saveTrackToWishList).toHaveBeenCalledWith(trackId);
//   });

//   it('should delete track from wishlist', () => {
//     const trackId = 'some-track-id';
//     spyOn(component, 'deleteTrackToWishList').and.callThrough();
//     component.toggleHeartState(trackId);
//     component.toggleHeartState(trackId);
//     expect(component.deleteTrackToWishList).toHaveBeenCalledWith(trackId);
//   });

//   it('should navigate to login page if not authenticated', () => {
//     const trackId = 'some-track-id';
//     spyOn(component['router'], 'navigate');
//     spyOn(localStorage, 'getItem').and.returnValue(null);
//     component.toggleHeartState(trackId);
//     expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
//   });

//   it('should navigate to search page with query on search()', fakeAsync(() => {
//     const query = 'search-query';
//     const navigateSpy = spyOn(router, 'navigate');
//     component.find = query;
//     component.search(query);
//     tick();
//     expect(navigateSpy).toHaveBeenCalledWith(['/search'], {
//       queryParams: { query: query },
//     });
//   }));

//   it('should check authentication status on ngOnInit()', () => {
//     spyOn(component, 'checkAuthenticationStatus');
//     component.ngOnInit();
//     expect(component.checkAuthenticationStatus).toHaveBeenCalled();
//   });

//   // Add more test cases based on your component's functionality

// });