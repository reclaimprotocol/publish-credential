/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  EASWithReclaim,
  EASWithReclaimInterface,
} from "../EASWithReclaim";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IEAS",
        name: "_ieas",
        type: "address",
      },
      {
        internalType: "contract IReclaim",
        name: "_reclaim",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "schema",
            type: "bytes32",
          },
          {
            components: [
              {
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                internalType: "uint64",
                name: "expirationTime",
                type: "uint64",
              },
              {
                internalType: "bool",
                name: "revocable",
                type: "bool",
              },
              {
                internalType: "bytes32",
                name: "refUID",
                type: "bytes32",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct AttestationRequestData",
            name: "data",
            type: "tuple",
          },
        ],
        internalType: "struct AttestationRequest",
        name: "request",
        type: "tuple",
      },
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
    name: "attest",
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
  {
    inputs: [],
    name: "ieas",
    outputs: [
      {
        internalType: "contract IEAS",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reclaim",
    outputs: [
      {
        internalType: "contract IReclaim",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516106ee3803806106ee83398101604081905261002f91610078565b600080546001600160a01b039384166001600160a01b031991821617909155600180549290931691161790556100b2565b6001600160a01b038116811461007557600080fd5b50565b6000806040838503121561008b57600080fd5b825161009681610060565b60208401519092506100a781610060565b809150509250929050565b61062d806100c16000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806380e9071b146100465780638cee6dd114610076578063d1d7beb814610089575b600080fd5b600154610059906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b600054610059906001600160a01b031681565b61009c6100973660046101f5565b6100aa565b60405190815260200161006d565b6001546040516354b0734f60e11b81526000916001600160a01b03169063a960e69e906100db90859060040161042d565b6020604051808303816000875af11580156100fa573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061011e91906104f8565b15156001146101635760405162461bcd60e51b815260206004820152600d60248201526c24b73b30b634b210383937b7b360991b604482015260640160405180910390fd5b60005460405163f17325e760e01b81526001600160a01b039091169063f17325e790610193908690600401610520565b6020604051808303816000875af11580156101b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d691906105de565b9392505050565b6000604082840312156101ef57600080fd5b50919050565b6000806040838503121561020857600080fd5b823567ffffffffffffffff8082111561022057600080fd5b61022c868387016101dd565b9350602085013591508082111561024257600080fd5b5061024f858286016101dd565b9150509250929050565b6000808335601e1984360301811261027057600080fd5b830160208101925035905067ffffffffffffffff81111561029057600080fd5b80360382131561029f57600080fd5b9250929050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60008235609e198336030181126102e557600080fd5b90910192915050565b80356001600160a01b038116811461030557600080fd5b919050565b803563ffffffff8116811461030557600080fd5b81835260006020808501808196508560051b810191508460005b8781101561036e57828403895261034f8288610259565b61035a8682846102a6565b9a87019a9550505090840190600101610338565b5091979650505050505050565b803582526001600160a01b03610393602083016102ee565b16602083015260006103a76040830161030a565b63ffffffff8082166040860152806103c16060860161030a565b16606086015250506080820135601e198336030181126103e057600080fd5b820160208101903567ffffffffffffffff8111156103fd57600080fd5b8060051b360382131561040f57600080fd5b60a0608086015261042460a08601828461031e565b95945050505050565b6020815260008235605e1984360301811261044757600080fd5b60406020840152830161045a8180610259565b60608086015261046e60c0860182846102a6565b91505061047e6020830183610259565b605f19808785030160808801526104968483856102a6565b93506104a56040860186610259565b95509250808785030160a088015250506104c08284836102a6565b925050506104d160208501856102cf565b838203601f19016040850152610424828261037b565b80151581146104f557600080fd5b50565b60006020828403121561050a57600080fd5b81516101d6816104e7565b8035610305816104e7565b60208152813560208201526000602083013560be1984360301811261054457600080fd5b60408381015283016001600160a01b0361055d826102ee565b166060840152602081013567ffffffffffffffff811680821461057f57600080fd5b60808501525061059160408201610515565b151560a0840152606081013560c08401526105af6080820182610259565b60c060e08601526105c5610120860182846102a6565b91505060a0820135610100850152809250505092915050565b6000602082840312156105f057600080fd5b505191905056fea26469706673582212205024de0cda1559145f6f8f76e970c37818f581bbf3edbcc11b0b0877bdcde17564736f6c63430008140033";

type EASWithReclaimConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EASWithReclaimConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class EASWithReclaim__factory extends ContractFactory {
  constructor(...args: EASWithReclaimConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _ieas: PromiseOrValue<string>,
    _reclaim: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<EASWithReclaim> {
    return super.deploy(
      _ieas,
      _reclaim,
      overrides || {}
    ) as Promise<EASWithReclaim>;
  }
  override getDeployTransaction(
    _ieas: PromiseOrValue<string>,
    _reclaim: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_ieas, _reclaim, overrides || {});
  }
  override attach(address: string): EASWithReclaim {
    return super.attach(address) as EASWithReclaim;
  }
  override connect(signer: Signer): EASWithReclaim__factory {
    return super.connect(signer) as EASWithReclaim__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EASWithReclaimInterface {
    return new utils.Interface(_abi) as EASWithReclaimInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EASWithReclaim {
    return new Contract(address, _abi, signerOrProvider) as EASWithReclaim;
  }
}