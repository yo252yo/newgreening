// Wrapper around the websocket where we can inject our own logic. It's all static/singleton.
class ClientSocket {
  static initializeToIp(ip) {
    ClientSocket.webSocket = new WebSocket(ip);
    ClientSocket.webSocket.onopen = ClientSocket.onSocketOpen;
    ClientSocket.webSocket.onmessage = ClientSocket.onSocketMessage;
  }

  static onReceivingObject(object) {
    console.log("Received object:" + object);
  }

  static onReceivingMessage(message){
    console.log("Received message:" + message);
    if(message == "ping"){
      ClientSocket.send("pong");
    }
  }

  static onSocketMessage(event) {
    try {
      var object = JSON.parse(event.data);
      ClientSocket.onReceivingObject(object);
    }
    catch(error) {
      ClientSocket.onReceivingMessage(event.data);
    }
  }

  static onSocketOpen(){
    ClientSocket.send("New client request.");
  }

  static send(message) {
    ClientSocket.webSocket.send(message);
  }
}
