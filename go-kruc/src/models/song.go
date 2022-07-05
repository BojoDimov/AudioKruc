package models

type Song struct {
	Id          string
	Title       string
	Description string
	Thumbnail   string
}

type Songs []Song
