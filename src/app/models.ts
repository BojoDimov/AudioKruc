export class YoutubePlaylist {
  id: string;
  snippet: {
    title: string,
    description: string,
    publishedAt: Date,
    thumbnails: {
      default: Thumbnail
    }
  };
  contentDetails: {
    itemCount: number
  }
}

export class YoutubePlaylistItem {
  id: string;
  snippet: {
    title: string,
    description: string,
    thumbnails: {
      default: Thumbnail
    },
    resourceId: {
      videoId: string,
    }
  };
}

export class YoutubeSearchResult {
  kind: "youtube#searchListResponse";
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeSearchItem[];
}

export class YoutubeSearchItem {
  id: {
    kind: string,
    videoId: string,
    channelId: string,
    playlistId: string
  };
  snippet: {
    title: string,
    description: string,
    publishedAt: Date,
    channelId: string,
    thumbnails: ThumbnailCollection;
  }
}

export class ThumbnailCollection {
  // 120  x 90 - video
  // 88   x 88 - channel 
  default: Thumbnail;

  // 320 x 180 - video
  // 240 x 240 - channel 
  medium: Thumbnail;

  // 480 x 360 - video 
  // 800 x 800 - channel
  high: Thumbnail;

  // 640 x 480 - video
  standard: Thumbnail;

  // 1280 x 720 - video
  maxres: Thumbnail;
}

export class Thumbnail {
  url: string
  width: number
  height: number
}