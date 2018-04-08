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

describe('Fungus', () => {
  let userOne, userTwo;

  it('can createTransaction', (done) => {
    user(1).then(w=>{
      userOne=w
      user(2).then(w=>{
        userTwo=w
        fungus.createTransaction(
          userOne.privateKey, {
          address: userTwo.address,
          amount: 5
        }).then(good=>{
          expect(good.result).not.toBeNull()
          done()
        })
        .catch(err=>{
          console.error(err);
        })
      })
    })
  });
});