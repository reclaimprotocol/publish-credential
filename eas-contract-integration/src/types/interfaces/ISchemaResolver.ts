/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export type AttestationStruct = {
  uid: PromiseOrValue<BytesLike>;
  schema: PromiseOrValue<BytesLike>;
  time: PromiseOrValue<BigNumberish>;
  expirationTime: PromiseOrValue<BigNumberish>;
  revocationTime: PromiseOrValue<BigNumberish>;
  refUID: PromiseOrValue<BytesLike>;
  recipient: PromiseOrValue<string>;
  attester: PromiseOrValue<string>;
  revocable: PromiseOrValue<boolean>;
  data: PromiseOrValue<BytesLike>;
};

export type AttestationStructOutput = [
  string,
  string,
  BigNumber,
  BigNumber,
  BigNumber,
  string,
  string,
  string,
  boolean,
  string
] & {
  uid: string;
  schema: string;
  time: BigNumber;
  expirationTime: BigNumber;
  revocationTime: BigNumber;
  refUID: string;
  recipient: string;
  attester: string;
  revocable: boolean;
  data: string;
};

export interface ISchemaResolverInterface extends utils.Interface {
  functions: {
    "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": FunctionFragment;
    "isPayable()": FunctionFragment;
    "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": FunctionFragment;
    "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": FunctionFragment;
    "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "attest"
      | "isPayable"
      | "multiAttest"
      | "multiRevoke"
      | "revoke"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "attest",
    values: [AttestationStruct]
  ): string;
  encodeFunctionData(functionFragment: "isPayable", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "multiAttest",
    values: [AttestationStruct[], PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "multiRevoke",
    values: [AttestationStruct[], PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "revoke",
    values: [AttestationStruct]
  ): string;

  decodeFunctionResult(functionFragment: "attest", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isPayable", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "multiAttest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "multiRevoke",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revoke", data: BytesLike): Result;

  events: {};
}

export interface ISchemaResolver extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISchemaResolverInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    attest(
      attestation: AttestationStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isPayable(overrides?: CallOverrides): Promise<[boolean]>;

    multiAttest(
      attestations: AttestationStruct[],
      values: PromiseOrValue<BigNumberish>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    multiRevoke(
      attestations: AttestationStruct[],
      values: PromiseOrValue<BigNumberish>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revoke(
      attestation: AttestationStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  attest(
    attestation: AttestationStruct,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isPayable(overrides?: CallOverrides): Promise<boolean>;

  multiAttest(
    attestations: AttestationStruct[],
    values: PromiseOrValue<BigNumberish>[],
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  multiRevoke(
    attestations: AttestationStruct[],
    values: PromiseOrValue<BigNumberish>[],
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revoke(
    attestation: AttestationStruct,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    attest(
      attestation: AttestationStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isPayable(overrides?: CallOverrides): Promise<boolean>;

    multiAttest(
      attestations: AttestationStruct[],
      values: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<boolean>;

    multiRevoke(
      attestations: AttestationStruct[],
      values: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<boolean>;

    revoke(
      attestation: AttestationStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    attest(
      attestation: AttestationStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isPayable(overrides?: CallOverrides): Promise<BigNumber>;

    multiAttest(
      attestations: AttestationStruct[],
      values: PromiseOrValue<BigNumberish>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    multiRevoke(
      attestations: AttestationStruct[],
      values: PromiseOrValue<BigNumberish>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revoke(
      attestation: AttestationStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    attest(
      attestation: AttestationStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isPayable(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    multiAttest(
      attestations: AttestationStruct[],
      values: PromiseOrValue<BigNumberish>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    multiRevoke(
      attestations: AttestationStruct[],
      values: PromiseOrValue<BigNumberish>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revoke(
      attestation: AttestationStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}