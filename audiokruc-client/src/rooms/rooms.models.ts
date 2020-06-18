export interface RoomUser {
  id: number;
  name: string;
}

export interface RoomSong {
  id: number;
  title: string;
  status: string;
}

export interface RoomInfoCreateModel {
  name: string;
  description: string;
  genre: string;
}

export interface RoomInfoUpdateModel extends RoomInfoCreateModel {
  id: number;
}

export interface RoomInfo extends RoomInfoUpdateModel {
  songsInQueue: number;
  liveListeners: number;
  totalListeners: number;
}

export interface RoomViewModel extends RoomInfo {
  listeners: RoomUser[];
  songs: RoomSong[];
}