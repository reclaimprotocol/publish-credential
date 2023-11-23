/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IReclaim, IReclaimInterface } from "../../interfaces/IReclaim";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "dappId",
        type: "bytes32",
      },
    ],
    name: "DappCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "id",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "timestampStart",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "timestampEnd",
            type: "uint32",
          },
          {
            components: [
              {
                internalType: "address",
                name: "addr",
                type: "address",
              },
              {
                internalType: "string",
                name: "host",
                type: "string",
              },
            ],
            internalType: "struct IReclaim.Witness[]",
            name: "witnesses",
            type: "tuple[]",
          },
          {
            internalType: "uint8",
            name: "minimumWitnessesForClaimCreation",
            type: "uint8",
          },
        ],
        indexed: false,
        internalType: "struct IReclaim.Epoch",
        name: "epoch",
        type: "tuple",
      },
    ],
    name: "EpochAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "string",
        name: "provider",
        type: "string",
      },
    ],
    name: "GroupCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "_authorizeUpgrade",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "string",
            name: "host",
            type: "string",
          },
        ],
        internalType: "struct IReclaim.Witness[]",
        name: "witnesses",
        type: "tuple[]",
      },
      {
        internalType: "uint8",
        name: "requisiteWitnessesForClaimCreate",
        type: "uint8",
      },
    ],
    name: "addNewEpoch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "createDapp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "provider",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "merkleTreeDepth",
        type: "uint256",
      },
    ],
    name: "createGroup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "epoch",
        type: "uint32",
      },
    ],
    name: "fetchEpoch",
    outputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "id",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "timestampStart",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "timestampEnd",
            type: "uint32",
          },
          {
            components: [
              {
                internalType: "address",
                name: "addr",
                type: "address",
              },
              {
                internalType: "string",
                name: "host",
                type: "string",
              },
            ],
            internalType: "struct IReclaim.Witness[]",
            name: "witnesses",
            type: "tuple[]",
          },
          {
            internalType: "uint8",
            name: "minimumWitnessesForClaimCreation",
            type: "uint8",
          },
        ],
        internalType: "struct IReclaim.Epoch",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "epoch",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "identifier",
        type: "bytes32",
      },
      {
        internalType: "uint32",
        name: "timestampS",
        type: "uint32",
      },
    ],
    name: "fetchWitnessesForClaim",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "string",
            name: "host",
            type: "string",
          },
        ],
        internalType: "struct IReclaim.Witness[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "provider",
                type: "string",
              },
              {
                internalType: "string",
                name: "parameters",
                type: "string",
              },
              {
                internalType: "string",
                name: "context",
                type: "string",
              },
            ],
            internalType: "struct Claims.ClaimInfo",
            name: "claimInfo",
            type: "tuple",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "identifier",
                    type: "bytes32",
                  },
                  {
                    internalType: "address",
                    name: "owner",
                    type: "address",
                  },
                  {
                    internalType: "uint32",
                    name: "timestampS",
                    type: "uint32",
                  },
                  {
                    internalType: "uint32",
                    name: "epoch",
                    type: "uint32",
                  },
                ],
                internalType: "struct Claims.CompleteClaimData",
                name: "claim",
                type: "tuple",
              },
              {
                internalType: "bytes[]",
                name: "signatures",
                type: "bytes[]",
              },
            ],
            internalType: "struct Claims.SignedClaim",
            name: "signedClaim",
            type: "tuple",
          },
        ],
        internalType: "struct IReclaim.Proof",
        name: "proof",
        type: "tuple",
      },
    ],
    name: "getContextAddressFromProof",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "provider",
                type: "string",
              },
              {
                internalType: "string",
                name: "parameters",
                type: "string",
              },
              {
                internalType: "string",
                name: "context",
                type: "string",
              },
            ],
            internalType: "struct Claims.ClaimInfo",
            name: "claimInfo",
            type: "tuple",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "identifier",
                    type: "bytes32",
                  },
                  {
                    internalType: "address",
                    name: "owner",
                    type: "address",
                  },
                  {
                    internalType: "uint32",
                    name: "timestampS",
                    type: "uint32",
                  },
                  {
                    internalType: "uint32",
                    name: "epoch",
                    type: "uint32",
                  },
                ],
                internalType: "struct Claims.CompleteClaimData",
                name: "claim",
                type: "tuple",
              },
              {
                internalType: "bytes[]",
                name: "signatures",
                type: "bytes[]",
              },
            ],
            internalType: "struct Claims.SignedClaim",
            name: "signedClaim",
            type: "tuple",
          },
        ],
        internalType: "struct IReclaim.Proof",
        name: "proof",
        type: "tuple",
      },
    ],
    name: "getContextMessageFromProof",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "provider",
        type: "string",
      },
      {
        internalType: "string",
        name: "params",
        type: "string",
      },
    ],
    name: "getMerkelizedUserParams",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "provider",
                type: "string",
              },
              {
                internalType: "string",
                name: "parameters",
                type: "string",
              },
              {
                internalType: "string",
                name: "context",
                type: "string",
              },
            ],
            internalType: "struct Claims.ClaimInfo",
            name: "claimInfo",
            type: "tuple",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "identifier",
                    type: "bytes32",
                  },
                  {
                    internalType: "address",
                    name: "owner",
                    type: "address",
                  },
                  {
                    internalType: "uint32",
                    name: "timestampS",
                    type: "uint32",
                  },
                  {
                    internalType: "uint32",
                    name: "epoch",
                    type: "uint32",
                  },
                ],
                internalType: "struct Claims.CompleteClaimData",
                name: "claim",
                type: "tuple",
              },
              {
                internalType: "bytes[]",
                name: "signatures",
                type: "bytes[]",
              },
            ],
            internalType: "struct Claims.SignedClaim",
            name: "signedClaim",
            type: "tuple",
          },
        ],
        internalType: "struct IReclaim.Proof",
        name: "proof",
        type: "tuple",
      },
    ],
    name: "getProviderFromProof",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_semaphoreAddress",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "provider",
                type: "string",
              },
              {
                internalType: "string",
                name: "parameters",
                type: "string",
              },
              {
                internalType: "string",
                name: "context",
                type: "string",
              },
            ],
            internalType: "struct Claims.ClaimInfo",
            name: "claimInfo",
            type: "tuple",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "identifier",
                    type: "bytes32",
                  },
                  {
                    internalType: "address",
                    name: "owner",
                    type: "address",
                  },
                  {
                    internalType: "uint32",
                    name: "timestampS",
                    type: "uint32",
                  },
                  {
                    internalType: "uint32",
                    name: "epoch",
                    type: "uint32",
                  },
                ],
                internalType: "struct Claims.CompleteClaimData",
                name: "claim",
                type: "tuple",
              },
              {
                internalType: "bytes[]",
                name: "signatures",
                type: "bytes[]",
              },
            ],
            internalType: "struct Claims.SignedClaim",
            name: "signedClaim",
            type: "tuple",
          },
        ],
        internalType: "struct IReclaim.Proof",
        name: "proof",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_identityCommitment",
        type: "uint256",
      },
    ],
    name: "merkelizeUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "provider",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_merkleTreeRoot",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_signal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_nullifierHash",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_externalNullifier",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "dappId",
        type: "bytes32",
      },
      {
        internalType: "uint256[8]",
        name: "_proof",
        type: "uint256[8]",
      },
    ],
    name: "verifyMerkelIdentity",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "provider",
                type: "string",
              },
              {
                internalType: "string",
                name: "parameters",
                type: "string",
              },
              {
                internalType: "string",
                name: "context",
                type: "string",
              },
            ],
            internalType: "struct Claims.ClaimInfo",
            name: "claimInfo",
            type: "tuple",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "identifier",
                    type: "bytes32",
                  },
                  {
                    internalType: "address",
                    name: "owner",
                    type: "address",
                  },
                  {
                    internalType: "uint32",
                    name: "timestampS",
                    type: "uint32",
                  },
                  {
                    internalType: "uint32",
                    name: "epoch",
                    type: "uint32",
                  },
                ],
                internalType: "struct Claims.CompleteClaimData",
                name: "claim",
                type: "tuple",
              },
              {
                internalType: "bytes[]",
                name: "signatures",
                type: "bytes[]",
              },
            ],
            internalType: "struct Claims.SignedClaim",
            name: "signedClaim",
            type: "tuple",
          },
        ],
        internalType: "struct IReclaim.Proof",
        name: "proof",
        type: "tuple",
      },
    ],
    name: "verifyProof",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IReclaim__factory {
  static readonly abi = _abi;
  static createInterface(): IReclaimInterface {
    return new utils.Interface(_abi) as IReclaimInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IReclaim {
    return new Contract(address, _abi, signerOrProvider) as IReclaim;
  }
}