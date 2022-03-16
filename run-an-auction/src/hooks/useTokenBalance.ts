import { BigNumberish } from "ethers";
import { useQuery } from "react-query";
import { ERC20Token } from "../utils/types";
import { useTokenContract } from "./useTokenContract";

export function useTokenBalance(
	token: ERC20Token,
	address?: string | null | undefined
): BigNumberish | undefined {
	const contract = useTokenContract(token.address, false);

	const { data: balance } = useQuery(
		["balanceOf", token.address, address],
		async () => {
			console.log("Fetching balance", address);
			const balance = await contract!.balanceOf(address);
			console.log("Got balance: ", balance);
			return balance;
		},
		{
			enabled: Boolean(contract) && Boolean(address),
			refetchOnWindowFocus: false,
		}
	);

	return balance;
}
