import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { UserProfileDataService } from '../service/data/user-profile-data.service';
import { AuthenticationService } from '../service/data/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facebooklogin',
  templateUrl: './facebooklogin.component.html',
  styleUrls: ['./facebooklogin.component.css']
})
export class FacebookloginComponent implements OnInit {

  title = 'angular-facebook';
  errorMessage!: string;

  constructor(private authService: SocialAuthService, private router: Router, private authService1: AuthenticationService, private userService: UserProfileDataService) { }

  user: any;
  loggedIn: any;

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    console.log(this.user);
      // Check if user is defined before attempting to use its properties
      if (user) {
        this.authService1.authenticate(user.firstName, user.email).subscribe({
          next: (v) => {
            console.log("testig with redirect");
            localStorage.setItem('token', user.authToken);
            console.log("testig with redirect");
            this.router.navigate(['/home']);
            
          },
          error: (e) => {
            console.log(e);
            this.errorMessage = 'Authentication failed. Please check your credentials.'},
          complete: () => console.info('complete')
        });
      }
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}