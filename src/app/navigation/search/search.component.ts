
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { heartAnimation } from 'src/app/app-parsers/animation-trigger';
import { SpotifyTracks } from 'src/app/model/SpotifyTracks';
import { Track } from 'src/app/model/Track';
import { PlayMusicService } from 'src/app/play-music.service';
import { AuthenticationService } from 'src/app/service/data/authentication.service';
import { MusicDataService } from 'src/app/service/data/music-data.service';
import { WishlistDataService } from 'src/app/service/data/wishlist-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heartAnimation]
})
export class SearchComponent implements AfterViewInit{

  playlistId!: string;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];
  trackIds: String[] = [];
  heartStates: { [key: string]: string } = {};
  tracks!: Track[];
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['position', 'image', 'name', 'artist', 'play', 'action'];


  spotifyTracks!: SpotifyTracks; // Adjust the type accordingly
  searchQuery: string = '';
  query=''
  isPopupVisible = true;
  constructor(
    private route: ActivatedRoute, 
    private musicService: MusicDataService,
    private wishList: WishlistDataService,
    private cdr: ChangeDetectorRef,
    private playMusicService: PlayMusicService,
    private router: Router,
    private authenticationService:AuthenticationService
    ) { }

    openPlayDialog(trackId: Track): void {
      this.playMusicService.openPlayDialog(trackId);
    }

  ngAfterViewInit(): void {
    this.checkAuthenticationStatus(),
    this.route.queryParams.subscribe(params=>{
      this.query=params['query'];
      this.searchTracks(this.query);
      console.log(this.query);
      
    })
    // this.route.queryParamMap.subscribe((params)=>{
    //   this.query=params.get('query');
    //   this.searchTracks(this.query);
    // })
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
    if (!this.trackIds.includes(trackId)){
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
  searchTracks(query: string) {
    // this.musicService.setLimit(50);
    this.musicService.searchTracks(query).subscribe({
      next: (v) => {
        this.spotifyTracks = v;
        this.dataSource = new MatTableDataSource(this.spotifyTracks.tracks.items);
        this.cdr.detectChanges();
      },
      error: (e) => console.error(e),
      complete: () => {console.info('complete'),
      this.dataSource = new MatTableDataSource(this.spotifyTracks.tracks.items);
      // this.dataSource.paginator = this.paginator;
    }
    });
  }

  deleteTrackToWishList(id: string) {

    this.wishList.deleteTrackByUsernameAndTrackId(id).subscribe({
      next: (a) => {
      },
      error: (e) => console.error(e),
      complete: () => {console.info('complete');this.wishlists(); }
    });
  }
  wishlists() {
    this.wishList.getUserWishList().subscribe({
      next: (v) => {
        this.tracks = v.tracks;
        console.log(v.tracks[0].name)
        // this.afterDataLoaded();
        this.cdr.detectChanges();
      },
      error: (e) => console.error(e),
      complete: () => {console.info('complete'), this.dataSource = new MatTableDataSource(this.tracks);
      // this.dataSource.paginator = this.paginator;
    }
    });
  }
  // deleteTrackToWishList(id: string) {

  //   this.wishList.deleteTrackByUsernameAndTrackId(id).subscribe({
  //     next: (a) => {
  //       console.log(a.username)
  //     },
  //     error: (e) => console.error(e),
  //     complete: () => {console.info('track deleted'); this.wishlists();
  //     }
  //   });


  // }



  wishListTracks(){
    this.wishList.getUserWishList().subscribe({
      next: (a) => {
        a.tracks.forEach(track => this.trackIds.push(track.id))
      },
      error: (e) => console.error(e),
      complete: () => console.log('tracks added to wishlist')
    })
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
        this.dataSource = new MatTableDataSource(this.spotifyTracks.tracks.items);
        // this.dataSource.paginator = this.paginator;
        console.log(v.name)
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
  playTrack(track: Track) {
    const link = track.external_urls.spotify
    // Implement your play track logic here
    window.open(link, '_blank');
  }
}

