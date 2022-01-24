import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { Listing, TokenContract, ERC20Token } from "../utils/types";
import ApproveToken from "./ApproveToken";
import PurchaseForm from "./PurchaseForm";

export interface PurchaseWizardProps {
	listing: Listing;
	tokenContract: TokenContract;
	onDone: any;
}

const steps = ["Approve", "Select quantity"];

const PurchaseWizard: React.FC<PurchaseWizardProps> = ({
	listing,
	tokenContract,
	onDone,
}) => {
	const [activeStep, setActiveStep] = useState<number>(0);
	const order = listing.data.order;

	return (
		<Box minWidth="400px" p={2}>
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
			<Box>
				{activeStep === 0 && (
					<ApproveToken
						order={order}
						tokenContract={tokenContract}
						onDone={() => setActiveStep(1)}
					/>
				)}
				{activeStep === 1 && <PurchaseForm onDone={onDone} listing={listing} />}
			</Box>
		</Box>
	);
};

export default PurchaseWizard;
