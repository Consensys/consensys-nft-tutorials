import { Web3Provider } from "@ethersproject/providers";
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import { BigNumber, constants } from "ethers";
import React, { useCallback } from "react";
import { useState } from "react";
import { TreumEnglishAuction__factory } from "../contracts";
import { ApprovalState, useApproveCallback } from "../hooks/useApproveCallback";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { OnchainAuctionListingData } from "../utils/types";
import ApproveToken from "./ApproveToken";
import { BID_SUCCESS } from "../utils/constants";
import PlaceBid from "./PlaceBid";

interface BidActionContainerProps {
	auctionData: OnchainAuctionListingData;
	account: string;
	web3Provider: Web3Provider;
	contractAddress: string;
	currentBidWei: BigNumber;
}

const BidActionContainer = ({
	auctionData,
	account,
	web3Provider,
	contractAddress,
	currentBidWei,
}: BidActionContainerProps) => {
	const [bidDialogOpen, setBidDialogOpen] = useState(false);
	const [hasFunds, setHasFunds] = useState(false);
	const [balanceCheckComplete, setBalanceCheckComplete] = useState(false);
	const [approvalComplete, setApprovalComplete] = useState(false);

	const [bidPending, setBidPending] = useState(false);
	const [bidSuccess, setBidSuccess] = useState(false);

	const minimumBidIncrementWei = currentBidWei
		.mul(auctionData.min_bid_increment_bps)
		.div(10000);

	const minimumBidWei = auctionData.winning_bid
		? BigNumber.from(currentBidWei).add(minimumBidIncrementWei)
		: BigNumber.from(auctionData.starting_bid);

	const balance = useTokenBalance(auctionData.currency, account);

	const { approvalState, handleEmitter } = useApproveCallback(
		auctionData.currency,
		minimumBidWei,
		contractAddress
	);

	React.useEffect(() => {
		if (balance !== undefined && BigNumber.from(balance).gte(minimumBidWei)) {
			setHasFunds(true);
		}
		setBalanceCheckComplete(balance !== undefined);
	}, [balance, minimumBidWei]);

	const handleBid = useCallback(
		async (amount: BigNumber) => {
			if (amount.lt(minimumBidWei)) {
				throw new Error("Minimum bid amount not met.");
			}

			async function placeBid() {
				setBidDialogOpen(false);
				const signer = web3Provider.getSigner(account);
				const contract = TreumEnglishAuction__factory.connect(
					contractAddress,
					signer
				);
				return contract.placeBid(auctionData.auction_id, amount);
			}

			const tx = await placeBid();
			setBidPending(true);
			handleEmitter(tx, () => {
				setBidPending(false);
				setBidSuccess(true);
				return BID_SUCCESS;
			});
		},
		[
			minimumBidWei,
			handleEmitter,
			web3Provider,
			account,
			contractAddress,
			auctionData.auction_id,
		]
	);

	const tokenBalance = useTokenBalance(auctionData.currency, account);
	const userTokenBalance = tokenBalance
		? BigNumber.from(tokenBalance)
		: BigNumber.from(0);

	const isTopBidder = account && auctionData.winning_bid?.bidder === account;

	const insufficientFunds = balanceCheckComplete && !hasFunds;
	const approvalFlow =
		hasFunds &&
		[ApprovalState.NOT_APPROVED, ApprovalState.PENDING].includes(approvalState);
	const approved = approvalComplete || approvalState === ApprovalState.APPROVED;

	return (
		<>
			{isTopBidder ? (
				<Alert severity="info">You are currently the top bidder!</Alert>
			) : (
				<Box width={1} height={1}>
					{bidSuccess ? (
						<Alert severity="info">
							Your bid has been accepted, you are currently the top bidder!
							Please allow a minute or two for it to be reflected on this page.
						</Alert>
					) : bidPending ? (
						<Alert severity="info" icon={false}>
							<CircularProgress /> Your bid is currently being submitted.
						</Alert>
					) : insufficientFunds ? (
						<Alert severity="warning">Insufficient funds to place a bid</Alert>
					) : approvalFlow ? (
						<ApproveToken
							onDone={() => setApprovalComplete(true)}
							operatorAddress={contractAddress}
							currency={auctionData.currency}
							amount={constants.MaxUint256}
						/>
					) : approved ? (
						<Button
							fullWidth
							variant="outlined"
							onClick={() => setBidDialogOpen(true)}
							sx={{ height: 1, py: 2 }}
						>
							Place Bid
						</Button>
					) : null}
				</Box>
			)}

			<PlaceBid
				open={bidDialogOpen}
				userTokenBalance={userTokenBalance}
				onPlaceBid={handleBid}
				onCancel={() => setBidDialogOpen(false)}
				minimumBidWei={minimumBidWei}
				auction={auctionData}
			/>
		</>
	);
};

export default BidActionContainer;
