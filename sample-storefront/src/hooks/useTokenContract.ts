import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { Contract, ethers } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { ERC20_ABI } from "../abis/erc20";
import { useWallet } from "../components/WalletContext";
import { checkDeployment } from "../utils/contractHelpers";

// account is not optional
export function getSigner(
	provider: Web3Provider,
	account: string
): JsonRpcSigner {
	return provider.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
	provider: Web3Provider,
	account?: string
): Web3Provider | JsonRpcSigner {
	return account ? getSigner(provider, account) : provider;
}
// account is optional
export function getContract(
	address: string,
	ABI: any,
	provider: Web3Provider,
	account?: string
): Contract {
	if (!isAddress(address) || address === ethers.constants.AddressZero) {
		throw Error(`Invalid 'address' parameter '${address}'.`);
	}

	return new Contract(
		address,
		ABI,
		getProviderOrSigner(provider, account) as any
	);
}

// returns null on errors
export function useContract(
	address: string | undefined,
	ABI: any,
	withSignerIfPossible = true
): Contract | null {
	const { web3Provider, address: account } = useWallet();
	const [contract, setContract] = useState<Contract | null>(null);

	useEffect(() => {
		async function loadContract() {
			if (!address || !ABI || !web3Provider) return;

			const c = getContract(
				address,
				ABI,
				web3Provider,
				withSignerIfPossible && account ? account : undefined
			);
			const isContract = await checkDeployment(web3Provider, address);
			if (!isContract)
				throw Error("The provided token address is not a contract");

			setContract(c);
		}

		if (address !== ethers.constants.AddressZero) {
			loadContract();
		}
	}, [address, ABI, account, web3Provider, withSignerIfPossible]);

	return useMemo(() => contract, [contract]);
}

export function useTokenContract(
	tokenAddress?: string,
	withSignerIfPossible?: boolean
): Contract | null {
	return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}
