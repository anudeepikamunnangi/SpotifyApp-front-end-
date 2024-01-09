import { NgModule } from '@angular/core';
import { SocialLoginModule,SocialAuthServiceConfig, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider,FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorBasicAuthService } from './service/http/http-interceptor-basic-auth.service';
import { FavoriteListComponent as FavoriteListComponent } from './favorite-list/favorite-list.component';
import { HomeComponent } from './navigation/home/home.component';
import { LoginComponent } from './login/login.component';
import { TodayTopHitsPlaylistComponent } from './spotify/today-top-hits-playlist/today-top-hits-playlist.component';

import { MillisecondsToMinutesPipe } from './app-parsers/pipe-calculate';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateFormatPipe } from './app-parsers/pipe-date';
import { RemoveTimePipe } from './app-parsers/pipe-remove';

import { FooterComponent } from './navigation/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from './navigation/side-bar/side-bar.component';
import { LogoutComponent } from './logout/logout.component';
import { PlayComponent } from './play/play.component';
import { ProfileComponent } from './service/users/profile/profile.component';
import { UpdateProfileComponent } from './service/users/update-profile/update-profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { TopButtonComponent } from './navigation/top-button/top-button.component';
import { NewloginComponent } from './newlogin/newlogin.component';
import { SearchComponent } from './navigation/search/search.component';
import { GoogleloginComponent } from './googlelogin/googlelogin.component';
import { FacebookloginComponent } from './facebooklogin/facebooklogin.component';

@NgModule({
  declarations: [
    AppComponent,
    FavoriteListComponent,
    HomeComponent,
    LoginComponent,
    TodayTopHitsPlaylistComponent,
   
    MillisecondsToMinutesPipe,
    DateFormatPipe,
    RemoveTimePipe,
   
    FooterComponent,
  
    SideBarComponent,
    LogoutComponent,
    PlayComponent,
    ProfileComponent,
    UpdateProfileComponent,
    TopButtonComponent,
    NewloginComponent,
    SearchComponent,
    GoogleloginComponent,
    FacebookloginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
   
  ],
  providers: [{

    provide: HTTP_INTERCEPTORS,
  
    useClass: HttpInterceptorBasicAuthService,
  
    multi: true,
    
  
  },
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '460566595303-cnb1b0e232tfl16u3tlq1jpsp2jds4pa.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('331672496470498')
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }
],
  
  bootstrap: [AppComponent]
})
export class AppModule { 

}


