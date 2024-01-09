import { Component, OnInit } from '@angular/core';
import { Track } from 'src/app/model/Track';
import { UserProfile } from 'src/app/model/UserProfile';
import { Wishlist } from 'src/app/model/Wishlist';
import { AuthenticationService } from 'src/app/service/data/authentication.service';
import { UserProfileDataService } from 'src/app/service/data/user-profile-data.service';
import { WishlistDataService } from 'src/app/service/data/wishlist-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile!: UserProfile;
  tracks!: Track[]

  constructor(private authService: AuthenticationService ,private userProfileService: UserProfileDataService, private wishlistService: WishlistDataService) {}

  ngOnInit(): void {
    this.getUserProfile()
    this.getWishlist()
    this.verifyToken();
  }

  verifyToken(){
    const token = localStorage.getItem('token')+'';
    this.authService.validateToken(token).subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (e) => {console.error(e); localStorage.removeItem('token'), localStorage.removeItem('authenticatedUser')},
      complete: () => console.info('complete')
    });
  }

  getUserProfile(){
    this.userProfileService.getUserById().subscribe({
      next: (v) => {
        this.userProfile = v;
      },
      error: (e) => {console.error(e)},
      complete: () => console.info('complete')
    });
  }

  getWishlist() {
    this.wishlistService.getUserWishList().subscribe({
      next: (v) => {
      this.tracks = v.tracks;
      
    },
    error: (e) => {console.error(e)},
    complete: () => console.log(this.tracks.length)
  });

}
}
