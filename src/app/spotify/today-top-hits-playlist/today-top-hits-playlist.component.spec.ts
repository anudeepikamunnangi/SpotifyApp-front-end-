import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayTopHitsPlaylistComponent } from './today-top-hits-playlist.component';

describe('TodayTopHitsPlaylistComponent', () => {
  let component: TodayTopHitsPlaylistComponent;
  let fixture: ComponentFixture<TodayTopHitsPlaylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodayTopHitsPlaylistComponent]
    });
    fixture = TestBed.createComponent(TodayTopHitsPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




  