import { TestBed, inject, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MusicDataService } from './music-data.service';
import { SpotifyPlaylist } from 'src/app/model/SpotifyPlaylist';
import { SpotifyTracks } from 'src/app/model/SpotifyTracks';
import { SpotifyPlaylistSearch } from 'src/app/model/SpotifyPlaylistSearch';
import { Tracks } from 'src/app/model/Tracks';
import { TrackTracks } from 'src/app/model/TrackTracks';
import { PlaylistSearch } from 'src/app/model/PlaylistSearch';


describe('MusicDataService', () => {
  let service: MusicDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MusicDataService]
    });

    service = TestBed.inject(MusicDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve Today\'s Top Hits Playlist', () => {
    const mockPlaylist: SpotifyPlaylist = {
        description: '',
        external_urls: undefined,
        id: '',
        images: [],
        name: '',
        tracks: new Tracks
    };
    
    service.getTodayTopHitsPlaylist().subscribe(playlist => {
      expect(playlist).toEqual(mockPlaylist);
    });

    const req = httpMock.expectOne('${API_URL_MUSIC}/todayTopHitsPlaylist');
    expect(req.request.method).toBe('GET');
    req.flush(mockPlaylist);
    tick();
  });

  // Similar test cases for other playlist retrieval methods

  it('should search tracks by query', () => {
    const query = 'some query';
    const mockTracks: SpotifyTracks = {
        tracks: new TrackTracks
    };
    
    service.searchTracks(query).subscribe(tracks => {
      expect(tracks).toEqual(mockTracks);
    });

    const req = httpMock.expectOne('${API_URL_MUSIC}/searchTracks?query=${query}');
    expect(req.request.method).toBe('GET');
    req.flush(mockTracks);
    tick();
  });

  it('should search playlists by playlistId', () => {
    const playlistId = 'somePlaylistId';
    const mockPlaylistSearch: SpotifyPlaylistSearch = {
        playlists: new PlaylistSearch
    };
    
    service.searchPlaylists(playlistId).subscribe(playlistSearch => {
      expect(playlistSearch).toEqual(mockPlaylistSearch);
    });

    const req = httpMock.expectOne('${API_URL_MUSIC}/searchPlaylists?query=${playlistId}');
    expect(req.request.method).toBe('GET');
    req.flush(mockPlaylistSearch);
  });

  // Similar test cases for getTrack and getPlaylist methods

  // Additional test cases for error handling, parameterization, etc.

});