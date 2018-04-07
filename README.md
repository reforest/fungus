# fungus
Client-side JavaScript SDK to read/write wallets and transactions to Basecoin

## Usage
```javascript
import Fungus from 'reforest-fungus';
const fungus = new Fungus({
    lotionUrl: 'localhost:3000' // Ensure lotion is running on port 3000
})

const privateKey = fungus.generatePrivateKey().toString('hex');

// save it savely somewhere
localStorage.setItem('privateKey', privateKey);

const publicKey = fungus.createPublicKey(privateKey).toString('hex'); // address

const balance = fungus.getBalance(address);

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
