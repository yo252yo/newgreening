import * as WebSocket from 'ws';

// Wrapper around raw websocket where we can inject our logic.
class ServerSocket {
  webSocket: WebSocket;


  onReceivingObject(object: any) {
    console.log("Received object:" + object);
  }

  onReceivingMessage(message: string){
    console.log("Received message:" + message);
    if(message == "ping"){
      this.send("pong");
    }
  }

  onSocketMessage(event: WebSocket.MessageEvent) {
    try {
      var object = JSON.parse(event.data.toString());
      this.onReceivingObject(object);
    }
    catch(error) {
      this.onReceivingMessage(event.data.toString());
    }
  }

  constructor(webSocket: WebSocket) {
    console.log("New socket");
    var self = this;
    this.webSocket = webSocket;
    this.webSocket.onmessage = function (event: WebSocket.MessageEvent) {
      self.onSocketMessage(event);
    };
  }

  send(message:string) {
    this.webSocket.send(message);
  }
}

module.exports = ServerSocket;
