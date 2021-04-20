
const paint = function(board) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  var pixel = 10;

  for(var i=0; i< board.length; i++){
  for(var j=0; j< board[i].length; j++){
    if (board[i][j] < 0.5){
      ctx.fillStyle = "red";
    } else{
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    }
    ctx.fillRect(0+pixel*i, 0+pixel*j, pixel, pixel);
  }}

}

// Wrapper around the websocket where we can inject our own logic. It's all static/singleton.
class ClientSocket {
  static initializeToIp(ip) {
    ClientSocket.webSocket = new WebSocket(ip);
    ClientSocket.webSocket.onopen = ClientSocket.onSocketOpen;
    ClientSocket.webSocket.onmessage = ClientSocket.onSocketMessage;
  }

  static onReceivingObject(object) {
    console.log("Received object:" + object);

    paint(object.board);

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
