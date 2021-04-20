import * as WebSocket from 'ws';
import express from 'express';
import expressWs from 'express-ws';
import path from "path";
import * as SocketManager from './modules/server_socket_manager.js';
import * as Router from "./router";

const port = 9090;

const appBase = express();
const wsInstance = expressWs(appBase);
const app = wsInstance.app;

require('./environment.js');

// Templates
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../src/views")); // this is run from compiled/

// Post
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Router
app.use('/static', express.static(path.join(__dirname, '../src/static'))); // this is run from compiled/
app.use('/', Router.router);

// WebSocket
app.ws('/', function(ws: WebSocket, req: express.Request){
  var ServerSocket = require('./classes/server_socket.js');
  var newSocket = new ServerSocket(ws);
});
SocketManager.plugInstance(wsInstance);

// Activate
app.listen( port, () => {
  console.log( `[App] server started at http://localhost:${ port }` );
} );
