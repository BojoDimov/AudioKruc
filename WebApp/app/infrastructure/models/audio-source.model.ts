export class AudioSource {
  buffer: AudioBuffer;
  name: string;
  totalSize: number;
  startedPlaying = 0;
  offsetPercent = 0;
  duration: number;
}