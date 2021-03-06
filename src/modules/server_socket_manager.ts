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
    try{
      f(socket);
    } catch(e){
      console.log(e);
    }
  });
}

export function broadcastObject(object: any) {
  doToAllSockets(function (socket) {
    socket.send(JSON.stringify(object));
  });
}

export function countVisitors(){
  return expressInstance.getWss().clients.size;
}
