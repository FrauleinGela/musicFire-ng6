import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Music } from '../models/music.model';
@Injectable()
export class MusicService {
    constructor(private apiService: ApiService) { }

    get(id?: string): Observable<any> {
        let params = new HttpParams();
        if (id) {
            params = params.set('id', id);
        }
        return this.apiService.get('music', { params: params });
    }

    save(music: Music): Observable<Music> {
        if (music.id) {
            return this.apiService.put('music', music);
        }
        return this.apiService.post('music', music);
    }

    update(music: Music): Observable<Music> {
        return this.apiService.put('music', music);
    }

    delete(music: Music): Observable<Music[]> {
        return this.apiService.delete('music/' + music.id);
    }

}
