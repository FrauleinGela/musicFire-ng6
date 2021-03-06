import { NgModule } from '@angular/core';
import { MusicListComponent } from './pages/music-list/music-list.component';
import { MusicDetailComponent } from './pages/music-detail/music-detail.component';
import { MusicRoutingModule } from './music-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MusicData } from './pages/music-data.service';
@NgModule({
  imports: [
    SharedModule,
    MusicRoutingModule
  ],
  declarations: [
    MusicDetailComponent,
    MusicListComponent
  ],
  providers: [MusicData]
})
export class MusicModule { }
