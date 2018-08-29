import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Music } from '../../models/music.model';
/**
 * Fake API
 * File to be removed if server api exists
 * 
 */
@Injectable()
export class FakeApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const musicData: Music[] = JSON.parse(localStorage.getItem('music')) || [];
        // Simulate server api 
        // The default fake api route is api/
        return of(null).pipe(mergeMap(() => {
            console.log('pii')
            if (req.url.indexOf('/api/')) {
                if (req.url.substr(-'music'.length) === 'music' && req.method === 'GET') {
                    if (req.params.has('id')) {
                        const musicSelected = musicData.find((music) => {
                            return music.id === req.params.get('id')['id'];
                        });
                        if (!musicSelected) {
                            throw ({ error: { message: 'The music can not be found' } });
                        }
                        return of(new HttpResponse({ status: 200, body: musicSelected }));
                    }
                    return of(new HttpResponse({ status: 200, body: musicData }));
                }
                if (req.url.substr(-'music'.length) === 'music' && req.method === 'POST') {
                    const newMusic = Object.assign({ id: uuid() }, req.body);
                    musicData.push(newMusic);
                    localStorage.setItem('music', JSON.stringify(musicData));
                    return of(new HttpResponse({ status: 200, body: newMusic }));
                }
                if (req.url.match(/\/music\/\d+$/) && req.method === 'DELETE') {
                    const splitUrl = req.url.split('/');
                    const deleteId = splitUrl[splitUrl.length - 1];
                    const foundMusic = musicData.some((music, index) => {
                        if (music.id === deleteId) {
                            musicData.slice(index + 1);
                            localStorage.setItem('music', JSON.stringify(musicData));
                            return true;
                        }
                    });
                    if (!foundMusic) {
                        throw ({ error: { message: 'The music can not be deleted, it was not found' } });
                    }
                    return of(new HttpResponse({ status: 200, body: musicData }));
                }
                if (req.url.match(/\/music/) && req.method === 'PUT') {
                    const updateMusic = req.body;
                    const foundPost = musicData.some((music, index) => {
                        if (music.id === updateMusic.id) {
                            musicData[index] = updateMusic;
                            localStorage.setItem('music', JSON.stringify(musicData));
                            return true;
                        }
                    });
                    if (!foundPost) {
                        throw ({ error: { message: 'The music can not be updated, it was not found' } });
                    }
                    return of(new HttpResponse({ status: 200, body: updateMusic }));

                }
            }
            // other request that have not been handled
            return next.handle(req);
        })).pipe(materialize())
            .pipe(delay(300)) // simulate a request
            .pipe(dematerialize());
    }
}



