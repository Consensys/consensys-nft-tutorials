import { Button } from "@mui/material";
import { BigNumberish } from "ethers";
import { useEffect } from "react";
import { ApprovalState, useApproveCallback } from "../hooks/useApproveCallback";
import { ERC20Token } from "../utils/types";

export interface ApproveTokenProps {
	onDone: () => void;
	amount: BigNumberish;
	operatorAddress: string;
	currency: ERC20Token;
}

const ApproveToken: React.FC<ApproveTokenProps> = ({
	onDone,
	currency,
	amount,
	operatorAddress,
}) => {
	const { approvalState, approve } = useApproveCallback(
		currency,
		amount,
		operatorAddress
	);

	const hasPendingTokenApproval = approvalState === ApprovalState.PENDING;

	useEffect(() => {
		if (approvalState === ApprovalState.APPROVED) {
			onDone();
		}
	}, [approvalState, onDone]);

	return (
		<>
			{approvalState !== ApprovalState.APPROVED && (
				<Button onClick={approve} disabled={hasPendingTokenApproval}>
					Approve Token
				</Button>
			)}
		</>
	);
};

export default ApproveToken;
