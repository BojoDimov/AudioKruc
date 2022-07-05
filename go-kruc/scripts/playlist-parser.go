package main

import (
	"fmt"
	"io/fs"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"runtime"
	"strings"

	"github.com/joho/godotenv"
	"golang.org/x/net/context"
	"google.golang.org/api/option"
	"google.golang.org/api/youtube/v3"
	"gopkg.in/yaml.v2"
)

const YT_API_KEY = "YT_API_KEY"
const YT_MAX_RESULT = 10000

func main() {
	_, __dirname, _, _ := runtime.Caller(0)
	godotenv.Load(filepath.Join(__dirname, "..", "..", "..", ".env"))
	playlistYamlFilepath := filepath.Join(__dirname, "..", "..", "..", "Data/playlists.yaml")
	playlists := loadPlaylists(playlistYamlFilepath)

	for _, p := range playlists {
		songs := retrieveSongs(&p)
		songsFile := filepath.Join(__dirname, "..", "..", "..", "Data", "Playlists", normalizePlaylistName(p.Title)+".yaml")
		saveSongs(songs, songsFile)
	}
}

type Playlist struct {
	Id          string `yaml:"id"`
	Title       string `yaml:"title"`
	Description string `yaml:"description"`
}

func (p Playlist) String() string {
	return fmt.Sprintf("%s(%s)", p.Id, p.Title)
}

type Playlists []Playlist

func (ps Playlists) String() string {
	result := "\n"
	for _, p := range ps {
		result += p.String() + "\n"
	}
	return result
}

func loadPlaylists(playlistYamlFilepath string) Playlists {
	log.Printf("Trying to load playlists from file '%s'", playlistYamlFilepath)

	rawYaml, err := ioutil.ReadFile(playlistYamlFilepath)
	if err != nil {
		log.Printf("There was error opening playlist.yaml: %s", err.Error())
		return nil
	}

	playlists := Playlists{}

	err = yaml.Unmarshal(rawYaml, &playlists)
	if err != nil {
		log.Printf("There was error in Unmarshal: %s", err.Error())
		return nil
	}

	return playlists
}

type Song struct {
	Id          string
	Title       string
	Description string
	Thumbnail   string
}

type Songs []Song

func retrieveSongs(p *Playlist) Songs {
	ctx := context.Background()
	service, err := youtube.NewService(ctx, option.WithAPIKey(os.Getenv(YT_API_KEY)))
	if err != nil {
		log.Panicf("Could not create youtube service %s", err.Error())
	}

	call := service.PlaylistItems.List([]string{"snippet"})

	res, err := call.PlaylistId(p.Id).MaxResults(YT_MAX_RESULT).Do()
	if err != nil {
		log.Panicf("Could not retrieve songs for playlist '%s'. Error: %s", p.Title, err.Error())
	}

	songs := Songs{}
	for _, pi := range res.Items {
		s := Song{
			Id:          pi.Id,
			Title:       pi.Snippet.Title,
			Description: pi.Snippet.Description,
		}

		if pi.Snippet != nil && pi.Snippet.Thumbnails != nil && pi.Snippet.Thumbnails.Standard != nil {
			s.Thumbnail = pi.Snippet.Thumbnails.Standard.Url
		}

		songs = append(songs, s)
	}

	return songs
}

// return error as argument
func saveSongs(songs Songs, filename string) {
	songsRaw, err := yaml.Marshal(&songs)
	if err != nil {
		log.Printf("There was error in Marshal: %s", err.Error())
		return
	}

	err = ioutil.WriteFile(filename, songsRaw, fs.FileMode(755))
	if err != nil {
		log.Printf("There was an error while saving the songs: %s", err.Error())
		return
	}
}

func normalizePlaylistName(name string) string {
	return strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(name, "\\", "_"), "/", "_"), " ", ""), "*", "_")
}
