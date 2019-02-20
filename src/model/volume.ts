

/** PUT IN A volume.d.ts */
export interface VolumeInfo {
    id?: string;
    allowAnonLogging?: boolean;
    authors?: Array<string>;
    averageRating?: number;
    canonicalVolumeLink?: string;
    categories?: Array<string>;
    comicsContent?: boolean;
    contentVersion?: string;
    description?: string;
    imageLinks?: {
        smallThumbnail?: string;
        thumbnail?: string;
    };
    industryIdentifiers?: Array<any>;
    infoLink?: string;
    language?: string;
    maturityRating?: string;
    pageCount?: number;
    previewLink?: string;
    printType?: string;
    publishedDate?: string;
    publisher?: string;
    ratingsCount?: number;
    readingModes?: { text: boolean; image: boolean };
    subtitle?: string;
    title?: string;
}