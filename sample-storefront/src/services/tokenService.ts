import { useQuery } from "react-query";
import apiInstance from "../utils/api";
import { ERC20Token } from "../utils/types";

export interface PaymentToken extends ERC20Token {
	network_id: number;
}

export const getPaymentTokenForNetwork = async (
	networkId: number
): Promise<PaymentToken[]> => {
	const { data } = await apiInstance.get(
		`/v2/public/tokens/payment-tokens?network_id=${networkId}`
	);
	return data;
};

export const usePaymentToken = (networkId: number) => {
	const { status, data } = useQuery(
		["payment-tokens", networkId],
		() => {
			return getPaymentTokenForNetwork(networkId);
		},
		{
			enabled: Boolean(networkId),
		}
	);

	return {
		tokens: data || [],
		status,
	};
};
