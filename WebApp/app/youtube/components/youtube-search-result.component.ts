import { Component } from '@angular/core';
import { SessionService, PlayerService, AudioStreamService, AudioItem } from '../../infrastructure/infrastructure.barrel';
import { SearchItem } from "../youtube-search.barrel";

@Component({
  selector: 'ak-youtube-search-result',
  templateUrl: './youtube-search-result.component.html'
})
export class YoutubeSearchResultComponent {
  constructor(
    public session: SessionService,
    private player: PlayerService,
    private audioStream: AudioStreamService
  ) {
    this.session.events.on('session-init', sessionId => this.globalQueue(sessionId));
  }

  play(item: SearchItem) {
    // this.audioStream.fetch(item.snippet.title, item.id.videoId)
    this.audioStream.fetch({
      key: item.id.videoId,
      name: item.snippet.title,
      isInQueue: false
    }).then(audioItem => {
      this.player.play(audioItem.buffer)
      this.session.currentSong = audioItem;
    });
  }

  globalQueue(sessionId) {
    console.log('Started global queue, subscribing for', 'queue-add:' + sessionId);
    this.session.socket.on(`queue-add:${sessionId}`, songData => {
      console.log('queue-add:' + this.session.sessionId, songData);
      let audioItem = new AudioItem();
      audioItem.name = songData.name;
      audioItem.key = songData.key;

      if (!this.session.songs.find(song => song.key == audioItem.key))
        this.session.addSong(audioItem);

      this.player.audioContext.decodeAudioData(songData.buffer)
        .then(audioBuffer => {
          audioItem.buffer = audioBuffer;
          //find the song in the songs context and add item to the queue
          for (let i = 0; i < this.session.songs.length; i++) {
            if (this.session.songs[i].key == audioItem.key) {
              let insertItem = {
                key: audioItem.key,
                name: audioItem.name,
                index: i
              };
              console.log(insertItem);
              this.session.queue.push(insertItem);
            }
          }
        });
    });
  }

  add(item: SearchItem) {
    // this.audioStream.fetch(item.snippet.title, item.id.videoId)
    this.audioStream.fetch({
      key: item.id.videoId,
      name: item.snippet.title,
      isInQueue: true
    }).then(audioItem => {
      for (let i = 0; i < this.session.songs.length; i++) {
        if (this.session.songs[i].key == audioItem.key) {
          let insertItem = {
            key: audioItem.key,
            name: audioItem.name,
            index: i
          };
          console.log(insertItem);
          this.session.queue.push(insertItem);
        }
      }
    });
  }
}