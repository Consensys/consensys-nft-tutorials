import { BigNumberish, BytesLike } from "ethers";

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
	token_type: "ERC721" | "ERC1155";
}

export interface Listing {
	data: OnchainAuctionListingData;
	type: "ONCHAIN_ENGLISH_AUCTION";
}

export interface OnchainAuctionListingData {
	id: string;
	auction_id: number;
	duration: number;
	end_time: string;
	extension_window: number;
	min_bid_increment: string;
	start_time: string;
	starting_bid: string;
	status: string;
	currency: ERC20Token;
	winning_bid?: {
		bid_amount: string;
		bidder: string;
	};
}

export interface ERC20Token {
	address: string;
	decimals: number;
	symbol: string;
}
