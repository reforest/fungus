# fungus

Client-side JavaScript SDK to read/write wallets and transactions to Basecoin

![Stack Diagram](https://github.com/reforest/fungus/blob/master/images/Screen%20Shot%202018-04-08%20at%207.58.34%20PM.png?raw=true)

## Usage

```javascript
import Fungus from 'reforest-fungus';
const fungus = new Fungus({
    lotionUrl: 'localhost:3000' // Ensure lotion is running on port 3000
})

const privateKey = fungus.generatePrivateKey().toString('hex');
const address = fungus.createPublicKey(privateKey).toString('hex');
let balance; 

fungus.getBalance(address).then(b=>{
    balance = b;
    console.log(balance);
}).catch(err=>{
    console.error(err);
})

// save it savely somewhere, for example(bad)
localStorage.setItem('privateKey', privateKey);

```

## API

* generatePrivateKey
* createPublicKey
* getBalance
* createTransaction
* getAllTransactions

## Running example

```bash
npm run example
```
