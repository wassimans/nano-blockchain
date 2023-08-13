# Nano Blockchain

A naive Proof of Work blockchain implementation in Typescript.

## Usage

```shell
# compile the Typescript source code
npm run tsc

# run the node and start mining blocks
npm run start
```

## Sample output

```shell
Creating the blockchain with the genesis block...
Mined new block #1
{
  "index": 1,
  "previousHash": "5a59bce45731414605054166e1c8abd237e3097148be4c1aee9d8c7aa00f3087",
  "timestamp": 1691577470253,
  "data": "b68e5cca795e4efc77a9cab7de9c24cd842f28a06855ebd758eed805c428df1a",
  "hash": "e4b0ce6eb0d630cca3cf7f8fe6520732e3b418758d6fb1e0df4e487a212ee552"
}
Mined new block #2
{
  "index": 2,
  "previousHash": "e4b0ce6eb0d630cca3cf7f8fe6520732e3b418758d6fb1e0df4e487a212ee552",
  "timestamp": 1691577473256,
  "data": "08cc4e967dee1ad6e50fc310fa24db5c2c87612d1a8c0342326a3789f6c13db6",
  "hash": "91277e1b3b28d7c9b932c2cb389899ea26a7502dfd2c7ffe3190e7fb8964448d"
}
Mined new block #3
{
  "index": 3,
  "previousHash": "91277e1b3b28d7c9b932c2cb389899ea26a7502dfd2c7ffe3190e7fb8964448d",
  "timestamp": 1691577476258,
  "data": "a8a81f2165e321b0f78d409b4079e2b75dff8766abb6260f64019e43cee21038",
  "hash": "79ede1b2a7b50a9754a7705008a1b3ad2e043270fa71ae79dd7a567122466eba"
}
```
