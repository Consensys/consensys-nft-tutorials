import { Button } from "@mui/material";
import { useEffect } from "react";
import { ApprovalState } from "../hooks/useApproveCallback";
import { useApproveTokenForOrder } from "../hooks/useApproveTokenForOrder";
import { Order, TokenContract } from "../utils/types";

export interface ApproveTokenProps {
	onDone: any;
	order: Order;
	tokenContract: TokenContract;
}

const ApproveToken: React.FC<ApproveTokenProps> = ({
	onDone,
	order,
	tokenContract,
}) => {
	const { approvalState, approve } = useApproveTokenForOrder(
		order,
		tokenContract.network_id,
		{
			refetchInterval: 8000,
		}
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
