# fungus
Client-side JavaScript SDK to read/write wallets and transactions to Basecoin

## Usage
```javascript
import Fungus from 'reforest-fungus';
const fungus = new Fungus({
    lotionUrl: 'localhost:3000' // Ensure lotion is running on port 3000
})

// save it savely somewhere, for example(bad)
localStorage.setItem('privateKey', privateKey);

let wallet = {
    address: fungus.createPublicKey(privateKey).toString('hex'), // address
    balance: fungus.getBalance(address),
    privateKey: fungus.generatePrivateKey().toString('hex')
}

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
