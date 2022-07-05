package models

type Playlist struct {
	Id          string `yaml:"id"`
	Title       string `yaml:"title"`
	Description string `yaml:"description"`
}
type Playlists []Playlist
