/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface TreumEnglishAuctionInterface extends ethers.utils.Interface {
  functions: {
    "cancelAuction(uint256)": FunctionFragment;
    "createAuction(uint256,address,uint8,uint256,uint256,uint256,address,uint256,uint256,address[],uint32[])": FunctionFragment;
    "getAuction(uint256)": FunctionFragment;
    "getAuctionEndTime(uint256)": FunctionFragment;
    "getAuctionId(address,uint256)": FunctionFragment;
    "isAuctionComplete(uint256)": FunctionFragment;
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "owner()": FunctionFragment;
    "placeBid(uint256,uint256)": FunctionFragment;
    "placeBidInEth(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "settleAuction(uint256)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "wrappedAddress()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "cancelAuction",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createAuction",
    values: [
      BigNumberish,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish,
      BigNumberish,
      string[],
      BigNumberish[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getAuction",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAuctionEndTime",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAuctionId",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isAuctionComplete",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155BatchReceived",
    values: [string, string, BigNumberish[], BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155Received",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "placeBid",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "placeBidInEth",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "settleAuction",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "wrappedAddress",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "cancelAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getAuction", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAuctionEndTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAuctionId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isAuctionComplete",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155BatchReceived",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "placeBid", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "placeBidInEth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "settleAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "wrappedAddress",
    data: BytesLike
  ): Result;

  events: {
    "AuctionCreated(uint256,address,uint256,address,uint256,uint256,uint256,address,uint256,uint256,address[],uint32[])": EventFragment;
    "AuctionSettled(uint256,address,address)": EventFragment;
    "BidPlaced(uint256,address,uint256,bool)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AuctionCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionSettled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BidPlaced"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export class TreumEnglishAuction extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: TreumEnglishAuctionInterface;

  functions: {
    cancelAuction(
      auctionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createAuction(
      tokenId: BigNumberish,
      tokenContract: string,
      tokenType: BigNumberish,
      duration: BigNumberish,
      startTime: BigNumberish,
      startingBid: BigNumberish,
      paymentCurrency: string,
      extensionWindow: BigNumberish,
      minBidIncrement: BigNumberish,
      feeRecipients: string[],
      feePercentages: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAuction(
      auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [
          BigNumber,
          string,
          number,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          string,
          string,
          string,
          BigNumber,
          BigNumber,
          string[],
          number[]
        ] & {
          tokenId: BigNumber;
          tokenContract: string;
          tokenType: number;
          winningBidAmount: BigNumber;
          duration: BigNumber;
          startTime: BigNumber;
          startingBid: BigNumber;
          seller: string;
          winningBidder: string;
          paymentCurrency: string;
          extensionWindow: BigNumber;
          minBidIncrement: BigNumber;
          feeRecipients: string[];
          feePercentages: number[];
        }
      ]
    >;

    getAuctionEndTime(
      auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getAuctionId(
      token: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    isAuctionComplete(
      auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    placeBid(
      auctionId: BigNumberish,
      bidAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    placeBidInEth(
      auctionId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    settleAuction(
      auctionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    wrappedAddress(overrides?: CallOverrides): Promise<[string]>;
  };

  cancelAuction(
    auctionId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createAuction(
    tokenId: BigNumberish,
    tokenContract: string,
    tokenType: BigNumberish,
    duration: BigNumberish,
    startTime: BigNumberish,
    startingBid: BigNumberish,
    paymentCurrency: string,
    extensionWindow: BigNumberish,
    minBidIncrement: BigNumberish,
    feeRecipients: string[],
    feePercentages: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAuction(
    auctionId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      string,
      number,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      string,
      string,
      string,
      BigNumber,
      BigNumber,
      string[],
      number[]
    ] & {
      tokenId: BigNumber;
      tokenContract: string;
      tokenType: number;
      winningBidAmount: BigNumber;
      duration: BigNumber;
      startTime: BigNumber;
      startingBid: BigNumber;
      seller: string;
      winningBidder: string;
      paymentCurrency: string;
      extensionWindow: BigNumber;
      minBidIncrement: BigNumber;
      feeRecipients: string[];
      feePercentages: number[];
    }
  >;

  getAuctionEndTime(
    auctionId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getAuctionId(
    token: string,
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  isAuctionComplete(
    auctionId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  onERC1155BatchReceived(
    arg0: string,
    arg1: string,
    arg2: BigNumberish[],
    arg3: BigNumberish[],
    arg4: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  onERC1155Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BigNumberish,
    arg4: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  onERC721Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  placeBid(
    auctionId: BigNumberish,
    bidAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  placeBidInEth(
    auctionId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  settleAuction(
    auctionId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  wrappedAddress(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    cancelAuction(
      auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createAuction(
      tokenId: BigNumberish,
      tokenContract: string,
      tokenType: BigNumberish,
      duration: BigNumberish,
      startTime: BigNumberish,
      startingBid: BigNumberish,
      paymentCurrency: string,
      extensionWindow: BigNumberish,
      minBidIncrement: BigNumberish,
      feeRecipients: string[],
      feePercentages: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    getAuction(
      auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        string,
        number,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        string[],
        number[]
      ] & {
        tokenId: BigNumber;
        tokenContract: string;
        tokenType: number;
        winningBidAmount: BigNumber;
        duration: BigNumber;
        startTime: BigNumber;
        startingBid: BigNumber;
        seller: string;
        winningBidder: string;
        paymentCurrency: string;
        extensionWindow: BigNumber;
        minBidIncrement: BigNumber;
        feeRecipients: string[];
        feePercentages: number[];
      }
    >;

    getAuctionEndTime(
      auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAuctionId(
      token: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isAuctionComplete(
      auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    placeBid(
      auctionId: BigNumberish,
      bidAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    placeBidInEth(
      auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    settleAuction(
      auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    wrappedAddress(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    AuctionCreated(
      auctionId?: BigNumberish | null,
      seller?: string | null,
      tokenId?: null,
      tokenContract?: null,
      duration?: null,
      startTime?: BigNumberish | null,
      startingBid?: null,
      paymentCurrency?: null,
      extensionWindow?: null,
      minBidIncrement?: null,
      feeRecipients?: null,
      feePercentages?: null
    ): TypedEventFilter<
      [
        BigNumber,
        string,
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        string[],
        number[]
      ],
      {
        auctionId: BigNumber;
        seller: string;
        tokenId: BigNumber;
        tokenContract: string;
        duration: BigNumber;
        startTime: BigNumber;
        startingBid: BigNumber;
        paymentCurrency: string;
        extensionWindow: BigNumber;
        minBidIncrement: BigNumber;
        feeRecipients: string[];
        feePercentages: number[];
      }
    >;

    AuctionSettled(
      auctionId?: BigNumberish | null,
      seller?: string | null,
      buyer?: string | null
    ): TypedEventFilter<
      [BigNumber, string, string],
      { auctionId: BigNumber; seller: string; buyer: string }
    >;

    BidPlaced(
      auctionId?: BigNumberish | null,
      bidder?: string | null,
      amount?: null,
      extended?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber, boolean],
      {
        auctionId: BigNumber;
        bidder: string;
        amount: BigNumber;
        extended: boolean;
      }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;
  };

  estimateGas: {
    cancelAuction(
      auctionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createAuction(
      tokenId: BigNumberish,
      tokenContract: string,
      tokenType: BigNumberish,
      duration: BigNumberish,
      startTime: BigNumberish,
      startingBid: BigNumberish,
      paymentCurrency: string,
      extensionWindow: BigNumberish,
      minBidIncrement: BigNumberish,
      feeRecipients: string[],
      feePercentages: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAuction(
      auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAuctionEndTime(
      auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAuctionId(
      token: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isAuctionComplete(
      auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    placeBid(
      auctionId: BigNumberish,
      bidAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    placeBidInEth(
      auctionId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    settleAuction(
      auctionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    wrappedAddress(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    cancelAuction(
      auctionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createAuction(
      tokenId: BigNumberish,
      tokenContract: string,
      tokenType: BigNumberish,
      duration: BigNumberish,
      startTime: BigNumberish,
      startingBid: BigNumberish,
      paymentCurrency: string,
      extensionWindow: BigNumberish,
      minBidIncrement: BigNumberish,
      feeRecipients: string[],
      feePercentages: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAuction(
      auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAuctionEndTime(
      auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAuctionId(
      token: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isAuctionComplete(
      auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    placeBid(
      auctionId: BigNumberish,
      bidAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    placeBidInEth(
      auctionId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    settleAuction(
      auctionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    wrappedAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}