import secp256k1 from 'secp256k1';
import { randomBytes } from 'crypto';
import createHash from 'sha.js';
import vstruct from 'varstruct';
import axios from 'axios';

let TxStruct = vstruct([
    { name: 'amount', type: vstruct.UInt64BE },
    { name: 'senderPubKey', type: vstruct.Buffer(33) },
    { name: 'senderAddress', type: vstruct.Buffer(32) },
    { name: 'receiverAddress', type: vstruct.Buffer(32) },
    { name: 'nonce', type: vstruct.UInt32BE }
]);

// Needed for send
function hashTx(tx) {
    let txBytes = TxStruct.encode({
        amount: tx.amount,
        senderPubKey: tx.senderPubKey,
        senderAddress: tx.senderAddress,
        nonce: tx.nonce,
        receiverAddress: tx.receiverAddress
    });
    let txHash = createHash('sha256')
        .update(txBytes)
        .digest();

    return txHash;
}

function signTx(privKey, tx) {
    let txHash = hashTx(tx);
    let signedTx = Object.assign({}, tx);
    let { signature } = secp256k1.sign(txHash, privKey);
    signedTx.signature = signature;

    return signedTx;
}

function serializeTx(tx) {
    let serialized = Object.assign({}, tx);
    for (let key in tx) {
        if (Buffer.isBuffer(tx[key])) {
            serialized[key] = tx[key].toString('base64');
        }
    }
    return serialized
}

function deriveAddress(pubKey) {
    return createHash('sha256')
        .update(pubKey)
        .digest();
}

function generatePublicKey(privateKey) {
    return secp256k1.publicKeyCreate(privateKey);
}

function generateAddress(publicKey) {
    return deriveAddress(publicKey);
}

async function getBalance(lotionUrl, address) {
    let state = await axios.get(lotionUrl + '/state').then(res => res.data);
    return state.balances[address] || 0;
}

async function send(lotionUrl, privKey, { address, amount }) {
    let senderPubKey = generatePublicKey(lotionUrl, privKey);
    let senderAddress = generateAddress(lotionUrl, senderPubKey);

    let currentState = await axios.get(lotionUrl + '/state').then(res => res.data);

    let nonce = currentState.nonces[senderAddress.toString('hex')] || 0;

    let receiverAddress;
    if (typeof address === 'string') {
        receiverAddress = Buffer.from(address, 'hex');
    } else {
        receiverAddress = address;
    }
    let tx = {
        amount,
        senderPubKey,
        senderAddress,
        receiverAddress,
        nonce
    };

    let signedTx = signTx(privKey, tx);
    let serializedTx = serializeTx(signedTx);
    let result = await axios.post(lotionUrl + '/txs', serializedTx);
    return result.data;
}

async function getTransactions(lotionUrl) {
    let result = await axios.get(lotionUrl + '/txs');
    return result.data;
}


class Fungus {
    constructor({ lotionUrl }) {
        this.lotionUrl = lotionUrl;
    }

    generatePrivateKey() {
        let privKey;
        do {
            privKey = randomBytes(32);
        } while (!secp256k1.privateKeyVerify(privKey));

        return privKey;
    }

    createWallet(privateKey) {
        return generateAddress(privateKey);
    }

    getWallet(address) {
        return getBalance(this.lotionUrl, address);
    }

    createTransaction(privKey, { address, amount }) {
        return send(this.lotionUrl, privKey, { address, amount });
    }

    getAllTransactions() {
        return getTransactions(this.lotionUrl);
    }
}

export default Fungus;
