import { MusicDetailComponent } from './pages/music-detail/music-detail.component';
import { MusicListComponent } from './pages/music-list/music-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: MusicListComponent
  }, {
    path: 'detail',
    component: MusicDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MusicRoutingModule { }

