
import { GoogleLoginProvider,SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';

@Component({
  selector: 'app-googlelogin',
  templateUrl: './googlelogin.component.html',
  styleUrls: ['./googlelogin.component.css']
})
export class GoogleloginComponent {
  title = 'angular-google';
  user:any;
  loggedIn:any;
  constructor(private authService: SocialAuthService) { }

  ngOnInit() {
   this.signInWith();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user)
    });
  }
  signInWith():void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
