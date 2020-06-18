import ytdl from 'ytdl-core';
import Room from './room.js';

export default class RoomsRepository {
  rooms = [];
  options = {
    format: 'audiovideo',
    quality: 'highestaudio'
  };

  getAll(filter) {
    let result = this.rooms;

    if (filter && filter.searchTerm) {
      result = this.rooms.filter(e => e.name.toLowerCase().trim().indexOf(filter.searchTerm.toLowerCase().trim()) != -1
        || e.description.toLowerCase().trim().indexOf(filter.searchTerm.toLowerCase().trim()) != -1
        || e.genre.toLowerCase().trim().indexOf(filter.searchTerm.toLowerCase().trim()) != -1);
    }

    return result.map(this.toRoomInfoModel);
  }

  get(id) {
    let index = this.rooms.findIndex(room => room.id == id);
    if (index === -1)
      return;
    else
      return this.toRoomInfoModel(this.rooms[index]);
  }

  create(roomCreateModel) {
    roomCreateModel.id = this.rooms.length + 1;
    const room = new Room(roomCreateModel);
    this.rooms.push(room);
    return this.toRoomInfoModel(room);
  }

  update(id, roomUpdateModel) {
    let index = this.rooms.findIndex(room => room.id == id);
    if (index === -1)
      return;

    this.rooms[index] = {
      ...this.rooms[index],
      ...roomUpdateModel
    };
  }

  async addSong(id, { url }) {
    let index = this.rooms.findIndex(room => room.id == id);
    if (index === -1)
      return;

    let info = await ytdl.getInfo(url);
    let format = ytdl.chooseFormat(info.formats, this.options);

    let song = {
      status: 'queue',
      details: info.player_response.videoDetails,
      info: info,
      format: format,
      options: this.options
    };

    this.rooms[index].addSong(song);
  }

  updateSongs(id, songList) {
    let index = this.rooms.findIndex(room => room.id == id);
    if (index === -1)
      return;

    this.rooms[index].songs = songList;
  }

  join(id, socket) {
    let index = this.rooms.findIndex(room => room.id == id);
    if (index === -1)
      return;

    this.rooms[index].join(socket);
  }

  toRoomInfoModel = room => {
    return {
      id: room.id,
      name: room.name,
      description: room.description,
      genre: room.genre,
      songsInQueue: room.songs.length,
      songs: room.getSongs(),
      liveListeners: room.clients.length
    };
  }
}