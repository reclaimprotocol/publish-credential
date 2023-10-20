import { Button, Spinner } from '@chakra-ui/react'
import { Proof } from '@reclaimprotocol/reclaim-sdk'
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


  useEffect(() => {
    if (proof == undefined) return
    const proofReq = {
      claimInfo: {
        provider: proof.provider,
        context: proof.context,
        parameters: proof.parameters
      },
      signedClaim: {
        signatures: proof.signatures,
        claim: {
          identifier: proof.identifier,
          owner: ethers.utils.computeAddress(`0x${proof.ownerPublicKey}`),
          timestampS: proof.timestampS,
          epoch: proof.epoch
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

  const contractAddress = '0x7C2421aBbbA532a387A2c074545C1B5e3435F6D4'

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
    chainId: 59144,
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
      const response = data ? data.logs[0].topics[1] : []
      console.log('Settled', response)
      setAttestationId(response as any)
    }
  })

  return (
    <>
      <Button onClick={()=>{write?.()}}>Publish with Verax {isLoading && <Spinner />}</Button>
    </>
  )
}
