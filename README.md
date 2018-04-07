# fungus
Client-side JavaScript SDK to read/write wallets and transactions to Basecoin

## Usage
```javascript
import Fungus from 'fungus';
const fungus = new Fungus({
    lotionUrl: 'localhost:3000' // Ensure lotion is running on port 3000
}

// Get a private key
fungus.generatePrivateKey();
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
