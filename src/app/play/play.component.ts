import { Component, Inject, OnInit } from '@angular/core';
import { Track } from '../model/Track';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {


    track!: Track;
    id!: string;
  
    constructor(
      @Inject(MAT_DIALOG_DATA) public data:{track: any},
      ) {}
  
    ngOnInit(): void {
      this.track = this.data.track
      // this.playSong(this.data.id);
    }
  
  }