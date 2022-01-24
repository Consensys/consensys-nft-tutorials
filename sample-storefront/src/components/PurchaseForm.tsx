import { Listing } from "../utils/types";
import { useWallet } from "./WalletContext";
import * as yup from "yup";
import useExchangeContract from "../hooks/useExchangeContract";
import { useCurrency } from "../hooks/useCurrency";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { useCallback, useState } from "react";
import { BigNumber, BigNumberish, ethers } from "ethers";
import { TRANSACTION_SUCCESS } from "../utils/constants";
import { Alert, Box, Button, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { formatPrice } from "../utils/market";

export interface PurchaseFormProps {
	onDone?: any;
	listing: Listing;
}

const validationSchema = yup.object().shape({
	quantity: yup
		.number()
		.min(1, "Quantity must be larger than 0")
		.required(`Please enter the quantity to purchase`),
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

	return (
		<Formik
			initialValues={{
				quantity: 1,
			}}
			onSubmit={handleBuy}
			validationSchema={validationSchema}
			validateOnChange
			validateOnBlur
		>
			{({ values, errors, touched, isValidating, isSubmitting }) => {
				console.log("errors", errors);
				console.log("isvalidating", isValidating);
				console.log("touched", touched);
				console.log("currency", currency);

				return (
					<Form>
						<Typography variant="body1" align="center">
							<Box width="100%">
								Unit Price: {currency ? formatPrice(order, currency) : ""}
							</Box>
							<Box width="100%" mt={2}>
								Select quantity (max {listing.data.quantity_remaining})
							</Box>
							<Field
								type="number"
								name="quantity"
								placeholder="1"
								disabled={isSubmitting}
								validate={(quantity: number) => {
									if (quantity < 1) {
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
										return `You do not have enough ${currency!.symbol}`;
									}

									if (quantity > listing.data.quantity_remaining) {
										return "You can only buy within the max quantity";
									}
								}}
							/>

							{touched.quantity && errors.quantity && (
								<Alert severity="error">{errors.quantity}</Alert>
							)}
							{values.quantity > 0 && (
								<Box width="100%" mt={2}>
									Total Price:{" "}
									{currency && values.quantity
										? formatPrice(order, currency, values.quantity)
										: ""}
								</Box>
							)}
							<Box>
								{purchased && <Button disabled={true}>Sold</Button>}
								{!purchased && (
									<Button
										disabled={isSubmitting || !!errors.quantity}
										type="submit"
										sx={{ m: 5, px: 3, borderRadius: 5 }}
										variant="outlined"
									>
										Buy now
									</Button>
								)}
							</Box>
						</Typography>
					</Form>
				);
			}}
		</Formik>
	);
};

export default PurchaseForm;
