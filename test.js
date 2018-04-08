import Fungus from './index';
const fungus = new Fungus({
  lotionUrl: 'http://localhost:3000' // Ensure lotion is running on port 3000
})

function user(n){
  return new Promise((resolve, reject)=>{
    const temWalletObj = {};
    temWalletObj.privateKey = fungus.generateStaticPrivateKey(n);
    temWalletObj.address = fungus.generateAddress(temWalletObj.privateKey);
    fungus.getBalance(temWalletObj.address).then(b=>{
      temWalletObj.balance = b;
      resolve(temWalletObj)
    }).catch(err=>{
      console.error(err);
      reject(err);
    })
  })
}

let userOne, userTwo;
user(1).then(w=>{
  userOne=w
  console.log(userOne);
  user(2).then(w=>{
    userTwo=w
    fungus.createTransaction(
      userOne.privateKey, {
      address: userTwo.address,
      amount: 5
    }).then(good=>{
      // console.log('good', good);
    })
    .catch(err=>{
      console.error(err);
    })
  })
})
