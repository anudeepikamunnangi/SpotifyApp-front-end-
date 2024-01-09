import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/data/authentication.service';

@Component({
  selector: 'app-newlogin',
  templateUrl: './newlogin.component.html',
  styleUrls: ['./newlogin.component.css']
})
export class NewloginComponent  {
  isPopupVisible=true;
  constructor(
    private router: Router,
    private authenticationService:AuthenticationService
    ) { }

  checkAuthenticationStatus():void{
    const isAuthenticated=this.authenticationService.isUserLoggedIn();
    this.isPopupVisible=!isAuthenticated;

  }
  handleSingnup():void{
    
    this.checkAuthenticationStatus();
    }
    goToLoginPage():void{
      this.router.navigate(['/home']);
    }


}