import { NgModule, inject } from '@angular/core';
import { RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { HomeComponent } from './navigation/home/home.component';
import { LoginComponent } from './login/login.component';
import { TodayTopHitsPlaylistComponent } from './spotify/today-top-hits-playlist/today-top-hits-playlist.component';
import { AuthGuard, LoginGuard } from './service/http/auth-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './service/users/profile/profile.component';
import { UpdateProfileComponent } from './service/users/update-profile/update-profile.component';
import { NewloginComponent } from './newlogin/newlogin.component';
import { SearchComponent } from './navigation/search/search.component';
import { FacebookloginComponent } from './facebooklogin/facebooklogin.component';
import { GoogleloginComponent } from './googlelogin/googlelogin.component';
// import { GoogleloginComponent } from './googlelogin/googlelogin.component';
// import { FacebookloginComponent } from './facebooklogin/facebooklogin.component';



const routes: Routes = [
   { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent,},
  { path: 'search', component: SearchComponent,},
  { path: 'top-hits-playlist', component: TodayTopHitsPlaylistComponent },
  { path: 'favorites', component: FavoriteListComponent ,canActivate:[AuthGuard]},
  { path: 'logout', component: LogoutComponent},
  { path: 'login', component: LoginComponent , canActivate: [LoginGuard] },
  { path: 'profile', component: ProfileComponent , canActivate:[AuthGuard]},
  { path: 'update-profile', component: UpdateProfileComponent ,canActivate:[AuthGuard]},
  { path: 'welcome', component: NewloginComponent ,},
  { path: 'google-signin', component: GoogleloginComponent ,},
  { path: 'facebook-signin', component: FacebookloginComponent ,}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }