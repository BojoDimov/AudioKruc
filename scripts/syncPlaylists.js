const dotenv = require('dotenv').config();
const https = require('https');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

console.log('Running "playlistSync"\nEnv=', process.env);

const YOUTUBE_BASE_API = 'https://youtube.googleapis.com/youtube';
const YT_PLAYLISTS_V3 = YOUTUBE_BASE_API + '/v3/playlists';

const uri = YT_PLAYLISTS_V3 + '?' + [
  'maxResults=1000',
  'part=snippet',
  `channelId=${process.env.YT_CHANNEL_ID}`,
  `key=${process.env.YT_API_KEY}`
].join('&');

https.get(uri, (res) => {
  let rawData = "";
  res.on('data', chunk => rawData += chunk);
  res.on('end', () => {
    const parsedData = JSON.parse(rawData);
    const formattedData = parsedData.items.map(item => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description
    }));
    const yamlData = yaml.dump(formattedData);

    fs.writeFileSync(path.join(__dirname, '../', 'Data', 'playlists2.yaml'), yamlData);
  })
});
