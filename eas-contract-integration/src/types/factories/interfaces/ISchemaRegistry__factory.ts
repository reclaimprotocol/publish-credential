/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ISchemaRegistry,
  ISchemaRegistryInterface,
} from "../../interfaces/ISchemaRegistry";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "uid",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "registerer",
        type: "address",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "uid",
            type: "bytes32",
          },
          {
            internalType: "contract ISchemaResolver",
            name: "resolver",
            type: "address",
          },
          {
            internalType: "bool",
            name: "revocable",
            type: "bool",
          },
          {
            internalType: "string",
            name: "schema",
            type: "string",
          },
        ],
        indexed: false,
        internalType: "struct SchemaRecord",
        name: "schema",
        type: "tuple",
      },
    ],
    name: "Registered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "uid",
        type: "bytes32",
      },
    ],
    name: "getSchema",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "uid",
            type: "bytes32",
          },
          {
            internalType: "contract ISchemaResolver",
            name: "resolver",
            type: "address",
          },
          {
            internalType: "bool",
            name: "revocable",
            type: "bool",
          },
          {
            internalType: "string",
            name: "schema",
            type: "string",
          },
        ],
        internalType: "struct SchemaRecord",
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
        internalType: "string",
        name: "schema",
        type: "string",
      },
      {
        internalType: "contract ISchemaResolver",
        name: "resolver",
        type: "address",
      },
      {
        internalType: "bool",
        name: "revocable",
        type: "bool",
      },
    ],
    name: "register",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class ISchemaRegistry__factory {
  static readonly abi = _abi;
  static createInterface(): ISchemaRegistryInterface {
    return new utils.Interface(_abi) as ISchemaRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ISchemaRegistry {
    return new Contract(address, _abi, signerOrProvider) as ISchemaRegistry;
  }
}
