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
    id:            ID;
    name:          Name;
    type:          "artist";
    uri:           URI;
}

export type ExternalUrls = {
    spotify: string;
}

export type ID = "0vwWVUYVbaF0LPMlQkWjAM" | "4wLXwxDeWQ8mtUIRPxGiD6";

export type Name = "Powerful Donald" | "Marc Anthony";

export type URI = "spotify:artist:0vwWVUYVbaF0LPMlQkWjAM" | "spotify:artist:4wLXwxDeWQ8mtUIRPxGiD6";

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
    preview_url:   null;
    track_number:  number;
    type:          "track";
    uri:           string;
    is_local:      boolean;
}