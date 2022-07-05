# TODO
1. https://robertcooper.me/post/using-eslint-and-prettier-in-a-typescript-project

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

## TODO (lastly updated 14.12.2017)
- `deploy` the application with port-forwarding and test it on mobile phones
- custom script for starting the app with ressurecting processes for file-server and backend.
- google OAuth integration.
- search playlist from youtube.
- add whole playlists to queue.
- integrate with Web File API or IndexedDB
- save the user state on the client and on the backend (I must choose the suitable Database Storage)


## Functionality updates
### Update 0 (-no date-)
**Implemented:** Youtube search and simple play of one song using the backend and web audio api

**Status:** Completed.

### Update 1 (7.12.2017)
**Implemented:** websocket streaming using socket.io and web-audio-stream (`AudioStreamService` and `Server/soc-serv.js`). 

**Result:** Not working as AudioContext.decodeAudioData cannot decode any frame except the first one because only the first one contains the needed decoding header. 

**Status:** Dropped. 

**Additional:** Songs will be transfered as 'whole' raw data. After that they are decoded again as whole. If everything else is ready can try to implement streaming with ffmpeg.

### Update 2 (11.12.2017)
**Implemented:** progress bar and song seek

**Result:** song is seekable

**Status:** completed

**Additional:** added @angular/material and jQuery

### Update 3 (14.12.2017)
**Implemented:** all core player functionalities (pause/play/replay, prev/next, seek, volume control) and added quee.
Layed the foundations of own style without using pre-built components like Angular Material or Ng-Bootstrap (sometimes they are hard to use).

**Result:** the application is fully functional and usable

**Status:** completed

**Additional:** there are some bugs `Angular version mismatch. Expected 4 got 3.` or something like that which fails on the first compile but is good on every recompile after.