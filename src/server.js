const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { spawn } = require('child_process');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

var process = spawn('python',["d:\\kishore\\poc\\xml2cube.py", "--source", "D:\\kishore\\POC\\model.xml","--target", "D:\\kishore\\yaml_files"]); 

wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('message', (message) => {
        console.log(`Received command: ${message}`);
        let msg = message.toString()
        msg  = msg.replace('> ','')

          var process = spawn('python',["d:\\kishore\\poc\\xml2cube.py", "--source", "D:\\kishore\\POC\\model.xml","--target", "D:\\kishore\\yaml_files"]); 

            process.stdout.on('data', (data) => {                
                ws.send(`>${data}`);
            });            
            process.stderr.on('data', (data) => {                
                data = data.toString().replaceAll('#','█')                                
                ws.send(`${data}`);
                console.log(`${data}`);
            });            
            process.on('close', (code) => {
            console.log(`Process exited with code ${code}`);
            });
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
