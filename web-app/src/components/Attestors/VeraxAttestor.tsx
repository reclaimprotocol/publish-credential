import { Button, Spinner, useToast } from '@chakra-ui/react'
import { Proof } from '../../utils/types'
import { Identity } from '@semaphore-protocol/identity'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import { getSchemaId } from '../../utils/get-schema-id'
import { reclaimNetworksAddresses } from '../../reclaimNetworkAddresses'
import { CustomModal } from './CustomModal'

export default function VeraxAttestor ({
  provider,
  proof
}: {
  provider: string
  proof: Proof | undefined
}) {
  const { address } = useAccount()
  const [enable, setEnable] = useState<boolean>(false)
  const [isPrepared, setIsPrepared] = useState(false)
  const [attestationId, setAttestationId] = useState(null)
  const [attestationRequest, setAttestationRequest] = useState(null)
  const toast = useToast()

  useEffect(() => {
    if (proof == undefined) return
    const proofReq = {
      claimInfo: {
        provider: proof.claimData.provider,
        context: proof.claimData.context,
        parameters: proof.claimData.parameters
      },
      signedClaim: {
        signatures: proof.signatures,
        claim: {
          identifier: proof.identifier,
          owner: ethers.computeAddress(`${proof.claimData.owner}`),
          timestampS: proof.claimData.timestampS,
          epoch: proof.claimData.epoch
        }
      }
    }
    const newIdentity = new Identity(address)
    const ad = {
      data: {
        proof: proofReq,
        _identityCommitment: newIdentity?.commitment.toString(),
        expirationTime: 1
      },
      schema:
        getSchemaId(provider)
    }
    setAttestationRequest(ad as any)
  }, [proof, address, provider])

  const contractAddress = '0x5Da495e845f9242766AD97E8D09EAcc4004aBeDc'

  //@ts-ignore
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: [
      {
        inputs: [
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'schema',
                type: 'bytes32'
              },
              {
                components: [
                  {
                    components: [
                      {
                        components: [
                          {
                            internalType: 'string',
                            name: 'provider',
                            type: 'string'
                          },
                          {
                            internalType: 'string',
                            name: 'parameters',
                            type: 'string'
                          },
                          {
                            internalType: 'string',
                            name: 'context',
                            type: 'string'
                          }
                        ],
                        internalType: 'struct Claims.ClaimInfo',
                        name: 'claimInfo',
                        type: 'tuple'
                      },
                      {
                        components: [
                          {
                            components: [
                              {
                                internalType: 'bytes32',
                                name: 'identifier',
                                type: 'bytes32'
                              },
                              {
                                internalType: 'address',
                                name: 'owner',
                                type: 'address'
                              },
                              {
                                internalType: 'uint32',
                                name: 'timestampS',
                                type: 'uint32'
                              },
                              {
                                internalType: 'uint32',
                                name: 'epoch',
                                type: 'uint32'
                              }
                            ],
                            internalType: 'struct Claims.CompleteClaimData',
                            name: 'claim',
                            type: 'tuple'
                          },
                          {
                            internalType: 'bytes[]',
                            name: 'signatures',
                            type: 'bytes[]'
                          }
                        ],
                        internalType: 'struct Claims.SignedClaim',
                        name: 'signedClaim',
                        type: 'tuple'
                      }
                    ],
                    internalType: 'struct Reclaim.Proof',
                    name: 'proof',
                    type: 'tuple'
                  },
                  {
                    internalType: 'uint256',
                    name: '_identityCommitment',
                    type: 'uint256'
                  },
                  {
                    internalType: 'uint64',
                    name: 'expirationTime',
                    type: 'uint64'
                  }
                ],
                internalType: 'struct ReclaimPortal.AttestationRequestData',
                name: 'data',
                type: 'tuple'
              }
            ],
            internalType: 'struct ReclaimPortal.AttestationRequest',
            name: 'attestationRequest',
            type: 'tuple'
          }
        ],
        name: 'attest',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
      }
    ],
    functionName: 'attest',
    args: [attestationRequest],
    chainId: reclaimNetworksAddresses['optimism-goerli']['chainId'],
    onSuccess (data) {
      console.log('Successful - register prepare: ', data)
      setIsPrepared(true)
    },
    onError (error) {
      console.log(error)
    }
  })

  const { data, write, isLoading } = useContractWrite(config)
  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    onSettled (data, error) {
      toast({
        'title':'Attestation published',
        description:'Verax register your attestation',
        duration:5000,
        isClosable:true,
        position:'top-right',
        status:'success'
      })
      const response = data ? data.logs[0].topics[1] : []
      console.log('Settled', response)
      setAttestationId(response as any)
    }
  })

  return (
    <>
      <Button colorScheme = 'blue' onClick={()=>{write?.()}}>Publish with Verax {isLoading && <Spinner />}</Button>
      {attestationId && <CustomModal attestationId={attestationId} />}

    </>
  )
}
