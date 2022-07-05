const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const ytdl = require('ytdl-core');

const playlistName = process.argv[2];
const playlistPath = path.join(__dirname, '../../Data/Playlists', playlistName + '.yaml');
const output = path.join(__dirname, '../../Data', playlistName);
const options = {
  quality: 'highestaudio',
  filter: 'audioonly'
};

function downloadSong(id, output) {
  let url = `http://www.youtube.com/watch?v=${id}`;
  console.log(`Url=${url}`);

  return new Promise((resolve, reject) => {
    let s = ytdl(url, options);
    let chunks = [];
    s.on('data', data => chunks.push(data));
    s.on('finish', () => {
      let res = Buffer.concat(chunks);
      fs.writeFileSync(output, res);
      resolve();
    });
    s.on('error', (err) => reject(err));
  });
}

(async () => {
  console.log(`Going to download playlist "${playlistPath}" to folder "${output}"`);
  const playlistDataRaw = fs.readFileSync(playlistPath).toString('utf8');
  const playlist = yaml.load(playlistDataRaw);

  if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
  }

  for (let song of playlist) {
    const title = song.title;
    const songPath = path.join(output, title + '.mp3');
    console.log(`Going to download song "${title}"...`);
    try {
      await downloadSong(song.id, songPath);
      console.log('Done.');
      return;
    } catch (err) {
      console.error('Failed...', err);
    }
  }
})();
