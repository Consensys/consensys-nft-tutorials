import { useQuery } from "react-query";
import { useWallet } from "../components/WalletContext";
import { PaymentToken, usePaymentToken } from "../services/tokenService";
import { Order } from "../utils/types";
import { useTokenContract } from "./useTokenContract";

export const useCurrencyForOrder = (networkId: number, order?: Order) => {
	const currency = useCurrency(
		networkId,
		Boolean(order) ? order!.takerToken!.token : undefined
	);
	return currency;
};

export const useCurrency = (networkId: number, tokenAddress?: string) => {
	const { address } = useWallet();
	const contract = useTokenContract(tokenAddress, false);
	const { tokens } = usePaymentToken(networkId);

	const token = tokens.find((t) => t.address === tokenAddress);

	const { data: onchainToken } = useQuery(
		["currency", tokenAddress, networkId],
		async (): Promise<PaymentToken | null> => {
			const symbol = await contract!.symbol();
			const decimals = await contract!.decimals();

			if (!decimals || !symbol) {
				return null;
			}

			return {
				network_id: networkId,
				symbol: symbol,
				decimals: decimals,
				address: tokenAddress!,
			};
		},
		{
			enabled: Boolean(contract) && Boolean(tokenAddress) && Boolean(address),
			refetchOnWindowFocus: false,
		}
	);

	// Use onchain token details if exists, fallback to token from the api
	return onchainToken || token;
};
