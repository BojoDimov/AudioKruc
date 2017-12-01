var http = require("http");
var url = require('url');
var fs = require('fs');
var ytdl = require('ytdl-core');
//delete stream-to-buffer
var streamToBuffer = require('stream-to-buffer')
 



// function sendChunk(key, destination, count) {
// 	var stream = ytdl(key, {
// 		filter: "audioonly"//,
// 		//range: { start: count * 10000, end: (count + 1) * 10000 }
// 	});
// 	stream.on('progress', function (chunkSize, totalDownloaded, total) {
// 		console.log((totalDownloaded / total) * 100 + '%');
		
// 		//sendChunk(key, destination, count + 1);
// 	})
//   stream.pipe(destination);
// }

// var server = http.createServer(function (request, response) {
// 	response.writeHead(200, { "Content-Type": "arrayBuffer", "Access-Control-Allow-Origin": "*" });
// 	if (request.method == 'GET') {
// 		//get params as object
// 		var queryData = url.parse(request.url, true).query;
// 		console.log(queryData.viewKey);

// 		var count = 0;
// 		sendChunk(queryData.viewKey, response, count);

// 		// stream.on('finish', function () {
// 		// 	console.log("Finsh!");
// 		//response.end();
// 		//})
// 	}
// 	// else if (request.method == 'POST') {
// 	// 	response.write("I anwser a POST reuqest.");
// 	// 	response.write("With body: \n");
// 	// 	//read post body
// 	// 	var body = '';
// 	// 	request.on('data', function (data) {
// 	// 		body += data.toString();
// 	// 	});
// 	// 	request.on('end', function () {
// 	// 		var POST = JSON.parse(body);
// 	// 		console.log(POST);
// 	// 		response.write(body);
// 	// 	});
// 	//}
// });

// server.listen(12909);
// console.log("Server is listening");


"use strict";
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'AudioKruc';
// Port where we'll run the websocket server
var webSocketsServerPort = 12909;
// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');
/**
 * Global variables
 */
// list of currently connected clients (users)
var clients = [ ];
var server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server,
  // not HTTP server
});
server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port "
      + webSocketsServerPort);
});
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket
  // request is just an enhanced HTTP request. For more info 
  // http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
});
// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin '
      + request.origin + '.');
  // accept connection - you should check 'request.origin' to
  // make sure that client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  var connection = request.accept(null, request.origin); 
  // we need to know client index to remove them on 'close' event
  var index = clients.push(connection) - 1;
  var key = "";
  console.log((new Date()) + ' Connection accepted.');
  // user sent some message
  connection.on('message', function(message) {
	  debugger
    if (message.type === 'utf8') { // accept only text
		//var queryData = url.parse(request.url, true).query;
		if(message.utf8Data.indexOf('youtube') != -1) {
			key = message.utf8Data;
			var keyIndex = key.indexOf('viewKey=') + 'viewKey='.length;
			key = key.substring(keyIndex, key.length);
			sendChunk(key, connection, 0);
		}
		// else {
		// 	sendChunk(key, connection, parseInt(message.utf8Data));
		// }
	}
  });
  // user disconnected
  connection.on('close', function(connection) {
      console.log((new Date()) + " Peer "
          + connection.remoteAddress + " disconnected.");
      // remove user from the list of connected clients
      clients.splice(index, 1);
      // push back user's color to be reused by another user
      //colors.push(userColor);
  });
});

function sendChunk(key, connection, count) {
	var finish = false;
	var stream = ytdl(key, {
		filter: "audioonly"//,
		//range: { start: count * 10000, end: (count + 1) * 10000 }
	});
	stream.on('progress', function (chunkSize, totalDownloaded, total) {
		console.log('chunkSize: ' + chunkSize);
		console.log('totalDownloaded: ' + totalDownloaded);
		console.log('total: ' + total);
		console.log((totalDownloaded / total)*100 + '%');
		
		if(totalDownloaded == total){
			finish = true;
		}
	})

	stream.on('data', function(data){
		connection.sendBytes(data);
		if(finish){
			connection.close();
		}
	});
}