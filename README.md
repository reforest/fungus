# fungus
Client-side JavaScript SDK to read/write wallets and transactions to Basecoin

## Usage
```javascript
import Fungus from 'reforest-fungus';
const fungus = new Fungus({
    lotionUrl: 'localhost:3000' // Ensure lotion is running on port 3000
})

let wallet = {};
wallet.privateKey = fungus.generatePrivateKey().toString('hex');
wallet.address = fungus.createWallet(wallet.privateKey).toString('hex');

```

## API
* generatePrivateKey
* createWallet
* getWallet
* createTransaction
* getAllTransactions

## Running example
```bash
npm run example
```
