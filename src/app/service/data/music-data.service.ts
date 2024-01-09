import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL_MUSIC } from 'src/app/app-constants';
import { SpotifyPlaylist } from 'src/app/model/SpotifyPlaylist';
import { SpotifyPlaylistSearch } from 'src/app/model/SpotifyPlaylistSearch';
import { SpotifyTracks } from 'src/app/model/SpotifyTracks';
import { Track } from 'src/app/model/Track';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {


  constructor(private httpClient: HttpClient) { }



  getTodayTopHitsPlaylist(): Observable<SpotifyPlaylist>{
    return this.httpClient.get<SpotifyPlaylist>(`${API_URL_MUSIC}/todayTopHitsPlaylist`);
  }
  
  getDiscoverWeeklyPlaylist(): Observable<SpotifyPlaylist>{
    return this.httpClient.get<SpotifyPlaylist>(`${API_URL_MUSIC}/todayDiscoverWeeklyPlaylist`);
  }
  getAllHindiSongs(): Observable<SpotifyPlaylist>{
    return this.httpClient.get<SpotifyPlaylist>(`${API_URL_MUSIC}/allHindiSongs`);
  }

  getTop50GlobalSongs(): Observable<SpotifyPlaylist>{
    return this.httpClient.get<SpotifyPlaylist>(`${API_URL_MUSIC}/top50GlobalSongs`);
  }
  getTopTeluguSongs(): Observable<SpotifyPlaylist>{
    return this.httpClient.get<SpotifyPlaylist>(`${API_URL_MUSIC}/topTeluguSongs`);
  }
  getTeluguLoveSongs(): Observable<SpotifyPlaylist>{
    return this.httpClient.get<SpotifyPlaylist>(`${API_URL_MUSIC}/topTeluguLoveSongs`);
  }
  getKoreanSongs():Observable<SpotifyPlaylist>{
    return this.httpClient.get<SpotifyPlaylist>(`${API_URL_MUSIC}/topKoreanSongs`);
  }
  getLoveSongs():Observable<SpotifyPlaylist>{
    return this.httpClient.get<SpotifyPlaylist>(`${API_URL_MUSIC}/topLoveSongs`);
  }
  searchTracks(query: string): Observable<SpotifyTracks>{

    const params = new HttpParams().set('query', query);

    return this.httpClient.get<SpotifyTracks>(`${API_URL_MUSIC}/searchTracks`, { params });
  }

  searchPlaylists(playlistId: string): Observable<SpotifyPlaylistSearch>{
    const params = new HttpParams().set('query', playlistId);
    return this.httpClient.get<SpotifyPlaylistSearch>(`${API_URL_MUSIC}/searchPlaylists`,{params})
  }

  getTrack(trackId: string): Observable<Track>{
    const params = new HttpParams().set('trackId', trackId);
    return this.httpClient.get<Track>(`${API_URL_MUSIC}/track`, { params });
  }

  getPlaylist(playlistId: string): Observable<SpotifyPlaylist>{
    const params = new HttpParams().set('playlistId', playlistId);
    return this.httpClient.get<SpotifyPlaylist>(`${API_URL_MUSIC}/playlist`,{params})
  }
}
