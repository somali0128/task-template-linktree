const Wallet = require('ethereumjs-wallet').default;
const {default: axios} = require('axios');
const ethUtil = require('ethereumjs-util');
const {v4: uuidv4} = require('uuid');
const bs58 = require('bs58');
const Web3 = require('web3');
const web3 = new Web3();


async function eth_sign(){
// Generate a new Ethereum wallet
const wallet = Wallet.generate();

// Get the Ethereum address
const eth_address = wallet.getAddressString();

// Define your message
const data = {
    uuid: uuidv4(),
    linktree: [
      {
        key: 'official',
        label: 'Official Website',
        redirectUrl: 'https://spheron.network/',
      },
      {
        key: 'twitter',
        label: 'Twitter',
        redirectUrl: 'https://twitter.com/blockchainbalak',
      },
      {
        key: 'github',
        label: 'GitHub',
        redirectUrl: 'https://github.com/spheronFdn/',
      },
    ],
    timestamp: Date.now(),
  };

// Sign the message using the private key
const message = JSON.stringify(data);
const messageHash = web3.utils.keccak256(message);
const signature = ethUtil.ecsign(
  ethUtil.toBuffer(messageHash),
  ethUtil.toBuffer(wallet.getPrivateKey())
);

const signatureBuffer = Buffer.concat([
    ethUtil.toBuffer(signature.r),
    ethUtil.toBuffer(signature.s),
    ethUtil.toBuffer(signature.v)
  ]);
  const eth_signature = bs58.encode(signatureBuffer);

// Create the payload
const payload = {
  data,
  publicKey: eth_address,
  signature: eth_signature
};

console.log(payload);

await axios
    .post('https://k2-tasknet-ports-3.koii.live/task/HjWJmb2gcwwm99VhyNVJZir3ToAJTfUB4j7buWnMMUEP/linktree', {payload})
    .then((e) => {
      if (e.status != 200) {
        console.log(e);
      }
      console.log(e.data);
    })
    .catch((e) => {
      console.error(e);
    });
}

eth_sign()