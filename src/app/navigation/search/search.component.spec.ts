// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { SearchComponent } from './search.component';

// describe('SearchComponent', () => {
//   let component: SearchComponent;
//   let fixture: ComponentFixture<SearchComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [SearchComponent]
//     });
//     fixture = TestBed.createComponent(SearchComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicDataService } from 'src/app/service/data/music-data.service';
import { WishlistDataService } from 'src/app/service/data/wishlist-data.service';
import { PlayMusicService } from 'src/app/play-music.service';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SpotifyTracks } from 'src/app/model/SpotifyTracks'; // Import the correct type
import { ExternalUrls } from 'src/app/model/ExternalUrls';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let musicServiceSpy: jasmine.SpyObj<MusicDataService>;
  let wishlistServiceSpy: jasmine.SpyObj<WishlistDataService>;
  let playMusicServiceSpy: jasmine.SpyObj<PlayMusicService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    musicServiceSpy = jasmine.createSpyObj('MusicDataService', ['searchTracks', 'getTrack']);
    wishlistServiceSpy = jasmine.createSpyObj('WishlistDataService', ['deleteTrackByUsernameAndTrackId', 'saveTrackToWishlist', 'getUserWishList']);
    playMusicServiceSpy = jasmine.createSpyObj('PlayMusicService', ['openPlayDialog']);

    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { queryParams: of({ query: 'test' }) } },
        { provide: Router, useValue: routerSpy },
        { provide: MusicDataService, useValue: musicServiceSpy },
        { provide: WishlistDataService, useValue: wishlistServiceSpy },
        { provide: PlayMusicService, useValue: playMusicServiceSpy },
        ChangeDetectorRef
      ]
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch search results on ngAfterViewInit', fakeAsync(() => {
    const searchResult: SpotifyTracks = { // Fix the type here
      tracks: {
        items: [
          { id: '1', name: 'Track 1', album: {
            albumType: '',
            artists: [],
            externalUrls: new ExternalUrls,
            images: [],
            id: '',
            name: '',
            releaseDate: '',
            type: ''
          }, artists: [], external_urls: {
            spotify: ''
          }, preview_url: '', type: 'track' },
          { id: '2', name: 'Track 2', album: {
            albumType: '',
            artists: [],
            externalUrls: new ExternalUrls,
            images: [],
            id: '',
            name: '',
            releaseDate: '',
            type: ''
          }, artists: [], external_urls: {
            spotify: ''
          }, preview_url: '', type: 'track' }
        ]
      }
    };
    musicServiceSpy.searchTracks.and.returnValue(of(searchResult));

    fixture.detectChanges();
    tick();

    expect(component.spotifyTracks).toEqual(searchResult);
    expect(component.dataSource.data.length).toBe(2);
  }));
  
  it('should toggle heart state when calling toggleHeartState', () => {
    component.trackIds = ['1', '2'];
    component.heartStates = { '1': 'inactive', '2': 'active' };

    component.toggleHeartState('1');

    expect(component.heartStates['1']).toBe('active');
    expect(wishlistServiceSpy.saveTrackToWishlist).toHaveBeenCalled();
  });

  it('should navigate to login page if user is not authenticated when toggling heart state', () => {
    localStorage.removeItem('authenticatedUser');

    component.toggleHeartState('1');

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should play the track when calling playTrack', () => {
    const track: any = { external_urls: { spotify: 'spotify-url' } };

    component.playTrack(track);

    expect(window.open).toHaveBeenCalledWith('spotify-url', '_blank');
  });
});