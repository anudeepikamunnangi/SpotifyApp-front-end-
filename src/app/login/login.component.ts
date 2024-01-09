import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/data/authentication.service';
import { UserProfileDataService } from '../service/data/user-profile-data.service';
import { UserProfile } from '../model/UserProfile';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  isFlipped:boolean=false;
  toggleForm(){
    this.isFlipped=!this.isFlipped;
  }
  private searchSubscription!: Subscription;
passwordVisible:boolean = false;
  
  username: string = '';
  password: string = '';
  email: string = '';
  loginUsername: string = '';
  loginPassword: string = '';
  errorMessage!: string
  errorMessage2!: string
  successMessage!: string
  userProfile!: UserProfile;
  // isLogin :boolean = true;
  constructor(private router: Router, private authService: AuthenticationService, private userService: UserProfileDataService){
  }
  togglePasswordVisibility(): void    
  {
    this.passwordVisible=!this.passwordVisible;

  }

  signUp() {
    console.log('Sign up clicked');
    this.userService.register(this.username, this.password, this.email).subscribe({
      next: (v) => {this.userProfile=v, this.successMessage="Your Are Register";
    this.errorMessage2=''},
      error: (e) => {this.errorMessage2 = "User ALready Exists", this.successMessage=''},
      complete: () => console.info('complete') 
    })
  
  }

  login() {
    
    this.authService.authenticate(this.loginUsername, this.loginPassword).subscribe({
      next: (v) => {localStorage.setItem('token',v.jwt_token);
      this.router.navigate(['/home']);
    },
      error: (e) => this.errorMessage = 'Authentication failed. Please check your credentials.',
      complete: () => console.info('complete') 
  }
  );
    
  }
  signInGoogle(){
    this.router.navigate(['/google-signin']);
  }

  signInFacebook(){
    this.router.navigate(['/facebook-signin']);
  }
 
}
