import { ExternalUrls } from "./ExternalUrls";
import { Image } from "./Image";
import { Tracks } from "./Tracks";

export class SpotifyPlaylist{

    description!: string;
    external_urls: ExternalUrls | undefined;
    id!: string;
    images!: Image[];
    name!: string;
    tracks!: Tracks
    /*
    constructor (
    public description: string,
    public externalUrls: ExternalUrls,
    public id: string,
    public images: Image[],
    public name: string,
    public tracks: Tracks
    ) {
    } 
    */
}