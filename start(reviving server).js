const { spawn } = require('child_process');
let webApp = spawn('cmd.exe', ['/c', 'ng serve']);
let server = spawn('cmd.exe', ['/c', 'node ./Server/soc-serv.js']);
// let server = spawn('node.exe', ['./Server/soc-serv.js']);

// webApp.stdout.on('data', (data) => {
//   console.log("WEB Application", data.toString());
// });

// webApp.stderr.on('data', (data) => {
//   console.log("WEB Application ERROR", data.toString());
// });

webApp.on('exit', (code) => {
  console.log(`WEB Application exited with code ${code}`);
});

server.stdout.on('data', (data) => {
  console.log("SERVER", data.toString());
});

server.stderr.on('data', (data) => {
  console.log("SERVER", data.toString());
});

server.on('exit', (code) => restartServer(code));

function restartServer(code) {
  console.log(`Server exited with code ${code}`);
  // console.log('Restarting server...');
  // server = spawn('cmd.exe', ['/c', 'node ./Server/soc-serv.js']);

  // server.stdout.on('data', (data) => {
  //   console.log("SERVER", data.toString());
  // });
  // server.stderr.on('data', (data) => {
  //   console.log("SERVER", data.toString());
  // });
  // server.on('exit', (code) => restartServer(code));
}

process.stdin.resume();

function exitHandler(err) {
  webApp.kill();
  server.kill();
  console.log('Main Process exiting')
}

//do something when app is closing
process.on('exit', exitHandler.bind(null));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null));