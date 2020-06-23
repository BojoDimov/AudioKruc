import { Observable, Subscription } from 'rxjs';

export class MseWrapper {
  private mediaSource: MediaSource;
  private mediaSourceBuffer: SourceBuffer;

  private mimeType: string;
  private bufferSubscription: Subscription;
  private internalBuffer: ArrayBuffer | null = null;

  private onSourceOpen = () => {
    this.mediaSourceBuffer = this.mediaSource.addSourceBuffer(this.mimeType);
    this.mediaSourceBuffer.mode = 'sequence';

    this.mediaSourceBuffer.addEventListener('updateend', this.onUpdateEnd);
  };

  private onUpdateEnd = () => {
    if (this.internalBuffer != null) {
      this.mediaSourceBuffer.appendBuffer(this.internalBuffer);
      this.internalBuffer = null;
    }
  };

  constructor(mimeType: string, source$: Observable<ArrayBuffer>) {
    this.mediaSource = new MediaSource();
    this.mimeType = mimeType;

    this.bufferSubscription = source$.subscribe(chunk => {
      if (this.internalBuffer != null || this.mediaSourceBuffer.updating) {
        this.internalBuffer = concatBuffers(this.internalBuffer, chunk);
      } else {
        this.internalBuffer = chunk;
      }

      if (!this.mediaSourceBuffer.updating) {
        this.mediaSourceBuffer.appendBuffer(this.internalBuffer);
        this.internalBuffer = null;
      }
    });

    this.mediaSource.addEventListener('sourceopen', this.onSourceOpen);
  }

  createObjectURL() {
    return URL.createObjectURL(this.mediaSource);
  }

  release() {
    if (this.bufferSubscription) {
      this.bufferSubscription.unsubscribe();
    }

    if (this.internalBuffer) {
      this.internalBuffer = null;
    }

    if (this.mediaSource) {
      this.mediaSource.removeEventListener('sourceopen', this.onSourceOpen);
    }

    if (this.mediaSourceBuffer) {
      this.mediaSourceBuffer.removeEventListener('updateend', this.onUpdateEnd);
    }
  }
}

function concatBuffers(source1: any, source2: any) {
  return new Uint8Array([...new Uint8Array(source1), ...new Uint8Array(source2)]).buffer;
}