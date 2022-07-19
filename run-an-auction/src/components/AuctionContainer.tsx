import { Alert, Card, Box, CardContent, Typography } from "@mui/material";
import { BigNumber } from "ethers";
import { networkId, networkName } from "../config";
import { usePlatformContract } from "../services/contractService";
import { Item } from "../utils/types";
import AuctionTimer from "./AuctionTimer";
import BidActionContainer from "./BidActionContainer";
import { TopBidDisplay } from "./TopBidDisplay";
import { useWallet } from "./WalletContext";

interface AuctionContainerProps {
	item: Item;
}

const AuctionContainer = ({ item }: AuctionContainerProps) => {
	const { listing } = item;
	const auctionData = listing ? listing.data : null;

	let currentBidWei = BigNumber.from(0);

	if (auctionData) {
		currentBidWei = auctionData.winning_bid
			? BigNumber.from(auctionData.winning_bid.bid_amount)
			: BigNumber.from(auctionData.starting_bid);
	}

	const { address, isRightNetwork, web3Provider } = useWallet();
	const { contract } = usePlatformContract(
		"TreumEnglishAuction",
		Number(networkId)
	);

	return (
		<>
			<Card
				sx={{
					my: 8,
					height: 600,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<CardContent sx={{ p: 8 }}>
					{auctionData ? (
						<>
							<AuctionTimer auctionData={auctionData} />
							<Box display="flex" alignItems="center">
								<TopBidDisplay
									currentBidWei={currentBidWei}
									currency={auctionData.currency}
								/>
								{address && web3Provider && contract && isRightNetwork() ? (
									<BidActionContainer
										account={address}
										auctionData={auctionData}
										web3Provider={web3Provider}
										contractAddress={contract.address}
										currentBidWei={currentBidWei}
									/>
								) : address && !isRightNetwork() ? (
									<Alert severity="warning">
										Please connect to the {networkName} network.
									</Alert>
								) : !address ? (
									<Alert severity="warning">
										Please connect your wallet to make a bid.
									</Alert>
								) : null}
							</Box>
						</>
					) : (
						<Typography variant="h5" sx={{ borderBottom: "1px solid black" }}>
							The Auction has ended.
						</Typography>
					)}
				</CardContent>
			</Card>
		</>
	);
};

export default AuctionContainer;
