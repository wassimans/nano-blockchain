import { Blockchain } from "../lib/bc";

console.log("Creating the blockchain with the genesis block...");
const blockchain = new Blockchain();

console.log(JSON.stringify(blockchain.genesis, null, 2));

setInterval(() => {
  console.log(`Mined new block #${blockchain.latestBlock.index + 1}`);
  blockchain.addBlock();
  console.log(JSON.stringify(blockchain.latestBlock, null, 2));
}, 30);
