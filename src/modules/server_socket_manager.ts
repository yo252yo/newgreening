import * as WebSocket from 'ws';
import express from 'express';
import expressWs from 'express-ws';

// Types
interface socketAPI {
  send: (s: string) => void;
};
type FunctionOnAServerSocket = (socket: socketAPI) => void;

// Parameters
var expressInstance: expressWs.Instance;

// Functions
export function plugInstance (instance_:  expressWs.Instance){
  expressInstance = instance_;
}

function doToAllSockets(f: FunctionOnAServerSocket){
  expressInstance.getWss().clients.forEach(function (socket:socketAPI) {
    f(socket);
  });
}

export function broadcastMessage(msg: string) {
  doToAllSockets(function (socket) {
    console.log("Broadcasting:" + msg);
    socket.send(msg);
  });
}
