import ytdl from 'ytdl-core';
import * as Rxjs from '@esm-bundle/rxjs';
import * as RxjsOperator from '@esm-bundle/rxjs/operators';
import moment from 'moment';

export default class SongStream {
  constructor(songMetadata, cb) {
    this.init(songMetadata, cb)
  }

  async init(songMetadata, cb) {
    let stream = ytdl.downloadFromInfo(songMetadata.info, songMetadata.options);

    let segmentBuffer = new SongSegmentBuffer(20, 10, songMetadata.format);
    segmentBuffer.subscribe(data => cb('song-data', data));
    stream.on('data', (chunk) => segmentBuffer.next(chunk));
    stream.on('end', () => segmentBuffer.flush());
  }
}


class SongSegmentBuffer {
  chunks = [];
  currentBufferSize = 0;

  isFirstSegment = true;
  firstSegmentDuration = 0;
  nextSegmentDuration = 0;

  emitter = null;
  segments = [];
  segmentSize = 0;
  currentSegment = 0;
  segmentCreated$ = new Rxjs.ReplaySubject(1);
  flushed = false;

  constructor(firstSegmentDuration, nextSegmentDuration, format) {
    this.format = format;
    this.firstSegmentDuration = firstSegmentDuration;
    this.nextSegmentDuration = nextSegmentDuration;
    this.segmentSize = this.getSegmentSize();

    this.emitter = Rxjs.concat(
      this.segmentCreated$.pipe(
        RxjsOperator.take(1)
      ),
      Rxjs.timer(0, this.nextSegmentDuration * 1000).pipe(
        RxjsOperator.tap(_ => console.log(`${moment().format('HH:mm:ss:SSS')} [timer]: tick`))
      )
    ).pipe(
      RxjsOperator.takeWhile(_ => !this.flushed || this.currentSegment < this.segments.length),
      RxjsOperator.filter(_ => this.currentSegment < this.segments.length),
      RxjsOperator.map(_ => this.segments[this.currentSegment++])
    );
  }

  next(chunk) {
    this.chunks.push(chunk);
    this.currentBufferSize += chunk.length;

    if (this.currentBufferSize > this.segmentSize) {
      this.segments.push(Buffer.concat(this.chunks));
      this.segmentCreated$.next();
      this.chunks = [];
      this.currentBufferSize = 0;
      this.segmentSize = this.getSegmentSize();
    }
  }

  subscribe(callback) {
    return this.emitter.subscribe(callback, null, _ => {
      console.log(`${moment().format('HH:mm:ss:SSS')} [emitter]: flush`);
      this.segments = [];
    });
  }

  flush() {
    this.segments.push(Buffer.concat(this.chunks));
    this.segmentCreated$.next();
    this.chunks = [];
    this.flushed = true;
  }

  getSegmentSize() {
    if (this.isFirstSegment) {
      this.isFirstSegment = false;
      return this.firstSegmentDuration * this.format.bitrate / 8;
    }
    else {
      return this.nextSegmentDuration * this.format.bitrate / 8;
    }
  }
}