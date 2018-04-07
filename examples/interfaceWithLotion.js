import Fungus from '../index.js';

const fungus = new Fungus({
    lotionUrl: 'localhost:3000'
});

const privKey = fungus.generatePrivateKey();
console.log(privKey);