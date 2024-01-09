import { Album } from './Album';
import { Artist } from './Artist';
import { ExternalUrls } from './ExternalUrls';

export class Track{
    album!: Album;
    artists!: Artist[];
    external_urls!: ExternalUrls;
    id!: string;
    name!: string;
    preview_url!: string;
    type!: string;
    // duration_ms!: number;
    /*
    constructor(
        public album: Album,
        public artists: Artist[],
        public ExternalUrls: ExternalUrls,
        public id: string,
        public name: string,
        public previewUrl: string,
        public type: string
    ) {}
    */
}