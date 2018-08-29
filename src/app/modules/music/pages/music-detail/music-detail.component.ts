import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Music, MusicService } from '../../../../core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidator } from '../../../../shared';
import { MusicData } from '../music-data.service';


import { first } from 'rxjs/operators';
@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.scss']
})
export class MusicDetailComponent implements OnInit {

  create = true; // new music
  loading = false;
  musicFormGroup: FormGroup;
  music = new MusicData();
  errorDisplay: ''; // TODO: Create error alert component (global)
  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
    private router: Router,
    private fb: FormBuilder,
    private customValidator: CustomValidator
  ) { }

  ngOnInit() {
    const musicId = this.route.snapshot.queryParamMap.get('id');
    if (musicId) {
      this.create = !this.create;
      this.getMusic({ id: musicId });
    } else {
      this.buildMusicForm();
    }
  }

  buildMusicForm() {
    // TODO: Add list of music gnres
    this.musicFormGroup = this.fb.group({
      artistName: [this.music.artistName, Validators.required],
      albumName: [this.music.albumName, Validators.required],
      yearRelease: [this.music.yearRelease, Validators.required],
      spotifyLink: [this.music.spotifyLink, [Validators.required, this.customValidator.validateLink]]
    });
  }
  // easy access to form fields
  get pControls() {
    if (this.musicFormGroup) {
      return this.musicFormGroup.controls;
    }
  }

  getMusic(params) {
    this.musicService.get(params).subscribe((music) => {
      this.music = music;
      this.buildMusicForm();
    }, (error) => {
      this.errorDisplay = error.error.message;
      console.log( error.error.message);
    });
  }
  submitMusic() {
    if (this.musicFormGroup.valid) {
      if (this.music.id.length > 0) {
        this.updateMusic();
      } else {
        this.saveMusic();
      }
    }
  }
  saveMusic() {
    const music = Object.assign({}, this.musicFormGroup.value);
    this.loading = true;
    this.musicService.save(music)
      .pipe(first())
      .subscribe(
        data => this.router.navigate(['music']),
        error => this.errorDisplay = error.error.message
      );
  }

  updateMusic() {
    const music = Object.assign({ id: this.music.id }, this.musicFormGroup.value);
    this.musicService.update(music)
      .pipe(first())
      .subscribe(
        data => this.router.navigate(['music']),
        error => this.errorDisplay = error.error.message
      );
  }

  cancel() {
    this.router.navigate(['/music']);
  }


}
