export class AudioSource {
  buffer: AudioBuffer;
  loaded: {
    start: number;
    end: number;
  }[] = [];
  totalDuration: number;
  current = 0;
}