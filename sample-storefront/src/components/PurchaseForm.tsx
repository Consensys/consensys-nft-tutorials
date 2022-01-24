import { Listing } from "../utils/types";
import { useWallet } from "./WalletContext";
import * as yup from "yup";
import useExchangeContract from "../hooks/useExchangeContract";
import { useCurrency } from "../hooks/useCurrency";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { useCallback, useState } from "react";
import { ethers } from "ethers";
import { TRANSACTION_SUCCESS } from "../utils/constants";
import { Alert } from "@mui/material";

export interface PurchaseFormProps {
	onDone?: any;
	listing: Listing;
}

const validationSchema = yup.object().shape({
	quantity: yup.number().required(`Please enter the quantity to purchase`),
});

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
					<StyledForm>
						<Box width="100%">
							Unit Price:{" "}
							{currency
								? formatCryptoCurrency(order.takerToken.amount, currency)
								: ""}
						</Box>
						<Box width="100%" mt={2}>
							Select quantity (max {listing.data.quantity_remaining})
						</Box>
						<Field
							type="number"
							name="quantity"
							placeholder="Quantity"
							component={InputField}
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
								? formatCryptoCurrency(
										BigNumber.from(order.takerToken.amount).mul(
											values.quantity
										),
										currency
								  )
								: ""}
						</Box>
						<Flex alignCenter mt={2}>
							{purchased && <BuyButton disabled={true}>Sold</BuyButton>}
							{!purchased && (
								<BuyButton
									disabled={isSubmitting || errors.quantity}
									type="submit"
								>
									Buy now
								</BuyButton>
							)}
						</Flex>
					</StyledForm>
				);
			}}
		</Formik>
	);
};

export default PurchaseForm;
