import { Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { namespaceWrapper } from "./namespaceWrapper";
import * as nacl from 'tweetnacl';

// Generate the payload message
async function test() {
    const payloadMessage = 'Hello, Koii!';

    // Create a new keypair
    const keypair = Keypair.generate();
    console.log(keypair.publicKey.toBase58());

    // singing the payload using the nodes private key and sending the public key along with the payload
    const signature = await namespaceWrapper.payloadSigning(payloadMessage);
    console.log(signature);


    // // Verify the signature
    // const publicKey = new PublicKey(keypair.publicKey.toBase58());
    // const isVerified = nacl.sign.detached.verify(Buffer.from(payloadMessage), signature, publicKey.toBuffer());

    // Log the verification result to the console
    // console.log(isVerified);
}
test()