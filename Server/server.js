const http = require("http");
const url = require('url');
const ytdl = require('ytdl-core');


let server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "arrayBuffer", "Access-Control-Allow-Origin": "*" });

  if (request.method == 'GET') {
    //get params as object
    let queryData = url.parse(request.url, true).query;
    console.log('Requested resource: ' + queryData.viewKey);
    console.log('Requested from: ' + request.connection.remoteAddress)
    let stream = ytdl(queryData.viewKey, { filter: "audioonly" });

    stream.on('progress', function (obj, obj1, obj2) {
      // console.log("Chunk size is: " + obj);
      // console.log("Total downloaded is: " + obj1);
      // console.log("Total size is: " + obj2);
    })

    stream.on('finish', function () {
      console.log("Finsh!");
      response.end();
    })

    stream.pipe(response);
  }
});

server.listen(12909);
console.log("Server is listening");