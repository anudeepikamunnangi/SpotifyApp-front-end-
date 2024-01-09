import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/model/Item';
import { SpotifyPlaylist } from 'src/app/model/SpotifyPlaylist';
import { MusicDataService } from 'src/app/service/data/music-data.service';
import { WishlistDataService } from 'src/app/service/data/wishlist-data.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Track } from 'src/app/model/Track';
import { PlayMusicService } from 'src/app/play-music.service';
import { heartAnimation } from 'src/app/app-parsers/animation-trigger';
import { AuthenticationService } from 'src/app/service/data/authentication.service';


@Component({
  selector: 'app-today-top-hits-playlist',
  templateUrl: './today-top-hits-playlist.component.html',
  styleUrls: ['./today-top-hits-playlist.component.css'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heartAnimation]
})



export class TodayTopHitsPlaylistComponent implements AfterViewInit {


  spotifyPlaylist!: SpotifyPlaylist; // Adjust the type accordingly

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['position', 'image', 'name', 'artist', 'play', 'action'];
  
 
  isExists: boolean = false;

  isSmallScreen = true;
  heartStates: { [key: string]: string } = {};
  trackIds: String[] = [];
  isPopupVisible = true;
ngOnInit() {
  this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small])
    .subscribe(result => {
      this.isSmallScreen = result.matches;
    });
}

  
  constructor(private route: ActivatedRoute, 
    private musicService: MusicDataService,
    private wishList: WishlistDataService,
    private cdr: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    private playMusicService: PlayMusicService,
    private router:Router,
    private authenticationService:AuthenticationService) 
    { }

    openPlayDialog(trackId: Track): void {
      this.playMusicService.openPlayDialog(trackId);
    }

  ngAfterViewInit(): void {
    this.todayTopHitsPlaylist();
    // this.favoriteIsExists("4KULAymBBJcPRpk1yO4dOG"),
     this.checkAuthenticationStatus()
    // setTimeout(() => {
    //   this.afterDataLoaded();
    // }, 1000);
  }
  checkAuthenticationStatus():void{
    const isAuthenticated=this.authenticationService.isUserLoggedIn();
    this.isPopupVisible=!isAuthenticated;

  }
  handleSingnup():void{
    
    this.checkAuthenticationStatus();
    }
    goToLoginPage():void{
      this.router.navigate(['/login']);
    }

  toggleHeartState(trackId: string): void {
    const isAuthenticated = localStorage.getItem('authenticatedUser');
    if(!isAuthenticated){
      this.router.navigate(['/login']);
      return;
    }
    if (!this.trackIds.includes(trackId)) {
      if (this.heartStates[trackId] === 'active') {
        this.heartStates[trackId as any] = 'inactive';
      } else {
        this.heartStates[trackId as any] = 'active'
      }
      this.saveTrackToWishList(trackId);
    } else {
      if (this.heartStates[trackId] === 'inactive') {
        this.heartStates[trackId as any] = 'active';
      } else {
        this.heartStates[trackId as any] = 'inactive'
      }
      this.deleteTrackToWishList(trackId);
    }

  }

  getHeartState(trackId: string): string {
    if (this.trackIds.includes(trackId)) {
      return this.heartStates[trackId] || 'active';
    } else {
      return this.heartStates[trackId] || 'inactive';
    }
  }

  todayTopHitsPlaylist() {
    this.musicService.getTodayTopHitsPlaylist().subscribe({
      next: (v) => {
        this.spotifyPlaylist = v;
        console.log(v.tracks.items[0].added_at)
        this.cdr.detectChanges();
      },
      error: (e) => {console.error('e')},
      complete: () => {console.info('complete'),
      this.dataSource = new MatTableDataSource(this.spotifyPlaylist.tracks.items);
      this.dataSource.paginator = this.paginator;
    }
    });
  }

 

  saveTrackToWishList(id: string){

    this.musicService.getTrack(id).subscribe({
      next: (v) => {
        this.wishList.saveTrackToWishlist(v).subscribe({
          next: (a) => {
            console.log(a)
          },
          error: (e) => console.error(e),
          complete: () => console.info('complete')
        });;
        
        console.log(v.name)
      },
      error: (e) => console.error(e),
      complete: () => {console.info('complete'), this.dataSource = new MatTableDataSource(this.spotifyPlaylist.tracks.items);
      this.dataSource.paginator = this.paginator;
    }
    });
  }


  deleteTrackToWishList(id: string) {

    this.wishList.deleteTrackByUsernameAndTrackId(id).subscribe({
      next: (a) => {
        this.todayTopHitsPlaylist();
      },
      error: (e) => console.error(e),
      complete: () => {console.info('complete'); this.todayTopHitsPlaylist();}
    });


  }

  favoriteIsExists(trackId: string){
    this.wishList.favoriteExists(trackId).subscribe({
      next: (a) => {
        this.isExists =a;
        console.log(a);
        this.cdr.detectChanges();
      },
      error: (e) => console.error(e),
      complete: () => this.isExists
    })
    return this.isExists;
    
  }

  
}
