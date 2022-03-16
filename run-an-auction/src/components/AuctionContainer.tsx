import { Alert, Card } from "@mui/material";
import { networkId, networkName } from "../config";
import { usePlatformContract } from "../services/contractService";
import { Item } from "../utils/types";
import { useWallet } from "./WalletContext";

interface AuctionContainerProps {
	item: Item;
}

const AuctionContainer = ({ item }: AuctionContainerProps) => {
	const { listing } = item;
	const auctionData = listing.data;
	const { address, isRightNetwork, web3Provider } = useWallet();
	const { contract } = usePlatformContract(
		"TreumEnglishAuction",
		Number(networkId)
	);

	return (
		<>
			<Card sx={{ my: 8, height: 600 }}>
				<AuctionTimer data={auctionData} />
				<TopBidDisplay amount={bidAmount} currency={auctionData.currency} />
				{address && web3Provider && contract && isRightNetwork ? (
					<BidActionContainer />
				) : address && !isRightNetwork ? (
					<Alert severity="warning">
						Please connect to the {networkName} network.
					</Alert>
				) : !address ? (
					<Alert severity="warning">
						Please connect your wallet to make a bid.
					</Alert>
				) : null}
			</Card>
		</>
	);
};

export default AuctionContainer;
