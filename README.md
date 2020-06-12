This project exists to serve as a self-validating refutation of Craig Wright's claim to ownership of the private keys corresponding to 145 address/signature pairs anonymously published at https://paste.debian.net/plain/1148565 on 25 May 2020.

The list of address/signature pairs was published 4 days after the submission of [Docket 512 Exhibit 7](https://www.courtlistener.com/recap/gov.uscourts.flsd.521536/gov.uscourts.flsd.521536.512.7.pdf) in [Kleiman v. Wright](https://www.courtlistener.com/docket/6309656/kleiman-v-wright/) in the Southern District Court of Florida. 

Exhibit 7 was a list of thousands of Bitcoin addresses, purported to reveal a cache of bitcoin controlled by a trust of which Wright claimed to be a beneficiary. 

Each signature signs the following message:

> Craig Steven Wright is a liar and a fraud. He doesn't have the keys used to sign this message.
>
> The Lightning Network is a significant achievement. However, we need to continue work on improving on-chain capacity.
>
> Unfortunately, the solution is not to just change a constant in the code or to allow powerful participants to force out others.
>
> We are all Satoshi

Validation of the signatures is a trivial operation, achieved using the [bitcoinjs-message library.](https://github.com/bitcoinjs/bitcoinjs-message).
