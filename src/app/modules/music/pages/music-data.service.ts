import { Music } from '../../../core';

export class MusicData implements Music {
    id = '';
    artistName = '';
    albumName = '';
    yearRelease = 0;
    spotifyLink = '';
    constructor() { }
}
