import { OnchainAuctionListingData } from "../utils/types";
import moment from "moment";
import { Box, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

function AuctionTimer({
	auctionData,
}: {
	auctionData: OnchainAuctionListingData;
}) {
	const endTimeMoment = moment(auctionData.end_time);
	const endTime = endTimeMoment.format("MMM DD, YYYY @ hh:mm:ss A");
	const relativeTime = endTimeMoment.fromNow().toString();
	const extensionWindowMinutes = Math.ceil(auctionData.extension_window / 60);
	const pluralized = `${extensionWindowMinutes} ${
		extensionWindowMinutes > 1 ? "minutes" : "minute"
	}`;
	return (
		<Box display="flex" justifyContent="space-between" width={1}>
			<Box>
				Auction ends<Typography color="primary">{relativeTime}</Typography> (
				{endTime})
			</Box>
			{Boolean(auctionData.extension_window) && (
				<Box>
					<Tooltip
						title={`This auction will be extended by ${pluralized} if there is a bid with less than ${pluralized} remaining`}
					>
						<InfoIcon />
					</Tooltip>
				</Box>
			)}
		</Box>
	);
}

export default AuctionTimer;
