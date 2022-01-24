import { Order } from "../utils/types";
import useExchangeContract from "./useExchangeContract";

export const useApproveTokenForOrder = (
	order: Order,
	networkId: number,
	queryOptions?: any
) => {
	const currency = useCurrencyForOrder(networkId, order);
	const { address: exchangeContractAddress } = useExchangeContract();

	const amount = order.takerToken.amount;

	const { approvalState, approve, removeApproval } = useApproveCallback(
		currency ?? undefined,
		amount,
		exchangeContractAddress,
		queryOptions
	);

	return {
		approvalState,
		approve,
		currency,
		removeApproval,
		amount,
	};
};
