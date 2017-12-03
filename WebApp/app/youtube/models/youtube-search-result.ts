import { SearchItem } from '../youtube-search.barrel';

export class YouTubeSearchResult {
  items: Array<SearchItem>;
  etag: string;
  pageInfo: {
    resultsPerPage: number,
    totalResults: number
  };
}