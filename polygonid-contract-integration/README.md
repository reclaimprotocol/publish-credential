## Deployment

Uncomment networks object and updated blockchain provider **url** and **private key** in `hardhat.config.js` for the relevant network.
Then run the deployment script:

```shell
npx hardhat run --network <your-network> scripts/deploy.js
```

## Run tests

```shell
npx hardhat test
```

Run tests with gas statistics report:

```shell
REPORT_GAS=true npx hardhat test 
```

Run tests with gas statistics and costs report:

```shell
COINMARKETCAP_KEY=<<your coinmarketcap key>> REPORT_GAS=true npx hardhat test 
```

## Other Hardhat commands

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat node
npx hardhat help
```

## Publish contracts to npm

```shell
cd contracts
npm publish
```

## License

This repository is part of the iden3 project copyright 2023 0KIMS Association and published under GPL-3.0 license. Please check the LICENSE file for more details.
