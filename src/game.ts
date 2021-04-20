
import * as SocketManager from './modules/server_socket_manager.js';

var broadcast = function(){
  var board: boolean[][] = [];

  var size = 400;

  for(var i=0; i< size; i++){
    board[i] = [];
    for(var j=0; j< size; j++){
      board[i][j] = (Math.random() > 0.5);
    }
  }

  var hospitability = Math.random();

  var o = {board: board, hospitability: hospitability};
  SocketManager.broadcastObject(o);
}

setInterval(broadcast, 1000);
