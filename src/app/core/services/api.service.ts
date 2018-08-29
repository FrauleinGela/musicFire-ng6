import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
/**
 * Manager of requests
 */
@Injectable()
export class ApiService {
    constructor(private http: HttpClient) { }
    // TODO: Add type attribute to parameters
    get(path, params: any): Observable<any> {
        return this.http.get(`api/${path}`, params);
    }
    post(path, body: Object = {}): Observable<any> {
        return this.http.post(`api/${path}`, body);
    }
    put(path, body: Object = {}): Observable<any> {
        return this.http.put(`api/${path}`, body);
    }
    // TODO: Add type attribute to parameters
    delete(path): Observable<any> {
        return this.http.delete(`api/${path}`);
    }

}
