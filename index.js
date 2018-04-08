import secp256k1 from 'secp256k1';
import { randomBytes } from 'crypto';
import createHash from 'sha.js';
import axios from 'axios';

// Needed for send
function hashTx(tx) {
    let txBytes = JSON.stringify(tx);
    let txHash = createHash('sha256')
        .update(txBytes)
        .digest();
    return txHash;
}

function signTx(privKey, tx) {
    let txHash = hashTx(tx);
    let data = Object.assign({}, tx);
    const {signature} = secp256k1.sign(txHash, privKey);
    return {data, signature};
}

function generateAddress(privateKey) {
    return secp256k1.publicKeyCreate(privateKey);
}

async function getBalance(lotionUrl, address) {
    let { data } = await axios.get(lotionUrl + '/state');
    return data.balances[address] || 0;
}

async function send(lotionUrl, privKey, obj) {
    let txx = {
        amount: obj.amount,
        from: generateAddress(privKey),
        to: obj.address,
        org: obj.org,
        feePortion: obj.feePortion
    };

    let tx = signTx(privKey, txx);
    let result = await axios.post(lotionUrl + '/txs', tx);
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

    generateStaticPrivateKey(num=1) {
        // for demo
        if(typeof num !== 'number') return '';
        let privKey;
        do {
            privKey = Buffer.alloc(32);
            for(let i = 0; i < privKey.length; i++) privKey[i] = num
        } while (!secp256k1.privateKeyVerify(privKey));
        return privKey;
    }

    generateAddress(privateKey) {
        return generateAddress(privateKey);
    }

    getBalance(address) {
        return getBalance(this.lotionUrl, address);
    }

    createTransaction(privKey, obj) {
        return send(this.lotionUrl, privKey, obj);
    }

    getAllTransactions() {
        return getTransactions(this.lotionUrl);
    }
}

export default Fungus;
