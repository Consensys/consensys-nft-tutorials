import { Alert, Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import { useWallet } from "./WalletContext";
import PurchaseWizard from "./PurchaseWizard";
import { Item } from "../utils/types";
import { usePaymentToken } from "../services/tokenService";
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
			<Box>
				{order && (
					<>
						<Button
							onClick={() => setCryptoBuyOpen(true)}
							disabled={!isRightNetwork}
							color="primary"
							variant="outlined"
						>
							Buy Now
						</Button>

						{!isRightNetwork && token_contract && address && (
							<Alert>
								`Switch your network to ${networkName} to purchase.`
							</Alert>
						)}

						{!address && (
							<Alert>You must connect your wallet to purchase.</Alert>
						)}
					</>
				)}
			</Box>
			<Modal open={cryptoBuyOpen} onClose={() => setCryptoBuyOpen(false)}>
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
