import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { heartAnimation } from 'src/app/app-parsers/animation-trigger';
import { SpotifyPlaylist } from 'src/app/model/SpotifyPlaylist';
import { SpotifyTracks } from 'src/app/model/SpotifyTracks';
import { Track } from 'src/app/model/Track';
import { PlayMusicService } from 'src/app/play-music.service';
import { AuthenticationService } from 'src/app/service/data/authentication.service';
import { MusicDataService } from 'src/app/service/data/music-data.service';
import { WishlistDataService } from 'src/app/service/data/wishlist-data.service';
import { TodayTopHitsPlaylistComponent } from 'src/app/spotify/today-top-hits-playlist/today-top-hits-playlist.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [heartAnimation]
})
export class HomeComponent implements OnInit {
  // const findSong=document.getElementById('search_input');
  spotifyPlaylist!: SpotifyPlaylist;
  getTop50GlobalSongs: SpotifyPlaylist | any;
  getTopTeluguSongs: SpotifyPlaylist | any;
  getAllHindiSongs: SpotifyPlaylist | any;
  getLoveSongs:SpotifyPlaylist | any;
  getTeluguLoveSongs: SpotifyPlaylist | any;
  getKoreanSongs: SpotifyPlaylist | any;
  @ViewChild('cardsContainer') cardsContainer!: ElementRef;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  username!: string;
  heartStates: { [key: string]: string } = {};
  trackIds: String[] = [];
  isPopupVisible = true;
  find:string='';
  isSidebarHidden=true;
  // spotifyTracks!: SpotifyTracks; // Adjust the type accordingly
  // searchQuery: string = '';
  // query=''
  constructor( private route: ActivatedRoute, private musicService: MusicDataService,private playMusicService: PlayMusicService, private wishList: WishlistDataService, private cdr: ChangeDetectorRef,private router: Router,private authenticationService:AuthenticationService) {}
  
  ngOnInit(): void {
    this.top50Global()
    this.topTelugu()
    this.topHindi()
    this.todayTopHitsPlaylist()
    this.loveSongs()
    this.teluguLoveSongs()
    this.koreanSongs()
    this.checkAuthenticationStatus(),
    this.username = localStorage.getItem('authenticatedUser')+'';
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
  // searchTracks(query: string) {
  //   this.musicService.searchTracks(query).subscribe({
  //     next: (v) => {
  //       this.spotifyTracks = v;
  //       this.dataSource = new MatTableDataSource(this.spotifyTracks.tracks.items);
  //       this.cdr.detectChanges();
  //     },
  //     error: (e) => console.error(e),
  //     complete: () => {console.info('complete'),
  //     this.dataSource = new MatTableDataSource(this.spotifyTracks.tracks.items);
  //     // this.dataSource.paginator = this.paginator;
  //   }
  //   });
  // }
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
      this.dataSource.paginator = this.paginator;}
    });
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
      this.dataSource.paginator = this.paginator;}
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
  top50Global(){
    this.musicService.getTop50GlobalSongs().subscribe(
      {
        next: (v) => {this.getTop50GlobalSongs=v
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    }
    )
  }
  topTelugu(){
    this.musicService.getTopTeluguSongs().subscribe(
      {
        next: (v) => {this.getTopTeluguSongs=v
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    }
    )
  }
  koreanSongs(){
    this.musicService.getKoreanSongs().subscribe(
      {
        next: (v) => {this.getKoreanSongs=v
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    }
    )
  }
  loveSongs(){
    this.musicService.getLoveSongs().subscribe(
      {
        next: (v) => {this.getLoveSongs=v
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    }
    )
  }
  teluguLoveSongs(){
    this.musicService.getTeluguLoveSongs().subscribe(
      {
        next: (v) => {this.getTeluguLoveSongs=v
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    }
    )
  }
  topHindi(){
    this.musicService.getAllHindiSongs().subscribe(
      { 
        next: (v) => {this.getAllHindiSongs=v
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    }
    )
  }
  scrollCards(direction: 'left' | 'right',containerId:string): void {
    const container = document.getElementById(containerId);
    if(container){const scrollAmount = 300;
  
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  }
}


  audioEnded(event: Event) {
    // Handle any logic when the audio playback ends
    console.log('Audio ended');
  }
  openPlayDialog(trackId: Track): void {
    this.playMusicService.openPlayDialog(trackId);
    console.log(trackId);
  }
  playTrack(preview_url:string):void{
    console.log('play track clicked', preview_url);
    const audio = this.audioPlayer.nativeElement as HTMLAudioElement;
    audio.pause();
    audio.src=preview_url;
    audio.play();

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
  search(query:string):void{
  
    // const findSong=document.getElementById("findSong");
   
    this.router.navigate(['/search'],{queryParams:{query:this.find}});
    console.log(this.find);
  }
  // openNav() {
  //   const navMenu = document.getElementById('mySidebar');
  //   if (navMenu) {
  //     // Toggle the width of the sidebar
  //     navMenu.style.width = navMenu.style.width === '250px' ? '0' : '250px';
  //   }
  // }
openNav(): void {
    // const sidebar = document.getElementById('mySidebar');
    // if (sidebar) {
    //   sidebar.classList.toggle('sidebar-closed');
    // }
    this.isSidebarHidden=!this.isSidebarHidden;
  }


}

  
  

