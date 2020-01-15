'use strict';

const port = process.env.PORT || 8080;

const express = require("express");
const http = require("http");
const ws = require("ws");
const ip = require("ip");

const app = express();

const server = http.createServer(app);

// do websocket stuff at some point
const wss = new ws.Server({server: server});

app.use(express.static(`${__dirname}/webpages`));

server.listen(port, function(){
  console.log("Server is up:", `http://${ip.address()}:${port}`)
});
