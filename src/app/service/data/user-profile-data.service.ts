import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL_USERPROFILE } from 'src/app/app-constants';
import { UserProfile } from 'src/app/model/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileDataService {

  constructor(private httpClient: HttpClient) { }

  register(username: string, password: string, email: string): Observable<UserProfile> {
   const user = new UserProfile();
    user.username = username;
    user.password = password;
    user.email = email;
    return this.httpClient.post<UserProfile>(`${API_URL_USERPROFILE}/addUser`, user);
  }
  getUserById(): Observable<UserProfile> {
    const username = localStorage.getItem('authenticatedUser');
    
     return this.httpClient.get<UserProfile>(`${API_URL_USERPROFILE}/getUserById/${username}`);
  }

  updateuser(user: any): Observable<UserProfile> {
    const username = localStorage.getItem('authenticatedUser');
    return this.httpClient.put<UserProfile>(`${API_URL_USERPROFILE}/update/${username}`, user);
  }
}