import { BigNumberish, BytesLike } from 'ethers';

export interface Item {
    id: string;
    attributes: any;
    token_contract: TokenContract;
    token_id: string;
    collection_id: string;
    listing: Listing;
}

export type Token = {
    kind: BigNumberish;
    token: string;
    id: BigNumberish;
    amount: BigNumberish;
  };

export interface TokenContract {
    address: string;
    network_id: number;
    symbol: string; 
    token_type: 'ERC721' | 'ERC1155';
}

export interface Listing {
    data: SetPriceListingData
    type: 'SET_PRICE' | 'FIAT_SET_PRICE' | 'AUCTION'
}
  
export interface SetPriceListingData {
    order: Order;
    signature: BytesLike;
    quantity_listed: number;
    quantity_remaining: number;
}
  
export interface Order {
    expiry: BigNumberish;
    nonce: BigNumberish;
    makerAddress: string;
    takerAddress: string;
    makerToken: Token;
    takerToken: Token;
    payoutTo: string[];
    payoutAmount: BigNumberish[];
  }