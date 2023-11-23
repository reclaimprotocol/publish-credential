/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export type SchemaRecordStruct = {
  uid: PromiseOrValue<BytesLike>;
  resolver: PromiseOrValue<string>;
  revocable: PromiseOrValue<boolean>;
  schema: PromiseOrValue<string>;
};

export type SchemaRecordStructOutput = [string, string, boolean, string] & {
  uid: string;
  resolver: string;
  revocable: boolean;
  schema: string;
};

export interface ISchemaRegistryInterface extends utils.Interface {
  functions: {
    "getSchema(bytes32)": FunctionFragment;
    "register(string,address,bool)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "getSchema" | "register"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getSchema",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "register",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<boolean>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "getSchema", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;

  events: {
    "Registered(bytes32,address,tuple)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Registered"): EventFragment;
}

export interface RegisteredEventObject {
  uid: string;
  registerer: string;
  schema: SchemaRecordStructOutput;
}
export type RegisteredEvent = TypedEvent<
  [string, string, SchemaRecordStructOutput],
  RegisteredEventObject
>;

export type RegisteredEventFilter = TypedEventFilter<RegisteredEvent>;

export interface ISchemaRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISchemaRegistryInterface;

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
    getSchema(
      uid: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[SchemaRecordStructOutput]>;

    register(
      schema: PromiseOrValue<string>,
      resolver: PromiseOrValue<string>,
      revocable: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getSchema(
    uid: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<SchemaRecordStructOutput>;

  register(
    schema: PromiseOrValue<string>,
    resolver: PromiseOrValue<string>,
    revocable: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getSchema(
      uid: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<SchemaRecordStructOutput>;

    register(
      schema: PromiseOrValue<string>,
      resolver: PromiseOrValue<string>,
      revocable: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "Registered(bytes32,address,tuple)"(
      uid?: PromiseOrValue<BytesLike> | null,
      registerer?: PromiseOrValue<string> | null,
      schema?: null
    ): RegisteredEventFilter;
    Registered(
      uid?: PromiseOrValue<BytesLike> | null,
      registerer?: PromiseOrValue<string> | null,
      schema?: null
    ): RegisteredEventFilter;
  };

  estimateGas: {
    getSchema(
      uid: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    register(
      schema: PromiseOrValue<string>,
      resolver: PromiseOrValue<string>,
      revocable: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getSchema(
      uid: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    register(
      schema: PromiseOrValue<string>,
      resolver: PromiseOrValue<string>,
      revocable: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}