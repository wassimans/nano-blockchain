import * as crypto from "crypto";
import * as randomstring from "randomstring";

export interface Transaction {
  readonly sender: string;
  readonly recipient: string;
  readonly amount: number;
}

export class Block {
  readonly hash: string;
  readonly nonce: number;

  constructor(
    readonly index: number,
    readonly previousHash: string,
    readonly timestamp: number,
    readonly data: Transaction[]
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

    // Produce hash with five zero leading zeros
    do {
      hash = this.calculateHash(++nonce);
    } while (hash.startsWith("00000") === false);

    return { nonce, hash };
  }
}

export class Blockchain {
  private readonly _blocks: Array<Block> = [];

  get genesis(): Block {
    return this._blocks[0];
  }

  get latestBlock(): Block {
    return this._blocks[this._blocks.length - 1];
  }

  constructor() {
    // Create the genesis block
    const genesis = new Block(0, "0", Date.now(), []);
    this._blocks.push(genesis);
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  private getRandomString(max: number): string {
    return randomstring.generate(max);
  }

  private constructRandomTransactions(): Transaction[] {
    let transactions: Transaction[] = [];
    // Create a list of 10 transactions
    for (let i = 0; i < 10; i++) {
      const transaction: Transaction = {
        sender: this.getRandomString(7),
        recipient: this.getRandomString(5),
        amount: this.getRandomInt(100),
      };
      transactions.push(transaction);
    }
    return transactions;
  }

  addBlock() {
    const newBlock = new Block(
      this.latestBlock.index + 1,
      this.latestBlock.hash,
      Date.now(),
      this.constructRandomTransactions()
    );
    this._blocks.push(newBlock);
  }
}
