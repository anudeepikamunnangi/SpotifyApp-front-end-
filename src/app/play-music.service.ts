import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Track } from 'src/app/model/Track';
import { PlayComponent } from './play/play.component';
@Injectable({
  providedIn: 'root'
})
export class PlayMusicService {

  constructor(private dialog: MatDialog) {}

  openPlayDialog(tracks: Track): void {
    this.dialog.open(PlayComponent, {
      data: { track:tracks },
      //  width: '40%', // Adjust the width as needed
      // height: '50%'
    });
  }
}