export type AlbumResponse = {
    album_type:             string;
    total_tracks:           number;
    is_playable:            boolean;
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           Date;
    release_date_precision: string;
    type:                   string;
    uri:                    string;
    artists:                Artist[];
    tracks:                 Tracks;
    copyrights:             Copyright[];
    external_ids:           ExternalIDS;
    genres:                 any[];
    label:                  string;
    popularity:             number;
}

export type Artist = {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    name:          string;
    type:          string;
    uri:           string;
}

export type ExternalUrls = {
    spotify: string;
}



export type Copyright = {
    text: string;
    type: string;
}

export type ExternalIDS = {
    upc: string;
}

export type Image = {
    url:    string;
    height: number;
    width:  number;
}

export type Tracks = {
    href:     string;
    limit:    number;
    next:     null;
    offset:   number;
    previous: null;
    total:    number;
    items:    TracksItem[];
}

export type TracksItem = {
    artists:       Artist[];
    disc_number:   number;
    duration_ms:   number;
    explicit:      boolean;
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    is_playable:   boolean;
    name:          string;
    preview_url:   string | null;
    track_number:  number;
    type:          "track";
    uri:           string;
    is_local:      boolean;
}

// Tipos para resultados de búsqueda
export type SearchResults = {
    albums: AlbumResponse[];
    artists: Artist[];
    tracks: TracksItem[];
}

// Tipo para artista completo (con más información)
export type ArtistFull = {
    external_urls: ExternalUrls;
    followers: {
        href: string | null;
        total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}