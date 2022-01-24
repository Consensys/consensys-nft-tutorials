import { Alert, Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { useWallet } from "./WalletContext";
import PurchaseWizard from "./PurchaseWizard";
import { Item } from "../utils/types";
import { networkName } from "../config";

export interface PurchaseActionsProps {
	item: Item;
}

const PurchaseAction: React.FC<PurchaseActionsProps> = ({ item }) => {
	const { address, isRightNetwork } = useWallet();

	const [cryptoBuyOpen, setCryptoBuyOpen] = useState<boolean>(false);

	const { token_contract, listing } = item;

	const order = listing.data.order;

	return (
		<>
			<Box sx={{ px: 14 }}>
				{order && (
					<>
						<Typography variant="h4"></Typography>
						<Button
							onClick={() => setCryptoBuyOpen(true)}
							disabled={!isRightNetwork || !address}
							color="secondary"
							variant="outlined"
							sx={{ borderRadius: 5, px: 5 }}
						>
							<Typography variant="button" sx={{ fontSize: "1rem" }}>
								Buy now
							</Typography>
						</Button>

						{!isRightNetwork && token_contract && address && (
							<Alert>Switch your network to ${networkName} to purchase.</Alert>
						)}

						{!address && (
							<Alert>You must connect your wallet to purchase.</Alert>
						)}
					</>
				)}
			</Box>
			<Modal
				open={cryptoBuyOpen}
				onClose={() => setCryptoBuyOpen(false)}
				sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
			>
				<PurchaseWizard
					onDone={() => setCryptoBuyOpen(false)}
					tokenContract={token_contract}
					listing={listing}
				/>
			</Modal>
		</>
	);
};

export default PurchaseAction;
