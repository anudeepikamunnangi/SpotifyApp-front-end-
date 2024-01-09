import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL_WISHLIST } from 'src/app/app-constants';
import { Track } from 'src/app/model/Track';
import { Wishlist } from 'src/app/model/Wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistDataService {

  username: string='';

  constructor(private httpClient: HttpClient) { }

  getUserWishList(): Observable<Wishlist>{
    const username = localStorage.getItem('authenticatedUser');
    let params = new HttpParams().set('username', "username");

    if (username !== null) {
      params = new HttpParams().set('username', username);
    }
    return this.httpClient.get<Wishlist>(`${API_URL_WISHLIST}/getUserWishLisl`, {params})
  }

  favoriteExists(trackId: string): Observable<boolean>{
    const username = localStorage.getItem('authenticatedUser');
    let params = new HttpParams()
      .set('username', 'username')
      .set('trackId', trackId);
    if (username !== null) {
      params = new HttpParams()
      .set('username', username)
      .set('trackId', trackId);
    } 
    return this.httpClient.get<boolean>(`${API_URL_WISHLIST}/favoriteExists`, {params});
  }

  saveTrackToWishlist(track: Track): Observable<Track>{
    const username = localStorage.getItem('authenticatedUser');
    let params = new HttpParams().set('username', "username");

    if (username !== null) {
      params = new HttpParams().set('username', username);
    }
    return this.httpClient.post<Track>(`${API_URL_WISHLIST}/saveTrackToWishlist`, track,{params});
  }

  deleteTrackByUsernameAndTrackId(trackId: string): Observable<any>{
    const username = localStorage.getItem('authenticatedUser');
    let params = new HttpParams()
      .set('username', 'username')
      .set('trackId', trackId);
    if (username !== null) {
      params = new HttpParams()
      .set('username', username)
      .set('trackId', trackId);
    } 
    
    return this.httpClient.delete<any>(`${API_URL_WISHLIST}/removeTrack`, {params});
  }
}

