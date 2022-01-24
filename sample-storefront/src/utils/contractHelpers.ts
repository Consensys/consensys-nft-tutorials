import { isAddress } from "ethers/lib/utils";

export const checkDeployment = async (
	provider: any,
	contractAddress: string
): Promise<boolean> => {
	if (!isAddress(contractAddress)) return false;
	const bytecode = await provider.getCode(contractAddress);
	return bytecode !== "0x";
};
