import { Listing } from "../utils/types";
import { useWallet } from "./WalletContext";
import * as yup from "yup";
import useExchangeContract from "../hooks/useExchangeContract";
import { useCurrency } from "../hooks/useCurrency";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { useCallback, useState } from "react";
import { BigNumber, BigNumberish, ethers } from "ethers";
import { TRANSACTION_SUCCESS } from "../utils/constants";
import { Alert, Box, Button, TextField } from "@mui/material";
import { Field, Formik } from "formik";
import { formatPrice } from "../utils/market";

export interface PurchaseFormProps {
	onDone?: any;
	listing: Listing;
}

const validationSchema = yup.object().shape({
	quantity: yup.number().required(`Please enter the quantity to purchase`),
});

export function isBalanceEnough(
	balance?: BigNumberish,
	requiredAmount?: BigNumberish
) {
	if (!balance || !requiredAmount) {
		return false;
	} else {
		return BigNumber.from(balance).gte(requiredAmount);
	}
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({
	onDone,
	listing,
}: PurchaseFormProps) => {
	const { notify, network, address } = useWallet();
	const { fillOrder } = useExchangeContract();
	const { order, signature } = listing.data;

	const currency = useCurrency(network!, order.takerToken.token);
	const balance = useTokenBalance(currency!, address);

	const [purchased, setPurchased] = useState<boolean>(false);

	const handleBuy = useCallback(
		async ({ quantity }) => {
			try {
				await fillOrder(
					quantity,
					order,
					signature,
					currency?.address === ethers.constants.AddressZero,
					(tx: any) => {
						setPurchased(true);
						return TRANSACTION_SUCCESS;
					}
				);
			} catch (error: any) {
				console.error(error);
				notify.notification({
					eventCode: "error",
					type: "error",
					message: error.message,
					autoDismiss: 5000,
				});
			} finally {
				if (onDone) onDone();
			}
		},
		[order, signature, fillOrder, notify, currency, onDone]
	);

	console.log("order", order);

	return (
		<Formik
			initialValues={{
				quantity: 1,
			}}
			onSubmit={handleBuy}
			validationSchema={validationSchema}
		>
			{({ values, errors, isSubmitting }) => {
				return (
					<Box>
						<Box width="100%">
							Unit Price: {currency ? formatPrice(order, currency) : ""}
						</Box>
						<Box width="100%" mt={2}>
							Select quantity (max {listing.data.quantity_remaining})
						</Box>
						<Field
							type="number"
							name="quantity"
							placeholder="Quantity"
							component={TextField}
							disabled={isSubmitting}
							validate={(quantity: number) => {
								if (!quantity) {
									return "Quantity must be higher than 0";
								}

								if (!balance) {
									return "Checking token balance";
								}

								const hasEnough = isBalanceEnough(
									balance!,
									BigNumber.from(order.takerToken.amount).mul(quantity)
								);

								if (!hasEnough) {
									return "Not enough funds";
								}

								if (quantity > listing.data.quantity_remaining) {
									return "Quantity is too high";
								}
							}}
							max={listing.data.quantity_remaining}
							small
						/>

						{errors.quantity && (
							<Alert severity="error" elevation={0}>
								{errors.quantity}
							</Alert>
						)}
						<Box width="100%" mt={2}>
							Total Price:{" "}
							{currency && values.quantity
								? formatPrice(order, currency, values.quantity)
								: ""}
						</Box>
						<Box>
							{purchased && <Button disabled={true}>Sold</Button>}
							{!purchased && (
								<Button
									disabled={isSubmitting || !!errors.quantity}
									type="submit"
								>
									Buy now
								</Button>
							)}
						</Box>
					</Box>
				);
			}}
		</Formik>
	);
};

export default PurchaseForm;
