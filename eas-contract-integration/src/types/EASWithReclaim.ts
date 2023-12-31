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
  Overrides,
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
} from "./common";

export type AttestationRequestDataStruct = {
  recipient: PromiseOrValue<string>;
  expirationTime: PromiseOrValue<BigNumberish>;
  revocable: PromiseOrValue<boolean>;
  refUID: PromiseOrValue<BytesLike>;
  data: PromiseOrValue<BytesLike>;
  value: PromiseOrValue<BigNumberish>;
};

export type AttestationRequestDataStructOutput = [
  string,
  BigNumber,
  boolean,
  string,
  string,
  BigNumber
] & {
  recipient: string;
  expirationTime: BigNumber;
  revocable: boolean;
  refUID: string;
  data: string;
  value: BigNumber;
};

export type AttestationRequestStruct = {
  schema: PromiseOrValue<BytesLike>;
  data: AttestationRequestDataStruct;
};

export type AttestationRequestStructOutput = [
  string,
  AttestationRequestDataStructOutput
] & { schema: string; data: AttestationRequestDataStructOutput };

export declare namespace Claims {
  export type ClaimInfoStruct = {
    provider: PromiseOrValue<string>;
    parameters: PromiseOrValue<string>;
    context: PromiseOrValue<string>;
  };

  export type ClaimInfoStructOutput = [string, string, string] & {
    provider: string;
    parameters: string;
    context: string;
  };

  export type CompleteClaimDataStruct = {
    identifier: PromiseOrValue<BytesLike>;
    owner: PromiseOrValue<string>;
    timestampS: PromiseOrValue<BigNumberish>;
    epoch: PromiseOrValue<BigNumberish>;
  };

  export type CompleteClaimDataStructOutput = [
    string,
    string,
    number,
    number
  ] & { identifier: string; owner: string; timestampS: number; epoch: number };

  export type SignedClaimStruct = {
    claim: Claims.CompleteClaimDataStruct;
    signatures: PromiseOrValue<BytesLike>[];
  };

  export type SignedClaimStructOutput = [
    Claims.CompleteClaimDataStructOutput,
    string[]
  ] & { claim: Claims.CompleteClaimDataStructOutput; signatures: string[] };
}

export declare namespace IReclaim {
  export type ProofStruct = {
    claimInfo: Claims.ClaimInfoStruct;
    signedClaim: Claims.SignedClaimStruct;
  };

  export type ProofStructOutput = [
    Claims.ClaimInfoStructOutput,
    Claims.SignedClaimStructOutput
  ] & {
    claimInfo: Claims.ClaimInfoStructOutput;
    signedClaim: Claims.SignedClaimStructOutput;
  };
}

export interface EASWithReclaimInterface extends utils.Interface {
  functions: {
    "attest((bytes32,(address,uint64,bool,bytes32,bytes,uint256)),((string,string,string),((bytes32,address,uint32,uint32),bytes[])))": FunctionFragment;
    "ieas()": FunctionFragment;
    "reclaim()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "attest" | "ieas" | "reclaim"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "attest",
    values: [AttestationRequestStruct, IReclaim.ProofStruct]
  ): string;
  encodeFunctionData(functionFragment: "ieas", values?: undefined): string;
  encodeFunctionData(functionFragment: "reclaim", values?: undefined): string;

  decodeFunctionResult(functionFragment: "attest", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ieas", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "reclaim", data: BytesLike): Result;

  events: {};
}

export interface EASWithReclaim extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EASWithReclaimInterface;

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
      request: AttestationRequestStruct,
      proof: IReclaim.ProofStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    ieas(overrides?: CallOverrides): Promise<[string]>;

    reclaim(overrides?: CallOverrides): Promise<[string]>;
  };

  attest(
    request: AttestationRequestStruct,
    proof: IReclaim.ProofStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  ieas(overrides?: CallOverrides): Promise<string>;

  reclaim(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    attest(
      request: AttestationRequestStruct,
      proof: IReclaim.ProofStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    ieas(overrides?: CallOverrides): Promise<string>;

    reclaim(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    attest(
      request: AttestationRequestStruct,
      proof: IReclaim.ProofStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    ieas(overrides?: CallOverrides): Promise<BigNumber>;

    reclaim(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    attest(
      request: AttestationRequestStruct,
      proof: IReclaim.ProofStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    ieas(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    reclaim(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
