'use strict';

const express = require("express");
const http = require("http");
const ws = require("ws");
const ip = require("ip");

const app = express();

const server = http.createServer(app);

// do websocket stuff at some point


app.use(express.static(`${__dirname}/webpages`));

server.listen(port, function(){
  console.log("Server is up:", `http://${ip.address()}:${port}`)
});