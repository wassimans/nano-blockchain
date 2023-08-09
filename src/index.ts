import * as crypto from "crypto";
import * as randomstring from "randomstring";

class Block {
  readonly hash: string;
  readonly nonce: number;

  constructor(
    readonly index: number,
    readonly previousHash: string,
    readonly timestamp: number,
    readonly data: string
  ) {
    const { nonce, hash } = this.mine();
    this.hash = hash;
    this.nonce = nonce;
  }

  private calculateHash(nonce: number): string {
    const data: string =
      this.index + this.previousHash + this.timestamp + this.data + nonce;

    return crypto.createHash("sha256").update(data).digest("hex");
  }

  private mine(): { nonce: number; hash: string } {
    let hash: string;
    let nonce = 0;

    do {
      hash = this.calculateHash(++nonce);
    } while (hash.startsWith("00000") === false);

    return { nonce, hash };
  }
}

class Blockchain {
  private readonly blocks: Array<Block> = [];

  get genesis(): Block {
    return this.blocks[0];
  }

  get latestBlock(): Block {
    return this.blocks[this.blocks.length - 1];
  }

  constructor() {
    // Create the genesis block
    const genesis = new Block(0, "0", Date.now(), "genesis");
    this.blocks.push(genesis);
  }

  addBlock() {
    const newBlock = new Block(
      this.latestBlock.index + 1,
      this.latestBlock.hash,
      Date.now(),
      randomstring.generate({
        length: 64,
        charset: "hex",
      })
    );
    this.blocks.push(newBlock);
  }
}

console.log("Creating the blockchain with the genesis block...");
const blockchain = new Blockchain();

console.log(JSON.stringify(blockchain.genesis, null, 2));

setInterval(() => {
  console.log(`Mined new block #${blockchain.latestBlock.index + 1}`);
  blockchain.addBlock();
  console.log(JSON.stringify(blockchain.latestBlock, null, 2));
}, 30);
