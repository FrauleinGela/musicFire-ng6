import { NgModule } from '@angular/core';
import { FakeApiInterceptor } from './interceptors/helpers/fake-api.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ApiService, MusicService } from './services';
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: FakeApiInterceptor, multi: true },
    ApiService,
    MusicService]
})
export class CoreModule { }
