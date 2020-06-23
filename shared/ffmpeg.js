import FFmpeg from 'fluent-ffmpeg';

export function createFFmpegCommand(input, outputStream, verbose) {
  let cmd = FFmpeg()
    .input(input)
    .inputOption('-re')
    .noVideo()
    .audioCodec('opus')
    .outputFormat('webm')
    .output(outputStream)
    .on('error', () => null);

  if (verbose === true) {
    cmd = cmd.on('start', message => console.log(`[ffmpeg-start]: FFmpeg started. ${message}`))
      .on('codecData', message => console.log(`[ffmpeg-codec]: ${message}`))
      .on('progress', message => console.log(`[ffmpeg-progress]: ${message}`))
      .on('stderr', message => console.log(`[ffmpeg-output]: ${message}`))
      .on('error', message => console.log(`[ffmpeg-error]: ${message}`))
      .on('end', () => console.log(`[ffmpeg-end]: FFmpeg finished.`));
  }

  return cmd;
}