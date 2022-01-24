import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Listing, TokenContract } from "../utils/types";
import ApproveToken from "./ApproveToken";
import PurchaseForm from "./PurchaseForm";

export interface PurchaseWizardProps {
	listing: Listing;
	tokenContract: TokenContract;
	onDone: any;
}

const steps = ["Approve", "Select quantity"];

const PurchaseWizard = React.forwardRef(
	(props: PurchaseWizardProps, ref: any) => {
		const [activeStep, setActiveStep] = useState<number>(0);

		const { listing, tokenContract, onDone } = props;

		const order = listing.data.order;

		return (
			<Box
				ref={ref}
				sx={{
					p: 5,
					backgroundColor: "white",
					borderRadius: 5,

					margin: "auto",
				}}
			>
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
						const stepProps = {};
						const labelProps = {};

						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						p: 4,
					}}
				>
					{activeStep === 0 && (
						<ApproveToken
							order={order}
							tokenContract={tokenContract}
							onDone={() => setActiveStep(1)}
						/>
					)}
					{activeStep === 1 && (
						<PurchaseForm onDone={onDone} listing={listing} />
					)}
				</Box>
			</Box>
		);
	}
);

export default PurchaseWizard;
