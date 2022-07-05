package repository

type playlistFileRepository struct {
	playlists Playlists
}

func NewPlaylistFileRepository() *playlistFileRepository {
	repo := new(playlistFileRepository)
	repo.playlists = Playlists{}
	return repo
}

func (pfr *playlistFileRepository) FindAll() Playlists {
	return Playlists{}
}
