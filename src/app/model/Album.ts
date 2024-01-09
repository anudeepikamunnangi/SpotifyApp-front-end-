import { ExternalUrls } from "./ExternalUrls";
import { Artist } from "./Artist";
import { Image } from "./Image";

export class Album{
    albumType!: string;
    artists!: Artist[];
    externalUrls!: ExternalUrls;
    images!: Image[];
    id!: string;
    name!: string;
    releaseDate!: string;
    type!: string;
    /*
    constructor(
        public albumType: string,
        public artists: Artist[],
        public externalUrls: ExternalUrls,
        public images: Image[],
        public id: string,
        public name: string,
        public releaseDate: string,
        public type: string
    ) {}
    */
}