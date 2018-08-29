import { Component, OnInit, ViewChild } from '@angular/core';
import { Music, MusicService } from '../../../../core/';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['artistname', 'albumname', 'yearrelease', 'spotifylink'];
  dataSource: any;
  music: Music[] = [];
  loading = false;
  constructor(
    private musicService: MusicService,
    private router: Router) { }
  ngOnInit() {
    // TODO create a Loader Service to wait for the result.
    // TODO Fix sort table
    this.getMusic();
  }
  getMusic() {
    this.loading = true;
    this.musicService.get().subscribe((music) => {
      this.loading = false;
      this.music = music;
      this.setTableMaterial(music);
    }, (error) => {
      // TODO: Add error component
    });
  }
  getRecord(row) {
    this.router.navigate(['/music/detail'], { queryParams: { id: row.id } });
  }

  setTableMaterial(data) {
    this.dataSource = new MatTableDataSource<Music>(data);
    this.dataSource.sort = this.sort;
  }

}
