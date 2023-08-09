import * as crypto from "crypto";

class Block {
  readonly hash: string;

  constructor(
    readonly index: number,
    readonly previousHash: string,
    readonly timestamp: number,
    readonly data: string
  ) {
    this.hash = this.calculateHash();
  }

  private calculateHash(): string {
    const data: string =
      this.index + this.previousHash + this.timestamp + this.data;

    return crypto.createHash("sha256").update(data).digest("hex");
  }
}

class Blockchain {
  private readonly blocks: Array<Block> = [];

  private get latestBlock(): Block {
    return this.blocks[this.blocks.length - 1];
  }

  constructor() {
    // Create the genesis block
    const genesis = new Block(0, "0", Date.now(), "genesis");
    this.blocks.push(genesis);
  }

  addBlock(data: string) {
    const newBlock = new Block(
      this.latestBlock.index + 1,
      this.latestBlock.hash,
      Date.now(),
      data
    );
    this.blocks.push(newBlock);
  }
}

console.log("Creating the blockchain with the genesis block...");
const blockchain = new Blockchain();
console.log("Mining block #1...");
blockchain.addBlock("First block");
console.log("Mining block #2...");
blockchain.addBlock("Second block");
console.log(JSON.stringify(blockchain, null, 2));
