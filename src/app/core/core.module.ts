import { NgModule } from '@angular/core';
import { FakeApiInterceptor } from './interceptors/helpers/fake-api.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ApiService } from './services/api.service';
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: FakeApiInterceptor, multi: true },
    ApiService]
})
export class CoreModule { }
