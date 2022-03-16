import { Box, Typography } from "@mui/material";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { ERC20Token } from "../utils/types";

export const TopBidDisplay = ({
	currentBidWei,
	currency,
}: {
	currentBidWei: BigNumber;
	currency: ERC20Token;
}) => {
	return (
		<Box sx={{ py: 8, width: 1 }}>
			<Typography>Current Bid:</Typography>
			<Box py={1}>
				<Typography variant="h4" style={{ fontWeight: "bold" }}>
					{formatUnits(currentBidWei, currency.decimals)} {currency.symbol}
				</Typography>
			</Box>
		</Box>
	);
};
