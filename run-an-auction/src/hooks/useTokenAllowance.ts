import { BigNumberish } from "ethers";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { ERC20Token } from "../utils/types";
import { useTokenContract } from "./useTokenContract";

export function useTokenAllowance(
	token?: ERC20Token,
	owner?: string,
	spender?: string,
	queryOptions: any = {}
): BigNumberish | undefined {
	const contract = useTokenContract(token?.address, false);

	const { data: allowance } = useQuery(
		["approval", token?.address, owner, spender],
		async () => contract!.allowance(owner, spender),
		{
			enabled: Boolean(contract) && Boolean(owner) && Boolean(spender),
			...queryOptions,
		}
	);

	return useMemo(
		() => (allowance ? allowance.toString() : allowance),
		[allowance]
	);
}
