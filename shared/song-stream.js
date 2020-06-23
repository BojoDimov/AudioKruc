import { Writable } from 'stream';
import WebmByteStream from 'webm-byte-stream';

export class SongStream extends Writable {
  INITIALIZATION_SEGMENT = 'Initialization Segment';
  MEDIA_SEGMENT = 'Media Segment';

  webmStream = null;
  initializationSegment = null;

  dataCallbacks = [];
  endCallbacks = [];

  constructor() {
    super();
    this.webmStream = new WebmByteStream();
    this.webmStream.on(this.INITIALIZATION_SEGMENT, data => {
      this.initializationSegment = data;
      this.dataCallbacks.forEach(cb => cb(data));
    });
    this.webmStream.on(this.MEDIA_SEGMENT, data => {
      this.dataCallbacks.forEach(cb => cb(data.cluster));
    });
  }

  write(data) {
    this.webmStream.write(data);
  }

  _clean() {
    this.dataCallbacks = [];
    this.endCallbacks = [];
    this.webmStream.reset();
  }

  end() {
    console.log(`[song-stream]: Finished`);
    this.endCallbacks.forEach(cb => cb());
    this._clean();
  }

  stop() {
    console.log(`[song-stream]: Stopped`);
    this._clean();
  }

  on(event, callback) {
    if (event === SongStreamEvent.DATA) {
      this.dataCallbacks.push(callback);
    } else if (event === SongStreamEvent.SONG_END) {
      this.endCallbacks.push(callback);
    }
  }

  hasInitializationSegment() {
    return this.initializationSegment != null;
  }

  getInitializationSegment() {
    return this.initializationSegment;
  }
}

export const SongStreamEvent = {
  DATA: 'data',
  SONG_END: 'finish'
};