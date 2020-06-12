This project is hosted at https://craigwright.lol and exists to serve as a self-validating refutation of Craig Wright's claim to ownership of the private keys corresponding to 145 address/signature pairs anonymously published at https://paste.debian.net/plain/1148565 on 25 May 2020.

The list of address/signature pairs was published 4 days after the submission of [Docket 512 Exhibit 7](https://www.courtlistener.com/recap/gov.uscourts.flsd.521536/gov.uscourts.flsd.521536.512.7.pdf) in [Kleiman v. Wright](https://www.courtlistener.com/docket/6309656/kleiman-v-wright/) in the Southern District Court of Florida. 

Exhibit 7 was a list of thousands of Bitcoin addresses, purported to reveal a cache of bitcoin controlled by a trust of which Wright claimed to be a beneficiary. 

In public key cryptography, a message provided with a signature and a public key proves possession of the corresponding private key. Bitcoin ECDSA signatures contain enough information to derive the public key. Validating the signature against the public key and ensuring that a [hash160](https://learnmeabitcoin.com/guide/public-key-hash) of the public key corresponds to the address proves that the owner can spend the bitcoin locked at the address. 

While we do not know the identity of the private key holder, we can reasonably narrow it down to everyone in the world that isn't Craig Wright or his Tulip Trustees -- unless they actually wrote and signed the following message: 

> Craig Steven Wright is a liar and a fraud. He doesn't have the keys used to sign this message.
>
> The Lightning Network is a significant achievement. However, we need to continue work on improving on-chain capacity.
>
> Unfortunately, the solution is not to just change a constant in the code or to allow powerful participants to force out others.
>
> We are all Satoshi

Validation of the signatures is a trivial operation, achieved using the [bitcoinjs-message library](https://github.com/bitcoinjs/bitcoinjs-message).
