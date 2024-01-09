import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { API_URL_AUTH } from 'src/app/app-constants';
import { AuthAccessToken } from 'src/app/model/AuthAccessToken';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authAccessToken!: AuthAccessToken

  authenticate(username: string, password: string): Observable<AuthAccessToken> {
    // Construct the query parameters
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    // Include the query parameters in the request
    return this.httpClient.post<AuthAccessToken>(`${API_URL_AUTH}/login`, {}, { params }).pipe(
      map(
        authAccessToken => {
          localStorage.setItem('authenticatedUser', authAccessToken.username);
          let tokenStr = 'Bearer ' + authAccessToken.jwt_token;
          localStorage.setItem('token', tokenStr);
          return authAccessToken;
        }
      )
    );
  }

  validateToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
  
    return this.httpClient.post<Map<String, String>>(`${API_URL_AUTH}/validate`, { headers });
  }
  
  tokenValidate(){
    let token = 'Bearer '+ localStorage.getItem('token')
    this.validateToken(token).subscribe({
      next: (v) => {
      },
      error: (e) => {console.error('e') , localStorage.removeItem('token')},
      complete: () => {console.info('complete')}
     });

    return token;
  }

  // authenticate1(username: string, password: string): Observable<AuthAccessToken> {
  //   const params = new HttpParams()
  //     .set('username', username)
  //     .set('password', password);

  //   return this.httpClient.post<AuthAccessToken>('${API_URL_AUTH}/login', {}, { params }).pipe(
  //     map((response: any) => {
  //       // Ensure the response has the expected properties
  //       if (response && response.jwt_token) {
  //         const authAccessToken: AuthAccessToken = {
  //           jwt_token: response.jwt_token,
  //           message: response.message,
  //           role: response.role,
  //           username: response.username
  //         };

  //         localStorage.setItem('authenticatedUser', response.username);
  //         const tokenStr = 'Bearer ' + response.jwt_token;
  //         localStorage.setItem('token', tokenStr);

  //         return authAccessToken;
  //       } else {
  //         // Handle unexpected response format
  //         throw new Error('Invalid response format');
  //       }
  //     }),
  //     catchError(error => {
  //       // Handle authentication error if needed
  //       console.error('Authentication failed', error);
  //       throw error;
  //     })
  //   );
  // }
  isUserLoggedIn():boolean{
    const token=localStorage.getItem('token');
    return !!token;
  }

}
