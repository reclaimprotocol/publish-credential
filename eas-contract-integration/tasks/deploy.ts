import { task } from 'hardhat/config'
import verify from '../scripts/verify'
import fs from 'fs'

task('deploy').setAction(async ({}, { ethers, network }) => {
  const content = JSON.parse(
    fs.readFileSync('./resources/contract-network-config.json', 'utf-8')
  )
  const networkDetails = content['networks'][network.name]

  console.log('Deploying EASWithReclaim...' + network.name)

  const EASWithReclaimFactory = await ethers.getContractFactory(
    'EASWithReclaim'
  )

  const contract = await EASWithReclaimFactory.deploy(
    networkDetails.EAS,
    networkDetails.Reclaim
  )
  console.log('EASWithReclaim deployed to:', contract.address)
  networkDetails['EASWithReclaim'] = contract.address
  content['networks'][network.name] = networkDetails

  fs.writeFileSync(
    './resources/contract-network-config.json',
    JSON.stringify(content)
  )

  await verify(contract.address, network.name, [
    networkDetails.EAS,
    networkDetails.Reclaim
  ])
})
