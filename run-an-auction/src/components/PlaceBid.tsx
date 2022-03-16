import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	List,
	ListItem,
	ListItemText,
	TextField,
} from "@mui/material";
import { BigNumber } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { useState } from "react";
import { OnchainAuctionListingData } from "../utils/types";

interface PlaceBidProps {
	open: boolean;
	userTokenBalance: BigNumber;
	onPlaceBid: (amount: BigNumber) => any;
	onCancel: () => any;

	minimumBidWei: BigNumber;
	auction: OnchainAuctionListingData;
}

const PlaceBid = ({
	open,
	userTokenBalance,
	onPlaceBid,
	onCancel,

	minimumBidWei,

	auction,
}: PlaceBidProps) => {
	const minimumBid = formatUnits(minimumBidWei, auction.currency.decimals);
	const [bidAmount, setBidAmount] = useState(minimumBid);

	const hasEnoughTokens =
		Boolean(bidAmount) &&
		userTokenBalance.gt(parseUnits(bidAmount, auction.currency.decimals));

	const handleBid = () => {
		const bidAmountWei = parseUnits(bidAmount, auction.currency.decimals);
		if (onPlaceBid) {
			onPlaceBid(bidAmountWei);
		}
	};

	return (
		<>
			<Dialog open={open} maxWidth="lg">
				<DialogTitle id="form-dialog-title">Place a Bid</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<List>
							<ListItem disableGutters>
								<ListItemText primary={"Minimum Bid:" + minimumBid} />
							</ListItem>
						</List>
					</DialogContentText>

					<>
						{!hasEnoughTokens && (
							<Alert severity="warning">
								You do not have enough {auction.currency.symbol} to place this
								bid.
							</Alert>
						)}
						<TextField
							autoFocus
							margin="dense"
							label="Bid amount"
							type="number"
							fullWidth
							onChange={(e) => setBidAmount(e.target.value)}
							value={bidAmount}
							inputProps={{
								min: minimumBid,
								step: 0.001,
							}}
						/>
					</>
				</DialogContent>
				<DialogActions>
					<Button onClick={onCancel} color="primary">
						Cancel
					</Button>

					<Button
						onClick={handleBid}
						disabled={!hasEnoughTokens}
						color="primary"
					>
						Place Bid
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default PlaceBid;
