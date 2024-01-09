import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { LogoutComponent } from 'src/app/logout/logout.component';
import { Router, Routes } from '@angular/router';
import { UserProfile } from 'src/app/model/UserProfile';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})


export class SideBarComponent {
  username:string | null=null;

  
  constructor(private router:Router){}
  ngOnInit(): void {
  this.username= localStorage.getItem('authenticatedUser');
 
  }
 
  openNav(): void {
    const sidebar = document.getElementById('mySidebar');
    
    if (sidebar) {
      console.log('clicked ');
      sidebar.style.width = '500px'; // Set the desired width
    }
  }
}
