// function listen() {
// 	var element = document.getElementById("viewkey");

// 	var xhr = new XMLHttpRequest();
// 	xhr.open("GET", "http://localhost:12909/?viewKey=" + element.value, true);
// 	xhr.responseType = 'arraybuffer';
// 	xhr.onload = function () {
// 		playAudio(xhr.response);
// 	}
// 	xhr.send();
// }

function search(){
	var element = document.getElementById('search');
	var url = getSearchUrl(element.value, 'video');
	console.log(url);

	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onload = function(){
		var result = JSON.parse(xhr.response);
		console.log(result);
		var audioInfo = result.items[0];
		var audioPath = 'https://www.youtube.com/watch?v=' + audioInfo.id.videoId;
		document.getElementById('viewkey').value = audioPath;
		listen();
	}
	xhr.send();
}


function playAudio(buffer) {
	console.log(buffer);
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	audioCtx.decodeAudioData(buffer, function (data) {
		var src = audioCtx.createBufferSource();
		src.buffer = data;
		src.connect(audioCtx.destination);
		src.start(0);
	});

	return audioCtx;
}

function listen(){
	var element = document.getElementById("viewkey");
	var connection = new WebSocket('ws://localhost:12909');
  	connection.onopen = function(){
		connection.send("http://localhost:12909/?viewKey=" + element.value);
  	}
  	connection.onerror = function (error) {
    	// just in there were some problems with connection...
    	alert(error);
  	};
	var sum = 0;
	var audioCtx = new AudioContext();

	connection.binaryType = 'arraybuffer';
  	connection.onmessage = function (message) {
		//TO DO - Handle chunks
		sum+=message.data.byteLength;
		//playAudio(message.data);
		console.log(sum);
  	};
}

