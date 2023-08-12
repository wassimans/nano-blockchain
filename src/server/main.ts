// import { Blockchain } from "../shared/bc";

// console.log("Creating the blockchain with the genesis block...");
// const blockchain = new Blockchain();

// console.log(JSON.stringify(blockchain.genesis, null, 2));

// setInterval(() => {
//   console.log(`Mined new block #${blockchain.latestBlock.index + 1}`);
//   blockchain.addBlock();
//   console.log(JSON.stringify(blockchain.latestBlock, null, 2));
// }, 30);

import express from "express";
import http from "http";
import path from "path";
import WebSocket from "ws";
import { BlockchainServer } from "./blockchain-server";

const PORT = 3000;
const app = express();
// use  "..", ".." for more path resolving portability between OSs
app.use("/", express.static(path.join(__dirname, "..", "..", "public")));
app.use(
  "/node_modules",
  express.static(path.join(__dirname, "..", "..", "node_modules"))
);

const httpServer: http.Server = app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`Listening on http://localhost:${PORT}`);
  }
});

// Give the httpServer as argument when instantiating the WebSocket server so they
// can share the same port
const wsServer = new WebSocket.Server({ server: httpServer });

new BlockchainServer(wsServer);
