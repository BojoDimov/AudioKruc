export interface YoutubeResponse<T> {
  etag: string,
  nextPageToken: string,
  prevPageToken: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  items: T[];
}

export enum YoutubeThumbnailType {
  // playlist item, search result: 120x90
  // channel: 88x88
  DEFAULT = "default",

  // playlist item, search result: 320x180
  // channel: 240x240
  MEDIUM = "medium",

  // playlist item, search result: 480x360
  // channel: 800x800
  HIGH = "high",

  // playlist item, search result: 640x480
  STANDARD = "standard",

  // playlist item, search result: 1280x720
  MAXRES = "maxres"
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YoutubePlaylist {
  id: string;
  etag: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      [YoutubeThumbnailType.DEFAULT]: Thumbnail;
      [YoutubeThumbnailType.STANDARD]: Thumbnail;
      [YoutubeThumbnailType.MEDIUM]: Thumbnail;
      [YoutubeThumbnailType.HIGH]: Thumbnail;
      [YoutubeThumbnailType.MAXRES]: Thumbnail;
    },
    tags: string[];
  }
}