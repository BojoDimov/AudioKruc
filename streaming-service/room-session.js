export class RoomSession {
  // In order to use all these events we should have:
  // 2 socket channels from client to stream service - one for data, one for events
  // 1 socket channel from stream service to queue service
  listenEvents = ['song-play'];
  emitEvents = ['download-error', 'processing-error', 'song-request'];
  clientEvents = ['stop-song', 'join-room', 'leave-room'];

  // skip-song <=> play-song (next)
  async  onSongPlay(songMetadata) {
    await stopCurrentSong();
    await downloadNextSong();
    await processNextSong();
    await streamNextSong();
  }

  // If there is no next song, queue service should remember this
  // room is not playing and when song is added should fire 'song-play'
  async onSongEnd() {
    await getNextSong();
    await downloadNextSong();
    await processNextSong();
    await streamNextSong();
  }

  // 'stop-song' clears client buffer and stops current song
  async stopCurrentSong() {

  }

  // emits song-request, should trigger song-play when there is actually a next song
  async getNextSong() {

  }

  // can emit 'download-error'
  async downloadNextSong() {

  }

  async download(songMetadata) {
    let info = await ytdl.getInfo(songMetadata.url);
    let format = ytdl.chooseFormat(info.formats, options);
    console.log(format);

    let stream = ytdl.downloadFromInfo(info, options);

    let chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => {
      let buffer = Buffer.concat(chunks);
    });
  }

  // can emit 'processing-error'
  async processNextSong() {

  }

  // streams song chunks to all joined clients
  async streamNextSong() {

  }
}