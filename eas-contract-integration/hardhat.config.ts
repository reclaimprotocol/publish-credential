import dotenv from 'dotenv'
dotenv.config()

import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@openzeppelin/hardhat-upgrades'
import 'solidity-coverage'
import './tasks'

const { PRIVATE_KEY, ALCHEMY_API_KEY, NETWORK, INFURA_API_KEY, PROVIDER } =
  process.env
const hasCustomNetwork = NETWORK && NETWORK !== 'hardhat'
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ''
if (hasCustomNetwork) {
  if (!PRIVATE_KEY) {
    throw new Error('PRIVATE_KEY not set')
  }

  if (!ALCHEMY_API_KEY) {
    throw new Error('ALCHEMY_API_KEY not set')
  }
}

const API_TEMPLATE_ALCHEMY = 'https://{{network}}.g.alchemy.com/v2/{{key}}'
const API_TEMPLATE_INFURA = 'https://{{network}}.infura.io/v3/{{key}}'

let provider_url = ''

if (PROVIDER === 'alchemy') {
  provider_url = API_TEMPLATE_ALCHEMY.replace('{{network}}', NETWORK!).replace(
    '{{key}}',
    ALCHEMY_API_KEY!
  )
} else if (PROVIDER === 'infura') {
  provider_url = API_TEMPLATE_INFURA.replace('{{network}}', NETWORK!).replace(
    '{{key}}',
    INFURA_API_KEY!
  )
}

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.20',
    settings: {
      viaIR: false,
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: NETWORK,
  networks: {
    hardhat: {
      gasPrice: 100000
    },

    ...(hasCustomNetwork
      ? {
          [NETWORK]: {
            url: provider_url,
            // uncomment to make tx go faster
            // gasPrice: 50000000,
            accounts: [PRIVATE_KEY]
          }
        }
      : {})
  },
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5'
  },
  etherscan: {
    apiKey: {
      // bsc: process.env.BINANCESCAN_API_KEY!
      // lineaGoerli: process.env.LINEASCAN_API_KEY || '',
      // optimisticGoerli: process.env.ETHERSCAN_API_KEY!,
      optimisticEthereum: process.env.ETHERSCAN_API_KEY!
      // polygon: process.env.POLYGONSCAN_API_KEY!,
      // arbitrumOne: process.env.ARBISCAN_API_KEY!,
      // polygonMumbai: process.env.POLYGONSCAN_API_KEY!,
    },
    customChains: [
      {
        network: 'linea_testnet',
        chainId: 59140,
        urls: {
          apiURL: 'https://explorer.goerli.linea.build/api',
          browserURL: 'https://explorer.goerli.linea.build'
        }
      },
      {
        network: 'opt_goerli',
        chainId: 59140,
        urls: {
          apiURL: 'https://api-goerli-optimistic.etherscan.io/',
          browserURL: 'https://goerli-optimism.etherscan.io/'
        }
      }
    ]
  }
}

export default config
