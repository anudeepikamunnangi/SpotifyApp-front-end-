import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { SpotifyPlaylist } from '../model/SpotifyPlaylist';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../service/data/music-data.service';
import { WishlistDataService } from '../service/data/wishlist-data.service';
import { Item } from '../model/Item';
import { Track } from '../model/Track';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements AfterViewInit {


  tracks!: Track[]; // Adjust the type accordingly
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['position', 'image', 'name', 'artist', 'play', 'action'];


  constructor(private route: ActivatedRoute,
    private musicService: MusicDataService,
    private wishList: WishlistDataService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    this.wishlists();

  }


  wishlists() {
    this.wishList.getUserWishList().subscribe({
      next: (v) => {
        this.tracks = v.tracks;
        console.log(v.tracks[0].name)
        this.afterDataLoaded();
        this.cdr.detectChanges();
      },
      error: (e) => console.error(e),
      complete: () => {console.info('complete'), this.dataSource = new MatTableDataSource(this.tracks);
      // this.dataSource.paginator = this.paginator;
    }
    });
  }

  afterDataLoaded() {
    console.log(this.dataSource);
  }

  deleteTrackToWishList(id: string) {

    this.wishList.deleteTrackByUsernameAndTrackId(id).subscribe({
      next: (a) => {
        console.log(a.username)
      },
      error: (e) => console.error(e),
      complete: () => {console.info('track deleted'); this.wishlists();
      }
    });


  }

  favoriteIsExists(trackId: string) {
    this.wishList.favoriteExists(trackId).subscribe({
      next: (a) => {
        return a;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }


  onPageChange(event: any): void {
    // Handle page changes if needed
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const length = event.length;

    // You can perform actions based on the page change, for example, fetching new data
    this.wishlists();
  }
  playTrack(track: Track) {
    // Implement your play track logic here
    const link = track.external_urls.spotify;
    window.open(link, '_blank');
  }
}
