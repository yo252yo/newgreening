
import * as SocketManager from './modules/server_socket_manager.js';

var SIZE = 200;
var ROOT = [SIZE/2, SIZE-1];
var FOREST = [[ROOT]];
var HOSPITABILITY = 0.9;


var emptyBoard = function(){
  var board: boolean[][] = [];

  for(var i=0; i< SIZE; i++){
    board[i] = [];
    for(var j=0; j< SIZE; j++){
      board[i][j] = false;
    }
  }
  return board;
}

var broadcast = function(){
  var board = emptyBoard();
  for(var chain of FOREST) {
    for(var node of chain) {
      board[node[0]][node[1]] = true;
    }
  }

  var o = {board: board, hospitability: HOSPITABILITY};
  SocketManager.broadcastObject(o);
}

var new_branch = function() {
  var i = Math.floor(Math.random() * FOREST.length);
  var b = FOREST[i];
  var j = Math.floor(Math.random() * b.length);

  FOREST.push([b[j]]);
}
var grow_branch = function(i: number) {
  var b = FOREST[i];
  var leaf = b[b.length-1];
  var newleaf: number[]=[];
  var d = Math.random();

  if (Math.random() < 0.7){
    if (Math.random() < 0.5 && leaf[0] != 0){
      newleaf = [leaf[0]-1, leaf[1]];
    }
    else if (leaf[0] != SIZE-1){
      newleaf = [leaf[0]+1, leaf[1]];
    }
  }
  else if (leaf[1] == 0){
    return;
  } else {
    newleaf = [leaf[0], leaf[1]-1];
  }

  FOREST[i].push(newleaf);
}

var grow = function(){
  if (Math.random() < 0.1 / FOREST.length){
    new_branch();
  } else {
    grow_branch(Math.floor(Math.random() * FOREST.length));
  }
}
var withdraw = function() {
  var i = Math.floor(Math.random() * FOREST.length);
  FOREST[i].pop();
  if (FOREST[i].length == 0){
    FOREST.splice(i,1);
  }
  if (FOREST.length == 0){
    FOREST = [[ROOT]];
  }
}

var evolve = function(){
  var i = Math.random();
  if (Math.abs(i - HOSPITABILITY) < 0.2){
    console.log("=");
  } else if (i < HOSPITABILITY) {
    grow();
    console.log("+");
  } else {
    withdraw();
    console.log("-");
  }
}

var changeHospitability = function(){
  HOSPITABILITY = Math.random();
}


setInterval(changeHospitability, 1000);
setInterval(evolve, 2);
setInterval(broadcast, 100);
