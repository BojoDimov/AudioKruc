# AudioKruc 
Application for listening music online.

## Main reasons to make
1. Listening to music videos from YouTube without watching the clips
2. Background mode
3. Low network usage

## Main Features
* Implementation of new WebAudio API
* Usage of WebSockets for querying audio data
* Implementation of Audio Player
  - Controls for play/pause, next/prev
  - Song queue
  - Volume control
  - Random song seek
* Implementation of YouTube API
  - Search videos
  - Search and retrieve playlists
* Implementation of user accounts
* Integration with Google Auth
* Audio rooms - multiple users can queue songs


## Functionality updates
### Update 0 (-no date-)
**Implemented:** Youtube search and simple play of one song using the backend and web audio api

**Status:** Completed.

### Update 1 (7.12.2017)
**Implemented:** websocket streaming using socket.io and web-audio-stream (`AudioStreamService` and `Server/soc-serv.js`). 

**Result:** Not working as AudioContext.decodeAudioData cannot decode any frame except the first one because only the first one contains the needed decoding header. 

**Status:** Dropped. 

**Additional:** Songs will be transfered as 'whole' raw data. After that they are decoded again as whole. If everything else is ready can try to implement streaming with ffmpeg.
